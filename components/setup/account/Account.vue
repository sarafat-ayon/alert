<template>
  <div class="setup-container" @keypress.enter="next()">
    <div class="card">
      <div class="card-header md:pb-5 pb-0.5">
        <h2 class="title">User Information</h2>
      </div>
      <div class="card-body scroll">
        <div class="row">
          <div class="col">
            <text-input
              id="first_name"
              v-model.trim="$v.account.firstName.$model"
              text-input="textInput"
              label="First Name"
              place-holder="John"
              name="firstname"
              color="#E4801D"
              :error="$v.account.firstName.$error"
              :error-message="validationMsg($v.account.firstName)"
            />
          </div>
          <div class="col">
            <text-input
              id="last_name"
              v-model.trim="$v.account.lastName.$model"
              text-input="textInput"
              label="Last Name"
              place-holder="Doe"
              name="lastname"
              color="#E4801D"
              :error="$v.account.lastName.$error"
              :error-message="validationMsg($v.account.lastName)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <email-input
              id="email"
              v-model="$v.account.email.$model"
              text-input="textInput"
              :error-message="validationMsg($v.account.email)"
              place-holder="john.doe@example.com"
              label="Email"
              color="#E4801D"
              :error="$v.account.email.$error"
              :email-exist="emailExist"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <password-input
              id="password"
              v-model="$v.account.password.$model"
              text-input="textInput"
              label="Password"
              place-holder
              name="reg_passwd__"
              auto-complete="new-password"
              color="#E4801D"
              :error="$v.account.password.$error"
              :error-message="validationMsg($v.account.password)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <text-input
              id="business_name"
              v-model="$v.account.businessName.$model"
              text-input="textInput"
              label="Business Name"
              place-holder
              color="#E4801D"
              :error="$v.account.businessName.$error"
              :error-message="validationMsg($v.account.businessName)"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <select-with-placeholder
              id="business_type"
              v-model="$v.account.businessType.$model"
              text-input="textInput"
              toggle-button="toggleButton"
              :options="businessTypes"
              place-holder="Select"
              :place-holder-disabled="true"
              opacity="0.5"
              label-color="text-yellow-primary"
              color="#ff9833"
              caret-bg="#fff"
              :error="$v.account.businessType.$error"
              :error-message="validationMsg($v.account.businessType)"
              caret-color="#d97706"
            ></select-with-placeholder>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label class="inline-flex">
                <input
                  v-model="account.termAccepted"
                  type="checkbox"
                  class="form-checkbox w-4 h-4 text-orange-midlight mt-1"
                />
                <span class="ml-2 text-md text-white">
                  Accept
                  <n-link
                    class="underline font-bold"
                    to="/terms-of-service"
                    rel="noopener noreferrer"
                    target="_blank"
                  >Terms of Service</n-link> and
                  <n-link
                    class="underline font-bold"
                    to="/privacy-policy"
                    rel="noopener noreferrer"
                    target="_blank"
                  >Privacy Policy</n-link>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="next card-footer" :class="{ 'modal-view': !isDesktop }">
      <v-btn background="#E4801D" color="#fff" :account-process="accountProcess" @click="next">
        <div class="rounded-full relative flex items-center justify-around">
          <span>Next</span>
          <fa
            v-if="accountProcess"
            class="absolute right-5 text-white font-bold animate-spin"
            :icon="['fas', 'spinner']"
          />
        </div>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { validationMessage } from 'vuelidate-messages'
import { mapActions, mapGetters, mapState } from 'vuex'
import VBtn from '../../inputs/VBtn.vue'
import TextInput from '../../inputs/TextInput.vue'
import EmailInput from '../../inputs/EmailInput.vue'
import PasswordInput from '../../inputs/PasswordInput.vue'
import SelectWithPlaceholder from '../../inputs/SelectWithPlaceholder.vue'
import {
  validationMessages,
  checkEmail,
  containsValidPassword,
  checkBusinessType,
} from '@/utils/validations'
import { REGISTER } from '~/constants/urls'

export default defineComponent({
  components: {
    VBtn,
    SelectWithPlaceholder,
    PasswordInput,
    EmailInput,
    TextInput,
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    return {
      isDesktop: breakpoints.greater('md'),
    }
  },
  data() {
    return {
      account: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        businessName: '',
        businessType: 'Select',
        termAccepted: false,
      },
      businessTypes: [
        { text: 'Financial Services', value: 'Financial Services' },
        { text: 'Healthcare', value: 'Healthcare' },
        { text: 'Education', value: 'Education' },
        { text: 'Government', value: 'Government' },
        { text: 'Other', value: 'Other' },
      ],
      invalide: true,
      emailExist: false,
      accountProcess: false,
    }
  },
  computed: {
    ...mapGetters('feeds', ['getStorageInfo', 'total', 'getArchiveFeeds']),
    ...mapState({
      starterMaximized: 'starterMaximized',
    }),
  },
  validations: {
    account: {
      firstName: {
        required,
        maxLength: maxLength(20),
      },
      lastName: {
        required,
        maxLength: maxLength(20),
      },
      password: {
        required,
        minLength: minLength(12),
        maxLength: maxLength(80),
        containsValidPassword,
      },
      email: {
        required,
        email,
        checkEmail,
      },
      businessName: {
        required,
        maxLength: maxLength(80),
      },
      businessType: {
        required,
        checkBusinessType,
      },
    },
  },
  methods: {
    validationMsg: validationMessage(validationMessages),

    ...mapActions('user', ['setNewUser']),
    ...mapActions('feeds', ['enableSecurity']),

    async next() {
      this.$toast.clear()
      if (!this.account.termAccepted) {
        this.$toast.error('Please Accept Terms of Service and Privacy Policy', {
          className: ['toasted-bg-alert'],
        })
        return
      }
      if (this.$v.$touch() || this.emailExist) return
      if (!this.$v.$invalid) {
        const isEmpty = Object.entries(this.account).filter(([k, v], i) => !v)
        if (!isEmpty.length) {
          try {
            this.accountProcess = true
            const res = await this.$axios.$post(REGISTER, this.account)
            if (res.success) {
              this.accountProcess = false
              const userData = res.data
              userData.password = this.account.password
              this.setNewUser(userData)
              this.$emit('next', 'security')
              this.enableSecurity()
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
          } catch (error) {
            console.log(error)
          } finally {
            this.accountProcess = false
          }
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.setup-container {
  @apply w-full h-full flex flex-col items-center justify-between md:relative overflow-auto scroll px-0 space-y-4;
  .card {
    height: 80% !important;
    width: 70%;
    max-height: 644px;
    max-width: 400px;
    @apply h-full my-0 m-auto md:px-3 px-2 md:py-7 py-4 mx-4 md:mx-auto text-left bg-yellow-primary rounded-2xl flex flex-col overflow-auto scroll;
    .card-header {
      @apply w-full md:px-4 px-2 text-white;
    }

    .card-body {
      max-height: 644px;
      @apply w-full flex-grow md:pl-4 md:pr-2 pl-2 pr-0.5 overflow-auto scroll;
      .row {
        @apply flex space-x-3;
        .col {
          @apply w-full lg:py-2 py-1.5;
        }
      }
    }

    .card-footer {
      min-height: 70px;
      @apply p-4 md:p-4 text-white;
    }
  }

  .next {
    min-height: 70px;
    @apply py-4 md:p-4 text-white;
    &.modal-view {
      transition: all 1s ease-in-out;
      @apply w-full bg-gray-800 rounded-tl-2xl rounded-tr-2xl;
    }
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 2s;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
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
@media (max-width: 767px) {
  .card {
    height: 80% !important;
    width: 90% !important;
    max-height: 644px;
    max-width: 400px;
  }
  .card-body {
    max-height: 550px !important;
    height: 100% !important;
  }
}

@media (min-height: 704px) and (max-height: 808px) and (min-width: 768px) {
  .card {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .card-header {
    padding-bottom: 8px !important;
  }
  .col {
    padding-top: 0px !important;
  }
}
@media (min-height: 540px) and (max-height: 703px) and (min-width: 768px) {
  .card {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .card-header {
    padding-bottom: 8px !important;
  }
  .col {
    padding-top: 0px !important;
  }
}
</style>
