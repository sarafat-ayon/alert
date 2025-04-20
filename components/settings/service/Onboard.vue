<template>
  <div class="h-full">
    <div class="flex flex-col h-full mt-4 w-full">
      <p class="text-white md:text-md text-sm">
        Send User Trough Onboarding Process
      </p>
      <div class="w-full flex items-center relative md:mt-3 mt-1">
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="User Email"
          class="
            text-yellow-midlight
            w-full
            rounded-full
            py-1
            px-2.5
            outline-none
            focus:outline-none
            bg-white
            border-b border-white
            placeholder-yellow-midlight placeholder-opacity-50
          "
          @blur="$v.email.$touch()"
        />
      </div>
      <template v-if="$v.email.$error">
        <p v-if="!$v.email.required" class="text-red-500 text-xs">
          Email is Required
        </p>
        <p
          v-else-if="!$v.email.email || !errorEmail"
          class="text-red-500 text-xs"
        >
          Email is Invalid
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { SEND_ACCESS_REQUEST } from '~/constants/urls'
export default {
  props: {
    clear: {
      type: Boolean,
    },
    accessRequest: {
      type: Boolean,
      default: false,
    },
    clearOnBoardField: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  watch: {
    clear(data) {
      if (data === true) {
        this.clearField()
      }
    },
    accessRequest(data) {
      if (data) {
        this.submitToEmailAccess()
      }
    },
    clearOnBoardField(data) {
      if (data) {
        this.clearField()
        this.$emit('clearOnBoardAllFieldSetDefault', false)
      }
    },
  },
  methods: {
    clearField() {
      this.email = ''
      this.$v.$reset()
      this.$emit('clear-field')
    },
    async submitToEmailAccess() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$toast.clear()
        try {
          const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
            email: this.email,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.clearField()
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
      setTimeout(() => {
        this.$emit('onBoardTriggered', false)
      }, 500)
    },
  },
}
</script>
