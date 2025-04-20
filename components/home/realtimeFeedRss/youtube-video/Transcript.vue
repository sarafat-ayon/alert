<template>
  <div class="transcriptFeedHeight mt-3.5 space-y-6">
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
            class="flex flex-col md:space-y-4 h-full"
          >
            <template v-if="AllVideo.transcript.length > 0">
              <div
                v-for="(Transcript, transcriptIndex) in AllVideo.transcript"
                :key="transcriptIndex"
                class="flex flex-col transcript-body"
              >
                <div class="flex flex-row space-x-8 text-xl">
                  <div class="text-yellow-primary transcript-time px-0.5">{{ Transcript.start }}</div>
                  <div class="text-ash-primary">{{ Transcript.text }}</div>
                </div>
              </div>
            </template>
            <div
              v-else
              class="h-full w-full flex items-center justify-center font-bold md:text-xl text-lg"
            >
              <p>No Data Found</p>
            </div>
          </div>
        </template>
      </template>
      <div
        v-else
        key="2"
        class="h-full w-full flex items-center justify-center font-bold md:text-xl text-lg"
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
      // Transcripts: computed(() => store.state.home.Transcripts),
      // youtubeTranscript: computed(() => store.state.home.youtubeTranscript),
      articles: computed(() => store.state.home.articles),
      youtubePlayListItems: computed(
        () => store.state.home.youtubePlayListItems
      ),
      store,
    }
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
  transition: opacity 1s;
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
  height: 26px;
  width: 44px;
  background: #f0e9e5;
  box-sizing: border-box;
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
