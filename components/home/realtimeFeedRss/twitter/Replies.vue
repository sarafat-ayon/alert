<template>
  <div class="w-full">
    <div class="w-full">
      <div
        v-if="!seeMoreReplies && comments.length > 0"
        class="flex px-3 w-full"
      >
        <div class="three-dot flex flex-col space-y-2 items-center">
          <div class="w-0.5 h-0.5 bg-gray-1500"></div>
          <div class="w-0.5 h-0.5 bg-gray-1500"></div>
          <div class="w-0.5 h-0.5 bg-gray-1500"></div>
        </div>

        <div class="w-full" @click="seeMore">
          <p class="text-md text-blue-400 cursor-pointer">Show Replies</p>
        </div>
      </div>
      <!-- <div
        v-if="comments.length > setCommentIndex"
        class="w-full space-x-1 flex flex-row py-1 mt-1"
        @click="seeMore"
      >
        <span class="text-gray-1700 cursor-pointer">Load more comments</span>
      </div>
      <div
        v-if="setCommentIndex >= comments.length && comments.length > 2"
        class="w-full space-x-1 flex flex-row py-1 mt-1"
        @click="lessMore"
      >
        <span class="text-gray-1700 cursor-pointer">Less more comments</span>
      </div> -->

      <template v-for="(comment, index) in comments">
        <reply
          v-if="seeMoreReplies"
          :key="index"
          :comment="comment"
          :index="index"
          :main-comment="mainComment"
        ></reply>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Reply from './Reply.vue'
export default defineComponent({
  name: 'LinkedInReplies',
  components: {
    Reply,
  },
  props: {
    comments: {
      type: Array,
      default: null,
    },
    mainComment: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const setCommentIndex = ref(-1)
    const seeMoreReplies = ref(false)
    function seeMore() {
      setCommentIndex.value += 1
      seeMoreReplies.value = true
    }
    function lessMore() {
      setCommentIndex.value = -1
      seeMoreReplies.value = false
    }
    return { seeMore, lessMore, setCommentIndex, seeMoreReplies }
  },
})
</script>

<style scoped>
.three-dot {
  @apply py-3 -mt-3;
  min-width: 56px;
}
</style>