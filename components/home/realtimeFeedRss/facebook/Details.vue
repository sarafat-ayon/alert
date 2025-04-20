<template>
  <transition name="imagePopup">
    <div v-if="showSinglePost" class="w-full flex flex-col justify-start mt-3">
      <div
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
        class="w-full flex md:flex-nowrap flex-wrap bg-white my-3 whole-card"
      >
        <div :id="singlePost.id" class="card h-auto facebook-card">
          <div class="flex px-3">
            <facebook-icon
              v-if="!singlePost.profileImageUrl"
              class="w-13 h-13 rounded-full border border-gray-400"
            ></facebook-icon>
            <img
              v-else
              height="42"
              width="42"
              :src="singlePost.profileImageUrl"
              class="rounded-full profile-image"
              alt="dp"
              srcset=""
            />
            <div class="ml-2 lineHeight-1">
              <h2 class="profile-name">{{ name }}</h2>
              <date-time
                class="text-gray-light text-xs"
                :datetime="singlePost.createdAt"
                format="MMMM dd, yyyy"
                :show-time="false"
                :friendly="false"
              ></date-time>
            </div>
          </div>
          <p
            v-if="singlePost.text && singlePost.text !== singlePost.link"
            v-see-more.right="200"
            class="comment break-words px-3"
          >
            {{ singlePost.text }}
          </p>
          <p
            v-if="singlePost.description && !singlePost.link"
            v-see-more.right="200"
            class="comment break-words px-3"
          >
            {{ singlePost.description }}
          </p>
          <!-- <button class="mt-2 block">See Media</button> -->
          <a
            v-if="singlePost.link"
            :href="singlePost.link"
            target="_blank"
            rel="noopener noreferrer"
            class="link break-words px-3 line-clamp-1"
            >{{ singlePost.link }}</a
          >
          <div
            v-if="
              (singlePost.archivedFullPicture || singlePost.fullPicture) &&
              (singlePost.statusType === 'shared_story' ||
                singlePost.statusType === 'mobile_status_update') &&
              singlePost.archivedAttachmentImages.length === 0
            "
            class="w-full pt-6"
          >
            <a
              :href="singlePost.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="w-full posted-image"
                :src="
                  singlePost.archivedFullPicture
                    ? singlePost.archivedFullPicture
                    : singlePost.fullPicture
                "
                :alt="`${singlePost.name} user Posted Image`"
              />
            </a>
          </div>
          <div
            v-if="
              (singlePost.archivedSourceUrl || singlePost.sourceUrl) &&
              (singlePost.type === 'video' ||
                singlePost.statusType === 'added_video') &&
              singlePost.archivedAttachmentImages.length === 0 &&
              singlePost.statusType !== 'shared_story' &&
              singlePost.statusType !== 'mobile_status_update'
            "
            class="w-full py-6"
          >
            <video class="w-full" height="400" controls>
              <source
                :src="
                  singlePost.archivedSourceUrl
                    ? singlePost.archivedSourceUrl
                    : singlePost.sourceUrl
                "
              />
              <source
                :src="
                  singlePost.archivedFullPicture
                    ? singlePost.archivedFullPicture
                    : singlePost.fullPicture
                "
              />
            </video>
          </div>
          <div v-if="singlePost.linkName" class="link-preview">
            <p class="text-sm text-gray-400">
              {{ singlePost.caption.toUpperCase() }}
            </p>
            <p
              v-if="singlePost.linkName"
              class="text-lg font-bold text-gray-2300"
            >
              {{ singlePost.linkName }}
            </p>
            <p class="text-md text-gray-400 line-clamp-1">
              {{ singlePost.description }}
            </p>
          </div>
          <div class="flex justify-between px-3 pt-4">
            <div class="social-icons">
              <img src="@/assets/img/icon/like.svg" alt="" />
              <img src="@/assets/img/icon/love.svg" alt="" />
              <img src="@/assets/img/icon/wow.svg" alt="" />
              <span class="reaction-conter">{{
                singlePost.reactionsCount
              }}</span>
            </div>
            <div
              class="comments-conter"
              :class="
                articles.type === 'Profile'
                  ? 'cursor-default'
                  : 'cursor-pointer hover:underline'
              "
              @click="loadFeedComment"
            >
              <span>{{ singlePost.commentsCount }}</span> <span>Comments</span>
            </div>
          </div>
          <comments
            v-if="feedComments"
            class="px-3"
            :comments="feedComments"
          ></comments>
        </div>
        <facebook-message
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
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
export default defineComponent({
  name: 'LinkedInSinglePost',
  components: {
    FacebookMessage,
    FacebookIcon,
    Comments,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    articles: {
      type: Object,
      default: () => {},
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
    }
  },
  computed: {
    ...mapState('socialFeed', ['showSinglePost', 'singlePost']),
  },
  watch: {
    showSinglePost(data) {
      if (data) {
        this.defineCardHeight()
      } else {
        this.cardHeight = 0
      }
    },
  },
  mounted() {},
  methods: {
    closeSinglePost() {
      this.$store.dispatch('socialFeed/singlePostClose', false)
    },
    defineCardHeight() {
      setTimeout(() => {
        const card = document.querySelectorAll('.facebook-card')
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
.profile-name {
  @apply text-xl;
  color: #222831;
}

.profile-image {
  @apply w-10.1 h-10.1 rounded-full;
}

.lineHeight-1 {
  line-height: 1px;
}

.profile-date {
  @apply text-xs text-gray-light;
}

.comment {
  @apply text-xl mt-4 mb-2;
  color: #222831;
}

.link {
  @apply pt-2;
  color: #1263cc;
}
.posted-image {
  @apply max-h-116;
}
.link-preview {
  @apply py-2 px-3 bg-gray-1400;
}

.link-preview p {
  @apply text-gray-light;
}

.social-icons {
  @apply flex items-center;
}

.social-icons > img {
  @apply inline-block -mr-0.5;
  height: 18px;
  width: 18px;
}

.reaction-conter {
  @apply text-base ml-1.5 text-gray-light;
}

.comments-conter {
  @apply inline-block text-gray-light;
}
button {
  @apply py-1 mb-2 px-2.5 rounded-md text-gray-1200;
  background: #e6e6e6;
}
</style>
