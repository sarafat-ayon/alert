<template>
  <div
    class="wrapper text-lg font-bold relative group cursor-pointer"
    @click="vCalenderShow()"
    @mouseleave.stop="vCalenderHide()"
  >
    <select-input
      id="allDates"
      v-model="allDates"
      class="pointer-events-none selectSearch"
      class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
      :place-holder="allDates"
      color="#F8F8F8"
      value="Past Month"
      background="#e4801d"
      caret-bg="#e4801d"
      scroll-color="#5b5fcc"
    >
    </select-input>
    <div
      class="
        w-100
        shadow-xl
        absolute
        top-13
        right-0
        z-999999
        block
        cursor-pointer
        bg-white
        rounded-3xl
        border-top
      "
    >
      <v-calender-with-preset
        :show-v-celander="showVCelander"
        :height="370"
        header-bg-color="bg-orange-dark"
        sidebar-hover-class="hover:bg-orange-dark hover:text-white"
        sidebar-active-color="bg-orange-dark text-white"
        border-color="#E4801D"
        date-picker-color="home"
        content-body-color="bg-orange-dark"
        content-body-hover-color="hover:bg-white hover:text-orange-dark"
        content-body-active-color="bg-white text-orange-dark"
        @dateRange="pastMonthDateRageEvent"
        @pastmonth="pastMonthsValue"
        @hide-v-calender="vCalenderHide()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { format, parseISO } from 'date-fns'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import SelectInput from '~/components/inputs/SelectInput'

const pastMonthPlaceholder = (start, end, dateFormat) => {
  return (
    format(parseISO(start), dateFormat) +
    ' - ' +
    format(parseISO(end), dateFormat)
  )
}
export default {
  components: {
    VCalenderWithPreset,
    SelectInput,
  },
  data() {
    return {
      showVCelander: false,
      allDates: 'All Dates',
      allDatesValue: '',
      startDate: '',
      endDate: '',
    }
  },
  computed: {
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
  },
  methods: {
    vCalenderShow() {
      this.showVCelander = true
    },
    vCalenderHide() {
      this.showVCelander = false
    },
    pastMonthDateRageEvent(daterange) {
      this.allDates = pastMonthPlaceholder(
        daterange.start,
        daterange.end,
        this.globalDateformat
      )
      this.startDate = daterange.start
      this.endDate = daterange.end
      this.allDatesValue = ''
    },
    pastMonthsValue(pastmonth) {
      this.allDates = pastmonth.text
      this.allDatesValue = pastmonth.value
      this.startDate = ''
      this.endDate = ''
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 11.25rem;
}
.selectSearch {
  max-width: 11.25rem;
  height: 40px;
}
</style>