<template>
  <div class="w-full flex flex-nowrap bg-white my-3 whole-card">
    <div :id="article.id" class="card h-auto cursor-pointer">
      <div
        class="flex px-3"
        @click="
          ;(article.statusType === 'mobile_status_update' ||
            article.statusType === 'added_video' ||
            article.type === 'status' ||
            article.type === 'video') &&
          article.type !== 'photo'
            ? showSinglePost(article)
            : showSingleImagePost(article, 0)
        "
      >
        <facebook-icon
          v-if="!article.profileImageUrl"
          class="w-13 h-13 rounded-full border border-gray-400"
        ></facebook-icon>
        <img
          height="42"
          width="42"
          :src="article.profileImageUrl"
          class="rounded-full profile-image"
          alt="dp"
          srcset=""
        />
        <div class="ml-2 lineHeight-1">
          <h2 class="profile-name">{{ articles.name }}</h2>
          <date-time
            class="text-gray-light text-xs"
            :datetime="article.createdAt"
            format="MMMM dd, yyyy"
            :show-time="false"
            :friendly="false"
          ></date-time>
        </div>
      </div>
      <div
        class="px-3"
        @click="
          ;(article.statusType === 'mobile_status_update' ||
            article.statusType === 'added_video' ||
            article.type === 'status' ||
            article.type === 'video') &&
          article.type !== 'photo'
            ? showSinglePost(article)
            : showSingleImagePost(article, 0)
        "
      >
        <p
          v-if="article.text && article.text !== article.link"
          v-see-more.right="200"
          class="comment break-words"
        >
          {{ article.text }}
        </p>
        <p
          v-if="article.description && !article.link"
          v-see-more.right="200"
          class="comment break-words"
        >
          {{ article.description }}
        </p>
        <!-- <button class="mt-2 block">See Media</button> -->
        <a
          v-if="article.link"
          :href="article.link"
          target="_blank"
          rel="noopener noreferrer"
          class="link break-words line-clamp-1"
          >{{ article.link }}</a
        >
      </div>
      <div
        v-if="
          article.archivedAttachmentImages.length > 0 &&
          article.archivedAttachmentImages.length < 5
        "
        class="flex justify-center flex-wrap"
      >
        <div
          v-for="(
            feature, imageIndex
          ) in article.archivedAttachmentImages.slice(0, 5)"
          :key="feature"
          class="flex justify-center items-center cursor-pointer"
          :class="imageIndex < 2 ? 'column-2' : 'column-3'"
          @click="showSingleImagePost(article, imageIndex)"
        >
          <img class="w-full h-full hover-border" :src="feature" />
        </div>
      </div>
      <div v-else class="flex justify-center flex-nowrap">
        <div class="flex flex-col w-1/2">
          <div
            v-for="(
              feature, imageIndex
            ) in article.archivedAttachmentImages.slice(0, 2)"
            :key="feature"
            class="flex justify-center items-center cursor-pointer"
            :class="imageIndex < 2 ? 'column-2' : 'column-3'"
            @click="showSingleImagePost(article, imageIndex)"
          >
            <img class="w-full h-full hover-border" :src="feature" />
          </div>
        </div>
        <div class="flex flex-col w-1/2">
          <div
            v-for="(
              feature, imageIndex
            ) in article.archivedAttachmentImages.slice(2, 5)"
            :key="feature"
            class="flex justify-center items-center cursor-pointer"
            :class="imageIndex < 3 ? 'column-2' : 'column-3'"
            @click="showSingleImagePost(article, imageIndex)"
          >
            <img class="w-full h-full hover-border" :src="feature" />
            <div
              v-if="imageIndex === 2"
              class="w-full h-full absolute z-0 post-overlay"
            >
              <div class="sub-overlay"></div>
              <p
                class="
                  xl:text-5xl
                  md:text-3xl
                  text-xl
                  relative
                  opacity-100
                  text-white
                  font-bold
                "
              >
                {{ `+${article.archivedAttachmentImages.length - 4}` }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          (article.archivedFullPicture || article.fullPicture) &&
          (article.type === 'photo' || article.statusType === 'added_photos') &&
          article.archivedAttachmentImages.length === 0
        "
        class="w-full pt-6"
        @click="showSingleImagePost(article, 0)"
      >
        <img
          class="w-full posted-image"
          :src="
            article.archivedFullPicture
              ? article.archivedFullPicture
              : article.fullPicture
          "
          :alt="`${article.name} user Posted Image`"
        />
      </div>
      <div
        v-if="
          (article.archivedFullPicture || article.fullPicture) &&
          (article.statusType === 'shared_story' ||
            article.statusType === 'mobile_status_update') &&
          article.archivedAttachmentImages.length === 0
        "
        class="w-full pt-6"
        @click="showSinglePost(article)"
      >
        <a :href="article.link" target="_blank" rel="noopener noreferrer">
          <img
            class="w-full posted-image"
            :src="
              article.archivedFullPicture
                ? article.archivedFullPicture
                : article.fullPicture
            "
            :alt="`${article.name} user Posted Image`"
          />
        </a>
      </div>
      <div
        v-if="
          (article.archivedSourceUrl || article.sourceUrl) &&
          (article.type === 'video' || article.statusType === 'added_video') &&
          article.archivedAttachmentImages.length === 0 &&
          article.statusType !== 'shared_story' &&
          article.statusType !== 'mobile_status_update'
        "
        class="w-full py-6"
      >
        <video class="w-full" height="400" controls="controls">
          <source
            :src="
              article.archivedSourceUrl
                ? article.archivedSourceUrl
                : article.sourceUrl
            "
          />
          <source
            :src="
              article.archivedFullPicture
                ? article.archivedFullPicture
                : article.fullPicture
            "
          />
        </video>
      </div>
      <div v-if="article.linkName" class="link-preview">
        <p class="text-sm text-gray-400">{{ article.caption.toUpperCase() }}</p>
        <p v-if="article.linkName" class="text-lg font-bold text-gray-2300">
          {{ article.linkName }}
        </p>
        <p class="text-md text-gray-400 line-clamp-1">
          {{ article.description }}
        </p>
      </div>
      <div class="flex justify-between px-3 pt-4">
        <div class="social-icons">
          <img src="@/assets/img/icon/like.svg" alt="" />
          <FacebookLoveIcon />
          <img src="@/assets/img/icon/wow.svg" alt="" />
          <span class="reaction-conter">{{ article.reactionsCount }}</span>
        </div>
        <div
          class="comments-conter"
          :class="
            articles.type === 'Profile'
              ? 'cursor-default'
              : 'cursor-pointer hover:underline'
          "
          @click="
            {
              articles.type === 'Page' && article.commentsCount > 0
                ? loadFeedComment()
                : ''
            }
          "
        >
          <span>{{ article.commentsCount }} </span>
          <span>Comments</span>
        </div>
      </div>
      <comments
        v-if="feedComments"
        class="px-3"
        :comments="feedComments"
      ></comments>
    </div>
    <!-- <facebook-message
      :card-height="cardHeight"
      :article="article"
    ></facebook-message> -->
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useFeedComment } from '../../../../composables/feeds/useComment'
import { playVideos } from '../../../../composables/feeds/playVideos'
import Comments from './Comments.vue'
// import FacebookMessage from '~/components/home/realtimeFeedRss/FacebookMessage.vue'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import FacebookLoveIcon from '~/components/shared/icon/FacebookLoveIcon.vue'
export default defineComponent({
  components: {
    // FacebookMessage,
    FacebookIcon,
    FacebookLoveIcon,
    Comments,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    articles: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
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
            provider: props.article.provider,
            id: props.article.id,
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
  mounted() {
    playVideos()
  },
  methods: {
    showSinglePost(singleItem) {
      this.$store.dispatch('socialFeed/singlePostShow', {
        singleItem,
        show: true,
      })
    },
    showSingleImagePost(singleItem, index) {
      this.$store.dispatch('socialFeed/singleImagePostShow', {
        singleItem,
        show: true,
        index,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.whole-card {
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
}
.card {
  @apply bg-white py-3 my-0 w-full z-1;
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
  // min-width: 400px;
  // max-width: 690px;
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
  @apply my-0 py-2 px-3 bg-gray-1400;
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
.column-2 {
  flex: 48%;
  margin: 2px;
  overflow: hidden;
  text-align: center;
  clear: both;
  position: relative;
}

.column-3 {
  margin: 2px;
  flex: 32%;
  overflow: hidden;
  clear: both;
  text-align: center;
  position: relative;
}
.hover-border {
  border: 1px solid transparent;
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
</style>
