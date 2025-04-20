<template>
  <section @click.stop>
    <table class="min-w-full">
      <thead>
        <tr
          class="cursor-pointer"
          @click.stop="
            !showHideFullSummaryTable
              ? store.setShowFullSummaryTable()
              : store.setHideFullSummaryTable()
          "
        >
          <th
            :class="!showSummaryTableData ? 'w-1/2 p-1 pb-1.5 md:p-2' : ''"
          ></th>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="te‰xt-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              All Flags
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              Closed Flags
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              Response Time
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              Response Score
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              False Flags
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              True Flags
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              True With Notes
            </th>
          </transition>
          <th
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
          >
            Open Flags
          </th>
          <th
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
          >
            Open Time
          </th>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
            >
              In Review
            </th>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <th
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right"
            >
              Unreviewed
            </th>
          </transition>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(AllFeed, index) in AllFeeds" :key="`AllFeeds${index}`">
          <td
            class="text-base md:text-xl text-gray-1200 whitespace-nowrap p-1 pb-2 md:p-2 cursor-pointer"
            @dblclick.stop="
              !showHideFullSummaryTable
                ? setSummaryComp('SummaryFlagPersonsORTable')
                : ''
            "
          >
            All Flags
          </td>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.AllFlags }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.ClosedFlags }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.ResponseTime }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.ResponseScore }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.FalseFlags }}%
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.TrueFlags }}%
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.TrueWithNotes }}%
            </td>
          </transition>
          <td
            class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
          >
            {{ AllFeed.OpenFlag }}
          </td>
          <td
            class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
          >
            {{ AllFeed.OpenTime }}
          </td>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.InReview }}%
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 pb-2 md:p-2 text-right"
            >
              {{ AllFeed.Unreviewed }}
            </td>
          </transition>
        </tr>

        <tr>
          <td
            class="whitespace-nowrap text-base md:text-xl text-red-deep font-bold p-1 md:p-2"
          >
            Severity Index
          </td>
        </tr>

        <tr
          v-for="(severityIndex, index) in severityIndexes"
          :key="`severityIndexes${index}`"
        >
          <td
            class="text-base md:text-xl text-gray-1200 whitespace-nowrap p-1 md:p-2 cursor-pointer"
            @click="severityIndexValue(severityIndex.Range)"
          >
            {{ severityIndex.Range }}
          </td>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.AllFlags }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.ClosedFlags }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.ResponseTime }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.ResponseScore }}
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.FalseFlags }}%
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.TrueFlags }}%
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.TrueWithNotes }}%
            </td>
          </transition>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.OpenFlag }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.OpenTime }}
          </td>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.InReview }}%
            </td>
          </transition>
          <transition name="fadeIn" mode="out-in">
            <td
              v-if="showSummaryTableData"
              class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right"
            >
              {{ severityIndex.Unreviewed }}%
            </td>
          </transition>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useSummaryComp } from '~/composables/feeds/useSummaryComp'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  setup() {
    const smallSeverityIndexes = [
      { Range: '0.00 - 0.20', OpenFlag: 0, OpenTime: '0:32:52' },
      { Range: '0.20 - 0.40', OpenFlag: 18, OpenTime: '0:21:08' },
      { Range: '0.40 - 0.60', OpenFlag: 51, OpenTime: '0:13:17' },
      { Range: '0.60 - 0.80', OpenFlag: 31, OpenTime: '0:06:22' },
      { Range: '0.80 - 1.00', OpenFlag: 3, OpenTime: '0:03:11' },
    ]
    const AllFeeds = [
      {
        AllFlags: 908,
        ClosedFlags: 784,
        ResponseTime: '0:06:58',
        ResponseScore: 245,
        FalseFlags: 32.8,
        TrueFlags: 67.2,
        TrueWithNotes: 89.1,
        OpenFlag: 124,
        OpenTime: '0:12:58',
        InReview: 17.9,
        Unreviewed: 102,
      },
    ]
    const SmallAllFeeds = [
      {
        // AllFlags: 908,
        // ClosedFlags: 784,
        // ResponseTime: '0:06:58',
        // ResponseScore: 245,
        // FalseFlags: 32.8,
        // TrueFlags: 67.2,
        // TrueWithNotes: 89.1,
        OpenFlag: 124,
        OpenTime: '0:12:58',
        // InReview: 17.9,
        // Unreviewed: 82.1,
      },
    ]
    const severityIndexes = [
      {
        Range: '0.00 - 0.20',
        AllFlags: 5,
        ClosedFlags: 5,
        ResponseTime: '0:24:58',
        ResponseScore: 50,
        FalseFlags: 2.9,
        TrueFlags: 97.1,
        TrueWithNotes: 100,
        OpenFlag: 0,
        OpenTime: '0:32:52',
        InReview: 45.2,
        Unreviewed: 54.8,
      },
      {
        Range: '0.20 - 0.40',
        AllFlags: 5,
        ClosedFlags: 5,
        ResponseTime: '0:24:58',
        ResponseScore: 50,
        FalseFlags: 2.9,
        TrueFlags: 97.1,
        TrueWithNotes: 100,
        OpenFlag: 18,
        OpenTime: '0:21:08',
        InReview: 45.2,
        Unreviewed: 17.0,
      },
      {
        Range: '0.40 - 0.60',
        AllFlags: 5,
        ClosedFlags: 5,
        ResponseTime: '0:24:58',
        ResponseScore: 50,
        FalseFlags: 2.9,
        TrueFlags: 97.1,
        TrueWithNotes: 100,
        OpenFlag: 51,
        OpenTime: '0:13:17',
        InReview: 45.2,
        Unreviewed: 82.1,
      },
      {
        Range: '0.60 - 0.80',
        AllFlags: 5,
        ClosedFlags: 5,
        ResponseTime: '0:24:58',
        ResponseScore: 50,
        FalseFlags: 2.9,
        TrueFlags: 97.1,
        TrueWithNotes: 100,
        OpenFlag: 31,
        OpenTime: '0:06:22',
        InReview: 45.2,
        Unreviewed: 65.5,
      },
      {
        Range: '0.80 - 1.00',
        AllFlags: 5,
        ClosedFlags: 5,
        ResponseTime: '0:24:58',
        ResponseScore: 50,
        FalseFlags: 2.9,
        TrueFlags: 97.1,
        TrueWithNotes: 100,
        OpenFlag: 3,
        OpenTime: '0:03:11',
        InReview: 45.2,
        Unreviewed: 33.3,
      },
    ]
    const { setSummaryComp } = useSummaryComp()

    const store = useAlert()
    const {
      summaryComp,
      startValue,
      endValue,
      currentComp,
      showHideFullSummaryTable,
      showSummaryTableData,
    } = storeToRefs(store)

    const severityIndexValue = (value) => {
      const array = value.split(' - ')
      startValue.value = (array[0] * 100).toString()
      endValue.value = (array[1] * 100).toString()
    }

    return {
      AllFeeds: computed(() =>
        showSummaryTableData ? AllFeeds : SmallAllFeeds
      ),
      severityIndexes: computed(() =>
        showSummaryTableData ? severityIndexes : smallSeverityIndexes
      ),
      setSummaryComp,
      summaryComp,
      severityIndexValue,
      currentComp,
      store,
      showHideFullSummaryTable,
      showSummaryTableData,
    }
  },
  computed: {},
})
</script>

<style scoped>
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-active {
  transition-delay: 0.3s;
}
table tr th {
  @apply px-2;
}
table tr th:first-child {
  @apply pl-6;
}
table tr th:last-child {
  @apply pr-6;
}
@media (max-width: 768px) {
  table tr th:first-child {
    padding-left: 14px;
  }
  table tr th:last-child {
    padding-right: 14px;
  }
}
table tr td {
  @apply px-2;
}
table tr td:first-child {
  @apply pl-6;
}
table tr td:last-child {
  @apply pr-6;
}
@media (max-width: 768px) {
  table tr td:first-child {
    padding-left: 14px;
  }
  table tr td:last-child {
    padding-right: 14px;
  }
}
</style>
