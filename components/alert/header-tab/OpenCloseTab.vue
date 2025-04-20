<template>
  <div
    ref="contentWrapper"
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
    <div class="hidden largeTab:block">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth + 1}px`,
        }"
      ></div>
    </div>

    <div class="largeTab:hidden">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth}px`,
        }"
      ></div>
    </div>

    <div
      ref="open"
      :class="activeComponent === 'Open' ? 'active' : ''"
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
      @click="
        showTabMenu('Open', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          store.setOpenClose('Open'),
          summaryComp === 'SummaryAllFlagsCRTable' ||
          summaryComp === 'SummaryTeamCRTable' ||
          summaryComp === 'SummaryPersonCRTable'
            ? [
                store.setNewSummaryComponent('SummaryAllFlagsORTable'),
                store.setFeedsGroupsResponseTab('SummaryAllFlagsORTable'),
              ]
            : ''
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Open
      </span>
    </div>

    <div
      ref="close"
      :class="activeComponent === 'Close' ? 'active' : ''"
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
      @click="
        showTabMenu('Close', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          store.setOpenClose('Close'),
          summaryComp === 'SummaryAllFlagsORTable' ||
          summaryComp === 'SummaryFlagPersonsORTable'
            ? [
                store.setNewSummaryComponent('SummaryAllFlagsCRTable'),
                store.setFeedsGroupsResponseTab('SummaryAllFlagsCRTable'),
              ]
            : ''
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Closed
      </span>
    </div>
  </div>
</template>


<script>
// import { mapState } from 'vuex'
import { storeToRefs } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  name: 'OpenCloseTab',
  setup() {
    const contentWrapper = ref(null)
    const store = useAlert()
    const { summaryComp, openClose } = storeToRefs(store)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab(openClose.value)

    onMounted(() => {
      // store.setCurrentComp(activeComponent)
      const activeLink = contentWrapper.value.querySelector('.tab.active')
      tab(activeLink)
    })
    return {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
      contentWrapper,
      store,
      summaryComp,
    }
  },
  data() {
    return {}
  },
  computed: {
    // ...mapState('setting', ['currentComponent']),
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
  },
  methods: {},
})
</script>


<style lang="scss" scoped>
.content__tabs {
  position: relative;
  .background__circle {
    top: 0px;
    left: 0px;
    z-index: -1;
    transition: width 0.2s ease-in-out 0.2s, left 0.5s ease-in-out;
    z-index: 1;
    @apply absolute h-full rounded-full inline-block;
  }
  .tab {
    @apply relative overflow-hidden;
    > span {
      position: relative;
      transition: color 0.2s ease-in-out;
      z-index: 10;
      @apply text-red-deep;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>


