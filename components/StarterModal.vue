<template>
  <!-- LogoShow || homeContent ? '' : 'z-30', -->
  <div
    class="starter-modal z-30"
    :class="[
      starterExpanded ? 'expanded' : '',
      starterFullExpand || lateStartFullExpand ? 'maximized' : '',
      starterExpanded && !modalFullExpand ? 'md:z-31 z-31' : '',
      logoHide ? 'starter-modal_index' : '',
    ]"
  >
    <div
      class="setup-container z-99999"
      :class="[
        starterCollapse && !starterAccountMaximized
          ? 'setup-container_collaps'
          : '',
        starterExpanded && fullExpand ? 'setup-container_expand' : '',
      ]"
    >
      <!-- <transition mode="in-out" name="fadeIn"> -->
      <component
        :is="setupContent"
        @next="switchSetupContent($event)"
        @hide="fadeOutTabMenu($event)"
        @show-sliding="showHomeSlider($event)"
        @show-full-sliding="showFullHomeSlider($event)"
      ></component>
      <!-- </transition> -->
    </div>
    <div
      v-if="starterExpanded"
      class="account-setup"
      :class="[
        starterFullExpand ? 'trans_top' : 'trans_bottom',
        hideButton ? 'opacity-0' : '',
      ]"
    >
      <div class="container1 space-y-6">
        <div class="tab-wrapper1 h-10"></div>
        <div class="content-wrapper1">
          <div class="setup-container-button">
            <!-- <transition name="fadeIn"> -->
            <div
              class="card1 z-9999 transition-all duration-1000 ease-in-out"
              :class="[
                starterFullExpand
                  ? 'full_expand modal_expand'
                  : 'half_collapse',
                showSignUp ? 'opacity-1' : 'opacity-0',
              ]"
            >
              <div
                v-if="!loggedIn"
                class="card-body1 transition-all duration-700 ease-in-out cursor-pointer font-bold"
                :class="starterFullExpand ? 'opacity-0' : 'opacity-1 delay-500'"
                @click="openStarterModal()"
              >Sign Up</div>

              <button
                v-if="loggedIn"
                class="card-body1 transition-all duration-700 ease-in-out cursor-pointer font-bold"
                @click="$router.push('/home')"
              >Home</button>
            </div>

            <!-- </transition> -->
            <div class="card-footer next1 transition-all duration-500 ease-in-out"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="lateCloseFullExpand"
      class="account-setup"
      :class="[
        lateStartFullExpand ? 'trans_top' : 'trans_bottom',
        starterAccountMaximized ? 'opacity-1' : '',
      ]"
    >
      <div class="container1 space-y-6">
        <div class="tab-wrapper1 h-10"></div>
        <div class="content-wrapper1">
          <div class="setup-container-button">
            <!-- <transition name="fadeIn"> -->
            <div
              class="card1 z-9999 transition-all duration-1000 ease-in-out"
              :class="[
                lateStartFullExpand
                  ? 'full_expand modal_expand'
                  : 'half_collapse',
                fadeOutButton ? '' : 'opacity-0',
              ]"
            >
              <div
                class="card-body1 transition-all duration-700 ease-in-out cursor-pointer font-bold"
                :class="textHide ? 'opacity-0' : 'opacity-1 delay-2000'"
              >Pricing</div>
            </div>
            <!-- </transition> -->
            <div class="card-footer next1 transition-all duration-500 ease-in-out"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import StarterButton from '~/components/setup/StarterButton'
import PricePlan from '~/components/setup/PricePlan.vue'
import AccountSetup from '~/components/setup/AccountSetup'

export default {
  components: {
    StarterButton,
    AccountSetup,
    PricePlan,
  },
  props: {
    logoHide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pricBtnHidden: false,
      priceBtnExpended: false,
      showSearchBar: false,
      searchBarSlideIn: false,
      searchText: '',
      searchResult: [],
      skip: 0,
      showSetup: false,
      activeComponent: 'feeds',
      loading: false,
      homeContent: false,
      homeSlider: false,
      fullHomeSlider: false,
      showSidebarMenu: false,
      homeText: false,
      allSidebarText: false,
      squeezeSidebar: false,
      homePage: true,
      fullExpand: true,
      hideButton: false,
      starterFullExpand: false,
      lateStartFullExpand: false,
      lateCloseFullExpand: false,
      fadeInButton: false,
      next: false,
      textHide: false,
      fadeOutButton: true,
      LogoShow: false,
      starterIndex: false,
      modalFullExpand: false,
    }
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      starterCollapse: 'starterCollapse',
      starterMaximized: 'starterMaximized',
      starterAccountMaximized: 'starterAccountMaximized',
      showSignUp: 'showSignUp',
      sidebarModal: 'sidebarModal',
      setupContent: 'setupContent',
    }),
    ...mapState('loginAnimation', {
      landingContent: 'landingContent',
      showLogin: 'showLogin',
    }),
    ...mapGetters('user', ['getNewUserToken']),
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  watch: {
    showLogin(data) {
      if (data) {
        this.LogoShow = true
      } else {
        setTimeout(() => {
          this.LogoShow = false
        }, 1000)
      }
    },
    starterMaximized(data) {
      if (data) {
        this.modalFullExpand = true
        setTimeout(() => {
          this.fullExpand = false
        }, 400)
        setTimeout(() => {
          this.hideButton = true
        }, 1000)
        this.starterFullExpand = true

        setTimeout(() => {
          this.next = true
        }, 1000)
      } else {
        setTimeout(() => {
          this.fullExpand = true
          this.modalFullExpand = false
        }, 500)
        this.hideButton = false
        setTimeout(() => {
          this.starterFullExpand = false
        }, 500)
        setTimeout(() => {
          this.next = false
        }, 1000)
      }
    },
    starterAccountMaximized(data) {
      if (data) {
        setTimeout(() => {
          this.hideButton = true
        }, 1000)
        this.starterFullExpand = true
        setTimeout(() => {
          this.lateStartFullExpand = true
          this.textHide = true
        }, 300)
        this.lateCloseFullExpand = true
        setTimeout(() => {
          this.next = true
        }, 1000)
        setTimeout(() => {
          this.fadeOutButton = false
        }, 1500)
      } else {
        this.hideButton = false
        setTimeout(() => {
          this.starterFullExpand = false
        }, 500)
        setTimeout(() => {
          this.next = false
        }, 1000)
        setTimeout(() => {
          this.lateStartFullExpand = false
        }, 800)
        setTimeout(() => {
          this.lateCloseFullExpand = false
        }, 2000)
        this.textHide = false
        this.fadeOutButton = true
      }
    },
  },
  methods: {
    switchSetupContent($event) {
      this.setupContent = $event
    },

    showHomeSlider($event) {
      this.homeSlider = $event
      this.$emit('show-sliding', this.homeSlider)
    },
    fadeOutTabMenu($event) {
      this.homeContent = $event
      this.$emit('show', this.homeContent)
    },
    showFullHomeSlider($event) {
      this.fullHomeSlider = $event
      this.$emit('show-full-sliding', this.fullHomeSlider)
      setTimeout(() => {
        this.showSidebarMenu = true
        this.$emit('show-sidebar-menu', this.showSidebarMenu)
        setTimeout(() => {
          this.homeText = true
          this.$emit('sidebar-home-text', this.homeText)
          this.allSidebarText = true
          this.$emit('sidebar-all-text', this.allSidebarText)
          setTimeout(() => {
            // this.allSidebarText = true
            // this.$emit('sidebar-all-text', this.allSidebarText)
            this.squeezeSidebar = true
            this.$emit('squeeze-sidebar', this.squeezeSidebar)
          }, 1200)
          // setTimeout(() => {
          //   this.squeezeSidebar = true
          //   this.$emit('squeeze-sidebar', this.squeezeSidebar)
          // }, 1800)
          setTimeout(() => {
            if (this.getNewUserToken) {
              this.$auth
                .setUserToken(
                  this.getNewUserToken.access,
                  this.getNewUserToken.refresh
                )
                .then(
                  () => this.$toast.success('You are successfully log In'),
                  {
                    className: ['toasted-bg-archive'],
                  }
                )
            }
            this.$router.replace('/home')
          }, 2000)
        }, 800)
      }, 950) // 1500
    },

    openStarterModal() {
      this.maximize_starter_modal(true)
      setTimeout(() => {
        this.updateSetupContent('account-setup')
      }, 1000)
    },

    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      toggle_sidebar_modal: 'toggle_sidebar_modal',
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>

<style lang="scss" scoped>
.starter-modal {
  height: 100px;
  border-radius: 20px 20px 0 0;
  background-color: #373e46;
  transition: all 1s ease-in-out;
  // box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  //   rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
  //   rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: rgba(0, 0, 0, 3) 0px 5px 20px;
  @apply w-full text-center flex justify-center fixed
        bottom-0;

  .setup-container {
    // Need component implementation to make relative
    @apply w-full h-full absolute flex justify-center overflow-hidden;
  }
  .setup-container_expand {
    animation: box 1s ease-in-out;
    animation-fill-mode: forwards;
    @apply absolute;
    height: 100%;
  }
  @keyframes box {
    0% {
      bottom: 0px;
      top: 0px;
    }
    100% {
      top: -15%;
    }
  }

  .setup-container_collaps {
    animation: collapse 1s ease-in-out;
    animation-fill-mode: forwards;
    @apply absolute;
    height: 100%;
  }
  @keyframes collapse {
    0% {
      top: -15%;
    }
    100% {
      top: 0px;
      bottom: 0px;
    }
  }

  &.expanded {
    height: 64%;
    // @apply 2xl:h-2/3 md:h-2/3 h-4/6;
  }
  &.maximized {
    height: 100%;
    border-radius: 0;
  }
}

.card-footer {
  position: absolute;
  bottom: 25px;
  height: 40px;
  width: 176px;
  max-height: 40px;
  max-width: 176px;
}

.fadeIn-enter-active {
  transition: all 1s ease-in-out 1s;
}
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
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
  // display: none;
}

.slideIn-leave-to {
  opacity: 0;
  // display: none;
  transform: translate(-100%);
}

.account-setup {
  // padding-top: 40px;
  // width: 100%;
  transition: all 1s ease-in-out;
  bottom: 0px;
  height: 252px;
  padding-top: 118px;
  // @apply h-full absolute flex justify-center md:pt-10;
  @apply h-full w-full absolute flex justify-center flex-grow overflow-hidden; // pt-10
  .container1 {
    // @apply w-full md:w-3/4 h-full flex flex-col items-center space-y-6 p-4;
    @apply md:w-3/4 w-full h-full flex flex-col items-center pt-5 md:pb-4 overflow-hidden;
    .tab-wrapper1 {
      height: 40px;
      @apply flex justify-center;
    }
    .content-wrapper1 {
      transition: all 1s ease-in-out;
      // opacity: 0;
      // max-height: 100%;
      // @apply w-full flex-grow flex justify-center overflow-hidden;
      @apply w-full h-full flex-grow flex justify-center overflow-hidden;
    }
  }
}

.trans_top {
  height: 100%;
}

.trans_bottom {
  height: 254px;
}

.setup-container-button {
  @apply w-full h-full flex flex-col items-center justify-between relative overflow-hidden px-0 space-y-4;
  .card1 {
    height: 40px;
    width: 176px;
    max-height: 644px !important;
    max-width: 400px;
    transition: all 1s ease-in-out;
    @apply h-full mx-auto md:my-3.5 md:mt-0 text-left bg-yellow-primary rounded-full flex flex-col overflow-hidden;
    .card-body1 {
      height: 100%;
      @apply w-full flex-grow flex justify-center items-center text-white overflow-auto;
    }
  }
  .next1 {
    min-height: 70px;
    @apply py-4 md:p-4 text-white;
  }
}

.modal_expand {
  height: 80% !important;
  width: 70% !important;
  max-height: 644px !important;
  max-width: 400px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

.full_expand {
  animation: box12 1s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes box12 {
  0% {
    @apply rounded-2xl;
  }
  100% {
    @apply rounded-2xl;
  }
}

.half_collapse {
  animation: button 1s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes button {
  0% {
    @apply rounded-2xl;
  }
  98% {
    @apply rounded-2xl;
  }
  100% {
    @apply rounded-full;
  }
}

@media (max-width: 826px) {
  .starter-modal_index {
    z-index: 30;
  }
}

@media (max-width: 767px) {
  .expanded {
    height: 70% !important; //66.667%
  }
  .maximized {
    height: 100% !important;
    border-radius: 0;
  }
  .card1 {
    margin-bottom: 1.9rem;
    margin-top: 0.75rem;
  }
  .modal_expand {
    height: 80% !important;
    width: 90% !important;
    max-height: 644px !important;
    max-width: 400px;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }
  .trans_bottom {
    height: 220px;
  }
  .account-setup {
    padding-top: 68px !important;
  }
}

@media (min-height: 540px) and (max-height: 893px) and (min-width: 768px) {
  .account-setup {
    padding-top: 34px !important;
  }
  .trans_bottom {
    height: 170px !important;
  }
}
</style>
