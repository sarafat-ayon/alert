<template>
  <div class="w-full">
    <div
      class="w-full border border-gray-1500 card bg-white cursor-pointer my-3"
      @click="showSinglePost(article)"
    >
      <div class="post-wrapper">
        <div class="w-full flex flex-row justify-between p-4 items-start">
          <div class="flex flex-row space-x-3 items-start">
            <instagram-icon
              v-if="!profilePic"
              class="profile-image border border-gray-400 rounded-full"
            ></instagram-icon>
            <img
              v-if="profilePic"
              class="profile-image border border-gray-400 rounded-full"
              :src="profilePic"
              alt=""
            />

            <div class="leading-4 self-center">
              <h2 class="text-ash-primary text-sm break-all">
                {{ article.userName }}
              </h2>
            </div>
          </div>
          <div class="cursor-pointer">
            <span class="font-weight-bold">
              <fa
                class="text-gray-1700 text-sm cursor-pointer"
                :icon="['fas', 'ellipsis-h']"
              />
            </span>
          </div>
        </div>
        <div v-if="article.type === 'CAROUSEL_ALBUM'" class="w-full">
          <carousel
            :autoplay="true"
            autoplay-direction="forward"
            autoplay-hover-pause
            :autoplay-timeout="2000"
            :per-page="1"
            loop
            pagination-active-color="#119CFB"
            :navigation-click-target-size="10"
            :pagination-padding="1"
            :pagination-size="6"
            pagination-position="bottom"
          >
            <slide
              v-for="(carouselImage, sIndex) in article.archivedChildrenMedias"
              :key="sIndex"
            >
              <img :src="carouselImage" class="w-full" alt="" />
            </slide>
          </carousel>
        </div>

        <div v-if="article.type === 'IMAGE'" class="w-full">
          <img class="w-full" :src="article.archivedSourceUrl ? article.archivedSourceUrl : article.sourceUrl" alt="" />
        </div>
        <div v-if="article.type === 'VIDEO'" class="w-full">
          <video
            class="w-full"
            height="400"
            controls="controls"
            :poster="article.archivedThumbnailUrl"
          >
            <source :src="article.archivedSourceUrl ? article.archivedSourceUrl : article.sourceUrl" />
          </video>
        </div>

        <div class="w-full">
          <div
            :class="article.type === 'CAROUSEL_ALBUM' ? 'pt-0' : ''"
            class="flex items-center justify-between py-4 mx-4"
          >
            <div class="flex items-center space-x-3">
              <InstagramLove class="w-5" />
              <InstagramComment class="w-5" />
              <InstagramSend class="w-5" />
            </div>
            <div class="">
              <InstagramSave class="w-5" />
            </div>
          </div>
          <div class="w-full">
            <div class="mx-4 leading-7 pb-4">
              <!-- <p class="text-ash-primary">199,882 likes</p> -->
              <div v-see-more="200" class="text-ash-primary break-words">
                {{ article.text }}
              </div>
              <!-- <p class="text-gray-1500 text-sm">View all 1,224 comments</p> -->
              <p class="text-gray-1500 text-sm uppercase">
                {{ article.createdAt | diffForHumans }} ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playVideos } from '../../../../composables/feeds/playVideos'
import InstagramComment from '~/components/shared/icon/InstagramComment.vue'
import InstagramLove from '~/components/shared/icon/InstagramLove.vue'
import InstagramSend from '~/components/shared/icon/InstagramSend.vue'
import InstagramSave from '~/components/shared/icon/InstagramSave.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'

export default {
  name: 'Post',
  components: {
    InstagramComment,
    InstagramLove,
    InstagramSend,
    InstagramSave,
    InstagramIcon,
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
  },
}
</script>

<style lang="scss" scoped>
.VueCarousel-dot-container {
  margin-top: 0px !important;
}
.profile-image {
  @apply w-9 h-9;
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
</style>
