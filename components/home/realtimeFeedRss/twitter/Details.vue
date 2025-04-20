<template>
  <transition name="imagePopup">
    <div v-if="show" class="w-full flex flex-col justify-start mt-3">
      <div
        v-if="previousSinglePost.length === 0"
        class="
          w-9
          h-9
          cursor-pointer
          rounded-full
          bg-white
          flex
          justify-center
          items-center
        "
        @click="closeSinglePost(singlePost.id)"
      >
        <fa
          class="
            text-orange-dark
            xl:text-2xl
            md:text-xl
            font-normal
            cursor-pointer
          "
          :icon="['fas', 'times']"
        />
      </div>
      <div
        v-else
        class="
          w-9
          h-9
          rounded-full
          bg-white
          flex
          justify-center
          cursor-pointer
          items-center
        "
        @click="backToPreviousPost()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width="24"
          height="24"
        >
          <defs>
            <style>
              .back-arrow {
                fill: #e4801d;
              }
            </style>
          </defs>
          <path
            class="back-arrow"
            d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
      </div>

      <div
        id="whole-card1"
        class="my-3 w-full flex md:flex-nowrap flex-wrap bg-white whole-card"
      >
        <div
          class="
            md:w-1/2
            w-full
            border
            rounded-lg
            twitter-card
            card
            h-auto
            bg-white
          "
          :class="showContext ? 'fade-in' : 'fade-out'"
        >
          <div class="flex flex-col">
            <div
              v-if="
                singlePost.referencedTweetsId &&
                singlePost.referencedTweetsType !== 'replied_to'
              "
              class="flex flex-row space-x-0 ml-12"
            >
              <img
                class="retweet"
                src="@/assets/img/icon/Twitter Icon/retweet.svg"
                alt="Twitter Retweet Icon"
              />

              <div class="text-gray-1700 font-semibold">You Retweeted</div>
            </div>

            <div class="flex px-3 w-full">
              <div class="post-profile">
                <twitter-icon
                  v-if="
                    !profilePic && !singlePost.referencedTweetsProfileImageUrl
                  "
                  class="w-14 h-14 rounded-full border border-gray-400"
                ></twitter-icon>

                <template v-else>
                  <img
                    v-if="
                      !singlePost.referencedTweetsProfileImageUrl ||
                      previousSinglePost.length > 0
                    "
                    :src="
                      singlePost.profileImageUrl
                        ? singlePost.profileImageUrl
                        : profilePic
                    "
                    class="rounded-full w-14 h-14"
                    :alt="`${singlePost.name} Profile Picture`"
                    srcset=""
                  />

                  <img
                    v-else
                    :src="singlePost.referencedTweetsProfileImageUrl"
                    class="rounded-full w-14 h-14"
                    :alt="`${singlePost.referencedTweetsName} Profile Picture`"
                    srcset=""
                  />
                </template>
              </div>

              <div class="w-full">
                <div class="flex justify-between items-start">
                  <p class="text-ash-primary">
                    <span
                      v-if="!singlePost.referencedTweetsName"
                      class="font-bold text-offgray"
                    >
                      {{ singlePost.name }}
                    </span>

                    <span v-else class="font-bold text-offgray">
                      {{ singlePost.referencedTweetsName }}
                    </span>

                    <img
                      src="@/assets/img/svg/twitter/Verify.svg"
                      class="inline-block h-4"
                      alt="Twitter Verify Icon"
                    />

                    <span
                      v-if="!singlePost.referencedTweetsUsername"
                      class="text-gray-1700"
                    >
                      @{{ username }} ·
                    </span>

                    <span v-else class="text-gray-1700">
                      @{{ singlePost.referencedTweetsUsername }} ·
                    </span>

                    <span
                      v-if="!singlePost.referencedTweetsCreatedAt"
                      class="text-gray-1700"
                    >
                      {{ singlePost.createdAt | diffForHumansShortFlag }}
                    </span>

                    <span v-else class="text-gray-1700">
                      {{
                        singlePost.referencedTweetsCreatedAt
                          | diffForHumansShortFlag
                      }}
                    </span>
                  </p>

                  <!-- <fa
                    class="cursor-pointer text-gray-600 text-lg mt-1 mr-0.5"
                    :icon="['fas', 'ellipsis-h']"
                  /> -->
                </div>

                <!-- <p v-if="singlePost.replyToUsername" class="">
                  <span class="text-gray-1700">Replying to</span>
                  <span class="text-blue-600"
                    >@{{ singlePost.replyToUsername }}</span
                  >
                </p> -->

                <p
                  v-if="singlePost.text"
                  class="text-ash-primary"
                  v-html="singlePost.text"
                ></p>

                <div
                  v-for="(poll, pollIndex) in singlePost.polls"
                  :key="pollIndex"
                  class="flex flex-col my-4"
                >
                  <div
                    v-for="(option, optionIndex) in poll.options"
                    :key="optionIndex"
                    class="
                      flex
                      justify-between
                      space-x-2
                      items-center
                      w-full
                      p-3
                      relative
                    "
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
                          totalTimeLeft(poll.end_datetime) ===
                            'Final results') &&
                        maxValueIndex(poll.options, optionIndex) === optionIndex
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

                    <p class="text-ash-primary z-1 break-all">
                      {{ option.label }}
                    </p>

                    <p class="text-ash-primary z-1">
                      {{ votingPercentage(poll.options, option.votes) }}%
                    </p>
                  </div>

                  <div class="flex space-x-2 items-center">
                    <span
                      v-if="totalVotes(poll.options) === 1"
                      class="text-gray-1700 mt-4 inline-block"
                    >
                      {{ totalVotes(poll.options) }} vote
                    </span>

                    <span v-else class="text-gray-1700 mt-4 inline-block">
                      {{ totalVotes(poll.options) }} votes
                    </span>

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

                <div
                  v-if="
                    (singlePost.mediaType === 'video' ||
                      singlePost.mediaType === 'animated_gif') &&
                    singlePost.videoUrl.length > 0 &&
                    showContext
                  "
                  class="w-full pt-6"
                >
                  <video class="w-full" height="400" controls="controls">
                    <source :src="singlePost.videoUrl[0]" />
                    <source :src="singlePost.videoUrl[0]" />
                  </video>
                </div>

                <div class="reaction">
                  <div>
                    <TwitterCommentIcon class="inline-block w-4 mr-4" />

                    <span>{{ singlePost.replyCount }}</span>
                  </div>

                  <div>
                    <img
                      src="@/assets/img/icon/Twitter Icon/retweet.svg"
                      alt="Twitter Retweet Icon"
                    />

                    <span>{{ singlePost.retweetCount }}</span>
                  </div>

                  <div>
                    <TwitterReactionIcon class="inline-block w-4 mr-4" />

                    <span>{{ singlePost.likeCount }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-4 h-0.5 w-full bg-gray-1500"></div>

            <comments
              v-if="comments"
              :comments="comments"
              :show-context="showContext"
            ></comments>
          </div>
        </div>

        <!-- <div class="text-center self-center my-56 xl:my-0">
      <h2 class="text-xl text-gray-1100 font-semibold">Details</h2>
    </div> -->

        <facebook-message
          class="w-full"
          :card-height="cardHeight"
          :article="singlePost"
        ></facebook-message>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapState } from 'vuex'
import FacebookMessage from '~/components/home/realtimeFeedRss/FacebookMessage.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import Comments from '~/components/home/realtimeFeedRss/twitter/Comments.vue'
import TwitterCommentIcon from '~/components/shared/icon/TwitterCommentIcon.vue'
import TwitterReactionIcon from '~/components/shared/icon/TwitterReactionIcon.vue'
export default {
  name: 'TwitterSinglePost',
  components: {
    FacebookMessage,
    TwitterCommentIcon,
    TwitterReactionIcon,
    TwitterIcon,
    Comments,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
    profilePic: {
      type: String,
      default: '',
    },
    comments: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      cardHeight: 0,
      show: false,
      showContext: false,
      temp: '',
    }
  },
  computed: {
    ...mapState('socialFeed', [
      'showSinglePost',
      'singlePost',
      'previousSinglePost',
    ]),
    ...mapState('home', ['previousTwitterComment']),
  },
  watch: {
    showSinglePost(data) {
      if (data) {
        setTimeout(() => {
          this.show = true
          if (this.show) {
            this.showContext = true
          }
          setTimeout(() => {
            this.defineCardHeight()
          }, 800)
        }, 200)
      } else {
        this.show = false
        this.cardHeight = 0
      }
    },
    singlePost(data) {
      if (data) {
        this.showContext = false
        setTimeout(() => {
          if (this.show) {
            this.showContext = true
          }
          setTimeout(() => {
            this.defineCardHeight()
          }, 800)
        }, 10)
      }
    },
  },
  mounted() {},
  methods: {
    // showHideComment(id) {
    //   this.$emit('showHide', id)
    // },
    closeSinglePost(id) {
      // this.$emit('showHide', id)
      this.$store.commit('home/RESET_TWITTER_COMMENTS')
      this.$store.dispatch('socialFeed/singlePostClose', false)
      setTimeout(() => {
        this.$store.commit('socialFeed/SET_SHOW_TWITTER', true)
      }, 300)
    },
    defineCardHeight() {
      setTimeout(() => {
        const card = document.querySelectorAll('.twitter-card')
        card.forEach((item) => {
          if (item.offsetHeight > 0) {
            this.cardHeight = item.offsetHeight
          }
        })
      }, 1000)
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

    backToPreviousPost() {
      if (
        this.previousSinglePost[0].mediaUrl.length === 0 ||
        this.previousSinglePost[0].mediaType !== 'photo'
      ) {
        this.$store.commit('socialFeed/SINGLE_POST_SHOW', true)
        this.$store.commit(
          'socialFeed/BACK_TO_PREVIOUS_POST',
          this.previousSinglePost[0]
        )
        this.$store.commit(
          'home/BACK_TO_PREVIOUS_COMMENT',
          this.previousTwitterComment[0]
        )
      } else {
        this.$store.dispatch('socialFeed/singlePostClose', false)
        setTimeout(() => {
          this.$store.commit('socialFeed/SINGLE_IMAGE_POST_SHOW', true)
          this.$store.commit(
            'socialFeed/BACK_TO_PREVIOUS_POST',
            this.previousSinglePost[0]
          )
          this.$store.commit(
            'home/BACK_TO_PREVIOUS_COMMENT',
            this.previousTwitterComment[0]
          )
        }, 450)
      }
    },
  },
}
</script>


<style scoped>
.whole-card {
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
}
.card {
  @apply bg-white py-3 my-0 md:w-1/2 w-full z-1;
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
  /* // min-width: 400px;
  // max-width: 690px; */
}
.imagePopup-enter-active,
.imagePopup-leave-active {
  transition: opacity 0.5s;
}
.imagePopup-enter,
.imagePopup-leave-to {
  opacity: 0;
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

.poll_bgColor {
  background: #cfd9de;
  width: var(--bgValue);
}

.poll_bgColor_closed {
  background: #1d9bf094;
  width: var(--bgValue);
}

.fade-in {
  animation: fadeIn 2s ease-in-out;
  -webkit-animation: fadeIn 2s ease-in-out;
  -moz-animation: fadeIn 2s ease-in-out;
  -o-animation: fadeIn 2s ease-in-out;
  -ms-animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-out {
  animation: fadeOut 2s ease-in-out;
  -webkit-animation: fadeOut 2s ease-in-out;
  -moz-animation: fadeOut 2s ease-in-out;
  -o-animation: fadeOut 2s ease-in-out;
  -ms-animation: fadeOut 2s ease-in-out;
}

@keyframes fadeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
