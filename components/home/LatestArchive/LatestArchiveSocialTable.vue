<template>
  <div class="flex flex-col mt-3">
    <div class="table min-width-22">
      <div class="header min-width-22 flex w-full">
        <div
          v-for="(item, index) in table.th"
          :key="index"
          scope="col"
          class="text-left text-base font-bold th w-3/12"
          :class="index === 1 || index === 2 ? 'min-width-6' : 'min-width-10'"
        >
          {{ item.name }}
        </div>
      </div>

      <div class="tbody min-width-22">
        <div
          v-for="rows in searchTableItems"
          :key="rows.id"
          class="inner-body min-width-22 flex"
        >
          <div
            class="relative has-tooltip min-width-10 cursor-pointer td"
            @click="selectUserData(rows)"
          >
            <div class="w-full">
              <p class="text-xl block">
                {{ rows.username | strLimit(18) }}
              </p>
              <span
                v-if="rows.username.length > 18"
                class="tooltip w-54 break-words"
              >
                {{ rows.username }}</span
              >
            </div>
          </div>
          <div
            class="min-width-6 cursor-pointer td"
            @click="selectUserData(rows)"
          >
            <div class="flex flex-row items-center">
              <div class="flex-shrink-0 w-6 h-6 mr-2">
                <img
                  v-if="rows.profileImageUrl"
                  class="w-6 h-6 mt-0 rounded-full border border-gray-400"
                  :src="rows.profileImageUrl"
                  :alt="`${rows.username} Profile Picture`"
                />
                <template v-else>
                  <facebook-icon
                    v-if="rows.provider === 'Facebook'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></facebook-icon>
                  <instagram-icon
                    v-if="rows.provider === 'Instagram'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></instagram-icon>
                  <twitter-icon
                    v-if="rows.provider === 'Twitter'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></twitter-icon>
                  <linkedin-icon
                    v-if="rows.provider === 'LinkedIn'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></linkedin-icon>
                  <gmail-icon
                    v-if="rows.provider === 'Google'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></gmail-icon>
                  <microsoft-icon
                    v-if="rows.provider === 'Microsoft'"
                    class="w-6 h-6 mt-0 border border-gray-400 rounded-full"
                  >
                  </microsoft-icon>
                </template>
              </div>
              <div class="text-xl">{{ rows.provider }}</div>
            </div>
          </div>

          <div
            class="
              text-right
              whitespace-nowrap
              relative
              has-tooltip
              min-width-6
              td
            "
            @click="downloadLatestArchive(rows.id)"
          >
            <a>
              <fa
                :disabled="downloadProcess"
                class="mr-0.875 cursor-pointer text-green-1100"
                :icon="['fas', 'download']"
              />
              <span class="download_tooltip"> Download</span>
            </a>
          </div>
        </div>
        <div
          v-for="rows in archiveData"
          :key="rows.id"
          class="inner-body min-width-22 flex"
        >
          <div
            class="relative has-tooltip min-width-10 cursor-pointer td"
            @click="selectUser(rows)"
          >
            <div class="w-full">
              <p class="text-xl block">
                {{ rows.username | strLimit(18) }}
              </p>
              <span
                v-if="rows.username.length > 18"
                class="tooltip w-54 break-words"
              >
                {{ rows.username }}</span
              >
            </div>
          </div>
          <div class="min-width-6 cursor-pointer td" @click="selectUser(rows)">
            <div class="flex flex-row items-center">
              <!-- <div class="flex-shrink-0 w-6 h-6 mr-2">
                <img
                  v-if="rows.profileImageUrl"
                  class="w-6 h-6 mt-1 rounded-full border border-gray-400"
                  class="w-6 h-6 mt-0 rounded-full border border-gray-400"
                  :src="rows.profileImageUrl"
                  :alt="`${rows.username} Profile Picture`"
                />
                <template v-else>
                  <facebook-icon
                    v-if="rows.provider === 'Facebook'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></facebook-icon>
                  <instagram-icon
                    v-if="rows.provider === 'Instagram'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></instagram-icon>
                  <twitter-icon
                    v-if="rows.provider === 'Twitter'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></twitter-icon>
                  <linkedin-icon
                    v-if="rows.provider === 'LinkedIn'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></linkedin-icon>
                  <gmail-icon
                    v-if="rows.provider === 'Google'"
                    class="w-6 h-6 mt-0 border border-gray-400"
                  ></gmail-icon>
                  <microsoft-icon
                    v-if="rows.provider === 'Microsoft'"
                    class="w-6 h-6 mt-0 border border-gray-400 rounded-full"
                  >
                  </microsoft-icon>
                </template>
              </div> -->
              <div class="text-xl">{{ rows.provider }}</div>
            </div>
          </div>
          <div
            class="
              text-right
              whitespace-nowrap
              relative
              has-tooltip
              min-width-6
              td
            "
            @click="downloadLatestArchive(rows.id)"
          >
            <a>
              <fa
                :disabled="downloadProcess"
                class="mr-0.875 cursor-pointer text-green-1100"
                :icon="['fas', 'download']"
              />
              <span class="download_tooltip"> Download</span>
            </a>
          </div>
        </div>

        <div
          v-if="searchTableItems.length < 1"
          class="text-center test-xl mt-24 font-medium"
        >
          No Data Found
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import GmailIcon from '~/components/shared/icon/GmailIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
import { LATEST_ARCHIVE } from '~/constants/urls'

export default {
  components: {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
    GmailIcon,
    MicrosoftIcon,
  },
  props: {
    table: {
      type: Object,
      default: () => {},
    },
    searchItem: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      downloadProcess: false,
      archiveData: [
        // {
        //   id: 1001,
        //   username: 'https://greenstart.com',
        //   provider: 'Email',
        // },
        {
          id: 1002,
          username: 'https://greenstart.com',
          provider: 'Faxes',
        },
        {
          id: 1003,
          username: 'https://greenstart.com',
          provider: 'Calls',
        },
        {
          id: 1004,
          username: 'https://greenstart.com',
          provider: 'Texts',
        },
        {
          id: 1005,
          username: 'https://dev.devxhub.com/',
          provider: 'Websites',
        },
      ],
    }
  },
  computed: {
    ...mapState('socialFeed', [
      'socialFeeds',
      'showSinglePost',
      'showSingleImagePost',
    ]),
    searchTableItems() {
      return this.table.tbody.filter((item) => {
        return (
          item.provider.toUpperCase().match(this.searchItem.toUpperCase()) ||
          item.username.toUpperCase().match(this.searchItem.toUpperCase())
        )
      })
    },
  },
  methods: {
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
      this.$store.dispatch('socialFeed/singlePostClose', false)
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
    },
    selectUser(user) {
      this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
        provider: user.provider,
        username: user.username,
        id: user.id,
      })

      this.$store.dispatch('socialFeed/singlePostClose', false)
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
    },
    async downloadLatestArchive(id) {
      this.downloadProcess = true
      this.$toast.success('Download is processing', {
        className: ['toasted-bg-archive'],
      })
      this.$store.commit('archive/SET_DOWNLOAD_LOADER', true)
      try {
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
      }
    },
    hideText(workflow) {
      if (workflow === 'live') {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table_wrapper {
  @apply -my-2 sm:-mx-6 lg:-mx-8;
}
.table-body_wrapper {
  @apply py-0
          align-middle
          inline-block
          min-w-full
          sm:px-6
          md:px-8;
}
/*  Table Head  */
// .table .thead .header {
//   position: sticky;
//   top: 0;
//   background: white;
//   z-index: 10;
// }
.table .header .th {
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  color: #505050;
  letter-spacing: 0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  @apply px-4 py-3 pb-0 text-base w-4/12;
}

.table .header .th:last-child {
  @apply text-right;
}

/*  Table body  */
.table .tbody .inner-body .td {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-size: 0.875rem;
  color: #656565;
  letter-spacing: 0;
  @apply px-4 py-2 text-base w-4/12;
}

.table .tbody .inner-body:hover {
  @apply min-width-22;
  background-color: #e4801d;
  color: #ffffff;
  @apply rounded-full;
}

.table .tbody .inner-body:hover .td {
  color: #ffffff;
}

.scroll {
  // overflow-y: hidden;
  // overflow-x: hidden;
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
  shadow-lg;
}
.download_tooltip {
  width: auto;
  @apply absolute
  bg-offwhite-200
  text-yellow-primary
  z-100
  right-0
  -top-5
  text-left
  invisible
  p-1.5
  px-4
  rounded-xl 
  shadow-lg;
}
.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.has-tooltip:hover .download_tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.min-width-6 {
  min-width: 8rem;
}
.min-width-10 {
  min-width: 16rem;
}
.min-width-22 {
  min-width: 34rem;
}
@media (min-width: 2560px) {
  .min-width-10 {
    min-width: 20rem;
  }
  .min-width-22 {
    min-width: 36rem;
  }
}
@media (min-width: 1026px) and (max-width: 1400px) {
  .min-width-6 {
    min-width: 8rem;
  }
  .min-width-10 {
    min-width: 30rem;
  }
  .min-width-22 {
    min-width: 46rem;
  }
}
@media (min-width: 1024px) and (max-width: 1025px) {
  .min-width-6 {
    min-width: 8rem;
  }
  .min-width-10 {
    min-width: 24rem;
  }
  .min-width-22 {
    min-width: 40rem;
  }
}
</style>
