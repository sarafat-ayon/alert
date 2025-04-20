<template>
  <section v-if="isDesktop" class="w-full h-full">
    <transition-group name="media" mode="out-in">
      <div
        v-if="articles && !loadArticles && !expandFullImage"
        key="1"
        class="w-full h-full flex md:flex-row flex-col flex-nowrap"
      >
        <template v-if="articles.items.length > 0">
          <div
            class="transition-all duration-500 ease-in-out"
            :class="
              expandFullImage
                ? 'w-0 opacity-0 md:h-full h-0'
                : 'md:w-1/3 w-full md:h-full mobile-height opacity-100'
            "
          >
            <div
              class="bg-orange-200 flex w-full h-9 text-md font-bold text-ash-primary items-center"
            >
              <div class="mx-1 h-full cursor-pointer" @click="optionSelect = 'Videos'">
                <div
                  class="heading h-full p-1.5"
                  :class="optionSelect === 'Videos' ? 'active' : ''"
                >Videos</div>
              </div>

              <div class="mx-1 h-full cursor-pointer" @click="optionSelect = 'Playlists'">
                <div
                  class="heading h-full p-1.5"
                  :class="optionSelect === 'Playlists' ? 'active' : ''"
                >Playlists</div>
              </div>
            </div>

            <transition-group name="videoFadeIn" mode="out-in">
              <div
                v-if="articles.items.length > 0 && optionSelect === 'Videos'"
                key="videos"
                class="flex w-full youtube-view-wrapper pb-0"
              >
                <div
                  id="videoContainer"
                  class="email-messages w-full h-full md:border-r border-yellow-300 scroll bottom-left-radius"
                >
                  <div
                    v-for="(AllVideo, index) in articles.items"
                    :key="index"
                    class="w-full"
                    :class="[
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-default',
                      AllVideo.id === currentSelectVideo
                        ? 'bg-orange-dark text-white'
                        : '',
                    ]"
                  >
                    <div
                      class="singleMessageWrapper px-3 py-3.5 cursor-pointer relative message-body flex platform text-lg font-bold lg:space-x-4 space-x-2 whitespace-normal break-words line-clamp-1 items-center flex-nowrap name"
                      :class="
                        AllVideo.id === currentSelectVideo
                          ? 'text-white'
                          : 'text-ash-primary'
                      "
                      @click="selectedVideo(AllVideo.id)"
                    >
                      <div class="videoThumbnail">
                        <img width="75" height="42" :src="AllVideo.thumbnail" />
                      </div>

                      <div class="flex flex-col flex-grow text-body-width">
                        <div>
                          <p class="h-7 text-clamp">{{ AllVideo.title }}</p>
                        </div>

                        <div class="flex justify-between text-xs font-normal">
                          <p>{{ AllVideo.shortDuration }}</p>

                          <date-time
                            :datetime="AllVideo.publishedAt"
                            format="MMMM dd, yyyy"
                            :show-time="false"
                            :friendly="false"
                          ></date-time>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="articles.totalCount > 20" class="w-full flex justify-center py-4">
                    <button
                      class="bg-orange-dark text-white text-lg h-10 w-34 rounded-full relative flex justify-around space-x-1 items-center px-4 font-medium"
                      :disabled="disableLoadMoreProcess"
                      @click="loadMore()"
                    >
                      <span>{{ loadMoreArticles ? 'Load more' : 'Less more' }}</span>

                      <fa
                        v-if="disableLoadMoreProcess"
                        class="text-white font-bold animate-spin"
                        :icon="['fas', 'spinner']"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="
                  optionSelect === 'Playlists' &&
                  youtubePlayLists &&
                  youtubePlayLists.playlists.length > 0
                "
                key="playlists"
                class="flex w-full youtube-view-wrapper pb-0"
              >
                <div
                  id="playlistContainer"
                  class="email-messages w-full h-full md:border-r border-yellow-300 scroll bottom-left-radius"
                >
                  <div
                    v-for="(AllVideo, index) in youtubePlayLists.playlists"
                    :key="index"
                    class="w-full"
                  >
                    <div
                      class="singleMessageWrapper px-3 py-3.5 cursor-pointer relative message-body flex platform text-lg font-bold lg:space-x-4 space-x-2 whitespace-normal break-words line-clamp-1 items-center flex-nowrap name"
                      :class="[
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-default',
                        AllVideo.id === currentSelectPlayList
                          ? 'bg-orange-dark text-white'
                          : 'text-ash-primary',
                      ]"
                      @click="selectedPlayLists(AllVideo.id, AllVideo)"
                    >
                      <div class="videoThumbnail relative">
                        <img width="75" height="42" :src="AllVideo.thumbnail" />

                        <div class="playlist space-y-0.5">
                          <p class="h-2.5">{{ AllVideo.count }}</p>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#fff"
                              fill-rule="evenodd"
                              d="M18.53 15.152C18.2217 14.9593 17.8332 14.9491 17.5152 15.1254 17.1973 15.3016 17 15.6365 17 16V21C17 21.3635 17.1973 21.6984 17.5152 21.8746 17.8332 22.0509 18.2217 22.0407 18.53 21.848L22.53 19.348C22.8224 19.1653 23 18.8448 23 18.5 23 18.1552 22.8224 17.8347 22.53 17.652L18.53 15.152zM2 15.5C1.44772 15.5 1 15.9477 1 16.5V20.5C1 21.0523 1.44772 21.5 2 21.5H15C15.5523 21.5 16 21.0523 16 20.5V16.5C16 15.9477 15.5523 15.5 15 15.5H2zM1 2.5C1 1.94772 1.44772 1.5 2 1.5H22C22.5523 1.5 23 1.94772 23 2.5V6.5C23 7.05228 22.5523 7.5 22 7.5H2C1.44772 7.5 1 7.05228 1 6.5V2.5zM2 8.5C1.44772 8.5 1 8.94772 1 9.5V13.5C1 14.0523 1.44772 14.5 2 14.5H22C22.5523 14.5 23 14.0523 23 13.5V9.5C23 8.94772 22.5523 8.5 22 8.5H2z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div class="flex flex-col flex-grow text-body-width">
                        <div>
                          <p class="h-7 text-clamp">{{ AllVideo.title }}</p>
                        </div>

                        <div class="flex justify-between text-xs font-normal">
                          <p>{{ AllVideo.shortDuration }}</p>

                          <date-time
                            :datetime="AllVideo.publishedAt"
                            format="MMMM dd, yyyy"
                            :show-time="false"
                            :friendly="false"
                          ></date-time>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        AllVideo.id === currentSelectPlayList &&
                        youtubePlayListItems &&
                        youtubePlayListItems.items.length > 0
                      "
                      class="flex w-full pb-0 transition-all duration-500 ease-in-out"
                      :style="[
                        {
                          '--height': `${
                            youtubePlayListItems.items.length * 68 + 50
                          }px`,
                        },
                      ]"
                      :class="
                        selectedPlayList
                          ? 'playList_height border border-orange-dark'
                          : 'h-0'
                      "
                    >
                      <div
                        class="email-messages w-full h-full md:border-r border-yellow-300 scroll"
                      >
                        <div
                          class="flex w-full space-x-2 items-center justify-between px-3 py-3 sticky bg-gray-default top-0 left-0 z-10"
                        >
                          <div class="flex space-x-2 items-center playlist-header-width">
                            <span
                              class="text-ash-primary text-clamp font-bold"
                            >{{ youtubePlayListItems.title }}</span>

                            <span class="font-normal text-xss">•</span>

                            <span
                              class="text-sm text-gray-light"
                            >{{ position }}/{{ youtubePlayListItems.count }}</span>
                          </div>

                          <fa
                            class="text-lg text-gray-light cursor-pointer"
                            :icon="['fas', 'times']"
                            @click="cancelSelectedPlaylist()"
                          />
                        </div>

                        <div
                          v-for="(
                            PlayListItems, PlayListIndex
                          ) in youtubePlayListItems.items"
                          :key="PlayListIndex"
                          class="w-full"
                        >
                          <div
                            class="singleMessageWrapper px-3 py-3.5 cursor-pointer relative message-body flex platform text-lg font-bold lg:space-x-2 space-x-2 whitespace-normal break-words line-clamp-1 items-center flex-nowrap name"
                            :class="[
                              PlayListIndex % 2 === 0
                                ? 'bg-white'
                                : 'bg-gray-default',
                              PlayListItems.id === currentSelectPlayListItem
                                ? 'bg-orange-dark text-white'
                                : 'text-ash-primary',
                            ]"
                            @click="
                              selectedPlayListsItems(
                                PlayListItems,
                                PlayListIndex
                              )
                            "
                          >
                            <div class="text-sm font-normal">{{ PlayListIndex + 1 }}</div>

                            <div class="videoThumbnail">
                              <img width="75" height="42" :src="PlayListItems.thumbnail" />
                            </div>

                            <div class="flex flex-col flex-grow playlist-text-body-width">
                              <div>
                                <p class="h-7 text-clamp">{{ PlayListItems.title }}</p>
                              </div>

                              <div class="flex justify-between text-xs font-normal">
                                <p>{{ PlayListItems.shortDuration }}</p>

                                <date-time
                                  :datetime="PlayListItems.publishedAt"
                                  format="MMMM dd, yyyy"
                                  :show-time="false"
                                  :friendly="false"
                                ></date-time>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          v-if="
                            youtubePlayListItems.count > 20 &&
                            youtubePlayListItems.count !==
                              youtubePlayListItems.items.length
                          "
                          class="w-full flex justify-center py-4"
                        >
                          <button
                            class="bg-orange-dark text-white text-lg h-10 w-34 rounded-full relative flex justify-around space-x-1 items-center px-4 font-medium"
                            :disabled="disableLoadMoreProcess"
                            @click="loadMorePlaylistItem()"
                          >
                            <span>Load more</span>

                            <fa
                              v-if="disableLoadMoreProcess"
                              class="text-white font-bold animate-spin"
                              :icon="['fas', 'spinner']"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="youtubePlayLists.playlists.length > 19"
                    class="w-full flex justify-center py-4"
                  >
                    <button
                      class="bg-orange-dark text-white text-lg h-10 w-34 rounded-full relative flex justify-around space-x-1 items-center px-4 font-medium"
                      :disabled="disableLoadMoreProcess"
                      @click="loadMore()"
                    >
                      <span>{{ loadMoreArticles ? 'Load more' : 'Less more' }}</span>

                      <fa
                        v-if="disableLoadMoreProcess"
                        class="text-white font-bold animate-spin"
                        :icon="['fas', 'spinner']"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>

          <!-- End YouTube Feed Header -->

          <div
            class="md:hidden px-2 w-full h-px bg-orange-dark my-2"
            :class="expandFullImage ? 'hidden' : 'block'"
          ></div>

          <!-- Start YouTube View -->

          <div
            class="transition-all duration-500 ease-in-out"
            :class="
              expandFullImage
                ? 'w-full h-full'
                : 'md:w-2/3 w-full md:h-full mobile-height'
            "
          >
            <div
              class="bg-orange-200 flex w-full h-9 text-md font-bold text-ash-primary items-center"
            >
              <div class="flex justify-between items-center px-4 w-full">
                <div class="heading">Content</div>
              </div>
            </div>

            <div v-if="articles.items.length > 0" class="flex w-full youtube-view-wrapper pb-0">
              <div
                :id="videoContentBody"
                class="email-content h-full w-full px-3 pt-4"
                :class="showScroll ? 'scroll' : ''"
              >
                <!-- Start YouTube Body -->

                <SummaryTranscriptDetailsComments
                  ref="showComment"
                  class="mx-auto"
                  :article="
                    currentSelectVideo === 0
                      ? articles.items[0]
                      : articles.items[currentSelectVideo]
                  "
                  :current-select-video="currentSelectVideo"
                  :current-select-play-list-item="currentSelectPlayListItem"
                  :option-select="optionSelect"
                />

                <transition name="fadeIn" mode="out-in">
                  <component
                    :is="currentYoutubeContent"
                    :current-select-video="currentSelectVideo"
                    :current-select-play-list-item="currentSelectPlayListItem"
                    :option-select="optionSelect"
                    @show-comment="$refs.showComment.$refs.comments.click()"
                    @selected-video="videoSelect($event)"
                  ></component>
                </transition>

                <!-- End YouTube Body -->
              </div>
            </div>
          </div>
        </template>

        <!-- End YouTube View -->

        <template v-else>
          <div
            class="w-full h-full mb-2 text-blue-600 text-xl font-semibold relative flex justify-center items-center"
          >
            <div class="text-2xl text-center text-black font-semibold absolute">No Data Found</div>
          </div>
        </template>
      </div>

      <full-video v-else key="2" :selected-video="selectedVideoItem"></full-video>
    </transition-group>
  </section>

  <YouTubeMobile
    v-else
    :current-select-video="currentSelectVideo"
    :current-select-play-list="currentSelectPlayList"
    :current-select-play-list-item="currentSelectPlayListItem"
    :option-select="optionSelect"
    :position="position"
    :video-content-body="videoContentBody"
    @current-option-select="currentOptionSelect"
    @selected-play-lists="selectedPlayLists"
    @selected-play-lists-item="selectedPlayListsItems"
    @selected-video="selectedVideo"
  />
</template>


<script>
import { mapState } from 'vuex'
import {
  defineComponent,
  useStore,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useFeedComment } from '~/composables/feeds/useComment'
import { useYoutubeTranscript } from '~/composables/feeds/useTranscript'
import { useLoadMore } from '~/composables/feeds/useLoadMore'
import SummaryTranscriptDetailsComments from '~/components/home/realtimeFeedRss/youtube-video/SummaryTranscriptDetailsComments.vue'
import Summary from '~/components/home/realtimeFeedRss/youtube-video/Summary.vue'
import Transcript from '~/components/home/realtimeFeedRss/youtube-video/Transcript.vue'
import Comments from '~/components/home/realtimeFeedRss/youtube-video/Comments.vue'
import Details from '~/components/home/realtimeFeedRss/youtube-video/Details.vue'
import YouTubeMobile from '~/components/home/realtimeFeedRss/youtube-video/Youtube_mobile.vue'
import FullVideo from '~/components/home/realtimeFeedRss/youtube-video/FullVideo.vue'

export default defineComponent({
  name: 'Youtube',
  components: {
    SummaryTranscriptDetailsComments,
    Summary,
    Transcript,
    Comments,
    Details,
    YouTubeMobile,
    FullVideo,
  },
  setup() {
    const { loadMore, loadMorePlaylistItem, disableLoadMoreProcess } =
      useLoadMore()
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const store = useStore()

    const { loadComment } = useFeedComment()
    const { loadTranscript } = useYoutubeTranscript()
    const loadFeedComment = async (id) => {
      try {
        const { data } = await loadComment({
          provider: 'YouTube',
          id,
        })
        if (data.length) {
          data.forEach((element) => {
            element.viewReply = ref(false)
          })
          store.commit('home/SET_YOUTUBE_COMMENT', data)
        } else {
          store.commit('home/SET_YOUTUBE_COMMENT', data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const loadYoutubeTranscript = async (id) => {
      try {
        const { data } = await loadTranscript({
          provider: 'YouTube',
          id,
        })
        if (data.length) {
          store.commit('home/SET_YOUTUBE_TRANSCRIPT', data)
        } else {
          store.commit('home/SET_YOUTUBE_TRANSCRIPT', data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      isDesktop: breakpoints.greater('lg'),
      allExpanded: computed(() => store.state.home.allExpanded),
      expandFullImage: computed(() => store.state.home.expandFullImage),
      currentYoutubeContent: computed(
        () => store.state.home.currentYoutubeContent
      ),
      youtubePlayLists: computed(() => store.state.home.youtubePlayLists),
      youtubePlayListItems: computed(
        () => store.state.home.youtubePlayListItems
      ),
      selectedPlayList: computed(() => store.state.home.selectedPlayList),
      store,
      loadMore,
      loadMorePlaylistItem,
      disableLoadMoreProcess,
      loadFeedComment,
      loadYoutubeTranscript,
    }
  },

  data() {
    return {
      currentSelectVideo: 0,
      optionSelect: 'Videos',
      currentSelectPlayList: 0,
      currentSelectPlayListItem: 0,
      position: 0,
      fullExpand: false,
      selectedVideoItem: null,
      currentVideoScrollPosition: 0,
      currentPlayListScrollPosition: 0,
      videoScroll: 0,
      playListVideoScroll: 0,
      videoContentBody: 'normalVideoContentBody',
      showScroll: true,
    }
  },
  computed: {
    loadArticles() {
      return this.$store.state.home.loadArticles
    },
    loadMoreArticles() {
      return this.$store.state.home.loadMoreArticles
    },
    ...mapState('home', [
      'articles',
      'loadMoreArticlesSkelaton',
      'bodyHeight',
      'bodyMobileHeight',
    ]),
  },
  watch: {
    currentSelectVideo(data) {
      if (data) {
        this.showScroll = false
        setTimeout(() => {
          this.showScroll = true
        }, 700)
      }
    },
    currentSelectPlayListItem(data) {
      if (data) {
        this.showScroll = false
        setTimeout(() => {
          this.showScroll = true
        }, 700)
      }
    },
    currentSelectPlayList(data) {
      if (data) {
        this.showScroll = false
        setTimeout(() => {
          this.showScroll = true
        }, 700)
      }
    },
    optionSelect(data) {
      if (data === 'Videos') {
        this.videosScrollPosition()
        this.$store.commit('home/SET_SELECTED_PlayList', false)
        this.selectedVideo(this.currentSelectVideo)
      } else if (data === 'Playlists') {
        this.playlistScrollPosition()
        if (this.currentSelectPlayList === 0) {
          if (this.youtubePlayLists) {
            this.selectedPlayLists(
              this.youtubePlayLists.playlists[0].id,
              this.youtubePlayLists.playlists[0]
            )
          }
        } else if (this.currentSelectPlayList !== 0) {
          if (this.youtubePlayLists) {
            this.youtubePlayLists.playlists.forEach((item) => {
              if (this.currentSelectPlayList === item.id) {
                this.selectedPlayLists(item.id, item)
              }
            })
          }
        }
        if (this.currentSelectPlayListItem === 0) {
          if (this.youtubePlayListItems) {
            this.selectedPlayListsItems(this.youtubePlayListItems.items[0], 0)
          }
        } else if (this.currentSelectPlayListItem !== 0) {
          if (this.youtubePlayListItems) {
            this.youtubePlayListItems.items.forEach((item, index) => {
              if (this.currentSelectPlayListItem === item.id) {
                this.selectedPlayListsItems(item, index)
              }
            })
          }
        }
      }
    },
    youtubePlayListItems(data) {
      if (data) {
        this.selectedPlayListsItems(data.items[0], 0)
      }
    },
    expandFullImage(data) {
      if (!data && this.optionSelect === 'Videos') {
        this.videosScrollPosition()
      } else if (!data && this.optionSelect === 'Playlists') {
        this.playlistScrollPosition()
      }
    },
  },
  mounted() {
    this.selectedVideo()
    this.$store.dispatch('home/getYoutubePlaylist', this.articles.id)
  },
  methods: {
    currentOptionSelect(currentOptionUpdate) {
      this.optionSelect = currentOptionUpdate
    },
    selectedVideo(selected) {
      if (this.currentSelectVideo === 0) {
        this.currentSelectVideo = this.articles.items[0].id
        this.loadFeedComment(this.currentSelectVideo)
        // this.loadYoutubeTranscript(this.currentSelectVideo)
        this.$store.commit('home/SET_VIDEO_DURATION', this.articles.items)
      } else {
        this.currentSelectVideo = selected
        this.loadFeedComment(this.currentSelectVideo)
        // this.loadYoutubeTranscript(this.currentSelectVideo)
      }
    },
    selectedPlayLists(selected, playlist) {
      if (this.currentSelectPlayList !== selected) {
        this.$store.commit('home/SET_SELECTED_PlayList', false)
        setTimeout(() => {
          this.currentSelectPlayList = selected
          this.$store.commit('home/SET_YOUTUBE_PLAYLIST_ITEMS', null)
          this.$store.dispatch('home/getYoutubePlaylistItem', {
            provider: 'YouTube',
            playlist,
          })
        }, 200)
      } else if (
        this.currentSelectPlayList === selected &&
        this.selectedPlayList
      ) {
        this.cancelSelectedPlaylist()
      } else if (
        this.currentSelectPlayList === selected &&
        !this.selectedPlayList
      ) {
        setTimeout(() => {
          this.currentSelectPlayList = selected
          if (!this.selectedPlayList)
            setTimeout(() => {
              this.$store.commit('home/SET_SELECTED_PlayList', true)
            }, 200)
        }, 200)
      }
    },
    selectedPlayListsItems(item, index) {
      if (item && this.currentSelectPlayList !== 0) {
        this.currentSelectPlayListItem = item.id
        this.position = index + 1
        this.loadFeedComment(item.mainVideoId)
        // this.loadYoutubeTranscript(item.mainVideoId)
      } else {
        this.$store.commit('home/SET_YOUTUBE_COMMENT', [])
        this.store.commit('home/SET_YOUTUBE_TRANSCRIPT', [])
      }
    },
    cancelSelectedPlaylist() {
      this.$store.commit('home/SET_SELECTED_PlayList', false)
    },
    videoSelect($event) {
      this.selectedVideoItem = $event
    },
    videosScrollPosition() {
      this.videoContentBody = 'normalVideoContentBody'
      if (document.getElementById('playListVideoContentBody')) {
        this.currentPlayListScrollPosition =
          document.getElementById('playlistContainer').scrollTop
        localStorage.setItem(
          'currentPlayListScrollPosition',
          this.currentPlayListScrollPosition
        )
        this.playListVideoScroll = document.getElementById(
          'playListVideoContentBody'
        ).scrollTop
        localStorage.setItem('playListVideoScroll', this.playListVideoScroll)
      }
      setTimeout(() => {
        document.getElementById('videoContainer').scrollTop =
          localStorage.getItem('currentVideoScrollPosition')
        document.getElementById('normalVideoContentBody').scrollTop =
          localStorage.getItem('videoScroll')
      }, 500)
    },
    playlistScrollPosition() {
      this.videoContentBody = 'playListVideoContentBody'
      if (document.getElementById('normalVideoContentBody')) {
        this.currentVideoScrollPosition =
          document.getElementById('videoContainer').scrollTop
        localStorage.setItem(
          'currentVideoScrollPosition',
          this.currentVideoScrollPosition
        )
        this.videoScroll = document.getElementById(
          'normalVideoContentBody'
        ).scrollTop
        localStorage.setItem('videoScroll', this.videoScroll)
      }

      setTimeout(() => {
        document.getElementById('playlistContainer').scrollTop =
          localStorage.getItem('currentPlayListScrollPosition')
        document.getElementById('playListVideoContentBody').scrollTop =
          localStorage.getItem('playListVideoScroll')
      }, 800)
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
  transition-delay: 0.6s;
}

.videoFadeIn-enter-active,
.videoFadeIn-leave-active {
  transition: opacity 0.5s;
}
.videoFadeIn-enter,
.videoFadeIn-leave-to {
  opacity: 0;
}
.videoFadeIn-enter-active {
  transition-delay: 0.6s;
}

.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}

.media-enter-active {
  transition-delay: 0.6s;
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
.text-xss {
  font-size: 10px;
  color: #434343;
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

.text-body-width {
  width: calc(100% - 92px);
}
.text-clamp {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.heading {
  &.active {
    color: #000000;
    border-bottom: 2px solid #000000;
  }
}
.playlist {
  width: 30px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(0 0 0 / 80%);
  color: #ffffff;
  line-height: 0.5rem;
  font-size: 0.6rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.playlist-header-width {
  width: calc(100% - 24px);
}
.playlist-text-body-width {
  width: calc(100% - 100px);
}
.playList_height {
  max-height: 384px;
  height: var(--height);
}
</style>


