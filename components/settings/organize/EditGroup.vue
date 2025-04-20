<template>
  <section class="h-full">
    <div
      class="
        top-0
        right-0
        absolute
        bg-ash-dark
        md:p-21
        p-4
        md:pt-12
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        md:rounded-l-2xl md:shadow-2xl
      "
      :class="[showEditGroup ? 'show md:shadow-2xl' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full card">
          <!--start => title area-->
          <div class="flex flex-row justify-between items-center mb-2">
            <h2
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                md:font-bold
              "
            >
              Edit Group
            </h2>
            <div
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="resetAll()"
            >
              <fa
                class="
                  text-yellow-midlight
                  xl:text-2xl
                  md:text-xl
                  text-2xl
                  md:font-bold
                  font-normal
                "
                :icon="['fas', 'times']"
              />
            </div>
          </div>
          <!--end => title area-->
          <!--start => main area-->
          <div class="flex flex-col h-full">
            <div class="flex flex-col h-1/2 mt-4 w-full min-height-250">
              <div class="w-full md:mb-2 mb-1 lg:mb-0">
                <input
                  id="newgroup"
                  v-model="group.groupName"
                  type="text"
                  placeholder="New Group Name"
                  class="
                    text-yellow-midlight
                    w-full
                    rounded-full
                    py-2
                    px-2.5
                    outline-none
                    focus:outline-none
                    bg-white
                    md:text-xl
                    text-sm
                    border-b border-white
                    placeholder-yellow-midlight placeholder-opacity-50
                  "
                  @blur="$v.group.groupName.$touch()"
                />
                <template v-if="$v.group.groupName.$error">
                  <p class="text-red-400 text-xs mb-0 pl-2">
                    {{ validationMsg($v.group.groupName) }}
                  </p>
                </template>
              </div>
              <div
                class="
                  card_table
                  w-full
                  md:mt-5
                  mt-2
                  bg-white
                  rounded-2xl
                  flex flex-col flex-grow
                "
              >
                <div
                  class="
                    table_header
                    w-full
                    bg-yellow-midlight
                    py-1
                    rounded-t-2xl
                  "
                >
                  <h2
                    class="
                      text-base text-white text-center
                      font-bold
                      md:text-xl
                      text-lg
                    "
                  >
                    Feeds in Group
                  </h2>
                </div>
                <div
                  class="table_body flex flex-col pb-2.5 overflow-y-auto scroll"
                >
                  <div
                    class="h-full flex flex-col pt-2.5 overflow-y-auto scroll"
                  >
                    <div class="table-th flex flex-row justify-between px-5">
                      <p
                        class="
                          th
                          md:text-gray-1000
                          text-yellow-midlight
                          font-bold
                          w-1/2
                          md:text-lg
                          text-md
                        "
                      >
                        Source
                      </p>
                      <p
                        class="
                          th
                          md:text-gray-1000
                          text-yellow-midlight
                          font-bold
                          w-1/2
                          md:pl-14 md:text-lg
                          text-md
                        "
                      >
                        Name
                      </p>
                    </div>
                    <div class="flex flex-col mt-2">
                      <transition-group name="feeds">
                        <div
                          v-for="(item, index) in choosableFeeds"
                          :key="item.id"
                          class="
                            cursor-pointer
                            mx-2.5
                            text-gray-1000
                            hover:text-white
                            table-td
                          "
                          @click="removeSelectedFeed(item, index)"
                        >
                          <div class="flex flex-row justify-between">
                            <div class="pl-1.5 pr-2.5">
                              <div class="py-0.5">
                                <p
                                  class="
                                    td
                                    font-w-1/2
                                    md:text-lg
                                    text-md text-ash-primary
                                  "
                                >
                                  {{ item.provider }}
                                </p>
                              </div>
                            </div>
                            <span
                              class="
                                td
                                w-1/2
                                md:pl-14
                                text-md text-ash-primary
                                relative
                                has-tooltip
                              "
                            >
                              {{ item.name | strLimit(14) }}
                              <span class="tooltip">{{ item.name }}</span>
                            </span>
                          </div>
                        </div>
                      </transition-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col h-1/2 md:mt-4 mt-5 w-full min-height-250">
              <div
                class="w-full flex items-center relative md:mb-2 mb-5 lg:mb-0"
              >
                <fa
                  class="text-yellow-midlight absolute ml-3 w-5 search-icon"
                  :icon="['fas', 'search']"
                />
                <input
                  id="maycontain"
                  v-model="mayContain"
                  type="text"
                  placeholder="Search"
                  class="
                    text-yellow-midlight
                    w-full
                    rounded-full
                    py-2
                    px-2.5
                    pl-8
                    outline-none
                    focus:outline-none
                    bg-white
                    border-b border-white
                    md:text-xl
                    text-sm
                    placeholder-yellow-midlight placeholder-opacity-50
                  "
                />
              </div>
              <div
                class="
                  card_table
                  w-full
                  md:mt-5
                  bg-white
                  rounded-2xl
                  flex flex-col flex-grow
                "
              >
                <div
                  class="
                    table_header
                    w-full
                    bg-yellow-midlight
                    py-1
                    rounded-t-2xl
                  "
                >
                  <h2
                    class="
                      text-base text-white text-center
                      font-bold
                      md:text-xl
                      text-lg
                    "
                  >
                    Available Feeds
                  </h2>
                </div>
                <div
                  class="table_body flex flex-col pb-2.5 overflow-y-auto scroll"
                >
                  <div
                    class="h-full flex flex-col pt-2.5 overflow-y-auto scroll"
                  >
                    <div class="table-th flex flex-row justify-between px-5">
                      <p
                        class="
                          th
                          md:text-gray-1000
                          text-yellow-midlight
                          font-bold
                          w-1/2
                          md:text-lg
                          text-md
                        "
                      >
                        Source
                      </p>
                      <p
                        class="
                          th
                          md:text-gray-1000
                          text-yellow-midlight
                          font-bold
                          w-1/2
                          md:pl-14
                          text-sm
                          md:text-lg
                          text-md
                        "
                      >
                        Name
                      </p>
                    </div>
                    <div
                      v-if="searchTableItems.length > 0"
                      class="flex flex-col mt-2"
                    >
                      <div
                        v-for="(availableFeed, index) in searchTableItems"
                        :key="index"
                        class="
                          cursor-pointer
                          mx-2.5
                          text-gray-1000
                          hover:text-white
                          table-td
                        "
                        @click="addFeedToGroup(availableFeed, index)"
                      >
                        <div class="flex flex-row justify-between">
                          <div class="pl-1 pr-2.5">
                            <div class="py-0.5">
                              <p class="td font-w-1/2 text-md text-ash-primary">
                                {{ availableFeed.provider }}
                              </p>
                            </div>
                          </div>
                          <span
                            class="
                              td
                              w-1/2
                              md:pl-14
                              text-md text-ash-primary
                              relative
                              has-tooltip
                            "
                          >
                            {{ availableFeed.name | strLimit(14) }}
                            <span class="tooltip">{{
                              availableFeed.name
                            }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      v-else
                      class="w-full h-full flex justify-center items-center"
                    >
                      No feeds available to select
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end => main area-->
        </div>

        <!--start => footer area-->
        <div class="w-full">
          <div class="flex flex-col mt-7 w-full h-46 rounded-xl">
            <div class="flex flex-row justify-center mt-8 space-x-5 md:px-8">
              <button
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-yellow-midlight
                  bg-ash-dark
                  rounded-full
                  border-2 border-yellow-midlight
                  outline-none
                  font-bold
                  setup
                  md:text-lg
                  text-xl
                "
                :disabled="deleteProcess"
                @click="deleteGroup()"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Delete</span>
                  <fa
                    v-if="deleteProcess"
                    class="
                      absolute
                      right-5
                      text-yellow-midlight
                      font-bold
                      animate-spin
                    "
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
              <button
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-white
                  bg-yellow-midlight
                  rounded-full
                  border-none
                  outline-none
                  font-bold
                  setup
                  border-2 border-white
                  md:text-lg
                  text-xl
                "
                :disabled="updateProcess"
                @click="updateGroup()"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Save</span>
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
        <!--end => footer area-->
      </div>
    </div>
    <alert-confirm-modal
      :processing="deleteProcess"
      :show="showDeleteAlert"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import { AVAILABLE_FEEDS, GROUPS } from '~/constants/urls'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'

export default {
  name: 'EditGroup',
  components: { AlertConfirmModal },
  layout: 'home',
  props: {
    selectedGroup: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      skew: false,
      mayContain: '',
      availableFeeds: [],
      choosableFeeds: [],
      group: {
        id: '',
        groupName: '',
        feedsInGroup: [],
      },
      updateProcess: false,
      deleteProcess: false,
      showDeleteAlert: false,
    }
  },
  validations: {
    group: {
      groupName: {
        required,
        maxLength: maxLength(40),
      },
    },
  },
  computed: {
    ...mapState('setting', ['showEditGroup']),
    ...mapState('socialFeed', ['allGroups']),
    searchTableItems() {
      return this.unselectedFeeds.filter((item) => {
        return (
          item.provider.toUpperCase().match(this.mayContain.toUpperCase()) ||
          item.name.toUpperCase().match(this.mayContain.toUpperCase())
        )
      })
    },
    selectedFeeds() {
      // eslint-disable-next-line array-callback-return
      return this.availableFeeds.filter((item) => {
        if (item.selected) {
          return item
        }
      })
    },
    unselectedFeeds() {
      // eslint-disable-next-line array-callback-return
      return this.availableFeeds.filter((item) => {
        if (!item.selected) {
          return item
        }
      })
    },
  },
  watch: {
    selectedGroup(data) {
      if (data.id !== '') {
        this.getAvailableFeeds()
        this.getSingleGroupFeeds(data)
      }
    },
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    getSingleGroupFeeds(data) {
      this.$axios
        .$get(GROUPS + '?id=' + data.id)
        .then((res) => {
          // this.makeFeedUnSelected()
          res.data.feedsInGroup.forEach((feed) => {
            feed.selected = true
          })
          this.choosableFeeds = res.data.feedsInGroup
          this.group = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetAll() {
      this.clearAllField()
      this.$emit('hide-edit-group', this.group)
    },
    async getAvailableFeeds() {
      try {
        const res = await this.$axios.$get(AVAILABLE_FEEDS)
        if (res.success) {
          res.data.forEach((item) => {
            item.selected = false
          })
          this.availableFeeds = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    addFeedToGroup(item, index) {
      item.selected = true
      this.choosableFeeds.push(item)
      this.availableFeeds.splice(index, 1)
      this.$emit('add-feed', { item1: item })
    },
    removeSelectedFeed(item, index) {
      item.selected = false
      this.choosableFeeds.splice(index, 1)
      this.availableFeeds.push(item)
      this.$emit('add-feed', { item1: item })
    },
    async updateGroup() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.group.feedsInGroup = []
        this.choosableFeeds.forEach((item) => {
          this.group.feedsInGroup.push(item.id)
        })
        this.$toast.clear()
        if (this.group.feedsInGroup.length > 0) {
          try {
            this.updateProcess = true

            const res = await this.$axios.$put(GROUPS, this.group)
            if (res.success) {
              this.$toast.success(res.message, {
                className: ['toasted-bg-archive'],
              })
              this.$emit('update-group', {
                feedsInGroup: res.data.feedsInGroup,
                groupName: res.data.groupName,
                id: res.data.id,
              })
              this.resetAll()
              const tempAllGroups = JSON.parse(JSON.stringify(this.allGroups))
              tempAllGroups.push({
                id: res.data.id,
                text: res.data.groupName,
                value: res.data.id,
              })
              this.$store.commit('socialFeed/SET_ALL_GROUPS', tempAllGroups)
              // this.makeFeedUnSelected()
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
            this.updateProcess = false
          } catch (error) {
            this.updateProcess = false
            console.log(error)
          }
        } else {
          this.$toast.error('Please select feeds', {
            className: ['toasted-bg-alert'],
          })
        }
      }
    },
    clearAllField() {
      this.group.id = ''
      this.group.groupName = ''
      this.group.feedsInGroup = []
      this.mayContain = ''
      this.$emit('clear-field')
      this.$v.$reset()
    },
    makeFeedUnSelected() {
      this.availableFeeds = this.choosableFeeds
      this.availableFeeds.forEach((item) => {
        item.selected = false
        // this.$emit('add-feed', { item1: item })
      })
    },
    deleteGroup() {
      this.showDeleteAlert = true
    },
    deleteCancel() {
      this.showDeleteAlert = false
    },
    async deleteConfirm() {
      this.$toast.clear()
      try {
        this.deleteProcess = true
        const res = await this.$axios.$delete(GROUPS, {
          data: {
            id: this.group.id,
          },
        })
        if (res.success) {
          this.makeFeedUnSelected()
          this.$emit('clear-field')
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.$emit('remove-selected-group', this.group.id)
          const tempAllGroups = JSON.parse(JSON.stringify(this.allGroups))
          tempAllGroups.forEach((item, index) => {
            if (item.id === this.group.id) {
              tempAllGroups.splice(index, 1)
            }
          })
          this.$store.commit('socialFeed/SET_ALL_GROUPS', tempAllGroups)
          this.resetAll()
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.showDeleteAlert = false
        this.deleteProcess = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tooltip {
  @apply absolute 
  text-yellow-midlight 
  bg-offwhite-200 
  z-100 
  left-0
  -top-5 
  text-left 
  invisible 
  md:p-1.5 
  p-0.5 
  md:px-4 
  px-2 
  text-sm 
  rounded-xl 
  shadow-lg;
  width: auto;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 9999999999;
}
.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
}
.card {
  height: calc(100% - 88px);
}
.table-td {
  padding: 3px 5px;
}
.table-td:hover {
  background-color: #e0ad1f;
  // padding-top: 2px;
  // padding-bottom: 2px;
  @apply rounded-full;
}
.card_table {
  height: calc(100% - 75px);
}
.table_body {
  height: calc(100% - 32px);
}
.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}
@media (min-height: 576px) {
  .min-height-250 {
    min-height: 193px;
  }
}
@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 100%;
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
  .card {
    height: calc(100% - 115px);
  }
}
</style>