<template>
  <div class="relative h-full flex flex-col">
    <div class="flex-grow chart-height">
      <ApexChart
        v-if="isDesktop"
        id="chart"
        ref="chart"
        type="area"
        width="100%"
        height="100%"
        :options="options"
        :series="series"
      />
      <ApexChart
        v-if="!isDesktop"
        id="chart"
        ref="chart"
        type="area"
        width="100%"
        height="100%"
        :options="mobileOptions"
        :series="series"
      />
    </div>
    <div
      id="legend"
      class="flex w-full flex-wrap pt-0 legend-bottom-margin"
      :class="
        summaryComp === 'SummaryIndividualSocialFeedDetails'
          ? 'justify-start md:justify-center p-6'
          : 'justify-center p-6'
      "
    >
      <template v-for="(singleSeries, index) in series">
        <div
          :key="singleSeries.name"
          class="flex items-center space-x-2 font-bold mt-4 cursor-pointer px-4"
          :class="
            summaryComp === 'SummaryIndividualSocialFeedDetails' ? 'pd-l' : ''
          "
        >
          <label
            class="
              h-5
              relative
              cursor-pointer
              flex
              items-center
              space-x-2
              w-full
            "
            :for="singleSeries.name"
            @click.stop="updateSummaryComp(singleSeries.name, index)"
          >
            <div class="h-5 relative cursor-pointer">
              <input
                :id="singleSeries.name"
                type="checkbox"
                checked
                :value="singleSeries.name"
                class="
                  appearance-none
                  w-4
                  h-4
                  border-2
                  rounded-sm
                  toggle-check-1
                "
                :style="{ '--bgColor': options.colors[index] }"
                @click.stop="toggleSeries(singleSeries.name, index)"
              />
              <fa
                class="
                  w-3.5
                  h-3.5
                  absolute
                  left-px
                  top-0.5
                  font-normal
                  cursor-pointer
                  opacity-0
                  check-1
                "
                :icon="['fas', 'check']"
              />
            </div>
            <span
              class="feeds_name"
              :class="
                summaryComp === 'SummaryIndividualSocialFeedDetails'
                  ? 'mobile-inner-width mobile-clamp'
                  : ''
              "
              :style="{ '--color': options.colors[index] }"
              >{{ singleSeries.name }}</span
            >
          </label>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { mapState } from 'vuex'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAlert } from '~/stores/alert'
import { useSummaryComp } from '~/composables/feeds/useSummaryComp'
export default defineComponent({
  setup() {
    const store = useAlert()
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')
    const { series, currentDateRange, summaryComp, startDate, endDate } =
      storeToRefs(store)
    const { setSummaryComp } = useSummaryComp()

    const countClick = ref(0)
    const areaClick = ref(0)
    const legendName = ref('')
    const gettime = ref(0)
    const initialDate = ref('')
    const endingDate = ref('')
    const updateSummaryCompArea = (oldSummaryCompFeed) => {
      if (isDesktop.value) {
        areaClick.value = areaClick.value + 1
        setTimeout(() => {
          areaClick.value = 0
        }, 300)
        if (areaClick.value === 2) {
          if (
            oldSummaryCompFeed === 'All Feeds' &&
            summaryComp.value === 'SummaryAllFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualFeedsTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (
            (oldSummaryCompFeed === 'Social Media' ||
              oldSummaryCompFeed === 'Text' ||
              oldSummaryCompFeed === 'IM and Collaboration' ||
              oldSummaryCompFeed === 'Email' ||
              oldSummaryCompFeed === 'Websites' ||
              oldSummaryCompFeed === 'Voice') &&
            summaryComp.value === 'SummaryIndividualFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualSocialFeedsTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (
            (oldSummaryCompFeed === 'Twitter' ||
              oldSummaryCompFeed === 'Facebook	' ||
              oldSummaryCompFeed === 'Instagram' ||
              oldSummaryCompFeed === 'Linkedin') &&
            summaryComp.value === 'SummaryIndividualSocialFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualSocialFeedDetails',
              previousSummaryComp: store.summaryComp,
            })
          } else if (summaryComp.value === 'SummaryAllFlagsORTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryFlagPersonsORTable',
              previousSummaryComp: store.summaryComp,
            })
          }
        }
      } else if (!isDesktop.value) {
        areaClick.value = areaClick.value + 1
        setTimeout(() => {
          areaClick.value = 0
        }, 300)
        if (areaClick.value === 4) {
          if (
            oldSummaryCompFeed === 'All Feeds' &&
            summaryComp.value === 'SummaryAllFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualFeedsTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (
            (oldSummaryCompFeed === 'Social Media' ||
              oldSummaryCompFeed === 'Text' ||
              oldSummaryCompFeed === 'IM and Collaboration' ||
              oldSummaryCompFeed === 'Email' ||
              oldSummaryCompFeed === 'Websites' ||
              oldSummaryCompFeed === 'Voice') &&
            summaryComp.value === 'SummaryIndividualFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualSocialFeedsTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (
            (oldSummaryCompFeed === 'Twitter' ||
              oldSummaryCompFeed === 'Facebook	' ||
              oldSummaryCompFeed === 'Instagram' ||
              oldSummaryCompFeed === 'Linkedin') &&
            summaryComp.value === 'SummaryIndividualSocialFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualSocialFeedDetails',
              previousSummaryComp: store.summaryComp,
            })
          } else if (summaryComp.value === 'SummaryAllFlagsORTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryFlagPersonsORTable',
              previousSummaryComp: store.summaryComp,
            })
          }
        }
      }
    }
    const updateSummaryComp = (name, index) => {
      const clickTime = new Date().getTime() - gettime.value
      countClick.value = countClick.value + 1
      setTimeout(() => {
        countClick.value = 0
        legendName.value = ''
        gettime.value = 0
      }, 250)
      if (legendName.value === name) {
        legendName.value = name
        if (countClick.value === 2 && clickTime < 600) {
          if (summaryComp.value === 'SummaryAllFeedsTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualFeedsTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (summaryComp.value === 'SummaryIndividualFeedsTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualSocialFeedsTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (
            summaryComp.value === 'SummaryIndividualSocialFeedsTable'
          ) {
            store.setSummaryComponent({
              summaryComp: 'SummaryIndividualSocialFeedDetails',
              previousSummaryComp: store.summaryComp,
            })
          } else if (summaryComp.value === 'SummaryAllFlagsORTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryFlagPersonsORTable',
              previousSummaryComp: store.summaryComp,
            })
          }
        }
      } else {
        legendName.value = name
      }
      gettime.value = new Date().getTime()
    }

    return {
      series,
      currentDateRange,
      summaryComp,
      startDate,
      endDate,
      setSummaryComp,
      updateSummaryComp,
      updateSummaryCompArea,
      isDesktop,
      initialDate,
      endingDate,
    }
  },
  data() {
    return {
      options: {
        chart: {
          type: 'area',
          // height: 500,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSIjYTIyYTJhIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI0MCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBpZD0iYSI+PC9wYXRoPgogICAgPC9kZWZzPgogICAgPGNsaXBQYXRoIGlkPSJiIj4KICAgICAgICA8dXNlIG92ZXJmbG93PSJ2aXNpYmxlIiB4bGluazpocmVmPSIjYSI+PC91c2U+CiAgICA8L2NsaXBQYXRoPgogICAgPHBhdGggY2xpcC1wYXRoPSJ1cmwoI2IpIiBkPSJNMjMgNS41VjIwYzAgMi4yLTEuOCA0LTQgNGgtNy4zYy0xLjA4IDAtMi4xLS40My0yLjg1LTEuMTlMMSAxNC44M3MxLjI2LTEuMjMgMS4zLTEuMjVjLjIyLS4xOS40OS0uMjkuNzktLjI5LjIyIDAgLjQyLjA2LjYuMTYuMDQuMDEgNC4zMSAyLjQ2IDQuMzEgMi40NlY0YzAtLjgzLjY3LTEuNSAxLjUtMS41UzExIDMuMTcgMTEgNHY3aDFWMS41YzAtLjgzLjY3LTEuNSAxLjUtMS41UzE1IC42NyAxNSAxLjVWMTFoMVYyLjVjMC0uODMuNjctMS41IDEuNS0xLjVzMS41LjY3IDEuNSAxLjVWMTFoMVY1LjVjMC0uODMuNjctMS41IDEuNS0xLjVzMS41LjY3IDEuNSAxLjV6Ij48L3BhdGg+Cjwvc3ZnPg==" width="20">',
              download: true,
              reset:
                '<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIj48cGF0aCBkPSJNMjAuODUyIDYuNzQ0YzMuMDc0IDEuNzU2IDUuMTUgNS4xMjYgNS4xNSA4Ljk4NiAwIDUuNjY0LTQuNDc0IDEwLjI3NS0xMCAxMC4yNzVzLTEwLTQuNjExLTEwLTEwLjI3NWMwLTQuNTY2IDIuOTA2LTguNDQ2IDYuOTMtOS43ODFhMSAxIDAgMSAwLS42MjktMS44OThjLTQuODEgMS41OTUtOC4zMDEgNi4yMjEtOC4zMDEgMTEuNjc5IDAgNi43ODIgNS4zODQgMTIuMjc1IDEyIDEyLjI3NXMxMi01LjQ5MyAxMi0xMi4yNzVjMC00LjQzMS0yLjMtOC4zMTQtNS43NC0xMC40NzJsMS4yMTEtLjMyNGExIDEgMCAwIDAtLjUxNy0xLjkzMmwtMy44NjQgMS4wMzVhMSAxIDAgMCAwLS43MDcgMS4yMjVsMS4wMzUgMy44NjRhMSAxIDAgMCAwIDEuOTMyLS41MThsLS41LTEuODY0WiIgZmlsbD0iI2EyMmEyYSIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PC9zdmc+" width="20">',
            },
          },
          zoom: {
            enabled: true,
          },
          events: {
            click: (event, chartContext, config) => {
              this.updateSummaryCompArea(
                config.globals.seriesNames[config.seriesIndex]
              )
            },
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            // format: 'MMMM dd, yyyy',
          },
        },
        grid: {
          show: true,
          borderColor: '#C3B7B9',
        },
        colors: [
          '#5A84CC',
          '#9D1616',
          '#6E9C2E',
          '#5A57A2',
          '#0091AA',
          '#E89922',
          '#265198',
          '#E05252',
        ],
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#F44336', '#E91E63', '#9C27B0'],
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          colors: [
            '#5A84CC',
            '#9D1616',
            '#6E9C2E',
            '#5A57A2',
            '#0091AA',
            '#E89922',
            '#265198',
            '#E05252',
          ],
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 1,
            opacityTo: 1,
            stops: [100, 100],
          },
        },
        legend: {
          show: false,
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '16px',
          fontWeight: 600,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 15,
            height: 15,
            radius: 2,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 15,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        annotations: {
          xaxis: [
            {
              x: new Date('01 Jan 2013').getTime(),
              // borderColor: '#999',
              // yAxisIndex: 0,
              // label: {
              //   show: true,
              //   text: 'Rally',
              //   style: {
              //     color: '#fff',
              //     background: '#775DD0',
              //   },
              // },
            },
          ],
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Jan 2011').getTime(),
          max: new Date('01 Jan 2012').getTime(),
          tickPlacement: 'on',
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            show: true,
            style: {
              fontSize: '16px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            datetimeFormatter: {
              year: 'MMM, yyyy',
              month: 'MMM',
              day: 'ddd',
              hour: 'HH:mm',
            },
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: -1.5, // -25
            offsetY: 0,
          },
        },
        yaxis: {
          show: true,
          title: {
            text: 'Open Alerts',
            style: {
              color: '#505050',
              fontSize: '18px',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'bold',
            },
            offsetX: 0,
          },
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: -0.5,
            offsetY: 0,
          },
          labels: {
            show: true,
            style: {
              fontSize: '16px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            // formatter(y) {
            //   return y.toFixed(0)
            // },
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: 0,
            offsetY: 1.5,
          },
        },
      },
      mobileOptions: {
        chart: {
          type: 'area',
          // height: 500,
          stacked: true,
          toolbar: {
            show: true,
            tools: {
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              download: true,
              reset:
                '<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIj48cGF0aCBkPSJNMjAuODUyIDYuNzQ0YzMuMDc0IDEuNzU2IDUuMTUgNS4xMjYgNS4xNSA4Ljk4NiAwIDUuNjY0LTQuNDc0IDEwLjI3NS0xMCAxMC4yNzVzLTEwLTQuNjExLTEwLTEwLjI3NWMwLTQuNTY2IDIuOTA2LTguNDQ2IDYuOTMtOS43ODFhMSAxIDAgMSAwLS42MjktMS44OThjLTQuODEgMS41OTUtOC4zMDEgNi4yMjEtOC4zMDEgMTEuNjc5IDAgNi43ODIgNS4zODQgMTIuMjc1IDEyIDEyLjI3NXMxMi01LjQ5MyAxMi0xMi4yNzVjMC00LjQzMS0yLjMtOC4zMTQtNS43NC0xMC40NzJsMS4yMTEtLjMyNGExIDEgMCAwIDAtLjUxNy0xLjkzMmwtMy44NjQgMS4wMzVhMSAxIDAgMCAwLS43MDcgMS4yMjVsMS4wMzUgMy44NjRhMSAxIDAgMCAwIDEuOTMyLS41MThsLS41LTEuODY0WiIgZmlsbD0iI2EyMmEyYSIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PC9zdmc+" width="20">',
            },
          },
          zoom: {
            enabled: true,
          },
          events: {
            click: (event, chartContext, config) => {
              this.updateSummaryCompArea(
                config.globals.seriesNames[config.seriesIndex]
              )
            },
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            // format: 'MMMM dd, yyyy',
          },
        },
        grid: {
          show: true,
          borderColor: '#C3B7B9',
        },
        colors: [
          '#5A84CC',
          '#9D1616',
          '#6E9C2E',
          '#5A57A2',
          '#0091AA',
          '#E89922',
          '#265198',
          '#E05252',
        ],
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#F44336', '#E91E63', '#9C27B0'],
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          colors: [
            '#5A84CC',
            '#9D1616',
            '#6E9C2E',
            '#5A57A2',
            '#0091AA',
            '#E89922',
            '#265198',
            '#E05252',
          ],
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 1,
            opacityTo: 1,
            stops: [100, 100],
          },
        },
        legend: {
          show: false,
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '16px',
          fontWeight: 600,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 15,
            height: 15,
            radius: 2,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 15,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
        annotations: {
          xaxis: [
            {
              x: new Date('01 Jan 2013').getTime(),
              // borderColor: '#999',
              // yAxisIndex: 0,
              // label: {
              //   show: true,
              //   text: 'Rally',
              //   style: {
              //     color: '#fff',
              //     background: '#775DD0',
              //   },
              // },
            },
          ],
        },

        xaxis: {
          type: 'datetime',
          min: new Date('01 Jan 2011').getTime(),
          max: new Date('01 Jan 2012').getTime(),
          tickPlacement: 'on',
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: true,
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
            },
            datetimeFormatter: {
              year: "MMM 'yy",
              month: 'MMM',
              day: 'ddd',
              hour: 'HH:mm',
            },
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: -0.3, // -25
            offsetY: -0.6,
          },
          title: {
            text: '.',
            style: {
              fontSize: '16px',
              color: '#fff',
              fontWeight: 'bold',
            },
          },
        },
        yaxis: {
          show: true,
          title: {
            text: 'Open Alerts',
            style: {
              color: '#505050',
              fontSize: '10px',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'bold',
            },
            offsetX: 0,
          },
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: -0.5,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: 0,
            offsetY: 1,
          },
          labels: {
            show: true,
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            // formatter(y) {
            //   return y.toFixed(0)
            // },
          },
        },
      },
    }
  },
  computed: {
    ...mapState('system', ['formatDate', 'formatTime']),

    dayDiff() {
      const a = new Date(this.initialDate)
      const b = new Date(this.endingDate)
      return Math.abs(b - a) / (1000 * 60 * 60 * 24)
    },
    apexChartTimeFormat() {
      if (this.formatTime === 'HH:mm') {
        return 'HH:mm'
      } else if (this.formatTime === 'hh:mm aaa') {
        return 'hh:mm tt'
      } else if (this.formatTime === 'hh:mm aa') {
        return 'hh:mm TT'
      } else {
        return 'hh:mm tt'
      }
    },
  },
  watch: {
    currentDateRange(data) {
      this.checkDateString(data)
    },
    summaryComp() {
      setTimeout(() => {
        this.checkDateString(this.currentDateRange)
      })
    },
    startDate(data) {
      this.checkDateString(this.currentDateRange)
    },
    endDate(data) {
      this.checkDateString(this.currentDateRange)
    },
    formatDate(data) {
      this.updateDateFormat()
    },
    apexChartTimeFormat(data) {
      this.updateDateTimeFormat()
    },
    dayDiff(data) {
      this.updateDateTimeFormat()
    },
  },
  mounted() {
    setTimeout(() => {
      this.checkDateString(this.currentDateRange)
      this.updateDateTimeFormat()
    }, 500)
    this.updateDateFormat()
    this.addScroll()
  },
  methods: {
    zoomIn(initial, ending) {
      const a = new Date(initial)
      const b = new Date(ending)
      const timeDiff = Math.abs(b - a) / (1000 * 60 * 60 * 24)

      if (timeDiff <= 1) {
        this.$toast.clear()
        this.$toast.success('Max Zoomed', {
          className: ['toasted-bg-archive'],
        })
        console.log('Nothing Happend ', timeDiff, ' Day')
      } else if (timeDiff > 1 && timeDiff < 10) {
        a.setDate(a.getDate() + 1)
      } else if (timeDiff >= 10 && timeDiff < 20) {
        a.setDate(a.getDate() + 2)
      } else if (timeDiff >= 20) {
        a.setDate(a.getDate() + Math.floor(timeDiff / 10))
      }
      this.initialDate = a
      this.endingDate = b
      this.currentDateGraph(a, b)
    },
    zoomOut(initial, ending) {
      const a = new Date(initial)
      const b = new Date(ending)
      const timeDiff = Math.abs(b - a) / (1000 * 60 * 60 * 24)

      if (timeDiff >= 1 && timeDiff < 10) {
        a.setDate(a.getDate() - 1)
      } else if (timeDiff >= 10 && timeDiff < 20) {
        a.setDate(a.getDate() - 2)
      } else if (timeDiff >= 20) {
        a.setDate(a.getDate() - Math.floor(timeDiff / 10))
      }
      this.initialDate = a
      this.endingDate = b
      this.currentDateGraph(a, b)
    },
    chartZoomByScroll(event) {
      if (event.deltaY < 0) {
        this.zoomIn(this.initialDate, this.endingDate)
      } else {
        this.zoomOut(this.initialDate, this.endingDate)
      }
      event.preventDefault()
    },
    addScroll() {
      const conatiner = document.getElementById('chart')
      conatiner.addEventListener('wheel', this.chartZoomByScroll)
    },

    updateDateTimeFormat() {
      this.$refs.chart.updateOptions({
        xaxis: {
          labels: {
            datetimeFormatter: {
              year: `${this.dayDiff >= 1096 ? 'yyyy' : 'yyyy MMM'}`,
              month: `${this.dayDiff >= 1096 ? '' : 'MMM'}`,
              day: `${this.dayDiff <= 2 ? 'dd MMM yyyy' : 'dd'}`,
              hour: `${this.apexChartTimeFormat}`,
            },
            rotate: -45,
            minHeight: this.dayDiff <= 2 ? 78 : 40,
            rotateAlways: this.dayDiff <= 2,
          },
        },
      })
    },

    updateDateFormat() {
      this.$refs.chart.updateOptions({
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: `${this.formatDate}`,
          },
        },
      })
    },
    toggleSeries(name, index) {
      const allLegends = document.querySelectorAll(
        "#legend input[type='checkbox']"
      )
      let count = 0
      allLegends.forEach((item) => {
        if (item.checked) {
          count = count + 1
        }
      })
      if (count >= 1) {
        this.$refs.chart.toggleSeries(name)
      } else if (!allLegends[index].checked) {
        allLegends[index].checked = true
      }
    },

    currentDateGraph(value1, value2) {
      this.$refs.chart.zoomX(
        new Date(value1).getTime(),
        new Date(value2).getTime()
      )
    },

    checkDateString(data) {
      if (data === 'Current') {
        this.currentDateGraph('01 August 2012', '04 August 2012')
        this.initialDate = '01 August 2012'
        this.endingDate = '04 August 2012'
      } else if (data === '1 Month') {
        this.currentDateGraph('01 July 2012', '31 July 2012')
        this.initialDate = '01 July 2012'
        this.endingDate = '31 July 2012'
      } else if (data === '6 Months') {
        this.currentDateGraph('01 Feb 2012', '01 August 2012')
        this.initialDate = '01 Feb 2012'
        this.endingDate = '01 August 2012'
      } else if (data === 'YTD') {
        this.currentDateGraph('01 Jan 2012', '01 August 2012')
        this.initialDate = '01 Jan 2012'
        this.endingDate = '01 August 2012'
      } else if (data === '1 Year') {
        this.currentDateGraph('01 jan 2012', '01 Jan 2013')
        this.initialDate = '01 jan 2012'
        this.endingDate = '01 Jan 2013'
      } else if (data === '3 Years') {
        this.currentDateGraph('01 Jan 2010', '01 Jan 2013')
        this.initialDate = '01 Jan 2010'
        this.endingDate = '01 Jan 2013'
      } else if (data === '3 Years') {
        this.currentDateGraph('01 August 2010', '01 August 2012')
        this.initialDate = '01 August 2010'
        this.endingDate = '01 August 2012'
      } else if (data === '5 Years') {
        this.currentDateGraph('01 August 2008', '01 August 2012')
        this.initialDate = '01 August 2008'
        this.endingDate = '01 August 2012'
      } else if (data === 'Max') {
        this.$refs.chart.updateOptions({
          xaxis: {
            min: new Date('01 Mar 2012').getTime(),
            max: new Date().getTime(),
          },
        })
        this.initialDate = '01 Mar 2012'
        this.endingDate = new Date()
      } else if (data === 'Date Range' && this.startDate && this.endDate) {
        this.currentDateGraph(this.startDate, this.endDate)
        this.initialDate = this.startDate
        this.endingDate = this.endDate
      }
    },
  },
})
</script>

<style lang="scss" scoped>
$bgColor: var(--bgColor);
$color: var(--color);

.toggle-check-1 {
  border-color: $bgColor;
  &:checked {
    background-color: $bgColor;
  }

  &:checked + .check-1 {
    @apply text-white opacity-100;
  }
}

.feeds_name {
  color: $color;
}

@media (min-height: 600px) and (max-height: 800px) {
  // .legend-bottom-margin {
  //   margin-bottom: 14px;
  // }
  .chart-height {
    height: 500px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .chart-height {
    height: 500px;
  }
}

@media (max-width: 767px) {
  .mobile-inner-width {
    width: calc(100% - 30px);
  }

  .chart-height {
    height: 400px;
  }

  .mobile-clamp {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pd-l {
    @apply pl-11 w-full;
  }
}
</style>
