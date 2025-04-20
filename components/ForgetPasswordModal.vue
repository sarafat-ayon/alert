<template>
  <transition name="modal">
    <div
      v-if="showForgetPasswordModal"
      class="
        fixed
        inset-0
        top-0
        flex
        items-center
        justify-center
        h-full
        forgot-password
      "
    >
      <div
        class="
          block
          shadow-md
          w-100-minues
          bg-offgray
          rounded-2xl
          min-height-100
        "
      >
        <div
          class="
            flex flex-col
            items-center
            justify-start
            h-full
            py-4
            form-group
          "
        >
          <div class="flex items-center justify-between w-full px-4 mb-2">
            <h3
              class="text-xl font-medium text-orange-dark md:text-2xl"
              :style="{ color: globalColorPanel.backgroundColor }"
            >
              Your Account
            </h3>
            <fa
              class="text-2xl cursor-pointer text-orange-dark"
              :style="{ color: globalColorPanel.backgroundColor }"
              :icon="['fas', 'times']"
              @click="hideForgetPasswordModal()"
            />
          </div>
          <div class="w-full h-px my-2 bg-gray-500"></div>
          <transition name="sub-modal">
            <div
              v-if="!hideEmailField"
              class="flex flex-col items-center justify-center w-full"
            >
              <label class="w-full px-4 my-2 text-white md:text-lg text-md"
                >Please enter your email address.</label
              >
              <div
                class="
                  flex flex-row
                  items-center
                  px-4
                  rounded-full
                  input-field
                  bg-white
                "
              >
                <fa
                  class="mx-2 text-orange-dark"
                  :icon="['fas', 'user']"
                  :style="{ color: globalColorPanel.backgroundColor }"
                />
                <input
                  v-model.trim="email"
                  class="
                    w-full
                    h-10
                    pl-1
                    text-orange-dark
                    placeholder-orange-dark
                    placeholder-opacity-50
                    placeholder-dynamic-color
                    rounded-full
                    outline-none
                    bg-white
                  "
                  :style="{ color: globalColorPanel.backgroundColor }"
                  type="email"
                  placeholder="Email"
                  @keypress.enter="sendCode()"
                  @blur="$v.email.$touch()"
                />
              </div>
              <template v-if="$v.email.$error">
                <p
                  v-if="!$v.email.required"
                  class="w-full px-4 text-xs text-red-500"
                >
                  Email is Required
                </p>
                <p
                  v-else-if="!$v.email.email"
                  class="w-full px-4 text-xs text-red-500"
                >
                  Email is Invalid
                </p>
              </template>
              <button
                class="
                  h-10
                  mt-4
                  font-medium
                  text-center text-white
                  border-none
                  rounded-full
                  outline-none
                  w-44
                  bg-orange-dark
                "
                :style="{ backgroundColor: globalColorPanel.backgroundColor }"
                :disabled="sendCodeProcess"
                @click="sendCode()"
              >
                <div
                  class="relative flex items-center justify-around rounded-full"
                >
                  <span>Send Code</span>
                  <fa
                    v-if="sendCodeProcess"
                    class="
                      w-4
                      h-4
                      absolute
                      font-bold
                      text-white
                      right-5
                      animate-spin
                    "
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
            </div>
          </transition>
          <transition name="sub-modal">
            <div v-if="emailVerifyModal" class="my-0 text-center email-verify">
              <legend class="text-white md:text-lg text-md">
                Please enter the code you were emailed.
              </legend>
              <number-verification-panel
                class="mt-8"
                input-border-style="border-b-2 border-yellow-primary border_color"
                input-text-style="text-3xl text-yellow-primary text-center text_color"
                @verificationCode="verification"
              ></number-verification-panel>
              <button
                class="pt-6 resend-code"
                :disabled="reSendProcess"
                @click="resendCode()"
              >
                Resend code
              </button>
            </div>
          </transition>
          <transition name="sub-modal">
            <div
              v-if="showPasswordField"
              class="flex flex-col items-center justify-center w-full"
            >
              <label class="w-full px-4 my-2 text-white md:text-lg text-md"
                >Please enter your new password.</label
              >
              <div
                class="
                  flex flex-row
                  items-center
                  px-4
                  rounded-full
                  input-field
                  bg-white
                "
              >
                <fa
                  class="mx-2 text-orange-dark"
                  :icon="['fas', 'lock']"
                  :style="{ color: globalColorPanel.backgroundColor }"
                />
                <input
                  v-model="$v.password.$model"
                  class="
                    w-full
                    h-10
                    pl-1
                    text-orange-dark
                    placeholder-orange-dark
                    placeholder-opacity-50
                    placeholder-dynamic-color
                    rounded-full
                    outline-none
                    bg-white
                  "
                  :style="{ color: globalColorPanel.backgroundColor }"
                  :type="togglePassword ? 'password' : 'text'"
                  placeholder="New Password"
                  @blur="$v.password.$touch()"
                />
                <fa
                  class="w-4 h-4 mx-2 text-orange-dark"
                  :icon="['fas', togglePassword ? 'eye-slash' : 'eye']"
                  :style="{ color: globalColorPanel.backgroundColor }"
                  @click="togglePassword = !togglePassword"
                />
              </div>
              <template v-if="$v.password.$error">
                <p class="w-full px-4 text-xs text-red-500">
                  {{ validationMsg($v.password) }}
                </p>
              </template>
              <div
                class="
                  flex flex-row
                  items-center
                  px-4
                  mt-4
                  rounded-full
                  input-field
                  bg-white
                "
              >
                <fa
                  class="mx-2 text-orange-dark"
                  :icon="['fas', 'lock']"
                  :style="{ color: globalColorPanel.backgroundColor }"
                />
                <input
                  v-model="$v.confirmPassword.$model"
                  class="
                    w-full
                    h-10
                    pl-1
                    text-orange-dark
                    placeholder-orange-dark
                    placeholder-opacity-50
                    placeholder-dynamic-color
                    rounded-full
                    outline-none
                    bg-white
                  "
                  :style="{ color: globalColorPanel.backgroundColor }"
                  type="password"
                  placeholder="Confirm Password"
                  @keypress.enter="passwordReset()"
                  @blur="$v.confirmPassword.$touch()"
                />
              </div>
              <template v-if="$v.confirmPassword.$error">
                <p
                  v-if="!$v.confirmPassword.required"
                  class="w-full px-4 text-xs text-red-500"
                >
                  The fileld is required
                </p>
                <p
                  v-if="confirmPassword && !$v.confirmPassword.sameAsPassword"
                  class="w-full px-4 text-xs text-red-500"
                >
                  Password does not match
                </p>
              </template>
              <button
                class="
                  h-10
                  mt-4
                  font-medium
                  text-center text-white
                  border-none
                  rounded-full
                  outline-none
                  w-44
                  bg-orange-dark
                "
                :style="{ backgroundColor: globalColorPanel.backgroundColor }"
                :disabled="passwordResetProcess"
                @click="passwordReset()"
              >
                <div
                  class="relative flex items-center justify-around rounded-full"
                >
                  <span>Submit</span>
                  <fa
                    v-if="passwordResetProcess"
                    class="
                      w-4
                      h-4
                      absolute
                      font-bold
                      text-white
                      right-5
                      animate-spin
                    "
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages, containsValidPassword } from '@/utils/validations'
import { passwordReset } from '~/constants/urls'
import NumberVerificationPanel from '~/components/inputs/NumberVerificationPanel'
import { emailVerifyOtpMixing } from '~/mixins/otp'

export default {
  name: 'ForgetPasswordModal',
  components: { NumberVerificationPanel },
  mixins: [emailVerifyOtpMixing],
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      otp: ['', '', '', '', '', ''],
      hideEmailField: false,
      showPasswordField: false,
      togglePassword: true,
      sendCodeProcess: false,
      reSendProcess: false,
      passwordResetProcess: false,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(12),
      containsValidPassword,
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  computed: {
    ...mapState([
      'showForgetPasswordModal',
      'emailVerifyModal',
      'globalColorPanel',
      'lockScreen',
    ]),
  },
  watch: {
    lockScreen(data) {
      if (data) {
        this.hideForgetPasswordModal()
      }
    },
  },
  mounted() {},
  methods: {
    verification(code) {
      if (code.length === 6) {
        this.verifyForgetPasswordEmailOtp({
          email: this.email,
          otp: code,
        })
        this.otpCode = code
      }
    },
    validationMsg: validationMessage(validationMessages),
    hideForgetPasswordModal() {
      this.showForgetPassword(false)
      this.showEmailVerifyModal(false)
      this.hideEmailField = false
      this.showPasswordField = false
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.otpCode = ''
      this.$v.$reset()
    },
    async sendCode() {
      this.$v.$touch()
      if (this.email && !this.$v.email.$error) {
        await this.resendEmailVerifyCode({ email: this.email })
      }
    },
    async resendCode() {
      await this.resendEmailVerifyCode({ email: this.email })
    },
    async passwordReset() {
      this.$toast.clear()
      this.$v.$touch()
      if (!this.$v.password.$error && !this.$v.confirmPassword.$error) {
        try {
          this.passwordResetProcess = true
          const res = await this.$axios.$post(passwordReset, {
            email: this.email,
            password: this.password,
            passwordConfirmation: this.confirmPassword,
            otp: this.otpCode,
          })
          this.$toast.clear()
          if (res.status === 200) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.hideForgetPasswordModal()
            localStorage.removeItem('lockScreen')
            this.$store.commit('SET_LOCK_SCREEN', false)
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        }
        this.passwordResetProcess = false
      }
    },
    ...mapActions({
      showForgetPassword: 'showForgetPassword',
      showEmailVerifyModal: 'showEmailVerifyModal',
    }),
  },
}
</script>

<style lang="scss" scoped>
$color: var(--color);
.forgot-password {
  z-index: 99999999999 !important;
}
.w-100-minues {
  width: 415px;
}

@media (max-width: 767px) {
  .w-100-minues {
    width: calc(100% - 35px);
  }
}

.btn-max-w {
  max-width: 250px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.sub-modal-enter-active,
.sub-modal-leave-active {
  transition: opacity 0.5s;
}
.sub-modal-enter,
.sub-modal-leave-to {
  opacity: 0;
}
.input-field {
  width: 94.5%;
}
.otp {
  @apply relative w-full flex justify-center;
  fieldset {
    @apply border-0 p-0 m-0 flex justify-center items-center text-orange-dark;
    legend {
      @apply md:mb-4 mb-2 w-full;
    }
    input[type='number'] {
      @apply w-11 md:w-12 focus:outline-none text-orange-dark border-b-2 border-orange-dark rounded-none bg-transparent text-center m-1 py-1 text-4xl font-bold;
      appearance: textfield;
      -webkit-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

input[type='number'] {
  @apply w-11 md:w-12 focus:outline-none text-orange-dark border-b-2 border-orange-dark rounded-none bg-transparent text-center m-1 py-1 text-4xl font-bold;
  appearance: textfield;
  -webkit-appearance: textfield;
}
.resend-code {
  @apply text-white outline-none border-none;
}
.min-height-100 {
  min-height: 15rem !important;
}

.placeholder-dynamic-color::placeholder {
  --tw-placeholder-opacity: 0.5;
  opacity: 0.5;
  color: rgba(228, 128, 29, var(--color));
}
</style>
