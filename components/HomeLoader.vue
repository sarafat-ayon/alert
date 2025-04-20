<template>
  <div>
    <div class="loaderWrapper">
      <div
        class="
          w-10
          h-10
          bg-orange-dark
          absolute
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          circle
        "
        style="top: 160px"
      ></div>
      <div class="loadind_div">
        <p class="opacity-0 text-center text-gray-900 loading_text">
          Loading...
        </p>
      </div>
    </div>
    <!--    <div
      class="
        absolute
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        loadind_div
      "
    >
      <button
        class="
          w-12.1
          h-12.1
          text-center text-white-300
          bg-orange-dark
          rounded-full
          mr-2.5
          border-none
          outline-none
          setup
          loading
        "
      ></button>
      <p class="opacity-0 text-center text-gray-900 loading_text">Loading...</p>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingComponent: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.loaderWrapper {
  @apply w-full h-screen;
  z-index: 302;
  position: absolute;
  background: #171e26;
  top: 0;
  left: 0;
  right: 0;
  animation-name: hideBody;
  animation-duration: 3s;
  animation-delay: 2.5s;
  animation-iteration-count: 1;
}

.loadind_div {
  @apply absolute
  left-1/2
  transform
  -translate-x-1/2 -translate-y-1/2;
  top: 220px;
  transition: linear;

  .circle {
    opacity: 0;
    animation-name: animateCircle;
    animation-duration: 2s;
    transition: linear;
  }
}

@keyframes hideBody {
  0% {
    @apply w-full;
    right: 0;
  }

  100% {
    @apply w-0;
    right: 300px;
  }
}

@keyframes animateCircle {
  0% {
    @apply w-20;
  }

  50% {
    opacity: 0;
  }

  100% {
    @apply w-10;
    opacity: 0;
  }
}

.loading {
  animation: width 1s linear;
}

.loading_text {
  animation: opacity 2.5s linear;
}

@keyframes opacity {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  /* 25% {
    opacity: 0.5;
  } */
  30% {
    opacity: 0.5;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.5;
  }
  /* 75% {
    opacity: 0.5;
  } */
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
