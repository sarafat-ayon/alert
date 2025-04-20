<template>
  <div class="starter-modal expanded maximized" tabindex="0">
    <div class="setup-container">
      <transition name="fadeIn">
        <account-setup
          @hide="fadeOutTabMenu($event)"
          @show-sliding="showHomeSlider($event)"
          @show-full-sliding="showFullHomeSlider($event)"
        ></account-setup>
        <!-- <component
          :is="setupContent"
          @next="switchSetupContent($event)"
          @hide="fadeOutTabMenu($event)"
          @show-sliding="showHomeSlider($event)"
          @show-full-sliding="showFullHomeSlider($event)"
        >
        </component> -->
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import StarterButton from '~/components/setup/StarterButton'
// import ArchiveSetup from '~/components/setup/ArchiveSetup'
// import PricePlan from '~/components/setup/PricePlan.vue'
import AccountSetup from '~/components/setup/AccountSetup'
// import Loading from '~/components/setup/Loading'
export default {
  components: {
    // StarterButton,
    AccountSetup,
    // ArchiveSetup,
    // Loading,
    // PricePlan,
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
      activeComponent: 'account',
      loading: false,
      homeContent: false,
      homeSlider: false,
      fullHomeSlider: false,
      showSidebarMenu: false,
      homeText: false,
      allSidebarText: false,
      squeezeSidebar: false,
      homePage: true,
    }
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      starterMaximized: 'starterMaximized',
      sidebarModal: 'sidebarModal',
      setupContent: 'setupContent',
    }),
    ...mapGetters('user', ['getNewUserToken']),
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
          setTimeout(() => {
            this.allSidebarText = true
            this.$emit('sidebar-all-text', this.allSidebarText)
          }, 1200)
          setTimeout(() => {
            this.squeezeSidebar = true
            this.$emit('squeeze-sidebar', this.squeezeSidebar)
          }, 1800)
          setTimeout(() => {
            // this.homePage = false
            // this.$emit('home-page', this.homePage)
            if (this.getNewUserToken) {
              this.$auth
                .setUserToken(
                  this.getNewUserToken.access,
                  this.getNewUserToken.refresh
                )
                .then(
                  () =>
                    this.$toast.success('You are successfully log In', {
                      className: ['toasted-bg-archive'],
                    }),
                )
            }
            this.$router.replace('/home')
          }, 2000)
        }, 800)
      }, 1500)
    },

    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      toggle_sidebar_modal: 'toggle_sidebar_modal',
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
  @apply w-full text-center flex justify-center fixed
        bottom-0;

  .setup-container {
    // Need component implementation to make relative
    @apply w-full h-full absolute flex justify-center overflow-hidden;
  }
  &.expanded {
    @apply 2xl:h-4/5 md:h-3/4 h-1/2;
  }
  &.maximized {
    // width: 75%;
    height: 100%;
    border-radius: 0;
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
  // transition-delay: 1s;
  transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-in-out 0.5s;
}
.slideIn-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-in-out;
}

.slideIn-enter {
  opacity: 0;
  // display: none;
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
</style>
