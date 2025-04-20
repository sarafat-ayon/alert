<template>
  <div class="card">
    <div class="card-body">
      <div class="feeds-container">
        <div class="feeds-board">
          <div class="feeds-title">
            <h2 class="item-title">Possible Matches</h2>
          </div>
          <div class="feeds-items scroll">
            <transition
              v-for="feed in profiles.slice(0, loadCount)"
              :key="feed.socialId + '-' + feed.sourceName"
              name="fadeIn"
            >
              <feed-item :feed="feed"></feed-item>
            </transition>
          </div>
          <div class="feeds-action">
            <button
              class="load-more text-offwhite-400"
              @click="loadCount = loadCount > 5 ? 5 : profiles.length"
            >
              Load {{ loadCount > 5 ? 'less' : 'more' }}...
            </button>
          </div>
        </div>
        <div class="feeds-board">
          <div class="feeds-title">
            <h2 class="item-title">Feeds to Archive</h2>
          </div>
          <div class="feeds-items scroll">
            <transition v-for="feed in feeds"
                        :key="feed.socialId + '-' + feed.sourceName"
                        name="fadeIn">
              <archive-item :feed="feed"></archive-item>
            </transition>
            <transition name="fadeIn">
              <div v-if="!feeds.length" class="feeds-placeholder">
                <h2 class="placeholder-text">Select feeds to archive</h2>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer md:block hidden">
      <transition name="fadeIn">
        <button
          v-if="feeds.length"
          class="
            w-44
            h-9
            text-white
            bg-orange-dark
            rounded-full
            border-none
            outline-none
            focus:outline-none
            font-bold
            setup
          "
          @click="$emit('next', 'storage')"
        >
          Next
        </button>
      </transition>
    </div>
    <!-- something to be deleted -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import FeedItem from '~/components/setup/archive/feeds/FeedItem'
import ArchiveItem from '~/components/setup/archive/feeds/ArchiveItem'
import {FEED_COSTS} from "~/constants/urls";
export default {
  name: 'Feeds',
  components: { ArchiveItem, FeedItem },
  props: ['profiles'],
  data() {
    return {
      searchText: '',
      searchResult: [],
      skip: 0,
      loadCount: 5,
    }
  },
  computed: {
    ...mapState('feeds', ['feeds']),
  },
  mounted() {
    this.$axios.$get(FEED_COSTS)
      .then(res => {
        if (res.success){
          this.cost = res.data
          this.setCost(this.cost)
        }
      })
  },
  methods: {
    loadMore() {
      this.loadCount = this.profiles.length
    },
    ...mapActions('feeds', ['setCost']),
  },
}
</script>

<style lang="scss" scoped>
.card {
  @apply w-full h-full flex flex-col items-center justify-between md:p-2;
  .card-header {
    @apply w-3/4 flex justify-center;
  }
  .card-body {
    max-height: 450px;
    @apply w-full flex-grow overflow-auto scroll;
    .feeds-container {
      @apply w-full h-full grid md:grid-cols-2 2xl:gap-10 md:gap-6 md:grid-rows-none grid-rows-2 gap-y-4 overflow-auto scroll;
      @apply w-full h-full grid md:grid-cols-2 2xl:gap-10 md:gap-6 md:grid-rows-none grid-rows-2 gap-y-4 overflow-auto scroll;
      .feeds-board {
        @apply w-full py-2 px-5 bg-yellow-primary rounded-2xl overflow-auto scroll flex flex-col items-center justify-center;
        .feeds-title {
          @apply w-full text-left md:pt-2 text-white pb-2 md:text-md text-sm;
          .item-title {
            @apply md:text-md text-offwhite-400 text-sm;
          }
        }
        .feeds-items {
          @apply w-full flex-grow overflow-y-auto scroll flex flex-col space-y-2 overflow-x-hidden;
          .feeds-placeholder {
            @apply w-full flex-grow flex flex-col justify-center items-center;
            .placeholder-text {
              @apply text-offwhite-400 opacity-50;
            }
          }
        }
        .feeds-action {
          @apply w-full p-2 text-center text-white;
        }
      }
    }
  }
  .card-footer {
    min-height: 70px;
    @apply p-4;
  }
}
.scroll {
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}

@media (max-width:767px){
   .card-body {
    max-height: 520px!important;
   }
}
</style>
