<template>
  <section class="h-full">
    <div
      class="
        hidden
        md:block
        right-0
        top-0
        absolute
        bg-ash-dark
        p-21
        md:pt-12
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        md:rounded-l-2xl md:shadow-2xl
      "
      :class="[saveSearchAlertModal ? 'show' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-red-lightness xl:text-2xl md:text-xl font-normal">
              Create Alert From Search
            </h2>
            <fa
              class="
                text-red-lightness
                xl:text-2xl
                md:text-xl
                font-normal
                cursor-pointer
              "
              :icon="['fas', 'times']"
              @click="resetAll()"
            />
          </div>
          <div class="flex flex-col mt-5 space-y-3">
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <svg
                class="ml-2 w-5 fill-current text-red-lightness"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46.43 45.4"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Poster_1" data-name="Poster 1">
                    <path
                      id="ic_notifications_active_24px"
                      data-name="ic notifications active 24px"
                      d="M12.92,3.68,9.59.35A24.3,24.3,0,0,0,0,18.63H4.66A19.67,19.67,0,0,1,12.92,3.68Zm28.85,15h4.66A24.4,24.4,0,0,0,36.83.35l-3.3,3.33A19.74,19.74,0,0,1,41.77,18.63Zm-4.59,1.16c0-7.15-3.81-13.13-10.47-14.72V3.49a3.5,3.5,0,0,0-7,0h0V5.08C13,6.65,9.24,12.62,9.24,19.79V31.43L4.59,36.09v2.32H41.84V36.09l-4.66-4.66Zm-14,25.61a3.58,3.58,0,0,0,.93-.09,4.73,4.73,0,0,0,3.36-2.75,4.57,4.57,0,0,0,.35-1.82H18.54a4.69,4.69,0,0,0,4.67,4.66Z"
                    />
                  </g>
                </g>
              </svg>
              <input
                ref="nameOfAlertTextInput"
                v-model.trim="alertSearch.nameOfAlertText"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-gray-1200
                  placeholder-red-lightness placeholder-opacity-50
                  xl:text-lg
                  md:text-md
                "
                type="text"
                placeholder="New Alert Name"
                @blur="$v.alertSearch.nameOfAlertText.$touch()"
              />
            </div>
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
                mt-2
              "
            >
              <svg
                class="text-red-lightness ml-2 w-5 fill-current"
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
                v-model="alertSearch.mayContainText"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-gray-1200
                  placeholder-red-lightness placeholder-opacity-50
                  xl:text-lg
                  md:text-md
                "
                type="text"
                placeholder="May Contain"
              />
            </div>
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
                mt-2
              "
            >
              <svg
                class="ml-2 w-5 fill-current text-red-lightness"
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
                v-model.trim="alertSearch.mustContainText"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-gray-1200
                  placeholder-red-lightness placeholder-opacity-50
                  xl:text-lg
                  md:text-md
                "
                type="text"
                placeholder="Must Contain"
              />
            </div>
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
                mt-2
              "
            >
              <svg
                class="ml-2 w-5 fill-current text-red-lightness"
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
                v-model.trim="alertSearch.ignoreText"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-gray-1200
                  placeholder-red-lightness placeholder-opacity-50
                  xl:text-lg
                  md:text-md
                "
                type="text"
                placeholder="Ignore"
              />
            </div>
            <!-- <template v-if="oneofThem">
              <p class="text-red-400 text-xs mb-0 pl-2">
                One of Them (May Contain, Must Contain, Ignore) Field is
                Required
              </p>
            </template> -->
          </div>
          <div class="flex flex-col justify-between mt-4 w-full">
            <div class="w-1/2 pr-1.5 mb-2">
              <select-input
                id="alertAllFeed"
                v-model="alertSearch.libraryId"
                class="h-full text-lg font-bold"
                :options="allLibraries"
                place-holder="Alert Library"
                color="#F8F8F8"
                background="#E05252"
                caret-bg="#E05252"
                @blur="$v.alertSearch.libraryId.$touch()"
              >
              </select-input>
              <template v-if="$v.alertSearch.libraryId.$error">
                <p
                  v-if="!$v.alertSearch.libraryId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
            <div
              class="
                flex flex-row
                justify-between
                items-center
                w-full
                mt-2
                space-x-3
              "
            >
              <div class="w-1/2">
                <select-input
                  id="alertAllFeed"
                  v-model="alertSearch.allFeedId"
                  class="h-full text-lg font-bold"
                  :options="socialProviders"
                  place-holder="All Feeds"
                  color="#F8F8F8"
                  background="#E05252"
                  caret-bg="#E05252"
                  @blur="$v.alertSearch.allFeedId.$touch()"
                >
                </select-input>
                <template v-if="$v.alertSearch.allFeedId.$error">
                  <p
                    v-if="!$v.alertSearch.allFeedId.required"
                    class="text-red-400 text-xs mb-0 pl-2"
                  >
                    The field is required
                  </p>
                </template>
              </div>
              <div class="w-1/2">
                <select-input
                  id="alertPastMonth"
                  v-model="alertSearch.pastMonthId"
                  class="h-full text-lg font-bold"
                  :options="pastMonths"
                  place-holder="Past Month"
                  color="#F8F8F8"
                  background="#E05252"
                  caret-bg="#E05252"
                  @blur="$v.alertSearch.pastMonthId.$touch()"
                >
                </select-input>
                <template v-if="$v.alertSearch.pastMonthId.$error">
                  <p
                    v-if="!$v.alertSearch.pastMonthId.required"
                    class="text-red-400 text-xs mb-0 pl-2"
                  >
                    The field is required
                  </p>
                </template>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between mt-4">
            <label
              for="alertIncludeComponents"
              class="text-gray-1400 xl:text-lg md:text-base text-xs"
              >Include Comments</label
            >
            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition
                duration-200
                ease-in
              "
            >
              <input
                id="alertIncludeComponents"
                v-model="alertSearch.includeComponents"
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
                for="alertIncludeComponents"
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
          </div>
          <div class="flex flex-row justify-between mt-4">
            <label
              for="alertIncludeReplies"
              class="text-gray-1400 xl:text-lg md:text-base text-xs"
              >Include Replies</label
            >
            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition
                duration-200
                ease-in
              "
            >
              <input
                id="alertIncludeReplies"
                v-model="alertSearch.includeReplies"
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
                for="alertIncludeReplies"
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
          </div>
          <div class="flex flex-row justify-between mt-4">
            <label
              for="alertIncludeDirectMessage"
              class="text-gray-1400 xl:text-lg md:text-base text-xs"
              >Include Direct Messages</label
            >
            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition
                duration-200
                ease-in
              "
            >
              <input
                id="alertIncludeDirectMessage"
                v-model="alertSearch.includeDirectMessages"
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
                for="alertIncludeDirectMessage"
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
          </div>
          <div class="flex flex-col justify-around mt-4 w-full space-y-3">
            <div class="relative w-full">
              <svg
                class="
                  ml-4
                  top-2.5
                  w-5
                  absolute
                  fill-current
                  text-red-lightness
                "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46.43 45.4"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Poster_1" data-name="Poster 1">
                    <path
                      id="ic_notifications_active_24px"
                      data-name="ic notifications active 24px"
                      d="M12.92,3.68,9.59.35A24.3,24.3,0,0,0,0,18.63H4.66A19.67,19.67,0,0,1,12.92,3.68Zm28.85,15h4.66A24.4,24.4,0,0,0,36.83.35l-3.3,3.33A19.74,19.74,0,0,1,41.77,18.63Zm-4.59,1.16c0-7.15-3.81-13.13-10.47-14.72V3.49a3.5,3.5,0,0,0-7,0h0V5.08C13,6.65,9.24,12.62,9.24,19.79V31.43L4.59,36.09v2.32H41.84V36.09l-4.66-4.66Zm-14,25.61a3.58,3.58,0,0,0,.93-.09,4.73,4.73,0,0,0,3.36-2.75,4.57,4.57,0,0,0,.35-1.82H18.54a4.69,4.69,0,0,0,4.67,4.66Z"
                    />
                  </g>
                </g>
              </svg>
              <input
                v-model="notification"
                type="text"
                title="Press Enter After Typing Text"
                class="
                  rounded-full
                  w-full
                  h-10
                  pl-10
                  py-1
                  outline-none
                  placeholder-red-lightness placeholder-opacity-50
                  xl:text-lg
                  md:text-md
                "
                placeholder="Add Notification Email or Text"
                @keypress.enter="addNewNotifications"
              />
            </div>
            <template v-if="alertSearch.notifications.length > 0">
              <div
                v-for="(item, index) in alertSearch.notifications"
                :key="index"
                class="relative w-full"
              >
                <fa
                  class="
                    ml-4
                    top-3.5
                    w-6
                    xl:text-lg
                    md:text-md
                    absolute
                    fill-current
                    text-red-midlight
                    cursor-pointer
                  "
                  :icon="['fas', 'times-circle']"
                  @click="removeSingleNotification(index)"
                />
                <input
                  v-model="item.name"
                  type="text"
                  class="
                    rounded-full
                    w-full
                    h-11
                    pl-10
                    py-1
                    outline-none
                    placeholder-red-lightness placeholder-opacity-50
                    xl:text-lg
                    md:text-md
                  "
                  placeholder="888-555-1234"
                />
                <div class="absolute right-0 top-0">
                  <select-input
                    id="monthly"
                    v-model="item.alertTime"
                    class="h-full text-lg font-bold"
                    place-holder="Monthly"
                    :options="pastMonths"
                    color="#F8F8F8"
                    background="#E05252"
                    caret-bg="#E05252"
                  >
                  </select-input>
                </div>
              </div>
            </template>
          </div>
          <!-- <div class="flex flex-row justify-around mt-4">
        <button
          class="
            focus:outline-none
            w-44
            h-10
            text-red-midlight
            bg-white
            rounded-full
            mr-2.5
            border-2 border-red-midlight
            outline-none
            font-medium
            setup
          "
          @click="deleteAlertSearch"
        >
          <span>Delete</span>
        </button>
        <button
          v-if="!alertSearchEdit"
          class="
            focus:outline-none
            w-44
            h-10
            text-white
            bg-red-midlight
            rounded-full
            mr-2.5
            border-none
            outline-none
            font-medium
            setup
          "
          @click="addSaveAlertSearch"
          :disabled="$v.$invalid"
        >
          <span>Add</span>
        </button>
        <button
          v-if="alertSearchEdit"
          class="
            focus:outline-none
            w-44
            h-10
            text-white
            bg-red-midlight
            rounded-full
            mr-2.5
            border-none
            outline-none
            font-medium
            setup
          "
          @click="updateAlertSearch"
          :disabled="$v.$invalid"
        >
          <span>Update</span>
        </button>
      </div> -->
          <div class="flex flex-col mt-5 w-full h-46 rounded-xl">
            <h2 class="text-red-lightness xl:text-2xl md:text-xl">
              Saved Search List
            </h2>
            <div
              class="
                bg-white
                mt-3
                py-5
                px-2
                w-full
                h-56
                rounded-xl
                overflow-auto
                scroll
              "
            >
              <ul class="space-y-1">
                <li
                  v-for="list of savedAlerts"
                  :key="list.id"
                  class="
                    text-red-lightness text-lg
                    list
                    px-3
                    py-1
                    cursor-pointer
                  "
                  :class="alertSearch.id === list.id ? 'active' : ''"
                  @click="editSaveAlertSearch(list.id)"
                >
                  {{ list.alertName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="
            flex flex-row
            justify-center
            mt-8
            space-x-5
            md:pb-4
            px-8
            w-full
          "
        >
          <button
            class="
              focus:outline-none
              w-44
              h-10
              text-red-lightness
              rounded-full
              border-2 border-red-lightness
              outline-none
              font-bold
              text-base
              setup
            "
            @click="clearOldData"
          >
            <span>Clear</span>
          </button>
          <button
            v-if="!alertSearchEdit"
            class="
              focus:outline-none
              w-44
              h-10
              text-white
              bg-red-lightness
              rounded-full
              border-none
              outline-none
              font-bold
              text-base
              setup
            "
            :disabled="addProcess"
            @click="addSaveAlertSearch"
          >
            <div class="rounded-full relative flex items-center justify-around">
              <span>Save</span>
              <fa
                v-if="addProcess"
                class="absolute right-8 text-white font-bold animate-spin"
                :icon="['fas', 'spinner']"
              />
            </div>
          </button>
          <button
            v-if="alertSearchEdit"
            class="
              focus:outline-none
              w-44
              h-10
              text-white
              bg-red-lightness
              rounded-full
              border-none
              outline-none
              font-bold
              text-base
              setup
            "
            :disabled="$v.$invalid || updateProcess"
            @click="updateAlertSearch"
          >
            <div class="rounded-full relative flex items-center justify-around">
              <span>Update</span>
              <fa
                v-if="updateProcess"
                class="absolute right-8 text-white font-bold animate-spin"
                :icon="['fas', 'spinner']"
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Small Device -->
    <div
      class="
        md:hidden
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
        h-full
      "
      :class="[saveSearchAlertModal ? 'show' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-red-lightness text-2xl font-normal">
              Create Alert From Search
            </h2>
            <fa
              class="text-red-lightness text-2xl font-normal cursor-pointer"
              :icon="['fas', 'times']"
              @click="resetAll()"
            />
          </div>
          <div class="flex flex-col mt-5 w-full">
            <select-input
              id="alertAllFeed"
              v-model="alertSearch.libraryId"
              :options="allLibraries"
              class="text-xl font-bold"
              place-holder="Alert Library"
              color="#F8F8F8"
              background="#E05252"
              caret-bg="#E05252"
              @blur="$v.alertSearch.libraryId.$touch()"
            >
            </select-input>
            <template v-if="$v.alertSearch.libraryId.$error">
              <p
                v-if="!$v.alertSearch.libraryId.required"
                class="text-red-400 text-xs mb-0 pl-2"
              >
                The field is required
              </p>
            </template>
          </div>
          <div class="flex flex-col mt-3">
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <svg
                class="w-5 ml-2 absolute fill-current text-red-lightness"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46.43 45.4"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Poster_1" data-name="Poster 1">
                    <path
                      id="ic_notifications_active_24px"
                      data-name="ic notifications active 24px"
                      d="M12.92,3.68,9.59.35A24.3,24.3,0,0,0,0,18.63H4.66A19.67,19.67,0,0,1,12.92,3.68Zm28.85,15h4.66A24.4,24.4,0,0,0,36.83.35l-3.3,3.33A19.74,19.74,0,0,1,41.77,18.63Zm-4.59,1.16c0-7.15-3.81-13.13-10.47-14.72V3.49a3.5,3.5,0,0,0-7,0h0V5.08C13,6.65,9.24,12.62,9.24,19.79V31.43L4.59,36.09v2.32H41.84V36.09l-4.66-4.66Zm-14,25.61a3.58,3.58,0,0,0,.93-.09,4.73,4.73,0,0,0,3.36-2.75,4.57,4.57,0,0,0,.35-1.82H18.54a4.69,4.69,0,0,0,4.67,4.66Z"
                    />
                  </g>
                </g>
              </svg>
              <input
                ref="nameOfAlertTextInput"
                v-model="alertSearch.nameOfAlertText"
                class="
                  ml-7
                  pl-2
                  outline-none
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-xl
                  placeholder-red-lightness placeholder-opacity-50
                "
                type="text"
                placeholder="New Alert Name"
                @blur="$v.alertSearch.nameOfAlertText.$touch()"
              />
            </div>
            <template v-if="$v.alertSearch.nameOfAlertText.$error">
              <p
                v-if="!$v.alertSearch.nameOfAlertText.required"
                class="text-red-400 text-xs mb-0 pl-2"
              >
                The field is required
              </p>
            </template>
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
                mt-3
              "
            >
              <svg
                class="text-red-lightness ml-2 w-5 fill-current"
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
                v-model="alertSearch.mayContainText"
                class="
                  pl-2
                  outline-none
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-xl
                  placeholder-red-lightness placeholder-opacity-50
                "
                type="text"
                placeholder="May Contain"
              />
            </div>
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
                mt-3
              "
            >
              <svg
                class="text-red-lightness ml-2 w-5 fill-current"
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
                v-model="alertSearch.mustContainText"
                class="
                  pl-2
                  outline-none
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-xl
                  placeholder-red-lightness placeholder-opacity-50
                "
                type="text"
                placeholder="Must Contain"
              />
            </div>
            <div
              class="
                w-full
                h-10
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
                mt-3
              "
            >
              <svg
                class="text-red-lightness ml-2 w-5 fill-current"
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
                v-model="alertSearch.ignoreText"
                class="
                  pl-2
                  outline-none
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-xl
                  placeholder-red-lightness placeholder-opacity-50
                "
                type="text"
                placeholder="Ignore"
              />
            </div>
            <template v-if="oneofThem">
              <p class="text-red-400 text-xs mb-0 pl-2">
                One of Them (May Contain, Must Contain, Ignore) Field is
                Required
              </p>
            </template>
          </div>
          <div class="flex flex-row justify-between mt-5">
            <label for="alertIncludeComponents" class="text-gray-1400 text-lg"
              >Include Comments</label
            >
            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition
                duration-200
                ease-in
              "
            >
              <input
                id="alertIncludeComponents"
                v-model="alertSearch.includeComponents"
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
                for="alertIncludeComponents"
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
          </div>
          <div class="flex flex-row justify-between mt-2">
            <label for="alertIncludeReplies" class="text-gray-1400 text-lg"
              >Include Replies</label
            >
            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition
                duration-200
                ease-in
              "
            >
              <input
                id="alertIncludeReplies"
                v-model="alertSearch.includeReplies"
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
                for="alertIncludeReplies"
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
          </div>
          <div class="flex flex-row justify-between mt-2">
            <label
              for="alertIncludeDirectMessage"
              class="text-gray-1400 text-lg"
              >Include Direct Messages</label
            >
            <div
              class="
                relative
                inline-block
                w-9
                align-middle
                select-none
                transition
                duration-200
                ease-in
              "
            >
              <input
                id="alertIncludeDirectMessage"
                v-model="alertSearch.includeDirectMessages"
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
                for="alertIncludeDirectMessage"
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
          </div>
          <div class="flex flex-col items-center w-full space-y-3 mt-4">
            <div class="w-full">
              <select-input
                id="alertAllFeed"
                v-model="alertSearch.allFeedId"
                :options="socialProviders"
                class="text-xl font-bold"
                place-holder="All Feeds"
                color="#F8F8F8"
                background="#E05252"
                caret-bg="#E05252"
                @blur="$v.alertSearch.allFeedId.$touch()"
              >
              </select-input>
              <template v-if="$v.alertSearch.allFeedId.$error">
                <p
                  v-if="!$v.alertSearch.allFeedId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
            <div class="w-full">
              <select-input
                id="alertPastMonth"
                v-model="alertSearch.pastMonthId"
                :options="pastMonths"
                place-holder="Past Month"
                class="text-xl font-bold"
                color="#f8f8f8"
                background="#E05252"
                caret-bg="#E05252"
                @blur="$v.alertSearch.pastMonthId.$touch()"
              >
              </select-input>
              <template v-if="$v.alertSearch.pastMonthId.$error">
                <p
                  v-if="!$v.alertSearch.pastMonthId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col justify-around mt-4 w-full space-y-2">
            <div class="relative w-full">
              <svg
                class="
                  ml-4
                  top-2.5
                  w-5
                  absolute
                  fill-current
                  text-red-lightness
                "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46.43 45.4"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Poster_1" data-name="Poster 1">
                    <path
                      id="ic_notifications_active_24px"
                      data-name="ic notifications active 24px"
                      d="M12.92,3.68,9.59.35A24.3,24.3,0,0,0,0,18.63H4.66A19.67,19.67,0,0,1,12.92,3.68Zm28.85,15h4.66A24.4,24.4,0,0,0,36.83.35l-3.3,3.33A19.74,19.74,0,0,1,41.77,18.63Zm-4.59,1.16c0-7.15-3.81-13.13-10.47-14.72V3.49a3.5,3.5,0,0,0-7,0h0V5.08C13,6.65,9.24,12.62,9.24,19.79V31.43L4.59,36.09v2.32H41.84V36.09l-4.66-4.66Zm-14,25.61a3.58,3.58,0,0,0,.93-.09,4.73,4.73,0,0,0,3.36-2.75,4.57,4.57,0,0,0,.35-1.82H18.54a4.69,4.69,0,0,0,4.67,4.66Z"
                    />
                  </g>
                </g>
              </svg>
              <input
                v-model="notification"
                type="text"
                title="Press Enter After Typing Text"
                class="
                  rounded-full
                  w-full
                  h-10
                  pl-11
                  outline-none
                  placeholder-red-lightness placeholder-opacity-50
                  text-xl
                "
                placeholder="Add Notification Email or Text"
                @keypress.enter="addNewNotifications"
              />
            </div>
            <template v-if="alertSearch.notifications.length > 0">
              <div
                v-for="(item, index) in alertSearch.notifications"
                :key="index"
                class="relative w-full"
              >
                <fa
                  class="
                    ml-4
                    top-3
                    text-xl
                    w-5
                    absolute
                    fill-current
                    text-red-lightness
                    cursor-pointer
                  "
                  :icon="['fas', 'times-circle']"
                  @click="removeSingleNotification(index)"
                />
                <input
                  v-model="item.name"
                  type="text"
                  class="
                    rounded-full
                    w-full
                    h-11
                    pl-11
                    py-1
                    pb-1.5
                    outline-none
                    placeholder-red-lightness placeholder-opacity-50
                    text-xl
                  "
                  placeholder="888-555-1234"
                />
                <div class="absolute right-0 top-0">
                  <select-input
                    id="monthly"
                    v-model="item.alertTime"
                    class="text-lg font-bold"
                    :options="pastMonths"
                    place-holder="Monthly"
                    color="#F8F8F8"
                    background="#E05252"
                    caret-bg="#E05252"
                  >
                  </select-input>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="w-full pb-5">
          <div class="flex flex-row justify-between mt-7 space-x-3">
            <button
              class="
                focus:outline-none
                w-full
                h-10
                text-red-lightness
                rounded-full
                border-2 border-red-lightness
                outline-none
                font-bold
                text-xl
                setup
              "
              @click="clearOldData"
            >
              <span>Clear</span>
            </button>
            <button
              class="
                focus:outline-none
                w-full
                h-10
                text-white
                bg-red-lightness
                rounded-full
                border-none
                outline-none
                font-bold
                text-xl
                setup
              "
              :disabled="addProcess"
              @click="addSaveAlertSearch"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span>Add</span>
                <fa
                  v-if="addProcess"
                  class="absolute right-8 text-white font-bold animate-spin"
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
import { mapActions, mapState } from 'vuex'
import SelectInput from '~/components/inputs/SelectInput'
import { ALERT_LIBRARY, SAVE_ALERT_SEARCH } from '~/constants/urls'

export default {
  Name: 'SearchAlert',
  components: {
    SelectInput,
  },
  layout: 'home',
  data() {
    return {
      skew: false,
      alertSearchEdit: false,
      alertSearch: {
        nameOfAlertText: '',
        mayContainText: '',
        mustContainText: '',
        ignoreText: '',
        includeComponents: true,
        includeReplies: true,
        includeDirectMessages: true,
        allFeedId: 'All Feeds',
        pastMonthId: 'Past Month',
        libraryId: 'Alert Library',
        notifications: [],
      },
      notification: '',
      allLibraries: [],
      savedAlerts: [],
      addProcess: false,
      updateProcess: false,
      oneofThem: false,
    }
  },
  computed: {
    ...mapState(['pastMonths', 'savedSearches', 'socialProviders']),
    ...mapState('search', ['saveSearchAlertModal']),
  },
  watch: {
    allLibraries(data) {
      const placeholder = data.find((item) => {
        return item.placeholder ? item : ''
      })
      if (placeholder) {
        this.alertSearch.libraryId = placeholder.value
      }
    },
    pastMonths(data) {
      const placeholder = data.find((item) => {
        return item.placeholder ? item : ''
      })
      if (placeholder) {
        this.alertSearch.pastMonthId = placeholder.value
      }
    },
  },
  mounted() {
    // this.getAllLibraries()
    // this.getAllSavedAlerts()
  },

  validations: {
    alertSearch: {
      nameOfAlertText: {
        required,
      },
      allFeedId: {
        required,
      },
      pastMonthId: {
        required,
      },
      libraryId: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({
      showSaveSearchAlert: 'search/showSaveSearchAlert',
    }),
    oneOfThemIsRequired() {
      if (
        this.alertSearch.mayContainText.length ||
        this.alertSearch.mustContainText.length ||
        this.alertSearch.ignoreText.length
      ) {
        return false
      } else {
        return true
      }
    },

    async addSaveAlertSearch() {
      this.$v.$touch()
      this.$toast.clear()
      if (this.alertSearch.nameOfAlertText === '') {
        this.$toast.error('Enter Text Below', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.nameOfAlertTextInput.focus()
        return false
      }
      if (this.oneOfThemIsRequired()) {
        this.oneofThem = true
        this.$toast.error(
          'One of Them (May Contain, Must Contain, Ignore) Field is Required',
          {
            className: ['toasted-bg-alert'],
          }
        )
        return false
      } else {
        this.oneofThem = false
      }

      if (!this.$v.$invalid) {
        try {
          this.addProcess = true
          const res = await this.$axios.$post(
            SAVE_ALERT_SEARCH,
            this.alertSearch
          )
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.clearOldData()
            this.savedAlerts.push(res.data)
            this.$emit('closeAlertSearch')
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.addProcess = false
        } catch (error) {
          this.addProcess = false
          console.log(error)
        }
      }
    },
    async updateAlertSearch() {
      this.$toast.clear()
      try {
        this.updateProcess = true
        const res = await this.$axios.$put(
          SAVE_ALERT_SEARCH + this.alertSearch.id,
          this.alertSearch
        )
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.savedAlerts = this.savedAlerts.map((item) => {
            if (res.data.id === item.id) {
              return {
                id: res.data.id,
                alertName: res.data.nameOfAlertText,
                status: res.data.status,
                unreviewedHits: res.data.unreviewedHits,
                context: res.data.context,
              }
            }
            return item
          })
          this.resetAll()
        }
        this.updateProcess = false
      } catch (error) {
        this.updateProcess = false
        console.log(error)
      }
    },
    async editSaveAlertSearch(id) {
      try {
        const res = await this.$axios.$get(SAVE_ALERT_SEARCH + id)
        if (res.success) {
          this.alertSearchEdit = true
          this.alertSearch = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteAlertSearch() {
      if (this.alertSearch.id) {
        try {
          const res = await this.$axios.$delete(
            SAVE_ALERT_SEARCH + this.alertSearch.id
          )
          if (res.success) {
            this.savedAlerts = this.savedAlerts.filter((item) => {
              return item.id !== this.alertSearch.id
            })
            this.clearOldData()
            this.alertSearchEdit = false
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    resetAll() {
      this.alertSearchEdit = false
      this.clearOldData()
      this.showSaveSearchAlert(false)
    },
    clearOldData() {
      this.alertSearch.id = ''
      this.alertSearch.nameOfAlertText = ''
      this.alertSearch.mayContainText = ''
      this.alertSearch.mustContainText = ''
      this.alertSearch.ignoreText = ''
      this.alertSearch.includeComponents = true
      this.alertSearch.includeReplies = true
      this.alertSearch.includeDirectMessages = true
      this.alertSearch.allFeedId = 'All Feeds'
      this.alertSearch.pastMonthId = 'Past Month'
      this.alertSearch.libraryId = 'Alert Library'
      this.alertSearch.notifications = []
      this.alertSearchEdit = false
      this.$v.$reset()
    },
    addNewNotifications() {
      this.alertSearch.notifications.unshift({
        name: this.notification,
        alertTime: 'Monthly',
      })
      this.notification = ''
    },
    removeSingleNotification(index) {
      this.alertSearch.notifications.splice(index, 1)
    },
    async getAllLibraries() {
      try {
        const res = await this.$axios.$get(ALERT_LIBRARY)
        if (res.success) {
          this.allLibraries = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllSavedAlerts() {
      try {
        const res = await this.$axios.$get(SAVE_ALERT_SEARCH)
        if (res.success) {
          this.savedAlerts = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
    transition: all 0.5s ease-in-out;
    @apply bg-red-midlight;
  }
}
.list:hover {
  background-color: #ff5959;
  color: #ffffff;
  border-radius: 50px;
}

.active {
  background-color: #ff5959;
  color: #ffffff;
  border-radius: 50px;
}

.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100vh;
  right: -500px;
  z-index: 9999;
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
  scrollbar-color: #ff5959 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: #ff5959;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff5959;
  }
}

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 100%;
    right: -100%;
    z-index: 9999;
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
</style>
