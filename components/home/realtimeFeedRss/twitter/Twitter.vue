<template>
  <div class="relative w-full h-full space-y-1 md:px-0 px-2 md:my-0 mb-0">
    <transition name="media">
      <div v-if="articles && !loadArticles && showTwitter" class="py-5 md:px-5 px-2 h-full">
        <div class="w-full h-auto mb-2 text-blue-600 text-xl font-semibold">
          Twitter
          <p class="text-lg text-black font-semibold">{{ articles.name || articles.username }}</p>
        </div>

        <div
          v-if="articles.items.length === 0"
          class="w-full h-auto mb-2 text-blue-600 text-xl font-semibold relative noDataContainer"
        >
          <div class="text-2xl text-center text-black font-semibold absolute noData">No Data Found</div>
        </div>

        <div class="card">
          <div
            v-for="(article, index) in articles.items"
            :key="index"
            class="flex flex-col cursor-pointer"
          >
            <template v-if="article.referencedTweetsType !== 'replied_to'">
              <div
                v-if="article.referencedTweetsId"
                class="flex flex-row space-x-0 ml-12"
                @click="
                  ;[
                    loadFeedComment(
                      article.id,
                      article.socialId,
                      article.referencedTweetsId,
                      article.referencedTweetsType
                    ),
                    article.mediaUrl.length === 0 || !article.mediaType ||
                    article.mediaType === 'video' ||
                    article.mediaType === 'animated_gif'
                      ? singlePostShow(article)
                      : singleImagePostShow(article, 0),
                  ]
                "
              >
                <img
                  class="retweet"
                  src="@/assets/img/icon/Twitter Icon/retweet.svg"
                  alt="Twitter Retweet Icon"
                />

                <div class="text-gray-1700 font-semibold">You Retweeted</div>
              </div>

              <div class="flex px-3 w-full">
                <div
                  class="post-profile"
                  @click="
                    ;[
                      loadFeedComment(
                        article.id,
                        article.socialId,
                        article.referencedTweetsId,
                        article.referencedTweetsType
                      ),
                      article.mediaUrl.length === 0 || !article.mediaType ||
                      article.mediaType === 'video' ||
                      article.mediaType === 'animated_gif'
                        ? singlePostShow(article)
                        : singleImagePostShow(article, 0),
                    ]
                  "
                >
                  <twitter-icon
                    v-if="
                      !article.profileImageUrl &&
                      !article.referencedTweetsProfileImageUrl
                    "
                    class="w-14 h-14 rounded-full border border-gray-400"
                  ></twitter-icon>

                  <template v-else>
                    <img
                      v-if="!article.referencedTweetsProfileImageUrl"
                      :src="article.profileImageUrl"
                      class="rounded-full w-14 h-14"
                      :alt="`${article.name} Profile Picture`"
                      srcset
                    />

                    <img
                      v-else
                      :src="article.referencedTweetsProfileImageUrl"
                      class="rounded-full w-14 h-14"
                      :alt="`${article.referencedTweetsName} Profile Picture`"
                      srcset
                    />
                  </template>
                </div>

                <div class="w-full">
                  <div
                    @click="
                      ;[
                        loadFeedComment(
                          article.id,
                          article.socialId,
                          article.referencedTweetsId,
                          article.referencedTweetsType
                        ),
                        article.mediaUrl.length === 0 || !article.mediaType ||
                        article.mediaType === 'video' ||
                        article.mediaType === 'animated_gif'
                          ? singlePostShow(article)
                          : singleImagePostShow(article, 0),
                      ]
                    "
                  >
                    <div class="flex justify-between items-start">
                      <p class="text-ash-primary">
                        <span
                          v-if="!article.referencedTweetsName"
                          class="font-bold text-offgray"
                        >{{ article.name }}</span>

                        <span
                          v-else
                          class="font-bold text-offgray"
                        >{{ article.referencedTweetsName }}</span>

                        <img
                          src="@/assets/img/svg/twitter/Verify.svg"
                          class="inline-block h-4"
                          alt="Twitter Verify Icon"
                        />

                        <span
                          v-if="!article.referencedTweetsUsername"
                          class="text-gray-1700"
                        >@{{ articles.username }} ·</span>

                        <span
                          v-else
                          class="text-gray-1700"
                        >@{{ article.referencedTweetsUsername }} ·</span>

                        <span
                          v-if="!article.referencedTweetsCreatedAt"
                          class="text-gray-1700"
                        >{{ article.createdAt | diffForHumansShortFlag }}</span>

                        <span v-else class="text-gray-1700">
                          {{
                          article.referencedTweetsCreatedAt
                          | diffForHumansShortFlag
                          }}
                        </span>
                      </p>

                      <!-- <fa
                        class="cursor-pointer text-gray-600 text-lg mt-1 mr-0.5"
                        :icon="['fas', 'ellipsis-h']"
                      />-->
                    </div>

                    <!-- <p v-if="article.replyToUsername" class="">
                    <span class="text-gray-1700">Replying to</span>
                    <span class="text-blue-600"
                      >@{{ article.replyToUsername }}</span
                    >
                    </p>-->

                    <!-- v-html="linkify(article.text, article.entities.urls)" -->

                    <p v-if="article.text" class="text-ash-primary" v-html="article.text"></p>
                    <div
                      v-for="(poll, pollIndex) in article.polls"
                      :key="pollIndex"
                      class="flex flex-col my-4"
                    >
                      <div
                        v-for="(option, optionIndex) in poll.options"
                        :key="optionIndex"
                        class="flex justify-between space-x-2 items-center w-full p-3 relative"
                        :class="[
                          optionIndex !== 0 ? 'mt-1' : '',
                          (poll.voting_status === 'closed' ||
                            totalTimeLeft(poll.end_datetime) ===
                              'Final results') &&
                          maxValueIndex(poll.options, optionIndex) ===
                            optionIndex
                            ? 'font-bold'
                            : '',
                        ]"
                      >
                        <div
                          class="absolute top-0 left-0 h-full"
                          :class="[
                            votingPercentage(poll.options, option.votes) === 0
                              ? 'rounded-lg'
                              : 'rounded-md',
                            (poll.voting_status === 'closed' ||
                              totalTimeLeft(poll.end_datetime) ===
                                'Final results') &&
                            maxValueIndex(poll.options, optionIndex) ===
                              optionIndex
                              ? 'poll_bgColor_closed'
                              : 'poll_bgColor',
                          ]"
                          :style="{
                            '--bgValue':
                              votingPercentage(poll.options, option.votes) === 0
                                ? '7px'
                                : `${votingPercentage(
                                    poll.options,
                                    option.votes
                                  )}%`,
                          }"
                        ></div>

                        <p class="text-ash-primary z-1 break-all">{{ option.label }}</p>

                        <p
                          class="text-ash-primary z-1"
                        >{{ votingPercentage(poll.options, option.votes) }}%</p>
                      </div>

                      <div class="flex space-x-2 items-center">
                        <span
                          v-if="totalVotes(poll.options) === 1"
                          class="text-gray-1700 mt-4 inline-block"
                        >{{ totalVotes(poll.options) }} vote</span>

                        <span
                          v-else
                          class="text-gray-1700 mt-4 inline-block"
                        >{{ totalVotes(poll.options) }} votes</span>

                        <span class="text-gray-1700 mt-4 inline-block">·</span>

                        <span class="text-gray-1700 mt-4 inline-block">
                          {{
                          poll.voting_status === 'closed'
                          ? 'Final results'
                          : totalTimeLeft(poll.end_datetime)
                          }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- <img
                  v-if="article.mediaUrl"
                  :src="article.mediaUrl"
                  :alt="`${article.name}'s Posted Image in Twitter Profile`"
                  class="mt-3 rounded-xl w-full"
                  />-->

                  <div
                    v-if="
                      article.mediaUrl.length > 0 &&
                      article.mediaType === 'photo' &&
                      article.mediaUrl.length !== 3
                    "
                    class="flex justify-center flex-wrap relative mt-3 overflow-hidden rounded-3xl border border-solid border-gray-2100 space-x-0.5"
                  >
                    <div
                      v-for="(feature, imageIndex) in article.mediaUrl.slice(
                        0,
                        5
                      )"
                      :key="feature"
                      class="flex justify-center items-center cursor-pointer"
                      :class="[
                        imageIndex < 2 ? 'column-2' : 'column-3',
                        imageIndex === 2 ? 'margin_left' : '',
                        article.mediaUrl.length === 4 &&
                        (imageIndex === 0 || imageIndex === 1)
                          ? 'margin_top'
                          : '',
                      ]"
                      @click="
                        ;[
                          loadFeedComment(
                            article.id,
                            article.socialId,
                            article.referencedTweetsId,
                            article.referencedTweetsType
                          ),
                          singleImagePostShow(article, imageIndex),
                        ]
                      "
                    >
                      <img
                        class="w-full"
                        :class="[
                          article.mediaUrl.length > 1 ? 'hover-border' : '',
                        ]"
                        :src="feature"
                      />

                      <div v-if="imageIndex === 4" class="w-full absolute z-0 post-overlay">
                        <div class="sub-overlay"></div>

                        <p
                          class="xl:text-5xl md:text-3xl text-xl relative opacity-100 text-white font-bold"
                        >+ {{ article.mediaUrl.length - 4 }}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-else-if="
                      article.mediaUrl.length > 0 &&
                      article.mediaType === 'photo' &&
                      article.mediaUrl.length === 3
                    "
                    class="flex justify-center flex-nowrap mt-3 overflow-hidden rounded-3xl border border-solid border-gray-2100 space-x-0.5"
                  >
                    <div class="flex flex-col w-1/2">
                      <div
                        v-for="(feature, imageIndex) in article.mediaUrl.slice(
                          0,
                          1
                        )"
                        :key="feature"
                        class="flex justify-center items-center cursor-pointer"
                        :class="imageIndex < 2 ? 'column-2' : 'column-3'"
                        @click="
                          ;[
                            loadFeedComment(
                              article.id,
                              article.socialId,
                              article.referencedTweetsId,
                              article.referencedTweetsType
                            ),
                            singleImagePostShow(article, imageIndex),
                          ]
                        "
                      >
                        <img class="w-full h-full three-image-show" :src="feature" />
                      </div>
                    </div>

                    <div class="flex flex-col w-1/2">
                      <div
                        v-for="(feature, imageIndex) in article.mediaUrl.slice(
                          1,
                          5
                        )"
                        :key="feature"
                        class="flex justify-center items-center cursor-pointer"
                        :class="[
                          imageIndex < 3 ? 'column-2' : 'column-3',
                          article.mediaUrl.length === 3 && imageIndex === 0
                            ? 'margin_top'
                            : '',
                        ]"
                        @click="
                          ;[
                            loadFeedComment(
                              article.id,
                              article.socialId,
                              article.referencedTweetsId,
                              article.referencedTweetsType
                            ),
                            singleImagePostShow(article, imageIndex),
                          ]
                        "
                      >
                        <img class="w-full h-full hover-border" :src="feature" />

                        <div
                          v-if="imageIndex === 2"
                          class="w-full h-full absolute z-0 post-overlay"
                        >
                          <div class="sub-overlay"></div>

                          <p
                            class="xl:text-5xl md:text-3xl text-xl relative opacity-100 text-white font-bold"
                          >{{ `+${article.mediaUrl.length - 4}` }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="
                      (article.mediaType === 'video' ||
                        article.mediaType === 'animated_gif') &&
                      article.videoUrl.length > 0
                    "
                    class="w-full pt-6"
                    @click="
                      ;[
                        loadFeedComment(
                          article.id,
                          article.socialId,
                          article.referencedTweetsId,
                          article.referencedTweetsType
                        ),
                        singlePostShow(article),
                      ]
                    "
                  >
                    <video class="w-full" height="400" controls="controls">
                      <source :src="article.videoUrl ? article.videoUrl : ''" />
                      <source :src="article.videoUrl ? article.videoUrl : ''" />
                    </video>
                  </div>
                  <div class="reaction">
                    <div
                      @click="
                        ;[
                          loadFeedComment(
                            article.id,
                            article.socialId,
                            article.referencedTweetsId,
                            article.referencedTweetsType
                          ),
                          article.mediaUrl.length === 0 || !article.mediaType ||
                          article.mediaType === 'video' ||
                          article.mediaType === 'animated_gif'
                            ? singlePostShow(article)
                            : singleImagePostShow(article, 0),
                        ]
                      "
                    >
                      <TwitterCommentIcon class="inline-block w-4 mr-4" />

                      <span>{{ article.replyCount }}</span>
                    </div>

                    <div>
                      <img
                        src="@/assets/img/icon/Twitter Icon/retweet.svg"
                        alt="Twitter Retweet Icon"
                      />
                      <span>{{ article.retweetCount }}</span>
                    </div>

                    <div>
                      <TwitterReactionIcon class="inline-block w-4 mr-4" />

                      <span>{{ article.likeCount }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4 h-px w-full bg-gray-1500"></div>
            </template>

            <!-- <comments v-if="feedComments" :comments="feedComments"></comments> -->
          </div>
        </div>

        <transition name="media">
          <div v-if="loadMoreArticlesSkelaton" class="mt-1 p-3 h-full animate-pulse">
            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div class="w-full flex flex-row items-center justify-start p-4 space-x-3">
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div class="w-full flex flex-row items-center justify-start p-4 space-x-3">
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div class="w-full flex flex-row items-center justify-start p-4 space-x-3">
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <button
          v-if="articles.items.length > 19"
          class="w-full h-10 bg-gray-300 text-black font-semibold md:text-lg text-md cursor-pointer flex justify-center items-center rounded-lg"
          :disabled="disableLoadMoreProcess"
          @click="loadMore()"
        >{{ loadMoreArticles ? 'Load More' : 'Less More' }}</button>
      </div>
    </transition>

    <twitter-details
      class="md:px-5 px-2"
      :username="articles.username"
      :profile-pic="articles.profilePic"
      :comments="twitterComment"
      @showHide="loadFeedComment($event)"
    ></twitter-details>

    <image-details
      class="md:px-5 px-2"
      :username="articles.username"
      :profile-pic="articles.profilePic"
      :comments="twitterComment"
      @showHide="loadFeedComment($event)"
    ></image-details>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { useFeedComment } from '../../../../composables/feeds/useComment'
import { useLoadMore } from '~/composables/feeds/useLoadMore'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import TwitterDetails from '~/components/home/realtimeFeedRss/twitter/Details.vue'
import ImageDetails from '~/components/home/realtimeFeedRss/twitter/ImageDetails.vue'
import Comments from '~/components/home/realtimeFeedRss/twitter/Comments.vue'
import TwitterCommentIcon from '~/components/shared/icon/TwitterCommentIcon.vue'
import TwitterReactionIcon from '~/components/shared/icon/TwitterReactionIcon.vue'
export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { TwitterIcon, TwitterDetails, ImageDetails, TwitterCommentIcon, TwitterReactionIcon, Comments },
  setup(props) {
    const { loadMore, disableLoadMoreProcess } = useLoadMore()
    const { loadComment } = useFeedComment()
    const feedComments = ref(null)
    const collapseable = ref(true)
    const store = useStore()
    const loadFeedComment = async (
      id,
      socialId,
      referencedTweetsId,
      referencedTweetsType,
      event
    ) => {
      // if (collapseable.value) {
      //   feedComments.value = null
      //   collapseable.value = false
      // } else {
      try {
        const { data } = await loadComment({
          provider: 'Twitter',
          id: id | event,
        })
        if (data.length) {
          feedComments.value = data
          store.dispatch('home/setTwitterComments', {
            data,
            socialId,
            referencedTweetsId,
            referencedTweetsType,
          })
          collapseable.value = true
        }
      } catch (error) {
        console.log(error)
      }
      // }
    }
    return { loadMore, disableLoadMoreProcess, loadFeedComment, feedComments }
  },
  data() {
    return {
      show: true,
      fullText: '',
      words: {},
      count: 0,
      demo: '',
    }
  },
  computed: {
    ...mapState('home', [
      'articles',
      'loadMoreArticles',
      'loadArticles',
      'loadMoreArticlesSkelaton',
      'twitterComment',
    ]),
    ...mapState('socialFeed', [
      'showSinglePost',
      'showSingleImagePost',
      'showTwitter',
    ]),
  },
  watch: {
    showSinglePost(data) {
      if (data) {
        this.show = false
      } else {
        setTimeout(() => {
          this.show = true
        }, 300)
      }
    },
    showSingleImagePost(data) {
      if (data) {
        this.show = false
      } else {
        setTimeout(() => {
          this.show = true
        }, 300)
      }
    },
  },
  methods: {
    singlePostShow(singleItem) {
      this.$store.commit('socialFeed/SET_SHOW_TWITTER', false)
      this.$store.dispatch('socialFeed/singlePostShow', {
        singleItem,
        show: true,
      })
    },
    singleImagePostShow(singleItem, index) {
      this.$store.commit('socialFeed/SET_SHOW_TWITTER', false)
      this.$store.dispatch('socialFeed/singleImagePostShow', {
        singleItem,
        show: true,
        index,
      })
    },
    votingPercentage(value, singleVote) {
      let totalValue = 0
      value.forEach((item) => {
        totalValue = totalValue + item.votes
      })
      let votePercentage = 0
      if (totalValue > 0) {
        votePercentage = (singleVote * 100) / totalValue
      }

      return votePercentage === 0
        ? 0
        : votePercentage === 100
        ? 100
        : votePercentage.toFixed(1)
    },
    totalVotes(value) {
      let totalValue = 0
      value.forEach((item) => {
        totalValue = totalValue + item.votes
      })

      return totalValue
    },

    totalTimeLeft(endTime) {
      const date1 = new Date()
      const date2 = new Date(endTime)

      const diff = date2.getTime() - date1.getTime()

      let msec = diff
      const hh = Math.floor(msec / 1000 / 60 / 60)
      msec -= hh * 1000 * 60
      const mm = Math.floor(msec / 1000 / 60)

      return hh < 0 && mm < 0
        ? 'Final results'
        : hh === 0
        ? mm + ' minutes left'
        : hh === 1
        ? hh + ' hour left'
        : hh + ' hours left'
    },

    maxValueIndex(array, currentIndex) {
      const tempArray = []
      array.forEach((item) => {
        tempArray.push(item.votes)
      })

      const max = Math.max(...tempArray)
      const index = []
      array.forEach((item, itemIndex) => {
        if (max === item.votes) {
          index.push(itemIndex)
        }
      })

      if (index.includes(currentIndex)) {
        return currentIndex
      }
    },
  },
})
</script>


<style scoped>
.noDataContainer {
  height: calc(100% - 56px);
}
.noData {
  top: 42%;
  left: 50%;
  transform: translate(-50%, -42%);
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
.card {
  @apply bg-white py-3 my-3;
  box-shadow: 0px 1px 2px #22283126;
}

.verticle-line {
  @apply absolute h-full border-l-2 border-red-700 top-2 left-6;
  border-color: #f1f2f6;
}

.post-profile {
  @apply pr-3 py-3 -mt-3;
  z-index: 20;
}

.post-profile img {
  min-width: 56px;
}

.reaction {
  @apply my-2 flex justify-around text-gray-1700 mr-16;
}
.reaction img {
  @apply inline-block w-4 mr-4;
  fill: #8e8e8e;
}
.retweet {
  @apply inline-block w-4 mr-4;
  fill: #8e8e8e;
}
.link {
  color: #1263cc;
}
.posted-image {
  @apply max-h-116;
}
.column-2 {
  flex: 48%;
  /* margin: 2px; */
  overflow: hidden;
  text-align: center;
  clear: both;
  position: relative;
}

.column-3 {
  /* margin: 2px; */
  flex: 32%;
  overflow: hidden;
  clear: both;
  text-align: center;
  position: relative;
}
.hover-border {
  /* border: 1px solid transparent; */
  width: 297px;
  height: 197px;
}
.three-image-show {
  /* width: 296px; */
  height: 396px;
}
.post-overlay {
  align-items: center;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: auto;
  z-index: 150;
  color: #fff;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), z-index 1ms;
}
.sub-overlay {
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  border-radius: inherit;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: inherit;
  width: 100%;
  will-change: opacity;
}
.margin_left {
  margin-left: 0px !important;
}
.margin_top {
  margin-bottom: 2px;
}

@media (max-width: 425px) {
  .hover-border {
    /* border: 1px solid transparent; */
    width: 297px;
    height: 125px;
  }
  .three-image-show {
    /* width: 296px; */
    height: 252px;
  }
}

.poll_bgColor {
  background: #cfd9de;
  width: var(--bgValue);
}

.poll_bgColor_closed {
  background: #1d9bf094;
  width: var(--bgValue);
}
</style>