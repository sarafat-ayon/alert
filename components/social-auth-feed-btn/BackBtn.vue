<template>
  <button
    type="submit"
    :style="{
      color: backgroundColor,
      borderColor: backgroundColor,
    }"
    class="w-44 py-2 rounded-full border outline-none font-bold text-base back"
    @click="back()"
  >
    Back
  </button>
</template>

<script>
export default {
  name: 'BackBtn',
  props: {
    backgroundColor: {
      type: String,
      default: '#e4801d',
    },
  },
  methods: {
    back() {
      this.$emit('back')
    },
  },
}
</script>