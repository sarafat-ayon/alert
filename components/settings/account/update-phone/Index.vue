<template>
  <div>
    <transition name="right-sidebar-trans">
      <div
        v-if="show && loggedIn"
        :style="{ '--color': backgroundColor }"
        class="
          profile
          fixed
          bg-ash-dark
          right-0
          md:top-15
          h-full
          md:px-21
          p-4
          md:pt-8
          flex flex-col
          content-between
          scroll
          md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
          transition-all
          duration-500
          delay-500
        "
      >
        <div class="content-wrapper w-full h-full relative">
          <transition name="page">
            <div class="w-full h-full absolute top-0">
              <div class="h-full flex flex-wrap content-between">
                <div class="w-full card-height">
                  <!-- start header section -->
                  <div class="flex flex-row justify-between md:mt-4">
                    <h2
                      :style="{
                        color: backgroundColor,
                      }"
                      class="xl:text-2xl md:text-xl md:font-bold text-2xl"
                    >
                      Edit Phone Number
                    </h2>
                    <button
                      class="focus:outline-none"
                      @click="hideEditContact()"
                    >
                      <fa
                        :style="{
                          color: backgroundColor,
                        }"
                        class="text-2xl font-semibold"
                        :icon="['fas', 'times']"
                      />
                    </button>
                  </div>
                  <!-- end header section -->

                  <!-- start body section -->
                  <div
                    class="
                      w-full
                      inner-body
                      flex flex-col
                      items-center
                      justify-center
                    "
                  >
                    <transition name="fadeIn" mode="out-in">
                      <component
                        :is="activeComponent"
                        :processing="processing"
                        :send-code="sendCode"
                        @phoneAndCountry="phoneAndCountryCode"
                        @verificationCode="verificationCode"
                        @resendCode="resendCode"
                      ></component>
                    </transition>
                  </div>
                  <!-- end body section -->
                </div>
                <div
                  v-if="activeComponent === 'ContactNumber'"
                  class="next card-footer w-full text-center"
                >
                  <button
                    class="
                      w-44
                      h-9
                      text-white
                      rounded-full
                      mr-2.5
                      border-none
                      outline-none
                      font-bold
                      setup
                    "
                    :style="{
                      backgroundColor: globalColorPanel.backgroundColor,
                    }"
                    :disabled="processing"
                    @click="getCode()"
                  >
                    <div
                      class="
                        rounded-full
                        relative
                        flex
                        items-center
                        justify-around
                      "
                    >
                      <span>Send Code</span>
                      <fa
                        v-if="processing"
                        class="
                          absolute
                          right-5
                          text-white
                          font-bold
                          animate-spin
                        "
                        :icon="['fas', 'spinner']"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ContactNumber from './ContactNumber.vue'
import NumberVerification from './NumberVerification.vue'
import VerificationMessage from './VerificationMessage.vue'
import { SAVE_PHONE_NUMBER } from '~/constants/urls'
import { phoneVerifyOtpMixing } from '~/mixins/otp'

export default {
  name: 'Profile',
  components: { ContactNumber, NumberVerification, VerificationMessage },
  mixins: [phoneVerifyOtpMixing],
  props: {
    showProfile: {
      type: Boolean,
    },
    backgroundColor: {
      type: String,
      default: '#e4801d',
    },
  },
  data() {
    return {
      phone: '',
      activeComponent: 'ContactNumber',
      code: '',
      processing: false,
      sendCode: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
    ...mapState('profile', ['show']),
    ...mapState(['globalColorPanel']),
  },
  mounted() {},
  methods: {
    getCode() {
      this.sendCode = true
    },
    async phoneAndCountryCode(data) {
      this.$toast.clear()
      if (data.phone.trim().length <= 0) {
        this.sendCode = false
        return this.$toast.error('Contact number field is required!', {
          className: ['toasted-bg-alert'],
        })
      }
      const phoneNumber = data.countryCode + '' + data.phone
      this.phone = phoneNumber
      await this.savePhoneNumber(phoneNumber)
    },

    async savePhoneNumber(phone) {
      this.$toast.clear()
      try {
        this.processing = true
        const res = await this.$axios.$post(SAVE_PHONE_NUMBER, {
          email: this.user.email,
          phone,
        })
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.activeComponent = 'NumberVerification'
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.sendCode = false
        this.processing = false
      }
    },

    resendCode() {
      this.resendPhoneVerifyCode({
        email: this.user.email,
      })
    },

    async verificationCode(code) {
      this.code = code
      await this.verifyPhoneOtp({ email: this.user.email, otp: code })
    },
    hideEditContact() {
      this.$emit('hide')
    },
  },
}
</script>
<style lang="scss" scoped>
$color: var(--color);

.profile {
  width: 500px;
  height: 100%;
  top: 0px;
  z-index: 9999999999;
}

.setup {
  bottom: 530px;
}
.scroll {
  scrollbar-color: $color #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: $color;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: $color;
  }
}
.form-card > .error {
  margin-top: 0px;
}
.inner-body {
  height: calc(100% - 30px);
}
@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999999;
  }
  .scroll {
    scrollbar-color: $color #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $color;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: $color;
    }
  }
}

.right-sidebar-trans-enter,
.right-sidebar-trans-leave-to {
  right: -100%;
}

.right-sidebar-trans-enter-to,
.right-sidebar-trans-leave {
  right: 0;
}

.right-sidebar-trans-enter-active {
  transition: all 0.8s ease-in-out;
}
.right-sidebar-trans-leave-active {
  transition: all 0.8s ease-in-out;
}
.content-wrapper {
  opacity: 1;
}

.card-height {
  height: calc(100% - 30px);
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 1s ease-in-out;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
}
</style>
