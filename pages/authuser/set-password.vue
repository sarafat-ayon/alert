<template>
  <transition name="my-layouts">
    <set-password-modal></set-password-modal>
  </transition>
</template>

<script>
import SetPasswordModal from '~/components/PasswordConfirmationModal.vue'
export default {
  components: {
    SetPasswordModal,
  },
  auth: false,
  layout: 'auth',
}
</script>

<style scoped>
.my-layouts-enter-active,
.my-layouts-leave-active {
  transition: opacity 0.5s;
}
.my-layouts-enter,
.my-layouts-leave-active {
  opacity: 0;
}
</style>
