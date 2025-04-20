<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="card-body h-full scroll flex flex-col justify-between">
      <div class="payWithCreditCardWrapper mt-1.5">
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
          <h3 class="mb-3 cursor-pointer" @click="paySystem">
            Payment Options
          </h3>
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
        </div>

        <!-- <div class="w-full text-right">
          <button
            class="
              mt-2
              border-2 border-white
              text-white
              overflow-hidden
              whitespace-nowrap
              xl:px-10
              md:px-5
              py-1
              font-bold
              rounded-full
              text-center text-md
              transition-all
              duration-500
              ease-in-out
              focus:text-white
            "
            @click="paySystem"
          >
            Back
          </button>
        </div> -->
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
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import { CARDINFO } from '~/constants/urls'
export default defineComponent({
  name: 'PayWithCreditCard',
  props: {
    payProcess: {
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
    const originAutocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.origin,
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(43.0, -75.0)
        ),
      }
    )
    originAutocomplete.addListener('place_changed', () => {
      // this.lat = originAutocomplete.getPlace().geometry.viewport.Ab.g
      // this.long = originAutocomplete.getPlace().geometry.viewport.Ra.g
      // this.getTimeZone()
      this.billingAddress = originAutocomplete.getPlace().formatted_address
    })
    setTimeout(() => {
      this.$refs.checkoutRef.focus()
    }, 2000)
  },

  methods: {
    validationMsg: validationMessage(validationMessages),
    paySystem() {
      this.$store.commit('SET_CURRENT_PAYMENT_SYSTEM', 'PaymentOption')
    },

    // check() {
    //   if (!this.payProcess) {
    //     this.$refs.checkoutRef.submit()
    //   }
    // },
    checkout() {
      this.$v.$touch()
      const inputValue = document.getElementById('autoComplete')
      inputValue.focus()
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
