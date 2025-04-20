<template>
  <div class="h-full overflow-hidden rounded-2xl">
    <div class="flex flex-col flex-grow h-full rounded-2xl">
      <div class="w-full py-5 bg-red-deep rounded-t-2xl"></div>
      <div class="w-full inner-body flex-grow bg-white rounded-b-2xl pt-3">
        <div class="overflow-auto scroll px-5 pb-3 h-full">
          <table class="text-xl">
            <thead>
              <tr class="whitespace-nowrap">
                <th class="th-cell">Group</th>
                <th class="th-cell">Flags</th>
              </tr>
            </thead>
            <tbody>
              <tr class="whitespace-nowrap">
                <td class="td-cell">Bob Smith</td>
                <td class="td-cell">4</td>
              </tr>
              <tr class="whitespace-nowrap">
                <td class="td-cell">ABC Company</td>
                <td class="td-cell">3</td>
              </tr>
              <tr class="whitespace-nowrap">
                <td class="td-cell">Xyz Corporation</td>
                <td class="td-cell">1</td>
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
  @apply px-0 pr-20 whitespace-nowrap;
}

table tr td {
  @apply px-6 py-1.5 whitespace-nowrap text-gray-1200 text-left;
}

table tr td:first-child {
  @apply px-0 pr-20 pb-2.5;
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
</style>