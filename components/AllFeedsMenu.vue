<template>
  <ul
    class="text-white text-md h-auto pb-2 relative scroll"
    :style="{ '--arrowColor': arrowColor, '--scrollColor': scrollColor }"
  >
    <li v-for="(feed, mainIndex) in feeds" :key="mainIndex" class="flex flex-col">
      <div
        class="w-full px-4 font-bold sticky z-1 bg-green-1100 top-0 left-0 pt-2 whitespace-nowrap"
        :class="[classStyleName]"
      >
        <label class="w-full h-5 relative mt-1 mb-0.5 flex space-x-2 cursor-pointer" :for="feed.id">
          <div class="w-4 h-4 inline-block">
            <input
              :id="feed.id"
              v-model="feed.mediaValue"
              type="checkbox"
              class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
              @click="
              !feed.mediaValue
                ? [nowChecked(feed.id), checkedAll(feed.id)]
                : nowChecked(feed.id)
            "
            />
            <fa
              class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
              :icon="['fas', 'check']"
            />
          </div>
          <div class="pr-4 inline-block -mt-0.5">{{ feed.name }}</div>
        </label>
      </div>
      <ul
        v-if="showFeeds"
        :id="feed.id"
        class="pl-4 transition-all duration-500 ease-in-out"
        :class="feedsHeight ? 'feed_height' : 'initial_height'"
        :style="{ '--height': `${feedHeight}px` }"
      >
        <li v-for="(media, mediaIndex) in feed.media" :key="mediaIndex" class="flex flex-col mt-1">
          <div class="w-full px-6 font-bold whitespace-nowrap">
            <label
              :for="media.id"
              class="w-full h-5 relative mt-1 mb-0.5 flex space-x-2 cursor-pointer"
            >
              <div class="w-4 h-4 inline-block">
                <input
                  :id="media.id"
                  type="checkbox"
                  checked
                  class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                  @click.stop="
                  !media.mediaValue
                    ? [
                        nowCheckedMedia(
                          media.id,
                          media.mediaValue,
                          media.individualMedia,
                          feed.media
                        ),
                        checkedAllChild(media.id, media.individualMedia),
                      ]
                    : nowUnCheckedMedia(
                        media.id,
                        media.mediaValue,
                        media.individualMedia,
                        feed.media
                      )
                "
                />
                <fa
                  class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
                  :icon="['fas', 'check']"
                />
              </div>
              <div class="pr-4 inline-block -mt-0.5">{{ media.mediaName }}</div>
              <!-- <div
                v-if="!media.mediaValue"
                class="-mt-0.5 inline-block pl-2 font-thin italic"
                @click.stop="unCheckedAll(media.id, media.individualMedia)"
              >Check/Uncheck All</div>-->
            </label>
          </div>
          <ul
            v-if="!media.mediaValue"
            :id="media.id"
            class="pl-6 transition-all duration-500 ease-in-out"
            :class="
              media.mediaHeight
                ? 'individual_feed_height opacity-100'
                : 'initial_height opacity-0'
            "
            :style="{
              '--height': `${media.individualMedia.length * 30 + 2}px`,
            }"
          >
            <li
              v-for="(
                individualMedia, individualMediaIndex
              ) in media.individualMedia"
              :key="individualMediaIndex"
              class="flex flex-col mt-1"
            >
              <div class="w-full px-6 font-bold whitespace-nowrap">
                <label
                  class="w-full h-5 relative mt-1 mb-0.5 flex space-x-2 cursor-pointer"
                  :for="`${individualMedia.text}_${individualMedia.value}_${individualMedia.id}`"
                >
                  <div class="w-4 h-4 inline-block">
                    <input
                      :id="`${individualMedia.text}_${individualMedia.value}_${individualMedia.id}`"
                      v-model="individualMedia.mediaValue"
                      type="checkbox"
                      class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                      @click="
                      nowCheckedIndividualMedia(
                        individualMedia.id,
                        media.individualMedia,
                        media.id,
                        individualMediaIndex
                      )
                    "
                    />
                    <fa
                      class="text-red-deep w-3.5 h-3.5 absolute left-px top-0.5 font-normal cursor-pointer opacity-0 check-1"
                      :icon="['fas', 'check']"
                    />
                  </div>
                  <div class="pr-4 inline-block -mt-0.5">{{ individualMedia.text }}</div>
                </label>
              </div>
              <!-- <ul v-if="!individualMedia.mediaValue" class="space-y-1 pl-8">
                <li
                  v-for="(
                    account, accountIndex
                  ) in individualMedia.individualMedia"
                  :key="accountIndex"
                  class="flex flex-col space-y-1"
                >
                  <div class="flex items-center space-x-2 px-6 font-bold">
                    <label class="h-5 relative" :for="account.id">
                      <input
                        :id="account.id"
                        type="checkbox"
                        class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                      />
                      <fa
                        class="text-red-deep w-3.5 h-3.5 absolute left-0 top-0.5 font-normal cursor-pointer opacity-0 check-1"
                        :icon="['fas', 'check']"
                      />
                    </label>
                    <span>{{ account.text }}</span>
                  </div>
                </li>
              </ul>-->
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AllFeedsMenu',
  props: {
    arrowColor: {
      type: String,
      default: '#7D80BD',
    },
    scrollColor: {
      type: String,
      default: '#7D80BD',
    },
    showAllSocialFeeds: {
      type: Boolean,
      default: false,
    },
    classStyleName: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
      socialFeeds: computed(() =>
        JSON.parse(JSON.stringify(store.getters.socialFeeds))
      ),
    }
  },
  data() {
    return {
      feeds: '',
      showFeeds: false,
      showIndividualFeeds: false,
      feedsHeight: false,
      individualFeedsHeight: false,
      feedHeight: 0,
    }
  },
  watch: {
    socialFeeds(data) {
      if (data) {
        this.getFeeds()
      }
    },
    showAllSocialFeeds(data) {
      if (data) {
        this.getFeeds()
      }
    },
  },
  mounted() {
    this.nowChecked('all_feeds')
    this.getFeeds()
  },
  methods: {
    nowChecked(mainValue) {
      if (this.feeds) {
        this.feeds.forEach((element) => {
          if (element.id === mainValue && !element.mediaValue) {
            this.feedHeight = this.feedHeight - element.media.length * 28 + 2
            this.$emit('get-all-feeds')
            this.feedsHeight = false
            setTimeout(() => {
              this.$emit('rounded', false)
              this.showFeeds = false
            }, 400)
            element.mediaValue = !element.mediaValue
            this.$emit('select-feed', element.mediaValue)
          } else {
            this.feedHeight = element.media.length * 28 + 2
            this.showFeeds = true
            setTimeout(() => {
              this.feedsHeight = true
            })
            element.mediaValue = !element.mediaValue
            this.$emit('rounded', true)
            this.$emit('select-feed', element.mediaValue)
          }
        })
      }
    },
    nowCheckedMedia(mainValue, mediaValue, media, feedMedia) {
      if (this.feeds) {
        if (mainValue === 'social_media') {
          console.log('ayon2')
          this.$emit('set-provider', 'all')
          if (!mediaValue) {
            this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            feedMedia.forEach((item) => {
              if (item.id === 'social_media') {
                item.mediaHeight = false
              }
            })
            setTimeout(() => {
              feedMedia.forEach((item) => {
                if (item.id === 'social_media') {
                  item.mediaValue = true
                }
              })
            }, 300)
          }
        } else if (mainValue === 'group') {
          this.$emit('set-group', 'all')
          if (!mediaValue) {
            this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            feedMedia.forEach((item) => {
              if (item.id === 'group') {
                item.mediaHeight = false
              }
            })
            setTimeout(() => {
              feedMedia.forEach((item) => {
                if (item.id === 'group') {
                  item.mediaValue = true
                }
              })
            }, 300)
          }
        } else if (mainValue === 'name') {
          this.$emit('set-name', 'all')
          if (!mediaValue) {
            this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            feedMedia.forEach((item) => {
              if (item.id === 'name') {
                item.mediaHeight = false
              }
            })
            setTimeout(() => {
              feedMedia.forEach((item) => {
                if (item.id === 'name') {
                  item.mediaValue = true
                }
              }, 300)
            })
          }
        }
      }
    },
    nowUnCheckedMedia(mainValue, mediaValue, media, feedMedia) {
      if (this.feeds) {
        if (mainValue === 'social_media') {
          if (mediaValue) {
            this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            feedMedia.forEach((item) => {
              if (item.id === 'social_media') {
                item.mediaValue = false
              }
            })
            setTimeout(() => {
              feedMedia.forEach((item) => {
                if (item.id === 'social_media') {
                  item.mediaHeight = true
                }
              })
            })
          }
        } else if (mainValue === 'group') {
          this.$emit('set-group', 'all')
          if (mediaValue) {
            this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            feedMedia.forEach((item) => {
              if (item.id === 'group') {
                item.mediaValue = false
              }
            })
            setTimeout(() => {
              feedMedia.forEach((item) => {
                if (item.id === 'group') {
                  item.mediaHeight = true
                }
              })
            })
          }
        } else if (mainValue === 'name') {
          this.$emit('set-name', 'all')
          if (mediaValue) {
            this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            feedMedia.forEach((item) => {
              if (item.id === 'name') {
                item.mediaValue = false
              }
            })
            setTimeout(() => {
              feedMedia.forEach((item) => {
                if (item.id === 'name') {
                  item.mediaHeight = true
                }
              })
            })
          }
        }
      }
    },
    nowCheckedIndividualMedia(mainValue, individualMedia, media, index) {
      if (this.feeds && individualMedia) {
        let allLegends
        if (media === 'social_media') {
          allLegends = document.querySelectorAll(
            "#social_media input[type='checkbox']"
          )
        } else if (media === 'group') {
          allLegends = document.querySelectorAll(
            "#group input[type='checkbox']"
          )
        } else if (media === 'name') {
          allLegends = document.querySelectorAll("#name input[type='checkbox']")
        }
        let count = 0
        allLegends.forEach((item) => {
          if (item.checked) {
            count = count + 1
          }
        })
        if (!allLegends[index].checked && count === 0) {
          allLegends[index].checked = true
        }
        individualMedia.forEach((item) => {
          if (item.id === mainValue && count !== 0) {
            item.mediaValue = !item.mediaValue
          }
        })
        if (media === 'social_media') {
          if (individualMedia.every((item) => item.mediaValue === true)) {
            this.$emit('set-provider', 'all')
          } else if (count !== 0) {
            const temp = individualMedia.filter(
              (item) => item.mediaValue === true
            )
            const tempArray = []
            temp.forEach((item) => {
              tempArray.push(item.value)
            })
            this.$emit('set-provider', String(tempArray))
          }
        } else if (media === 'group') {
          if (individualMedia.every((item) => item.mediaValue === true)) {
            this.$emit('set-group', 'all')
          } else if (count !== 0) {
            const temp = individualMedia.filter(
              (item) => item.mediaValue === true
            )
            const tempArray = []
            temp.forEach((item) => {
              tempArray.push(item.value)
            })
            this.$emit('set-group', String(tempArray))
          }
        } else if (media === 'name') {
          if (individualMedia.every((item) => item.mediaValue === true)) {
            this.$emit('set-name', 'all')
          } else if (count !== 0) {
            const temp = individualMedia.filter(
              (item) => item.mediaValue === true
            )
            const tempArray = []
            temp.forEach((item) => {
              tempArray.push(item.value)
            })
            this.$emit('set-name', String(tempArray))
          }
        }
      }
    },
    getFeeds() {
      this.feeds = this.socialFeeds
    },
    checkedAll(mainValue) {
      if (this.feeds) {
        this.feeds.forEach((element) => {
          if (element.id === mainValue) {
            this.$emit('select-feed', true)
            this.feedHeight = 0
            setTimeout(() => {
              this.$emit('rounded', false)
              this.showFeeds = false
            }, 400)
            element.mediaValue = true
            element.media.forEach((item) => {
              item.mediaHeight = false
              setTimeout(() => {
                const allLegends = document.querySelectorAll(
                  "#all_feeds input[type='checkbox']"
                )
                allLegends.forEach((item) => {
                  if (!item.checked) {
                    item.checked = true
                  }
                })
                item.mediaValue = true
              }, 300)
              item.individualMedia.forEach((childItem) => {
                childItem.mediaValue = true
              })
            })
          }
        })
      }
    },
    checkedAllChild(mainValue, individualMedia) {
      if (mainValue === 'social_media') {
        individualMedia.forEach((item) => {
          item.mediaValue = true
        })
      }
      if (mainValue === 'group') {
        individualMedia.forEach((item) => {
          item.mediaValue = true
        })
      }
      if (mainValue === 'name') {
        individualMedia.forEach((item) => {
          item.mediaValue = true
        })
      }
    },
    unCheckedAll(mainValue, individualMedia) {
      if (mainValue === 'social_media') {
        if (individualMedia.some((item) => item.mediaValue === true)) {
          console.log('ayon')
          individualMedia.forEach((item) => {
            item.mediaValue = false
          })
        } else if (individualMedia.some((item) => item.mediaValue === false)) {
          console.log('parsia')
          individualMedia.forEach((item) => {
            item.mediaValue = true
          })
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
// .toggle-checkbox {
//   width: 16px;
//   min-width: 16px;
//   height: 16px;
//   border: 0px;
//   top: 2px;
//   left: 2px;
//   transition: all 0.5s ease-in-out;
//   background-color: #ffffff;
//   &.toggle.label {
//     min-width: 36px !important;
//   }
//   &:checked {
//     @apply right-0;
//     left: 18px;
//     transition: all 0.5s ease-in-out;
//     background-color: #ffffff;
//   }
//   &:checked + .toggle-label {
//     @apply bg-white;
//     transition: all 0.5s ease-in-out;
//     background-color: #a22a2a;
//     min-width: 36px;
//   }
// }
// .checkbox-label {
//   min-width: 36px !important;
// }
.toggle-check-1 {
  &:checked {
    @apply bg-white;
  }
  &:checked + .check-1 {
    @apply opacity-100;
    color: var(--arrowColor);
  }
}
ul li {
  // margin-top: 0px !important;
}
.scroll {
  scrollbar-color: var(--scrollColor) #ececec !important; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--scrollColor) !important;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--scrollColor) !important;
  }
}
.max-height- {
  &320 {
    max-height: 320px;
  }
  &274 {
    max-height: 274px;
  }
}
.initial_height {
  height: 0px;
}
.feed_height {
  height: var(--height);
}
.individual_feed_height {
  height: var(--height);
}
.border-radius {
  border-top-left-radius: 9999px !important;
  border-top-right-radius: 9999px !important;
}
.border-radius-full {
  border-top-left-radius: 9999px !important;
  border-top-right-radius: 9999px !important;
  background-color: var(--arrowColor);
}
.border-raduis-xl {
  border-top-left-radius: 4px !important;
  border-top-right-radius: 4px !important;
  background-color: var(--arrowColor);
}
.scroll-hidden {
  overflow: hidden !important;
}
@media (max-width: 767px) {
  .scroll-hidden {
    overflow: hidden !important;
  }
  .max-height- {
    &320 {
      max-height: 320px;
    }
    &274 {
      max-height: 100%;
    }
  }
}
</style>