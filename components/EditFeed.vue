<template>
  <section>
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
        md:rounded-b-none
        rounded-b-3xl
        md:rounded-l-2xl
      "
      :class="[editFeed || showEditFeedComp ? 'show md:shadow-2xl' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <!--start => title area-->
          <div class="flex flex-row justify-between items-center">
            <h2 class="md:text-xl text-2xl md:font-bold" :class="[`${source}`]">
              Edit Feeds
            </h2>
            <fa
              class="md:w-5 md:h-5 w-6 h-6 md:font-bold cursor-pointer"
              :class="[`${source}`]"
              :icon="['fas', 'times']"
              @click="resetAll()"
            />
          </div>
          <!--end => title area-->

          <!--start => main area-->
          <div class="flex flex-col w-full md:mt-8 pt-2 md:space-y-4 space-y-2">
            <div
              class="
                w-full
                flex
                md:flex-row
                flex-col
                md:items-center md:justify-between md:space-x-0
                space-y-1
              "
            >
              <label class="text-gray-1100 text-lg">Source</label>
              <div class="md:w-48 w-full">
                <select-input
                  id="alertAllFeed"
                  v-model="editFeedData.sourceName"
                  :options="sources"
                  place-holder="All Feeds"
                  color="#F8F8F8"
                  :background="background"
                  :caret-bg="background"
                  @blur="$v.editFeedData.sourceName.$touch()"
                >
                </select-input>
                <template v-if="$v.editFeedData.sourceName.$error">
                  <p
                    v-if="!$v.editFeedData.sourceName.required"
                    class="text-red-400 text-xs mb-0 pl-2"
                  >
                    The Field is Required
                  </p>
                </template>
              </div>
            </div>
            <div
              class="
                w-full
                flex
                md:flex-row
                flex-col
                md:items-center md:justify-between md:space-x-0
                space-y-1
              "
            >
              <label class="text-gray-1100 text-lg">Username</label>
              <div
                class="
                  md:w-48
                  w-full
                  md:h-9
                  h-8
                  flex flex-row
                  items-center
                  rounded-full
                  px-2
                  bg-white
                  input_fileld
                "
              >
                <input
                  v-model="editFeedData.username"
                  class="
                    outline-none
                    rounded-full
                    bg-white
                    w-full
                    h-full
                    pl-2
                    placeholder-opacity-50
                  "
                  :class="[`placeholder__${source}`]"
                  type="text"
                  placeholder="Bobsmith123"
                  @blur="$v.editFeedData.username.$touch()"
                />
              </div>
            </div>
            <template v-if="$v.editFeedData.username.$error">
              <p
                v-if="!$v.editFeedData.username.required"
                class="
                  text-red-400 text-xs
                  md:text-right
                  text-left
                  mb-0
                  mr-16
                  pl-2
                  marginTop
                "
              >
                The Field is Required
              </p>
            </template>
            <div
              class="
                w-full
                flex
                md:flex-row
                flex-col
                md:items-center md:justify-between md:space-x-0
                space-y-1
              "
            >
              <label class="text-gray-1100 text-lg">Password</label>
              <div
                class="
                  md:w-48
                  w-full
                  md:h-9
                  h-8
                  flex flex-row
                  items-center
                  rounded-full
                  px-2
                  bg-white
                  input_fileld
                "
              >
                <input
                  v-model="editFeedData.password"
                  class="
                    outline-none
                    pl-2
                    rounded-full
                    bg-white
                    w-full
                    h-full
                    placeholder-opacity-50
                  "
                  :class="[`placeholder__${source}`]"
                  type="password"
                  placeholder="*********"
                />
              </div>
            </div>
            <div class="flex flex-row justify-between items-center pt-1">
              <label for="status" class="text-gray-1400 text-lg">Active</label>
              <div
                class="
                  relative
                  inline-block
                  w-10
                  align-middle
                  select-none
                  transition
                  duration-200
                  ease-in
                "
              >
                <input
                  id="status"
                  v-model="editFeedData.status"
                  type="checkbox"
                  name="toggle"
                  class="
                    absolute
                    block
                    w-5
                    h-5
                    rounded-full
                    bg-white
                    border-4
                    appearance-none
                    cursor-pointer
                  "
                  :class="[`toggle-checkbox__${source}`]"
                />
                <label
                  for="status"
                  class="
                    toggle-label
                    block
                    overflow-hidden
                    h-5
                    rounded-full
                    bg-gray-300
                    cursor-pointer
                  "
                ></label>
              </div>
            </div>
            <div class="flex flex-col md:space-x-0 space-y-1">
              <label class="md:text-center text-gray-1100 text-lg md:py-2">
                Send Access Request to User
              </label>
              <div
                class="
                  w-full
                  md:h-9
                  h-8
                  flex flex-row
                  items-center
                  rounded-full
                  px-2
                  bg-white
                "
              >
                <input
                  v-model="editFeedData.email"
                  class="
                    outline-none
                    pl-1
                    rounded-full
                    bg-white
                    w-full
                    h-full
                    placeholder-opacity-50
                    md:text-center
                  "
                  :class="[`placeholder__${source}`]"
                  type="text"
                  placeholder="Enter Email"
                  @blur="$v.editFeedData.email.$touch()"
                />
              </div>
              <template v-if="$v.editFeedData.email.$error">
                <p
                  v-if="!$v.editFeedData.email.email || !errorEmail"
                  class="text-red-500 text-xs"
                >
                  Email is Invalid
                </p>
              </template>
            </div>
          </div>
          <!--end => main area-->
        </div>

        <!--start => footer area-->
        <div class="w-full">
          <div class="flex flex-col w-full rounded-xl">
            <div class="flex flex-row justify-around md:mt-8 mt-5">
              <button
                class="
                  focus:outline-none
                  w-44
                  h-9
                  bg-ash-dark
                  rounded-full
                  mr-2.5
                  border-2
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                :class="[`border__${source}`, `${source}`]"
                @click="clearAll"
              >
                <span>Clear</span>
              </button>
              <button
                class="
                  focus:outline-none
                  w-44
                  h-9
                  text-white
                  rounded-full
                  md:mr-2.5
                  border-none
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                :class="[`bg__${source}`]"
                @click="submitToEnterPass"
              >
                <span>Save</span>
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
import { required, email } from 'vuelidate/lib/validators'
import SelectInput from '~/components/inputs/SelectInput'
import {
  CHECK_FEED_PASSWORD,
  SEND_ACCESS_REQUEST,
  SHOW_EDIT_FEED,
  SOURCE_FEEDS,
  UPDATE_EXISTING_FEED,
} from '~/constants/urls'
// import HomeLoader from '~/components/HomeLoader'

export default {
  components: {
    SelectInput,
  },
  layout: 'home',
  props: {
    editFeed: {
      type: Boolean,
    },
    editFeedId: {
      type: String,
    },
    source: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      skew: false,
      editFeedData: {
        id: '',
        sourceName: 'All Feeds',
        username: '',
        password: '',
        status: '',
        email: '',
        type: 'social',
      },
      sources: [],
    }
  },
  computed: {
    showEditFeedComp() {
      return this.$store.getters['mobile/header/getEditFeed']
    },
    background() {
      if (this.source === 'home') {
        return '#e4801d'
      } else if (this.source === 'archive') {
        return '#8db230'
      } else if (this.source === 'search') {
        return '#7d80bd'
      } else if (this.source === 'alert') {
        return '#e05252'
      } else if (this.source === 'settings') {
        return '#e0ad1f'
      }
      return ''
    },
  },
  watch: {
    editFeedId(id) {
      if (id) {
        this.showEditFeed()
      }
    },
  },
  validations: {
    editFeedData: {
      sourceName: {
        required,
      },
      username: {
        required,
      },
      email: {
        email,
      },
    },
  },
  mounted() {
    // this.showEditFeed()
    // this.getAllSource()
  },
  methods: {
    async showEditFeed() {
      try {
        if (this.editFeedId) {
          const res = await this.$axios.$get(SHOW_EDIT_FEED + this.editFeedId)
          if (res.success) {
            this.editFeedData = res.data
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllSource() {
      try {
        const res = await this.$axios.$get(SOURCE_FEEDS)
        if (res.success) {
          this.sources = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submitToEnterPass() {
      this.$v.$touch()
      this.$toast.clear()
      if (this.editFeedData.password.length > 0) {
        try {
          const res = await this.$axios.$post(CHECK_FEED_PASSWORD, {
            id: this.editFeedId,
            sourceName: this.editFeedData.sourceName,
            username: this.editFeedData.username,
            email: this.editFeedData.email,
            password: this.editFeedData.password,
          })
          if (res.success) {
            this.modifyEditedSave()
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        this.sendEmail()
      }
    },
    async modifyEditedSave() {
      this.$toast.clear()
      try {
        const res = await this.$axios.$put(
          UPDATE_EXISTING_FEED + this.editFeedId,
          this.editFeedData
        )
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.$emit('feedEditDone')
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async sendEmail() {
      this.$v.$touch()
      this.$toast.clear()
      if (!this.$v.$invalid) {
        try {
          if (this.editFeedData.email) {
            const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
              email: this.editFeedData.email,
            })
            if (res.success) {
              this.$toast.success(res.message, {
                className: ['toasted-bg-archive'],
              })
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    clearAll() {
      this.editFeedData.id = ''
      this.editFeedData.sourceName = 'All Feeds'
      this.editFeedData.username = ''
      this.editFeedData.password = ''
      this.editFeedData.status = ''
      this.editFeedData.email = ''
      this.$emit('clearEditFeedId')
      this.$v.$reset()
    },
    resetAll() {
      this.clearAll()
      this.$emit('close-edit-feed')
      this.$store.dispatch('mobile/header/removeEditFeed')
      this.$store.dispatch('mobile/header/removeOverlay')
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-checkbox__home:checked {
  @apply right-0 border-yellow-primary;
}

.toggle-checkbox__home:checked + .toggle-label {
  @apply bg-yellow-primary;
}
.toggle-checkbox__archive:checked {
  @apply right-0;
  border-color: #8db230;
}

.toggle-checkbox__archive:checked + .toggle-label {
  background-color: #8db230;
}
.toggle-checkbox__search:checked {
  @apply right-0;
  border-color: #7d80bd;
}

.toggle-checkbox__search:checked + .toggle-label {
  background-color: #7d80bd;
}
.toggle-checkbox__alert:checked {
  @apply right-0;
  border-color: #e05252;
}

.toggle-checkbox__alert:checked + .toggle-label {
  background-color: #e05252;
}
.toggle-checkbox__settings:checked {
  @apply right-0;
  border-color: #e0ad1f;
}

.toggle-checkbox__settings:checked + .toggle-label {
  background-color: #e0ad1f;
}

.border__home {
  border-color: #e4801d;
}
.border__archive {
  border-color: #8db230;
}
.border__search {
  border-color: #7d80bd;
}
.border__alert {
  border-color: #e05252;
}
.border__settings {
  border-color: #e0ad1f;
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
.marginTop {
  margin-top: 2px !important;
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

.home {
  @apply text-yellow-primary;
}
.archive {
  color: #8db230;
}
.search {
  color: #7d80bd;
}
.alert {
  color: #e05252;
}
.settings {
  color: #e0ad1f;
}
.bg__home {
  background-color: #e4801d;
}
.bg__archive {
  background-color: #8db230;
}
.bg__search {
  background-color: #7d80bd;
}
.bg__alert {
  background-color: #e05252;
}
.bg__settings {
  background-color: #e0ad1f;
}
.placeholder__home::placeholder {
  @apply text-yellow-primary;
}
.placeholder__archive::placeholder {
  color: #8db230 !important;
}
.placeholder__search::placeholder {
  color: #7d80bd !important;
}
.placeholder__alert::placeholder {
  color: #e05252 !important;
}
.placeholder__settings::placeholder {
  color: #e0ad1f !important;
}

@media (max-width: 767px) {
  .profile {
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
}
</style>
