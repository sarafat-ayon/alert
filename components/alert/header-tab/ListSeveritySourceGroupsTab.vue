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
      tab-width
      mediumDesktop:w-112
      md:shadow
      w-full
    "
  >
    <div class="hidden desktop:block">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth + 1}px`,
        }"
      ></div>
    </div>

    <div class="desktop:hidden hidden md:block">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth - 1}px`,
        }"
      ></div>
    </div>

    <div class="md:hidden block">
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth + 1}px`,
        }"
      ></div>
    </div>

    <div
      ref="list"
      :class="activeComponent === 'AlertsOpenList' ? 'active' : ''"
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
      data-index="0"
      @click="
        showTabMenu('AlertsOpenList', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          setCurrentComp({
            currentComp: 'AlertsOpenList',
            previousCurrentComp: currentComp,
          }),
          setListSeveritySourceGroupTab('AlertsOpenList')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        List
      </span>
    </div>

    <div
      ref="severity"
      :class="activeComponent === 'AlertsOpenSeverity' ? 'active' : ''"
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
      data-index="1"
      @click="
        showTabMenu(
          'AlertsOpenSeverity',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          setCurrentComp({
            currentComp: 'AlertsOpenSeverity',
            previousCurrentComp: currentComp,
          }),
          setListSeveritySourceGroupTab('AlertsOpenSeverity')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Severity
      </span>
    </div>

    <div
      ref="source"
      :class="activeComponent === 'AlertsOpenSource' ? 'active' : ''"
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
      @click="
        showTabMenu(
          'AlertsOpenSource',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          setCurrentComp({
            currentComp: 'AlertsOpenSource',
            previousCurrentComp: currentComp,
          }),
          setListSeveritySourceGroupTab('AlertsOpenSource')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Source
      </span>
    </div>

    <div
      ref="groups"
      :class="activeComponent === 'AlertsOpenGroups' ? 'active' : ''"
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
      @click="
        showTabMenu(
          'AlertsOpenGroups',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          setCurrentComp({
            currentComp: 'AlertsOpenGroups',
            previousCurrentComp: currentComp,
          }),
          setListSeveritySourceGroupTab('AlertsOpenGroups')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold">
        Groups
      </span>
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
  name: 'ListSeveritySourceGroupsTab',
  setup() {
    const contentWrapper = ref(null)
    const store = useAlert()
    const { currentComp, listSeveritySourceGroupTab } = storeToRefs(store)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab(listSeveritySourceGroupTab.value)

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
      'setCurrentComp',
      'setListSeveritySourceGroupTab',
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
@media (min-width: 1024px) and (max-width: 1680px) {
  .tab-width {
    width: 390px;
  }
}
</style>


