<template>
  <section>
    <div
      class="
        top-0
        right-0
        absolute
        bg-ash-dark
        md:p-21
        p-4
        md:pt-12
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        md:-top-15 md:rounded-l-2xl
      "
      :class="[
        showAddFeeds ? 'show md:shadow-2xl' : 'hide',
        currentComponent === 'Onboard' ? 'onboard' : '',
      ]"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full card">
          <!--start => title area-->
          <div class="flex flex-row justify-between items-center">
            <h2
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                md:font-bold
              "
            >
              Add Feeds
            </h2>
            <div
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="resetAll(), hideBlur()"
            >
              <fa
                class="
                  text-yellow-midlight
                  xl:text-2xl
                  md:text-xl
                  text-2xl
                  md:font-bold
                  font-normal
                "
                :icon="['fas', 'times']"
              />
            </div>
          </div>
          <!--end => title area-->

          <!--start => main area-->
          <div class="flex flex-col md:mt-5 mt-4 h-full">
            <div class="flex flex-col items-center mb-4">
              <add-feeds-tab-menu
                @change="changeComponent($event)"
              ></add-feeds-tab-menu>
            </div>
            <keep-alive>
              <component
                :is="currentComponent"
                v-bind="currentProperties"
                :exit-button="exitButton"
                @change-button="showExitButton($event)"
                @saveArchiveFeedFalse="saveArchiveFeed = false"
                @clear-field="clear = false"
                @onBoardTriggered="accessRequest = false"
                @clearOnBoardAllFieldSetDefault="clearOnBoardField = false"
              >
              </component>
            </keep-alive>
          </div>
          <!--end => main area-->
        </div>

        <!--start => footer area-->
        <div
          class="w-full md:mt-0 md:pb-0"
          :class="currentComponent === 'Onboard' ? 'mt-0 pb-0' : 'mt-13 pb-2'"
        >
          <div class="flex flex-col md:mt-5 w-full h-46 rounded-xl">
            <div class="flex flex-row justify-around md:mt-8 mt-5">
              <button
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-yellow-midlight
                  bg-ash-dark
                  rounded-full
                  mr-2.5
                  border-2 border-yellow-midlight
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                @click="clearFileld()"
              >
                <span>Clear</span>
              </button>
              <button
                v-if="!exitButton && currentComponent === 'Search'"
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-white
                  bg-yellow-midlight
                  rounded-full
                  md:mr-2.5
                  border-none
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                @click="submitSelectedArchiveFeed"
              >
                <span>Next</span>
              </button>
              <button
                v-if="currentComponent === 'Onboard'"
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-white
                  bg-yellow-midlight
                  rounded-full
                  md:mr-2.5
                  border-none
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                @click="submitSelectedArchiveFeed"
              >
                <span>Add</span>
              </button>
              <button
                v-if="exitButton && currentComponent !== 'Onboard'"
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-white
                  bg-yellow-midlight
                  rounded-full
                  md:mr-2.5
                  border-none
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                @click="showAddButton()"
              >
                <span>Exit</span>
              </button>
            </div>
          </div>
        </div>
        <!--end => footer area-->
      </div>
    </div>
  </section>
</template>

<script>
import AddFeedsTabMenu from '~/components/settings/service/AddFeedsTabMenu.vue'
import Search from '~/components/settings/service/Search.vue'
import Onboard from '~/components/settings/service/Onboard.vue'

export default {
  name: 'AddFeed',
  components: { AddFeedsTabMenu, Search, Onboard },
  layout: 'home',
  props: {
    showAddFeeds: {
      type: Boolean,
    },
  },
  data() {
    return {
      skew: false,
      newGroupName: '',
      mayContain: '',
      currentComponent: 'Search',
      exitButton: false,
      saveArchiveFeed: false,
      accessRequest: false,
      clear: false,
      clearOnBoardField: false,
    }
  },
  computed: {
    currentProperties() {
      if (this.currentComponent === 'Search') {
        return {
          clear: this.clear,
          saveArchiveFeed: this.saveArchiveFeed,
        }
      } else if (this.currentComponent === 'Onboard') {
        return {
          clear: this.clear,
          accessRequest: this.accessRequest,
          clearOnBoardField: this.clearOnBoardField,
        }
      }
      return ''
    },
    showAddFeedsComp() {
      return this.$store.getters['mobile/header/getAddFeed']
    },
  },
  mounted() {},
  methods: {
    showExitButton($event) {
      this.exitButton = $event
    },
    showAddButton() {
      this.exitButton = false
    },
    changeComponent($event) {
      this.currentComponent = $event
    },
    submitSelectedArchiveFeed() {
      if (this.currentComponent === 'Search') {
        this.saveArchiveFeed = true
      } else if (this.currentComponent === 'Onboard') {
        this.accessRequest = true
      }
    },
    resetAll() {
      this.$emit('hide-add-feeds')
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.clearOnBoardField = true
    },
    hideBlur() {
      this.$store.dispatch('mobile/header/removeOverlay')
    },
    clearFileld() {
      this.clear = true
    },
  },
}
</script>

<style lang="scss" scoped>
.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100vh;
  right: -500px;
  z-index: 999999;
}

.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
}

.card {
  height: calc(100% - 100px);
}

.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 100%;
    right: -100%;
  }
  .onboard {
    height: auto;
    border-radius: 0 0 1.563rem 1.563rem;
  }
  .show {
    width: 100%;
    right: 0px;
  }

  .hide {
    width: 100%;
    right: -100%;
  }
}
</style>
