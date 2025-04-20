<template>
  <div class="w-full h-full p-4 scroll">
    <div class="call-record-wrapper flex space-x-3 items-center justify-end">
      <div class="cursor-pointer flex items-center gap-2 z-20">
        <div class="zoom-icon-container shadow-lg">
          <fa
            class="text-white text-lg"
            :icon="['fas', 'search-plus']"
            @click="zoomIn"
          />
        </div>
        <div class="zoom-icon-container shadow-lg">
          <fa
            class="text-white text-lg"
            :icon="['fas', 'search-minus']"
            @click="zoomOut"
          />
        </div>
      </div>
      <div
        class="zoom-icon-container shadow-lg cursor-pointer"
        @click="$store.commit('home/EXPAND_FULL_IMAGE', false)"
      >
        <fa class="text-white text-lg" :icon="['fas', 'times']" />
      </div>
    </div>

    <div
      v-if="selectedVideo.privacy !== 'deleted'"
      id="zoomContainer"
      ref="zoom"
      class="
        mt-6
        flex-grow
        transition-all
        duration-500
        ease-in-out
        w-full
        zoomcontainer
      "
      v-html="selectedVideo.embedHtml"
    ></div>
    <div
      v-else
      id="zoomContainer"
      ref="zoom"
      class="
        mt-6
        flex-grow
        transition-all
        duration-500
        ease-in-out,
        zoomcontainer
      "
    >
      <video class="w-full h-full" controls="controls">
        <source :src="selectedVideo.embedHtml ? selectedVideo.embedHtml : ''" />
        <source :src="selectedVideo.embedHtml ? selectedVideo.embedHtml : ''" />
      </video>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    selectedVideo: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},

  data() {
    return {
      scale: 1,
      pointX: 0,
      pointY: 0,
    }
  },

  methods: {
    zoomIn(e) {
      const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX *= 1.2
      if (scaleX < 1.1) {
        this.pointY = this.pointY + 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      } else {
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
      }
    },
    zoomOut(e) {
      const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX /= 1.2
      if (scaleX >= 0.482252) {
        this.pointY = this.pointY - 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.zoom-icon-container {
  @apply bg-yellow-primary w-9 h-9 flex items-center justify-center rounded-full;
}
.zoomcontainer {
  transform: translate(0px, 0px) scale(1);
  height: calc(100% - 60px);
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  // scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
</style>