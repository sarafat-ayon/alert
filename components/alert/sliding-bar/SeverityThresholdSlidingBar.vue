<template>
  <div class="range-slider cursor-pointer">
    <input
      :id="`range${barId}`"
      class="progress range"
      type="range"
      step="0.1"
      value="50"
      min="0"
      max="100"
      @input="changeValue($event)"
    />
    <div
      :id="`tooltip${barId}`"
      class="tooltip font-bold transition-all duration-100 ease-in-out"
      style="left: 50%"
    >
      <div :id="`tooltipBtn${barId}`" class="text-sm tooltipBtn"></div>
      <div :id="`tooltipValue${barId}`" class="tooltipValue"></div>
    </div>

    <!-- <div
      :id="`max-tooltip${barId}`"
      class="max-tooltip"
      :class="
        currentComp !== 'GeneralAlertSettings' && !showNewAlert ? '' : 'hidden'
      "
      style="left: 96.9%"
    >
      <div class="text-sm max-tooltipBtn"></div>
      <div id="max-tooltipValue" class="max-tooltipValue font-bold"></div>
    </div>-->
    <div :id="`progressBar${barId}`" class="progressBar"></div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  name: 'SlidingBar',

  props: {
    barId: {
      type: String,
      default: 'id0',
    },
  },

  setup(props) {
    const store = useAlert()
    const { currentComp, showNewAlert } = storeToRefs(store)
    const currentValue = ref('50')
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')

    onMounted(() => {
      const range = document.getElementById(`range${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      //   const maxTooltip = document.getElementById(`max-tooltip${props.barId}`)
      //   const maxTooltipValue = document.getElementById('max-tooltipValue')
      tooltipValue.innerHTML = range.value
      tooltipValue.innerHTML = parseFloat(currentValue.value / 100).toFixed(2)
      //   maxTooltipValue.innerHTML = parseFloat(1).toFixed(2)
      const value = (61 * currentValue.value) / 100
      tooltip.style.setProperty(
        'left',
        `calc(${currentValue.value}% - ${value}px)`
      )
      //   const value1 = (61 * currentValue.value) / 100
      //   maxTooltip.style.setProperty(
      //     'left',
      //     `calc(100% - ${value1}px)`
      //   )

      currentValue.value < 20
        ? (tooltipValue.style.border = `2px solid #8B9E30`)
        : currentValue.value < 40
        ? (tooltipValue.style.border = `2px solid #B6AD34`)
        : currentValue.value < 70
        ? (tooltipValue.style.border = `2px solid #DDAA39`)
        : currentValue.value < 80
        ? (tooltipValue.style.border = `2px solid #DA8B37`)
        : currentValue.value < 90
        ? (tooltipValue.style.border = `2px solid #C66833`)
        : (tooltipValue.style.border = `2px solid #A8342C`)
    })

    const changeValue = (event) => {
      currentValue.value = event.target.value
      const range = document.getElementById(`range${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)
      setTimeout(() => {
        tooltipValue.innerHTML = range.value

        tooltipValue.innerHTML = parseFloat(currentValue.value / 100).toFixed(2)

        let value
        if (isDesktop.value) {
          value = (61 * currentValue.value) / 100
        } else {
          value = (50 * currentValue.value) / 100
        }

        tooltip.style.setProperty(
          'left',
          `calc(${currentValue.value}% - ${value}px)`
        )
        progressBar.style.width = currentValue.value + '%'

        if (currentValue.value < 20) {
          tooltipValue.style.border = `2px solid #8B9E30`
        } else if (currentValue.value < 40) {
          tooltipValue.style.border = `2px solid #B6AD34`
        } else if (currentValue.value < 70) {
          tooltipValue.style.border = `2px solid #DDAA39`
        } else if (currentValue.value < 80) {
          tooltipValue.style.border = `2px solid #DA8B37`
        } else if (currentValue.value < 90) {
          tooltipValue.style.border = `2px solid #C66833`
        } else {
          tooltipValue.style.border = `2px solid #A8342C`
        }
      }, 100)
    }

    return {
      currentValue,
      changeValue,
      currentComp,
      showNewAlert,
      isDesktop,
    }
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {},
})
</script>

<style lang="scss" scoped>
.range-slider {
  width: 100%;
  // min-width: 502px;
  margin: 0px auto;
  position: relative;
}
.range {
  -webkit-appearance: none;
  @apply h-2 md:h-2.5 rounded-full;
  width: 100%;
  outline: none;
}
.range::-webkit-slider-runnable-track {
  @apply h-2 md:h-2.5 rounded-full;
  width: 100%;
  cursor: pointer;
  animate: 0.2s;
  background: transparent
    linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
    no-repeat padding-box;
}
.range::-moz-range-track {
  @apply h-2 md:h-2.5 rounded-full;
  width: 100%;
  cursor: pointer;
  animate: 0.2s;
  background: transparent
    linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
    no-repeat padding-box;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 0;
  width: 61px;
  height: 35px;
  top: -13px;
  cursor: pointer;
  z-index: 3;
  position: relative;
}
.range::-moz-range-thumb {
  -webkit-appearance: none;
  width: 61px;
  height: 35px;
  top: -13px;
  cursor: pointer;
  z-index: 3;
  position: relative;
}
.tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  top: -7px;
  z-index: 2;
}
.tooltipBtn {
  content: '2';
  width: 61px;
  height: 35px;
  background-position: center;
  border-radius: 50%;
  position: absolute;
}
.tooltipValue {
  @apply text-xs md:text-md;
  position: absolute;
  top: 0px;
  background: #ffd200;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  width: 61px;
  height: 35px;
  background: #fcfcfc 0% 0% no-repeat padding-box;
  /* This color need to change with the value */
  border: 2px solid #8b9e30;
  border-radius: 20px;
}
.tooltipValue::after {
  content: '';
  position: absolute;
  left: 0px;
}
.progressBar {
  @apply h-2 md:h-2.5 rounded-full;
  width: 50%;
  /* background: transparent linear-gradient(90deg, #8DB230 0%, #EBA83B 70%, #A22A2A 100%) 0% 0% no-repeat padding-box; --> it's needed when we need to multiRange Slider */
  position: absolute;
  top: 5px;
  left: 0;
}

.max-tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  bottom: -4px;
  transform: translateX(-50%);
  z-index: 2;
}
.max-tooltipBtn {
  width: 61px;
  height: 35px;
  background-position: center;
  border-radius: 50%;
  position: absolute;
}
.max-tooltipValue {
  position: absolute;
  top: 0px;
  background: #ffd200;
  border-radius: 4px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  width: 61px;
  height: 35px;
  background: #fcfcfc 0% 0% no-repeat padding-box;
  /* This color need to change with the value */
  border: 2px solid #a8342c;
  border-radius: 20px;
}
.max-tooltipValue::after {
  content: '';
  position: absolute;
  left: 0px;
}

@media (max-width: 767px) {
  .tooltip {
    width: 50px;
    height: 24px;
    top: 0px;
  }
  .tooltipBtn {
    width: 50px;
    height: 24px;
  }
  .tooltipValue {
    top: 1px;
    line-height: 22px;
    width: 50px;
    height: 24px;
  }
}
</style>