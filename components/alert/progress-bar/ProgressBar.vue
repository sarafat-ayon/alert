<template>
  <div class="range-slider">
    <input
      :id="`range${barId}`"
      class="progress range"
      type="range"
      step="0.1"
      :value="currentValue"
      min="0"
      max="100"
    />
    <div :id="`tooltip${barId}`" class="tooltip font-bold" style="left: 50%">
      <div :id="`tooltipBtn${barId}`" class="text-sm tooltipBtn"></div>
      <div :id="`tooltipValue${barId}`" class="tooltipValue"></div>
    </div>

    <div :id="`progressBar${barId}`" class="progressBar"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default defineComponent({
  name: 'SlidingBar',

  props: {
    barId: {
      type: String,
      default: '',
    },
    currentValue: {
      type: Number,
      default: 50,
    },
  },

  setup(props) {
    // const currentValue = ref('50')
    const isDesktop = useBreakpoints(breakpointsTailwind).greater('md')

    onMounted(() => {
      const range = document.getElementById(`range${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)
      tooltipValue.innerHTML = range.value
      tooltipValue.innerHTML = props.currentValue

      let value
      if(isDesktop.value){
        value = (61 * props.currentValue) / 100
      } else{
        value = (50 * props.currentValue) / 100
      }

      tooltip.style.setProperty(
        'left',
        `calc(${props.currentValue}% - ${value}px)`
      )
      progressBar.style.width = props.currentValue + '%'
      props.currentValue < 20
        ? (tooltipValue.style.border = `2px solid #8B9E30`)
        : props.currentValue < 40
        ? (tooltipValue.style.border = `2px solid #B6AD34`)
        : props.currentValue < 70
        ? (tooltipValue.style.border = `2px solid #DDAA39`)
        : props.currentValue < 80
        ? (tooltipValue.style.border = `2px solid #DA8B37`)
        : props.currentValue < 90
        ? (tooltipValue.style.border = `2px solid #C66833`)
        : (tooltipValue.style.border = `2px solid #A8342C`)
    })

    // const changeValue = (event) => {
    //   currentValue.value = event.target.value
    //   const range = document.getElementById(`range${props.barId}`)
    //   const tooltip = document.getElementById(`tooltip${props.barId}`)
    //   const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
    //   const progressBar = document.getElementById(`progressBar${props.barId}`)

    //   tooltipValue.innerHTML = range.value

    //   tooltipValue.innerHTML = currentValue.value + '%'
    //   tooltip.style.left = currentValue.value + '%'
    //   progressBar.style.width = currentValue.value + '%'

    //   if (currentValue.value < 20) {
    //     tooltipValue.style.border = `2px solid #8B9E30`
    //     tooltipValue.style.left = '24px'
    //   } else if (currentValue.value < 40) {
    //     tooltipValue.style.border = `2px solid #B6AD34`
    //     tooltipValue.style.left = '16px'
    //   } else if (currentValue.value < 70) {
    //     tooltipValue.style.border = `2px solid #DDAA39`
    //     tooltipValue.style.left = '4px'
    //   } else if (currentValue.value < 80) {
    //     tooltipValue.style.border = `2px solid #DA8B37`
    //     tooltipValue.style.left = '-10px'
    //   } else if (currentValue.value < 90) {
    //     tooltipValue.style.border = `2px solid #C66833`
    //     tooltipValue.style.left = '-16px'
    //   } else {
    //     tooltipValue.style.border = `2px solid #A8342C`
    //     tooltipValue.style.left = '-24px'
    //   }
    // }

    return {
      //   currentValue,
      //   changeValue,
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
  //   min-width: 390px;
  width: 100%;
  margin: 0px auto;
  position: relative;
  margin-top: 20px;
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
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 0;
  width: 48px;
  height: 61px;
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