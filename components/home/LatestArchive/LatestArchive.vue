<template>
  <section
    id="latest-archive-section"
    class="rounded-2xl overflow-hidden h-full w-full"
  >
    <div
      class="hidden md:block bg-white rounded-3xl w-full h-full overflow-hidden"
    >
      <div class="title flex justify-center items-center px-4" @click="expand">
        <p
          class="
            py-2
            text-white
            font-bold
            xl:text-xl
            md:text-base
            flex-grow
            pl-5
          "
        >
          User Information
        </p>
        <span
          class="
            select-toggle
            smallDesktop:hidden
            static
            transition
            duration-500
            transform
          "
          :class="archiveIsExpanded ? 'rotate-180' : 'rotate-0'"
        >
          <fa :icon="['fas', 'caret-down']" />
        </span>
      </div>
      <div class="latest-archive-body_wrapper-height space-y-16 overflow-auto">
        <div class="latest-archive-body_wrapper overflow-hidden">
          <SocialMedia
            id="update-height"
            :table-data="latest"
            :website-log="websiteLog"
            :search-item="searchItem"
          />
          <!-- <Website :table-data="websiteTableData" :search-item="searchItem" /> -->

          <div class="flex justify-center space-x-4 mt-9 w-full lg:pr-8 pr-4">
            <div
              class="
                flex
                items-center
                space-x-2
                w-40
                h-9
                bg-red-moreLightness
                rounded-full
              "
            >
              <div
                class="
                  w-9
                  h-9
                  bg-red-1100
                  rounded-full
                  flex
                  justify-center
                  items-center
                "
              >
                <flag-icon :width="15" :height="15"></flag-icon>
              </div>
              <p
                class="
                  text-red-1100 text-lg text-center
                  font-bold
                  pr-2
                  whitespace-nowrap
                "
              >
                2 Open Flags
              </p>
            </div>
            <div
              class="
                flex
                items-center
                justify-center
                bg-red-1100
                text-white text-lg
                w-40
                h-9
                rounded-full
              "
            >
              <p class="text-center font-bold">View Flags</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Small Device -->
    <div class="md:hidden mt-1 p-3 pb-20 h-full scroll">
      <div
        v-if="loggedIn && currentComp !== 'Websites' && selectedFeed"
        class="w-full pt-8 sticky left-0"
      >
        <div class="w-full">
          <div class="flex flex-col items-center">
            <div
              :style="{ borderColor: globalColorPanel.backgroundColor }"
              class="w-24 h-24 rounded-full border-4"
            >
              <div class="w-20 h-20 rounded-full mx-auto mt-1">
                <template
                  v-if="
                    !selectedFeed.profilePic && !selectedFeed.profileImageUrl
                  "
                >
                  <facebook-icon
                    v-if="selectedFeed.provider === 'Facebook'"
                    class="w-20 h-20 rounded-full"
                  ></facebook-icon>
                  <linkedin-icon
                    v-if="selectedFeed.provider === 'LinkedIn'"
                    class="w-20 h-20 rounded-full"
                  ></linkedin-icon>
                  <twitter-icon
                    v-if="selectedFeed.provider === 'Twitter'"
                    class="w-20 h-20 rounded-full"
                  ></twitter-icon>
                  <instagram-icon
                    v-if="selectedFeed.provider === 'Instagram'"
                    class="w-20 h-20 rounded-full"
                  ></instagram-icon>
                  <gmail-icon
                    v-if="selectedFeed.provider === 'Google'"
                    :width="80"
                    :height="80"
                    class="w-20 h-20 rounded-full"
                  ></gmail-icon>
                  <microsoft-icon
                    v-if="selectedFeed.provider === 'Microsoft'"
                    class="w-20 h-20 rounded-full"
                  ></microsoft-icon>
                </template>
                <img
                  v-else
                  class="w-20 h-20 rounded-full"
                  :src="
                    selectedFeed.profilePic
                      ? selectedFeed.profilePic
                      : selectedFeed.profileImageUrl
                  "
                  :alt="
                    loggedIn
                      ? `${selectedFeed.name}'s SharpArchive Profile Image`
                      : ''
                  "
                />
              </div>
            </div>
            <h1
              v-if="selectedFeed.name"
              class="
                text-orange-dark
                xl:text-2xl
                md:text-xl
                font-bold
                text-2xl
                md:pt-2
                pt-2
                text-center
              "
            >
              <span> {{ selectedFeed.name }}</span>
            </h1>
            <p
              v-if="selectedFeed.dateJoined || selectedFeed.createdAt"
              class="text-gray-light md:text-md font-normal text-sm pt-0.5"
            >
              <span>Connected Since:</span>
              <DateTime
                :datetime="
                  selectedFeed.dateJoined
                    ? selectedFeed.dateJoined
                    : selectedFeed.createdAt
                "
                format="MMMM, dd yyyy, hh:mm aa"
                :show-time="false"
                class="table-span"
              />
            </p>
          </div>
          <div class="md:flex hidden flex-col mt-3.5">
            <div v-if="selectedFeed.title">
              <h4 class="text-orange-dark md:text-xl font-normal text-md">
                Title
              </h4>
              <p class="text-gray-light md:text-xl font-normal text-md">
                Senior Sales Reprehensive
              </p>
            </div>
            <div v-if="selectedFeed.email" class="mt-3.5">
              <h4 class="text-orange-dark md:text-xl font-normal text-md">
                Email
              </h4>
              <p class="text-gray-light md:text-xl font-normal text-md">
                {{ selectedFeed.email }}
              </p>
            </div>
            <div v-if="selectedFeed.address" class="mt-3.5">
              <h4 class="text-orange-dark md:text-xl font-normal text-md">
                Address
              </h4>
              <p
                class="text-gray-light md:text-xl font-normal text-md break-all"
              >
                {{ selectedFeed.address }}
              </p>
            </div>
            <div v-if="selectedFeed.phone" class="mt-3.5">
              <h4 class="text-orange-dark md:text-xl font-normal text-md">
                Phone
              </h4>
              <p class="text-gray-light md:text-xl font-normal text-md">
                {{ selectedFeed.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col mt-7"
        :class="searchAbelItems.length < 1 ? 'allFeedsGroupsHeight' : ''"
      >
        <div class="text-orange-dark font-bold text-md">All Feeds in Group</div>
        <div class="table_wrapper mx-1 mt-2">
          <div class="table-body_wrapper">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="">
                  <tr>
                    <th
                      v-for="item in latest.th"
                      :key="item.id"
                      scope="col"
                      class="text-left md:text-base text-md"
                    >
                      {{ item.name }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="rows in searchAbelItems"
                    :key="rows.id"
                    class="rounded-full"
                    @click="selectUserData(rows)"
                  >
                    <td class="relative has-tooltip min-width-8">
                      <div class="py-2 w-full">
                        <span>
                          {{ rows.username | strLimit(10) }}
                        </span>
                        <span v-if="rows.username.length > 10" class="tooltip">
                          {{ rows.username }}</span
                        >
                      </div>
                    </td>
                    <td class="py-2 min-width-6">
                      <div class="flex flex-row items-center">
                        <div class="flex-shrink-0 w-5 h-5 mr-2 py-0">
                          <template v-if="!rows.profileImageUrl">
                            <facebook-icon
                              v-if="rows.provider === 'Facebook'"
                              class="w-5 h-5 border border-gray-400"
                            ></facebook-icon>
                            <instagram-icon
                              v-if="rows.provider === 'Instagram'"
                              class="w-5 h-5 border border-gray-400"
                            ></instagram-icon>
                            <twitter-icon
                              v-if="rows.provider === 'Twitter'"
                              class="w-5 h-5 border border-gray-400"
                            ></twitter-icon>
                            <linkedin-icon
                              v-if="rows.provider === 'LinkedIn'"
                              class="w-5 h-5 border border-gray-400"
                            ></linkedin-icon>
                            <gmail-icon
                              v-if="rows.provider === 'Google'"
                              class="w-5 h-5 border border-gray-400"
                            ></gmail-icon>
                            <microsoft-icon
                              v-if="rows.provider === 'Microsoft'"
                              class="
                                w-5
                                h-5
                                border border-gray-400
                                rounded-full
                              "
                            >
                            </microsoft-icon>
                          </template>
                          <img
                            v-else
                            class="w-5 h-5 rounded-full border border-gray-400"
                            :src="rows.profileImageUrl"
                            :alt="`${rows.username} Profile Picture`"
                          />
                        </div>
                        <div class="py-2">{{ rows.provider }}</div>
                      </div>
                    </td>

                    <td
                      class="
                        text-right
                        whitespace-nowrap
                        py-2
                        relative
                        has-tooltip
                        min-width-6
                      "
                    >
                      <a>
                        <fa
                          :disabled="downloadProcess"
                          class="mr-0.875 text-green-1100"
                          :icon="['fas', 'download']"
                          @click.stop="downloadLatestArchive(rows.id)"
                        />
                      </a>
                      <span class="download_tooltip"> Download</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              v-if="searchAbelItems.length < 1"
              class="text-center text-xl noData-height font-medium w-full"
            >
              No Data Found
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import SocialMedia from '~/components/home/LatestArchive/SocialMedia'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import FlagIcon from '~/components/shared/icon/FlagIcon.vue'
import GmailIcon from '~/components/shared/icon/GmailIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
// import Website from '~/components/home/LatestArchive/Website'
import { WEBSITES } from '~/constants/urls'
import defaultImage from '~/assets/img/users/default.jpg'

export default {
  components: {
    SocialMedia,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
    FlagIcon,
    GmailIcon,
    MicrosoftIcon,
  },
  props: {
    searchItem: {
      type: String,
      default: '',
    },
    archiveIsExpanded: {
      type: Boolean,
    },
  },
  data() {
    return {
      image: defaultImage,
      websiteTableData: {
        th: [{ name: 'Name' }, { name: 'Source' }, { name: 'Download' }],
        tbody: [],
      },
      downloadProcess: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    getMobileHomeSearchField() {
      return this.$store.getters['mobile/header/getMobileHomeSearchField']
    },
    searchText() {
      return this.$store.getters['mobile/header/getLatestArchiveSearchText']
    },
    searchAbelItems() {
      if (this.getMobileHomeSearchField) {
        return this.latest.tbody.filter((item) => {
          return (
            item.provider.toUpperCase().match(this.searchText.toUpperCase()) ||
            item.username.toUpperCase().match(this.searchText.toUpperCase())
          )
        })
      } else {
        return this.latest.tbody
      }
    },
    ...mapState('home', ['latest', 'websiteLog']),
    ...mapState('socialFeed', ['socialFeeds']),
    ...mapState({
      betaVersion: 'betaVersion',
      globalColorPanel: 'globalColorPanel',
    }),
    ...mapGetters('home', ['currentComp', 'selectedFeed']),
  },
  methods: {
    expand() {
      this.$emit('increase-height')
    },
    async downloadLatestArchive(id) {
      this.downloadProcess = true
      this.$toast.success('Download is processing', {
        className: ['toasted-bg-archive'],
      })
      this.$store.commit('archive/SET_DOWNLOAD_LOADER', true)
      try {
        const response = await this.$axios({
          url: `api/social/latest/`,
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
      }
    },
    async getAllWebsiteInfo() {
      try {
        const response = await this.$axios.$get(WEBSITES, {
          mode: 'no-cors',
        })
        if (response.success) {
          this.websiteTableData.tbody = response.data
        }
      } catch (err) {}
    },
    selectUserData(user) {
      let username = ''
      if (user.provider === 'Facebook') {
        username = user.name ? user.name : user.username
      } else {
        username = user.username ? user.username : user.name
      }
      if (this.showSinglePost || this.showSingleImagePost) {
        setTimeout(() => {
          this.socialFeeds.forEach((element) => {
            if (user.username === element.username) {
              this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
                provider: user.provider,
                username,
                id: element.id,
                selectedFeed: user,
              })
            }
          })
        }, 305)
      } else if (user.provider === 'Google' || user.provider === 'Microsoft') {
        this.$store.commit('home/SET_EMAIL_DYNAMIC_COMP', {
          comp: 'EmailContent',
        })
        this.$store.commit('home/EXPAND_FULL_IMAGE', false)
        this.$store.commit('home/SET_TEMP_ARRAY', [])
        setTimeout(() => {
          this.socialFeeds.forEach((element) => {
            if (user.username === element.username) {
              this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
                provider: user.provider,
                username,
                id: element.id,
                selectedFeed: user,
              })
            }
          })
        }, 500)
      } else {
        this.socialFeeds.forEach((element) => {
          if (user.username === element.username) {
            this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
              provider: user.provider,
              username,
              id: element.id,
              selectedFeed: user,
            })
          }
        })
      }
      this.$store.commit('home/SET_SHOW_COMP', false)
      this.$store.commit('home/SET_CURRENT_TAB', 'All')
      this.$store.commit('home/SET_CURRENT_HEADER', 'RealTimeFeed')
      this.$store.dispatch('socialFeed/singlePostClose', false)
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.select-toggle {
  color: #ffffff;
  // top: 5.2px;
  // @apply absolute right-3 pointer-events-none;
  svg {
    @apply text-3xl;
  }
  // padding-left: 2px !important;
}
// .icon-position {
//   position: absolute;
//   right: 16px !important;
//   top: 5px !important;
// }
// @media (min-width: 1360px) {
//   .icon-position {
//     top: 7px !important;
//   }
// }
.title {
  background-color: #e4801d;
  @apply text-center;
}
.latest-archive-body_wrapper-height {
  height: calc(100% - 44px);
}
.latest-archive-body_wrapper {
  // @apply lg:pl-8 pl-4 pr-0
  @apply lg:pl-0 pl-0 pr-0
         md:pb-0 md:pt-0 py-10
         h-full
        lg:space-y-10 md:space-y-6
        overflow-auto;
}
.table_wrapper {
  height: calc(100% - 30px);
  @apply -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8;
  margin-top: 16px;
}
.table-body_wrapper {
  height: calc(100% - 30px);
  @apply py-0
          align-middle
          inline-block
          min-w-full
          sm:px-6
          lg:px-5
          2xl:px-8;
}
/*  Table Head  */
table thead tr th {
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  color: #505050;
  letter-spacing: 0;
  @apply px-2 py-2 md:text-base text-md;
}

table thead tr th:last-child {
  @apply text-right;
}

/*  Table body  */
table tbody tr td {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  color: #656565;
  letter-spacing: 0;
  @apply px-2  md:text-base text-md;
}

table tbody tr:hover td {
  background-color: #e4801d;
  color: #ffffff;
}

table tbody tr td:last-child {
  @apply text-orange-dark;
}

table tbody tr:hover td:last-child {
  color: #ffffff;
}

table tbody tr td:last-child:hover {
  @apply text-white;
}

table tbody tr:hover td:first-child {
  @apply rounded-tl-full rounded-bl-full;
}

table tbody tr:hover td:last-child {
  @apply rounded-tr-full rounded-br-full;
}

.scroll {
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
.active-feed-rss {
  @apply rounded-full bg-yellow-primary text-white;
}

@media (max-width: 1279px) and (min-width: 768px) {
  .latest-archive-body_wrapper-height {
    height: calc(100% - 60px);
  }
  .initial-height {
    height: 0;
  }
}
.tooltip {
  @apply absolute
  bg-offwhite-200
  text-yellow-primary
  z-100
  left-0
  -top-5
  text-left
  invisible
  p-1.5
  px-4
  rounded-xl 
  shadow-lg md:w-34 w-32
  whitespace-normal break-all;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}

.download_tooltip {
  @apply absolute
  bg-offwhite-200
  text-yellow-primary
  z-100
  right-2
  -top-5
  text-left
  invisible
  p-1.5
  px-2
  rounded-xl 
  shadow-lg 
  w-auto
  text-sm
  whitespace-normal break-all;
}

.has-tooltip:hover .download_tooltip {
  @apply visible;
  transition: all 0.3s linear;
}

.min-width-8 {
  min-width: 8rem;
}
.min-width-6 {
  min-width: 5rem;
}
.min-width-24 {
  min-width: 18rem;
}
.allFeedsGroupsHeight {
  height: calc(100% - 220px);
}
.noData-height {
  height: calc(100% - 15px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
