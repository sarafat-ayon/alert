<template>
  <div class="h-full overflow-hidden rounded-2xl">
    <div class="flex flex-col flex-grow h-full md:border-none border border-red-deep rounded-2xl">
      <div
        class="cursor-pointer w-full py-1.5 bg-white md:bg-red-deep rounded-t-2xl text-center h-10 border-b border-red-deep md:border-none"
        @click.stop="store.backToCurrentComp(previousCurrentComp[0])"
      >
        <p class="text-red-deep md:text-white text-base md:text-xl font-bold">Summary</p>
      </div>
      <div
        class="w-full inner-body flex-grow bg-white rounded-b-2xl pt-3 cursor-pointer"
        @click.stop="store.backToCurrentComp(previousCurrentComp[0])"
      >
        <div class="relative overflow-auto scroll pl-5 pb-3 h-full">
          <!-- <div class="sticky top-0 left-90 w-6">
            <div class="w-6">
              <button @click="store.backToCurrentComp(previousCurrentComp[0])">
                <fa
                  class="text-red-deep text-3xl font-light cursor-pointer"
                  :icon="['fas', 'times']"
                />
              </button>
            </div>
          </div>-->

          <table class="mt-1 min-w-full cursor-default" @click.stop>
            <thead>
              <tr
                class="text-base md:text-base text-gray-1200 cursor-pointer"
                @click.stop="store.backToCurrentComp(previousCurrentComp[0])"
              >
                <th></th>
                <th>All Flags</th>
                <th>Closed Flags</th>
                <th>Response Time</th>
                <th>Response Score</th>
                <th>False Flags</th>
                <th>True Flags</th>
                <th>True With Notes</th>
                <th>Open Flag</th>
                <th>Open Time</th>
                <th>In Review</th>
                <th>Unreviewed</th>
              </tr>
            </thead>

            <tbody class="text-base md:text-base text-gray-1200">
              <tr v-for="(AllFeed, index) in AllFeeds" :key="index">
                <td class="py-3">All Feeds</td>
                <td class="py-3">{{ AllFeed.AllFlags }}</td>
                <td class="py-3">{{ AllFeed.ClosedFlags }}</td>
                <td class="py-3">{{ AllFeed.ResponseTime }}</td>
                <td class="py-3">{{ AllFeed.ResponseScore }}</td>
                <td class="py-3">{{ AllFeed.FalseFlags }}%</td>
                <td class="py-3">{{ AllFeed.TrueFlags }}%</td>
                <td class="py-3">{{ AllFeed.TrueWithNotes }}%</td>
                <td class="py-3">{{ AllFeed.OpenFlag }}</td>
                <td class="py-3">{{ AllFeed.OpenTime }}</td>
                <td class="py-3">{{ AllFeed.InReview }}%</td>
                <td class="py-3">{{ AllFeed.Unreviewed }}</td>
              </tr>

              <tr>
                <td class="text-red-deep font-bold pb-3">Severity Index</td>
              </tr>

              <tr v-for="(severityIndex, index) in severityIndexes" :key="index">
                <td>{{ severityIndex.Range }}</td>
                <td>{{ severityIndex.AllFlags }}</td>
                <td>{{ severityIndex.ClosedFlags }}</td>
                <td>{{ severityIndex.ResponseTime }}</td>
                <td>{{ severityIndex.ResponseScore }}</td>
                <td>{{ severityIndex.FalseFlags }}%</td>
                <td>{{ severityIndex.TrueFlags }}%</td>
                <td>{{ severityIndex.TrueWithNotes }}%</td>
                <td>{{ severityIndex.OpenFlag }}</td>
                <td>{{ severityIndex.OpenTime }}</td>
                <td>{{ severityIndex.InReview }}%</td>
                <td>{{ severityIndex.Unreviewed }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    
  </div>-->
</template>

<script>
// import { mapState } from 'vuex'
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  setup() {
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
        OpenTime: '0:31:12',
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
        OpenTime: '0:31:12',
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
        OpenTime: '0:31:12',
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
        OpenTime: '0:31:12',
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
        OpenTime: '0:31:12',
        InReview: 45.2,
        Unreviewed: 33.3,
      },
    ]
    const store = useAlert()

    const { previousCurrentComp } = storeToRefs(store)

    return { AllFeeds, severityIndexes, previousCurrentComp, store }
  },
  computed: {
    // ...mapState('alert', ['summaryComp']),
  },
})
</script>

<style lang="scss" scoped>
.inner-body {
  height: calc(100% - 40px);
}

.max-w-118 {
  max-width: 550px;
}
table {
  padding: 30px 15px;
}
table tr th,
table tr td {
  @apply pr-9 whitespace-nowrap text-right;
}
table tr th:first-child,
table tr td:first-child {
  @apply pr-6;
}
// mediumDesktop:pr-8
table thead tr th:last-child,
table tbody tr td:last-child {
  @apply pr-5;
}
// table tr td {
//   @apply text-right;
// }
table tr td:first-child {
  @apply text-left;
}
.left-90 {
  left: calc(100% - 40px);
  // -webkit-left: 98%;
  // -moz-left: 97%;
}

// @media (max-width: 767px) {
//   .left-90 {
//     left: 88.5%;
//   }
// }
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
</style>
