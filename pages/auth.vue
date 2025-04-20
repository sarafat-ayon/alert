<template>
  <div class="content">
    <!-- <transition name="fadeIn">
      <header class="text-right py-2 px-4">
        <button
          class="login-btn"
          @click="showUserLoginComp(), closeStarterModal()"
        >
          <fa
            class="
              text-yellow-600
              md:text-2xl
              text-2xl
              md:pl-0
              md:pt-2
              pl-6
              mt-2
              inline-block
              text-de
            "
            :icon="['fas', 'user-circle']"
          />
          <span class="md:inline-block hidden">Log In</span>
        </button>
      </header>
    </transition> -->
    <main class="main-content" @click="closeStarterModal">
      <Logo />
      <!-- <div class="intro">
        <transition name="fadeIn">
          <Intro v-if="!starterExpanded" />
        </transition>
      </div> -->
    </main>

    <!-- starter modal -->
    <!-- <starter-modal
      @show-sliding="showHomeSlider($event)"
      @show-full-sliding="showFullHomeSlider($event)"
      @show="showHomeSliderWrapper($event)"
      @show-sidebar-menu="sidebarMenu($event)"
      @sidebar-home-text="sidebarHomeText($event)"
      @sidebar-all-text="sidebarAllText($event)"
      @squeeze-sidebar="sidebarSqueeze($event)"
      @home-page="redirectToHomePage($event)"
    /> -->
    <registration
      @show-sliding="showHomeSlider($event)"
      @show-full-sliding="showFullHomeSlider($event)"
      @show="showHomeSliderWrapper($event)"
      @show-sidebar-menu="sidebarMenu($event)"
      @sidebar-home-text="sidebarHomeText($event)"
      @sidebar-all-text="sidebarAllText($event)"
      @squeeze-sidebar="sidebarSqueeze($event)"
      @home-page="redirectToHomePage($event)"
    />
    <!-- starter modal -->
    <!-- starter modal -->
    <!-- <transition name="slideRight">
      <side-bar v-if="showLogin" />
    </transition> -->
    <!-- start of Login form -->
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
    <!-- <home-page-loading-animation
      :show-login="showUserLogin"
      @hide="hideLoginComp()"
    /> -->
    <!-- end of Login form -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Logo from '../components/SharpArchiveSmallLogo.vue'
// import Intro from '../components/Intro.vue'
// import StarterModal from '~/components/StarterModal'
import Registration from '~/components/Registration.vue'
// import SideBar from '~/components/setup/archive/feeds/SideBar'
// import HomePageLoadingAnimation from '~/components/HomePageLoadingAnimation'
import SignupAnimation from '~/components/SignupAnimation'
export default {
  name: 'Welcome',
  components: {
    Logo,
    // Intro,
    // StarterModal,
    // SideBar,
    // HomePageLoadingAnimation,
    SignupAnimation,
    Registration,
  },
  auth: false,
  layout: 'ab',
  data() {
    return {
      upLogoIndex: false,
      showUserLogin: false,
      showLogin: false,
      homeSlider: false,
      fullHomeSlider: false,
      homeSliderWrapper: false,
      showSidebarMenu: false,
      homeText: false,
      allSidebarText: false,
      squeezeSidebar: false,
      homePage: true,
      textOfHeader: false,
      landingPageLogo: false,
    }
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      sidebarModal: 'sidebarModal',
      loginModal: 'loginModal',
    }),
  },
  mounted() {
    if (this.$route.query.showLogin) {
      this.showUserLogin = true
    }
  },
  methods: {
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
      setStorageFormatSelect: 'setStorageFormatSelect',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      this.expand_starter_modal(false)
      this.maximize_starter_modal(false)
      this.updateSetupContent('starter-button')
      setTimeout(() => {
        this.updateSetupContent('starter-button')
      }, 500)
    },
    updateLogoIndex(data) {
      this.upLogoIndex = data
    },
    showUserLoginComp() {
      this.showUserLogin = true
    },
    hideLoginComp() {
      this.showUserLogin = false
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
      this.landingPageLogo = true
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

<style lang="scss" scoped>
.content {
  background-image: url('@/assets/background.png');
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
  color: #393e46;
  background-repeat: no-repeat;
  background-size: cover;
  @apply relative w-full h-screen overflow-hidden flex flex-col;
  header {
    .login-btn {
      @apply text-white outline-none border-none;
    }
  }
  main {
    @apply flex-grow w-full flex flex-col justify-center items-center;
    .logo-wrapper {
      @apply absolute;
      &.left {
        width: 60px;
        height: 60px;
        @apply absolute left-10 2xl:left-14 top-0;
      }
      &.center {
        @apply top-20 left-1/2 lg:w-34 w-26;
        transform: translate(-50%, 0);
      }
    }
    .intro {
      @apply mx-auto w-3/4;
    }
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 1s ease-in-out;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
}

// SidebarIn transition
.slideRight-enter-active,
.slideRight-leave-active {
  transition: all 1s ease-in-out;
}

.slideRight-enter-to,
.slideRight-leave {
  transform: translate(0%);
}

.slideRight-leave-to,
.slideRight-enter {
  transform: translate(100%);
}
// SlideIn transition
.slideIn-enter-active {
  transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-in-out 0.5s;
}
.slideIn-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-in-out;
}

.slideIn-enter {
  opacity: 0;
  transform: translate(100%);
}

.slideIn-enter-to {
  opacity: 1;
  transform: translate(0%);
}

.slideIn-leave {
  opacity: 1;
  transform: translate(0%);
}

.slideIn-leave-to {
  opacity: 0;
  transform: translate(-100%);
}

@media (max-width: 767px) {
  .svg-inline--fa.fa-w-16 {
    width: 2em !important;
  }
  .a {
    font-size: 20px !important;
  }
}
</style>
