<template>
  <div
    class="flex flex-col justify-end xl:flex-row xl:justify-end space-y-4 xl:space-y-0 xl:space-x-4 h-full overflow-hidden"
  >
    <template v-if="isDesktop">
      <transition name="fadeIn" mode="out-in">
        <div
          v-if="!hideGraphTable"
          class="flex flex-col xl:h-full rounded-3xl graph-table-width overflow-hidden flex-grow transition-all duration-500 ease-in-out h-full"
          :class="[
            isGraphExpanded && isMediumTab ? 'medium-decice-height' : 'h-10.1',
          ]"
        >
          <div
            class="relative w-full py-6 bg-red-deep rounded-t-2xl md:cursor-pointer xl:cursor-default"
            @click.stop="!isLarge ? toggleExpand() : null"
          >
            <span
              class="toggle-icon transition-all duration-500 transform block xl:hidden"
              :class="isGraphExpanded ? 'rotate-180' : 'rotate-0'"
            >
              <fa class="text-3xl" :icon="['fas', 'caret-down']" />
            </span>
          </div>
          <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
            <div
              class="w-full h-full xl:opacity-100 transition-opacity duration-1000 ease-in-out"
              :class="isGraphExpanded ? 'opacity-100' : 'opacity-0'"
            >
              <div class="w-full h-full overflow-auto scroll">
                <transition name="dynamicComp" mode="out-in">
                  <component :is="graphCurrentComp"></component>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div
        class="flex flex-col rounded-3xl xl:h-full overflow-hidden transition-all duration-500 ease-in-out h-full"
        :class="[
          !isGraphExpanded && isMediumTab && showHideFullSummaryTable
            ? 'full-height delay-500'
            : !isGraphExpanded && isMediumTab
            ? 'medium-decice-height'
            : 'h-10.1',
          showHideFullSummaryTable ? 'w-full delay-500' : 'max-width-550',
        ]"
      >
        <div
          class="relative w-full py-2 bg-red-deep text-center md:cursor-pointer"
          @click.stop="!isLarge ? toggleExpand() : null"
        >
          <p
            class="text-white text-xl font-bold"
            @click.stop="
              !showHideFullSummaryTable
                ? store.setShowFullSummaryTable()
                : store.setHideFullSummaryTable()
            "
          >
            Summary
          </p>
          <!-- @click.stop="
              summaryComp !== 'SummaryAllFeedsTable' &&
              summaryComp !== 'SummaryAllFlagsORTable' &&
              summaryComp !== 'SummaryAllFlagsCRTable'
                ? currentComp !== 'SummaryTable'
                  ? store.setCurrentComp({
                      currentComp: 'SummaryTable',
                      previousCurrentComp: currentComp,
                    })
                  : store.backToCurrentComp(previousCurrentComp[0])
                : !showHideFullSummaryTable
                ? [store.setShowFullSummaryTable(), expandSummaryTable()]
                : store.setHideFullSummaryTable()
            " -->
          <span
            v-if="!showHideFullSummaryTable"
            class="toggle-icon transition-all duration-500 transform block xl:hidden"
            :class="!isGraphExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <fa class="text-3xl" :icon="['fas', 'caret-down']" />
          </span>
        </div>

        <div class="w-full inner-body flex-grow bg-white rounded-b-2xl pt-5">
          <div
            class="w-full h-full xl:opacity-100 transition-opacity duration-1000 ease-in-out"
            :class="!isGraphExpanded ? 'opacity-100' : 'opacity-0'"
          >
            <!-- <div class="flex justify-end items-center sticky top-3.5 pr-6 pb-1.5 cursor-pointer">
              <img
                class="h-5"
                :src="require('~/assets/img/svg/expand.svg')"
                alt
                @click="
                  store.setCurrentComp({
                    currentComp: 'SummaryTable',
                    previousCurrentComp: currentComp,
                  })
                "
              />
            </div>-->
            <div
              class="w-full h-full overflow-auto scroll pb-5 summery-height cursor-pointer"
              @click.stop="
                !showHideFullSummaryTable
                  ? store.setShowFullSummaryTable()
                  : store.setHideFullSummaryTable()
              "
            >
              <!-- @click.stop="
                summaryComp !== 'SummaryAllFeedsTable' &&
                summaryComp !== 'SummaryAllFlagsORTable' &&
                summaryComp !== 'SummaryAllFlagsCRTable'
                  ? currentComp !== 'SummaryTable'
                    ? store.setCurrentComp({
                        currentComp: 'SummaryTable',
                        previousCurrentComp: currentComp,
                      })
                    : store.backToCurrentComp(previousCurrentComp[0])
                  : !showHideFullSummaryTable
                  ? store.setShowFullSummaryTable()
                  : store.setHideFullSummaryTable()
              " -->
              <transition name="dynamicComp" mode="out-in">
                <component :is="summaryComp"></component>
              </transition>
              <transition name="pichart" mode="out-in">
                <div
                  v-if="!showSummaryTableData"
                  class="text-center flex justify-center items-center sticky top-0 left-0 pt-4 cursor-pointer"
                >
                  <div
                    class="text-center flex justify-center items-center sticky top-0 left-0 pt-4 cursor-pointer w-80 h-80 rounded-full"
                    @click.stop="
                      pieSeries.length > 0
                        ? ''
                        : !showHideFullSummaryTable
                        ? store.setShowFullSummaryTable()
                        : store.setHideFullSummaryTable()
                    "
                  >
                    <PieChart isGraphExpandedclass />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div
      v-else
      class="w-full h-full overflow-hidden bg-white rounded-2xl body-outline"
    >
      <div class="flex items-center justify-around w-full">
        <div
          class="w-1/2 p-3 text-xl font-bold text-center cursor-pointer"
          :class="
            graphCurrentComp === 'AllFeedsOpenArea'
              ? 'active-feed-menu'
              : 'bg-red-deep shadow-inner-site text-white'
          "
          @click="store.setGraphCurrentCom('AllFeedsOpenArea')"
        >
          Alerts
        </div>
        <div
          class="w-1/2 p-3 text-xl font-bold text-center cursor-pointer"
          :class="
            graphCurrentComp === summaryComp
              ? 'active-feed-menu '
              : 'bg-red-deep shadow-inner-site text-white'
          "
          @click="store.setGraphCurrentCom(summaryComp)"
        >
          Summary
        </div>
      </div>
      <transition
        v-if="graphCurrentComp === 'AllFeedsOpenArea'"
        name="dynamicComp"
        mode="out-in"
      >
        <component
          :is="graphCurrentComp"
          class="mobile-inner-body scroll"
        ></component>
      </transition>
      <div
        v-if="graphCurrentComp === summaryComp"
        class="w-full summery-inner-body flex-grow bg-white rounded-b-2xl pt-3.5"
      >
        <!-- <div class="flex justify-end items-center sticky top-3.5 pr-3.5 pb-1.5 cursor-pointer">
          <img
            class="h-5"
            :src="require('~/assets/img/svg/expand.svg')"
            alt
            @click="
              store.setCurrentComp({
                currentComp: 'SummaryTable',
                previousCurrentComp: currentComp,
              })
            "
          />
        </div>-->
        <div
          class="w-full h-full overflow-auto scroll pb-5 cursor-pointer"
          @click.stop="
            summaryComp !== 'SummaryAllFeedsTable' &&
            summaryComp !== 'SummaryAllFlagsORTable' &&
            summaryComp !== 'SummaryAllFlagsCRTable'
              ? currentComp !== 'SummaryTable'
                ? store.setCurrentComp({
                    currentComp: 'SummaryTable',
                    previousCurrentComp: currentComp,
                  })
                : store.backToCurrentComp(previousCurrentComp[0])
              : !showHideFullSummaryTable
              ? store.setShowFullSummaryTable()
              : store.setHideFullSummaryTable()
          "
        >
          <transition name="dynamicComp" mode="out-in">
            <component :is="summaryComp"></component>
          </transition>
          <div
            class="text-center flex justify-center items-center sticky top-0 left-0 pt-4 cursor-pointer"
            @click.stop="
              pieSeries.length > 0
                ? ''
                : store.setCurrentComp({
                    currentComp: 'SummaryTable',
                    previousCurrentComp: currentComp,
                  })
            "
          >
            <PieChart class />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import SummaryAllFeedsTable from '~/components/alert/summary/SummaryAllFeedsTable.vue'
import SummaryIndividualFeedsTable from '~/components/alert/summary/SummaryIndividualFeedsTable.vue'
import SummaryIndividualSocialFeedsTable from '~/components/alert/summary/SummaryIndividualSocialFeedsTable.vue'
import SummaryIndividualSocialFeedDetails from '~/components/alert/summary/SummaryIndividualSocialFeedDetails.vue'
import SummaryGroupsTable from '~/components/alert/summary/SummaryGroupsTable.vue'
import SummaryAllFlagsORTable from '~/components/alert/summary/SummaryAllFlagsORTable.vue'
import SummaryFlagPersonsORTable from '~/components/alert/summary/SummaryFlagPersonsORTable.vue'
import SummaryAllFlagsCRTable from '~/components/alert/summary/SummaryAllFlagsCRTable.vue'
import SummaryTeamCRTable from '~/components/alert/summary/SummaryTeamCRTable.vue'
import SummaryPersonCRTable from '~/components/alert/summary/SummaryPersonCRTable.vue'
import AllFeedsOpenArea from '~/components/alert/dynamic-component/AllFeedsOpenArea.vue'
import PieChart from '~/components/alert/summary/PieChart.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    // dynamic Summary Components
    SummaryAllFeedsTable,
    SummaryIndividualFeedsTable,
    SummaryIndividualSocialFeedsTable,
    SummaryIndividualSocialFeedDetails,
    SummaryGroupsTable,
    SummaryAllFlagsORTable,
    SummaryFlagPersonsORTable,
    SummaryAllFlagsCRTable,
    SummaryTeamCRTable,
    SummaryPersonCRTable,
    // dynamic Components
    AllFeedsOpenArea,
    PieChart,
  },
  setup() {
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    const store = useAlert()
    const {
      graphCurrentComp,
      summaryComp,
      currentComp,
      isGraphExpanded,
      pieSeries,
      previousCurrentComp,
      showHideFullSummaryTable,
      hideGraphTable,
      showSummaryTableData,
    } = storeToRefs(store)

    // const isGraphExpanded = ref(true)
    const toggleExpand = () => {
      isGraphExpanded.value = !isGraphExpanded.value
    }

    const expandSummaryTable = () => {
      isGraphExpanded.value = false
    }

    onMounted(() => {
      store.setSummaryComponent({
        summaryComp: summaryComp.value,
        previousSummaryComp: '',
      })
      store.setGraphCurrentCom(graphCurrentComp.value)
    })

    const breakpoints = useBreakpoints({
      medium: 1280,
      tab: 768,
    })

    return {
      isDesktop: tailwindBreakpoints.greater('md'),
      isMediumTab: breakpoints.between('tab', 'medium'),
      isLarge: tailwindBreakpoints.greater('xl'),
      graphCurrentComp,
      summaryComp,
      currentComp,
      pieSeries,
      store,
      isGraphExpanded,
      toggleExpand,
      expandSummaryTable,
      previousCurrentComp,
      showHideFullSummaryTable,
      hideGraphTable,
      showSummaryTableData,
    }
  },
  computed: {
    // ...mapState(useAlert, ['graphCurrentComp', 'summaryComp']),
  },
  watch: {
    isDesktop(data) {
      if (data) {
        this.store.setGraphCurrentCom('AllFeedsOpenArea')
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.medium-decice-height {
  height: calc(100% - 58px);
}
.full-height {
  height: 100%;
}
.max-width-550 {
  width: 30%;
  // max-width: 550px;
}
.max-w-550 {
  // width: 30%;
  max-width: 550px;
}
.graph-table-width {
  width: 70%;
  min-width: 70%;
}

.toggle-icon {
  top: 4px;
  @apply absolute right-4 text-white;
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

/* for dynamic Components */
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.pichart-enter-active,
.pichart-leave-active {
  transition: opacity 0.5s;
}
.pichart-enter,
.pichart-leave-to {
  opacity: 0;
}
.pichart-enter-active {
  transition-delay: 0.3s;
}

.scroll {
  scrollbar-color: #a22a2a #ececec; /* Firefox 64 */

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #a22a2a;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #a22a2a;
  }
}

.inner-body-scroll {
  overflow-x: hidden;
  scrollbar-color: #a22a2a #ececec; /* Firefox 64 */

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #a22a2a;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #a22a2a;
  }
}

.summery-height {
  height: calc(100% - 26px);
}
.inner-body {
  height: calc(100% - 40px);
}
.graph-table-width {
  width: 70%;
  min-width: 70%;
}
.body-outline {
  outline: 1px solid #a22a2a;
  outline-offset: -1px;
  border-radius: 16px;
}
.active-feed-menu {
  outline: 1px solid #a22a2a;
  outline-offset: -1px;
  @apply text-red-deep;
}
.mobile-inner-body {
  height: calc(100% - 56px);
}
.summery-inner-body {
  height: calc(100% - 76px);
}
@media (max-width: 1279px) {
  .graph-table-width {
    width: 100%;
    min-width: 100%;
  }
}
@media (max-width: 1279px) {
  .max-width-550 {
    width: 100%;
    max-width: 100%;
  }
}
.min-height-38 {
  min-height: 38%;
}
</style>
