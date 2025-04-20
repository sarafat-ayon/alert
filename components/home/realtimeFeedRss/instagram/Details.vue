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
          class="w-full border border-gray-1500 instagram-card card bg-white"
        >
          <div
            class="
              w-full
              flex flex-row
              items-center
              justify-between
              pb-4
              px-3
              pt-0
            "
          >
            <div class="flex flex-row space-x-3 items-center">
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
              <div class="leading-4">
                <h2 class="text-ash-primary text-sm">
                  {{ singlePost.userName }}
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
          <div v-if="singlePost.type === 'CAROUSEL_ALBUM'" class="w-full">
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
                v-for="(
                  carouselImage, sIndex
                ) in singlePost.archivedChildrenMedias"
                :key="sIndex"
              >
                <img :src="carouselImage" class="w-full" alt="" />
              </slide>
            </carousel>
          </div>

          <div v-if="singlePost.type === 'IMAGE'" class="w-full">
            <img class="w-full" :src="singlePost.archivedSourceUrl ? singlePost.archivedSourceUrl : singlePost.sourceUrl" alt="" />
          </div>
          <div v-if="singlePost.type === 'VIDEO'" class="w-full">
            <video
              class="w-full"
              height="400"
              controls
              :poster="singlePost.archivedThumbnailUrl"
            >
              <source :src="singlePost.archivedSourceUrl ? singlePost.archivedSourceUrl : singlePost.sourceUrl" />
            </video>
          </div>
          <div class="w-full px-3">
            <div class="flex items-center justify-between py-4 mx-4">
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
              <div class="mx-4 leading-7 pb-0">
                <!-- <p class="text-ash-primary">199,882 likes</p> -->
                <div v-see-more="200" class="text-ash-primary break-words">
                  {{ singlePost.text }}
                </div>
                <!-- <p class="text-gray-1500 text-sm">View all 1,224 comments</p> -->
                <p class="text-gray-1500 text-sm uppercase">
                  {{ singlePost.createdAt | diffForHumans }} ago
                </p>
              </div>
            </div>
          </div>
        </div>

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
import InstagramComment from '~/components/shared/icon/InstagramComment.vue'
import InstagramLove from '~/components/shared/icon/InstagramLove.vue'
import InstagramSend from '~/components/shared/icon/InstagramSend.vue'
import InstagramSave from '~/components/shared/icon/InstagramSave.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
export default {
  name: 'Details',
  components: {
    InstagramComment,
    InstagramLove,
    InstagramSend,
    InstagramSave,
    FacebookMessage,
    InstagramIcon,
  },
  props: {
    profilePic: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cardHeight: 0,
      show: false,
    }
  },
  computed: {
    ...mapState('socialFeed', ['showSinglePost', 'singlePost']),
  },
  watch: {
    showSinglePost(data) {
      if (data) {
        setTimeout(() => {
          this.show = true
          this.defineCardHeight()
        }, 200)
      } else {
        this.show = false
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
        const card = document.querySelectorAll('.instagram-card')
        card.forEach((item) => {
          if (item.offsetHeight > 0) {
            this.cardHeight = item.offsetHeight
          }
        })
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
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
.profile-image {
  @apply w-9 h-9;
}
.VueCarousel-dot-container {
  margin-top: 0px !important;
}
</style>
