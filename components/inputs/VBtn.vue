<template>
  <button
    class="btn"
    :style="{ '--color': color, '--background': background }"
    v-bind="$attrs"
    :disabled="accountProcess"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
      default: null,
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
    accountProcess: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
button {
  $color: var(--color);
  $background-color: var(--background);
  color: $color;
  background-color: $background-color;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
  width: 180px;
  @apply outline-none font-bold rounded-full py-2 px-2;
}
</style>
