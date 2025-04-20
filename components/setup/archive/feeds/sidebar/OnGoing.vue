<template>
  <div ref="ongoing" class="feeds-ongoing">
    <div class="feeds-body">
      <div class="feeds-base-cost md:mt-0 mt-2">
        <div>Base cost</div>
        <div id="baseCost" class="font-bold text-yellow-primary">
          ${{ parseFloat(baseCost) | format }}
        </div>
      </div>
      <div class="feeds-wrapper">
        <div v-if="counter > 0" class="feeds-count">
          Feeds: <span class="text-white">{{ parseInt(counter) }}</span>
        </div>
        <ul class="feeds-list text-left">
          <transition-group name="fadeIn" tag="li">
            <div
              v-for="feed in feeds"
              :key="feed.socialId + '-' + feed.sourceName"
              class="feed-item"
            >
              <div class="username" :title="feed.socialName">
                {{ feed.socialName | strLimit(25) }}
              </div>
              <div class="price font-bold">
                ${{ feed.cost ? feed.cost : 0 | format }}
              </div>
            </div>
          </transition-group>
        </ul>
      </div>
      <transition name="fadeIn">
        <div
          v-if="storageCost"
          class="storage-cost flex justify-between md:ml-0 ml-5"
        >
          <div>Initial Storage Cost Estimate</div>
          <div class="price font-bold">${{ storageCost.toFixed(2) }}</div>
        </div>
      </transition>
    </div>

    <div class="feeds-total">
      <!-- <p>
        $<animated-number
              moneySign="$"
         :number="parseFloat(total)" :float="true" /> per Month
      </p> -->
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
// import AnimatedNumber from '~/components/inputs/AnimatedNumber'
export default {
  name: 'OnGoing',
  // components: { AnimatedNumber },
  filters: {
    format(n) {
      n = parseFloat(n).toFixed(2)
      const parts = n.toString().split('.')
      return (
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        (parts[1] ? '.' + parts[1] : '')
      )
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('feeds', ['feeds', 'baseCost', 'storageCost']),
    ...mapGetters('feeds', ['counter', 'total']),
  },
  mounted() {
    // this.animateCount(0, 100)
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.feeds-ongoing {
  @apply w-full h-full lg:text-md text-sm text-yellow-primary absolute flex flex-col;
  .feeds-body {
    @apply flex-grow flex flex-col h-full overflow-y-auto space-y-4 md:mb-0 mb-2.5 w-full;
    .feeds-base-cost {
      @apply flex justify-between;
    }

    .feeds-wrapper {
      @apply w-full;
      .feeds-count {
        @apply text-left;
      }

      .feeds-list {
        @apply list-none pl-5;
        .feed-item {
          @apply flex justify-between w-full py-1;
        }
      }
    }
  }

  .feeds-total {
    @apply text-white text-left;
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 1s ease-in-out;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 0;
}

.fadeIn-leave-to,
.fadeIn-enter {
  opacity: 0;
}
</style>
