<template>
  <div class="w-full flex-grow bg-white rounded-b-2xl py-3 px-3.5 md:px-5">
    <div
      class="
        h-full
        grid grid-cols-12
        md:grid-cols-12
        alertXl:grid-cols-4
        alertBigScreen:grid-cols-6
        gap-6
      "
    >
      <div
        v-if="type === 'Random Sample'"
        class="hidden mediumDesktop:block mediumDesktop:col-span-1"
      ></div>
      <div
        :class="
          type === 'Random Sample'
            ? 'col-span-12 md:col-span-12 alertXl:col-span-2 mediumDesktop:col-span-1 alertBigScreen:col-span-2 pb-3'
            : 'col-span-12 md:col-span-12 alertXl:col-span-4 alertBigScreen:col-span-3'
        "
      >
        <div class="w-full flex flex-col space-y-3">
          <div class="w-full flex items-center justify-between space-x-2">
            <span class="text-gray-1200 text-base md:text-xl">Name</span>
            <input
              class="
                h-10
                w-80
                bg-red-deep
                text-offwhite-800 text-md
                rounded-full
                border-none
                outline-none
                px-4
                name-placeholder-style
              "
              type="text"
              placeholder="Promissory Statement"
            />
          </div>
          <template v-if="type === 'Random Sample'">
            <div class="w-full flex items-center justify-between space-x-2">
              <span class="text-gray-1200 text-base md:text-xl">Target</span>
              <div class="target-input">
                <text-input
                  id="target_input"
                  v-model="$v.target.$model"
                  class="w-60 new-general-alert-text"
                  :color="'#FFF'"
                  :background="'#A22A2A'"
                  :place-holder="'Target'"
                  :error="$v.target.$error"
                  :error-message="validationMsg($v.target)"
                  @focus="focusTarget"
                  @keyup="isNumber($event)"
                  @keypress="isNumberKey($event)"
                  @input="getInputValue($event)"
                ></text-input>
              </div>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span class="text-gray-1200 text-base md:text-xl">Period</span>
              <div class="target-input">
                <select-input
                  v-model="period"
                  class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                  :options="periods"
                  place-holder="Ongoing"
                  :place-holder-disabled="true"
                  color="#F8F8F8"
                  background="#A22A2A"
                  caret-bg="#A22A2A"
                  scroll-color="#9e7912"
                ></select-input>
              </div>
            </div>
            <div
              class="
                w-full
                flex
                items-center
                justify-between
                space-x-2
                relative
              "
            >
              <span
                class="text-gray-1200 text-base md:text-xl whitespace-nowrap"
                >Limit Lookback</span
              >
              <all-dates :height="'36px'"></all-dates>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span
                class="text-gray-1200 text-base md:text-xl whitespace-nowrap"
                >Total Population</span
              >
              <p class="text-gray-1200 text-base md:text-xl">31,760</p>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span class="text-gray-1200 text-base md:text-xl"
                >Targeted Reviews of Population</span
              >
              <p class="text-gray-1200 text-base md:text-xl">1,588</p>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span class="text-gray-1200 text-base md:text-xl"
                >Count Reviewed Flags Against Target</span
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
                    id="count-reviewed"
                    type="checkbox"
                    name="toggle"
                    class="
                      toggle-checkbox
                      absolute
                      block
                      rounded-full
                      bg-red-deep
                      appearance-none
                      cursor-pointer
                    "
                  />
                  <label
                    for="count-reviewed"
                    class="
                      toggle-label
                      checkbox-label
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
              </div>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span
                class="text-gray-1200 text-base md:text-xl whitespace-nowrap"
                >Non-Flag Reviews</span
              >
              <p class="text-gray-1200 text-base md:text-xl">71</p>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span class="text-gray-1200 text-base md:text-xl"
                >Remaining Reviews to Meet Target</span
              >
              <p class="text-gray-1200 text-base md:text-xl">1,417</p>
            </div>
          </template>
          <template v-else>
            <div class="w-full flex flex-col space-y-4">
              <span class="text-gray-1200 text-base md:text-xl"
                >Concern Threshold</span
              >
              <sliding-bar
                :bar-id="'concern_threshold'"
                class-style-name="sliding_bar"
                @send-value="ValueFromConcernThreshold($event)"
              ></sliding-bar>
            </div>
            <div class="w-full flex flex-col space-y-4">
              <span class="text-gray-1200 text-base md:text-xl"
                >Confidence Threshold</span
              >
              <sliding-bar
                :bar-id="'confidence_threshold'"
                class-style-name="sliding_bar"
                @send-value="ValueFromConfidenceThreshold($event)"
              ></sliding-bar>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span
                class="text-gray-1200 text-base md:text-xl whitespace-nowrap"
                >Minimum Seventy Index</span
              >
              <p class="text-gray-1200 text-base md:text-xl">
                {{ calculateIndex }}
              </p>
            </div>
            <div class="w-full flex items-center justify-between space-x-2">
              <span
                class="text-gray-1200 text-base md:text-xl whitespace-nowrap"
                >Current Results</span
              >
              <p class="text-gray-1200 text-base md:text-xl">4</p>
            </div>
          </template>
          <div class="w-full flex items-center justify-between space-x-2">
            <span class="text-gray-1200 text-base md:text-xl whitespace-nowrap"
              >Assign Flag</span
            >
            <transition name="fadeIn">
              <div class="assign-flag-input">
                <select-input
                  v-model="team"
                  class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                  :options="teams"
                  place-holder="Select"
                  :place-holder-disabled="true"
                  color="#F8F8F8"
                  background="#A22A2A"
                  caret-bg="#A22A2A"
                  scroll-color="#9e7912"
                ></select-input>
              </div>
            </transition>
          </div>
          <div
            v-for="(newAssignFlag, index) in newAssignFlagsArrayFinal"
            :key="index"
          >
            <AssignFlags
              :id="parseInt(newAssignFlag.id)"
              :members="members"
              :value="newAssignFlag.percentage"
              :length="newAssignFlagsArrayLength"
              :is-crossed="newAssignFlag.isCrossed"
              :total="totalAssignFlagsValue"
              :flag-for="newAssignFlag.flagFor"
              @decrease="pullFromFlags"
              @increases="assignInFlags()"
              @change-value="updateAssignValue"
              @current-flag-for="flagUpdate"
            />
          </div>
          <div
            v-if="newAssignFlagsArrayLength > 1"
            class="flex space-x-4 justify-end"
          >
            <div
              class="
                flex
                items-center
                justify-center
                w-20
                h-10
                rounded-full
                font-bold
                fadeIn_Animation
              "
              :class="
                totalAssignFlagsValue > 98 && totalAssignFlagsValue <= 100
                  ? 'bg-offwhite-800 text-red-deep border-2 border-red-deep'
                  : 'bg-red-deep text-offwhite-800'
              "
            >
              {{ totalAssignFlagsValue + ' %' }}
            </div>
            <div
              class="
                bg-red-deep
                text-offwhite-800
                flex
                items-center
                justify-center
                total-width
                h-10
                rounded-full
                font-bold
                fadeIn_Animation
              "
            >
              Total
            </div>
            <div
              class="
                w-10
                min-w-40
                h-10
                rounded-full
                bg-red-deep
                text-white
                flex
                justify-center
                items-center
              "
              :class="
                newAssignFlagsArrayLength < members.length
                  ? 'opacity-100'
                  : 'opacity-50'
              "
              @click="assignInFlags()"
            >
              <fa
                class="
                  text-white
                  md:text-2xl
                  text-2xl
                  font-normal
                  cursor-pointer
                "
                :icon="['fas', 'plus']"
              />
            </div>
          </div>
          <div
            v-if="type !== 'Random Sample'"
            class="w-full flex items-center justify-between space-x-2"
          >
            <span
              class="
                text-gray-1200 text-base
                md:text-xl
                whitespace-nowrap
                self-start
                pt-2
              "
              >Notify</span
            >
            <template>
              <div class="space-y-3 flex flex-col">
                <template>
                  <Notify
                    :id="newFieldsArray[0].id"
                    :notify-for="newFieldsArray[0].notifyFor"
                    :members="members"
                    :new-notifies="newNotifies"
                    @first-notify-for="notifyUpdate"
                    @increase="assignNewNotify()"
                    @decrease="
                      newFieldsArray.length > 1
                        ? pullNewFields(newFieldsArray[0].id)
                        : pullNewNotify()
                    "
                  />
                </template>
              </div>
            </template>
          </div>
          <template v-if="newNotifies === 1 && type !== 'Random Sample'">
            <transition name="fadeIn">
              <div
                class="
                  w-full
                  flex flex-col
                  justify-between
                  space-y-3
                  md:space-y-4
                "
              >
                <div
                  v-for="(newField, newFieldIndex) in newFieldsArray"
                  :key="newFieldIndex"
                  class="w-full flex space-x-2 items-center"
                >
                  <email-text-input
                    :members="members"
                    :new-fields="newFields"
                    :new-field="newField"
                    :new-field-index="newFieldIndex"
                    :new-fields-array="newFieldsArray"
                    @assign-field="assignNewFields()"
                    @pull-field="pullNewFields($event)"
                    @add-email="addEmail($event)"
                    @add-text="addText($event)"
                    @email-text-tab="setEmailTextTab($event)"
                    @current-notify-for="notifyUpdate"
                  ></email-text-input>
                </div>
              </div>
            </transition>
          </template>
          <div
            v-if="type !== 'Random Sample'"
            class="w-full flex flex-col space-y-4 alertBigScreen:pb-5"
          >
            <span class="text-gray-1200 text-base md:text-xl"
              >Severity Index Threshold</span
            >
            <severity-threshold-sliding-bar
              :bar-id="'severity_index_threshold'"
            ></severity-threshold-sliding-bar>
          </div>
        </div>
      </div>
      <div
        :class="
          type === 'Random Sample'
            ? 'col-span-12 md:col-span-12 alertXl:col-span-2 mediumDesktop:col-span-1 alertBigScreen:col-span-2 pb-3'
            : 'col-span-12 md:col-span-12 alertXl:col-span-4 alertBigScreen:col-span-3'
        "
      >
        <div class="w-full flex flex-col space-y-3">
          <div class="w-full flex items-center justify-between">
            <span class="text-gray-1200 text-base md:text-xl">Type</span>
            <div class="target-input">
              <select-input
                v-model="type"
                class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                :options="types"
                place-holder="Alerts Library"
                :place-holder-disabled="true"
                color="#F8F8F8"
                background="#A22A2A"
                caret-bg="#A22A2A"
                scroll-color="#9e7912"
                @input="selectedType($event, type)"
              ></select-input>
            </div>
          </div>
          <div class="w-full flex items-center justify-between space-x-2">
            <span class="text-gray-1200 text-base md:text-xl">Active</span>
            <div class="flex space-x-4 items-center">
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
                  id="incoming"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="incoming"
                  class="
                    toggle-label
                    checkbox-label
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
              <div
                class="
                  in-out-width
                  w-60
                  h-10
                  rounded-full
                  bg-red-moreLightness
                  flex
                  items-center
                  justify-start
                  relative
                "
              >
                <div class="w-1/2 h-full">
                  <input
                    id="incoming"
                    v-model="inComingCheckbox"
                    class="
                      in-out-checkbox
                      w-1/2
                      h-full
                      absolute
                      left-0
                      top-0
                      block
                      rounded-full
                      appearance-none
                      cursor-pointer
                    "
                    type="checkbox"
                  />
                  <label
                    for="incoming"
                    class="
                      toggle-label
                      checkbox-label
                      overflow-hidden
                      w-full
                      h-full
                      transition-all
                      duration-800
                      ease-in-out
                      bg-red-moreLightness
                      cursor-pointer
                      text-red-deep
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                    :class="
                      outGoingCheckbox ? 'rounded-l-full' : 'rounded-full'
                    "
                    >Incoming</label
                  >
                </div>
                <div class="w-1/2 h-full">
                  <input
                    id="outgoing"
                    v-model="outGoingCheckbox"
                    class="
                      in-out-checkbox
                      w-1/2
                      h-full
                      absolute
                      right-0
                      top-0
                      block
                      rounded-full
                      appearance-none
                      cursor-pointer
                    "
                    type="checkbox"
                  />
                  <label
                    for="outgoing"
                    class="
                      toggle-label
                      checkbox-label
                      overflow-hidden
                      w-full
                      h-full
                      transition-all
                      duration-800
                      ease-in-out
                      bg-red-moreLightness
                      cursor-pointer
                      text-red-deep
                      font-bold
                      flex
                      items-center
                      justify-center
                    "
                    :class="
                      inComingCheckbox ? 'rounded-r-full' : 'rounded-full'
                    "
                    >Outgoing</label
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- <div
                    class="
                      w-full
                      text-white text-md
                      bg-red-deep
                      rounded-full
                      h-auto
                      py-1.5
                    "
          >-->
          <!-- <ul
            class="w-full text-white text-md bg-red-deep rounded-3xl h-auto py-2 space-y-1"
          >
            <li
              v-for="(feed, mainIndex) in feeds"
              :key="mainIndex"
              class="flex flex-col space-y-1"
            >
              <div class="flex items-center space-x-2 px-4 font-bold">
                <label class="h-5 relative" :for="feed.id"
                  ><input
                    :id="feed.id"
                    v-model="feed.value"
                    type="checkbox"
                    class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                  />
                  <fa
                    class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
                    :icon="['fas', 'check']"
                  />
                </label>
                <span>{{ feed.name }}</span>
              </div>

              <ul v-if="!feed.value" class="space-y-1 pl-4">
                <li
                  v-for="(media, mediaIndex) in feed.media"
                  :key="mediaIndex"
                  class="flex flex-col space-y-1"
                >
                  <div class="flex items-center space-x-2 px-6 font-bold">
                    <label class="h-5 relative" :for="media.id"
                      ><input
                        :id="media.id"
                        v-model="media.mediaValue"
                        type="checkbox"
                        class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                      />
                      <fa
                        class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
                        :icon="['fas', 'check']"
                      />
                    </label>
                    <span>{{ media.mediaName }}</span>
                  </div>
                  <ul v-if="!media.mediaValue" class="space-y-1 pl-6">
                    <li
                      v-for="(
                        individualMedia, individualMediaIndex
                      ) in media.individualMedia"
                      :key="individualMediaIndex"
                      class="flex flex-col"
                    >
                      <div class="flex items-center space-x-2 px-6 font-bold">
                        <label class="h-5 relative" :for="individualMedia.id"
                          ><input
                            :id="individualMedia.id"
                            v-model="individualMedia.value"
                            type="checkbox"
                            class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                          />
                          <fa
                            class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
                            :icon="['fas', 'check']"
                          />
                        </label>
                        <span>{{ individualMedia.individualMediaName }}</span>
                      </div>
                      <ul v-if="!individualMedia.value" class="space-y-1 pl-8">
                        <li
                          v-for="(
                            account, accountIndex
                          ) in individualMedia.individualMediaAccount"
                          :key="accountIndex"
                          class="flex flex-col space-y-1"
                        >
                          <div
                            class="flex items-center space-x-2 px-6 font-bold"
                          >
                            <label class="h-5 relative" :for="account.id"
                              ><input
                                :id="account.id"
                                type="checkbox"
                                class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                              />
                              <fa
                                class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
                                :icon="['fas', 'check']"
                              />
                            </label>
                            <span>{{ account.accountName }}</span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>-->
          <div
            class="bg-red-deep allFeeds_ul_wrapper max-height-320 scroll-x"
            :class="!controlBoxRound ? 'rounded-full' : 'rounded-xl'"
          >
            <AllFeedsMenu
              arrow-color="#A22A2A"
              scroll-color="#8d0000"
              :control-box-round="controlBoxRound"
              :class-style-name="
                !controlBoxRound ? 'border-radius-full' : 'border-raduis-xl'
              "
              @rounded="controlRound"
            />
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="text-gray-1200 text-base md:text-xl"
              >Ignore Disclosures</span
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
                  id="ignore-disclosures"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-disclosures"
                  class="
                    toggle-label
                    checkbox-label
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
            </div>
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="text-gray-1200 text-base md:text-xl"
              >Ignore Comments</span
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
                  id="ignore-comments"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-comments"
                  class="
                    toggle-label
                    checkbox-label
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
            </div>
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="text-gray-1200 text-base md:text-xl"
              >Ignore Subject</span
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
                  id="ignore-subject"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-subject"
                  class="
                    toggle-label
                    checkbox-label
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
            </div>
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="text-gray-1200 text-base md:text-xl"
              >Ignore Replies</span
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
                  id="ignore-replies"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-replies"
                  class="
                    toggle-label
                    checkbox-label
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
            </div>
          </div>
          <div class="w-full flex items-center justify-between">
            <span class="text-gray-1200 text-base md:text-xl">Ignore Body</span>
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
                  id="ignore-body"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-body"
                  class="
                    toggle-label
                    checkbox-label
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
            </div>
          </div>
          <div class="w-full flex items-center justify-between md:pb-2">
            <span class="text-gray-1200 text-base md:text-xl"
              >Ignore Forwards</span
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
                  id="ignore-forwards"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-forwards"
                  class="
                    toggle-label
                    checkbox-label
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
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="type === 'Random Sample'"
        class="hidden mediumDesktop:block mediumDesktop:col-span-1"
      ></div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { storeToRefs } from 'pinia'
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
} from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import TextInput from '~/components/inputs/TextInput.vue'
import { validationMessages, numberWithPercentage } from '@/utils/validations'
import SelectInput from '~/components/inputs/SelectInput'
import AllDates from '~/components/alert/AllDates.vue'
import AssignFlags from '~/components/alert/AssignFlags.vue'
import { useAlert } from '~/stores/alert'
import SlidingBar from '~/components/alert/sliding-bar/SlidingBar.vue'
import Notify from '~/components/alert/common-component/Notify.vue'
import EmailTextInput from '~/components/alert/common-component/EmailTextInput.vue'
// import PlusBellIcon from '~/components/shared/icon/PlusBellIcon.vue'
import SeverityThresholdSlidingBar from '~/components/alert/sliding-bar/SeverityThresholdSlidingBar.vue'
import AllFeedsMenu from '~/components/AllFeedsMenu.vue'

export default defineComponent({
  components: {
    SelectInput,
    AllDates,
    AssignFlags,
    SlidingBar,
    Notify,
    EmailTextInput,
    // PlusBellIcon,
    SeverityThresholdSlidingBar,
    TextInput,
    AllFeedsMenu,
  },
  setup() {
    const instance = getCurrentInstance()
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    const breakpoints = useBreakpoints({
      largeDesktop: 1366,
    })
    const store = useAlert()
    const { type } = storeToRefs(store)

    const targets = [
      { id: 0, text: '0%', value: 0 },
      { id: 1, text: '1%', value: 1 },
      { id: 2, text: '2%', value: 2 },
      { id: 3, text: '3%', value: 3 },
      { id: 4, text: '4%', value: 4 },
      { id: 5, text: '5%', value: 5 },
      { id: 6, text: '6%', value: 6 },
      { id: 7, text: '7%', value: 7 },
      { id: 8, text: '8%', value: 8 },
      { id: 9, text: '9%', value: 9 },
      { id: 10, text: '10%', value: 10 },
    ]
    const target = '%'

    const periods = [
      { id: 0, text: 'Ongoing', value: 0 },
      { id: 1, text: 'Outgoing', value: 1 },
    ]
    const period = ref('Ongoing')

    const teams = [
      { id: 0, text: 'Team 1', value: 'Team 1' },
      { id: 1, text: 'Team 2', value: 'Team 2' },
      { id: 2, text: 'Team 3', value: 'Team 3' },
    ]
    const team = ref('Team 1')

    const members = [
      { id: 0, text: 'Bob Rahman', value: 'Bob Rahman' },
      { id: 1, text: 'Tommy Thompson', value: 'Tommy Thompson' },
      { id: 2, text: 'James Jamison', value: 'James Jamison' },
      { id: 3, text: 'Ryan Rjiani', value: 'Ryan Rjiani' },
    ]
    const member = 'Bob Rahman'

    const types = [
      { id: 0, text: 'Alerts Library', value: 'Alerts Library' },
      { id: 1, text: 'Random Sample', value: 'Random Sample' },
    ]

    const inComingCheckbox = ref(true)
    const outGoingCheckbox = ref(true)

    const newAssignFlags = ref(0)
    const newAssignFlagsArray = ref([
      {
        id: 946663200000,
        percentage: 100,
        isChanged: false,
        flagFor: 'Bob Rahman',
        isCrossed: false,
      },
    ])
    const newAssignFlagsArrayFinal = ref([
      {
        id: 946663200000,
        percentage: 100,
        isChanged: false,
        flagFor: 'Bob Rahman',
        isCrossed: false,
      },
    ])

    const showErrorToast = (message) => {
      instance.proxy.$store.$toast.clear()
      setTimeout(() => {
        instance.proxy.$store.$toast.error(message, {
          className: ['toasted-bg-alert'],
        })
      }, 200)
    }
    const showSuccessToast = (message) => {
      instance.proxy.$store.$toast.clear()
      setTimeout(() => {
        instance.proxy.$store.$toast.success(message)
      }, 200)
    }

    const setFlagFor = computed(() => {
      const flagForSet = new Set(
        newAssignFlagsArrayFinal.value.map((obj) => obj.flagFor)
      )
      const unmatchedValue = members.find(
        (member) => !flagForSet.has(member.value)
      )
      if (unmatchedValue) {
        return unmatchedValue.value
      }
    })

    const newAssignFlagsArrayLength = ref(1)
    const totalAssignFlagsValue = ref(100)
    const assignInFlags = () => {
      if (newAssignFlagsArrayLength.value === members.length) {
        showErrorToast('All members have been assigned')
        return
      }
      const newAssignFlag = {
        id: new Date().getTime(),
        percentage: 100 / (newAssignFlagsArray.value.length + 1),
        isChanged: false,
        flagFor: setFlagFor.value,
        isCrossed: false,
      }
      newAssignFlagsArray.value.push(newAssignFlag)
      newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
      updateTotalValueFlags()

      setTimeout(() => {
        newAssignFlagsArrayFinal.value.forEach((item) => {
          item.isCrossed = true
        })
      }, 100)
    }

    const updateAssignValue = (newPercentage, id, oldTotal) => {
      totalAssignFlagsValue.value = 0
      if (newAssignFlagsArray.value.length === 2) {
        newAssignFlagsArray.value.forEach((item) => {
          if (item.id === id) {
            item.percentage = newPercentage
          } else {
            const availablePercentage = 100 - newPercentage
            item.percentage = Math.round(
              availablePercentage / (newAssignFlagsArray.value.length - 1)
            )
          }
          totalAssignFlagsValue.value += item.percentage
        })
        showSuccessToast('Value set successfully')
        // instance.proxy.$store.$toast.success('Value set successfully')
      } else {
        newAssignFlagsArray.value.forEach((item) => {
          if (item.id === id) {
            item.percentage = newPercentage
          }
          totalAssignFlagsValue.value += item.percentage
        })
        if (
          totalAssignFlagsValue.value >= 98 &&
          totalAssignFlagsValue.value <= 100
        ) {
          showSuccessToast('Value set successfully')
          // instance.proxy.$store.$toast.success('Value set successfully')
        } else {
          if (totalAssignFlagsValue.value > 100) {
            totalAssignFlagsValue.value = 100
          }
          if (totalAssignFlagsValue.value < 98) {
            totalAssignFlagsValue.value = 98
          }
          showErrorToast('You must set the value between 98 to 100')
          // instance.proxy.$store.$toast.error(
          //   'You must set the value between 98 to 100'
          // )
        }
      }
    }

    // const flagUpdate = (flagValue, id) => {
    //   newAssignFlagsArray.value.forEach((item, index) => {
    //     if (item.id === id) {
    //       item.flagFor = flagValue
    //     }
    //   })
    //   newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
    // }

    const flagUpdate = (flagValue, id) => {
      const itemToUpdateObj = newAssignFlagsArray.value.find(
        (item) => item.id === id
      )
      const swapWithObj = newAssignFlagsArray.value.find(
        (item) => item.flagFor === flagValue
      )

      if (swapWithObj) {
        swapWithObj.flagFor = itemToUpdateObj.flagFor
      }
      itemToUpdateObj.flagFor = flagValue
      newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
    }

    const pullFromFlags = (id) => {
      newAssignFlagsArray.value.forEach((item, index) => {
        if (item.id === id) {
          newAssignFlagsArray.value.splice(index, 1)
        }
      })
      newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
      updateTotalValueFlags()

      if (newAssignFlagsArrayFinal.value.length === 1) {
        newAssignFlagsArrayFinal.value[0].isCrossed = false
      }
    }

    const updateTotalValueFlags = () => {
      newAssignFlagsArray.value.forEach((item) => {
        item.percentage = Math.round(100 / newAssignFlagsArray.value.length)
      })
      totalAssignFlagsValue.value =
        Math.round(100 / newAssignFlagsArray.value.length) *
        newAssignFlagsArray.value.length
      if (totalAssignFlagsValue.value > 100) {
        const needDecrease = totalAssignFlagsValue.value - 100
        newAssignFlagsArray.value[0].percentage -= needDecrease
        totalAssignFlagsValue.value = 100
      } else if (totalAssignFlagsValue.value < 100) {
        const needDecrease = 100 - totalAssignFlagsValue.value
        newAssignFlagsArray.value[0].percentage += needDecrease
        totalAssignFlagsValue.value = 100
      }
      newAssignFlagsArrayLength.value = newAssignFlagsArray.value.length
    }

    const newNotifies = ref(0)
    const assignNewNotify = () => {
      store.setCurrentInputTab('Email')
      newNotifies.value = newNotifies.value + 1
    }

    const pullNewNotify = () => {
      newNotifies.value = newNotifies.value - 1
    }

    const newFields = ref(1)
    const newFieldsArray = ref([
      {
        // id: newFields.value,
        id: 946663200000,
        email: '',
        text: '',
        emailTextTab: 'Email',
        notifyFor: 'Bob Rahman',
        isBellShow: true,
        isCrossed: false,
      },
    ])

    const setNotifyFor = computed(() => {
      const notifyForSet = new Set(
        newFieldsArray.value.map((obj) => obj.notifyFor)
      )
      const unmatchedValue = members.find(
        (member) => !notifyForSet.has(member.value)
      )
      if (unmatchedValue) {
        return unmatchedValue.value
      }
    })

    const assignNewFields = () => {
      if (newFieldsArray.value.length === members.length) {
        showErrorToast('All members have been assigned')
        return
      }
      newFields.value = newFields.value + 1
      newFieldsArray.value[newFieldsArray.value.length - 1].isBellShow = false
      // if (newFieldsArray.value.some((item) => item.id === newFields.value)) {
      //   newFieldsArray.value.push({
      //     id: newFields.value + 1,
      //     email: '',
      //     text: '',
      //     emailTextTab: 'Email',
      //     notifyFor: 'Bob Rahman',
      //     isBellShow: true,
      //     isCrossed: false,
      //   })
      // } else {
      //   newFieldsArray.value.push({
      //     id: newFields.value,
      //     email: '',
      //     text: '',
      //     emailTextTab: 'Email',
      //     notifyFor: 'Bob Rahman',
      //     isBellShow: true,
      //     isCrossed: false,
      //   })
      // }
      newFieldsArray.value.push({
        id: new Date().getTime(),
        email: '',
        text: '',
        emailTextTab: 'Email',
        notifyFor: setNotifyFor.value,
        isBellShow: true,
        isCrossed: false,
      })
      setTimeout(() => {
        newFieldsArray.value[newFieldsArray.value.length - 1].isCrossed = true
      }, 100)
    }

    const pullNewFields = (id) => {
      newFields.value = newFields.value - 1
      newFieldsArray.value.forEach((item, index) => {
        if (item.id === id) {
          newFieldsArray.value.splice(index, 1)
        }
      })
      newFieldsArray.value[newFieldsArray.value.length - 1].isBellShow = true
    }

    // const notifyUpdate = (notifyValue, id) => {
    //   newFieldsArray.value.forEach((item, index) => {
    //     if (item.id === id) {
    //       item.notifyFor = notifyValue
    //     }
    //   })
    // }

    const notifyUpdate = (notifyValue, id) => {
      const itemToUpdateObj = newFieldsArray.value.find(
        (item) => item.id === id
      )
      const swapWithObj = newFieldsArray.value.find(
        (item) => item.notifyFor === notifyValue
      )

      if (swapWithObj) {
        swapWithObj.notifyFor = itemToUpdateObj.notifyFor
      }
      itemToUpdateObj.notifyFor = notifyValue
    }

    const addEmail = (data) => {
      newFieldsArray.value.forEach((item) => {
        if (item.id === data.id) {
          item.email = data.email
        }
      })
    }

    const addText = (data) => {
      newFieldsArray.value.forEach((item) => {
        if (item.id === data.id) {
          item.text = data.text
        }
      })
    }

    const setEmailTextTab = (value) => {
      newFieldsArray.value.forEach((item, index) => {
        if (item.id === value.id) {
          item.emailTextTab = value.tab
        }
      })
    }

    const selectedType = (event, type) => {
      console.log(event, type)
    }

    return {
      store,
      targets,
      target,
      periods,
      period,
      teams,
      team,
      members,
      member,
      newAssignFlags,
      newAssignFlagsArray,
      newAssignFlagsArrayFinal,
      newAssignFlagsArrayLength,
      totalAssignFlagsValue,
      types,
      type,
      inComingCheckbox,
      outGoingCheckbox,
      assignInFlags,
      updateAssignValue,
      flagUpdate,
      pullFromFlags,
      selectedType,
      newNotifies,
      assignNewNotify,
      pullNewNotify,
      newFields,
      assignNewFields,
      pullNewFields,
      isDesktop: breakpoints.greater('largeDesktop'),
      isMedium: tailwindBreakpoints.greater('md'),
      addEmail,
      addText,
      setEmailTextTab,
      newFieldsArray,
      notifyUpdate,
      setFlagFor,
      showErrorToast,
    }
  },
  data() {
    return {
      feeds: [
        {
          id: 'all_feeds',
          name: 'All Feeds',
          value: true,
          media: [
            {
              id: 'social_media',
              mediaName: 'Social Media',
              mediaValue: true,
              individualMedia: [
                { id: 'twitter', value: true, individualMediaName: 'Twitter' },
                {
                  id: 'facebook',
                  value: true,
                  individualMediaName: 'Facebook',
                },
                {
                  id: 'instagram',
                  individualMediaName: 'Instagram',
                  value: true,
                  individualMediaAccount: [
                    { id: 'abc_company', accountName: 'abc_company' },
                    { id: 'xyzinfo', accountName: 'xyzinfo' },
                  ],
                },
                {
                  id: 'linkedIn',
                  value: true,
                  individualMediaName: 'LinkedIn',
                },
              ],
            },
            {
              id: 'website',
              mediaName: 'Website',
              mediaValue: true,
              individualMedia: [],
            },
            {
              id: 'email',
              mediaName: 'Email Accounts',
              mediaValue: true,
              individualMedia: [],
            },
            {
              id: 'chat',
              mediaName: 'Chat',
              mediaValue: true,
              individualMedia: [],
            },
            {
              id: 'group',
              mediaName: 'Group',
              mediaValue: true,
              individualMedia: [
                {
                  id: 'bob_smith',
                  value: true,
                  individualMediaName: "Bob Smith's Feed",
                },
                {
                  id: 'john_doe',
                  value: true,
                  individualMediaName: 'John Doe Feed',
                },
                {
                  id: 'jane_doe',
                  value: true,
                  individualMediaName: 'Jane Doe Feed',
                },
              ],
            },
          ],
        },
      ],
      concernValue: '',
      confidenceValue: '',
      controlBoxRound: false,
    }
  },
  validations: {
    target: {
      required,
      maxLength: maxLength(4),
      numberWithPercentage,
    },
  },
  computed: {
    calculateIndex() {
      const index = (this.concernValue / 100) * (this.confidenceValue / 100)
      const calculatedIndex = index.toFixed(3)
      return calculatedIndex
    },
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    controlRound(value) {
      this.controlBoxRound = value
    },
    focusTarget() {
      this.getInputValue()
    },
    isNumber(event) {
      event = event || window.event
      const charCode = event.target.value
        .charAt(event.target.selectionStart - 1)
        .charCodeAt()
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 37
      ) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, '')
        event.preventDefault()
      } else {
        return true
      }
    },
    isNumberKey(event) {
      if (!/\d/.test(event.key)) return event.preventDefault()
    },
    getInputValue(value) {
      const source = document.getElementById('target_input')
      window.addEventListener('keyup', function (e) {
        e = e || window.event
        if (value === undefined || value === '%') {
          value = '%'
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        }

        if (e.keyCode === 39) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else if (e.keyCode === 40) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else if (value === undefined) {
          value = '%'
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else {
          const lastCharacter = value.charAt(value.length - 1)
          if (lastCharacter !== '%') {
            value += '%'
            this.target = value
          }
        }
      })
      document.body.onclick = (e) => {
        e = e || window.event
        if ('which' in e) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else if ('button' in e) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        }
      }
    },
    ValueFromConcernThreshold($event) {
      this.concernValue = $event
    },
    ValueFromConfidenceThreshold($event) {
      this.confidenceValue = $event
    },
  },
})
</script>

<style lang="scss" scoped>
input.name-placeholder-style::-webkit-input-placeholder {
  color: #f8f8f8;
  font-size: 16px;
  font-weight: bold;
}

input.name-placeholder-style::-moz-placeholder {
  color: #f8f8f8;
  font-size: 16px;
  font-weight: bold;
}

input.placeholder-style::-webkit-input-placeholder {
  font-style: italic;
  color: #fcfcfc;
}

input.placeholder-style::-moz-placeholder {
  font-style: italic;
  color: #fcfcfc;
}

.min-w {
  &-40 {
    min-width: 40px;
  }
}

.target-input {
  width: 240px;
  // height: 40px;
}

.toggle-checkbox {
  width: 16px;
  min-width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &.toggle.label {
    min-width: 36px !important;
  }
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #a22a2a;
    min-width: 36px;
  }
}
.checkbox-label {
  min-width: 36px !important;
}

.in-out-checkbox {
  transition: all 0.5s ease-in-out;
  &:checked + .toggle-label {
    @apply bg-red-deep text-white;
    transition: all 0.5s ease-in-out;
  }
}

/* for FadeIn FadeOut */
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

.scroll {
  scrollbar-color: #a22a2a #ececec; /* Firefox 64 */

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #a22a2a;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #a22a2a;
  }
}

.toggle-check-1 {
  &:checked {
    @apply bg-white;
  }
  &:checked + .check-1 {
    @apply text-red-deep opacity-100;
  }
}

@media (max-width: 396px) {
  .in-out-width {
    @apply w-52;
  }
}
.max-height-320 {
  max-height: 320px;
  // max-height: var(--height);
}
.allFeeds_ul_wrapper {
  box-shadow: 0px 4px 6px #00000080;
}
.scroll-x {
  overflow-x: hidden !important;
}
ul {
  width: 100%;
  max-height: 320px;
  // max-height: var(--height);
}
.total-width {
  width: 240px;
}
.assign-flag-input {
  width: 240px;
}
@media (min-width: 1366px) and (max-width: 1568px) {
  .total-width {
    width: 168px;
  }
  .assign-flag-input {
    width: 224px;
  }
}
@media (max-width: 442px) {
  .total-width {
    width: 168px;
  }
}
</style>
