<template>
  <div
    class="
      w-full
      my-3
      bg-white
      border border-gray-500
      rounded-lg
      cursor-pointer
      card
    "
  >
    <div
      class="flex flex-row justify-between w-full px-4 pt-4"
      @click="
        article.category === 'NONE' || article.category === 'VIDEO'
          ? showSinglePost(article)
          : showSingleImagePost(article, 0)
      "
    >
      <div class="flex flex-row space-x-3">
        <linkedin-icon
          v-if="!profilePic"
          class="border border-gray-400 profile-image"
        ></linkedin-icon>
        <img
          v-if="profilePic"
          class="border border-gray-400 profile-image"
          :src="profilePic"
          alt=""
        />

        <div class="leading-5">
          <h2 class="text-lg text-ash-primary">
            {{ article.name }}
          </h2>
          <!-- <div class="text-gray-1700">5,659,315 followers</div> -->
          <div class="text-gray-1700">
            <date-time
              :datetime="article.createdAt"
              format="h"
              :friendly="true"
            ></date-time>
          </div>
        </div>
      </div>
      <!-- <div class="cursor-pointer">....</div> -->
    </div>
    <div
      v-see-more="200"
      class="w-full px-4 mt-4 text-md text-ash-primarybreak-words"
      @click="
        article.category === 'NONE' || article.category === 'VIDEO'
          ? showSinglePost(article)
          : showSingleImagePost(article, 0)
      "
    >
      {{ article.text }}
    </div>

    <div
      v-if="article.category === 'IMAGE' && article.mediaUrls.length > 0"
      class="relative flex flex-wrap justify-center w-full mt-3"
    >
      <div
        v-for="(feature, imageIndex) in article.mediaUrls.slice(0, 5)"
        :key="feature"
        class="flex items-center justify-center cursor-pointer"
        :class="imageIndex < 2 ? 'column-2 ' : 'column-3 '"
        @click="showSingleImagePost(article, imageIndex)"
      >
        <img class="object-cover w-full h-full hover-border" :src="feature" />
        <div v-if="imageIndex === 4" class="absolute z-0 w-full post-overlay">
          <div class="sub-overlay"></div>
          <p
            class="
              relative
              text-xl
              font-bold
              text-white
              opacity-100
              xl:text-5xl
              md:text-3xl
            "
          >
            + {{ article.mediaUrls.length - 4 }}
          </p>
        </div>
      </div>
    </div>

    <template
      v-if="article.category === 'VIDEO' && article.mediaUrls.length > 0"
      class="w-full mt-3"
      @click="
        article.category === 'NONE' || article.category === 'VIDEO'
          ? showSinglePost(article)
          : ''
      "
    >
      <div v-for="(video, videoIndex) in article.mediaUrls" :key="videoIndex">
        <video class="w-full video-height" height="400" controls="controls">
          <source :src="video" />
          <source :src="article.thumbnailUrl" />
        </video>
      </div>
      <div
        v-if="article.title"
        class="flex items-center w-full px-3 py-2 bg-blue-mainlyblue"
      >
        <h2
          class="
            flex-grow
            block
            overflow-hidden
            text-sm
            font-semibold
            text-black
            break-words
          "
        >
          {{ article.title }}
        </h2>
      </div>
    </template>

    <div
      class="w-full"
      @click="
        article.category === 'NONE' || article.category === 'VIDEO'
          ? showSinglePost(article)
          : showSingleImagePost(article, 0)
      "
    >
      <div
        class="
          flex flex-row
          items-center
          justify-start
          py-2
          mx-5
          mb-4
          space-x-2
          border-b-2 border-gray-500
        "
      >
        <LinkedInLike class="w-5" />
        <LinkedInLove class="w-5" />
        <LinkedInClap class="w-5" />
        <span class="text-gray-1700">
          {{ article.likesCount }}
        </span>
        <span class="mx-px font-normal text-xxs text-gray-1700">•</span>
        <span class="text-gray-1700"
          >{{ article.aggregatedCommentsCount }} comments</span
        >
      </div>
    </div>
    <div class="w-ful">
      <div
        class="flex flex-row items-center justify-center py-3 space-x-2"
        @click="loadFeedComment"
      >
        <LinkedInComment class="w-5" />
        <span class="text-xs text-gray-1700"> Comment</span>
      </div>
    </div>
    <comments v-if="feedComments" :comments="feedComments"></comments>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useFeedComment } from '../../../../composables/feeds/useComment'
import { playVideos } from '../../../../composables/feeds/playVideos'
import Comments from './Comments.vue'
import LinkedInLike from '~/components/shared/icon/LinkedInLike.vue'
import LinkedInLove from '~/components/shared/icon/LinkedInLove.vue'
import LinkedInClap from '~/components/shared/icon/LinkedInClap.vue'
import LinkedInComment from '~/components/shared/icon/LinkedInComment.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'

export default defineComponent({
  name: 'Post',
  components: {
    LinkedInLike,
    LinkedInLove,
    LinkedInClap,
    // eslint-disable-next-line vue/no-unused-components
    LinkedInComment,
    // eslint-disable-next-line vue/no-unused-components
    Comments,
    LinkedinIcon,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    profilePic: {
      type: String,
      default: '',
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
            provider: 'LinkedIn',
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
  width: 66px;
  height: 66px;
  border-radius: 0%;
}
.column-2 {
  flex: 48%;
  margin: 2px;
  overflow: hidden;
  text-align: center;
  clear: both;
  position: relative;
  height: 331.188px;
}

.column-3 {
  margin: 2px;
  flex: 32%;
  overflow: hidden;
  clear: both;
  text-align: center;
  position: relative;
  height: 220.797px;
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

.text-xxs {
  font-size: 6px;
}
.video-height {
  height: 400px;
}
</style>