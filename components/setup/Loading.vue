<template>
  <div class="loading-wrapper" :class="expand ? 'fadeIn' : ''">
    <div class="loading" :class="expand ? 'expand' : ''">
      <div class="loading-ball"></div>
      <transition name="fadeIn">
        <div v-if="showLoading" class="loading-txt">loading...</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      expand: false,
      showLoading: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.expand = true
    }, 1000)
    setTimeout(() => {
      this.showLoading = true
    }, 1000)
    setTimeout(() => {
      this.showLoading = false
    }, 2000)
    setTimeout(() => {
      this.updateSetupContent('account-setup')
    }, 4000)
  },
  methods: {
    ...mapActions({
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>

<style lang="scss" scoped>
.loading-wrapper {
  opacity: 0;
  @apply w-full h-full p-4 absolute overflow-hidden;
  &.fadeIn {
    opacity: 1;
  }
  .loading {
    transition: all 2s ease-in-out 1s;
    @apply w-full md:w-3/4 flex flex-col justify-center md:pt-26 pt-0; // pt-10
    .loading-ball {
      width: 128px;
      height: 40px;

      @apply bg-yellow-primary rounded-full m-auto;
    }
    .loading-txt {
      @apply text-white;
    }
    &.expand {
      width: 100%;
      .loading-ball {
        animation: stretch 2.5s linear 1s;
        animation-fill-mode: forwards;
      }
    }
    @keyframes stretch {
      0% {
        width: 128px;
      }
      25% {
        width: 40px;
      }
      50% {
        width: 40px;
      }
      75% {
        width: 80px;
      }
      100% {
        width: 128px !important;
      }
    }
  }
}
// fadeIn transition
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 1s ease-in-out;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
}
</style>
