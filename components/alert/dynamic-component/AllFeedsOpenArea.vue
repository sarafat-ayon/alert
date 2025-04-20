<template>
  <div class="w-full h-full py-5 md:px-4 px-3 flex flex-col">
    <div
      class="
        flex
        lg:flex-row
        flex-col
        lg:flex-nowrap
        flex-wrap
        lg:space-x-7 lg:space-y-0 lg:items-center
      "
      :class="summaryComp === 'SummaryGroupsTable' ? 'justify-between' : ''"
    >
      <scatter-line-tab
        v-if="
          summaryComp === 'SummaryAllFlagsCRTable' ||
          summaryComp === 'SummaryTeamCRTable' ||
          summaryComp === 'SummaryPersonCRTable'
        "
        class="mt-0"
      ></scatter-line-tab>
      <area-line-tab
        v-else
        class="mt-0"
        :class="summaryComp === 'SummaryGroupsTable' ? 'lg:w-60' : 'lg:w-60'"
      ></area-line-tab>
      <div
        class="
          flex-grow flex flex-col flex-nowrap
          lg:flex-row lg:space-x-7 lg:items-center
        "
        :class="
          summaryComp === 'SummaryGroupsTable'
            ? 'largeDesktop:flex hidden'
            : 'block'
        "
      >
        <p
          class="
            md:text-xl
            text-md
            md:font-bold
            font-bold
            text-gray-1200
            whitespace-nowrap
            lg:mt-0
            mt-4
          "
        >
          Severity Index
        </p>
        <div class="flex-grow rounded-full pl-px lg:mt-0 mt-2 mb-3 lg:mb-0">
          <SeveritySlidingBar :bar-id="'id0'" />
        </div>
      </div>
      <transition name="fadeIn">
        <div
          v-if="summaryComp === 'SummaryGroupsTable'"
          class="
            w-full
            lg:w-60
            h-9
            rounded-full
            bg-red-moreLightness
            flex
            items-center
            justify-start
            relative
            mt-0
            mb-4
            lg:mb-0
            order-first
            lg:order-none
          "
        >
          <div class="w-1/2 h-full">
            <input
              id="open"
              v-model="openCheckbox"
              class="
                toggle-checkbox
                w-1/2
                h-full
                absolute
                left-0
                top-0
                block
                rounded-full
                appearance-none
                cursor-pointer
              "
              type="checkbox"
            />
            <label
              for="open"
              class="
                toggle-label
                overflow-hidden
                w-full
                h-full
                transition-all
                duration-800
                ease-in-out
                bg-red-moreLightness
                cursor-pointer
                text-red-deep
                flex
                items-center
                justify-center
                font-bold
              "
              :class="closeCheckbox ? 'rounded-l-full' : 'rounded-full'"
              >Open</label
            >
          </div>
          <div class="w-1/2 h-full">
            <input
              id="close"
              v-model="closeCheckbox"
              class="
                toggle-checkbox
                w-1/2
                h-full
                absolute
                right-0
                top-0
                block
                rounded-full
                appearance-none
                cursor-pointer
              "
              type="checkbox"
            />
            <label
              for="close"
              class="
                toggle-label
                overflow-hidden
                w-full
                h-full
                transition-all
                duration-800
                ease-in-out
                bg-red-moreLightness
                cursor-pointer
                text-red-deep
                font-bold
                flex
                items-center
                justify-center
              "
              :class="openCheckbox ? 'rounded-r-full' : 'rounded-full'"
              >Closed</label
            >
          </div>
        </div>
      </transition>
    </div>
    <div
      class="
        flex flex-col flex-nowrap
        lg:flex-row lg:space-x-7 lg:items-center lg:mt-4 lg:mb-4
      "
      :class="
        summaryComp === 'SummaryGroupsTable'
          ? 'flex largeDesktop:hidden'
          : 'hidden'
      "
    >
      <p
        class="
          md:text-xl
          text-md
          md:font-bold
          font-bold
          text-gray-1200
          whitespace-nowrap
          lg:mt-0
          mt-4
        "
      >
        Severity Index
      </p>
      <div class="flex-grow rounded-full pl-px md:mt-0 mt-3 mb-4 md:mb-0">
        <SeveritySlidingBar :bar-id="'id100'" />
      </div>
    </div>
    <div class="flex-grow w-full">
      <transition name="dynamicComp" mode="out-in">
        <component :is="currentGraph"></component>
      </transition>
    </div>
    <date-range-tab></date-range-tab>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from '@vue/composition-api'
import AreaLineTab from '~/components/alert/area-line-graph/graph-tab/AreaLineTab.vue'
import ScatterLineTab from '~/components/alert/area-line-graph/graph-tab/ScatterLineTab.vue'
import DateRangeTab from '~/components/alert/area-line-graph/graph-tab/DateRangeTab.vue'
import AreaGraph from '~/components/alert/area-line-graph/AreaGraph.vue'
import LineGraph from '~/components/alert/area-line-graph/LineGraph.vue'
import ScatterGraph from '~/components/alert/area-line-graph/ScatterGraph'
import SeveritySlidingBar from '~/components/alert/sliding-bar/SeveritySlidingBar.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    AreaLineTab,
    DateRangeTab,
    AreaGraph,
    LineGraph,
    SeveritySlidingBar,
    ScatterLineTab,
    ScatterGraph,
  },
  setup() {
    const openCheckbox = ref(true)
    const closeCheckbox = ref(true)

    const store = useAlert()
    const { currentGraph, summaryComp } = storeToRefs(store)

    return { openCheckbox, closeCheckbox, currentGraph, summaryComp }
  },
  data() {
    return {}
  },
  computed: {
    // ...mapState(useAlert, ['currentGraph', 'summaryComp']),
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
      @apply text-gray-1200;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}

/* for dynamic Components */
.dynamicComp-enter-active,
.dynamicComp-leave-active {
  transition: opacity 0.5s;
}
.dynamicComp-enter,
.dynamicComp-leave-to {
  opacity: 0;
}

.fadeIn-enter-active {
  transition: opacity 0.5s;
}
.fadeIn-leave-active {
  transition: opacity 0s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.toggle-checkbox {
  transition: all 0.5s ease-in-out;
  &:checked + .toggle-label {
    @apply bg-red-deep text-white;
    transition: all 0.5s ease-in-out;
  }
}
</style>
