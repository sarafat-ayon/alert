<template>
  <div class="relative h-full flex flex-col">
    <div class="flex-grow chart-height">
      <ApexChart
        v-if="isDesktop"
        id="scatter-chart"
        ref="chart"
        width="100%"
        height="100%"
        :options="options"
        :series="series"
      />
      <ApexChart
        v-if="!isDesktop"
        id="scatter-chart"
        ref="chart"
        width="100%"
        height="100%"
        :options="mobileOptions"
        :series="series"
      />
    </div>
    <div
      id="legend"
      class="
        flex
        justify-center
        w-full
        flex-wrap
        md:p-3
        pt-0
        pb-6
        px-0
        legend-bottom-margin
      "
    >
      <template v-for="(singleSeries, index) in series">
        <div
          :key="singleSeries.name"
          class="
            flex
            items-center
            space-x-2
            px-4
            font-bold
            mt-4
            cursor-pointer
          "
        >
          <label
            class="h-5 relative cursor-pointer flex items-center space-x-2"
            :for="singleSeries.name"
            @click.stop="updateSummaryComp"
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
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAlert } from '~/stores/alert'
import rhombus from '~/assets/img/chart/rhombus.svg'
import square from '~/assets/img/chart/square.svg'
import triangle from '~/assets/img/chart/triangle.svg'
import { useSummaryComp } from '~/composables/feeds/useSummaryComp'
export default defineComponent({
  setup() {
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    const store = useAlert()
    const { scatterSeries } = storeToRefs(store)
    const { summaryComp } = storeToRefs(store)
    const { setSummaryComp } = useSummaryComp()

    const countClick = ref(0)
    const legendName = ref('')
    const gettime = ref(0)
    const updateSummaryComp = () => {
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
          if (summaryComp.value === 'SummaryAllFlagsCRTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryTeamCRTable',
              previousSummaryComp: store.summaryComp,
            })
          } else if (summaryComp.value === 'SummaryTeamCRTable') {
            store.setSummaryComponent({
              summaryComp: 'SummaryPersonCRTable',
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
      series: scatterSeries,
      summaryComp,
      setSummaryComp,
      updateSummaryComp,
      isDesktop: tailwindBreakpoints.greater('md'),
    }
  },
  data() {
    return {
      options: {
        chart: {
          type: 'scatter',
          id: 'vuechart-scatter-chart',
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
          toolbar: {
            show: true,
            tools: {
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              download: true,
              reset: '<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIj48cGF0aCBkPSJNMjAuODUyIDYuNzQ0YzMuMDc0IDEuNzU2IDUuMTUgNS4xMjYgNS4xNSA4Ljk4NiAwIDUuNjY0LTQuNDc0IDEwLjI3NS0xMCAxMC4yNzVzLTEwLTQuNjExLTEwLTEwLjI3NWMwLTQuNTY2IDIuOTA2LTguNDQ2IDYuOTMtOS43ODFhMSAxIDAgMSAwLS42MjktMS44OThjLTQuODEgMS41OTUtOC4zMDEgNi4yMjEtOC4zMDEgMTEuNjc5IDAgNi43ODIgNS4zODQgMTIuMjc1IDEyIDEyLjI3NXMxMi01LjQ5MyAxMi0xMi4yNzVjMC00LjQzMS0yLjMtOC4zMTQtNS43NC0xMC40NzJsMS4yMTEtLjMyNGExIDEgMCAwIDAtLjUxNy0xLjkzMmwtMy44NjQgMS4wMzVhMSAxIDAgMCAwLS43MDcgMS4yMjVsMS4wMzUgMy44NjRhMSAxIDAgMCAwIDEuOTMyLS41MThsLS41LTEuODY0WiIgZmlsbD0iI2EyMmEyYSIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PC9zdmc+" width="20">',
            },
          },
        },
        colors: ['#4A7FBC', '#9D1616', '#8DB230'],
        markers: {
          size: [10, 10, 10],
          strokeWidth: 0,
        },
        fill: {
          type: 'image',
          opacity: 1,
          image: {
            src: [rhombus, square, triangle],
            width: 16,
            height: 16,
          },
        },
        legend: {
          show: false,
          showForSingleSeries: true,
          fontSize: '20px',
          fontFamily: 'Roboto',
          fontWeight: 700,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 16,
            height: 16,
            radius: 2,
          },
          itemMargin: {
            horizontal: 20,
            vertical: 20,
          },
        },
        grid: {
          show: true,
          borderColor: '#C3B7B9',
        },
        xaxis: {
          type: 'numeric',
          decimalsInFloat: 2,
          title: {
            text: 'Severity Index',
            style: {
              color: '#505050',
              fontSize: '18px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            offsetY: 6,
          },
          min: 0.0,
          max: 1.0,
          tickAmount: 10,
          tickPlacement: 'on',
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: 0,
            offsetY: 0,
          },
          categories: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          labels: {
            show: true,
            style: {
              fontSize: '16px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            offsetX: 0.5,
            // formatter(x) {
            //   return x.toFixed(2)
            // },
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: 0,
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
            offsetX: -6,
          },
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
            // time Second to H : M : S
            formatter(time) {
              const hour = parseInt(time / 3600)
                .toString()
                .padStart(2, '0')
              const min = parseInt(parseInt(time % 3600) / 60)
                .toString()
                .padStart(2, '0')
              const sec = parseInt(parseInt(time % 3600) % 60)
                .toString()
                .padStart(2, '0')
              return hour + ':' + min + ':' + sec
            },
            offsetY: 1.2,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
      mobileOptions: {
        // breakpoint: 768,
        // options: {
        chart: {
          type: 'scatter',
          id: 'vuechart-scatter-chart-mobile',
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: false,
          },
          toolbar: {
            show: true,
            tools: {
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              download: true,
              reset: '<img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIj48cGF0aCBkPSJNMjAuODUyIDYuNzQ0YzMuMDc0IDEuNzU2IDUuMTUgNS4xMjYgNS4xNSA4Ljk4NiAwIDUuNjY0LTQuNDc0IDEwLjI3NS0xMCAxMC4yNzVzLTEwLTQuNjExLTEwLTEwLjI3NWMwLTQuNTY2IDIuOTA2LTguNDQ2IDYuOTMtOS43ODFhMSAxIDAgMSAwLS42MjktMS44OThjLTQuODEgMS41OTUtOC4zMDEgNi4yMjEtOC4zMDEgMTEuNjc5IDAgNi43ODIgNS4zODQgMTIuMjc1IDEyIDEyLjI3NXMxMi01LjQ5MyAxMi0xMi4yNzVjMC00LjQzMS0yLjMtOC4zMTQtNS43NC0xMC40NzJsMS4yMTEtLjMyNGExIDEgMCAwIDAtLjUxNy0xLjkzMmwtMy44NjQgMS4wMzVhMSAxIDAgMCAwLS43MDcgMS4yMjVsMS4wMzUgMy44NjRhMSAxIDAgMCAwIDEuOTMyLS41MThsLS41LTEuODY0WiIgZmlsbD0iI2EyMmEyYSIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PC9zdmc+" width="20">',
            },
          },
        },
        markers: {
          size: [10, 5.5, 10],
          strokeWidth: 0,
        },
        grid: {
          show: true,
          borderColor: '#C3B7B9',
        },
        fill: {
          type: 'image',
          opacity: 1,
          image: {
            src: [rhombus, square, triangle],
            width: 10,
            height: 10,
          },
        },
        legend: {
          show: false,
          showForSingleSeries: true,
          fontSize: '20px',
          fontFamily: 'Roboto',
          fontWeight: 700,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            width: 16,
            height: 16,
            radius: 2,
          },
          itemMargin: {
            horizontal: 20,
            vertical: 20,
          },
        },
        xaxis: {
          type: 'numeric',
          decimalsInFloat: 2,
          title: {
            text: 'Severity Index',
            style: {
              color: '#505050',
              fontSize: '10px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            offsetY: -6,
          },
          min: 0.0,
          max: 1.0,
          tickAmount: 10,
          tickPlacement: 'on',
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: 0,
            offsetY: 0,
          },
          categories: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: true,
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            offsetY: 2,
            offsetX: 0.5,
            // formatter(x) {
            //   return x.toFixed(2)
            // },
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          title: {
            text: 'Response Time',
            style: {
              color: '#505050',
              fontSize: '10px',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'bold',
            },
            offsetX: 0,
          },
          show: true,
          axisBorder: {
            show: true,
            color: '#3A1217',
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            show: true,
            style: {
              fontSize: '12px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
            },
            // time Second to H : M : S
            formatter(time) {
              const hour = parseInt(time / 3600)
                .toString()
                .padStart(1, '0')
              const min = parseInt(parseInt(time % 3600) / 60)
                .toString()
                .padStart(2, '0')
              const sec = parseInt(parseInt(time % 3600) % 60)
                .toString()
                .padStart(2, '0')
              return hour + ':' + min + ':' + sec
            },
            offsetY: 1.2,
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#3A1217',
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        // },
      },
    }
  },
  // mounted() {
  //     setTimeout(() => {
  //       const chart = document.getElementById('scatter-chart')
  //       chart.style.setProperty('min-height', `calc(100% - 200px) !important`)
  //       chart.style.setProperty('height', `calc(100% - 200px) !important`)
  //     }, 4000)
  //   },
  methods: {
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
  //   margin-bottom: 24px;
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
  .chart-height {
    height: 400px;
  }
}
</style>
