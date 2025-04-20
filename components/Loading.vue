<template>
  <section
    class="absolute top-0 flex justify-center items-center h-full w-full z-9999"
    :class="downloadLoader ? '' : 'bg-ash-dark'"
  >
    <!-- <div id="defaultLoader" class="loader">
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span>
      <span style="--i: 8"></span>
      <span style="--i: 9"></span>
      <span style="--i: 10"></span>
      <span style="--i: 11"></span>
      <span style="--i: 12"></span>
      <span style="--i: 13"></span>
      <span style="--i: 14"></span>
      <span style="--i: 15"></span>
      <span style="--i: 16"></span>
      <span style="--i: 17"></span>
      <span style="--i: 18"></span>
      <span style="--i: 19"></span>
      <span style="--i: 20"></span>
    </div> -->
    <div :id="selectedRotation"></div>
  </section>
</template>


<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      selectedRotation: '',
      showDefaultLoader: false,
    }
  },
  head() {
    return {
      script: [
        {
          src: `/loader/attachedRotation.js`,
          body: true,
        },
        {
          src: `/loader/blinking.js`,
          body: true,
        },
        {
          src: `/loader/elementRotationInner.js`,
          body: true,
        },
        {
          src: `/loader/elementRotationOuter.js`,
          body: true,
        },
        {
          src: `/loader/polygon.js`,
          body: true,
        },
        {
          src: `/loader/rotation.js`,
          body: true,
        },
      ],
    }
  },
  computed: {
    ...mapState('archive', ['downloadLoader']),
  },
  mounted() {
    const items = [
      'attachedRotation',
      'blinking',
      'elementRotationInner',
      'elementRotationOuter',
      'polygon',
      'rotation',
    ]

    this.selectedRotation = items[Math.floor(Math.random() * items.length)]
  },
}
</script>


<style lang="scss" scoped>
// section {
//   animation: animateBG 10s linear infinite;
// }
// @keyframes animateBG {
//   0% {
//     filter: hue-rotate(0deg);
//   }
//   100% {
//     filter: hue-rotate(360deg);
//   }
// }
.loader {
  position: relative;
  width: 100px;
  height: 100px;
}
.loader span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}
.loader span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  background-image: linear-gradient(#8db230, #8db230, #8db230);
  border-radius: 50%;
  box-shadow: 0 0 10px #8db230, 0 0 20px #8db230, 0 0 40px #8db230,
    0 0 60px #8db230, 0 0 80px #8db230, 0 0 100px #8db230;
  animation: animate 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes animate {
  0% {
    transform: scale(1);
  }
  80%,
  100% {
    transform: scale(0);
  }
}
</style>