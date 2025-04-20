<template>
  <div class="my-3 mb-10 text-center email-verify">
    <number-verification-panel
      :label="{ show: true, title: 'Please enter the code you were emailed.' }"
      @verificationCode="verification"
    ></number-verification-panel>
    <button :disabled="reSendProcess" @click="resendCode()">
      <span>Resend code</span>
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NumberVerificationPanel from '~/components/inputs/NumberVerificationPanel'
import { emailVerifyOtpMixing } from '~/mixins/otp'
export default {
  components: { NumberVerificationPanel },
  mixins: [emailVerifyOtpMixing],
  data() {
    return {
      otp: ['', '', '', '', '', ''],
      invalidChars: [['-', '+', 'e']],
    }
  },
  computed: {
    ...mapGetters('user', ['getUserInfo']),
  },
  mounted() {},

  methods: {
    verification(code) {
      if (code.length === 6) {
        this.verifyEmailOtp(
          {
            email: this.getUserInfo.email,
            otp: code,
          },
          'signup'
        )
      }
    },
    resendCode() {
      this.resendEmailVerifyCode(
        { email: this.getUserInfo.email, password: this.getUserInfo.password },
        'signup'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  @apply text-white mt-2 outline-none border-none;
}
</style>
