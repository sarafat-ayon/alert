<template>
  <div>
    <div class="mt-6 base-cost">
      <div class="flex items-center justify-between">
        <p class="lg:text-md text-sm">Base Cost</p>
        <p class="font-semibold lg:text-md text-sm">$32.00</p>
      </div>
    </div>
    <transition name="feedsIn">
      <div v-if="feeds.length > 0" class="mt-6 feed-items">
        <p class="lg:text-md text-sm">
          Feeds: <span class="text-white">{{ feeds.length }}</span>
        </p>
        <transition-group name="fade">
          <div
            v-for="feed in feeds"
            :key="feed.id"
            class="
              pl-5
              flex
              items-center
              justify-between
              leading-7
              lg:text-md
              text-sm
            "
          >
            <p>{{ feed.firstName + ' ' + feed.lastName }}</p>
            <p class="font-semibold">${{ feed.amount }}</p>
          </div>
        </transition-group>
        <div
          class="
            flex
            items-center
            justify-between
            leading-7
            mt-5
            lg:text-md
            text-sm
          "
        >
          <p class="lg:text-md text-sm">Initial Storage Cost Estimate</p>
          <p class="font-semibold">$0.17</p>
        </div>
      </div>
    </transition>

    <!--          start => footer section-->
    <div class="absolute bottom-12 footer-section">
      <h3 class="font-extrabold lg:text-xl text-white">
        ${{ totalCount }} per Month
      </h3>
    </div>
    <!--          end => footer section-->
  </div>
</template>

<script>
export default {
  name: 'OnGoing',
  props: ['feeds'],
  computed: {
    totalCount() {
      // eslint-disable-next-line no-unused-vars
      let total = 0
      // eslint-disable-next-line array-callback-return
      this.feeds.map((item) => {
        total += parseFloat(item.amount)
      })
      return total
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.base-cost,
.footer-section {
  opacity: 0;
  animation: fadeIn 2s 1;
  animation-delay: 3s;
  animation-fill-mode: forwards;
}

.feedsIn-enter-active,
.feedsIn-leave-active {
  transition: opacity 1s;
}
.feedsIn-enter, .feedsIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
