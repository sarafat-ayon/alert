<template>
  <div
    class="fixed transition-all duration-500 ease-in-out w-full sidebar px-5 md:hidden"
    :class="showFooter ? 'show' : 'hide'"
  >
    <div ref="sidemenu" class="sidemenu flex flex-row items-center">
      <div class="background" :style="{ 'margin-left': `${offsetLeftPx}px` }">
        <span class="background__circle" :class="circleBackgroundColor"></span>
      </div>
      <div class="w-full flex flex-row justify-around items-center">
        <router-link
          :id="home ? 'active' : ''"
          to="/home"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-orange-dark"
          data-theme-circle="bg-orange-dark"
          data-index="1"
          @click.native="activeHome"
        >
          <div class="link__title">
            <svg
              id="Capa_1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 460.298 460.297"
              class="fill-current text-orange-dark"
              style="enable-background: new 0 0 460.298 460.297"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041
   c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629
   c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939
   z"
                  />
                  <path
                    d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816
   c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245
   c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136
   c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998
   L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125
   c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"
                  />
                </g>
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </div>
        </router-link>
        <router-link
          :id="archive ? 'active' : ''"
          to="/archive"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-green-1100"
          data-theme-circle="bg-green-1100"
          data-index="2"
          @click.native="activeArchive"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.24 37.79"
              class="fill-current text-green-1100"
              width="20"
              height="20"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Poster_1" data-name="Poster 1">
                  <path
                    id="ic_storage_24px"
                    data-name="ic storage 24px"
                    d="M0,37.79H47.24V28.34H0ZM4.72,30.7H9.45v4.73H4.72ZM0,0V9.45H47.24V0ZM9.45,7.09H4.72V2.36H9.45ZM0,23.62H47.24V14.17H0Zm4.72-7.09H9.45v4.73H4.72Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </router-link>
        <router-link
          :id="search ? 'active' : ''"
          to="/search"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-purple-midlight"
          data-theme-circle="bg-purple-midlight"
          data-index="3"
          @click.native="activeSearch"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.27 47.27"
              class="fill-current text-purple-midlight"
              width="20"
              height="20"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Poster_1" data-name="Poster 1">
                  <path
                    id="ic_search_24px"
                    data-name="ic search 24px"
                    d="M33.8,29.75H31.67L30.91,29A17.57,17.57,0,1,0,29,30.91l.73.76V33.8l13.5,13.47,4-4Zm-16.2,0A12.15,12.15,0,1,1,29.75,17.6,12.15,12.15,0,0,1,17.6,29.75Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </router-link>
        <router-link
          :id="alert ? 'active' : ''"
          to="/alert"
          class="sidemenu__link"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-red-deep"
          data-theme-circle="bg-red-deep"
          data-index="4"
          @click.native="activeAlert"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29.99 24.5"
              class="fill-current text-red-deep"
              width="20"
              height="20"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    id="Path_2755"
                    data-name="Path 2755"
                    class="cls-200"
                    d="M26.92,20.39a1.62,1.62,0,0,1,.45-2.1A8.69,8.69,0,0,0,27.51,6l-.07-.08a12.63,12.63,0,0,0-15.75-1.5,9.1,9.1,0,0,0-4.32,7.1,8.78,8.78,0,0,0,3.84,8,12.29,12.29,0,0,0,10.73,2c.34-.08.65-.2,1,.15a10.58,10.58,0,0,0,4.86,2.77c.39.12.77.19,1-.22s0-.69-.22-1A9.65,9.65,0,0,1,26.92,20.39ZM18.73,4.91c.85,0,1.24.36,1.29,1.29,0,.43,0,.87,0,1.22a44.74,44.74,0,0,1-.6,5.65c-.09.44-.25.73-.75.77s-.68-.28-.81-.68a7.19,7.19,0,0,1-.28-1.73c-.1-1.48-.21-3-.31-4.46,0-.22,0-.45,0-.68a1.38,1.38,0,0,1,1.38-1.38Zm-.05,13a1.38,1.38,0,0,1-1.44-1.29,1.42,1.42,0,0,1,2.84,0,1.38,1.38,0,0,1-1.4,1.28Z"
                  />
                  <path
                    id="Path_2756"
                    data-name="Path 2756"
                    class="cls-200"
                    d="M5.15,15.91a4.48,4.48,0,0,0,1.1-.83.64.64,0,0,1,.88-.15l.12.12c.32.34.24.65-.09,1A6.24,6.24,0,0,1,3.3,17.87a.67.67,0,0,1-.61-1.16l1.1-1.22c.26-.29.28-.46-.11-.72A7.77,7.77,0,0,1,0,8.67a7.37,7.37,0,0,1,2.48-6,10.59,10.59,0,0,1,11-1.93c.46.19.64.57.46.94s-.59.43-1,.28A9,9,0,0,0,4.17,3.06a6.23,6.23,0,0,0,.27,10.63l.14.09C5.8,14.55,5.8,14.55,5.15,15.91Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'home',
  props: ['showFooter'],

  data() {
    return {
      showSidebar: false,
      offsetLeftPx: 16,
      activeLinkIndex: -1,
      circleBackgroundColor: 'bg-orange-dark',
      backgroundColor: 'bg-orange-dark',
      textBackgroundColor: 'text-ash-default',
      home: false,
      archive: false,
      search: false,
      alert: false,
      activeLink: '',
      prevRoute: 'home',
    }
  },

  computed: {
    ...mapState({
      betaVersion: 'betaVersion',
    }),
  },

  watch: {
    $route(to, from) {
      if (to !== from) {
        if (to.name === 'home') {
          this.activeHome()
        }
        if (to.name === 'archive') {
          this.activeArchive()
        }
        if (to.name === 'search') {
          this.activeSearch()
        }
        if (to.name === 'alert') {
          this.activeAlert()
        }
      }
    },
  },

  mounted() {
    if (this.$route.name === 'home') {
      this.activeHome()
    }
    if (this.$route.name === 'archive') {
      this.activeArchive()
    }
    if (this.$route.name === 'search') {
      this.activeSearch()
    }
    if (this.$route.name === 'alert') {
      this.activeAlert()
    }
    window.addEventListener('resize', this.animate)
  },

  destroyed() {
    setTimeout(() => {
      window.removeEventListener('resize', this.animate)
    }, 2000)
  },

  methods: {
    activeHome() {
      this.home = true
      this.archive = false
      this.search = false
      this.alert = false
      setTimeout(() => {
        this.animate()
      })
    },
    activeArchive() {
      this.home = false
      this.archive = true
      this.search = false
      this.alert = false
      setTimeout(() => {
        this.animate()
      })
    },
    activeSearch() {
      this.home = false
      this.archive = false
      this.search = true
      this.alert = false
      setTimeout(() => {
        this.animate()
      })
    },
    activeAlert() {
      this.home = false
      this.archive = false
      this.search = false
      this.alert = true
      setTimeout(() => {
        this.animate()
      })
    },
    animate() {
      // const activeLink = document.querySelector('.nuxt-link-active')
      if (
        this.home === true ||
        this.archive === true ||
        this.search === true ||
        this.alert === true
      ) {
        const activeLink = document.getElementById('active')
        this.activeLink = activeLink
      }
      const backgroundColor = this.activeLink && this.activeLink.dataset.themeBg
      const textBackgroundColor = 'text-gray-1000'
      const circleBackgroundColor = this.activeLink.dataset.themeCircle
      const activeLinkIndex = this.activeLink.dataset.index
      this.activeLinkIndex = parseInt(activeLinkIndex)
      this.circleBackgroundColor = circleBackgroundColor
      this.backgroundColor = backgroundColor
      this.textBackgroundColor = textBackgroundColor
      this.offsetLeftPx = this.activeLink.offsetLeft
      setTimeout(() => {}, 400)
    },
  },
}
</script>
<style lang="scss" scoped>
.sidemenu__label {
  color: #8e8e8e;
}
.sidebar {
  height: 65px;
  bottom: -65px;
  z-index: 300;
  background-color: #171d26;
  border-radius: 1.563rem 1.563rem 0 0;
  &__header {
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.show {
  bottom: 0px;
}
.hide {
  bottom: -65px;
}
.sidemenu {
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
  .background {
    opacity: 1;
    position: absolute;
    z-index: 10;
    transition: margin-left 0.5s ease-in-out;
    height: 40px;
    @apply flex rounded-l-full;
    .background__circle {
      opacity: 1;
      width: 40px;
      height: 40px;
      position: relative;
      z-index: 50;
      transition: all 0.5s ease-in-out;
      @apply rounded-full inline-block;
    }
  }
  .nuxt-link-active {
    position: relative;
    .link__title {
      > svg {
        @apply text-white;
      }
      p {
        @apply font-bold;
      }
    }
  }
  .nuxt-link-exact-active .home {
    color: #e4801d;
  }
  .nuxt-link-exact-active .archive {
    color: #8db230;
  }
  .nuxt-link-exact-active .search {
    color: #7d80bd;
  }
  .nuxt-link-exact-active .alert {
    color: #ff5959;
  }
  .nuxt-link-exact-active .settings,
  .nuxt-link-exact-active .help {
    color: #e0ad1f;
  }
  &__link {
    outline: none;
    .link__title {
      z-index: 100;
      @apply p-2.5 flex w-full items-center relative;
      > svg {
        transition: all 0.5s ease-in-out;
      }
    }
  }
}
</style>
