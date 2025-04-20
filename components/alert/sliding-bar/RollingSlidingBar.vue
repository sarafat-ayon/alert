<template>
  <div class="range-slider cursor-pointer transition-all duration-500 ease-in-out">
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

    <div :id="`progressBar${barId}`" class="progressBar"></div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default defineComponent({
  name: 'SlidingBar',

  props: {
    barId: {
      type: String,
      default: 'id0',
    },
  },

  setup(props) {
    const currentValue = ref('50')
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')

    onMounted(() => {
      const range = document.getElementById(`range${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      tooltipValue.innerHTML = range.value
      tooltipValue.innerHTML = currentValue.value

      const value = (61 * currentValue.value) / 100
      tooltip.style.setProperty(
        'left',
        `calc(${currentValue.value}% - ${value}px)`
      )
    })

    const changeValue = (event) => {
      currentValue.value = event.target.value
      const range = document.getElementById(`range${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)
      setTimeout(() => {
        tooltipValue.innerHTML = range.value

        tooltipValue.innerHTML = Math.round(currentValue.value)

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
      }, 100)
    }

    return {
      currentValue,
      changeValue,
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
  // min-width: 502px;
  width: 100%;
  // margin: 0px auto;
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
  background: #a8342c;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 0;
  width: 61px;
  height: 35px;
  cursor: pointer;
  z-index: 3;
  position: relative;
  top: -13px;
}
.tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  top: -7px;
  z-index: 2;
}
.tooltipBtn {
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
  border: 2px solid #a8342c;
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