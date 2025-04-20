<template>
  <div>
    <div
      class="
        absolute
        left-0
        top-0
        h-full
        transition-all
        duration-500
        ease-in-out
        rounded-br-3xl
        sidebar
        hidden
        md:block
        neuton-font
      "
      :class="collapse ? 'w-26' : 'width-200 delay-500'"
      @mouseover.stop="$emit('squeeze'), squeeze()"
      @mouseleave.stop="$emit('notsqueeze'), notSqueeze()"
      @click="closeSidebar()"
    >
      <div class="sidebar__header">
        <a
          href="/"
          class="cursor-pointer"
          target="_self"
          rel="noopener noreferrer"
        >
          <sharp-archive-logo></sharp-archive-logo>
        </a>
      </div>
      <div ref="sidemenu" class="sidemenu flex flex-col">
        <!-- <div
          class="h-5 w-full bg-offgray spacer"
          data-index="0"
        ></div>-->

        <!-- Spill -->
        <div
          class="background"
          :class="backgroundColor"
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
          class="sidemenu__link mb-2.5"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-orange-dark"
          data-theme-circle="bg-orange-dark"
          data-index="1"
          @click.native="closeSiglePost()"
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
              class="fill-current text-orange-dark ml-0.5"
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

            <p
              class="
                sidemenu__label
                home
                transition-all
                duration-500
                ease-in-out
              "
              :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
            >
              Home
            </p>
          </div>
        </router-link>

        <!-- Archive -->
        <router-link
          to="/archive"
          class="sidemenu__link mb-2.5"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-green-1100"
          data-theme-circle="bg-green-1100"
          data-index="2"
          @click.native="closeSiglePost()"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.24 37.79"
              class="fill-current text-green-1100 ml-0.5"
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
              class="
                sidemenu__label
                archivet
                ransition-all
                duration-500
                ease-in-out
              "
              :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
            >
              Archive
            </p>
          </div>
        </router-link>

        <!-- Search -->
        <router-link
          to="/search"
          class="sidemenu__link mb-2.5"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-purple-midlight"
          data-theme-circle="bg-purple-midlight"
          data-index="3"
          @click.native="closeSiglePost()"
        >
          <div class="link__title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.27 47.27"
              class="fill-current text-purple-midlight ml-0.5"
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
              class="
                sidemenu__label
                search
                transition-all
                duration-500
                ease-in-out
              "
              :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
            >
              Search
            </p>
          </div>
        </router-link>

        <!-- Alert -->
        <router-link
          to="/alert"
          class="sidemenu__link mb-2.5"
          data-theme-bg="bg-gray-1000"
          data-theme-text="text-red-deep"
          data-theme-circle="bg-red-deep"
          data-index="4"
          @click.native="closeSiglePost()"
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
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46.43 45.4"
              class="fill-current text-red-deep ml-0.5"
              width="20"
              height="20"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Poster_1" data-name="Poster 1">
                  <path
                    id="ic_notifications_active_24px"
                    data-name="ic notifications active 24px"
                    d="M12.92,3.68,9.59.35A24.3,24.3,0,0,0,0,18.63H4.66A19.67,19.67,0,0,1,12.92,3.68Zm28.85,15h4.66A24.4,24.4,0,0,0,36.83.35l-3.3,3.33A19.74,19.74,0,0,1,41.77,18.63Zm-4.59,1.16c0-7.15-3.81-13.13-10.47-14.72V3.49a3.5,3.5,0,0,0-7,0h0V5.08C13,6.65,9.24,12.62,9.24,19.79V31.43L4.59,36.09v2.32H41.84V36.09l-4.66-4.66Zm-14,25.61a3.58,3.58,0,0,0,.93-.09,4.73,4.73,0,0,0,3.36-2.75,4.57,4.57,0,0,0,.35-1.82H18.54a4.69,4.69,0,0,0,4.67,4.66Z"
                  />
                </g>
              </g>
            </svg> -->
            <p
              class="
                sidemenu__label
                alert
                transition-all
                duration-500
                ease-in-out
              "
              :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
            >
              Alerts
            </p>
          </div>
        </router-link>

        <div class="flex-grow w-full bg-offgray spacer" data-index="14"></div>
        <!-- <div class="flex-grow w-full bg-offgray spacer" data-index="9"></div> -->

        <div
          class="flex flex-col justify-between w-full bg-offgray spacer"
          data-index="14"
        >
          <!-- Settings -->
          <router-link
            to="/settings"
            class="sidemenu__link mb-2.5"
            data-theme-bg="bg-gray-1000"
            data-theme-text="text-yellow-midlight"
            data-theme-circle="bg-yellow-midlight"
            data-index="4"
            @click.native="closeSiglePost()"
          >
            <div class="link__title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="25"
                height="25"
                class="mb-0.5 -ml-px transform -translate-y-px"
                viewBox="0 0 38.998 40.096"
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
                class="
                  sidemenu__label
                  settings
                  pb-2
                  transition-all
                  duration-500
                  ease-in-out
                "
                :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
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
            @click.native="closeSiglePost()"
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
                class="
                  sidemenu__label
                  help
                  pb-2
                  transition-all
                  duration-500
                  ease-in-out
                "
                :class="collapse ? 'opacity-0' : 'opacity-100 delay-500'"
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
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import SharpArchiveLogo from './SharpArchiveLogo.vue'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  components: { SharpArchiveLogo },

  layout: 'home',
  setup(props) {
    const store = useAlert()
    const { currentComp, previousCurrentComp } = storeToRefs(store)

    return {
      currentComp,
      previousCurrentComp,
      store,
    }
  },

  data() {
    return {
      showSidebar: false,
      offsetTopPx: 20,
      activeLinkIndex: -1,
      circleBackgroundColor: 'bg-orange-dark',
      backgroundColor: 'bg-ash-default',
      textBackgroundColor: 'text-ash-default',
      fade: false,
      collapse: true,
    }
  },

  computed: {
    ...mapState({
      betaVersion: 'betaVersion',
    }),
  },

  watch: {
    $route(to, from) {
      this.$nextTick(() => this.animate())
    },
  },

  mounted() {
    this.animate()
  },

  methods: {
    closeSiglePost() {
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
      this.$store.dispatch('socialFeed/singlePostClose', false)
      this.$store.commit('home/EXPAND_FULL_IMAGE', false)
      this.$store.commit('socialFeed/SET_SHOW_TWITTER', true)
      this.$store.commit('home/RESET_TWITTER_COMMENTS')
    },
    closeSidebar() {
      this.store.showNewAlertComp(false)
      this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
      this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
        open: false,
        data: {},
      })
      this.$store.commit('setting/SET_SHOW_CREATE_GROUP', false)
      this.$store.commit('setting/SET_SHOW_EDIT_GROUP', false)
      this.$store.dispatch('showArchiveSettings', false)
      this.$store.commit('setting/SET_SHOW_PROFILE', false)
      this.$store.dispatch('mobile/header/removePayment')
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
      this.$store.commit('setting/SET_CHANGE_BILLING_INFO', false)
      this.$store.commit('setting/SET_SHOW_INVOICE', false)
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
      if (
        this.previousCurrentComp.length > 0 &&
        this.currentComp === 'SummaryTable'
      ) {
        this.store.backToCurrentComp(this.previousCurrentComp[0])
      }
    },
    getRadius(index) {
      const radius = ''
      // if (parseInt(index) - 1 === this.activeLinkIndex) {
      //   radius = "rounded-tr-2xl";
      // } else if (parseInt(index) + 1 === this.activeLinkIndex) {
      //   radius = "rounded-br-2xl";
      // } else {
      //   radius = "";
      // }

      return radius
    },
    animate() {
      // const activeLink = event.target.closest(".sidemenu__link");
      const activeLink = document.querySelector('.nuxt-link-active')
      const oldPreviousLink = document.querySelector('.rounded-br-2xl')
      if (oldPreviousLink) {
        oldPreviousLink.classList.remove('rounded-br-2xl')
      }
      const oldNextLink = document.querySelector('.rounded-tr-2xl')
      if (oldNextLink) {
        oldNextLink.classList.remove('rounded-tr-2xl')
      }
      // const previousLink = activeLink.previousSibling
      // const nextLink = activeLink.nextSibling

      // setTimeout(() => {
      const backgroundColor = activeLink.dataset.themeBg
      const textBackgroundColor = 'text-gray-1000'
      const circleBackgroundColor = activeLink.dataset.themeCircle
      const activeLinkIndex = activeLink.dataset.index
      this.activeLinkIndex = parseInt(activeLinkIndex)
      this.circleBackgroundColor = circleBackgroundColor
      this.backgroundColor = backgroundColor
      this.textBackgroundColor = textBackgroundColor
      this.offsetTopPx = activeLink.offsetTop
      // previousLink.classList.add('rounded-br-2xl')
      // activeLink.classList.add('bg-gradient')
      // nextLink.classList.add('rounded-tr-2xl')
      // }, 2000)
    },
    squeeze() {
      this.collapse = false
    },
    notSqueeze() {
      this.collapse = true
    },
  },
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Neuton');
.neuton-font {
  font-family: 'Neuton', serif;
}
.sidemenu__label {
  color: #8e8e8e;
}
.sidebar {
  width: 100px;
  min-width: 100px;
  overflow: hidden;
  z-index: 300;
  background-color: #171d26;
  // filter: blur(10px);
  // -webkit-filter: blur(10px);

  &__header {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    // width: 200px;
    // min-width: 200px;

    // .sidemenu__label {
    //   opacity: 1;
    // }

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
    opacity: 1;
    // backdrop-filter: blur(6px);
    /* Add the blur effect */
    // filter: blur(1px);
    // -webkit-filter: blur(1px);
    background-color: #393e46; /* Fallback color */
    background-color: #393e46; /* Black w/opacity/see-through */
    position: absolute;
    left: 27px;
    z-index: 10;
    width: calc(100% - 27px);
    transition: margin-top 0.5s ease-in-out;
    height: 40px;
    @apply flex rounded-l-full;

    .background__circle {
      opacity: 1;
      width: 40px;
      height: 40px;
      // left: 27px;
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
    }
    // ~ .sidemenu__link {
    //   border-top-right-radius: 30px;
    // }
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
    color: #a22a2a;
  }

  .nuxt-link-exact-active .settings,
  .nuxt-link-exact-active .help {
    color: #e0ad1f;
  }

  &__link {
    outline: none;
    // transition: background 0.2s ease-in;
    // transition: border-top-right-radius .5s ease-in, border-bottom-right-radius .5s ease-in;
    //@apply flex bg-offgray;

    .link__title {
      margin-left: 25px;
      z-index: 100;
      @apply p-2.5 flex w-full items-center relative;

      > svg {
        transition: all 0.5s ease-in-out;
      }
    }
    // &.bg-gradient {
    //   // background: transparent;
    //   background: linear-gradient(
    //     to right,
    //     rgba(33, 33, 33, 1) 50%,
    //     rgba(255, 255, 255, 0) 70%,
    //     transparent
    //   );
    // }
    // &::before {
    //   content: '';
    //   opacity: 1;
    //   width: 45px;
    //   height: 100%;
    //   // left: -27px;
    //   position: absolute;
    //   // z-index: 10;
    //   //@apply bg-offgray;
    // }
  }

  &__label {
    font-size: 20px;
    position: absolute;
    transform: translate(45px, -1px);
    // opacity: 0;
    white-space: nowrap;
    // transition: all 0.5s ease-in;
    // transition-delay: 0.5s;
  }
}
.width-200 {
  width: 200px;
  min-width: 200px;
}
</style>
