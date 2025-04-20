<template>
  <div
    ref="content__wrapper"
    class="
      content__tabs
      flex flex-wrap
      bg-white
      items-center
      rounded-full
      h-auto
      shadow
      my-2
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
      :class="activeComponent === 'on-going' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        px-4
        py-1
        w-1/3
      "
      data-index="0"
      @click="showTabMenu('on-going'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-md font-semibold">Ongoing</span>
    </div>
    <div
      :class="activeComponent === 'one-time' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        px-4
        py-1
        w-1/3
      "
      data-index="2"
      @click="showTabMenu('one-time'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-md font-semibold">One Time</span>
    </div>
    <div
      :class="activeComponent === 'both' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        px-4
        py-1
        w-1/3
      "
      data-index="1"
      @click="showTabMenu('both'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-md font-semibold">Both</span>
    </div>
  </div>
</template>

<script>
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
      activeComponent: 'on-going',
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
      this.activeComponent = componentName
      this.$emit('change', this.activeComponent)
      // if (componentName !== this.activeComponent) {
      //   setTimeout(() => {
      //     this.activeComponent = componentName
      //     this.$emit('change', this.activeComponent)
      //   }, 500)
      // } else {
      //   setTimeout(() => {
      //     this.activeComponent = 'OnGoing'
      //     this.$emit('change', this.activeComponent)
      //   }, 500)
      // }
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
      @apply text-yellow-primary;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>
