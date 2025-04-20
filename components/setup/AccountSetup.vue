<template>
  <div
    class="account-wrapper transition-all duration-500 ease-in-out z-99999"
    :class="[
      starterMaximized || starterAccountMaximized ? '' : 'opacity-0',
      increseIndex ? 'z-9999' : '',
    ]"
  >
    <div class="account-setup">
      <div
        class="container"
        :class="
          activeComponent === 'security' || activeComponent === 'payment'
            ? 'space-y-6'
            : 'space-y-6'
        "
      >
        <div class="tab-wrapper">
          <account-tab-menu
            :tab-active="activeComponent"
            :tab-menu-content="tabMenuContent"
            @change="switchContent($event)"
          ></account-tab-menu>
        </div>
        <div class="content-wrapper">
          <transition name="slideIn">
            <component
              :is="activeComponent"
              @next="switchContent($event)"
              @hide="fadeOutTabMenu($event)"
              @sliding="showHomeSlider($event)"
              @full-sliding="showFullHomeSlider($event)"
            ></component>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AccountTabMenu from '~/components/setup/account/AccountTabMenu'
import Account from '~/components/setup/account/Account'
import Security from '~/components/setup/account/Security'
import Payment from '~/components/setup/account/Payment'

export default {
  components: {
    AccountTabMenu,
    Account,
    Security,
    Payment,
  },
  data() {
    return {
      activeComponent: 'account',
      setupContent: '',
      tabMenuContent: false,
      homeSlider: false,
      fullHomeSlider: false,
      increseIndex: false,
    }
  },
  computed: {
    ...mapState({
      starterMaximized: 'starterMaximized',
      starterAccountMaximized: 'starterAccountMaximized',
    }),
  },
  watch: {
    starterMaximized(data) {
      if (data) {
        setTimeout(() => {
          this.increseIndex = true
        }, 500)
      } else {
        this.increseIndex = false
      }
    },
  },
  mounted() {
    if (this.starterMaximized || this.starterAccountMaximized) {
      setTimeout(() => {
        this.increseIndex = true
      }, 500)
    } else {
      this.increseIndex = false
    }
  },
  methods: {
    switchContent($event) {
      this.activeComponent = $event
    },
    fadeOutTabMenu($event) {
      this.tabMenuContent = $event
      this.$emit('hide', this.tabMenuContent)
    },
    showHomeSlider($event) {
      this.homeSlider = $event
      this.$emit('show-sliding', this.homeSlider)
    },
    showFullHomeSlider($event) {
      this.fullHomeSlider = $event
      this.$emit('show-full-sliding', this.fullHomeSlider)
    },
    ...mapActions({
      toggle_sidebar_modal: 'toggle_sidebar_modal',
      maximize_starter_modal: 'maximize_starter_modal',
    }),
  },
}
</script>

<style lang="scss" scoped>
.account-wrapper {
  // @apply w-full h-full absolute overflow-hidden;
  @apply w-full h-full absolute overflow-y-auto md:overflow-hidden flex flex-col md:block;
  .account-setup {
    // padding-top: 40px;
    // width: 100%;
    transition: all 1s ease-in-out;
    // @apply h-full absolute flex justify-center md:pt-10;
    padding-top: 118px;
    @apply h-full w-full md:absolute flex justify-center flex-grow overflow-y-auto md:overflow-hidden; // pt-10

    .container {
      // @apply w-full md:w-3/4 h-full flex flex-col items-center space-y-6 p-4;
      @apply md:w-3/4 h-full flex flex-col items-center pt-4 md:pb-4 overflow-x-hidden;
      .tab-wrapper {
        @apply flex justify-center;
      }
      .content-wrapper {
        transition: all 1s ease-in-out;
        // opacity: 0;
        // max-height: 100%;
        // @apply w-full flex-grow flex justify-center overflow-hidden;
        @apply w-full h-full flex-grow flex justify-center overflow-y-auto md:overflow-hidden;
        &.fadeIn {
          opacity: 1;
        }
      }
    }
  }
}

// fadeIn transition
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
// slideRight transition
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
@media (max-width: 767px) {
  .account-setup {
    padding-top: 68px !important;
  }
}

@media (min-height: 540px) and (max-height: 893px) and (min-width: 768px) {
  .account-setup {
    padding-top: 34px !important;
  }
}
</style>
