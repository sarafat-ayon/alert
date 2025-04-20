<template>
  <div class="filter rounded-b-3xl" :class="filter ? 'show' : 'hide'" @click="calenderShow = false">
    <div class="flex justify-between filter-head text-xl text-white px-2 mb-8 pt-2">
      <h5 class="text-2xl">Filter</h5>
      <h2>
        <fa
          class="text-lime-200 text-2xl font-normal"
          :icon="['fas', 'times']"
          @click="closeFilter"
        />
      </h2>
    </div>

    <!-- <div class="source_wrapper input filter-inputs2">
      <select
        id="source"
        v-model="selectedSources"
        @click="toggleSelect = !toggleSelect"
        @focusout="toggleSelect = false"
      >
        <option value="Source" selected>Source</option>
        <option
          v-for="option in getProviders"
          :key="option.id"
          :value="option.text"
          :selected="option.placeholder"
        >
          {{ option.text }}
        </option>
      </select>
      <span class="select-toggle">
        <fa :icon="['fas', toggleSelect ? 'caret-up' : 'caret-down']" />
      </span>
    </div>
    <div class="source_wrapper input filter-inputs2">
      <select
        id="group"
        v-model="selectedNames"
        @click="toggleSelect2 = !toggleSelect2"
        @focusout="toggleSelect2 = false"
      >
        <option value="Name" selected>Name</option>
        <option
          v-for="option in allNames"
          :key="option.id"
          :value="option.id"
          :selected="option.placeholder"
        >
          {{ option.text }}
        </option>
      </select>
      <span class="select-toggle">
        <fa :icon="['fas', toggleSelect2 ? 'caret-up' : 'caret-down']" />
      </span>
    </div>
    <div class="source_wrapper input filter-inputs2">
      <select
        id="name"
        v-model="selectedGroups"
        @click="toggleSelect1 = !toggleSelect1"
        @focusout="toggleSelect1 = false"
      >
        <option value="Group" selected>Group</option>
        <option
          v-for="option in allGroups"
          :key="option.id"
          :value="option.id"
          :selected="option.placeholder"
        >
          {{ option.text }}
        </option>
      </select>
      <span class="select-toggle">
        <fa :icon="['fas', toggleSelect1 ? 'caret-up' : 'caret-down']" />
      </span>
    </div>-->
    <div
      class="allFeeds_wrapper cursor-pointer h-auto input z-30"
      @click="showAllSocialFeeds = true"
      @mouseleave.stop="showAllSocialFeeds = false"
    >
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
        <fa :icon="['fas', showAllSocialFeeds ? 'caret-up' : 'caret-down']" />
      </span>
      <div class="arrow_parent" :class="showAllSocialFeeds ? 'block' : 'hidden'">
        <div class="arrow"></div>
      </div>
      <div
        class="w-full shadow-xl top-32 right-0 z-999999 bg-green-1100 allFeeds_ul_wrapper max-height-70 scroll"
        :class="[showAllSocialFeeds ? 'block fixed' : 'hidden absolute', !controlBoxRound ?'rounded-full' : 'rounded-xl'] "
      >
        <AllFeedsMenu
          ref="allFeedsMenu"
          arrow-color="#8DB230"
          :show-all-social-feeds="showAllSocialFeeds"
          :class-style-name="!controlBoxRound ? 'border-radius-full' : 'border-raduis-xl'"
          @rounded="controlRound"
          @get-all-feeds="setAllFeedsValue"
          @set-provider="selectedSource"
          @set-group="selectedGroup"
          @set-name="selectedName"
          @select-feed="setAllFeeds"
        />
      </div>
    </div>
    <div
      class="source_wrapper input filter-inputs2"
      @click.stop="calenderShow = true"
      @mouseleave.stop="calenderShow = false"
    >
      <select id="name" v-model="selectedDateRange" class="pointer-events-none">
        <option class="hidden" :value="selectedDateRange" selected>{{ selectedDateRange }}</option>
      </select>
      <span class="select-toggle">
        <fa :icon="['fas', calenderShow ? 'caret-up' : 'caret-down']" />
      </span>
      <div
        class="w-full shadow-xl top-28 right-0 z-999999 rounded-3xl v-calender-top"
        :class="calenderShow ? 'block fixed' : 'hidden absolute'"
      >
        <!-- <v-date-picker
          v-model="dateRange"
          color="green"
          is-range
          :model-config="modelConfig"
          @input="datePickerEvent"
        />-->
        <v-calender-with-preset
          :show-v-celander="calenderShow"
          scroll-color="#6e9c2e"
          header-bg-color="bg-green-1100"
          sidebar-hover-class="hover:bg-green-1100 hover:text-white"
          sidebar-active-color="bg-green-1100 text-white"
          date-picker-color="archive"
          content-body-color="bg-green-1100"
          content-body-hover-color="hover:bg-white hover:text-green-1100"
          content-body-active-color="bg-white text-green-1100"
          @dateRange="datePickerEvent"
        />
      </div>
    </div>
    <div class="w-full mt-7 pb-4">
      <div class="flex flex-row justify-around space-x-3">
        <button
          class="clear_button"
          @click="
            selectedSources === 'Source' &&
            selectedGroups === 'Group' &&
            selectedNames === 'Name' &&
            dateRange.start === '' &&
            dateRange.end === ''
              ? clearAll()
              : clearSelectedField()
          "
        >
          <span>Clear</span>
        </button>
        <button class="filter_button setup" @click="filterUserAndInfo()">
          <span>Filter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { format, parseISO } from 'date-fns'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import AllFeedsMenu from '~/components/AllFeedsMenu'

export default {
  components: { VCalenderWithPreset, AllFeedsMenu },
  props: {
    filter: {
      type: Boolean,
    },
  },
  data() {
    return {
      toggleSelect: false,
      toggleSelect1: false,
      toggleSelect2: false,
      toggleSelect3: false,
      selectedSources: 'Source',
      selectedGroups: 'Group',
      selectedNames: 'Name',
      selectedDateRange: 'All Dates',
      allFeeds: 'All Feeds',
      calenderShow: false,
      dateRange: {
        start: '',
        end: '',
      },
      modelConfig: {
        start: {
          type: 'string',
          mask: 'YYYY-MM-DD',
        },
        end: {
          type: 'string',
          mask: 'YYYY-MM-DD',
        },
      },
      showAllSocialFeeds: false,
      controlBoxRound: false,
    }
  },
  computed: {
    ...mapState(['socialProviders']),
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
    getProviders() {
      return this.socialProviders.filter(
        (element) => element.id !== this.socialProviders.length
      )
    },
    ...mapState('socialFeed', ['allNames', 'allGroups']),
  },
  created() {
    this.$nuxt.$on('hideVCalender', () => {
      this.calenderShow = false
    })
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
    closeFilter() {
      this.$store.dispatch('mobile/header/closeFilter')
    },
    clearSelectedField() {
      this.$nuxt.$emit('clearDatePicker')
      this.selectedSources = 'Source'
      this.selectedGroups = 'Group'
      this.selectedNames = 'Name'
      this.selectedDateRange = 'All Dates'
      this.dateRange = {
        start: '',
        end: '',
      }
      this.filterUserAndInfo()
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
      this.closeFilter()
    },
    clearAll() {
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
    },
    setAllFeedsValue() {
      this.selectedSources = 'Source'
      this.selectedGroups = 'Group'
      this.selectedNames = 'Name'
    },
    selectedSource(value) {
      this.selectedSources = value
    },
    selectedGroup(value) {
      this.selectedGroups = value
    },
    selectedName(value) {
      this.selectedNames = value
    },
    filterUserAndInfo() {
      this.$store.commit('archive/SET_Selected_Sources', this.selectedSources)
      this.$store.commit('archive/SET_Selected_Groups', this.selectedGroups)
      this.$store.commit('archive/SET_Selected_Names', this.selectedNames)
      this.$store.dispatch('archive/filterUserAndInfo', this.dateRange)
      this.closeFilter()
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
  },
}
</script>

<style lang="scss" scoped>
.filter {
  position: fixed;
  top: 0px;
  background-color: #171d26;
  width: 100%;
  padding: 10px;
  right: -100%;
  z-index: 9999999999999;
  transition: right 0.8s ease-in-out;
}

.show {
  right: 0%;
}
.hide {
  right: -100%;
}
.source_wrapper {
  @apply w-46 mx-1 my-3 lg:mb-2 lg:mt-0 rounded-full;
  width: 98%;
}
.filter-head {
  color: #8db230;
}
.filter_button {
  @apply h-10
  w-1/2
  text-green-1100
  bg-white
  rounded-full
  mx-0 my-3
  border-none
  outline-none
  font-bold text-xl
  cursor-pointer;
  margin-right: 0.25rem !important;
}
.clear_button {
  @apply h-10
  w-1/2
  text-green-1100
  border-green-1100
  border-2
  rounded-full
  mx-0 ml-1 my-3
  outline-none
  font-bold text-xl
  cursor-pointer;
}
.input {
  color: #f8f8f8;
  @apply relative bg-green-1100;
  select {
    color: #f8f8f8;
    box-shadow: 0px 1px 3px rgba(142, 82, 0, 0.7);
    font-weight: bold;
    font-size: 20px;
    @apply w-full rounded-full py-1.5 px-4 focus:outline-none font-bold cursor-pointer bg-green-1100;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* // background-image: url("data:image/svg+xml;utf8,<svg height='24' fill='currentColor' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    // background-repeat: no-repeat;
    // background-position-x: 98%;
    // background-position-y: center; */
    option {
      @apply font-medium;
      /* // &:disabled {
      //   @apply text-gray-500;
      // } */
      &:focus,
      &:checked,
      &:hover {
        color: white;
        background-color: #8db230 !important;
      }
    }
  }

  .select-toggle {
    color: #ffffff;
    @apply absolute md:top-1 top-2 right-3 pointer-events-none bg-green-1100;
    svg {
      @apply md:text-2xl text-2xl;
    }
    padding-left: 2px !important;
  }
}
.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}
.v-calender-top {
  height: 70%;
}
.max-height-70 {
  max-height: 70%;
}
.allFeeds_wrapper {
  @apply lg:w-46 md:w-38 mx-1 md:my-4 lg:mb-4 lg:mt-0 rounded-full;
}
// .allFeeds_ul_wrapper {
//   box-shadow: 0px 4px 6px #00000080;
// }
.allFeeds_wrapper ul {
  width: 100%;
  max-height: 70%;
}

.scroll {
  scrollbar-color: #8db230 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #8db230;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #8db230;
  }
}
</style>
