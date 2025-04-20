<template>
  <div class="w-full flex flex-col items-center">
    <number-verification-panel
      :label="{ show: true, title: 'Enter code you were Texted' }"
      @verificationCode="verification"
    ></number-verification-panel>
    <button
      :disabled="processing"
      class="text-center text-white mt-2"
      @click="resendCode()"
    >
      Resend code
    </button>
  </div>
</template>

<script>
import NumberVerificationPanel from '~/components/inputs/NumberVerificationPanel'

export default {
  name: 'NumberVerification',
  components: { NumberVerificationPanel },
  props: {
    processing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    verification(code) {
      if (!this.processing) {
        this.$emit('verificationCode', code)
      }
    },
    resendCode() {
      if (!this.processing) {
        this.$emit('resendCode')
      }
    },
  },
}
</script>