<template>
  <ApexChart
    v-show="pieSeries.length > 0"
    id="chart"
    ref="chart"
    type="pie"
    width="380"
    :options="options"
    :series="pieSeries"
  ></ApexChart>
</template>

<script>
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  setup() {
    const store = useAlert()
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')

    const { pieSeries, pieLabels, summaryComp } = storeToRefs(store)

    const areaClick = ref(0)
    const updateSummaryPieArea = (oldSummaryCompFeed) => {
      areaClick.value = areaClick.value + 1
      setTimeout(() => {
        areaClick.value = 0
      }, 300)
      if (isDesktop.value) {
        if (areaClick.value === 2) {
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
      } else if (!isDesktop.value) {
        if (areaClick.value === 4) {
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
      }
    }

    return {
      pieSeries,
      pieLabels,
      summaryComp,
      store,
      updateSummaryPieArea,
    }
  },
  data() {
    return {
      // series: [25, 15, 12, 20, 12, 8, 5, 3],
      options: {
        chart: {
          width: 380,
          type: 'pie',
          redrawOnParentResize: true,
          events: {
            click: (event, chartContext, config) => {
              this.updateSummaryPieArea(
                config.globals.seriesNames[config.seriesIndex]
              )
            },
          },
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
        },
        labels: this.pieLabels,
        legend: {
          show: false,
        },
        stroke: {
          show: false,
          width: 0,
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            // dataLabels: {
            //   offset: 0,
            //   minAngleToShowLabel: 10,
            // },
          },
        },
      },
    }
  },
  watch: {
    summaryComp(data) {
      this.updateOptions(this.pieLabels)
    },
  },
  methods: {
    updateOptions(labels) {
      this.$refs.chart.updateOptions({ labels })
    },
  },
})
</script>