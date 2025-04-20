<template>
  <div class="input" :style="{ '--color': color, '--background': background }">
    <label class="mb-1.5" :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="[placeHolderClass, textInput]"
      type="text"
      :name="name"
      :placeHolder="placeHolder"
      v-bind="$attrs"
      @focus="$emit('focus')"
      @keyup="$emit('keyup', $event)"
      @keypress="$emit('keypress', $event)"
      @input="$emit('input', $event.target.value)"
    />
    <div v-if="error" class="error text-sm text-red-900">{{ errorMessage }}</div>
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
    placeHolder: {
      type: String,
      required: false,
      default: 'Type something',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    placeHolderClass: {
      type: String,
      required: false,
      default: 'placeholder-orange-600 placeholder-opacity-50',
    },
    textInput: {
      type: String,
      required: false,
      default: '',
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
    rules: {
      type: Object,
      required: false,
      default: () => {},
    },
    color: {
      type: String,
      required: false,
      default: '#4D4D4D',
    },
    background: {
      type: String,
      required: false,
      default: '#fff',
    },
  },
}
</script>
<style lang="scss" scoped>
.input {
  $color: var(--color);
  $background-color: var(--background);
  label {
    @apply text-white block;
  }
  input {
    color: $color;
    background-color: $background-color;
    box-shadow: 0px 1px 3px rgba(142, 82, 0, 0.7);
    @apply w-full rounded-full py-2 px-4 focus:outline-none;
    // &::placeholder {
    //   color: $color;
    //   opacity: 0.5;
    // }
  }
}
.alert_notify-text {
  @apply mb-0;
  label {
    @apply hidden mb-0;
  }
  input {
    @apply h-10 shadow-none;
    &::placeholder {
      color: var(--color);
      opacity: 0.5;
    }
  }
}

.new-alert-text {
  label {
    @apply hidden;
  }
  input {
    @apply shadow-none;
    &::placeholder {
      color: var(--color);
      opacity: 0.5;
    }
  }
}

.new-general-alert-text { 
  input {
    @apply shadow-none;
    &::placeholder {
      color: #fff;
      font-weight: bold;
    }
  }
}



.new_alert_notify-text {
  @apply mb-0;
  label {
    @apply hidden mb-0;
  }
  input {
    @apply h-10 shadow-none;
    &::placeholder {
      color: var(--color);
      opacity: 0.5;
    }
  }
}
@media (min-height: 540px) and (max-height: 703px) and (min-width: 768px) {
  .textInput {
    height: 36px !important;
  }
}
</style>
