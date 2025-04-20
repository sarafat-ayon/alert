<template>
  <div
    v-if="cookiesShow"
    class="
      fixed
      bottom-0
      left-0
      flex flex-col
      justify-center
      w-full
      h-auto
      p-4
      shadow-2xl
      bg-orange-dark
      z-999999
    "
  >
    <fa
      class="w-4 h-4 self-end mx-2 font-bold text-white cursor-pointer"
      :icon="['fas', 'times']"
      @click="cookiesShow = false"
    />
    <div class="flex items-start justify-center">
      <div class="w-full px-3 pt-3">
        <div class="flex items-start">
          <span class="pt-1 mr-1">
            <fa
              class="w-4.1 h-4.1 mx-2 font-bold text-white"
              :icon="['fas', 'exclamation-circle']"
            />
          </span>
          <p class="mb-0 text-xl text-white">
            Sharp Archive uses information collected through cookies or in other
            forms to improve the experience on our site and pages and analyze
            how it is used. We do not sell your personal information. You can
            find out more in our
            <nuxt-link to="/privacy-policy" class="text-blue-600 underline"
              >privacy policy</nuxt-link
            >
          </p>
        </div>
        <div class="flex items-center justify-center mt-5 space-x-4">
          <button
            class="
              p-2
              px-4
              font-semibold
              bg-white
              rounded-full
              cursor-pointer
              text-orange-dark
            "
            @click="acceptCookies"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cookies',
  data() {
    return {
      cookiesShow: false,
    }
  },
  mounted() {
    this.readCookie()
  },
  methods: {
    acceptCookies() {
      this.$cookies.set('accept-cookies', 'yes', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
      this.cookiesShow = false
    },
    readCookie() {
      const cookieRes = this.$cookies.get('accept-cookies')
      if (cookieRes === 'yes') {
        this.cookiesShow = false
      } else {
        this.cookiesShow = true
      }
    },
  },
}
</script>