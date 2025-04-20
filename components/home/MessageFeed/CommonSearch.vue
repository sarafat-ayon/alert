<template>
  <div class="rounded-lg py-4">
    <div class="flex w-full space-x-4 justify-end transition-all duration-500 ease-in-out">
      <transition name="page">
        <div
          v-if="show && homeCurrentComp !== 'FullMessageFeed' && isDesktop && currentMess === 'TextMessage'"
          class="bg-gray-2200 rounded-full backButton cursor-pointer"
          @click="showAllMessagePerson()"
        >
          <div class="backButtonInner w-full flex justify-center items-center">
            <fa class="text-gray-light" :icon="['fas', 'chevron-left']" />
          </div>
        </div>
        <div
          v-if="show && !isDesktop && currentMess === 'TextMessage'"
          class="bg-gray-2200 rounded-full backButton cursor-pointer"
          @click="showAllMessagePerson()"
        >
          <div class="backButtonInner transition-all duration-500 ease-in-out w-full flex justify-center items-center">
            <fa class="text-gray-light" :icon="['fas', 'chevron-left']" />
          </div>
        </div>
      </transition>
      <div
        v-if="isDesktop"
        :class="
          squeeze && homeCurrentComp !== 'FullMessageFeed' && currentMess === 'TextMessage'
            ? 'hide-backbutton'
            : 'w-full'
        "
        class="
          bg-gray-2200
          rounded-full
          flex flex-row
          items-center
          input-height
          transition-all
          duration-500
          ease-in-out
          box-border
        "
      >
        <fa class="text-gray-light min-width-40" :icon="['fas', 'search']" />
        <input
          v-model="searchText"
          placeholder="Search"
          class="
            flex-grow
            rounded-r-full
            text-lg
            focus:outline-none
            pb-0.5
            pt-1.5
            md:py-2
            bg-gray-2200
            text-gray-light
            placeholder-gray-light
            input-width
          "
          @keyup="
            currentMess === 'AllMessagePerson'
              ? searchPerson()
              : searchMessage()
          "
        />
      </div>
      <div
        v-if="!isDesktop"
        :class="
          squeeze && homeCurrentComp !== 'FullMessageFeed' && currentMess === 'TextMessage'
            ? 'hide-backbutton'
            : 'w-full'
        "
        class="
          bg-gray-2200
          rounded-full
          flex flex-row
          items-center
          input-height
          transition-all
          duration-500
          ease-in-out
          box-border
        "
      >
        <fa class="text-gray-light min-width-40" :icon="['fas', 'search']" />
        <input
          v-model="searchText"
          placeholder="Search"
          class="
            flex-grow
            rounded-r-full
            text-lg
            focus:outline-none
            pb-0.5
            pt-1.5
            md:py-2
            bg-gray-2200
            text-gray-light
            placeholder-gray-light
            input-width
          "
          @keyup="
            currentMess === 'AllMessagePerson'
              ? searchPerson()
              : searchMessage()
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useBreakpoints } from '@vueuse/core'
import { defineComponent } from '@nuxtjs/composition-api'
import debounce from 'lodash.debounce'
import { mapGetters, mapState } from 'vuex'
export default defineComponent({
  setup() {
    const breakpoints = useBreakpoints({
      largeDesktop: 1440,
    })
    return {
      isDesktop: breakpoints.greater('largeDesktop'),
    }
  },
  data() {
    return {
      searchText: '',
      show: false,
      squeeze: false,
    }
  },
  computed: {
    ...mapGetters('home', ['currentMess']),
    ...mapState('home', ['homeCurrentComp']),
  },
  watch: {
    currentMess(data) {
      if (data === 'TextMessage') {
        setTimeout(() => {
          this.show = true
        }, 500)
        this.squeeze = true
      } else {
        setTimeout(() => {
          this.show = false
        }, 500)
        this.squeeze = false
      }
    },
  },
  mounted() {
    if (this.homeCurrentComp === '') {
      setTimeout(() => {
        this.show = true
      }, 500)
      this.squeeze = true
    }
  },
  methods: {
    showAllMessagePerson() {
      this.$store.commit('home/SET_CURRENT_MESSAGE', 'AllMessagePerson')
    },
    // eslint-disable-next-line vue/no-dupe-keys
    searchMessage: debounce(function () {
      this.$store.dispatch('home/getSearchMessage', this.searchText)
    }, 300),
    searchPerson: debounce(function () {
      this.$store.dispatch('home/getSearchPerson', this.searchText)
    }, 300),
  },
})
</script>

<style  scoped>
.backButton {
  height: 50px;
  width: 50px;
  writing-mode: vertical-rl;
}
.hide-backbutton {
  width: calc(100% - 66px);
}
.backButtonInner {
  text-align: -webkit-center;
}
.input-height {
  height: 50px;
}
.input-width {
  width: 90%;
}

.min-width-40 {
  width: 10%;
}
</style>


<!--   -->