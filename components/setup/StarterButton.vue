<template>
  <section>
    <button
      class="pricing-btn"
      :class="[
        starterExpanded && !starterAccountMaximized ? 'expanded' : '',
        starterCollapse && !starterAccountMaximized ? 'collapse' : '',
        starterAccountMaximized ? 'hidden' : 'block',
      ]"
      @click="openStarterModal()"
    >
      <transition name="fadeIn">
        <span v-if="!starterExpanded && !starterFullExpand">Pricing</span>
      </transition>
    </button>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      starterFullExpand: false,
    }
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      starterCollapse: 'starterCollapse',
      showSignUp: 'showSignUp',
      starterMaximized: 'starterMaximized',
      starterAccountMaximized: 'starterAccountMaximized',
    }),
    ...mapState({
      showLogin: 'showLogin',
    }),
  },
  watch: {
    starterAccountMaximized(data) {
      if (data) {
        this.starterFullExpand = true
      } else {
        setTimeout(() => {
          this.starterFullExpand = false
        }, 1000)
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.$route.query.pricing === 'true' && !this.landingLoader) {
        this.openStarterModal()
      }
    }, 1000)
  },
  methods: {
    openStarterModal() {
      this.show_login(false)
      setTimeout(() => {
        this.landing_content(false)
      }, 500)
      this.expand_starter_modal(true)
      this.collapse_starter_modal(false)
      setTimeout(() => {
        this.show_sign_up(true)
      }, 1000)
      setTimeout(() => {
        this.updateSetupContent('price-plan')
      }, 1000)
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      updateSetupContent: 'updateSetupContent',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
    }),
  },
}
</script>

<style lang="scss" scoped>
.pricing-btn {
  width: 180px;
  max-width: 600px; //1237px
  // margin-top: 30px;
  transition: all 1s ease-in-out;
  @apply h-10 rounded-full font-bold text-md bg-yellow-primary text-white focus:outline-none outline-none;
  position: absolute;
  bottom: 30px;
  top: 30%;
  left: 50%;
  transform: translate(-50%);

  &.expanded {
    // @apply w-full md:w-80 mx-4 md:mb-0 md:mx-0 mt-20;
    @apply rounded-full;
    animation: box 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  &.collapse {
    animation: collap 1s ease-in-out;
    animation-fill-mode: forwards;
  }
}

@keyframes box {
  0% {
    width: 180px;
    height: 40px;
    top: 30%;
    @apply rounded-2xl;
  }

  // 50%{
  //   min-width: 600px;
  // }

  100% {
    width: 45%; //65%
    height: 70%; //93%
    max-height: 420px;
    top: 6%;
    // min-width: 600px;
    @apply rounded-2xl;
  }
}

@keyframes collap {
  0% {
    width: 45%; //65%
    height: 70%; //93%
    max-height: 420px;
    top: 6%;
    // min-width: 600px;
    @apply rounded-2xl;
  }

  98% {
    @apply rounded-2xl;
  }

  100% {
    top: 30%;
    width: 180px;
    height: 40px;
  }
}

.fadeIn-enter-active {
  transition: all 0.4s ease-in-out 0.8s;
}

.fadeIn-leave-active {
  transition: all 0.4s ease-in-out;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
}

@media (max-width: 1023px) {
  @keyframes box {
    0% {
      width: 180px;
      height: 40px;
      top: 30%;
      @apply rounded-2xl;
    }

    // 50%{
    //   min-width: 600px;
    // }

    100% {
      width: 60%; //65%
      height: 70%; //93%
      max-height: 500px;
      top: 6%;
      // min-width: 600px;
      @apply rounded-2xl;
    }
  }

  @keyframes collap {
    0% {
      width: 60%; //65%
      height: 70%; //93%
      max-height: 500px;
      top: 6%;
      // min-width: 600px;
      @apply rounded-2xl;
    }

    98% {
      @apply rounded-2xl;
    }

    100% {
      top: 30%;
      width: 180px;
      height: 40px;
    }
  }
}

@media (min-height: 600px) and (max-height: 887px) {
  @keyframes box {
    0% {
      width: 180px;
      height: 40px;
      top: 30%;
      @apply rounded-2xl;
    }

    // 50%{
    //   min-width: 600px;
    // }

    100% {
      width: 60%; //65%
      height: 70%; //93% 88%
      max-height: 520px;
      top: 6%;
      // min-width: 600px;
      @apply rounded-2xl;
    }
  }
  @keyframes collap {
    0% {
      width: 60%; //65%
      height: 70%; //93% 88%
      max-height: 520px;
      top: 6%;
      // min-width: 600px;
      @apply rounded-2xl;
    }

    98% {
      @apply rounded-2xl;
    }

    100% {
      top: 30%;
      width: 180px;
      height: 40px;
    }
  }
}

@media (max-width: 767px) {
  @keyframes box {
    0% {
      width: 180px;
      height: 40px;
      top: 30%;
      @apply rounded-2xl;
    }

    100% {
      width: 90%;
      height: 90%;
      max-height: 520px;
      top: 0%;
      @apply rounded-2xl;
    }
  }

  @keyframes collap {
    0% {
      width: 90%;
      height: 90%;
      max-height: 520px;
      top: 0%;
      @apply rounded-2xl;
    }

    98% {
      @apply rounded-2xl;
    }

    100% {
      top: 30%;
      width: 180px;
      height: 40px;
    }
  }
}
</style>
