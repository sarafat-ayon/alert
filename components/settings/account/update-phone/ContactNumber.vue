<template>
  <div class="w-full space-y-2">
    <label for="" class="text-left text-gray-1100 font-bold"
      >Enter your Mobile Number</label
    >
    <phone-number-input
      v-model="phone"
      color="#747474"
      input-classes="placeholder-gray-1900 placeholder-opacity-50
                  text-gray-1900"
      :processing="processing"
      @countryCode="countryCode"
      @submit="submitPhone"
    ></phone-number-input>
  </div>
</template>

<script>
import phoneNumberInput from '~/components/inputs/PhoneNumberInput'
export default {
  name: 'ContactNumber',
  components: { phoneNumberInput },
  props: {
    processing: {
      type: Boolean,
      default: false,
    },
    sendCode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phone: '',
      country: '+1',
    }
  },
  watch: {
    sendCode(data) {
      if (data) {
        this.submitPhone()
      }
    },
  },
  methods: {
    countryCode(code) {
      this.country = code
    },
    submitPhone() {
      this.$emit('phoneAndCountry', {
        phone: this.phone,
        countryCode: this.country,
      })
    },
  },
}
</script>