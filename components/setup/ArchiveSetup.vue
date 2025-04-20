<template>
  <div class="archive-wrapper">
    <div class="archive-setup" :class="showSetup ? 'active' : ''">
      <div class="container">
        <div class="tab-wrapper">
          <transition name="fadeIn">
            <tab-menu
              :class="showSetup ? 'fadeIn' : ''"
              :tab-active="activeComponent"
              @change="switchContent($event)"
            >
            </tab-menu>
          </transition>
        </div>
        <transition :name="searchBarSlideIn ? 'slideIn' : 'searchBarFadeIn'">
          <div
            v-if="activeComponent === 'feeds' && showSearchBar"
            class="search-wrapper fadeIn"
          >
            <fa class="search-icon" :icon="['fas', 'search']" />
            <input
              v-model="query"
              v-focus
              class="
                search-field
                expanded
                text-gray-1200
                placeholder-orange-600 placeholder-opacity-50
              "
              type="text"
              placeholder="Type your Username, Email, URL"
              autofocus
              @keyup.enter="search()"
            />
          </div>
        </transition>
        <transition name="fadeIn">
          <div v-if="showSetup" class="content-wrapper" @click="draggingDown()">
            <transition name="slideIn">
              <component
                :is="activeComponent"
                v-bind="currentProperties"
                @next="switchContent($event)"
              ></component>
            </transition>
          </div>
        </transition>
      </div>
    </div>
    <div class="md:hidden bg-transparent" style="height: 95px"></div>
    <transition :name="$device.isMobileOrTablet ? 'slideBottom' : 'slideRight'">
      <side-bar
        v-if="sidebarModal"
        :action="activeComponent"
        @next="switchContent($event)"
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TabMenu from '~/components/setup/archive/TabMenu'
import Feeds from '~/components/setup/archive/Feeds'
import Storage from '~/components/setup/storage/ArchiveStorage'
import SideBar from '~/components/setup/archive/feeds/SideBar'
import { SEARCH } from '~/constants/urls'

export default {
  components: {
    TabMenu,
    Feeds,
    Storage,
    SideBar,
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  data() {
    return {
      profiles: [],
      showSetup: false,
      showSearchBar: true,
      searchBarSlideIn: false,
      query: '',
      activeComponent: 'feeds',
      setupContent: '',
      sidebarModal: false,
      drag: false,
    }
  },
  computed: {
    currentProperties() {
      if (this.activeComponent === 'feeds') {
        return { profiles: this.profiles }
      }
      return false
    },
    ...mapState({
      starterMaximized: 'starterMaximized',
    }),
  },
  watch: {
    activeComponent(value) {
      if (value === 'feeds') {
        this.setStorageFormatSelect(false)
      }
    },
  },
  methods: {
    draggingDown() {
      this.$store.dispatch('mobile/header/removeCustomPrice')
    },
    search() {
      if (this.query.length > 0) {
        const data = new FormData()
        data.append('query', this.query)
        this.$axios
          .$post(SEARCH, data)
          .then((res) => {
            if (res.data.length > 0) {
              this.skip = res.data.length
              this.profiles = res.data
              this.showSetup = true
              // this.searchBarSlideIn = true
              this.maximize_starter_modal(true)
              this.sidebarModal = true
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        return false
      }
    },
    switchContent($event) {
      this.activeComponent = $event
      setTimeout(() => {
        this.showSearchBar = !this.showSearchBar
      }, 400)
    },
    switchSetupContent($event) {
      this.setupContent = $event
      this.toggle_sidebar_modal(false)
      this.$emit('next', $event)
    },
    ...mapActions({
      toggle_sidebar_modal: 'toggle_sidebar_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
      setStorageFormatSelect: 'setStorageFormatSelect',
    }),
  },
}
</script>

<style lang="scss" scoped>
.archive-wrapper {
  // @apply w-full h-full absolute overflow-hidden;
  @apply w-full h-full absolute overflow-y-auto md:overflow-hidden flex flex-col md:block;
  .archive-setup {
    transition: all 1s ease-in-out;
    // @apply h-full w-full pt-0 absolute flex justify-center;
    @apply h-full w-full pt-0 md:absolute flex justify-center flex-grow overflow-y-auto;
    &.active {
      @apply md:w-3/4 w-full md:pt-26 pt-0; // pt-10
    }
    .container {
      // @apply md:w-3/4 h-full flex flex-col items-center space-y-6 p-4;
      @apply md:w-3/4 w-full h-full flex flex-col items-center space-y-6 p-4 overflow-x-hidden;
      .tab-wrapper {
        @apply flex justify-center;
      }
      .search-wrapper {
        // width: 350px;
        // @apply relative h-10 flex flex-nowrap mx-auto md:w-80 md:m-0 w-full;
        @apply relative h-10 flex flex-nowrap mx-auto md:w-80 md:m-0 w-full;
        .search-icon {
          @apply absolute left-4 top-1/3 text-yellow-600;
        }
        .search-field {
          transition: width 1s ease-in-out;
          @apply w-full h-10 rounded-full pl-10 pr-4 outline-none focus:outline-none;
        }
      }
      .content-wrapper {
        transition: all 1s ease-in-out;
        // @apply w-full flex-grow overflow-hidden;
        @apply w-full h-full flex-grow overflow-y-auto md:overflow-hidden;
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

// searchBarFadeIn transition
.searchBarFadeIn-enter-active,
.searchBarFadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}

.searchBarFadeIn-enter,
.searchBarFadeIn-leave-to {
  opacity: 0;
}

.searchBarFadeIn-enter-to,
.searchBarFadeIn-leave {
  opacity: 1;
}

// slideRight transition
.slideRight-enter-active {
  transition: all 1s ease-in-out;
}

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
// slideBottom transition
.slideBottom-enter-active {
  transition: all 1s ease-in-out;
}

.slideBottom-leave-active {
  transition: all 1s ease-in-out;
}

.slideBottom-enter-to,
.slideBottom-leave {
  transform: translateY(0%);
}

.slideBottom-leave-to,
.slideBottom-enter {
  transform: translateY(100%);
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
