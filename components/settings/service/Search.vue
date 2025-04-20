<template>
  <div class="h-full">
    <div
      class="flex flex-col md:mt-4 mt-3 w-full transition-all duration-800"
      :class="exitButton ? 'h-4/5' : 'h-1/2'"
    >
      <div class="w-full flex items-center relative mb-2 lg:mb-0">
        <fa
          class="text-yellow-midlight absolute ml-3 w-5 search-icon"
          :icon="['fas', 'search']"
        />
        <input
          id="maycontain"
          v-model="query"
          type="text"
          placeholder="Search"
          class="
            text-yellow-midlight
            w-full
            rounded-full
            py-1
            px-2.5
            pl-8
            outline-none
            focus:outline-none
            bg-white
            border-b border-white
            placeholder-yellow-midlight placeholder-opacity-50
            md:text-lg
          "
          @keyup.enter="search()"
        />
      </div>
      <div
        class="
          possible_matches_card_table
          w-full
          md:mt-4
          mt-1
          md:p-5
          p-3
          bg-yellow-midlight
          rounded-2xl
          flex flex-col flex-grow
        "
      >
        <div class="table_header w-full rounded-t-2xl">
          <h2 class="md:text-lg text-base text-white">Possible Matches</h2>
        </div>
        <div class="flex flex-col h-full overflow-auto scroll mt-2">
          <div
            v-for="feed in profiles.slice(0, loadCount)"
            :key="feed.id"
            class="single-feed-wrapper"
            name="fadeIn"
          >
            <div
              class="feed-single-item bg-white"
              @click="expandCollapse(feed.id)"
            >
              <section class="feed-left">
                <img class="avatar" :src="feed.socialIcon" alt="" />
                <img class="avatar" :src="feed.profileIcon" alt="" />
              </section>
              <section class="feed-right">
                <h3 class="text-sm">{{ feed.socialName | strLimit(20) }}</h3>
                <p class="text-xs text-gray-400">
                  @{{ feed.socialId | strLimit(15) }}
                </p>
              </section>
            </div>
            <div
              v-if="feed.collapsable"
              class="
                pass-send-mail-wrapper
                mt-2
                mb-4
                transition-all
                duration-800
              "
              :class="exitButton ? 'h-auto block' : 'h-0 hidden'"
            >
              <div class="flex flex-col">
                <div
                  class="
                    w-full
                    h-9
                    flex flex-row
                    items-center
                    rounded-full
                    px-2
                    bg-white
                  "
                >
                  <input
                    v-model="feed.password"
                    class="
                      text-center
                      outline-none
                      rounded-full
                      bg-white
                      w-full
                      h-full
                      placeholder-yellow-midlight placeholder-opacity-50
                    "
                    type="password"
                    placeholder="Enter Password"
                    @keypress.enter="submitToEnterPass(feed, feed.id)"
                  />
                </div>
                <p class="text-center text-white py-5">
                  Or <br />
                  Send Access Request
                </p>
                <div
                  class="
                    text-center
                    w-full
                    h-9
                    flex flex-row
                    items-center
                    rounded-full
                    px-2
                    bg-white
                  "
                >
                  <input
                    v-model="feed.email"
                    class="
                      text-center
                      outline-none
                      rounded-full
                      bg-white
                      w-full
                      h-full
                      placeholder-yellow-midlight placeholder-opacity-50
                    "
                    type="text"
                    placeholder="Enter Email"
                    @keypress.enter="submitToEmailAccess(feed, feed.id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="profiles.length > 0" class="feeds-action">
          <button
            class="load-more"
            @click="loadCount = loadCount > 4 ? 4 : profiles.length"
          >
            Load {{ loadCount > 4 ? 'less' : 'more' }} ...
          </button>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col md:mt-4 mt-3 w-full transition-all duration-800"
      :class="exitButton ? 'h-0 opacity-0' : 'md:h-2/6 h-2/5 opacity-1'"
    >
      <div
        class="
          card_table
          w-full
          md:p-5
          p-3
          bg-yellow-midlight
          rounded-2xl
          flex flex-col flex-grow
          h-full
        "
      >
        <div class="table_header w-full rounded-t-2xl">
          <h2 class="md:text-lg text-base text-white">Feeds to Archive</h2>
        </div>
        <div
          v-if="archives.length <= 0"
          class="
            flex flex-col
            h-full
            items-center
            justify-center
            overflow-auto
            scroll
            mt-2
          "
        >
          <p class="text-white opacity-50">Select Feeds To Archive</p>
        </div>
        <div v-else class="flex flex-col h-full overflow-auto scroll mt-2">
          <div
            v-for="(archive, index) in archives"
            :key="archive.id + index"
            class="single-feed-wrapper"
            name="fadeIn"
          >
            <div class="feed-single-item bg-green-200">
              <section class="feed-left">
                <img class="avatar" :src="archive.socialIcon" alt="" />
                <img class="avatar" :src="archive.profileIcon" alt="" />
              </section>
              <section class="feed-right">
                <h3 class="text-sm">{{ archive.socialName | strLimit(20) }}</h3>
                <p class="text-xs text-gray-400">
                  @{{ archive.socialId | strLimit(15) }}
                </p>
              </section>
              <button @click="remove(archive)">
                <fa
                  class="
                    text-orange-lightness
                    opacity-50
                    text-2xl
                    font-normal
                    cursor-pointer
                  "
                  :icon="['fas', 'times']"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Facebook from '~/assets/img/icon/facebook.png'
import Twitter from '~/assets/img/icon/twitter.png'
import Person from '~/assets/img/users/default.jpg'
import { getSocialIcon } from '~/utils'
import {
  CHECK_FEED_PASSWORD,
  SAVE_ARCHIVE_FEEDS,
  SEARCH,
  SEND_ACCESS_REQUEST,
} from '~/constants/urls'

export default {
  props: {
    exitButton: {
      type: Boolean,
    },
    saveArchiveFeed: {
      type: Boolean,
    },
    clear: {
      type: Boolean,
    },
  },
  data() {
    return {
      facebook: Facebook,
      twitter: Twitter,
      person: Person,
      query: '',
      profiles: [],
      loadCount: 4,
      archives: [],
    }
  },
  computed: {
    isExist() {
      return this.profiles.some((item) => {
        return item.collapsable === true
      })
    },
  },
  watch: {
    exitButton(data) {
      if (data === false) {
        this.profiles.map((item) => {
          return (item.collapsable = false)
        })
      }
    },
    saveArchiveFeed(data) {
      if (data === true) {
        this.submitSelectedArchiveFeed()
      }
    },
    clear(data) {
      if (data === true) {
        this.clearField()
      }
    },
  },
  methods: {
    expandCollapse(id) {
      this.selectedFeedId = id
      this.profiles.map((item) => {
        if (item.id === id) {
          return (item.collapsable = !item.collapsable)
        } else {
          return (item.collapsable = false)
        }
      })
      this.$emit('change-button', this.isExist)
    },
    async search() {
      this.$toast.clear()
      if (this.query.length > 0) {
        try {
          const data = new FormData()
          data.append('query', this.query)
          const res = await this.$axios.$post(SEARCH, data)
          if (res.data.length > 0) {
            this.profiles = []
            res.data.forEach((item, index) => {
              item.id = index
              item.socialIcon = getSocialIcon(item)
              item.collapsable = false
              item.password = ''
              this.profiles.push(item)
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$toast.error('please type your search text', {
          className: ['toasted-bg-alert'],
        })
      }
    },
    async submitToEnterPass(item, id) {
      this.$toast.clear()
      if (item.password) {
        try {
          const res = await this.$axios.$post(CHECK_FEED_PASSWORD, {
            id: item.id,
            sourceName: item.sourceName,
            username: item.username,
            email: item.email,
            password: item.password,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            item.collapsable = false
            const exit = this.archives.some((i) => {
              return i.id === item.id
            })
            if (!exit) {
              this.archives.push(item)
            }
            this.$emit('change-button', this.isExist)
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$toast.error('Please type the password first', {
          className: ['toasted-bg-alert'],
        })
      }
    },
    async submitToEmailAccess(item) {
      this.$toast.clear()
      if (item.email) {
        try {
          const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
            // id: item.id,
            // sourceName: item.sourceName,
            // username: item.username,
            email: item.email,
            // password: item.password,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            // item.collapsable = false
            // this.archives.push(item)
            // this.$emit('change-button', this.isExist)
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this.$toast.error('Please type an email first', {
          className: ['toasted-bg-alert'],
        })
      }
    },
    async submitSelectedArchiveFeed() {
      this.$toast.clear()
      if (this.saveArchiveFeed && this.archives.length > 0) {
        try {
          const res = await this.$axios.$post(SAVE_ARCHIVE_FEEDS, this.archives)
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.archives = []
          }
          this.$emit('saveArchiveFeedFalse')
        } catch (error) {
          console.log(error)
        }
      }
    },
    remove(item) {
      this.archives = this.archives.filter((i) => {
        return i.id !== item.id
      })
    },
    clearField() {
      this.query = ''
      this.archives = []
      this.profiles = []
      this.$emit('clear-field')
    },
  },
}
</script>

<style lang="scss" scoped>
.feed-single-item {
  @apply w-full cursor-pointer flex items-center justify-between md:h-auto h-10  md:space-x-2 space-x-3 md:rounded-xl rounded-lg py-2 md:px-5 px-2 my-1;
  .feed-left {
    @apply flex space-x-2;
    .avatar {
      @apply 2xl:w-9 2xl:h-9 w-7 h-7 rounded-full object-cover;
    }
  }

  .feed-right {
    @apply flex-grow text-left;
  }
}

.feeds-action {
  @apply w-full text-center text-white;
}

.possible_matches_card_table {
  height: calc(100% - 41px);
}

.scroll {
  scrollbar-color: #bb8b28 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #af9035;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #af9035;
  }
}
</style>
