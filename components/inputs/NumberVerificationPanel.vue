<template>
  <div
    class="text-center email-verify"
    :style="{
      '--color': globalColorPanel.backgroundColor,
    }"
  >
    <form name="one-time-code" class="otp" method="post">
      <fieldset class="number-code">
        <legend v-if="label.show" class="opacity-50">{{ label.title }}</legend>
        <div class="flex flex-row space-x-5 input-space">
          <input
            id="otp1"
            v-model="otp[0]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(0)"
          />
          <input
            id="otp2"
            v-model="otp[1]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(1)"
          />
          <input
            id="otp3"
            v-model="otp[2]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(2)"
          />
          <input
            id="otp4"
            v-model="otp[3]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(3)"
          />
          <input
            id="otp5"
            v-model="otp[4]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(4)"
          />
          <input
            id="otp6"
            v-model="otp[5]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(5), finalVerify()"
            @keypress.enter="otpVerify()"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    label: {
      type: Object,
      default() {
        return {}
      },
    },
    inputBorderStyle: {
      type: String,
      default: 'border-b-2 border-white ',
    },
    inputTextStyle: {
      type: String,
      default: 'text-3xl text-white text-center ',
    },
    otpCode: {
      type: String,
      default: '',
    },
    message: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      otp: ['', '', '', '', '', ''],
      resendProcess: false,
    }
  },
  computed: {
    ...mapState(['globalColorPanel']),
  },
  watch: {
    message(data) {
      if (!data) {
        this.otp = this.otpCode.split('')
      }
    },
    otp(data) {
      if (data.every((item) => item === '')) {
        const otp = data.join('')
        this.$emit('loginVerificationCode', otp)
      }
    },
  },
  mounted() {
    const inputElements = [...document.querySelectorAll('input.code-input')]
    inputElements.forEach((ele, index) => {
      ele.addEventListener('keydown', (e) => {
        if (e.keyCode === 8 && e.target.value === '')
          inputElements[Math.max(0, index - 1)].focus()
      })
      ele.addEventListener('input', (e) => {
        // Break if Shift, Tab, CMD, Option, Control.
        if (
          e.keyCode === 16 ||
          e.keyCode === 9 ||
          e.keyCode === 224 ||
          e.keyCode === 18 ||
          e.keyCode === 17 ||
          e.target.value.length > 1
        ) {
          return
        }
        const regex = /^[0-9]*$/
        if (!regex.test(e.target.value)) {
          e.target.value = ''
          return
        }
        const [first, ...rest] = e.target.value
        e.target.value = first ?? '' // the `??` '' is for the backspace usecase
        const lastInputBox = index === inputElements.length - 1
        const insertedContent = first !== undefined
        if (insertedContent && !lastInputBox) {
          if (!inputElements[index + 1].value) {
            inputElements[index + 1].focus()
            inputElements[index + 1].value = rest.join('')
            inputElements[index + 1].dispatchEvent(new Event('input'))
          }
        }
      })
    })
  },
  methods: {
    getValue(num, event) {
      const value = this.otp[num]
      if (!value) return
      if (value.length > 1 && value.length !== 6 && value.length < 3) {
        this.otp[num] = value[value.length]
        return
      } else if (value.length !== 1) {
        this.otp[num] = ''
      }
      this.$toast.clear()
      if (!value) return // Shouldn't happen, just in case.
      if (value.length === 1) return // Here is a normal behavior, not a paste action.
      for (let i = 0; i < value.length; i++) {
        this.otp[i] = value[i]
      }
      if (value.length > 6) {
        document.getElementById(`otp6`).focus()
      } else {
        document.getElementById(`otp${value.length}`).focus()
      }
      if (num !== 5) {
        if (this.otp[5]) this.finalVerify()
      }
    },
    finalVerify() {
      for (let i = 0; i < 6; i++) {
        if (!this.otp[i] && !this.otp[i] !== '') return
        continue
      }
      const otp = this.otp.join('')
      this.$toast.clear()
      this.$emit('verificationCode', otp)
      this.$emit('loginVerificationCode', otp)
    },
    otpVerify() {
      for (let i = 0; i < 6; i++) {
        if (!this.otp[i] && !this.otp[i] !== '') return
        continue
      }
      const otp = this.otp.join('')
      this.$toast.clear()
      this.$emit('verificationCode', otp)
      this.$emit('loginVerificationCode', otp)
      this.$emit('submit', otp)
    },
  },
}
</script>

<style lang="scss" scoped>
$color: var(--color);
.otp {
  @apply relative flex justify-center;
  fieldset {
    @apply border-0 p-0 m-0 flex items-center text-white;
    legend {
      @apply md:mb-4 mb-2 text-center w-full;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
button {
  @apply text-white mt-2 outline-none border-none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.border_color {
  border-color: $color;
}
.text_color {
  color: $color;
}
@media (max-width: 395px) {
  .input-space {
    @apply space-x-3;
  }
}
</style>
