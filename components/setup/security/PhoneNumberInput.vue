<template>
  <div
    class="phone-number-input my-3 mb-10 w-full md:px-4"
    :style="{ '--color': color, '--background': background }"
  >
    <label for="number-input">Enter your Mobile Number</label>
    <div class="input-wrapper">
      <span class="select-toggle">
        <fa :icon="['fas', toggleSelect ? 'caret-up' : 'caret-down']" />
      </span>
      <select
        v-model="countryCode"
        class="country-input"
        @click="toggleSelect = !toggleSelect"
        @focusout="toggleSelect = false"
      >
        <optgroup label="Select Country">
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
          >
            {{ option.code }}
          </option>
        </optgroup>
      </select>

      <input
        id="number-input"
        v-model="phone"
        v-mask="'### ### ####'"
        type="tel"
        max="11"
        class="number-input"
        :placeHolder="placeHolder"
        v-bind="$attrs"
        @keyup.enter="getVerificationCode($event)"
      />
      <div v-if="error" class="error text-sm text-red-900">
        {{ errorMessage }}
      </div>
    </div>
    <div class="next card-footer w-full text-center">
      <button
        class="
          w-44
          h-9
          text-white
          bg-yellow-primary
          rounded-full
          mr-2.5
          border-none
          outline-none
          font-bold
          setup
        "
        :disabled="sendProcess"
        @click="getVerificationSendCode()"
      >
        <div class="rounded-full relative flex items-center justify-around">
          <span>Send Code</span>
          <fa
            v-if="sendProcess"
            class="absolute right-5 text-white font-bold animate-spin"
            :icon="['fas', 'spinner']"
          />
        </div>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { SAVE_PHONE_NUMBER } from '~/constants/urls'
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: Number,
      required: false,
      default: null,
    },
    placeHolder: {
      type: String,
      required: false,
      default: 'xxx xxx xxxx',
    },
    errorMessage: {
      type: String,
      required: false,
      default: 'Invalid',
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: '#E4801D',
    },
    background: {
      type: String,
      required: false,
      default: '#fff',
    },
    defaultCountryCode: {
      type: String,
      required: false,
      default: '+1',
    },
    sendCode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      phone: '',
      countryCode: '',
      toggleSelect: false,
      sendProcess: false,
      options: [],
    }
  },
  computed: {
    ...mapGetters('user', ['getUserInfo']),
    ...mapState('profile', ['getCountryCode']),
  },

  watch: {
    defaultCountryCode(newVal) {
      return (this.countryCode = newVal)
    },
    sendCode(value) {
      if (value) {
        this.getVerificationSendCode()
      }
    },
  },
  mounted() {
    this.getCountryCodes()
    this.countryCode = this.countryCode
      ? this.countryCode
      : this.defaultCountryCode
  },

  methods: {
    getCountryCodes() {
      if (window.location.host === 'sharparchive.com') {
        this.options = this.getCountryCode.filter(function (obj) {
          return obj.value !== '+880'
        })
      } else {
        this.options = this.getCountryCode
      }
    },
    async getVerificationCode($event) {
      if ($event.target.value.length < 10) return
      const formattedNumber = `${this.countryCode} ${$event.target.value}`

      this.$toast.clear()
      await this.savePhoneNumber(formattedNumber)
    },
    async getVerificationSendCode() {
      if (this.phone.length < 10) return
      const formattedNumber = `${this.countryCode} ${this.phone}`

      this.$toast.clear()
      await this.savePhoneNumber(formattedNumber)
    },

    async savePhoneNumber(phone) {
      try {
        this.sendProcess = true
        const res = await this.$axios.$post(SAVE_PHONE_NUMBER, {
          email: this.getUserInfo.email,
          password: this.getUserInfo.password,
          phone,
        })
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.$emit('next', 'phone-verification')
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.sendProcess = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.phone-number-input {
  $color: #e4801d;
  color: white;
  text-align: center;
  label {
    @apply text-white block font-normal md:mb-0.5 mb-3;
  }
  .input-wrapper {
    $background-color: var(--background);
    background-color: $background-color;
    box-shadow: 0px 1px 3px rgba(142, 82, 0, 0.7);
    @apply relative flex rounded-full;

    .country-input {
      padding-top: 3px;
      width: 82px;
      color: #e4801d;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      direction: rtl;
      @apply cursor-pointer text-right pl-10 rounded-tl-full rounded-bl-full font-bold leading-none focus:outline-none;
      option {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        direction: ltr;
        @apply font-semibold text-left pl-0;
        &:disabled {
          @apply text-gray-500;
        }
        &:focus,
        &:checked,
        &:hover {
          color: white;
          background-color: $color !important;
        }
      }
    }
    .select-toggle {
      top: 0.18rem;
      color: #e4801d;
      @apply absolute left-4 pointer-events-none;
      svg {
        @apply text-3xl;
      }
    }
    .number-input {
      color: $color;
      background-color: $background-color;
      @apply w-full p-2 mt-0.5 rounded-tr-full font-normal rounded-br-full leading-none focus:outline-none;
      &::placeholder {
        color: #e4801d;
        @apply font-bold opacity-50;
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.next {
  // min-height: 70px;
  @apply py-4 md:py-0 text-white;
  &.modal-view {
    transition: all 1s ease-in-out;
    @apply w-full bg-gray-800 rounded-tl-2xl rounded-tr-2xl;
  }
}
.card-footer {
  // min-height: 70px;
  @apply p-4 pt-0 text-white;
}
select::-webkit-scrollbar {
  width: 2px;
}
select::-webkit-scrollbar-track {
  @apply bg-gray-300;
}
select::-webkit-scrollbar-thumb {
  @apply bg-orange-dark;
}
</style>
