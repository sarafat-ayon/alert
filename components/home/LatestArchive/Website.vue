<template>
  <div class="lg:pb-5 md:pb-9">
    <div class="tableTitle">
      <p class="text-xl">Website</p>
    </div>
    <LatestArchiveWebsiteTable :table="tableData" :search-item="searchItem" />
  </div>
</template>

<script>
import LatestArchiveWebsiteTable from '~/components/home/LatestArchive/LatestArchiveWebsiteTable'

export default {
  components: { LatestArchiveWebsiteTable },
  props: {
    tableData: {
      type: Object,
      default: () => {},
    },
     searchItem: {
      type: String,
    },
  },
}
</script>

<style scoped>
.tableTitle {
  /* font-size: 1.563rem; */
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  letter-spacing: 0;
  color: #e4801d;
}
</style>
