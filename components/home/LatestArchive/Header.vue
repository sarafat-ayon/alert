<template>
  <section class="bg-ash-default md:h-auto h-full">
    <header
      class="md:flex hidden flex-row items-center px-6"
      @click="closeSidebar()"
    >
      <div class="flex flex-row items-center ml-auto space-x-1 cursor-pointer">
        <div class="flex flex-row items-center space-x-4">
          <transition name="header">
            <div
              v-if="
                (headerText || textOfHeader) && user.userPermission !== 'User'
              "
              class="card-footer flex items-center justify-end"
            >
              <button
                class="
                  rounded-full
                  py-2
                  lg:px-5
                  px-3
                  text-center text-white
                  font-bold
                  md:text-md
                  text-xs
                "
                :style="{
                  'background-color': `${globalColorPanel.backgroundColor}`,
                }"
                @click="
                  showAddFeedsComp($event),
                    previousCurrentComp.length > 0 &&
                    store.currentComp === 'SummaryTable'
                      ? store.backToCurrentComp(previousCurrentComp[0])
                      : ''
                "
              >
                Add More Feeds
              </button>
            </div>
          </transition>
          <transition name="header">
            <div
              v-if="headerText || textOfHeader"
              class="flex flex-row items-center mt-1"
              @click="
                showNotificationModal($event),
                  previousCurrentComp.length > 0 &&
                  store.currentComp === 'SummaryTable'
                    ? store.backToCurrentComp(previousCurrentComp[0])
                    : ''
              "
            >
              <div class="relative">
                <fa
                  v-if="unreadNotificationCount > 0"
                  class="mx-2 text-red-lightness text-3xl"
                  :icon="['fas', 'bell']"
                />
                <fa
                  v-else
                  :style="{ color: `${globalColorPanel.backgroundColor}` }"
                  class="mx-2 text-3xl"
                  :icon="['fas', 'bell']"
                />
                <div
                  v-if="unreadNotificationCount > 0"
                  class="
                    absolute
                    flex
                    justify-center
                    items-center
                    -top-px
                    right-0
                    w-5
                    h-5
                    rounded-full
                    text-sm
                    bg-red-600
                    text-white text-center
                  "
                >
                  <span class="text-center font-semibold text-xs">
                    {{ unreadNotificationCount }}
                  </span>
                </div>
              </div>
            </div>
          </transition>
          <transition name="header">
            <div
              v-if="headerText || textOfHeader"
              class="flex flex-row items-center"
              @click="
                showProfile($event),
                  previousCurrentComp.length > 0 &&
                  store.currentComp === 'SummaryTable'
                    ? store.backToCurrentComp(previousCurrentComp[0])
                    : ''
              "
            >
              <fa
                :style="{ color: `${globalColorPanel.backgroundColor}` }"
                class="text-3xl mr-2"
                :icon="['fas', 'user-circle']"
              />
              <p v-if="loggedIn" class="text-xl font-bold lg:block hidden">
                {{ `${user.firstName} ${user.lastName}` }}
              </p>
              <p v-if="loggedIn" class="text-xl font-bold block lg:hidden">
                {{ `${user.firstName}` }}
              </p>
              <p v-else class="text-xl font-bold">Guest</p>
            </div>
          </transition>
        </div>

        <div
          v-if="!headerText && !textOfHeader"
          class="flex flex-row items-center"
          @click="showProfile($event)"
        >
          <fa
            :style="{ color: `${globalColorPanel.backgroundColor}` }"
            class="mx-2 text-3xl"
            :icon="['fas', 'user-circle']"
          />
          <p v-if="loggedIn" class="text-xl font-bold">{{ user.firstName }}</p>
          <p v-else class="text-xl font-bold">Guest</p>
        </div>
      </div>
    </header>
    <!-- Small Device -->
    <header
      class="
        md:hidden
        mobile_header
        overflow-hidden
        fixed
        z-100
        py-3
        px-4
        transition-all
        duration-500
      "
      :class="[
        expandRight || showHomeSearch
          ? 'mobile_header_expand'
          : 'mobile_header',
        showFullMenu &&
        !showOption &&
        !showOriginalTranscription &&
        (currentHead === 'RealTimeFeed' || currentHead === 'MessageFeed') &&
        currentComp !== 'Google' &&
        currentComp !== 'Microsoft' &&
        currentComp !== 'Calls' &&
        currentComp !== 'Faxes' &&
        currentComp !== 'Texts' &&
        currentComp !== 'Websites'
          ? 'menu_main'
          : showFullMenu &&
            showOption &&
            !showOriginalTranscription &&
            (currentHead === 'RealTimeFeed' || currentHead === 'MessageFeed') &&
            currentComp !== 'Google' &&
            currentComp !== 'Microsoft' &&
            currentComp !== 'Calls' &&
            currentComp !== 'Faxes' &&
            currentComp !== 'Texts' &&
            currentComp !== 'Websites'
          ? 'menu_main_option'
          : showFullMenu && showOriginalTranscription && showOption
          ? 'menu_origin_option'
          : showFullMenu && showOriginalTranscription && !showOption
          ? 'menu_origin'
          : showFullMenu && showOption && !showOriginalTranscription
          ? 'menu_option'
          : showFullMenu && !showOption && !showOriginalTranscription
          ? 'menu'
          : 'mobile_header',
        expandRight && skew
          ? `${
              betaVersion
                ? 'mobile_header_expand_archive_source_beta'
                : 'mobile_header_expand_archive_source'
            }`
          : 'mobile_header',
        showAlertHeader ? 'mobile_alert_header_height' : 'mobile_header',
      ]"
      :style="{
        '--maxHeight': `${windowHeight}px`,
        '--height': `${height + 126}px`,
      }"
      @click="vCalenderHide()"
    >
      <div class="flex flex-row justify-between items-center">
        <div
          class="h-9 flex justify-center items-center"
          @click.stop="expandHeader()"
        >
          <fa
            v-if="!expandRight"
            :class="headerConfig.barColor"
            class="text-2xl"
            :icon="['fas', 'bars']"
          />
          <p
            v-if="expandRight"
            class="text-lg cursor-pointer"
            :class="headerConfig.barColor"
            :icon="['fas', 'bars']"
          >
            {{ headerConfig.text }}
          </p>
        </div>
        <div v-if="!expandRight">
          <nuxt-link target="_blank" to="/" rel="noopener noreferrer">
            <img class="w-9 h-9" :src="logo" alt="SharpArchive Logo" />
          </nuxt-link>
        </div>
        <div
          v-if="
            !expandRight &&
            currentHead !== 'LatestArchive' &&
            headerConfig.icon !== 'archive' &&
            headerConfig.icon !== 'search' &&
            headerConfig.icon !== 'plus'
          "
          class="w-9 h-9"
          @click="expandMenu()"
        >
          <HeaderFilter
            class="
              w-6
              h-6
              ml-3
              mt-2
              flex
              justify-center
              items-center
              cursor-pointer
            "
            :class="
              showFullMenu
                ? 'transition duration-500 transform rotate-180'
                : 'transition duration-500 transform rotate-0'
            "
          />
        </div>
        <div
          v-if="headerConfig.icon === 'search' && !expandRight"
          class="w-9 h-9 flex justify-center items-center"
          @click="showSearch"
        >
          <fa
            :class="headerConfig.iconColor"
            class="text-yellow-600 text-2xl"
            :icon="['fas', 'search']"
          />
        </div>
        <div
          v-if="
            headerConfig.icon === 'home' &&
            !expandRight &&
            currentHead === 'LatestArchive'
          "
          class="w-9 h-9 flex justify-center items-center"
          @click="showHomeSearchBar"
        >
          <fa
            :class="headerConfig.iconColor"
            class="text-yellow-600 text-2xl"
            :icon="['fas', 'search']"
          />
        </div>
        <div
          v-if="headerConfig.icon === 'plus' && !expandRight"
          class="w-9 h-9 flex justify-center items-center"
          @click="
            currentComp === 'GeneralAlertSettings' ||
            currentComp === 'AlertSystemSetting'
              ? setShowCross()
              : ''
          "
        >
          <fa
            v-if="!showAlertHeader && !showCross"
            :class="headerConfig.iconColor"
            class="text-red-deep text-2xl"
            :icon="['fas', 'plus']"
            @click="expandPlus"
          />
          <fa
            v-else-if="showAlertHeader && !showCross"
            :class="headerConfig.iconColor"
            class="text-red-deep text-2xl"
            :icon="['fas', 'minus']"
            @click="collapseMinus"
          />
          <div
            v-else-if="showCross"
            class="
              w-8
              h-8
              rounded-full
              bg-offwhite-800
              flex
              items-center
              justify-center
            "
          >
            <fa
              :class="headerConfig.iconColor"
              class="text-red-deep text-2xl"
              :icon="['fas', 'times']"
            />
          </div>
        </div>
        <div
          v-if="headerConfig.icon === 'archive' && !expandRight"
          class="w-9 h-9 flex justify-center items-center"
          @click="showFilter"
        >
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="25"
            viewBox="0 0 512 512"
            width="25"
            class="fill-current"
            :class="headerConfig.iconColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m420.041 0h-328.082c-50.708 0-91.959 41.251-91.959 91.959v328.081c0 50.709 41.251 91.96 91.959 91.96h328.082c50.708 0 91.959-41.251 91.959-91.959v-328.082c0-50.708-41.251-91.959-91.959-91.959zm12.649 399.561h-164.091c-14.422 42.69-75.006 42.755-89.449 0h-99.84c-19.922 0-19.927-30.118 0-30.118h99.84c14.421-42.69 75.006-42.755 89.449 0h164.091c19.922 0 19.928 30.118 0 30.118zm0-128.502h-35.589c-14.422 42.69-75.006 42.755-89.45 0h-228.341c-19.922 0-19.927-30.118 0-30.118h228.342c14.421-42.69 75.006-42.755 89.45 0h35.589c19.921 0 19.927 30.118-.001 30.118zm0-128.502h-228.342c-14.422 42.69-75.006 42.755-89.449 0h-35.589c-19.922 0-19.927-30.118 0-30.118h35.589c14.421-42.69 75.006-42.755 89.449 0h228.342c19.922 0 19.928 30.118 0 30.118z"
              />
              <path
                d="m223.875 367.435c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z"
              />
              <path
                d="m159.624 110.431c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z"
              />
              <path
                d="m352.376 238.933c-22.581 0-22.569 34.133 0 34.133 22.581.001 22.569-34.133 0-34.133z"
              />
            </g>
          </svg>
        </div>
        <div
          v-if="expandRight && !showHomeSearch"
          class="flex flex-row justify-around items-center"
        >
          <div class="w-9 h-9 flex justify-center items-center">
            <router-link to="/settings" @click.native="hideMobileHaeder()">
              <fa class="text-white-600 text-2xl" :icon="['fas', 'cog']" />
            </router-link>
          </div>
          <div class="w-9 h-9 flex justify-center items-center">
            <router-link to="/help" @click.native="hideMobileHaeder()">
              <fa
                class="text-white-600 text-2xl"
                :icon="['fas', 'question-circle']"
              />
            </router-link>
          </div>
          <div
            class="w-9 h-9 flex justify-center items-center"
            @click="showNotificationModal($event)"
          >
            <div class="relative">
              <fa
                v-if="unreadNotificationCount > 0"
                class="text-red-lightness mx-2 text-2xl"
                :icon="['fas', 'bell']"
              />
              <fa
                v-else
                :style="{ color: `${globalColorPanel.backgroundColor}` }"
                class="mx-2 text-2xl"
                :icon="['fas', 'bell']"
              />
              <div
                v-if="unreadNotificationCount > 0"
                class="
                  absolute
                  flex
                  justify-center
                  items-center
                  -top-px
                  right-0
                  w-5
                  h-5
                  rounded-full
                  text-sm
                  bg-red-600
                  text-white text-center
                "
              >
                <span class="text-center font-semibold text-xs">
                  {{ unreadNotificationCount }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="w-9 h-9 flex justify-center items-center"
            @click="showProfile($event)"
          >
            <fa
              :style="{ color: `${globalColorPanel.backgroundColor}` }"
              class="text-2xl"
              :icon="['fas', 'user-circle']"
            />
          </div>
        </div>
      </div>

      <div
        v-if="showFullMenu"
        class="
          flex
          mt-10
          w-full
          space-y-3
          transition-all
          duration-500
          flex-wrap
        "
      >
        <incoming-outgoing
          v-if="currentComp === 'Google' || currentComp === 'Microsoft'"
          class="md:mt-4"
        ></incoming-outgoing>
        <voice-recorded
          v-if="currentComp === 'Calls'"
          class="md:mt-4"
        ></voice-recorded>
        <received-sent
          v-if="currentComp === 'Faxes'"
          class="md:mt-4"
        ></received-sent>
        <original-transcription
          v-if="
            currentComp === 'Google' ||
            currentComp === 'Microsoft' ||
            currentComp === 'Calls' ||
            currentComp === 'Faxes'
          "
          class="md:mt-4"
          :class="showOriginalTranscription ? 'block' : 'hidden'"
        ></original-transcription>
        <!-- <div
          class="source_wrapper w-full rounded-3xl h-10 input"
          @click.stop="calenderShow = true"
          @mouseleave.stop="calenderShow = false"
        >
          <select
            id="name"
            v-model="selectedDateRange"
            class="pointer-events-none"
            @click="toggleSelect3 = !toggleSelect3"
            @focusout="toggleSelect3 = false"
          >
            <option class="hidden" :value="selectedDateRange" selected>
              {{ selectedDateRange }}
            </option>
          </select>
          <span class="select-toggle">
            <fa :icon="['fas', toggleSelect3 ? 'caret-up' : 'caret-down']" />
          </span>
          <div
            class="
              w-full
              shadow-xl
              top-34
              right-0
              z-999999
              rounded-3xl
              transition-opacity
              duration-500
              v-calender-top
            "
            :class="
              calenderShow
                ? 'block fixed opacity-1'
                : 'hidden absolute opacity-0'
            "
          >
            <v-calender-with-preset
              :show-v-celander="calenderShow"
              header-bg-color="bg-yellow-primary"
              sidebar-hover-class="hover:bg-yellow-primary hover:text-white"
              sidebar-active-color="bg-yellow-primary text-white"
              date-picker-color="orange"
              content-body-color="bg-yellow-primary"
              content-body-hover-color="hover:bg-white hover:text-green-1100"
              content-body-active-color="bg-white text-green-1100"
              @dateRange="datePickerEvent"
              @hide-v-calender="vCalenderHide()"
            />
          </div>
        </div>-->

        <div
          v-if="
            (currentHead === 'RealTimeFeed' ||
              currentHead === 'LatestArchive' ||
              currentHead === 'MessageFeed') &&
            currentComp !== 'Google' &&
            currentComp !== 'Microsoft' &&
            currentComp !== 'Calls' &&
            currentComp !== 'Faxes'
          "
          class="
            hover:text-white
            self-center
            hover:bg-yellow-primary
            rounded-3xl
            h-10
            post-style
            font-bold
            w-full
            cursor-pointer
          "
          :class="
            currentHead === 'RealTimeFeed'
              ? 'text-white bg-yellow-primary'
              : 'text-yellow-primary bg-white'
          "
          @click="feedLatestMenu('RealTimeFeed')"
        >
          <h4 class="mt-2 text-left pl-3.5">Posts</h4>
        </div>

        <div
          v-if="
            (currentHead === 'RealTimeFeed' ||
              currentHead === 'LatestArchive' ||
              currentHead === 'MessageFeed') &&
            currentComp !== 'Google' &&
            currentComp !== 'Microsoft' &&
            currentComp !== 'Calls' &&
            currentComp !== 'Faxes'
          "
          class="
            hover:text-white
            self-center
            hover:bg-yellow-primary
            rounded-3xl
            h-10
            message-style
            font-bold
            w-full
            cursor-pointer
          "
          :class="
            currentHead === 'MessageFeed'
              ? 'text-white bg-yellow-primary'
              : 'text-yellow-primary bg-white'
          "
          @click="feedLatestMenu('MessageFeed')"
        >
          <h4 class="mt-2 text-left pl-3.5">Messages</h4>
        </div>

        <!-- <div class="w-full" @click="showOptionMenu()">
          <Options class="mobile_dropdown w-full h-10" />
        </div>-->
      </div>

      <ArchiveSourcesDropdown
        v-if="showFeedsMenu && !showAlertHeader && !showFullMenu"
        ref="dropdown"
        class="col-span-2 mt-5"
        :window-height="windowHeight"
        :active="false"
        :height="archiveDropHeight"
        :source="headerConfig.dropdownMenuColor"
        @collapse-header="showSkew($event)"
        @define-height="defineHeight"
      />
      <SearchBar
        v-if="
          showHomeSearch &&
          !showFeedsMenu &&
          !showAlertHeader &&
          currentHead === 'LatestArchive' &&
          !showFeedsMenu
        "
        class="mt-5"
        @search="searchContent($event)"
        @clickSearch="goToSearch($event)"
      />
      <!-- v-if="showAlertHeader && !showFeedsMenu && !showHomeSearch" -->
      <AlertHeader
        class="mt-5"
        :class="
          showAlertHeader && !showFeedsMenu && !showHomeSearch
            ? ' opacity-100'
            : 'opacity-0'
        "
      />
    </header>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import { format, parseISO } from 'date-fns'
import Logo from 'assets/img/icon/logo.svg'
import Filter from 'assets/img/icon/filter.svg'
import SearchBar from '~/components/home/SearchBar'
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import AlertHeader from '~/components/alert/alert-mobile/header/AlertHeader.vue'
import { useAlert } from '~/stores/alert'
import HeaderFilter from '~/components/shared/icon/HeaderFilter.vue'
// import Options from '~/components/home/realtimeFeedRss/Options'
// import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import IncomingOutgoing from '~/components/home/realtimeFeedRss/IncomingOutgoing.vue'
import VoiceRecorded from '~/components/home/realtimeFeedRss/VoiceRecorded.vue'
import ReceivedSent from '~/components/home/realtimeFeedRss/ReceivedSent.vue'
import OriginalTranscription from '~/components/home/realtimeFeedRss/OriginalTranscription.vue'

export default defineComponent({
  components: {
    ArchiveSourcesDropdown,
    SearchBar,
    AlertHeader,
    HeaderFilter,
    // Options,
    // VCalenderWithPreset,
    IncomingOutgoing,
    VoiceRecorded,
    ReceivedSent,
    OriginalTranscription,
  },
  props: {
    textOfHeader: {
      type: Boolean,
    },
    source: {
      type: String,
      default: '',
    },
    expandExist: {
      type: Boolean,
    },
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
    windowHeight: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useAlert()
    const { currentComp, previousCurrentComp } = storeToRefs(store)

    return {
      currentComp,
      previousCurrentComp,
      store,
    }
  },
  data() {
    return {
      logo: Logo,
      filter: Filter,
      expandRight: false,
      skew: false,
      showHomeSearch: false,
      showFeedsMenu: false,
      showAlertHeader: false,
      showCross: false,
      showFullMenu: false,
      showDropdown: true,
      showOriginalTranscription: false,
      toggleSelect3: false,
      selectedDateRange: 'All Dates',
      calenderShow: false,
      dateRange: {
        start: '',
        end: '',
      },
      showOption: false,
      height: 40,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    user() {
      return this.$store.state.auth.user
    },
    headerConfig() {
      return this.$store.getters['mobile/header/getHeaderConfig']
    },
    ...mapState(['betaVersion']),
    archiveDropHeight() {
      return this.betaVersion ? 330 : 248
    },
    ...mapState('loginAnimation', {
      headerText: 'headerText',
    }),
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
    ...mapGetters('notifications', ['unreadNotificationCount']),
    ...mapGetters('home', ['currentHead', 'currentHeader']),
    ...mapGetters('home', ['currentComp', 'currentSocialComponent']),
    ...mapState('socialFeed', ['socialFeeds']),
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        if (to.name === 'home') {
          if (this.showFeedsMenu) {
            this.$store.commit('home/SET_SHOW_MOBILE_MENU', true)
          }
          this.$store.dispatch('mobile/header/closeFilter')
          this.$store.dispatch('mobile/header/closeMobileSearchBar')
        }
        if (to.name === 'archive') {
          this.showFullMenu = false
          this.$store.commit('home/SET_SHOW_MOBILE_MENU', false)
          this.$store.dispatch('mobile/header/closeMobileSearchBar')
        }
        if (to.name === 'search') {
          this.showFullMenu = false
          this.$store.commit('home/SET_SHOW_MOBILE_MENU', false)
          this.$store.dispatch('mobile/header/closeFilter')
        }
        if (to.name === 'alert') {
          this.showFullMenu = false
          this.$store.commit('home/SET_SHOW_MOBILE_MENU', false)
          this.$store.dispatch('mobile/header/closeFilter')
          this.$store.dispatch('mobile/header/closeMobileSearchBar')
        }
      }
    },
    expandExist(val) {
      if (this.$route.name !== 'alert') {
        // for dev
        if (!val) {
          if (this.expandRight && this.skew) {
            this.$refs.dropdown.expand()
          }
          this.expandRight = false
          this.showFeedsMenu = false
          this.showFullMenu = false
        }
        this.$store.commit('home/SET_SHOW_MOBILE_MENU', val)
      } else {
        // for alert
        if (val) {
          if (!this.showFeedsMenu) {
            this.showAlertHeader = true
            this.showHideAlertHeader()
          } else if (this.showAlertHeader) {
            this.showFeedsMenu = false
          }
        }
        if (!val) {
          this.expandRight = false
          if (!this.showFeedsMenu) {
            this.showAlertHeader = false
            this.showHideAlertHeader()
          } else if (this.showAlertHeader) {
            this.showFeedsMenu = false
          }
          // this.showFullMenu = false
        }
      }
    },
    currentComp(data) {
      if (data === 'GeneralAlertSettings' || data === 'AlertSystemSetting') {
        this.showAlertHeader = false
        this.showHomeSearch = false
        this.showFeedsMenu = false
        if (!this.showAlertHeader) {
          setTimeout(() => {
            this.showCross = true
          }, 500)
        }
      } else {
        this.showCross = false
      }
    },
  },
  mounted() {
    if (this.expandExist) {
      this.$store.commit('home/SET_SHOW_MOBILE_MENU', false)
    } else {
      this.$store.commit('home/SET_SHOW_MOBILE_MENU', false)
    }
    if (this.$route.name === 'settings' || this.$route.name === 'help') {
      this.hideMobileHaeder()
    }
    if (this.$route.query.addMoreFeed === 'true') {
      this.showAddFeedsComp()
    }
  },
  methods: {
    expandPlus() {
      this.showAlertHeader = true
      this.skew = false
      this.$emit('show-footer', false)
      this.$parent.fromRightHeader(true)
    },
    collapseMinus() {
      this.showAlertHeader = false
      this.$parent.fromRightHeader(false)
    },
    setShowCross() {
      this.showCross = false
      this.store.backToCurrentComp(this.previousCurrentComp[0])
    },
    showHideAlertHeader() {
      // this.showAlertHeader = !this.showAlertHeader
      this.showHomeSearch = false
      this.showFeedsMenu = false
    },
    defineHeight(value) {
      console.log(value)
      this.height = value
    },
    vCalenderHide() {
      this.calenderShow = false
    },
    closeSidebar() {
      this.store.showNewAlertComp(false)
      this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
      this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
        open: false,
        data: {},
      })
      this.$store.commit('setting/SET_SHOW_CREATE_GROUP', false)
      this.$store.commit('setting/SET_SHOW_EDIT_GROUP', false)
      this.$store.dispatch('showArchiveSettings', false)
      this.$store.commit('setting/SET_SHOW_PROFILE', false)
      this.$store.dispatch('mobile/header/removePayment')
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
      this.$store.commit('setting/SET_CHANGE_BILLING_INFO', false)
      this.$store.commit('setting/SET_SHOW_INVOICE', false)
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
      if (
        this.previousCurrentComp.length > 0 &&
        this.store.currentComp === 'SummaryTable'
      ) {
        this.store.backToCurrentComp(this.previousCurrentComp[0])
      }
    },
    showSkew($event) {
      this.skew = $event
    },
    showAddFeedsComp($event) {
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
      $event.stopPropagation()
    },
    showNotificationModal($event) {
      this.$store.commit('notifications/SET_OFFSET', 0)
      this.$store.commit('notifications/SET_LIMIT', 25)
      this.$store.dispatch('notifications/getAllNotifications')
      this.$store.dispatch('notifications/notificationModal', true)

      $event.stopPropagation()
    },
    expandHeader() {
      if (this.$route.name !== 'alert') {
        // From dev
        if (this.showFullMenu) {
          this.showFullMenu = false
          setTimeout(() => {
            if (!this.showFullMenu) {
              this.showDropdown = true
            }
          }, 1000)
          if (this.expandRight && this.skew) {
            this.$refs.dropdown.expand()
          }
          this.skew = false
          setTimeout(() => {
            this.expandRight = !this.expandRight
            this.showHomeSearch = false
            this.showFeedsMenu = true
            this.$emit('show-footer', this.expandRight)
            // this.$emit('blur', this.expandRight)
          }, 800)
        } else {
          this.showFullMenu = false
          if (!this.showFullMenu) {
            this.showDropdown = true
          }
          if (this.expandRight && this.skew) {
            this.$refs.dropdown.expand()
          }
          this.skew = false
          this.expandRight = !this.expandRight

          this.showHomeSearch = false
          this.showFeedsMenu = true
          this.$store.commit('home/SET_SHOW_MOBILE_MENU', this.expandRight)
          this.$emit('show-footer', this.expandRight)
          // this.$emit('blur', this.expandRight)
        }
      } else {
        // alert old
        this.expandRight = !this.expandRight
        this.showHomeSearch = false
        this.showAlertHeader = false
        this.showFeedsMenu = true
        // this.showCross = false
        this.$emit('show-footer', this.expandRight)
        this.$emit('blur', this.expandRight)
      }
    },
    expandMenu() {
      this.showDropdown = false
      this.showFeedsMenu = false
      this.showOption = false
      this.showFullMenu = !this.showFullMenu
      setTimeout(() => {
        if (!this.showFullMenu) {
          this.showDropdown = true
        }
      }, 1500)
      this.$emit('show-footer', this.showFullMenu)
      // this.$emit('blur', this.showFullMenu)
      this.$store.commit('home/SET_SHOW_MOBILE_MENU', this.showFullMenu)
    },
    feedLatestMenu(currentHead) {
      this.$store.commit('home/SET_CURRENT_HEADER', currentHead)
    },
    datePickerEvent(dateRange) {
      this.dateRange.start = dateRange.start
      this.dateRange.end = dateRange.end
      this.selectedDateRange = this.pastMonthPlaceholder(
        dateRange.start,
        dateRange.end,
        this.globalDateformat
      )
    },
    pastMonthPlaceholder(start, end, dateFormat) {
      return (
        format(parseISO(end), dateFormat) +
        ' - ' +
        format(parseISO(start), dateFormat)
      )
    },
    showOptionMenu() {
      this.showOption = !this.showOption
    },
    showSearch() {
      this.$store.dispatch('mobile/header/showSearchBar')
    },
    showHomeSearchBar() {
      this.showFeedsMenu = false
      this.showDropdown = false
      this.showAlertHeader = false
      this.expandRight = false
      this.skew = false
      this.showHomeSearch = !this.showHomeSearch
      this.$store.dispatch(
        'mobile/header/setHomeMobileSearchField',
        this.showHomeSearch
      )
    },
    showFilter() {
      this.$store.dispatch('mobile/header/showFilter')
      this.$store.dispatch('archive/setFilter', false)
    },
    showAddAlert() {
      this.$store.dispatch('mobile/header/showAddAlert')
    },
    showProfile($event) {
      this.$store.commit('SET_SHOW_SIDE_BAR', true)
      this.$store.commit('profile/SET_PROFILE_MODAL', true)
      $event.stopPropagation()
    },
    hideMobileHaeder() {
      this.$store.dispatch('mobile/header/closeMobileHeader')
    },
    clickSearch(text) {
      this.$store.dispatch('mobile/header/searchLatestArchive', text)
    },
    searchContent($event) {
      // this.$store.dispatch('mobile/header/searchLatestArchive', $event)
    },
    goToSearch($event) {
      if ($event !== '') {
        this.$store.commit('search/SET_HOME_SEARCH', $event)
        this.$router.push('/search')
        this.showHomeSearch = false
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.scroll {
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e4801d;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e4801d;
  }
}
header {
  width: 100%;
  height: 60px;
  background: #171d26;
  color: #ffffff;
  border-radius: 0 0 1.563rem 0;
  box-shadow: 0 4px 5px #0a0d104d;
}
.header-enter {
  opacity: 0;
}
.header-enter-active {
  transition: opacity 1.5s ease-in-out;
  transition-delay: 1.5s;
}
.header-enter-to {
  opacity: 1;
}
//Small Device
.mobile_header {
  height: 65px;
  min-height: 65px;
  max-height: var(--maxHeight);
  border-radius: 0 0 1.563rem 1.563rem;
}
.mobile_header_expand {
  height: 126px;
  max-height: var(--maxHeight);
  border-radius: 0 0 1.563rem 1.563rem;
}
.mobile_header_expand_archive_source_beta {
  height: 467px;
  border-radius: 0 0 1.563rem 1.563rem;
}
.mobile_header_expand_archive_source {
  // height: 375px;
  height: var(--height);
  max-height: var(--maxHeight);
  border-radius: 0 0 1.563rem 1.563rem;
}
.mobile_alert_header_height {
  height: 296px;
  border-radius: 0 0 1.563rem 1.563rem;
}
.menu_origin_option {
  height: 420px;
}
.menu_origin {
  height: 310px;
}
.menu_main_option {
  height: 425px;
}
.menu_option {
  height: 380px;
}
.menu {
  // height: 250px;
  height: 150px;
}
.menu_main {
  // height: 310px;
  height: 200px;
}
.mobile_header_full_menu_except_origTran {
  height: 260px;
}
.mobile_header_full_menu {
  height: 310px;
}
.mobile_header_full_menu_with_originOption {
  height: 420px;
}
.name_wrapper {
  @apply lg:w-46 md:w-38 mx-1 md:my-1 lg:mb-2 lg:mt-0 rounded-full;
}
.input {
  color: #f8f8f8;
  @apply relative bg-yellow-primary;
  select {
    color: #f8f8f8;
    border-radius: 50%;
    @apply w-full py-2 px-4 focus:outline-none font-bold cursor-pointer bg-yellow-primary;
    -webkit-appearance: none;
    -moz-appearance: none;
    option {
      @apply font-semibold;
      // }
      &:focus,
      &:checked,
      &:hover {
        color: white;
        background-color: #e4801d !important;
      }
    }
  }
  .round-remove {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .select-toggle {
    color: #ffffff;
    top: 5.2px;
    @apply absolute right-3.5 pointer-events-none;
    svg {
      font-size: 1.6rem;
    }
  }
}
select.scrollWidth::-webkit-scrollbar {
  width: 2px;
}
select.scrollStyle::-webkit-scrollbar-track {
  background-color: #5f822d;
}
select.scrollStyle::-webkit-scrollbar-thumb {
  background-color: #5f822d;
}
.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}
.v-calender-top {
  height: 70%;
}
// .menu_bar-enter,
// .menu_bar-leave-to {
//   opacity: 0;
// }
// .menu_bar-enter-active {
//   transition: all 0.5s ease-in-out;
//   transition-delay: 0.5s;
// }
// .menu_bar-leave-active {
//   transition: all 0.5s ease-in-out;
// }
// .menu_bar-enter-to,
// .menu_bar-leave-from {
//   opacity: 1;
// }
// .menu_text-enter,
// .menu_text-leave-to {
//   opacity: 0;
// }
// .menu_text-enter-active {
//   transition: all 0.5s ease-in-out;
//   transition-delay: 0.5s;
// }
// .menu_text-leave-active {
//   transition: all 0s ease-in-out;
// }
// .menu_text-enter-to,
// .menu_text-leave-from {
//   opacity: 1;
// }
.menu_logo-enter,
.menu_logo-leave-to {
  opacity: 0;
}
.menu_logo-enter-active,
.menu_logo-leave-active {
  transition: all 0.5s ease-in-out;
}
.menu_logo-enter-to,
.menu_logo-leave-from {
  opacity: 1;
}
.menu_user_profile-enter {
  opacity: 0;
}
.menu_user_profile-enter-active {
  transition: all 0.5s ease-in-out;
}
.menu_user_profile-enter-to {
  opacity: 1;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s;
}
.fadeIn-enter-active {
  transition-delay: 0.1s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
