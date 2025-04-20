<template>
  <button
    type="submit"
    :style="{
      color: backgroundColor,
      borderColor: backgroundColor,
    }"
    class="
      w-44
      py-2
      rounded-full
      border
      outline-none
      font-bold
      text-base
      finish
    "
    @click="finish()"
  >
    Finish
  </button>
</template>

<script>
export default {
  name: 'FinishBtn',
  props: {
    backgroundColor: {
      type: String,
      default: '#e4801d',
    },
  },
  methods: {
    finish() {
      this.$emit('finish')
    },
  },
}
</script>
