<template>
  <svg
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
  >
    <defs>
      <style>
        .cls-1 {
          fill: #fff;
        }
      </style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          id="flag-2"
          class="cls-1"
          d="M0,0H.88V.32A7.43,7.43,0,0,1,2,.05a4.58,4.58,0,0,1,.64,0h.41A4.44,4.44,0,0,1,4.85.4c.33.13.63.31,1,.43A4.34,4.34,0,0,0,9.11.77c.25-.1.89-.42.89-.26V6.2A5.67,5.67,0,0,1,7.79,7a5,5,0,0,1-2-.24,7.67,7.67,0,0,1-.89-.38,4.64,4.64,0,0,0-1.76-.5,7.6,7.6,0,0,0-2.24.56V10H0Z"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 15,
    },
  },
}
</script>
