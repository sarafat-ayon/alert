<template>
  <div class="range-slider cursor-pointer">
    <input
      :id="`range${barId}`"
      class="progress range"
      type="range"
      step="0.1"
      :value="currentValue"
      min="0"
      max="100"
      @input="changeValue($event.target.value)"
    />
    <div :id="`tooltip${barId}`" class="tooltip font-bold" style="left: 50%">
      <div :id="`tooltipBtn${barId}`" class="text-sm tooltipBtn"></div>
      <div :id="`tooltipValue${barId}`" class="tooltipValue"></div>
    </div>

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
    const currentValue = ref(98)
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')
    const store = useAlert()
    const {
      multiRangeStartingValue,
      multiRangeEndingValue,
      singleRangeEndingValue,
      minGap,
      // slidingStop,
    } = storeToRefs(store)
    const { setMultiRangeEndingValue } = store

    onMounted(() => {
      changeValue()
    })

    const changeValue = (event) => {
      const range = document.getElementById(`range${props.barId}`)
      console.log(Number(range.value))
      currentValue.value = Number(range.value)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)
      if ((currentValue.value - multiRangeStartingValue.value).toFixed(2) > 1) {
        // setTimeout(() => {
        tooltipValue.innerHTML = Number(range.value)
        tooltipValue.innerHTML = (currentValue.value / 100).toFixed(2)
        setMultiRangeEndingValue((currentValue.value / 100).toFixed(2))
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
        // tooltip.style.left = currentValue.value + '%'
        progressBar.style.width = currentValue.value + '%'

        if (currentValue.value < 20) {
          tooltipValue.style.border = `2px solid #8B9E30`
          // tooltipValue.style.left = '24px'
        } else if (currentValue.value < 40) {
          tooltipValue.style.border = `2px solid #B6AD34`
          // tooltipValue.style.left = '16px'
        } else if (currentValue.value < 70) {
          tooltipValue.style.border = `2px solid #DDAA39`
          // tooltipValue.style.left = '4px'
        } else if (currentValue.value < 80) {
          tooltipValue.style.border = `2px solid #DA8B37`
          // tooltipValue.style.left = '-10px'
        } else if (currentValue.value < 90) {
          tooltipValue.style.border = `2px solid #C66833`
          // tooltipValue.style.left = '-16px'
        } else {
          tooltipValue.style.border = `2px solid #A8342C`
          // tooltipValue.style.left = '-24px'
        }
        // }, 100)
      }
      // else {
      //   slidingStop.value = false
      // }
    }

    const updateValue = (event) => {
      const range = document.getElementById(`range${props.barId}`)
      console.log(Number(range.value))
      currentValue.value = Number(range.value)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)
      // if ((currentValue.value - singleRangeEndingValue.value).toFixed(2) > 1) {
        // setTimeout(() => {
        tooltipValue.innerHTML = Number(range.value)
        tooltipValue.innerHTML = (currentValue.value / 100).toFixed(2)
        setMultiRangeEndingValue((currentValue.value / 100).toFixed(2))
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
        // tooltip.style.left = currentValue.value + '%'
        progressBar.style.width = currentValue.value + '%'

        if (currentValue.value < 20) {
          tooltipValue.style.border = `2px solid #8B9E30`
          // tooltipValue.style.left = '24px'
        } else if (currentValue.value < 40) {
          tooltipValue.style.border = `2px solid #B6AD34`
          // tooltipValue.style.left = '16px'
        } else if (currentValue.value < 70) {
          tooltipValue.style.border = `2px solid #DDAA39`
          // tooltipValue.style.left = '4px'
        } else if (currentValue.value < 80) {
          tooltipValue.style.border = `2px solid #DA8B37`
          // tooltipValue.style.left = '-10px'
        } else if (currentValue.value < 90) {
          tooltipValue.style.border = `2px solid #C66833`
          // tooltipValue.style.left = '-16px'
        } else {
          tooltipValue.style.border = `2px solid #A8342C`
          // tooltipValue.style.left = '-24px'
        }
        // }, 100)
      // }
      // else {
      //   slidingStop.value = false
      // }
    }

    return {
      currentValue,
      changeValue,
      updateValue,
      isDesktop,
      store,
      multiRangeStartingValue,
      multiRangeEndingValue,
      singleRangeEndingValue,
      minGap,
    }
  },

  data() {
    return {}
  },
  watch: {
    singleRangeEndingValue(data) {
      console.log(data);
      if (data.toString().includes('.')) {
        this.currentValue = Number(data) * 100
        this.updateValue()
      } else {
        this.currentValue = Number(data)
        setTimeout(() => {
          this.updateValue()
        })
      }
    },
  },

  mounted() {},

  methods: {},
})
</script>

<style lang="scss" scoped>
.range-slider {
  // min-width: 502px;
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.range {
  @apply h-2 md:h-2.5 rounded-full;
  -webkit-appearance: none;
  width: 100%;
  outline: none;
}
.range::-webkit-slider-runnable-track {
  @apply h-2 md:h-2.5 rounded-full;
  width: 100%;
  cursor: pointer;
  animate: 0.2s;
  border: 1px solid #a22a2a;
  // background: transparent
  //   linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
  //   no-repeat padding-box;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 1;
  width: 61px;
  height: 35px;
  top: -14px;
  pointer-events: auto;
  cursor: pointer;
  z-index: 3;
  position: relative;
  // background: black;
  border-radius: 20px;
}
.tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  top: -6px;
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
  background: transparent
    linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
    no-repeat padding-box;
  position: absolute;
  top: 7px;
  left: 0;
}

@media (max-width: 767px) {
  .progressBar {
    top: 9px;
  }
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