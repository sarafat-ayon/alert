<template>
  <div class="multi-range-slider cursor-pointer">
    <div :id="`slider-track${barId}`" class="slider-track transition-all duration-100 ease-in-out"></div>

    <input
      :id="`range${barId}`"
      type="range"
      value="30"
      min="0"
      max="100"
      @input="slideOne($event)"
    />
    <div
      :id="`tooltip${barId}`"
      class="tooltip font-bold transition-all duration-100 ease-in-out"
      style="left: 30%"
    >
      <div :id="`tooltipBtn${barId}`" class="text-sm tooltipBtn"></div>
      <div :id="`tooltipValue${barId}`" class="tooltipValue"></div>
    </div>
    <!-- @input="slideTwo($event)" -->
    <input
      :id="`maxRange${barId}`"
      type="range"
      value="70"
      min="0"
      max="100"
      @input="sliderIndex !== 0 ? slideTwo($event) : ''"
    />
    <div
      :id="`max-tooltip${barId}`"
      class="max-tooltip font-bold transition-all duration-100 ease-in-out"
      style="left: 70%"
    >
      <div :id="`max-tooltipBtn${barId}`" class="text-sm tooltipBtn"></div>
      <div :id="`max-tooltipValue${barId}`" class="max-tooltipValue"></div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  name: 'MultiSlidingBar',

  props: {
    barId: {
      type: String,
      default: 'id0',
    },
    sliderIndex: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')
    const store = useAlert()
    const { currentComp, minGap, multiRangeEndingValue, slidingStop, changePosition } =
      storeToRefs(store)
    const { setMultiRangeStartingValue, setMultiRangeEndingValue, setPositionChange, setSingleRangeEndingValue } = store
    // const minGap = 1

    const sliderOne = ref('')
    const sliderTwo = ref('')

    const sliderTrack = ref('')
    const sliderMaxValue = ref('')

    const percent1 = ref(0)
    const percent2 = ref(0)

    onMounted(() => {
      sliderOne.value = document.getElementById(`range${props.barId}`)
      sliderTwo.value = document.getElementById(`maxRange${props.barId}`)
      sliderTrack.value = document.getElementById(`slider-track${props.barId}`)
      sliderMaxValue.value = document.getElementById(`range${props.barId}`).max
      slideOne()
      slideTwo()
    })

    const slideOne = (event) => {
      if (
        parseInt(sliderTwo.value.value) - parseInt(sliderOne.value.value) <=
        minGap.value
      ) {
        slidingStop.value = true
        sliderOne.value.value = parseInt(sliderTwo.value.value) - minGap.value
      }
      // setTimeout(() => {
      fillColor()
      // }, 100)
    }

    const slideTwo = (event) => {
      if (
        parseInt(sliderTwo.value.value) - parseInt(sliderOne.value.value) <=
        minGap.value
      ) {
        // slidingStop.value = true
        sliderTwo.value.value = parseInt(sliderOne.value.value) + minGap.value
      }
      // setTimeout(() => {
      fillColor()
      // }, 100)
    }

    const fillColor = () => {
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)

      const maxTooltip = document.getElementById(`max-tooltip${props.barId}`)
      const maxTooltipValue = document.getElementById(
        `max-tooltipValue${props.barId}`
      )
      percent1.value = (sliderOne.value.value / sliderMaxValue.value) * 100
      setMultiRangeStartingValue(percent1.value)
      if (props.sliderIndex !== 0) {
        percent2.value = (sliderTwo.value.value / sliderMaxValue.value) * 100
      } else {
        percent2.value =
          (parseFloat(multiRangeEndingValue.value).toFixed(2) /
            sliderMaxValue.value) *
          100
        percent2.value = percent2.value * 100
        sliderTwo.value.value = percent2.value
      }

      // setMultiRangeStaringValue((parseInt(percent1.value) / 100).toFixed(2), (parseInt(percent2.value) / 100).toFixed(2))
      sliderTrack.value.style.left = percent1.value + '%'
      sliderTrack.value.style.width = percent2.value - percent1.value + '%'

      sliderTrack.value.style.background = 'white'

      let value1, value2
      if (isDesktop.value) {
        value1 = (61 * percent1.value) / 100
        value2 = (61 * percent2.value) / 100
      } else {
        value1 = (50 * percent1.value) / 100
        value2 = (50 * percent2.value) / 100
      }
      tooltip.style.setProperty(
        'left',
        `calc(${percent1.value}% - ${value1}px)`
      )
      maxTooltip.style.setProperty(
        'left',
        `calc(${percent2.value}% - ${value2}px)`
      )

      tooltipValue.innerHTML = (parseInt(percent1.value) / 100).toFixed(2)
      maxTooltipValue.innerHTML = (parseInt(percent2.value) / 100).toFixed(2)

      if (percent1.value < 20) {
        tooltipValue.style.border = `2px solid #8B9E30`
      } else if (percent1.value < 40) {
        tooltipValue.style.border = `2px solid #B6AD34`
      } else if (percent1.value < 70) {
        tooltipValue.style.border = `2px solid #DDAA39`
      } else if (percent1.value < 80) {
        tooltipValue.style.border = `2px solid #DA8B37`
      } else if (percent1.value < 90) {
        tooltipValue.style.border = `2px solid #C66833`
      } else {
        tooltipValue.style.border = `2px solid #A8342C`
      }

      if (percent2.value < 20) {
        maxTooltipValue.style.border = `2px solid #8B9E30`
      } else if (percent2.value < 40) {
        maxTooltipValue.style.border = `2px solid #B6AD34`
      } else if (percent2.value < 70) {
        maxTooltipValue.style.border = `2px solid #DDAA39`
      } else if (percent2.value < 80) {
        maxTooltipValue.style.border = `2px solid #DA8B37`
      } else if (percent2.value < 90) {
        maxTooltipValue.style.border = `2px solid #C66833`
      } else {
        maxTooltipValue.style.border = `2px solid #A8342C`
      }
    }

    return {
      store,
      currentComp,
      sliderOne,
      sliderTwo,
      sliderTrack,
      sliderMaxValue,
      fillColor,
      percent1,
      percent2,
      slideOne,
      slideTwo,
      isDesktop,
      multiRangeEndingValue,
      changePosition,
      setMultiRangeEndingValue,
      setPositionChange,
      setSingleRangeEndingValue,
    }
  },
  watch: {
    multiRangeEndingValue(data) {
      if (data && this.sliderIndex === 0) {
        this.slideTwo()
      }
    },
    changePosition(data){
      if(data && this.sliderIndex === 0){
        this.setSingleRangeEndingValue(this.percent2)
        setTimeout(() => {
          this.setPositionChange(false)
        },);
      }
    }
  },
})
</script>




<style scoped>
.multi-range-slider {
  width: 100%;
  height: 36px;
  /* background-color: #d5d5d5; */
  margin: 0px auto;
  position: relative;
  border: 1ps solid black;
  /* background: transparent
    linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
    no-repeat padding-box; */
}

.multi-range-slider input[type='range'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  border-radius: 3px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}

.multi-range-slider input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  @apply h-2 md:h-2.5 rounded-full;
  width: 100%;
  cursor: pointer;
  animate: 0.2s;
  background: transparent
    linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
    no-repeat padding-box;
}

.multi-range-slider input[type='range']::-moz-range-track {
  -webkit-appearance: none;
  @apply h-2 md:h-2.5 rounded-full;
}

.multi-range-slider input[type='range']::-ms-track {
  appearance: none;
  @apply h-2 md:h-2.5 rounded-full;
}

.multi-range-slider input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 0;
  width: 54px;
  height: 30px;
  top: -12px;
  /* left: 35px; */
  cursor: pointer;
  z-index: 5;
  position: relative;
  pointer-events: auto;
  width: 61px;
  height: 35px;
  border-radius: 20px;
  background: black;
}

.multi-range-slider input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  width: 54px;
  height: 30px;
  top: -12px;
  /* left: 35px; */
  cursor: pointer;
  z-index: 5;
  position: relative;
  pointer-events: auto;
  width: 61px;
  height: 35px;
  border-radius: 20px;
  background: black;
}

.multi-range-slider input[type='range']::-ms-thumb {
  -webkit-appearance: none;
  width: 54px;
  height: 30px;
  top: -12px;
  /* left: 35px; */
  cursor: pointer;
  z-index: 5;
  position: relative;
  pointer-events: auto;
  width: 61px;
  height: 35px;
  border-radius: 20px;
  background: black;
}

.slider-track {
  @apply h-2 md:h-2.5 rounded-full;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  border: 1px solid #a22a2a;
  z-index: 2;
}

.multi-range-slider .tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  top: 0px;
  z-index: 2;
}
.multi-range-slider .tooltipBtn {
  width: 61px;
  height: 35px;
  background-position: center;
  border-radius: 50%;
  position: absolute;
}

.multi-range-slider .tooltipValue {
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
  border: 2px solid #8b9e30;
  border-radius: 20px;
}

.multi-range-slider .max-tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  top: 0px;
  z-index: 2;
}
.multi-range-slider .max-tooltipBtn {
  width: 61px;
  height: 35px;
  background-position: center;
  border-radius: 50%;
  position: absolute;
}

.multi-range-slider .max-tooltipValue {
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
  border: 2px solid #a8342c;
  border-radius: 20px;
}

@media (max-width: 767px) {
  .multi-range-slider .tooltip,
  .multi-range-slider .max-tooltip {
    width: 50px;
    height: 24px;
    top: 5px;
  }
  .multi-range-slider .tooltipBtn,
  .multi-range-slider .max-tooltipBtn {
    width: 50px;
    height: 24px;
  }
  .multi-range-slider .tooltipValue,
  .multi-range-slider .max-tooltipValue {
    top: 1px;
    line-height: 22px;
    width: 50px;
    height: 24px;
  }
}
</style>