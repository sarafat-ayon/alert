<template>
  <div
    class="
      h-full
      z-100
      fixed
      payment
      top-0
      right-0
      bg-dark-100
      md:p-21
      p-4
      md:pt-12
      transition-all
      duration-800
      ease-in-out
      scroll
      md:rounded-l-2xl
    "
    :class="showChangeBilling ? 'show md:shadow-2xl' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <transition name="fadeIn">
        <div v-if="showPaymentOption" class="w-full">
          <div class="flex flex-row justify-between items-center">
            <h2
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                md:font-bold
              "
            >
              Payment Option
            </h2>
            <div
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="closeChangeBilling()"
            >
              <fa
                class="
                  text-yellow-midlight
                  xl:text-2xl
                  md:text-xl
                  text-2xl
                  md:font-bold
                  font-normal
                "
                :icon="['fas', 'times']"
              />
            </div>
          </div>

          <div class="flex flex-col space-y-4">
            <div class="flex flex-col w-full h-full mt-6">
              <!-- <div class="card-header">
                <h3>Billing Address</h3>
              </div> -->
              <input
                id="autoComplete"
                ref="origin"
                v-model="billingAddress"
                class="
                  billing_address
                  outline-none
                  px-4
                  rounded-full
                  bg-white
                  w-full
                  h-10
                  font-normal
                  text-ash-1200
                  placeholder-gray-1800
                "
                type="text"
                placeHolder="Billing Address"
                @blur="$v.billingAddress.$touch()"
              />
              <template v-if="$v.billingAddress.$error">
                <p class="text-red-400 text-xs mb-0 pl-2">
                  {{ validationMsg($v.billingAddress) }}
                </p>
              </template>

              <!-- <div class="flex flex-row justify-between">
                <p class="md:text-lg text-base text-gray-1100 float-left pt-5">
                  Save as default payment method
                </p>
    
                <div
                  class="
                    md:w-37
                    w-28
                    md:h-10
                    h-8
                    mt-4
                    relative
                    float-right
                    rounded-full
                    yes_no
                  "
                >
                  <input
                    v-model="isDefault"
                    type="checkbox"
                    class="checkbox h-full"
                    @click="toggle"
                  />
                  <div :class="checked ? 'yes' : 'yes1'">Yes</div>
                  <div :class="!checked ? 'no' : 'no1'">No</div>
                  <div :class="checked ? 'text' : 'text1'"></div>
                </div>
              </div> -->
            </div>

            <!-- <div class="flex flex-row justify-between items-center">
              <h2
                class="
                  text-yellow-midlight
                  xl:text-2xl
                  md:text-xl
                  text-2xl
                  md:font-bold
                "
              >
                Billing Information
              </h2>
              <div
                class="w-8 h-8 flex items-center justify-end cursor-pointer"
                @click="closeBillingWithCreditCard()"
              >
                <fa
                  class="
                    text-yellow-midlight
                    xl:text-2xl
                    md:text-xl
                    text-2xl
                    md:font-bold
                    font-normal
                  "
                  :icon="['fas', 'times']"
                />
              </div>
            </div> -->
            <!-- <div
              class="
                tab
                cursor-pointer
                rounded-full
                text-center
                mt-10
                md:px-4
                px-3
                pb-2
                pt-2.5
                bg-white
                h-12
                w-full
              "
              @click="selectPaymentOption('PayWithCreditCard')"
            >
              <span
                class="pointer-events-none text-lg font-bold text-gray-600"
                >Credit Card</span
              >
            </div> -->

            <client-only id="card-payment">
              <stripe-element-card
                ref="checkoutRef"
                class="h-10"
                :pk="$config.stripeKey"
                :hide-postal-code="true"
                @token="tokenCreate"
                @error="getError"
              >
              </stripe-element-card>
            </client-only>

            <div
              v-if="hideText($config.workflow)"
              class="
                tab
                cursor-pointer
                rounded-full
                text-center
                md:px-4
                px-3
                pb-2
                pt-2.5
                bg-white
                h-12
                w-full
              "
              @click="selectPaymentOption('ACHDebitCard')"
            >
              <span class="pointer-events-none text-lg font-bold text-gray-600"
                >ACH Direct Debit</span
              >
            </div>

            <div
              class="
                tab
                cursor-pointer
                rounded-full
                text-center
                h-12
                w-full
                relative
                bg-white
                overflow-hidden
              "
              @click="selectPaymentOption('PayWithPayPal')"
            >
              <PayPalIcon />
            </div>

            <div v-if="hideText($config.workflow)">
              <GooglePay
                total-price="100"
                @loaded="loadeded"
                @loadedError="loadedError"
                @paymentError="paymentError"
                @paymentSuccess="paymentSuccess"
              />
            </div>

            <!-- <div class="flex flex-row justify-between">
              <p class="md:text-lg text-base text-gray-1100 float-left pt-5">
                Save as default payment method
              </p>

              <div
                class="
                  md:w-37
                  w-28
                  md:h-10
                  h-8
                  mt-4
                  relative
                  float-right
                  rounded-full
                  yes_no
                "
              >
                <input
                  v-model="isDefault"
                  type="checkbox"
                  class="checkbox h-full"
                  @click="toggle"
                />
                <div :class="checked ? 'yes' : 'yes1'">Yes</div>
                <div :class="!checked ? 'no' : 'no1'">No</div>
                <div :class="checked ? 'text' : 'text1'"></div>
              </div>
            </div> -->
          </div>
        </div>
      </transition>
      <transition name="fadeIn">
        <div v-if="billingWithCreditCard" class="w-full">
          <div class="flex flex-row justify-between items-center">
            <h2
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                md:font-bold
              "
            >
              Billing Information
            </h2>
            <div
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="closeBillingWithCreditCard()"
            >
              <fa
                class="
                  text-yellow-midlight
                  xl:text-2xl
                  md:text-xl
                  text-2xl
                  md:font-bold
                  font-normal
                "
                :icon="['fas', 'times']"
              />
            </div>
          </div>

          <div class="flex flex-col w-full h-full mt-6">
            <client-only id="card-payment">
              <stripe-element-card
                ref="checkoutRef"
                class="h-20"
                :pk="$config.stripeKey"
                :hide-postal-code="true"
                @token="tokenCreate"
                @error="getError"
              >
              </stripe-element-card>
            </client-only>
            <div class="card-header">
              <h3>Billing Address</h3>
            </div>
            <input
              id="autoComplete"
              ref="origin"
              v-model="billingAddress"
              class="
                billing_address
                outline-none
                px-4
                rounded-full
                bg-white
                w-full
                h-10
                font-normal
                text-ash-1200
                placeholder-gray-1800
              "
              type="text"
              placeHolder="Billing Address"
              @blur="$v.billingAddress.$touch()"
            />
            <template v-if="$v.billingAddress.$error">
              <p class="text-red-400 text-xs mb-0 pl-2">
                {{ validationMsg($v.billingAddress) }}
              </p>
            </template>
  
            <!-- <div class="flex flex-row justify-between">
              <p class="md:text-lg text-base text-gray-1100 float-left pt-5">
                Save as default payment method
              </p>

              <div
                class="
                  md:w-37
                  w-28
                  md:h-10
                  h-8
                  mt-4
                  relative
                  float-right
                  rounded-full
                  yes_no
                "
              >
                <input
                  v-model="isDefault"
                  type="checkbox"
                  class="checkbox h-full"
                  @click="toggle"
                />
                <div :class="checked ? 'yes' : 'yes1'">Yes</div>
                <div :class="!checked ? 'no' : 'no1'">No</div>
                <div :class="checked ? 'text' : 'text1'"></div>
              </div>
            </div> -->
          </div>
        </div>
      </transition>

      <!-- v-if="!showPaymentOption" -->
      <div class="w-full text-center md:mt-0 mt-14 md:pb-0 pb-4">
        <button
          class="
            w-44
            py-2
            text-white
            bg-yellow-midlight
            rounded-full
            border-none
            outline-none
            font-bold
            setup
            md:text-md
            text-lg
          "
          :disabled="addProcess"
          @click="checkout"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span>Update</span>
            <fa
              v-if="addProcess"
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
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions, mapGetters } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import { CARDINFO, PAYPAL_PAYMENT } from '~/constants/urls'
import { useHideText } from '~/composables/feeds/useHideText'
import PayPalIcon from '~/components/shared/icon/PayPalIcon.vue'
import GooglePay from '~/components/setup/account/GooglePay.vue'
export default defineComponent({
  name: 'BillingInfoSidebar',
  components: { PayPalIcon, GooglePay },
  props: {
    showNewCard: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { hideText } = useHideText()

    return {
      hideText,
    }
  },
  data() {
    return {
      checked: false,
      isDefault: false,
      newCardInfo: false,
      addProcess: false,
      showPaymentOption: true,
      billingWithCreditCard: false,
      billingAddress: '',
      autoComplete: '',
      defaultTimeZone: 'America/New_York',
      lat: '',
      long: '',
    }
  },
  computed: {
    ...mapGetters('feeds', ['getStorageInfo', 'getArchiveFeeds']),
    ...mapGetters('user', ['getUserInfo']),
    showChangeBilling() {
      return this.$store.getters['mobile/header/getPayment']
    },
  },
  watch: {
    showChangeBilling(data) {
      this.$refs.checkoutRef.clear()
      this.billingAddress = ''
      if (data) {
        this.addProcess = false
        this.$v.$reset()
      }
    },
  },
  validations: {
    billingAddress: {
      required,
      maxLength: maxLength(60),
    },
  },
  mounted() {
    const originAutocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.origin,
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(43.0, -75.0)
        ),
      }
    )
    originAutocomplete.addListener('place_changed', () => {
      this.lat = originAutocomplete.getPlace().geometry.viewport.Ab.g
      this.long = originAutocomplete.getPlace().geometry.viewport.Ra.g
      this.getTimeZone()
    })
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    loadeded(data) {
      console.log('loaded: ', data)
    },
    loadedError(data) {
      console.log('loadedError: ', data)
    },
    paymentError(data) {
      console.log('paymentError: ', data)
    },
    paymentSuccess(data) {
      console.log('paymentSuccess: ', data)
    },
    async selectPaymentOption(currentPayMethod) {
      const inputValue = document.getElementById('autoComplete')
      // inputValue.focus()
      this.billingAddress = inputValue.value
      // if (currentPayMethod === 'PayWithCreditCard') {
      //   this.showPaymentOption = false
      //   setTimeout(() => {
      //     this.billingWithCreditCard = true
      //   }, 500)
      // } else
      if (currentPayMethod === 'PayWithPayPal') {
        this.$store.commit('setting/SET_BILLING_INFO', false)
        try {
          const { success, url, message } = await this.$axios.$post(
            PAYPAL_PAYMENT,
            {
              address: inputValue.value,
              successUrl: `${this.$config.appURL}/settings#account/?success`,
              cancelUrl: `${this.$config.appURL}/settings#account/?cancel`,
              failedUrl: `${this.$config.appURL}/settings#account/?failed`,
            }
          )
          if (success) {
            window.location.href = url
          } else {
            this.$toast.error(message)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getTimeZone() {
      const currentUnixTimestap = ~~(+new Date() / 1000)
      const response = await this.$axios.$get(
        `maps/api/timezone/json?location=${this.lat}%2C${this.long}&timestamp=${currentUnixTimestap}&key=${this.$config.googleMapKey}`
      )
      if (response) {
        this.defaultTimeZone = response.timeZoneId
      }
    },
    ...mapActions('user', ['setNewUserToken']),
    check() {
      if (!this.addProcess && this.showChangeBilling) {
        this.$refs.checkoutRef.submit()
      }
    },
    checkout() {
      const inputValue = document.getElementById('autoComplete')
      inputValue.focus()
      this.billingAddress = inputValue.value
      if (!this.addProcess) {
        this.$refs.checkoutRef.submit()
        this.addProcess = true
      }
      setTimeout(() => {
        this.billingWithCreditCard = false
        this.billingWithCreditCard = false
        this.showPaymentOption = true
        this.hideBlog()
      }, 5000)
    },
    getError(payload) {
      if (payload.message) {
        document
          .getElementById('stripe-element-errors')
          .style.setProperty('color', '#F87171', 'important')
        this.addProcess = false
      }
    },
    tokenCreate(token) {
      if (
        !this.billingAddress &&
        token.card.address_country &&
        token.card.address_state &&
        token.card.address_city &&
        token.card.country &&
        token.card.address_zip
      ) {
        this.billingAddress =
          token.card.address_country +
          ', ' +
          token.card.address_state +
          ', ' +
          token.card.address_city +
          ', ' +
          token.card.country +
          ', ' +
          token.card.address_zip
      }
      this.$toast.clear()
      if (
        token &&
        this.billingAddress &&
        !this.validationMsg(this.$v.billingAddress)
      ) {
        this.addProcess = true
        this.$axios
          .post(CARDINFO, {
            token: token?.id,
            address: this.billingAddress,
            isDefault: this.isDefault,
            defaultTimeZone: this.defaultTimeZone,
          })
          .then((res) => {
            if (res.data.success) {
              this.addProcess = false

              this.$toast.success(res.data.message, {
                className: ['toasted-bg-archive'],
              })
              this.$store.dispatch('mobile/header/setCard')
              this.$emit('new-card-info')
              this.closeChangeBilling()
            } else {
              this.addProcess = false
              this.$toast.error(res.data.message, {
                className: ['toasted-bg-alert'],
              })
            }
          })
      } else {
        this.addProcess = false
      }
    },
    closeChangeBilling() {
      this.hideOverlay()
      this.$store.dispatch('mobile/header/removePayment')
      this.addProcess = false
      this.$refs.checkoutRef.clear()
      this.billingAddress = ''
      this.$v.$reset()
    },
    closeBillingWithCreditCard() {
      this.billingWithCreditCard = false
      setTimeout(() => {
        this.showPaymentOption = true
      }, 500)
      this.hideOverlay()
      this.addProcess = false
      this.$refs.checkoutRef.clear()
      this.billingAddress = ''
      this.$v.$reset()
    },
    hideBlog() {
      this.billingAddress = ''
      this.hideOverlay()
      this.$emit('close-new-card')
      this.$store.dispatch('mobile/header/removeCard')
      this.$v.$reset()
    },
    toggle() {
      this.checked = !this.checked
    },
    hideOverlay() {
      this.$store.dispatch('mobile/header/removeOverlay')
    },
  },
})
</script>

<style lang="scss" scoped>
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}
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
  z-index: 999;
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
  scrollbar-color: #99762e #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #99762e;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #99762e;
  }
}
.card-header {
  @apply w-full md:mb-4 mb-4 text-yellow-midlight font-bold;
}
.billing_address {
  box-shadow: 0 1px 3px 0 #e6ebf1;
}
@media (max-width: 767px) {
  .payment {
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
</style>