<template>
  <div
    class="phone-number-input"
    :style="{ '--color': color, '--background': background }"
  >
    <div class="input-wrapper">
      <select
        v-model="countryCode"
        class="country-input h-9"
        @click="toggleSelect = !toggleSelect"
        @focusout="toggleSelect = false"
        @change="$emit('countryCode', countryCode)"
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
      <span class="select-toggle">
        <fa :icon="['fas', toggleSelect ? 'caret-up' : 'caret-down']" />
      </span>
      <input
        id="number-input"
        v-mask="'### ### ####'"
        type="tel"
        max="11"
        class="
          number-input
          w-full
          p-2
          rounded-tr-full rounded-br-full
          leading-none
          focus:outline-none
          h-9
        "
        :class="inputClasses"
        :placeHolder="placeHolder"
        v-bind="$attrs"
        :disabled="processing"
        @input="$emit('input', $event.target.value)"
        @keypress.enter="$emit('submit')"
      />
    </div>
    <div v-if="error" class="error text-sm text-left text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    id: {
      type: String,
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
    inputClasses: {
      type: String,
      default: '',
    },
    processing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phone: '',
      countryCode: '',
      toggleSelect: false,
      options: [],
    }
  },
  computed: {
    ...mapState('profile', ['getCountryCode']),
  },
  watch: {
    defaultCountryCode(newVal) {
      return (this.countryCode = newVal)
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
    showData() {
      return this.$store.getters['']
    },
  },
}
</script>
<style lang="scss" scoped>
.phone-number-input {
  $color: var(--color);
  color: white;
  text-align: center;
  .input-wrapper {
    $background-color: var(--background);
    background-color: $background-color;
    box-shadow: 0px 1px 3px rgba(142, 82, 0, 0.7);
    @apply relative flex content-between rounded-full;

    .country-input {
      color: $color;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      direction: rtl;
      @apply cursor-pointer text-right  pl-10 rounded-tl-full rounded-bl-full font-semibold leading-none focus:outline-none;
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
      color: $color;
      @apply absolute top-1 left-4 pointer-events-none;
      svg {
        @apply text-3xl;
      }
    }
    .number-input {
      color: $color;
      background-color: $background-color;
      // &::placeholder {
      //   color: $color;
      //   @apply font-semibold;
      // }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
