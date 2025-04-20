<template>
  <section class="w-full h-full overflow-hidden rounded-2xl">
    <div
      class="hidden w-full h-full overflow-hidden md:block rounded-2xl"
      :class="showMessage ? 'bg-gray-1400' : 'bg-white'"
    >
      <div class="title">
        <p class="py-2 font-bold text-white xl:text-xl md:text-base">
          Direct Messages
        </p>
      </div>

      <!-- Body start -->
      <div class="message-feed-body_wrapper">
        <!-- Left Side -->
        <!-- <div class="left-side-body_wrapper scroll"></div> -->
        <!-- Left Side -->

        <div
          class="
            relative
            middle-body_wrapper
            min-w-full
            grid grid-cols-5
          "
        >
          <!-- v-bind="currentProperties" -->
          <div class="scroll border-r-2 col-span-2">
            <div class="px-3 sticky top-0 z-10 bg-white py-0.5">
              <CommonSearch></CommonSearch>
            </div>
            <transition name="page">
              <AllMessagePerson class="p-2.5 pb-8 message-body-wrapper" />
            </transition>
          </div>

          <div class="ml-0 col-span-3 scroll">
            <transition name="page">
              <TextMessage class="p-2.5 pr-4 bg-gray-1400" :message-id="'message_wrapper'" />
            </transition>
          </div>

          <!-- </div> -->
        </div>

        <!-- Right Side -->
        <!-- <div class="col-span-1 right-side-body_wrapper animate-pulse"></div> -->
        <!-- Right Side -->
      </div>
      <!-- Body end -->
    </div>

    <!-- Small Device -->
    <div class="h-full p-3 mt-1 md:hidden animate-pulse">
      <h2 class="w-8 h-2 bg-gray-1500"></h2>
      <div class="w-full mt-2 bg-gray-1500 h-1/4"></div>
      <div class="w-full mt-2 bg-gray-1500 h-1/6"></div>
      <div class="w-full mt-2 bg-gray-1500 h-1/4"></div>
    </div>
  </section>
</template>

<script>
// import { mapState } from 'vuex'
/* import Facebook from './Facebook.vue'
import Twitter from './Twitter.vue'
import Instagram from './Instagram.vue' */
import AllMessagePerson from './AllMessagePerson.vue'
import TextMessage from './TextMessage.vue'
import CommonSearch from './CommonSearch.vue'
// import SingleMessage from './SingleMessage.vue'
// import { SOCIAL_ARTICLE } from '~/constants/urls'
export default {
  components: { AllMessagePerson, TextMessage, CommonSearch },
  data() {
    return {
      // articles: null,
      // currentComp: 'SingleMessage',
      showMessage: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    /*     currentProperties() {
      if (this.currentComp === 'Facebook' && this.articles) {
        return {
          articles: this.articles.Facebook,
        }
      } else if (this.currentComp === 'Twitter' && this.articles) {
        return {
          articles: this.articles.Twitter,
        }
      } else if (this.currentComp === 'Instagram' && this.articles) {
        return {
          articles: this.articles.Instagram,
        }
      }
      return ''
    }, */
    /*     ...mapState('loginAnimation', {
      currentComp: 'currentComp',
    }),
    ...mapState('home', ['articles']), */
  },
}
</script>

<style lang="scss" scoped>
.body-height {
  height: calc(100% - 135px) !important;
}

.message-body-wrapper {
  height: calc(100% - 86px);
}

.title {
  background-color: #e4801d;
  @apply text-center;
}
.message-feed-body_wrapper {
  @apply flex justify-center items-start w-full;
  height: calc(100% - 44px);
}
.middle-body_wrapper {
  @apply col-span-6 h-full;
}
.left-side-body_wrapper {
  @apply col-span-1 py-6 pt-2 overflow-y-auto;
}
.footer {
  margin-top: 230px !important;
}

.min-width-2 {
  min-width: 2.5rem;
}

.max-width-800 {
  max-width: 800px;
}
.min-width-400 {
  min-width: 400px;
}

.scroll {
  overflow-y: auto;
  overflow-x: auto;
  /* this will hide the scrollbar in mozilla based browsers */
  // overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: 6px !important; /* Firefox 64 */
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
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
