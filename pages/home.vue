<template>
  <section :class="homeWrapper ? '' : 'h-full'">
    <transition name="page">
      <div
        v-if="isDesktopDevice"
        class="hidden md:block p-4 md:pt-0 relative"
        :class="[
          homeWrapper ? 'demo_home' : 'home_page_height',
          home ? 'afterloading_home2' : '',
          widthDecrese ? 'afterlogout_home3' : '',
          slideLeft ? 'afterloading_home3' : '',
          slideRight ? 'afterlogout_home2' : '',
          circle ? 'increase_width' : '',
          slideFullRight ? 'afterlogout_home1' : '',
          homeSliderWrapper ? 'home_wrapper' : 'home_page_height',
          homeSlider ? 'home_wrapper_afterloading' : '',
          fullHomeSlider ? 'home_wrapper_afterloading2' : '',
          allSidebarText ? 'home_wrapper_afterloading3' : '',
        ]"
        @click="closeSidebar()"
      >
        <span
          class="background__circle bg-orange-dark"
          :class="[
            homeCircle || fullHomeSlider ? 'showCircle' : '',
            showSidebarMenu ? 'hideCircle' : '',
          ]"
        ></span>
        <div
          class="transition-all content duration-2000"
          :class="[
            showHomeContent || homePage ? 'opacity-0' : '',
            fadeInpageContent ? 'opacity-1' : 'opacity-0',
          ]"
        >
          <div class="flex mb-2 header-wrapper">
            <div
              class="feed-dropdown flex justify-between flex-grow space-x-4"
              :class="squeeze && !skew ? 'feed-dropdown-squeeze space-x-4' : ''"
            >
              <div class="relative h-full md:mt-4">
                <ArchiveSourcesDropdown
                  :source="'home'"
                  :active="false"
                  :height="100"
                  @expand="showSkew($event)"
                  @show-edit-feed="showEditFeed = true"
                />
              </div>
              <div
                class="
                  flex
                  space-x-4
                  transition-all
                  duration-500
                  fw-bold
                  post-message-none
                  opacity-100
                  flex-wrap
                  justify-end
                "
                :class="[
                  skew ? 'margin_right' : '',
                  squeeze && !skew ? 'post-message' : '',
                ]"
              >
                <incoming-outgoing
                  v-if="currentComp === 'Google' || currentComp === 'Microsoft'"
                  class="md:mt-4"
                ></incoming-outgoing>
                <voice-recorded
                  v-if="currentComp === 'Calls'"
                  class="md:mt-4"
                ></voice-recorded>
                <received-sent
                  v-if="currentComp === 'Faxes'"
                  class="md:mt-4"
                ></received-sent>
                <original-transcription
                  v-if="currentComp === 'Faxes'"
                  class="md:mt-4"
                ></original-transcription>
                <all-dates class="md:mt-4"></all-dates>
                <div
                  v-if="
                    currentComp === 'Facebook' ||
                    currentComp === 'Twitter' ||
                    currentComp === 'LinkedIn' ||
                    currentComp === 'Instagram'
                  "
                  class="
                    hover:text-white
                    self-center
                    hover:bg-yellow-primary
                    rounded-3xl
                    post-style
                    font-bold
                    md:mt-4
                    cursor-pointer
                  "
                  :class="
                    showRealTimeView
                      ? 'text-white bg-yellow-primary'
                      : 'text-yellow-primary bg-white'
                  "
                  @click="showRealTimeViewTable()"
                >
                  <h4 class="mt-2 text-center">Posts</h4>
                </div>

                <div
                  v-if="
                    currentComp === 'Facebook' ||
                    currentComp === 'Twitter' ||
                    currentComp === 'LinkedIn' ||
                    currentComp === 'Instagram'
                  "
                  class="
                    hover:text-white hover:bg-yellow-primary
                    px-5
                    py-2
                    rounded-3xl
                    message-style
                    font-bold
                    md:mt-4
                    cursor-pointer
                  "
                  :class="
                    showMessage
                      ? 'text-white bg-yellow-primary'
                      : 'text-yellow-primary bg-white'
                  "
                  @click="showMessageTable()"
                >
                  <h4 class="mx-2 text-center">Messages</h4>
                </div>
                <Options class="option-button md:mt-4" />
              </div>
            </div>
            <SearchBar
              class="transition-all duration-500 search-bar h-10 md:mt-4"
              :class="[skew ? 'margin_left' : '']"
              @search="searchContent($event)"
              @clickSearch="goToSearch($event)"
            />
            <div
              class="
                flex
                space-x-4
                transition-all
                duration-500
                fw-bold
                tab-post-message
                flex-wrap
              "
            >
              <incoming-outgoing
                v-if="currentComp === 'Google' || currentComp === 'Microsoft'"
                class="md:mt-4"
              ></incoming-outgoing>
              <voice-recorded
                v-if="currentComp === 'Calls'"
                class="md:mt-4"
              ></voice-recorded>
              <received-sent
                v-if="currentComp === 'Faxes'"
                class="md:mt-4"
              ></received-sent>
              <original-transcription
                v-if="currentComp === 'Faxes'"
                class="md:mt-4"
              ></original-transcription>
              <all-dates class="md:mt-4"></all-dates>
              <div
                v-if="
                  currentComp === 'Facebook' ||
                  currentComp === 'Twitter' ||
                  currentComp === 'LinkedIn' ||
                  currentComp === 'Instagram'
                "
                class="
                  hover:text-white
                  self-center
                  hover:bg-yellow-primary
                  rounded-3xl
                  post-style
                  font-bold
                  md:mt-4
                  cursor-pointer
                "
                :class="
                  showRealTimeView
                    ? 'text-white bg-yellow-primary'
                    : 'text-yellow-primary bg-white'
                "
                @click="showRealTimeViewTable()"
              >
                <h4 class="mt-2 text-center">Posts</h4>
              </div>

              <div
                v-if="
                  currentComp === 'Facebook' ||
                  currentComp === 'Twitter' ||
                  currentComp === 'LinkedIn' ||
                  currentComp === 'Instagram'
                "
                class="
                  hover:text-white hover:bg-yellow-primary
                  px-5
                  py-2
                  font-bold
                  rounded-3xl
                  message-style
                  md:mt-4
                  cursor-pointer
                "
                :class="
                  showMessage
                    ? 'text-white bg-yellow-primary'
                    : 'text-yellow-primary bg-white'
                "
                @click="showMessageTable()"
              >
                <h4 class="mx-2 text-center">Messages</h4>
              </div>
              <Options class="option-button mt-4" />
            </div>
          </div>

          <div
            class="
              body-wrapper body-wrapper-new
              h-full
              transition-all
              duration-3000
            "
            :class="[skew ? 'm-xl:ml-70' : '']"
          >
            <div class="h-full inner-body-wrapper">
              <div
                class="
                  flex
                  w-full
                  h-full
                  overflow-hidden
                  rounded-2xl
                  feed-latest-wrapper
                "
              >
                <div
                  v-if="isDesktop"
                  id="resizeMeLeft"
                  class="
                    flex-grow flex
                    left-main-wraper left-main-wrapper
                    relative
                  "
                >
                  <div
                    class="transition-all duration-300 ease-in-out relative"
                    :class="[
                      showRealTimeView && !showMessage
                        ? 'delay-500 real-time-feed-full'
                        : 'real-time-feed',
                      !showRealTimeView && showMessage
                        ? 'real-time-feed-zero'
                        : 'delay-500 real-time-feed',
                    ]"
                  >
                    <RealTimeFeed
                      class="transition-all duration-300 ease-in-out"
                      :class="
                        !showRealTimeView && showMessage
                          ? 'opacity-0'
                          : 'delay-500 opacity-100'
                      "
                    />
                  </div>

                  <!-- </transition> -->
                  <!--end => real time feed rss-->
                  <!-- <transition name="fadeIn"> -->
                  <!-- v-if="showRealTimeView && showMessage" -->
                  <div
                    id="resizeMeRight"
                    class="
                      transitionWidthOpacity
                      duration-300
                      ease-in-out
                      relative
                    "
                    :class="
                      showRealTimeView && showMessage
                        ? 'delay-500 opacity-100 MessageFeed-half md:ml-7'
                        : 'opacity-0 MessageFeed'
                    "
                  >
                    <MessageFeed
                      class="transitionWidthOpacity duration-300 ease-in-out"
                      :class="
                        showRealTimeView && showMessage
                          ? 'delay-500 opacity-100'
                          : 'opacity-0'
                      "
                    />
                  </div>
                  <div
                    id="resizeIcon"
                    class="
                      absolute
                      -bottom-2
                      pr-2
                      pb-2
                      z-30
                      w-full
                      hidden
                      text-right
                    "
                    :class="[!showRealTimeView && showMessage ? 'right-0' : '']"
                  >
                    <fa
                      class="text-xl font-light text-yellow-primary"
                      :icon="['fas', 'arrows-alt-v']"
                    />
                  </div>
                  <!-- </transition> -->
                  <!-- <transition name="fadeIn"> -->
                  <!-- v-if="!showRealTimeView && showMessage" -->
                  <div
                    id="resizeMeFullMessage"
                    class="
                      transitionWidthOpacity
                      duration-300
                      ease-in-out
                      relative
                    "
                    :class="[
                      !showRealTimeView && showMessage
                        ? 'delay-500 FullMessageFeed'
                        : 'FullMessageFeed-zero',
                    ]"
                  >
                    <FullMessageFeed
                      class="transitionWidthOpacity duration-300 ease-in-out"
                      :class="[
                        !showRealTimeView && showMessage
                          ? 'delay-500 opacity-100'
                          : 'opacity-0',
                      ]"
                    />
                  </div>
                  <!-- </transition> -->
                </div>

                <!-- Codes for resizing functionality -->

                <!-- id="resizeMeLeft" -->
                <!-- @mousedown="mouseDownHandler" @mouseup="mouseUpHandler"
                @touchstart="touchDownHandler" @touchend="touchUpHandler" -->

                <!-- <div
                    id="resizeIcon"
                    class="
                      absolute
                      -bottom-2
                      pr-2
                      pb-2
                      z-30
                      w-full
                      hidden
                      text-right
                      right-0
                    "
                  >
                    <fa
                      class="text-xl font-light text-yellow-primary"
                      :icon="['fas', 'arrows-alt-v']"
                    />
                  </div> -->

                <div
                  v-else
                  class="
                    flex
                    relative
                    mt-4
                    smallDesktop:mt-0
                    transition-all
                    duration-500
                    ease-in-out
                  "
                  :class="feedIsExpanded ? 'left-main-wraper' : 'header-height'"
                >
                  <div
                    class="transition-all duration-300 ease-in-out"
                    :class="[
                      showRealTimeView
                        ? 'delay-500 real-time-feed-full'
                        : 'real-time-feed-zero',
                    ]"
                  >
                    <RealTimeFeed
                      class="transition-all duration-300 ease-in-out"
                      :class="
                        !showRealTimeView
                          ? 'opacity-0'
                          : 'delay-500 opacity-100'
                      "
                      :feed-is-expanded="feedIsExpanded"
                      @expand-height="feedHeightController"
                    />
                  </div>
                  <div
                    class="transition-all duration-300 ease-in-out"
                    :class="
                      showMessage
                        ? 'delay-500 opacity-100 MessageFeed-full'
                        : 'opacity-0 MessageFeed'
                    "
                  >
                    <MessageFeed
                      class="transition-all duration-300 ease-in-out"
                      :class="
                        showMessage ? 'delay-500 opacity-100' : 'opacity-0'
                      "
                      :message-is-expanded="messageIsExpanded"
                      @show-full-height="messageHeightController"
                    />
                  </div>
                </div>
                <div
                  id="resizeMeAlso"
                  class="hidden smallDesktop:block latest-archive"
                >
                  <LatestArchive :search-item="searchItem" />
                </div>
                <div
                  class="
                    smallDesktop:hidden
                    order-first
                    transition-all
                    duration-500
                    ease-in-out
                  "
                  :class="
                    archiveIsExpanded ? 'latest-archive' : 'header-height'
                  "
                >
                  <LatestArchive
                    :search-item="searchItem"
                    :archive-is-expanded="archiveIsExpanded"
                    @increase-height="latestArchiveHeightController"
                  />
                </div>
                <!--end => latest archive-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="page">
      <!-- Small Device -->
      <div
        v-if="!isDesktopDevice"
        class="p-2 md:hidden mobile-home_page_height"
      >
        <div
          class="transition-all content duration-2000"
          :class="[
            showHomeContent || homePage ? 'opacity-0' : '',
            fadeInpageContent ? 'opacity-1' : 'opacity-0',
            showMenu ? 'pointer-events-none' : '',
          ]"
        >
          <!-- showMenu ? 'filter blur-md pointer-events-none' : '', -->
          <div class="h-full transition-all body-wrapper duration-3000">
            <div class="relative h-full">
              <div class="w-full h-full overflow-hidden bg-white rounded-2xl">
                <div
                  class="flex items-center justify-around w-full"
                  :class="currentHead === 'MessageFeed' ? 'hidden' : 'block'"
                >
                  <div
                    class="
                      w-1/2
                      p-3
                      text-xl
                      font-bold
                      text-center
                      cursor-pointer
                      toggle-button
                    "
                    :class="
                      currentHead === 'RealTimeFeed'
                        ? 'active-feed-menu'
                        : 'bg-yellow-primary shadow-inner-site text-white'
                    "
                    @click="feedLatestMenu('RealTimeFeed')"
                  >
                    Viewer
                  </div>
                  <div
                    class="
                      w-1/2
                      p-3
                      text-xl
                      font-bold
                      text-center
                      cursor-pointer
                      toggle-button
                    "
                    :class="
                      currentHead === 'LatestArchive'
                        ? 'active-feed-menu'
                        : 'bg-yellow-primary shadow-inner-site text-white'
                    "
                    @click="feedLatestMenu('LatestArchive')"
                  >
                    User Information
                  </div>
                </div>
                <transition name="page" mode="out-in">
                  <component :is="currentHead"> </component>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import SearchBar from '~/components/home/SearchBar'
import RealTimeFeed from '~/components/home/realtimeFeedRss/RealTimeFeed'
import MessageFeed from '~/components/home/MessageFeed/MessageFeed'
import FullMessageFeed from '~/components/home/MessageFeed/FullMessageFeed'
import LatestArchive from '~/components/home/LatestArchive/LatestArchive'
import Options from '~/components/home/realtimeFeedRss/Options'
import AllDates from '~/components/home/realtimeFeedRss/AllDates'
import IncomingOutgoing from '~/components/home/realtimeFeedRss/IncomingOutgoing.vue'
import VoiceRecorded from '~/components/home/realtimeFeedRss/VoiceRecorded.vue'
import ReceivedSent from '~/components/home/realtimeFeedRss/ReceivedSent.vue'
import OriginalTranscription from '~/components/home/realtimeFeedRss/OriginalTranscription.vue'
// import EditFeed from '~/components/EditFeed.vue'
export default defineComponent({
  components: {
    LatestArchive,
    RealTimeFeed,
    MessageFeed,
    // eslint-disable-next-line vue/no-unused-components
    FullMessageFeed,
    SearchBar,
    ArchiveSourcesDropdown,
    // eslint-disable-next-line vue/no-unused-components
    Options,
    // eslint-disable-next-line vue/no-unused-components
    AllDates,
    IncomingOutgoing,
    VoiceRecorded,
    ReceivedSent,
    OriginalTranscription,
    // EditFeed,
  },
  layout: 'home',
  middleware: ['payment'],
  props: [
    'homeSliderWrapper',
    'homeSlider',
    'fullHomeSlider',
    'showSidebarMenu',
    'homePage',
    'blur',
    'allSidebarText',
  ],
  setup() {
    const breakpoints = useBreakpoints({
      largeDesktop: 1440,
    })
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    return {
      isDesktop: breakpoints.greater('largeDesktop'),
      isDesktopDevice: tailwindBreakpoints.greater('md'),
    }
  },
  data() {
    return {
      archiveIsExpanded: true,
      feedIsExpanded: false,
      messageIsExpanded: false,
      skew: false,
      isLoading: true,
      searchItem: '',
      fadeInpageContent: false,
      headerConfig: {
        barColor: 'text-orange-dark',
        icon: 'home',
        iconColor: 'text-orange-dark',
        text: 'Home',
        dropdownMenuColor: 'home',
        skew: false,
      },
      showEditFeed: false,
      showRealTimeView: true,
      showMessage: false,
      slowShowMessage: false,
      showFullMessage: false,
      yAxisPart1: 0,
      yAxisPart2: 0,
      hlPart1: 0,
      hrPart1: 0,
      hPart2: 0,
      initialUpperLeftHeight: '',
      initialUpperRightHeight: '',
      initailLowerHeight: '',
    }
  },

  computed: {
    ...mapState(['betaVersion']),
    ...mapState('loginAnimation', {
      home: 'home',
      circle: 'circle',
      homeCircle: 'homeCircle',
      slideLeft: 'slideLeft',
      showHomeContent: 'showHomeContent',
      homeWrapper: 'homeWrapper',
      widthDecrese: 'widthDecrese',
      slideRight: 'slideRight',
      slideFullRight: 'slideFullRight',
    }),
    ...mapState('socialFeed', ['archiveFeed']),
    ...mapState('mobile/header', {
      squeeze: 'squeeze',
    }),
    ...mapState('socialFeed', ['archiveFeed']),
    ...mapGetters('home', ['currentHead', 'currentHeader']),
    ...mapGetters('home', ['showMenu', 'showMobileMenu']),
    ...mapGetters('home', ['currentComp', 'currentSocialComponent']),
  },
  watch: {
    currentComp(data) {
      if (
        (data === 'Google' ||
          data === 'Microsoft' ||
          data === 'Faxes' ||
          data === 'Calls' ||
          data === 'Texts' ||
          data === 'Websites' ||
          data === 'YouTube') &&
        this.showMessage
      ) {
        this.showMessageTable()
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 5250)
    this.fadeInpageContent = true
    this.setHeaderConfig()
    this.$store.dispatch('mobile/header/showMobileHeader')
    this.$store.dispatch('mobile/header/setHomePage')
  },
  methods: {
    latestArchiveHeightController() {
      this.archiveIsExpanded = !this.archiveIsExpanded
      this.feedIsExpanded = !this.feedIsExpanded
      this.messageIsExpanded = !this.messageIsExpanded
    },
    feedHeightController() {
      this.feedIsExpanded = !this.feedIsExpanded
      this.archiveIsExpanded = !this.archiveIsExpanded
      this.messageIsExpanded = !this.messageIsExpanded
    },
    messageHeightController() {
      this.messageIsExpanded = !this.messageIsExpanded
      this.archiveIsExpanded = !this.archiveIsExpanded
      this.feedIsExpanded = !this.feedIsExpanded
    },
    showRealTimeViewTable() {
      this.showRealTimeView = !this.showRealTimeView
      if (!this.showMessage && !this.showRealTimeView) {
        this.showMessage = true
      }
      if (this.showRealTimeView && !this.isDesktop) {
        this.showMessage = false
      }
      if (!this.showRealTimeView && this.showMessage) {
        this.$store.commit('home/SET_HOME_CURRENT_COMP', 'FullMessageFeed')
      } else {
        this.$store.commit('home/SET_HOME_CURRENT_COMP', '')
      }
    },
    showMessageTable() {
      this.showMessage = !this.showMessage
      if (!this.showMessage && !this.showRealTimeView) {
        this.showRealTimeView = true
      }
      if (this.showMessage && !this.isDesktop) {
        this.showRealTimeView = false
      }
      if (!this.showRealTimeView && this.showMessage) {
        this.$store.commit('home/SET_HOME_CURRENT_COMP', 'FullMessageFeed')
      } else {
        this.$store.commit('home/SET_HOME_CURRENT_COMP', '')
      }
    },
    closeSidebar() {
      if (!this.archiveFeed) {
        this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
        this.$store.commit('profile/SET_PROFILE_MODAL', false)
        this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
        this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
          open: false,
          data: {},
        })
        this.$store.commit('SET_SHOW_SIDE_BAR', false)
        this.$store.dispatch('mobile/header/removePayment')
        this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
        this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
      }
      setTimeout(() => {
        this.$store.commit('socialFeed/SET_ARCHIVE_FEED', false)
      }, 2000)
    },
    showSkew($event) {
      this.skew = $event
    },
    setHeaderConfig() {
      this.$store.dispatch('mobile/header/setHeaderConfig', this.headerConfig)
    },
    showLoader() {
      this.isLoading = false
    },
    searchContent($event) {
      // this.searchItem = $event
    },
    goToSearch($event) {
      if ($event !== '') {
        this.$store.commit('search/SET_HOME_SEARCH', $event)
        this.$router.push('/search')
      }
    },
    feedLatestMenu(currentHead) {
      this.$store.commit('home/SET_CURRENT_HEADER', currentHead)
    },
  },
})
</script>

<style lang="scss" scoped>
.header-height {
  height: 40px;
}
@media (min-width: 1360px) {
  .header-height {
    height: 44px;
  }
}
.transitionWidthOpacity {
  transition-property: width, opacity, margin-left;
}
.post-style {
  width: 150px;
  height: 40px;
}
.message-style {
  width: 150px;
  height: 40px;
  margin: 0 30px;
  margin-top: 16px;
}
.option-button {
  width: 233px !important;
  height: 40px;
  margin-right: 30px;
}
.home_page_height {
  height: 100%;
}
.demo_home {
  height: 100%;
  margin-top: 60px !important;
  height: calc(100vh - 60px);
  z-index: 99;
  background-color: #393e46;
  position: absolute;
  width: 0%;
  right: calc(0% - 63px);
  transition: width 1.5s ease-in-out, width 1.5s ease-in-out,
    width 0.8s ease-in-out 0s;
}
.home_wrapper {
  height: calc(100vh - 60px);
  margin-top: 60px !important;
  height: calc(100vh - 60px);
  z-index: 99;
  background-color: #393e46;
  position: absolute;
  width: calc(100% - 100px);
  left: 101%;
  transition: left 0.8s ease-in-out, left 0.8s ease-in-out;
}
.afterloading_home2 {
  width: 288px;
}
.home_wrapper_afterloading {
  left: 50%;
}
.afterloading_home3 {
  width: -webkit-calc(100% - 137px);
  width: -moz-calc(100% - 137px);
  width: calc(100% - 137px);
}
.home_wrapper_afterloading2 {
  left: calc(200px + 0%);
}
.home_wrapper_afterloading3 {
  left: calc(100px + 0%);
}
.increase_width {
  width: 100%;
}
.background__circle {
  opacity: 1;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 110px;
  left: -20px;
  z-index: 999999;
  @apply rounded-full hidden;
}
.showCircle {
  display: inline-block;
}

.hideCircle {
  display: none;
}

.afterlogout_home3 {
  height: calc(100vh - 60px);
  margin-top: 60px !important;
  height: calc(100vh - 60px);
  z-index: 99;
  background-color: #393e46;
  position: absolute;
  width: -webkit-calc(100% - 137px);
  width: -moz-calc(100% - 137px);
  width: calc(100% - 137px);
  right: calc(0% - 63px);
  transition: width 1.5s ease-in-out, width 1.5s ease-in-out,
    width 0.8s ease-in-out 0s;
}
.afterlogout_home2 {
  width: 288px;
}

.afterlogout_home1 {
  width: 0%;
}

.archive_search_bar_wrapper {
  @apply flex flex-col
          lg:flex-row
          justify-between
          gap-4
          mb-4
          lg:gap-12;
}
.home-search-wrapper {
  @apply flex flex-col lg:flex-row justify-between gap-4 mb-4 lg:gap-12;
}

.page-content {
  transition: margin 0.5s;
}

.searchbar {
  width: 32%;
}

.body-wrapper {
  @apply flex-grow md:mt-5 mt-4 page-content overflow-y-auto md:relative;
}

.inner-body-wrapper {
  // height: calc(100% - 20px);
  height: 100%;
}

.main-content {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-4 w-full h-full;
}

@media (max-width: 768px) {
  .searchbar {
    width: 56%;
  }
}
.mobile-home_page_height {
  height: 100%;
  position: relative;
  padding-top: 60px;
}
.shadow-inner-site {
  -moz-box-shadow: inset 0px 0px 6px 0px #575656;
  -webkit-box-shadow: inset 0px 0px 6px 0px #575656;
  box-shadow: inset 0px 0px 6px 0px #575656;
}
.active-feed-menu {
  @apply text-yellow-primary;
}
.active-feed-rss {
  @apply rounded-full bg-yellow-primary text-white;
}

@media (min-width: 1600px) {
  .header-wrapper {
    @apply space-x-7;
  }
  .feed-latest-wrapper {
    flex-direction: row;
    @apply space-x-7 space-y-0;
  }
  .feed-dropdown {
    // @apply w-2/3;
    width: 65.8%;
  }
  .margin_left {
    margin-left: 22.5rem !important;
  }
  .margin_right {
    margin-right: -21rem !important;
  }
  .search-bar {
    width: 27.8%;
  }
  .left-main-wraper {
    @apply h-full;
  }
  .real-time-feed {
    @apply h-full w-1/2;
  }
  .real-time-feed-full {
    @apply h-full w-full;
  }
  .real-time-feed-zero {
    @apply h-full w-0;
  }
  .MessageFeed {
    @apply h-full w-0;
  }
  .MessageFeed-half {
    @apply h-full w-1/2;
  }
  .FullMessageFeed {
    @apply h-full w-full;
  }
  .FullMessageFeed-zero {
    @apply h-full w-0;
  }
  .latest-archive {
    @apply h-full w-1/3;
    width: 27.8%;
  }
  .tab-post-message {
    display: none;
  }
  .left-main-wrapper {
    width: 66.6%;
  }
}
// @media (min-width: 2049px) {
//   .header-wrapper {
//     @apply space-x-7;
//   }
//   .feed-latest-wrapper {
//     flex-direction: row;
//     @apply space-x-7 space-y-0;
//   }
//   // .margin_left {
//   //   margin-left: 18.5rem !important;
//   // }
//   // .margin_right {
//   //   margin-right: -16.8rem !important;
//   // }
//   .margin_left {
//     margin-left: 22.5rem !important;
//   }
//   .margin_right {
//     margin-right: -21rem !important;
//   }
//   .left-main-wraper {
//     @apply h-full;
//   }
//   .real-time-feed {
//     @apply h-full w-1/2;
//   }
//   .real-time-feed-full {
//     @apply h-full w-full;
//   }
//   .real-time-feed-zero {
//     @apply h-full w-0;
//   }
//   .MessageFeed {
//     @apply h-full w-0;
//   }
//   .MessageFeed-half {
//     @apply h-full w-1/2;
//   }
//   .FullMessageFeed {
//     @apply h-full w-full;
//   }
//   .FullMessageFeed-zero {
//     @apply h-full w-0;
//   }
//   .latest-archive {
//     @apply h-full w-1/3;
//     width: 27.8%;
//   }
//   .tab-post-message {
//     display: none;
//   }
//   .feed-dropdown {
//     width: 66.8%;
//   }
//   .search-bar {
//     // width: 33.2%;
//     width: 27.8%;
//   }
// }
@media (max-width: 1599px) and (min-width: 1440px) {
  .margin_right {
    margin-right: -21rem !important;
  }
  .post-message-none {
    display: none;
  }
  .tab-post-message {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  .header-wrapper {
    flex-wrap: wrap;
  }
  .feed-latest-wrapper {
    flex-direction: row;
    @apply space-x-7 space-y-0;
  }
  // .body-wrapper-new {
  //   margin-top: 4.25rem;
  // }
  .feed-dropdown {
    @apply w-1/2 space-y-4;
  }
  .search-bar {
    // width: 33.2%;
    width: 27.8%;
  }
  .left-main-wraper {
    @apply h-full;
  }
  .real-time-feed {
    @apply h-full w-1/2;
  }
  .real-time-feed-full {
    @apply h-full w-full;
  }
  .real-time-feed-zero {
    @apply h-full w-0;
  }
  .MessageFeed {
    @apply h-full w-0;
  }
  .MessageFeed-half {
    @apply h-full w-1/2;
  }
  .FullMessageFeed {
    @apply h-full w-full;
  }
  .FullMessageFeed-zero {
    @apply h-full w-0;
  }
  .latest-archive {
    @apply h-full w-1/3;
    width: 27.8%;
  }
  .feed-dropdown {
    flex-wrap: wrap;
  }
  .header-margin_left {
    margin-left: 17rem;
  }
  .left-main-wrapper {
    width: 66.6%;
  }
}
@media (max-width: 1439px) {
  // .margin_left {
  //   margin-left: 21rem !important;
  // }
  #resizeIcon {
    cursor: row-resize;
    display: block;
  }
  .margin_right {
    margin-right: -19.5rem !important;
  }
  .post-message-none {
    display: none;
  }
  .tab-post-message {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  .header-wrapper {
    flex-wrap: wrap;
  }
  .feed-latest-wrapper {
    flex-direction: column;
    @apply space-y-5;
  }
  // .body-wrapper-new {
  //   margin-top: 4.25rem;
  // }
  .feed-dropdown {
    @apply w-1/2 space-y-4;
  }
  .search-bar {
    @apply w-1/2;
  }
  .left-main-wraper {
    // @apply h-1/2;
    height: calc(100% - 82px);
  }
  // .real-time-feed {
  //   @apply h-full w-full;
  // }
  .real-time-feed {
    @apply w-1/2;
  }
  .real-time-feed-full {
    @apply w-full;
    height: 100% !important;
  }
  .real-time-feed-zero {
    @apply h-full w-0;
  }
  .MessageFeed {
    @apply h-full w-0;
  }
  .MessageFeed-half {
    @apply h-full w-1/2;
  }
  .MessageFeed-full {
    @apply h-full w-full;
  }
  .FullMessageFeed {
    @apply h-full w-full;
  }
  .FullMessageFeed-zero {
    @apply h-full w-0;
  }
  .latest-archive {
    @apply w-full;
    height: calc(100% - 82px);
  }
  .feed-dropdown {
    flex-wrap: wrap;
  }
  .header-margin_left {
    margin-left: 17rem;
  }
}
@media (max-width: 1023px) and (min-width: 768px) {
  .header-margin_left {
    margin-left: 0rem;
  }
  .tab-post-message {
    flex-wrap: wrap;
  }
  // .body-wrapper-new {
  //   margin-top: 8.25rem;
  // }
}
@media (max-width: 767px) {
  .body-wrapper {
    margin-top: 1rem;
  }
}

@media (max-width: 392px) {
  .toggle-button {
    @apply h-20 flex justify-center items-center;
  }
}
</style>