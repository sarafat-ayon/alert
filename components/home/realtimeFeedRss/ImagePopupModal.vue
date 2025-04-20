<template>
  <transition name="imagePopup">
    <div
      v-if="showPopupModal"
      class="
        fixed
        md:h-5/6
        h-4/6
        max-h-120
        w-5/6
        max-w-5xl
        bg-black
        z-9999
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <fa
        class="
          absolute
          top-4
          right-4
          text-orange-dark text-center
          xl:text-2xl
          md:text-xl
          text-2xl
          font-normal
          cursor-pointer
          z-9
        "
        :icon="['fas', 'times']"
        @click="closePopupImage()"
      />
      <div
        class="
          md:w-3/4 md:h-3/4
          w-3/4
          fixed
          z-9999
          top-1/2
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
        "
      >
        <carousel
          :per-page="1"
          loop
          :pagination-enabled="false"
          :adjustable-height="false"
          :navigation-enabled="true"
          class="w-full h-full"
        >
          <slide
            v-for="(carouselImage, sIndex) in popupImages"
            :key="sIndex"
            class="w-full h-full"
          >
            <img class="w-full h-full bg-cover" :src="carouselImage" alt="" />
          </slide>
        </carousel>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    popupImages: {
      type: Array,
      default: () => {},
    },
    showPopupModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closePopupImage() {
      this.$emit('close-image-popup')
    },
  },
}
</script>

<style scoped>
.VueCarousel-wrapper {
  @apply h-full;
}
.VueCarousel-inner {
  @apply h-full;
}

.imagePopup-enter-active,
.imagePopup-leave-active {
  transition: opacity 0.1s;
}
.imagePopup-enter,
.imagePopup-leave-to {
  opacity: 0;
}
</style>