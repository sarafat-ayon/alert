<template>
  <transition name="my-layouts">
    <div class="fixed overflow-hidden h-full w-full bg-ash-default">
      <guest-archive-logo class="absolute"></guest-archive-logo>
      <div class="w-full h-full">
        <Nuxt />
      </div>
    </div>
  </transition>
</template>

<script>
import GuestArchiveLogo from '~/components/GuestArchiveLogo.vue'
export default {
  name: 'AuthLayout',

  components: {
    GuestArchiveLogo,
  },

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

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.scroll {
  overflow-y: auto;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
  }
}

@media (max-width: 767px) {
  .scroll {
    overflow-y: auto;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      // box-shadow: inset 0 0 5px #ECECEC;
      border-radius: 3px;
      background: #ececec;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
    }
  }
}
.StripeElement {
  border-radius: 25px !important;
}
</style>
