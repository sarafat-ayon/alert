<template>
  <section>
    <div
      class="
        right-0
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
        md:-top-15 md:rounded-l-2xl md:shadow-2xl
      "
      :class="[showBulkDownloadSideBar ? 'show' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <!--start => title area-->
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-red-lightness xl:text-2xl md:text-xl font-normal">
              Bulk Download
            </h2>
            <fa
              class="text-red-lightness text-2xl font-normal cursor-pointer"
              :icon="['fas', 'times']"
              @click="resetAll()"
            />
          </div>
          <!--end => title area-->

          <!--start => main area-->

          <!--start => datetime area-->
          <div class="flex flex-row justify-between mt-5">
            <div
              class="
                h-10
                mb-2
                w-60
                text-lg
                font-bold
                lg:mb-0
                flex flex-row
                relative
              "
            >
              <date-picker
                v-model="startingDate"
                :popup-style="{
                  zIndex: 9999,
                }"
                type="date"
                format="MMMM D, YYYY"
                value-type="MMMM D, YYYY"
                :placeholder="startingDatePlaceHolder"
                input-class="alert-date-input"
              >
              </date-picker>
              <fa
                class="
                  text-white text-3xl
                  font-bold
                  cursor-pointer
                  absolute
                  right-2
                  -top-1
                "
                :icon="['fas', 'sort-down']"
              />
            </div>
            <div class="w-20 text-center text-white">
              <fa
                class="text-white text-3xl font-bold"
                :icon="['fas', 'minus']"
              />
            </div>
            <div class="h-10 mb-2 w-60 lg:mb-0 flex flex-row relative">
              <date-picker
                v-model="endingDate"
                :popup-style="{
                  zIndex: 9999,
                }"
                type="date"
                format="MMMM D, YYYY"
                value-type="MMMM D, YYYY"
                :placeholder="endingDatePlaceHolder"
                input-class="alert-date-input"
              >
              </date-picker>
              <fa
                class="
                  text-white text-3xl
                  font-bold
                  cursor-pointer
                  absolute
                  right-2
                  -top-1
                "
                :icon="['fas', 'sort-down']"
              />
            </div>
          </div>
          <!--end => datetime area-->

          <!--start => format area-->
          <div class="radio-button w-full gap-3 flex justify-between mt-7">
            <div>
              <input
                id="pdf"
                v-model="format"
                class="radio-input"
                type="radio"
                value="pdf"
                name="pdf"
              />
              <label class="radio-label" for="pdf">PDF</label>
            </div>
            <div>
              <input
                id="jpg"
                v-model="format"
                class="radio-input"
                type="radio"
                value="jpg"
                name="jpg"
              />
              <label class="radio-label" for="jpg">JPG</label>
            </div>
            <div>
              <input
                id="csv"
                v-model="format"
                class="radio-input"
                type="radio"
                value="csv"
                name="jpg"
              />
              <label class="radio-label" for="csv">CSV</label>
            </div>
          </div>
          <!--end => format area-->

          <div class="flex flex-col mt-5 w-full h-86 rounded-xl">
            <div
              class="
                bg-white
                mt-3
                py-5
                md:px-6
                px-2
                w-full
                h-full
                rounded-xl
                scroll
              "
            >
              <div class="w-full text-red-lightness">
                <label
                  class="check-container flex flex-row items-center font-bold"
                  @change="allDownload"
                  >Download All
                  <input
                    :checked="isAllSelected ? 'checked' : ''"
                    class="h-4 w-4"
                    type="checkbox"
                  />
                  <span class="checkmark"></span>
                </label>
                <div class="pl-5 pt-2">
                  <label
                    class="
                      check-container
                      flex flex-row
                      items-center
                      font-bold
                      mb-1
                    "
                    @change="selectAllSocials"
                    >All Social Media
                    <input
                      :checked="isAllSocialsSelected ? 'checked' : ''"
                      class="h-4 w-4"
                      type="checkbox"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <div class="pl-5 flex flex-col">
                    <label
                      v-for="social in socials"
                      :key="'socials-' + social.id"
                      class="check-container flex flex-row items-center"
                      @change="selectSocials(social.id)"
                    >
                      {{ social.name }}
                      <input
                        :checked="social.selectable ? 'checked' : ''"
                        :value="social.id"
                        class="h-4 w-4"
                        type="checkbox"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div class="pl-5 pt-2">
                  <label
                    class="
                      check-container
                      flex flex-row
                      items-center
                      font-bold
                      mb-1
                    "
                    @change="selectAllWebsites"
                    >All Website
                    <input
                      :checked="isAllWebsitesSelected ? 'checked' : ''"
                      class="h-4 w-4"
                      type="checkbox"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <div class="pl-5 flex flex-col">
                    <label
                      v-for="website in websites"
                      :key="'websites-' + website.id"
                      class="check-container flex flex-row items-center"
                      @change="selectWebsites(website.id)"
                    >
                      {{ website.url }}
                      <input
                        :checked="website.selectable ? 'checked' : ''"
                        :value="website.id"
                        class="h-4 w-4"
                        type="checkbox"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-5 w-full text-red-lightness">
            <p class="text-right text-xl">
              File Size: {{ getTotalFileSize }} MB
            </p>
          </div>
          <!--end => main area-->
        </div>

        <!--start => footer area-->
        <div class="w-full">
          <div class="flex flex-col mt-5 w-full h-46 rounded-xl">
            <div class="flex flex-row justify-center space-x-5 px-8 mt-8">
              <button
                class="
                  focus:outline-none
                  w-44
                  h-10
                  text-red-lightness
                  bg-ash-dark
                  rounded-full
                  border-2 border-red-lightness
                  outline-none
                  font-bold
                  text-base
                  setup
                "
                @click="clearAll"
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
                  text-base
                  setup
                "
                :disabled="downloadProcess"
                @click="bulkDownload"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Download</span>
                  <fa
                    v-if="downloadProcess"
                    class="absolute right-5 text-white font-bold animate-spin"
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        <!--end => footer area-->
      </div>
    </div>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker'
// import {required} from 'vuelidate/lib/validators'
import 'vue2-datepicker/index.css'
import moment from 'moment'
import {
  ALERT_BULK_DOWNLOAD,
  BULK_SOCIALS,
  BULK_WEBSITES,
} from '~/constants/urls'
export default {
  components: {
    DatePicker,
  },
  layout: 'home',
  props: {
    showBulkDownloadSideBar: {
      type: Boolean,
    },
  },
  data() {
    return {
      skew: false,
      startingDate: '',
      endingDate: '',
      startingDatePlaceHolder: 'January 1, 2021',
      endingDatePlaceHolder: 'Current',
      format: 'pdf',
      websites: [],
      socials: [],
      // startingDates: [
      //   {text: 'January 1, 2021', value: 'January 1, 2021', placeholder: true},
      // ],
      endDate: 'Current',
      endDates: [{ text: 'Current', value: 'Current', placeholder: true }],
      time: '',
      downloadProcess: false,
    }
  },
  validations: {},
  computed: {
    isAllSocialsSelected() {
      return this.socials.every((item) => {
        return item.selectable === true
      })
    },
    isAllWebsitesSelected() {
      return this.websites.every((item) => {
        return item.selectable === true
      })
    },
    isAllSelected() {
      return this.isAllSocialsSelected && this.isAllWebsitesSelected === true
    },
    selectedSocialsFileSize() {
      let size = 0
      this.socials.forEach((item) => {
        if (item.selectable) {
          size += item.fileSize
        }
      })
      return size
    },
    selectedWebsiteFileSize() {
      let size = 0
      this.websites.forEach((item) => {
        if (item.selectable) {
          size += item.fileSize
        }
      })
      return size
    },
    getTotalFileSize() {
      return this.selectedSocialsFileSize + this.selectedWebsiteFileSize
    },
  },
  mounted() {
    this.getAllWebsites()
    this.getAllSocials()
    this.getCurrentDate()
  },
  methods: {
    getCurrentDate() {
      const time = moment().format('MMMM D, YYYY')
      this.endingDate = time
    },
    selectAllSocials() {
      this.socials.forEach((item) => {
        item.selectable = event.target.checked
      })
    },
    selectSocials(value) {
      this.socials.forEach((item) => {
        if (item.id === value) {
          item.selectable = !item.selectable
        }
      })
    },
    selectAllWebsites() {
      this.websites.forEach((item) => {
        item.selectable = event.target.checked
      })
    },
    selectWebsites(value) {
      this.websites.forEach((item) => {
        if (item.id === value) {
          item.selectable = !item.selectable
        }
      })
    },
    async getAllWebsites() {
      try {
        const response = await this.$axios.$get(BULK_WEBSITES)
        if (response.success) {
          response.data.forEach((item) => {
            item.selectable = false
            this.websites.push(item)
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getAllSocials() {
      try {
        const response = await this.$axios.$get(BULK_SOCIALS)
        if (response.success) {
          response.data.forEach((item) => {
            item.selectable = false
            this.socials.push(item)
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    allDownload() {
      this.selectAllSocials()
      this.selectAllWebsites()
    },
    async bulkDownload() {
      const socialsIds = this.getSelectedSocialsIds()
      const websiteIds = this.getSelectedWebsiteIds()
      if (
        (socialsIds.length > 0 || websiteIds.length > 0) &&
        this.startingDate &&
        this.endingDate
      ) {
        this.$toast.clear()
        try {
          this.downloadProcess = true
          const response = await this.$axios.$post(ALERT_BULK_DOWNLOAD, {
            socialsIds,
            websiteIds,
            startingDate: this.startingDate,
            endingDate: this.endingDate,
            format: this.format,
          })
          if (response.success) {
            window.location.href = response.data.downloadLink
          } else {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
          }
          this.downloadProcess = false
        } catch (err) {
          this.downloadProcess = false
          console.log(err)
        }
      }
    },
    getSelectedSocialsIds() {
      const socialIds = []
      this.socials.forEach((item) => {
        if (item.selectable) {
          socialIds.push(item.id)
        }
      })
      return socialIds
    },
    getSelectedWebsiteIds() {
      const websiteIds = []
      this.websites.forEach((item) => {
        if (item.selectable) {
          websiteIds.push(item.id)
        }
      })
      return websiteIds
    },
    uncheckAll() {
      // eslint-disable-next-line array-callback-return
      this.socials.map((item) => {
        item.selectable = false
      })
      // eslint-disable-next-line array-callback-return
      this.websites.map((item) => {
        item.selectable = false
      })
    },
    clearAll() {
      this.startingDate = ''
      this.endingDate = ''
      this.startingDatePlaceHolder = 'January 1, 2021'
      this.endingDatePlaceHolder = 'Current'
      this.format = ''
      this.uncheckAll()
      this.getCurrentDate()
    },
    resetAll() {
      this.uncheckAll()
      this.clearAll()
      this.$emit('closeBulkDownload')
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-input1 {
  background-color: #e05252 !important;
}
.check-container {
  display: block;
  position: relative;
  padding-left: 24px;
  font-size: 20px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 4px;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 3px;
  background-color: #ffffff;
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
  background-color: #ffffff;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
  background-color: #e05252;
}

.check-container input ~ .checkmark {
  border: 1px solid #e05252;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.active-format {
  @apply text-red-midlight bg-white;
}

.radio-input {
  display: none;
}

.radio-label {
  @apply px-7 py-1 bg-red-lightness text-white border-2 border-red-lightness rounded-full font-bold text-base cursor-pointer;
}

.radio-input:checked + .radio-label {
  background-color: #ffffff;
  color: #e05252;
  @apply border-2 border-white;
}

.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100vh;
  right: -500px;
  z-index: 999;
}

.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
}

@media (max-width: 425px) {
  .profile {
    width: 100%;
    right: -100%;
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
