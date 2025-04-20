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
      cancle
    "
    @click="cancel()"
  >
    Cancel
  </button>
</template>

<script>
export default {
  name: 'CancelBtn',
  props: {
    backgroundColor: {
      type: String,
      default: '#e4801d',
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>