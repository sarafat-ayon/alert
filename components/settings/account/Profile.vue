<template>
  <div>
    <transition name="right-sidebar-trans">
      <div
        v-show="show && loggedIn && showSideBar"
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="
          profile
          fixed
          bg-ash-dark
          right-0
          md:top-15
          h-full
          md:px-21
          p-4
          md:pt-8
          flex flex-col
          content-between
          scroll
          md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
          transition-all
          duration-500
          delay-500
        "
        :class="
          showPasswordConfirmModal || showForgetPasswordModal
            ? 'opacity-0 md:opacity-100'
            : 'opacity-100'
        "
      >
        <div class="content-wrapper w-full h-full relative">
          <transition name="page">
            <div v-if="!editAble" class="w-full h-full absolute top-0">
              <div class="h-full flex flex-wrap content-between">
                <div class="w-full">
                  <div class="flex flex-row justify-between md:mt-4">
                    <h2
                      :style="{ color: globalColorPanel.backgroundColor }"
                      class="xl:text-2xl md:text-xl md:font-medium text-2xl"
                    >
                      Profile
                    </h2>
                    <div
                      class="
                        w-8
                        h-8
                        flex
                        items-center
                        justify-end
                        cursor-pointer
                      "
                      @click="cancelProfileEdit()"
                    >
                      <fa
                        :style="{ color: globalColorPanel.backgroundColor }"
                        class="text-2xl font-semibold"
                        :icon="['fas', 'times']"
                      />
                    </div>
                  </div>
                  <div
                    class="flex flex-col items-center mt-10"
                    @click="editProfile()"
                  >
                    <div
                      :style="{ borderColor: globalColorPanel.backgroundColor }"
                      class="w-24 h-24 rounded-full border-4"
                    >
                      <div
                        class="
                          w-20
                          h-20
                          rounded-full
                          mx-auto
                          mt-1
                          cursor-pointer
                        "
                      >
                        <img
                          class="w-20 h-20 rounded-full"
                          :src="avatarPreview"
                          :alt="`${userInfo.firstName}'s SharpArchive Profile Image`"
                        />
                      </div>
                    </div>
                    <h2
                      class="
                        text-gray-1100
                        xl:text-2xl
                        md:text-xl
                        font-bold
                        text-2xl
                        md:pt-6
                        pt-3
                        text-center
                        cursor-pointer
                      "
                    >
                      <span>
                        {{ userInfo.firstName + ' ' + userInfo.lastName }}</span
                      >
                    </h2>
                    <p
                      class="
                        text-gray-1100
                        opacity-50
                        xl:text-xl
                        md:text-lg
                        text-xl
                        cursor-pointer
                      "
                    >
                      <DateTime
                        :datetime="userInfo.dateJoined"
                        format="MMMM, dd yyyy, hh:mm aa"
                        :show-time="false"
                        class="table-span"
                      />
                    </p>
                  </div>
                  <div
                    class="md:flex hidden flex-col mt-6 cursor-pointer"
                    @click="editProfile()"
                  >
                    <div>
                      <h4
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          font-bold
                          text-2xl
                        "
                      >
                        Email
                      </h4>
                      <p
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          text-xl
                          opacity-50
                        "
                      >
                        {{ userInfo.email }}
                      </p>
                    </div>
                    <div v-if="userInfo.address" class="mt-6">
                      <h4
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          font-bold
                          text-2xl
                        "
                      >
                        Address
                      </h4>
                      <p
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          text-xl
                          opacity-50
                          break-all
                        "
                      >
                        {{ userInfo.address }}
                      </p>
                    </div>
                    <div class="mt-6">
                      <h4
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          font-bold
                          text-2xl
                        "
                      >
                        Phone
                      </h4>
                      <p
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          text-xl
                          opacity-50
                        "
                      >
                        {{ userInfo.phone }}
                      </p>
                    </div>
                    <div class="mt-6">
                      <h4
                        class="
                          text-gray-1100
                          xl:text-xl
                          md:text-lg
                          font-bold
                          text-2xl
                          whitespace-nowrap
                        "
                      >
                        Change your password
                      </h4>
                    </div>
                  </div>

                  <!-- mobile device -->
                  <div
                    class="md:hidden w-full flex flex-col mt-7 px-8"
                    @click="editProfile()"
                  >
                    <div class="grid grid-cols-12 gap-6 w-full">
                      <div class="col-span-4">
                        <label
                          class="
                            text-gray-1100 text-lg
                            font-bold
                            block
                            space-y-3
                          "
                        >
                          Email
                        </label>
                      </div>
                      <div class="col-span-8">
                        <p
                          class="
                            text-gray-1100 text-lg
                            h-7
                            opacity-50
                            inline-block
                            space-y-3
                          "
                        >
                          {{ userInfo.email }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="userInfo.address"
                      class="grid grid-cols-12 gap-6 w-full mt-2"
                    >
                      <div class="col-span-4">
                        <label
                          class="
                            text-gray-1100 text-lg
                            font-bold
                            inline-block
                            space-y-3
                          "
                        >
                          Address
                        </label>
                      </div>
                      <div class="col-span-8">
                        <p
                          class="
                            text-gray-1100 text-lg
                            h-7
                            opacity-50
                            inline-block
                            break-all
                            space-y-3
                          "
                        >
                          {{ userInfo.address }}
                        </p>
                      </div>
                    </div>
                    <div class="grid grid-cols-12 gap-6 w-full mt-2">
                      <div class="col-span-4">
                        <label
                          class="
                            text-gray-1100 text-lg
                            font-bold
                            inline-block
                            space-y-3
                          "
                        >
                          Phone
                        </label>
                      </div>
                      <div class="col-span-8">
                        <p
                          class="
                            text-gray-1100 text-lg
                            h-7
                            opacity-50
                            inline-block
                            space-y-3
                          "
                        >
                          {{ userInfo.phone }}
                        </p>
                      </div>
                    </div>
                    <div class="grid grid-cols-12 gap-6 w-full mt-2">
                      <div class="col-span-4">
                        <label
                          class="
                            text-gray-1100 text-lg
                            font-bold
                            inline-block
                            space-y-3
                            whitespace-nowrap
                          "
                        >
                          Change your password
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- logout button -->
                <div class="w-full">
                  <div
                    class="
                      flex flex-row
                      items-center
                      justify-center
                      mt-10
                      btn-wrapper
                    "
                  >
                    <button
                      :style="{
                        backgroundColor: globalColorPanel.backgroundColor,
                      }"
                      type="submit"
                      class="
                        w-44
                        py-2
                        text-white
                        rounded-full
                        border-none
                        outline-none
                        font-bold
                        text-base
                        setup
                      "
                      :disabled="logoutProcess"
                      @click="logout()"
                    >
                      <div
                        class="
                          rounded-full
                          relative
                          flex
                          items-center
                          justify-around
                        "
                      >
                        <span>Log Out</span>
                        <fa
                          v-if="logoutProcess"
                          class="
                            absolute
                            right-5
                            text-white
                            font-bold
                            animate-spin
                          "
                          :icon="['fas', 'spinner']"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <transition name="page">
            <div v-show="editAble" class="w-full h-full absolute top-0">
              <div class="h-full flex flex-wrap content-between">
                <div class="w-full">
                  <div class="flex flex-row justify-between md:mt-4">
                    <h2
                      :style="{ color: globalColorPanel.backgroundColor }"
                      class="xl:text-2xl md:text-xl md:font-medium text-2xl"
                    >
                      Edit Profile
                    </h2>
                    <button
                      class="focus:outline-none"
                      @click="cancelProfileEdit()"
                    >
                      <fa
                        :style="{ color: globalColorPanel.backgroundColor }"
                        class="text-2xl font-semibold"
                        :icon="['fas', 'times']"
                      />
                    </button>
                  </div>
                  <form
                    v-show="editAble"
                    enctype="multipart/form-data"
                    @submit.prevent="updateProfile"
                  >
                    <div class="space-y-4 form-card">
                      <div class="flex flex-col items-center mt-10">
                        <div
                          :style="{
                            borderColor: globalColorPanel.backgroundColor,
                          }"
                          class="w-24 h-24 rounded-full border-4"
                        >
                          <div
                            class="
                              w-20
                              h-20
                              rounded-full
                              mx-auto
                              mt-1
                              cursor-pointer
                            "
                            @click="$refs.fileInput.click()"
                          >
                            <img
                              class="w-20 h-20 rounded-full"
                              :src="avatarPreview"
                              :alt="`${userInfo.firstName}'s SharpArchive Profile Image`"
                            />
                            <input
                              ref="fileInput"
                              style="display: none"
                              type="file"
                              accept="image/*"
                              @change="onFileSelected"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          class="text-gray-1100 xl:text-xl text-lg font-bold"
                          for="firstName"
                          >First Name</label
                        >
                        <input
                          id="firstName"
                          v-model="userInfo.firstName"
                          type="text"
                          class="
                            text-white
                            w-full
                            p-1
                            outline-none
                            focus:outline-none
                            bg-ash-dark
                            border-b border-white
                          "
                          @blur="$v.userInfo.firstName.$touch()"
                        />
                        <template v-if="$v.userInfo.firstName.$error">
                          <p class="text-red-500 text-xs mb-0 pl-2">
                            {{ validationMsg($v.userInfo.firstName) }}
                          </p>
                        </template>
                      </div>
                      <div>
                        <label
                          class="text-gray-1100 xl:text-xl text-lg font-bold"
                          for="lastName"
                          >Last Name</label
                        >
                        <input
                          id="lastName"
                          v-model="userInfo.lastName"
                          type="text"
                          class="
                            text-white
                            w-full
                            p-1
                            outline-none
                            focus:outline-none
                            bg-ash-dark
                            border-b border-white
                          "
                          @blur="$v.userInfo.lastName.$touch()"
                        />
                        <template v-if="$v.userInfo.lastName.$error">
                          <p class="text-red-500 text-xs mb-0 pl-2">
                            {{ validationMsg($v.userInfo.lastName) }}
                          </p>
                        </template>
                      </div>

                      <div>
                        <label
                          class="text-gray-1100 xl:text-xl text-lg font-bold"
                          for="email"
                          >Email</label
                        >
                        <p
                          class="
                            text-white
                            w-full
                            p-1
                            outline-none
                            focus:outline-none
                            bg-ash-dark
                            border-b border-white
                          "
                        >
                          {{ userInfo.email }}
                        </p>
                        <!-- <input
                          id="email"
                          v-model="userInfo.email"
                          type="text"
                          class="
                            text-white
                            w-full
                            p-1
                            outline-none
                            focus:outline-none
                            bg-ash-dark
                            border-b border-white
                          "
                        /> -->
                      </div>

                      <div>
                        <label
                          class="text-gray-1100 xl:text-xl text-lg font-bold"
                          for="address"
                          >Address</label
                        >
                        <input
                          id="address"
                          ref="origin"
                          v-model="userInfo.address"
                          type="text"
                          class="
                            text-white
                            w-full
                            p-1
                            outline-none
                            focus:outline-none
                            bg-ash-dark
                            border-b border-white
                          "
                          @blur="$v.userInfo.address.$touch()"
                        />
                        <template v-if="$v.userInfo.address.$error">
                          <p class="text-red-500 text-xs mb-0 pl-2">
                            {{ validationMsg($v.userInfo.address) }}
                          </p>
                        </template>
                      </div>
                      <div>
                        <label
                          class="text-gray-1100 xl:text-xl text-lg font-bold"
                          for="contact"
                          >Phone</label
                        >
                        <div class="flex flex-row border-b border-white group">
                          <p
                            class="
                              text-white
                              w-full
                              p-1
                              outline-none
                              focus:outline-none
                              bg-ash-dark
                            "
                          >
                            {{ userInfo.phone }}
                          </p>
                          <fa
                            class="
                              text-white
                              mx-2
                              cursor-pointer
                              hidden
                              group-hover:block
                            "
                            :icon="['fas', 'pencil-alt']"
                            @click="editPhoneNumber"
                          />
                        </div>
                        <!-- <input
                          id="contact"
                          v-model="userInfo.phone"
                          v-mask="'+# ### ### ####'"
                          class="
                            text-white
                            w-full
                            p-1
                            outline-none
                            focus:outline-none
                            bg-ash-dark
                            border-b border-white
                          "
                          type="tel"
                          max="14"
                          @blur="$v.userInfo.phone.$touch()"
                        /> -->
                        <!-- <template v-if="$v.userInfo.phone.$error">
                          <p class="text-red-500 text-xs mb-0 pl-2">
                            {{ validationMsg($v.userInfo.phone) }}
                          </p>
                        </template> -->
                      </div>
                      <div>
                        <!-- <label
                          class="
                            text-gray-1100
                            xl:text-2xl
                            md:text-xl
                            text-xl
                            font-bold
                          "
                          for="contact"
                          >Phone</label
                        > -->
                        <div class="flex flex-row items-center group">
                          <label
                            class="
                              w-full
                              text-gray-1100
                              xl:text-xl
                              text-lg
                              font-bold
                            "
                            for="contact"
                            >Change your password</label
                          >
                          <!-- <p
                            class="
                              text-white
                              w-full
                              p-1
                              outline-none
                              focus:outline-none
                              bg-ash-dark
                            "
                          >
                            Change your password
                          </p> -->
                          <fa
                            class="
                              text-white
                              mx-2
                              cursor-pointer
                              hidden
                              group-hover:block
                            "
                            :icon="['fas', 'pencil-alt']"
                            @click="changePassword"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="w-full">
                  <div
                    v-if="editAble"
                    class="
                      flex flex-row
                      items-center
                      justify-center
                      space-x-3
                      mt-14
                      btn-wrapper
                    "
                  >
                    <button
                      :style="{
                        color: globalColorPanel.backgroundColor,
                        borderColor: globalColorPanel.backgroundColor,
                      }"
                      class="
                        w-44
                        py-2
                        rounded-full
                        border-2
                        outline-none
                        font-bold
                        text-base
                        setup
                      "
                      @click.prevent="cancelProfileEdit()"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      :style="{
                        backgroundColor: globalColorPanel.backgroundColor,
                        borderColor: globalColorPanel.backgroundColor,
                      }"
                      class="
                        w-44
                        py-2
                        text-white
                        rounded-full
                        border-2
                        outline-none
                        font-bold
                        text-base
                        setup
                      "
                      :disabled="updateProcess"
                      @click="updateProfile()"
                    >
                      <div
                        class="
                          rounded-full
                          relative
                          flex
                          items-center
                          justify-around
                        "
                      >
                        <span>Save</span>
                        <fa
                          v-if="updateProcess"
                          class="
                            absolute
                            right-5
                            text-white
                            font-bold
                            animate-spin
                          "
                          :icon="['fas', 'spinner']"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <update-phone-number
      v-if="updatePhone"
      :background-color="globalColorPanel.backgroundColor"
      @hide="hideUpdatePhone"
      @newPhone="updateNewPhone"
    ></update-phone-number>

    <password-confirmation-modal
      v-if="showPasswordConfirmModal"
      @isValidPassword="passwordIsValid"
      @close="closePasswordConfirmModal"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import defaultImage from '../../../assets/img/users/default.jpg'
import UpdatePhoneNumber from './update-phone/Index.vue'
import { validationMessages } from '@/utils/validations'
import { USER_PROFILE } from '~/constants/urls'
import PasswordConfirmationModal from '~/components/PasswordConfirmationModal.vue'

export default {
  name: 'Profile',
  components: { UpdatePhoneNumber, PasswordConfirmationModal },
  props: {
    showProfile: {
      type: Boolean,
    },
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
  },
  data() {
    return {
      fadeOutAll: false,
      userInfo: '',
      selectFile: '',
      image: defaultImage,
      path: defaultImage,
      updateProcess: false,
      logoutProcess: false,
      updatePhone: false,
      avatarPreview: '',
      showPasswordConfirmModal: false,
      editAble: false,
    }
  },
  validations: {
    userInfo: {
      firstName: {
        required,
        maxLength: maxLength(20),
      },
      lastName: {
        required,
        maxLength: maxLength(20),
      },
      address: {
        required,
        maxLength: maxLength(170),
      },
    },
  },
  computed: {
    user() {
      return this.$auth.user
    },
    loggedIn() {
      return this.$auth.loggedIn
    },

    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
    ...mapState('profile', ['show']),
    ...mapState('confirm', ['isValidPassword']),
    ...mapState(['showSideBar', 'showForgetPasswordModal']),
  },
  watch: {
    showSideBar(data) {
      if (!data) {
        this.cancelProfileEdit()
      }
    },
  },
  mounted() {
    const originAutocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.origin,
      {
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(43.0, -75.0)
        ),
      }
    )
    originAutocomplete.addListener('place_changed', () => {
      this.userInfo.address = originAutocomplete.getPlace().formatted_address
    })
    this.getUserInfo()
    this.avatarPreview =
      this.loggedIn && this.user.avatar ? this.user.avatar : this.image
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    closeProfile() {
      this.fadeOutAll = true
      setTimeout(() => {
        this.$store.commit('profile/SET_PROFILE_MODAL', false)
        this.fadeOutAll = false
      }, 200)
    },
    changePassword() {
      this.showForgetPassword(true)
    },
    editPhoneNumber() {
      if (!this.isValidPassword) {
        this.showPasswordConfirmModal = true
        this.$store.commit('confirm/SET_FROM_PROFILE', true)
        this.$store.commit('confirm/SET_PASSWORD_CONFIRM_MODAL', true)
      } else {
        this.updatePhone = true
      }
    },
    passwordIsValid() {
      this.closePasswordConfirmModal()
      this.updatePhone = true
    },
    hideUpdatePhone() {
      this.updatePhone = false
    },
    updateNewPhone(phone) {
      this.userInfo.phone = phone
    },
    closePasswordConfirmModal() {
      this.showPasswordConfirmModal = false
    },
    getUserInfo() {
      this.userInfo = Object.assign({}, this.user)
    },
    editProfile() {
      this.editAble = true
    },
    onFileSelected(event) {
      this.selectFile = event.target.files[0]
      let reader
      const files = event.target.files
      if (files.length > 0) {
        reader = new FileReader()
        reader.onload = (event) => {
          this.avatarPreview = event.target.result
          this.userInfo.avatar = this.selectFile
        }
        reader.readAsDataURL(files[0])
      }
    },
    async updateProfile() {
      const formData = new FormData()
      Object.keys(this.userInfo).forEach((key) => {
        formData.append(key, this.userInfo[key])
      })
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.updateProcess = true
          const res = await this.$axios.$put(USER_PROFILE, formData)
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.cancelProfileEdit()
            this.$auth.setUser(res.data)
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.updateProcess = false
        }
      }
    },
    cancelProfileEdit() {
      this.editAble = false
      if (!this.updateProcess) {
        this.getUserInfo()
      }
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
      this.$store.commit('confirm/SET_PASSWORD_CONFIRM_MODAL', false)
      this.closeProfile()
    },
    logout() {
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('SET_LANDING_LOADER', false)
      this.$store.commit('notifications/SET_OFFSET', 0)
      this.$store.commit('notifications/SET_LIMIT', 25)
      this.$store.commit('notifications/SET_NOTIFICATION', [])
      this.$store.commit('notifications/SET_OLD_NOTIFICATION', [])
      this.logoutProcess = true
      this.$router.push('/home')
      setTimeout(async () => {
        this.show_home_content(true)
        await this.$auth.logout({
          data: {
            refresh: this.$auth.strategy.refreshToken.get(),
          },
        })
        this.logoutProcess = false

        localStorage.removeItem('lockScreen')
        this.$store.commit('SET_LOCK_SCREEN', false)
        this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
        this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)

        this.landing_content(true)
        this.expand_starter_modal(false)
        this.collapse_starter_modal(false)
        this.maximize_starter_modal(false)
        this.starter_account_maximized(false)
        this.updateSetupContent('starter-button')
        setTimeout(() => {
          this.home_wrapper(true)
        }, 1500)

        setTimeout(() => {
          this.show_home(false)
          this.show_logo_text(true)
          this.home_menu_text(true)
          setTimeout(() => {
            this.all_side_menu(false)
            setTimeout(() => {
              this.home_side_menu(false)
              this.home_menu_text(false)
              setTimeout(() => {
                this.show_logo(false)
                setTimeout(() => {
                  this.home_circle(true)
                  this.sidebar_menu(false)
                  this.sidebar_circle(false)
                  this.width_decrese(true)
                  setTimeout(() => {
                    this.home_modal(false)
                    this.slide_left(false)
                    this.slide_right(true)
                    this.login_circle(true)
                    setTimeout(() => {
                      this.home_header(false)
                      this.slide_full_right(true)
                      this.home_circle(false)
                      this.home_sidebar(false)
                      setTimeout(() => {
                        this.after_logout(true)
                        setTimeout(() => {
                          this.text_loading(true)
                          setTimeout(() => {
                            this.successfully(false)
                            setTimeout(() => {
                              setTimeout(() => {
                                this.login_button_transition(false)
                                this.submit_button_transition(false)
                                this.login_form_transition(false)
                                setTimeout(() => {
                                  this.after_logout(false)
                                  this.text_loading(false)
                                  this.after_loading(false)
                                  this.width_increase(false)
                                  this.full_width(false)
                                  this.header_text(false)
                                  this.loading_text(false)
                                  this.width_decrese(false)
                                  this.slide_right(false)
                                  this.slide_full_right(false)
                                }, 1000)
                              }, 300)
                            }, 500)
                          }, 1800)
                        }, 800)
                      }, 800)
                    }, 800)
                  }, 600)
                }, 500)
              }, 0)
            }, 0)
          }, 800)
        }, 200)
      }, 600)

      this.set_header_width(false)
      this.setIsSticky(false)
    },
    ...mapActions({
      setIsSticky: 'set_sticky',
      set_header_width: 'set_header_width',
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',
      showForgetPassword: 'showForgetPassword',

      login_button_transition: 'loginAnimation/login_button_transition',
      submit_button_transition: 'loginAnimation/submit_button_transition',
      login_form_transition: 'loginAnimation/login_form_transition',
      successfully: 'loginAnimation/successfully',
      after_loading: 'loginAnimation/after_loading',
      home_modal: 'loginAnimation/home',
      sidebar_menu: 'loginAnimation/sidebar_menu',
      sidebar_circle: 'loginAnimation/circle',
      home_sidebar: 'loginAnimation/sidebar',
      home_circle: 'loginAnimation/home_circle',
      login_circle: 'loginAnimation/login_circle',
      slide_left: 'loginAnimation/slide_left',
      show_logo: 'loginAnimation/show_logo',
      home_header: 'loginAnimation/header',
      width_increase: 'loginAnimation/width_increase',
      full_width: 'loginAnimation/full_width',
      home_side_menu: 'loginAnimation/home_side_menu',
      all_side_menu: 'loginAnimation/all_side_menu',
      show_home: 'loginAnimation/show_home',
      home_menu_text: 'loginAnimation/home_menu_text',
      show_home_content: 'loginAnimation/show_home_content',
      home_wrapper: 'loginAnimation/home_wrapper',
      show_logo_text: 'loginAnimation/show_logo_text',
      header_text: 'loginAnimation/header_text',
      loading_text: 'loginAnimation/loading_text',

      width_decrese: 'loginAnimation/width_decrese',
      slide_right: 'loginAnimation/slide_right',
      slide_full_right: 'loginAnimation/slide_full_right',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
      after_logout: 'loginAnimation/after_logout',
      text_loading: 'loginAnimation/text_loading',
    }),
  },
}
</script>
<style lang="scss" scoped>
$color: var(--color);
.profile {
  width: 500px;
  height: 100%;
  top: 0px;
  z-index: 9999999999;
}

.setup {
  bottom: 530px;
}
.scroll {
  scrollbar-color: $color #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: $color;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: $color;
  }
}
.form-card > .error {
  margin-top: 0px;
}

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999999;
  }
  .scroll {
    scrollbar-color: $color #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $color;
    }
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: $color;
    }
  }
}

@media (max-height: 769px) {
  .btn-wrapper {
    margin-bottom: 16px !important;
  }
}

.right-sidebar-trans-enter,
.right-sidebar-trans-leave-to {
  right: -100%;
}

.right-sidebar-trans-enter-to,
.right-sidebar-trans-leave {
  right: 0;
}

.right-sidebar-trans-enter-active {
  transition: all 0.8s ease-in-out;
}
.right-sidebar-trans-leave-active {
  transition: all 0.8s ease-in-out;
}
.content-wrapper {
  opacity: 1;
}

/*end right sidebar section transition*/
</style>
