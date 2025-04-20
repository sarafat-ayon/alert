<template>
  <div class="input" :style="{ '--color': color, '--background': background }">
    <label class="mb-1.5" :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="[textInput]"
      :type="togglePassword ? 'password' : 'text'"
      :value="value"
      :name="name"
      :placeHolder="placeHolder"
      :autoComplete="autoComplete"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    />
    <span class="password-toggle opacity-50 rounded-r-full" :class="[textInput]">
      <fa
        :icon="['fas', togglePassword ? 'eye-slash' : 'eye']"
        @click="togglePassword = !togglePassword"
      />
    </span>
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
    value: {
      type: String,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    autoComplete: {
      type: String,
      required: false,
      default: '',
    },
    placeHolder: {
      type: String,
      required: false,
      default: 'Type something',
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
    background: {
      type: String,
      required: false,
      default: '#fff',
    },
    textInput: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      togglePassword: true,
    }
  },
}
</script>
<style lang="scss" scoped>
.input {
  $color: var(--color);
  $background-color: var(--background);
  @apply relative;
  label {
    @apply text-white block;
  }
  input {
    color: $color;
    background-color: $background-color;
    box-shadow: 0px 1px 3px rgba(142, 82, 0, 0.7);
    @apply w-full rounded-full py-2 px-4 focus:outline-none;
    &::placeholder {
      color: $color;
      opacity: 0.9;
    }
  }
  .password-toggle {
    color: $color;
    @apply absolute right-0 cursor-pointer;
    top: 1.9rem;
    opacity: 1;
    background-color: $background-color;
    padding: 8px 20px 8px 8px;
  }
}
@media (min-height: 540px) and (max-height: 703px) and (min-width: 768px) {
  .textInput {
    height: 36px !important;
  }
}
</style>
