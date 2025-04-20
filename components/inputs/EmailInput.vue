<template>
  <div class="input" :style="{ '--color': color, '--background': background }">
    <label class="mb-1.5" :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="[textInput]"
      type="email"
      :value="value"
      :placeHolder="placeHolder"
      v-bind="$attrs"
      @change="emailCheck()"
      @input="$emit('input', $event.target.value)"
    />
    <div v-if="error" class="error text-sm text-red-900">
      {{ errorMessage }}
    </div>
    <div v-if="emailExist" class="error text-sm text-red-900">
      Email Already Exist. Please try another email
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
      type: String,
      required: false,
      default: null,
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
    emailExist: {
      type: Boolean,
      required: false,
      default: false,
    },
    textInput: {
      type: String,
      required: false,
      default: '',
    },
  },
  watch:{
    error(data){
      console.log(data);
    },
    errorMessage(data){
      console.log(data);
    }
  },
  data() {
    return {}
  },
  methods: {
    emailCheck() {
      this.$emit('onchangeEmail')
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
    &::placeholder {
      color: var(--color);
      opacity: 0.5;
    }
  }
}
.alert_notify-email {
  @apply mb-0;
  label {
    @apply hidden;
  }
  input {
    @apply h-10 shadow-none;
  }
}
.new_alert_notify-email {
  @apply mb-0;
  label {
    @apply hidden;
  }
  input {
    @apply h-10 shadow-none;
  }
}
@media (min-height: 540px) and (max-height: 703px) and (min-width: 768px) {
  .textInput {
    height: 36px !important;
  }
}
</style>
