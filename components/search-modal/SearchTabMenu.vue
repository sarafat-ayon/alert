<template>
  <div
    ref="content__wrapper"
    class="
      w-96
      content__tabs
      flex flex-wrap
      items-center
      justify-center
      rounded-lg
      sm:rounded-full
      2xl:h-12
      h-10
      lg:mt-0
      transition-all
      duration-900
    "
    :style="{
      'margin-left': `${activeComponent === 'feeds' ? 128 : -120}px`,
    }"
  >
    <div
      class="background__circle bg-yellow-primary"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth}px`,
      }"
    ></div>
    <div
      :class="activeComponent === 'feeds' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        lg:px-4
        px-1
        2xl:py-3
        py-0.5
        w-1/3
      "
      data-index="0"
      @click="showTabMenu('feeds'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-sm">Feeds</span>
    </div>
    <div
      ref="storage"
      :class="[activeComponent === 'storage' ? 'active' : '']"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        lg:px-4
        px-1
        2xl:py-3
        py-0.5
        w-1/3
      "
      data-index="1"
      @click="showTabMenu('storage'), animate()"
    >
      <span class="pointer-events-none lg:text-md text-sm">Storage</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomPriceTabMenu',
  props: ['storageTabActive', 'tabActive'],
  // props: {
  //   tabActive: {
  //     type: String,
  //     required: false,
  //     default: '',
  //   },
  // },
  data() {
    return {
      offsetLeftPx: 0,
      offsetTopPx: 0,
      backgroundWidth: 0,
      circleBackgroundColor: 'bg-gray-900',
      backgroundColor: 'bg-gray-500',
      textBackgroundColor: 'text-gray-900',
      activeComponent: 'feeds',
      activeOldIndex: 0,
    }
  },
  watch: {
    tabActive(val) {
      if (val) {
        this.activeComponent = val
      }
    },
    storageTabActive(val) {
      if (val) {
        this.$refs.storage.click()
      }
    },
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
    showTabMenu(componentName) {
      if (componentName !== this.activeComponent) {
        // setTimeout(() => {
        this.activeComponent = componentName
        this.$emit('change', this.activeComponent)
        // }, 500)
      } else {
        // setTimeout(() => {
        this.activeComponent = 'feeds'
        this.$emit('change', this.activeComponent)
        // }, 500)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.content__tabs {
  opacity: 0;
  transition: all 1s ease-in-out;
  position: relative;
  &.fadeIn {
    opacity: 1;
  }
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
