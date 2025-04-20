<template>
  <div class="flex flex-col mt-3">
    <div class="table_wrapper">
      <div class="table-body_wrapper">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  v-for="(item, indexOne) in table.th"
                  :key="indexOne + 'archive-one'"
                  scope="col"
                  class="text-left text-base font-bold"
                >
                  {{ item.name }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(rows, index) in searchTableItems"
                :key="index + 'archive-two'"
                class="rounded-full mt-2"
              >
                <td>
                  <div class="flex flex-row items-center has-tooltip relative">
                    <div class="flex-shrink-0 w-6 mr-2">
                      <img
                        class="w-6 rounded-full"
                        :src="rows.profilePic"
                        :alt="`${rows.name} Profile Picture`"
                      />
                    </div>
                    <div class="text-xl">
                      {{ rows.socialLink | strLimit(11) }}
                    </div>
                    <span
                      v-if="rows.socialLink.length > 11"
                      class="absolute tooltip"
                      :class="
                        index >= searchTableItems.length - 2
                          ? 'tooltip1'
                          : 'tooltip'
                      "
                    >
                      {{ rows.socialLink }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="text-xl">{{ rows.name }}</div>
                </td>
                <td class="text-right whitespace-nowrap">
                  <a
                    :href="rows.download"
                    download
                    data-title="Download"
                    class="mr-0.875 text-green-1100"
                  >
                    <fa :icon="['fas', 'download']" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    table: {
      type: Object,
      default: () => {},
    },
    searchItem: {
      type: String,
      default: '',
    },
  },
  computed: {
    searchTableItems() {
      return this.table.tbody.filter((item) => {
        return (
          item.socialLink.toUpperCase().match(this.searchItem.toUpperCase()) ||
          item.name.toUpperCase().match(this.searchItem.toUpperCase())
        )
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.table_wrapper {
  @apply -my-2 sm:-mx-6 lg:-mx-8;
}
.table-body_wrapper {
  @apply py-0
          align-middle
          inline-block
          min-w-full
          sm:px-6
          md:px-8;
}
/* ToolTip Start */
.tooltip {
  margin-left: 60px;
  margin-top: 58px;
  background-color: #059669;
  @apply invisible absolute rounded py-1 px-2 cursor-pointer;
}
.tooltip1 {
  margin-left: 60px;
  margin-top: -58px;
  background-color: #059669;
  @apply invisible absolute rounded py-1 px-2 cursor-pointer;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
.has-tooltip1:hover .tooltip1 {
  @apply visible z-50;
}
/*  Table Head  */
table thead tr th {
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  color: #505050;
  letter-spacing: 0;
  @apply px-4 py-3 pb-0 text-base;
}

table thead tr th:last-child {
  @apply text-right;
}

/*  Table body  */
table tbody tr td {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-size: 0.875rem;
  color: #656565;
  letter-spacing: 0;
  @apply px-4 py-2 text-base;
}

table tbody tr:hover td {
  background-color: #e4801d;
  color: #ffffff;
}

table tbody tr td:last-child {
  @apply text-green-600;
}

table tbody tr:hover td:last-child {
  color: #ffffff;
}

table tbody tr td:last-child:hover {
  @apply text-white;
}

table tbody tr:hover td:first-child {
  @apply rounded-tl-full rounded-bl-full;
}

table tbody tr:hover td:last-child {
  @apply rounded-tr-full rounded-br-full;
}

.scroll {
  // overflow-y: hidden;
  // overflow-x: hidden;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
[data-title]:after {
  color: orange;
  right: 100%;
}
</style>
