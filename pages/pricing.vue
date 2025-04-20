<template>
  <transition name="page">
    <div class="h-full bg-ash-landing"></div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  auth: false,
  data() {
    return {
      // expanded: false,
    }
  },

  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
    }),
  },
  mounted() {
    this.openStarterModal()
  },
  methods: {
    openStarterModal() {
      setTimeout(() => {
        this.expand_starter_modal(!this.starterExpanded)
        setTimeout(() => {
          this.updateSetupContent('price-plan')
        }, 1000)
      }, 1000)
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>