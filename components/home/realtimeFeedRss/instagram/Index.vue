<template>


  <div class="w-full h-full space-y-4">


    <transition name="media">


      <div
        v-if="articles && !loadArticles && show"
        class="py-5 md:px-5 px-2 h-full"
      >


        <div
          class="w-full h-auto mb-2 text-blue-600 text-xl font-semibold"
          :class="articles.items.length === 0 ? '' : 'mb-5'"
        >
           Instagram
          <p class="text-lg text-black font-semibold">
             {{ articles.name || articles.username }}
          </p>


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


        <Post
          v-for="(article, index) in articles.items"
          :key="index"
          :article="article"
          :profile-pic="articles.profilePic"
        />


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


    <instagram-details
      class="md:px-5 px-2"
      :profile-pic="articles.profilePic"
    ></instagram-details>


  </div>


</template>


<script>
import { mapState } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import Post from './Post.vue'
import { useLoadMore } from '~/composables/feeds/useLoadMore'
import InstagramDetails from '~/components/home/realtimeFeedRss/instagram/Details.vue'
export default defineComponent({
  name: 'Instagram',
  components: { Post, InstagramDetails },
  setup(props) {
    const { loadMore, disableLoadMoreProcess } = useLoadMore()
    return { loadMore, disableLoadMoreProcess }
  },
  data() {
    return {
      show: true,
    }
  },
  computed: {
    ...mapState('home', [
      'articles',
      'loadMoreArticles',
      'loadArticles',
      'loadMoreArticlesSkelaton',
    ]),
    ...mapState('socialFeed', ['showSinglePost']),
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
  },
})
</script>


<style scoped>
.noDataContainer {
  height: calc(100% - 56px);
}
.noData {
  top: 42%;
  left: 50%;
  transform: translate(-50%, -42%);
}
.circle-icon {
  padding: 8px 12px;
  border-radius: 50%;
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