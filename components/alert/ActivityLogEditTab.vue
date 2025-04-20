<template>
  <div
    ref="contentWrapper"
    class="content__tabs flex flex-wrap md:space-x-4 md:space-y-0 space-y-3 md:w-auto w-full"
  >
    <div
      ref="summary"
      :class="activityLog ? 'active' : ''"
      class="tab cursor-pointer md:w-auto w-full"
      data-index="0"
      @click="store.updateActivityLog()"
    >
      <button
        class="md:w-32 w-full h-10 flex justify-center items-center rounded-full xl:text-lg md:text-md text-sm font-bold"
      >
        Activity Log
      </button>
    </div>

    <div
      ref="Edit"
      :class="activeComponent === 'AlertOpenEdit' ? 'active' : ''"
      class="tab cursor-pointer md:w-auto w-full"
      data-index="1"
      @click.stop="
        showTabMenu(
          'GeneralAlertSettings',
          '.content__tabs',
          '.tab.active',
          $event,
          'setCurrentComp'
        ),
          animate('.tab', $event),
          setCurrentComp({
            currentComp: 'GeneralAlertSettings',
            previousCurrentComp: currentComp,
          })
      "
    >
      <button
        class="md:w-32 w-full h-10 flex justify-center items-center rounded-full xl:text-lg md:text-md text-sm font-bold"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { storeToRefs, mapActions } from 'pinia'
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'ActivityLogEditTab',
  setup() {
    const contentWrapper = ref(null)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab('AlertOpenEdit')

    const store = useAlert()
    const { activityLog, currentComp } = storeToRefs(store)
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
      activityLog,
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
  mounted() {},
  methods: {
    ...mapActions(useAlert, ['setCurrentComp']),
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
    > button {
      @apply text-red-deep bg-white;
    }
    &.active {
      > button {
        @apply text-white bg-red-deep;
      }
    }
  }
}
</style>
