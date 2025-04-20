<template>
  <div>
    <aside
      id="sidebar"
      class="sidebar md:hidden"
      :class="{ expanded: expanded, swipeActive: !dragging }"
      :style="{ height: `${sideBarHeight}px` }"
      @touchstart="startDrag"
      @touchmove="drag"
      @touchend="stopDrag"
    >
      <header style="margin-bottom: 0; margin-top: 5px">
        <h3 class="text-yellow-primary">Custom Price</h3>
      </header>
      <transition name="fadeIn">
        <div v-if="showContent" class="sidebar-body">
          <!-- <div class="tabmenu-wrapper">
            <tab-menu @change="activeComponent = $event" />
          </div> -->
          <div class="sidebar-content-wrapper">
            <transition name="fadeIn">
              <keep-alive>
                <component :is="activeComponent"></component>
              </keep-alive>
            </transition>
          </div>
        </div>
      </transition>
      <footer class="grid grid-cols-2 gap-x-2 items-center">
        <p class="text-white font-bold text-left">
          ${{ total.toFixed(2) }} per Month
        </p>
        <transition name="fadeIn">
          <button
            v-if="action === feed && feeds.length"
            class="
              w-full
              h-9
              md:hidden
              text-white
              bg-orange-dark
              rounded-full
              border-none
              outline-none
              focus:outline-none
              font-bold
              setup
            "
            @click="$emit('next', 'storage')"
          >
            Next
          </button>
          <button
            v-if="action === storage"
            class="
              w-full
              h-9
              md:hidden
              text-white
              bg-orange-dark
              rounded-full
              border-none
              outline-none
              focus:outline-none
              font-bold
              setup
            "
            @click="updateSetupContentLoad('loading')"
          >
            Set up
          </button>
        </transition>
      </footer>
    </aside>

    <aside id="sidebar-desktop" class="sidebar hidden md:block">
      <div class="sidebar-inner">
        <header>
          <h3 class="text-yellow-primary lg:text-xl md:text-md">
            Custom Price
          </h3>
        </header>
        <transition name="fadeIn">
          <div class="sidebar-body">
            <!-- <div class="tabmenu-wrapper">
              <tab-menu @change="activeComponent = $event" />
            </div> -->
            <div class="sidebar-content-wrapper">
              <transition name="fadeIn">
                <keep-alive>
                  <component :is="activeComponent"></component>
                </keep-alive>
              </transition>
            </div>
          </div>
        </transition>
        <footer class="grid grid-cols-1 gap-x-2 items-center w-full">
          <p class="text-white font-bold md:text-lg text-left">
            ${{ total.toFixed(2) }} per Month
          </p>
        </footer>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TabMenu from '~/components/setup/archive/feeds/sidebar/TabMenu'
import OnGoing from '~/components/setup/archive/feeds/sidebar/OnGoing'
import Both from '~/components/setup/archive/feeds/sidebar/Both'
import OneTime from '~/components/setup/archive/feeds/sidebar/OneTime'
import AnimatedNumber from '~/components/inputs/AnimatedNumber'

export default {
  name: 'SideBar',
  components: { TabMenu, OnGoing, Both, OneTime, AnimatedNumber },
  props: {
    action: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      activeComponent: 'on-going',
      feed: 'feeds',
      storage: 'storage',

      expanded: false,
      showContent: false,

      sideBarHeight: 92,
      dragging: false,
      cursorStartY: 0,
      cursorCurrentY: 0,
    }
  },
  watch: {
    removeCustomPrice(data) {
      if (data === true) {
        this.stopDrag()
        this.sideBarHeight = 92
        this.expanded = false
        this.showContent = true
      }
    },
  },
  computed: {
    ...mapState({
      sidebarModal: 'sidebarModal',
      feeds: (state) => state.feeds.feeds,
    }),
    ...mapGetters('feeds', ['total']),
    ...mapGetters(['getStorageFormatSelected']),
    removeCustomPrice() {
      return this.$store.getters['mobile/header/getDrag']
    },
  },
  methods: {
    watchSwipe() {
      const initialHeight = this.expanded ? 500 : 92
      this.sideBarHeight =
        initialHeight + (this.cursorStartY - this.cursorCurrentY)
    },
    // after data
    startDrag(event) {
      this.dragging = true
      this.cursorStartY = this.getCursorY(event)
      this.cursorCurrentY = this.cursorStartY
      this.watchSwipe()
    },
    drag(event) {
      if (!this.dragging) {
        // avoid updating if not dragging
        return
      }
      this.cursorCurrentY = this.getCursorY(event)
      this.watchSwipe()
       this.$store.dispatch('mobile/header/showCustomPrice')
    },
    stopDrag(event) {
      this.dragging = false
      if (Math.abs(this.cursorStartY - this.cursorCurrentY) > 110) {
        this.sideBarHeight = this.expanded ? 92 : 500
        this.expand()
      }
      // else {
      //   console.log('else stop')
      //   this.sideBarHeight = this.expanded ? 500 : 92
      // }
    },
    expand() {
      this.expanded = !this.expanded
      setTimeout(() => {
        this.showContent = !this.showContent
      }, 100)
    },
    getCursorY: (e) => {
      if (e.touches && e.touches.length) {
        // touch
        return e.touches[0].pageY
      }

      if (e.pageX && e.pageY) {
        // mouse
        return e.pageY
      }

      return 0
    },
    ...mapActions({
      toggle_login_modal: 'toggle_login_modal',
      updateSetupContent: 'updateSetupContent',
      setStorageFormSubmit: 'setStorageFormSubmit',
    }),
    updateSetupContentLoad() {
      this.setStorageFormSubmit(true)
    },
  },
}
</script>

<style lang="scss" scoped>
#sidebar {
  @apply md:h-full absolute md:top-0 md:right-0 md:w-1/4 bg-gray-800 rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl px-4 py-2 md:py-4 md:pt-10 md:bottom-auto md:left-auto bottom-0 left-0 w-full overflow-x-hidden;
  &.swipeActive {
    transition: all 0.5s ease-out;
  }

  &.expanded {
    @apply h-3/4 flex flex-col;
  }

  header {
    @apply mb-2 md:mb-4;
    h3 {
      @apply text-left text-yellow-primary;
    }
  }

  .sidebar-body {
    @apply flex-grow gap-2 md:gap-6 flex flex-col;
    .tabmenu-wrapper {
    }

    @apply w-full flex-grow;
    .sidebar-content-wrapper {
      @apply w-full h-full relative;
    }
  }

  footer {
    @apply pb-2;
  }

  &.open {
    .sidebar-body {
      @apply flex;
    }
  }
}

#sidebar-desktop {
  @apply md:h-full absolute md:top-0 md:right-0 md:w-1/4 bg-gray-800 rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl px-4 py-2 md:py-4 md:pt-10 md:bottom-auto md:left-auto bottom-0 left-0 w-full overflow-x-hidden;
  .sidebar-inner {
    @apply h-full w-full flex flex-col;
    header {
      @apply mb-2 md:mb-4;
      h3 {
        @apply text-left text-yellow-primary;
      }
    }

    .sidebar-body {
      @apply flex-grow gap-2 md:gap-6 flex flex-col;
      .tabmenu-wrapper {
      }

      @apply w-full flex-grow;
      .sidebar-content-wrapper {
        @apply w-full h-full relative;
      }
    }

    footer {
      @apply pb-2;
    }

    &.open {
      .sidebar-body {
        @apply flex;
      }
    }
  }
}

// fadeIn transition
.fadeIn-leave-active {
  transition: all 0.3s ease-in-out;
}

.fadeIn-enter-active {
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
</style>
