<template>
  <div
    class="wrapper text-lg font-bold w-full group cursor-pointer"
    @click="vCalenderShow()"
    @mouseleave.stop="vCalenderHide()"
  >
    <select-input
      id="allDates"
      v-model="allDates"
      class="pointer-events-none"
      class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
      :place-holder="allDates"
      color="#F8F8F8"
      value="Past Year"
      background="#A22A2A"
      caret-bg="#A22A2A"
      scroll-color="#5b5fcc"
    >
    </select-input>
    <div
      class="
        w-full md:w-100
        shadow-xl
        absolute
        top-14
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
        scroll-color="#A22A2A"
        border-color="#A22A2A"
        :show-v-celander="showVCelander"
        :height="370"
        header-bg-color="bg-red-deep"
        sidebar-hover-class="hover:bg-red-deep hover:text-white"
        sidebar-active-color="bg-red-deep text-white"
        date-picker-color="alert"
        content-body-color="bg-red-deep"
        content-body-hover-color="hover:bg-white hover:text-red-deep"
        content-body-active-color="bg-white text-red-deep"
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
  width: 240px;
  height: 44px;
}
.selectSearch {
  width: 240px;
  height: 36px;
}
</style>
