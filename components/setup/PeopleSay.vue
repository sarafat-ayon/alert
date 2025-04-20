<template>
  <div
    v-if="allReviews"
    class="sm:p-15 md:px-102 px-5 py-10 md:justify-items-center bg-gray-100"
  >
    <div class="people-say" v-html="allReviews.title"></div>

    <div class="md:flex hidden flex-wrap justify-around mt-5">
      <div
        v-for="(review, index) in allReviews.reviews"
        :key="index"
        class="
          md:w-96
          w-full
          mt-8
          xl:mb-0
          bg-white
          opacity-1
          p-4
          rounded-3xl
          shadow-lg
        "
      >
        <div class="flex flex-col items-center justify-center text-center">
          <div class="w-full flex flex-col items-center justify-center">
            <img class="md:w-auto w-20 py-5" :src="review.logo" />
            <star-rating :star-rate="parseFloat(review.rating)"></star-rating>
          </div>

          <div class="w-full">
            <p
              class="
                text-gray-400
                opacity-1
                align-center
                font-semibold
                mt-3
                mb-10
                h-34
                scroll
              "
            >
              <span class="text-yellow-primary">“</span>
              {{ review.message }}
              <span class="text-yellow-primary">”</span>
            </p>
          </div>

          <div class="w-full flex flex-col items-center justify-center">
            <div
              class="
                w-24
                h-24
                flex
                justify-center
                items-center
                rounded-full
                border-4 border-yellow-primary
              "
            >
              <img class="w-24 h-22 profile_image" :src="review.avatar" />
            </div>
            <div class="mt-2">
              <h3 class="text-dark-200 font-bold text-lg">{{ review.name }}</h3>
              <p class="text-gray-400">{{ review.designation }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- start small device -->

    <div class="md:hidden flex flex-col justify-around mt-5 space-y-4">
      <div
        v-for="(review, index) in allReviews.reviews"
        :key="index"
        class="w-full p-4 h-40 overflow-hidden card"
      >
        <div class="w-full flex flex-row items-center justify-between pb-1">
          <div class="flex items-center space-x-2">
            <img
              class="
                w-10
                h-10
                profile_image
                border-2 border-yellow-primary
                rounded-full
              "
              :src="review.avatar"
            />
            <div class="leading-6">
              <h3 class="text-gray-light font-bold text-md">
                {{ review.name }}
              </h3>
              <p class="text-gray-1700 text-sm">{{ review.designation }}</p>
            </div>
          </div>

          <div class="flex flex-col items-end">
            <img class="md:w-auto w-10" :src="review.logo" />
            <star-rating :star-rate="parseFloat(review.rating)"></star-rating>
          </div>
        </div>

        <div
          class="
            pt-3
            w-full
            text-gray-1700
            opacity-1
            align-center
            font-semibold
            h-20
            text-sm
            scroll
          "
        >
          <span class="text-yellow-primary">“</span>
          {{ review.message }}
          <span class="text-yellow-primary">”</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import starRating from './starRating.vue'
import { REVIEWS } from '~/constants/urls'

export default {
  name: 'PeopleSay',
  components: { starRating },
  data() {
    return {
      allReviews: null,
      toggleStar: false,
      caretColor: '',
    }
  },
  async fetch() {
    const { data } = await this.$axios.$get(REVIEWS)
    this.allReviews = data
  },
}
</script>
<style lang="scss" scoped>
.scroll {
  @apply pr-4;
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: #e4801d;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e4801d;
  }
}
.card {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 5px 5px 6px #2228314c;
  border-radius: 20px;
}
</style>
