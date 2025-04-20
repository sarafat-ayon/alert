<template>
  <div class="h-full overflow-hidden rounded-2xl">
    <div class="flex flex-col flex-grow h-full rounded-2xl">
      <div class="w-full py-5 bg-red-deep rounded-t-2xl"></div>
      <div class="w-full inner-body flex-grow bg-white rounded-b-2xl pt-3">
        <div class="overflow-auto scroll pl-5 pb-3 h-full">
          <table class="text-xl min-w-full">
            <thead>
              <tr class="whitespace-nowrap">
                <th class="th-cell"></th>
                <th class="th-cell">Alert Name</th>
                <th class="th-cell">Flagged</th>
                <th class="th-cell">Open Time</th>
                <th class="th-cell">Confidence</th>
                <th class="th-cell">Severity</th>
                <th class="th-cell">Feed Source</th>
                <th class="th-cell">Account</th>
                <th class="th-cell">Group</th>
                <th class="th-cell">Flagged Text</th>
                <th class="th-cell">Confirmation</th>
                <th class="th-cell last-cell">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              <tr class="whitespace-nowrap">
                <td class="td-cell">1</td>
                <td class="td-cell">Promissory Statements</td>
                <td class="td-cell">8/1/2021 8:33 am</td>
                <td class="td-cell">14:15:34</td>
                <td class="td-cell">0.951</td>
                <td class="td-cell">0.91</td>
                <td class="td-cell">Twitter</td>
                <td class="td-cell">@bobsmith</td>
                <td class="td-cell">Bob Smith</td>
                <td class="td-cell">"...cupidatat non..."</td>
                <td class="td-cell">Uncertain</td>
                <td class="td-cell">Jane Smith</td>
              </tr>
              <tr class="whitespace-nowrap">
                <td class="td-cell">2</td>
                <td class="td-cell">Unsubstantiated Clims</td>
                <td class="td-cell">8/1/2021 3:05 am</td>
                <td class="td-cell">08:03:17</td>
                <td class="td-cell">0.837</td>
                <td class="td-cell">0.81</td>
                <td class="td-cell">Facebook</td>
                <td class="td-cell">@abc_company</td>
                <td class="td-cell">ABC Company</td>
                <td class="td-cell">"...sint occaecat..."</td>
                <td class="td-cell">Uncertain</td>
                <td class="td-cell">Jane Smith</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  setup() {},
  date() {
    return {}
  },
})
</script>


<style  lang="scss" scoped>
.inner-body {
  height: calc(100% - 40px);
}

.max-w-118 {
  max-width: 550px;
}

table tr th {
  @apply px-6 py-1.5 whitespace-nowrap text-red-deep text-left;
}
table tr th:first-child {
  @apply px-0 pr-6 whitespace-nowrap;
}
table tr th:last-child {
  @apply pr-5 pl-6 whitespace-nowrap;
}
table tr td {
  @apply px-6 py-1.5 whitespace-nowrap text-gray-1200 text-left;
}
table tr td:first-child {
  @apply px-0 pr-6 pb-2.5;
}
table tr td:second-child {
  @apply pb-0 pt-2;
}
table tr td:last-child {
  @apply px-0 pl-6;
}

.action-icon {
  @apply pl-5;
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

.last-cell {
  padding-right: 20px !important;
}
</style>