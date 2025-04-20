<template>
  <div class="starter-modal">
    <div class="setup-container h-full">
      <!-- <transition mode="in-out" name="fadeIn"> -->
      <div class="account-wrapper">
        <div class="account-setup">
          <div class="container">
            <div class="content-wrapper">
              <Payment></Payment>
            </div>
          </div>
        </div>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import Payment from '~/components/setup/account/Payment.vue'

export default {
  name: 'Landing',
  components: {
    Payment,
  },
  layout: 'payment',
  middleware: ['home'],
  data() {
    return {}
  },
  layoutTransition: {
    name: 'my-layouts',
    mode: '',
  },
}
</script>

<style lang="scss" scoped>
.starter-modal {
  height: 100%;
  background-color: #373e46;
  transition: all 1s ease-in-out;
  // box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
  //   rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
  //   rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: rgba(0, 0, 0, 3) 0px 5px 20px;
  @apply w-full text-center flex justify-center;

  .setup-container {
    // Need component implementation to make relative
    @apply w-full h-full flex overflow-hidden;
  }
}
.account-wrapper {
  @apply w-full h-full overflow-y-auto md:overflow-hidden flex flex-col md:block;
  .account-setup {
    transition: all 1s ease-in-out;
    @apply h-full w-full md:pt-40 pt-28 flex justify-center flex-grow overflow-y-auto md:overflow-hidden; // pt-10
    .container {
      @apply md:w-3/4 h-full flex flex-col items-center pt-4 md:pb-4 overflow-x-hidden;
      .content-wrapper {
        transition: all 1s ease-in-out;
        // opacity: 0;
        // max-height: 100%;
        // @apply w-full flex-grow flex justify-center overflow-hidden;
        @apply w-full h-full flex-grow flex justify-center overflow-y-auto md:overflow-hidden;
        &.fadeIn {
          opacity: 1;
        }
      }
    }
  }
}
</style>