<template>
  <section class="w-full">
    <!-- <div class="mb-4 px-3 h-px w-full bg-gray-1500"></div> -->

    <div
      class="w-full cursor-pointer"
      @click="
        comment.replies.length > 0
          ? comment.mediaUrl.length === 0 || !comment.mediaType ||
            comment.mediaType === 'video' ||
            comment.mediaType === 'animated_gif'
            ? [
                showSinglePost(comment),
                setPreviousComment(comments, comment.replies),
              ]
            : [
                singleImagePostShow(comment, 0),
                setPreviousComment(comments, comment.replies),
              ]
          : ''
      "
    >
      <!-- <div class="mb-4 h-px w-full bg-gray-1500"></div> -->

      <div class="flex px-3 w-full">
        <div class="post-profile flex flex-col space-y-2 items-center">
          <section>
            <twitter-icon
              v-if="
                !comment.profileImageUrl &&
                !comment.referencedTweetsProfileImageUrl
              "
              class="w-14 h-14 rounded-full border border-gray-400"
            ></twitter-icon>

            <template v-else>
              <img
                v-if="comment.profileImageUrl"
                :src="comment.profileImageUrl"
                class="rounded-full w-14 h-14"
                :alt="`${comment.name} Profile Picture`"
                srcset
              />

              <img
                v-else
                :src="comment.referencedTweetsProfileImageUrl"
                class="rounded-full w-14 h-14"
                :alt="`${comment.referencedTweetsName} Profile Picture`"
                srcset
              />
            </template>
          </section>

          <!-- <div
            v-if="comment.replies.length > 0"
            class="w-0.5 flex-grow bg-gray-1500"
          ></div>-->
        </div>

        <div class="w-full">
          <div>
            <div class="flex justify-between items-start">
              <p class="text-ash-primary">
                <span v-if="comment.name" class="font-bold text-offgray">{{ comment.name }}</span>

                <span v-else class="font-bold text-offgray">{{ comment.referencedTweetsName }}</span>

                <!-- <img
                src="@/assets/img/svg/twitter/Verify.svg"
                class="inline-block h-4"
                alt="Twitter Verify Icon"
                />-->
                <template v-if="!showSingleImagePost">
                  <span v-if="comment.username" class="text-gray-1700">@{{ comment.username }} ·</span>

                  <span v-else class="text-gray-1700">@{{ comment.referencedTweetsUsername }} ·</span>

                  <span
                    v-if="comment.createdAt"
                    class="text-gray-1700"
                  >{{ comment.createdAt | diffForHumansShortFlag }}</span>

                  <span v-else class="text-gray-1700">
                    {{
                    comment.referencedTweetsCreatedAt | diffForHumansShortFlag
                    }}
                  </span>
                </template>
              </p>

              <!-- <fa
                class="cursor-pointer text-gray-600 text-lg mt-1 mr-0.5"
                :icon="['fas', 'ellipsis-h']"
              />-->
            </div>

            <p v-if="showSingleImagePost" class="text-ash-primary">
              <span v-if="comment.username" class="text-gray-1700">@{{ comment.username }} ·</span>

              <span v-else class="text-gray-1700">@{{ comment.referencedTweetsUsername }} ·</span>

              <span
                v-if="comment.createdAt"
                class="text-gray-1700"
              >{{ comment.createdAt | diffForHumansShortFlag }}</span>

              <span
                v-else
                class="text-gray-1700"
              >{{ comment.referencedTweetsCreatedAt | diffForHumansShortFlag }}</span>
            </p>

            <p v-if="comment.referencedTweetsUsername" class="text-gray-1700 text-sm">
              Replying To
              <span class="text-blue-600">@{{ comment.referencedTweetsUsername }}</span>
            </p>

            <!-- <p v-if="article.replyToUsername" class="">
                    <span class="text-gray-1700">Replying to</span>
                    <span class="text-blue-600"
                      >@{{ article.replyToUsername }}</span
                    >
            </p>-->

            <!-- v-html="linkify(article.text, article.entities.urls)" -->

            <p v-if="comment.text" class="text-ash-primary">{{ comment.text }}</p>

            <div
              v-for="(poll, pollIndex) in comment.polls"
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
                    totalTimeLeft(poll.end_datetime) === 'Final results') &&
                  maxValueIndex(poll.options, optionIndex) === optionIndex
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
                      totalTimeLeft(poll.end_datetime) === 'Final results') &&
                    maxValueIndex(poll.options, optionIndex) === optionIndex
                      ? 'poll_bgColor_closed'
                      : 'poll_bgColor',
                  ]"
                  :style="{
                    '--bgValue':
                      votingPercentage(poll.options, option.votes) === 0
                        ? '7px'
                        : `${votingPercentage(poll.options, option.votes)}%`,
                  }"
                ></div>

                <p class="text-ash-primary z-1 break-all">{{ option.label }}</p>

                <p class="text-ash-primary z-1">{{ votingPercentage(poll.options, option.votes) }}%</p>
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
              comment.mediaUrl.length > 0 &&
              comment.mediaUrl.length !== 3 &&
              comment.mediaType === 'photo'
            "
            class="flex justify-center flex-wrap relative mt-3 overflow-hidden rounded-3xl border border-solid border-gray-2100 space-x-0.5"
          >
            <div
              v-for="(feature, imageIndex) in comment.mediaUrl.slice(0, 5)"
              :key="feature"
              class="flex justify-center items-center cursor-pointer"
              :class="[
                imageIndex < 2 ? 'column-2' : 'column-3',
                imageIndex === 2 ? 'margin_left' : '',
                comment.mediaUrl.length === 4 &&
                (imageIndex === 0 || imageIndex === 1)
                  ? 'margin_top'
                  : '',
              ]"
              @click.stop="
                comment.replies.length > 0
                  ? [
                      singleImagePostShow(comment, imageIndex),
                      setPreviousComment(comments, comment.replies),
                    ]
                  : ''
              "
            >
              <img
                class="w-full"
                :class="[comment.mediaUrl.length > 1 ? 'hover-border' : '']"
                :src="feature"
              />

              <div v-if="imageIndex === 4" class="w-full absolute z-0 post-overlay">
                <div class="sub-overlay"></div>

                <p
                  class="xl:text-5xl md:text-3xl text-xl relative opacity-100 text-white font-bold"
                >+ {{ comment.mediaUrl.length - 4 }}</p>
              </div>
            </div>
          </div>

          <div
            v-else-if="
              comment.mediaUrl.length > 0 &&
              comment.mediaUrl.length === 3 &&
              comment.mediaType === 'photo'
            "
            class="flex justify-center flex-nowrap mt-3 overflow-hidden rounded-3xl border border-solid border-gray-2100 space-x-0.5"
          >
            <div class="flex flex-col w-1/2">
              <div
                v-for="(feature, imageIndex) in comment.mediaUrl.slice(0, 1)"
                :key="feature"
                class="flex justify-center items-center cursor-pointer"
                :class="imageIndex < 2 ? 'column-2' : 'column-3'"
                @click.stop="
                  comment.replies.length > 0
                    ? [
                        singleImagePostShow(comment, imageIndex),
                        setPreviousComment(comments, comment.replies),
                      ]
                    : ''
                "
              >
                <img class="w-full h-full three-image-show" :src="feature" />
              </div>
            </div>

            <div class="flex flex-col w-1/2">
              <div
                v-for="(feature, imageIndex) in comment.mediaUrl.slice(1, 5)"
                :key="feature"
                class="flex justify-center items-center cursor-pointer"
                :class="[
                  imageIndex < 3 ? 'column-2' : 'column-3',
                  comment.mediaUrl.length === 3 && imageIndex === 0
                    ? 'margin_top'
                    : '',
                ]"
                @click.stop="
                  comment.replies.length > 0
                    ? [
                        singleImagePostShow(comment, imageIndex),
                        setPreviousComment(comments, comment.replies),
                      ]
                    : ''
                "
              >
                <img class="w-full h-full hover-border" :src="feature" />

                <div v-if="imageIndex === 2" class="w-full h-full absolute z-0 post-overlay">
                  <div class="sub-overlay"></div>

                  <p
                    class="xl:text-5xl md:text-3xl text-xl relative opacity-100 text-white font-bold"
                  >{{ `+${comment.mediaUrl.length - 4}` }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="
              (comment.mediaType === 'video' ||
                comment.mediaType === 'animated_gif') &&
              comment.videoUrl.length > 0 &&
              showContext
            "
            class="w-full pt-6"
          >
            <video class="w-full" height="400" controls="controls">
              <source :src="comment.videoUrl[0]" />
              <source :src="comment.videoUrl[0]" />
            </video>
          </div>

          <div class="reaction w-full">
            <div>
              <img src="@/assets/img/icon/Twitter Icon/comment_1.svg" alt="Twitter Comment Icon" />
              <span>{{ comment.replyCount }}</span>
            </div>

            <div>
              <img src="@/assets/img/icon/Twitter Icon/retweet.svg" alt="Twitter Retweet Icon" />
              <span>{{ comment.retweetCount }}</span>
            </div>

            <div>
              <img
                class
                src="@/assets/img/icon/Twitter Icon/love_2.svg"
                alt="Twitter Reaction Icon"
              />
              <span>{{ comment.likeCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="mb-4 h-px w-full bg-gray-1500"></div> -->
    </div>

    <!-- <comment-replies
      :comments="comment.replies"
      :main-comment="comment"
    ></comment-replies>-->

    <div class="mb-4 px-3 h-px opacity-50 w-full bg-gray-1500"></div>
  </section>
</template>


<script>
import { mapState } from 'vuex'
import CommentReplies from './Replies.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
export default {
  name: 'Comment',
  // eslint-disable-next-line vue/no-unused-components
  components: { TwitterIcon, CommentReplies },
  props: {
    comment: {
      type: Object,
      default: null,
    },
    comments: {
      type: Array,
      default: null,
    },
    showContext: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('socialFeed', ['singlePost', 'showSingleImagePost']),
  },
  methods: {
    showSinglePost(singleItem) {
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
      setTimeout(() => {
        this.$store.dispatch('socialFeed/singlePostShow', {
          singleItem,
          show: true,
          previousSinglePost: this.singlePost,
        })
      }, 300)
    },
    singleImagePostShow(singleItem, index) {
      this.$store.dispatch('socialFeed/singlePostClose', false)
      setTimeout(() => {
        this.$store.dispatch('socialFeed/singleImagePostShow', {
          singleItem,
          show: true,
          index,
          previousSinglePost: this.singlePost,
        })
      }, 300)
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
    setPreviousComment(comments, replies) {
      setTimeout(() => {
        this.$store.dispatch('home/setTwitterPreviousComment', {
          comments,
          replies,
        })
      }, 300)
    },
  },
}
</script>


<style scoped>
.post-profile {
  @apply pr-3 pt-3 -mt-3;
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

.poll_bgColor {
  background: #cfd9de;
  width: var(--bgValue);
}

.poll_bgColor_closed {
  background: #1d9bf094;
  width: var(--bgValue);
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
</style>
