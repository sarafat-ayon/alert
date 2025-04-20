<template>
  <div class="email-verify text-center">
    <form action="" name="phone" class="phone-input" method="post">
      <vue-phone-number-input
        v-model="phone"
        default-country-code="US"
        :required="true"
        color="#E4801D"
        :translations="{
          countrySelectorLabel: '',
          countrySelectorError: '',
          phoneNumberLabel: '',
          example: 'Exemple :',
        }"
        :no-example="true"
        @update="getPhoneNumber($event)"
      />
    </form>
  </div>
</template>
<script>
import {PHONE_VERIFY} from "~/constants/urls";

export default {
  data() {
    return {
      phone: '',
    }
  },

  methods: {
    getPhoneNumber($event) {
      this.$axios
        .$post(PHONE_VERIFY, {
          phone: this.phone,
        })
        .then((res) => {
          if (!res.success) return
          this.$emit('verified', { status: res.success, type: 'phone' })
        })
      this.$emit('input', $event.formattedNumber)
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-input {
  @apply relative flex justify-center;
}
button {
  @apply text-white mt-2 outline-none border-none;
}
</style>
