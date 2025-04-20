<template>
  <div class="detailsFeedHeight mt-3.5">
    <transition-group name="fadeIn" mode="out-in">
      <template
        v-if="
          (optionSelect === 'Videos' && articles.items.length > 0) ||
          (optionSelect === 'Playlists' &&
            youtubePlayListItems &&
            youtubePlayListItems.items.length > 0)
        "
      >
        <template
          v-for="(AllVideo, allVideoDetailIndex) in optionSelect ===
            'Playlists' && youtubePlayListItems
            ? youtubePlayListItems.items
            : articles.items"
        >
          <div
            v-if="
              (AllVideo.id === currentSelectVideo &&
                currentSelectVideo !== 0 &&
                optionSelect === 'Videos') ||
              (AllVideo.id === currentSelectPlayListItem &&
                currentSelectPlayListItem !== 0 &&
                optionSelect === 'Playlists')
            "
            :id="AllVideo.id"
            :key="allVideoDetailIndex"
            class="flex md:space-x-4"
          >
            <div class="youtubeAccountImage min-w-15 h-11 md:h-15">
              <img
                :src="articles.profilePic"
                class="rounded-full w-11 md:w-15 h-11 md:h-15"
                alt="grayVee"
                srcset=""
              />
            </div>
            <div class="youtubeAccountDetails dynamic-width">
              <div class="flex flex-col">
                <div class="fullAccountDetails flex items-center h-11 md:h-15">
                  <div class="accountDetails flex flex-col flex-grow">
                    <div class="flex space-x-2 items-center">
                      <div class="text-ash-primary font-bold text-lg">
                        {{ articles.name }}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 512 512"
                      >
                        <style>
                          .circle {
                            fill: #656565;
                          }
                        </style>
                        <path
                          class="circle"
                          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
                        />
                      </svg>
                    </div>

                    <!-- <div class="text-gray-light">3.92M subscribers</div> -->
                  </div>
                  <!-- <div class="accountSubscribe flex items-center space-x-4">
                  <button
                    type="submit"
                    class="
                      w-34
                      h-9
                      py-1
                      rounded-full
                      border-2 border-yellow-primary
                      outline-none
                      font-bold
                      text-base
                    "
                    :class="
                      subscribed
                        ? 'text-white bg-yellow-primary'
                        : 'text-yellow-primary border-yellow-primary'
                    "
                    @click="subscribeActive()"
                  >
                    {{ !subscribed ? 'Subscribe' : 'Subscribed' }}
                  </button>

                  <svg
                    v-if="subscribed"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.839"
                    height="29.773"
                    viewBox="0 0 448 512"
                  >
                    <style>
                      .bell-icon {
                        fill: #e4801d;
                      }
                    </style>
                    <path
                      class="bell-icon"
                      d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z"
                    />
                  </svg>
                </div> -->
                </div>
              </div>
              <div
                v-if="AllVideo.description"
                class="
                  text-ash-primary text-lg
                  descriptionHeight
                  overflow-hidden
                  mt-5
                  md:mt-8
                  description-wrap
                "
                v-html="AllVideo.description"
              ></div>
              <!-- <transition
                name="expand"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
              >
                <span
                  v-if="showMoreDetails"
                  class="accountDetailsInfo text-ash-primary text-lg"
                  v-html="AllVideo.description"
                ></span>
              </transition> -->
              <!-- <div
                v-if="AllVideo.description && AllVideo.description.length > 250"
                class="text-lg font-bold text-yellow-primary cursor-pointer"
                @click="showMore()"
              >
                <span v-if="!showMoreDetails">Show more</span>
                <span v-else>Show less</span>
              </div> -->
              <!-- </div> -->
            </div>
          </div>
        </template>
      </template>
      <div
        v-else
        key="2"
        class="
          h-full
          w-full
          flex
          items-center
          justify-center
          font-bold
          md:text-xl
          text-lg
        "
      >
        <p>No Data Found</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {
  defineComponent,
  useStore,
  ref,
  computed,
} from '@nuxtjs/composition-api'
import GaryVee from '~/assets/img/youtube/GaryVee.jpg'

export default defineComponent({
  props: {
    currentSelectVideo: {
      type: Number,
      default: 0,
    },
    optionSelect: {
      type: String,
      default: 'Videos',
    },
    currentSelectPlayListItem: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const store = useStore()
    const subscribed = ref(false)
    const showMoreDetails = ref(false)

    const subscribeActive = () => {
      // subscribed.value !== subscribed.value
      subscribed.value ? (subscribed.value = false) : (subscribed.value = true)
    }

    const showMore = () => {
      showMoreDetails.value
        ? (showMoreDetails.value = false)
        : (showMoreDetails.value = true)
    }

    return {
      subscribed,
      showMoreDetails,
      subscribeActive,
      showMore,
      articles: computed(() => store.state.home.articles),
      youtubePlayListItems: computed(
        () => store.state.home.youtubePlayListItems
      ),
    }
  },

  data() {
    return {
      grayVee: GaryVee,
    }
  },
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = height
      })
    },
    afterEnter(element) {
      element.style.height = 'auto'
    },
    leave(element) {
      const height = getComputedStyle(element).height

      element.style.height = height
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = 0
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 1s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.youtube-view-wrapper {
  height: calc(100% - 46px);
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}

.fadeIn-enter-active {
  transition-delay: 0.8s;
}

.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
[data-title]:after {
  color: #e4801d;
  right: 100%;
  z-index: 99999999;
}
.descriptionHeight {
  height: calc(100% - 70px);
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  // scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
.videoThumbnail {
  min-width: 76px;
  min-height: 42px;
}
.summaryFeedHeight,
.transcriptFeedHeight,
.detailsFeedHeight,
.commentsFeedHeight {
  height: calc(100% - 56px);
}
.more_link {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-indent: -9999px;
  // z-index: 1000;
}
.bottom-left-radius {
  border-bottom-left-radius: 25px;
}
.message-body {
  height: 68px;
}
@media (max-width: 1024px) {
  .mobile-height {
    height: calc(50% - 17px);
  }
  .bottom-left-radius {
    border-bottom-left-radius: 0px;
  }
}

.ic_attachment {
  fill: #656565;
}
.ic_attachment1 {
  fill: #ffffff;
}
.name {
  display: flex;
}
.playPauseIcon {
  vertical-align: middle;
  @apply text-yellow-primary w-9 h-9;
}
.seek_slider {
  @apply h-1.5 bg-orange-600 appearance-none w-full rounded-full;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.seek_slider::-webkit-slider-thumb,
.volume_slider::-webkit-slider-thumb {
  @apply w-4 h-4 bg-white border-2 border-solid border-orange-600 cursor-pointer rounded-full;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.zoom-icon-container {
  @apply bg-yellow-primary w-9 h-9 flex items-center justify-center rounded-full;
}
.zoomcontainer {
  transform: translate(0px, 0px) scale(1);
}
.transcript-time {
  background: #ebb68149 0% 0% no-repeat padding-box;
}
.min-w-15 {
  min-width: 3.75rem;
}
.min-w-11 {
  min-width: 44px;
}
.select-toggle {
  color: #e4801d;
  top: 5.2px;
  @apply right-3 pointer-events-none;
  svg {
    @apply text-3xl;
  }
  padding-left: 2px !important;
}

.dynamic-width{
  width: calc(100% - 76px);
}
.description-wrap{
  width: 100%;
  overflow-wrap: break-word;
}
</style>