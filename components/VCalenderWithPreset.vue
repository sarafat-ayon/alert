<template>
  <div
    v-if="showVCelander"
    class="w-full rounded-3xl font-normal text-black h-full relative calender-bubble"
    :style="{ '--borderColor': borderColor, '--scrollColor': scrollColor, '--arrowPositionRight': arrowPositionRight}"
  >
    <div class="arrow_parent">
      <div class="arrow"></div>
    </div>
    <div class="w-full py-3 px-3 rounded-t-2xl" :class="[headerBgColor, headerTextColor]">
      <div class="flex md:justify-between justify-around items-center">
        <div class="relative">
          <v-date-picker
            v-if="loading"
            v-model="dateRange.start"
            :color="datePickerColor"
            is-required
            :masks="{ input: [upperCaseDate] }"
            :model-config="modelConfig"
            :popover="{ visibility: 'click' }"
            @input="startDateTimeEvent"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                readonly
                class="text-right md:w-46 w-44 md:px-3 px-0 mb-2 text-lg font-bold lg:mb-0 bg-transparent text-white outline-none cursor-pointer"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
        </div>
        <div class="md:w-20 w-10 text-center text-white mx-2">
          <fa class="text-white text-2xl font-bold" :icon="['fas', 'minus']" />
        </div>
        <div class="relative">
          <v-date-picker
            v-if="loading"
            v-model="dateRange.end"
            :color="datePickerColor"
            :masks="{ input: [upperCaseDate] }"
            :model-config="modelConfig"
            is-required
            :popover="{ visibility: 'click' }"
            @input="endDateTimeEvent"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                readonly
                class="text-left md:w-46 w-44 md:px-3 px-0 mb-2 text-lg font-bold lg:mb-0 bg-transparent text-white outline-none cursor-pointer"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
        </div>
      </div>
    </div>
    <div class="w-full p-4 body bg-white pt-5 rounded-b-2xl">
      <div class="grid grid-cols-12 md:gap-1 gap-2 w-full">
        <div class="flex flex-col items-start md:col-span-5 col-span-12 space-y-1 w-full">
          <div
            v-for="(timer, timerIndex) in timerCollections"
            :key="timerIndex"
            class="flex items-center justify-between py-1 cursor-pointer rounded-full pl-2 w-full relative"
            :class="[
              currentTimer === timer.value ? sidebarActiveColor : '',
              sidebarHoverClass,
            ]"
            @click="setCurrentTimer(timer.value)"
          >
            <span>{{ timer.text }}</span>
            <template
              v-if="
                currentTimer === timer.value &&
                currentTimer !== 0 &&
                currentTimer === timer.value &&
                currentTimer !== 2
              "
            >
              <fa
                class="text-2xl font-bold cursor-pointer absolute right-2 top-0"
                :icon="['fas', 'sort-down']"
              />
            </template>
          </div>
        </div>
        <div class="md:col-span-7 col-span-12">
          <transition name="fade" mode="out-in">
            <div v-if="dateTimePickerShow" :key="1">
              <v-date-picker
                v-if="loading"
                ref="dateTimePicker"
                v-model="dateRange"
                :color="datePickerColor"
                is-range
                :masks="{ input: [upperCaseDate] }"
                :model-config="modelConfig"
                class="w-full"
                is-expanded
                @input="datePickerEvent"
              />
            </div>

            <div v-if="dateTimePresetItems && (timeCollections || months)" :key="2">
              <div class="mt-3 py-5 px-2 w-full h-64 rounded-xl scroll" :class="contentBodyColor">
                <ul class="space-y-1">
                  <TransitionGroup name="page" mode="out-in">
                    <li
                      v-for="(list, i) in timeCollections"
                      :key="i"
                      class="text-white text-lg list px-3 py-0.5 cursor-pointer rounded-full text-left"
                      :class="[
                        currentTimerLabel === i ? contentBodyActiveColor : '',
                        contentBodyHoverColor,
                      ]"
                      @click="collectTimeLabel(i, list)"
                    >{{ currentTimer === 3 ? list.text : list }}</li>
                  </TransitionGroup>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
  subDays,
  format,
  subMonths,
  subYears,
  startOfYear,
  lastDayOfYear,
  startOfMonth,
  lastDayOfMonth,
  parseISO,
  getYear,
  eachMonthOfInterval,
  subQuarters,
} from 'date-fns'

export default {
  name: 'VCalenderWithPreset',
  props: {
    showVCelander: {
      type: Boolean,
      default: false,
    },
    headerBgColor: {
      type: String,
      default: 'bg-purple-midlight',
    },
    headerTextColor: {
      type: String,
      default: 'text-white',
    },
    sidebarHoverClass: {
      type: String,
      default: 'hover:bg-purple-1000 hover:text-white',
    },
    sidebarActiveColor: {
      type: String,
      default: 'bg-purple-1000 text-white',
    },

    datePickerColor: {
      type: String,
      default: 'purple',
    },
    contentBodyColor: {
      type: String,
      default: 'bg-purple-1000',
    },
    contentBodyHoverColor: {
      type: String,
      default: 'hover:bg-white hover:text-purple-1000',
    },
    contentBodyActiveColor: {
      type: String,
      default: 'bg-white text-purple-1000',
    },
    borderColor: {
      type: String,
      default: '#7D80BD',
    },
    scrollColor: {
      type: String,
      default: '#7d80bd',
    },
    arrowPositionRight: {
      type: String,
      default: '20px',
    },
  },
  data() {
    return {
      dateRange: {
        start: new Date(),
        end: new Date(),
      },
      modelConfig: {
        start: {
          type: 'string',
          mask: this.upperCaseDate,
        },
        end: {
          type: 'string',
          mask: this.upperCaseDate,
        },
      },
      loading: false,
      range: -1,
      dateTimePickerShow: true,
      dateTimePresetItems: false,
      currentTimer: null,
      currentTimerLabel: null,
      currentTimerText: null,
      timeCollections: [],
      timerCollections: [
        {
          text: 'All',
          value: 0,
        },
        {
          text: 'Last',
          value: 1,
        },
        {
          text: 'Year to Date',
          value: 2,
        },
        {
          text: 'Months',
          value: 3,
        },
        {
          text: 'Years',
          value: 4,
        },
      ],
      lastTimerCollection: ['Week', 'Month', 'Quarter', 'Year'],
      defaultDateFormat: 'yyyy-MM-dd',
    }
  },
  computed: {
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
    ...mapState('home', ['getOldJoiningDateTime']),
    currentDateFormat() {
      return this.globalDateformat ?? this.defaultDateFormat
    },
    upperCaseDate() {
      return this.currentDateFormat.toUpperCase()
    },
    years() {
      const years = []
      for (
        let i = new Date().getFullYear();
        i >= getYear(parseISO(this.getOldJoiningDateTime));
        i--
      ) {
        years.push(i)
      }
      return years
    },
    months() {
      let months = eachMonthOfInterval({
        start: new Date(this.getOldJoiningDateTime),
        end: new Date(),
      })
      months = months.map((item) => {
        return {
          text: format(
            item,
            // this.globalDateformat ? this.globalDateformat : 'MMMM dd, yyyy'
            'MMMM yyyy'
          ),
          value: item,
        }
      })
      return months.reverse()
    },
  },
  watch: {
    showVCelander(data) {
      if (data) {
        this.getOldestJoiningDateTime()
      }
    },
  },
  created() {
    this.$nuxt.$on('dateRange', (data) => {
      this.dateRange.start = data.startDate
      this.dateRange.end = data.endDate
    })
    this.$nuxt.$on('clearDatePicker', () => {
      this.dateRange.start = format(new Date(), this.currentDateFormat)
      this.dateRange.end = format(new Date(), this.currentDateFormat)
      this.currentTimer = null
      this.currentTimerLabel = null
      this.currentTimerText = null
      this.timerCollections = [
        {
          text: 'All',
          value: 0,
        },
        {
          text: 'Last',
          value: 1,
        },
        {
          text: 'Year to Date',
          value: 2,
        },
        {
          text: 'Months',
          value: 3,
        },
        {
          text: 'Years',
          value: 4,
        },
      ]
    })
    this.$nuxt.$on('selectAllDateTime', () => {
      this.currentTimer = 0
      this.getAllDateTime()
    })
  },
  mounted() {
    this.modelConfig.start.mask = this.upperCaseDate
    this.modelConfig.end.mask = this.upperCaseDate
    this.dateRange.start = format(new Date(), this.currentDateFormat)
    this.dateRange.end = format(new Date(), this.currentDateFormat)
    this.loading = true
  },
  methods: {
    ...mapActions('home', ['getOldestJoiningDateTime']),
    finalDateFormatValueEmit(start, end) {
      this.$emit('dateRange', {
        start,
        end,
      })
    },
    getDateRange(preset) {
      const start = format(new Date(), 'yyyy-MM-dd')
      this.range = preset
      const end = format(subDays(new Date(), preset), 'yyyy-MM-dd')
      const datepicker = this.$refs.dateTimePicker
      datepicker.updateValue({ start, end })
    },
    datePickerEvent(data) {
      const start = format(new Date(data.start), this.defaultDateFormat)
      const end = format(new Date(data.end), this.defaultDateFormat)
      this.finalDateFormatValueEmit(start, end)
    },
    setCurrentTimer(timer) {
      this.setDefaultTimerCollection()
      this.currentTimer = timer
      this.currentTimerLabel = null
      // this.dateTimePickerShow = !(timer >= 1)
      if (timer === 0) {
        this.getAllDateTime()
      } else if (timer === 1) {
        this.showDateTimePresetItem()
        this.timeCollections = this.lastTimerCollection
      } else if (timer === 2) {
        this.getYearOfDateTime()
      } else if (timer === 3) {
        this.showDateTimePresetItem()
        this.timeCollections = this.months
      } else if (timer === 4) {
        this.showDateTimePresetItem()
        this.timeCollections = this.years
      }

      // this.$emit('pastmonth', { text: 'All', value: -1 })
    },

    collectTimeLabel(index, timeString) {
      this.currentTimerLabel = index
      if (this.currentTimer === 1) {
        this.getLastDateTime(timeString)
      } else if (this.currentTimer === 3) {
        this.getPastMonthsDateTime(timeString)
      } else if (this.currentTimer === 4) {
        this.getPastYearDateTime(timeString)
      }
    },
    getYearOfDateTime() {
      this.timeCollections = null
      this.currentTimerText = null
      this.dateTimePickerShow = false
      const start = startOfYear(new Date())
      const end = new Date()
      setTimeout(() => {
        this.setDateRange(start, end)
      })
    },
    getAllDateTime() {
      this.timeCollections = null
      this.dateTimePickerShow = false
      const start = startOfYear(new Date(Math.min(...this.years), 8, 2, 11, 55))
      const end = new Date()
      setTimeout(() => {
        this.setDateRange(start, end)
      })
    },
    getLastDateTime(timeString) {
      this.currentTimerText = timeString
      if (timeString === 'Week') {
        const end = new Date()
        const start = subDays(new Date(), 6)
        this.setDateRange(start, end)
      } else if (timeString === 'Month') {
        const end = new Date()
        const start = subMonths(new Date(), 1)
        this.setDateRange(start, end)
      } else if (timeString === 'Quarter') {
        const start = subQuarters(new Date(), 1)
        const end = new Date()
        this.setDateRange(start, end)
      } else if (timeString === 'Year') {
        const end = lastDayOfYear(subYears(new Date(), 1))
        const start = startOfYear(subYears(new Date(), 1))
        this.setDateRange(start, end)
      }
    },
    getPastMonthsDateTime(timeString) {
      this.currentTimerText = timeString.text
      const start = startOfMonth(timeString.value)
      const end = lastDayOfMonth(timeString.value)
      this.setDateRange(start, end)
    },
    getPastYearDateTime(timeString) {
      this.currentTimerText = timeString
      const end = lastDayOfYear(new Date(timeString, 8, 2, 11, 55))
      const start = startOfYear(new Date(timeString, 8, 2, 11, 55))
      this.setDateRange(start, end)
    },

    setDateRange(start, end) {
      this.dateRange.start = format(new Date(start), this.currentDateFormat)
      this.dateRange.end = format(new Date(end), this.currentDateFormat)
      this.finalDateFormatValueEmit(
        format(new Date(start), this.defaultDateFormat),
        format(new Date(end), this.defaultDateFormat)
      )
      this.replaceSidebarPlaceholder()
      this.dateTimePresetItems = false
      setTimeout(() => {
        this.dateTimePickerShow = true
      }, 500)
    },
    startDateTimeEvent(date) {
      this.dateTimePickerShow = false
      setTimeout(() => {
        this.setDateRange(date, this.dateRange.end)
      })
    },
    endDateTimeEvent(date) {
      this.dateTimePickerShow = true
      setTimeout(() => {
        this.setDateRange(this.dateRange.start, date)
      })
    },
    replaceSidebarPlaceholder() {
      const timerValue = this.currentTimer
      const timertext = this.currentTimerText

      if (timerValue && timertext) {
        this.timerCollections = this.timerCollections.map((item) => {
          if (item.value === timerValue) {
            item.text =
              timerValue === 1
                ? item.text.split(' ')[0] + ' ' + timertext
                : timertext
          }
          return item
        })
      }
    },
    setDefaultTimerCollection() {
      this.timerCollections = [
        {
          text: 'All',
          value: 0,
        },
        {
          text: 'Last',
          value: 1,
        },
        {
          text: 'Year to Date',
          value: 2,
        },
        {
          text: 'Months',
          value: 3,
        },
        {
          text: 'Years',
          value: 4,
        },
      ]
    },
    showDateTimePresetItem() {
      this.dateTimePickerShow = false
      this.dateTimePresetItems = true
    },
  },
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.1s;
}

.active {
  background-color: #ffffff;
  color: #3d2a92;
  border-radius: 50px;
}
.scroll {
  scrollbar-color: var(--scrollColor) #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: var(--scrollColor);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--scrollColor);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.font-normal {
  font-weight: normal;
  font-size: 18px !important;
}
.-top-3px {
  top: -3px;
}
.body {
  height: 19rem;
  overflow: auto;
}

// .calender-bubble:after {
//   @apply absolute top-0 right-5 w-0 h-0;
//   content: '';
//   border: 10px solid transparent;
//   border-bottom-color: var(--borderColor);
//   border-top: 0;
//   margin-left: -10px;
//   margin-top: -10px;
// }
.arrow_parent {
  width: 100%;
  height: 20px;
  position: absolute;
  top: -14px;
}
.arrow {
  @apply absolute top-0 w-0 h-0;
  right: var(--arrowPositionRight);
  content: '';
  border: 10px solid transparent;
  border-bottom-color: var(--borderColor);
  border-top: 0;
  margin-left: -10px;
  margin-top: 4px;
  display: block;
}

@media (max-width: 767px) {
  .body {
    height: calc(100% - 60px);
  }
  // .calender-bubble:after {
  //   @apply hidden;
  // }
  .arrow_parent {
    display: none;
  }
}
.vc-container {
  --white: #fff;
  --black: #000;
  --home-100: #d2b69a;
  --home-200: #d09b66;
  --home-300: #db9d5f;
  --home-400: #e09c58;
  --home-500: #e58e37;
  --home-600: #E4801D;
  --home-700: #E4801D;
  --home-800: #E4801D;
  --home-900: #E4801D;
  --archive-100: #b9bdaf;
  --archive-200: #dce0d2;
  --archive-300: #b8c1a1;
  --archive-400: #aabc7d;
  --archive-500: #9dbd4d;
  --archive-600: #8db230;
  --archive-700: #8db230;
  --archive-800: #8db230;
  --archive-900: #8db230;
  --search-100: #c6c6c9;
  --search-200: #e1e1e8;
  --search-300: #acadc5;
  --search-400: #b0b1c6;
  --search-500: #9193ba;
  --search-600: #7d80bd;
  --search-700: #7d80bd;
  --search-800: #7d80bd;
  --search-900: #7d80bd;
  --alert-100: #d7c7c7;
  --alert-200: #b79595;
  --alert-300: #cca0a0;
  --alert-400: #c67575;
  --alert-500: #bd7272;
  --alert-600: #A22A2A;
  --alert-700: #A22A2A;
  --alert-800: #A22A2A;
  --alert-900: #A22A2A;
}
</style>