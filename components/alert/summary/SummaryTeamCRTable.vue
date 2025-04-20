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
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right"
          >
            Closed
          </th>
          <th
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:p-2 text-right whitespace-nowrap"
          >
            Response Time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.SocialIndividualDetails">
          <td
            colspan="2"
            class="w-1/2 text-base md:text-xl text-gray-1200 whitespace-nowrap p-1 md:p-2 cursor-pointer"
            @dblclick.stop="setSummaryComp('SummaryPersonCRTable')"
          >
            {{ team.SocialIndividualDetails }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ team.Closed }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ team.responseTime }}
          </td>
        </tr>
        <tr>
          <td
            colspan="3"
            class="w-full text-base md:text-xl text-red-deep font-bold p-1 md:p-2"
          >
            Severity Index
          </td>
        </tr>
        <tr v-for="(severityIndex, index) in severityIndexes" :key="index">
          <td
            colspan="2"
            class="w-1/2 text-base md:text-xl text-gray-1200 whitespace-nowrap p-1 md:p-2 cursor-pointer"
            @click.stop="severityIndexValue(severityIndex.Range)"
          >
            {{ severityIndex.Range }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.Closed }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.responseTime }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import { useSummaryComp } from '~/composables/feeds/useSummaryComp'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  setup() {
    const teams = [
      {
        SocialIndividualDetails: 'Team 1',
        Closed: 33,
        responseTime: '0:06:43',
      },
      {
        SocialIndividualDetails: 'Team 2',
        Closed: 20,
        responseTime: '0:21:11',
      },
      {
        SocialIndividualDetails: 'Team 3',
        Closed: 50,
        responseTime: '0:15:04',
      },
    ]

    const severityIndexes = [
      { Range: '0.00 - 0.20', Closed: 0, responseTime: '0:32:52' },
      { Range: '0.20 - 0.40', Closed: 18, responseTime: '0:21:08' },
      { Range: '0.40 - 0.60', Closed: 51, responseTime: '0:13:17' },
      { Range: '0.60 - 0.80', Closed: 31, responseTime: '0:06:22' },
      { Range: '0.80 - 1.00', Closed: 3, responseTime: '0:03:11' },
    ]
    const { setSummaryComp } = useSummaryComp()

    const store = useAlert()
    const {
      summaryComp,
      startValue,
      endValue,
      currentComp,
      showHideFullSummaryTable,
    } = storeToRefs(store)

    const severityIndexValue = (value) => {
      const array = value.split(' - ')
      startValue.value = (array[0] * 100).toString()
      endValue.value = (array[1] * 100).toString()
    }

    return {
      teams,
      severityIndexes,
      setSummaryComp,
      summaryComp,
      severityIndexValue,
      currentComp,
      store,
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
