<template>
  <div
    ref="content__wrapper"
    class="
      content__tabs
      flex flex-wrap
      items-center
      rounded-full
      h-10
      md:shadow
    "
  >
    <div
      class="background__circle bg-white"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>

    <div
      ref="automatic"
      :class="currentPayMethod === 'Automatic' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/2
      "
      data-index="0"
      @click="showTabMenu('Automatic'), animate()"
    >
      <span class="pointer-events-none md:text-md text-sm font-bold"
        >Automatic</span
      >
    </div>

    <div
      id="invoice"
      ref="invoice"
      :class="currentPayMethod === 'Invoice' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/2
      "
      data-index="1"
      @click="showTabMenu('Invoice'), animate()"
    >
      <span class="pointer-events-none md:text-md text-sm font-bold"
        >Invoice</span
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'TabMenu',
  setup() {
    const store = useStore()
    return {
      currentPayMethod: computed(() => store.state.currentPayMethod),
      store,
    }
  },
  data() {
    return {
      offsetLeftPx: 0,
      offsetTopPx: 0,
      backgroundWidth: 0,
      circleBackgroundColor: 'bg-gray-900',
      backgroundColor: 'bg-gray-500',
      textBackgroundColor: 'text-gray-900',
      activeComponent: 'Summary',
      activeOldIndex: 0,
      activeCurrentIndex: 0,
    }
  },
  watch: {
    currentPayMethod(data) {
      if (data === 'Invoice') {
        this.activeCurrentIndex = 1
        this.activeOldIndex = 0
        const activeLink = document.getElementById('invoice')
        this.backgroundWidth = activeLink.scrollWidth
        const backgroundColor = activeLink.dataset.themeBg
        const textBackgroundColor = activeLink.dataset.themeText
        const circleBackgroundColor = activeLink.dataset.themeCircle
        this.circleBackgroundColor = circleBackgroundColor
        this.backgroundColor = backgroundColor
        this.textBackgroundColor = textBackgroundColor
        this.offsetLeftPx = activeLink.offsetLeft
      }
    },
  },
  mounted() {
    const activeLink = this.$refs.content__wrapper.querySelector('.tab.active')
    setTimeout(() => {
      this.backgroundWidth = activeLink.scrollWidth
      const backgroundColor = activeLink.dataset.themeBg
      const textBackgroundColor = activeLink.dataset.themeText
      const circleBackgroundColor = activeLink.dataset.themeCircle
      this.circleBackgroundColor = circleBackgroundColor
      this.backgroundColor = backgroundColor
      this.textBackgroundColor = textBackgroundColor
      this.offsetLeftPx = activeLink.offsetLeft
    }, 100)
  },
  methods: {
    filterEmailMessages() {
      // this.$store.commit('home/FILTER_EMAIL_MESSAGES')
    },
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
      if (componentName !== this.currentPayMethod) {
        this.activeOldIndex = oldActiveTab.dataset.index
        const activeCurrentIndex = event.target.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = activeCurrentIndex
          this.$store.commit('SET_CURRENT_PAY_METHOD', componentName)
        }, 300)
      } else {
        this.activeOldIndex = oldActiveTab.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = 0
          this.$store.commit('SET_CURRENT_PAY_METHOD', 'Automatic')
        }, 300)
      }
      //   this.$store.commit('setting/SET_CURRENT_COMPONENT', componentName)
      //   this.$router.push('settings?#' + componentName.toLowerCase())
    },
  },
})
</script>
<style lang="scss" scoped>
.content__tabs {
  width: 260px;
  background-color: #373e46;
  position: relative;
  margin: auto;
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
      @apply text-white;
    }
    &.active {
      > span {
        @apply text-yellow-primary;
      }
    }
  }
}
</style>