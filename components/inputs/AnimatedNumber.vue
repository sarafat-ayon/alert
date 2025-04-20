<template>
  <span v-if="moneySign">
    ${{ animatedNumber }}
  </span>
  <span v-else>{{ animatedNumber }}</span>
</template>

<script>
export default {
  props: {
    number: {
      default: 0
    },
    float: {
      default: false
    },
    moneySign: {
      required: false,
      default: null
    }
  },

  data() {
    return {
      animatedNumber: 0,
      interval: false,
    }
  },

  watch: {
    number() {
      clearInterval(this.interval)
      const difference =
        parseFloat(this.number) - parseFloat(this.animatedNumber)
      if (
        // parseFloat(this.number) === parseFloat(this.animatedNumber)
        parseFloat(this.number) === parseFloat(this.animatedNumber) ||
        Math.abs(difference) < 1
      ) {
        const animatedInteger =
          parseFloat(this.animatedNumber) + parseFloat(difference.toFixed(2))
        this.animatedNumber = this.float
          ? parseFloat(animatedInteger).toFixed(2)
          : parseInt(animatedInteger)
        return
      }

      this.interval = window.setInterval(() => {
        if (parseFloat(this.animatedNumber) !== parseFloat(this.number)) {
          let change =
            (parseFloat(this.number) - parseFloat(this.animatedNumber)) / 10
          change = change >= 0 ? Math.ceil(change) : Math.floor(change)
          const animatedInteger =
            parseFloat(this.animatedNumber) + parseFloat(change.toFixed(2))
          this.animatedNumber = this.float
            ? parseFloat(animatedInteger).toFixed(2)
            : parseInt(animatedInteger)
        }
      }, 50)
    },
  },

  mounted() {
    this.animatedNumber = parseFloat(this.number)
      ? parseFloat(parseFloat(this.number)).toFixed(2)
      : 0
  },
}
</script>

<style>
</style>

