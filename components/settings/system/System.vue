<template>
  <section class="h-full">
    <div
      v-if="isDesktop"
      class="
        relative
        hidden
        h-full
        space-y-5
        pt-4
        md:flex md:flex-col
        card-wrapper
        px-2
      "
    >
      <!--  start => format logs-->
      <div
        id="resizeMe"
        class="
          card
          relative
          transition-all
          duration-500
          ease-in-out
          format-height
        "
        :class="formatSettingsExpand ? 'format-height' : 'collapse-height'"
      >
        <div
          class="card-header flex justify-center items-center px-4"
          @click="expandCollapseFunctionality ? expandCollapse() : ''"
        >
          <h3 class="card-title flex-grow pl-5">Format Settings</h3>
          <span
            v-if="expandCollapseFunctionality"
            class="select-toggle transition duration-500 transform"
            :class="formatSettingsExpand ? 'rotate-180' : 'rotate-0'"
          >
            <fa :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div
          class="
            overflow-auto
            scroll
            bg-white
            rounded-2xl
            py-4
            px-8
            h-full
            w-full
            flex flex-col
            items-center
            justify-center
          "
        >
          <div
            v-if="authUser.userPermission !== 'User'"
            class="
              times
              flex
              text-center
              justify-center
              lg:w-4/6
              md:w-full
              space-x-5
            "
          >
            <div class="w-full">
              <strong class="date-format-title">Date Format</strong>
              <select-input
                v-model="date"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                class="mt-4"
                :options="allDate"
                place-holder="Select Date"
                :place-holder-disabled="true"
                color="white"
                background="#fbbf25"
                caret-bg="#fbbf25"
                scroll-color="#9e7912"
                @input="selectedValue($event)"
              ></select-input>
            </div>
            <div class="w-full">
              <strong class="date-format-title">Time Format</strong>
              <select-input
                v-model="timeFormat"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                class="mt-4"
                :options="timeFormats"
                color="white"
                background="#fbbf25"
                caret-bg="#fbbf25"
                scroll-color="#9e7912"
                @input="selectedValue($event)"
              ></select-input>
            </div>
            <div class="w-full">
              <strong class="date-format-title">Time Zone</strong>
              <select-input
                v-model="timeZone"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                class="mt-4"
                :options="allTimesZone"
                :response-by-id="true"
                place-holder="Select Time Zone"
                :place-holder-disabled="true"
                color="white"
                background="#fbbf25"
                caret-bg="#fbbf25"
                scroll-color="#9e7912"
                @input="selectedValue($event)"
              ></select-input>
            </div>
          </div>
          <div
            class="flex text-center justify-center"
            :class="authUser.userPermission !== 'User' ? 'mt-10' : ''"
          >
            <h2 class="text-3xl font-bold">
              {{ currentDateTime }}
              ({{ timeZoneText }})
            </h2>
          </div>
        </div>
        <!-- <div
          id="resizeIcon"
          class="absolute pr-2 bottom-0 z-30 w-full text-right block"
          @mousedown="mouseDownHandler"
          @mouseup="mouseUpHandler"
          @touchstart="touchDownHandler"
          @touchend="touchUpHandler"
        >
          <fa
            class="text-xl font-light text-yellow-primary"
            :icon="['fas', 'arrows-alt-v']"
          />
        </div>-->
      </div>
      <!--  end => format logs-->

      <!--  start => system alerts-->
      <div v-if="betaVersion" class="card desktop-card">
        <div class="card-header flex justify-center items-center px-4">
          <h3 class="card-title flex-grow pl-5">System Alerts</h3>
          <span
            class="select-toggle transition duration-500 transform"
            :class="archiveIsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <fa :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div class="card-body scroll">
          <div class="table-wrapper">
            <!--start => table header section-->
            <div
              class="
                flex
                items-center
                justify-start
                w-4/5
                py-3
                space-x-5
                sticky
                top-0
                bg-white
                z-10
              "
            >
              <div class="table-th">
                <strong>Active</strong>
              </div>
              <div
                class="
                  font-bold
                  text-ash-primary
                  w-full
                  break-all
                  md:text-lg
                  text-md
                "
              >
                <strong>Alert Name</strong>
              </div>
            </div>
            <!--end => table header section-->

            <!--start => table body section-->
            <div class="body w-4/5">
              <div
                v-for="(alertItem, index) in newSystemAlerts"
                :key="index + 'alert-web'"
                class="table-tr space-x-5"
              >
                <div class="table-td">
                  <div class="flex items-center space-x-3">
                    <a data-title="Edit">
                      <div
                        class="w-5 h-5 bg-yellow-midlight relative rounded-full"
                      >
                        <fa
                          class="
                            text-white text-sm
                            p-0.5
                            cursor-pointer
                            absolute
                            left-1/2
                            top-1/2
                            transform
                            -translate-x-1/2 -translate-y-1/2
                          "
                          :icon="['fas', 'pencil-alt']"
                          @click="editNewAlertSystem(alertItem.id)"
                        />
                      </div>
                    </a>
                    <div
                      class="toggle-btn-wrapper"
                      @click="
                        newSystemAlertStatusChange(
                          alertItem.status,
                          alertItem.id,
                          $event
                        )
                      "
                    >
                      <input
                        :checked="alertItem.status"
                        type="checkbox"
                        name="toggle"
                        class="toggle-input"
                      />
                      <label class="toggle-input-label toggle-label"></label>
                    </div>
                  </div>
                </div>
                <div class="text-gray-600 w-full break-all md:text-lg text-md">
                  <span>{{ alertItem.newAlertName }}</span>
                </div>
              </div>
            </div>
            <!--end => table body section-->
          </div>
        </div>
        <div class="card-footer flex items-center justify-end mr-6 pb-2">
          <button
            class="
              rounded-full
              border-2 border-yellow-midlight
              py-1
              lg:px-5
              px-3
              text-center text-white
              bg-yellow-midlight
              font-bold
              md:text-md
              text-lg
            "
            @click="$emit('showNewAlert')"
          >
            Create New System Alert
          </button>
        </div>
      </div>
      <!--  end => system alerts-->

      <!--  start => active logs-->
      <div
        id="resizeMeAlso"
        class="
          card
          activity-log-card
          transition-all
          duration-500
          ease-in-out
          flex-grow
        "
      >
        <div class="card-header flex justify-center items-center px-4">
          <!-- <h3 class="text-white col-span-1"></h3> -->
          <h3 class="text-white flex-grow pl-5 font-bold md:text-xl text-lg">
            Activity Log
          </h3>
        </div>
        <div id="notificationWeb" class="activity-log-card-body scroll">
          <table class="table-wrapper min-w-full px-0 scroll h-full">
            <!--start => table header section-->
            <thead>
              <tr class="bg-yellow-moreLight sticky top-0 z-1 border-b">
                <!-- <div class="table-th min-width-5">
                <strong>Action </strong>
                </div>-->
                <th class="table-th">
                  <strong>Date & Time</strong>
                </th>
                <th class="table-th">
                  <strong>Message</strong>
                </th>
                <th class="table-th">
                  <strong>Category</strong>
                </th>
              </tr>
            </thead>
            <!--end => table header section-->

            <!--start => table body section-->
            <tbody class="body">
              <tr
                v-for="(activityLog, index) in getNotifications"
                :key="index + 'system-alert-web'"
                :class="[
                  notificationBackground(activityLog),
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-default',
                ]"
              >
                <!-- <div class="table-td min-width-5">
                  <a
                    data-title="Delete"
                    class="
                      w-7
                      h-7
                      cursor-pointer
                      flex
                      items-center
                      justify-center
                    "
                    @click="deleteLog(activityLog.id)"
                  >
                    <fa
                      class="text-red-600 text-md"
                      :icon="['fas', 'times-circle']"
                    />
                  </a>
                </div>-->
                <td class="table-td">
                  <DateTime
                    :datetime="activityLog.createdAt"
                    format="MMMM, dd yyyy, hh:mm aa"
                    class="whitespace-nowrap"
                  />
                </td>
                <td
                  class="table-td relative cursor-pointer has-tooltip"
                  @click="
                    authUser.userPermission !== 'User'
                      ? readMe(activityLog)
                      : ''
                  "
                >
                  <span class="whitespace-nowrap">{{
                    activityLog.message | strLimit(78)
                  }}</span>
                  <span
                    v-if="activityLog.message.length > 78"
                    class="absolute w-full"
                    :class="
                      index >= notifications.length - 4 ? 'tooltip1' : 'tooltip'
                    "
                    >{{ activityLog.message }}</span
                  >
                </td>

                <td class="table-td">
                  <span class="whitespace-nowrap">{{
                    activityLog.category
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <span
        v-if="authUser.userPermission !== 'User'"
        class="
          text-right
          footer-button
          sticky
          bottom-0
          bg-ash-default
          mt-0
          z-30
        "
      >
        <button
          :style="{
            color: globalColorPanel.backgroundColor,
            borderColor: globalColorPanel.backgroundColor,
          }"
          class="
            py-2
            px-6
            bg-yellow-midlight
            text-white
            rounded-full
            font-bold
            mt-5s
            mr-2
          "
          :disabled="readAllProcess && unreadNotificationCount > 0"
          @click="markAllRead"
        >
          <span>Mark All as Read</span>
        </button>
        <button
          class="
            py-2
            px-6
            bg-yellow-midlight
            text-white
            rounded-full
            font-bold
            mt-5
          "
          @click="showArchiveSettings($event)"
        >
          Archive Settings
        </button>
      </span>
    </div>

    <!-- Small Device -->
    <div
      v-else
      class="
        md:hidden
        flex flex-col
        relative
        space-y-2
        h-full
        mobile-card-wrapper
      "
    >
      <!-- <div class="flex flex-col relative space-y-2 h-full scroll"> -->
      <div
        id="resizeMe"
        class="card relative mx-0.5 transition-all duration-500 ease-in-out"
        :class="formatSettingsExpand ? 'expnad-height' : 'collapse-height'"
      >
        <div
          class="card-header flex justify-center items-center px-4"
          @click="expandCollapse()"
        >
          <h3 class="card-title pl-5 flex-grow">Format Settings</h3>
          <span
            class="select-toggle transition duration-500 transform"
            :class="formatSettingsExpand ? 'rotate-180' : 'rotate-0'"
          >
            <fa class="mt-0.5" :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div
          class="bg-white h-full w-full rounded-2xl"
          :class="formatSettingsExpand ? 'overflow-auto scroll' : 'scroll-hide'"
        >
          <div
            v-if="authUser.userPermission !== 'User'"
            class="grid grid-cols-12 w-full p-2 gap-2"
          >
            <div class="w-full col-span-6">
              <h2 class="date-format-title text-yellow-midlight font-normal">
                Date Format
              </h2>
              <select-input
                v-model="date"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                :options="allDate"
                place-holder="Select Date"
                :place-holder-disabled="true"
                color="white"
                background="#fbbf25"
                caret-bg="#fbbf25"
                @input="selectedValue($event)"
              ></select-input>
            </div>
            <div class="w-full col-span-6">
              <h2 class="date-format-title text-yellow-midlight font-normal">
                Time Format
              </h2>
              <select-input
                v-model="timeFormat"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                :options="timeFormats"
                color="white"
                background="#fbbf25"
                caret-bg="#fbbf25"
                @input="selectedValue($event)"
              ></select-input>
            </div>
            <div class="w-full col-span-6">
              <h2 class="date-format-title text-yellow-midlight font-normal">
                Time Zone
              </h2>
              <select-input
                v-model="timeZone"
                class-style-name="searchPageScrollStyle searchPageScrollWidth search-select-input"
                :options="allTimesZone"
                :response-by-id="true"
                place-holder="Select Time Zone"
                :place-holder-disabled="true"
                color="white"
                background="#fbbf25"
                caret-bg="#fbbf25"
                @input="selectedValue($event)"
              ></select-input>
            </div>
          </div>

          <div
            v-if="authUser.userPermission !== 'User'"
            class="flex text-center justify-center my-5"
          >
            <h2 class="text-xl font-bold">
              {{ currentDateTime }} ({{ timeZoneText }})
            </h2>
          </div>
          <div
            v-else
            class="
              flex
              inner-height
              text-center
              justify-center
              items-center
              my-5
            "
          >
            <h2 class="text-xl font-bold">
              {{ currentDateTime }} ({{ timeZoneText }})
            </h2>
          </div>
        </div>
        <!-- <div
          id="resizeIcon"
          class="absolute pr-2 bottom-0 z-30 w-full text-right block"
          @mousedown="mouseDownHandler"
          @mouseup="mouseUpHandler"
          @touchstart="touchDownHandler"
          @touchend="touchUpHandler"
        >
          <fa
            class="text-xl font-light text-yellow-primary"
            :icon="['fas', 'arrows-alt-v']"
          />
        </div>-->
      </div>

      <!--  start => system alerts-->
      <div v-if="betaVersion" class="card mx-0.5">
        <div class="card-header">
          <h3 class="card-title">System Alerts</h3>
        </div>
        <div class="card-body scroll rounded-2xl">
          <div class="table-wrapper">
            <!--start => table header section-->
            <div
              class="
                flex
                items-center
                justify-start
                py-2
                w-full
                space-x-4
                sticky
                top-0
                bg-white
                z-10
              "
            >
              <div
                class="
                  md:font-bold
                  font-normal
                  md:text-gray-800
                  text-left
                  w-2/5
                  break-all
                  md:text-lg
                  text-md text-yellow-midlight
                "
              >
                <span>Active</span>
              </div>
              <div
                class="
                  md:font-bold
                  font-normal
                  md:text-gray-800
                  w-3/5
                  break-all
                  md:text-lg
                  text-md text-left text-yellow-midlight
                "
              >
                <span>Alert Name</span>
              </div>
            </div>
            <!--end => table header section-->

            <!--start => table body section-->
            <div class="body pb-2 w-full">
              <div
                v-for="(alertItem, index) in newSystemAlerts"
                :key="index + 'alert-small'"
                class="table-tr space-x-4"
              >
                <div class="table-td">
                  <div class="flex items-center space-x-2">
                    <a
                      data-title="Delete"
                      class="
                        w-7
                        h-7
                        cursor-pointer
                        flex
                        items-center
                        justify-center
                      "
                      @click="editNewAlertSystem(alertItem.id), showBlur()"
                    >
                      <div
                        class="w-5 h-5 bg-yellow-midlight relative rounded-full"
                      >
                        <fa
                          class="
                            text-white text-sm
                            p-0.5
                            absolute
                            left-1/2
                            top-1/2
                            transform
                            -translate-x-1/2 -translate-y-1/2
                          "
                          :icon="['fas', 'pencil-alt']"
                        />
                      </div>
                    </a>

                    <div
                      v-if="betaVersion"
                      class="toggle-btn-wrapper"
                      @click="
                        newSystemAlertStatusChange(
                          alertItem.status,
                          alertItem.id,
                          $event
                        )
                      "
                    >
                      <input
                        :checked="alertItem.status"
                        type="checkbox"
                        name="toggle"
                        class="toggle-input"
                      />
                      <label class="toggle-input-label toggle-label"></label>
                    </div>
                  </div>
                </div>
                <div class="text-gray-600 w-3/5 break-all md:text-lg text-md">
                  <span>{{ alertItem.newAlertName }}</span>
                </div>
              </div>
            </div>
            <!--end => table body section-->
          </div>
        </div>
        <div class="card-footer text-right mt-2 pb-2 pr-6">
          <button
            class="
              rounded-full
              border-2 border-yellow-midlight
              text-center text-white
              bg-yellow-midlight
              font-bold
              text-md
              px-2
              py-1
            "
            @click="showNewSystemAlertBarOnMobile(), showBlur()"
          >
            Create New System Alert
          </button>
        </div>
      </div>
      <!--  end => system alerts-->

      <div
        id="resizeMeAlso"
        class="card mx-0.5 z-99 transition-all duration-500 ease-in-out"
        :class="activityLogExapand ? 'expnad-height' : 'collapse-height'"
      >
        <div
          class="card-header flex items-center justify-center px-4"
          @click="expandCollapse()"
        >
          <h3
            class="
              text-offwhite-200
              font-bold
              md:text-xl
              text-lg
              flex-grow
              pl-5
            "
          >
            Activity Log
          </h3>
          <span
            class="select-toggle transition duration-500 transform"
            :class="activityLogExapand ? 'rotate-180' : 'rotate-0'"
          >
            <fa class="mt-0.5" :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <!-- card body-->
        <div
          id="notificationWeb"
          class="overflow-auto scroll bg-white h-full mobile-notifications"
        >
          <table class="table-wrapper min-w-full">
            <tbody>
              <!--start => table header section-->
              <tr class="bg-yellow-moreLight sticky top-0 z-10 border-b">
                <!-- <div
                class="
                  font-normal
                  text-yellow-midlight text-left
                  w-1/6
                  break-all
                  md:text-lg
                  text-md
                  min-width-6
                "
              >
                <span>Action</span>
                </div>-->
                <th class="table-th">
                  <span>Date & Time</span>
                </th>
                <th class="table-th">
                  <span>Message</span>
                </th>
                <th class="table-th">
                  <span>Category</span>
                </th>
              </tr>
            </tbody>
            <!--end => table header section-->

            <!--start => table body section-->
            <tbody class="body w-full">
              <tr
                v-for="(activityLog, index) in getNotifications"
                :key="index + 'alert-log-web'"
                class="z-9"
                :class="[
                  notificationBackground(activityLog),
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-default',
                ]"
              >
                <!-- <div class="text-gray-600 w-1/6 break-all text-sm min-width-6">
                  <a
                    data-title="Delete"
                    class="
                      w-7
                      h-7
                      cursor-pointer
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <fa
                      class="text-red-600 text-md cursor-pointer"
                      :icon="['fas', 'times-circle']"
                      @click="deleteLog(activityLog.id)"
                    />
                  </a>
                </div>-->
                <td class="table-td">
                  <DateTime
                    :datetime="activityLog.createdAt"
                    format="MMMM, dd yyyy, hh:mm aa"
                    class="whitespace-nowrap"
                  />
                </td>
                <td
                  class="table-td"
                  @click="
                    authUser.userPermission !== 'User'
                      ? readMe(activityLog)
                      : ''
                  "
                >
                  <span>{{ activityLog.message | strLimit(30) }}</span>
                  <!-- <span
                    class="tooltip absolute auto"
                    :class="
                      index >= notifications.length - 3 ? 'tooltip1' : 'tooltip'
                    "
                    :style="{
                      marginLeft: '-90px',
                      marginRight: '15px',
                      fontSize: '10px',
                    }"
                    >{{ activityLog.message }}</span
                  >-->
                </td>
                <td class="table-td">
                  <span>{{ activityLog.category }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <span
        v-if="authUser.userPermission !== 'User'"
        class="
          text-right
          footer-button
          sticky
          bottom-0
          bg-ash-default
          mt-0
          z-30
          space-x-1
          flex
          justify-end
          flex-nowrap
        "
      >
        <button
          :style="{
            color: globalColorPanel.backgroundColor,
            borderColor: globalColorPanel.backgroundColor,
          }"
          class="
            py-1
            px-4
            bg-yellow-midlight
            text-white
            rounded-full
            font-bold
            mt-2
          "
          :disabled="readAllProcess && unreadNotificationCount > 0"
          @click="markAllRead"
        >
          <span>Mark All as Read</span>
        </button>
        <button
          class="
            py-1
            px-4
            bg-yellow-midlight
            text-white
            rounded-full
            font-bold
            mt-2
            mr-1
          "
          @click="showArchiveSettings($event)"
        >
          Archive Settings
        </button>
      </span>
      <!-- </div> -->
    </div>

    <alert-confirm-modal
      :processing="notificationDeleteProcess"
      :show="showDeleteAlert"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import { parseISO } from 'date-fns'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { format, utcToZonedTime } from 'date-fns-tz'
import SelectInput from '~/components/inputs/SelectInput'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'

import {
  ACTIVITY_LOGS_PDF_LINKS,
  NEW_SYSTEM_ALERT,
  NEW_SYSTEM_ALERT_STATUS,
  TIME,
} from '~/constants/urls'

export default defineComponent({
  auth: false,
  name: 'System',

  components: { SelectInput, AlertConfirmModal },
  props: {
    addedNewAlert: {
      type: Object,
      default: null,
    },
    editedNewAlert: {
      type: Object,
      default: null,
    },
    deleteNewSystemAlertId: {
      type: String,
      default: '',
    },
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const formatSettingsExpand = ref(true)
    const activityLogExapand = ref(false)
    const bodyHeight = ref(0)
    const expandCollapseFunctionality = ref(true)

    const expandCollapse = () => {
      formatSettingsExpand.value = !formatSettingsExpand.value
      activityLogExapand.value = !activityLogExapand.value
    }

    return {
      isDesktop: breakpoints.greater('md'),
      formatSettingsExpand,
      activityLogExapand,
      expandCollapse,
      bodyHeight,
      expandCollapseFunctionality,
    }
  },
  data() {
    return {
      date: 'MMMM dd, yyyy',
      timeFormat: 'hh:mm aa',
      timeZone: 24,
      timeZoneId: 24,
      timeZoneText: 'Mountain Standard Time (UTC-7)',
      timeZoneUtc: 'US/Arizona',
      activityLogs: [],
      limit: 'all',
      activityLogsDownload: '',
      newSystemAlerts: [],
      showMessageModal: false,
      message: null,
      changeValue: true,
      showDeleteAlert: false,
      notificationDeleteProcess: false,
      deletedLogId: '',
      interval1: null,
      currentDateTime: null,
      interval2: null,
      interval3: null,
      loadMoreProgress: false,
      yAxisPart1: 0,
      yAxisPart2: 0,
      hPart1: 0,
      hPart2: 0,
      initialUpperHeight: '',
      initialLowerHeight: '',
      readAllProcess: false,
    }
  },
  computed: {
    ...mapState(['betaVersion']),
    ...mapState('setting', ['currentComponent']),
    ...mapState('notifications', ['notifications', 'emargencyCategory']),
    ...mapGetters('notifications', [
      'unreadNotificationCount',
      'isExistNotifications',
      'getNotifications',
    ]),
    ...mapState('system', [
      'allDate',
      'allTimesZone',
      'timeFormats',
      'formatDate',
      'formatTime',
      'utcTimeZone',
      'timeId',
      'zoneText',
    ]),
    authUser() {
      return this.$auth.user
    },
    openAddFeedModal() {
      return this.$store.getters['socialFeed/openAddFeedModal']
    },
  },
  watch: {
    limit() {
      this.getAllActivityLogs()
    },
    zoneText() {
      this.date = this.formatDate
      this.timeFormat = this.formatTime
      this.timeZone = this.timeId
      this.timeZoneId = this.timeId
      this.timeZoneText = this.zoneText
      this.timeZoneUtc = this.utcTimeZone
    },
    timeId() {
      this.date = this.formatDate
      this.timeFormat = this.formatTime
      this.timeZone = this.timeId
      this.timeZoneId = this.timeId
      this.timeZoneText = this.zoneText
      this.timeZoneUtc = this.utcTimeZone
    },
    formatDate() {
      this.date = this.formatDate
      this.timeFormat = this.formatTime
      this.timeZone = this.timeId
      this.timeZoneId = this.timeId
      this.timeZoneText = this.zoneText
      this.timeZoneUtc = this.utcTimeZone
    },
    formatTime() {
      this.date = this.formatDate
      this.timeFormat = this.formatTime
      this.timeZone = this.timeId
      this.timeZoneId = this.timeId
      this.timeZoneText = this.zoneText
      this.timeZoneUtc = this.utcTimeZone
    },
    addedNewAlert(data) {
      if (data) {
        this.newSystemAlerts.unshift(data)
      }
    },
    editedNewAlert(data) {
      if (data) {
        this.newSystemAlerts.map((item) => {
          if (item.id === data.id) {
            item.status = data.status
            item.newAlertName = data.newAlertName
            item.feedId = data.feedId
            item.newSystemAlertLibraryId = data.newSystemAlertLibraryId
            item.chooseEventId = data.chooseEventId
            item.notificationMethodId = data.notificationMethodId
            item.type = data.type
            item.email = data.email
            item.phone = data.phone
            item.url = data.url
          }
          return item
        })
      }
    },
    deleteNewSystemAlertId(id) {
      if (id) {
        this.deleteSystemAlert(id)
      }
    },
    openAddFeedModal(data) {
      if (data) {
        this.removeScroll()
      } else {
        this.addScroll()
      }
    },
  },
  created() {
    this.chnageValue = false
  },
  beforeDestroy() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
    clearInterval(this.interval3)
    this.addScroll()
  },
  mounted() {
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
    const upperPart = document.getElementById('resizeMe')
    const lowerPart = document.getElementById('resizeMeAlso')
    setTimeout(() => {
      this.initialUpperHeight = upperPart.offsetHeight + 10
      this.initialLowerHeight = lowerPart.offsetHeight + 10
    }, 500)

    if (this.currentComponent === 'System') {
      if (
        this.formatDate &&
        this.formatTime &&
        this.utcTimeZone &&
        this.zoneText &&
        this.timeId
      ) {
        this.date = this.formatDate
        this.timeFormat = this.formatTime
        this.timeZone = this.timeId
        this.timeZoneUtc = this.utcTimeZone
        this.timeZoneText = this.zoneText
        this.timeZoneId = this.timeId
      }

      this.setTimeFormat()
      // await this.getAllNotifications()
      if (this.isDesktop) {
        this.addScroll()
      } else {
        this.addScroll()
      }
    }
  },
  destroyed() {
    setTimeout(() => {
      window.removeEventListener('resize', this.resizeWindow)
    }, 2000)
  },
  methods: {
    ...mapActions('notifications', [
      'getAllNotifications',
      'readMeNotification',
      'deleteNotification',
    ]),
    ...mapActions('system', ['getAllTimeFormats']),
    addScroll() {
      const containerWeb = document.getElementById('notificationWeb')
      containerWeb.addEventListener('scroll', this.loadMore)
    },
    removeScroll() {
      const containerWeb = document.getElementById('notificationWeb')
      containerWeb.removeEventListener('scroll', this.loadMore)
    },
    async loadMore(event) {
      const element = event.target
      if (
        parseInt(element.scrollHeight - element.scrollTop) <=
          element.clientHeight &&
        !this.loadMoreProgress &&
        this.isExistNotifications
      ) {
        if (!this.isExistNotifications) {
          this.$toast.clear()
          // return this.$toast.error('There are no notifications found!')
        }
        try {
          this.loadMoreProgress = true
          const res = await this.$store.dispatch(
            'notifications/getAllNotifications'
          )
          if (res.status !== 200) {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.loadMoreProgress = false
        }
      }
    },
    async getActivityLogsDownload() {
      try {
        const res = await this.$axios.$get(ACTIVITY_LOGS_PDF_LINKS)
        if (res.success) {
          this.activityLogsDownload = res.data
        }
      } catch (error) {}
    },
    setTimeFormat() {
      this.interval1 = setInterval(() => {
        const date = new Date()
        const timeZone = this.timeZoneUtc
        const zonedDate = utcToZonedTime(date, timeZone)
        this.currentDateTime = format(
          zonedDate,
          `${this.date} ${this.timeFormat}`,
          {
            timeZone,
          }
        )
      }, 1000)

      this.interval2 = setInterval(() => {
        const currentDate = []
        let currentDateFormat = null
        this.allDate.forEach((item) => {
          const date = new Date()
          const timeZone = this.timeZoneUtc
          const zonedDate = utcToZonedTime(date, timeZone)
          currentDateFormat = format(zonedDate, `${item.value}`, {
            timeZone,
          })
          currentDate.push({
            id: item.id,
            text: currentDateFormat,
            value: item.value,
          })
        })
        this.$store.commit('system/DATE_FORMAT', currentDate)
      }, 1000)

      this.interval3 = setInterval(() => {
        const currentTime = []
        let currentTimeFormat = null
        this.timeFormats.forEach((item) => {
          const date = new Date()
          const timeZone = this.timeZoneUtc
          const zonedDate = utcToZonedTime(date, timeZone)
          currentTimeFormat = format(zonedDate, `${item.value}`, {
            timeZone,
          })
          currentTime.push({
            id: item.id,
            text: currentTimeFormat,
            value: item.value,
          })
        })
        this.$store.commit('system/TIME_FORMAT', currentTime)
      }, 1000)
    },
    async selectedValue($event) {
      this.chnageValue = true
      this.$toast.clear()
      this.allTimesZone.forEach((item) => {
        if (item.id === Number(this.timeZone)) {
          this.timeZoneText = item.text
          this.timeZoneUtc = item.value
        }
      })
      try {
        const res = await this.$axios.$post(TIME, {
          dateFormat: this.date,
          timeFormat: this.timeFormat,
          timeZone: this.timeZoneText,
          timeZoneId: this.timeZone,
        })
        if (res.success) {
          this.chnageValue = false
          this.$store.dispatch('system/getFormatDate', res.data.dateFormat)
          this.$store.dispatch('system/getFormatTime', res.data.timeFormat)
          this.$store.dispatch('system/getutcTimeZone', this.timeZoneUtc)
          this.$store.dispatch('system/getTimeZoneId', Number(this.timeZone))
          this.$store.dispatch('system/getTimeZoneText', this.timeZoneText)
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          const currentDate = []
          let currentDateFormat = null
          this.allDate.forEach((item) => {
            const date = new Date()
            const timeZone = this.timeZoneUtc
            const zonedDate = utcToZonedTime(date, timeZone)
            currentDateFormat = format(zonedDate, `${item.value}`, {
              timeZone,
            })
            currentDate.push({
              id: item.id,
              text: currentDateFormat,
              value: item.value,
            })
          })
          this.$store.commit('system/DATE_FORMAT', currentDate)
          this.getAllTimeFormats()
        } else {
          this.chnageValue = false
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {}
    },
    async newSystemAlertStatusChange(status, id, $event) {
      if (confirm('Are You Sure to change')) {
        try {
          const res = await this.$axios.$put(NEW_SYSTEM_ALERT_STATUS, {
            id,
            status,
          })
          this.$toast.clear()
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.newSystemAlerts.map((item) => {
              if (item.id === id) {
                item.status = !item.status
              }
              return item
            })
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        $event.target.checked = status
      }
    },
    async getAllNewSystemsAlert() {
      try {
        const res = await this.$axios.$get(NEW_SYSTEM_ALERT)
        if (res.success) {
          this.newSystemAlerts = res.data
        }
      } catch (error) {}
    },
    editNewAlertSystem(id) {
      // this.$store.dispatch('mobile/header/showMobileNewSystemAlertBar')
      this.$emit('editNewSystemAlert', parseInt(id))
    },
    deleteSystemAlert(id) {
      this.newSystemAlerts = this.newSystemAlerts.filter((item) => {
        return item.id !== id
      })
      this.$emit('deleteNewSystemDone')
    },
    showNewSystemAlertBarOnMobile() {
      // this.$store.dispatch('mobile/header/showMobileNewSystemAlertBar')
      this.$emit('showNewAlert')
    },
    showBlur() {
      this.$store.dispatch('mobile/header/showOverlay')
    },
    showArchiveSettings($event) {
      this.$store.dispatch('showArchiveSettings', true)
      $event.stopPropagation()
    },
    async readMe(archiveLog) {
      this.$store.commit('notifications/SHOW_NOTIFICATION_MESSAGE_MODAL', {
        title: 'Message',
        message: archiveLog.message,
        show: true,
      })
      const res = await this.readMeNotification(archiveLog.id)
      this.$toast.clear()
      if (!res.success) {
        this.$toast.error(res.message, {
          className: ['toasted-bg-alert'],
        })
      }
    },
    deleteLog(id) {
      this.showDeleteAlert = true
      this.deletedLogId = id
    },
    deleteCancel() {
      this.showDeleteAlert = false
      this.deletedLogId = ''
    },
    async deleteConfirm() {
      try {
        this.notificationDeleteProcess = true
        const response = await this.deleteNotification(this.deletedLogId)
        this.$toast.clear()
        if (response.success) {
          this.$toast.success(response.message, {
            className: ['toasted-bg-archive'],
          })
        } else {
          this.$toast.error(response.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.deletedLogId = ''
        this.showDeleteAlert = false
        this.notificationDeleteProcess = false
      }
    },
    notificationBackground(notification) {
      if (notification.category.toLowerCase() === this.emargencyCategory) {
        return notification.is_read ? '' : 'bg-red-400'
      } else {
        return notification.is_read ? '' : 'bg-blue-200'
      }
    },
    // Horizontal Draggable Functionality Start
    mouseDownHandler(e) {
      e.preventDefault()
      const upperPart = document.getElementById('resizeMe')
      const lowerPart = document.getElementById('resizeMeAlso')
      // Get the current mouse position
      this.yAxisPart1 = e.clientY
      this.yAxisPart2 = e.clientY
      // Calculate the dimension of element
      const StylesPart1 = window.getComputedStyle(upperPart)
      this.hPart1 = parseInt(StylesPart1.height, 10)
      const StylesPart2 = window.getComputedStyle(lowerPart)
      this.hPart2 = parseInt(StylesPart2.height, 10)
      // Attach the listeners to `document`
      document.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseMoveHandler(e) {
      const upperPart = document.getElementById('resizeMe')
      const lowerPart = document.getElementById('resizeMeAlso')
      // How far the mouse has been moved
      const dy1 = e.clientY - this.yAxisPart1
      const dy2 = e.clientY + this.yAxisPart2
      const expectedHight = window.innerHeight - 240
      // Adjust the dimension of element
      if (this.hPart1 + dy1 < 72) {
        upperPart.style.height = `${72}px`
      } else if (expectedHight < this.hPart1 + dy1) {
        upperPart.style.height = `${expectedHight}px`
      } else {
        upperPart.style.height = `${this.hPart1 + dy1}px`
      }
      if (this.hPart2 + dy2 < 72) {
        lowerPart.style.height = `${72}px`
      } else {
        const upperPartHeight = upperPart.style.height.slice(0, -2)
        const totalHeight =
          this.initialUpperHeight + this.initialLowerHeight - 20
        lowerPart.style.height = `${totalHeight - upperPartHeight}px`
      }
    },
    mouseUpHandler() {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
      const upperPart = document.getElementById('resizeMe')
      const lowerPart = document.getElementById('resizeMeAlso')
      const upperPartHeight = upperPart.style.height.slice(0, -2)
      const resizedHeight = this.initialUpperHeight - upperPartHeight
      lowerPart.style.height = `${
        Number(this.initialLowerHeight) + Number(resizedHeight) - 20
      }px`
    },
    touchDownHandler(e) {
      e.preventDefault()
      const upperPart = document.getElementById('resizeMe')
      const lowerPart = document.getElementById('resizeMeAlso')
      // Get the current mouse position
      this.yAxisPart1 = e.targetTouches[0]
        ? e.targetTouches[0].pageY
        : e.changedTouches[e.changedTouches.length - 1].pageY // e.clientY
      this.yAxisPart2 = e.targetTouches[0]
        ? e.targetTouches[0].pageY
        : e.changedTouches[e.changedTouches.length - 1].pageY // e.clientY
      // Calculate the dimension of element
      const StylesPart1 = window.getComputedStyle(upperPart)
      this.hPart1 = parseInt(StylesPart1.height, 10)
      const StylesPart2 = window.getComputedStyle(lowerPart)
      this.hPart2 = parseInt(StylesPart2.height, 10)
      // Attach the listeners to `document`
      document.addEventListener('touchmove', this.touchMoveHandler)
      document.addEventListener('touchend', this.touchUpHandler)
    },
    touchMoveHandler(e) {
      const upperPart = document.getElementById('resizeMe')
      const lowerPart = document.getElementById('resizeMeAlso')
      // How far the mouse has been moved
      const dy1 =
        (e.targetTouches[0]
          ? e.targetTouches[0].pageY
          : e.changedTouches[e.changedTouches.length - 1].pageY) -
        this.yAxisPart1
      const dy2 =
        (e.targetTouches[0]
          ? e.targetTouches[0].pageY
          : e.changedTouches[e.changedTouches.length - 1].pageY) +
        this.yAxisPart2
      const expectedHight = window.innerHeight - 240
      // Adjust the dimension of element
      if (this.hPart1 + dy1 < 72) {
        upperPart.style.height = `${72}px`
      } else if (expectedHight < this.hPart1 + dy1) {
        upperPart.style.height = `${expectedHight}px`
      } else {
        upperPart.style.height = `${this.hPart1 + dy1}px`
      }
      if (this.hPart2 + dy2 < 72) {
        lowerPart.style.height = `${72}px`
      } else {
        const upperPartHeight = upperPart.style.height.slice(0, -2)
        const totalHeight =
          this.initialUpperHeight + this.initialLowerHeight - 20
        lowerPart.style.height = `${totalHeight - upperPartHeight}px`
      }
    },
    touchUpHandler() {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('touchmove', this.touchMoveHandler)
      document.removeEventListener('touchend', this.touchUpHandler)
      const upperPart = document.getElementById('resizeMe')
      const lowerPart = document.getElementById('resizeMeAlso')
      const upperPartHeight = upperPart.style.height.slice(0, -2)
      const resizedHeight = this.initialUpperHeight - upperPartHeight
      lowerPart.style.height = `${
        Number(this.initialLowerHeight) + Number(resizedHeight) - 20
      }px`
    },
    resizeWindow() {
      this.bodyHeight = window.innerHeight
      this.formatSettingsExpand = true
      if (this.bodyHeight > 899) {
        this.expandCollapseFunctionality = false
      } else {
        this.expandCollapseFunctionality = true
      }
    },
    // resizeWindow() {
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   const newWidth = window.innerWidth
    //   if (newWidth >= 1440) {
    //     upperPart.style.height = `100%`
    //     lowerPart.style.height = `100%`
    //   } else if (newWidth < 1440) {
    //     upperPart.style.height = `25%`
    //     lowerPart.style.height = `25%`
    //   }
    // },
    // Horizontal Draggable Functionality End
    async markAllRead() {
      this.$toast.clear()
      if (this.unreadNotificationCount > 0) {
        try {
          this.readAllProcess = true
          const res = await this.$store.dispatch(
            'notifications/readAllNotifications'
          )
          if (res.status === 200) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.readAllProcess = false
        }
      } else {
        this.$toast.error('Your all notifications already read', {
          className: ['toasted-bg-alert'],
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
#resizeIcon {
  cursor: row-resize;
}
.select-toggle {
  color: #ffffff;
  svg {
    @apply md:text-3xl text-2xl;
  }
}
.min-width-5 {
  min-width: 5rem;
}
.min-width-6 {
  min-width: 6rem;
}
.min-width-10 {
  min-width: 10rem;
}
.min-width-15 {
  min-width: 16rem;
}
.min-width-17 {
  min-width: 17rem;
}
.min-width-20 {
  min-width: 20rem;
}
.min-width-22 {
  min-width: 22rem;
}
.min-width-45 {
  min-width: 45rem;
}
.min-width-60 {
  min-width: 64rem;
}
.min-width-80 {
  min-width: 83rem;
}

.tooltip {
  @apply invisible 
  whitespace-normal
  break-all 
  absolute 
  bg-yellow-midlight
  text-white 
  text-left
  z-50
  rounded-2xl
  left-0
  md:px-2 py-0.5
  px-4 
  shadow-lg;
}

.tooltip1 {
  @apply invisible 
  whitespace-normal
  break-all 
  absolute 
  bg-yellow-midlight
  text-white 
  text-left
  z-50
  rounded-2xl
  left-0
  md:px-2 py-0.5
  px-4 
  shadow-lg;
}

.has-tooltip:hover .tooltip {
  @apply visible;
}

.has-tooltip:hover .tooltip1 {
  @apply visible;
}

.mobileTooltip1 {
  @apply invisible 
  absolute 
  -top-10 
  left-10 
  z-50 
  bg-yellow-midlight 
  text-white 
  rounded 
  py-1 px-2 
  shadow-lg;
}

.has-tooltip1:hover .mobileTooltip1 {
  @apply visible;
}

.table-wrapper {
  // width: 410px;
}

.mobile-table-wrapper {
  min-width: 45rem;
}

.card {
  @apply bg-white rounded-3xl overflow-hidden flex flex-col h-1/3;
}
.desktop-card {
  @apply h-1/2;
}
.expnad-height {
  height: calc(100% - 66px);
}
.format-height {
  height: 300px;
  max-height: 300px;
}
.log-height {
  height: calc(100% - 320px);
}
.collapse-height {
  height: 44px;
}
.card-header {
  @apply bg-yellow-midlight text-center h-11 py-1.5;
}

.card-title {
  @apply md:text-white text-offwhite-200 font-bold md:text-xl text-lg;
}

.date-format-title {
  @apply md:font-bold md:text-lg text-md pb-2 md:text-ash-primary
  text-yellow-midlight;
}

.card-body {
  @apply overflow-auto scroll bg-white rounded-2xl md:py-0 py-0 md:px-8 px-4 h-full;
}

.activity-log-card-body {
  @apply overflow-auto scroll bg-white rounded-b-2xl md:pb-4 md:pt-0 py-2 md:px-0 px-4 h-full;
}

.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 md:font-bold md:text-gray-1200 text-yellow-midlight text-left md:text-lg text-md pr-10 whitespace-nowrap;
}

.table-tr {
  @apply md:px-6 px-6 md:py-2 py-1.5 text-left whitespace-nowrap;
}

.table-td {
  @apply md:px-6 px-6 md:py-2 py-1.5 text-left whitespace-nowrap text-gray-light xl:text-xl md:text-lg text-md;
}

.action-icon {
  @apply pl-5;
}

.toggle-btn-wrapper {
  @apply relative inline-block w-9 mr-2 align-middle select-none transition duration-200 ease-in;
}

.toggle-input {
  @apply outline-none focus:outline-none toggle-checkbox absolute block rounded-full bg-white appearance-none cursor-pointer;
}

.toggle-input-label {
  @apply block overflow-hidden h-5 rounded-full bg-ash-default transition-all
                    duration-800
                    ease-in-out cursor-pointer;
}

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
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    transition: all 0.5s ease-in-out;
    @apply bg-yellow-midlight;
  }
}

.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

[data-title]:after {
  color: #bb8b28;
  left: 100%;
}
.scroll-hide {
  @apply overflow-hidden;
}
.mobile-card-wrapper {
  // min-height: 700px;
}
@media (min-height: 470px) and (max-height: 750px) {
  .card-wrapper {
    // min-height: 900px;
  }
}
.footer-button {
  margin-top: 0px !important;
}
.inner-height {
  height: calc(100% - 44px);
}

@media (max-width: 768px) {
  .expnad-height {
    height: calc(100% - 62px);
  }
  .collapse-height {
    height: 42px;
  }
}
</style>