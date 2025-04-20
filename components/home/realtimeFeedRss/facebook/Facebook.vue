s<template>
  <section class="h-full w-full">
    <transition name="media">
      <div
        v-if="articles && !loadArticles && show"
        class="py-5 md:px-5 px-2 h-full"
      >
        <div class="w-full h-auto mb-2 text-blue-600 text-xl font-semibold">
          Facebook
          <p class="text-lg text-black font-semibold">{{ articles.name }}</p>
        </div>

        <div
          v-if="articles.items.length === 0"
          class="
            w-full
            h-auto
            mb-2
            text-blue-600 text-xl
            font-semibold
            relative
            noDataContainer
          "
        >
          <div
            class="
              text-2xl text-center text-black
              font-semibold
              absolute
              noData
            "
          >
            No Data Found
          </div>
        </div>

        <facebook-posts
          v-for="article in articles.items"
          :key="article.id"
          :article="article"
          :articles="articles"
        ></facebook-posts>

        <transition name="media">
          <div
            v-if="loadMoreArticlesSkelaton"
            class="mt-1 p-3 h-full animate-pulse"
          >
            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  justify-start
                  p-4
                  space-x-3
                "
              >
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  justify-start
                  p-4
                  space-x-3
                "
              >
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  justify-start
                  p-4
                  space-x-3
                "
              >
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <button
          v-if="articles.items.length > 19"
          class="
            w-full
            h-10
            bg-gray-300
            text-black
            font-semibold
            md:text-lg
            text-md
            cursor-pointer
            flex
            justify-center
            items-center
            rounded-lg
          "
          :disabled="disableLoadMoreProcess"
          @click="loadMore()"
        >
          {{ loadMoreArticles ? 'Load More' : 'Less More' }}
        </button>
      </div>
    </transition>

    <facebook-details
      class="md:px-5 px-2"
      :name="articles.name"
      :articles="articles"
    ></facebook-details>

    <image-details
      class="md:px-5 px-2"
      :name="articles.name"
      :articles="articles"
    ></image-details>
  </section>
</template>


<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
import { useLoadMore } from '~/composables/feeds/useLoadMore'
import FacebookPosts from '~/components/home/realtimeFeedRss/facebook/FacebookPosts.vue'
import FacebookDetails from '~/components/home/realtimeFeedRss/facebook/Details.vue'
import ImageDetails from '~/components/home/realtimeFeedRss/facebook/ImageDetails.vue'
export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FacebookPosts,
    // eslint-disable-next-line vue/no-unused-components
    FacebookDetails,
    // eslint-disable-next-line vue/no-unused-components
    ImageDetails,
  },
  setup(props) {
    const { loadMore, disableLoadMoreProcess } = useLoadMore()
    return { loadMore, disableLoadMoreProcess }
  },
  data() {
    return {
      popupImages: [],
      showPopupModal: false,
      cardHeight: 0,
      show: true,
      showComp: false,
    }
  },
  computed: {
    ...mapState('home', [
      'articles',
      'loadMoreArticles',
      'loadArticles',
      'loadMoreArticlesSkelaton',
    ]),
    ...mapState('socialFeed', ['showSinglePost', 'showSingleImagePost']),
  },
  watch: {
    showSinglePost(data) {
      if (data) {
        this.show = false
      } else {
        setTimeout(() => {
          this.show = true
        }, 300)
      }
    },
    showSingleImagePost(data) {
      if (data) {
        this.show = false
      } else {
        setTimeout(() => {
          this.show = true
        }, 300)
      }
    },
    loadArticles(data) {
      if (!data) {
        setTimeout(() => {
          this.showComp = true
        }, 2000)
      } else {
        this.showComp = false
      }
    },
  },
  methods: {
    messageCardHeight($event) {
      this.cardHeight = $event
    },
  },
})
</script>


<style lang="scss" scoped>
.noDataContainer {
  height: calc(100% - 56px);
}
.noData {
  top: 42%;
  left: 50%;
  transform: translate(-50%, -42%);
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
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
.popup-overlay {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0px;
  right: 0;
  z-index: 301;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
</style>