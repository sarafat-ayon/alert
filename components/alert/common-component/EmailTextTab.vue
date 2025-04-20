<template>
  <transition name="fadeIn">
    <div
      ref="contentWrapper"
      class="
        content__tabs
        flex flex-wrap
        bg-none
        items-center
        rounded-full
        md:shadow
        w-56
      "
      :class="
        currentComp === 'GeneralAlertSettings'
          ? 'bg-red-moreLightness md:h-10 h-10'
          : 'bg-offwhite-800 md:h-10 h-10'
      "
    >
      <div
        class="background__circle bg-red-deep"
        :style="{
          left: `${offsetLeftPx}px`,
          width: `${backgroundWidth + 1}px`,
        }"
      ></div>
      <div
        ref="area"
        :class="activeComponent === 'Email' ? 'active' : ''"
        class="
          tab
          cursor-pointer
          rounded-full
          text-center
          h-auto
          md:px-4
          px-3
          py-1
          w-1/2
        "
        data-index="0"
        @click="
          showTabMenu('Email', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            setCurrentInputTab('Email')
        "
      >
        <span
          class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
          :class="
            activeComponent === 'Email'
              ? currentComp === 'GeneralAlertSettings'
                ? 'text-white'
                : 'text-offwhite-900'
              : 'text-red-deep'
          "
          >Email</span
        >
      </div>
      <div
        ref="line"
        :class="activeComponent === 'Text' ? 'active' : ''"
        class="
          tab
          cursor-pointer
          rounded-full
          text-center
          h-auto
          md:px-1
          px-1
          py-1
          w-1/2
        "
        data-index="1"
        @click="
          showTabMenu('Text', '.content__tabs', '.tab.active', $event),
            animate('.tab', $event),
            setCurrentInputTab('Text')
        "
      >
        <span
          class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
          :class="
            activeComponent === 'Text'
              ? currentComp === 'GeneralAlertSettings'
                ? 'text-white'
                : 'text-offwhite-900'
              : 'text-red-deep'
          "
          >Text</span
        >
      </div>
    </div>
  </transition>
</template>

<script>
// import { mapState } from 'vuex'
import { storeToRefs } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'AreaLineTab',
  setup() {
    const contentWrapper = ref(null)
    const store = useAlert()
    const { currentInputTab } = storeToRefs(store)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab(currentInputTab.value)

    onMounted(() => {
      //   store.setCurrentGraph(activeComponent.value)
      const activeLink = contentWrapper.value.querySelector('.tab.active')
      tab(activeLink)
    })

    const { showNewAlert, currentComp } = storeToRefs(store)

    return {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
      contentWrapper,
      store,
      showNewAlert,
      currentComp,
      currentInputTab,
    }
  },
  data() {
    return {}
  },
  computed: {},
  //   watch: {
  //     currentComponent(data) {
  //       if (data === 'System') {
  //         this.$refs.system.click()
  //       }
  //     },
  //   },
  mounted() {
    // const hash = this.$route.hash.split('#')[1]
    // if (hash) {
    //   setTimeout(() => {
    //     this.$refs[hash].click()
    //   }, 1000)
    // }
  },
  methods: {
    // ...mapActions(useAlert, ['setCurrentInputTab']),
    setCurrentInputTab(value) {
      this.$emit('update-input-tab', value);
    }
  },
})
</script>
<style lang="scss" scoped>
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}
.content__tabs {
  position: relative;
  .background__circle {
    top: 0px;
    left: 0px;
    z-index: -1;
    transition: width 0.3s ease-in-out 0.2s, left 0.5s ease-in-out;
    z-index: 1;
    @apply absolute h-full rounded-full inline-block;
  }
  .tab {
    @apply relative overflow-hidden;
    > span {
      position: relative;
      transition: color 0.2s ease-in-out;
      z-index: 10;
      // @apply text-red-deep;
    }
    &.active {
      > span {
        // @apply text-white;
      }
    }
  }
}
</style>
