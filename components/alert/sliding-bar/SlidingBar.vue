<template>
  <div class="range-slider cursor-pointer" :class="[classStyleName]">
    <input
      :id="`range${barId}`"
      class="progress range"
      type="range"
      step="0.1"
      :value="`${currentValue}`"
      min="0"
      max="100"
      @input="changeValue($event)"
      @mousedown="activeInputField(barId)"
      @mouseup = "mouseUp(barId)"
    />
    <div
      v-if="!showInputFields"
      :id="`tooltip${barId}`"
      class="tooltip font-bold transition-all duration-100 ease-in-out"
      :style="{ left: `calc(${currentValue}% - ${value}px)` }"
    >
      <div
        :id="`tooltipBtn${barId}`"
        contenteditable="true"
        class="text-sm tooltipBtn"
      ></div>
      <div :id="`tooltipValue${barId}`" class="tooltipValue"></div>
    </div>
    <input
      v-if="showInputFields"
      :id="`inputTooltip${barId}`"
      ref="inputFieldRef"
      type="number"
      pattern="[0-9]"
      onkeypress="return !(event.charCode == 46 && event.charCode == 0)"
      min="0"
      max="100"
      class="inputTooltip font-bold transition-all duration-100 ease-in-out"
      :style="{ '--left': `calc(${currentValue}% - ${value}px)` }"
      @input="updateValue($event)"
      @keyup.enter="checkEnter"
      @keydown="checkKey($event)"
    />

    <div :id="`progressBar${barId}`" class="progressBar"></div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
} from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default defineComponent({
  name: 'SlidingBar',
  props: {
    barId: {
      type: String,
      default: 'id0',
    },
    inputValue: {
      type: String,
      default: '60',
    },
    showInputFields: {
      type: Boolean,
      default: false,
    },
    classStyleName: {
      type: String,
      default: '',
    },
  },
  emits: ['send-value'],
  setup(props, context) {
    const instance = getCurrentInstance()
    const currentValue = ref(`${props.inputValue}`)

    const breakpoints = useBreakpoints(breakpointsTailwind).isGreater('md')

    const valueFromField = ref(0)
    const value = ref(0)
    const isExponential = ref(false)

    const mouseDownValue = ref(0)
    const mouseUpValue = ref(0)

    onMounted(() => {
      context.emit('send-value', currentValue.value)
      const range = document.getElementById(`range${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      // const inputTooltip = document.getElementById(`inputTooltip${props.barId}`)
      if (tooltipValue) {
        tooltipValue.innerHTML = range.value
        tooltipValue.innerHTML = currentValue.value + '%'

        if (breakpoints) {
          value.value = (61 * currentValue.value) / 100
          tooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
          // inputTooltip.style.setProperty(
          //   'left',
          //   `calc(${currentValue.value}% - ${value.value}px)`
          // )
        } else {
          value.value = (50 * currentValue.value) / 100
          tooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
          // inputTooltip.style.setProperty(
          //   'left',
          //   `calc(${currentValue.value}% - ${value.value}px)`
          // )
        }
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
      }
    })

    const mouseUp = (barId) =>{
      mouseUpValue.value = currentValue.value
      const difference = Math.abs(mouseDownValue.value - mouseUpValue.value)

      if(difference < 0.5) {
        if (barId.includes('id1')) {
          context.emit('update-show-input', barId)
        } else if (barId.includes('id2')) {
          context.emit('update-show-input', barId)
        }
        setTimeout(() => {
          const inputTooltip = document.getElementById(
            `inputTooltip${props.barId}`
          )
          if (inputTooltip) {
            currentValue.value < 20
              ? (inputTooltip.style.border = `2px solid #8B9E30`)
              : currentValue.value < 40
              ? (inputTooltip.style.border = `2px solid #B6AD34`)
              : currentValue.value < 70
              ? (inputTooltip.style.border = `2px solid #DDAA39`)
              : currentValue.value < 80
              ? (inputTooltip.style.border = `2px solid #DA8B37`)
              : currentValue.value < 90
              ? (inputTooltip.style.border = `2px solid #C66833`)
              : (inputTooltip.style.border = `2px solid #A8342C`)
          }
        }, 100)
      }
    }

    const activeInputField = (barId) => {
      context.emit('update-hide-input')
      mouseDownValue.value = currentValue.value
    }

    const checkKey = (e) => {
      if (e.keyCode === 69 || e.keyCode === 189 || e.keyCode === 187) {
        isExponential.value = true
      }
    }

    const checkEnter = () => {
      context.emit('update-hide-input')
      updateSelectValue()
    }

    const updateSelectValue = () => {
      if (!props.showInputFields) {
        if (
          valueFromField.value < 0 ||
          valueFromField.value > 100 ||
          valueFromField.value === 0
        ) {
          if (valueFromField.value < 0 || valueFromField.value > 100) {
            instance.proxy.$store.$toast.error(
              'You must set the value between 0% to 100%'
            )
          }
          changeValue(currentValue.value)
        } else {
          changeValue(valueFromField.value)
        }
      }
    }

    const updateValue = (e) => {
      if (e.target.value.length < 5) {
        if (!isExponential.value) {
          valueFromField.value = e.target.value
        } else {
          if (valueFromField.value > 0) {
            e.target.value = valueFromField.value
          } else {
            e.target.value = currentValue.value
          }
          isExponential.value = false
        }
      } else {
        e.path[0].value = valueFromField.value
      }
    }

    const changeValue = (event) => {
      if (event.target) {
        currentValue.value = event.target.value
      } else {
        currentValue.value = event
      }
      context.emit('send-value', currentValue.value)
      const inputTooltip = document.getElementById(`inputTooltip${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)
      const range = document.getElementById(`range${props.barId}`)
      range.value = currentValue.value
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      // tooltipValue.innerHTML = range.value
      if (breakpoints) {
        value.value = (61 * currentValue.value) / 100
        if (tooltip) {
          tooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
        }
        if (inputTooltip) {
          inputTooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
        }
      } else {
        value.value = (50 * currentValue.value) / 100
        if (tooltip) {
          tooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
        }
        if (inputTooltip) {
          inputTooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
        }
      }
      setTimeout(() => {
        const tooltipValue = document.getElementById(
          `tooltipValue${props.barId}`
        )
        if (tooltipValue) {
          tooltipValue.innerHTML = currentValue.value + '%'
        }
        if (tooltipValue) {
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
        }
      })
      progressBar.style.width = currentValue.value + '%'
    }

    const resetValue = (resetValue) => {
      currentValue.value = resetValue
      context.emit('send-value', currentValue.value)
      const range = document.getElementById(`range${props.barId}`)
      const tooltip = document.getElementById(`tooltip${props.barId}`)
      const inputTooltip = document.getElementById(`inputTooltip${props.barId}`)
      const tooltipValue = document.getElementById(`tooltipValue${props.barId}`)
      const progressBar = document.getElementById(`progressBar${props.barId}`)

      tooltipValue.innerHTML = range.value
      tooltipValue.innerHTML = currentValue.value + '%'
      if (breakpoints) {
        value.value = (61 * currentValue.value) / 100
        tooltip.style.setProperty(
          'left',
          `calc(${currentValue.value}% - ${value.value}px)`
        )
        if (inputTooltip) {
          inputTooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
        }
      } else {
        value.value = (50 * currentValue.value) / 100
        tooltip.style.setProperty(
          'left',
          `calc(${currentValue.value}% - ${value.value}px)`
        )
        if (inputTooltip) {
          inputTooltip.style.setProperty(
            'left',
            `calc(${currentValue.value}% - ${value.value}px)`
          )
        }
      }
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
    }

    return {
      value,
      currentValue,
      mouseUp,
      activeInputField,
      checkKey,
      checkEnter,
      updateSelectValue,
      updateValue,
      changeValue,
      resetValue,
    }
  },

  data() {
    return {}
  },

  watch: {
    inputValue(data) {
      if (data) {
        this.resetValue(data)
      }
    },
    showInputFields(data) {
      if (data) {
        const inputTooltip = document.getElementById(
          `inputTooltip${this.barId}`
        )

        if (inputTooltip) {
          if (this.breakpoints) {
            this.value = (61 * this.currentValue) / 100
            inputTooltip.style.setProperty(
              'left',
              `calc(${this.currentValue}% - ${this.value}px)`
            )
          } else {
            this.value = (50 * this.currentValue) / 100
            inputTooltip.style.setProperty(
              'left',
              `calc(${this.currentValue}% - ${this.value}px)`
            )
          }
        }
        setTimeout(() => {
          this.$refs.inputFieldRef.focus()
        }, 300)
      } else {
        this.updateSelectValue()
      }
    },
  },

  mounted() {},

  methods: {},
})
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.range-slider {
  // min-width: 438px;
  // min-width: 502px;
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.range {
  @apply h-2 md:h-2.5;
  -webkit-appearance: none;
  width: 100%;
  outline: none;
  // border-radius: 3px;
  @apply rounded-full;
  // border-radius: 10px;
}
.range::-webkit-slider-runnable-track {
  @apply h-2 md:h-2.5;
  width: 100%;
  cursor: pointer;
  animate: 0.2s;
  // border-radius: 1rem;
  background: transparent
    linear-gradient(90deg, #8db230 0%, #eba83b 70%, #a22a2a 100%) 0% 0%
    no-repeat padding-box;
  @apply rounded-full;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  opacity: 0;
  width: 61px;
  height: 35px;
  cursor: grab;
  z-index: 3;
  position: relative;
  top: -12px;
}
.tooltip {
  width: 61px;
  height: 35px;
  position: absolute;
  top: -6px;
  z-index: 2;
}
#tooltipconcern,
#tooltipconfidence,
#tooltipid1,
#tooltipid2,
#tooltipid3,
#tooltipid4,
#tooltipid5,
#tooltipid6,
#tooltipid7,
#tooltipid8,
#tooltipid9,
#tooltipid10,
#tooltipid11,
#tooltipid12,
#tooltipid13,
#tooltipid14 {
  // top: -2.5px !important;
}
.tooltipBtn {
  width: 61px;
  height: 35px;
  background-position: center;
  border-radius: 50%;
  position: absolute;
  text-align: center;
  outline: none;
  top: 3px;
}
.tooltipValue {
  @apply text-xs md:text-md;
  position: absolute;
  top: 3px;
  background: #ffd200;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
  width: 61px;
  height: 35px;
  background: #fcfcfc 0% 0% no-repeat padding-box;
  /* This color need to change with the value */
  border: 2px solid #8b9e30;
  border-radius: 20px;
}
.inputTooltip {
  @apply text-xs md:text-md;
  position: absolute;
  left: var(--left);
  top: -3px;
  background: #ffd200;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
  width: 61px;
  height: 35px;
  background: #fcfcfc 0% 0% no-repeat padding-box;
  // background: black;
  /* This color need to change with the value */
  border: 2px solid #8b9e30;
  border-radius: 20px;
  z-index: 999999999999;
}
.inputTooltip:focus {
  @apply text-xs md:text-md;
  position: absolute;
  top: -3px;
  background: #ffd200;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
  width: 61px;
  height: 35px;
  background: #fcfcfc 0% 0% no-repeat padding-box;
  /* This color need to change with the value */
  border: 2px solid #8b9e30;
  border-radius: 20px;
  outline: none;
  // border:none;
  // background-image:none;
  // background-color:transparent;
  // -webkit-box-shadow: none;
  // -moz-box-shadow: none;
  // box-shadow: none;
}
.tooltipValue::after {
  content: '';
  position: absolute;
  left: 0px;
}
.progressBar {
  @apply h-2 md:h-2.5;
  width: 50%;
  /* background: transparent linear-gradient(90deg, #8DB230 0%, #EBA83B 70%, #A22A2A 100%) 0% 0% no-repeat padding-box; --> it's needed when we need to multiRange Slider */
  border-radius: 3px;
  position: absolute;
  top: 5px;
  left: 0;
}
.sliding-border .range::-webkit-slider-runnable-track {
  border: 1px solid #fcfcfc;
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

.sliding_bar {
  .tooltipValue {
    top: 0px;
  }
}
</style>
