<template>
  <section>
    <div
      class="
        right-0
        absolute
        bg-ash-dark
        md:px-21
        p-4
        md:pt-8
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        h-full
        md:top-0 md:rounded-l-2xl md:shadow-2xl
      "
      :class="[showBulkDownloadSideBar && showSideBar ? 'show' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
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
              class="
                text-green-1100
                xl:text-2xl
                md:text-xl md:font-bold
                text-xl
              "
            >
              Bulk Download
            </h2>
            <button
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="resetAll()"
            >
              <fa
                class="
                  text-green-1100
                  xl:text-2xl
                  md:text-xl md:font-bold
                  text-2xl
                "
                :icon="['fas', 'times']"
              />
            </button>
          </div>

          <div class="flex items-center mt-5 cursor-pointer">
            <div
              class="w-full text-lg font-bold relative group cursor-pointer"
              @click="vCalenderShow = true"
              @mouseleave.stop="vCalenderShow = false"
            >
              <div class="flex flex-row items-center justify-center">
                <input
                  readonly
                  class="
                    pl-3
                    h-10
                    mb-2
                    w-full
                    text-lg
                    font-bold
                    lg:mb-0
                    rounded-full
                    bg-green-1100
                    text-white
                    outline-none
                    text-center
                  "
                  :value="allDateTimePlaceholder"
                />
                <fa
                  class="
                    text-white text-3xl
                    font-bold
                    cursor-pointer
                    absolute
                    right-2
                    top-1
                  "
                  :icon="['fas', vCalenderShow ? 'caret-up' : 'caret-down']"
                />
              </div>
              <div
                class="
                  group-hover:block
                  shadow-xl
                  absolute
                  top-13.3
                  right-0
                  z-999999
                  cursor-pointer
                  bg-white
                  rounded-3xl
                  border-top
                "
              >
                <v-calender-with-preset
                  style="width: 455px"
                  :show-v-celander="vCalenderShow"
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
          </div>
          <div class="flex flex-col mt-5 w-full h-86 rounded-xl">
            <div
              class="
                bg-white
                mt-3
                py-5
                md:px-5
                px-2
                w-full
                h-full
                rounded-xl
                scroll
              "
            >
              <div class="w-full text-green-1100 space-y-1.5">
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
                    >All Feeds
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
                      <span>{{ social.provider }} </span>

                      <div
                        class="break-words relative has-tooltip inline-block"
                      >
                        <span class="opacity-75">
                          ({{
                            getUserName(social).length > 17
                              ? getUserName(social).substr(0, 17) + '...'
                              : getUserName(social)
                          }})
                        </span>
                        <span
                          v-if="getUserName(social).length > 17"
                          class="
                            absolute
                            text-white text-sm
                            bg-green-1100
                            z-100
                            -left-3
                            text-left
                            invisible
                            shadow-2xl
                            p-1.5
                            px-4
                            tooltip
                            break-all
                            rounded-xl
                          "
                          >{{ getUserName(social) }}</span
                        >
                      </div>
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
                <!-- <div class="pl-5 pt-2">
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
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col mt-5 w-full h-46 rounded-xl">
            <div class="flex flex-row justify-center space-x-5 px-8 mt-8">
              <button
                class="
                  focus:outline-none
                  w-44
                  h-10
                  text-green-1100
                  bg-ash-dark
                  rounded-full
                  border-2 border-green-1100
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
                :disabled="bulkDownloadProcess"
                class="
                  focus:outline-none
                  w-44
                  h-10
                  text-white
                  bg-green-1100
                  rounded-full
                  border-none
                  outline-none
                  font-bold
                  text-base
                  setup
                "
                @click="bulkDownload"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Download</span>
                  <fa
                    v-if="bulkDownloadProcess"
                    class="absolute right-5 text-white font-bold animate-spin"
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { subWeeks, format } from 'date-fns'
import { SOCIALS, BULK_WEBSITES } from '~/constants/urls'
import VCalenderWithPreset from '~/components/VCalenderWithPreset'
import SelectInput from '~/components/inputs/SelectInput'

export default {
  name: 'ArchiveBulkDownload',
  // eslint-disable-next-line vue/no-unused-components
  components: { VCalenderWithPreset, SelectInput },
  layout: 'home',
  data() {
    return {
      skew: false,
      format: [],
      websites: [],
      socials: [],
      bulkDownloadProcess: false,
      dateRange: {
        start: new Date(),
        end: new Date(),
      },
      outputFormate: {
        type: 'string',
        mask: this.upperCaseDate,
      },
      vCalenderShow: false,
      loading: false,
      defaultDateFormat: 'yyyy-MM-dd',
      allDateTimePlaceholder: 'All Dates',
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
      return this.isAllSocialsSelected === true
    },
    ...mapState('socialFeed', {
      bulkSocials: 'socialFeeds',
    }),
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
    ...mapState('archive', ['showBulkDownloadSideBar']),
    ...mapState(['showSideBar']),
    currentDateFormat() {
      return this.globalDateformat ?? this.defaultDateFormat
    },
    upperCaseDate() {
      return this.currentDateFormat.toUpperCase()
    },
  },
  watch: {
    bulkSocials(data) {
      if (data) {
        this.getBulkSocials()
      }
    },
    dateRange: {
      handler(val) {
        this.allDateTimePlaceholder = `${format(
          new Date(val.start),
          this.currentDateFormat
        )} - ${format(new Date(val.end), this.currentDateFormat)}`
      },
      deep: true,
    },
  },
  mounted() {
    this.outputFormate.mask = this.upperCaseDate
    this.startDate()
    this.getBulkSocials()
  },
  methods: {
    startDate() {
      const date = new Date()
      const week = subWeeks(date, 4)
      this.dateRange.start = format(week, this.currentDateFormat)
      this.dateRange.end = format(date, this.currentDateFormat)
      this.loading = true
    },
    convertDate(str) {
      const date = new Date(str)
      const mnth = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return [date.getFullYear(), mnth, day].join('-')
    },
    getBulkSocials() {
      const socials = JSON.parse(JSON.stringify(this.bulkSocials))
      socials.forEach((item) => {
        item.selectable = false
      })
      this.socials = socials
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
    allDownload() {
      this.selectAllSocials()
      this.selectAllWebsites()
    },
    async bulkDownload() {
      const socialsIds = this.getSelectedSocialsIds()
      const websiteIds = this.getSelectedWebsiteIds()
      // this.$toast.clear()
      if (this.dateRange.start.length <= 0 || this.dateRange.end.length <= 0) {
        return this.$toast.error('The date range both field are required!', {
          className: ['toasted-bg-alert'],
        })
      }
      if (socialsIds.length > 0 || websiteIds.length > 0) {
        this.bulkDownloadProcess = true
        this.$store.commit('archive/SET_DOWNLOAD_LOADER', true)
        if (this.bulkDownloadProcess) {
          await this.$toast.success('Download is processing', {
            className: ['toasted-bg-archive'],
          })
        }
        try {
          const response = await this.$axios({
            url: `${SOCIALS}`,
            data: {
              feeds: socialsIds,
              startingDate: format(
                new Date(this.dateRange.start),
                this.defaultDateFormat
              ),
              endingDate: format(
                new Date(this.dateRange.end),
                this.defaultDateFormat
              ),
            },
            method: 'POST',
            responseType: 'blob',
          })
          this.$toast.clear()
          if (response.headers['content-disposition']) {
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
          } else {
            this.$toast.error('No data to be downloaded', {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (err) {
          this.$toast.clear()
          this.$toast.error('No data to be downloaded', {
            className: ['toasted-bg-alert'],
          })
          console.log(err)
        } finally {
          this.bulkDownloadProcess = false
          this.$store.commit('archive/SET_DOWNLOAD_LOADER', false)
          this.clearAll()
        }
      } else {
        this.$toast.clear()
        return this.$toast.error('Please select the feeds', {
          className: ['toasted-bg-alert'],
        })
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
      this.$nuxt.$emit('clearDatePicker')
      this.format = ''
      this.uncheckAll()
      this.startDate()
    },
    resetAll() {
      this.uncheckAll()
      this.clearAll()
      this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
    },
    getUserName(social) {
      return social.username ? social.username : social.name
    },

    pastMonthDateRageEvent(daterange) {
      this.dateRange.start = daterange.start
      this.dateRange.end = daterange.end
    },
  },
}
</script>

<style lang="scss" scoped>
.mx-input {
  font-size: 18px;
  font-weight: bold;
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
  background-color: #8db230;
}

.check-container input ~ .checkmark {
  border: 1px solid #8db230;
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
  left: 5px;
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
  @apply text-green-1100 bg-white;
}

.radio-input {
  display: none;
}

.radio-label {
  @apply px-7 py-1 bg-green-1100 text-white border-2 border-green-1100 rounded-full font-bold text-base cursor-pointer;
}

.radio-input:checked + .radio-label {
  background-color: #ffffff;
  color: #8db230;
  @apply border-2 border-white;
}

.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100%;
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

.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
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
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #6e9c2e #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #6e9c2e;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #6e9c2e;
  }
}

.tooltip {
  @apply w-auto shadow-lg;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.1s linear;
}
</style>
