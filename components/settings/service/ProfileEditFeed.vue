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
        md:-top-15 md:rounded-l-2xl
      "
      :class="[showEditFeedSidebar ? 'show md:shadow-2xl' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <!--start => title area-->
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-yellow-midlight md:text-xl text-2xl md:font-bold">
              Edit Feeds
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
                  color="#F8F8F8"
                  background="#E0AD1F"
                  caret-bg="#E0AD1F"
                  @blur="$v.editFeedData.sourceName.$touch()"
                >
                </select-input>
                <template v-if="$v.editFeedData.sourceName.$error">
                  <p
                    v-if="!$v.editFeedData.sourceName.required"
                    class="text-red-400 text-xs mb-0 pl-2"
                  >
                    The field is required
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
                    placeholder-yellow-midlight placeholder-opacity-50
                  "
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
                The field is required
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
                    placeholder-yellow-midlight placeholder-opacity-50
                  "
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
                  w-9
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
                    toggle-checkbox
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
                />
                <label
                  for="status"
                  class="
                    toggle-label
                    block
                    overflow-hidden
                    h-5
                    rounded-full
                    transition-all
                    duration-800
                    ease-in-out
                    bg-white
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
                    placeholder-yellow-midlight placeholder-opacity-50
                    md:text-center
                  "
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
                  text-yellow-midlight
                  bg-ash-dark
                  rounded-full
                  mr-2.5
                  border-2 border-yellow-midlight
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
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
                  bg-yellow-midlight
                  rounded-full
                  md:mr-2.5
                  border-none
                  outline-none
                  font-bold
                  setup
                  text-xl
                "
                :disabled="saveProcess"
                @click="submitToEnterPass"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Save</span>
                  <fa
                    v-if="saveProcess"
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
  name: 'SocialMediaEdit',
  components: {
    SelectInput,
  },
  layout: 'home',
  props: {
    showEditFeedSidebar: {
      type: Boolean,
    },
    editFeedId: {
      type: String,
    },
  },
  data() {
    return {
      skew: false,
      editFeedData: {
        id: '',
        sourceName: '',
        username: '',
        password: '',
        status: '',
        email: '',
        type: 'social',
      },
      sources: [],
      saveProcess: false,
    }
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
      if (this.editFeedData.password.trim().length > 0) {
        try {
          this.saveProcess = true
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
          this.saveProcess = false
        } catch (error) {
          this.saveProcess = false
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
          this.$store.dispatch('mobile/header/removeOverlay')
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
          if (this.editFeedData.email.trim()) {
            this.saveProcess = true
            const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
              email: this.editFeedData.email,
            })
            if (res.success) {
              this.$toast.success(res.message, {
                className: ['toasted-bg-archive'],
              })
              this.$emit('feedEditDone')
              this.$store.dispatch('mobile/header/removeOverlay')
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
            this.saveProcess = false
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    clearAll() {
      this.editFeedData.id = ''
      this.editFeedData.sourceName = ''
      this.editFeedData.username = ''
      this.editFeedData.password = ''
      this.editFeedData.status = ''
      this.editFeedData.email = ''
      this.$emit('clearEditFeedId')
      this.$v.$reset()
    },
    resetAll() {
      this.clearAll()
      this.$emit('closeEditFeedSidebar')
      this.$store.dispatch('mobile/header/removeOverlay')
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #393e46;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    transition: all 0.5s ease-in-out;
    @apply bg-yellow-midlight;
  }
}

.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100vh;
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

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: auto;
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
