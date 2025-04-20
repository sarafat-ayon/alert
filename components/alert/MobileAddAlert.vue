<template>
  <div
    class="
      top-0
      right-0
      fixed
      bg-ash-dark
      p-4
      profile
      transition-all
      duration-800
      ease-in-out
      overflow-y-auto
      flex flex-col
      content-between
      scroll
    "
    :class="[showAddAlert ? 'show' : 'hide']"
  >
    <div class="w-full card flex-grow">
      <div class="flex flex-row justify-between items-center">
        <h2 class="text-red-lightness text-2xl font-normal">Add New Alert</h2>
        <fa
          class="text-red-lightness text-2xl font-normal cursor-pointer"
          :icon="['fas', 'times']"
          @click="resetAll()"
        />
      </div>
      <div class="flex flex-col mt-5">
        <div class="w-full h-auto mb-2">
          <select-input
            id="alertAllFeed"
            v-model="alertSearch.libraryId"
            :options="allLibraries"
            place-holder="Alert Library"
            class="text-xl font-bold"
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
            w-full
            h-10
            flex flex-row
            items-center
            rounded-full
            px-2
            bg-white
            mt-1
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
            v-model="alertSearch.nameOfAlertText"
            class="
              pl-2
              outline-none
              rounded-full
              bg-white
              w-full
              h-full
              text-xl text-gray-1200
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
          <fa
            class="text-red-lightness text-xl ml-2"
            :icon="['fas', 'search']"
          />
          <input
            v-model="alertSearch.mayContainText"
            class="
              pl-2
              outline-none
              rounded-full
              bg-white
              w-full
              h-full
              text-xl text-gray-1200
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
            v-model="alertSearch.mustContainText"
            class="
              pl-2
              outline-none
              rounded-full
              bg-white
              w-full
              h-full
              text-xl text-gray-1200
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
            v-model="alertSearch.ignoreText"
            class="
              pl-2
              outline-none
              rounded-full
              bg-white
              w-full
              h-full
              text-xl text-gray-1200
              placeholder-red-lightness placeholder-opacity-50
            "
            type="text"
            placeholder="Ignore"
          />
        </div>
        <template v-if="oneofThem">
          <p class="text-red-400 text-xs mb-0 pl-2">
            One of Them (May Contain, Must Contain, Ignore) Field is Required
          </p>
        </template>
      </div>
      <div class="flex flex-col justify-center mt-5 py-1 w-full">
        <div class="flex flex-row justify-between">
          <label for="alertIncludeComponents" class="text-gray-1400 text-lg"
            >Include Comments</label
          >
          <div
            class="
              relative
              inline-block
              w-10
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
              for="alertIncludeComponents"
              class="
                toggle-label
                block
                overflow-hidden
                h-5
                rounded-full
                bg-gray-300
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
              w-10
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
              for="alertIncludeReplies"
              class="
                toggle-label
                block
                overflow-hidden
                h-5
                rounded-full
                bg-gray-300
                cursor-pointer
              "
            ></label>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-2">
          <label for="alertIncludeDirectMessage" class="text-gray-1400 text-lg"
            >Include Direct Messages</label
          >
          <div
            class="
              relative
              inline-block
              w-10
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
              for="alertIncludeDirectMessage"
              class="
                toggle-label
                block
                overflow-hidden
                h-5
                rounded-full
                bg-gray-300
                cursor-pointer
              "
            ></label>
          </div>
        </div>
        <div class="w-full mt-4 space-y-3">
          <select-input
            id="alertAllFeed"
            v-model="alertSearch.allFeedId"
            :options="socialProviders"
            place-holder="All Feeds"
            class="text-xl font-bold"
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
        <div class="w-full mt-3">
          <select-input
            id="alertPastMonth"
            v-model="alertSearch.pastMonthId"
            :options="pastMonths"
            place-holder="Past Month"
            class="text-xl font-bold"
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

      <div class="flex flex-col justify-around mt-2 w-full space-y-3">
        <div class="relative w-full">
          <svg
            class="ml-4 top-2.5 w-5 absolute fill-current text-red-lightness"
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
              py-1
              outline-none
              opacity-100
              text-xl text-gray-1200
              placeholder-red-lightness placeholder-opacity-50
            "
            placeholder="Add Notification Email or Text"
            @keypress.enter="addNewNotifications"
          />
          <template v-if="$v.alertSearch.notifications.$error">
            <p
              v-if="!$v.alertSearch.notifications.required"
              class="text-red-500 text-xs mt-0 pl-2"
            >
              Field is Required!
            </p>
          </template>
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
                absolute
                fill-current
                text-red-darker
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
                pt-0
                outline-none
                opacity-100
                text-xl text-red-lightness
                placeholder-red-lightness placeholder-opacity-50
              "
              placeholder="888-555-1234"
            />
            <div class="absolute right-0 top-0">
              <select-input
                id="monthly"
                v-model="item.alertTime"
                :options="pastMonths"
                place-holder="Monthly"
                class="text-lg font-bold"
                color="#f8f8f8"
                background="#E05252"
                caret-bg="#E05252"
              >
              </select-input>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex flex-col w-full h-46 rounded-xl">
      <div class="flex flex-row justify-around mt-7">
        <button
          class="
            focus:outline-none
            w-44
            h-10
            text-red-lightness
            md:bg-white
            rounded-full
            mr-2.5
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
            w-44
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
          @click="addAlert()"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span>Add</span>
            <fa
              v-if="addProcess"
              class="absolute right-5 text-white font-bold animate-spin"
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
            text-xl
            setup
          "
          :disabled="$v.$invalid || updateProcess"
          @click="updateAlertSearch"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span>Update</span>
            <fa
              v-if="updateProcess"
              class="absolute right-5 text-white font-bold animate-spin"
              :icon="['fas', 'spinner']"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import minLength from 'vuelidate/lib/validators/minLength'
import SelectInput from '~/components/inputs/SelectInput'
import { SAVE_ALERT_SEARCH } from '~/constants/urls'

export default {
  components: {
    SelectInput,
  },

  layout: 'home',
  props: ['showAddAlert'],
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
      oneofThem: false,
      addProcess: false,
    }
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
  },
  computed: {
    ...mapState(['pastMonths', 'socialProviders']),
  },
  mounted() {
    // this.getAllLibraries()
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
      notifications: {
        required,
        minLength: minLength(1),
      },
    },
  },
  methods: {
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

    async addAlert() {
      this.$v.$touch()

      if (this.oneOfThemIsRequired()) {
        this.oneofThem = true
        return false
      } else {
        this.oneofThem = false
      }

      if (!this.$v.$invalid) {
        this.addProcess = true
        this.$toast.clear()
        try {
          const response = await this.$axios.$post(
            SAVE_ALERT_SEARCH,
            this.alertSearch
          )
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.$store.dispatch('alert/setNewAlert', response.data)
            this.clearOldData()
            this.$store.dispatch('mobile/header/closeAddAlert')
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.addProcess = false
        } catch (err) {
          this.addProcess = false
          console.log(err)
        }
      }
    },
    resetAll() {
      // this.alertSearchEdit = false
      this.$store.dispatch('mobile/header/closeAddAlert')
      this.clearOldData()
      // this.$emit('closeAlertSearch')
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
      this.notification = ''
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
        const response = await this.$axios.$get('api-fake/alertlibrary')
        if (response.success) {
          this.allLibraries = response.data
          const placeholder = response.data.find((item) => {
            return item.placeholder ? item : ''
          })
          this.alertSearch.libraryId = placeholder.value
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-checkbox:checked {
  @apply right-0 border-purple-midlight;
  right: 0;
  border-color: #ff5959;
}
.toggle-checkbox:checked + .toggle-label {
  @apply bg-purple-midlight;
  background-color: #ff5959;
}
.toggle-checkbox-alert:checked {
  @apply right-0 border-purple-midlight;
  right: 0;
  border-color: #ffffff;
}
.toggle-checkbox-alert:checked + .toggle-label-alert {
  @apply bg-purple-midlight;
  background-color: #ffffff;
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
  position: fixed;
  width: 100%;
  height: 100%;
  right: -100%;
  top: 0px;
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

// .card {
//   height: calc(100% - 64px);
// }

.scroll {
  scrollbar-color: #ff5959 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: #ff5959;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ff5959;
  }
}
</style>
