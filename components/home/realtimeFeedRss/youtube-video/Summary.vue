<template>
  <div class="summaryFeedHeight pt-4">
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
          class="video-body mt-3.5 h-full"
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
            class="
              text-lg text-ash-primary
              flex flex-col
              h-full
              transition-all
              duration-500
              ease-in-out
            "
          >
            <div v-if="!expandFullImage">
              <div class="font-bold">
                {{ AllVideo.title }}
              </div>
              <p>
                <date-time
                  :datetime="AllVideo.publishedAt"
                  format="MMMM dd, yyyy"
                  :show-time="false"
                  :friendly="false"
                ></date-time
                ><span class="font-bold">
                  (Length: {{ AllVideo.fullDuration }})</span
                >
              </p>
              <div class="flex justify-between">
                <p>{{ AllVideo.viewCount }} Views</p>
                <p>{{ AllVideo.likeCount }} Likes</p>
                <p
                  class="cursor-pointer hover:underline"
                  @click="$emit('show-comment')"
                >
                  {{ AllVideo.commentCount }} Comments
                </p>
              </div>
            </div>
            <!-- <p class="font-bold mt-4">
            Explanation:
            <span class="font-normal">{{ AllVideo.Explanation }}</span>
          </p>
          <div class="flex mt-2 space-x-4">
            <div
              class="
                flex
                items-center
                space-x-1
                w-54
                h-9
                bg-red-moreLightness
                rounded-full
              "
            >
              <div
                class="
                  w-9
                  h-9
                  bg-red-1100
                  rounded-full
                  flex
                  justify-center
                  items-center
                "
              >
                <img
                  class="h-4 w-4"
                  src="../../../../assets/img/svg/flag.svg"
                  alt="flag-icon"
                />
              </div>
              <p
                class="
                  text-red-1100 text-lg text-center
                  font-bold
                  pr-2
                  whitespace-nowrap
                "
              >
                Sexual Harassment
              </p>
            </div>

            <button
              class="
                w-40
                bg-red-deep
                text-offwhite-800
                h-9
                rounded-full
                outline-none
                font-bold
                text-lg
                lg:mt-0
                md:mt-2
              "
            >
              Open Flag
            </button>
          </div> -->

            <div
              class="
                call-record-wrapper
                flex
                space-x-3
                items-center
                justify-end
                mt-6
              "
            >
              <!-- <div
              class="playPause-track cursor-pointer w-9 h-9"
              @click="playPauseTrack"
            >
              <fa
                v-if="!isPlaying"
                class="playPauseIcon"
                :icon="['fas', 'play-circle']"
              />
              <fa
                v-else
                class="playPauseIcon"
                :icon="['fas', 'pause-circle']"
              />
            </div>

            <div class="slider_container flex-grow">
              <div class="flex space-x-2 items-center">
                <div class="current-time text-gray-light text-md">
                  {{ currTime }}
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="0"
                  class="seek_slider"
                  @change="seekTo()"
                />
              </div>
            </div>

            <div class="attachment cursor-pointer">
              <img
                class="mx-auto h-4 w-5"
                src="../../../../assets/img/svg/download.svg"
                alt="SharpArchive download-audio Icon"
              />
            </div> -->

              <div class="cursor-pointer flex items-center gap-2 z-20">
                <div class="zoom-icon-container shadow-lg">
                  <fa
                    class="text-white text-lg"
                    :icon="['fas', 'search-plus']"
                    @click="zoomIn"
                  />
                </div>
                <div class="zoom-icon-container shadow-lg">
                  <fa
                    class="text-white text-lg"
                    :icon="['fas', 'search-minus']"
                    @click="zoomOut"
                  />
                </div>
              </div>
              <div
                class="zoom-icon-container shadow-lg cursor-pointer"
                @click="
                  $store.commit('home/EXPAND_FULL_IMAGE', true),
                    $emit('selected-video', AllVideo)
                "
              >
                <fa class="text-white text-lg" :icon="['fas', 'expand']" />
              </div>
            </div>

            <div
              v-if="AllVideo.privacy !== 'deleted'"
              id="zoomContainer"
              ref="zoom"
              class="
                mt-6
                flex-grow
                transition-all
                duration-500
                ease-in-out,
                zoomcontainer
              "
              :class="expandFullImage ? 'w-full h-full' : 'w-full h-full'"
              v-html="AllVideo.embedHtml"
            ></div>
            <div
              v-else
              id="zoomContainer"
              ref="zoom"
              class="
                mt-6
                flex-grow
                transition-all
                duration-500
                ease-in-out,
                zoomcontainer
              "
              :class="expandFullImage ? 'w-full h-full' : 'w-full h-full'"
            >
              <video class="w-full h-full" controls="controls">
                <source :src="AllVideo.embedHtml ? AllVideo.embedHtml : ''" />
                <source :src="AllVideo.embedHtml ? AllVideo.embedHtml : ''" />
              </video>
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
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

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
    return {
      articles: computed(() => store.state.home.articles),
      youtubePlayListItems: computed(
        () => store.state.home.youtubePlayListItems
      ),
      expandFullImage: computed(() => store.state.home.expandFullImage),
    }
  },

  data() {
    return {
      isPlaying: false,
      currTime: '00:00',
      totalDuration: '00:00',
      currTrack: '',
      updateTimer: NaN,
      scale: 1,
      pointX: 0,
      pointY: 0,
    }
  },

  // mounted() {
  //   this.loadTrack()
  // },
  methods: {
    zoomIn(e) {
      // if (this.checkClass.classList.contains('text-xs')) {
      //   this.checkClass.classList.remove('text-xs')
      //   this.checkClass.classList.add('text-sm')
      // } else if (this.checkClass.classList.contains('text-sm')) {
      //   this.checkClass.classList.remove('text-sm')
      //   this.checkClass.classList.add('text-base')
      // } else if (this.checkClass.classList.contains('text-base')) {
      //   this.checkClass.classList.remove('text-base')
      //   this.checkClass.classList.add('text-lg')
      // } else if (this.checkClass.classList.contains('text-lg')) {
      //   this.checkClass.classList.remove('text-lg')
      //   this.checkClass.classList.add('text-xl')
      // }

      const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX *= 1.2
      if (scaleX < 1.1) {
        this.pointY = this.pointY + 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      } else {
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
      }
    },
    zoomOut(e) {
      // if (this.checkClass.classList.contains('text-xl')) {
      //   this.checkClass.classList.remove('text-xl')
      //   this.checkClass.classList.add('text-lg')
      // } else if (this.checkClass.classList.contains('text-lg')) {
      //   this.checkClass.classList.remove('text-lg')
      //   this.checkClass.classList.add('text-base')
      // } else if (this.checkClass.classList.contains('text-base')) {
      //   this.checkClass.classList.remove('text-base')
      //   this.checkClass.classList.add('text-sm')
      // } else if (this.checkClass.classList.contains('text-sm')) {
      //   this.checkClass.classList.remove('text-sm')
      //   this.checkClass.classList.add('text-xs')
      // }
      const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX /= 1.2
      if (scaleX >= 0.482252) {
        this.pointY = this.pointY - 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      }
    },

    loadTrack() {
      clearInterval(this.updateTimer)
      this.reset()
      this.currTrack = document.createElement('audio')
      this.currTrack.src = 'https://www.computerhope.com/jargon/m/example.mp3'
      this.currTrack.load()
    },
    reset() {
      // const seekSlider = document.querySelector('.seek_slider')
      this.currTime = '00:00'
      this.totalDuration = '00:00'
      setTimeout(() => {
        // seekSlider.value = 0
      }, 1500)
    },
    playPauseTrack() {
      this.isPlaying = !this.isPlaying
      this.isPlaying ? this.playTrack() : this.pauseTrack()
    },
    playTrack() {
      this.currTrack.play()
      this.isPlaying = true
      this.updateTimer = setInterval(this.setUpdate, 500)
      this.currTrack.addEventListener('ended', this.pauseTrack)
    },
    pauseTrack() {
      setTimeout(() => {
        this.currTrack.pause()
        this.isPlaying = false
        clearInterval(this.updateTimer)
      }, 1000)
    },
    seekTo() {
      const seekSlider = document.querySelector('.seek_slider')
      const seekto = this.currTrack.duration * (seekSlider.value / 100)
      this.currTrack.currentTime = seekto
    },
    setUpdate() {
      const seekSlider = document.querySelector('.seek_slider')
      let seekPosition = 0
      if (!isNaN(this.currTrack.duration)) {
        seekPosition =
          this.currTrack.currentTime * (100 / this.currTrack.duration)
        seekSlider.value = seekPosition
        let currentMinutes = Math.floor(this.currTrack.currentTime / 60)
        let currentSeconds = Math.floor(
          this.currTrack.currentTime - currentMinutes * 60
        )
        let durationMinutes = Math.floor(this.currTrack.duration / 60)
        let durationSeconds = Math.floor(
          this.currTrack.duration - durationMinutes * 60
        )
        if (currentSeconds < 10) {
          currentSeconds = '0' + currentSeconds
        }
        if (durationSeconds < 10) {
          durationSeconds = '0' + durationSeconds
        }
        if (currentMinutes < 10) {
          currentMinutes = '0' + currentMinutes
        }
        if (durationMinutes < 10) {
          durationMinutes = '0' + durationMinutes
        }
        this.currTime = currentMinutes + ':' + currentSeconds
        this.totalDuration = durationMinutes + ':' + durationMinutes
      }
    },
  },
})
</script>

<style lang="scss" scoped>
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
@media (max-width: 767px) {
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
</style>
