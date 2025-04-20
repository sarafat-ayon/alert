<template>
  <div class="relative graph-height">
    <!-- <p class="text-gray-1200 text-2xl text-center"></p> -->

    <ScatterChart
      class="xl:opacity-100 transition-opacity duration-1000 ease-in-out mt-4"
      :class="isGraphExpanded ? 'delay-700 opacity-100' : 'opacity-0'"
    />

    <transition name="fadeIn" mode="out-in">
      <div
        v-if="summaryComp !== 'SummaryAllFlagsCRTable'"
        class="
          absolute
          top-9
          md:left-28
          left-20
          bg-back-button
          md:w-9
          w-6
          md:h-9
          h-6
          rounded-full
          flex
          items-center
          justify-center
          cursor-pointer
          transition-opacity
          duration-500
          ease-in-out
          opacity-100
        "
        :class="isGraphExpanded ? 'delay-700 opacity-100' : 'opacity-0'"
        @click="enableClick ? bakeToPrevSummaryComp() : ''"
      >
        <fa
          class="arrow-icon text-white md:text-lg text-sm"
          :icon="['fas', 'chevron-up']"
        />
      </div>
    </transition>
  </div>
</template>


<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import ScatterChart from './ScatterChart.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    ScatterChart,
  },
  setup() {
    const store = useAlert()
    const enableClick = ref('true')
    const { summaryComp, previousSummaryComp, isGraphExpanded } =
      storeToRefs(store)

    const bakeToPrevSummaryComp = (element) => {
      enableClick.value = false
      store.backToPreviousSummaryComponent({
        summaryComp: store.previousSummaryComp[0],
        // previousSummaryComp: store.state.alert.summaryComp,
      })
      if (summaryComp.value === 'SummaryAllFlagsCRTable') {
        setTimeout(() => {
          enableClick.value = true
        }, 1000)
      } else {
        setTimeout(() => {
          enableClick.value = true
        }, 200)
      }
    }

    return {
      bakeToPrevSummaryComp,
      summaryComp,
      previousSummaryComp,
      isGraphExpanded,
      enableClick,
    }
  },
  computed: {
    // ...mapState(useAlert, ['summaryComp', 'previousSummaryComp']),
  },
})
</script>


<style scoped>
/* for FadeIn FadeOut */
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.bg-back-button {
  background: #d09494;
}

.graph-height {
  /* height: calc(100% - 75px); */
  height: calc(100% - 16px);
}

@media (min-height: 600px) and (max-height: 800px) {
  .graph-height {
    height: calc(100% - 16px);
  }
}
</style>


