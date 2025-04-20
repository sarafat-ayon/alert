<template>
  <section @click.stop="">
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
          <th colspan="2" class="w-1/2 p-1 pb-1.5 md:p-2"></th>
          <th
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
          >
            Open Flags
          </th>
          <th
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right"
          >
            Unreviewed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(severityIndex, index) in severityIndexes" :key="index">
          <td
            colspan="2"
            class="w-1/2 text-base md:text-xl text-gray-1200 whitespace-nowrap p-1 md:p-2 cursor-pointer"
            @dblclick.stop="setSummaryComp('SummaryIndividualSocialFeedsTable')"
          >
            {{ severityIndex.SocialInfo }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.OpenFlag }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.Unreviewed }}%
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useSummaryComp } from '~/composables/feeds/useSummaryComp'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  setup() {
    const severityIndexes = [
      { SocialInfo: 'Social Media', OpenFlag: 61, Unreviewed: 54.8 },
      { SocialInfo: 'Text', OpenFlag: 18, Unreviewed: 17.0 },
      { SocialInfo: 'IM and Collaboration', OpenFlag: 51, Unreviewed: 82.1 },
      { SocialInfo: 'Email', OpenFlag: 31, Unreviewed: 65.5 },
      { SocialInfo: 'Websites', OpenFlag: 3, Unreviewed: 33.3 },
      { SocialInfo: 'Voice', OpenFlag: 7, Unreviewed: 100 },
    ]
    // const AllFeeds = [
    //   {
    //     AllFlags: 908,
    //     ClosedFlags: 784,
    //     ResponseTime: '0:06:58',
    //     ResponseScore: 245,
    //     FalseFlags: 32.8,
    //     TrueFlags: 67.2,
    //     TrueWithNotes: 89.1,
    //     OpenFlag: 124,
    //     OpenTime: '0:12:58',
    //     InReview: 17.9,
    //     Unreviewed: 102,
    //   },
    // ]
    // const severityIndexes = [
    //   {
    //     Range: '0.00 - 0.20',
    //     AllFlags: 5,
    //     ClosedFlags: 5,
    //     ResponseTime: '0:24:58',
    //     ResponseScore: 50,
    //     FalseFlags: 2.9,
    //     TrueFlags: 97.1,
    //     TrueWithNotes: 100,
    //     OpenFlag: 0,
    //     OpenTime: '0:31:12',
    //     InReview: 45.2,
    //     Unreviewed: 54.8,
    //   },
    //   {
    //     Range: '0.20 - 0.40',
    //     AllFlags: 5,
    //     ClosedFlags: 5,
    //     ResponseTime: '0:24:58',
    //     ResponseScore: 50,
    //     FalseFlags: 2.9,
    //     TrueFlags: 97.1,
    //     TrueWithNotes: 100,
    //     OpenFlag: 18,
    //     OpenTime: '0:31:12',
    //     InReview: 45.2,
    //     Unreviewed: 17.0,
    //   },
    //   {
    //     Range: '0.40 - 0.60',
    //     AllFlags: 5,
    //     ClosedFlags: 5,
    //     ResponseTime: '0:24:58',
    //     ResponseScore: 50,
    //     FalseFlags: 2.9,
    //     TrueFlags: 97.1,
    //     TrueWithNotes: 100,
    //     OpenFlag: 51,
    //     OpenTime: '0:31:12',
    //     InReview: 45.2,
    //     Unreviewed: 82.1,
    //   },
    //   {
    //     Range: '0.60 - 0.80',
    //     AllFlags: 5,
    //     ClosedFlags: 5,
    //     ResponseTime: '0:24:58',
    //     ResponseScore: 50,
    //     FalseFlags: 2.9,
    //     TrueFlags: 97.1,
    //     TrueWithNotes: 100,
    //     OpenFlag: 31,
    //     OpenTime: '0:31:12',
    //     InReview: 45.2,
    //     Unreviewed: 65.5,
    //   },
    //   {
    //     Range: '0.80 - 1.00',
    //     AllFlags: 5,
    //     ClosedFlags: 5,
    //     ResponseTime: '0:24:58',
    //     ResponseScore: 50,
    //     FalseFlags: 2.9,
    //     TrueFlags: 97.1,
    //     TrueWithNotes: 100,
    //     OpenFlag: 3,
    //     OpenTime: '0:31:12',
    //     InReview: 45.2,
    //     Unreviewed: 33.3,
    //   },
    // ]
    const { setSummaryComp } = useSummaryComp()

    const store = useAlert()
    const {
      summaryComp,
      currentComp,
      showSummaryTableData,
      showHideFullSummaryTable,
    } = storeToRefs(store)

    return {
      // severityIndexes,
      setSummaryComp,
      summaryComp,
      currentComp,
      store,
      showSummaryTableData,
      // AllFeeds,
      severityIndexes,
      // : computed(() =>
      //   showSummaryTableData ? severityIndexes : smallSeverityIndexes
      // ),
      // smallSeverityIndexes,
      showHideFullSummaryTable,
    }
  },
  computed: {},
})
</script>

<style scoped>
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
