<template>
  <div class="intro-wrapper text-white text-center">
    <h2 class="text-2xl lg:text-4xl uppercase lg:mb-7 mb-5">
      {{ intro.title }}
    </h2>
    <p class="lg:text-md text-sm">{{ intro.description }}</p>
  </div>
</template>
<script>
import { INTRO } from '~/constants/urls'

export default {
  data() {
    return {
      intro: {},
    }
  },
  mounted() {
    this.getIntro()
  },
  methods: {
    getIntro() {
      this.$axios.$get(INTRO).then((res) => {
        this.intro = res.data
      })
    },
  },
}
</script>

<style>
.sharpArchiveLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
