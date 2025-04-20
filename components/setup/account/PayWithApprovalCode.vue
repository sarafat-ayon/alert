<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="card-body h-full scroll">
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
        class="rounded-2xl w-full h-auto justify-center items-start flex py-4"
      >
        <p class="text-white text-md text-justify">
          Payment by purchase order is available upon request. When approved,
          you will receive a code which can be entered below. If you need to
          request an approval code email us at
          <a
            :href="`mailto:admin@sharparchive.com`"
            class="text-blue-1000 font-bold underline"
          >
            admin@sharparchive.com
          </a>
        </p>
      </div>
      <div
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
          <h3>Enter Your Approval Code</h3>
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
            w-56
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
      <div
        class="rounded-2xl w-full h-auto justify-center items-start flex py-4"
      >
        <p class="text-white text-md text-justify">
          If the invoice will be paid by someone else (such as accounts
          payable), you may enter their email below:
        </p>
      </div>
      <div class="w-full flex flex-col justify-center items-center fadeIn">
        <input
          id="optionalEmail"
          v-model="optionalEmail"
          class="
            text-center
            promo_code
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
          placeHolder="Email for Invoice Delivery (optional)"
        />
      </div>
      <div
        class="rounded-2xl w-full h-auto justify-center items-start flex py-4"
      >
        <p class="text-white text-md text-justify">
          Today, the first invoice will be sent for the $52.00 base cost. New
          feeds are always added to your next invoice.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import { PURCHASE_ORDER } from '~/constants/urls'
export default defineComponent({
  name: 'PayWithApprovalCode',
  props: {
    paymentFormTransition: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    return {
      isDesktop: breakpoints.greater('md'),
    }
  },

  data() {
    return {
      hideAccountTabMenu: false,
      homeSlider: false,
      fullHomeSlider: false,
      billingAddress: '',
      autoComplete: '',
      promoCode: '',
      approvalCode: '',
      optionalEmail: '',
      defaultTimeZone: 'America/New_York',
      lat: '',
      long: '',
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
  validations: {
    billingAddress: {
      required,
      maxLength: maxLength(60),
    },
    promoCode: {
      required,
    },
    approvalCode: {
      required,
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
    setTimeout(() => {
      const value = document.getElementById('stripe-element-mount-point')
      value.style.setProperty('background-color', '#B3B3B3', 'important')
    })

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
  },

  methods: {
    validationMsg: validationMessage(validationMessages),
    paySystem() {
      this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', 'PayWithCreditCard')
    },
    async placeOrder() {
      this.$v.$touch()
      if (this.billingAddress) {
        try {
          this.$emit('pay-process', true)
          if (this.approvalCode) {
            const res = await this.$axios.post(PURCHASE_ORDER, {
              address: this.billingAddress,
              code: this.approvalCode,
              email: this.optionalEmail
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
          }
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
.card-body {
  @apply w-full md:p-3 p-2 text-white;
}
.card-header {
  @apply w-full mb-2 text-white;
}

@media (max-width: 767px) {
  .card {
    height: 80% !important;
    width: 90% !important;
    max-height: 644px;
    max-width: 400px;
  }
}

.promo-height {
  // height: 25%;
  min-height: 93px;
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