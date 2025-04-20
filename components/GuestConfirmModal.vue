<template>
  <transition name="modal">
    <div
      v-if="!acceptTerm"
      class="
        close_account
        z-9999
        top-0
        fixed
        inset-0
        h-full
        flex
        items-center
        justify-center
      "
    >
      <div
        class="
          w-100-minues
          md:h-48
          h-38
          bg-dark-100
          shadow-md
          rounded-2xl
          flex flex-col
          items-center
          justify-center
          p-4
          md:space-y-10
          space-y-4
        "
      >
        <div class="form-group">
          <label class="inline-flex">
            <input
              v-model="termAccepted"
              type="checkbox"
              class="
                form-checkbox
                md:w-6 md:h-6
                w-5
                h-5
                text-orange-midlight
                mt-1
              "
            />
            <span
              class="
                ml-2
                md:text-lg
                text-md
                md:text-left
                text-center text-white
              "
              >Accept
              <n-link
                class="underline font-bold"
                to="/subuser-terms-of-service"
                rel="noopener noreferrer"
                target="_blank"
                >Sub-User Terms of Service</n-link
              >
              and
              <n-link
                class="underline font-bold"
                to="/subuser-privacypolicy"
                rel="noopener noreferrer"
                target="_blank"
                >Sub-User Privacy Policy</n-link
              ></span
            >
          </label>
        </div>
        <button
          class="
            w-44
            h-10
            text-white
            bg-orange-dark
            rounded-full
            border-none
            outline-none
            font-medium
          "
          :disabled="progress"
          @click="acceptTermAndPolicy()"
        >
          <span>Submit</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { CHECK_GUEST_REQUEST } from '~/constants/urls'
export default {
  name: 'GuestConfirmModal',
  props: {
    acceptTerm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      token: this.$route.params.token,
      termAccepted: false,
      progress: false,
    }
  },
  methods: {
    async acceptTermAndPolicy() {
      if (this.termAccepted) {
        try {
          this.progress = true
          const response = await this.$axios.$put(CHECK_GUEST_REQUEST, {
            token: this.token,
            acceptTerm: this.termAccepted,
          })
          if (response.success) {
            this.$emit('checked-checkbox')
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.progress = false
        }
      } else {
        this.$toast.clear()
        this.$toast.error(
          'Please Accept Sub-User Terms of Service and Sub-User Privacy Policy',
          {
            className: ['toasted-bg-alert'],
          }
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.w-100-minues {
  @apply w-103;
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
</style>
