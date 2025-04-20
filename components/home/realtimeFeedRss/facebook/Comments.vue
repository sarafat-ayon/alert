<template>
  <div v-if="comments" class="w-full">
    <template v-for="(comment, index) in comments">
      <comment
        v-if="index <= seeMoreCommentIndex"
        :key="index"
        :comment="comment"
      ></comment>
    </template>
    <p
      v-if="comments.length - 1 > seeMoreCommentIndex"
      class="mb-4 text-gray-600 cursor-pointer"
      @click="seeMore"
    >
      View {{ comments.length - (seeMoreCommentIndex + 1) }} more comments
    </p>
    <p
      v-if="seeMoreCommentIndex === comments.length && comments.length > 2"
      class="mb-4 text-gray-600 cursor-pointer"
      @click="lessMore"
    >
      Less more comments
    </p>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import Comment from './Comment.vue'

export default defineComponent({
  name: 'FacebookComments',
  components: {
    Comment,
  },
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
  setup() {
    const seeMoreCommentIndex = ref(1)
    function seeMore() {
      seeMoreCommentIndex.value += 2
    }
    function lessMore() {
      seeMoreCommentIndex.value = 1
    }
    return { seeMore, lessMore, seeMoreCommentIndex }
  },
})
</script>
