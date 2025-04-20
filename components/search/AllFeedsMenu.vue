<template>
  <ul
    class="text-white text-md h-auto pb-2 relative scroll"
    :style="{ '--arrowColor': arrowColor }"
  >
    <li v-for="(feed, mainIndex) in feeds" :key="mainIndex" class="flex flex-col">
      <div
        class="px-4 font-bold sticky z-1 bg-purple-midlight top-0 left-0 pt-2 whitespace-nowrap w-full"
        :class="[classStyleName]"
      >
        <label
          class="flex space-x-2 h-5 relative mt-0.5 mb-0.5 w-full cursor-pointer"
          :for="`all_feeds-${feed.id}`"
        >
          <div class="w-4 h-4 inline-block">
            <input
              :id="`all_feeds-${feed.id}`"
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
              class="text-red-deep w-3.5 h-3.5 absolute left-px md:top-1 top-0.5 font-normal cursor-pointer opacity-0 check-1"
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
          <div class="px-6 font-bold whitespace-nowrap w-full">
            <label class="flex space-x-2 h-5 relative mt-1 mb-0.5 w-full cursor-pointer" :for="media.id">
              <div class="w-4 h-4 inline-block">
                <input
                  :id="media.id"
                  type="checkbox"
                  checked
                  class="appearance-none w-4 h-4 border-2 rounded-sm border-white toggle-check-1"
                  @click="
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
                  class="text-red-deep w-3.5 h-3.5 absolute left-px md:top-1 top-0.5 font-normal cursor-pointer opacity-0 check-1"
                  :icon="['fas', 'check']"
                />
              </div>
              <div class="pr-4 inline-block -mt-0.5">{{ media.mediaName }}</div>
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
              '--height': isDesktop
                ? `${media.individualMedia.length * 30 + 2}px`
                : `${media.individualMedia.length * 30 + 2}px`,
            }"
          >
            <li
              v-for="(
                individualMedia, individualMediaIndex
              ) in media.individualMedia"
              :key="individualMediaIndex"
              class="flex flex-col mt-1"
            >
              <div class="flex items-start space-x-2 px-6 font-bold whitespace-nowrap w-full">
                <label
                  class="flex space-x-2 h-5 relative mt-1 mb-0.5 w-full cursor-pointer"
                  :for="`Search_${individualMedia.value}_${individualMedia.id}`"
                >
                  <div class="w-4 h-4 inline-block">
                    <input
                      :id="`Search_${individualMedia.value}_${individualMedia.id}`"
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
                      class="text-red-deep w-3.5 h-3.5 absolute left-px md:top-1 top-0.5 font-normal cursor-pointer opacity-0 check-1"
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
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default defineComponent({
  name: 'AllFeedsMenu',
  props: {
    arrowColor: {
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
    saveSearchProperties: {
      type: Object,
      default: () => {},
    },
    searchAbleProperties: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const store = useStore()
    const breakpoints = useBreakpoints(breakpointsTailwind)
    return {
      store,
      searchSocialFeeds: computed(() =>
        JSON.parse(JSON.stringify(store.getters.searchSocialFeeds))
      ),
      editAllFeeds: computed(() => store.state.editAllFeeds),
      dataSearch: computed(() => store.state.dataSearch),
      isDesktop: breakpoints.greater('md'),
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
    searchSocialFeeds(data) {
      if (data) {
        this.getFeeds()
      }
    },
    showAllSocialFeeds(data) {
      if (data) {
        this.getFeeds()
      }
    },
    // editAllFeeds(data) {
    //   if (data) {
    //     this.getFeeds()
    //     this.editFeeds()
    //   } else {
    //     this.checkedAll('all_feeds')
    //   }
    // },
    dataSearch(data) {
      if (data) {
        this.getFeeds()
        this.dataSearchFeeds()
      } else {
        this.checkedAll('all_feeds')
      }
    },
  },
  mounted() {
    this.nowChecked('all_feeds')
  },
  methods: {
    nowChecked(mainValue) {
      if (this.feeds) {
        this.feeds.forEach((element) => {
          if (element.id === mainValue && !element.mediaValue) {
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight - element.media.length * 32 + 2
            } else {
              this.feedHeight = this.feedHeight - element.media.length * 28 + 2
            }
            this.$emit('get-all-feeds')
            this.feedsHeight = false
            setTimeout(() => {
              this.$emit('rounded', false)
              this.showFeeds = false
            }, 400)
            element.mediaValue = !element.mediaValue
            this.$emit('select-feed', element.mediaValue)
          } else {
            if (this.isDesktop) {
              this.feedHeight = element.media.length * 32 + 2
            } else {
              this.feedHeight = element.media.length * 28 + 2
            }
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
          this.$emit('set-provider', 'all')
          if (!mediaValue) {
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            } else {
              this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            }
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
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            } else {
              this.feedHeight = this.feedHeight - (media.length * 30 + 2)
            }
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
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight - (media.length * 30 + 2) - 30
            } else {
              this.feedHeight = this.feedHeight - (media.length * 30 + 2) - 26
            }
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
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            } else {
              this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            }
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
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            } else {
              this.feedHeight = this.feedHeight + (media.length * 30 + 2)
            }
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
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight + (media.length * 30 + 2) + 30
            } else {
              this.feedHeight = this.feedHeight + (media.length * 30 + 2) + 26
            }
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
      this.feeds = this.searchSocialFeeds
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
    editFeeds() {
      if (this.feeds) {
        this.feeds.forEach((item) => {
          if (
            this.saveSearchProperties &&
            this.saveSearchProperties.provider === 'all' &&
            this.saveSearchProperties.groupId === 'all'
          ) {
            this.$emit('select-feed', true)
            this.feedHeight = 0
            setTimeout(() => {
              this.$emit('rounded', false)
            }, 400)
            item.mediaValue = true
            this.showFeeds = false
            this.feedsHeight = false
            item.media.forEach((element) => {
              element.mediaHeight = false
              setTimeout(() => {
                const allLegends = document.querySelectorAll(
                  "#all_feeds input[type='checkbox']"
                )
                allLegends.forEach((item1) => {
                  if (!item1.checked) {
                    item1.checked = true
                  }
                })
                element.mediaValue = true
              }, 300)
              element.individualMedia.forEach((childItem) => {
                childItem.mediaValue = true
              })
            })
          } else if (this.saveSearchProperties) {
            this.$emit('select-feed', false)
            this.$emit('rounded', true)
            this.feedHeight = this.feedHeight + item.media.length * 32 + 2
            item.mediaValue = false
            this.showFeeds = true
            this.feedsHeight = true
            item.media.forEach((element1) => {
              if (
                element1.id === 'social_media' &&
                this.saveSearchProperties.provider !== 'all'
              ) {
                element1.mediaHeight = true
                this.feedHeight =
                  this.feedHeight + element1.individualMedia.length * 30 + 2
                setTimeout(() => {
                  const allLegends = document.querySelectorAll(
                    "#all_feeds input[type='checkbox']"
                  )[0]
                  if (allLegends.checked) {
                    allLegends.checked = false
                  }
                  element1.mediaValue = false
                })
                element1.individualMedia.forEach((childItem) => {
                  if (
                    this.saveSearchProperties.provider.includes(childItem.value)
                  ) {
                    childItem.mediaValue = true
                  } else {
                    childItem.mediaValue = false
                  }
                })
              } else if (
                element1.id === 'group' &&
                this.saveSearchProperties.groupId !== 'all'
              ) {
                element1.mediaHeight = true
                this.feedHeight =
                  this.feedHeight + element1.individualMedia.length * 30 + 2
                setTimeout(() => {
                  const allLegends = document.querySelectorAll(
                    "#all_feeds input[type='checkbox']"
                  )[1]
                  // allLegends.forEach((item) => {
                  if (allLegends.checked) {
                    allLegends.checked = false
                  }
                  // })
                  element1.mediaValue = false
                }, 300)
                element1.individualMedia.forEach((childItem) => {
                  if (
                    this.saveSearchProperties.groupId.includes(childItem.value)
                  ) {
                    childItem.mediaValue = true
                  } else {
                    childItem.mediaValue = false
                  }
                })
              }
            })
            // })
          }
        })
      }
    },
    dataSearchFeeds() {
      if (this.feeds) {
        this.feeds.forEach((item) => {
          if (
            this.searchAbleProperties &&
            this.searchAbleProperties.provider === 'all' &&
            this.searchAbleProperties.groupId === 'all'
          ) {
            this.$emit('select-feed', true)
            this.feedHeight = 0
            setTimeout(() => {
              this.$emit('rounded', false)
            }, 400)
            item.mediaValue = true
            this.showFeeds = false
            this.feedsHeight = false
            item.media.forEach((element) => {
              element.mediaHeight = false
              setTimeout(() => {
                const allLegends = document.querySelectorAll(
                  "#all_feeds input[type='checkbox']"
                )
                allLegends.forEach((item1) => {
                  if (!item1.checked) {
                    item1.checked = true
                  }
                })
                element.mediaValue = true
              }, 300)
              element.individualMedia.forEach((childItem) => {
                childItem.mediaValue = true
              })
            })
          } else if (this.searchAbleProperties) {
            this.$emit('select-feed', false)
            this.$emit('rounded', true)
            if (this.isDesktop) {
              this.feedHeight = this.feedHeight + item.media.length * 32 + 2
            } else {
              this.feedHeight = this.feedHeight + item.media.length * 28 + 2
            }
            item.mediaValue = false
            this.showFeeds = true
            this.feedsHeight = true
            item.media.forEach((element1) => {
              if (
                element1.id === 'social_media' &&
                this.searchAbleProperties.provider !== 'all'
              ) {
                element1.mediaHeight = true
                if (this.isDesktop) {
                  this.feedHeight =
                    this.feedHeight + element1.individualMedia.length * 32 + 2
                } else {
                  this.feedHeight =
                    this.feedHeight + element1.individualMedia.length * 28 + 2
                }
                setTimeout(() => {
                  const allLegends =
                    document.querySelectorAll('#social_media')[0]
                  if (allLegends.checked) {
                    allLegends.checked = false
                  }
                  element1.mediaValue = false
                })
                element1.individualMedia.forEach((childItem) => {
                  if (
                    this.searchAbleProperties.provider.includes(childItem.value)
                  ) {
                    childItem.mediaValue = true
                  } else {
                    childItem.mediaValue = false
                  }
                })
              } else if (
                element1.id === 'group' &&
                this.searchAbleProperties.groupId !== 'all'
              ) {
                element1.mediaHeight = true
                if (this.isDesktop) {
                  this.feedHeight =
                    this.feedHeight + element1.individualMedia.length * 32 + 2
                } else {
                  this.feedHeight =
                    this.feedHeight + element1.individualMedia.length * 28 + 2
                }
                setTimeout(() => {
                  const allLegends = document.querySelectorAll('#group')[0]
                  if (allLegends.checked) {
                    allLegends.checked = false
                  }
                  element1.mediaValue = false
                })
                element1.individualMedia.forEach((childItem) => {
                  if (
                    this.searchAbleProperties.groupId.includes(childItem.value)
                  ) {
                    childItem.mediaValue = true
                  } else {
                    childItem.mediaValue = false
                  }
                })
              }
            })
            // })
          }
        })
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
  scrollbar-color: #474481 #ececec !important; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #474481 !important;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #474481 !important;
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
}
.border-raduis-xl {
  border-top-left-radius: 4px !important;
  border-top-right-radius: 4px !important;
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