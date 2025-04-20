<template>
  <section>
    <div class="w-full h-full padding relative" @click="closeStarterModal()">
      <h1 class="release-header pb-20">Release notes</h1>
      <img class="shape" :src="ShapesImage" alt="SharpArchive Release notes Image" />

      <div v-for="(item, index) in ReleaseNotes" :key="index">
        <h2 class="flex items-center font-bold text-32px">
          <img
            class="h-10 w-10 pr-2 text-ash-default"
            :src="PointIcon"
            alt="SharpArchive Release notes Hand Ponter Icon"
          /><span>{{ item.version }}</span>
        </h2>

        <p class="pl-10 text-gray-light text-base">
          Published on {{ item.published }}
        </p>

        <div v-if="item.whatsNew.length > 0" class="pl-10 pb-6">
          <h3 class="text-2xl text-orange-dark pt-7 pb-2">What’s New</h3>
          <ul class="list-disc pl-5">
            <li
              v-for="(list, indx) in item.whatsNew"
              :key="indx"
              class="text-gray-light text-lg pb-2"
            >
              {{ list }}
            </li>
          </ul>
        </div>
        <div v-if="item.bugFixed.length > 0" class="pl-10 pb-6">
          <h3 class="text-2xl text-orange-dark pb-2">Bug Fixes</h3>
          <ul class="list-disc pl-5">
            <li
              v-for="(list, indx) in item.bugFixed"
              :key="indx"
              class="text-gray-light text-lg pb-2"
            >
              {{ list }}
            </li>
          </ul>
        </div>
        <div v-if="item.upComing.length > 0" class="pl-10 pb-6">
          <h3 class="text-2xl text-orange-dark pb-2">Upcoming</h3>
          <ul class="list-disc pl-5">
            <li
              v-for="(list, indx) in item.upComing"
              :key="indx"
              class="text-gray-light text-lg pb-2"
            >
              {{ list }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <landing-footer class="pb-24"></landing-footer>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LandingFooter from '~/components/setup/LandingFooter.vue'
import PointIcon from '~/assets/img/svg/release-notes/point.svg'
import ShapesImage from '~/assets/img/svg/release-notes/shapes.svg'

export default {
  auth: false,
  name: 'ReleaseNotes',
  components: { LandingFooter },
  data() {
    return {
      PointIcon,
      ShapesImage,
      ReleaseNotes: [
        {
          version: 'SA - 13.0',
          published: 'Thu, Oct 13, 2022',
          whatsNew: [
            'Expand collapse functionality for the settings page is fixed now.  That functionality depends on the screen size of the device.',
            'If the user wants to log in from any device first, then the user needs to type OTP, which was sent to the email address. Also, the animation of this login process is done.',
            'Design and Implementation of Archive page All Feeds Select Input',
            'On payment, the model design is changed now.  “Billing Adress and “Payment Options” is now added under the automatic section of the sign-up process.',
            'On the general screen size, no scroll bar is showing now on the account modal of the Sign Up section. If any error occurs on this page then the scroll bar will visible.',

          ],
          bugFixed: [
            'The date range functionality of the search page is working properly now.',
            'If there are a lot of feeds and the user clicks on feeds then this model opens properly now & takes place for Feeds place. The design issue is also solved.',
            'On the home page for the search input area if the user writes something and hit enter then a search operation is performed. And the search result will be showing on the search page now',
            'On mobile, Account page the three buttons are now in the right position of the billing information table. And on the desktop, these three buttons are visible now. Also, the functionality of these three buttons is working correctly for both mobile and desktop.',
            'On the Mozilla Firefox browser when the user hits the resend button to get OTP for login. Now no error alert message is showing. “Please Check Your Email” alert message is showing.',
            'After login, if the user comes to the landing page by clicking on the SA logo, On the landing page there is a button named “Archive Your Communication Now”. This button is totally hidden now. ',
            'With a valid card number if the user completes or fills up this input field the pay button is not working automatically now. When the user clicks the pay button then the work of the pay button will happen.',
          ],
          upComing: [
            'In the signup account modal when a user validates all the fields after that when they click on Next it will redirect them to Security Modal, without validating the Account modal they can\'t move to Security Modal, the Same thing happens for the move to the Payment modal.',
            'Add Paypal payment method on the billing information:',
            'The Intro image of the SharpArchive landing page will be changed',
          ]
        },
      ],
    }
  },
  head() {
    return {
      title: 'Release Notes',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.appURL}/${this.$route.name}`,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
    }),
  },
  mounted() {
    this.$store.commit('SET_LANDING_LOADER', false)
    this.setHeaderWidth(true)
  },
  methods: {
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
      setHeaderWidth: 'set_header_width',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      if (this.starterExpanded) {
        this.collapse_starter_modal(true)
        this.show_sign_up(false)
      }
      setTimeout(() => {
        this.expand_starter_modal(false)
      }, 100)
      this.maximize_starter_modal(false)
      this.updateSetupContent('starter-button')
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>

<style lang="scss" scoped>
.release-header {
  @apply text-center font-bold;
  padding-top: 156px;
  font-size: 50px;
  letter-spacing: 12px;
  color: #e28227;
  text-transform: uppercase;
}
.shape {
  width: 374px;
  position: absolute;
  right: -48px;
  top: -15px;
}
.padding {
  @apply px-6 md:px-101;
}
.text-32px {
  font-size: 32px;
}
li::marker {
  color: #e4801d;
}

@media (max-width: 1279px) {
  .shape {
    width: 280px;
    right: -48px;
    top: 14px;
  }
}
@media (max-width: 1023px) {
  .shape {
    width: 220px;
    right: -44px;
    top: 30px;
  }
  .release-header {
    padding-top: 180px;
    font-size: 44px;
    letter-spacing: 10px;
  }
}
@media (max-width: 767px) {
  .release-header {
    padding-top: 160px;
    font-size: 44px;
    letter-spacing: 10px;
  }
  .shape {
    width: 180px;
    right: -32px;
    top: 40px;
  }
}
</style>