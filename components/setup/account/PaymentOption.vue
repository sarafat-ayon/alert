<template>
  <section class="scroll">
    <div class="w-full h-full flex flex-col overflow-hidden">
      <div class="card-body h-full scroll flex flex-col justify-between">
        <div class="paymentOptionWrapper">
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

          <div class="paymentOption mt-10">
            <h3 class="mb-5 font-bold">Payment Options</h3>
            <div class="flex flex-col space-y-3">
              <!-- <div class="flex flex-col"> -->
              <!-- <div
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
                @click="paySystem('PayWithCreditCard')"
              >
                <span
                  class="pointer-events-none text-lg font-bold text-gray-600"
                  >Credit Card</span
                >
              </div> -->

              <client-only id="card-payment">
                <div class="stripe-wrapper cursor-pointer z-10">
                  <stripe-element-card
                    ref="checkoutRef"
                    class="h-14 z-9"
                    :pk="$config.stripeKey"
                    :hide-postal-code="true"
                    :element-style="style"
                    :icon-style="'solid'"
                    @token="tokenCreated"
                    @error="getError"
                  >
                  </stripe-element-card>
                </div>
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
                @click="paySystem('ACHDebitCard')"
              >
                <span
                  class="pointer-events-none text-lg font-bold text-gray-600"
                  >ACH Direct Debit</span
                >
              </div>
              <!-- </div> -->

              <!-- <div class="flex flex-col"> -->
              <div
                class="
                  tab
                  cursor-pointer
                  rounded-full
                  text-center
                  h-12
                  w-full
                  bg-white
                  relative
                  overflow-hidden
                "
                @click="paySystem('PayWithPayPal')"
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

              <!-- <div
                v-if="hideText($config.workflow)"
                class="
                  tab
                  cursor-pointer
                  rounded-full
                  text-center
                  md:px-1
                  px-1
                  py-1.5
                  h-20
                  w-full
                "
                @click="paySystem('GooglePay')"
              >
                <GooglePay
                  totalPrice="100.00"
                  @loaded="loadeded"
                  @loadedError="loadedError"
                  @paymentError="paymentError"
                  @paymentSuccess="paymentSuccess"
                />
                <img
                  class="mx-auto pointer-events-none"
                  :src="googlePayIcon"
                  alt="SharpArchive googlePayIcon Icon"
                />
              </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl w-full h-auto justify-center items-start flex py-4"
        >
          <p class="text-white text-md text-justify">
            Today you will be charged the $52.00 base cost. New feeds are always
            added to your next invoice.
          </p>
        </div>
      </div>
    </div>
    <alert-confirm-modal
      :title="title"
      :message="message"
      :processing="paymentErrorProcess"
      :show="showPaymentAlert"
      :modal-from-payment="true"
      @cancel="closePaymentErrorModal"
    ></alert-confirm-modal>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
// eslint-disable-next-line import/order
import GooglePay from './GooglePay.vue'
import { CARDINFO, PAYPAL_PAYMENT } from '~/constants/urls'
import PayPal from '~/assets/img/svg/payment/paypal.svg'
import GooglePayIcon from '~/assets/img/svg/payment/google-pay.svg'
import { useHideText } from '~/composables/feeds/useHideText'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'
import PayPalIcon from '~/components/shared/icon/PayPalIcon.vue'
export default defineComponent({
  name: 'PaymentOption',
  components: { GooglePay, AlertConfirmModal, PayPalIcon },
  props: {
    payProcess: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const { hideText } = useHideText()

    return {
      isDesktop: breakpoints.greater('md'),
      hideText,
    }
  },
  data() {
    return {
      googlePayIcon: GooglePayIcon,
      payPal: PayPal,
      loaded: false,
      hideAccountTabMenu: false,
      homeSlider: false,
      fullHomeSlider: false,
      billingAddress: '',
      autoComplete: '',
      promoCode: '',
      title: '',
      message: '',
      paymentErrorProcess: false,
      showPaymentAlert: false,
      defaultTimeZone: 'America/New_York',
      lat: '',
      long: '',
      style: {
        base: {
          iconColor: '#B0BCC8',
          '::placeholder': {
            color: '#B0BCC8',
          },
        },
      },
    }
  },
  validations: {
    billingAddress: {
      required,
      maxLength: maxLength(60),
    },
  },
  watch: {
    promoCode(data) {
      if (data) {
        const inputValue = document.getElementById('autoComplete')
        this.billingAddress = inputValue.value
      }
    },
    approvalCode(data) {
      if (data) {
        const inputValue = document.getElementById('autoComplete')
        this.billingAddress = inputValue.value
      }
    },
  },
  mounted() {
    if (this.$route.fullPath.includes('/payment?cancel')) {
      this.title = 'Payment Cancelled'
      this.message = 'Your payment process is cancelled, try again.'
      this.showPaymentAlert = true
    } else if (
      this.$route.fullPath.includes('/payment?failed%3Fsuccess=false')
    ) {
      this.title = 'Payment Failed'
      this.message = 'This PayPal account is already in use by another user'
      this.showPaymentAlert = true
    }
    const originAutocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.origin,
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(43.0, -75.0)
        ),
      }
    )
    originAutocomplete.addListener('place_changed', () => {
      this.billingAddress = originAutocomplete.getPlace().formatted_address
    })
    setTimeout(() => {
      this.$refs.checkoutRef.focus()
      this.loadGooglePay()
    }, 2000)
  },

  methods: {
    closePaymentErrorModal() {
      this.showPaymentAlert = false
    },
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
    validationMsg: validationMessage(validationMessages),
    async paySystem(currentPaySystem) {
      this.$v.$touch()
      const inputValue = document.getElementById('autoComplete')
      // inputValue.focus()
      if (currentPaySystem === 'PayWithPayPal') {
        try {
          const { success, url, message } = await this.$axios.$post(PAYPAL_PAYMENT, {
            address: inputValue.value,
            successUrl: `${this.$config.appURL}/home`,
            cancelUrl: `${this.$config.appURL}/payment/?cancel`,
            failedUrl: `${this.$config.appURL}/payment/?failed`,
          })
          if (success) {
            window.location.href = url
          } else {
            this.$toast.error(message)
          }
        } catch (error) {
          console.log(error)
        }
        // this.payWithPayPal()
      } else {
        this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', currentPaySystem)
      }
    },

    check() {
      if (!this.payProcess) {
        this.$refs.checkoutRef.submit()
      }
    },
    checkout() {
      this.$v.$touch()
      const inputValue = document.getElementById('autoComplete')
      // inputValue.focus()
      this.billingAddress = inputValue.value
      if (!this.payProcess) {
        this.$refs.checkoutRef.submit()
        this.$emit('pay-process', true)
      }
    },
    getError(payload) {
      if (payload.message) {
        this.$emit('pay-process', false)
      }
    },

    async tokenCreated(token) {
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
      if (token && this.billingAddress) {
        try {
          this.$emit('pay-process', true)
          const res = await this.$axios.post(CARDINFO, {
            token: token?.id,
            address: this.billingAddress,
          })
          if (res.data.success) {
            await this.$auth.fetchUser()
            if (this.$route.name === 'payment') {
              this.$router.replace('/home')
            } else {
              this.$emit('button-transition')
              this.$emit('form-transition')
              this.hideAccountTabMenu = true
              this.$emit('hide', this.hideAccountTabMenu)
              // setTimeout(() => {
              this.homeSlider = true
              this.$emit('sliding', this.homeSlider)
              // }, 4500)
              // setTimeout(() => {
              this.fullHomeSlider = true
              this.$emit('full-sliding', this.fullHomeSlider)
              // }, 5300)
            }
          } else {
            this.$toast.error(res.data.message, {
              className: ['toasted-bg-alert'],
            })
          }
          // }
        } catch (error) {
          console.log(error)
        } finally {
          this.$emit('pay-process', false)
        }
      } else {
        this.$emit('pay-process', false)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.payPalIcon {
  position: absolute;
  height: 32px;
  width: 320px;
  z-index: 999;
  background: white;
}
.card-body {
  @apply w-full md:p-3 p-2 text-white;
}
.card-header {
  @apply w-full mb-2 text-white;
}
@media (max-height: 900px) {
  .payPalIcon {
    width: 312px;
  }
}
@media (max-width: 767px) {
  .card {
    height: 80% !important;
    width: 90% !important;
    max-height: 644px;
    max-width: 400px;
  }
  .payPalIcon {
    width: 345px;
    margin-top: -1px;
    margin-left: -1px;
  }
}
@media (max-width: 450px) {
  .payPalIcon {
    width: 330px;
  }
}
@media (max-width: 414px) {
  .payPalIcon {
    width: 317px;
  }
}
@media (max-width: 393px) {
  .payPalIcon {
    width: 299px;
  }
}
@media (max-width: 375px) {
  .payPalIcon {
    width: 283px;
  }
}

.promo-height {
  height: 25%;
}

.button:focus {
  outline: none;
  border: none;
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
</style>
