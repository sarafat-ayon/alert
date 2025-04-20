<template>
  <client-only>
    <section class="overflow-hidden">
      <div
        v-if="isDesktop"
        class="
          fixed
          hidden
          w-full
          h-full
          overflow-hidden
          md:block
          bg-ash-default
        "
        :class="
          showPasswordConfirmModal || showForgetPasswordModal ? 'bg-blur' : ''
        "
      >
        <the-sidebar @squeeze="doSqueeze" @notsqueeze="notSqueeze" />
        <div class="h-full overflow-hidden md:ml-26">
          <Header :global-color-panel="globalColorPanel" />
          <div
            class="hidden md:block"
            :class="[
              squeeze ? 'blog' : 'blog1',
              showBlurActiveModal ? 'bg-blur' : '',
            ]"
          >
            <nuxt :squeeze="squeeze"></nuxt>
          </div>
          <div v-if="showBlurActiveModal" class="web-overlay"></div>
          <search-alert></search-alert>
        </div>
      </div>
      <!-- Small Device  -->
      <div v-else class="relative w-full h-full overflow-hidden bg-ash-default">
        <div class="relative h-full overflow-hidden md:ml-26">
          <mobile-header
            v-if="hideMobileHeader === false"
            class="md:hidden"
            :window-height="windowHeight"
            :source="'search'"
            :expand-exist="expanded"
            :global-color-panel="globalColorPanel"
            @show-footer="showFooter"
            @blur="blurBackground"
            @showProfile="profile"
          ></mobile-header>
          <!-- expand || -->
          <div
            v-if="
              showMobileSearch ||
              showMobileFilter ||
              showMobileAddAlert ||
              showProfile ||
              showChangeBilling
            "
            class="md:hidden overlay"
            @click="removeOverlay"
          ></div>
          <div
            id="smallDevice"
            class="md:hidden mobile_blog bg-ash-default"
            :class="
              showBlurActiveModal ||
              showPasswordConfirmModal ||
              showForgetPasswordModal
                ? 'bg-blur'
                : ''
            "
            @click="removeExpand"
          >
            <nuxt></nuxt>
          </div>
          <mobile-footer
            class="md:hidden"
            :class="hideMobileHeader === false ? '' : 'hidden'"
            :show-footer="expand"
          ></mobile-footer>
          <div v-if="showBlurActiveModal" class="web-overlay"></div>
        </div>
        <mobile-filter :filter="showMobileFilter"></mobile-filter>
        <mobile-add-alert
          class="md:hidden"
          :show-add-alert="showMobileAddAlert"
        ></mobile-add-alert>
        <!-- <edit-feed></edit-feed> -->

        <!-- start search page component -->
        <mobile-search class="md:hidden"></mobile-search>
        <mobile-save-search class="md:hidden"></mobile-save-search>
        <search-alert class="md:hidden"></search-alert>
      </div>
      <notification :global-color-panel="globalColorPanel"></notification>
      <social-auth-feeds
        :global-color-panel="globalColorPanel"
      ></social-auth-feeds>
      <profile
        :show-profile="show"
        :global-color-panel="globalColorPanel"
      ></profile>
      <update-add-feeds></update-add-feeds>
      <confirmation-modal></confirmation-modal>
      <add-new-card></add-new-card>
      <lock-screen v-if="lockScreen"></lock-screen>
      <Loading v-if="downloadLoader"></Loading>
      <v-idle :duration="lockScreenDuration" @idle="onidle" />
      <ReFundModal
        v-if="showRefundModal && user.isOwner === true"
      ></ReFundModal>
      <message-read-modal
        v-if="notificationMessageModal.show"
        :message="notificationMessageModal"
      />
      <new-alert></new-alert>
      <transition name="my-layouts">
        <forget-password-modal></forget-password-modal>
      </transition>
    </section>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Header from '../components/home/LatestArchive/Header.vue'
import { useAlert } from '~/stores/alert'
import Profile from '~/components/settings/account/Profile'
import TheSidebar from '~/components/TheSidebar.vue'
import MobileHeader from '~/components/home/LatestArchive/Header.vue'
import MobileFooter from '~/components/layout-element/Footer.vue'
import ConfirmationModal from '~/components/ConfirmationModal.vue'
import SocialAuthFeeds from '~/components/socialAuthFeeds'
import MobileFilter from '~/components/archive/FilterModal.vue'
import MobileAddAlert from '~/components/alert/MobileAddAlert.vue'
import AddNewCard from '~/components/settings/account/AddNewCard.vue'
import Notification from '~/components/Notification.vue'
import MobileSearch from '~/components/search/MobileSearch'
import MobileSaveSearch from '~/components/search/MobileSaveSearch'
import SearchAlert from '~/components/search/SearchAlert'
import { FEEDS, PAST_MONTH } from '~/constants/urls'
import UpdateAddFeeds from '~/components/UpdateAddFeeds.vue'
import LockScreen from '~/components/LockScreen.vue'
import ReFundModal from '~/components/ReFundModal.vue'
import messageReadModal from '~/components/settings/system/messageReadModal.vue'
import ForgetPasswordModal from '~/components/ForgetPasswordModal.vue'
import Loading from '~/components/Loading.vue'
import NewAlert from '~/components/alert/common-component/NewAlert.vue'

// const breakpoints = useBreakpoints(breakpointsTailwind)
export default defineComponent({
  name: 'HomeLayout',
  components: {
    SocialAuthFeeds,
    Header,
    Profile,
    TheSidebar,
    MobileHeader,
    MobileFooter,
    ConfirmationModal,
    MobileSearch,
    MobileSaveSearch,
    SearchAlert,
    MobileFilter,
    MobileAddAlert,
    AddNewCard,
    UpdateAddFeeds,
    LockScreen,
    ReFundModal,
    Notification,
    messageReadModal,
    ForgetPasswordModal,
    Loading,
    NewAlert,
  },
  layoutTransition: {
    name: 'my-layouts',
    mode: '',
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const store = useAlert()
    const { showNewAlertComp } = storeToRefs(store)

    return {
      isDesktop: breakpoints.greater('md'),
      showNewAlertComp,
    }
  },
  data() {
    return {
      squeeze: false,
      showProfile: false,
      expand: false,
      expanded: false,
      blur: false,
      current: 'home',
      lockScreenDuration: 60 * 10,
      windowHeight: 0,
    }
  },
  async fetch() {
    const res = await this.$axios.$get(FEEDS)
    if (res.success) {
      this.setAllSocialProviders(res.data)
    }

    const res1 = await this.$axios.$get(PAST_MONTH)
    if (res1.success) {
      this.setPastMonths(res1.data)
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'overflow-hidden',
      },
      script: [
        {
          type: 'text/javascript',
          id: 'hs-script-loader',
          async: true,
          defer: true,
          src: `//js-na1.hs-scripts.com/22166820.js`,
          body: true,
        },
      ],
    }
  },
  computed: {
    ...mapState('archive', ['downloadLoader']),
    showMobileSearch() {
      return this.$store.getters['mobile/header/getShowSearchBar']
    },
    showMobileFilter() {
      return this.$store.getters['mobile/header/getShowFilter']
    },
    showMobileAddAlert() {
      return this.$store.getters['mobile/header/getShowAddAlert']
    },
    showOverlay() {
      return this.$store.getters['mobile/header/getOverlay']
    },
    hideMobileHeader() {
      return this.$store.getters['mobile/header/getHideMobileHeader']
    },
    showChangeBilling() {
      return this.$store.getters['mobile/header/getPayment']
    },
    showBlurActiveModal() {
      return this.$store.getters['mobile/header/showBlurActiveModal']
    },
    lockScreen() {
      return this.$store.state.lockScreen
    },
    ...mapState('socialFeed', ['showRefundModal']),
    ...mapState('notifications', ['notificationMessageModal']),
    ...mapState('profile', ['show']),
    ...mapState('confirm', ['showPasswordConfirmModal']),
    ...mapState('system', ['allDate', 'allTimesZone', 'timeFormats']),
    ...mapState(['globalColorPanel', 'showForgetPasswordModal']),
    user() {
      return this.$auth.user
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  watch: {
    $route(to, from) {
      if (from.name === 'search') {
        this.$store.commit('search/SET_HOME_SEARCH', '')
      }
    },
  },
  mounted() {
    if (window.HubSpotConversations) {
      setTimeout(() => {
        window.HubSpotConversations.widget.remove()
        const status = window.HubSpotConversations.widget.status()
        if (!status.loaded) {
          setTimeout(() => {
            window.HubSpotConversations.widget.remove()
          }, 1000)
        }
      }, 1000)
    }

    if (this.$route.fullPath.includes('/home?success=true')) {
      this.$toast.success('Payment Successful', {
        className: ['toasted-bg-archive'],
      })
      setTimeout(() => {
        this.$router.replace('/home')
      }, 1000)
    }

    this.lockScreenDuration =
      window.location.host === 'sharparchive.com' ? 60 * 60 : 60 * 10
    this.login_button_transition(true)
    this.submit_button_transition(true)
    this.login_form_transition(true)
    this.successfully(true)
    this.loading_text(true)
    this.loading_text(false)
    this.after_loading(true)
    this.home_header(true)
    this.home_sidebar(true)
    this.home_modal(true)
    this.width_increase(true)
    this.header_text(true)
    this.home_circle(true)
    this.login_circle(false)
    this.slide_left(true)
    this.full_width(true)
    this.sidebar_menu(true)
    this.sidebar_circle(true)
    this.home_circle(false)
    this.show_logo(true)
    this.home_side_menu(true)
    this.home_menu_text(true)
    this.all_side_menu(true)
    this.show_home(true)
    this.show_logo_text(false)
    this.home_menu_text(false)
    this.home_wrapper(false)
    this.show_home_content(false)
    this.show_login(true)
    window.addEventListener('resize', this.screenSize)
    this.screenSize()
    if (this.$auth.loggedIn) {
      if (localStorage.getItem('lockScreen')) {
        this.$store.commit(
          'SET_LOCK_SCREEN',
          localStorage.getItem('lockScreen')
        )
      }
      this.fatchSocialFeeds().then((res) => {
        if (res.data.length === 0) {
          this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', true)
          this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
        }
      })
      this.getAllLatestData()
      this.getAllTimeZones().then((res) => {
        if (res.success) {
          this.getAllTimes()
        }
      })
      this.getAllNotifications()
      this.getOldestJoiningDateTime()
    }
  },
  destroyed() {
    setTimeout(() => {
      window.removeEventListener('resize', this.screenSize)
    }, 2000)
  },
  methods: {
    screenSize() {
      setTimeout(() => {
        if (document.getElementById('smallDevice')) {
          this.windowHeight =
            document.getElementById('smallDevice').offsetHeight - 149
        }
      })
    },
    // closeSidebar() {
    //   this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
    //   this.$store.commit('profile/SET_PROFILE_MODAL', false)
    //   this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
    //   this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
    //     open: false,
    //     data: {},
    //   })
    //   this.$store.commit('SET_SHOW_SIDE_BAR', false)
    // },
    closeOptions() {
      this.showNewAlertComp(false)
      this.$store.commit('home/SET_SHOW_OPTIONS', false)
    },
    onidle() {
      localStorage.setItem('lockScreen', true)
      this.$store.commit('SET_LOCK_SCREEN', true)
    },
    ...mapActions({
      setAllSocialProviders: 'setAllSocialProviders',
      setPastMonths: 'setPastMonths',
    }),
    ...mapActions('home', [
      'getAllLatestData',
      'getAllSocialArticle',
      'getOldestJoiningDateTime',
    ]),
    ...mapActions('system', [
      'getAllTimeZones',
      'getTimeZoneWiseDate',
      'getAllTimeFormats',
      'getAllTimes',
    ]),
    ...mapActions('socialFeed', ['fatchSocialFeeds']),
    ...mapActions('notifications', ['getAllNotifications']),

    doSqueeze() {
      this.squeeze = true
      this.$store.dispatch('mobile/header/setSqueeze')
    },
    notSqueeze() {
      setTimeout(() => {
        this.squeeze = false
      }, 50)
      this.$store.dispatch('mobile/header/removeSqueeze')
    },
    profile() {
      this.showProfile = true
    },
    closeProfile(data) {
      this.showProfile = data
    },
    showFooter(data) {
      this.expand = data
      this.expanded = data
    },
    fromRightHeader(data) {
      this.expanded = data
    },
    blurBackground(data) {
      this.blur = data
    },
    removeOverlay() {
      this.$nuxt.$emit('hideVCalender')
      this.$store.dispatch('mobile/header/removeOverlay')
      this.$store.dispatch('mobile/header/removePayment')
      this.expand = false
      this.expanded = false
      this.showProfile = false
    },
    removeExpand() {
      this.expand = false
      this.expanded = false
      this.showProfile = false
    },
    ...mapActions({
      login_button_transition: 'loginAnimation/login_button_transition',
      submit_button_transition: 'loginAnimation/submit_button_transition',
      login_form_transition: 'loginAnimation/login_form_transition',
      successfully: 'loginAnimation/successfully',
      after_loading: 'loginAnimation/after_loading',
      home_modal: 'loginAnimation/home',
      sidebar_menu: 'loginAnimation/sidebar_menu',
      sidebar_circle: 'loginAnimation/circle',
      home_sidebar: 'loginAnimation/sidebar',
      home_circle: 'loginAnimation/home_circle',
      login_circle: 'loginAnimation/login_circle',
      slide_left: 'loginAnimation/slide_left',
      show_logo: 'loginAnimation/show_logo',
      home_header: 'loginAnimation/header',
      width_increase: 'loginAnimation/width_increase',
      full_width: 'loginAnimation/full_width',
      home_side_menu: 'loginAnimation/home_side_menu',
      all_side_menu: 'loginAnimation/all_side_menu',
      show_home: 'loginAnimation/show_home',
      home_menu_text: 'loginAnimation/home_menu_text',
      show_home_content: 'loginAnimation/show_home_content',
      home_wrapper: 'loginAnimation/home_wrapper',
      show_logo_text: 'loginAnimation/show_logo_text',
      header_text: 'loginAnimation/header_text',
      loading_text: 'loginAnimation/loading_text',

      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
    }),
  },
})
</script>

<style lang="scss">
.apexcharts-tooltip-title {
  background-color: #a22a2a !important;
  color: white !important;
}
.apexcharts-xaxistooltip.apexcharts-active {
  opacity: 0 !important;
}
@import url('https://fonts.googleapis.com/css2?family=Roboto');
:root {
  color-scheme: light light !important;
  supported-color-schemes: light light !important;
}
.toasted-bg-archive {
  background-color: #8db230 !important;
}

.toasted-bg-search {
  background-color: #7d80bd !important;
}

.toasted-bg-alert {
  background-color: #ff5959 !important;
}

.toasted-bg-setting {
  background-color: #e0ad1f !important;
}

.toasted-container {
  top: 0 !important;
  z-index: 9999999999 !important;
}

html {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.blog {
  height: calc(100% - 3.75rem);
  @apply pl-4;
  margin-left: 90px;
  transition: all 0.5s;
  transition-delay: 0.5s;
  // animation: squeez 0.2s linear;
}

.blog1 {
  height: calc(100% - 3.75rem);
  margin-left: 0px;
  transition: margin 0.5s;
  // animation: squeez1 0.2s linear;
}

.content {
  display: flex;
  flex-direction: column;
  font-family: Roboto, system-ui;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  scrollbar-color: #177294 #ececec;
}

// .main-content {
//  height: calc(100vh - 60px);
// }

@mixin page($size, $name) {
  @if $name == bulkDownload {
    width: $size !important;
  }
}

@mixin page2($size, $name) {
  @if $name == archive {
    width: $size !important;
  }
}

.mx-datepicker {
  height: 47px;
  width: 100% !important;
  // @include page(100%, bulkDownload);
  // @include page2(0%, archive);
  border-radius: 20px;

  &::placeholder {
    border-color: #519fc5;
    color: #519fc5;
  }

  .mx-input {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding: 6px 30px;
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.4;
    color: #f8f8f8 !important;
    background-color: #8db230 !important;
    border: none;
    border-radius: 20px !important;
    box-shadow: none;
    outline: none;
    cursor: pointer;
  }

  .mx-input::placeholder {
    color: #f8f8f8;
  }

  .alert-date-input {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding: 6px 30px;
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.4;
    color: #f8f8f8 !important;
    background-color: #e05252 !important;
    border: none;
    border-radius: 20px !important;
    box-shadow: none;
    outline: none;
  }

  .alert-date-input::placeholder {
    color: #f8f8f8;
  }
}

.mx-icon-calendar,
.mx-icon-clear {
  display: none !important;
}

//Small Device
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}

.overlay-web {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}

.mobile_blog {
  height: 100%;
  margin-left: 0px;
  position: fixed;
  width: 100%;
  // z-index: 999;
  // top: 60px;
  // padding-bottom: 60px;
}

.scroll {
  overflow-y: auto;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
  }
}

[data-title]:hover:after {
  opacity: 1;
  transition: all 0.1s ease 0.5s;
  visibility: visible;
}

[data-title]:after {
  content: attr(data-title);
  position: absolute;
  bottom: -9px;
  padding: 2px;
  white-space: nowrap;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: 0px 0px 4px #666;
  -webkit-box-shadow: 0px 0px 4px #666;
  box-shadow: 0px 0px 4px #666;
  background-color: white;
  background-image: -moz-linear-gradient(top, #dbc9c9, #958f8f);
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #dbc9c9),
    color-stop(1, #958f8f)
  );
  background-image: -webkit-linear-gradient(top, #dbc9c9, #958f8f);
  background-image: -moz-linear-gradient(top, #dbc9c9, #958f8f);
  background-image: -ms-linear-gradient(top, #dbc9c9, #958f8f);
  background-image: -o-linear-gradient(top, #dbc9c9, #958f8f);
  opacity: 0;
  z-index: 99999999999999999999999;
  visibility: hidden;
  font-size: 12px;
}

[data-title] {
  position: relative;
}

// @media (max-width: 1024px) {
//   .blog {
//     height: calc(100% - 3.75rem);
//     margin-left: 0px;
//     transition: margin 0.5s;
//     // animation: squeez 0.2s linear;
//   }
// }
// .fadeIn-enter-active,
.fadeIn-leave-active {
  transition-delay: 1s;
  transition: opacity 0.5s ease-in-out;
}

.fadeIn-enter-active {
  // transition-delay: 1s;
  transition: opacity 0.5s ease-in-out;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

@media (max-width: 767px) {
  .scroll {
    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
  }
  [data-title]:after {
    z-index: 0;
    display: none;
  }
}

.StripeElement {
  border-radius: 25px !important;
}

.web-overlay {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 100px;
  right: 0;
  z-index: 101;
  background-color: rgba(255, 255, 255, 0.1);
  canvas {
    width: 100% !important;
  }
  .pac-container {
    z-index: 99999999999;
  }

  opacity: 1;
  // backdrop-filter: blur(6px);
  // -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}

@media (max-width: 767px) {
  .web-overlay {
    left: 0 !important;
    height: 100%;
  }
}

.VueCarousel-wrapper {
  height: 100% !important;
}

.VueCarousel-inner {
  height: 100% !important;
}
.video-js {
  width: 100% !important;
  min-height: 400px !important;
}
.bg-blur {
  filter: blur(4px);
}
.VueCarousel-navigation-next {
  border: none !important;
  outline: none !important;
  right: 62px !important;
}
.VueCarousel-navigation-prev {
  border: none !important;
  outline: none !important;
  left: 62px !important;
}
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
.modal-view {
  display: block;
}

table {
  border-collapse: collapse !important;
}
table,
tr,
th,
td {
  border: none !important;
}

canvas {
  // width: 100% !important;
  @apply mx-auto;
}
.pac-container {
  z-index: 99999999999;
}

.v-idle {
  display: none;
}
.fadeIn_Animation {
  -webkit-animation: fadeIn 0.5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadeIn 0.5s; /* Firefox < 16 */
  -ms-animation: fadeIn 0.5s; /* Internet Explorer */
  -o-animation: fadeIn 0.5s; /* Opera < 12.1 */
  animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Firefox < 16 */
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Internet Explorer */
@-ms-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Opera < 12.1 */
@-o-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.apexcharts-canvas .apexcharts-zoom-icon svg,
.apexcharts-zoomin-icon svg,
.apexcharts-zoom-icon.apexcharts-selected svg,
.apexcharts-zoomout-icon svg,
.apexcharts-reset-icon svg,
.apexcharts-menu-icon svg,
.apexcharts-canvas .apexcharts-selection-icon.apexcharts-selected svg,
.apexcharts-canvas .apexcharts-reset-zoom-icon.apexcharts-selected svg {
  fill: #a22a2a !important;
}
.apexcharts-pan-icon {
  transform: scale(0.7) !important;
  top: 1px !important;
}
.apexcharts-reset-icon {
  margin-top: 1px;
}
// .apexcharts-pan-icon.apexcharts-selected svg {
//   stroke: #A22A2A !important;
// }
// .apexcharts-element-hidden {
// opacity: 1 !important;
//   svg {
//     stroke: #A22A2A !important;
//     fill: #fff !important;
//   }
// }
.apexcharts-canvas .apexcharts-tooltip {
  -webkit-box-shadow: 8px 10px 6px -6px #777;
  -moz-box-shadow: 8px 10px 6px -6px #777;
  box-shadow: 8px 10px 10px -6px #777;
}
.content p {
  margin: 0px !important;
}
.text-color {
  color: #f2f2f2 !important;
}
.text-normal {
  font-weight: normal !important;
}
.text-bold {
  font-weight: bold !important;
}
</style>
