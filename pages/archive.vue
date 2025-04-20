<template>
  <section class="h-full">
    <transition name="page">
      <div class="hidden md:block p-4 h-full">
        <div
          class="content xl:space-y-2 md:space-y-6 transition-all duration-2000"
          :class="[showHomeContent ? 'opacity-0' : '']"
          @click="closeSidebar"
        >
          <div class="header_wrapper">
            <ArchiveSourcesDropdown
              :active="false"
              :height="100"
              :source="'archive'"
              @expand="showSkew($event)"
              @show-edit-feed="showEditFeed = true"
            />
            <div class="filter_wrapper xl:space-x-4">
              <div
                class="allFeeds_wrapper cursor-pointer h-auto input z-30"
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
                <div
                  class="right-0 bg-green-1100 allFeeds_ul_wrapper absolute top-13.3 max-height-320 scroll-x right-130"
                  :class="[
                    showAllSocialFeeds ? 'block' : 'hidden',
                    !controlBoxRound ? 'rounded-full' : 'rounded-xl',
                  ]"
                >
                  <AllFeedsMenu
                    ref="allFeedsMenu"
                    arrow-color="#8DB230"
                    scroll-color="#6e9c2e"
                    :show-all-social-feeds="showAllSocialFeeds"
                    :control-box-round="controlBoxRound"
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
                class="cursor-pointer relative"
                @click="calenderShow = true"
                @mouseleave.stop="calenderShow = false"
              >
                <div class="name_wrapper input">
                  <select
                    id="all-dates"
                    v-model="allDates"
                    class="scrollStyle scrollWidth text-lg pointer-events-none"
                    @input="selectedName($event.target.value)"
                  >
                    <option :value="allDates" selected>{{ allDates }}</option>
                  </select>
                  <span class="select-toggle bg-green-1100">
                    <fa :icon="['fas', calenderShow ? 'caret-up' : 'caret-down']" />
                  </span>
                </div>
                <div
                  class="group-hover:block shadow-xl absolute md:top-17.25 lg:top-13.3 calender_right right-0 z-999999 cursor-pointer bg-white rounded-3xl border-top"
                >
                  <v-calender-with-preset
                    :show-v-celander="calenderShow"
                    :arrow-position-right="right"
                    scroll-color="#6e9c2e"
                    border-color="#8DB230"
                    header-bg-color="bg-green-1100"
                    sidebar-hover-class="hover:bg-green-1100 hover:text-white"
                    sidebar-active-color="bg-green-1100 text-white"
                    date-picker-color="archive"
                    content-body-color="bg-green-1100"
                    content-body-hover-color="hover:bg-white hover:text-green-1100"
                    content-body-active-color="bg-white text-green-1100"
                    @dateRange="pastMonthDateRageEvent"
                  />
                </div>
              </div>
              <div
                class="clear_button"
                data-title="Clear"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width="30"
                  height="30"
                  class="absolute right-1.5"
                >
                  <defs>
                    <style>
  .cls-1 {
    fill: none;
  }
  .cls-2 {
    fill: #fff;
  }
                    </style>
                  </defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <rect class="cls-1" width="20" height="20" />
                      <path
                        class="cls-2"
                        d="M7.13,13.37c-.69.68-1.39,1.35-2.07,2.05-.27.28-.47.33-.79.05a19.84,19.84,0,0,1-2.36-2.4c.86-.66,1.72-1.29,2.54-2A14,14,0,0,0,7.58,7.59c.22-.36.4-.4.75-.19,2.43,1.42,4.86,2.84,7.31,4.23.45.25.4.46.2.84A15.36,15.36,0,0,0,14,18a10.43,10.43,0,0,0,0,1.58c0,.42-.14.45-.48.36a27.15,27.15,0,0,1-7.32-3.1c-.42-.27-.49-.48-.23-.91.48-.79.9-1.62,1.34-2.43Z"
                      />
                      <path
                        class="cls-2"
                        d="M17.5,9.38a3.75,3.75,0,0,1-1,1.59.82.82,0,0,1-1,0L8.92,7.12a.76.76,0,0,1-.37-.38c-.29-.83.33-1.37.73-1.94s.85-.29,1.28,0L15,7.35,17,8.48A.94.94,0,0,1,17.5,9.38Z"
                      />
                      <path
                        class="cls-2"
                        d="M18.09,1.31a1.07,1.07,0,0,1-.21.64c-.82,1.44-1.65,2.88-2.46,4.33-.19.34-.34.44-.71.18a14.45,14.45,0,0,0-1.53-.88A.33.33,0,0,1,13,5c.88-1.51,1.74-3,2.63-4.54A.85.85,0,0,1,17,.17C17.41.46,18,.6,18.09,1.31Z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <!-- <button class="filter_button setup" @click="filterTable()">
                <span>Filter</span>
              </button>-->
              <div class="plus_button" data-title="Extend All Source and URL" @click="expandAll()">
                <ExtendPlusIcon v-if="!allExpand" class="my-2.5 mx-auto h-5 w-5" />
                <ExtendMinusIcon v-else class="my-2.5 mx-auto h-5 w-5" />
              </div>
              <button class="bulk-download_button setup" @click="showBulkDownload($event)">
                <span>Bulk Download</span>
              </button>
            </div>
          </div>
          <div class="card-wrapper page-content h-full" :class="[skew ? 'm-xl:ml-70' : '']">
            <div
              class="flex flex-col xl:pt-4 lg:pt-0 relative xl:space-y-8 md:space-y-4 h-full overflow-hidden"
            >
              <div class="card">
                <div class="card-header">
                  <h3 class="text-white text-xl font-bold">Social Media</h3>
                </div>
                <div class="scroll card-body">
                  <div class="table-wrapper h-full">
                    <div
                      class="flex flex-row flex-nowrap px-3 table-w-152 md:py-4 sticky top-0 bg-white z-20"
                    >
                      <div
                        class="w-1/12 text-green-1300 table-th table-download-w overflow-hidden px-2 sticky left-0 bg-white"
                      >
                        <strong class="whitespace-nowrap">Source</strong>
                      </div>
                      <div
                        class="w-1/12 text-green-1300 table-th table-th-w-13 overflow-hidden px-2"
                      >
                        <strong class="whitespace-nowrap">Group</strong>
                      </div>
                      <div
                        class="text-green-1300 w-1/12 table-th table-th-w-13 overflow-hidden px-2"
                      >
                        <strong class="whitespace-nowrap">Name</strong>
                      </div>
                      <div
                        class="text-green-1300 w-2/12 table-th table-th-w-16 overflow-hidden px-2"
                      >
                        <strong class="whitespace-nowrap">File Name</strong>
                      </div>
                      <!-- <div
                        class="
                          text-green-1300
                          w-2/12
                          table-th table-th-w-16
                          overflow-hidden
                          px-2
                        "
                      >
                        <strong class="whitespace-nowrap">Destination</strong>
                      </div>-->
                      <!-- <div
                        class="
                          text-green-1300
                          w-1/12
                          table-th table-th-w
                          overflow-hidden
                          px-2
                        "
                      >
                        <strong class="whitespace-nowrap">Stored Here</strong>
                      </div>-->
                      <div
                        class="text-green-1300 w-1/12 table-th table-th-w-13 overflow-hidden px-2"
                      >
                        <strong class="whitespace-nowrap">Latest Update</strong>
                      </div>
                      <div
                        class="text-green-1300 w-1/12 table-th table-th-w-13 overflow-hidden px-2 pl-10"
                      >
                        <strong class="whitespace-nowrap">Size</strong>
                      </div>
                      <div
                        class="text-green-1300 w-1/12 table-th table-download-w overflow-hidden sticky right-0 bg-white z-10 px-2"
                      >
                        <strong class="whitespace-nowrap">Download</strong>
                      </div>
                    </div>
                    <template v-if="tempArray.length > 0">
                      <div
                        v-for="(mainItem, mainIndex) in tempArray"
                        :key="mainIndex + 'down-web'"
                        class="flex flex-col table-w-152 px-3"
                      >
                        <div class="flex flex-row flex-nowrap py-1 pb-2.5 table-w-152">
                          <div
                            class="text-gray-1200 w-1/12 cursor-pointer table-td table-download-w sticky left-0 bg-white z-10 px-2"
                            @click="
                              twitterExpand(mainIndex, mainItem.showAllYears)
                            "
                          >
                            <div class="flex flex-row flex-nowrap relative has-tooltip">
                              <facebook-icon
                                v-if="
                                  mainItem.provider === 'Facebook' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-5 h-5 mt-1 border border-gray-400"
                              ></facebook-icon>
                              <instagram-icon
                                v-if="
                                  mainItem.provider === 'Instagram' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-5 h-5 mt-1 border border-gray-400"
                              ></instagram-icon>
                              <twitter-icon
                                v-if="
                                  mainItem.provider === 'Twitter' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-5 h-5 mt-1 border border-gray-400"
                              ></twitter-icon>
                              <linkedin-icon
                                v-if="
                                  mainItem.provider === 'LinkedIn' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-5 h-5 mt-1 border border-gray-400"
                              ></linkedin-icon>
                              <microsoft-icon
                                v-if="
                                  mainItem.provider === 'Microsoft' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-5 h-5 mt-1 rounded-full border border-gray-400"
                              ></microsoft-icon>
                              <img
                                v-if="mainItem.profilePic"
                                class="inline-block w-5 h-5 rounded-full mt-1 border border-gray-400"
                                :src="mainItem.profilePic"
                                :alt="`${mainItem.username}'s ${mainItem.provider} Profile Picture`"
                              />
                              <span class="whitespace-nowrap ml-1.5">
                                {{
                                mainItem.provider | urlLimit
                                }}
                              </span>
                              <span
                                v-if="mainItem.provider.length > 26"
                                class="tooltip"
                                :class="
                                  mainIndex > tempArray.length - 3
                                    ? 'tooltip1'
                                    : ''
                                "
                              >{{ mainItem.provider }}</span>
                            </div>
                          </div>
                          <div
                            class="w-1/12 text-gray-1200 table-td table-th-w-13 px-2 relative has-tooltip"
                          >
                            <span class="whitespace-nowrap">
                              {{
                              mainItem.groupName | urlLimits
                              }}
                            </span>
                            <span
                              v-if="mainItem.groupName.length > 15"
                              class="tooltip md:w-52 w-40"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.groupName }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-1/12 table-th-w-13 table-td has-tooltip relative px-2 transition-all duration-2000"
                          >
                            <span class="whitespace-nowrap">
                              {{
                              mainItem.name | urlLimits
                              }}
                            </span>
                            <span
                              v-if="mainItem.name.length > 15"
                              class="tooltip md:w-52 w-40"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.name }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-2/12 table-td table-td-w-16 px-2 relative has-tooltip"
                          >
                            <span class="whitespace-nowrap">
                              {{
                              mainItem.fileName | urlLimit
                              }}
                            </span>
                            <span
                              v-if="mainItem.fileName.length > 26"
                              class="tooltip md:w-65 w-40 whitespace-normal break-all"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.fileName }}</span>
                          </div>
                          <!-- <div
                          class="
                            text-gray-1200
                            w-2/12
                            table-td table-td-w-16
                            px-2
                            relative
                            has-tooltip
                          "
                        >
                          <span class="whitespace-nowrap"
                            >{{ mainItem.autoDeliveryEmail | urlLimit }}
                          </span>
                          <span
                            v-if="mainItem.autoDeliveryEmail.length > 26"
                            class="
                              tooltip
                              md:w-65
                              w-40
                              whitespace-normal
                              break-all
                            "
                            :class="
                              mainIndex > tempArray.length - 3 ? 'tooltip1' : ''
                            "
                            >{{ mainItem.autoDeliveryEmail }}</span
                          >
                          </div>-->
                          <div
                            class="text-gray-1200 w-1/12 table-td table-th-w-13 px-2 relative has-tooltip"
                          >
                            <span class="whitespace-nowrap">
                              {{ mainItem.latestAt | diffForHumans }},
                              ago
                            </span>
                            <span
                              v-if="mainItem.latestAt.length > 26"
                              class="tooltip"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.latestAt }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-1/12 table-td table-th-w-13 px-2 pl-10 relative has-tooltip"
                          >
                            <span class="whitespace-nowrap">
                              {{
                              mainItem.fileSize | urlLimit
                              }}
                            </span>
                            <span
                              v-if="mainItem.fileSize.length > 26"
                              class="tooltip"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.fileSize }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-1/12 table-td table-download-w px-2 has-tooltip sticky right-0 bg-white z-10 align"
                          >
                            <a :href="mainItem.download" class download title="Download">
                              <div
                                class="flex flex-row flex-nowrap relative justify-between table-download-wd"
                              >
                                <span
                                  class="whitespace-nowrap"
                                >{{ mainItem.archiveFormat | urlLimit }}</span>
                                <div class="w-20">
                                  <fa
                                    class="text-2xl h-5 mt-1 cursor-pointer text-green-1100"
                                    :icon="['fas', 'download']"
                                    @click="bulkDownload(mainItem.id, $event)"
                                  />
                                </div>
                                <span
                                  v-if="mainItem.archiveFormat.length > 26"
                                  class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                                >{{ mainItem.archiveFormat }}</span>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div
                          v-if="
                            mainItem.showAllYears &&
                            Object.values(mainItem.yearOfArchive).length
                          "
                          class="bg-green-1200 rounded-2xl py-1 mx-2.5 table-child-body"
                        >
                          <div
                            v-for="(submainItem, submainIndex) in Object.values(
                              mainItem.yearOfArchive
                            )"
                            :key="submainIndex + 'year-web'"
                            class="table-td-child-body_wrapper"
                          >
                            <div class="flex flex-row flex-nowrap">
                              <div
                                class="text-gray-1300 flex items-center space-x-1 w-3/12 table-td-child-td table-chide-td-w-40 overflow-hidden sticky left-0 bg-green-1200 z-10"
                              >
                                <div class="table-td-child-td-pointer relative social-pointer">
                                  <fa
                                    class="text-white w-4 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    :icon="[
                                      'fas',
                                      submainItem.showDateExpand &&
                                      submainItem.subItemsDate.length
                                        ? 'minus'
                                        : 'plus',
                                    ]"
                                    @click="
                                      extandedSourceTime(
                                        mainIndex,
                                        submainIndex,
                                        submainItem.showDateExpand
                                      )
                                    "
                                  />
                                </div>
                                <span class="inline-block whitespace-nowrap">
                                  {{
                                  Object.keys(mainItem.yearOfArchive)[
                                  submainIndex
                                  ]
                                  }}
                                </span>
                              </div>
                              <div
                                class="text-gray-1300 w-2/12 table-td-child-td table-chide-td-w-42 pl-1 2xl:pl-2 moreBigScreen:pl-4 overflow-hidden relative has-tooltip"
                              >
                                <span class="whitespace-nowrap">
                                  {{
                                  submainItem.fileName | urlLimit
                                  }}
                                </span>
                                <span
                                  v-if="submainItem.fileName.length > 26"
                                  class="sub-tooltip md:w-auto w-40 scroll whitespace-normal break-all text-xs"
                                  :class="
                                    mainIndex > tempArray.length - 3
                                      ? 'tooltip1'
                                      : ''
                                  "
                                >{{ submainItem.fileName }}</span>
                              </div>
                              <div
                                class="text-gray-1300 w-1/12 table-td-child-td table-th-w-13 pl-2 2xl:pl-1 moreBigScreen:pl-5 overflow-hidden"
                              >
                                <span class="whitespace-nowrap">
                                  {{ submainItem.latestAt | diffForHumans }},
                                  ago
                                </span>
                              </div>
                              <div
                                class="text-gray-1300 w-1/12 table-td-child-td table-th-w-13 px-2 pl-10 moreBigScreen:pl-14 overflow-hidden"
                              >
                                <span class="whitespace-nowrap">{{ submainItem.fileSize }}</span>
                              </div>
                              <div
                                class="text-gray-1300 w-1/12 table-td-child-td px-1 2xl:px-1 moreBigScreen:pl-6 overflow-hidden table-download-w align sticky right-0 bg-green-1200 z-10"
                              >
                                <a :href="submainItem.yearDownload" download title="Download">
                                  <div
                                    class="flex flex-row flex-nowrap overflow-hidden justify-between table-download-wd"
                                  >
                                    <span class="whitespace-nowrap">{{ mainItem.archiveFormat }}</span>

                                    <div class="w-20">
                                      <fa
                                        class="text-2xl w-4 h-5 cursor-pointer text-green-1100"
                                        :icon="['fas', 'download']"
                                        @click="
                                          bulkDownload(submainItem.id, $event)
                                        "
                                      />
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div
                              v-if="
                                submainItem.showDateExpand &&
                                submainItem.subItemsDate.length
                              "
                            >
                              <div
                                v-for="(
                                  submainItemDate, submainDateIndex
                                ) in submainItem.subItemsDate"
                                :key="submainDateIndex + 'date-web'"
                                class="table-td-child-innerchild_wrapper"
                              >
                                <div class="flex flex-row flex-nowrap">
                                  <div
                                    class="text-gray-1300 w-3/12 flex items-center space-x-1 pl-4 table-td-child-innerchild-td overflow-hidden table-chide-td-w-40 sticky left-0 bg-green-1200 z-10"
                                  >
                                    <div class="table-td-child-innerchild-td-pointer"></div>
                                    <span class="inline-block float-left whitespace-nowrap">
                                      <DateTime
                                        :datetime="submainItemDate.createdAt"
                                        format="MMMM D, YYYY"
                                        class="table-span"
                                      />
                                    </span>
                                  </div>
                                  <div
                                    class="text-gray-1300 w-2/12 table-td-child-innerchild-td table-chide-td-w-42 pl-1 2xl:pl-2 moreBigScreen:pl-4 overflow-hidden relative has-tooltip"
                                  >
                                    <span class="whitespace-nowrap">
                                      {{
                                      submainItemDate.fileName | urlLimit
                                      }}
                                    </span>
                                    <span
                                      v-if="
                                        submainItemDate.fileName.length > 26
                                      "
                                      class="sub-tooltip md:w-auto w-40 scroll whitespace-normal break-all text-xs"
                                      :class="
                                        mainIndex > tempArray.length - 3
                                          ? 'tooltip1'
                                          : ''
                                      "
                                    >{{ submainItemDate.fileName }}</span>
                                  </div>
                                  <div
                                    class="text-gray-1300 w-1/12 table-td-child-innerchild-td pl-2 2xl:pl-1 moreBigScreen:pl-5 table-th-w-13 overflow-hidden"
                                  >
                                    <span class="whitespace-nowrap">
                                      {{
                                      submainItemDate.latestAt
                                      | diffForHumans
                                      }}, ago
                                    </span>
                                  </div>
                                  <div
                                    class="text-gray-1300 w-1/12 table-td-child-innerchild-td px-2 pl-10 moreBigScreen:pl-14 table-th-w-13 overflow-hidden"
                                  >
                                    <span class="whitespace-nowrap">{{ submainItemDate.fileSize }}</span>
                                  </div>
                                  <div
                                    class="text-gray-1300 w-1/12 table-td-child-innerchild-td table-download-w px-1 2xl:px-1 moreBigScreen:pl-6 overflow-hidden align sticky right-0 bg-green-1200 z-10"
                                  >
                                    <a
                                      :href="
                                        submainItemDate.postDateDownloadPDF
                                      "
                                      title="Download"
                                    >
                                      <div
                                        class="flex flex-row flex-nowrap relative justify-between table-download-wd"
                                      >
                                        <span class="whitespace-nowrap">{{ mainItem.archiveFormat }}</span>
                                        <div class="w-20">
                                          <fa
                                            class="text-2xl w-4 h-5 cursor-pointer text-green-1100"
                                            :icon="['fas', 'download']"
                                            @click="
                                              bulkDownload(
                                                submainItemDate.id,
                                                $event
                                              )
                                            "
                                          />
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div v-else class="w-full no-data-found flex justify-center items-center">
                      <span
                        class="text-2xl text-green-1300 sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >No data found</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="betaVersion" class="card">
                <div class="card-header">
                  <h3 class="text-white text-xl font-bold">Website</h3>
                </div>
                <div class="scroll card-body">
                  <div class="table-wrapper h-full">
                    <div
                      class="flex flex-row flex-nowrap table-w-152 md:py-4 sticky top-0 bg-white z-20 px-3"
                    >
                      <div
                        class="w-1/12 text-green-1300 table-th table-th-w overflow-hidden px-2 sticky left-0 bg-white"
                      >
                        <strong class="whitespace-nowrap">URL</strong>
                      </div>
                      <div class="w-1/12 text-green-1300 table-th table-th-w overflow-hidden px-2">
                        <strong class="whitespace-nowrap">Group</strong>
                      </div>
                      <div class="text-green-1300 w-1/12 table-th table-th-w overflow-hidden px-2">
                        <strong class="whitespace-nowrap">Name</strong>
                      </div>
                      <div class="text-green-1300 w-1/12 table-th table-th-w overflow-hidden px-2">
                        <strong class="whitespace-nowrap">Searchable</strong>
                      </div>
                      <div
                        class="text-green-1300 w-2/12 table-th table-th-w-16 overflow-hidden px-2"
                      >
                        <strong class="whitespace-nowrap">File Name</strong>
                      </div>
                      <div
                        class="text-green-1300 w-2/12 table-th table-th-w-16 overflow-hidden px-2"
                      >
                        <strong class="whitespace-nowrap">Destination</strong>
                      </div>
                      <div class="text-green-1300 w-1/12 table-th table-th-w overflow-hidden px-2">
                        <strong class="whitespace-nowrap">Stored Here</strong>
                      </div>
                      <div class="text-green-1300 w-1/12 table-th table-th-w overflow-hidden px-2">
                        <strong class="whitespace-nowrap">Latest Update</strong>
                      </div>
                      <div
                        class="text-green-1300 w-1/12 table-th table-th-w overflow-hidden px-2 pl-10"
                      >
                        <strong class="whitespace-nowrap">Size</strong>
                      </div>
                      <div
                        class="text-green-1300 w-1/12 table-th table-download-w overflow-hidden px-2 sticky right-0 bg-white"
                      >
                        <strong class="whitespace-nowrap">Download</strong>
                      </div>
                    </div>
                    <div
                      v-for="(mainItem, mainIndex) in tempWebArray"
                      :key="mainIndex + 'dow-web'"
                      class="flex flex-col table-w-152 px-3"
                    >
                      <div class="flex flex-row flex-nowrap py-1 pb-2.5 table-w-152">
                        <div
                          class="text-gray-1200 w-1/12 cursor-pointer table-td table-th-w px-2 sticky left-0 bg-white z-10"
                          @click="
                            websiteExpand(mainIndex, mainItem.showAllYears)
                          "
                        >
                          <div class="flex flex-row flex-nowrap relative">
                            <img
                              class="inline-block w-5 h-5 mt-1"
                              :src="mainItem.urlIcon"
                              alt="twitter"
                            />
                            <span class="whitespace-nowrap ml-1.5 relative has-tooltip">
                              {{ mainItem.url | urlLimits }}
                              <span
                                v-if="mainItem.url.length > 15"
                                class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                              >{{ mainItem.url }}</span>
                            </span>
                          </div>
                        </div>
                        <div
                          class="w-1/12 text-gray-1200 table-td table-th-w px-2 relative has-tooltip"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.group | urlLimit }}
                            <span
                              v-if="mainItem.group.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.group }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-1/12 table-td table-th-w has-tooltip relative px-2"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.name | urlLimit }}
                            <span
                              v-if="mainItem.name.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.name }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-1/12 table-td table-th-w relative has-tooltip px-2 align"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.searchable | urlLimit }}
                            <span
                              v-if="mainItem.searchable.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.searchable }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-2/12 table-td table-td-w-16 px-2 relative has-tooltip"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.filename | urlLimit }}
                            <span
                              v-if="mainItem.filename.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.filename }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-2/12 table-td table-td-w-16 px-2 relative has-tooltip"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.destination | urlLimit }}
                            <span
                              v-if="mainItem.destination.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.destination }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-1/12 table-td table-th-w px-2 relative has-tooltip"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.storedHere | urlLimit }}
                            <span
                              v-if="mainItem.storedHere.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.storedHere }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-1/12 table-td table-th-w px-2 relative has-tooltip"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.updatedAt | urlLimit }}
                            <span
                              v-if="mainItem.updatedAt.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.updatedAt }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-1/12 table-td table-th-w px-2 pl-10 relative has-tooltip"
                        >
                          <span class="whitespace-nowrap relative">
                            {{ mainItem.size | urlLimit }}
                            <span
                              v-if="mainItem.size.length > 26"
                              class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                            >{{ mainItem.size }}</span>
                          </span>
                        </div>
                        <div
                          class="text-gray-1200 w-1/12 table-td table-download-w px-2 sticky right-0 bg-white z-10 has-tooltip align"
                        >
                          <a :href="mainItem.download" download title="Download">
                            <div class="flex flex-row flex-nowrap relative items-center space-x-1">
                              <span class="whitespace-nowrap">{{ mainItem.fileFormats | urlLimit }}</span>
                              <img class="inline-block w-4 h-5 ml-1" :src="download" alt="download" />
                              <span
                                v-if="mainItem.fileFormats.length > 26"
                                class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                              >{{ mainItem.fileFormats }}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div
                        v-if="mainItem.showAllYears"
                        class="bg-green-1200 rounded-2xl py-1 mx-2.5 table-child-body"
                      >
                        <div
                          v-for="(
                            submainItem, submainIndex
                          ) in mainItem.yearOfSocialInfo"
                          :key="submainIndex + 'year-small'"
                          class="table-td-child-body_wrapper"
                        >
                          <div class="flex flex-row flex-nowrap">
                            <div
                              class="text-gray-1200 w-4/12 flex items-center space-x-1 table-td-child-td table-chide-td-w-40 overflow-hidden sticky left-0 bg-green-1200 z-10"
                            >
                              <div class="table-td-child-td-pointer relative social-pointer">
                                <fa
                                  class="text-white w-4 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                  :icon="[
                                    'fas',
                                    submainItem.showDateExpand
                                      ? 'minus'
                                      : 'plus',
                                  ]"
                                  @click="
                                    extandedWebsiteTime(
                                      mainIndex,
                                      submainIndex,
                                      submainItem.showDateExpand
                                    )
                                  "
                                />
                              </div>
                              <span class="inline-block whitespace-nowrap">{{ submainItem.year }}</span>
                            </div>
                            <div
                              class="text-gray-1200 w-5/12 table-td-child-td table-chide-td-w-42 pl-1 overflow-hidden relative has-tooltip"
                            >
                              <span class="whitespace-nowrap relative">
                                {{ submainItem.yearfilename | urlLimit }}
                                <span
                                  v-if="submainItem.yearfilename.length > 26"
                                  class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl child-tooltip"
                                >{{ submainItem.yearfilename }}</span>
                              </span>
                            </div>
                            <div
                              class="text-gray-1200 w-1/12 table-td-child-td table-th-w pl-5 2xl:pl-6 overflow-hidden"
                            >
                              <span class="whitespace-nowrap">{{ submainItem.yearupdatedAt }}</span>
                            </div>
                            <div
                              class="text-gray-1200 w-1/12 table-td-child-td table-th-w pl-14 overflow-hidden"
                            >
                              <span class="whitespace-nowrap">{{ submainItem.yearsize }}</span>
                            </div>
                            <div
                              class="text-gray-1200 w-1/12 table-td-child-td pl-5 2xl:pl-7 overflow-hidden table-download-w align sticky right-0 bg-green-1200 z-10"
                            >
                              <a :href="submainItem.yearDownload" download title="Download">
                                <div
                                  class="flex flex-row flex-nowrap items-center space-x-1 overflow-hidden"
                                >
                                  <span class="whitespace-nowrap">{{ submainItem.yearfileFormats }}</span>
                                  <img
                                    class="inline-block w-4 h-5 ml-1"
                                    :src="download"
                                    alt="download"
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                          <div v-if="submainItem.showDateExpand">
                            <div
                              v-for="(
                                submainItemDate, submainDateIndex
                              ) in submainItem.subItemsDate"
                              :key="submainDateIndex + 'date-small'"
                              class="table-td-child-innerchild_wrapper"
                            >
                              <div class="flex flex-row flex-nowrap">
                                <div
                                  class="text-gray-1200 flex items-center space-x-1 w-4/12 pl-4 table-td-child-innerchild-td overflow-hidden table-chide-td-w-40 sticky left-0 bg-green-1200 z-10"
                                >
                                  <div class="table-td-child-innerchild-td-pointer"></div>
                                  <span
                                    class="inline-block float-left whitespace-nowrap"
                                  >{{ submainItemDate.postDate }}</span>
                                </div>
                                <div
                                  class="text-gray-1200 w-5/12 table-td-child-innerchild-td table-chide-td-w-42 pl-1 overflow-hidden relative has-tooltip"
                                >
                                  <span class="whitespace-nowrap relative">
                                    {{
                                    submainItemDate.postDateFileName
                                    | urlLimit
                                    }}
                                    <span
                                      v-if="
                                        submainItemDate.postDateFileName
                                          .length > 26
                                      "
                                      class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl child-tooltip"
                                    >{{ submainItemDate.postDateFileName }}</span>
                                  </span>
                                </div>
                                <div
                                  class="text-gray-1200 w-1/12 table-td-child-innerchild-td pl-6 table-th-w overflow-hidden"
                                >
                                  <span
                                    class="whitespace-nowrap"
                                  >{{ submainItemDate.postDateLatestUpdate }}</span>
                                </div>
                                <div
                                  class="text-gray-1200 w-1/12 table-td-child-innerchild-td pl-14 table-th-w overflow-hidden"
                                >
                                  <span class="whitespace-nowrap">{{ submainItemDate.postDateSize }}</span>
                                </div>
                                <div
                                  class="text-gray-1200 w-1/12 table-td-child-innerchild-td pl-5 table-download-w 2xl:pl-7 overflow-hidden align sticky right-0 bg-green-1200 z-10"
                                >
                                  <a :href="submainItemDate.postDateDownloadPDF" title="Download">
                                    <div
                                      class="flex flex-row flex-nowrap items-center space-x-1 overflow-hidden"
                                    >
                                      <span
                                        class="whitespace-nowrap"
                                      >{{ submainItemDate.postDateDownload }}</span>
                                      <img
                                        class="inline-block w-4 h-5 ml-1"
                                        :src="download"
                                        alt="download"
                                      />
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <bulk-download></bulk-download>
      </div>
    </transition>
    <!-- Small Device -->
    <div class="md:hidden p-2 mobile-home_page_height">
      <transition name="page">
        <div class="content flex flex-col h-full">
          <div class="flex-grow overflow-y-auto h-full">
            <div class="flex flex-col overflow-y-auto scroll space-y-2 pt-4 relative h-full">
              <div class="overflow-hidden bg-white rounded-2xl flex flex-col h-full">
                <div class="card-header">
                  <h3 class="text-white text-md font-bold">Social Media</h3>
                </div>
                <div class="scroll card-body h-full py-0">
                  <div class="table-wrapper h-full table-th-min-width py-0">
                    <div
                      class="flex flex-row items-center justify-start px-2 pb-2 w-full sticky top-0 bg-white z-20 py-2"
                    >
                      <div
                        class="w-4/12 text-green-1100 table-th mobile-table-th-w overflow-hidden"
                      >
                        <strong class="whitespace-nowrap font-normal">Source</strong>
                      </div>
                      <div class="w-2/12 text-green-1100 table-th mobile-table-th-w">
                        <strong>Group</strong>
                      </div>
                      <div
                        class="text-green-1100 w-3/12 table-th overflow-hidden mobile-table-th-w"
                      >
                        <strong class="whitespace-nowrap font-normal">Name</strong>
                      </div>
                      <div
                        class="text-green-1100 w-2/12 table-th overflow-hidden mobile-table-th-size-w"
                      >
                        <strong class="whitespace-nowrap font-normal">Size</strong>
                      </div>
                      <div
                        class="text-green-1100 w-3/12 table-th overflow-hidden mobile-table-th-size-w"
                      >
                        <strong class="float-right whitespace-nowrap font-normal">Download</strong>
                      </div>
                    </div>
                    <div v-if="tempArray.length > 0" class="body w-full">
                      <div
                        v-for="(mainItem, mainIndex) in tempArray"
                        :key="mainIndex + 'down-small'"
                        class="flex flex-col px-2 py-2 border-t border-green-1100 w-full"
                      >
                        <div class="flex flex-row flex-nowrap">
                          <div
                            class="text-gray-1200 w-4/12 cursor-pointer table-td overflow-hidden mobile-table-th-w"
                            @click="
                              twitterExpand(mainIndex, mainItem.showAllYears)
                            "
                          >
                            <div class="flex flex-row relative has-tooltip">
                              <facebook-icon
                                v-if="
                                  mainItem.provider === 'Facebook' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-4 h-4 mt-1 border border-gray-400"
                              ></facebook-icon>
                              <instagram-icon
                                v-if="
                                  mainItem.provider === 'Instagram' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-4 h-4 mt-1 border border-gray-400"
                              ></instagram-icon>
                              <twitter-icon
                                v-if="
                                  mainItem.provider === 'Twitter' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-4 h-4 mt-1 border border-gray-400"
                              ></twitter-icon>
                              <linkedin-icon
                                v-if="
                                  mainItem.provider === 'LinkedIn' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-4 h-4 mt-1 border border-gray-400"
                              ></linkedin-icon>
                              <microsoft-icon
                                v-if="
                                  mainItem.provider === 'Microsoft' &&
                                  !mainItem.profilePic
                                "
                                class="inline-block w-4 h-4 mt-1 rounded-full border border-gray-400"
                              ></microsoft-icon>
                              <img
                                v-if="mainItem.profilePic"
                                class="inline-block w-4 h-4 mt-1 rounded-full border border-gray-400"
                                :src="mainItem.profilePic"
                                :alt="`${mainItem.username}'s ${mainItem.provider} Profile Picture`"
                              />
                              <span class="whitespace-nowrap ml-1">
                                {{
                                mainItem.provider | textLimit
                                }}
                              </span>
                              <span
                                v-if="mainItem.provider.length > 10"
                                class="tooltip"
                                :class="
                                  mainIndex > tempArray.length - 3
                                    ? 'tooltip1'
                                    : ''
                                "
                              >{{ mainItem.provider }}</span>
                            </div>
                          </div>
                          <div
                            class="w-2/12 text-gray-1200 table-td relative has-tooltip mobile-table-th-w"
                          >
                            <span>{{ mainItem.groupName | textLimit }}</span>
                            <span
                              v-if="mainItem.groupName.length > 10"
                              class="tooltip w-34"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.groupName }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-3/12 table-td relative has-tooltip mobile-table-th-w"
                          >
                            <span class="whitespace-nowrap">
                              {{
                              mainItem.name | textLimit
                              }}
                            </span>
                            <span
                              v-if="mainItem.name.length > 10"
                              class="tooltip w-34"
                              :class="
                                mainIndex > tempArray.length - 3
                                  ? 'tooltip1'
                                  : ''
                              "
                            >{{ mainItem.name }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-2/12 table-td overflow-hidden mobile-table-th-size-w"
                          >
                            <span class="whitespace-nowrap">{{ mainItem.fileSize }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-3/12 table-td overflow-hidden mobile-table-th-size-w"
                          >
                            <a class="float-right">
                              <fa
                                class="text-xl w-3 h-4 cursor-pointer text-green-1100"
                                :icon="['fas', 'download']"
                                @click="bulkDownload(mainItem.id, $event)"
                              />
                            </a>
                          </div>
                        </div>
                        <div
                          v-if="
                            mainItem.showAllYears &&
                            Object.values(mainItem.yearOfArchive).length
                          "
                          class="bg-green-1200 rounded-2xl py-1"
                        >
                          <div
                            v-for="(submainItem, submainIndex) in Object.values(
                              mainItem.yearOfArchive
                            )"
                            :key="submainIndex + 'year-sm'"
                            class="table-td-child-body_wrapper"
                          >
                            <div class="flex flex-row">
                              <div
                                class="text-gray-1200 w-7/12 space-x-1 table-td-child-td mobile-table-th-w-20 flex flex-row items-center space-x-1"
                              >
                                <div class="table-td-child-td-pointer overflow-hidden relative">
                                  <fa
                                    class="text-white w-4 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    :icon="[
                                      'fas',
                                      submainItem.showDateExpand &&
                                      submainItem.subItemsDate.length
                                        ? 'minus'
                                        : 'plus',
                                    ]"
                                    @click="
                                      extandedSourceTime(
                                        mainIndex,
                                        submainIndex,
                                        submainItem.showDateExpand
                                      )
                                    "
                                  />
                                </div>
                                <span class="inline-block whitespace-nowrap">
                                  {{
                                  Object.keys(mainItem.yearOfArchive)[
                                  submainIndex
                                  ]
                                  }}
                                </span>
                              </div>
                              <div class="text-gray-1200 w-2/12 table-td-child-td overflow-hidden">
                                <span class="whitespace-nowrap">{{ submainItem.fileSize }}</span>
                              </div>
                              <div class="text-gray-1200 w-3/12 table-td-child-td overflow-hidden">
                                <a class="float-right">
                                  <fa
                                    class="text-xl w-3 h-4 cursor-pointer text-green-1100"
                                    :icon="['fas', 'download']"
                                    @click="
                                      bulkDownload(submainItem.id, $event)
                                    "
                                  />
                                </a>
                              </div>
                            </div>
                            <div
                              v-if="
                                submainItem.showDateExpand &&
                                submainItem.subItemsDate.length
                              "
                            >
                              <div
                                v-for="(
                                  submainItemDate, submainDateIndex
                                ) in submainItem.subItemsDate"
                                :key="submainDateIndex + 'date-sm'"
                                class="table-td-child-innerchild_wrapper"
                              >
                                <div class="flex flex-row">
                                  <div
                                    class="text-gray-1200 w-7/12 flex items-center space-x-1 pl-2.5 table-td-child-innerchild-td mobile-table-th-w-20 overflow-hidden"
                                  >
                                    <div class="table-td-child-innerchild-td-pointer"></div>
                                    <span class="inline-block float-left whitespace-nowrap">
                                      <DateTime
                                        :datetime="submainItemDate.createdAt"
                                        format="MMMM D, YYYY"
                                        class="table-span"
                                      />
                                    </span>
                                  </div>
                                  <div
                                    class="text-gray-1200 w-2/12 table-td-child-innerchild-td overflow-hidden mr-2"
                                  >
                                    <span class="whitespace-nowrap">{{ submainItemDate.fileSize }}</span>
                                  </div>
                                  <div
                                    class="text-gray-1200 w-3/12 table-td-child-innerchild-td overflow-hidden"
                                  >
                                    <a class="float-right">
                                      <fa
                                        class="text-xl w-3 h-4 cursor-pointer text-green-1100"
                                        :icon="['fas', 'download']"
                                        @click="
                                          bulkDownload(
                                            submainItemDate.id,
                                            $event
                                          )
                                        "
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="w-full no-data-found flex justify-center items-center">
                      <span class="text-md text-green-1300">No data found</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="betaVersion"
                class="overflow-hidden bg-white rounded-2xl flex flex-col h-1/2"
              >
                <div class="card-header">
                  <h3 class="text-white text-lg font-bold">Website</h3>
                </div>
                <div class="scroll card-body h-full py-0">
                  <div class="table-wrapper table-th-min-width">
                    <div
                      class="flex flex-row items-center justify-start px-2 pb-2 w-full sticky top-0 bg-white z-20 py-2"
                    >
                      <div
                        class="text-green-1100 w-4/12 table-th mobile-table-th-w overflow-hidden"
                      >
                        <strong class="whitespace-nowrap font-normal">URL</strong>
                      </div>
                      <div class="text-green-1100 w-1/12 table-th">
                        <strong>Group</strong>
                      </div>
                      <div
                        class="text-green-1100 w-3/12 table-th mobile-table-th-w overflow-hidden"
                      >
                        <strong class="whitespace-nowrap font-normal">Name</strong>
                      </div>
                      <div
                        class="text-green-1100 w-2/12 table-th mobile-table-th-size-w overflow-hidden"
                      >
                        <strong class="whitespace-nowrap font-normal">Size</strong>
                      </div>
                      <div
                        class="text-green-1100 w-3/12 table-th float-right overflow-hidden mobile-table-th-size-w"
                      >
                        <strong class="float-right whitespace-nowrap font-normal">Download</strong>
                      </div>
                    </div>
                    <div class="body w-full">
                      <div
                        v-for="(mainItem, mainIndex) in tempWebArray"
                        :key="mainIndex + 'down-sm'"
                        class="flex flex-col px-2 w-full py-2 border-t border-green-1100"
                      >
                        <div class="flex flex-row flex-nowrap">
                          <div
                            class="text-gray-1200 w-4/12 cursor-pointer table-td relative has-tooltip mobile-table-th-w"
                            @click="
                              websiteExpand(mainIndex, mainItem.showAllYears)
                            "
                          >
                            <div class="flex flex-row">
                              <img
                                class="inline-block w-4 h-4 text-green-1100 mt-1"
                                :src="mainItem.urlIcon"
                                alt="twitter"
                              />
                              <span class="whitespace-nowrap ml-1">
                                {{ mainItem.url | textLimit }}
                                <span
                                  v-if="mainItem.url.length > 10"
                                  class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                                >{{ mainItem.url }}</span>
                              </span>
                            </div>
                          </div>
                          <div class="text-gray-1200 w-1/12 table-td">
                            <span>{{ mainItem.group }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-3/12 table-td relative has-tooltip mobile-table-th-w"
                          >
                            <span class="whitespace-nowrap">
                              {{ mainItem.name | textLimit }}
                              <span
                                v-if="mainItem.name.length > 10"
                                class="whitespace-nowrap absolute bg-green-1100 invisible text-white text-left z-100 rounded-2xl tooltip"
                              >{{ mainItem.name }}</span>
                            </span>
                          </div>

                          <div
                            class="text-gray-1200 w-2/12 table-td overflow-hidden mobile-table-th-size-w"
                          >
                            <span class="whitespace-nowrap">{{ mainItem.size }}</span>
                          </div>
                          <div
                            class="text-gray-1200 w-3/12 table-td overflow-hidden mobile-table-th-size-w"
                          >
                            <a class="float-right" :href="mainItem.download" download>
                              <img
                                class="inline-block w-3 h-4 text-green-1100"
                                :src="download"
                                alt="download"
                              />
                            </a>
                          </div>
                        </div>
                        <div v-if="mainItem.showAllYears" class="bg-green-1200 rounded-2xl py-1">
                          <div
                            v-for="(
                              submainItem, submainIndex
                            ) in mainItem.yearOfSocialInfo"
                            :key="submainIndex + 'year-social-sm'"
                            class="table-td-child-body_wrapper"
                          >
                            <div class="flex flex-row">
                              <div
                                class="text-gray-1200 w-7/12 flex items-center space-x-1 table-td-child-td mobile-table-th-w-20 overflow-hidden"
                              >
                                <div class="table-td-child-td-pointer relative">
                                  <fa
                                    class="text-white w-4 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    :icon="('fas', 'broom')"
                                    @click="
                                      extandedWebsiteTime(
                                        mainIndex,
                                        submainIndex,
                                        submainItem.showDateExpand
                                      )
                                    "
                                  />
                                </div>
                                <span class="inline-block whitespace-nowrap">{{ submainItem.year }}</span>
                              </div>

                              <div class="text-gray-1200 w-2/12 table-td-child-td overflow-hidden">
                                <span class="whitespace-nowrap">{{ submainItem.yearsize }}</span>
                              </div>
                              <div class="text-gray-1200 w-3/12 table-td-child-td overflow-hidden">
                                <a class="float-right" :href="submainItem.yearDownload" download>
                                  <img
                                    class="inline-block w-3 h-4 text-green-1100"
                                    :src="download"
                                    alt="download"
                                  />
                                </a>
                              </div>
                            </div>
                            <div v-if="submainItem.showDateExpand">
                              <div
                                v-for="(
                                  submainItemDate, submainDateIndex
                                ) in submainItem.subItemsDate"
                                :key="submainDateIndex + 'date-social-sm'"
                                class="table-td-child-innerchild_wrapper"
                              >
                                <div class="flex flex-row">
                                  <div
                                    class="text-gray-1200 w-7/12 flex items-center space-x-1 pl-2.5 table-td-child-innerchild-td mobile-table-th-w-20 overflow-hidden"
                                  >
                                    <div class="table-td-child-innerchild-td-pointer"></div>
                                    <span
                                      class="inline-block float-left whitespace-nowrap"
                                    >{{ submainItemDate.postDate }}</span>
                                  </div>
                                  <div
                                    class="text-gray-1200 w-2/12 table-td-child-innerchild-td overflow-hidden"
                                  >
                                    <span
                                      class="whitespace-nowrap"
                                    >{{ submainItemDate.postDateSize }}</span>
                                  </div>
                                  <div
                                    class="text-gray-1200 w-3/12 table-td-child-innerchild-td overflow-hidden"
                                  >
                                    <a
                                      class="float-right"
                                      :href="
                                        submainItemDate.postDateDownloadPDF
                                      "
                                      download
                                    >
                                      <img
                                        class="inline-block w-3 h-4 text-green-1100"
                                        :src="download"
                                        alt="download"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { format, parseISO } from 'date-fns'
import { useBreakpoints } from '@vueuse/core'
import Global from '../assets/img/icon/global.png'
import Download from '../assets/img/icon/download.png'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import SelectInput from '~/components/inputs/SelectInput'
import BulkDownload from '~/components/archive/BulkDownload'
import { LATEST_ARCHIVE, WEBSITES } from '~/constants/urls'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import AllFeedsMenu from '~/components/AllFeedsMenu'
import ExtendPlusIcon from '~/components/shared/icon/ExtendPlusIcon.vue'
import ExtendMinusIcon from '~/components/shared/icon/ExtendMinusIcon.vue'

export default {
  name: 'ArchivePage',
  components: {
    BulkDownload,
    ArchiveSourcesDropdown,
    // eslint-disable-next-line vue/no-unused-components
    SelectInput,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    MicrosoftIcon,
    InstagramIcon,
    VCalenderWithPreset,
    AllFeedsMenu,
    ExtendPlusIcon,
    ExtendMinusIcon,
  },

  filters: {
    urlLimit(value) {
      if (value.length > 26) {
        return value.substring(0, 26) + '...'
      } else {
        return value
      }
    },
    urlLimits(value) {
      if (value.length > 15) {
        return value.substring(0, 15) + '...'
      } else {
        return value
      }
    },
    textLimit(value) {
      if (value.length > 10) {
        return value.substring(0, 10) + '...'
      } else {
        return value
      }
    },
  },
  layout: 'home',
  middleware: ['payment'],
  setup() {
    const breakpoints = useBreakpoints({
      upper: 772,
      lower: 768,
      medium: 1025,
    })
    return {
      isSmall: breakpoints.between('lower', 'upper'),
      medium: breakpoints.greater('medium'),
      tabDevice: breakpoints.greater('lower'),
    }
  },
  data() {
    return {
      right: '20px',
      skew: false,
      toggleSelect: false,
      toggleSelect1: false,
      toggleSelect2: false,
      toggleSelect3: false,
      tempArray: [],
      tempNewArray: [],
      websiteInfo: [],
      tempWebArray: [],
      global: Global,
      download: Download,
      selectedSources: 'Source',
      selectedGroups: 'Group',
      selectedNames: 'Name',
      allDates: 'All Dates',
      allFeeds: 'All Feeds',
      startingDate: '',
      socialItemId: '',
      subsocialItemId: '',
      websiteItemId: '',
      subwebsiteItemId: '',
      allExpand: false,
      ab: 'Twitter',
      showBulkDownloadSideBar: false,
      showEditFeed: false,
      downloadProcess: false,
      headerConfig: {
        barColor: 'text-green-1100',
        icon: 'archive',
        iconColor: 'text-green-1100',
        text: 'Archive',
        dropdownMenuColor: 'archive',
        skew: false,
      },
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
      daterangeComponent: false,
      calenderShow: false,
      showAllSocialFeeds: false,
      controlBoxRound: false,
      menuHeight: 0,
    }
  },
  computed: {
    ...mapState(['socialProviders', 'betaVersion']),
    getProviders() {
      return this.socialProviders.filter(
        (element) => element.id !== this.socialProviders.length
      )
    },
    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
    ...mapState('socialFeed', ['allNames', 'allGroups']),
    userAndInfo() {
      return this.$store.getters['archive/getArchiveFeeds']
    },
    allSelectedSource() {
      return this.$store.getters['archive/getSelectedFeeds']
    },
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
    ...mapGetters('archive', ['getCheckFiltering']),
  },
  watch: {
    userAndInfo(data) {
      if (data) {
        this.tempArray = JSON.parse(JSON.stringify(data))
      }
    },
    allSelectedSource(data) {
      if (data) {
        if (this.selectedSources !== 'Source') {
          this.tempArray = JSON.parse(JSON.stringify(data))
        }
      }
    },
    isSmall(data) {
      if (data) {
        this.right = '120px'
      } else {
        this.right = '20px'
      }
    },
    getCheckFiltering(data) {
      if (data) {
        this.allExpand = false
      }
    },
  },
  mounted() {
    this.$store.dispatch('archive/getAllSocialInfo').then((response) => {})
    this.getAllWebsiteInfo()
    this.tempWebArray = this.websiteInfo
    this.tempArray = JSON.parse(JSON.stringify(this.userAndInfo))
    this.setHeaderConfig()
    this.$store.dispatch('mobile/header/showMobileHeader')
    this.$store.dispatch('mobile/header/setArchivePage')
    this.startDate()
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
  },
  methods: {
    resizeWindow() {
      if(this.medium){
      this.menuHeight = window.innerHeight - 146
      }else if(this.tabDevice){
        this.menuHeight = window.innerHeight - 202
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
    setAllFeeds(value) {
      if (value) {
        this.allFeeds = 'All Feeds'
      } else {
        this.allFeeds = 'Select Feeds'
      }
    },
    showBulkDownload($event) {
      this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', true)
      this.$store.commit('SET_SHOW_SIDE_BAR', true)
      $event.stopPropagation()
    },
    setAllFeedsValue() {
      this.selectedSources = 'Source'
      this.selectedGroups = 'Group'
      this.selectedNames = 'Name'
      this.filterTable()
    },
    selectedSource(value) {
      this.selectedSources = value
      this.filterTable()
    },
    selectedGroup(value) {
      this.selectedGroups = value
      this.filterTable()
    },
    selectedName(value) {
      this.selectedNames = value
      this.filterTable()
    },

    startDate() {
      this.dateRange.start = ''
      this.dateRange.end = ''
      this.daterangeComponent = true
    },
    showSkew($event) {
      this.skew = $event
    },
    async bulkDownload(id, $event) {
      this.$toast.clear()
      this.downloadProcess = true
      this.$store.commit('archive/SET_DOWNLOAD_LOADER', true)
      try {
        $event.target.style.color = 'red'
        this.$toast.success('Download is processing', {
          className: ['toasted-bg-archive'],
        })
        const response = await this.$axios({
          url: LATEST_ARCHIVE,
          data: { id },
          method: 'POST',
          responseType: 'blob',
        })
        const contentDisposition = response.headers['content-disposition']
        let fileName = 'unknown'
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          )
          fileName = fileNameMatch[1]
        }
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
        this.downloadProcess = false
        this.$store.commit('archive/SET_DOWNLOAD_LOADER', false)
      } catch (err) {
        this.downloadProcess = false
        this.$store.commit('archive/SET_DOWNLOAD_LOADER', false)
        console.log(err)
      } finally {
        $event.target.style.color = 'rgba(141, 178, 48, var(--tw-text-opacity))'
        this.downloadProcess = false
        this.$store.commit('archive/SET_DOWNLOAD_LOADER', false)
      }
    },

    clearSelectedField() {
      this.$nuxt.$emit('clearDatePicker')
      this.selectedSources = 'Source'
      this.selectedGroups = 'Group'
      this.selectedNames = 'Name'
      this.dateRange.start = ''
      this.dateRange.end = ''
      this.allDates = 'All Dates'
      this.allFeeds = 'All Feeds'
      this.filterTable()
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
    },
    clearAll() {
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
    },
    setHeaderConfig() {
      this.$store.dispatch('mobile/header/setHeaderConfig', this.headerConfig)
    },
    filterTable() {
      this.$store.commit('archive/SET_Selected_Sources', this.selectedSources)
      this.$store.commit('archive/SET_Selected_Groups', this.selectedGroups)
      this.$store.commit('archive/SET_Selected_Names', this.selectedNames)
      this.$store.dispatch('archive/filterUserAndInfo', this.dateRange)
    },
    twitterExpand(index, showAllYears) {
      if (this.allExpand) {
        this.tempArray[index].showAllYears = !showAllYears
        showAllYears = this.tempArray[index].showAllYears
        this.tempNewArray.splice(0, 1)

        if (this.tempNewArray.length === 0) {
          this.allExpand = false
        }
      } else {
        this.socialItemId = index
        this.tempArray.map((item) => {
          item.showAllYears = false
          return item
        })
        this.tempArray[index].showAllYears = !showAllYears
      }
    },
    extandedSourceTime(mainId, id, showDateExpand) {
      if (this.allExpand) {
        Object.values(this.tempArray[mainId].yearOfArchive)[id].showDateExpand =
          !showDateExpand
      } else {
        this.subsocialItemId = id
        Object.values(this.tempArray[mainId].yearOfArchive).map((item) => {
          item.showDateExpand = false
          return item
        })
        Object.values(this.tempArray[mainId].yearOfArchive)[id].showDateExpand =
          !showDateExpand
      }
    },
    async getAllWebsiteInfo() {
      if (this.betaVersion) {
        try {
          const response = await this.$axios.$get(WEBSITES)
          if (response.success) {
            this.websiteInfo = response.data
            this.tempWebArray = response.data
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    websiteExpand(id, showAllYears) {
      if (this.allExpand) {
        this.tempWebArray[id].showAllYears = !showAllYears
      } else {
        this.websiteItemId = id
        this.tempWebArray.map((item) => {
          item.showAllYears = false
          return item
        })
        this.tempWebArray[id].showAllYears = !showAllYears
      }
    },
    extandedWebsiteTime(mainId, id, showDateExpand) {
      if (this.allExpand) {
        this.tempWebArray[mainId].yearOfArchive[id].showDateExpand =
          !showDateExpand
      } else {
        this.subwebsiteItemId = id
        this.tempWebArray[mainId].yearOfArchive.map((item) => {
          item.showDateExpand = false
          return item
        })
        this.tempWebArray[mainId].yearOfArchive[id].showDateExpand =
          !showDateExpand
      }
    },
    expandAll() {
      this.allExpand = !this.allExpand
      if (this.allExpand) {
        this.$store.commit('archive/SET_IS_FILTERING', false)
        this.tempArray.map((item) => {
          item.showAllYears = true
          if (Object.keys(item.yearOfArchive).length !== 0) {
            this.tempNewArray.push(item.id)
          }
          Object.values(item.yearOfArchive).map((item) => {
            item.showDateExpand = true
            return item
          })
          return item
        })
        this.tempWebArray.map((item) => {
          item.showAllYears = true
          item.yearOfArchive.map((item) => {
            item.showDateExpand = true
            return item
          })
          return item
        })
      } else if (!this.allExpand) {
        this.tempNewArray = []
        this.tempArray.map((item) => {
          item.showAllYears = false
          Object.values(item.yearOfArchive).map((item) => {
            item.showDateExpand = false
            return item
          })
          return item
        })
        this.tempWebArray.map((item) => {
          item.showAllYears = false
          item.yearOfArchive.map((item) => {
            item.showDateExpand = false
            return item
          })
          return item
        })
      }
    },

    pastMonthDateRageEvent(daterange) {
      this.dateRange.start = daterange.start
      this.dateRange.end = daterange.end
      this.allDates = this.convertDateTime(daterange.start, daterange.end)
      this.filterTable()
    },
    convertDateTime(start, end) {
      return (
        format(parseISO(start), this.globalDateformat) +
        ' - ' +
        format(parseISO(end), this.globalDateformat)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.header_wrapper {
  @apply flex flex-row justify-between;
}

.filter_wrapper {
  @apply flex flex-row flex-wrap md:justify-end;
}

@media (max-width: 1024px) {
  .header_wrapper {
    display: flex;
    flex-direction: column;
  }
  .filter_wrapper {
    margin-top: 16px;
    // @apply justify-start;
  }
}

.card-wrapper {
  @apply overflow-y-auto;
  height: 100%;
}

.page-content {
  transition: margin 0.5s;
}

.grid {
  height: 750px;
}

.main-content1 {
  // height: calc(100vh - 162px);
  @apply grid grid-cols-12 lg:grid-cols-12 gap-4 w-full;
  height: 100%;
}

.card {
  @apply bg-white rounded-3xl overflow-hidden flex flex-col h-full;
}

.card-header {
  @apply md:font-normal font-semibold bg-green-1100 text-center py-2 md:rounded-t-2xl;
}

.card-body {
  @apply bg-white md:pb-2 md:px-0 md:pt-0 px-0 rounded-b-2xl h-full;
}

.allFeeds_wrapper {
  @apply lg:w-46 md:w-38 mx-1 md:mb-4 lg:mb-4 lg:mt-0 rounded-full;
}
.allFeeds_ul_wrapper {
  box-shadow: 0px 4px 6px #00000080;
}
.allFeeds_wrapper ul {
  width: 368px;
  // max-height: 320px;
  max-height: var(--height);
}

.source_wrapper {
  @apply lg:w-46 md:w-38 mx-1 md:my-4 lg:mb-4 lg:mt-0 rounded-full;
}

.group_wrapper {
  @apply lg:w-46 md:w-38 mx-1 md:my-4 lg:mb-4 lg:mt-0 rounded-full;
}

.name_wrapper {
  @apply lg:w-46 md:w-38 mx-1 md:mb-4 lg:mb-4 lg:mt-0 rounded-full;
}

.input {
  color: #f8f8f8;
  @apply relative bg-green-1100;
  select {
    color: #f8f8f8;
    border-radius: 50%;
    @apply w-full py-1.5 px-4 focus:outline-none font-bold cursor-pointer bg-green-1100;
    -webkit-appearance: none;
    -moz-appearance: none;
    option {
      @apply font-semibold;
      // }
      &:focus,
      &:checked,
      &:hover {
        color: white;
        background-color: #8db230 !important;
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
    @apply absolute right-3 pointer-events-none;
    svg {
      @apply text-3xl;
    }
    padding-left: 2px !important;
  }
}

.filter_button {
  @apply lg:w-44 md:w-36
  h-10
  text-green-1100
  bg-white
  rounded-full
  mx-1
  md:mb-4 lg:mb-4 lg:mt-0
  border-none
  outline-none text-md
  font-bold
  cursor-pointer;
}

.plus_button {
  @apply w-10
  h-10
  bg-green-1100
  rounded-full
  mx-1
  md:mb-4 lg:mb-4 lg:mt-0
  cursor-pointer;
}

.clear_button {
  @apply flex justify-center items-center w-10
  h-10
  bg-green-1100
  rounded-full
  mx-1
  md:mb-4 lg:mb-4 lg:mt-0
  cursor-pointer;
}

.calender_button {
  @apply flex justify-center items-center w-10
  h-10
  bg-green-1100
  rounded-full
  mx-1
  md:my-4 lg:mb-4 lg:mt-0
  cursor-pointer;
}

.bulk-download_button {
  @apply lg:w-44 md:w-36
  h-10
  text-white
  bg-green-1100
  rounded-full
  mx-1
  md:mb-4 lg:mb-4 lg:mt-0
  border-none
  outline-none text-md
  font-bold;
}

.table-th {
  @apply md:font-bold text-left break-all md:text-lg text-md;
}
.table-w-152 {
  min-width: 96rem; //92 //162 //130 //112
}
.table-th-w {
  min-width: 16rem;
}
.table-th-w-13 {
  min-width: 13rem;
}
.table-th-w-24 {
  min-width: 24rem;
}
.table-download-w {
  min-width: 10rem;
}
.table-download-wd {
  min-width: 12rem;
}
.table-th-w-16 {
  min-width: 20rem;
}
.mobile-table-th-w {
  min-width: 10rem;
}
.mobile-table-th-w-20 {
  min-width: 29.6rem;
}
.mobile-table-th-size-w {
  min-width: 6rem;
}
.table-th-min-width {
  min-width: 43rem;
}
.table-td {
  @apply font-normal text-left break-all md:text-xl text-md;
}
.table-td-w-16 {
  min-width: 20rem;
}
.table-td-child-body_wrapper {
  @apply flex flex-col md:px-2.5 md:py-1 py-1 px-2 transition-all duration-500 ease-in-out;
}
.table-child-body {
  min-width: 92rem; //161 //129 //111
}
.table-td-child-td {
  @apply text-left break-all md:text-lg text-sm;
}
.table-chide-td-w-40 {
  min-width: 35rem; //63 //47
}
.table-chide-td-w-42 {
  min-width: 20rem; //55 // 39
}
.table-td-child-td-pointer {
  @apply md:w-5 md:h-5 w-4 h-4 rounded-full bg-blue-300 text-center pt-0 inline-block md:text-sm text-xs;
}

.social-pointer {
  @apply md:pt-px;
}

.table-td-child-innerchild_wrapper {
  @apply flex flex-col
  py-1
  transition-all
  duration-500
  ease-in-out;
}

.table-td-child-innerchild-td {
  @apply text-left
  break-all
  md:text-lg text-sm;
}
// .a:hover .b{
//   display: inline-block;
//   z-index: 999999999999999999999;
// }
.table-td-child-innerchild-td-pointer {
  @apply md:w-5
  md:h-5 w-4 h-4
  rounded-full
  bg-blue-300
  inline-block
  float-left;
}
// .align {
//   text-align: center;
// }

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

.balance__menu {
  width: 16rem;
}

.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

//Small Device
.mobile-home_page_height {
  height: 100%;
  position: relative;
  padding-top: 60px;
}

.tooltip {
  @apply invisible 
  whitespace-normal
  break-all 
  absolute 
  bg-green-1100 
  text-white 
  text-left
  z-100
  rounded-2xl
  left-0
  md:px-2 py-0.5
  px-4 
  shadow-lg;
}
.sub-tooltip {
  @apply invisible md:h-7 overflow-y-auto
  whitespace-normal
  break-all 
  absolute 
  bg-green-1100 
  text-white 
  text-left
  z-100
  rounded-2xl
  left-0
  top-0
  md:px-2 md:py-1.5
  px-4 py-0
  shadow-3xl;
}

.has-tooltip:hover .sub-tooltip {
  @apply visible;
  transition: all 0.3s linear;
}

.has-tooltip:hover .tooltip {
  top: -30px;
  @apply visible;
  transition: all 0.3s linear;
}
.has-tooltip:hover .child-tooltip {
  @apply visible;
  left: 50px;
  top: 0px;
  padding: 3px 10px;
}
.tooltip1 {
  // bottom: 100%;
}
.has-tooltip:hover .tooltip1 {
  @apply visible;
  transition: all 0.3s linear;
}

.no-data-found {
  height: calc(100% - 60px);
}

//Small Device
@media (max-width: 767px) {
  .table-td-child-innerchild-td img,
  .table-td-child-body_wrapper img {
    @apply text-green-1100;
  }
  .card {
    height: 100%;
  }

  .no-data-found {
    height: calc(100% - 40px);
  }
}
[data-title]:after {
  color: #5f822d;
  right: 100%;
  z-index: 99999999;
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
title:after {
  color: #bb8b28;
  left: 100%;
  z-index: 9999999999;
  line-height: 18px;
}
.max-height-320 {
  // max-height: 320px;
  max-height: var(--height);
}
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
  border-bottom-color: #8db230;
  border-top: 0;
  margin-left: -10px;
  margin-top: 4px;
  display: block;
}
.scroll-x {
  overflow-x: hidden !important;
}
@media (min-width: 768px) and (max-width: 924px) {
  .calender_right {
    right: -102px;
  }
  .right-130 {
    right: -130%;
  }
  .arrow {
    left: 30px;
  }
}
</style>
