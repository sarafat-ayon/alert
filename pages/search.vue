<template>
  <section class="h-full">
    <transition name="page">
      <div v-if="isMediumDevice" class="block p-4 h-full">
        <div
          class="content flex flex-col transition-all duration-2000"
          :class="[showHomeContent ? 'opacity-0' : '']"
          @click="closeSidebar"
        >
          <div v-if="isDesktop || isMediumDesktop" class="flex space-x-4">
            <!--start => dropdown archive menu-->
            <div class="archive-dropdown">
              <ArchiveSourcesDropdown
                :active="false"
                :height="100"
                :source="'search'"
                @expand="showSkew($event)"
                @show-edit-feed="showEditFeed = true"
              />
            </div>
            <!--end => dropdown archive menu-->

            <div
              class="2xl:grid 2xl:grid-cols-10 2xl:gap-4 2xl:w-full search-bar"
            >
              <!--start => searchbar section-->
              <div class="search-bar-wrapper justify-self-center">
                <div class="flex items-center relative">
                  <fa class="search-input-icon" :icon="['fas', 'search']" />
                  <input
                    ref="searchTextInput"
                    v-model.trim="searchAbleProperties.searchText"
                    type="text"
                    class="search-field pr-10"
                    placeholder="Search"
                    @keypress.enter="searchContext()"
                  />
                  <transition-group name="fade">
                    <button
                      v-if="showAnotherSearchField"
                      key="1"
                      class="
                        text-purple-midlight
                        absolute
                        right-4
                        md:bottom-2
                        bottom-2
                        w-5
                        cursor-pointer
                      "
                      :disabled="disabled"
                      @click="removeMoreSearchField()"
                    >
                      <fa :icon="['fas', 'minus']" />
                    </button>
                    <button
                      v-else
                      key="2"
                      class="
                        text-purple-midlight
                        absolute
                        right-4
                        md:bottom-2
                        bottom-2
                        w-5
                        cursor-pointer
                      "
                      :disabled="disabled"
                      @click="addMoreSearchField()"
                    >
                      <fa :icon="['fas', 'plus']" />
                    </button>
                  </transition-group>
                </div>
                <transition name="fade">
                  <div
                    v-if="showAnotherSearchField"
                    class="search-wrapper space-y-4"
                  >
                    <div class="flex items-center relative">
                      <fa
                        class="search-input-icon"
                        :icon="['fas', 'search-minus']"
                      />
                      <input
                        v-model.trim="searchAbleProperties.containText"
                        type="text"
                        class="search-field pr-4"
                        placeholder="Must Contain"
                        @keypress.enter="searchContext()"
                      />
                    </div>
                    <div class="flex items-center relative">
                      <fa
                        class="search-input-icon"
                        :icon="['fas', 'search-plus']"
                      />
                      <input
                        v-model.trim="searchAbleProperties.ignoreText"
                        type="text"
                        class="search-field pr-4"
                        placeholder="Ignore"
                        @keypress.enter="searchContext()"
                      />
                    </div>
                  </div>
                </transition>
              </div>
              <!--end => searchbar section-->

              <!--start => alert section-->
              <div
                class="
                  2xl:col-span-7
                  xl:col-span-12
                  lg:col-span-12
                  col-span-12
                  space-y-2.5
                  selectOption
                  page-content
                  alert-selection_section
                "
                :class="[skew ? '2xl:ml-0 m-xl:ml-70 select-options-left' : '']"
              >
                <div class="flex flex-row items-center justify-end space-x-4">
                  <!-- <div class="w-full text-lg font-bold selectSearch">
                    <select-input
                      id="group"
                      v-model="searchAbleProperties.group"
                      class="selectSearch"
                      class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                      :options="allGroups"
                      value="Groups"
                      place-holder="Groups"
                      :place-holder-disabled="true"
                      color="#F8F8F8"
                      background="#7D80BD"
                      caret-bg="#7D80BD"
                      scroll-color="#5b5fcc"
                    >
                    </select-input>
                  </div> -->
                  <div class="w-full text-lg font-bold selectSearch">
                    <select-input
                      id="pastMonth1"
                      v-model="savedSearch"
                      class="selectSearch"
                      class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                      :options="savedSearches"
                      value="Saved Searches"
                      place-holder="Saved Searches"
                      :place-holder-disabled="true"
                      color="#F8F8F8"
                      background="#7D80BD"
                      caret-bg="#7D80BD"
                      scroll-color="#5b5fcc"
                      @input="selectedSavedSearch($event)"
                    >
                    </select-input>
                  </div>
                  <div
                    class="
                      w-full
                      text-lg
                      font-bold
                      allFeeds_wrapper
                      selectSearch
                      cursor-pointer
                      h-auto
                      input
                      z-30
                    "
                    :style="{'--height': `${menuHeight}px`}"
                    @click="showAllSocialFeeds = true"
                    @mouseleave.stop="showAllSocialFeeds = false"
                  >
                    <select
                      id="allFeedsMenu"
                      v-model="allFeeds"
                      class="
                        scrollStyle
                        scrollWidth
                        text-lg
                        pointer-events-none
                      "
                      :class="toggleSelect2 ? 'round-remove' : ''"
                      @click="toggleSelect2 = !toggleSelect2"
                      @focusout="toggleSelect2 = false"
                      @input="selectedName($event.target.value)"
                    >
                      <option :value="allFeeds" selected>
                        {{ allFeeds }}
                      </option>
                    </select>
                    <span class="select-toggle">
                      <fa
                        :icon="[
                          'fas',
                          showAllSocialFeeds ? 'caret-up' : 'caret-down',
                        ]"
                      />
                    </span>
                    <div
                      class="arrow_parent"
                      :class="showAllSocialFeeds ? 'block' : 'hidden'"
                    >
                      <div class="arrow"></div>
                    </div>
                    <div
                      class="
                        right-0
                        bg-purple-midlight
                        allFeeds_ul_wrapper
                        absolute
                        top-13.3
                        max-height-320
                        scroll-x
                        right-130
                      "
                      :class="[
                        showAllSocialFeeds ? 'block' : 'hidden',
                        !controlBoxRound ? 'rounded-full' : 'rounded-xl',
                      ]"
                    >
                      <AllFeedsMenu
                        ref="allFeedsMenu"
                        arrow-color="#7d80bd"
                        :show-all-social-feeds="showAllSocialFeeds"
                        :search-able-properties="searchAbleProperties"
                        class-style-name="border-radius"
                        @rounded="controlRound"
                        @select-feed="setAllFeeds"
                        @get-all-feeds="setAllFeedsValue"
                        @set-provider="selectedSource"
                        @set-group="selectedGroup"
                      />
                    </div>
                    <!-- @get-all-feeds="setAllFeedsValue"
                        @set-provider="selectedSource"
                        @set-group="selectedGroup"
                        @set-name="selectedName"
                        @select-feed="setAllFeeds" -->
                  </div>
                  <!-- <div class="w-full text-lg font-bold selectSearch">
                    <select-input
                      id="pastMonth2"
                      v-model="searchAbleProperties.provider"
                      class="selectSearch"
                      class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                      :options="socialProvidersInitial"
                      color="#F8F8F8"
                      background="#7D80BD"
                      caret-bg="#7D80BD"
                      scroll-color="#5b5fcc"
                      value="All Feeds"
                    >
                    </select-input>
                  </div> -->

                  <div
                    class="
                      w-full
                      selectSearch
                      text-lg
                      font-bold
                      relative
                      group
                      cursor-pointer
                    "
                    @click="vCalenderShow()"
                    @mouseleave.stop="vCalenderHide()"
                  >
                    <select-input
                      id="pastMonth3"
                      v-model="searchAbleProperties.pastMonths"
                      :show-v-celander="showVCelander"
                      class="not-clickable selectSearch"
                      class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                      :place-holder="searchAbleProperties.pastMonths"
                      color="#F8F8F8"
                      value="Past Month"
                      background="#7D80BD"
                      caret-bg="#7D80BD"
                      scroll-color="#5b5fcc"
                    >
                    </select-input>
                    <div
                      class="
                        w-100
                        shadow-xl
                        absolute
                        top-13.3
                        right-0
                        z-999999
                        block
                        cursor-pointer
                        bg-white
                        rounded-3xl
                        border-top
                      "
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
                  <div class="w-10" data-title="Clear" @click="clearSearch()">
                    <button class="large_clear_button p-5">
                      <ClearIcon class="absolute clear_button" />
                    </button>
                  </div>
                  <div
                    v-if="user.userPermission !== 'User' && isDesktop"
                    class="w-10"
                    data-title="Save Search"
                  >
                    <button
                      class="
                        focus:outline-none
                        text-xl text-center
                        bg-purple-midlight
                        rounded-full
                        md:w-10
                        w-8
                        md:h-10
                        h-8
                        outline-none
                        flex
                        justify-center
                        items-center
                      "
                      @click="showSearchSideBar($event)"
                    >
                      <fa class="text-white text-2xl" :icon="['fas', 'save']" />
                    </button>
                  </div>
                  <div v-if="isDesktop" class="">
                    <div
                      class="h-full md:flex md:flex-wrap md:space-y-0 space-y-4"
                    >
                      <div
                        class="
                          flex
                          items-center
                          md:justify-end
                          justify-center
                          space-x-4
                        "
                      >
                        <button
                          :disabled="searchProcess"
                          class="
                            focus:outline-none
                            outline-none
                            bg-white
                            text-purple-midlight
                            md:py-1
                            py-1
                            xl:px-8
                            px-6
                            rounded-full
                            font-bold
                            text-lg
                            border-2 border-white
                            relative
                          "
                          @click="searchContext()"
                        >
                          <span>Search</span>
                          <fa
                            v-if="searchProcess"
                            class="
                              text-purple-midlight
                              mx-2
                              absolute
                              right-0
                              lg:top-2
                              top-1
                              font-bold
                              animate-spin
                            "
                            :icon="['fas', 'spinner']"
                          />
                        </button>
                        <button
                          v-if="betaVersion"
                          class="
                            focus:outline-none
                            text-xl text-center
                            bg-purple-midlight
                            rounded-full
                            lg:w-10
                            w-8
                            lg:h-10
                            h-8
                          "
                          data-title="Create Alert"
                          @click="showSaveSearchAlertModal"
                        >
                          <img
                            class="inline-block mb-1"
                            :src="bellPlusImg"
                            alt="SharpArchive Search page Bell Icon to create alert"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!--start => toggle button section-->
                <transition name="fade">
                  <div
                    v-if="showToggleSearch && isDesktop"
                    class="flex w-full md:space-y-0 justify-end"
                  >
                    <div
                      class="
                        w-full
                        space-y-2.5
                        text-right
                        2xl:col-span-2
                        options
                        mt-0.5
                        max-width-1146
                      "
                    >
                      <div class="flex flex-row items-center space-x-2">
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
                            id="Components"
                            v-model="searchAbleProperties.includeComments"
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
                            for="Components"
                            class="
                              toggle-label
                              block
                              overflow-hidden
                              h-5
                              rounded-full
                              transition-all
                              duration-800
                              ease-in-out
                              bg-white
                              cursor-pointer
                            "
                          ></label>
                        </div>
                        <label for="Components" class="text-gray-1400 text-lg"
                          >Include Comments</label
                        >
                      </div>
                      <div class="flex flex-row items-center space-x-2">
                        <div
                          class="
                            relative
                            inline-block
                            w-9
                            align-middle
                            select-none
                            transition
                            duration-500
                            ease-in
                          "
                        >
                          <input
                            id="Replies"
                            v-model="searchAbleProperties.includeReplies"
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
                            for="Replies"
                            class="
                              toggle-label
                              block
                              overflow-hidden
                              h-5
                              transition-all
                              duration-800
                              ease-in-out
                              rounded-full
                              bg-white
                              cursor-pointer
                            "
                          ></label>
                        </div>
                        <label for="Replies" class="text-gray-1400 text-lg"
                          >Include Replies</label
                        >
                      </div>
                      <div
                        class="flex flex-row items-center space-x-2 relative"
                      >
                        <div
                          class="
                            relative
                            inline-block
                            w-9
                            align-middle
                            select-none
                            transition
                            duration-500
                            ease-in
                          "
                        >
                          <input
                            id="Messages"
                            v-model="searchAbleProperties.includeDirectMessages"
                            type="checkbox"
                            name="toggle"
                            checked
                            class="
                              toggle-checkbox
                              absolute
                              block
                              w-5
                              h-5
                              rounded-full
                              bg-white
                              border-4
                              appearance-none
                              cursor-pointer
                            "
                          />
                          <label
                            for="Messages"
                            class="
                              toggle-label
                              block
                              overflow-hidden
                              h-5
                              rounded-full
                              bg-white
                              transition-all
                              duration-800
                              ease-in-out
                              cursor-pointer
                            "
                          ></label>
                        </div>
                        <label
                          for="Messages"
                          class="
                            text-gray-1400 text-lg
                            whitespace-nowrap
                            overflow-hidden
                          "
                        >
                          <span> Include Direct Messages</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </transition>
                <div
                  v-if="isMediumDesktop"
                  class="flex justify-end w-full md:space-y-0"
                >
                  <div class="w-full all_includes">
                    <transition name="fade">
                      <div
                        v-if="showToggleSearch"
                        class="
                          w-full
                          space-y-2.5
                          text-right
                          2xl:col-span-2
                          options
                          mt-0.5
                          include
                        "
                      >
                        <div class="flex flex-row items-center space-x-2">
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
                              id="Components"
                              v-model="searchAbleProperties.includeComments"
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
                              for="Components"
                              class="
                                toggle-label
                                block
                                overflow-hidden
                                h-5
                                rounded-full
                                transition-all
                                duration-800
                                ease-in-out
                                bg-white
                                cursor-pointer
                              "
                            ></label>
                          </div>
                          <label for="Components" class="text-gray-1400 text-lg"
                            >Include Comments</label
                          >
                        </div>
                        <div class="flex flex-row items-center space-x-2">
                          <div
                            class="
                              relative
                              inline-block
                              w-9
                              align-middle
                              select-none
                              transition
                              duration-500
                              ease-in
                            "
                          >
                            <input
                              id="Replies"
                              v-model="searchAbleProperties.includeReplies"
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
                              for="Replies"
                              class="
                                toggle-label
                                block
                                overflow-hidden
                                h-5
                                transition-all
                                duration-800
                                ease-in-out
                                rounded-full
                                bg-white
                                cursor-pointer
                              "
                            ></label>
                          </div>
                          <label for="Replies" class="text-gray-1400 text-lg"
                            >Include Replies</label
                          >
                        </div>
                        <div
                          class="flex flex-row items-center space-x-2 relative"
                        >
                          <div
                            class="
                              relative
                              inline-block
                              w-9
                              align-middle
                              select-none
                              transition
                              duration-500
                              ease-in
                            "
                          >
                            <input
                              id="Messages"
                              v-model="
                                searchAbleProperties.includeDirectMessages
                              "
                              type="checkbox"
                              name="toggle"
                              checked
                              class="
                                toggle-checkbox
                                absolute
                                block
                                w-5
                                h-5
                                rounded-full
                                bg-white
                                border-4
                                appearance-none
                                cursor-pointer
                              "
                            />
                            <label
                              for="Messages"
                              class="
                                toggle-label
                                block
                                overflow-hidden
                                h-5
                                rounded-full
                                bg-white
                                transition-all
                                duration-800
                                ease-in-out
                                cursor-pointer
                              "
                            ></label>
                          </div>
                          <label
                            for="Messages"
                            class="
                              text-gray-1400 text-lg
                              whitespace-nowrap
                              overflow-hidden
                            "
                          >
                            <span> Include Direct Messages</span>
                          </label>
                        </div>
                      </div>
                    </transition>
                  </div>
                  <div class="flex space-x-4 justify-end">
                    <div class="mt-0.5">
                      <div
                        class="
                          h-full
                          md:flex md:flex-wrap md:space-y-0
                          space-y-4
                        "
                      >
                        <div
                          class="
                            flex
                            items-start
                            md:justify-end
                            justify-center
                            space-x-4
                          "
                        >
                          <button
                            :disabled="searchProcess"
                            class="
                              focus:outline-none
                              outline-none
                              bg-white
                              text-purple-midlight
                              md:py-1
                              py-1
                              xl:px-8
                              px-6
                              rounded-full
                              font-bold
                              text-lg
                              border-2 border-white
                              relative
                            "
                            @click="searchContext()"
                          >
                            <span>Search</span>
                            <fa
                              v-if="searchProcess"
                              class="
                                text-purple-midlight
                                mx-2
                                absolute
                                right-0
                                lg:top-2
                                top-1
                                font-bold
                                animate-spin
                              "
                              :icon="['fas', 'spinner']"
                            />
                          </button>
                          <button
                            v-if="betaVersion"
                            class="
                              focus:outline-none
                              text-xl text-center
                              bg-purple-midlight
                              rounded-full
                              lg:w-10
                              w-8
                              lg:h-10
                              h-8
                            "
                            data-title="Create Alert"
                            @click="showSaveSearchAlertModal"
                          >
                            <img
                              class="inline-block mb-1"
                              :src="bellPlusImg"
                              alt="SharpArchive Search page Bell Icon to create alert"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="user.userPermission !== 'User'"
                      class="w-10 h-10 mt-0.5"
                      data-title="Save Search"
                    >
                      <button
                        class="
                          focus:outline-none
                          text-xl text-center
                          bg-purple-midlight
                          rounded-full
                          md:w-10
                          w-8
                          md:h-10
                          h-8
                          outline-none
                          flex
                          justify-center
                          items-center
                        "
                        @click="showSearchSideBar($event)"
                      >
                        <fa
                          class="text-white text-2xl"
                          :icon="['fas', 'save']"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <!--end => toggle button section-->
              </div>
              <!--end => alert section-->
            </div>
          </div>

          <div v-else class="grid grid-cols-12 md:gap-4 gap-2">
            <!--start => dropdown archive menu-->
            <div class="archive-dropdown">
              <ArchiveSourcesDropdown
                :active="false"
                :height="100"
                :source="'search'"
                @expand="showSkew($event)"
                @show-edit-feed="showEditFeed = true"
              />
            </div>
            <!--end => dropdown archive menu-->

            <!--start => searchbar section-->
            <div class="search-bar-wrapper">
              <div class="flex items-center relative">
                <fa class="search-input-icon" :icon="['fas', 'search']" />
                <input
                  ref="searchTextInput"
                  v-model.trim="searchAbleProperties.searchText"
                  type="text"
                  class="search-field pr-10"
                  placeholder="Search"
                  @keypress.enter="searchContext()"
                />
                <transition-group name="fade">
                  <button
                    v-if="showAnotherSearchField"
                    key="3"
                    class="
                      text-purple-midlight
                      absolute
                      right-4
                      md:bottom-2
                      bottom-2
                      w-5
                      cursor-pointer
                    "
                    :disabled="disabled"
                    @click="removeMoreSearchField()"
                  >
                    <fa :icon="['fas', 'minus']" />
                  </button>
                  <button
                    v-else
                    key="4"
                    class="
                      text-purple-midlight
                      absolute
                      right-4
                      md:bottom-2
                      bottom-2
                      w-5
                      cursor-pointer
                    "
                    :disabled="disabled"
                    @click="addMoreSearchField()"
                  >
                    <fa :icon="['fas', 'plus']" />
                  </button>
                </transition-group>
              </div>
              <transition name="fade">
                <div
                  v-if="showAnotherSearchField"
                  class="search-wrapper space-y-4"
                >
                  <div class="flex items-center relative">
                    <fa
                      class="search-input-icon"
                      :icon="['fas', 'search-minus']"
                    />
                    <input
                      v-model.trim="searchAbleProperties.containText"
                      type="text"
                      class="search-field pr-4"
                      placeholder="Must Contain"
                      @keypress.enter="searchContext()"
                    />
                  </div>
                  <div class="flex items-center relative">
                    <fa
                      class="search-input-icon"
                      :icon="['fas', 'search-plus']"
                    />
                    <input
                      v-model.trim="searchAbleProperties.ignoreText"
                      type="text"
                      class="search-field pr-4"
                      placeholder="Ignore"
                      @keypress.enter="searchContext()"
                    />
                  </div>
                </div>
              </transition>
            </div>
            <!--end => searchbar section-->

            <!--start => toggle button section-->
            <transition name="fade">
              <div
                v-if="showToggleSearch && !isDesktop"
                class="flex w-full md:space-y-0 ml-5 tab_margin"
              >
                <div
                  class="
                    w-full
                    space-y-2
                    text-right
                    xl:col-span-4
                    lg:col-span-4
                    md:col-span-6
                    col-span-12
                    options
                    2xl:hidden
                    -mt-0.5
                    include
                  "
                >
                  <div class="flex flex-row items-center space-x-2">
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
                        id="Components"
                        v-model="searchAbleProperties.includeComments"
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
                        for="Components"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-white
                          cursor-pointer
                        "
                      ></label>
                    </div>
                    <label for="Components" class="text-gray-1400 text-lg"
                      >Include Comments</label
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2">
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition
                        duration-500
                        ease-in
                      "
                    >
                      <input
                        id="Replies"
                        v-model="searchAbleProperties.includeReplies"
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
                        for="Replies"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          transition-all
                          duration-800
                          ease-in-out
                          rounded-full
                          bg-white
                          cursor-pointer
                        "
                      ></label>
                    </div>
                    <label for="Replies" class="text-gray-1400 text-lg"
                      >Include Replies</label
                    >
                  </div>
                  <div class="flex flex-row items-center space-x-2 relative">
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition
                        duration-500
                        ease-in
                      "
                    >
                      <input
                        id="Messages"
                        v-model="searchAbleProperties.includeDirectMessages"
                        type="checkbox"
                        name="toggle"
                        checked
                        class="
                          toggle-checkbox
                          absolute
                          block
                          w-5
                          h-5
                          rounded-full
                          bg-white
                          border-4
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="Messages"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          bg-white
                          transition-all
                          duration-800
                          ease-in-out
                          cursor-pointer
                        "
                      ></label>
                    </div>
                    <label
                      for="Messages"
                      class="
                        text-gray-1400 text-lg
                        whitespace-nowrap
                        overflow-hidden
                      "
                    >
                      <span> Include Direct Messages</span>
                    </label>
                  </div>
                </div>
              </div>
            </transition>
            <!--end => toggle button section-->

            <!--start => alert section-->
            <div
              class="
                2xl:col-span-7
                xl:col-span-12
                lg:col-span-12
                col-span-12
                space-y-2.5
                selectOption
                page-content
                alert-selection_section
              "
              :class="[
                skew ? '2xl:ml-0 m-xl:ml-70 select-options-left' : '',
                smoothMove ? 'medium-device-decrease' : 'medium-device-expand',
              ]"
            >
              <div class="flex flex-row items-center space-x-4">
                <!-- <div class="w-full text-lg font-bold">
                  <select-input
                    id="group"
                    v-model="searchAbleProperties.group"
                    class="selectSearch"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                    :options="allGroups"
                    value="Groups"
                    place-holder="Groups"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#7D80BD"
                    caret-bg="#7D80BD"
                    scroll-color="#5b5fcc"
                  >
                  </select-input>
                </div> -->
                <div class="w-full text-lg font-bold">
                  <select-input
                    id="pastMonth1"
                    v-model="savedSearch"
                    class="selectSearch"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                    :options="savedSearches"
                    value="Saved Searches"
                    place-holder="Saved Searches"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#7D80BD"
                    caret-bg="#7D80BD"
                    scroll-color="#5b5fcc"
                    @input="selectedSavedSearch($event)"
                  >
                  </select-input>
                </div>
                <div
                  class="
                    w-full
                    text-lg
                    font-bold
                    allFeeds_wrapper
                    selectSearch
                    cursor-pointer
                    h-auto
                    input
                    z-30
                  "
                  :style="{'--height': `${menuHeight}px`}"
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
                    <option :value="allFeeds" selected>
                      {{ allFeeds }}
                    </option>
                  </select>
                  <span class="select-toggle">
                    <fa
                      :icon="[
                        'fas',
                        showAllSocialFeeds ? 'caret-up' : 'caret-down',
                      ]"
                    />
                  </span>
                  <div
                    class="arrow_parent"
                    :class="showAllSocialFeeds ? 'block' : 'hidden'"
                  >
                    <div class="arrow"></div>
                  </div>
                  <div
                    class="
                      right-0
                      bg-purple-midlight
                      allFeeds_ul_wrapper
                      absolute
                      top-13.3
                      max-height-320
                      scroll-x
                      right-130
                    "
                    :class="[
                      showAllSocialFeeds ? 'block' : 'hidden',
                      !controlBoxRound ? 'rounded-full' : 'rounded-xl',
                    ]"
                  >
                    <AllFeedsMenu
                      ref="allFeedsMenu"
                      arrow-color="#7d80bd"
                      :show-all-social-feeds="showAllSocialFeeds"
                      :search-able-properties="searchAbleProperties"
                      class-style-name="border-radius"
                      @rounded="controlRound"
                      @select-feed="setAllFeeds"
                      @get-all-feeds="setAllFeedsValue"
                      @set-provider="selectedSource"
                      @set-group="selectedGroup"
                    />
                  </div>
                  <!-- @get-all-feeds="setAllFeedsValue"
                        @set-provider="selectedSource"
                        @set-group="selectedGroup"
                        @set-name="selectedName"
                        @select-feed="setAllFeeds" -->
                </div>
                <!-- <div class="w-full text-lg font-bold">
                  <select-input
                    id="pastMonth2"
                    v-model="searchAbleProperties.provider"
                    class="selectSearch"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                    :options="socialProvidersInitial"
                    color="#F8F8F8"
                    background="#7D80BD"
                    caret-bg="#7D80BD"
                    scroll-color="#5b5fcc"
                    value="All Feeds"
                  >
                  </select-input>
                </div> -->

                <div
                  class="w-full text-lg font-bold relative group cursor-pointer"
                  @click="vCalenderShow()"
                  @mouseleave.stop="vCalenderHide()"
                >
                  <select-input
                    id="pastMonth3"
                    v-model="searchAbleProperties.pastMonths"
                    :show-v-celander="showVCelander"
                    class="not-clickable selectSearch"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                    :place-holder="searchAbleProperties.pastMonths"
                    color="#F8F8F8"
                    value="Past Month"
                    background="#7D80BD"
                    caret-bg="#7D80BD"
                    scroll-color="#5b5fcc"
                  >
                  </select-input>
                  <div
                    class="
                      w-100
                      shadow-xl
                      absolute
                      top-13.3
                      lg:right-0
                      md:-right-0
                      z-999999
                      block
                      cursor-pointer
                      bg-white
                      rounded-3xl
                      border-top
                    "
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
                <div
                  v-if="!isTabDevice"
                  class="
                    w-38
                    h-10
                    bg-purple-midlight
                    rounded-full
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                    relative
                  "
                  data-title="Clear"
                  @click="clearSearch()"
                >
                  <ClearIcon class="absolute clear_button" />
                </div>
                <div
                  v-if="user.userPermission !== 'User' && !isTabDevice"
                  class="w-20"
                  data-title="Save Search"
                >
                  <button
                    class="
                      focus:outline-none
                      text-xl text-center
                      bg-purple-midlight
                      rounded-full
                      md:w-10
                      w-8
                      md:h-10
                      h-8
                      outline-none
                      flex
                      justify-center
                      items-center
                    "
                    @click="showSearchSideBar($event)"
                  >
                    <fa class="text-white mb-px" :icon="['fas', 'save']" />
                  </button>
                </div>
                <div v-if="!isTabDevice" class="">
                  <div
                    class="h-full md:flex md:flex-wrap md:space-y-0 space-y-4"
                  >
                    <div
                      class="
                        flex
                        items-center
                        md:justify-end
                        justify-center
                        space-x-4
                      "
                    >
                      <button
                        :disabled="searchProcess"
                        class="
                          focus:outline-none
                          outline-none
                          bg-white
                          text-purple-midlight
                          md:py-1
                          py-1
                          xl:px-8
                          px-6
                          rounded-full
                          font-bold
                          text-lg
                          border-2 border-white
                          relative
                        "
                        @click="searchContext()"
                      >
                        <span>Search</span>
                        <fa
                          v-if="searchProcess"
                          class="
                            text-purple-midlight
                            lg:mx-0.5
                            md:mx-1
                            absolute
                            right-0
                            lg:top-2
                            top-1
                            font-bold
                            animate-spin
                          "
                          :icon="['fas', 'spinner']"
                        />
                      </button>
                      <button
                        v-if="betaVersion"
                        class="
                          focus:outline-none
                          text-xl text-center
                          bg-purple-midlight
                          rounded-full
                          lg:w-10
                          w-8
                          lg:h-10
                          h-8
                        "
                        data-title="Create Alert"
                        @click="showSaveSearchAlertModal"
                      >
                        <img
                          class="inline-block mb-1"
                          :src="bellPlusImg"
                          alt="SharpArchive Search page Bell Icon to create alert"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="isTabDevice"
                class="flex flex-row items-center justify-end w-full space-x-4"
              >
                <div class="mt-2">
                  <div
                    class="h-full md:flex md:flex-wrap md:space-y-0 space-y-4"
                  >
                    <div
                      class="
                        flex
                        items-center
                        md:justify-end
                        justify-center
                        space-x-4
                      "
                    >
                      <button
                        :disabled="searchProcess"
                        class="
                          focus:outline-none
                          outline-none
                          bg-white
                          text-purple-midlight
                          md:py-1
                          py-1
                          xl:px-8
                          px-6
                          rounded-full
                          font-bold
                          text-lg
                          border-2 border-white
                          relative
                        "
                        @click="searchContext()"
                      >
                        <span>Search</span>
                        <fa
                          v-if="searchProcess"
                          class="
                            text-purple-midlight
                            lg:mx-2
                            md:mx-1
                            absolute
                            right-0
                            md:top-2.5
                            top-1
                            font-bold
                            animate-spin
                          "
                          :icon="['fas', 'spinner']"
                        />
                      </button>
                      <button
                        v-if="betaVersion"
                        class="
                          focus:outline-none
                          text-xl text-center
                          bg-purple-midlight
                          rounded-full
                          lg:w-10
                          w-8
                          lg:h-10
                          h-8
                        "
                        data-title="Create Alert"
                        @click="showSaveSearchAlertModal"
                      >
                        <img
                          class="inline-block mb-1"
                          :src="bellPlusImg"
                          alt="SharpArchive Search page Bell Icon to create alert"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  v-if="user.userPermission !== 'User'"
                  class="w-10 mt-2"
                  data-title="Save Search"
                >
                  <button
                    class="
                      focus:outline-none
                      text-xl text-center
                      bg-purple-midlight
                      rounded-full
                      md:w-10
                      w-8
                      md:h-10
                      h-8
                      outline-none
                      flex
                      justify-center
                      items-center
                    "
                    @click="showSearchSideBar($event)"
                  >
                    <fa class="text-white text-2xl" :icon="['fas', 'save']" />
                  </button>
                </div>
                <div
                  class="
                    w-10
                    h-10
                    bg-purple-midlight
                    rounded-full
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                    relative
                    mt-2
                  "
                  data-title="Clear"
                  @click="clearSearch()"
                >
                  <ClearIcon class="absolute clear_button" />
                </div>
              </div>
            </div>
            <!--end => alert section-->
          </div>

          <div
            class="
              flex flex-col
              page-content
              overflow-y-auto
              space-y-8
              mt-8
              absolute
              w-full
              h-full
              flex-grow
              transition-all
              duration-500
              ease-in-out
              justify-end
            "
            :class="[
              skew ? 'm-xl:ml-70 w-[calc(100%-272px)] marginLeft' : '',
              smoothMove ? 'height-decrease' : 'height-expand',
            ]"
          >
            <div
              class="
                h-full
                bg-white
                flex flex-col
                rounded-3xl
                overflow-hidden
                transition-all
                duration-1000
                ease-in-out
              "
            >
              <div class="mobile-card-header">
                <h3 class="mobile-card-title font-bold">Search Results</h3>
              </div>
              <div
                class="
                  bg-white
                  rounded-b-2xl
                  h-full
                  card-body
                  pb-2
                  scroll
                  flex-grow
                "
              >
                <table class="table-wrapper min-w-full scroll mx-2">
                  <thead>
                    <tr class="sticky top-0 bg-white z-10">
                      <th
                        class="
                          search-date-feed
                          table-th-w-10
                          font-bold
                          text-purple-midlight text-left
                          md:text-lg
                        "
                      >
                        <strong>Date</strong>
                      </th>
                      <th
                        class="
                          search-date-feed
                          table-th-w-10
                          font-bold
                          text-purple-midlight text-left
                          md:text-lg
                        "
                      >
                        <strong>Source</strong>
                      </th>
                      <th
                        class="
                          search-date-feed
                          table-th-w-10
                          font-bold
                          text-purple-midlight text-left
                          md:text-lg
                        "
                      >
                        <strong>Feed</strong>
                      </th>
                      <th
                        class="
                          search-date-feed
                          table-th-w-40
                          font-bold
                          text-purple-midlight text-left
                          md:text-lg
                        "
                      >
                        <strong>Context</strong>
                      </th>
                    </tr>
                  </thead>
                  <template v-for="(context, index) in allSocialContext">
                    <tbody
                      :key="context.id + 'web' + context.name"
                      class="table-content w-full"
                      :class="
                        context.Selected
                          ? 'bg-ash-default rounded-2xl text-white'
                          : 'text-gray-1200'
                      "
                    >
                      <tr
                        :class="
                          hideText($config.workflow) ? 'cursor-pointer' : ''
                        "
                        @click="
                          hideText($config.workflow)
                            ? selectedFlagged(context.id)
                            : ''
                        "
                      >
                        <td
                          class="
                            table-td table-th-w-10
                            rounded-tl-2xl
                            md:text-lg
                            text-left
                          "
                        >
                          <span class="whitespace-nowrap"
                            ><DateTime
                              :datetime="context.date"
                              format="MMMM, dd yyyy, hh:mm aa"
                              class="table-span"
                          /></span>
                        </td>
                        <td class="table-td table-th-w-10 md:text-lg text-left">
                          <span class="whitespace-nowrap">{{
                            context.provider
                          }}</span>
                        </td>
                        <td class="table-td table-th-w-10 md:text-lg text-left">
                          <span class="whitespace-nowrap">{{
                            context.name
                          }}</span>
                        </td>
                        <td
                          class="
                            table-td
                            rounded-tr-2xl
                            md:text-lg
                            table-th-w-40
                            has-tooltip
                            relative
                            transition-all
                            duration-2000
                          "
                        >
                          <span
                            class="whitespace-nowrap"
                            v-html="
                              highlight(
                                context.context,
                                searchAbleProperties.searchText
                              )
                            "
                          ></span>
                          <span
                            v-if="context.context.length > 100"
                            :class="
                              index > allSocialContext.length - 4 && index > 3
                                ? 'tooltip1'
                                : ''
                            "
                            class="
                              absolute
                              text-white
                              bg-purple-midlight
                              z-100
                              left-10
                              text-left
                              shadow-2xl
                              p-1.5
                              px-4
                              tooltip
                              rounded-xl
                              overflow-auto
                              scroll
                            "
                          >
                            <span class="h-full">{{
                              modifyContext(context.context)
                            }}</span>
                          </span>
                        </td>
                      </tr>
                      <tr v-if="context.Selected">
                        <td
                          colspan="3"
                          class="rounded-bl-2xl"
                          style="vertical-align: baseline"
                        >
                          <table class="w-full">
                            <tbody>
                              <tr>
                                <td class="table-td">
                                  <div class="flex justify-between">
                                    <div>Date</div>
                                    <div>
                                      <span class="whitespace-nowrap"
                                        ><DateTime
                                          :datetime="context.date"
                                          format="MMMM, dd yyyy, hh:mm aa"
                                          class="table-span"
                                      /></span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="table-td">
                                  <div class="flex justify-between">
                                    <div>Name</div>
                                    <div>
                                      <span class="whitespace-nowrap">{{
                                        context.name
                                      }}</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="table-td">
                                  <div class="flex justify-between">
                                    <div>Phone</div>
                                    <div>
                                      +1 0056482364
                                      <span class="whitespace-nowrap">{{
                                        context.phone
                                      }}</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="table-td">
                                  <div class="flex justify-between">
                                    <div>User Name</div>
                                    <div>
                                      <span class="whitespace-nowrap">{{
                                        context.username
                                      }}</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td class="table-td rounded-br-2xl">
                          <div class="viewer">
                            <div class="h-full overflow-hidden rounded-2xl">
                              <div
                                class="flex flex-col flex-grow h-80 rounded-2xl"
                              >
                                <div
                                  class="
                                    w-full
                                    py-2
                                    bg-purple-midlight
                                    rounded-t-2xl
                                    text-white text-center
                                    font-bold
                                  "
                                >
                                  Viewer
                                </div>

                                <div
                                  class="
                                    w-full
                                    inner-body
                                    scroll
                                    flex-grow
                                    bg-white
                                    rounded-b-2xl
                                  "
                                >
                                  <div class="overflow-auto scroll py-3 h-full">
                                    <div
                                      v-for="(
                                        Viewer, viewersIndex
                                      ) in context.Viewers"
                                      :key="viewersIndex + 'row2'"
                                      class="flex px-3 w-full"
                                    >
                                      <div class="post-profile">
                                        <!-- <twitter-icon
                                        class="
                                          w-14
                                          h-14
                                          rounded-full
                                          border border-gray-400
                                        "
                                        ></twitter-icon>-->
                                        <template>
                                          <img
                                            :src="profilePic"
                                            class="rounded-full w-14 h-14"
                                            alt="`Profile Picture`"
                                            srcset
                                          />
                                        </template>
                                      </div>

                                      <div class="w-full">
                                        <div
                                          class="
                                            text-ash-primary
                                            flex
                                            justify-between
                                            items-start
                                          "
                                        >
                                          <p class="text-sm md:text-lg">
                                            <span
                                              class="
                                                font-bold
                                                text-offgray text-md
                                                md:text-xl
                                              "
                                              >{{ Viewer.Name }}</span
                                            >
                                            <img
                                              src="@/assets/img/svg/twitter/Verify.svg"
                                              class="inline-block h-4"
                                              alt="Twitter Verify Icon"
                                            />
                                            <span class="text-ash-primary">{{
                                              Viewer.UserName
                                            }}</span>
                                            <span class="text-gray-1700">{{
                                              Viewer.Time
                                            }}</span>
                                          </p>
                                          <fa
                                            class="
                                              cursor-pointer
                                              text-gray-600
                                              mt-1
                                              mr-0.5
                                              text-sm
                                              md:text-lg
                                            "
                                            :icon="['fas', 'ellipsis-h']"
                                          />
                                        </div>

                                        <div
                                          class="
                                            status
                                            text-ash-primary text-sm
                                            md:text-lg
                                          "
                                        >
                                          {{ Viewer.Status }}
                                        </div>

                                        <div
                                          class="reaction text-sm md:text-lg"
                                        >
                                          <div>
                                            <img
                                              src="@/assets/img/icon/Twitter Icon/comment_1.svg"
                                              alt="Twitter Comment Icon"
                                            />
                                            <span>
                                              {{ Viewer.CommentCount }}
                                            </span>
                                          </div>
                                          <div>
                                            <img
                                              src="@/assets/img/icon/Twitter Icon/retweet.svg"
                                              alt="Twitter Retweet Icon"
                                            />
                                            <span>
                                              {{ Viewer.RetweetCount }}
                                            </span>
                                          </div>
                                          <div>
                                            <img
                                              class
                                              src="@/assets/img/icon/Twitter Icon/love_2.svg"
                                              alt="Twitter Reaction Icon"
                                            />
                                            <span>
                                              {{ Viewer.ReactCount }}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </table>
              </div>
            </div>
          </div>
        </div>
        <SaveSearch
          :saved-searches="savedSearches"
          :search-process="searchProcess"
          @userSaveSearchWiseContext="userSaveSearchWiseContext"
          @searchingData="searchingData"
        >
        </SaveSearch>
      </div>
    </transition>

    <!--  start => mobile -->
    <transition name="page">
      <div v-if="!isMediumDevice" class="relative overflow-hidden h-full">
        <div class="p-2 mobile-home_page_height">
          <div class="content flex flex-col">
            <div class="mobile-card-wrapper">
              <div class="mobile-card">
                <div class="mobile-card-header">
                  <h3 class="mobile-card-title">Search Results</h3>
                </div>
                <div class="mobile-card-body scroll">
                  <table class="mobile-table-wrapper min-w-full">
                    <!--start => table header section-->
                    <thead class="sticky top-0 bg-white z-10">
                      <tr>
                        <th class="mobile-table-th min-width-8">
                          <span class="text-purple-midlight">Date</span>
                        </th>
                        <th class="mobile-table-th min-width-6">
                          <span class="text-purple-midlight">Source</span>
                        </th>
                        <th class="mobile-table-th min-width-6">
                          <span class="text-purple-midlight">Feed</span>
                        </th>
                      </tr>
                    </thead>
                    <!--end => table header section-->

                    <!--start => table body section-->
                    <template
                      v-for="(context, index) in allSocialContext"
                      class="w-full border-t-2 border-purple-midlight"
                    >
                      <tbody
                        :key="context.id + 'mobile' + context.name"
                        :class="
                          context.Selected
                            ? 'bg-ash-default rounded-2xl text-white'
                            : 'text-gray-1200'
                        "
                      >
                        <tr :key="context.id + 'border'">
                          <td
                            colspan="3"
                            class="w-full bg-purple-midlight h-0.5"
                          ></td>
                        </tr>
                        <tr
                          :key="context.id + 'main'"
                          @click="
                            hideText($config.workflow)
                              ? selectedFlagged(context.id)
                              : ''
                          "
                        >
                          <td class="mobile-table-tr min-width-8">
                            <span
                              ><DateTime
                                :datetime="context.date"
                                format="MMMM, dd yyyy, hh:mm aa"
                                class="table-span"
                            /></span>
                          </td>
                          <td class="mobile-table-tr min-width-6">
                            <span>{{ context.provider }}</span>
                          </td>
                          <td class="mobile-table-tr min-width-6">
                            <span>{{ context.name }}</span>
                          </td>
                        </tr>
                        <tr v-if="context.Selected">
                          <td class="px-3" colspan="3">
                            <table class="w-full">
                              <tbody>
                                <tr>
                                  <td class="table-td">
                                    <div class="flex justify-between">
                                      <div>Date</div>
                                      <div>
                                        <span class="whitespace-nowrap"
                                          ><DateTime
                                            :datetime="context.date"
                                            format="MMMM, dd yyyy, hh:mm aa"
                                            class="table-span"
                                        /></span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="table-td">
                                    <div class="flex justify-between">
                                      <div>Name</div>
                                      <div>
                                        <span class="whitespace-nowrap">{{
                                          context.name
                                        }}</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="table-td">
                                    <div class="flex justify-between">
                                      <div>Phone</div>
                                      <div>
                                        +1 0056482364
                                        <span class="whitespace-nowrap">{{
                                          context.phone
                                        }}</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="table-td">
                                    <div class="flex justify-between">
                                      <div>User Name</div>
                                      <div>
                                        <span class="whitespace-nowrap">{{
                                          context.username
                                        }}</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr :key="context.id + 'sub'">
                          <td
                            class="px-3 text-sm relative has-tooltip"
                            colspan="3"
                          >
                            <span
                              v-html="
                                highlight(
                                  context.context,
                                  searchAbleProperties.searchText
                                )
                              "
                            ></span>
                            <span
                              v-if="context.context.length > 100"
                              :class="
                                index > allSocialContext.length - 4 && index > 3
                                  ? 'tooltip1'
                                  : ''
                              "
                              class="
                                absolute
                                text-white
                                bg-purple-midlight
                                z-100
                                left-4
                                text-left
                                invisible
                                shadow-2xl
                                p-1.5
                                px-4
                                tooltip
                                rounded-xl
                                overflow-auto
                                scroll
                              "
                              ><span class="h-full">{{
                                modifyContext(context.context)
                              }}</span></span
                            >
                          </td>
                        </tr>
                        <tr v-if="context.Selected">
                          <td
                            colspan="3"
                            class="px-3 py-2 table-td rounded-br-2xl"
                          >
                            <div class="viewer">
                              <div class="h-full overflow-hidden rounded-2xl">
                                <div
                                  class="
                                    flex flex-col flex-grow
                                    h-80
                                    rounded-2xl
                                  "
                                >
                                  <div
                                    class="
                                      w-full
                                      py-2
                                      bg-purple-midlight
                                      rounded-t-2xl
                                      text-white text-center
                                      font-bold
                                    "
                                  >
                                    Viewer
                                  </div>

                                  <div
                                    class="
                                      w-full
                                      inner-body
                                      scroll
                                      flex-grow
                                      bg-white
                                      rounded-b-2xl
                                    "
                                  >
                                    <div
                                      class="overflow-auto scroll py-3 h-full"
                                    >
                                      <div
                                        v-for="(
                                          Viewer, viewersIndex
                                        ) in context.Viewers"
                                        :key="viewersIndex + 'row2'"
                                        class="flex px-3 w-full"
                                      >
                                        <div class="post-profile">
                                          <!-- <twitter-icon
                                          class="
                                            w-14
                                            h-14
                                            rounded-full
                                            border border-gray-400
                                          "
                                          ></twitter-icon>-->
                                          <template>
                                            <img
                                              :src="profilePic"
                                              class="rounded-full w-14 h-14"
                                              alt="`Profile Picture`"
                                              srcset
                                            />
                                          </template>
                                        </div>

                                        <div class="w-full">
                                          <div
                                            class="
                                              text-ash-primary
                                              flex
                                              justify-between
                                              items-start
                                            "
                                          >
                                            <p class="text-sm md:text-lg">
                                              <span
                                                class="
                                                  font-bold
                                                  text-offgray text-md
                                                  md:text-xl
                                                "
                                                >{{ Viewer.Name }}</span
                                              >
                                              <img
                                                src="@/assets/img/svg/twitter/Verify.svg"
                                                class="inline-block h-4"
                                                alt="Twitter Verify Icon"
                                              />
                                              <span class="text-ash-primary">{{
                                                Viewer.UserName
                                              }}</span>
                                              <span class="text-gray-1700">{{
                                                Viewer.Time
                                              }}</span>
                                            </p>
                                            <fa
                                              class="
                                                cursor-pointer
                                                text-gray-600
                                                mt-1
                                                mr-0.5
                                                text-sm
                                                md:text-lg
                                              "
                                              :icon="['fas', 'ellipsis-h']"
                                            />
                                          </div>

                                          <div
                                            class="
                                              status
                                              text-ash-primary text-sm
                                              md:text-lg
                                            "
                                          >
                                            {{ Viewer.Status }}
                                          </div>

                                          <div
                                            class="reaction text-sm md:text-lg"
                                          >
                                            <div>
                                              <img
                                                src="@/assets/img/icon/Twitter Icon/comment_1.svg"
                                                alt="Twitter Comment Icon"
                                              />
                                              <span>
                                                {{ Viewer.CommentCount }}
                                              </span>
                                            </div>
                                            <div>
                                              <img
                                                src="@/assets/img/icon/Twitter Icon/retweet.svg"
                                                alt="Twitter Retweet Icon"
                                              />
                                              <span>
                                                {{ Viewer.RetweetCount }}
                                              </span>
                                            </div>
                                            <div>
                                              <img
                                                class
                                                src="@/assets/img/icon/Twitter Icon/love_2.svg"
                                                alt="Twitter Reaction Icon"
                                              />
                                              <span>
                                                {{ Viewer.ReactCount }}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                    <!--end => table body section-->
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useBreakpoints } from '@vueuse/core'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import profilePic from '../assets/img/users/default.jpg'
import bellPlusIcon from '../assets/img/icon/ic_add_alert_24px.png'
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import SelectInput from '~/components/inputs/SelectInput'
import SaveSearch from '~/components/search/SaveSearch'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import ClearIcon from '~/components/shared/icon/ClearIcon.vue'
import { searchFeedContextMixin } from '~/mixins/search'
import { useHideText } from '~/composables/feeds/useHideText'
import { SAVE_USER_SEARCH } from '~/constants/urls'
import AllFeedsMenu from '~/components/search/AllFeedsMenu'

export default defineComponent({
  components: {
    SelectInput,
    ArchiveSourcesDropdown,
    SaveSearch,
    VCalenderWithPreset,
    ClearIcon,
    AllFeedsMenu,
  },
  mixins: [searchFeedContextMixin],
  layout: 'home',
  middleware: ['payment'],
  setup() {
    const breakpoints = useBreakpoints({
      largeDesktop: 1700,
      desktop: 1536,
      medium: 1101,
      mediumTab: 1024,
      tab: 768,
      mediumDevice: 768,
    })
    const { hideText } = useHideText()
    return {
      isDesktop: breakpoints.greater('largeDesktop'),
      isMediumDesktop: breakpoints.between('desktop', 'largeDesktop'),
      isMediumTab: breakpoints.between('mediumTab', 'desktop'),
      isTabDevice: breakpoints.between('tab', 'medium'),
      isMediumDevice: breakpoints.greater('mediumDevice'),

      profilePic,
      hideText,
    }
  },
  data() {
    return {
      skew: false,
      bellPlusImg: bellPlusIcon,
      isLoading: true,
      showSavedSearchSideBar: false,
      showEditFeed: false,
      headerConfig: {
        barColor: 'text-purple-midlight',
        icon: 'search',
        iconColor: 'text-purple-midlight',
        text: 'Search',
        dropdownMenuColor: 'search',
        skew: false,
      },
      heightSqueeze: false,
      windowWidth: 0,
      disabled: false,
      showAllSocialFeeds: false,
      controlBoxRound: false,
      toggleSelect2: false,
      menuHeight: 0,
    }
  },
  computed: {
    showMobileSearch() {
      return this.$store.getters['mobile/header/getShowSearchBar']
    },
    getShowMobileSaveSearchBar() {
      return this.$store.getters['mobile/header/getShowMobileSaveSearchBar']
    },
    showHomeSearch() {
      return this.$store.getters['search/getHomeSearch']
    },
    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
    ...mapState('socialFeed', ['allGroups']),
    user() {
      return this.$auth.user
    },
  },

  watch: {
    showAnotherSearchField(val) {
      if (!val) {
        this.searchAbleProperties.containText = ''
        this.searchAbleProperties.ignoreText = ''
      }
    },
    'searchAbleProperties.searchText'(val) {
      this.keyword = val
    },
  },
  created() {
    this.$nuxt.$on('searchResults', (data) => {
      this.mobileSearchResults(data)
    })
  },
  validations: {
    searchAbleProperties: {
      searchText: {
        required,
      },
    },
  },
  mounted() {
    if (this.showHomeSearch !== '') {
      this.searchAbleProperties.searchText = this.showHomeSearch
      this.searchContext()
    }
    setTimeout(() => {
      this.isLoading = false
    }, 5250)
    this.getSavedSearches()
    this.setHeaderConfig()
    this.$store.dispatch('mobile/header/showMobileHeader')
    this.$store.dispatch('mobile/header/setSearchPage')
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
  },
  methods: {
    resizeWindow() {
      if(this.isDesktop || this.isMediumDesktop){
      this.menuHeight = window.innerHeight - 146
      }else if(this.isMediumTab){
        this.menuHeight = window.innerHeight - 202
      }else if(this.isMediumDevice){
        this.menuHeight = window.innerHeight - 258
      }
    },
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
    closeSidebar() {
      this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
      this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
        open: false,
        data: {},
      })
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
      this.$store.dispatch('mobile/header/removePayment')
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
    },
    showSkew($event) {
      this.skew = $event
    },
    ...mapActions({
      setSaveSearches: 'setSaveSearches',
      showSaveSearchAlert: 'search/showSaveSearchAlert',
    }),
    setHeaderConfig() {
      this.$store.dispatch('mobile/header/setHeaderConfig', this.headerConfig)
    },
    showLoader() {
      this.isLoading = false
    },
    addMoreSearchField() {
      this.disabled = true
      this.smoothMove = true
      setTimeout(() => {
        this.showToggleSearch = true
        this.showAnotherField()
        this.disabled = false
      }, 500)
      if (this.showAnotherSearchField) {
        this.heightSqueeze = true
      } else {
        setTimeout(() => {
          this.heightSqueeze = false
        }, 950)
      }
    },
    removeMoreSearchField() {
      this.disabled = true
      this.showToggleSearch = false
      this.hideAnotherField()
      setTimeout(() => {
        this.smoothMove = false
        this.disabled = false
      }, 500)
    },
    showSearchSideBar($event) {
      this.$store.commit('search/SET_SAVE_SAERCH_MODAL', true)
      $event.stopPropagation()
    },
    async getSavedSearches() {
      try {
        const res = await this.$axios.$get(SAVE_USER_SEARCH)
        if (res.success) {
          this.setSaveSearches(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    userSaveSearchWiseContext(data) {
      if (data) {
        this.allSocialContext = data
      } else {
        this.allSocialContext = []
      }
    },
    searchingData(data) {
      this.selectedSavedSearch(data)
      this.savedSearch = data
    },
    showSaveSearchAlertModal() {
      this.showSaveSearchAlert(true)
    },
    closeAlertSearch() {
      this.showSaveSearchAlert(false)
    },
    highlight(text, keyword) {
      const string = text.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')
      if (keyword.length <= 0) {
        return '"' + string.substring(0, 100) + '..."'
      }
      const index = string.indexOf(keyword)
      if (index >= 0) {
        let output = ''
        const separator = ' '
        const maxLen = 120
        const before =
          string.substring(0, index).length > 120
            ? '...' +
              string
                .substring(0, index)
                .substr(
                  -string.substring(0, index).lastIndexOf(separator, maxLen),
                  maxLen
                )
            : string.substring(0, index)
        const after =
          string.substring(index + keyword.length).length > 120
            ? string.substring(
                index + keyword.length,
                string.indexOf(separator, index + keyword.length + maxLen)
              ) + ' ...'
            : string.substring(index + keyword.length)
        output =
          '"' +
          before +
          "<span style='color:crimson'>" +
          string.substring(index, index + keyword.length) +
          '</span>' +
          after +
          '"'
        return output
      }
      return '"' + string.substring(0, 100) + '..."'
    },
    modifyContext(text) {
      return text.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')
    },
    mobileSearchResults(data) {
      this.allSocialContext = data.results
      this.searchAbleProperties.searchText = data.searchText
    },
  },
})
</script>

<style lang="scss" scoped>
.post-profile {
  @apply pr-3 py-3 -mt-3;
  // z-index: 20;
}
.post-profile img {
  min-width: 56px;
}
.reaction {
  @apply my-2 flex justify-between text-gray-1700 mr-16;
}
.reaction img {
  @apply inline-block w-4 mr-4;
  fill: #8e8e8e;
}
.retweet {
  @apply inline-block w-4 mr-4;
  fill: #8e8e8e;
}
.selectSearch {
  max-width: 226px; //212
  height: 40px;
}

.page-content {
  transition: margin 0.5s;
}
.search-bar-wrapper {
  @apply w-full space-y-4 2xl:col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12;
}
.search-input-icon {
  @apply text-purple-midlight absolute ml-4 w-5;
}
.search-field {
  @apply focus:outline-none w-full text-lg md:h-10 h-8 pl-10 py-1 rounded-full outline-none opacity-100 text-gray-1200;
  &::placeholder {
    opacity: 0.5;
    color: #7d80bd;
  }
}
.save-input-wrapper {
  @apply grid grid-cols-12 xl:gap-4 gap-2 justify-items-end;
}
.save-select-input {
  @apply lg:col-span-3 md:col-span-4 col-span-12 w-full;
}
.archive-dropdown {
  @apply 2xl:col-span-2 xl:col-span-4 lg:col-span-4 col-span-12;
  max-width: 16rem;
  min-width: 16rem;
}
.table-th {
  @apply font-bold md:text-gray-800 text-yellow-midlight text-left md:w-2/12 w-4/12 xl:text-md lg:text-sm text-xs;
}
.table-body {
  @apply flex items-center justify-start md:space-x-5 space-x-3 w-full;
}
.table-tr {
  @apply text-gray-600 md:w-2/12 w-4/12 xl:text-md lg:text-sm text-xs;
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
.toggle-checkbox-alert {
  &:checked {
    @apply right-0 border-purple-midlight;
    right: 0;
    border-color: #ffffff;
  }
  &:checked + .toggle-label-alert {
    @apply bg-purple-midlight;
    background-color: #ffffff;
  }
}
.large_clear_button {
  @apply flex justify-center items-center w-8 h-8 bg-purple-midlight rounded-full cursor-pointer;
}
.clear_button {
  left: 3px;
  // @apply flex justify-center items-center w-8 h-8 bg-purple-midlight rounded-full mx-1 cursor-pointer;
}
.highlight {
  color: red;
  background: #eba83b;
}
.table-th-w-10 {
  min-width: 10rem;
}
.table-th-w-40 {
  min-width: 50rem;
}
.min-width-100 {
  min-width: 110rem;
}
.min-width-8 {
  min-width: 18rem;
}
.min-width-6 {
  min-width: 8rem;
}
.min-width-20 {
  min-width: 40rem;
}
.height-decrease {
  transition: all 0.5s ease-in-out;
  height: calc(100% - 198px);
  top: 166px;
}
.height-expand {
  transition: all 0.5s ease-in-out;
  height: calc(100% - 78px);
  top: 46px;
}
.tooltip {
  @apply md:w-103 w-56 h-28 shadow-lg invisible;
}
.name-tooltip {
  @apply md:w-54 w-36 shadow-lg;
}
.tooltip-toggle-label {
  @apply w-auto shadow-lg;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.1s linear;
}

.has-tooltip:hover .name-tooltip {
  @apply visible;
  transition: all 0.1s linear;
}

.has-tooltip:hover .tooltip-toggle-label {
  @apply visible;
  transition: all 0.1s linear;
}

.tooltip1 {
  bottom: 70%;
  @apply invisible;
}
.has-tooltip:hover .tooltip1 {
  @apply visible;
  transition: all 0.1s linear;
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
[data-title]:after {
  color: #444a92;
  right: 100%;
}
.all_includes {
  max-width: 588px;
}
.include {
  min-width: 350px;
}
.input select {
  @apply py-1.5;
}
.save-icon {
  margin-right: 4px !important;
}

.max-width-1146 {
  max-width: 962px;
}
//Small Device
.mobile-home_page_height {
  height: 100%;
  position: relative;
  padding-top: 60px;
}
.mobile-card-wrapper {
  @apply flex flex-col overflow-y-hidden pt-4 relative space-y-8 h-full;
}
.mobile-card {
  @apply flex-grow bg-white rounded-2xl overflow-hidden flex flex-col;
}
.mobile-card-header {
  @apply bg-purple-midlight text-center py-2;
}
.mobile-card-title {
  @apply text-white xl:text-xl md:text-lg text-md font-bold;
}
.mobile-card-body {
  @apply overflow-auto bg-white rounded-2xl h-full;
}
.mobile-table-th {
  @apply md:font-bold font-normal px-3 py-1.5 text-gray-800 text-left break-all xl:text-md text-md;
}
.mobile-table-body {
  @apply flex items-center justify-start space-x-5 w-full pb-1;
}
.mobile-table-tr {
  @apply break-all px-3 py-1.5 xl:text-md text-md whitespace-nowrap;
}
.text-xxs {
  font-size: 10px;
}
.arrow_parent {
  width: 100%;
  height: 20px;
  position: absolute;
  top: 39px;
}
.max-height-320 {
  // max-height: 320px;
  max-height: var(--height);
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
.allFeeds_ul_wrapper {
  box-shadow: 0px 4px 6px #00000080;
}
.allFeeds_wrapper ul {
  width: 368px;
  // max-height: 320px;
  max-height: var(--height);
}
.scroll-x {
  overflow-x: hidden !important;
}
@media (min-width: 1536px) and (max-width: 1602px) {
  .marginLeft {
    margin-left: 280px;
    width: calc(100% - 280px);
  }
  .alert-selection_section {
    margin-left: 36px;
  }
  .search-bar {
    margin-left: 0px;
  }
  .height-expand {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 124px);
    top: 92px;
  }
  .search-bar {
    margin-left: 0px !important;
  }
  .selectOption {
    margin-left: 26px;
  }
}
@media (min-width: 1603px) and (max-width: 1699px) {
  .marginLeft {
    margin-left: 290px;
    width: calc(100% - 290px);
  }
  .alert-selection_section {
    margin-left: 16px;
  }
  .search-bar {
    margin-left: 0px;
  }
  .height-expand {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 124px);
    top: 92px;
  }
  .search-bar {
    margin-left: 0px !important;
  }
  .selectOption {
    margin-left: 26px;
  }
}
.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}
@media (min-width: 1700px) and (max-width: 1762px) {
  .alert-selection_section {
    margin-left: 18px;
  }
  .search-bar {
    margin-left: 0px !important;
  }
}
@media (min-width: 1700px) and (max-width: 1770px) {
  .marginLeft {
    margin-left: 300px;
    width: calc(100% - 300px);
  }
  .search-bar {
    margin-left: 0px !important;
  }
  .selectOption {
    margin-left: 26px;
  }
}
@media (min-width: 1536px) and (max-width: 1848px) {
  .search-bar-wrapper {
    margin-left: 32px;
  }
  .search-bar {
    margin-left: 0px !important;
  }
}
@media (min-width: 1360px) and (max-width: 1535px) {
  .marginLeft {
    width: calc(100% - 272px);
  }
  .select-options-left {
    width: calc(100% - 272px) !important;
  }
  .selectSearch {
    max-width: 100%;
    height: 40px;
  }
}
@media (min-width: 1536px) {
  .archive-dropdown {
    max-width: 16rem;
    min-width: 16rem;
  }
  .search-bar-wrapper {
    @apply w-full space-y-4 2xl:col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12;
    max-width: 625px;
  }
}
@media (min-width: 1771px) {
  .marginLeft {
    width: calc(100% - 272px);
  }
}
@media (min-width: 1920px) {
  .selectOption {
    margin-left: 26px;
  }
}

.search-date-feed {
  @apply md:px-3 md:py-2;
}
.table-td {
  @apply md:px-3 md:py-2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.min-w-28 {
  min-width: 7rem !important;
}

.not-clickable {
  pointer-events: none;
}
@media (min-width: 1101px) and (max-width: 1535px) {
  .height-expand {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 132px);
    top: 98px;
  }
  .height-decrease {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 248px);
    top: 212px;
  }
  .medium-device-expand {
    transition: all 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    top: 56px;
  }
  .medium-device-decrease {
    transition: all 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    top: 170px;
  }
}
@media (min-width: 1024px) and (max-width: 1100px) {
  .height-expand {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 182px);
    top: 150px;
  }
  .height-decrease {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 298px);
    top: 266px;
  }
  .medium-device-expand {
    transition: all 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    top: 56px;
  }
  .medium-device-decrease {
    transition: all 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    top: 170px;
  }
  .tab_margin {
    @apply ml-2;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .height-expand {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 246px);
    top: 214px;
  }
  .height-decrease {
    transition: all 0.5s ease-in-out;
    height: calc(100% - 352px);
    top: 320px;
  }
  .medium-device-expand {
    transition: all 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    top: 112px;
  }
  .medium-device-decrease {
    transition: all 0.5s ease-in-out;
    position: absolute;
    width: 100%;
    top: 224px;
  }
  .tab_margin {
    @apply ml-3.5;
  }
}
@media (max-width: 1359px) and (min-width: 768px) {
  .selectSearch {
    max-width: 100%; //212
    height: 40px;
  }
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
</style>