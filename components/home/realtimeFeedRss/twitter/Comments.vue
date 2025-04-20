<template>
  <div v-if="comments" class="w-full space-y-3">
    <template v-for="(comment, index) in comments">
      <comment
        v-if="index <= setCommentIndex"
        :key="index"
        :comment="comment"
        :comments="comments"
        :show-context="showContext"
      ></comment>
    </template>
    <div
      v-if="comments.length > setCommentIndex && comments.length > 2"
      class="
        space-x-1
        flex flex-row
        justify-center
        items-center
        py-1
        mt-2
        px-5
        rounded-md
        w-full
      "
      @click="seeMore"
    >
      <span class="cursor-pointer text-blue-400 text-center"
        >Show More Replies</span
      >
    </div>
    <div
      v-if="setCommentIndex >= comments.length && comments.length > 2"
      class="
        space-x-1
        flex flex-row
        justify-center
        items-center
        py-1
        mt-2
        px-5
        rounded-md
        w-full
      "
      @click="lessMore"
    >
      <span class="text-blue-400 text-center cursor-pointer"
        >Show Less Replies</span
      >
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
    showContext: {
      type: Boolean,
      default: true,
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