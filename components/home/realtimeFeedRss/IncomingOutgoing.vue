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
      md:shadow md:w-96
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
      ref="all"
      :class="currentTab === 'All' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/3
      "
      data-index="0"
      @click="showTabMenu('All'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >All</span
      >
    </div>

    <div
      ref="incoming"
      :class="currentTab === 'Incoming' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/3
      "
      data-index="1"
      @click="showTabMenu('Incoming'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Incoming</span
      >
    </div>

    <div
      ref="outgoing"
      :class="currentTab === 'Outgoing' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        py-1
        w-1/3
      "
      data-index="2"
      @click="showTabMenu('Outgoing'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >Outgoing</span
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
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'TabMenu',
  setup() {
    const store = useStore()
    return {
      currentTab: computed(() => store.state.home.currentTab),
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
      activeComponent: 'All',
      activeOldIndex: 0,
      activeCurrentIndex: 0,
    }
  },
    watch: {
      currentTab(data) {
        if (data === 'All') {
          this.$refs.all.click()
        }
      },
    },
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
      if (componentName !== this.currentTab) {
        this.activeOldIndex = oldActiveTab.dataset.index
        const activeCurrentIndex = event.target.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = activeCurrentIndex
          this.$store.commit('home/SET_CURRENT_TAB', componentName)
        }, 300)
      } else {
        this.activeOldIndex = oldActiveTab.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = 0
          this.$store.commit('home/SET_CURRENT_TAB', 'All')
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