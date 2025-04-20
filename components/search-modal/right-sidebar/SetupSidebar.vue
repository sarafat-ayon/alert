<template>
  <aside>This is sidebar</aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      sidebarModal: 'sidebarModal',
    }),
  },
  methods: {
    ...mapActions({
      toggle_login_modal: 'toggle_login_modal',
    }),
  },
}
</script>

<style lang="scss" scoped>
aside {
  width: 26%;
  transition: all 1s ease-in-out;
  @apply absolute top-0 right-0 h-full bg-gray-800 rounded-tl-2xl rounded-bl-2xl;
  // &.show {
  //   width: 26%;
  // }
}
</style>
