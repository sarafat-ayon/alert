<template>
  <div
    ref="contentWrapper"
    class="
      content__tabs
      flex flex-wrap
      bg-white
      items-center
      rounded-full
      md:h-9
      h-9
      md:shadow
    "
  >
    <div
      class="background__circle"
      :class="[
        activeComponent === 'Uncertain' ? 'bg-orange-500' : '',
        activeComponent === 'HoldSendCloseTab' ? 'bg-green-1100' : '',
        activeComponent === 'FlagFalse' ? 'bg-red-deep' : '',
      ]"
      :style="{
        left: `${offsetLeftPx}px`,
        width: `${backgroundWidth + 1}px`,
      }"
    ></div>
    <div
      ref="uncertain"
      :class="activeComponent === 'Uncertain' ? 'active' : ''"
      class="
        tab
        cursor-pointer
        rounded-full
        text-center
        h-auto
        md:px-4
        px-3
        pb-1
        w-1/3
      "
      data-index="0"
      @click="
        showTabMenu('Uncertain', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          setDisposition('')
      "
    >
      <span class="pointer-events-none md:text-md text-sm font-bold"
        >Uncertain</span
      >
    </div>
    <div
      ref="true"
      :class="activeComponent === 'HoldSendCloseTab' ? 'active' : ''"
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
      @click="
        showTabMenu(
          'HoldSendCloseTab',
          '.content__tabs',
          '.tab.active',
          $event
        ),
          animate('.tab', $event),
          setDisposition('HoldSendCloseTab')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >True</span
      >
    </div>
    <div
      ref="false"
      :class="activeComponent === 'FlagFalse' ? 'active' : ''"
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
      @click="
        showTabMenu('FlagFalse', '.content__tabs', '.tab.active', $event),
          animate('.tab', $event),
          setDisposition('FlagFalse')
      "
    >
      <span class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
        >False</span
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'UncertainTrueFalseTab',
  setup() {
    const contentWrapper = ref(null)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab('Uncertain')

    const store = useAlert()
    onMounted(() => {
      store.setDisposition(activeComponent.value)
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
  mounted() {},
  methods: {
    ...mapActions(useAlert, ['setDisposition']),
  },
})
</script>
<style lang="scss" scoped>
.content__tabs {
  width: 360px;
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
      z-index: 2;
      @apply text-ash-default;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>