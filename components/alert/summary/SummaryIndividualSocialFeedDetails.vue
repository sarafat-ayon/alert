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
            class="text-base md:text-xl text-gray-1200 font-bold p-1 pb-1.5 md:py-2 md:pl-2 md:pr-4 text-right"
          >
            Unreviewed
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(severityIndex, index) in severityIndexes" :key="index">
          <td
            colspan="2"
            class="w-1/2 text-base md:text-xl text-gray-1200 whitespace-nowrap p-1 md:p-2"
          >
            {{ severityIndex.SocialIndividualDetails }}
          </td>
          <td class="text-base md:text-xl text-gray-1200 p-1 md:p-2 text-right">
            {{ severityIndex.OpenFlag }}
          </td>
          <td
            class="text-base md:text-xl text-gray-1200 p-1 md:py-2 md:pl-2 md:pr-4 text-right"
          >
            {{ severityIndex.Unreviewed }}%
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
    const severityIndexes = [
      {
        SocialIndividualDetails: '@whale-song (Jim Jones)',
        OpenFlag: 16,
        Unreviewed: 61.1,
      },
      {
        SocialIndividualDetails: '@dog-smile (Betsy Bop)',
        OpenFlag: 15,
        Unreviewed: 42.5,
      },
      {
        SocialIndividualDetails: '@pony-phenomenon (Ste...',
        OpenFlag: 10,
        Unreviewed: 51.2,
      },
      {
        SocialIndividualDetails: '@tiger-floss (Suzy Johnso...',
        OpenFlag: 20,
        Unreviewed: 59.9,
      },
      {
        SocialIndividualDetails: '@mouse-massage (Jame...',
        OpenFlag: 20,
        Unreviewed: 59.9,
      },
      {
        SocialIndividualDetails: '@albatros-alchemy (Oleg...',
        OpenFlag: 20,
        Unreviewed: 59.9,
      },
      {
        SocialIndividualDetails: '@elephant-tail (Bob Bury)',
        OpenFlag: 20,
        Unreviewed: 59.9,
      },
      {
        SocialIndividualDetails: '@donkey-delerium (Kendr...',
        OpenFlag: 20,
        Unreviewed: 59.9,
      },
    ]

    const { setSummaryComp } = useSummaryComp()

    const store = useAlert()
    const { summaryComp, currentComp, showHideFullSummaryTable } =
      storeToRefs(store)

    return {
      severityIndexes,
      setSummaryComp,
      summaryComp,
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
