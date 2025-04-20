<template>
  <div
    class="h-full w-full"
    :style="{ '--color': globalColorPanel.backgroundColor }"
  >
    <div class="content-wrapper h-full flex flex-wrap content-between">
      <div class="w-full">
        <div
          class="
            flex flex-row
            items-center
            justify-between
            md:h-12
            h-8
            relative
          "
        >
          <h2
            :style="{ color: globalColorPanel.backgroundColor }"
            class="xl:text-2xl md:text-xl md:font-bold text-xl"
          >
            <transition name="fadeIn">
              <span v-if="archiveSystem">Archive System Settings</span>
            </transition>
          </h2>
          <button
            :class="[
              !archiveSystem
                ? 'animLeft justify-start'
                : 'animRight justify-end',
            ]"
            class="
              absolute
              right-0
              focus:outline-none
              w-8
              h-8
              flex
              items-center
            "
            @click="backBtn ? back() : cancel()"
          >
            <fa
              :style="{ color: globalColorPanel.backgroundColor }"
              class="
                xl:w-6 xl:h-6
                md:w-5 md:h-20 md:font-bold
                w-6
                h-6
                cursor-pointer
              "
              :icon="['fas', backBtn ? 'chevron-left' : 'times']"
            />
          </button>
        </div>

        <transition name="fadeIn">
          <div
            v-if="archiveSystem"
            class="content-wrapper w-full h-full md:mt-8 mt-3"
          >
            <div class="formate-wrapper flex items-center justify-between">
              <p class="text-white md:text-lg text-md opacity-50">
                Available Formats
              </p>
              <div
                class="flex flex-row items-center justify-between md:w-48 w-34"
              >
                <div v-if="betaVersion" class="radio-wrapper w-full">
                  <input
                    id="jpg"
                    v-model="storageInfo.archiveFormat"
                    class="radio-input w-full"
                    type="checkbox"
                    value="JPG"
                    name="jpg"
                  />
                  <label class="radio-label w-full" for="jpg"> JPG </label>
                </div>
                <div class="radio-wrapper flex md:w-20 w-16">
                  <input
                    id="csv"
                    v-model="storageInfo.archiveFormat"
                    class="radio-input w-full"
                    type="checkbox"
                    value="CSV"
                    name="csv"
                    checked
                    disabled
                  />
                  <label class="radio-label w-full" for="csv"> CSV </label>
                </div>
                <div class="radio-wrapper flex md:w-20 w-16">
                  <input
                    id="pdf"
                    v-model="storageInfo.archiveFormat"
                    class="radio-input w-full"
                    type="checkbox"
                    value="PDF"
                    name="pdf"
                  />
                  <label class="radio-label w-full" for="pdf"> PDF </label>
                </div>
              </div>
            </div>
            <div class="flex flex-row items-center justify-between mt-5">
              <label class="text-white md:text-lg text-md opacity-50"
                >Auto Delete Archive</label
              >
              <select-input
                id="never"
                v-model="storageInfo.autoDelete"
                :options="autoDeleteOptions"
                :color="globalColorPanel.backgroundColor"
                background="#ffffff"
                class="md:w-48 w-34 inline-block font-bold"
                :caret-color="globalColorPanel.backgroundColor"
                caret-bg="ffffff"
                :error="$v.storageInfo.autoDelete.$error"
                :error-message="validationMsg($v.storageInfo.autoDelete)"
                @input="selectedOption()"
              />
            </div>
            <div class="flex flex-row items-center justify-between mt-5">
              <label class="text-white md:text-lg text-md opacity-50"
                >Date Format</label
              >
              <select-input
                id="never"
                v-model="date"
                :options="allDate"
                place-holder="Select Date"
                :place-holder-disabled="true"
                :color="globalColorPanel.backgroundColor"
                background="#ffffff"
                class="md:w-48 w-34 inline-block font-bold"
                caret-bg="#ffffff"
                :caret-color="globalColorPanel.backgroundColor"
                @input="selectedValue($event)"
              />
            </div>
            <div class="flex flex-row items-center justify-between mt-5">
              <label class="text-white md:text-lg text-md opacity-50"
                >Time Format</label
              >
              <select-input
                id="never"
                v-model="timeFormat"
                :options="timeFormats"
                :color="globalColorPanel.backgroundColor"
                background="#ffffff"
                class="md:w-48 w-34 inline-block font-bold"
                caret-bg="#ffffff"
                :caret-color="globalColorPanel.backgroundColor"
                @input="selectedValue($event)"
              />
            </div>
            <div class="flex flex-row items-center justify-between mt-5">
              <label class="text-white md:text-lg text-md opacity-50"
                >Time Zone</label
              >
              <select-input
                id="never"
                v-model="timeZone"
                :options="allTimesZone"
                :response-by-id="true"
                place-holder="Select Time Zone"
                :place-holder-disabled="true"
                :color="globalColorPanel.backgroundColor"
                background="#ffffff"
                class="md:w-48 w-34 inline-block font-bold"
                caret-bg="#ffffff"
                :caret-color="globalColorPanel.backgroundColor"
                class-style-name="scroll"
                @input="selectedValue($event)"
              />
            </div>
            <div class="flex text-center items-center justify-between mt-7">
              <h2 class="text-xl font-bold text-white">
                {{ currentDateTime }}
                ({{ timeZoneText }})
              </h2>
            </div>
            <div
              v-if="betaVersion"
              class="auto-delivery grid grid-cols-2 items-center mt-5"
            >
              <p class="text-white md:text-lg text-md opacity-50">
                Automatic File Delivery
              </p>
              <div class="toggle-button text-right mt-1.5">
                <input
                  checked
                  type="checkbox"
                  @click="storageInfo.autoDelivery = !storageInfo.autoDelivery"
                />
              </div>
            </div>
            <transition name="fadeIn">
              <div
                v-if="storageInfo.autoDelivery && betaVersion"
                class="destination space-y-2"
              >
                <div>
                  <div class="label text-white md:text-lg text-md opacity-50">
                    Email
                  </div>
                  <div class="grid md:grid-cols-12">
                    <text-input
                      id="autoDeliveryEmail"
                      v-model="$v.storageInfo.autoDeliveryEmail.$model"
                      class="w-full md:mb-0 mb-2 md:col-span-7"
                      place-holder="bob.greenstaradvisors.com"
                      place-holder-class="placeholder-dynamic-color placeholder-opacity-100"
                      color="#E4801D"
                      :error="$v.storageInfo.autoDeliveryEmail.$error"
                      :error-message="
                        validationMsg($v.storageInfo.autoDeliveryEmail)
                      "
                    />
                    <div class="w-full text-right md:col-span-5 mt-1.5">
                      <select-input
                        id="weekly"
                        v-model="storageInfo.autoDeliveryEmailFrequency"
                        :options="emailTimeOptions"
                        color="#E4801D"
                        background="#ffffff"
                        caret-bg="#ffffff"
                        class="md:w-38 w-full inline-block"
                        :caret-color="globalColorPanel.backgroundColor"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div class="label text-white md:text-lg text-md opacity-50">
                    Cloud Folder or URL
                  </div>
                  <div class="grid md:grid-cols-12">
                    <text-input
                      id="autoDeliveryEmail"
                      v-model="$v.storageInfo.autoDeliveryCloud.$model"
                      class="w-full md:mb-0 mb-2 md:col-span-7"
                      place-holder="Google Drive, Dropbox etc."
                      place-holder-class="placeholder-dynamic-color placeholder-opacity-100"
                      :color="globalColorPanel.backgroundColor"
                      :error="$v.storageInfo.autoDeliveryCloud.$error"
                      :error-message="
                        validationMsg($v.storageInfo.autoDeliveryCloud)
                      "
                    />
                    <div class="w-full text-right md:col-span-5 mt-1.5">
                      <select-input
                        id="weekly"
                        v-model="storageInfo.autoDeliveryCloudFrequency"
                        :options="emailTimeOptions"
                        :color="globalColorPanel.backgroundColor"
                        background="#ffffff"
                        class="md:w-38 w-full inline-block"
                        caret-bg="#ffffff"
                        :caret-color="globalColorPanel.backgroundColor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <div
              v-if="archiveSystem && explanation"
              class="text-center mt-6 mb-8 text-white text-md"
            >
              {{ explanation.overview }}
              <a
                href="#"
                :style="{ color: globalColorPanel.backgroundColor }"
                @click="showMoreText()"
                >Click here for explanation.</a
              >
            </div>
          </div>
        </transition>

        <transition name="fadeIn">
          <div
            v-if="seeMore && explanation"
            class="content-wrapper w-full h-full mt-8 text-white text-lg"
            v-html="explanation.description"
          ></div>
        </transition>
      </div>
      <div class="w-full">
        <div class="flex flex-row items-center justify-center">
          <transition name="fadeIn">
            <button
              v-if="archiveSystem"
              type="submit"
              :style="{
                backgroundColor: globalColorPanel.backgroundColor,
                borderColor: globalColorPanel.backgroundColor,
              }"
              class="
                w-44
                py-2
                text-white
                rounded-full
                border
                outline-none
                font-bold
                text-base
                relative
              "
              :disabled="saveProcess"
              @click="saveAll"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span>Save</span>
                <fa
                  v-if="saveProcessBar"
                  class="
                    w-4
                    h-4
                    absolute
                    right-5
                    text-white
                    font-bold
                    animate-spin
                  "
                  :icon="['fas', 'spinner']"
                />
              </div>
            </button>
          </transition>
          <transition name="fadeIn">
            <button
              v-if="seeMore"
              type="submit"
              :style="{
                color: globalColorPanel.backgroundColor,
                borderColor: globalColorPanel.backgroundColor,
              }"
              class="
                w-44
                py-2
                rounded-full
                border
                outline-none
                font-bold
                text-base
              "
              @click="back"
            >
              Back
            </button>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { format, utcToZonedTime } from 'date-fns-tz'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import SelectInput from '~/components/inputs/SelectInput'
import TextInput from '~/components/inputs/TextInput'
import { validationMessages } from '~/utils/validations'
import { ADD_FEED_EXPLANATION, USER_STORAGE, TIME } from '~/constants/urls'

export default {
  name: 'ArchiveSystemSettings',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TextInput,
    // eslint-disable-next-line vue/no-unused-components
    SelectInput,
    // AnimatedNumber,
  },
  props: {
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
  },
  data() {
    return {
      date: 'MMMM dd, yyyy',
      timeFormat: 'hh:mm aa',
      timeZone: 24,
      timeZoneId: 24,
      timeZoneText: 'Mountain Standard Time (UTC-7)',
      timeZoneUtc: 'US/Arizona',
      archiveSystem: true,
      saveBtn: true,
      backBtn: false,
      seeMore: false,
      storageInfo: {
        // autoDelivery: true,
        // autoDeliveryEmail: '',
        // autoDeliveryCloud: '',
        archiveFormat: ['CSV'],
        autoDelete: 0,
        // autoDeliveryEmailFrequency: 'Weekly',
        // autoDeliveryCloudFrequency: 'Weekly',
      },
      defaultInfo: Object.assign({}, this.storageInfo),
      autoDeleteOptions: [
        { text: 'Never', value: '0' },
        { text: '3 months', value: '3' },
        { text: '6 months', value: '6' },
        { text: '1 year', value: '12' },
        { text: '2 years', value: '24' },
        { text: '3 years', value: '36' },
        { text: '4 years', value: '48' },
        { text: '5 years', value: '60' },
        { text: '6 years', value: '62' },
        { text: '7 years', value: '74' },
      ],
      emailTimeOptions: [
        { text: 'Weekly', value: 'Weekly' },
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '7', value: '7' },
      ],
      explanation: null,
      archivingFeeds: 3,
      saveProcess: true,
      saveProcessBar: false,
      chnageValue: true,
      currentDateTime: null,
      interval1: null,
      interval2: null,
      interval3: null,
    }
  },
  computed: {
    ...mapState(['archiveSettings', 'betaVersion']),
    ...mapGetters('socialFeed', ['socialFeedLength']),
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
  },
  watch: {
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
  },
  validations: {
    storageInfo: {
      autoDelete: {
        required,
      },
      // autoDeliveryEmail: {
      //   required,
      //   email,
      // },
      // autoDeliveryCloud: {
      //   required,
      //   url,
      // },
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
    clearInterval(this.interval1)
    clearInterval(this.interval2)
  },
  mounted() {
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
    this.getArchivedSettings()
    this.feedExplanation()
    setTimeout(() => {
      this.chnageValue = true
    }, 3000)
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    ...mapActions('system', ['getAllTimeFormats']),
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
    async feedExplanation() {
      const res = await this.$axios.$post(ADD_FEED_EXPLANATION, {
        archivingFeeds: this.socialFeedLength,
      })
      this.explanation = res.data
    },
    selectedOption() {
      this.saveProcess = false
    },
    cancel() {
      this.$emit('closeArchiveSystemSetting')
    },
    async saveAll() {
      this.$toast.clear()

      if (this.storageInfo.archiveFormat.length <= 0) {
        return this.$toast.error('Archive format is missing!', {
          className: ['toasted-bg-alert'],
        })
      }

      if (this.storageInfo.autoDelivery) {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false
        }
      }

      try {
        this.saveProcess = true
        this.saveProcessBar = true
        const res = await this.$axios.$post(USER_STORAGE, {
          archiveFormats: this.storageInfo.archiveFormat,
          autoDeleteMonths: this.storageInfo.autoDelete,
        })
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.clearAllField()
          this.$emit('saveAllWork')
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
        this.saveProcess = false
        this.saveProcessBar = false
      } catch (error) {
        console.log(error)
      }
    },
    async getArchivedSettings() {
      try {
        const { success, data, message } = await this.$axios.$get(USER_STORAGE)
        if (success) {
          if (!data.archiveFormats.includes('CSV')) {
            this.storageInfo.archiveFormat = data.archiveFormats
            this.storageInfo.archiveFormat.push('CSV')
          } else {
            this.storageInfo.archiveFormat = data.archiveFormats
          }
          this.storageInfo.autoDelete = data.autoDeleteMonths
          this.saveProcess = false
          this.saveProcessBar = false
        }
        if (message === 'Data not found') {
          this.storageInfo.archiveFormat = ['CSV']
          this.storageInfo.autoDelete = 0
          this.saveProcess = false
          this.saveProcessBar = false
        }
      } catch (error) {
        console.log(error)
      }
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
      // }
    },
    showMoreText() {
      this.archiveSystem = false
      this.saveBtn = false
      setTimeout(() => {
        this.seeMore = true
        this.backBtn = true
      }, 700)
    },
    back() {
      this.seeMore = false
      this.backBtn = false
      setTimeout(() => {
        this.archiveSystem = true
        this.saveBtn = true
      }, 700)
    },
    clearAllField() {
      this.storageInfo = this.defaultInfo
    },
  },
}
</script>

<style scoped lang="scss">
$color: var(--color);
.radio-input {
  display: none;
  width: 100%;
}

.radio-input:checked + .radio-label {
  background-color: #ffffff;
  color: $color;
  font-weight: bold;
  width: 100%;
}

.radio-label {
  @apply md:px-5 px-2.5 py-1 md:text-lg text-sm text-white border-2 border-white rounded-full font-normal cursor-pointer text-center w-full;
}

.placeholder-dynamic-color::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(228, 128, 29, var(--color));
}

input[type='checkbox'] {
  cursor: pointer;
  position: relative;
  width: 36px;
  height: 20px;
  -webkit-appearance: none;
  background-color: #ffffff;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

input:checked[type='checkbox'] {
  background-color: white;
}

input[type='checkbox']::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  top: 2px;
  left: 3px;
  background-color: #393e46;
  transition: 0.5s;
  transform: scale(1.1);
  // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input:checked[type='checkbox']::before {
  left: 18px;
  background-color: $color;
}

.scroll {
  scrollbar-color: #e0ad1f #ececec;
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}

.animLeft {
  transform: translateX(0);
  animation-name: changePositionLeft;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes changePositionLeft {
  to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 86%;
  }
}

.animRight {
  transform: translateX(0);
  animation-name: changePositionRight;
  animation-duration: 1s;
}

@keyframes changePositionRight {
  from {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 92%;
  }
  to {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    right: 0%;
  }
}
</style>
