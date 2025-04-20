<template>
  <div class="flex flex-col">
    <div class="flex w-full min-width-22 justify-between items-center mb-7">
      <a
        href="https://devxhub.com/"
        rel="noopener noreferrer"
        target="_blank"
        class="text-lg text-orange-dark"
        >https://devxhub.com/</a
      >
      <div class="attachment cursor-pointer pr-4">
        <img
          class="mx-auto h-9 w-9"
          src="~/assets/img/svg/download_background.svg"
          alt="SharpArchive download-texts Icon"
        />
      </div>
    </div>
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
          class="w-full min-width-22 whole-body"
          :class="rows.selected ? 'roundedLg' : 'rounded-full'"
        >
          <div
            class="inner-body w-full flex"
            @click="rows.expand ? selectedValue(rows.id) : ''"
          >
            <div
              class="relative has-tooltip min-width-10 cursor-pointer td"
              @click="selectUserData(rows)"
            >
              <div class="w-full">
                <p class="text-xl block">
                  {{ rows.date | strLimit(18) }}
                </p>
              </div>
            </div>
            <div
              class="min-width-6 cursor-pointer td"
              @click="selectUserData(rows)"
            >
              <div class="flex flex-row space-x-2 items-center">
                <div class="text-xl">{{ rows.pageName }}</div>
                <div
                  class="
                    w-5
                    h-5
                    rounded-full
                    bg-red-1100
                    flex
                    justify-center
                    items-center
                  "
                >
                  <flag-icon :width="10" :height="10"></flag-icon>
                </div>
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
            >
              <span class="text-xl">{{ rows.type }}</span>
            </div>
          </div>
          <div
            v-if="rows.selected && rows.expand"
            class="w-full break-words text-xl px-4 expand-td td"
          >
            <div class="w-full flex justify-between items-center">
              <span class="text-lg">{{ rows.expand.link }}</span>
              <white-download-icon class="w-5 h-5"></white-download-icon>
            </div>
            <div
              v-if="rows.expand.flag"
              class="flex justify-center space-x-4 my-4 w-full"
            >
              <div
                class="
                  flex
                  items-center
                  space-x-2
                  w-auto
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
                <p class="text-red-1100 text-lg text-center font-bold pr-2">
                  {{ rows.expand.flag }}
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
                <p class="text-center font-bold">Open Flag</p>
              </div>
            </div>
            <p v-if="rows.expand.title" class="text-xl font-bold">
              {{ rows.expand.title }}
            </p>
            <p v-if="rows.expand.description" class="text-xl pt-4 pb-1">
              {{ rows.expand.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { LATEST_ARCHIVE } from '~/constants/urls'
import FlagIcon from '~/components/shared/icon/FlagIcon.vue'
import DownloadBackground from '~/components/shared/icon/DownloadBackground.vue'
import WhiteDownloadIcon from '~/components/shared/icon/WhiteDownloadIcon.vue'
export default {
  name: 'WebsiteChangeLog',
  components: {
    FlagIcon,
    // eslint-disable-next-line vue/no-unused-components
    DownloadBackground,
    WhiteDownloadIcon,
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
          item.pageName.toUpperCase().match(this.searchItem.toUpperCase()) ||
          item.type.toUpperCase().match(this.searchItem.toUpperCase())
        )
      })
    },
  },
  methods: {
    selectedValue(id) {
      this.$store.commit('home/SET_SELECTED_ITEM', id)
      // console.log('ID', id)
      // JSON.parse(JSON.stringify(this.searchTableItems.forEach))((item) => {
      //   if (item.id === id) {
      //     item.selected = !item.selected
      //   }
      // })
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
              })
            }
          })
        }, 305)
      } else {
        this.socialFeeds.forEach((element) => {
          if (user.username === element.username) {
            this.$store.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
              provider: user.provider,
              username,
              id: element.id,
            })
          }
        })
      }
      this.$store.dispatch('socialFeed/singlePostClose', false)
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
    },
    async downloadLatestArchive(id) {
      this.downloadProcess = true
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
      } catch (err) {
        this.downloadProcess = false
        console.log(err)
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
.table .tbody .whole-body .inner-body .td {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-size: 0.875rem;
  color: #656565;
  letter-spacing: 0;
  @apply px-4 py-2 text-base w-4/12;
}
.expand-td {
  color: #656565;
}

// .table .tbody .whole-body:hover {
//   @apply min-width-22;
//   background-color: #e4801d;
//   color: #ffffff;
// }

// .table .tbody .whole-body:hover .td {
//   color: #ffffff;
// }
.table .tbody .roundedLg .inner-body .td {
  color: #ffffff;
}
.table .tbody .roundedLg .td {
  color: #ffffff;
}
.table .tbody .roundedLg {
  background-color: #e4801d;
  @apply rounded-2xl;
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
