<template>
  <div
    ref="contentWrapper"
    class="
      content__tabs
      flex flex-wrap
      bg-red-moreLightness
      items-center
      rounded-full
      h-9
      md:shadow lg:w-60
      w-full
    "
  >
    <div
      class="background__circle bg-red-deep"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>
    <div
      ref="area"
      :class="activeComponent === 'ScatterGraph' ? 'active' : ''"
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
        showTabMenu('ScatterGraph', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          setCurrentGraph('ScatterGraph')
      "
    >
      <span class="pointer-events-none xl:text-lg text-md font-bold"
        >Scatter</span
      >
    </div>
    <div
      ref="line"
      :class="activeComponent === 'LineGraph' ? 'active' : ''"
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
        showTabMenu('LineGraph', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          setCurrentGraph('LineGraph')
      "
    >
      <span class="pointer-events-none xl:text-lg text-md font-bold"
        >Line</span
      >
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapActions } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'ScatterLineTab',
  setup() {
    const contentWrapper = ref(null)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab('ScatterGraph')

    const store = useAlert()
    onMounted(() => {
      store.setCurrentGraph(activeComponent.value)
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
    ...mapActions(useAlert, ['setCurrentGraph']),
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
