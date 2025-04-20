<template>
  <div
    ref="contentWrapper"
    class="content__tabs flex flex-wrap bg-white items-center rounded-full h-10 md:shadow md:w-64 w-full"
  >
    <div
      class="background__circle bg-red-deep"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>

    <div
      ref="summary"
      :class="activeComponent === 'GraphComp' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto md:px-4 px-3 py-1 w-1/2"
      data-index="0"
      @click="
        showTabMenu(
          'GraphComp',
          '.content__tabs',
          '.tab.active',
          $event,
          'setCurrentComp'
        ),
          animate('.tab', $event),
          setCurrentComp({
            currentComp: 'GraphComp',
            previousCurrentComp: currentComp,
          }),
          setSummaryAlertTab('GraphComp')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">Summary</span>
    </div>

    <div
      ref="alerts"
      :class="activeComponent === 'AlertsOpenList' ? 'active' : ''"
      class="tab cursor-pointer rounded-full text-center h-auto md:px-1 px-1 py-1 w-1/2"
      data-index="1"
      @click="
        showTabMenu(
          'AlertsOpenList',
          '.content__tabs',
          '.tab.active',
          $event,
          'setCurrentComp'
        ),
          animate('.tab', $event),
          currentComp === 'SummaryTable' ? setListSeveritySourceGroupTab('AlertsOpenList') : ''
          setCurrentComp({
            currentComp: previousCurrentComp[0] && currentComp !== 'SummaryTable'
              ? previousCurrentComp[0]
              : 'AlertsOpenList',
            previousCurrentComp: currentComp,
          }),
          setSummaryAlertTab('AlertsOpenList')
          
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">Alerts</span>
    </div>
  </div>
</template>


<script>
// import { mapState } from 'vuex'
import { mapActions, storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'SummaryAlertsTab',
  setup() {
    const contentWrapper = ref(null)
    const store = useAlert()
    const { currentComp, previousCurrentComp, summaryAlertTab } =
      storeToRefs(store)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab(summaryAlertTab.value)

    onMounted(() => {
      // store.setCurrentComp(activeComponent.value)
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
      currentComp,
      previousCurrentComp,
      store,
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
  mounted() {},
  methods: {
    ...mapActions(useAlert, ['setCurrentComp', 'setSummaryAlertTab', 'setListSeveritySourceGroupTab']),
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
</style>


