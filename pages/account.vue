<template>
  <div>
    <div class="w-full bg-ash-default h-screen">
      <logo :position="true"></logo>
      <div class="m-auto flex justify-center items-center pt-44">
        <div class="flex flex-col justify-center">
          <transition name="search-tab-trans">
            <div class="flex items-center justify-center search-tab">
              <search-modal-tab-menu
                :storage-tab-active="storageTabActive"
                :set-up-btn="setUpBtn"
                @change="changeSearchTabMenu"
              ></search-modal-tab-menu>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModalTabMenu from '~/components/search-modal/SearchTabMenu'
import Logo from '~/components/SharpArchiveSmallLogo.vue'
export default {
  name: 'SearchModal',
  components: { SearchModalTabMenu, Logo },
  props: ['searchModalClose'],
  data() {
    return {
      priceBtnText: false,
      priceBtnExpended: false,
      priceBtnClose: false,
      searchModalExpanded: false,
      searchModalExpandedFull: false,
      showSearchBar: false,
      showSearchTab: false,
      currentTabComponent: 'feeds',
      customPriceTab: false,
      selectedFeeds: [],
      storageTabActive: false,
      setUpBtn: false,
    }
  },
  computed: {},
  watch: {
    searchModalClose(val) {
      // expect false (need to close)
      if (!val) {
        // if come false
        this.closeTheSearchModal()
      }
    },
  },
  methods: {
    showSearchingBar() {
      this.priceBtnText = true
      setTimeout(() => {
        this.priceBtnExpended = true
        this.searchModalExpanded = true
        this.$emit('searchModalExpanded', this.searchModalExpanded)
      }, 800)
      setTimeout(() => {
        this.priceBtnClose = true
        this.showSearchBar = true
      }, 2800)
    },

    searchCustomPrice(boolean) {
      if (boolean) {
        this.searchModalExpandedFull = true
        this.$emit('upLogoIndex', true)
        setTimeout(() => {
          this.showSearchTab = true
          this.updateCustomPriceTitle()
        }, 2000)
      } else {
        this.searchModalExpandedFull = false
        this.showSearchTab = false
        this.$emit('upLogoIndex', false)
      }
    },
    searchResultPass(boolean) {
      this.searchCustomPrice(boolean)
    },

    updateCustomPriceTitle() {
      setTimeout(() => {
        this.customPriceTab = true
      }, 1500)
    },

    changeSearchTabMenu(currentTab) {
      this.storageTabActive = false
      this.currentTabComponent = currentTab
    },

    closeTheSearchModal() {
      this.showSearchBar = false
      this.showSearchTab = false
      setTimeout(() => {
        this.priceBtnClose = false
        this.searchModalExpanded = false
      }, 10)
      setTimeout(() => {
        this.priceBtnExpended = false
      }, 200)
      setTimeout(() => {
        this.priceBtnText = false
      }, 2000)
    },

    pushSelectedFeeds(data) {
      this.selectedFeeds.push(data)
    },
    removeFeedItem(id) {
      this.selectedFeeds = this.selectedFeeds.filter((item) => {
        return item.id !== id
      })
    },
    setUpStorageTab() {
      this.storageTabActive = true
    },
    clickOnTheSetupBtn(boolean) {
      this.setUpBtn = boolean
    },
  },
}
</script>

<style lang="scss">
.search-modal-expanded-full {
  height: 100%;
  width: 100%;
}
@media all and (max-width: 1023px) {
  .search-modal-expanded-full {
    width: 100%;
  }
}

.pricing-text-leave-to,
.pricing-text-enter {
  opacity: 0;
}
.pricing-text-leave-active,
.pricing-text-enter-to {
  transition: opacity 1s;
}

.price-btn {
  background: #393e46;
  border: 2px solid #d97706;
  transition: all 2s ease-in-out;
}
.price-btn-expended {
  background: #ffffff;
  border: 2px solid #fcfcfc;
}

.search-component-wrapper {
  width: 100%;
  transition: width 2s ease-in-out, margin-top 2s ease-in-out;
}

.slide-to-bottom {
  margin-top: 16rem;
  width: 77%;
}
@media (max-width: 1535px) {
  .slide-to-bottom {
    margin-top: 13rem;
  }
}

.search-tab {
  opacity: 1;
  padding-bottom: 1.75rem;
}
.search-tab-trans-enter {
  opacity: 0;
}
.search-tab-trans-enter-to {
  opacity: 1;
}
.search-tab-trans-enter-active {
  transition: opacity 1s ease-in-out 0.5s;
}

@keyframes dynamicComponentFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.dynamic-component-wrapper {
  opacity: 0;
  animation: dynamicComponentFadeIn 1s ease-in-out 0.5s;
  animation-fill-mode: forwards;
}

// SlideIn transition
.slideIn-enter-active {
  // transition-delay: 1s;
  transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-in-out 0.5s;
}
.slideIn-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-in-out;
}

.slideIn-enter {
  opacity: 0;
  // display: none;
  transform: translate(100%);
}

.slideIn-enter-to {
  opacity: 1;
  transform: translate(0%);
}

.slideIn-leave {
  opacity: 1;
  transform: translate(0%);
  // display: none;
}

.slideIn-leave-to {
  opacity: 0;
  // display: none;
  transform: translate(-100%);
}

@keyframes slideToLeft {
  to {
    display: none;
  }
}
.searchbar-slide-to-left {
  transform: translate(-100%);
  animation: slideToLeft 1s ease-out 0.5s;
}

@keyframes fadeOutComponent {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fade-out-component {
  animation: fadeOutComponent 1s;
  animation-fill-mode: forwards;
}

.search-component-wrapper-w-100 {
  width: 100%;
}
</style>
