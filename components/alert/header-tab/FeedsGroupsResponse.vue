<template>
  <div
    ref="contentWrapper"
    class="content__tabs flex flex-wrap bg-white items-center rounded-full h-10 md:shadow tab-width lg:w-96"
  >
    <div class="hidden 2xl:block">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth + 1}px`,
        }"
      ></div>
    </div>

    <div class="2xl:hidden">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth}px`,
        }"
      ></div>
    </div>

    <div
      ref="feeds"
      :class="activeComponent === 'SummaryAllFeedsTable' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto md:px-4 px-3 py-1 w-1/3"
      data-index="0"
      @click="
        showTabMenu(
          'SummaryAllFeedsTable',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          !showSummaryTableData
            ? setNewSummaryComponent('SummaryAllFeedsTable')
            : setPreviousSummaryComponent('SummaryAllFeedsTable'),
          setFeedsGroupsResponseTab('SummaryAllFeedsTable')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Feeds
      </span>
    </div>

    <div
      ref="groups"
      :class="activeComponent === 'SummaryGroupsTable' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto md:px-4 px-3 py-1 w-1/3"
      data-index="1"
      @click="
        showTabMenu(
          'SummaryGroupsTable',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          !showSummaryTableData
            ? setNewSummaryComponent('SummaryGroupsTable')
            : setPreviousSummaryComponent('SummaryGroupsTable'),
          setFeedsGroupsResponseTab('SummaryGroupsTable')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Groups
      </span>
    </div>

    <div
      ref="response"
      :class="
        activeComponent === 'SummaryAllFlagsORTable' ||
        activeComponent === 'SummaryAllFlagsCRTable'
          ? 'active'
          : ''
      "
      class="tab cursor-pointer rounded-full text-center h-auto md:px-4 px-3 py-1 w-1/3"
      data-index="2"
      @click="
        showTabMenu(
          'SummaryAllFlagsORTable',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          openClose === 'Open'
            ? !showSummaryTableData
              ? setNewSummaryComponent('SummaryAllFlagsORTable')
              : setPreviousSummaryComponent('SummaryAllFlagsORTable')
            : !showSummaryTableData
            ? setNewSummaryComponent('SummaryAllFlagsCRTable')
            : setPreviousSummaryComponent('SummaryAllFlagsORTable')
        openClose === 'Open'
          ? setFeedsGroupsResponseTab('SummaryAllFlagsORTable')
          : setFeedsGroupsResponseTab('SummaryAllFlagsCRTable')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Response
      </span>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapActions, storeToRefs } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'FeedsGroupsResponse',
  setup() {
    const contentWrapper = ref(null)
    const store = useAlert()
    const { feedsGroupsResponseTab, showSummaryTableData } = storeToRefs(store)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab(feedsGroupsResponseTab.value)

    const { openClose } = storeToRefs(store)

    onMounted(() => {
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
      openClose,
      showSummaryTableData,
    }
  },
  data() {
    return {}
  },
  computed: {},
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
  methods: {
    ...mapActions(useAlert, [
      'setNewSummaryComponent',
      'setFeedsGroupsResponseTab',
      'setPreviousSummaryComponent'
    ]),
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
@media (min-width: 768px) and (max-width: 1023px) {
  .tab-width {
    width: 20.5rem;
  }
}
@media (max-width: 767px) {
  .tab-width {
    width: 100%;
  }
}
</style>
