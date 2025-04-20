<template>
  <transition name="media">
    <div v-if="articles" class="relative w-full h-full space-y-1 py-6 pt-2">
      <div class="w-8 h-6 mb-4 text-blue-600 text-xl font-semibold">
        Instagram
      </div>
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="
          w-full
          h-auto
          flex flex-col
          rounded-sm
          py-4
          bg-white
          border-2 border-gray-400
        "
      >
        <div class="flex flex-row flex-nowrap w-full">
          <div class="flex flex-row flex-nowrap justify-between w-full">
            <div class="flex flex-col w-full">
              <div
                class="
                  flex flex-row flex-nowrap
                  justify-between
                  items-center
                  w-full
                  space-x-2
                  px-4
                "
              >
                <img
                  class="w-13 h-13 rounded-full"
                  :src="article.fullPicture"
                  alt=""
                />
                <div class="flex flex-col w-full">
                  <div class="flex flex-row flex-nowrap space-x-2 items-center">
                    <h2 class="text-xl text-ash-dark font-bold inline-block">
                      {{ article.userName }}
                    </h2>
                  </div>
                </div>
                <div class="">
                  <fa
                    class="cursor-pointer text-gray-600 text-lg"
                    :icon="['fas', 'ellipsis-h']"
                  />
                </div>
              </div>

              <div
                v-if="article.type === 'CAROUSEL_ALBUM'"
                class="w-full bg-red-400"
              >
                <carousel
                  :autoplay="true"
                  autoplay-direction="forward"
                  autoplay-hover-pause
                  :autoplay-timeout="2000"
                  per-page="1"
                  loop
                  pagination-active-color="#E4801D"
                  :navigation-click-target-size="20"
                  pagination-position="bottom-overlay"
                >
                  <slide
                    v-for="(carouselImage, sIndex) in article.childrenMedias"
                    :key="sIndex"
                  >
                    <img :src="carouselImage" class="w-full" alt="" />
                  </slide>
                </carousel>
              </div>
              <div v-if="article.type === 'IMAGE'" class="w-full py-6">
                <img class="w-full" :src="article.sourceUrl" alt="" />
              </div>
              <div v-if="article.type === 'VIDEO'" class="w-full">
                <video class="w-full" height="240" controls>
                  <source :src="article.sourceUrl" />
                  <source :src="article.thumbnailUrl" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div class="text-lg text-ash-dark font-semibold my-3 px-4">
                {{ article.text }}
                <p class="text-gray-400 text-sm">
                  <date-time
                    :datetime="article.createdAt"
                    format="h"
                    :friendly="true"
                  ></date-time>
                </p>
              </div>

              <div class="w-full bg-gray-300 px-4"></div>
              <div
                class="
                  flex flex-row
                  justify-between
                  items-center
                  w-full
                  px-4
                  py-2
                "
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center space-x-3">
                    <img class="w-7" src="/images/instagram/heart.png" alt="" />
                    <img class="w-7" src="/images/instagram/chat.png" alt="" />
                    <img class="w-7" src="/images/instagram/send.png" alt="" />
                  </div>
                  <div class="">
                    <img
                      class="w-7"
                      src="/images/instagram/bookmark.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    articles: {
      Type: Array,
    },
  },
}
</script>

<style lang="scss" scoped>
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
</style>
