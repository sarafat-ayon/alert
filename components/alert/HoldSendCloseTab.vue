<template>
  <div>
    <div class="flex justify-between items-center space-x-5">
      <div class="font-bold">Disposition</div>
      <div
        ref="contentWrapper"
        class="
          content__tabs
          flex flex-wrap
          bg-white
          items-center
          rounded-full
          h-9
          md:shadow
        "
      >
        <div
          class="background__circle bg-green-1100"
          :style="{
            left: `${offsetLeftPx}px`,
            width: `${backgroundWidth + 1}px`,
          }"
        ></div>
        <div
          ref="hold"
          :class="activeComponent === 'FlagTrueHold' ? 'active' : ''"
          class="
            tab
            cursor-pointer
            rounded-full
            text-center
            h-auto
            md:px-4
            px-3
            pb-1
            w-1/3
          "
          data-index="0"
          @click="
            showTabMenu(
              'FlagTrueHold',
              '.content__tabs',
              '.tab.active',
              $event
            ),
              animate('.tab', $event),
              setAddNoteComp('FlagTrueHold')
          "
        >
          <span class="pointer-events-none md:text-md text-sm font-bold"
            >Hold</span
          >
        </div>
        <div
          ref="send"
          :class="activeComponent === 'FlagTrueSend' ? 'active' : ''"
          class="
            tab
            cursor-pointer
            rounded-full
            text-center
            h-auto
            md:px-4
            px-3
            py-1
            w-1/3
          "
          data-index="1"
          @click="
            showTabMenu(
              'FlagTrueSend',
              '.content__tabs',
              '.tab.active',
              $event
            ),
              animate('.tab', $event),
              setAddNoteComp('FlagTrueSend')
          "
        >
          <span
            class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
            >Send</span
          >
        </div>
        <div
          ref="close"
          :class="activeComponent === 'FlagTrueClose' ? 'active' : ''"
          class="
            tab
            cursor-pointer
            rounded-full
            text-center
            h-auto
            md:px-4
            px-3
            py-1
            w-1/3
          "
          data-index="2"
          @click="
            showTabMenu(
              'FlagTrueClose',
              '.content__tabs',
              '.tab.active',
              $event
            ),
              animate('.tab', $event),
              setAddNoteComp('FlagTrueClose')
          "
        >
          <span
            class="pointer-events-none xl:text-lg md:text-md text-sm font-bold"
            >Close</span
          >
        </div>
      </div>
    </div>

    <div class="mt-2">
      <transition name="dynamicComp" mode="out-in">
        <component :is="addNoteComp"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, storeToRefs } from 'pinia'
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { useTab } from '~/composables/feeds/useTab.js'
import FlagTrueHold from '~/components/alert/FlagTrueHold.vue'
import FlagTrueSend from '~/components/alert/FlagTrueSend.vue'
import FlagTrueClose from '~/components/alert/FlagTrueClose.vue'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  name: 'FeedsGroupsResponse',
  components: {
    FlagTrueHold,
    FlagTrueSend,
    FlagTrueClose,
  },
  setup() {
    const contentWrapper = ref(null)
    const {
      tab,
      animate,
      showTabMenu,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
    } = useTab('FlagTrueHold')

    const store = useAlert()
    const { addNoteComp } = storeToRefs(store)
    onMounted(() => {
      store.setAddNoteComp(activeComponent.value)
      const activeLink = contentWrapper.value.querySelector('.tab.active')
      tab(activeLink)
    })
    return {
      tab,
      animate,
      showTabMenu,
      addNoteComp,
      offsetLeftPx,
      activeComponent,
      backgroundWidth,
      contentWrapper,
      store,
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapActions(useAlert, ['setAddNoteComp']),
  },
})
</script>
<style lang="scss" scoped>
/* for dynamic Components */
.dynamicComp-enter-active,
.dynamicComp-leave-active {
  transition: opacity 0.5s;
}
.dynamicComp-enter,
.dynamicComp-leave-to {
  opacity: 0;
}
.content__tabs {
  width: 360px;
  position: relative;
  .background__circle {
    top: 0px;
    left: 0px;
    z-index: -1;
    transition: width 0.2s ease-in-out 0.2s, left 0.5s ease-in-out;
    z-index: 1;
    @apply absolute h-full rounded-full inline-block;
  }
  .tab {
    @apply relative overflow-hidden;
    > span {
      position: relative;
      transition: color 0.2s ease-in-out;
      z-index: 2;
      @apply text-ash-default;
    }
    &.active {
      > span {
        @apply text-white;
      }
    }
  }
}
</style>