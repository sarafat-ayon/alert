<template>
  <div class="search-wrapper">
    <div
      class="
        absolute
        bottom-0
        w-full
        bg-ash-default
        rounded-t-xl
        shadow-top
        search-modal
        transition-all
        duration-2000
      "
      :class="[
        showSearchBar ? 'modal-semi-top' : '',
        modalTopZero ? 'top-zero' : '',
      ]"
    >
      <div class="relative w-full">
        <!--start => search and price button section-->
        <div
          v-if="currentTabComponent === 'feeds'"
          class="absolute w-full flex items-center justify-center"
          :class="[
            modalSizeFull ? 'search-btn-wrapper-48' : 'search-btn-wrapper-9',
          ]"
        >
          <button
            v-if="!showSearchBarBtn"
            class="
              w-48
              text-yellow-600
              px-15
              py-1
              rounded-full
              border-2 border-yellow-600
              focus:outline-none
              font-semibold
            "
            @click="showSearchingBar"
          >
            <transition name="pricing-text">
              <span v-if="!priceBtn">Pricing</span>
            </transition>
          </button>

          <!--start => searchbar section-->
          <transition name="search-field">
            <div
              v-show="showSearchBar"
              class="flex items-center lg:w-1/3 w-2/5 rounded-full"
            >
              <fa
                class="text-yellow-600 absolute ml-7 search-icon w-4 h-4"
                :icon="['fas', 'search']"
              />
              <transition name="search-field-bg-trans">
                <input
                  v-if="showSearchBar"
                  v-model="searchText"
                  type="text"
                  class="
                    search-input
                    w-full
                    pl-15
                    py-1
                    rounded-full
                    outline-none
                    opacity-100
                    search-shadow
                    text-gray-700
                    placeholder-yellow-light
                    border-2
                  "
                  placeholder="Type your Username, Email, Url"
                  @keyup.enter="searchCustomPrice()"
                />
              </transition>
            </div>
          </transition>
          <!--start => searchbar section-->
        </div>
        <!--start => search and price button section-->

        <!--start => dynamic component load section-->
        <component
          :is="currentTabComponent"
          v-bind="{ modalSizeFull: modalSizeFull }"
        ></component>
        <!--end => dynamic component load section-->

        <!--start => search tab menu section-->
        <div
          v-if="modalSizeFull"
          class="
            absolute
            w-full
            top-28
            flex
            items-center
            justify-center
            search-tab
          "
          :class="[
            currentTabComponent === 'storage'
              ? 'slide-to-left'
              : 'slide-to-center',
          ]"
        >
          <search-modal-tab-menu
            @change="changeSearchTabMenu"
          ></search-modal-tab-menu>
        </div>
        <!--end => search tab menu section-->
      </div>
    </div>

    <!--start => sidebar section-->
    <side-bar
      class="hidden lg:block"
      :custom-price-tab="customPriceTab"
      :modal-size-full="modalSizeFull"
    ></side-bar>
    <!--end => sidebar section-->
  </div>
</template>

<script>
import SideBar from '~/components/right-sidebar/SideBar'
import SearchModalTabMenu from '~/components/SearchModalTabMenu'
import Feeds from '~/components/feeds/Feeds'
import Storage from '~/components/storage/ArchiveStorage'
export default {
  name: 'SearchModal',
  components: { Feeds, SideBar, SearchModalTabMenu, Storage },
  props: {
    isopensearchmodal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSearchBar: false,
      searchText: '',
      modalSizeFull: false,
      customPriceTab: false,
      priceBtn: false,
      showSearchBarBtn: false,
      currentTabComponent: 'feeds',
    }
  },
  computed: {
    modalTopZero() {
      return this.modalSizeFull
    },
  },
  watch: {
    isopensearchmodal(val) {
      this.showSearchBar = val
      if (!val) {
        setTimeout(() => {
          this.showSearchBarBtn = false
          this.priceBtn = false
        }, 2050)
      }
    },
  },
  methods: {
    showSearchingBar() {
      this.priceBtn = true
      setTimeout(() => {
        this.setSearchBarTrue()
      }, 800)
    },
    setSearchBarTrue() {
      this.showSearchBarBtn = true
      this.showSearchBar = true
      this.$emit('showSearchBar', this.showSearchBar)
    },
    searchCustomPrice() {
      if (this.searchText.length > 0) {
        this.modalSizeFull = true
        this.$emit('upLogoIndex', true)
        setTimeout(() => {
          this.updateCustomPriceTitle()
        }, 2000)
      } else {
        this.searchModalHalfClose()
      }
    },
    updateCustomPriceTitle() {
      setTimeout(() => {
        this.customPriceTab = true
      }, 1500)
    },
    searchModalHalfClose() {
      this.modalSizeFull = false
      this.$emit('upLogoIndex', false)
      setTimeout(() => {
        setTimeout(() => {
          this.customPriceTab = false
        }, 1500)
      }, 2000)
    },
    changeSearchTabMenu(currentTab) {
      this.currentTabComponent = currentTab
    },
  },
}
</script>

<style lang="scss">
.shadow-top {
  box-shadow: 0px -3px 5px #00000059;
}
.search-modal {
  top: 85%;
  height: 15%;
}
.modal-semi-top {
  top: 25%;
  height: 75%;
}
.top-zero {
  top: 0;
  height: 100%;
  width: 77%;
}

@media all and (max-width: 1023px) {
  .top-zero {
    width: 100%;
  }
}

.search-wrapper {
  width: 33.333333%;
}
.right-sidebar-position-zero {
  width: 25%;
}
.search-btn-wrapper-9 {
  top: 36px;
  transition: 1s ease-in-out 0.5s;
}
.search-btn-wrapper-48 {
  top: 192px;
  transition: 1.5s ease-in-out 0.5s;
}
/*start => transition and animation section*/

/*start search field and button section transition*/
.pricing-text-leave-to,
.pricing-text-enter {
  opacity: 0;
}
.pricing-text-leave-active,
.pricing-text-enter-to {
  transition: opacity 1s;
}
.search-field-enter,
.search-field-leave-to {
  width: 192px;
  input::placeholder {
    visibility: hidden;
  }
  .search-icon {
    display: none;
  }
}
.search-field-enter-to,
.search-field-leave {
  width: 33.333333%;
  input::placeholder {
    visibility: hidden;
  }
  .search-icon {
    display: none;
  }
}
.search-field-enter-active {
  transition: width 2s ease-in-out;
}
.search-field-leave-active {
  transition: width 2s ease-in-out;
}
.search-field-bg-trans-enter {
  background: #393e46;
  border: 2px solid #d97706;
}
.search-field-bg-trans-leave-from {
  background: #393e46;
  border: 2px solid #d97706;
}
.search-field-bg-trans-enter-to {
  background: #fff;
  border: 2px solid #fafafa;
}
.search-field-bg-trans-leave-to {
  background: #393e46;
  border: 2px solid #d97706;
}
.search-field-bg-trans-enter-active {
  transition: background 2s ease-in-out 1s, border 1s ease-in-out 1s;
}
.search-field-bg-trans-leave-active {
  transition: background 2s ease-in-out, border 2s ease-in-out;
}
/*end search field and button section transition*/

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.search-tab {
  opacity: 0;
  animation: fadeIn 2s 1;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
}
/*end => transition and animation section*/
</style>
