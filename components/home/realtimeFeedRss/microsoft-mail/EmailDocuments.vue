<template>
  <section class="w-full h-full flex flex-col">
    <div class="w-full flex justify-between items-center space-x-4 break-all">
      <div class="text-xl text-orange-dark font-bold line-clamp-1">
        {{ singleMessage[currentIndex].name }}
      </div>
      <div class="cursor-pointer flex items-center gap-2 z-20">
        <template
          v-if="
            attachment.mimeType === 'image/jpeg' ||
            attachment.mimeType === 'image/svg+xml' ||
            attachment.mimeType === 'image/png' ||
            attachment.mimeType === 'image/webp' ||
            attachment.mimeType === 'image/bmp' ||
            attachment.mimeType === 'application/pdf'
          "
        >
          <div class="zoom-icon-container shadow-lg">
            <fa
              class="text-white text-lg block"
              :icon="['fas', 'search-plus']"
              @click="zoomIn"
            />
          </div>
          <div class="zoom-icon-container shadow-lg">
            <fa
              class="text-white text-lg block"
              :icon="['fas', 'search-minus']"
              @click="zoomOut"
            />
          </div>
        </template>
        <div
          v-if="!expandFullImage"
          class="zoom-icon-container shadow-lg"
          @click="expandImage"
        >
          <fa class="text-white text-lg" :icon="['fas', 'expand']" />
        </div>

        <div
          class="zoom-icon-container shadow-lg"
          @click="
            expandFullImage
              ? collapseImage()
              : store.commit('home/SET_EMAIL_DYNAMIC_COMP', {
                  comp: 'EmailContent',
                  messageId,
                })
          "
        >
          <fa class="text-white text-lg" :icon="['fas', 'times']" />
        </div>
      </div>
    </div>
    <div
      class="w-full py-4"
      :class="
        attachment.mimeType === 'image/jpeg' ||
        attachment.mimeType === 'image/svg+xml' ||
        attachment.mimeType === 'image/png' ||
        attachment.mimeType === 'image/webp' ||
        attachment.mimeType === 'image/bmp' ||
        attachment.mimeType === 'application/pdf' ||
        attachment.mimeType === 'video/mp4' ||
        attachment.mimeType === 'video/quicktime' ||
        attachment.mimeType === 'video/webm'
          ? 'inner-body'
          : 'flex-grow'
      "
    >
      <transition name="imagezoom">
        <div id="zoom" ref="zoom" class="overflow-hidden w-full h-full zoom">
          <DisplayDocument 
            @checkDown="mouseDown"
            @checkUp="mouseUp"
            @checkMove="mouseMove"
          />
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import DisplayDocument from '~/components/shared/email/DisplayDocument.vue'

export default defineComponent({
  name: 'Email',
  // eslint-disable-next-line vue/no-unused-components
  components: { DisplayDocument },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const store = useStore()

    return {
      singleMessage: computed(() => store.state.home.singleMessage),
      expandFullImage: computed(() => store.state.home.expandFullImage),
      messageId: computed(() => store.state.home.messageId),
      index: computed(() => store.state.home.index),
      currentIndex: computed(() => store.state.home.currentIndex),
      attachment: computed(() => store.state.home.attachment),
      store,
      isDesktop: breakpoints.greater('md'),
    }
  },
  data() {
    return {
      source1:
        'https://dev-api.sharparchive.com/api/social/file/181a3e3e3679199f/SA-IN-DEV-165261361675683.pdf?provider=Google&u=24&a=244&c=mail',
      scale: 1,
      pointX: 0,
      pointY: 0,
      start: {
        x: 0,
        y: 0,
      },
      count: 0,
      panning: false,
      currentActiveSlideIndex: 0,
      Next: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
            <defs>
              <style>
                .bg-1 {
                  fill: #e4801d;
                }

                .bg-2 {
                  fill: #fff;
                }
              </style>
            </defs>
            <g id="slide-right" transform="translate(-1503 -151)">
              <circle id="button" class="bg-1" cx="17.5" cy="17.5" r="17.5" transform="translate(1503 151)"/>
              <path id="ic_chevron_right_24px" class="bg-2" d="M10.7,6,8.59,8.115,15.46,15,8.59,21.885,10.7,24l9-9Z" transform="translate(1506.353 153.5)"/>
            </g>
          </svg>
          `,
      Prev: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
              <defs>
                <style>
                  .bg-1 {
                  fill: #e4801d;
                }
                .bg-2 {
                  fill: #fff;
                }
                </style>
              </defs>
              <g id="slide-left" transform="translate(-1503 -151)">
                <circle id="button" class="bg-1" cx="17.5" cy="17.5" r="17.5" transform="translate(1503 151)"/>
                <path id="ic_chevron_left_24px" class="bg-2" d="M19.115,8.115,17,6,8,15l9,9,2.115-2.115L12.245,15Z" transform="translate(1506.943 153.5)"/>
              </g>
            </svg>`,
    }
  },
  computed: {
    ...mapGetters('home', ['allEmails']),
  },
  watch: {
    currentIndex(data) {
      this.currentActiveSlideIndex = data
      this.initialImageSize()
    }
  },
  mounted() {
    this.currentActiveSlideIndex = this.currentIndex
    this.initialImageSize()
  },
  methods: {
    initialImageSize() {
      this.pointX= 0
      this.pointY = 0
      this.scale = 1
      this.panning = false
      if (this.singleMessage.length > 0) {
        document.querySelectorAll('.zoomcontainer').forEach((item, index) => { 
          item.setAttribute('id', `${index}`)
        })
        // setTimeout(() => {
          document.querySelectorAll('.VueCarousel-dot').forEach((item) => {
            item.removeAttribute('title')
          })

          // let multipleInitialImageSize
          document.querySelectorAll('.multiplePicture').forEach((item, index) => {
            setTimeout(() => {
              item.style.transform = `translate(0px, 0px) scale(1)`
              item.style.transformOrigin= 'top'
            })
            if (index === this.currentActiveSlideIndex) {
              item.classList.add('VueCarousel-slide-active')
            } else if (item.classList.contains('VueCarousel-slide-active')) {
              item.classList.remove('VueCarousel-slide-active')
            }
            // multipleInitialImageSize = item
            // multipleInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
          })
        // }, 100)
      }
    },
    zoomIn(e) {
      if (this.singleMessage.length > 0) {
        const display1 = document.querySelectorAll('.zoomcontainer')
        display1.forEach((item) => {
          if (item.classList.contains('VueCarousel-slide-active')) {
            this.count = this.count + 1
            // item.removeAttribute('id')
            // item.classList.remove('multiplePicture')
            let vueCarouselActive
            document
              .querySelectorAll('.VueCarousel-slide-active')
              .forEach((item1) => {
                vueCarouselActive = item1
                const vueCarouselActivematrix =
                  window.getComputedStyle(vueCarouselActive).transform
                const vueCarouselActivematrixArray = vueCarouselActivematrix
                  .replace('matrix(', '')
                  .split(',')
                let vueCarouselActivescaleX = parseFloat(
                  vueCarouselActivematrixArray[0]
                ) // convert from string to number
                vueCarouselActivescaleX *= 1.2
                this.scale = vueCarouselActivescaleX
                // if (vueCarouselActivescaleX < 1.1) {
                vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${vueCarouselActivescaleX} )`
                vueCarouselActive.style.transformOrigin= 'top'
                // } else {
                  // vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
                // }
              })
          }
        })
        if (this.count < 1) {
          const display = document.getElementById(`${this.currentActiveSlideIndex}`)
          const matrix = window.getComputedStyle(display).transform
          const matrixArray = matrix.replace('matrix(', '').split(',')
          let scaleX = parseFloat(matrixArray[0]) // convert from string to number
          scaleX *= 1.2
          this.scale = scaleX
          // if (scaleX < 1.1) {
          display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
          display.style.transformOrigin= 'top'
          // } else {
            // display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
          // }
        }
      }
    },
    zoomOut(e) {
      if (this.singleMessage.length > 0) {
        const display1 = document.querySelectorAll('.zoomcontainer')
        display1.forEach((item, index) => {
          if (item.classList.contains('VueCarousel-slide-active')) {
            // item.removeAttribute('id')
            this.count = this.count + 1
            // item.classList.remove('multiplePicture')
            let vueCarouselActive
            document
              .querySelectorAll('.VueCarousel-slide-active')
              .forEach((item) => {
                vueCarouselActive = item
                const vueCarouselActivematrix =
                  window.getComputedStyle(vueCarouselActive).transform
                const vueCarouselActivematrixArray = vueCarouselActivematrix
                  .replace('matrix(', '')
                  .split(',')
                let vueCarouselActivescaleX = parseFloat(
                  vueCarouselActivematrixArray[0]
                ) // convert from string to number
                vueCarouselActivescaleX /= 1.2
                this.scale = vueCarouselActivescaleX
                if (vueCarouselActivescaleX >= 0.482252) {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${vueCarouselActivescaleX} )`
                  vueCarouselActive.style.transformOrigin= 'top'
                }
              })
          }
        })
        if (this.count < 1) {
          const display = document.getElementById(`${this.currentActiveSlideIndex}`)
          const matrix = window.getComputedStyle(display).transform
          const matrixArray = matrix.replace('matrix(', '').split(',')
          let scaleX = parseFloat(matrixArray[0]) // convert from string to number
          scaleX /= 1.2
          this.scale = scaleX
          if (scaleX >= 0.482252) {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
            display.style.transformOrigin= 'top'
          }
        }
      }
    },
    setTransform() {
      const zoom = document.getElementById(`${this.currentActiveSlideIndex}`)
      zoom.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
      zoom.style.transformOrigin= 'top'
    },
    // For Move the Image in the screen
    mouseDown(e) {
      console.log('inner')
      console.log(e, 'down from email document')
      e.preventDefault()
      this.start = {
        x: e.clientX - this.pointX,
        y: e.clientY - this.pointY,
      }
      this.panning = true
    },
    mouseUp(e) {
      this.panning = false
    },
    mouseMove(e) {
      e.preventDefault()
      if (!this.panning) {
        return
      }
      this.pointX = e.clientX - this.start.x
      this.pointY = e.clientY - this.start.y
      this.setTransform()
    },
    expandImage() {
      this.$store.commit('home/EXPAND_FULL_IMAGE', true)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 500)
    },
    collapseImage() {
      this.$store.commit('home/EXPAND_FULL_IMAGE', false)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 500)
    },
    singleMessageImages() {
      return this.singleMessage.filter(
        (item) =>
          item.mimeType.includes('image/jpeg') ||
          item.mimeType.includes('image/svg+xml') ||
          item.mimeType.includes('image/png')
      )
    },
  },
})
</script>

<style scoped>
.zoom-icon-container {
  @apply bg-orange-dark w-9 h-9 flex items-center justify-center rounded-full;
}
.inner-body {
  height: calc(100% - 36px);
}
</style>