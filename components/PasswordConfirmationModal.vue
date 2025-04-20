<template>
  <section class="w-full h-full absolute top-0 left-0">
    <div
      v-if="showFromSetPassword"
      class="
        close_account
        fixed
        inset-0
        h-full
        top-0
        flex
        items-center
        justify-center
        transition-all
        duration-500
        delay-500
      "
    >
      <div
        class="
          w-100-minus
          z-9999
          bg-dark-100
          shadow-md
          rounded-2xl
          flex flex-col
          items-center
          justify-center
          py-4
        "
      >
        <div class="md:text-xl text-lg text-white px-4 text-center">
          Please Set Your Password
        </div>

        <div class="flex flex-col mt-8 w-full px-8">
          <div
            class="
              input-field
              flex flex-row
              items-center
              rounded-full
              px-4
              bg-white
            "
          >
            <fa class="text-orange-dark mx-2" :icon="['fas', 'user']" />
            <input
              v-model="$v.email.$model"
              class="
                outline-none
                rounded-full
                w-full
                h-10
                placeholder-orange-dark placeholder-opacity-50
                text-orange-dark
                pl-1
              "
              type="email"
              placeholder="Enter your email"
              @blur="$v.email.$touch()"
            />
          </div>
          <template v-if="$v.email.$error">
            <p class="text-red-500 text-xs px-4">
              {{ validationMsg($v.email) }}
            </p>
          </template>
          <div
            class="
              input-field
              flex flex-row
              items-center
              rounded-full
              px-4
              mt-4
              bg-white
            "
          >
            <fa class="text-orange-dark mx-2" :icon="['fas', 'lock']" />
            <input
              v-model="$v.password.$model"
              class="
                outline-none
                rounded-full
                w-full
                h-10
                placeholder-orange-dark placeholder-opacity-50
                text-orange-dark
                pl-1
              "
              :type="togglePassword ? 'password' : 'text'"
              placeholder="Set Password"
              @blur="$v.password.$touch()"
            />
            <fa
              class="text-orange-dark mx-2"
              :icon="['fas', togglePassword ? 'eye-slash' : 'eye']"
              @click="togglePassword = !togglePassword"
            />
          </div>
          <template v-if="$v.password.$error">
            <p class="text-red-500 text-xs px-4">
              {{ validationMsg($v.password) }}
            </p>
          </template>

          <div
            class="
              input-field
              flex flex-row
              items-center
              rounded-full
              px-4
              mt-4
              bg-white
            "
          >
            <fa class="text-orange-dark mx-2" :icon="['fas', 'lock']" />
            <input
              v-model="$v.confirmPassword.$model"
              class="
                outline-none
                rounded-full
                w-full
                h-10
                placeholder-orange-dark placeholder-opacity-50
                text-orange-dark
                pl-1
              "
              type="password"
              placeholder="Confirm Password"
              @keypress.enter="setNewPassword()"
              @blur="$v.confirmPassword.$touch()"
            />
          </div>
          <template v-if="$v.confirmPassword.$error">
            <p
              v-if="!$v.confirmPassword.required"
              class="text-red-500 text-xs w-full px-4"
            >
              The fileld is required
            </p>
            <p
              v-if="confirmPassword && !$v.confirmPassword.sameAsPassword"
              class="text-red-500 text-xs w-full px-4"
            >
              Password does not match
            </p>
          </template>

          <div class="w-full text-center mt-8">
            <button
              class="
                w-44
                h-10
                bg-orange-dark
                text-white
                rounded-full
                border-none
                outline-none
                font-medium
                text-center
              "
              :disabled="process"
              @click="setNewPassword()"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span>Submit</span>
                <fa
                  v-if="process"
                  class="w-4 h-4 absolute right-5 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="showFromProfile"
      class="
        close_account
        fixed
        inset-0
        h-full
        top-0
        flex
        items-center
        justify-center
        transition-all
        duration-500
        delay-500
      "
    >
      <div
        class="
          w-100-minus
          z-9999
          bg-dark-100
          shadow-md
          rounded-2xl
          flex flex-col
          items-center
          justify-center
          py-4
        "
      >
        <div class="flex justify-end items-center mb-2 w-full px-4">
          <fa
            :style="{ color: globalColorPanel.backgroundColor }"
            class="w-6 h-6 cursor-pointer"
            :icon="['fas', 'times']"
            @click="close"
          />
        </div>
        <div class="md:text-xl text-lg text-white px-4 text-center">
          To Confirm, Please Enter Your Password
        </div>

        <div class="flex flex-col mt-8 w-full px-8">
          <div
            class="
              input-field
              flex flex-row
              bg-white
              items-center
              rounded-full
              px-4
            "
            :style="{ color: globalColorPanel.backgroundColor }"
          >
            <fa class="w-4 h-4 mx-2" :icon="['fas', 'lock']" />
            <input
              v-model="$v.password.$model"
              class="
                outline-none
                rounded-full
                w-full
                h-10
                placeholder-dynamic-color
                pl-1
              "
              :style="{ color: globalColorPanel.backgroundColor }"
              :type="togglePassword ? 'password' : 'text'"
              placeholder="Current Password"
              @blur="$v.password.$touch()"
            />
            <fa
              class="w-4 h-4 mx-2"
              :icon="['fas', togglePassword ? 'eye-slash' : 'eye']"
              @click="togglePassword = !togglePassword"
            />
          </div>
          <template v-if="$v.password.$error">
            <p class="text-red-500 text-xs px-4">
              {{ validationMsg($v.password) }}
            </p>
          </template>

          <div
            class="
              input-field
              flex flex-row
              bg-white
              items-center
              rounded-full
              px-4
              mt-4
            "
            :style="{ color: globalColorPanel.backgroundColor }"
          >
            <fa class="w-4 h-4 mx-2" :icon="['fas', 'lock']" />
            <input
              v-model="$v.confirmPassword.$model"
              class="
                outline-none
                rounded-full
                w-full
                h-10
                placeholder-dynamic-color
                pl-1
              "
              :style="{ color: globalColorPanel.backgroundColor }"
              type="password"
              placeholder="Confirm Current Password"
              @keypress.enter="passwordConfirm()"
              @blur="$v.confirmPassword.$touch()"
            />
          </div>
          <template v-if="$v.confirmPassword.$error">
            <p
              v-if="!$v.confirmPassword.required"
              class="text-red-500 text-xs w-full px-4"
            >
              The fileld is required
            </p>
            <p
              v-if="confirmPassword && !$v.confirmPassword.sameAsPassword"
              class="text-red-500 text-xs w-full px-4"
            >
              Password does not match
            </p>
          </template>

          <div class="w-full text-center mt-8">
            <button
              class="
                w-44
                h-10
                text-white
                rounded-full
                border-none
                outline-none
                font-medium
                text-center
              "
              :style="{ backgroundColor: globalColorPanel.backgroundColor }"
              :disabled="process"
              @click="passwordConfirm()"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span>Submit</span>
                <fa
                  v-if="process"
                  class="w-4 h-4 absolute right-5 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="showFromCloseAccount"
      class="
        close_account
        fixed
        inset-0
        h-full
        top-0
        flex
        items-center
        justify-center
        transition-all
        duration-500
        delay-500
      "
    >
      <div
        class="
          w-100-minus
          modal-height
          z-9999
          bg-dark-100
          shadow-md
          rounded-2xl
          flex flex-col
          items-center
          justify-start
          py-4
        "
      >
        <div class="flex justify-end items-center mb-2 w-full px-4">
          <fa
            :style="{ color: globalColorPanel.backgroundColor }"
            class="w-6 h-6 cursor-pointer"
            :icon="['fas', 'times']"
            @click="close"
          />
        </div>
        <transition name="fade">
          <div
            v-if="hidePasswordModal"
            class="md:text-xl text-lg text-white px-4 text-center"
          >
            To close your account, we need to verify your identity. Please enter
            your password.
          </div>
        </transition>
        <transition name="fade">
          <div v-if="hidePasswordModal" class="flex flex-col mt-8 w-full px-8">
            <div
              class="
                input-field
                flex flex-row
                bg-white
                items-center
                rounded-full
                px-4
              "
              :style="{ color: globalColorPanel.backgroundColor }"
            >
              <fa class="w-4 h-4 mx-2" :icon="['fas', 'lock']" />
              <input
                v-model="$v.closeAccountPassword.$model"
                class="
                  outline-none
                  rounded-full
                  w-full
                  h-10
                  placeholder-dynamic-color
                  pl-1
                "
                :style="{ color: globalColorPanel.backgroundColor }"
                :type="togglePassword ? 'password' : 'text'"
                placeholder="Type Current Password and Hit Enter"
                @keypress.enter="closeAccountConfirmPassword()"
                @blur="$v.closeAccountPassword.$touch()"
              />
              <fa
                class="w-4 h-4 mx-2"
                :icon="['fas', togglePassword ? 'eye-slash' : 'eye']"
                @click="togglePassword = !togglePassword"
              />
            </div>
            <template v-if="$v.closeAccountPassword.$error">
              <p class="text-red-500 text-xs px-4">
                {{ validationMsg($v.closeAccountPassword) }}
              </p>
            </template>
            <transition name="fade">
              <div v-if="showSendCode" class="w-full text-center mt-6">
                <button
                  class="
                    w-44
                    h-10
                    text-white
                    rounded-full
                    border-none
                    outline-none
                    font-medium
                    text-center
                  "
                  :style="{ backgroundColor: globalColorPanel.backgroundColor }"
                  :disabled="sendCodeProcess"
                  @click="sendCode()"
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
                      v-if="sendCodeProcess"
                      class="w-4 h-4 absolute right-5 text-white font-bold animate-spin"
                      :icon="['fas', 'spinner']"
                    />
                  </div>
                </button>
              </div>
            </transition>
          </div>
        </transition>

        <transition name="fade">
          <div
            v-if="passwordConfirmEmailVerifyModal"
            class="my-0 text-center email-verify"
          >
            <legend class="text-white md:text-lg text-md">
              Please enter the code you were emailed.
            </legend>
            <number-verification-panel
              class="mt-8"
              input-border-style="border-b-2 border_color"
              input-text-style="text-3xl text_color text-center"
              @verificationCode="verification"
            ></number-verification-panel>
            <button
              :disabled="sendCodeProcess"
              class="pt-6 resend-code"
              @click="resendCode()"
            >
              Resend code
            </button>
          </div>
        </transition>
      </div>
    </div>
    <div
      v-if="showPasswordConfirmModal"
      class="password-confirm-overlay w-full h-full"
    ></div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  required,
  sameAs,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages, containsValidPassword } from '@/utils/validations'
import NumberVerificationPanel from '~/components/inputs/NumberVerificationPanel'
import { CHECK_ONETIME_TOKEN, SET_NEW_PASSWORD } from '~/constants/urls'
import { emailVerifyOtpMixing } from '~/mixins/otp'

export default {
  name: 'PasswordConfirmationModal',
  components: {
    NumberVerificationPanel,
  },
  mixins: [emailVerifyOtpMixing],
  data() {
    return {
      password: '',
      confirmPassword: '',
      closeAccountPassword: '',
      email: '',
      uid: this.$route.query?.uid,
      token: this.$route.query?.token,
      tokenInvalid: false,
      togglePassword: true,
      process: false,
      sendCodeProcess: false,
      newUserPasswordModal: false,
      confirmPasswordModal: false,
      showCloseAccountModal: false,
      passwordCheck: true,
      passwordChecked: false,
      hidePasswordModal: true,
      showSendCode: false,
    }
  },
  computed: {
    ...mapState('confirm', [
      'showPasswordConfirmModal',
      'showFromSetPassword',
      'showFromProfile',
      'showFromCloseAccount',
    ]),
    ...mapState(['globalColorPanel']),
    ...mapState(['passwordConfirmEmailVerifyModal']),
    user() {
      return this.$auth.user
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(12),
      maxLength: maxLength(80),
      containsValidPassword,
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
    closeAccountPassword: {
      required,
    },
  },
  mounted() {
    if (this.$route.path === '/authuser/set-password') {
      this.$store.commit('confirm/SET_FROM_SET_PASSWORD', true)
      this.checkOneTimeToken()
    } else if (this.$route.fullPath === '/settings#account') {
      this.showCloseAccountModal = true
    } else {
      this.confirmPasswordModal = true
    }
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    verification(code) {
      if (code.length === 6) {
        this.verifyEmailOtp({
          email: this.user.email,
          otp: code,
        })
      }
    },
    async sendCode() {
      this.$toast.clear()
      this.$v.$touch()
      if (this.closeAccountPassword && !this.process) {
        this.process = true
        try {
          const response = await this.$store.dispatch(
            'confirm/checkPasswordValidity',
            { password: this.closeAccountPassword }
          )
          if (response.status === 200) {
            this.showSendCode = true
            if (this.user.email && this.showSendCode) {
              await this.resendPasswordConfirmEmailVerifyCode({
                email: this.user.email,
              })
            }
          } else {
            this.showSendCode = false
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.process = false
        }
      }
    },
    async resendCode() {
      await this.resendPasswordConfirmEmailVerifyCode({
        email: this.user.email,
      })
    },
    async closeAccountConfirmPassword() {
      this.$toast.clear()
      this.$v.$touch()
      if (this.closeAccountPassword && !this.process) {
        this.process = true
        try {
          const response = await this.$store.dispatch(
            'confirm/checkPasswordValidity',
            { password: this.closeAccountPassword }
          )
          if (response.status === 200) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.showSendCode = true
          } else {
            this.showSendCode = false
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.process = false
        }
      }
    },
    async passwordConfirm() {
      this.$toast.clear()
      this.$v.$touch()
      if (!this.$v.password.$error && !this.$v.confirmPassword.$error) {
        try {
          this.process = true
          const response = await this.$store.dispatch(
            'confirm/checkPasswordValidity',
            { password: this.password }
          )
          if (response.status === 200) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.$emit('isValidPassword')
            this.close()
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.process = false
        }
      }
    },
    close() {
      this.$store.commit('confirm/SET_PASSWORD_CONFIRM_MODAL', false)
      this.$store.commit('confirm/SET_FROM_SET_PASSWORD', false)
      this.$store.commit('confirm/SET_FROM_PROFILE', false)
      this.$store.commit('confirm/SET_FROM_CLOSE_ACCOUNT', false)
      this.confirmPasswordModal = false
      this.showCloseAccountModal = false
      this.hidePasswordModal = true
      this.passwordChecked = false
      this.passwordCheck = true
      this.showSendCode = false
      this.showPasswordConfirmEmailVerifyModal(false)
      this.$emit('close')
    },
    async checkOneTimeToken() {
      try {
        const { success, message } = await this.$axios.$post(
          CHECK_ONETIME_TOKEN,
          {
            uid: this.uid,
            token: this.token,
          }
        )
        this.$toast.clear()
        if (!success) {
          this.tokenInvalid = true
          this.$toast.error(message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async setNewPassword() {
      this.$v.$touch()

      if (this.tokenInvalid) {
        this.$toast.clear()
        this.$toast.error('Token is invalid', {
          className: ['toasted-bg-alert'],
        })
        return
      }

      if (
        !this.$v.email.$error &&
        !this.$v.password.$error &&
        !this.$v.confirmPassword.$error &&
        !this.tokenInvalid
      ) {
        try {
          this.process = true
          const { status, message } = await this.$axios.$post(
            SET_NEW_PASSWORD,
            {
              uid: this.uid,
              token: this.token,
              email: this.email,
              password: this.password,
            }
          )
          this.$toast.clear()
          if (status === 200) {
            this.$toast.success(message, {
              className: ['toasted-bg-archive'],
            })
            this.password = ''
            this.confirmPassword = ''
            this.email = ''
            this.tokenInvalid = false
            this.$v.$reset()
            this.close()
            this.$router.replace('/')
          } else {
            this.$toast.error(message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.process = false
        }
      }
    },
    ...mapActions({
      showPasswordConfirmEmailVerifyModal:
        'showPasswordConfirmEmailVerifyModal',
    }),
  },
}
</script>

<style lang="scss" scoped>
$color: var(--color);
.placeholder-dynamic-color::placeholder {
  --tw-placeholder-opacity: 0.5;
  opacity: 0.5;
  color: rgba(228, 128, 29, var(--color));
}
.close_account {
  z-index: 99999999999999;
}

.w-100-minus {
  @apply w-102;
}

@media (max-width: 767px) {
  .w-100-minus {
    width: calc(100% - 35px);
  }
}

.modal-height {
  height: 260px;
}

@media (max-width: 400px) {
  .modal-height {
    height: 285px;
  }
}

.btn-max-w {
  max-width: 250px;
}
.password-confirm-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999999;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  pointer-events: all;
}
.resend-code {
  @apply text-white outline-none border-none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
