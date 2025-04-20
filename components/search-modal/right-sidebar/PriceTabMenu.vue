<template>
  <div
    ref="content__wrapper"
    class="
      content__tabs
      flex flex-wrap
      bg-white
      items-center
      rounded-lg
      sm:rounded-full
      lg:h-auto
      shadow
      lg:mt-0
      w-full
    "
  >
    <div
      class="background__circle bg-yellow-primary"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth}px`,
      }"
    ></div>
    <div
      :class="activeComponent === 'OnGoing' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        lg:px-4
        px-1
        lg:py-1
        w-1/3
      "
      data-index="0"
      @click="showTabMenu('OnGoing'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-sm">Ongoing</span>
    </div>
    <div
      :class="activeComponent === 'Both' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        lg:px-4
        px-1
        lg:py-1
        w-1/3
      "
      data-index="1"
      @click="showTabMenu('Both'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-sm">Both</span>
    </div>
    <div
      :class="activeComponent === 'OneTime' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        lg:px-4
        px-1
        lg:py-1
        w-1/3
      "
      data-index="2"
      @click="showTabMenu('OneTime'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-sm">One Time</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomPriceTabMenu',
  data() {
    return {
      offsetLeftPx: 0,
      offsetTopPx: 0,
      backgroundWidth: 0,
      circleBackgroundColor: 'bg-gray-900',
      backgroundColor: 'bg-gray-500',
      textBackgroundColor: 'text-gray-900',
      activeComponent: 'OnGoing',
      activeOldIndex: 0,
      activeCurrentIndex: 0,
    }
  },
  mounted() {
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
          this.activeComponent = 'OnGoing'
          this.$emit('change', this.activeComponent)
        }, 500)
      }
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
      @apply text-yellow-500;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>
