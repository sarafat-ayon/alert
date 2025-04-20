<template>
  <div
    ref="content__wrapper"
    class="content__tabs flex justify-center items-center w-full"
  >
    <div
      ref="menu__wrapper"
      class="
        menu__wrapper
        relative
        flex
        items-center
        h-full
        2xl:flex-nowrap
        flex-wrap
        md:justify-center
        justify-center
        tab-bottom-margin
      "
    >
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          top: `${offsetTopPx}px`,
          width: `${backgroundWidth + 1}px`,
        }"
      ></div>
      <div
        ref="current"
        :class="activeComponent === 'Current' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="0"
        @click="
          showTabMenu('Current', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('Current'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >Current</span
        >
      </div>
      <div
        ref="1 Month"
        :class="activeComponent === '1 Month' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="1"
        @click="
          showTabMenu('1 Month', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('1 Month'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >1 Month</span
        >
      </div>
      <div
        ref="6 Months"
        :class="activeComponent === '6 Months' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="2"
        @click="
          showTabMenu('6 Months', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('6 Months'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >6 Months</span
        >
      </div>
      <div
        ref="YTD"
        :class="activeComponent === 'YTD' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="3"
        @click="
          showTabMenu('YTD', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('YTD'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >YTD</span
        >
      </div>
      <div
        ref="1 Year"
        :class="activeComponent === '1 Year' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="4"
        @click="
          showTabMenu('1 Year', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('1 Year'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >1 Year</span
        >
      </div>
      <div
        ref="3 Years"
        :class="activeComponent === '3 Years' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="5"
        @click="
          showTabMenu('3 Years', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('3 Years'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >3 Years</span
        >
      </div>
      <div
        ref="5 Years"
        :class="activeComponent === '5 Years' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="6"
        @click="
          showTabMenu('5 Years', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('5 Years'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >5 Years</span
        >
      </div>
      <div
        ref="Max"
        :class="activeComponent === 'Max' ? 'active' : ''"
        class="tab cursor-pointer rounded-full text-center h-auto py-1"
        data-index="7"
        @click="
          showTabMenu('Max', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('Max'),
            vCalenderHide()
        "
      >
        <span
          class="
            pointer-events-none
            px-4
            xl:text-lg
            md:text-md
            text-sm
            font-bold
          "
          >Max</span
        >
      </div>
      <div
        ref="Date Range"
        :class="activeComponent === 'Date Range' ? 'active' : ''"
        class="
          tab
          cursor-pointer
          rounded-full
          text-center
          h-auto
          py-1
          date-range
          flex flex-nowrap
          items-center
          px-4
          space-x-2
          z-10
        "
        data-index="8"
        @click="
          showTabMenu('Date Range', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            store.setCurrentDateRange('Date Range'),
            vCalenderShow()
        "
        @mouseleave.stop="vCalenderHide()"
      >
        <span
          class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
          >Date Range</span
        >
        <span><DateRangeIcon class="w-5 h-5 text-gray-1200" /></span>
        <div
          class="
            md:w-100
            w-full
            shadow-xl
            bottom-36
            right-0
            z-999999
            cursor-pointer
            bg-white
            rounded-3xl
            border-top
          "
          :class="
            showVCelander
              ? 'md:absolute fixed group-hover:block'
              : 'hidden absolute'
          "
        >
          <v-calender-with-preset
            scroll-color="#A22A2A"
            border-color="#A22A2A00"
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { mapState } from 'vuex'
import { format, parseISO } from 'date-fns'
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import DateRangeIcon from '~/components/shared/icon/DateRangeIcon.vue'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import { useAlert } from '~/stores/alert'

const pastMonthPlaceholder = (start, end, dateFormat) => {
  return (
    format(parseISO(start), dateFormat) +
    ' - ' +
    format(parseISO(end), dateFormat)
  )
}

export default defineComponent({
  name: 'DateRangeTab',
  components: {
    DateRangeIcon,
    VCalenderWithPreset,
  },
  setup() {
    const store = useAlert()
    const vueStore = useStore()
    const { currentDateRange, startDate, endDate } = storeToRefs(store)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      offsetTopPx,
      activeComponent,
      backgroundWidth,
    } = useTab(currentDateRange.value)
    return {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      offsetTopPx,
      activeComponent,
      backgroundWidth,
      currentDateRange,
      startDate,
      endDate,
      vueStore,
      squeeze: computed(() => vueStore.state.mobile.header.squeeze),
      store,
    }
  },
  data() {
    return {
      showVCelander: false,
      allDates: 'All Dates',
      allDatesValue: '',
    }
  },
  computed: {
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
  },
  watch: {
    // currentComponent(data) {
    //   if (data === 'System') {
    //     this.$refs.system.click()
    //   }
    // },
    squeeze(data) {
      const activeLink = this.$refs.menu__wrapper.querySelector('.tab.active')
      setTimeout(() => {
        this.tab(activeLink)
      }, 850)
    },
  },
  mounted() {
    // const hash = this.$route.hash.split('#')[1]
    // if (hash) {
    //   setTimeout(() => {
    //     this.$refs[hash].click()
    //   }, 1000)
    // }
    const activeLink = this.$refs.menu__wrapper.querySelector('.tab.active')
    this.tab(activeLink)
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
        'dd MMM yyyy'
      )
      const tempArray = this.allDates.split(' -')
      this.startDate = tempArray[0]
      this.endDate = tempArray[1]
      this.allDatesValue = ''
    },
    pastMonthsValue(pastmonth) {
      this.allDates = pastmonth.text
      this.allDatesValue = pastmonth.value
      this.startDate = ''
      this.endDate = ''
    },
  },
})
</script>
<style lang="scss" scoped>
.content__tabs {
  position: relative;
  .background__circle {
    top: 0px;
    left: 0px;
    // z-index: -1;
    transition: width 0.3s ease-in-out 0.2s, left 0.5s ease-in-out,
      top 0.5s ease-in-out;
    // z-index: 1;
    @apply absolute h-9 rounded-full inline-block;
  }
  .tab {
    // width: 10.625%;
    @apply relative whitespace-nowrap flex justify-center items-center h-9;
    > span {
      position: relative;
      transition: color 0.2s ease-in-out;
      z-index: 10;
      @apply text-gray-1200;
    }
    // span > svg > .cls-1 {
    //   fill: #505050;
    // }
    &.active {
      > span {
        @apply text-white;
      }
      // span > svg > .cls-1 {
      //   fill: #ffffff;
      // }
    }
  }
}
.date-range {
  //   width: 15% !important;
}

.bottom-36 {
  bottom: 36px;
}

@media (min-height: 600px) and (max-height: 800px) {
  .tab-bottom-margin {
    margin-bottom: 16px;
  }
}

@media (max-width: 767px) {
  .bottom-36 {
    bottom: 68px;
    height: 60%;
  }
  .tab-bottom-margin {
    margin-bottom: 0px;
  }
}
</style>
