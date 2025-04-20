<template>
  <div class="setup-container">
    <div
      v-if="$route.name !== 'payment'"
      class="fixed right-0 top-0 md:w-56 md:h-56 w-36 h-36 cursor-pointer"
      @click="activePromo"
    ></div>
    <transition name="paymentForm">
      <div v-if="!paymentFormTransition" class="card w-full overflow-hidden">
        <div class="paymentHeaderWrapper flex p-3">
          <div
            v-if="currentPayment === 'PayWithCreditCard'"
            class="
              backButtonInner
              flex
              justify-start
              items-center
              cursor-pointer
            "
            @click="paySystem"
          >
            <fa class="text-white" :icon="['fas', 'chevron-left']" />
          </div>
          <div
            class="flex-grow justify-center"
            :class="currentPayment !== 'PayWithCreditCard' ? 'ml-5' : 'ml-0'"
          >
            <AutomaticInvoice class="automaticInvoiceTab" />
          </div>
        </div>
        <transition name="paymentView" mode="out-in">
          <component
            :is="currentPayment"
            ref="childComponent"
            :pay-process="payProcess"
            @form-transition="paymentFormTransition = true"
            @button-transition="paymentButtonTransition = true"
            @pay-process="setPayProcess($event)"
            @hide="hideMenuBar($event)"
            @sliding="homeSliding($event)"
            @full-sliding="fullHomeSlider($event)"
          ></component>
        </transition>
      </div>
      <!-- <div v-if="!paymentFormTransition" class="card w-full overflow-hidden">
        <div class="card-body h-full scroll">
          <h3 class="mb-2">Billing Information</h3>
          <client-only id="card-payment">
            <div
              class="stripe-wrapper cursor-pointer z-10"
              @click="stripeWrapper"
            >
              <stripe-element-card
                ref="checkoutRef"
                class="h-14 z-9"
                :pk="$config.stripeKey"
                :hide-postal-code="true"
                :element-style="style"
                :icon-style="'solid'"
                @token="tokenCreated"
                @element-change="check"
                @error="getError"
              >
              </stripe-element-card>
            </div>
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
          />
          <template v-if="$v.billingAddress.$error">
            <p
              v-if="!$v.billingAddress.required"
              class="text-red-800 text-xs mb-0 pl-2 pt-0.5"
            >
              The field is required
            </p>
          </template>

          <div
            class="
              rounded-2xl
              w-full
              h-auto
              justify-center
              items-start
              flex
              py-4
            "
          >
            <transition name="paymentView" mode="out-in">
              <component :is="currentPayment"> </component>
            </transition>
          </div>
          <div
            v-if="showPromoField"
            class="
              w-full
              promo-height
              flex flex-col
              justify-center
              items-center
              fadeIn
            "
          >
            <div class="card-header text-center">
              <h3>Promo Code</h3>
            </div>
            <input
              id="promoCode"
              ref="ab"
              v-model="promoCode"
              class="
                text-center
                promo_code
                outline-none
                px-4
                rounded-full
                bg-white
                w-48
                h-10
                font-normal
                text-ash-1200
                placeholder-gray-1800
              "
              type="text"
              placeHolder="Promo Code"
            />
            <template v-if="$v.promoCode.$error">
              <p
                v-if="!$v.promoCode.required"
                class="text-red-800 text-xs mb-0 pl-2 pt-0.5"
              >
                The field is required
              </p>
            </template>
          </div>
          <div
            v-if="showApprovalField"
            class="
              w-full
              promo-height
              flex flex-col
              justify-center
              items-center
              fadeIn
            "
          >
            <div class="card-header text-center">
              <h3>Enter Your Purchase Order Approval Code</h3>
            </div>
            <input
              id="approvalCode"
              ref="ab"
              v-model="approvalCode"
              class="
                text-center
                promo_code
                outline-none
                px-4
                rounded-full
                bg-white
                w-48
                h-10
                font-normal
                text-ash-1200
                placeholder-gray-1800
              "
              type="text"
              placeHolder="Approval Code"
            />
            <template v-if="$v.approvalCode.$error">
              <p
                v-if="!$v.approvalCode.required"
                class="text-red-800 text-xs mb-0 pl-2 pt-0.5"
              >
                Approval Code Required
              </p>
            </template>
          </div>
        </div>

        <button
          v-if="!showPromo"
          class="
            w-52
            h-10
            text-orange-dark
            bg-white
            rounded-full
            px-3
            mb-5
            border-none
            outline-none
            self-center
            font-bold
            setup
          "
          :disabled="payProcess"
          @click="paySystem"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span v-if="!showApproval" class="fadeIn"
              >Pay By Purchase Order</span
            >
            <span v-if="showApproval" class="fadeIn">Pay By Credit Card</span>
          </div>
        </button>
      </div> -->
    </transition>
    <transition name="orderButton">
      <div
        v-if="!paymentButtonTransition"
        class="next"
        :class="{ 'modal-view': !isDesktop }"
      >
        <button
          class="
            w-44
            h-9
            text-white
            bg-orange-dark
            rounded-full
            mr-2.5
            border-none
            outline-none
            font-bold
            setup
          "
          :disabled="payProcess"
          @click="
            currentPayment === 'PayWithCreditCard' ||
            currentPayment === 'PayWithPromoCode' ||
            currentPayment === 'PaymentOption'
              ? $refs.childComponent.checkout()
              : $refs.childComponent.placeOrder()
          "
        >
          <div
            class="
              rounded-full
              relative
              flex
              items-center
              justify-around
              fadeIn
            "
          >
            <span v-if="currentPayment === 'PayWithCreditCard' || currentPayment === 'PaymentOption'" class="fadeIn"
              >Pay</span
            >
            <span
              v-else-if="currentPayment === 'PayWithPromoCode'"
              class="fadeIn"
              >Agree</span
            >
            <span
              v-else-if="currentPayment === 'PayWithApprovalCode'"
              class="fadeIn"
              >Order</span
            >
            <fa
              v-if="payProcess"
              class="absolute right-5 text-white font-bold animate-spin"
              :icon="['fas', 'spinner']"
            />
          </div>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { validationMessage } from 'vuelidate-messages'

import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
// import {
//   required,
//   minLength,
//   maxLength,
//   numeric,
// } from 'vuelidate/lib/validators'

import AutomaticInvoice from './AutomaticInvoice'
import PaymentOption from './PaymentOption'
import PayWithApprovalCode from './PayWithApprovalCode'
import PayWithPromoCode from './PayWithPromoCode'
import PayWithCreditCard from './PayWithCreditCard'
// import { validationMessages } from '@/utils/validations'
// import { CARDINFO, PURCHASE_ORDER } from '~/constants/urls'

export default defineComponent({
  components: {
    AutomaticInvoice,
    PaymentOption,
    PayWithApprovalCode,
    PayWithPromoCode,
    PayWithCreditCard,
  },
  setup() {
    const store = useStore()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    return {
      isDesktop: breakpoints.greater('md'),
      currentPayMethod: computed(() => store.state.home.currentPayMethod),
    }
  },
  data() {
    return {
      paymentButtonTransition: false,
      paymentFormTransition: false,
      // hideAccountTabMenu: false,
      // homeSlider: false,
      // fullHomeSlider: false,
      billingAddress: '',
      autoComplete: '',
      promoCode: '',
      approvalCode: '',
      defaultTimeZone: 'America/New_York',
      lat: '',
      long: '',
      payProcess: false,
      showPromo: false,
      showPromoField: false,
      showApproval: false,
      showApprovalField: false,
      style: {
        base: {
          iconColor: '#B0BCC8',
          '::placeholder': {
            color: '#B0BCC8',
          },
          ':disabled': {
            iconColor: '#ffffff',
            '::placeholder': {
              color: '#ffffff',
            },
          },
        },
      },
    }
  },
  computed: {
    //   ...mapGetters('feeds', ['getStorageInfo', 'getArchiveFeeds']),
    //   ...mapGetters('user', ['getUserInfo']),
    ...mapGetters(['currentPayment']),
  },
  watch: {
    // showApproval(data) {
    //   if (data) {
    //     setTimeout(() => {
    //       this.showApprovalField = true
    //     }, 500)
    //   } else {
    //     setTimeout(() => {
    //       this.showApprovalField = false
    //     }, 100)
    //   }
    // },
    // showPromo(data) {
    //   if (data) {
    //     setTimeout(() => {
    //       this.showPromoField = true
    //     }, 500)
    //   } else {
    //     setTimeout(() => {
    //       this.showPromoField = false
    //     }, 100)
    //   }
    // },
    // promoCode(data) {
    //   if (data) {
    //     const inputValue = document.getElementById('autoComplete')
    //     this.billingAddress = inputValue.value
    //   }
    // },
    // approvalCode(data) {
    //   if (data) {
    //     const inputValue = document.getElementById('autoComplete')
    //     this.billingAddress = inputValue.value
    //   }
    // },
  },
  // validations: {
  //   paymentInfo: {
  //     holderName: {
  //       required,
  //     },
  //     cardNumber: {
  //       required,
  //       maxLength: maxLength(19),
  //       minLength: minLength(19),
  //     },
  //     expireDate: {
  //       required,
  //       maxLength: maxLength(9),
  //       minLength: minLength(9),
  //     },
  //     cvv: {
  //       required,
  //       maxLength: maxLength(3),
  //       minLength: minLength(3),
  //       numeric,
  //     },
  //     billingAddress: {
  //       required,
  //       maxLength: maxLength(60),
  //     },
  //     city: {
  //       required,
  //     },
  //     zipCode: {
  //       required,
  //       minLength: minLength(4),
  //       maxLength: maxLength(5),
  //       numeric,
  //     },
  //   },
  //   billingAddress: {
  //     required,
  //     maxLength: maxLength(60),
  //   },
  //   promoCode: {
  //     required,
  //   },
  //   approvalCode: {
  //     required,
  //   },
  // },
  // mounted() {
  //   const originAutocomplete = new window.google.maps.places.Autocomplete(
  //     this.$refs.origin,
  //     {
  //       bounds: new window.google.maps.LatLngBounds(
  //         new window.google.maps.LatLng(43.0, -75.0)
  //       ),
  //     }
  //   )
  //   originAutocomplete.addListener('place_changed', () => {
  //     // this.lat = originAutocomplete.getPlace().geometry.viewport.Ab.g
  //     // this.long = originAutocomplete.getPlace().geometry.viewport.Ra.g
  //     // this.getTimeZone()
  //     this.billingAddress = originAutocomplete.getPlace().formatted_address
  //   })
  //   window.addEventListener('keyup', this.checkoutByEnterPress)
  //   setTimeout(() => {
  //     this.$refs.checkoutRef.focus()
  //   }, 2000)
  //   this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', PayWithCreditCard)
  // },
  // beforeDestroy() {
  //   window.removeEventListener('keyup', this.checkoutByEnterPress)
  // },
  methods: {
    setPayProcess($event) {
      this.payProcess = $event
    },
    hideMenuBar($event) {
      this.$emit('hide', $event)
    },
    homeSliding($event) {
      setTimeout(() => {
        this.$emit('sliding', $event)
      }, 4500)
    },
    fullHomeSlider($event) {
      setTimeout(() => {
        this.$emit('full-sliding', $event)
      }, 5300)
    },
    paySystem() {
      this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', 'PaymentOption')
    },
    // validationMsg: validationMessage(validationMessages),
    // async getTimeZone() {
    //   const currentUnixTimestap = ~~(+new Date() / 1000)
    //   const response = await this.$axios.$get(
    //     `maps/api/timezone/json?location=${this.lat}%2C${this.long}&timestamp=${currentUnixTimestap}&key=${this.$config.googleMapKey}`
    //   )
    //   if (response) {
    //     this.defaultTimeZone = response.timeZoneId
    //   }
    // },
    // ...mapActions('user', ['setNewUserToken']),
    // stripeWrapper() {
    //   if (this.showApproval) {
    //     this.showApproval = false
    //     this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', PayWithCreditCard)
    //     const error = document.getElementById('stripe-element-errors')
    //     error.style.setProperty('display', 'block')
    //     const value = document.getElementById('stripe-element-mount-point')
    //     this.$refs.checkoutRef.update({ disabled: false })
    //     value.style.setProperty('background-color', '#FFFFFF', 'important')
    //   }
    // },
    // paySystem(currentPayment) {
    //   if (this.showPromo) {
    //     this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', PayWithPromoCode)
    //   } else if (this.showApproval && !this.showPromo) {
    //     this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', PayWithCreditCard)
    //   } else if (!this.showApproval && !this.showPromo) {
    //     this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', PayWithApprovalCode)
    //   }
    //   this.$v.$reset()
    //   if (!this.showPromo && !this.showApproval) {
    //     this.$refs.checkoutRef.update({ disabled: true })
    //     this.showApproval = true
    //     const error = document.getElementById('stripe-element-errors')
    //     error.style.setProperty('display', 'none')
    //     const value = document.getElementById('stripe-element-mount-point')
    //     value.style.setProperty('background-color', '#B3B3B3', 'important')
    //   } else if (!this.showPromo && this.showApproval) {
    //     this.showApproval = false
    //     const error = document.getElementById('stripe-element-errors')
    //     error.style.setProperty('display', 'block')
    //     const value = document.getElementById('stripe-element-mount-point')
    //     this.$refs.checkoutRef.update({ disabled: false })
    //     value.style.setProperty('background-color', '#FFFFFF', 'important')
    //   }
    // },
    activePromo() {
      this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', 'PayWithPromoCode')
      // this.showApproval = false
      // this.$refs.checkoutRef.focus()
      // this.$v.$reset()
      // const inputValue = document.getElementById('autoComplete')
      // this.billingAddress = inputValue.value
      // this.showPromo = true
      // this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', PayWithPromoCode)
      // const value = document.getElementById('stripe-element-mount-point')
      // this.$refs.checkoutRef.update({ disabled: false })
      // value.style.setProperty('background-color', '#FFFFFF', 'important')
    },
    // toggle() {
    //   this.isThisYourAddress = !this.isThisYourAddress
    // },

    // checkoutByEnterPress(event) {
    //   if (event.keyCode === 13) {
    //     this.checkout()
    //   }
    // },
    // check() {
    //   if (!this.payProcess) {
    //     this.$refs.checkoutRef.submit()
    //   }
    // },
    // checkout() {
    //   this.$v.$touch()
    //   const inputValue = document.getElementById('autoComplete')
    //   inputValue.focus()
    //   this.billingAddress = inputValue.value
    //   if (!this.payProcess) {
    //     this.$refs.checkoutRef.submit()
    //     this.payProcess = true
    //   }
    // },
    // getError(payload) {
    //   if (payload.message) {
    //     this.payProcess = false
    //     this.promoText = false
    //   }
    // },
    // async tokenCreated(token) {
    //   if (
    //     !this.billingAddress &&
    //     token.card.address_country &&
    //     token.card.address_state &&
    //     token.card.address_city &&
    //     token.card.country &&
    //     token.card.address_zip
    //   ) {
    //     this.billingAddress =
    //       token.card.address_country +
    //       ', ' +
    //       token.card.address_state +
    //       ', ' +
    //       token.card.address_city +
    //       ', ' +
    //       token.card.country +
    //       ', ' +
    //       token.card.address_zip
    //   }
    //   this.$toast.clear()
    //   if (token && this.billingAddress && !this.promoCheck) {
    //     try {
    //       this.payProcess = true
    //       if (this.showPromo && this.promoCode) {
    //         const res = await this.$axios.post(CARDINFO, {
    //           token: token?.id,
    //           address: this.billingAddress,
    //           coupon: this.promoCode,
    //         })
    //         if (res.data.success) {
    //           await this.$auth.fetchUser()
    //           if (this.$route.name === 'payment') {
    //             this.$router.replace('/home')
    //           } else {
    //             this.paymentButtonTransition = true
    //             this.paymentFormTransition = true
    //             this.hideAccountTabMenu = true
    //             this.$emit('hide', this.hideAccountTabMenu)
    //             setTimeout(() => {
    //               this.homeSlider = true
    //               this.$emit('sliding', this.homeSlider)
    //             }, 4500)
    //             setTimeout(() => {
    //               this.fullHomeSlider = true
    //               this.$emit('full-sliding', this.fullHomeSlider)
    //             }, 5300)
    //           }
    //         } else {
    //           this.$toast.error(res.data.message, {
    //             className: ['toasted-bg-alert'],
    //           })
    //         }
    //       } else if (!this.showPromo) {
    //         const res = await this.$axios.post(CARDINFO, {
    //           token: token?.id,
    //           address: this.billingAddress,
    //         })
    //         if (res.data.success) {
    //           await this.$auth.fetchUser()
    //           if (this.$route.name === 'payment') {
    //             this.$router.replace('/home')
    //           } else {
    //             this.paymentButtonTransition = true
    //             this.paymentFormTransition = true
    //             this.hideAccountTabMenu = true
    //             this.$emit('hide', this.hideAccountTabMenu)
    //             setTimeout(() => {
    //               this.homeSlider = true
    //               this.$emit('sliding', this.homeSlider)
    //             }, 4500)
    //             setTimeout(() => {
    //               this.fullHomeSlider = true
    //               this.$emit('full-sliding', this.fullHomeSlider)
    //             }, 5300)
    //           }
    //         } else {
    //           this.$toast.error(res.data.message, {
    //             className: ['toasted-bg-alert'],
    //           })
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     } finally {
    //       this.payProcess = false
    //     }
    //   } else {
    //     this.payProcess = false
    //   }
    // },
    // async placeOrder() {
    //   this.$v.$touch()
    //   if (this.billingAddress) {
    //     try {
    //       this.payProcess = true
    //       if (this.approvalCode) {
    //         const res = await this.$axios.post(PURCHASE_ORDER, {
    //           address: this.billingAddress,
    //           code: this.approvalCode,
    //         })
    //         if (res.data.success) {
    //           await this.$auth.fetchUser()
    //           if (this.$route.name === 'payment') {
    //             this.$router.replace('/home')
    //           } else {
    //             this.paymentButtonTransition = true
    //             this.paymentFormTransition = true
    //             this.hideAccountTabMenu = true
    //             this.$emit('hide', this.hideAccountTabMenu)
    //             setTimeout(() => {
    //               this.homeSlider = true
    //               this.$emit('sliding', this.homeSlider)
    //             }, 4500)
    //             setTimeout(() => {
    //               this.fullHomeSlider = true
    //               this.$emit('full-sliding', this.fullHomeSlider)
    //             }, 5300)
    //           }
    //         } else {
    //           this.$toast.error(res.data.message, {
    //             className: ['toasted-bg-alert'],
    //           })
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     } finally {
    //       this.payProcess = false
    //     }
    //   } else {
    //     this.payProcess = false
    //   }
    // },async placeOrder() {
    //   this.$v.$touch()
    //   if (this.billingAddress) {
    //     try {
    //       this.payProcess = true
    //       if (this.approvalCode) {
    //         const res = await this.$axios.post(PURCHASE_ORDER, {
    //           address: this.billingAddress,
    //           code: this.approvalCode,
    //         })
    //         if (res.data.success) {
    //           await this.$auth.fetchUser()
    //           if (this.$route.name === 'payment') {
    //             this.$router.replace('/home')
    //           } else {
    //             this.paymentButtonTransition = true
    //             this.paymentFormTransition = true
    //             this.hideAccountTabMenu = true
    //             this.$emit('hide', this.hideAccountTabMenu)
    //             setTimeout(() => {
    //               this.homeSlider = true
    //               this.$emit('sliding', this.homeSlider)
    //             }, 4500)
    //             setTimeout(() => {
    //               this.fullHomeSlider = true
    //               this.$emit('full-sliding', this.fullHomeSlider)
    //             }, 5300)
    //           }
    //         } else {
    //           this.$toast.error(res.data.message, {
    //             className: ['toasted-bg-alert'],
    //           })
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     } finally {
    //       this.payProcess = false
    //     }
    //   } else {
    //     this.payProcess = false
    //   }
    // },
  },
})
</script>

<style lang="scss" scoped>
.automaticInvoiceTab {
  min-width: 260px;
}
.setup-container {
  @apply w-full h-full flex flex-col items-center md:justify-between justify-between md:relative overflow-y-auto overflow-x-hidden scroll px-0 space-y-4;
  .card {
    width: 70%;
    max-height: 685px;
    height: 83% !important;
    max-width: 400px;
    @apply h-full md:p-4 p-2 mx-4 md:mx-auto text-left bg-yellow-primary rounded-2xl flex flex-col overflow-auto scroll;
    // .card-body {
    //   @apply w-full md:p-3 p-2 text-white;
    // }
  }
  //   .card-header {
  //     @apply w-full mb-2 text-white;
  //   }

  // .card-body {
  //   max-height: 644px;
  //   @apply w-full mt-2.5 flex flex-col justify-center items-center overflow-auto scroll;
  //   .row {
  //     @apply flex;
  //     .col {
  //       @apply w-full p-2;
  //     }
  //   }
  // }
  // }

  .next {
    // min-height: 70px;
    @apply py-4 md:py-0 text-white;
    &.modal-view {
      transition: all 1s ease-in-out;
      @apply w-full bg-gray-800 rounded-tl-2xl rounded-tr-2xl;
    }
  }
}

.promo-height {
  height: 25%;
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

button:focus {
  outline: none;
  border: none;
}

.paymentForm-leave-active {
  transition: opacity 2s;
}

.paymentForm-leave-to {
  opacity: 0;
}

.orderButton-leave-active {
  transition: opacity 2s;
}

.orderButton-leave-to {
  opacity: 0;
}

// .scroll {
//   scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
//   /* Handle */
//   &::-webkit-scrollbar-thumb {
//     background: #ff8308;
//   }

//   /* Handle on hover */
//   &::-webkit-scrollbar-thumb:hover {
//     background: #ff8308;
//   }
// }
.payment_card {
  border-radius: 25px;
}

@media (max-width: 767px) {
  .card {
    height: 80% !important;
    width: 90% !important;
    max-height: 644px;
    max-width: 400px;
  }
}

.pac-item {
  cursor: pointer;
}
.billing_address {
  box-shadow: 0 1px 3px 0 #e6ebf1;
}
.promo_code {
  box-shadow: 0 1px 3px 0 #e6ebf1;
}
.paymentView-enter-active,
.paymentView-leave-active {
  transition: opacity 0.3s;
}
.paymentView-enter,
.paymentView-leave-to {
  opacity: 0;
}
.selectPaymentView-enter-active,
.selectPaymentView-leave-active {
  transition: opacity 0.3s;
}
.selectPaymentView-enter,
.selectPaymentView-leave-to {
  opacity: 0;
}
.fadeIn {
  -webkit-animation: fadein 0.5s linear forwards;
  animation: fadein 0.5s linear forwards;
}
.backButtonInner {
  text-align: -webkit-center;
}
.svg-inline--fa {
  height: 1.5em;
  width: 1.25em;
}
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
