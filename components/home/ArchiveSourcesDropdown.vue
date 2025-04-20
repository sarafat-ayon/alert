<template>
  <div ref="nested shadow" class="balance__menu relative font-serif">
    <div
      ref="dropdown"
      class="
        dropdown-btn
        bg-yellow-primary
        transition-border-radius
        duration-500
        rounded-t-3xl
        outline-none
      "
      :class="[`${source}`, round ? 'rounded-3xl' : '']"
    >
      <button
        class="w-11/12 text-left border-none outline-none"
        @click="
          expand($event)
          groupFeedByType()
        "
      >
        <span class="text-lg font-bold font-sans">Feeds</span>
      </button>
      <svg
        v-if="!menuOpen"
        width="15"
        height="15"
        class="
          fill-current
          text-gray-default
          transition-all
          duration-300
          ease-in-out
          cursor-pointer
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 292.362 292.362"
        @click="
          expand($event)
          groupFeedByType()
        "
      >
        <path
          d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
    C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
    s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
        />
      </svg>
      <svg
        v-else
        width="15"
        height="15"
        class="
          fill-current
          text-gray-default
          transition-all
          duration-300
          ease-in-out
          cursor-pointer
          z-100
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        @click.stop="showAddFeedsComp"
      >
        <path
          fill-rule="evenodd"
          d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
        />
      </svg>
    </div>
    <!-- Desktop -->
    <div
      class="
        hidden
        md:flex
        dropdown
        fixed
        flex-col
        rounded-b-3xl
        bg-yellow-primary
      "
      :style="[
        menuOpen && menuHeight ? { '--height': `${40 + 40 + 40}px` } : '',
        menuOpen && socialType
          ? { '--height': `${socialPage.length * 42 + 40 + 40 + 40}px` }
          : '',
        menuOpen && emailType
          ? { '--height': `${emailPage.length * 42 + 40 + 40 + 40}px` }
          : '',
      ]"
      :class="[increaseHeight ? 'expand' : '', `${source}`]"
    >
      <div class="menu-wrapper flex-grow relative">
        <div class="menu-content">
          <div class="menu-item list-wrapper">
            <div>
              <div
                class="
                  list-item
                  cursor-pointer
                  flex
                  border-b border-b-0
                  group-archive
                "
                :class="[`group-archive__${source}`]"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    justify-between
                    px-3.5
                    group-archive__name
                    text-lg
                    font-neuton font-bold
                  "
                  @click.stop="expandSocial()"
                >
                  <span class="letter-spacing-1px">Social Media</span>
                  <span v-if="!socialType">
                    <fa class="fa-lg" :icon="['fas', 'caret-down']" />
                  </span>
                  <span v-else>{{ socialFeedsList.length }}</span>
                </div>
                <ul
                  class="
                    list
                    overflow-hidden
                    transition-all
                    duration-500
                    ease-linear
                  "
                  :style="[
                    socialType
                      ? {
                          height: `${socialPage.length * 42}px`,
                          opacity: 1,
                          'transition-delay': '0s',
                        }
                      : { height: '0px', opacity: 0, 'transition-delay': '0s' },
                  ]"
                >
                  <transition-group name="fadeIn" mode="out-in">
                    <template v-if="showFeeds">
                      <li
                        v-for="(listItem, index) in socialPage"
                        :key="index"
                        class="
                          list-item
                          border-b
                          cursor-pointer
                          py-1
                          px-3
                          flex flex-row
                        "
                        :class="[
                          !listItem.backgroundColor
                            ? `__${source}`
                            : `__active_${source}`,
                        ]"
                        @click="
                          selectedFeed(listItem)
                          selectedItem(listItem.id)
                        "
                      >
                        <div
                          class="
                            w-full
                            flex flex-row
                            justify-between
                            items-center
                          "
                        >
                          <div
                            class="w-full flex flex-row items-center space-x-2"
                          >
                            <div
                              class="
                                min-w-7-2
                                w-7.2
                                min-h-7-2
                                h-7.2
                                rounded-full
                                relative
                              "
                              :style="{
                                background: listItem.logoBackgroundColor,
                              }"
                            >
                              <template v-if="!listItem.profilePic">
                                <facebook-icon
                                  v-if="listItem.provider === 'Facebook'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></facebook-icon>
                                <linkedin-icon
                                  v-if="listItem.provider === 'LinkedIn'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></linkedin-icon>
                                <twitter-icon
                                  v-if="listItem.provider === 'Twitter'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></twitter-icon>
                                <instagram-icon
                                  v-if="listItem.provider === 'Instagram'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></instagram-icon>
                              </template>
                              <img
                                v-else
                                class="
                                  min-w-7-2
                                  w-7.2
                                  min-h-7-2
                                  h-7.2
                                  rounded-full
                                "
                                :src="listItem.profilePic"
                                :alt="`${setNameOrUsername(
                                  listItem
                                )} Profile Picture`"
                              />
                              <template>
                                <facebook-icon
                                  v-if="listItem.provider === 'Facebook'"
                                  class="social-icon"
                                ></facebook-icon>
                                <linkedin-icon
                                  v-if="listItem.provider === 'LinkedIn'"
                                  class="social-icon"
                                ></linkedin-icon>
                                <twitter-icon
                                  v-if="listItem.provider === 'Twitter'"
                                  class="social-icon"
                                ></twitter-icon>
                                <instagram-icon
                                  v-if="listItem.provider === 'Instagram'"
                                  class="social-icon"
                                ></instagram-icon>
                                <img
                                  v-if="listItem.provider === 'YouTube'"
                                  class="social-icon"
                                  :src="YoutubeIcon"
                                  alt="Youtube Circle Icon"
                                />
                              </template>
                            </div>
                            <div class="list-inner-width flex flex-col">
                              <div class="relative has-tooltip">
                                <p
                                  class="
                                    text-md
                                    line-height
                                    font-sans
                                    line-clamp-1
                                    text-color text-normal
                                  "
                                >
                                  {{ setNameOrUsername(listItem) }}
                                </p>
                                <span
                                  v-if="setNameOrUsername(listItem).length > 17"
                                  class="
                                    break-words
                                    absolute
                                    bg-white
                                    invisible
                                    text-left
                                    z-100
                                    rounded-2xl
                                    tooltip
                                    text-md text-orange-dark text-normal
                                  "
                                  :class="[
                                    `username__${source}`,
                                    socialPage.length - 1 === index
                                      ? '-top-10'
                                      : index === 0
                                      ? 'top-3'
                                      : '-top-5',
                                  ]"
                                  >{{ setNameOrUsername(listItem) }}</span
                                >
                              </div>
                              <div
                                class="
                                  w-full
                                  flex flex-row
                                  justify-between
                                  pr-0.5
                                "
                              >
                                <div
                                  class="username-width relative has-tooltip"
                                >
                                  <p
                                    class="
                                      text-xs
                                      font-sans
                                      username-clamp
                                      text-color text-normal
                                    "
                                  >
                                    {{ listItem.username | atSignUsername }}
                                  </p>
                                  <span
                                    v-if="listItem.username.length > 14"
                                    class="
                                      absolute
                                      bg-white
                                      invisible
                                      text-left
                                      z-100
                                      rounded-2xl
                                      tooltip
                                      text-md text-orange-dark text-normal
                                    "
                                    :class="[
                                      `username__${source}`,
                                      socialPage.length - 1 === index
                                        ? '-top-10'
                                        : index === 0
                                        ? 'top-3'
                                        : '-top-5',
                                      listItem.username.length > 40
                                        ? 'break-all'
                                        : 'break-words ',
                                    ]"
                                    >{{
                                      listItem.username | atSignUsername
                                    }}</span
                                  >
                                </div>
                                <span class="text-xs font-sans text-normal"
                                  >{{
                                    listItem.dateJoined | diffForHumans
                                  }}
                                  ago</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </transition-group>
                </ul>
                <div
                  class="
                    flex flex-row
                    items-center
                    justify-between
                    px-3.5
                    group-archive__name
                    font-neuton font-bold
                  "
                  @click.stop="expandEmail()"
                >
                  <span class="letter-spacing-1px">Email</span>
                  <span v-if="!emailType">
                    <fa class="fa-lg" :icon="['fas', 'caret-down']" />
                  </span>
                  <span v-else>{{ emailFeedsList.length }}</span>
                </div>
                <ul
                  class="
                    list
                    overflow-hidden
                    transition-all
                    duration-500
                    ease-in-out
                  "
                  :style="[
                    emailType
                      ? {
                          height: `${emailPage.length * 42}px`,
                          opacity: 1,
                          'transition-delay': '-140ms',
                        }
                      : {
                          height: '0px',
                          opacity: 0,
                          'transition-delay': '140ms',
                        },
                  ]"
                >
                  <transition-group name="fadeIn" mode="out-in">
                    <template v-if="showFeeds">
                      <li
                        v-for="(listItem, index) in emailPage"
                        :key="index"
                        class="
                          list-item
                          border-b
                          cursor-pointer
                          py-1
                          px-3
                          flex flex-row
                        "
                        :class="[
                          !listItem.backgroundColor
                            ? `__${source}`
                            : `__active_${source}`,
                        ]"
                        @click="
                          selectedFeed(listItem)
                          selectedItem(listItem.id)
                        "
                      >
                        <div
                          class="
                            w-full
                            flex flex-row
                            justify-between
                            items-center
                          "
                        >
                          <div
                            class="w-full flex flex-row items-center space-x-2"
                          >
                            <div
                              class="
                                min-w-7-2
                                w-7.2
                                min-h-7-2
                                h-7.2
                                rounded-full
                                relative
                              "
                              :style="{
                                background: listItem.logoBackgroundColor,
                              }"
                            >
                              <template v-if="!listItem.profilePic">
                                <microsoft-icon
                                  v-if="listItem.provider === 'Microsoft'"
                                  class="
                                    min-w-7-2
                                    w-7.2
                                    min-h-7-2
                                    h-7.2
                                    rounded-full
                                  "
                                ></microsoft-icon>
                              </template>
                              <img
                                v-else
                                class="
                                  min-w-7-2
                                  w-7.2
                                  min-h-7-2
                                  h-7.2
                                  rounded-full
                                "
                                :src="listItem.profilePic"
                                :alt="`${setNameOrUsername(
                                  listItem
                                )} Profile Picture`"
                              />
                              <template>
                                <div
                                  v-if="listItem.provider === 'Google'"
                                  class="mail-icon-wrapper"
                                >
                                  <img
                                    class="w-2 h-2"
                                    :src="GoogleIcon"
                                    alt="Youtube Circle Icon"
                                  />
                                </div>
                                <div
                                  v-if="listItem.provider === 'Microsoft'"
                                  class="mail-icon-wrapper"
                                >
                                  <microsoft-icon
                                    class="w-2 h-2"
                                  ></microsoft-icon>
                                </div>
                              </template>
                            </div>
                            <div class="list-inner-width flex flex-col">
                              <div class="relative has-tooltip">
                                <p
                                  class="
                                    text-md
                                    line-height
                                    font-sans
                                    line-clamp-1
                                    text-color text-normal
                                  "
                                >
                                  {{ setNameOrUsername(listItem) }}
                                </p>
                                <span
                                  v-if="setNameOrUsername(listItem).length > 17"
                                  class="
                                    break-words
                                    absolute
                                    bg-white
                                    invisible
                                    text-left
                                    z-100
                                    rounded-2xl
                                    tooltip
                                    text-md text-orange-dark text-normal
                                  "
                                  :class="[
                                    `username__${source}`,
                                    emailPage.length - 1 === index
                                      ? '-top-10'
                                      : index === 0
                                      ? 'top-3'
                                      : '-top-5',
                                  ]"
                                  >{{ setNameOrUsername(listItem) }}</span
                                >
                              </div>
                              <div
                                class="
                                  w-full
                                  flex flex-row
                                  justify-between
                                  pr-0.5
                                "
                              >
                                <div
                                  class="username-width relative has-tooltip"
                                >
                                  <p
                                    class="
                                      text-xs
                                      font-sans
                                      username-clamp
                                      text-color text-normal
                                    "
                                  >
                                    {{ listItem.username | atSignUsername }}
                                  </p>
                                  <span
                                    v-if="listItem.username.length > 14"
                                    class="
                                      absolute
                                      bg-white
                                      invisible
                                      text-left
                                      z-100
                                      rounded-2xl
                                      tooltip
                                      text-md text-orange-dark text-normal
                                    "
                                    :class="[
                                      `username__${source}`,
                                      emailPage.length - 1 === index
                                        ? '-top-10'
                                        : index === 0
                                        ? 'top-3'
                                        : '-top-5',
                                      listItem.username.length > 40
                                        ? 'break-all'
                                        : 'break-words ',
                                    ]"
                                    >{{
                                      listItem.username | atSignUsername
                                    }}</span
                                  >
                                </div>
                                <span class="text-xs font-sans text-normal"
                                  >{{
                                    listItem.dateJoined | diffForHumans
                                  }}
                                  ago</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </transition-group>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="(menuOpen && !socialType && !emailType) || totalPages === 1"
        class="equity cursor-pointer sticky bottom-0 left-0"
        :class="[`${source}`]"
        @click="showEditFeed(), hideMobileHaeder()"
      >
        <span class="text-lg text-bold font-sans">Edit Feeds</span>
      </div>
      <div
        v-if="menuOpen && totalPages > 1 && (socialType || emailType)"
        class="equity sticky bottom-0 left-0 flex justify-between"
        :class="[`${source}`]"
      >
        <button
          :disabled="isFirstPage"
          class="flex justify-center items-center w-8 h-8 rounded-full"
          :class="
            isFirstPage
              ? 'bg-white-opasity-50 cursor-default'
              : 'bg-white cursor-pointer'
          "
          @click="clickPreviousPage"
        >
          <fa
            :icon="['fas', 'chevron-left']"
            class="feeds-button"
            :class="[`feeds-button__${source}`]"
          />
        </button>
        <span class="text-lg font-sans text-normal"
          >{{ currentPage }}/{{ totalPages }}</span
        >
        <button
          :disabled="isLastPage"
          class="flex justify-center items-center w-8 h-8 rounded-full"
          :class="
            isLastPage
              ? 'bg-white-opasity-50  cursor-default'
              : 'bg-white cursor-pointer'
          "
          @click="clickNextPage"
        >
          <fa
            :icon="['fas', 'chevron-right']"
            class="feeds-button"
            :class="[`feeds-button__${source}`]"
          />
        </button>
        <span
          class="cursor-pointer"
          @click="showEditFeed(), hideMobileHaeder()"
        >
          <fa :icon="['fas', 'pencil-alt']" />
        </span>
      </div>
    </div>
    <!-- Mobile -->
    <div
      class="md:hidden dropdown flex flex-col rounded-b-3xl bg-yellow-primary"
      :style="[
        { '--maxHeight': `${windowHeight - 130}px` },
        menuOpen && menuHeight ? { '--height': `${40 + 40 + 40}px` } : '',
        menuOpen && socialType
          ? { '--height': `${socialPage.length * 42 + 40 + 40 + 40}px` }
          : '',
        menuOpen && emailType
          ? { '--height': `${emailPage.length * 42 + 40 + 40 + 40}px` }
          : '',
      ]"
      :class="[increaseHeight ? 'expand' : '', `${source}`]"
    >
      <div class="menu-wrapper flex-grow relative">
        <div class="menu-content">
          <div class="menu-item list-wrapper">
            <div>
              <div
                class="
                  list-item
                  cursor-pointer
                  flex
                  border-b border-b-0
                  group-archive
                "
                :class="[`group-archive__${source}`]"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    justify-between
                    px-3.5
                    group-archive__name
                    font-neuton font-bold
                  "
                  @click.stop="expandSocial()"
                >
                  <span class="letter-spacing-1px">Social Media</span>
                  <span v-if="!socialType">
                    <fa class="fa-lg" :icon="['fas', 'caret-down']" />
                  </span>
                  <span v-else>{{ socialFeedsList.length }}</span>
                </div>
                <ul
                  class="
                    list
                    overflow-hidden
                    transition-all
                    duration-500
                    ease-linear
                  "
                  :style="[
                    socialType
                      ? {
                          height: `${socialPage.length * 42}px`,
                          opacity: 1,
                          'transition-delay': '0s',
                        }
                      : { height: '0px', opacity: 0, 'transition-delay': '0s' },
                  ]"
                >
                  <transition-group name="fadeIn" mode="out-in">
                    <template v-if="showFeeds">
                      <li
                        v-for="(listItem, index) in socialPage"
                        :key="index"
                        class="
                          list-item
                          border-b
                          cursor-pointer
                          py-1
                          px-3
                          flex flex-row
                        "
                        :class="[
                          !listItem.backgroundColor
                            ? `__${source}`
                            : `__active_${source}`,
                        ]"
                        @click="
                          selectedFeed(listItem)
                          selectedItem(listItem.id)
                        "
                      >
                        <div
                          class="
                            w-full
                            flex flex-row
                            justify-between
                            items-center
                          "
                        >
                          <div class="w-full flex flex-row items-center">
                            <div
                              class="
                                min-w-7-2
                                w-7.2
                                min-h-7-2
                                h-7.2
                                rounded-full
                                relative
                              "
                              :style="{
                                background: listItem.logoBackgroundColor,
                              }"
                            >
                              <template v-if="!listItem.profilePic">
                                <facebook-icon
                                  v-if="listItem.provider === 'Facebook'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></facebook-icon>
                                <linkedin-icon
                                  v-if="listItem.provider === 'LinkedIn'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></linkedin-icon>
                                <twitter-icon
                                  v-if="listItem.provider === 'Twitter'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></twitter-icon>
                                <instagram-icon
                                  v-if="listItem.provider === 'Instagram'"
                                  class="min-w-7-2 w-7.2 min-h-7-2 h-7.2"
                                ></instagram-icon>
                              </template>
                              <img
                                v-else
                                class="
                                  min-w-7-2
                                  w-7.2
                                  min-h-7-2
                                  h-7.2
                                  rounded-full
                                "
                                :src="listItem.profilePic"
                                :alt="`${setNameOrUsername(
                                  listItem
                                )} Profile Picture`"
                              />
                              <template>
                                <facebook-icon
                                  v-if="listItem.provider === 'Facebook'"
                                  class="social-icon"
                                ></facebook-icon>
                                <linkedin-icon
                                  v-if="listItem.provider === 'LinkedIn'"
                                  class="social-icon"
                                ></linkedin-icon>
                                <twitter-icon
                                  v-if="listItem.provider === 'Twitter'"
                                  class="social-icon"
                                ></twitter-icon>
                                <instagram-icon
                                  v-if="listItem.provider === 'Instagram'"
                                  class="social-icon"
                                ></instagram-icon>
                                <img
                                  v-if="listItem.provider === 'YouTube'"
                                  class="social-icon"
                                  :src="YoutubeIcon"
                                  alt="Youtube Circle Icon"
                                />
                              </template>
                            </div>

                            <div class="pl-2 mobile-inner-width flex flex-col">
                              <div class="relative has-tooltip">
                                <p
                                  class="
                                    text-md
                                    line-height
                                    mobile-clamp
                                    font-sans
                                    text-color text-normal
                                  "
                                >
                                  {{ setNameOrUsername(listItem) }}
                                </p>
                                <span
                                  v-if="setNameOrUsername(listItem).length > 27"
                                  class="
                                    break-words
                                    absolute
                                    bg-white
                                    invisible
                                    text-left
                                    z-100
                                    rounded-2xl
                                    tooltip
                                    text-md text-orange-dark text-normal
                                  "
                                  :class="[
                                    `username__${source}`,
                                    socialPage.length - 1 === index
                                      ? '-top-10'
                                      : index === 0
                                      ? 'top-3'
                                      : '-top-5',
                                  ]"
                                  >{{ setNameOrUsername(listItem) }}</span
                                >
                              </div>

                              <div
                                class="
                                  w-full
                                  flex flex-row
                                  justify-between
                                  pr-0.5
                                "
                              >
                                <div
                                  class="
                                    mobile-username-width
                                    relative
                                    has-tooltip
                                  "
                                >
                                  <p
                                    class="
                                      text-xs
                                      font-sans
                                      mobile-clamp
                                      text-color text-normal
                                    "
                                  >
                                    {{ listItem.username | atSignUsername }}
                                  </p>
                                  <span
                                    v-if="listItem.username.length > 25"
                                    class="
                                      break-words
                                      absolute
                                      bg-white
                                      invisible
                                      text-left
                                      z-100
                                      rounded-2xl
                                      tooltip
                                      text-md text-orange-dark text-normal
                                    "
                                    :class="[
                                      `username__${source}`,
                                      socialPage.length - 1 === index
                                        ? '-top-10'
                                        : index === 0
                                        ? 'top-3'
                                        : '-top-5',
                                      listItem.username.length > 30
                                        ? 'break-all'
                                        : 'break-words ',
                                    ]"
                                    >{{
                                      listItem.username | atSignUsername
                                    }}</span
                                  >
                                </div>
                                <span class="text-xs font-sans text-normal"
                                  >{{
                                    listItem.dateJoined | diffForHumans
                                  }}
                                  ago</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </transition-group>
                </ul>

                <div
                  class="
                    flex flex-row
                    items-center
                    justify-between
                    px-3.5
                    group-archive__name
                    font-neuton font-bold
                  "
                  @click.stop="expandEmail()"
                >
                  <span class="letter-spacing-1px">Email</span>
                  <span v-if="!emailType">
                    <fa class="fa-lg" :icon="['fas', 'caret-down']" />
                  </span>
                  <span v-else>{{ emailFeedsList.length }}</span>
                </div>
                <ul
                  class="
                    list
                    overflow-hidden
                    transition-all
                    duration-500
                    ease-in-out
                  "
                  :style="[
                    emailType
                      ? {
                          height: `${emailPage.length * 42}px`,
                          opacity: 1,
                          'transition-delay': '-140ms',
                        }
                      : {
                          height: '0px',
                          opacity: 0,
                          'transition-delay': '140ms',
                        },
                  ]"
                >
                  <transition-group name="fadeIn" mode="out-in">
                    <template v-if="showFeeds">
                      <li
                        v-for="(listItem, index) in emailPage"
                        :key="index"
                        class="
                          list-item
                          border-b
                          cursor-pointer
                          py-1
                          px-3
                          flex flex-row
                        "
                        :class="[
                          !listItem.backgroundColor
                            ? `__${source}`
                            : `__active_${source}`,
                        ]"
                        @click="
                          selectedFeed(listItem)
                          selectedItem(listItem.id)
                        "
                      >
                        <div
                          class="
                            w-full
                            flex flex-row
                            justify-between
                            items-center
                          "
                        >
                          <div
                            class="w-full flex flex-row items-center space-x-2"
                          >
                            <div
                              class="
                                min-w-7-2
                                w-7.2
                                min-h-7-2
                                h-7.2
                                rounded-full
                                relative
                              "
                              :style="{
                                background: listItem.logoBackgroundColor,
                              }"
                            >
                              <template v-if="!listItem.profilePic">
                                <microsoft-icon
                                  v-if="listItem.provider === 'Microsoft'"
                                  class="
                                    min-w-7-2
                                    w-7.2
                                    min-h-7-2
                                    h-7.2
                                    rounded-full
                                  "
                                ></microsoft-icon>
                              </template>
                              <img
                                v-else
                                class="
                                  min-w-7-2
                                  w-7.2
                                  min-h-7-2
                                  h-7.2
                                  rounded-full
                                "
                                :src="listItem.profilePic"
                                :alt="`${setNameOrUsername(
                                  listItem
                                )} Profile Picture`"
                              />
                              <template>
                                <div
                                  v-if="listItem.provider === 'Google'"
                                  class="mail-icon-wrapper"
                                >
                                  <img
                                    class="w-2 h-2"
                                    :src="GoogleIcon"
                                    alt="Youtube Circle Icon"
                                  />
                                </div>
                                <div
                                  v-if="listItem.provider === 'Microsoft'"
                                  class="mail-icon-wrapper"
                                >
                                  <microsoft-icon
                                    class="w-2 h-2"
                                  ></microsoft-icon>
                                </div>
                              </template>
                            </div>
                            <div class="w-full flex flex-col">
                              <div class="relative has-tooltip">
                                <p
                                  class="
                                    text-md
                                    line-height
                                    mobile-clamp
                                    font-sans
                                    text-color text-normal
                                  "
                                >
                                  {{ setNameOrUsername(listItem) }}
                                </p>
                                <span
                                  v-if="setNameOrUsername(listItem).length > 27"
                                  class="
                                    break-words
                                    absolute
                                    bg-white
                                    invisible
                                    text-left
                                    z-100
                                    rounded-2xl
                                    tooltip
                                    text-md text-orange-dark text-normal
                                  "
                                  :class="[
                                    `username__${source}`,
                                    emailPage.length - 1 === index
                                      ? '-top-10'
                                      : index === 0
                                      ? 'top-3'
                                      : '-top-5',
                                  ]"
                                  >{{ setNameOrUsername(listItem) }}</span
                                >
                              </div>
                              <div
                                class="
                                  w-full
                                  flex flex-row
                                  justify-between
                                  pr-0.5
                                "
                              >
                                <div
                                  class="
                                    mobile-username-width
                                    relative
                                    has-tooltip
                                  "
                                >
                                  <p
                                    class="
                                      text-xs
                                      font-sans
                                      mobile-clamp
                                      text-color text-normal
                                    "
                                  >
                                    {{ listItem.username | atSignUsername }}
                                  </p>
                                  <span
                                    v-if="listItem.username.length > 25"
                                    class="
                                      break-words
                                      absolute
                                      bg-white
                                      invisible
                                      text-left
                                      z-100
                                      rounded-2xl
                                      tooltip
                                      text-md text-orange-dark text-normal
                                    "
                                    :class="[
                                      `username__${source}`,
                                      emailPage.length - 1 === index
                                        ? '-top-10'
                                        : index === 0
                                        ? 'top-3'
                                        : '-top-5',
                                      listItem.username.length > 30
                                        ? 'break-all'
                                        : 'break-words ',
                                    ]"
                                    >{{
                                      listItem.username | atSignUsername
                                    }}</span
                                  >
                                </div>
                                <span class="text-xs font-sans text-normal"
                                  >{{
                                    listItem.dateJoined | diffForHumans
                                  }}
                                  ago</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </transition-group>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="(menuOpen && !socialType && !emailType) || totalPages === 1"
        class="equity cursor-pointer sticky bottom-0 left-0 rounded-b-3xl"
        :class="[`${source}`]"
        @click="showEditFeed(), hideMobileHaeder()"
      >
        <span class="text-lg text-bold font-sans">Edit Feeds</span>
      </div>
      <div
        v-if="menuOpen && totalPages > 1 && (socialType || emailType)"
        class="equity sticky bottom-0 left-0 flex justify-between"
        :class="[`${source}`]"
      >
        <button
          :disabled="isFirstPage"
          class="flex justify-center items-center w-8 h-8 rounded-full"
          :class="
            isFirstPage
              ? 'bg-white-opasity-50 cursor-default'
              : 'bg-white cursor-pointer'
          "
          @click="clickPreviousPage"
        >
          <fa
            :icon="['fas', 'chevron-left']"
            class="feeds-button"
            :class="[`feeds-button__${source}`]"
          />
        </button>
        <span class="text-lg font-sans text-normal"
          >{{ currentPage }}/{{ totalPages }}</span
        >
        <button
          :disabled="isLastPage"
          class="flex justify-center items-center w-8 h-8 rounded-full"
          :class="
            isLastPage
              ? 'bg-white-opasity-50  cursor-default'
              : 'bg-white cursor-pointer'
          "
          @click="clickNextPage"
        >
          <fa
            :icon="['fas', 'chevron-right']"
            class="feeds-button"
            :class="[`feeds-button__${source}`]"
          />
        </button>
        <span
          class="cursor-pointer"
          @click="showEditFeed(), hideMobileHaeder()"
        >
          <fa :icon="['fas', 'pencil-alt']" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
import YoutubeCircleIcon from '~/assets/img/png/youtube_social_circle_white.png'
import GoogleSvgIcon from '~/assets/img/svg/Google__G__Logo.svg'

export default defineComponent({
  name: 'ArchiveSourceDropdown',
  filters: {
    currency(value) {
      const formattedValue = new Intl.NumberFormat().format(Math.abs(value))
      return value >= 0 ? `$${formattedValue}` : `$(${formattedValue})`
    },
  },
  components: {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
    MicrosoftIcon,
  },
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    height: {
      type: Number,
      required: true,
      default: 0,
    },
    source: {
      type: String,
      required: false,
      default: '',
    },
    windowHeight: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const feedBodyHeight = ref(0)
    const breakpoints = useBreakpoints(breakpointsTailwind)
    return {
      feedBodyHeight,
      isDesktop: breakpoints.greater('md'),
    }
  },
  data() {
    return {
      collapse: false,
      menuOpen: false,
      increaseHeight: false,
      toggle: false,
      scroll: false,
      round: true,
      progress: false,
      socialType: false,
      emailType: false,
      socialFeedsList: [],
      emailFeedsList: [],
      initialItem: 0,
      loadCount: this.perPage,
      perPage: 1,
      currentPage: 1,
      totalPages: 1,
      menuHeight: false,
      showFeeds: true,
      YoutubeIcon: YoutubeCircleIcon,
      GoogleIcon: GoogleSvgIcon,
      activeFeed: false,
      social: [],
      email: [],
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
    socialPage: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.social = []
        for (const item of this.socialFeedsList.slice(
          this.initialItem,
          this.loadCount
        )) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.social.push(item)
        }
        return this.social
      },
      set(newValue) {
        this.social = []
        this.social = newValue
      },
    },
    emailPage: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.email = []
        for (const item of this.emailFeedsList.slice(
          this.initialItem,
          this.loadCount
        )) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.email.push(item)
        }
        return this.email
      },
      set(newValue) {
        this.email = []
        this.email = newValue
      },
    },
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  mounted() {
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
  },
  destroyed() {
    setTimeout(() => {
      window.removeEventListener('resize', this.resizeWindow)
    }, 2000)
  },
  methods: {
    selectedItem(item) {
      this.socialFeedsList.forEach((element) => {
        if (element.id === item) {
          element.backgroundColor = true
        } else {
          element.backgroundColor = false
        }
      })
      this.socialPage = this.socialFeedsList
      this.emailFeedsList.forEach((element) => {
        if (element.id === item) {
          element.backgroundColor = true
        } else {
          element.backgroundColor = false
        }
      })
      this.emailPage = this.emailFeedsList
    },
    resizeWindow() {
      if (this.isDesktop) {
        this.feedBodyHeight = window.innerHeight - (60 + 16 + 16)
      } else {
        this.feedBodyHeight = this.windowHeight - 84
      }
      if (this.feedBodyHeight >= 202) {
        this.perPage = Math.floor((this.feedBodyHeight - 40 * 4) / 42)
      } else {
        this.perPage = 1
      }
      this.setTotalPages()
    },
    setTotalPages() {
      this.currentPage = 1
      this.initialItem = 0
      this.loadCount = this.perPage
      if (this.socialType) {
        this.totalPages = Math.ceil(this.socialFeedsList.length / this.perPage)
      }
      if (this.emailType) {
        this.totalPages = Math.ceil(this.emailFeedsList.length / this.perPage)
      }
    },
    clickPreviousPage() {
      this.currentPage -= 1
      this.loadCount = this.initialItem
      this.initialItem -= this.perPage
      this.showFeeds = false
      setTimeout(() => {
        this.showFeeds = true
      }, 500)
      if (this.socialType) {
        this.$emit('define-height', this.socialPage.length * 42 + 40 + 40 + 40)
      } else if (this.emailType) {
        this.$emit('define-height', this.socialPage.length * 42 + 40 + 40 + 40)
      }
    },
    clickNextPage() {
      this.currentPage += 1
      this.initialItem = this.loadCount
      this.loadCount += this.perPage
      this.showFeeds = false
      setTimeout(() => {
        this.showFeeds = true
      }, 500)
      if (this.socialType) {
        this.$emit('define-height', this.socialPage.length * 42 + 40 + 40 + 40)
      } else if (this.emailType) {
        this.$emit('define-height', this.socialPage.length * 42 + 40 + 40 + 40)
      }
    },
    groupFeedByType() {
      this.socialFeedsList = []
      this.emailFeedsList = []
      this.socialType = false
      this.emailType = false
      for (const item of this.socialFeeds) {
        if (item.provider === 'Microsoft' || item.provider === 'Google') {
          this.emailFeedsList.push(item)
        } else {
          this.socialFeedsList.push(item)
        }
      }
    },
    expandSocial() {
      if (!this.socialType && this.emailType) {
        this.emailType = false
        setTimeout(() => {
          this.socialType = true
          this.menuHeight = false
          this.setTotalPages()
          if (this.socialType) {
            this.$emit(
              'define-height',
              this.socialPage.length * 42 + 40 + 40 + 40
            )
          }
        }, 650)
      } else if (!this.socialType) {
        this.socialType = true
        this.$emit('define-height', this.socialPage.length * 42 + 40 + 40 + 40)
        this.menuHeight = false
        setTimeout(() => {
          this.setTotalPages()
        }, 500)
      } else if (this.socialType) {
        this.socialType = false
        setTimeout(() => {
          this.$emit('define-height', 120)
        }, 200)
        if (!this.socialType) {
          this.menuHeight = true
        }
        setTimeout(() => {
          this.setTotalPages()
        }, 500)
      }
    },
    expandEmail() {
      if (this.socialType && !this.emailType) {
        this.socialType = false
        this.menuHeight = true
        setTimeout(() => {
          this.emailType = true
          this.setTotalPages()
          if (this.emailType) {
            this.$emit(
              'define-height',
              this.emailPage.length * 42 + 40 + 40 + 40
            )
          }
        }, 800)
      } else {
        this.emailType = !this.emailType
        if (this.emailType) {
          this.$emit('define-height', this.emailPage.length * 42 + 40 + 40 + 40)
        } else {
          setTimeout(() => {
            this.$emit('define-height', 120)
          }, 200)
        }
        setTimeout(() => {
          this.setTotalPages()
        }, 500)
      }
    },
    selectedFeed(listItem) {
      let username = ''
      if (listItem.provider === 'Facebook') {
        username = listItem.name ? listItem.name : listItem.username
      } else {
        username = listItem.username ? listItem.username : listItem.name
      }
      this.$router.push('/home')
      if (this.showSinglePost || this.showSingleImagePost) {
        setTimeout(() => {
          this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
            provider: listItem.provider,
            username,
            id: listItem.id,
            selectedFeed: listItem,
          })
          this.$store.commit('home/SET_TEMP_ARRAY', [])
          this.$store.commit('socialFeed/SET_SHOW_TWITTER', true)
        }, 305)
      } else if (
        listItem.provider === 'Google' ||
        listItem.provider === 'Microsoft'
      ) {
        this.$store.commit('home/SET_EMAIL_DYNAMIC_COMP', {
          comp: 'EmailContent',
        })
        this.$store.commit('home/EXPAND_FULL_IMAGE', false)
        this.$store.commit('home/SET_TEMP_ARRAY', [])
        setTimeout(() => {
          this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
            provider: listItem.provider,
            username,
            id: listItem.id,
            selectedFeed: listItem,
          })
        }, 500)
      } else {
        this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
          provider: listItem.provider,
          username,
          id: listItem.id,
          selectedFeed: listItem,
        })
        this.$store.commit('home/SET_TEMP_ARRAY', [])
      }
      this.$store.commit('home/SET_SHOW_COMP', false)
      this.$store.commit('home/SET_CURRENT_TAB', 'All')
      this.$store.commit('home/SET_CURRENT_HEADER', 'RealTimeFeed')
      this.$store.dispatch('socialFeed/singlePostClose', false)
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
      this.$store.commit('home/RESET_TWITTER_COMMENTS')
      this.$store.commit('home/RESET_PREVIOUS_TWITTER_COMMENTS')
      this.$store.commit('socialFeed/RESET_PREVIOUS_SINGLE_POST')
    },
    showEditFeed() {
      this.$router.push('/settings')
    },

    showAddFeedsComp() {
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
    },
    expand($event) {
      if (!this.progress) {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 900)
        // this.$store.commit('home/SET_FEEDS_DROPDOWN', true)
        this.toggle = true
      } else if (this.progress) {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 900)
        // this.$store.commit('home/SET_FEEDS_DROPDOWN', false)
        this.toggle = false
      }
      if (this.toggle && !this.progress) {
        this.menuOpen = true
        this.menuHeight = true
        this.round = false
        this.$emit('collapse-header', true)
        this.$emit('define-height', 120)
        this.$store.commit('home/SET_FEEDS_DROPDOWN', true)
        this.$emit('expand', true)
        setTimeout(() => {
          this.increaseHeight = true
        }, 300)
        setTimeout(() => {
          this.scroll = true
          this.progress = true
        }, 900)
      } else if (!this.toggle && this.progress) {
        this.scroll = false
        this.increaseHeight = false
        setTimeout(() => {
          this.$emit('collapse-header', false)
        }, 140)
        setTimeout(() => {
          this.round = true
          this.menuOpen = false
          this.menuHeight = false
          this.$emit('expand', false)
          this.$store.commit('home/SET_FEEDS_DROPDOWN', false)
        }, 400)
        setTimeout(() => {
          this.progress = false
        }, 900)
      }

      // Rotate the icon
      // this.menuOpen = !this.menuOpen
    },
    hideMobileHaeder() {
      this.$store.dispatch('mobile/header/closeMobileHeader')
    },
    setNameOrUsername(feed) {
      if (feed.provider === 'Twitter') {
        const addAtSign = !feed.name.length > 0
        const name = feed.name.length > 0 ? feed.name : feed.username
        return addAtSign ? '@' + name : name
      } else {
        return feed.name.length > 0 ? feed.name : feed.username
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Neuton');

name-font {
  font-family: 'Neuton', serif;
}
.bg-white-opasity-50 {
  background-color: #ffffff80;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  height: 100%;
  opacity: 100;
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
.min-w-7-2 {
  min-width: 1.875rem !important;
}
.min-h-7-2 {
  min-height: 1.875rem !important;
}

.menu-wrapper {
  .background {
    opacity: 0;
    position: absolute;
    z-index: 10;
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
    @apply text-white w-full h-10 px-3.5 text-lg flex justify-between items-center shadow-sm focus:outline-none;

    * {
      // pointer-events: none;
    }
  }
}

/* these classname shuld be provided through the `source` props. */
.archive {
  background: #8db230 !important;
}

.search {
  background: #7d80bd !important;
}

.alert {
  background: #A22A2A !important;
}

.settings {
  background: #e0ad1f !important;
}

.help {
  background: #e05252 !important;
}

.feeds-button {
  color: #e4801d;
}
.username__archive,
.feeds-button__archive {
  color: #8db230 !important;
}
.username__search,
.feeds-button__search {
  color: #7d80bd !important;
}
// .username__alert {
//   color: #A22A2A !important;
// }
.username__alert,
.feeds-button__alert {
  color: #e05252 !important;
}
.username__settings,
.feeds-button__settings {
  color: #e0ad1f !important;
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
    // background: #b76d1d;
    background: #e4801d;
    line-height: 2.15rem !important;
    @apply text-white w-full h-10 px-3 text-lg flex justify-between items-center shadow-sm focus:outline-none;

    * {
      // pointer-events: none;
    }

    &__archive {
      background: #5f822d !important;
    }

    &__search {
      background: #5a57a2 !important;
    }

    &__alert {
      background: #d13838 !important;
    }

    &__settings {
      background: #695316 !important;
    }

    &__help {
      background: #e05252 !important;
    }
  }

  .equity {
    @apply py-2;
    padding-left: 13px;
    padding-right: 13px;
  }

  // .scroll-hidden {
  //   overflow: hidden;
  // }

  .scroll {
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: thin;
    scrollbar-color: #b76d1d #ececec; /* Firefox 64 */
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
      background: #b76d1d;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #b76d1d;
    }
  }
  .scroll__archive {
    scrollbar-color: #5f822d #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #5f822d;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #5f822d;
    }
  }
  .scroll__search {
    scrollbar-color: #5a57a2 #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #5a57a2;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #5a57a2;
    }
  }
  .scroll__alert {
    scrollbar-color: #9d1616 #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #9d1616;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #9d1616;
    }
  }
  .scroll__settings {
    scrollbar-color: #695316 #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #695316;
      border-radius: 3px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #695316;
    }
  }

  .list-wrapper {
    .group-archive {
      background: #b76d1d;
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
      &__archive {
        background: #5f822d !important;
      }
      &__search {
        background: #5a57a2 !important;
      }
      &__alert {
        background: #d13838 !important;
      }
      &__settings {
        background: #695316 !important;
      }
      &__help {
        background: #e05252 !important;
      }

      .list {
        .list-item {
          height: 42px;
          background: #e4801d;
          border-color: #b76d1d;
        }
        .__archive {
          background: #8db230;
          border-color: #5f822d !important;
        }
        .__search {
          background: #7d80bd;
          border-color: #5a57a2 !important;
        }
        .__alert {
          background: #e05252;
          border-color: #d13838 !important;
        }
        .__settings {
          background: #e0ad1f;
          border-color: #695316 !important;
        }
        .__help {
          background: #8db230;
          border-color: #5f822d !important;
        }

        .__active_home {
          background: #cc6f15;
        }
        .__active_archive {
          background: #7b9a29;
          border-color: #5f822d !important;
        }
        .__active_search {
          background: #696db4;
          border-color: #5a57a2 !important;
        }
        .__active_alert {
          background: #9d1616;
          border-color: #9d1616 !important;
        }
        .__active_settings {
          background: #b18714;
          border-color: #695316 !important;
        }
      }
    }

    /*.list {
        .list-item {
          direction: ltr;
          height: 45px;
          .background {
            opacity: 0;
            // transition: opacity 1s;
            // outline: none;
            // overflow: hidden;

            transform: translateY(-100%);
            transition: transform 0.5s ease-in-out,
              opacity 0.3s ease-in-out 0.5s;
          }
          &.active {
            // z-index: 1000;
            // @apply relative;

            .background {
              @apply h-full w-full;
              margin-left: -10px;
              position: absolute;
              left: 10px;
              opacity: 1;
              transform: translateY(0);
              z-index: 10;
              width: 100%;
              &__circle {
                @apply h-10 w-10 rounded-full inline-block;
              }

              .corner-top {
                position: absolute;
                top: -19px;
                right: 0px;
                display: inline-block;
              }

              .corner-bottom {
                position: absolute;
                bottom: -19px;
                right: 0px;
                transform: rotate(270deg);
                display: inline-block;
              }
            }
          }
          &-content {
            z-index: 20;
            transition: all 0.5s ease-in-out;
            @apply relative w-full;
          }
        }
      }*/
  }

  .list-item {
    // direction: ltr;
    text-align: left;
  }

  &.expand {
    height: var(--height);
    // height: calc(100vh - 172px);
  }
  &.expand1 {
    height: auto;
  }
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
.list-inner-width {
  width: calc(100% - 40px);
}
.username-width {
  width: calc(100% - 90px);
}
.username-clamp {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mail-icon-wrapper {
  @apply flex justify-center items-center absolute w-3.5 h-3.5 rounded-full bg-white;
  bottom: -2px;
  right: -1px;
}
.social-icon {
  @apply absolute w-3.5 h-3.5;
  bottom: -2px;
  right: -1px;
}
.letter-spacing-1px {
  letter-spacing: 1px;
}
@media (max-width: 767px) {
  .dropdown {
    max-width: 100%;
    max-height: var(--maxHeight);
  }
  .balance__menu {
    max-width: 100% !important;
  }
  .mobile-inner-width {
    width: calc(100% - 30px);
  }
  .mobile-username-width {
    width: calc(100% - 100px);
  }
  .mobile-clamp {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .expand {
    max-height: var(--maxHeight);
  }
}
/* for page */
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
