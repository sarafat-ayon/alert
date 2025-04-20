<template>
  <div
    ref="nested shadow"
    class="balance__menu static"
    :style="{ '--color': globalColorPanel.backgroundColor }"
  >
    <div
      ref="dropdown"
      class="
        dropdown-btn
        transition-border-radius
        duration-500
        rounded-t-3xl
        outline-none
        z-10
        font-roboto
      "
      :style="{ backgroundColor: globalColorPanel.backgroundColor }"
      :class="[`${source}`, round ? 'rounded-3xl' : '']"
    >
      <button class="w-11/12 text-left" @click="expand($event)">
        <span class="text-md font-bold font-roboto">Options</span>
      </button>
      <svg
        width="15"
        height="15"
        class="
          fill-current
          text-white
          transition-all
          duration-300
          ease-in-out
          cursor-pointer
        "
        :class="menuOpen ? 'rotate-0' : 'rotate-180'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 292.362 292.362"
        @click="expand($event)"
      >
        <path
          d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
    C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
    s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
        />
      </svg>
    </div>
    <div
      class="flex dropdown fixed flex-col rounded-b-3xl shadow-2xl"
      :style="[{ '--height': `${totalItem * 36 + 12}px` }]"
      :class="[increaseHeight ? 'expand' : '']"
    >
      <div class="menu-wrapper flex-grow relative scroll-hidden">
        <div class="menu-content">
          <div class="menu-item list-wrapper">
            <div>
              <div
                class="
                  parent-list
                  list-item
                  cursor-pointer
                  flex
                  group-archive
                  rounded-b-2xl
                  shadow-2xl
                  w-full
                "
                :class="[`group-archive__${source}`]"
              >
                <ul id="listID" class="list w-full" @click.stop>
                  <li
                    v-if="showComment"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      justify-between
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Expand Comments</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="expandComments"
                        v-model="expandComments"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="expandComments"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showImage"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      justify-between
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Show Images</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="showImages"
                        v-model="showImages"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="showImages"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showSignature"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Show Signatures</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="showSignatures"
                        v-model="showSignatures"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="showSignatures"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showDisclosure"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Show Disclosures</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="showDisclosures"
                        v-model="showDisclosures"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="showDisclosures"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showMissedCall"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Show Missed Calls</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="showMissedCalls"
                        v-model="showMissedCalls"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="showMissedCalls"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showUnrecordedCall"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">
                      Show Unrecorded Calls
                    </p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="ShowUnrecordedCalls"
                        v-model="ShowUnrecordedCalls"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="ShowUnrecordedCalls"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showSystemText"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Show System Texts</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="ShowSystemTexts"
                        v-model="ShowSystemTexts"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="ShowSystemTexts"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="hideUnknown"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Hide Unknown</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="hideUnknown"
                        v-model="hideUnknownFax"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="hideUnknown"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                  <li
                    v-if="showDetail"
                    class="
                      list-item
                      cursor-pointer
                      py-1
                      px-3
                      flex flex-row
                      text-left
                    "
                    :class="[`__${source}`]"
                  >
                    <p class="text-md line-height py-1.5">Show Details</p>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        id="ShowDetails"
                        v-model="showDetails"
                        checked
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-white
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="ShowDetails"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="equity rounded-b-3xl"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MobileExitTryDemo',
  filters: {
    currency(value) {
      const formattedValue = new Intl.NumberFormat().format(Math.abs(value))
      return value >= 0 ? `$${formattedValue}` : `$(${formattedValue})`
    },
  },
  props: {
    source: {
      type: String,
      required: false,
      default: '',
    },
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '#e4801d' }
      },
    },
  },
  data() {
    return {
      collapse: false,
      menuOpen: true,
      increaseHeight: false,
      toggle: false,
      scroll: false,
      round: true,
      exitDemoProcess: false,
      tryDemoExitProcess: false,
      showDeleteAlert: false,
      progress: false,
      showImages: false,
      showSignatures: false,
      showDisclosures: false,
      expandComments: false,
      showMissedCalls: false,
      ShowUnrecordedCalls: false,
      ShowSystemTexts: false,
      hideUnknownFax: false,
      showDetails: false,
      showComment: false,
      showImage: false,
      showDetail: false,
      showSignature: false,
      showDisclosure: false,
      showMissedCall: false,
      showUnrecordedCall: false,
      showSystemText: false,
      hideUnknown: false,
      totalItem: 0,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    ...mapState('socialFeed', [
      'socialFeeds',
      'showSinglePost',
      'showSingleImagePost',
    ]),
    ...mapState('home', ['showOptionsOverAll']),
    ...mapGetters('home', ['currentComp']),
  },
  watch: {
    showOptionsOverAll(data) {
      if (!data) {
        this.expand()
      }
    },
    currentComp(data) {
      if (data) {
        this.countItems()
        this.showOptions()
      }
    },
  },
  mounted() {
    this.showOptions()
  },
  methods: {
    showOptions() {
      this.showComment = false
      this.showImage = false
      this.showDetail = false
      this.showSignature = false
      this.showDisclosure = false
      this.showMissedCall = false
      this.showUnrecordedCall = false
      this.showSystemText = false
      this.hideUnknown = false
      if (
        this.currentComp === 'Facebook' ||
        this.currentComp === 'Instagram' ||
        this.currentComp === 'LinkedIn' ||
        this.currentComp === 'Twitter' ||
        this.currentComp === 'Google' ||
        this.currentComp === 'Texts' ||
        this.currentComp === 'Websites'
      ) {
        this.showImage = true
      }
      if (
        this.currentComp === 'Facebook' ||
        this.currentComp === 'Instagram' ||
        this.currentComp === 'LinkedIn' ||
        this.currentComp === 'Twitter' ||
        this.currentComp === 'Websites'
      ) {
        this.showDetail = true
      }
      if (
        this.currentComp === 'Facebook' ||
        this.currentComp === 'Instagram' ||
        this.currentComp === 'LinkedIn' ||
        this.currentComp === 'Twitter' ||
        this.currentComp === 'Websites'
      ) {
        this.showComment = true
      }
      if (this.currentComp === 'Google') {
        this.showSignature = true
        this.showDisclosure = true
      }
      if (this.currentComp === 'Calls') {
        this.showMissedCall = true
        this.showUnrecordedCall = true
      }
      if (this.currentComp === 'Texts') {
        this.showSystemText = true
      }
      if (this.currentComp === 'Faxes') {
        this.hideUnknown = true
      }
      setTimeout(() => {
        this.countItems()
      }, 2000)
    },
    countItems() {
      const ul = document.getElementById('listID')
      let i = 0
      let itemCount = 0
      while (ul.getElementsByTagName('li')[i++]) itemCount++
      this.totalItem = itemCount
    },
    expand($event) {
      if (!this.progress) {
        this.toggle = true
        this.$store.commit('home/SET_SHOW_OPTIONS', true)
      } else if (this.progress) {
        this.toggle = false
      }
      if (this.toggle && !this.progress) {
        this.menuOpen = false
        this.round = false
        setTimeout(() => {
          this.increaseHeight = true
        }, 300)
        setTimeout(() => {
          this.scroll = true
          this.progress = true
        }, 800)
      } else if (!this.toggle && this.progress) {
        this.scroll = false
        this.increaseHeight = false
        setTimeout(() => {
          this.round = true
          this.menuOpen = true
        }, 400)
        setTimeout(() => {
          this.progress = false
        }, 800)
      }
    },
    hideMobileHaeder() {
      this.$store.dispatch('mobile/header/closeMobileHeader')
    },
  },
}
</script>

<style lang="scss" scoped>
$color: var(--color);
.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #e4801d;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
}
.tooltip {
  @apply invisible;
}
.has-tooltip:hover .tooltip {
  @apply visible;
  left: -30px;
  padding: 3px 10px;
}
.text-xxs {
  font-size: 11px;
  line-height: 16px;
}

.menu-wrapper {
  .background {
    opacity: 0;
    position: absolute;
    z-index: 9999;
    transition: margin-top 0.5s ease-in-out, opacity 0.3s ease 0.5s,
      background 0.3s ease 0.5s;
    height: 2.75rem;
    @apply w-full;

    .corner-top {
      position: absolute;
      top: -20px;
      right: 0px;
      display: inline-block;
      transition: color 0.3s ease 0.5s;
    }

    .corner-bottom {
      position: absolute;
      bottom: -20px;
      right: 0px;
      transform: rotate(270deg);
      display: inline-block;
      transition: color 0.3s ease 0.5s;
    }

    &.active {
      opacity: 1;
      .corner-top,
      .corner-bottom {
        // opacity: 1;
      }
    }
  }
}

.balance__menu {
  z-index: 80;
  transition: border-radius 0.5s ease-in-out,
    border-top-left-radius 0.5s ease-in-out,
    border-top-right-radius 0.5s ease-in-out;
  max-width: 16rem;
  min-width: 16rem;
  @apply md:w-full w-full;
  .btn-wrapper {
    background: #4c5764;
    @apply w-full px-4 flex justify-between items-center shadow-sm;

    .dropdown-btn {
      direction: ltr;
      line-height: 2.15rem !important;
      @apply text-white w-full h-10 text-lg focus:outline-none;

      * {
        // pointer-events: none;
      }
    }
  }
  .dropdown-btn {
    direction: ltr;
    @apply text-white w-full h-full px-3.5 text-lg flex justify-between items-center shadow-sm focus:outline-none;

    * {
      // pointer-events: none;
    }
  }
}

.dropdown {
  max-width: 16rem;
  overflow: hidden;
  @apply w-full;
  z-index: 100;
  overflow-x: hidden;
  height: 0;
  max-height: calc(100% - 132px);
  transform-origin: top;
  transition: transform 0.3s linear, height 0.5s linear;
  .dropdown-btn,
  .menu-title,
  .list-title,
  .equity {
    //direction: ltr;
    background: $color;
    line-height: 2.15rem !important;
    @apply text-white bg-orange-dark w-full h-3 px-3 text-lg flex justify-between items-center focus:outline-none;
  }

  .equity {
    @apply py-2;
    padding-left: 13px;
    padding-right: 13px;
  }

  .scroll-hidden {
    overflow: hidden;
  }

  .scroll {
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: thin;
    scrollbar-color: $color #ececec; /* Firefox 64 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background: #ececec;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $color;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: $color;
    }
  }
  .scroll__archive {
    scrollbar-color: $color #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $color;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: $color;
    }
  }

  .list-wrapper {
    .group-archive {
      @apply font-roboto;
      background: $color;
      font-style: normal;
      font-variant: normal;
      font-weight: normal;
      border-bottom: 0px;
      letter-spacing: 0;
      font-size: 1.125rem;
      color: #f2f2f2;

      &__name {
        height: 40px;
      }

      .list {
        .list-item {
          height: 36px;
          background: $color;
          border-color: #707070;
        }
      }
    }
  }

  .list-item {
    // direction: ltr;
    text-align: left;
    @apply text-md font-normal flex justify-between w-full items-center;
    // border-top: 1px solid;
  }

  &.expand {
    height: var(--height);
    // height: calc(100vh - 172px);
  }
  &.expand1 {
    height: auto;
  }
}
.parent-list {
  border-top: 0px !important;
}
.dropdown-icon {
  pointer-events: none;

  &.rotate {
    transform: rotate(180deg) !important;
  }
}
.line-height {
  line-height: 16px;
}
.rotate-0 {
  transform: rotate(0deg);
}
.rotate-180 {
  transform: rotate(180deg);
}
@media (max-width: 767px) {
  .balance__menu {
    max-width: 100%;
  }
  .dropdown {
    max-width: 100%;
  }
}
@media (max-width: 480px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 28rem;
    }
  }
}
@media (max-width: 428px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 24.75rem;
    }
  }
}
@media (max-width: 425px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 24.535rem;
    }
  }
}
@media (max-width: 424px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 24.5rem;
    }
  }
}
@media (max-width: 414px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 23.87rem;
    }
  }
}
@media (max-width: 412px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 23.75rem;
    }
  }
}
@media (max-width: 395px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 22.7rem;
    }
  }
}
@media (max-width: 393px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 22.55rem;
    }
  }
}
@media (max-width: 390px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 22.4rem;
    }
  }
}
@media (max-width: 384px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 22rem;
    }
  }
}
@media (max-width: 375px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 21.45rem;
    }
  }
}
@media (max-width: 360px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 20.5rem;
    }
  }
}
@media (max-width: 320px) {
  .mobile_dropdown {
    .dropdown {
      max-width: 18rem;
    }
  }
}
</style>
