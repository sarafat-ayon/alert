<template>
  <section>
    <transition name="tabMenu">
      <div
        v-if="!tabMenuContent"
        ref="content__wrapper"
        class="w-96 content__tabs flex flex-wrap items-center justify-center rounded-lg sm:rounded-full 2xl:h-10 h-10 lg:mt-0 transition-all duration-900"
        :style="{
          'margin-left': `${
            activeComponent === 'account'
              ? '256'
              : activeComponent === 'security'
              ? 0
              : -offsetLeftPx
          }px`,
        }"
      >
        <div
          class="background__circle bg-yellow-primary"
          :style="{
            left: `${offsetLeftPx}px`,
            width: `${backgroundWidth}px`,
          }"
        ></div>
        <div
          :class="activeComponent === 'account' ? 'active' : ''"
          class="tab cursor-pointer rounded-full text-center h-auto lg:px-4 px-1 2xl:py-2 py-0.5 w-1/3"
          data-index="0"
          @click="showTabMenu('account'), animate()"
        >
          <span class="pointer-events-none lg:text-md text-sm font-semibold">Account</span>
        </div>
        <div
          ref="security"
          :class="[activeComponent === 'security' ? 'active' : '']"
          class="tab cursor-pointer rounded-full text-center lg:px-4 px-1 2xl:py-2 py-0.5 w-1/3"
          data-index="1"
          @click="showTabMenu('security'), animate()"
        >
          <span
            class="pointer-events-none lg:text-md text-sm font-semibold opacity-70"
            :class="[activeComponent === 'payment' ? 'opacity-100' : '']"
          >Security</span>
        </div>
        <div
          ref="payment"
          :class="[activeComponent === 'payment' ? 'active' : '']"
          class="tab cursor-pointer rounded-full text-center lg:px-4 px-1 2xl:py-2 py-0.5 w-1/3"
          data-index="2"
          @click="showTabMenu('payment'), animate()"
        >
          <span class="pointer-events-none lg:text-md text-sm font-semibold opacity-40">Payment</span>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountTab',
  props: {
    tabActive: {
      type: String,
      required: false,
      default: '',
    },
    tabMenuContent: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters('feeds', ['securityStatus', 'paymentStatus']),
  },
  data() {
    return {
      offsetLeftPx: 0,
      tabWrapperLeftPx: 0,
      offsetTopPx: 0,
      backgroundWidth: 0,
      circleBackgroundColor: 'bg-gray-900',
      backgroundColor: 'bg-gray-500',
      textBackgroundColor: 'text-gray-900',
      activeComponent: 'account',
      activeOldIndex: 0,
      activeCurrentIndex: 0,
    }
  },
  watch: {
    tabActive(val) {
      this.activeComponent = val
      this.$nextTick(() => {
        this.animate()
      })
    },
  },
  mounted() {
    this.animate()
  },
  methods: {
    animate() {
      const activeLink =
        this.$refs.content__wrapper.querySelector('.tab.active')
      this.backgroundWidth = activeLink.scrollWidth
      const backgroundColor = activeLink.dataset.themeBg
      const textBackgroundColor = activeLink.dataset.themeText
      const circleBackgroundColor = activeLink.dataset.themeCircle
      this.circleBackgroundColor = circleBackgroundColor
      this.backgroundColor = backgroundColor
      this.textBackgroundColor = textBackgroundColor
      this.offsetLeftPx = activeLink.offsetLeft
    },
    showTabMenu(componentName) {
      if (this.$config.workflow === 'live') {
        if (this.securityStatus && componentName === 'security') {
          this.activeComponent = componentName
          this.$emit('change', this.activeComponent)
          this.$nextTick(() => {
            this.animate()
          })
        } else if (this.paymentStatus && componentName === 'payment') {
          this.activeComponent = componentName
          this.$emit('change', this.activeComponent)
          this.$nextTick(() => {
            this.animate()
          })
        }
      } else {
        this.activeComponent = componentName
        this.$emit('change', this.activeComponent)
        this.$nextTick(() => {
          this.animate()
        })
        this.activeComponent = componentName
        this.$emit('change', this.activeComponent)
        this.$nextTick(() => {
          this.animate()
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
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
      @apply text-yellow-primary;
    }
    &.active {
      > span {
        @apply text-white opacity-100;
      }
    }
  }
}

.tabMenu-leave-active {
  transition: opacity 2.5s;
}
.tabMenu-leave-to {
  opacity: 0;
}
</style>
