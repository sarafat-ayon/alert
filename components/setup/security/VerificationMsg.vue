<template>
  <div class="verification-message my-3 mb-10 text-center text-white">
    <span class="border-4 border-white rounded-full w-4 h-4 px-2 py-1.5">
      <fa :icon="['fas', status ? 'check' : 'times']" />
    </span>
    <div class="my-4">{{ message }}</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: false,
      default: 'You are verified',
    },
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
