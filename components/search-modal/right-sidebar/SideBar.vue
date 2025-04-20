<template>
  <div>
    <transition name="right-sidebar-trans">
      <div
        v-if="modalSizeFull"
        class="
          absolute
          bg-ash-dark
          right-0
          top-0
          h-full
          rounded-l-2xl
          w-1/4
          text-yellow-primary
        "
      >
        <div
          v-if="modalSizeFull"
          class="p-5 mt-4 right-sidebar-wrapper h-full relative"
        >
          <h2 class="text-left lg:text-xl font-extrabold custom-price-title">
            Custom price
          </h2>

          <!--start => custom price tab menu-->
          <div class="mt-6">
            <transition name="custom-price-tab">
              <custom-price-tab-menu
                v-if="customPriceTab"
                @change="changeCustomPriceTabMenu"
              ></custom-price-tab-menu>
            </transition>
          </div>
          <!--end => custom price tab menu-->

          <!--start => main item section-->
          <div>
            <keep-alive>
              <component
                :is="currentTabComponent"
                v-bind="{
                  feeds: feeds,
                }"
              ></component>
            </keep-alive>
          </div>
          <!--start => main item section-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CustomPriceTabMenu from '~/components/search-modal/right-sidebar/PriceTabMenu'
import OnGoing from '~/components/search-modal/right-sidebar/OnGoing'
import Both from '~/components/search-modal/right-sidebar/Both'
import OneTime from '~/components/search-modal/right-sidebar/OneTime'

export default {
  name: 'SideBar',
  components: { CustomPriceTabMenu, OnGoing, Both, OneTime },
  props: ['customPriceTab', 'modalSizeFull', 'feeds'],
  data() {
    return {
      currentTabComponent: 'OnGoing',
    }
  },
  methods: {
    changeCustomPriceTabMenu(current) {
      this.currentTabComponent = current
    },
  },
}
</script>

<style lang="scss" scoped>
/*start right sidebar section transition*/
.custom-price-title-enter {
  opacity: 0;
}
.custom-price-title-enter-to {
  opacity: 1;
}
.custom-price-title-enter-active {
  transition: opacity 2s;
}
.custom-price-tab-enter {
  opacity: 0;
}
.custom-price-tab-enter-to {
  opacity: 1;
}
.custom-price-tab-enter-active {
  transition: opacity 2s;
}
.pricing-text-leave-to {
  opacity: 0;
}
.pricing-text-leave-active {
  transition: opacity 1s;
}

.right-sidebar-trans-enter,
.right-sidebar-trans-leave-to {
  width: 0;
  .right-sidebar-wrapper {
    display: none;
  }
}
.right-sidebar-trans-enter-to,
.right-sidebar-trans-leave {
  width: 25%;
  .right-sidebar-wrapper {
    display: none;
  }
}

.right-sidebar-trans-enter-active {
  transition: width 1s ease-in-out;
}
.right-sidebar-trans-leave-active {
  transition: width 2s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.custom-price-title {
  opacity: 0;
  animation: fadeIn 2s 1;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}

/*end right sidebar section transition*/
</style>
