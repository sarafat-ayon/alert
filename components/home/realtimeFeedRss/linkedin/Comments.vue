<template>
  <div v-if="comments" class="w-full space-y-3">
    <template v-for="(comment, index) in comments">
      <comment
        v-if="index <= setCommentIndex"
        :key="index"
        :comment="comment"
      ></comment>
    </template>
    <div
      v-if="comments.length > setCommentIndex"
      class="space-x-1 flex flex-row py-1 mt-2 px-5 rounded-md"
      @click="seeMore"
    >
      <span class="text-gray-1700 cursor-pointer">Load more comments</span>
    </div>
    <div
      v-if="setCommentIndex >= comments.length && comments.length > 2"
      class="space-x-1 flex flex-row py-1 mt-2 px-5 rounded-md"
      @click="lessMore"
    >
      <span class="text-gray-1700 cursor-pointer">Less more comments</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import Comment from './Comment.vue'
export default defineComponent({
  name: 'LinkedInComments',
  components: { Comment },
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