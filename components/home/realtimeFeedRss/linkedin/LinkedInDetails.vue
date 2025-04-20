<template>
  <transition name="imagePopup">
    <div v-if="show" class="w-full flex flex-col justify-start mt-3">
      <div
        class="w-9 h-9 rounded-full bg-white flex justify-center items-center"
        @click="closeSinglePost()"
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
        class="my-3 w-full flex md:flex-nowrap flex-wrap bg-white whole-card"
      >
        <div
          id="linkedinsinglepost"
          class="
            md:w-1/2
            w-full
            border
            rounded-lg
            linkedin-card
            card
            h-auto
            bg-white
          "
        >
          <div class="w-full flex flex-row justify-between px-4 pt-4">
            <div class="flex flex-row space-x-3">
              <linkedin-icon
                v-if="!profilePic"
                class="profile-image border border-gray-400"
              ></linkedin-icon>
              <img
                v-if="profilePic"
                class="profile-image border border-gray-400"
                :src="profilePic"
                alt=""
              />
              <div class="leading-4">
                <h2 class="text-ash-primary text-lg">
                  {{ singlePost.name }}
                </h2>
                <!-- <div class="text-gray-1700">5,659,315 followers</div> -->
                <div class="text-gray-1700">
                  <date-time
                    :datetime="singlePost.createdAt"
                    format="h"
                    :friendly="true"
                  ></date-time>
                </div>
              </div>
            </div>
            <!-- <div class="cursor-pointer">....</div> -->
          </div>
          <div class="w-full mt-4 px-4 text-ash-primary text-md break-words">
            {{
              detailsExpand ? singlePost.text : singlePost.text.slice(0, 200)
            }}
            <span
              v-if="!detailsExpand"
              class="text-ash-landing float-right cursor-pointer self-center"
              @click="seeMoreContent()"
              >...see more</span
            >
            <span
              v-else
              class="text-ash-landing float-right cursor-pointer self-center"
              @click="seeLessContent()"
              >less more</span
            >
          </div>
          <div
            v-if="
              singlePost.mediaUrls.length > 0 && singlePost.category === 'VIDEO'
            "
            class="w-full mt-3"
          >
            <div
              v-for="(video, videoIndex) in singlePost.mediaUrls"
              :key="videoIndex"
            >
              <video class="w-full" height="400" controls>
                <source :src="video" />
                <source :src="singlePost.thumbnailUrl" />
              </video>
            </div>
            <div
              v-if="singlePost.title"
              class="flex items-center w-full py-2 px-3 bg-blue-mainlyblue"
            >
              <h2
                class="
                  block
                  flex-grow
                  overflow-hidden
                  break-words
                  text-sm text-black
                  font-semibold
                "
              >
                {{ singlePost.title }}
              </h2>
            </div>
          </div>
          <!-- <div class="w-full mt-3">
          <img
            class="w-full"
            src="https://i.natgeofe.com/n/88420695-3555-4f84-90be-8f7903a1a57e/01_58_51a_remotesite-2-frame-8_16x9.jpg?w=1200"
            alt=""
          />
        </div> -->
          <div class="w-full">
            <div
              class="
                mx-5
                py-2
                border-b-2 border-gray-500
                flex flex-row
                justify-start
                items-center
                space-x-2
              "
            >
              <LinkedInLike class="w-5" />
              <LinkedInLove class="w-5" />
              <LinkedInClap class="w-5" />
              <span class="text-gray-1700">{{ singlePost.likesCount }}</span>
              <span class="font-normal text-xxs text-gray-1700 mx-px">•</span>
              <span class="text-gray-1700"
                >{{ singlePost.firstLevelCommentsCount }} comments</span
              >
            </div>
          </div>
          <div class="w-ful">
            <div
              class="
                flex flex-row
                justify-center
                items-center
                space-x-2
                py-3
                cursor-pointer
              "
              @click="loadFeedComment"
            >
              <LinkedInComment class="w-5" />
              <span class="text-gray-1700 text-xs"> Comment</span>
            </div>
          </div>
          <comments v-if="feedComments" :comments="feedComments"></comments>
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
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'

import { mapState } from 'vuex'
import { useFeedComment } from '../../../../composables/feeds/useComment'
import Comments from './Comments.vue'
import FacebookMessage from '~/components/home/realtimeFeedRss/FacebookMessage.vue'
import LinkedInLike from '~/components/shared/icon/LinkedInLike.vue'
import LinkedInLove from '~/components/shared/icon/LinkedInLove.vue'
import LinkedInClap from '~/components/shared/icon/LinkedInClap.vue'
import LinkedInComment from '~/components/shared/icon/LinkedInComment.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
// import { FEED_COMMENTS } from '~/constants/urls'

export default defineComponent({
  name: 'LinkedInSinglePost',
  components: {
    LinkedInLike,
    LinkedInLove,
    LinkedInClap,
    // eslint-disable-next-line vue/no-unused-components
    LinkedInComment,
    FacebookMessage,
    LinkedinIcon,
    Comments,
  },
  props: {
    profilePic: {
      type: String,
      default: '',
    },
  },
  setup() {
    const store = useStore()
    const { loadComment } = useFeedComment()
    const feedComments = ref(null)
    const collapseable = ref(false)
    const loadFeedComment = async () => {
      if (collapseable.value) {
        feedComments.value = null
        collapseable.value = false
      } else {
        try {
          const { data } = await loadComment({
            provider: store.state.socialFeed.singlePost.provider,
            id: store.state.socialFeed.singlePost.id,
          })
          if (data.length) {
            feedComments.value = data
            collapseable.value = true
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return { loadFeedComment, feedComments }
  },
  data() {
    return {
      cardHeight: 0,
      show: false,
    }
  },
  computed: {
    ...mapState('socialFeed', ['showSinglePost', 'singlePost']),
    detailsExpand() {
      return this.$store.state.home.detailsExpand
    },
  },
  watch: {
    showSinglePost(data) {
      if (data) {
        setTimeout(() => {
          this.show = true
          this.defineCardHeight()
        }, 200)
        // this.defineCardHeight()
      } else {
        this.show = false
        this.cardHeight = 0
      }
    },
  },
  methods: {
    seeMoreContent() {
      this.$store.commit('home/SET_EXPAND', true)
    },
    seeLessContent() {
      this.$store.commit('home/SET_EXPAND', false)
    },
    closeSinglePost() {
      this.$store.dispatch('socialFeed/singlePostClose', false)
    },
    defineCardHeight() {
      setTimeout(() => {
        const card = document.querySelectorAll('.linkedin-card')
        card.forEach((item) => {
          if (item.offsetHeight > 0) {
            this.cardHeight = item.offsetHeight
          }
        })
      }, 500)
    },
  },
})
</script>

<style scoped>
.whole-card {
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
}
.card {
  @apply bg-white p-3 my-0 md:w-1/2 w-full z-1;
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
  /* // min-width: 400px;
  // max-width: 690px; */
}
.cross-icon {
  color: #e4801d;
  font-size: 26.2px;
}

.circle-icon {
  padding: 8px 12px;
  border-radius: 50%;
}

.profile-image {
  /* @apply w-14.5 h-14.5; */
  width: 60px;
  height: 60px;
}
.max-width-690 {
  max-width: 690px !important;
}
.min-width-400 {
  min-width: 400px !important;
}

@media (max-width: 767px) {
  .min-width-400 {
    min-width: 100% !important;
  }
}

.imagePopup-enter-active,
.imagePopup-leave-active {
  transition: opacity 0.5s;
}
.imagePopup-enter,
.imagePopup-leave-to {
  opacity: 0;
}
.text-xxs {
  font-size: 6px;
}
</style>