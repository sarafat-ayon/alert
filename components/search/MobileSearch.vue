<template>
  <section class="h-full">
    <div
      v-if="getShowMobileSaveSearchBar || blur"
      class="md:hidden overlay"
      @click.stop="hideVCalender()"
    ></div>

    <div
      class="
        top-0
        right-0
        absolute
        bg-ash-dark
        p-4
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        rounded-b-3xl
      "
      :class="showMobileSearch ? 'show' : 'hide'"
      @click="vCalenderHide()"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-purple-midlight text-2xl font-normal">Search</h2>
            <button
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="closeMobileSearch()"
            >
              <fa
                class="text-purple-midlight text-2xl font-normal"
                :icon="['fas', 'times']"
              />
            </button>
          </div>
          <div class="w-full flex flex-col space-y-3 mt-5">
            <div class="flex flex-row space-x-2 justify-between">
              <div
                :class="user.userPermission !== 'User' ? 'w-11/12' : 'w-full'"
              >
                <select-input
                  id="pastMonth1"
                  v-model="savedSearch"
                  :options="savedSearches"
                  class="text-xl font-bold"
                  class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                  place-holder="Saved Searches"
                  :place-holder-disabled="true"
                  color="#F8F8F8"
                  background="#7D80BD"
                  caret-bg="#7D80BD"
                  @input="selectedMobileSavedSearch($event)"
                ></select-input>
              </div>
              <div
                v-if="user.userPermission !== 'User'"
                class="w-3/12 justify-end flex items-center space-x-2"
              >
                <button
                  class="
                    focus:outline-none
                    text-xl text-center
                    bg-purple-midlight
                    rounded-full
                    w-10
                    h-10
                    outline-none
                  "
                  @click="showMobileSaveSearch"
                >
                  <fa
                    class="text-white w-6 text-2xl mt-0.5"
                    :icon="['fas', 'save']"
                  />
                </button>
                <button
                  v-if="betaVersion"
                  class="
                    focus:outline-none
                    text-sm text-center
                    bg-red-lightness
                    rounded-full
                    w-10
                    h-10
                  "
                  @click="showSaveSearchAlertModal"
                >
                  <img
                    class="inline-block"
                    :src="bellPlusImg"
                    alt="Bell Icon"
                  />
                </button>
              </div>
            </div>
            <div class="w-full">
              <div class="flex items-center relative">
                <!--              <fa class="search-input-icon" :icon="['fas', 'search']"/>-->
                <svg
                  class="search-input-icon fill-current text-purple-midlight"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 47.27 47.27"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Poster_1" data-name="Poster 1">
                      <path
                        id="ic_search_24px"
                        data-name="ic search 24px"
                        d="M33.8,29.75H31.67L30.91,29A17.57,17.57,0,1,0,29,30.91l.73.76V33.8l13.5,13.47,4-4Zm-16.2,0A12.15,12.15,0,1,1,29.75,17.6,12.15,12.15,0,0,1,17.6,29.75Z"
                      />
                    </g>
                  </g>
                </svg>
                <input
                  ref="searchTextInput"
                  v-model.trim="searchAbleProperties.searchText"
                  type="text"
                  class="search-field"
                  placeholder="Search"
                  @keypress.enter="searchContext()"
                />
                <transition-group name="fade">
                  <fa
                    v-if="showAnotherSearchField"
                    key="1"
                    class="
                      text-purple-midlight
                      absolute
                      right-4
                      bottom-3
                      w-5
                      cursor-pointer
                    "
                    :icon="['fas', 'minus']"
                    @click="hideAnotherField"
                  />
                  <fa
                    v-else
                    key="2"
                    class="
                      text-purple-midlight
                      absolute
                      right-4
                      bottom-3
                      w-5
                      cursor-pointer
                    "
                    :icon="['fas', 'plus']"
                    @click="showAnotherField"
                  />
                </transition-group>
              </div>
            </div>
            <transition name="fade">
              <div v-if="showAnotherSearchField" class="space-y-3">
                <div class="flex items-center relative">
                  <!--            <fa class="search-input-icon" :icon="['fas', 'search-minus']" />-->
                  <svg
                    class="search-input-icon fill-current text-purple-midlight"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18.02 18.02"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g id="Group_711" data-name="Group 711">
                          <path
                            id="ic_search_24px"
                            data-name="ic search 24px"
                            d="M12.89,11.34h-.82l-.29-.28a6.69,6.69,0,1,0-.72.72l.28.29v.82L16.49,18,18,16.49Zm-6.18,0a4.63,4.63,0,1,1,4.63-4.63,4.63,4.63,0,0,1-4.63,4.63Z"
                          />
                          <path
                            id="ic_check_24px"
                            data-name="ic check 24px"
                            d="M5.56,7.18,4.32,5.93,3,7.23,5.56,9.77,10,5.32,8.72,4Z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <input
                    v-model.trim="searchAbleProperties.containText"
                    type="text"
                    class="search-field"
                    placeholder="Must Contain"
                  />
                </div>
                <div class="flex items-center relative">
                  <!--            <fa class="search-input-icon" :icon="['fas', 'search-plus']"/>-->
                  <svg
                    class="search-input-icon fill-current text-purple-midlight"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18.02 18.02"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g id="Group_712" data-name="Group 712">
                          <path
                            id="ic_search_24px"
                            data-name="ic search 24px"
                            d="M12.89,11.34h-.82l-.29-.28a6.69,6.69,0,1,0-.72.72l.28.29v.82L16.49,18,18,16.49Zm-6.18,0a4.63,4.63,0,1,1,4.63-4.63,4.63,4.63,0,0,1-4.63,4.63Z"
                          />
                          <g id="Group_672" data-name="Group 672">
                            <path
                              id="Path_2058"
                              data-name="Path 2058"
                              d="M5,4l5,4.76L8.77,9.86l-5-4.76Z"
                            />
                            <path
                              id="Path_2059"
                              data-name="Path 2059"
                              d="M9.84,5,5.07,10,3.92,8.8l4.76-5Z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <input
                    v-model.trim="searchAbleProperties.ignoreText"
                    type="text"
                    class="search-field"
                    placeholder="Ignore"
                  />
                </div>
              </div>
            </transition>
            <div class="flex flex-row justify-between pt-1">
              <label for="includeComments" class="text-gray-1400 text-lg"
                >Include Comments</label
              >
              <div
                class="
                  relative
                  inline-block
                  w-10
                  align-middle
                  select-none
                  transition
                  duration-200
                  ease-in
                "
              >
                <input
                  id="includeComment"
                  v-model="searchAbleProperties.includeComments"
                  checked
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    w-4
                    h-4
                    rounded-full
                    bg-white
                    border-4
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="includeComment"
                  class="
                    toggle-label
                    block
                    overflow-hidden
                    h-5
                    transition-all
                    duration-800
                    ease-in-out
                    rounded-full
                    bg-gray-300
                    cursor-pointer
                  "
                ></label>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <label for="includeReplies" class="text-gray-1400 text-lg"
                >Include Replies</label
              >
              <div
                class="
                  relative
                  inline-block
                  w-10
                  align-middle
                  select-none
                  transition
                  duration-200
                  ease-in
                "
              >
                <input
                  id="includeReplie"
                  v-model="searchAbleProperties.includeReplies"
                  checked
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    w-4
                    h-4
                    rounded-full
                    bg-white
                    border-4
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="includeReplie"
                  class="
                    toggle-label
                    block
                    overflow-hidden
                    h-5
                    transition-all
                    duration-800
                    ease-in-out
                    rounded-full
                    bg-gray-300
                    cursor-pointer
                  "
                ></label>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <label for="includeDirectMessages" class="text-gray-1400 text-lg"
                >Include Direct Messages</label
              >
              <div
                class="
                  relative
                  inline-block
                  w-10
                  align-middle
                  select-none
                  transition
                  duration-200
                  ease-in
                "
              >
                <input
                  id="includeDirectMessage"
                  v-model="searchAbleProperties.includeDirectMessages"
                  checked
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    w-4
                    h-4
                    rounded-full
                    bg-white
                    border-4
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="includeDirectMessage"
                  class="
                    toggle-label
                    block
                    overflow-hidden
                    h-5
                    rounded-full
                    transition-all
                    duration-800
                    ease-in-out
                    bg-gray-300
                    cursor-pointer
                  "
                ></label>
              </div>
            </div>
            <!-- <div class="w-full pt-1">
              <select-input
                id="allFeeds"
                v-model="searchAbleProperties.provider"
                :options="socialProvidersInitial"
                class="text-xl font-bold"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                color="#F8F8F8"
                background="#7D80BD"
                caret-bg="#7D80BD"
              >
              </select-input>
            </div>-->
            <div
              class="allFeeds_wrapper w-full cursor-pointer h-auto input z-30"
              @mouseleave.stop="showAllSocialFeeds = false"
            >
              <div @click.stop="showAllSocialFeeds = !showAllSocialFeeds">
                <select
                  id="allFeedsMenu"
                  v-model="allFeeds"
                  class="scrollStyle scrollWidth text-lg pointer-events-none"
                  :class="toggleSelect2 ? 'round-remove' : ''"
                  @click="toggleSelect2 = !toggleSelect2"
                  @focusout="toggleSelect2 = false"
                  @input="selectedName($event.target.value)"
                >
                  <option :value="allFeeds" selected>{{ allFeeds }}</option>
                </select>
                <span class="select-toggle">
                  <fa
                    :icon="[
                      'fas',
                      showAllSocialFeeds ? 'caret-up' : 'caret-down',
                    ]"
                  />
                </span>
              </div>
              <div
                class="arrow_parent"
                :class="showAllSocialFeeds ? 'block' : 'hidden'"
              >
                <div class="arrow"></div>
              </div>
              <div
                class="
                  w-full
                  shadow-xl
                  from-top
                  right-0
                  z-999999
                  bg-purple-midlight
                  allFeeds_ul_wrapper
                  max-height-70
                  scroll
                "
                :class="[
                  showAllSocialFeeds ? 'block absolute' : 'hidden absolute',
                  !controlBoxRound ? 'rounded-full' : 'rounded-xl',
                ]"
              >
                <AllFeedsMenu
                  ref="allFeedsMenu"
                  arrow-color="#7d80bd"
                  :show-all-social-feeds="showAllSocialFeeds"
                  :search-able-properties="searchAbleProperties"
                  :class-style-name="
                    !controlBoxRound ? 'border-radius-full' : 'border-raduis-xl'
                  "
                  @rounded="controlRound"
                  @select-feed="setAllFeeds"
                  @get-all-feeds="setAllFeedsValue"
                  @set-provider="selectedSource"
                  @set-group="selectedGroup"
                />
              </div>
            </div>
            <div
              class="w-full group"
              @click.stop="vCalenderShow()"
              @mouseleave.stop="vCalenderHide()"
            >
              <select-input
                id="pastMonths"
                v-model="searchAbleProperties.pastMonths"
                :show-v-celander="showVCelander"
                class="text-xl font-bold pointer-events-none"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                :place-holder="searchAbleProperties.pastMonths"
                color="#F8F8F8"
                background="#7D80BD"
                caret-bg="#7D80BD"
              ></select-input>
              <!-- :class="showVCelander ? 'block fixed' : 'hidden absolute'" -->
              <div
                id="vCalender"
                class="
                  w-full
                  shadow-xl
                  top-28
                  left-0
                  z-999999
                  rounded-3xl
                  fixed
                  v-calender-top
                "
                :class="showVCelander ? 'block' : 'hidden'"
              >
                <v-calender-with-preset
                  :show-v-celander="showVCelander"
                  date-picker-color="search"
                  @dateRange="pastMonthDateRageEvent"
                  @pastmonth="pastMonthsValue"
                  @hide-v-calender="vCalenderHide()"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mt-7 pb-4">
          <div class="flex flex-row justify-around">
            <button
              class="
                focus:outline-none
                w-44
                h-10
                text-purple-midlight
                rounded-full
                mr-2.5
                border-2 border-purple-midlight
                outline-none
                font-bold
                text-xl
                setup
              "
              @click="clearSearch"
            >
              <span>Clear</span>
            </button>
            <button
              class="
                focus:outline-none
                w-44
                h-10
                text-white
                bg-purple-midlight
                rounded-full
                border-none
                outline-none
                font-bold
                text-xl
                setup
              "
              @click="searchContext"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span>Search</span>
                <fa
                  v-if="searchProcess"
                  class="absolute right-5 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import bellPlusIcon from '../../assets/img/icon/ic_add_alert_24px.png'
import SelectInput from '~/components/inputs/SelectInput'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import { searchFeedContextMixin } from '~/mixins/search'
import AllFeedsMenu from '~/components/search/AllFeedsMenu'

export default defineComponent({
  components: {
    SelectInput,
    VCalenderWithPreset,
    AllFeedsMenu,
  },
  mixins: [searchFeedContextMixin],
  layout: 'home',
  props: {
    showSearchAlert: {
      type: Boolean,
    },
  },
  data() {
    return {
      skew: false,
      userSavedSearchEdit: false,
      bellPlusImg: bellPlusIcon,
      searchResults: [],
      search_text: [],
      blur: false,
      searchProcess: false,
      pastMonthDateRange: {},
      showAllSocialFeeds: false,
      controlBoxRound: false,
      toggleSelect2: false,
    }
  },
  validations: {
    searchAbleProperties: {
      searchText: {
        required,
      },
      provider: {
        required,
      },
      pastMonths: {
        required,
      },
    },
  },
  computed: {
    getShowMobileSaveSearchBar() {
      return this.$store.getters['mobile/header/getShowMobileSaveSearchBar']
    },
    showMobileSearch() {
      return this.$store.getters['mobile/header/getShowSearchBar']
    },
    user() {
      return this.$auth.user
    },
  },
  watch: {
    showSearchAlert(data) {
      this.blur = data
    },
  },
  methods: {
    ...mapActions({
      showSaveSearchAlert: 'search/showSaveSearchAlert',
    }),
    setAllFeeds(value) {
      if (value) {
        this.allFeeds = 'All Feeds'
      } else {
        this.allFeeds = 'Select Feeds'
      }
    },
    controlRound(value) {
      this.controlBoxRound = value
    },
    hideVCalender() {
      this.$nuxt.$emit('hideVCalender')
    },
    closeMobileSearch() {
      this.$store.dispatch('mobile/header/closeMobileSearchBar')
      this.$v.$reset()
      this.clearSearch()
    },
    showMobileSaveSearch() {
      this.$store.dispatch('mobile/header/showMobileSaveSearch')
    },
    showSaveSearchAlertModal() {
      this.showSaveSearchAlert(true)
    },
  },
})
</script>

<style lang="scss" scoped>
.toggle-checkbox {
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #393e46;
  &:checked {
    @apply right-0;
    left: 22px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    @apply bg-purple-midlight;
    transition: all 0.5s ease-in-out;
    background-color: #7d80bd;
  }
}

.list:hover {
  background-color: #7d80bd;
  color: #ffffff;
  border-radius: 50px;
}

.active {
  background-color: #7d80bd;
  color: #ffffff;
  border-radius: 50px;
}

.setup {
  bottom: 530px;
}

.profile {
  width: 450px;
  right: -450px;
  z-index: 9999;
}

.show {
  width: 450px;
  right: 0px;
}

.hide {
  width: 450px;
  right: -450px;
}

.scroll {
  scrollbar-color: #7d80bd #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: #7d80bd;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7d80bd;
  }
}

.v-calender-top {
  height: 70%;
}

.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    right: -100%;
    height: 78%;
    z-index: 999;
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

.search-input-icon {
  @apply text-purple-midlight absolute ml-4 w-5;
}

.search-field {
  @apply focus:outline-none text-xl w-full h-10 pl-10 py-1 rounded-full outline-none text-purple-midlight placeholder-purple-midlight placeholder-opacity-50;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.input {
  color: #f8f8f8;
  @apply relative bg-purple-midlight rounded-full;
  select {
    color: #f8f8f8;
    border-radius: 50%;
    @apply w-full py-1.5 px-4 focus:outline-none font-bold cursor-pointer bg-purple-midlight;
    -webkit-appearance: none;
    -moz-appearance: none;
    option {
      @apply font-semibold;
      // }
      &:focus,
      &:checked,
      &:hover {
        color: white;
        background-color: #7d80bd !important;
      }
    }
  }
  .round-remove {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .select-toggle {
    color: #ffffff;
    height: 24px;
    @apply absolute top-2 right-2 pointer-events-none;
    svg {
      @apply text-2xl;
    }
    padding-left: 3px !important;
  }
}
select.scrollWidth::-webkit-scrollbar {
  width: 2px;
}
select.scrollStyle::-webkit-scrollbar-track {
  background-color: #7d80bd;
}
select.scrollStyle::-webkit-scrollbar-thumb {
  background-color: #7d80bd;
}
// .right-130 {
//   right: -130%;
// }
.arrow_parent {
  width: 100%;
  height: 20px;
  position: absolute;
  top: 39px;
}
.arrow {
  @apply absolute top-0 right-5 w-0 h-0;
  content: '';
  border: 10px solid transparent;
  border-bottom-color: #7d80bd;
  border-top: 0;
  margin-left: -10px;
  margin-top: 4px;
  display: block;
}
.scroll-x {
  overflow-x: hidden !important;
}
.arrow {
  left: 30px;
}
.allFeeds_ul_wrapper {
  box-shadow: 0px 4px 6px #00000080;
}
.allFeeds_wrapper ul {
  width: 100%;
  max-height: 320px;
}
.max-height-70 {
  max-height: 320px;
}
.top-340 {
  top: 340px;
}
.from-top {
  top: 52px;
}
</style>
