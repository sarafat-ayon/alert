<template>
  <section>
    <div
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
          w-32
          h-32
          text-center text-white-300
          bg-orange-dark
          rounded-full
          border-none
          outline-none
          setup
          loading
        "
      ></button>
      <p class="opacity-0 text-center text-gray-900 loading_text">Loading...</p>
    </div>
  </section>
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

<style scoped>
.loadind_div {
  top: 95px;
  animation: loadingdiv 1.5s linear;
  animation-fill-mode: forwards;
  /* animation-delay: 0.8s; */
}

@keyframes loadingdiv {
  0% {
    top: 95px;
  }
  20% {
    top: 95px;
  }
  40% {
    top: 95px;
  }
  60% {
    top: 95px;
  }
  70% {
    top: 95px;
  }
  75% {
    top: 95px;
  }
  80% {
    top: 98px;
  }
  85% {
    top: 101px;
  }
  90% {
    top: 104px;
  }
  95% {
    top: 107px;
  }
  100% {
    top: 110px;
  }
}

.loading {
  animation: width 1s linear;
  animation-fill-mode: forwards;
}

@keyframes width {
  0% {
    width: 128px;
    height: 50px;
  }

  25% {
    width: 106px;
    height: 47.5px;
  }

  50% {
    width: 84px;
    height: 45px;
  }

  75% {
    width: 62px;
    height: 42.5px;
  }

  100% {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
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
