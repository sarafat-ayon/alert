<template>
  <section>
    <div v-if="error && error.statusCode === 404" class="bg-ash-dark">
      <div class="h-screen flex flex-col justify-center items-center px-8">
        <img src="~/assets/img/errors/404.svg" alt="SharpArchive 404 Error Image" />
        <div class="w-full text-center mt-5">
          <p class="text-white text-5xl mb-5">
            The Request Content is not Found
          </p>
          <nuxt-link
            class="
              bg-yellow-primary
              text-white
              py-2
              px-10
              rounded-full
              text-center
            "
            to="/"
            >Go to Home</nuxt-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error',
  layout: 'guest',
  props: ['error'],
  auth: false,
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
