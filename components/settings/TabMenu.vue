<template>
  <div
    ref="content__wrapper"
    class="
      content__tabs
      flex flex-wrap
      md:bg-white
      bg-none
      items-center
      rounded-lg
      sm:rounded-full
      md:h-10
      h-10
      md:shadow
      lg:mt-0
      w-full
    "
  >
    <div
      class="background__circle bg-yellow-midlight"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>
    <div
      ref="service"
      :class="activeComponent === 'Service' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/4
      "
      data-index="0"
      @click="showTabMenu('Service'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Services</span
      >
    </div>
    <div
      ref="organize"
      :class="activeComponent === 'Organize' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/4
      "
      data-index="1"
      @click="showTabMenu('Organize'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Organize</span
      >
    </div>
    <div
      ref="system"
      :class="activeComponent === 'System' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/4
      "
      data-index="2"
      @click="showTabMenu('System'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >System</span
      >
    </div>
    <div
      ref="account"
      :class="activeComponent === 'Account' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/4
      "
      data-index="2"
      @click="showTabMenu('Account'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Account</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TabMenu',
  data() {
    return {
      offsetLeftPx: 0,
      offsetTopPx: 0,
      backgroundWidth: 0,
      circleBackgroundColor: 'bg-gray-900',
      backgroundColor: 'bg-gray-500',
      textBackgroundColor: 'text-gray-900',
      activeComponent: 'Service',
      activeOldIndex: 0,
      activeCurrentIndex: 0,
    }
  },
  computed: {
    ...mapState('setting', ['currentComponent']),
  },
  watch: {
    currentComponent(data) {
      if (data === 'System') {
        this.$refs.system.click()
      }
    },
  },
  mounted() {
    // if (this.$route.fullPath.includes('/settings#account/?success')) {
    //   setTimeout(() => {
    //     this.$store.commit('setting/SET_BILLING_INFO', true)
    //   }, 2000)
    //   this.$toast.clear()
    //   this.$router.push('settings?#account')
    //   this.$toast.success('Payment Success', {
    //     className: ['toasted-bg-archive'],
    //   })
    // } else if (this.$route.fullPath.includes('/settings#account/?cancel')) {
    //   setTimeout(() => {
    //     this.$store.commit('setting/SET_BILLING_INFO', true)
    //   }, 2000)
    //   this.$toast.clear()
    //   this.$router.push('settings?#account')
    //   this.$toast.success('Payment Canceled', {
    //     className: ['toasted-bg-alert'],
    //   })
    // } else if (
    //   this.$route.fullPath.includes('/settings#account/?failed')
    // ) {
    //   setTimeout(() => {
    //     this.$store.commit('setting/SET_BILLING_INFO', true)
    //   }, 2000)
    //   this.$toast.clear()
    //   this.$router.push('settings?#account')
    //   this.$toast.success(
    //     'This PayPal account is already in use by another user',
    //     {
    //       className: ['toasted-bg-alert'],
    //     }
    //   )
    // }
    const hash = this.$route.hash.split('#')[1]
    if (hash) {
      setTimeout(() => {
        this.$refs[hash].click()
      }, 1000)
    }
    // if (hash && hash.includes('account')) {
    //   setTimeout(() => {
    //     this.$refs.account.click()
    //   }, 1000)
    // } else if (hash) {
    //   setTimeout(() => {
    //     this.$refs[hash].click()
    //   }, 1000)
    // }

    const activeLink = this.$refs.content__wrapper.querySelector('.tab.active')
    this.backgroundWidth = activeLink.scrollWidth
    const backgroundColor = activeLink.dataset.themeBg
    const textBackgroundColor = activeLink.dataset.themeText
    const circleBackgroundColor = activeLink.dataset.themeCircle
    this.circleBackgroundColor = circleBackgroundColor
    this.backgroundColor = backgroundColor
    this.textBackgroundColor = textBackgroundColor
    this.offsetLeftPx = activeLink.offsetLeft
  },
  methods: {
    animate() {
      const activeLink = event.target.closest('.tab')
      this.backgroundWidth = activeLink.scrollWidth

      const backgroundColor = activeLink.dataset.themeBg
      const textBackgroundColor = activeLink.dataset.themeText
      const circleBackgroundColor = activeLink.dataset.themeCircle
      this.circleBackgroundColor = circleBackgroundColor
      this.backgroundColor = backgroundColor
      this.textBackgroundColor = textBackgroundColor
      this.offsetLeftPx = activeLink.offsetLeft
    },
    getAnimationClass(index) {
      let animationClass = ''
      if (this.activeCurrentIndex === index && this.activeOldIndex < index) {
        animationClass = 'slide-left'
      } else if (
        this.activeCurrentIndex === index &&
        this.activeOldIndex > index
      ) {
        animationClass = 'slide-right'
      } else if (this.activeCurrentIndex < index) {
        animationClass = 'slide-left'
      } else if (this.activeCurrentIndex > index) {
        animationClass = 'slide-right'
      }
      return animationClass
    },
    showTabMenu(componentName) {
      const tabWrapper = event.target.closest('.content__tabs')
      const oldActiveTab = tabWrapper.querySelector('.tab.active')
      if (componentName !== this.activeComponent) {
        this.activeOldIndex = oldActiveTab.dataset.index
        const activeCurrentIndex = event.target.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = activeCurrentIndex
          this.activeComponent = componentName
          this.$emit('change', this.activeComponent)
        }, 500)
      } else {
        this.activeOldIndex = oldActiveTab.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = 0
          this.activeComponent = 'Service'
          this.$emit('change', this.activeComponent)
        }, 500)
      }
      this.$store.commit('setting/SET_CURRENT_COMPONENT', componentName)
      this.$router.push('settings?#' + componentName.toLowerCase())
    },
  },
}
</script>
<style lang="scss" scoped>
.content__tabs {
  position: relative;
  .background__circle {
    top: 0px;
    left: 0px;
    z-index: -1;
    transition: width 0.3s ease-in-out 0.2s, left 0.5s ease-in-out;
    z-index: 1;
    @apply absolute h-full rounded-full inline-block;
  }
  .tab {
    @apply relative overflow-hidden;
    > span {
      position: relative;
      transition: color 0.2s ease-in-out;
      z-index: 10;
      @apply text-yellow-midlight;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>
