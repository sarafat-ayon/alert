<template>
  <div class="md:block hidden fixed left-0 top-0 h-full z-99999">
    <div
      class="
        z-99999
        fixed
        left-0
        top-0
        h-full
        transition-all
        duration-500
        ease-in-out
        rounded-br-3xl
        hidden
        md:block
        neuton-font
      "
      :class="[
        sidebar || homeSlider ? 'show' : 'hide',
        showHome || squeezeSidebar ? 'sidebar1' : 'sidebar',
      ]"
      @mouseover="$emit('squeeze')"
      @mouseleave="$emit('notsqueeze')"
    >
      <div class="sidebar__header">
        <transition name="logo">
          <sharp-archive-logo
            v-if="showLogo || homeSlider"
            :home-slider="homeSlider"
            :squeeze-sidebar="squeezeSidebar"
          ></sharp-archive-logo>
        </transition>
      </div>
      <div ref="sidemenu" class="sidemenu flex flex-col">
        <div
          :class="[
            backgroundColor,
            sidebarMenu || showSidebarMenu ? 'background2' : 'background',
          ]"
          :style="{ 'margin-top': `${offsetTopPx}px` }"
        >
          <span
            class="background__circle"
            :class="circleBackgroundColor"
          ></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="corner-top hidden fill-current"
            :class="textBackgroundColor"
            width="20"
            height="20"
            viewBox="0 0 30 30.004"
          >
            <path
              id="Subtraction_11"
              data-name="Subtraction 11"
              d="M60.008,60.008h-30a30.037,30.037,0,0,0,30-30v30Z"
              transform="translate(-30.009 -30.004)"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="corner-bottom hidden fill-current"
            :class="textBackgroundColor"
            width="20"
            height="20"
            viewBox="0 0 30 30.004"
          >
            <path
              id="Subtraction_11"
              data-name="Subtraction 11"
              d="M60.008,60.008h-30a30.037,30.037,0,0,0,30-30v30Z"
              transform="translate(-30.009 -30.004)"
            />
          </svg>
        </div>
        <div class="h-5 w-full bg-offgray spacer" data-index="0"></div>

        <!-- Home -->
        <router-link
          to="/home"
          class="sidemenu__link mb-2.5 transition-all duration-800 z-9999"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-orange-dark"
          data-theme-circle="bg-orange-dark"
          data-index="1"
          :class="homeSideMenu || sidebarHomeText ? 'opacity-1' : 'opacity-0'"
        >
          <div class="link__title z-9999">
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
              class="fill-current z-9999"
              :class="
                homeSideMenu || sidebarHomeText
                  ? 'text-white'
                  : 'text-orange-dark'
              "
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
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>

            <p
              class="sidemenu__label home z-9999"
              :class="[
                homeMenuText || sidebarHomeText ? 'active' : '',
                showHome || squeezeSidebar ? 'opacity-0' : '',
              ]"
            >
              Home
            </p>
          </div>
        </router-link>

        <!-- Archive -->
        <router-link
          to="/archive"
          class="sidemenu__link mb-2.5 transition-all duration-1000"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-green-1100"
          data-theme-circle="bg-green-1100"
          data-index="2"
          :class="allMenu || allSidebarText ? 'opacity-1' : 'opacity-0'"
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

            <p
              class="sidemenu__label archive"
              :class="showHome || squeezeSidebar ? 'opacity-0' : ''"
            >
              Archive
            </p>
          </div>
        </router-link>

        <!-- Search -->
        <router-link
          to="/search"
          class="sidemenu__link mb-2.5 transition-all duration-1000"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-purple-midlight"
          data-theme-circle="bg-purple-midlight"
          data-index="3"
          :class="allMenu || allSidebarText ? 'opacity-1' : 'opacity-0'"
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

            <p
              class="sidemenu__label search"
              :class="showHome || squeezeSidebar ? 'opacity-0' : ''"
            >
              Search
            </p>
          </div>
        </router-link>

        <!-- Alert -->
        <router-link
          to="/alert"
          class="sidemenu__link mb-2.5 transition-all duration-1000"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-red-minlight"
          data-theme-circle="bg-red-midlight"
          data-index="4"
          :class="allMenu || allSidebarText ? 'opacity-1' : 'opacity-0'"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29.99 24.5"
              class="fill-current text-red-deep ml-0.5"
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
            <p
              class="sidemenu__label alert"
              :class="showHome || squeezeSidebar ? 'opacity-0' : ''"
            >
              Alerts
            </p>
          </div>
        </router-link>

        <div class="flex-grow w-full bg-offgray spacer" data-index="14"></div>
        <!-- <div class="flex-grow w-full bg-offgray spacer" data-index="9"></div> -->

        <div
          class="
            flex flex-col
            justify-between
            w-full
            bg-offgray
            spacer
            transition-all
            duration-1000
          "
          data-index="14"
          :class="allMenu || allSidebarText ? 'opacity-1' : 'opacity-0'"
        >
          <!-- Settings -->
          <router-link
            to="/settings"
            class="sidemenu__link mb-2.5"
            data-theme-bg="bg-gray-1000"
            data-theme-text="text-yellow-midlight"
            data-theme-circle="bg-yellow-midlight"
            data-index="4"
          >
            <div class="link__title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                viewBox="0 0 38.998 40.096"
                class="mb-0.5 -ml-px transform -translate-y-px"
              >
                <defs>
                  <style>
                    .a {
                      fill: #cecece;
                    }
                    .b {
                      filter: url(#a);
                    }
                  </style>
                  <filter
                    id="a"
                    x="0"
                    y="0"
                    width="38.998"
                    height="40.096"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dy="3" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1.5" result="b" />
                    <feFlood flood-opacity="0.302" />
                    <feComposite operator="in" in2="b" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g class="b" transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path
                    class="a"
                    d="M29.244,18.51a5.952,5.952,0,0,1,2.184-8.081L28.366,5.135a5.949,5.949,0,0,1-2.977.777A5.9,5.9,0,0,1,21.2,4.19,5.9,5.9,0,0,1,19.462,0H13.376A6,6,0,0,1,12.6,2.981,5.934,5.934,0,0,1,4.5,5.135L1.43,10.429a5.9,5.9,0,0,1,2.184,2.157A5.921,5.921,0,0,1,1.43,20.667l3.043,5.294a5.747,5.747,0,0,1,2.946-.777A5.892,5.892,0,0,1,13.31,31.1h6.121a5.777,5.777,0,0,1,.777-2.946,5.922,5.922,0,0,1,8.08-2.157L31.331,20.7a6.328,6.328,0,0,1-2.087-2.188Zm-12.825,3.3a6.254,6.254,0,1,1,4.439-1.826,6.277,6.277,0,0,1-4.439,1.826Z"
                    transform="translate(3.07 1.5)"
                  />
                </g>
              </svg>

              <p
                class="sidemenu__label settings"
                :class="showHome || squeezeSidebar ? 'opacity-0' : ''"
              >
                Settings
              </p>
            </div>
          </router-link>

          <!-- Help -->
          <router-link
            to="/help"
            class="sidemenu__link"
            data-theme-bg="bg-gray-1000"
            data-theme-text="text-yellow-midlight"
            data-theme-circle="bg-yellow-midlight"
            data-index="4"
          >
            <div class="link__title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                viewBox="0 0 39 40"
                class="mb-0.5 -ml-px transform -translate-y-px"
              >
                <defs>
                  <style>
                    .a {
                      fill: #cecece;
                    }
                    .b {
                      filter: url(#a);
                    }
                  </style>
                  <filter
                    id="a"
                    x="0"
                    y="0"
                    width="39"
                    height="40"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dy="3" input="SourceAlpha" />
                    <feGaussianBlur stdDeviation="1.5" result="b" />
                    <feFlood flood-opacity="0.302" />
                    <feComposite operator="in" in2="b" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g class="b" transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path
                    class="a"
                    d="M15,0A15.256,15.256,0,0,0,0,15.5,15.256,15.256,0,0,0,15,31,15.256,15.256,0,0,0,30,15.5,15.256,15.256,0,0,0,15,0Zm.851,22.862a1.171,1.171,0,0,1-1.515.153A1.263,1.263,0,0,1,13.9,21.51a1.192,1.192,0,0,1,1.342-.742,1.23,1.23,0,0,1,.967,1.215,1.261,1.261,0,0,1-.352.88Zm.461-5.7h0s-.086.066-.086.139v.973a1.251,1.251,0,0,1-2.5,0V17.3a2.808,2.808,0,0,1,1.781-2.461A1.766,1.766,0,0,0,14.97,11.4a1.685,1.685,0,0,0-1.5,1,1.2,1.2,0,0,1-.7.608,1.158,1.158,0,0,1-.91-.081,1.279,1.279,0,0,1-.544-1.624,4.085,4.085,0,0,1,3.664-2.418H15a4.171,4.171,0,0,1,3.979,3.572A4.281,4.281,0,0,1,16.312,17.159Z"
                    transform="translate(4.5 1.5)"
                  />
                </g>
              </svg>

              <p
                class="sidemenu__label help"
                :class="showHome || squeezeSidebar ? 'opacity-0' : ''"
              >
                Help
              </p>
            </div>
          </router-link>
          <div class="h-10 w-full bg-offgray spacer" data-index="0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SharpArchiveLogo from './SharpArchiveLogo.vue'
export default {
  components: { SharpArchiveLogo },
  props: {
    // sidebar: {
    //   type: Boolean,
    //   default: false,
    // },
    // sidebarMenu: {
    //   type: Boolean,
    //   default: false,
    // },
    // showLogo: {
    //   type: Boolean,
    //   default: false,
    // },
    // homeMenu: {
    //   type: Boolean,
    //   default: false,
    // },
    // homeMenuText: {
    //   type: Boolean,
    //   default: false,
    // },
    // allMenu: {
    //   type: Boolean,
    //   default: false,
    // },
    // showHome: {
    //   type: Boolean,
    //   default: false,
    // },
    // showLogoText: {
    //   type: Boolean,
    //   default: false,
    // },
    homeSlider: {
      type: Boolean,
      default: false,
    },
    showSidebarMenu: {
      type: Boolean,
      default: false,
    },
    sidebarHomeText: {
      type: Boolean,
      default: false,
    },
    allSidebarText: {
      type: Boolean,
      default: false,
    },
    squeezeSidebar: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showSidebar: false,
      offsetTopPx: 20,
      activeLinkIndex: -1,
      circleBackgroundColor: 'bg-orange-dark',
      backgroundColor: 'bg-ash-default',
      textBackgroundColor: 'text-ash-default',
    }
  },
  computed: {
    ...mapState('loginAnimation', {
      sidebarMenu: 'sidebarMenu',
      sidebar: 'sidebar',
      showLogo: 'showLogo',
      homeSideMenu: 'homeSideMenu',
      allMenu: 'allSideMenu',
      showHome: 'showHome',
      homeMenuText: 'homeMenuText',
    }),
  },
  methods: {
    getRadius(index) {
      const radius = ''
      return radius
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Neuton');
.neuton-font {
  font-family: 'Neuton', serif;
}
.sidemenu__label {
  color: #8e8e8e;
}
.hide {
  opacity: 0;
  display: none;
}
.show {
  opacity: 1;
  display: block;
}
.sidebar {
  width: 200px;
  min-width: 100px;
  overflow: hidden;
  z-index: 300;
  background-color: #171d26;

  &__header {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidemenu__label {
    opacity: 1;
  }

  .sidemenu__link {
    &.bg-gradient {
      background: linear-gradient(
        to right,
        rgba(33, 33, 33, 1) 20%,
        rgba(255, 255, 255, 0)
      );
    }
  }
  // }
}

.sidebar1 {
  width: 100px;
  min-width: 100px;
  overflow: hidden;
  z-index: 300;
  background-color: #171d26;

  &__header {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidemenu__label {
    opacity: 0;
  }

  .sidemenu__link {
    &.bg-gradient {
      background: linear-gradient(
        to right,
        rgba(33, 33, 33, 1) 20%,
        rgba(255, 255, 255, 0)
      );
    }
  }
}

.sidemenu {
  height: calc(100% - 150px);
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  /* this will hide the scrollbar in mozilla based browsers */
  overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
  .background {
    opacity: 0;
    background-color: #393e46;
    background-color: #393e46;
    position: absolute;
    left: 180px;
    z-index: 10;
    width: calc(100% - 27px);
    transition: all 0.8s ease-in-out;
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

    .corner-top {
      opacity: 1 !important;
      position: absolute;
      top: -20px;
      right: 0;
      display: inline-block;
      color: #393e46;
    }

    .corner-bottom {
      opacity: 1 !important;
      position: absolute;
      bottom: -20px;
      right: 0;
      transform: rotate(270deg);
      display: inline-block;
      color: #393e46;
    }
  }

  .background2 {
    opacity: 1;
    background-color: #393e46;
    background-color: #393e46;
    position: absolute;
    left: 27px;
    z-index: 10;
    width: calc(100% - 27px);
    transition: all 0.8s ease-in-out;
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

    .corner-top {
      opacity: 1 !important;
      position: absolute;
      top: -20px;
      right: 0;
      display: inline-block;
      color: #393e46;
    }

    .corner-bottom {
      opacity: 1 !important;
      position: absolute;
      bottom: -20px;
      right: 0;
      transform: rotate(270deg);
      display: inline-block;
      color: #393e46;
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

  .active {
    color: #e4801d;
    @apply font-bold;
  }

  &__link {
    outline: none;

    .link__title {
      margin-left: 25px;
      z-index: 100;
      @apply p-2.5 flex w-full items-center relative;

      > svg {
        transition: all 0.5s ease-in-out;
      }
    }
  }

  &__label {
    font-size: 16px;
    position: absolute;
    transform: translate(45px, -1px);
    opacity: 0;
    white-space: nowrap;
    transition: all 1s ease-in;
  }
}

.logo-enter-active,
.logo-leave-active {
  transition: 0.5s linear;
}
.logo-enter,
.logo-leave-to {
  opacity: 0;
}
.logo-enter-to,
.logo-leave-from {
  opacity: 1;
}
</style>
