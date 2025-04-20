<template>
  <section class="w-full h-full overflow-hidden rounded-2xl">
    <div
      class="w-full h-full overflow-hidden block md:rounded-3xl rounded-2xl"
      :class="showMessage ? 'bg-gray-1400' : 'bg-white'"
    >
      <div
        class="title flex justify-center items-center px-4"
        @click="isDesktop ? expand() : ''"
      >
        <p
          class="
            py-2
            font-bold
            text-white
            xl:text-xl
            md:text-base
            flex-grow
            pl-5
          "
        >
          Direct Messages
        </p>
        <span
          class="
            static
            select-toggle
            smallDesktop:hidden
            transition-all
            duration-500
            transform
            md:block
            hidden
          "
          :class="messageIsExpanded ? ' rotate-180' : 'rotate-0'"
        >
          <fa :icon="['fas', 'caret-down']" />
        </span>
      </div>

      <!-- Body start -->
      <!-- :class="!this.showMessage ? 'scroll' : ''" -->

      <!-- class="col-span-6 px-5 sticky top-0 z-10" -->
      <div
        class="col-span-6 px-5 sticky top-0 z-10"
        :class="
          currentMess === 'AllMessagePerson' ? 'bg-white' : 'bg-gray-1400'
        "
      >
        <CommonSearch></CommonSearch>
      </div>

      <div
        class="message-feed-body_wrapper"
        :class="currentMess === 'AllMessagePerson' ? 'scroll' : ''"
      >
        <!-- Left Side -->
        <!-- <div class="left-side-body_wrapper scroll"></div> -->
        <!-- Left Side -->

        <div
          class="relative middle-body_wrapper min-w-full"
          :class="
            currentMess === 'AllMessagePerson' ? '' : 'scroll hide_scroll'
          "
        >
          <!-- v-bind="currentProperties" -->
          <!-- <div v-if="currentMess === 'TextMessage'">
             <div class="flex w-full mb-7 space-x-4 py-4">
              <div
                class="bg-gray-2200 rounded-full backButton cursor-pointer"
                @click="showAllMessagePerson()"
              >
                <div
                  class="
                    backButtonInner
                    w-full
                    flex
                    justify-center
                    items-center
                  "
                >
                  <fa class="text-gray-light" :icon="['fas', 'chevron-left']" />
                </div>
              </div>
              <div
                class="
                  bg-gray-2200
                  rounded-full
                  flex flex-row flex-grow
                  items-center
                "
              >
                <fa
                  class="text-gray-light mr-2 ml-3"
                  :icon="['fas', 'search']"
                />
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
                  "
                  @keyup="searchMessage"
                />
              </div>
            </div> 
          </div> -->
          <div class="h-full">
            <transition name="page" mode="out-in">
              <component
                :is="currentMess"
                :message-id="'message_Wrapper'"
                @show-hide="showHideMessages()"
              ></component>
            </transition>
          </div>
          <!-- <div v-if="!showMessage" class="h-full">
            <transition name="page">
              <AllMessagePerson @show-hide="showHideMessages()" />
            </transition>
          </div>

          <div v-else>
            <transition name="page">
              <div>
                <div class="flex w-full mb-7 space-x-4 py-4">
                  <div
                    class="bg-gray-2200 rounded-full backButton cursor-pointer"
                    @click="showMessage = !showMessage"
                  >
                    <div
                      class="
                        backButtonInner
                        w-full
                        flex
                        justify-center
                        items-center
                      "
                    >
                      <fa
                        class="text-gray-light"
                        :icon="['fas', 'chevron-left']"
                      />
                    </div>
                  </div>
                  <div
                    class="
                      bg-gray-2200
                      rounded-full
                      flex flex-row flex-grow
                      items-center
                    "
                  >
                    <fa
                      class="text-gray-light mr-2 ml-3"
                      :icon="['fas', 'search']"
                    />
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
                      "
                      @keyup="searchMessage"
                    />
                  </div>
                </div>
                <TextMessage :message-id="'message_Wrapper'" />
              </div>
            </transition>
          </div> -->

          <!-- </div> -->
        </div>

        <!-- Right Side -->
        <!-- <div class="col-span-1 right-side-body_wrapper animate-pulse"></div> -->
        <!-- Right Side -->
      </div>
      <!-- Body end -->
    </div>
  </section>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import AllMessagePerson from './AllMessagePerson.vue'
import TextMessage from './TextMessage.vue'
import CommonSearch from './CommonSearch.vue'

export default defineComponent({
  components: { AllMessagePerson, TextMessage, CommonSearch },
  props: {
    messageIsExpanded: {
      type: Boolean,
    },
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    return {
      isDesktop: breakpoints.greater('md'),
    }
  },
  data() {
    return {
      searchText: '',
      showMessage: false,
    }
  },

  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    ...mapGetters('home', ['currentMess', 'currentMessage']),
  },
  watch: {
    showMessage(data) {
      if (data) {
        this.searchText = ''
      }
    },
    currentMess(data) {
      if (data === 'AllMessagePerson') {
        this.showMessage = false
      }
    },
  },
  mounted() {
    if (this.currentMess === 'TextMessage') {
      this.showMessage = true
    }
  },
  methods: {
    expand() {
      this.$emit('show-full-height')
    },
    showHideMessages() {
      // this.showMessage = true

      this.showMessage = !this.showMessage

      if (this.showMessage) {
        this.$store.commit('home/SET_CURRENT_MESSAGE', 'TextMessage')
      } else if (this.currentMess === 'AllMessagePerson') {
        this.showMessage = false
      }
    },
    // showAllMessagePerson() {
    //   this.$store.commit('home/SET_CURRENT_MESSAGE', 'AllMessagePerson')
    //   this.showMessage = false
    // },
    searchMessage: debounce(function () {
      this.$store.dispatch('home/getSearchMessage', this.searchText)
    }, 300),
  },
})
</script>

<style lang="scss" scoped>
.select-toggle {
  color: #ffffff;
  // top: 5.2px;
  // @apply absolute right-3 pointer-events-none;
  svg {
    @apply text-3xl;
  }
  padding-left: 2px !important;
}
.icon-position {
  position: absolute;
  right: 16px !important;
  top: 5px !important;
}
@media (min-width: 1360px) {
  .icon-position {
    top: 7px !important;
  }
}
.title {
  background-color: #e4801d;
  @apply text-center;
}
// @apply grid grid-flow-row grid-cols-6 p-5 pb-8 pt-0 h-full;
.message-feed-body_wrapper {
  @apply grid grid-flow-row grid-cols-6 gap-6 p-5 pb-5 pt-0 h-full;
  height: calc(100% - 126px);
}
.message-feed-body_height {
  height: calc(100% - 125px);
}
.middle-body_wrapper {
  @apply col-span-6;
}
.left-side-body_wrapper {
  @apply col-span-1 py-6 pt-2 overflow-y-auto;
}
.footer {
  margin-top: 230px !important;
}

.min-width-2 {
  min-width: 2.5rem;
}

.max-width-800 {
  max-width: 800px;
}
.min-width-400 {
  min-width: 400px;
}

.backButton {
  height: 50px;
  width: 50px;
  writing-mode: vertical-rl;
}
.backButtonInner {
  text-align: -webkit-center;
}

.scroll {
  overflow-y: auto;
  overflow-x: auto;
  /* this will hide the scrollbar in mozilla based browsers */
  // overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: 6px !important; /* Firefox 64 */
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}

.hide_scroll {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none !important; /* Firefox 64 */
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
}
</style>
