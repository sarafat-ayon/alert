<template>
  <div
    class="right-0 absolute bg-ash-dark p-4 md:pt-8 profile transition-all duration-800 ease-in-out overflow-y-auto scroll md:top-0 md:rounded-l-2xl md:shadow-2xl"
    :class="showSavedSearchSideBar ? 'show' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full">
        <div class="flex flex-row justify-between items-center">
          <h2 class="text-purple-midlight xl:text-2xl md:text-xl font-normal">Save Search</h2>
          <button class="w-8 h-8 flex items-center justify-end cursor-pointer" @click="resetAll()">
            <fa
              class="text-purple-midlight xl:text-2xl md:text-xl font-normal"
              :icon="['fas', 'times']"
            />
          </button>
        </div>
        <div class="flex flex-col mt-5 space-y-3">
          <div class="w-full h-10 flex flex-row items-center rounded-full px-2 bg-white">
            <input
              ref="userNameInput"
              v-model.trim="saveSearchProperties.name"
              class="outline-none rounded-full bg-white w-full h-full placeholder-purple-midlight placeholder-opacity-50 xl:text-lg md:text-md pl-2"
              type="text"
              placeholder="Name of Search"
              @blur="$v.saveSearchProperties.name.$touch()"
            />
          </div>
          <div class="w-full h-10 flex flex-row items-center rounded-full px-2 bg-white mt-2">
            <fa class="text-purple-midlight ml-2" :icon="['fas', 'search']" />
            <input
              ref="mayContent"
              v-model.trim="saveSearchProperties.searchText"
              class="outline-none pl-2 rounded-full bg-white w-full h-full placeholder-purple-midlight placeholder-opacity-50 xl:text-lg md:text-md"
              type="text"
              placeholder="May Contain"
            />
          </div>
          <div class="w-full h-10 flex flex-row items-center rounded-full px-2 bg-white mt-2">
            <svg
              class="text-purple-midlight ml-2 w-5 fill-current"
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
              v-model.trim="saveSearchProperties.containText"
              class="outline-none rounded-full bg-white w-full h-full placeholder-purple-midlight placeholder-opacity-50 xl:text-lg md:text-md pl-2"
              type="text"
              placeholder="Must Contain"
            />
          </div>
          <div class="w-full h-10 flex flex-row items-center rounded-full px-2 bg-white mt-2">
            <svg
              class="text-purple-midlight ml-2 fill-current w-5"
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
              v-model.trim="saveSearchProperties.ignoreText"
              class="outline-none pl-2 rounded-full bg-white w-full h-full placeholder-purple-midlight placeholder-opacity-50 xl:text-lg md:text-md"
              type="text"
              placeholder="Ignore"
            />
          </div>
        </div>
        <div class="flex flex-row justify-between mt-4">
          <div
            class="md:w-52 lg:mb-0 text-lg font-bold allFeeds_wrapper selectSearch cursor-pointer h-auto z-30"
            @mouseleave.stop="showAllSocialFeeds = false"
          >
            <div class="input" @click.stop="showAllSocialFeeds = !showAllSocialFeeds">
              <select
                id="allFeedsMenuOfSaveSearch"
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
              <div class="arrow_parent" :class="showAllSocialFeeds ? 'block' : 'hidden'">
                <div class="arrow"></div>
              </div>
            </div>
            <div
              class="w-full right-0 bg-purple-midlight allFeeds_ul_wrapper absolute top-13.3 from-top-allFeeds max-height-320 scroll-x right-130"
              :class="[
                showAllSocialFeeds ? 'block' : 'hidden',
                !controlBoxRound ? 'rounded-full' : 'rounded-xl',
              ]"
            >
              <AllFeedsMenu
                ref="allFeedsMenu"
                arrow-color="#7d80bd"
                :show-all-social-feeds="showAllSocialFeeds"
                :save-search-properties="saveSearchProperties"
                class-style-name="border-radius"
                @rounded="controlRound"
                @select-feed="setAllFeeds"
                @get-all-feeds="setSavedAllFeedsValue"
                @set-provider="selectedSavedSource"
                @set-group="selectedSavedGroup"
              />
            </div>
            <!-- @get-all-feeds="setAllFeedsValue"
                        @set-provider="selectedSource"
                        @set-group="selectedGroup"
                        @set-name="selectedName"
            @select-feed="setAllFeeds"-->
          </div>
          <!-- <div class="md:w-52 lg:mb-0">
            <select-input
              id="allFeeds"
              v-model="saveSearchProperties.provider"
              class="h-full text-lg font-bold"
              class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
              :options="socialProvidersInitial"
              color="white"
              background="#7D80BD"
              caret-bg="#7D80BD"
              @blur="$v.saveSearchProperties.provider.$touch()"
            >
            </select-input>
            <template v-if="$v.saveSearchProperties.provider.$error">
              <p
                v-if="!$v.saveSearchProperties.provider.required"
                class="text-red-400 text-xs mb-0 pl-2"
              >
                The field is required
              </p>
            </template>
          </div>-->
          <div
            class="md:w-52 lg:mt-0 group cursor-pointer"
            @click="vCalenderShow()"
            @mouseleave.stop="vCalenderHide()"
          >
            <select-input
              id="pastMonths"
              v-model="saveSearchProperties.pastMonths"
              :show-v-celander="showVCelander"
              class="h-full text-lg font-bold pointer-events-none"
              class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
              :place-holder="saveSearchProperties.pastMonths"
              color="white"
              background="#7D80BD"
              caret-bg="#7D80BD"
              @blur="$v.saveSearchProperties.pastMonths.$touch()"
            ></select-input>

            <div
              class="w-full shadow-xl absolute top-13.3 from-top right-0 z-999999 bg-white rounded-3xl border-top"
            >
              <v-calender-with-preset
                :show-v-celander="showVCelander"
                date-picker-color="search"
                @dateRange="pastMonthDateRageEvent"
                @pastmonth="pastMonthsValue"
                @hide-v-calender="vCalenderHide()"
              />
            </div>

            <!-- <template v-if="$v.saveSearchProperties.pastMonths.$error">
              <p
                v-if="!$v.saveSearchProperties.pastMonths.required"
                class="text-red-400 text-xs mb-0 pl-2"
              >
                The field is required
              </p>
            </template>-->
          </div>
        </div>
        <div class="flex flex-row justify-between mt-4">
          <label
            for="includeComments"
            class="text-gray-1400 xl:text-lg md:text-base text-xs"
          >Include Comments</label>
          <div
            class="relative inline-block w-9 align-middle select-none transition duration-200 ease-in"
          >
            <input
              id="includeComments"
              v-model="saveSearchProperties.includeComments"
              checked
              type="checkbox"
              name="toggle"
              class="toggle-checkbox absolute block rounded-full bg-white appearance-none cursor-pointer"
            />
            <label
              for="includeComments"
              class="toggle-label block overflow-hidden h-5 transition-all duration-800 ease-in-out rounded-full bg-white cursor-pointer"
            ></label>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-3">
          <label
            for="includeReplies"
            class="text-gray-1400 xl:text-lg md:text-base text-xs"
          >Include Replies</label>
          <div
            class="relative inline-block w-9 align-middle select-none transition duration-200 ease-in"
          >
            <input
              id="includeReplies"
              v-model="saveSearchProperties.includeReplies"
              checked
              type="checkbox"
              name="toggle"
              class="toggle-checkbox absolute block rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="includeReplies"
              class="toggle-label block overflow-hidden h-5 transition-all duration-800 ease-in-out rounded-full bg-white cursor-pointer"
            ></label>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-3">
          <label
            for="includeDirectMessages"
            class="text-gray-1400 xl:text-lg md:text-base text-xs"
          >Include Direct Messages</label>
          <div
            class="relative inline-block w-9 align-middle select-none transition duration-200 ease-in"
          >
            <input
              id="includeDirectMessages"
              v-model="saveSearchProperties.includeDirectMessages"
              checked
              type="checkbox"
              name="toggle"
              class="toggle-checkbox absolute block rounded-full bg-white appearance-none cursor-pointer"
            />
            <label
              for="includeDirectMessages"
              class="toggle-label block overflow-hidden h-5 rounded-full transition-all duration-800 ease-in-out bg-white cursor-pointer"
            ></label>
          </div>
        </div>
        <div class="flex flex-row justify-center space-x-5 h-14 px-8 mt-4">
          <transition name="fadeIn">
            <button
              v-if="showSaveButton"
              class="w-44 h-10 text-purple-midlight rounded-full border-2 border-purple-midlight outline-none font-bold text-base setup focus:outline-none"
              @click="cancelUserSavedSearch"
            >
              <div class="rounded-full relative flex items-center justify-around">
                <span>Cancel</span>
                <fa
                  v-if="deleteProcess"
                  class="absolute right-8 text-purple-midlight font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </transition>
          <transition name="fadeIn">
            <button
              v-if="!userSavedSearchEdit"
              class="focus:outline-none w-44 h-10 text-purple-midlight rounded-full border-2 border-purple-midlight outline-none font-bold text-base setup"
              @click="clearUserSavedSearch"
            >
              <div class="rounded-full relative flex items-center justify-around">
                <span>Clear</span>
              </div>
            </button>
            <button
              v-if="userSavedSearchEdit && showAddNewButton"
              class="focus:outline-none w-44 h-10 text-purple-midlight rounded-full border-2 border-purple-midlight outline-none font-bold text-base setup"
              :disabled="deleteProcess"
              @click="deleteSaveUserSearch"
            >
              <div class="rounded-full relative flex items-center justify-around">
                <span>Delete</span>
                <fa
                  v-if="deleteProcess"
                  class="absolute right-8 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </transition>
          <transition name="fadeIn">
            <button
              v-if="showAddNewButton"
              class="focus:outline-none w-44 h-10 text-white bg-purple-midlight rounded-full border-none outline-none font-bold text-base setup"
              :disabled="addProcess"
              @click="
                !userSavedSearchEdit ? addUserSavedSearch() : clearOldData()
              "
            >
              <div class="rounded-full relative flex items-center justify-around">
                <span>Add New</span>
                <fa
                  v-if="addProcess"
                  class="absolute right-5 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </transition>
          <transition name="fadeIn">
            <button
              v-if="showSaveButton"
              class="focus:outline-none w-44 h-10 text-white bg-purple-midlight rounded-full border-none outline-none font-bold text-base setup"
              :disabled="updateProcess"
              @click="updateUserSavedSearch"
            >
              <div class="rounded-full relative flex items-center justify-around">
                <span>Save</span>
                <fa
                  v-if="updateProcess"
                  class="absolute right-8 text-white font-bold animate-spin"
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </transition>
        </div>
        <div class="flex flex-col mt-5 w-full h-46 rounded-xl">
          <h2 class="text-purple-midlight xl:text-2xl md:text-xl">Saved Search List</h2>
          <div class="bg-white mt-3 py-5 px-2 w-full h-56 rounded-xl scroll">
            <ul class="space-y-1">
              <button
                v-for="list in savedSearches"
                :key="list.id"
                class="w-full text-left"
                :disabled="selectedItem"
                @click="
                  editSaveUserSearch(list.id)"
              >
                <li
                  class="text-purple-midlight text-lg list px-3 py-1 cursor-pointer"
                  :class="saveSearchProperties.id === list.id ? 'active' : ''"
                >{{ list.text }}</li>
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-center mt-8 space-x-5 px-8 md:pb-4 w-full">
        <button
          class="focus:outline-none w-44 h-10 text-purple-midlight rounded-full border-2 border-purple-midlight outline-none font-bold text-base setup"
          @click="resetAll()"
        >
          <span>Exit</span>
        </button>
        <button
          :disabled="searchProcess"
          class="focus:outline-none w-44 h-10 text-white bg-purple-midlight rounded-full border-none outline-none font-bold text-base setup"
          @click="filterUserSavedSearch"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span>Search</span>
            <fa
              v-if="searchProcess"
              class="absolute right-8 text-white font-bold animate-spin"
              :icon="['fas', 'spinner']"
            />
          </div>
        </button>
      </div>
    </div>

    <alert-confirm-modal
      :processing="deleteProcess"
      :show="showDeleteAlertModal"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import SelectInput from '~/components/inputs/SelectInput'
import { SAVE_USER_SEARCH } from '~/constants/urls'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import { saveSearchCreatedMixin } from '~/mixins/search'
import AllFeedsMenu from '~/components/search/SaveSearchFeedsMenu'

export default {
  Name: 'SaveSearch',
  components: {
    SelectInput,
    AlertConfirmModal,
    VCalenderWithPreset,
    AllFeedsMenu,
  },
  mixins: [saveSearchCreatedMixin],
  layout: 'home',
  props: {
    savedSearches: {
      type: Array,
      default: null,
    },
    searchProcess: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      skew: false,
      deleteProcess: false,
      filterProcess: false,
      showDeleteAlertModal: false,
      showAllSocialFeeds: false,
      controlBoxRound: false,
      toggleSelect2: false,
    }
  },
  computed: {
    ...mapState('search', ['showSavedSearchSideBar']),
  },
  validations: {
    saveSearchProperties: {
      name: {
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
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 5250)
  },
  methods: {
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
    deleteCancel() {
      this.showDeleteAlertModal = false
    },
    async deleteConfirm() {
      try {
        this.deleteProcess = true

        const res = await this.$axios.$delete(SAVE_USER_SEARCH, {
          data: {
            id: this.saveSearchProperties.id,
          },
        })
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.removeSavedSearch(this.saveSearchProperties.id)
          this.clearOldData()
          this.userSavedSearchEdit = false
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.showDeleteAlertModal = false
        this.deleteProcess = false
      }
    },
    deleteSaveUserSearch() {
      this.$toast.clear()
      if (!this.saveSearchProperties.id) {
        this.$toast.error('Not found!', {
          className: ['toasted-bg-alert'],
        })
      } else {
        this.showDeleteAlertModal = true
      }
    },
    resetAll() {
      this.userSavedSearchEdit = false
      this.clearOldData()
      this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
    },
    filterUserSavedSearch() {
      if (this.saveSearchProperties.id) {
        this.$emit('searchingData', this.saveSearchProperties.id)
        this.$emit('closeSavedSearchSideBar')
      }
      // else {
      //   this.$emit('userSaveSearchWiseContext', '')
      // }
    },
    clearUserSavedSearch() {
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
      // this.$emit('userSaveSearchWiseContext', '')
      this.clearOldData()
      this.userSavedSearchEdit = false
    },
    cancelUserSavedSearch() {
      this.showSaveButton = false
      setTimeout(() => {
        this.showAddNewButton = true
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
.from-top {
  top: 350px;
}
.from-top-allFeeds {
  top: 348px;
}
.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #393e46;
  &:checked {
    @apply right-0;
    left: 18px;
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
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 999999999;
}

.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
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

.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

@media (max-width: 767px) {
  .profile {
    width: 100%;
    right: -100%;
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

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter,
.fadeIn-leave-to {
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
</style>
