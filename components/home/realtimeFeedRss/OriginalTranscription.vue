<template>
  <div
    ref="content__wrapper"
    class="
      content__tabs
      flex flex-wrap
      bg-white
      items-center
      rounded-full
      h-10
      md:shadow md:w-64
      w-full
    "
  >
    <div
      class="background__circle bg-orange-dark"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>
    <div
      ref="original"
      :class="activeComponent === 'Original' ? 'active' : ''"
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
      @click="showTabMenu('Original'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Original</span
      >
    </div>
    <div
      ref="transcription"
      :class="activeComponent === 'Transcription' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-1
        px-1
        py-1
        w-1/2
      "
      data-index="1"
      @click="showTabMenu('Transcription'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Transcription</span
      >
    </div>
    <!-- <div
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
    </div> -->
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
      activeComponent: 'Original',
      activeOldIndex: 0,
      activeCurrentIndex: 0,
    }
  },
  computed: {
    ...mapState('setting', ['currentComponent']),
  },
  //   watch: {
  //     currentComponent(data) {
  //       if (data === 'System') {
  //         this.$refs.system.click()
  //       }
  //     },
  //   },
  mounted() {
    // const hash = this.$route.hash.split('#')[1]
    // if (hash) {
    //   setTimeout(() => {
    //     this.$refs[hash].click()
    //   }, 1000)
    // }
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
          //   this.$emit('change', this.activeComponent)
        },300)
      } else {
        this.activeOldIndex = oldActiveTab.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = 0
          this.activeComponent = 'Original'
          //   this.$emit('change', this.activeComponent)
        },300)
      }
      //   this.$store.commit('setting/SET_CURRENT_COMPONENT', componentName)
      //   this.$router.push('settings?#' + componentName.toLowerCase())
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
      @apply text-orange-dark;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>
