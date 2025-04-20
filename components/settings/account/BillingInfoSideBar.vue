<template>
  <div
    class="h-full z-100 absolute payment top-0 right-0 bg-dark-100 md:p-21 p-4 md:pt-12 transition-all duration-800 ease-in-out scroll md:rounded-l-2xl"
    :class="changeBillingInfo ? 'show md:shadow-2xl' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full">
        <div class="flex flex-row justify-between items-center">
          <h2
            class="text-yellow-midlight xl:text-2xl md:text-xl text-2xl md:font-bold"
          >Change Billing Information</h2>
          <div
            class="w-8 h-8 flex items-center justify-end cursor-pointer"
            @click="
              $emit('closeInvoiceSidebar', false), hideOverlay(), hideBlog()
            "
          >
            <fa
              class="text-yellow-midlight xl:text-2xl md:text-xl text-2xl md:font-bold font-normal"
              :icon="['fas', 'times']"
            />
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <div class="mt-5 mb-2">
            <label v-if="storeCardInfo.brand !== 'PayPal'"
              class="block font-normal md:text-xl text-md text-gray-1100"
              for="holder_name"
            >Credit Card Name</label>
            <label v-else
              class="block font-normal md:text-xl text-md text-gray-1100"
              for="holder_name"
            >Name</label>
            <input
              id="holder_name"
              v-model="creditCardName"
              class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
              type="text"
              name="holdername"
              placeholder="Mr John Smith"
              @blur="$v.creditCardName.$touch()"
            />
            <template v-if="$v.creditCardName.$error">
              <p class="text-red-500 text-xs mb-0 pl-2">{{ validationMsg($v.creditCardName) }}</p>
            </template>
          </div>
          <div
            v-if="storeCardInfo.brand !== 'PayPal'"
            class="flex flex-row gap-2 justify-around mb-2"
          >
            <div class="w-full">
              <label
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="card_number"
              >Expiration</label>
              <input
                id="expire_date"
                v-model="expDate"
                v-cardformat:formatCardExpiry
                maxlength="9"
                class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type
                name="expiredate"
                placeholder="03/2024"
              />
            </div>
          </div>
          <div class="mb-2">
            <label
              class="block font-normal md:text-xl text-md text-gray-1100"
              for="addressLine1"
            >Address Line1</label>
            <input
              id="addressLine1"
              v-model="storeCardInfo.addressLine1"
              class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
              type="text"
              name="holdername"
              placeholder="Street address/PO Box/Company name"
              @blur="$v.storeCardInfo.addressLine1.$touch()"
            />
            <template v-if="$v.storeCardInfo.addressLine1.$error">
              <p
                class="text-red-500 text-xs mb-0 pl-2"
              >{{ validationMsg($v.storeCardInfo.addressLine1) }}</p>
            </template>
          </div>
          <div class="mb-2">
            <label
              class="block font-normal md:text-xl text-md text-gray-1100"
              for="addressLine2"
            >Address Line2</label>
            <input
              id="addressLine2"
              v-model="storeCardInfo.addressLine2"
              class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
              type="text"
              name="holdername"
              placeholder="Apartment/Suite/Unit/Building"
              @blur="$v.storeCardInfo.addressLine2.$touch()"
            />
            <template v-if="$v.storeCardInfo.addressLine2.$error">
              <p
                class="text-red-500 text-xs mb-0 pl-2"
              >{{ validationMsg($v.storeCardInfo.addressLine2) }}</p>
            </template>
          </div>
          <div class="flex flex-row space-x-2 justify-around mb-2">
            <div class="w-1/2">
              <label
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="addressCity"
              >City</label>
              <input
                id="addressCity"
                v-model="storeCardInfo.addressCity"
                class="w-full h-9 mt-1 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type
                name="addressCity"
                placeholder="City/District/Suburb"
                @keydown="preventSpecialCharacter($event)"
                @blur="$v.storeCardInfo.addressCity.$touch()"
              />
              <template v-if="$v.storeCardInfo.addressCity.$error">
                <p
                  class="text-red-500 text-xs mb-0 pl-2"
                >{{ validationMsg($v.storeCardInfo.addressCity) }}</p>
              </template>
            </div>
            <div class="w-1/2">
              <label class="block font-normal md:text-xl text-md text-gray-1100" for="State">State</label>
              <input
                id="state"
                v-model="storeCardInfo.addressState"
                class="w-full h-9 mt-1 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type
                name="State"
                placeholder="State/Country/Province"
                @blur="$v.storeCardInfo.addressState.$touch()"
              />
              <template v-if="$v.storeCardInfo.addressState.$error">
                <p
                  class="text-red-500 text-xs mb-0 pl-2"
                >{{ validationMsg($v.storeCardInfo.addressState) }}</p>
              </template>
            </div>
          </div>
          <div class="mb-2">
            <label
              class="block font-normal md:text-xl text-md text-gray-1100"
              for="addressLine2"
            >Country</label>
            <input
              id="addressCountry"
              v-model="storeCardInfo.addressCountry"
              class="w-full h-10 mt-1.5 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
              type="text"
              name="addressCountry"
              placeholder="Address Country"
              @blur="$v.storeCardInfo.addressCountry.$touch()"
            />
            <template v-if="$v.storeCardInfo.addressCountry.$error">
              <p
                class="text-red-500 text-xs mb-0 pl-2"
              >{{ validationMsg($v.storeCardInfo.addressCountry) }}</p>
            </template>
          </div>
          <div class="flex flex-row justify-start mb-5">
            <div class="w-1/2">
              <label
                class="block font-normal md:text-xl text-md text-gray-1100"
                for="addressZip"
              >Zip Code</label>
              <input
                id="addressZip"
                v-model="storeCardInfo.addressZip"
                class="w-full h-9 mt-1 md:text-lg text-base outline-none px-5 rounded-full placeholder-gray-1200 placeholder-opacity-50 text-gray-1200"
                type="text"
                name="addressZip"
                placeholder="ZIP or postal code"
                @blur="$v.storeCardInfo.addressZip.$touch()"
              />
              <template v-if="$v.storeCardInfo.addressZip.$error">
                <p
                  v-if="
                    !$v.storeCardInfo.addressZip.minLength ||
                    !$v.storeCardInfo.addressZip.maxLength ||
                    !$v.storeCardInfo.addressZip.numeric
                  "
                  class="text-red-600 text-xs"
                >ZipCode is invalid!</p>
              </template>
            </div>
          </div>
          <div class>
            <label class="inline-flex items-center">
              <input
                v-model="acceptTerms"
                type="checkbox"
                class="form-checkbox w-5 h-5 text-yellow-midlight"
              />
              <span class="ml-2 text-md text-white">
                Accept
                <n-link
                  class="underline font-bold"
                  to="/terms-of-service"
                  rel="noopener noreferrer"
                  target="_blank"
                >Terms of Service</n-link>and
                <n-link
                  class="underline font-bold"
                  to="/privacy-policy"
                  rel="noopener noreferrer"
                  target="_blank"
                >Privacy Policy</n-link>
              </span>
            </label>
          </div>

          <div class="flex flex-row justify-between">
            <p
              class="md:text-lg text-base text-gray-1100 float-left pt-5"
            >Save as default payment method</p>

            <div class="md:w-37 w-28 md:h-10 h-8 mt-4 relative float-right rounded-full yes_no">
              <input
                v-model="storeCardInfo.isDefault"
                type="checkbox"
                class="checkbox h-full"
                @click="toggle"
              />
              <div :class="checked ? 'yes' : 'yes1'">Yes</div>
              <div :class="!checked ? 'no' : 'no1'">No</div>
              <div :class="checked ? 'text' : 'text1'"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full text-center md:mt-0 mt-14 md:pb-0 pb-4 save-button">
        <button
          class="w-44 py-2 text-white bg-yellow-midlight rounded-full border-none outline-none font-bold setup md:text-md text-lg"
          :disabled="saveProcess"
          @click="storeCardInfo.brand !== 'PayPal' ? orderButton() : orderWithPayPal()"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span>Save</span>
            <fa
              v-if="saveProcess"
              class="absolute right-5 text-white font-bold animate-spin"
              :icon="['fas', 'spinner']"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import {
  validationMessages,
  countryFirstTwoCharacter,
} from '@/utils/validations'
import { CARDINFO, PAYMENT_METHOD, PAYPAL_PAYMENT } from '~/constants/urls'

export default {
  name: 'BillingInfoSidebar',
  props: {
    selectedBillingInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      checked: false,
      googleOption: false,
      paypalOption: true,
      appleOption: false,
      paymentButtonTransition: false,
      paymentFormTransition: false,
      storeCardInfo: {},
      defaultInfo: {},
      creditCardName: '',
      hide: false,
      expDate: '',
      acceptTerms: true,
      saveProcess: false,
    }
  },
  computed: {
    ...mapState('setting', ['changeBillingInfo']),
    ...mapState('setting', ['currentComponent', 'showInvoice']),
    showChangeBilling() {
      return this.$store.getters['mobile/header/getPayment']
    },
  },
  validations: {
    creditCardName: {
      required,
      maxLength: maxLength(40),
    },
    storeCardInfo: {
      // name: {
      //   required,
      //   maxLength: maxLength(40),
      // },
      addressLine1: {
        required,
        maxLength: maxLength(30),
      },
      addressLine2: {
        maxLength: maxLength(30),
      },
      addressCountry: {
        maxLength: maxLength(30),
        countryFirstTwoCharacter,
      },
      addressCity: {
        maxLength: maxLength(30),
      },
      addressState: {
        maxLength: maxLength(30),
      },
      addressZip: {
        minLength: minLength(4),
        maxLength: maxLength(6),
        numeric,
      },
    },
  },
  watch: {
    selectedBillingInfo(data) {
      if (data) {
        this.getSingleInfo()
        this.acceptTerms = true
        /* this.storeCardInfo = data
        this.creditCardName = this.storeCardInfo.name
        this.expDate =
        this.storeCardInfo.expMonth + ' / ' + this.storeCardInfo.expYear */
      }
    },
    showChangeBilling(data) {
      if (data) {
        this.$v.$reset()
      }
    },
    changeBillingInfo(data) {
      if (this.showChangeBilling) {
        this.$store.dispatch('mobile/header/removePayment')
      }
      if (this.showInvoice) {
        this.$store.commit('setting/SET_SHOW_INVOICE', false)
      }
      setTimeout(() => {
        if (data) {
          this.getSingleInfo()
        }
      }, 1000)
    },
  },
  methods: {
    preventSpecialCharacter(e) {
      if (/^\W$/.test(e.key) && e.key !== ' ') {
        e.preventDefault()
      }
    },
    validationMsg: validationMessage(validationMessages),
    setExpDate(data) {
      this.storeCardInfo.expMonth = data.substring(0, 2)
      this.storeCardInfo.expYear = data.slice(-4)
    },
    hideBlog() {
      this.storeCardInfo = Object.assign({}, this.defaultInfo)
      this.$emit('close-billing-info')
      this.$v.$reset()
    },
    toggle() {
      this.checked = !this.checked
    },
    googlePay() {
      this.googleOption = true
      this.paypalOption = false
      this.appleOption = false
    },
    paypalPay() {
      this.paypalOption = true
      this.googleOption = false
      this.appleOption = false
    },
    applePay() {
      this.appleOption = true
      this.googleOption = false
      this.paypalOption = false
    },
    async getSingleInfo() {
      try {
        const response = await this.$axios.$get(PAYMENT_METHOD)
        if (response.success) {
          response.data.forEach((item) => {
            if (item.id === this.selectedBillingInfo.id) {
              this.checked = this.storeCardInfo.isDefault
              this.storeCardInfo = item
              this.creditCardName = this.storeCardInfo.name
              this.expDate =
                this.storeCardInfo.expMonth + ' / ' + this.storeCardInfo.expYear
              this.defaultInfo = Object.assign({}, this.storeCardInfo)

              if (this.expDate.length === 8) {
                this.expDate = '0' + this.expDate
              }
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async orderButton() {
      this.$toast.clear()
      if (!this.acceptTerms) {
        this.$toast.error('Please Accept Terms of Service and Privacy Policy', {
          className: ['toasted-bg-alert'],
        })
        return false
      }
      const CLOSE_INVOICE_SIDEBAR = 'closeInvoiceSidebar'
      const checkString = this.expDate.substring(1, 2)
      this.$v.$touch()
      if (!this.$v.$invalid && checkString !== ' ' && checkString !== '/') {
        try {
          this.saveProcess = true
          this.setExpDate(this.expDate)
          this.storeCardInfo.name = this.creditCardName
          this.storeCardInfo.isOwner = true
          const response = await this.$axios.$put(CARDINFO, this.storeCardInfo)
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.defaultInfo = Object.assign({}, response.data)
            this.$emit(CLOSE_INVOICE_SIDEBAR, false)
            this.status = 'true'
            this.$emit('update-billing-info', response.data)
            this.hideBlog()
            this.hideOverlay()
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.saveProcess = false
        } catch (err) {
          this.saveProcess = false
          console.log(err)
        }
      } else if ((checkString === ' ') | (checkString === '/')) {
        this.$toast.error('Please Enter two digit value for Expiration Month', {
          className: ['toasted-bg-alert'],
        })
      }
    },
    async orderWithPayPal() {
      this.$toast.clear()
      if (!this.acceptTerms) {
        this.$toast.error('Please Accept Terms of Service and Privacy Policy', {
          className: ['toasted-bg-alert'],
        })
        return false
      }
      const CLOSE_INVOICE_SIDEBAR = 'closeInvoiceSidebar'
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.saveProcess = true
          this.storeCardInfo.name = this.creditCardName
          this.storeCardInfo.isOwner = true
          const response = await this.$axios.$put(PAYPAL_PAYMENT, this.storeCardInfo)
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.defaultInfo = Object.assign({}, response.data)
            this.$emit(CLOSE_INVOICE_SIDEBAR, false)
            this.status = 'true'
            this.$emit('update-billing-info', response.data)
            this.hideBlog()
            this.hideOverlay()
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.saveProcess = false
        } catch (err) {
          this.saveProcess = false
        }
      }
    },
    hideOverlay() {
      this.$store.dispatch('mobile/header/removeOverlay')
      this.acceptTerms = true
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  @apply absolute top-0 left-0 w-full cursor-pointer z-100 opacity-0;
}

.yes_no {
  background-color: #fff;
}

.yes {
  height: 2.5rem;
  width: 75px;
  top: 0.2rem;
  @apply absolute left-0 rounded-full text-white font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.yes1 {
  height: 2.5rem;
  width: 75px;
  top: 0.2rem;
  @apply absolute left-0 rounded-full text-yellow-midlight font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.no {
  height: 2.5rem;
  width: 75px;
  left: 75px;
  top: 0.2rem;
  @apply absolute rounded-full text-white font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.no1 {
  height: 2.5rem;
  width: 75px;
  left: 75px;
  top: 0.2rem;
  @apply absolute rounded-full text-yellow-midlight font-bold text-center text-xl leading-8 z-10 transition-all duration-300 ease-in-out;
}

.text {
  height: 2.5rem;
  width: 75px;
  left: 0px;
  @apply absolute top-0 rounded-full bg-yellow-midlight text-white font-bold text-center text-xl leading-8 transition-all duration-300 ease-in-out;
}

.text1 {
  height: 2.5rem;
  width: 75px;
  left: 75px;
  @apply absolute top-0 rounded-full bg-yellow-midlight text-white font-medium text-center text-xl leading-8 transition-all duration-300 ease-in-out;
}

.payment {
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 9999;
}

.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
}

.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

.payment-method {
  margin: 20px 60px;
}

button:focus {
  outline: none;
  border: none;
}

.paybutton-leave-active {
  transition: opacity 3s;
}

.paybutton-leave-to {
  opacity: 0;
}

.paymentform-leave-active {
  transition: opacity 2s;
}

.paymentform-leave-to {
  opacity: 0;
}

.orderbutton-leave-active {
  transition: opacity 2s;
}

.orderbutton-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .payment {
    position: fixed;
    width: 100%;
    height: 85%;
    right: -100%;
    border-radius: 0 0 1.563rem 1.563rem;
  }

  .show {
    width: 100%;
    right: 0px;
  }

  .hide {
    width: 100%;
    right: -100%;
  }

  .yes_no {
    background-color: #fff;
  }

  .yes {
    height: 2rem;
    width: 62px;
    @apply absolute top-0 left-0 rounded-full text-white font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .yes1 {
    height: 2rem;
    width: 62px;
    @apply absolute top-0 left-0 rounded-full text-yellow-midlight font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .no {
    height: 2.25rem;
    width: 62px;
    left: 50px;
    @apply absolute top-0 rounded-full text-white font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .no1 {
    height: 2rem;
    width: 62px;
    left: 50px;
    @apply absolute top-0 rounded-full text-yellow-midlight font-bold text-center text-sm leading-8 z-10 transition-all duration-300 ease-in-out;
  }
  .text {
    height: 2rem;
    width: 62px;
    left: 0px;
    @apply absolute top-0 rounded-full bg-yellow-midlight text-white font-bold text-center text-sm leading-8 transition-all duration-300 ease-in-out;
  }
  .text1 {
    height: 2rem;
    width: 62px;
    left: 50px;
    @apply absolute top-0 rounded-full bg-yellow-midlight text-white font-bold text-center text-sm leading-8 transition-all duration-300 ease-in-out;
  }
}
@media (max-height: 850px) {
  .save-button {
    @apply mt-14 pb-4;
  }
}
</style>
