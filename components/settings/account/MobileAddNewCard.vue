<template>
  <div
    class="
      z-100
      absolute
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
    "
    :class="showNewCard ? 'show' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full">
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
          <button
            class="focus:outline-none"
            @click="$emit('closeInvoiceSidebar', false), hideOverlay()"
          >
            <fa
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                md:font-bold
              "
              :icon="['fas', 'times']"
              @click="hideBlog"
            />
          </button>
        </div>

        <div class="flex flex-col w-full h-full mt-6">
          <client-only>
            <div id="card" ref="checkoutRef"></div>
            <client-only>
              <stripe-element-card
                ref="checkoutRefs"
                :pk="$config.stripeKey"
                @token="tokenCreate"
              >
              </stripe-element-card>
            </client-only>
          </client-only>
        </div>
      </div>

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
import {
  required,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
// import { StripeElementCard } from '@vue-stripe/vue-stripe';
import { CARDINFO } from '~/constants/urls'
export default {
  name: 'BillingInfoSidebar',
  // components: {
  //   StripeElementCard,
  // },
  props: {
    showNewCard: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // googlePay: GooglePay,
      // paypalPay: PaypalPay,
      // applePay: ApplePay,
      paymentInfo: {
        holderName: '',
        cardNumber: '',
        expireDate: null,
        cvv: null,
        billingAddress: '',
        city: '',
        zipCode: null,
        isThisYourAddress: true,
      },
      googleOption: false,
      paypalOption: true,
      appleOption: false,
      paymentButtonTransition: false,
      paymentFormTransition: false,
      // matchingCardNumber: '',
      hideAccountTabMenu: false,
      homeSlider: false,
      fullHomeSlider: false,
      newCardInfo: false,
      addProcess: false,
    }
  },
  computed: {
    ...mapGetters('feeds', ['getStorageInfo', 'getArchiveFeeds']),
    ...mapGetters('user', ['getUserInfo']),
  },
  validations: {
    paymentInfo: {
      holderName: {
        required,
      },
      cardNumber: {
        required,
        maxLength: maxLength(19),
        minLength: minLength(19),
      },
      expireDate: {
        required,
        maxLength: maxLength(9),
        minLength: minLength(9),
      },
      cvv: {
        required,
        maxLength: maxLength(3),
        minLength: minLength(3),
        numeric,
      },
      billingAddress: {
        required,
      },
      city: {
        required,
      },
      zipCode: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(5),
        numeric,
      },
    },
  },
  // mounted() {
  //   if (this.$stripe) {
  //     const elements = this.$stripe.elements();
  //     const card = elements.create('card', {});
  //     // Add an instance of the card Element into the `card-element` <div>
  //     card.mount('#card');
  //   }
  // },
  methods: {
    ...mapActions('user', ['setNewUserToken']),
    // toggle() {
    //   this.isThisYourAddress = !this.isThisYourAddress
    // },
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
    orderButton() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$toast.clear()
        this.$axios
          .$post('user/payment', {
            email: this.getUserInfo.email,
            paymentInfo: this.paymentInfo,
          })
          .then((res) => {
            if (res.success) {
              this.setNewUserToken(res.data)
              this.paymentButtonTransition = true
              this.paymentFormTransition = true
              this.hideAccountTabMenu = true
              this.$emit('hide', this.hideAccountTabMenu)
              setTimeout(() => {
                this.homeSlider = true
                this.$emit('sliding', this.homeSlider)
              }, 4500)
              setTimeout(() => {
                this.fullHomeSlider = true
                this.$emit('full-sliding', this.fullHomeSlider)
              }, 6000)
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
          })
      }
    },

    checkout() {
      this.$refs.checkoutRef.submit()
    },
    tokenCreate(token) {
      this.$toast.clear()
      this.addProcess = true
      this.$axios
        .post(CARDINFO, {
          token: token?.id,
        })
        .then((res) => {
          if (res.data.success) {
            this.$emit('new-card-info')
            this.$toast.success(res.data.message, {
              className: ['toasted-bg-archive'],
            })
            this.paymentButtonTransition = true
            this.paymentFormTransition = true
            this.hideAccountTabMenu = true
          } else {
            this.$toast.error(res.data.message, {
              className: ['toasted-bg-alert'],
            })
          }
        })
      this.addProcess = false
    },
    hideBlog() {
      this.$emit('close-new-card')
      this.$v.$reset()
    },
    toggle() {
      this.checked = !this.checked
    },
    hideOverlay() {
      this.$store.dispatch('mobile/header/removeOverlay')
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
