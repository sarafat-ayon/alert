<template>
  <div class="my-3 mb-10 text-center email-verify">
    <number-verification-panel
      :label="{ show: true, title: 'Enter code you were Texted' }"
      @verificationCode="verification"
    ></number-verification-panel>
    <button :disabled="resendProcess" @click="resendCode()">Resend code</button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  USER_ARCHIVE_FEEDS,
  USER_STORAGE,
  USER_STORAGE_COSTS,
} from '~/constants/urls'
import NumberVerificationPanel from '~/components/inputs/NumberVerificationPanel'
import { phoneVerifyOtpMixing } from '~/mixins/otp'

export default {
  components: { NumberVerificationPanel },
  mixins: [phoneVerifyOtpMixing],
  data() {
    return {
      otp: ['', '', '', '', '', ''],
      resendProcess: false,
    }
  },
  computed: {
    ...mapGetters('user', ['getUserInfo']),
    ...mapGetters('feeds', [
      'getStorageInfo',
      'total',
      'getArchiveFeeds',
      'archiveFeedBaseCost',
    ]),
  },
  mounted() {},
  methods: {
    ...mapActions('feeds', ['enablePayment']),
    verification(code) {
      if (code.length === 6) {
        this.verifyPhoneOtp(
          { email: this.getUserInfo.email, otp: code },
          'signup'
        )
      }
    },

    resendCode() {
      this.resendPhoneVerifyCode(
        {
          email: this.getUserInfo.email,
          password: this.getUserInfo.password,
        },
        'signup'
      )
    },
    storeUserStorage() {
      this.$axios.$post(USER_STORAGE, this.getStorageInfo).then((res) => {
        //
      })
    },
    storeUserArchive() {
      this.$axios
        .$post(USER_ARCHIVE_FEEDS, this.getArchiveFeeds)
        .then((res) => {
          //
        })
    },
    storeUserFeedsCosts() {
      this.$axios
        .$post(USER_STORAGE_COSTS, {
          totalCost: this.total,
          facebookCost: this.archiveFeedBaseCost.facebook,
          baseCost: this.archiveFeedBaseCost.base,
          twitterCost: this.archiveFeedBaseCost.twitter,
          linkedInCost: this.archiveFeedBaseCost.linkedin,
          InstagramCost: this.archiveFeedBaseCost.instagram,
          priceType: 'monthly',
        })
        .then((res) => {
          //
        })
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  @apply text-white mt-2 outline-none border-none;
}
</style>
