<template>
  <div class="w-full">
    <reply v-for="(comment, index) in comments" :key="index" :comment="comment">
      0"></reply
    >
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Reply from './Reply.vue'

export default defineComponent({
  name: 'FacebookReplies',
  components: { Reply },
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
  setup() {},
})
</script>
