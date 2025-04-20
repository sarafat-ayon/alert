<template>
  <div class="content">
    <div id="card" ref="checkoutRef"></div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
// import Stripe from 'stripe'
import { CARDINFO } from '~/constants/urls'

export default {
  name: 'Welcome',
  components: {},
  mounted() {
    if (this.$stripe) {
      const elements = this.$stripe.elements();
      const card = elements.create('card', {});
      // Add an instance of the card Element into the `card-element` <div>
      card.mount('#card');
    }
  },
  methods: {
    checkout() {
      this.$refs.checkoutRef.submit()
    },
    tokenCreated(token) {
      this.$axios
        .post(CARDINFO, {
          token: token?.id,
        })
        .then((res) => {
          console.log(res)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  background-image: url('@/assets/background.png');
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
  color: #393e46;
  background-repeat: no-repeat;
  background-size: cover;
  @apply relative w-full h-screen overflow-hidden flex flex-col;
  header {
    .login-btn {
      @apply text-white outline-none border-none;
    }
  }
  main {
    @apply flex-grow w-full flex flex-col justify-center items-center;
    .logo-wrapper {
      @apply absolute;
      &.left {
        width: 60px;
        height: 60px;
        @apply absolute left-10 2xl:left-14 top-0;
      }
      &.center {
        @apply top-20 left-1/2 lg:w-34 w-26;
        transform: translate(-50%, 0);
      }
    }
    .intro {
      @apply mx-auto w-3/4;
    }
  }
}

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

// SidebarIn transition
.slideRight-enter-active,
.slideRight-leave-active {
  transition: all 1s ease-in-out;
}

.slideRight-enter-to,
.slideRight-leave {
  transform: translate(0%);
}

.slideRight-leave-to,
.slideRight-enter {
  transform: translate(100%);
}
// SlideIn transition
.slideIn-enter-active {
  transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-in-out 0.5s;
}
.slideIn-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-in-out;
}

.slideIn-enter {
  opacity: 0;
  transform: translate(100%);
}

.slideIn-enter-to {
  opacity: 1;
  transform: translate(0%);
}

.slideIn-leave {
  opacity: 1;
  transform: translate(0%);
}

.slideIn-leave-to {
  opacity: 0;
  transform: translate(-100%);
}

@media (max-width: 767px) {
  .svg-inline--fa.fa-w-16 {
    width: 2em !important;
  }
  .a {
    font-size: 20px !important;
  }
}
</style>
