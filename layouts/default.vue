<template>
  <section
    class="relative font-sans bg-white"
    :class="[logoHide ? 'h-full w-auto overflow-hidden' : 'w-full']"
  >
    <landing-loader></landing-loader>
    <lock-screen v-if="lockScreen"></lock-screen>
    <section :class="lockScreen ? 'hidden' : ''">
      <transition name="my-layouts">
        <div
          class="relative overflow-hidden bg-white"
          :class="[
            showPasswordConfirmModal ? 'bg-blur' : '',
            loginStart ? 'pointer-events-none' : '',
          ]"
        >
          <landing-header
            v-if="!homeSliderWrapper"
            :show-user-login="showUserLogin"
            @hide-logo="hideLogo($event)"
            @show-login="showUserLogin = true"
          ></landing-header>
          <landing-logo
            v-if="!fullHomeSlider"
            class="fixed"
            :show-login="showUserLogin"
            :class="[
              isSticky ||
              headerWidth ||
              starterExpanded ||
              starterAccountMaximized
                ? 'stickyTop min-w-full top-0'
                : '',

              showLogo ? 'md:z-31 z-31' : 'md:z-31 logo',
              landingContent ? 'starterIndex' : '',
              logoHide ? 'z-999999' : '',
            ]"
          ></landing-logo>
          <div class @click="hideLogin()">
            <Nuxt />
          </div>
          <template v-if="!landingLoader">
            <starter-modal
              :show-login="showUserLogin"
              :logo-hide="logoHide"
              @show-sliding="showHomeSlider($event)"
              @show-full-sliding="showFullHomeSlider($event)"
              @show="showHomeSliderWrapper($event)"
              @show-sidebar-menu="sidebarMenu($event)"
              @sidebar-home-text="sidebarHomeText($event)"
              @sidebar-all-text="sidebarAllText($event)"
              @squeeze-sidebar="sidebarSqueeze($event)"
              @home-page="redirectToHomePage($event)"
            ></starter-modal>
            <home-page-loading-animation
              ref="login"
              :show-login="showUserLogin"
              @hide="hideLoginComp()"
              @login-start="loginStart = true"
              @login-stop="loginStart = false"
            />
          </template>
        </div>
      </transition>
      <template v-if="!landingLoader">
        <transition name="up_arrow">
          <div
            v-if="isSticky"
            class="fixed hidden lg:bottom-48 xl:bottom-44 md:bottom-28 right-10"
            :class="
              showUserLogin || starterExpanded ? 'hidden' : 'md:inline-block'
            "
            @click="topFunction()"
          >
            <span>
              <img
                class="w-16 cursor-pointer md:w-full"
                src="~/assets/img/icon/up-arrow.png"
                alt="Up arrow to go at the top of the page"
              />
            </span>
          </div>
        </transition>
        <signup-animation
          :home-slider-wrapper="homeSliderWrapper"
          :home-slider="homeSlider"
          :full-home-slider="fullHomeSlider"
          :show-sidebar-menu="showSidebarMenu"
          :sidebar-home-text="homeText"
          :all-sidebar-text="allSidebarText"
          :squeeze-sidebar="squeezeSidebar"
          :home-page="homePage"
          :text-of-header="textOfHeader"
        />
        <profile v-if="loggedIn" :global-color-panel="globalColorPanel"></profile>
        <cookies></cookies>
        <v-idle class="hidden" :duration="lockScreenDuration" @idle="onidle" />
      </template>
    </section>
    <transition name="my-layouts">
      <forget-password-modal></forget-password-modal>
    </transition>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Cookies from '~/components/Cookies.vue'
import HomePageLoadingAnimation from '~/components/HomePageLoadingAnimation'
import StarterModal from '~/components/StarterModal.vue'
import LandingHeader from '~/components/setup/LandingHeader.vue'
import LandingLogo from '~/components/LandingLogo.vue'
import SignupAnimation from '~/components/SignupAnimation.vue'
import ForgetPasswordModal from '~/components/ForgetPasswordModal.vue'
import Profile from '~/components/settings/account/Profile'
import LockScreen from '~/components/LockScreen.vue'
import LandingLoader from '~/components/LandingLoader.vue'
export default {
  name: 'DefaultLayout',
  components: {
    LandingHeader,
    HomePageLoadingAnimation,
    StarterModal,
    LandingLogo,
    SignupAnimation,
    ForgetPasswordModal,
    Profile,
    Cookies,
    LockScreen,
    LandingLoader,
  },
  data() {
    return {
      showLoginModal: false,
      showUserLogin: false,
      isLoading: true,
      logoHide: false,
      showLogo: true,
      homeSlider: false,
      fullHomeSlider: false,
      homeSliderWrapper: false,
      showSidebarMenu: false,
      homeText: false,
      allSidebarText: false,
      squeezeSidebar: false,
      homePage: true,
      textOfHeader: false,
      lockScreenDuration: 60 * 10,
      loginStart: false,
    }
  },
  head() {
    return {
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'Corporation',
            name: 'Sharp Archive',
            url: 'https://sharparchive.com',
            logo: 'https://cdn.sharparchive.com/files/icons/icon_512x512.575584.png',
            sameAs: [
              'https://www.facebook.com/SharpArchive',
              'https://twitter.com/Sharp_Archive',
              'https://www.linkedin.com/company/sharp-archive',
              'https://www.instagram.com/sharparchive',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '6494 S Quebec St',
              addressLocality: 'Centennial',
              addressRegion: 'CO',
              postalCode: '80111',
              addressCountry: 'US',
            },
          },
        },
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
  layoutTransition: {
    name: 'my-layouts',
    mode: '',
  },
  computed: {
    ...mapState(['globalColorPanel']),
    ...mapState({
      starterExpanded: 'starterExpanded',
      starterMaximized: 'starterMaximized',
      starterCollapse: 'starterCollapse',
      starterAccountMaximized: 'starterAccountMaximized',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
    }),
    ...mapState('loginAnimation', {
      landingContent: 'landingContent',
      showLogin: 'showLogin',
    }),
    loggedIn() {
      return this.$auth.loggedIn
    },
    ...mapState('confirm', ['showPasswordConfirmModal']),
    lockScreen() {
      return this.$store.state.lockScreen
    },
    ...mapState(['landingLoader']),
  },
  watch: {
    showUserLogin(data) {
      if (data) {
        // setTimeout(() => {
        this.showLogo = false
        // }, 1000)
      } else {
        setTimeout(() => {
          this.showLogo = true
        }, 1000)
      }
    },
    lockScreen(data) {
      if (!data && window.HubSpotConversations) {
        window.HubSpotConversations.widget.load()
      }
    },
  },
  beforeCreate() {
    this.isLoading = true
  },
  mounted() {
    if (this.loggedIn) {
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
    } else if (window.HubSpotConversations) {
      window.HubSpotConversations.widget.load()
    }
    this.lockScreenDuration =
      window.location.origin === 'https://sharparchive.com' ? 60 * 60 : 60 * 10
    if (this.$auth.loggedIn) {
      if (localStorage.getItem('lockScreen')) {
        this.$store.commit(
          'SET_LOCK_SCREEN',
          localStorage.getItem('lockScreen')
        )
      }
    }
    this.removeLoading()
    window.addEventListener('scroll', this.handleScroll)
    this.home_wrapper(true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    onidle() {
      if (this.$auth.loggedIn) {
        localStorage.setItem('lockScreen', true)
        this.$store.commit('SET_LOCK_SCREEN', true)
      }
    },
    hideLogin() {
      this.showUserLogin = false
      if (this.starterExpanded && this.$route.query.pricing === 'true') {
        this.$router.push('/')
      }
      this.show_login(false)
      this.$refs.login.hideForm()
      setTimeout(() => {
        this.landing_content(false)
      }, 500)
    },
    topFunction() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    removeLoading() {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    hideLoginComp() {
      this.showUserLogin = false
    },
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      // if (this.$route.name === 'index') {
      this.setIsSticky(window.scrollY > 2)
      // }
    },
    ...mapActions({
      login_button_transition: 'loginAnimation/login_button_transition',
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      setTimeout(() => {
        this.expand_starter_modal(false)
      }, 100)
      if (this.starterExpanded) {
        this.collapse_starter_modal(false)
      }
      this.maximize_starter_modal(false)
      if (this.starterExpanded) {
        this.updateSetupContent('starter-button')
      }
      // setTimeout(() => {
      //   this.updateSetupContent('starter-button')
      // }, 500)
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
      home_wrapper: 'loginAnimation/home_wrapper',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
    }),
    hideLogo($event) {
      this.logoHide = $event
    },
    showHomeSlider($event) {
      this.homeSlider = $event
      this.textOfHeader = true
    },
    showFullHomeSlider($event) {
      this.fullHomeSlider = $event
    },
    showHomeSliderWrapper($event) {
      this.homeSliderWrapper = $event
    },
    sidebarMenu($event) {
      this.showSidebarMenu = $event
    },
    sidebarHomeText($event) {
      this.homeText = $event
    },
    sidebarAllText($event) {
      this.allSidebarText = $event
    },
    sidebarSqueeze($event) {
      this.squeezeSidebar = $event
    },
    redirectToHomePage($event) {
      this.homePage = $event
    },
  },
}
</script>
<style lang="scss">
:root {
  color-scheme: light light !important;
  supported-color-schemes: light light !important;
}
.emoji-mart-scroll {
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: 6px !important; /* Firefox 64 */
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
.toasted-bg-archive {
  background-color: #8db230 !important;
}

.toasted-bg-search {
  background-color: #7d80bd !important;
}

.toasted-bg-alert {
  background-color: #a22a2a !important;
}

.toasted-bg-setting {
  background-color: #e0ad1f !important;
}

.toasted-container {
  top: 0 !important;
  z-index: 9999999999 !important;
}

html {
  scroll-behavior: smooth;
  @apply scroll;
}

.embed-responsive-item {
  width: 100%;
  @apply lg:h-96 h-60;
}
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
.up_arrow-enter-active,
up_arrow .up_arrow-leave-active {
  transition: opacity 0.5s;
}
.up_arrow-enter,
.up_arrow-leave-active {
  opacity: 0;
}
.intro-head h1 {
  @apply lg:text-7xl md:text-5xl text-3xl font-semibold mb-5 text-yellow-primary;
}
.intro-head b {
  @apply text-white;
}

.people-say h2 {
  @apply text-gray-600 text-center md:text-4xl text-2xl font-normal;
}
.people-say b {
  @apply text-yellow-primary;
}
.feature-key-head-title h2 {
  @apply lg:text-50px text-33px text-center text-gray-light font-thin font-roboto;
}
.feature-key-head-title b {
  @apply text-yellow-primary font-normal font-roboto;
}
.starterIndex {
  z-index: 31;
}
.pac-item {
  cursor: pointer;
}
.pac-container:after {
  content: none !important;
}

.scroll {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    background: #e4801d;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e4801d;
    border-radius: 3px;
  }
}

@media (max-width: 826px) {
  .logo {
    z-index: 31;
  }
}

#stripe-element-errors {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
  color: rgba(153, 27, 27, 1) !important;
  margin-left: 5px !important;
}
.bg-blur {
  filter: blur(4px);
}

.StripeElement {
  box-shadow: none !important;
}
#zoomContainer iframe {
  min-height: 400px;
  height: 100% !important;
  width: 100% !important;
}
</style>