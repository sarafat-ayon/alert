<template>
  <div class="w-full">
    <div class="verification-message my-3 mb-10 text-center text-white px-20">
      <span class="border-4 border-white rounded-full w-4 h-4 px-2 py-1.5">
        <fa :icon="['fas', 'check']" />
      </span>
      <div class="my-4">Your Mobile Number has been Successfully Verified</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationMessage',
  data() {
    return {}
  },
  methods: {},
}
</script>