<template>
  <div class="w-full">
    <div class="w-full space-y-2">
      <div
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
      </div>

      <template v-for="(comment, index) in comments">
        <reply
          v-if="index <= setCommentIndex"
          :key="index"
          :comment="comment"
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
  },
  setup() {
    const setCommentIndex = ref(1)
    function seeMore() {
      setCommentIndex.value += 5
    }
    function lessMore() {
      setCommentIndex.value = 1
    }
    return { seeMore, lessMore, setCommentIndex }
  },
})
</script>