<template>
  <div>
    <Nuxt />

    <update-add-feeds></update-add-feeds>
  </div>
</template>
<script>
import UpdateAddFeeds from '~/components/UpdateAddFeeds.vue'

export default {
  name: 'GuestLayout',
  components: { UpdateAddFeeds },
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
