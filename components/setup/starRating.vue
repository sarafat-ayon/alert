<template>
  <div class="md:mt-3 mt-1 flex items-center space-x-1.5">
    <svg
      v-for="full in solidStar"
      :key="`${full}-full`"
      class="md:w-5 w-3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 19"
    >
      <defs>
        <style>
          .cls-1 {
            fill: #ed6e16;
          }
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            id="ic_star_24px-4"
            data-name="ic star 24px-4"
            class="cls-1"
            d="M10,15.27,16.18,19l-1.64-7L20,7.24l-7.19-.61L10,0,7.19,6.63,0,7.24,5.46,12,3.82,19Z"
          />
        </g>
      </g>
    </svg>

    <svg
      v-for="half in halfStar"
      :key="`${half}-half`"
      class="md:w-5 w-3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 19"
    >
      <defs>
        <style>
          .cls-1 {
            fill: #ed6e16;
          }
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            id="ic_star_half_24px"
            data-name="ic star half 24px"
            class="cls-1"
            d="M20,7.24l-7.19-.62L10,0,7.19,6.63,0,7.24,5.46,12,3.82,19,10,15.27,16.18,19l-1.63-7ZM10,13.4V4.1l1.71,4,4.38.38L12.77,11.4l1,4.28Z"
          />
        </g>
      </g>
    </svg>

    <svg
      v-for="empty in emptyStar"
      :key="`${empty}-empty`"
      class="md:w-5 w-3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 19"
    >
      <defs>
        <style>
          .cls-1 {
            fill: #ed6e16;
          }
        </style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            id="ic_star_border_24px"
            data-name="ic star border 24px"
            class="cls-1"
            d="M20,7.24l-7.19-.62L10,0,7.19,6.63,0,7.24,5.46,12,3.82,19,10,15.27,16.18,19l-1.63-7ZM10,13.4,6.24,15.67l1-4.28L3.92,8.51,8.3,8.13l1.7-4,1.71,4,4.38.38L12.77,11.4l1,4.28Z"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    starRate: {
      type: Number,
      default: 0.0,
    },
  },
  data() {
    return {
      solidStar: 0,
      halfStar: 0,
      emptyStar: 0,
      maxStar: 5,
    }
  },
  mounted() {
    this.solidStarCount()
    this.halfStarCount()
    this.emptyStarCount()
  },
  methods: {
    isFloat(number) {
      return Number(number) === number && number % 1 !== 0
    },
    solidStarCount() {
      const [a] = String(this.starRate).split('.')
      this.solidStar = Number(a) <= this.maxStar ? Number(a) : this.maxStar
    },
    halfStarCount() {
      const [, b] = String(this.starRate).split('.')
      if (b) {
        this.halfStar = Number(b) && this.solidStar < this.maxStar ? 1 : 0
      }
    },
    emptyStarCount() {
      if (this.isFloat) {
        const [a] = String(this.starRate).split('.')
        if (a < this.maxStar) {
          this.emptyStar = this.maxStar - a - this.halfStar
        }
      } else {
        this.emptyStar = 0
      }
    },
  },
}
</script>

<style></style>
