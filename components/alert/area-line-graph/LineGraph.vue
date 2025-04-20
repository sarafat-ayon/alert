<template>
  <div
    class="relative"
    :class="[
      summaryComp === 'SummaryAllFlagsCRTable' ||
      summaryComp === 'SummaryTeamCRTable' ||
      summaryComp === 'SummaryPersonCRTable'
        ? 'graph-height'
        : 'dynamic-height',
    ]"
  >
    <div
      v-if="
        summaryComp === 'SummaryAllFlagsCRTable' ||
        summaryComp === 'SummaryTeamCRTable' ||
        summaryComp === 'SummaryPersonCRTable'
      "
      class="
        flex flex-col
        lg:flex-row lg:items-center
        space-y-3
        lg:space-y-0 lg:space-x-4 lg:pt-3.5
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
        "
      >
        Rolling Average
      </p>

      <div class="flex-grow rounded-full">
        <RollingSlidingBar :bar-id="'rolling-bar'" />
      </div>

      <div
        class="transition-all duration-500 ease-in-out flex self-end space-x-4"
        :class="[
          middleCompareSeries ? 'wrapper' : 'wrapper-squeeze  md:justify-end',
        ]"
      >
        <!-- ]"
        middleCompareSeries && middleCompareSerie1
            ? 'width-117'
            : 'wrapper-squeeze md:justify-end', -->
        <transition name="fadeIn-trendline" mode="out-in">
          <div
            v-if="!hideTrendLine"
            class="flex flex-row items-center space-x-2"
          >
            <label for="Components" class="text-gray-1200 text-lg">
              Trendline
            </label>

            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition-all
                duration-800
                ease-in-out
              "
            >
              <input
                id="trendline"
                v-model="trendLine"
                type="checkbox"
                name="toggle"
                class="
                  toggle-checkbox
                  absolute
                  block
                  rounded-full
                  bg-red-deep
                  appearance-none
                  cursor-pointer
                "
              />

              <label
                for="trendline"
                class="
                  toggle-label
                  block
                  overflow-hidden
                  h-5
                  rounded-full
                  transition-all
                  duration-800
                  ease-in-out
                  bg-ash-default
                  cursor-pointer
                "
              ></label>
            </div>
          </div>
        </transition>
        <!-- :class="!compareSeries ? 'delay-500 ' : 'width-300'" -->
        <div
          class="
            flex flex-row
            items-center
            space-x-2
            justify-end
            transition-all
            duration-500
            ease-in-out
            width-117
          "
        >
          <label for="Components" class="text-gray-1200 text-lg">Compare</label>

          <div
            class="
              relative
              inline-block
              w-9
              align-middle
              select-none
              transition-all
              duration-800
              ease-in-out
            "
          >
            <input
              id="compare"
              v-model="compareSeries"
              type="checkbox"
              name="toggle"
              class="
                toggle-checkbox
                absolute
                block
                rounded-full
                bg-red-deep
                appearance-none
                cursor-pointer
              "
            />

            <label
              for="compare"
              class="
                toggle-label
                block
                overflow-hidden
                h-5
                rounded-full
                transition-all
                duration-800
                ease-in-out
                bg-ash-default
                cursor-pointer
              "
            ></label>
          </div>
        </div>

        <!-- @input="selectedValue($event)" -->

        <transition name="fadeIn-compare" mode="out-in">
          <div v-if="!hideCompareSelectInput" class="compare-input">
            <select-input
              v-model="compareSelectInput"
              class-style-name="searchPageScrollStyle searchPageScrollWidth compare-select-input"
              :options="compareDates"
              place-holder="Previous"
              :place-holder-disabled="false"
              color="white"
              background="#A22A2A"
              caret-bg="#A22A2A"
              scroll-color="#9e7912"
            ></select-input>
          </div>
        </transition>
      </div>
    </div>

    <!-- <p class="text-gray-1200 text-2xl text-center">Line</p> -->

    <LineChart
      class="xl:opacity-100 transition-opacity duration-1000 ease-in-out mt-4"
      :class="isGraphExpanded ? 'delay-700 opacity-100' : 'opacity-0'"
    />

    <transition-group name="fadeIn" mode="out-in">
      <div
        v-if="
          summaryComp !== 'SummaryAllFeedsTable' &&
          summaryComp !== 'SummaryTeamCRTable' &&
          summaryComp !== 'SummaryPersonCRTable' &&
          summaryComp !== 'SummaryGroupsTable' &&
          summaryComp !== 'SummaryAllFlagsORTable' &&
          summaryComp !== 'SummaryAllFlagsCRTable'
        "
        key="chevron-up1"
        class="
          absolute
          top-9
          md:left-26
          left-20
          bg-back-button
          md:w-9
          w-6
          md:h-9
          h-6
          rounded-full
          flex
          items-center
          justify-center
          cursor-pointer
          transition-opacity
          duration-500
          ease-in-out
          opacity-100
        "
        :class="isGraphExpanded ? 'delay-700 opacity-100' : 'opacity-0'"
        @click="enableClick ? bakeToPrevSummaryComp() : ''"
      >
        <fa
          class="arrow-icon text-white md:text-lg text-xs"
          :icon="['fas', 'chevron-up']"
        />
      </div>

      <div
        v-if="
          summaryComp === 'SummaryTeamCRTable' ||
          summaryComp === 'SummaryPersonCRTable'
        "
        key="chevron-up2"
        class="
          absolute
          top-34
          lg:top-20
          left-20
          md:left-26
          bg-back-button
          md:w-9
          w-6
          md:h-9
          h-6
          rounded-full
          flex
          items-center
          justify-center
          cursor-pointer
          transition-opacity
          duration-500
          ease-in-out
          opacity-100
        "
        :class="isGraphExpanded ? 'delay-700 opacity-100' : 'opacity-0'"
        @click="enableClick ? bakeToPrevSummaryComp() : ''"
      >
        <fa
          class="arrow-icon text-white md:text-lg text-xs"
          :icon="['fas', 'chevron-up']"
        />
      </div>
    </transition-group>
  </div>
</template>


<script>
import { mapState, storeToRefs } from 'pinia'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import RollingSlidingBar from '~/components/alert/sliding-bar/RollingSlidingBar.vue'
import SelectInput from '~/components/inputs/SelectInput'
import LineChart from '~/components/alert/area-line-graph/LineChart.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    RollingSlidingBar,
    SelectInput,
    LineChart,
  },

  setup() {
    const enableClick = ref('true')
    const compareDates = [
      { id: 1, text: 'Previous', value: 'Previous' },
      { id: 2, text: 'Teams', value: 'Teams' },
      { id: 3, text: 'Individuals', value: 'Individuals' },
    ]

    const hideTrendLine = ref(false)
    const hideCompareSelectInput = ref(true)
    const middleCompareSeries = ref(false)
    const middleCompareSerie1 = ref(false)

    const store = useAlert()
    const {
      summaryComp,
      compareSeries,
      compareSelectInput,
      trendLine,
      isGraphExpanded,
    } = storeToRefs(store)

    const bakeToPrevSummaryComp = (element) => {
      enableClick.value = false
      store.backToPreviousSummaryComponent({
        summaryComp: store.previousSummaryComp[0],
        // previousSummaryComp: store.state.alert.summaryComp,
      })
      if (
        summaryComp.value === 'SummaryAllFeedsTable' ||
        summaryComp.value === 'SummaryAllFlagsCRTable' ||
        summaryComp.value === 'SummaryAllFlagsORTable'
      ) {
        setTimeout(() => {
          enableClick.value = true
        }, 1000)
      } else {
        setTimeout(() => {
          enableClick.value = true
        }, 200)
      }
    }

    return {
      bakeToPrevSummaryComp,
      compareDates,
      compareSeries,
      compareSelectInput,
      hideTrendLine,
      hideCompareSelectInput,
      middleCompareSeries,
      middleCompareSerie1,
      trendLine,
      isGraphExpanded,
      enableClick,
    }
  },
  computed: {
    ...mapState(useAlert, ['summaryComp', 'previousSummaryComp']),
  },
  watch: {
    compareSeries(data) {
      if (data) {
        this.hideTrendLine = true
        setTimeout(() => {
          this.middleCompareSeries = true
        }, 500)
        setTimeout(() => {
          this.hideCompareSelectInput = false
        }, 1500)
      } else {
        setTimeout(() => {
          this.middleCompareSeries = false
          this.middleCompareSerie1 = true
        }, 500)
        // setTimeout(() => {
        //   this.middleCompareSeries = false
        // }, 1500)
        // setTimeout(() => {
        //   this.middleCompareSerie1 = false
        // }, 1000)
        setTimeout(() => {
          this.hideTrendLine = false
        }, 1500)
        this.hideCompareSelectInput = true
      }
    },
  },
  mounted() {
    this.trendLine = false
    this.compareSeries = false
  },
})
</script>


<style lang="scss" scoped>
/* for FadeIn FadeOut */
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-trendline-enter-active,
.fadeIn-trendline-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-trendline-enter,
.fadeIn-trendline-leave-to {
  opacity: 0;
}
// .fadeIn-trendline-leave-active {
//   transition: opacity 0s;
// }

.fadeIn-compare-enter-active,
.fadeIn-compare-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-compare-enter,
.fadeIn-compare-leave-to {
  opacity: 0;
}
// .fadeIn-compare-leave-active {
//   transition: opacity 0s;
// }

.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #a22a2a;
  }
}
.compare-input {
  width: 167px;
  height: 36px;
}

.bg-back-button {
  background: #d09494;
}
.dynamic-height {
  // height: calc(100% - 107px);
  height: calc(100% - 16px);
}

.graph-height {
  height: calc(100% - 50px);
  // height: 100%;
}

@media (max-width: 1023px) {
  .graph-height {
    height: calc(100% - 100px);
  }
}
.width-117 {
  width: 117px;
}
.wrapper-squeeze {
  width: 250px;
}
.width-300 {
  width: 300px;
}
.wrapper {
  width: 300px;
}

// @media (min-height: 600px) and (max-height: 800px) {
//   .graph-height {
//     height: 100%;
//   }
// }

// @media (min-height: 600px) and (max-height: 800px) {
//   .dynamic-height {
//     height: 100%;
//   }
// }
</style>


