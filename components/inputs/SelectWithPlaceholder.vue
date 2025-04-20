<template>
  <div
    class="input overflow-hidden"
    :style="{
      '--color': color,
      '--background': background,
      '--caretBg': caretBg,
    }"
  >
    <label v-if="value.length === 0" class="label-design" :class="labelColor" :for="id">Select</label>
    <select
      id="selectStyleId"
      :value="value"
      :style="{ '--color': color }"
      :class="[
        classStyleName, textInput,
        toggleSelect ? 'round-remove' : '',
        toggleClass ? '' : 'selectStyle',
        value === 'Select' ? 'showSelect' : '',
      ]"
      v-bind="$attrs"
      tabindex="0"
      @input="$emit('input', $event.target.value)"
      @click="selectOption"
      @focusout="toggleSelect = false"
    >
      <option
        v-if="placeHolder"
        :class="[value === 'Select' ? 'showSelect' : '']"
        :disabled="placeHolderDisabled"
        :selected="placeHolder"
        class="placeHolder"
      >{{ placeHolder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
    <span class="select-toggle" :class="toggleButton">
      <fa
        :style="{ color: color }"
        :class="caretColor"
        :icon="['fas', toggleSelect ? 'caret-up' : 'caret-down']"
      />
    </span>
    <div v-if="error" class="error text-sm text-red-900">{{ errorMessage }}</div>
  </div>
</template>
<script>
export default {
  name: 'SelectWithPlaceholder',
  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    labelColor: {
      type: String,
      default: '',
    },
    value: {
      required: false,
      default: null,
    },
    options: {
      type: Array,
      required: false,
      default: () => {},
    },
    placeHolder: {
      type: String,
      required: false,
      default: '',
    },
    placeHolderDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorMessage: {
      type: String,
      required: false,
      default: 'Invalid',
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: '#4D4D4D',
    },
    caretColor: {
      type: String,
      required: false,
      default: 'text-white',
    },
    caretBg: {
      type: String,
      required: false,
      default: '',
    },
    background: {
      type: String,
      required: false,
      default: '#fff',
    },
    classStyleName: {
      type: String,
      required: false,
      default: '',
    },
    textInput: {
      type: String,
      required: false,
      default: '',
    },
    toggleButton: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      toggleSelect: false,
      toggleClass: false,
    }
  },
  watch: {
    value() {
      this.toggleSelect = false
    },
  },
  methods: {
    selectOption() {
      this.toggleSelect = !this.toggleSelect
      this.toggleClass = true
    },
  },
}
</script>
<style lang="scss" scoped>
.selectStyle {
  font-weight: 500 !important;
}
.input {
  $color: var(--color);
  $background-color: var(--background);
  $caretBg: var(--caretBg);
  @apply relative;
  select {
    color: $color;
    background-color: $background-color;
    // box-shadow: 0px 1px 3px rgba(34, 40, 49, 0.7);
    border-radius: 25px;
    @apply w-full py-2 md:px-4 px-3 focus:outline-none font-bold cursor-pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    // background-image: url("data:image/svg+xml;utf8,<svg height='24' fill='currentColor' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    // background-repeat: no-repeat;
    // background-position-x: 98%;
    // background-position-y: center;
    option {
      @apply font-semibold lg:text-md text-xs;
      &:disabled {
        @apply text-gray-500;
      }
      &:focus,
      &:checked,
      &:hover {
        color: white;
        background-color: $color !important;
      }
    }
  }
  .round-remove {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .select-toggle {
    color: #ffffff;
    background: $caretBg;
    @apply absolute top-2 right-2 pointer-events-none;
    svg {
      @apply text-2xl;
    }
    padding-left: 3px;
  }
  select option:checked {
    background: linear-gradient(#d6d6d6, #d6d6d6);
    background-color: dodgerblue !important; /* for IE */
    color: white !important;
  }
  select option:disabled {
    color: $color !important;
    font-weight: bold;
  }
}
select.searchPageScrollWidth::-webkit-scrollbar {
  width: 2px;
}
select.searchPageScrollStyle::-webkit-scrollbar-track {
  background-color: #5b5fcc;
}
select.searchPageScrollStyle::-webkit-scrollbar-thumb {
  background-color: #5b5fcc;
}
.label-design {
  position: absolute;
  left: 12px;
  top: 8px;
  opacity: 0.5;
}
.showSelect option:checked {
  opacity: 0.5;
}
.showSelect option:selected {
  opacity: 0.5;
}
@media (min-height: 540px) and (max-height: 703px) and (min-width: 768px) {
  .textInput {
    height: 36px !important;
    padding-top: 6px !important;
  }
  .toggleButton{
    height: 16px !important;
    top: 6px !important;
  }
}
</style>
