<template>
  <div
    ref="content__wrapper"
    class="content__tabs flex flex-wrap bg-white items-center rounded-full h-10 md:shadow"
  >
    <div
      class="background__circle bg-orange-dark"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>

    <div
      ref="summary"
      :class="currentYoutubeContent === 'Summary' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto 2xl:px-4 lg:px-2 px-1 py-1 w-1/4"
      data-index="0"
      @click="showTabMenu('Summary'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">Summary</span>
    </div>

    <div
      ref="transcript"
      :class="currentYoutubeContent === 'Transcript' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto 2xl:px-4 lg:px-2 px-1 py-1 w-1/4"
      data-index="1"
      @click="showTabMenu('Transcript'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">Transcript</span>
    </div>

    <div
      ref="details"
      :class="currentYoutubeContent === 'Details' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto 2xl:px-4 lg:px-2 px-1 py-1 w-1/4"
      data-index="2"
      @click="showTabMenu('Details'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">Details</span>
    </div>

    <div
      ref="comments"
      :class="currentYoutubeContent === 'Comments' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto 2xl:px-4 lg:px-2 px-1 py-1 w-1/4"
      data-index="2"
      @click="showTabMenu('Comments'), animate()"
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">Comments</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'TabMenu',
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    currentSelectVideo: {
      type: Number,
      default: 0,
    },
    currentSelectPlayListItem: {
      type: Number,
      default: 0,
    },
    optionSelect: {
      type: String,
      default: 'Videos',
    },
  },
  setup() {
    const store = useStore()

    return {
      currentYoutubeContent: computed(
        () => store.state.home.currentYoutubeContent
      ),
      feedsDropdown: computed(() => store.state.home.feedsDropdown),
      squeeze: computed(() => store.state.mobile.header.squeeze),
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
    feedsDropdown(data) {
      this.reAnimate()
    },
    currentYoutubeContent(data) {
      if (data) {
        setTimeout(() => {
          this.reAnimate()
        }, 80)
      }
    },
    currentSelectVideo(data) {
      if (data) {
        setTimeout(() => {
          this.$refs.summary.click()
        }, 200)
      }
    },
    currentSelectPlayListItem(data) {
      if (data) {
        this.$refs.summary.click()
      }
    },
    squeeze(data) {
      if (data) {
        setTimeout(() => {
          this.reAnimate()
        }, 500)
      } else {
        setTimeout(() => {
          this.reAnimate()
        })
      }
    },
    optionSelect(data) {
      if (data) {
        setTimeout(() => {
          this.$refs.summary.click()
        }, 200)
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
    setTimeout(() => {
      this.$refs.summary.click()
    }, 300)
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
    showTabMenu(componentName) {
      const tabWrapper = event.target.closest('.content__tabs')
      const oldActiveTab = tabWrapper.querySelector('.tab.active')
      if (componentName !== this.currentYoutubeContent) {
        this.activeOldIndex = oldActiveTab.dataset.index
        const activeCurrentIndex = event.target.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = activeCurrentIndex
          this.$store.commit('home/SET_CURRENT_YOUTUBE_CONTENT', componentName)
        }, 300)
      } else {
        this.activeOldIndex = oldActiveTab.dataset.index

        setTimeout(() => {
          this.activeCurrentIndex = 0
          this.$store.commit('home/SET_CURRENT_YOUTUBE_CONTENT', 'Summary')
        }, 300)
      }
      //   this.$store.commit('setting/SET_CURRENT_COMPONENT', componentName)
      //   this.$router.push('settings?#' + componentName.toLowerCase())
    },
    reAnimate() {
      const activeLink =
        this.$refs.content__wrapper.querySelector('.tab.active')
      setTimeout(() => {
        this.backgroundWidth = activeLink.scrollWidth
        const backgroundColor = activeLink.dataset.themeBg
        const textBackgroundColor = activeLink.dataset.themeText
        const circleBackgroundColor = activeLink.dataset.themeCircle
        this.circleBackgroundColor = circleBackgroundColor
        this.backgroundColor = backgroundColor
        this.textBackgroundColor = textBackgroundColor
        this.offsetLeftPx = activeLink.offsetLeft
      }, 450)
    },
  },
})
</script>
<style lang="scss" scoped>
.content__tabs {
  width: auto;
  max-width: 590px;
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
