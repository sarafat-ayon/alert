<template>
  <transition name="my-layouts">
    <div class="fixed overflow-hidden h-full w-full">
      <guest-archive-logo class="absolute"></guest-archive-logo>
      <div
        v-if="showPaymentHeader"
        class="fixed top-17.25 inset-1/3 w-1/3 text-center hidden md:block"
      >
        <p class="text-yellow-primary">Please Add a Payment Method</p>
      </div>
      <div
        v-if="showPaymentHeader"
        class="fixed md:right-13 right-2 md:top-15 top-12"
      >
        <button
          class="
            md:w-38
            w-28
            md:h-9
            h-8
            text-white
            bg-orange-dark
            rounded-full
            mr-2.5
            border-none
            outline-none
            font-bold
          "
          @click="logout"
        >
          Log Out
        </button>
      </div>
      <div class="w-full h-full">
        <Nuxt />
      </div>
    </div>
  </transition>
</template>

<script>
import GuestArchiveLogo from '~/components/GuestArchiveLogo.vue'
export default {
  components: { GuestArchiveLogo },
  layoutTransition: {
    name: 'my-layouts',
    mode: '',
  },
  data() {
    return {
      showPaymentHeader: true,
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'payment') {
        this.showPaymentHeader = true
      }
    },
  },
  mounted() {
    if (this.$route.name === 'payment') {
      this.showPaymentHeader = true
    } else {
      this.showPaymentHeader = false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      window.location.replace('/')
    },
  },
}
</script>

<style lang="scss">
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
</style>