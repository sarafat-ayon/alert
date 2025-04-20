<template>
  <div class="setup-container">
    <!-- <div class="h-full w-full flex flex-col justify-start items-center"> -->
    <div class="card">
      <div class="card-title text-white">
        <h2 class="title">Two-factor Authentication</h2>
      </div>
      <div class="card-body">
        <transition name="fadeIn" mode="out-in">
          <component
            :is="activeComponent"
            :message="verificationMsg"
            :status="verificationStatus"
            :send-code="sendPhoneCode"
            @next="activeComponent = $event"
            @verified="showVerificationMsg($event)"
          ></component>
        </transition>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import VBtn from '~/components/inputs/VBtn.vue'
import PhoneNumberInput from '~/components/setup/security/PhoneNumberInput.vue'
import EmailVerification from '~/components/setup/security/EmailVerification.vue'
import PhoneVerification from '~/components/setup/security/PhoneVerification.vue'
import VerificationMsg from '~/components/setup/security/VerificationMsg.vue'
import PhoneInput from '~/components/setup/security/PhoneInput.vue'
export default {
  components: {
    VBtn,
    PhoneInput,
    PhoneNumberInput,
    PhoneVerification,
    EmailVerification,
    VerificationMsg,
  },
  data() {
    return {
      activeComponent: 'email-verification',
      verificationMsg: '',
      verificationStatus: false,
      sendPhoneCode: false,
    }
  },

  methods: {
    showVerificationMsg($event) {
      this.verificationStatus = $event.status
      if ($event.type === 'email') {
        this.verificationMsg = $event.status
          ? 'Your Email has been successfully verified.'
          : 'We are sorry! Verification failed.'
        this.activeComponent = 'verification-msg'
        setTimeout(() => {
          // if verified then go to next step
          this.activeComponent = $event.status
            ? 'phone-number-input'
            : 'email-verification'
        }, 3000)
      } else {
        this.verificationMsg = $event.status
          ? 'Your Mobile number has been successfully verified.'
          : 'We are sorry! Verification failed.'
        this.activeComponent = 'verification-msg'
        setTimeout(() => {
          // if verified then go to next step
          // emit security step complete and go to payment step
          if ($event.status) {
            this.$emit('next', 'payment')
          } else {
            this.activeComponent = 'phone-verification'
          }
        }, 3000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.setup-container {
  @apply w-full h-full flex flex-col items-center justify-between relative overflow-y-auto overflow-x-hidden scroll px-0 md:pb-0 space-y-4;
  .card {
    height: 80% !important;
    width: 70%;
    max-height: 644px;
    max-width: 400px;
    @apply h-full md:p-7 p-4 mx-4 md:mx-auto text-left bg-yellow-primary rounded-2xl flex flex-col overflow-auto scroll;
    .card-header {
      @apply w-full text-white;
    }
    .card-body {
      max-height: 644px;
      @apply w-full flex-grow flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden scroll;
      .row {
        @apply flex;
        .col {
          @apply w-full p-2;
        }
      }
    }
    .card-footer {
      // min-height: 70px;
      @apply p-4 pt-0 text-white;
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
    min-height: 70px;
    @apply p-4 pt-0;
  }
}

.scroll {
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 1s ease-in-out;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
}
@media (max-width: 767px) {
  .card {
    height: 80% !important;
    width: 90% !important;
    max-height: 644px;
    max-width: 400px;
  }
}
</style>
