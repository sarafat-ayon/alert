<template>
  <section>
    <div
      class="
        h-full
        login
        flex flex-row
        justify-center
        absolute
        right-0
        bg-dark-100
        px-21
      "
    >
      <div>
        <button
          class="
            w-12.1
            h-12.1
            text-white
            bg-orange-dark
            rounded-full
            mr-2.5
            border-none
            outline-none
            font-medium
            setup
            loading
          "
        ></button>
        <p class="opacity-0 text-center text-white loading_text">Loading...</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.setup {
  transform: translateY(354px);
}

.loading {
  animation: width 2s linear;
  animation-fill-mode: forwards;
}

@keyframes width {
  0% {
    width: 176px;
    height: 50px;
    transform: translateY(354px);
  }

  25% {
    width: 140.8px;
    height: 50px;
    transform: translateY(279px);
  }

  50% {
    width: 105.6px;
    height: 50px;
    transform: translateY(214px);
  }

  75% {
    width: 70.5px;
    height: 50px;
    transform: translateY(145px);
  }

  100% {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transform: translateY(75px);
  }
}

.loading_text {
  transform: translateY(78px);
  animation: opacity 2s linear 2s;
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

.login {
  width: 450px;
}

@media (max-width: 425px) {
  .login {
    width: 100%;
  }

  /* .show {
    width: 100%;
    right: 0px;
  }

  .hide {
    width: 100%;
    right: -100%;
  } */
}
</style>
