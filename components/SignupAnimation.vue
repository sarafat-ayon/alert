<template>
  <section>
    <div
      v-if="homeSliderWrapper"
      class="h-screen top-0 right-0 absolute inner_login overflow-hidden"
      :class="[
        homeSlider ? 'home_innerwrapper_afterloading' : '',
        fullHomeSlider ? 'home_innerwrapper_afterloading2' : '',
      ]"
    >
      <Header
        :text-of-header="textOfHeader"
        @showProfile="showProfile = true"
      />
    </div>
    <transition name="slider_wrapper">
      <div
        v-if="homeSliderWrapper"
        class="
          h-screen
          w-full
          top-0
          right-0
          absolute
          px-21
          transition-all
          duration-2000
          ease-in-out
          bg-offgray
          overflow-hidden 
          z-31
        "
      >
        <the-side-bar-animate
          :home-slider="homeSlider"
          :show-sidebar-menu="showSidebarMenu"
          :sidebar-home-text="sidebarHomeText"
          :all-sidebar-text="allSidebarText"
          :squeeze-sidebar="squeezeSidebar"
        />
        <home
          :home-slider-wrapper="homeSliderWrapper"
          :home-slider="homeSlider"
          :full-home-slider="fullHomeSlider"
          :show-sidebar-menu="showSidebarMenu"
          :home-page="homePage"
          :all-sidebar-text="allSidebarText"
        />
        <div
          class="
            absolute
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            text-center
          "
          :class="fullHomeSlider ? 'hidden' : 'loadind_div'"
        >
          <button
            class="
              w-32
              h-10
              text-center text-white-300
              bg-orange-dark
              rounded-full
              border-none
              outline-none
              setup
              loading
            "
          />
          <p class="opacity-0 text-center text-gray-900 loading_text">
            Loading...
          </p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import TheSideBarAnimate from './TheSideBarAnimate.vue'
import Home from '~/pages/home.vue'
import Header from '~/components/home/LatestArchive/Header'

export default {
  components: { Home, Header, TheSideBarAnimate },
  props: {
    homeSliderWrapper: {
      type: Boolean,
    },
    homeSlider: {
      type: Boolean,
    },
    fullHomeSlider: {
      type: Boolean,
    },
    showSidebarMenu: {
      type: Boolean,
    },
    sidebarHomeText: {
      type: Boolean,
    },
    allSidebarText: {
      type: Boolean,
    },
    squeezeSidebar: {
      type: Boolean,
    },
    homePage: {
      type: Boolean,
    },
    textOfHeader: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>
.slider_wrapper-enter-active {
  transition: 1s linear;
  transition-delay: 0.8s;
}
.slider_wrapper-enter {
  opacity: 0;
}
.slider_wrapper-enter-to {
  opacity: 1;
}
.loadind_div {
  display: inline-block;
  top: 179px; /*151*/
  animation: loadingdiv 1.5s linear;
  animation-fill-mode: forwards;
  animation-delay: 2.5s;
}

@keyframes loadingdiv {
  0% {
    top: 179px;
  }
  20% {
    top: 179px;
  }
  40% {
    top: 179px;
  }
  60% {
    top: 179px;
  }
  70% {
    top: 179px;
  }
  75% {
    top: 179px;
  }
  80% {
    top: 184.2px;
  }
  85% {
    top: 189.4px;
  }
  90% {
    top: 194.6px;
  }
  95% {
    top: 199.8px;
  }
  100% {
    top: 205px;
  }
}

.loading {
  animation: width 1s linear;
  animation-fill-mode: forwards;
  animation-delay: 2.5s;
}

@keyframes width {
  0% {
    width: 128px;
  }

  25% {
    width: 106px;
  }

  50% {
    width: 84px;
  }

  75% {
    width: 62px;
  }

  100% {
    width: 40px;
    border-radius: 50%;
  }
}

.loading_text {
  animation: opacity 2.5s linear;
  animation-delay: 2.5s;
}

@keyframes opacity {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.5;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.5;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.inner_login {
  z-index: 10;
  width: 0%;
  background-color: #393e46;
  transition: width 1s ease-in-out, width 1s ease-in-out;
}
.home_innerwrapper_afterloading {
  width: 50%;
}
.home_innerwrapper_afterloading2 {
  width: 100%;
}
</style>