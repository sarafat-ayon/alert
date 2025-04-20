<template>
  <div
    class="input overflow-hidden"
    :style="{
      '--color': color,
      '--background': background,
      '--scroll-color': scrollColor,
      '--caretBg': caretBg,
      '--caretColor': caretColor,
    }"
  >
    <label :for="id">{{ label }}</label>
    <select
      :class="[classStyleName, toggleSelect ? 'round-remove' : '']"
      :style="{ '--color': color }"
      :value="value"
      v-bind="$attrs"
      tabindex="0"
      @input="$emit('input', $event.target.value)"
      @click="toggleSelect = !toggleSelect"
      @focusout="toggleSelect = false"
    >
      <option
        v-if="placeHolder"
        :disabled="placeHolderDisabled"
        :selected="placeHolder"
      >
        {{ placeHolder }}
      </option>
      <option
        v-for="option in options"
        :key="option.id ? option.id : option.value"
        :value="responseById ? option.id : option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <span class="select-toggle">
      <fa
        :style="{ color: caretColor }"
        :icon="[
          'fas',
          toggleSelect || showVCelander ? 'caret-up' : 'caret-down',
        ]"
      />
    </span>
    <div v-if="error" class="error text-red-900">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
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
      default: '#fff',
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
    scrollColor: {
      type: String,
      required: false,
      default: '#fff',
    },
    classStyleName: {
      type: String,
      required: false,
      default: '',
    },
    responseById: {
      type: Boolean,
      required: false,
      default: false,
    },
    showVCelander: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggleSelect: false,
    }
  },
  watch: {
    value() {
      this.toggleSelect = false
    },
  },
}
</script>
<style lang="scss" scoped>
.input {
  $color: var(--color);
  $background-color: var(--background);
  $caretBg: var(--caretBg);
  $caretColor: var(--caretColor);
  @apply relative;
  label {
    @apply text-white block;
  }
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
        @apply text-gray-200;
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
    height: 24px;
    @apply absolute top-2 right-2 pointer-events-none;
    svg {
      @apply text-2xl;
    }
    padding-left: 3px !important;
  }
  select option:checked {
    background: linear-gradient(#d6d6d6, #d6d6d6);
    background-color: dodgerblue !important; /* for IE */
    color: white !important;
  }
  // select option:disabled {
  //   color: #5b2121;
  //   font-weight: bold;
  // }
}
select.searchPageScrollWidth::-webkit-scrollbar {
  width: 2px;
}
select.searchPageScrollStyle::-webkit-scrollbar-track {
  background-color: var(--scroll-color);
}
select.searchPageScrollStyle::-webkit-scrollbar-thumb {
  background-color: var(--scroll-color);
}
.search-select-input {
  height: 40px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>