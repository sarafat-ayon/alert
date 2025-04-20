<template>
  <section>
    <!-- Small Device -->
    <header
      class="
        md:hidden
        mobile_header
        flex flex-col
        overflow-hidden
        absolute
        z-100
        py-3
        px-4
        transition-all
        duration-1000
      "
    >
      <div class="flex flex-row justify-between items-center">
        <div class="h-9 flex justify-center items-center">
          <p
            class="text-lg cursor-pointer text-yellow-midlight"
            :icon="['fas', 'bars']"
          >
            Help
          </p>
        </div>
        <div
          class="w-9 h-9 flex justify-center items-center"
          @click="previousPage()"
        >
          <fa class="text-yellow-midlight text-2xl" :icon="['fas', 'times']" />
        </div>
      </div>
    </header>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    currentTabComponent(currentTab) {
      this.currentComponent = currentTab
      this.$store.dispatch(
        'mobile/header/setCurrentComponent',
        this.currentComponent
      )
    },
    previousPage(){
        this.$store.dispatch('mobile/header/showMobileHeader')
        this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  background: #171d26;
  color: #ffffff;
  border-radius: 0 0 1.563rem 0;
  box-shadow: 0 4px 5px #0a0d104d;
}
.header-enter {
  opacity: 0;
}

.header-enter-active {
  transition: opacity 1.5s ease-in-out;
  transition-delay: 1.5s;
}

.header-enter-to {
  opacity: 1;
}

//Small Device
.mobile_header {
  height: 65px;
  border-radius: 0 0 1.563rem 1.563rem;
}
</style>
