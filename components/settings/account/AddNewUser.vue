<template>
  <div
    class="
      top-0
      right-0
      fixed
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
      md:rounded-l-2xl
    "
    :class="showProfile ? 'show md:shadow-2xl' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full card">
        <div class="flex flex-row justify-between items-center">
          <h2
            class="
              text-yellow-midlight
              xl:text-2xl
              md:text-xl
              text-2xl
              font-normal
            "
          >
            {{ isEditableUser ? ' Edit User' : ' Add New User' }}
          </h2>
          <div
            class="w-8 h-8 flex items-center justify-end cursor-pointer"
            @click="isEditableUser ? closeEditProfile() : closeProfile()"
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
        <div class="flex flex-col justify-center items-center md:mt-10 mt-6">
          <div
            class="
              flex flex-row
              justify-center
              items-center
              md:w-24
              w-20
              md:h-24
              h-20
              rounded-full
              border-4 border-yellow-midlight
            "
          >
            <div
              class="
                md:w-20
                w-16
                md:h-20
                h-16
                flex flex-row
                justify-center
                items-center
                rounded-full
              "
              @click="$refs.fileInput.click()"
            >
              <img
                v-if="avatarPreView"
                class="md:w-20 w-16 md:h-20 h-16 rounded-full"
                :src="avatarPreView"
                :alt="`${editableUser.firstName}'s SharpArchive Profile Image`"
              />
              <input
                ref="fileInput"
                style="display: none"
                type="file"
                accept="image/*"
                @change="onFileSelected"
              />
              <fa
                v-if="!avatarPreView"
                class="text-white text-2xl cursor-pointer"
                :icon="['fas', 'plus']"
              />
            </div>
          </div>
          <!-- <h2 class="text-gray-1100 text-xl font-bold pt-6">Jhon Smith</h2>
            <p class="text-gray-1100 opacity-50">
              Archiving Since January, 2021
            </p> -->
        </div>
        <div class="flex flex-col md:mt-10 mt-4">
          <div class="flex flex-row justify-between">
            <div class="first_last-field">
              <input
                id="firstName"
                v-model.trim="editableUser.firstName"
                class="
                  w-full
                  h-9
                  text-md
                  2xl:text-base
                  outline-none
                  px-5
                  rounded-full
                  placeholder-gray-1200 placeholder-opacity-50
                  text-gray-1200
                  bg-white
                  border-white
                "
                type="text"
                name="firstName"
                placeholder="First Name"
                @blur="$v.editableUser.firstName.$touch()"
              />
              <template v-if="$v.editableUser.firstName.$error">
                <p class="text-red-500 text-sm">
                  {{ validationMsg($v.editableUser.firstName) }}
                </p>
              </template>
            </div>
            <div class="first_last-field">
              <input
                id="lastName"
                v-model.trim="editableUser.lastName"
                class="
                  w-full
                  h-9
                  text-md
                  2xl:text-base
                  outline-none
                  px-5
                  rounded-full
                  placeholder-gray-1200 placeholder-opacity-50
                  text-gray-1200
                  bg-white
                  border-white
                "
                type="text"
                name="lastName"
                placeholder="Last Name"
                @blur="$v.editableUser.lastName.$touch()"
              />
              <template v-if="$v.editableUser.lastName.$error">
                <p class="text-red-500 text-sm">
                  {{ validationMsg($v.editableUser.lastName) }}
                </p>
              </template>
            </div>
          </div>
          <div v-if="isEditableUser" class="mt-3">
            <input
              id="email"
              class="
                w-full
                h-9
                text-md
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
              "
              type="email"
              name="email"
              placeholder="Email"
              :value="editableUser.email"
              disabled
              readonly
            />
          </div>
          <div v-else class="mt-3">
            <input
              id="email"
              v-model.trim="editableUser.email"
              class="
                w-full
                h-9
                text-md
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
              "
              type="email"
              name="email"
              placeholder="Email"
              @blur="$v.editableUser.email.$touch()"
            />
            <template v-if="$v.editableUser.email.$error">
              <p
                v-if="!$v.editableUser.email.required"
                class="text-red-500 text-sm"
              >
                The field is required
              </p>
              <p
                v-else-if="!$v.editableUser.email.email"
                class="text-red-500 text-sm"
              >
                Email is invalid
              </p>
            </template>
          </div>

          <div class="mt-3">
            <phone-number-input
              v-model="editableUser.phone"
              :default-country-code="countryCode"
              color="#505050"
              input-classes="placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200"
              :error="$v.editableUser.phone.$error"
              :error-message="validationMsg($v.editableUser.phone)"
              @countryCode="countryCodeEvent"
            ></phone-number-input>
          </div>
          <div class="mt-3 h-26">
            <textarea
              id="suggesion"
              v-model="editableUser.streetAddress"
              name="suggesion"
              cols="30"
              rows="10"
              class="
                w-full
                pt-2
                px-5
                h-full
                resize-none
                rounded-2xl
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
                outline-none
                border-none
              "
              placeholder="Street Address"
              @blur="$v.editableUser.streetAddress.$touch()"
            >
            </textarea>
          </div>
          <template v-if="$v.editableUser.streetAddress.$error">
            <p class="text-red-500 text-sm">
              {{ validationMsg($v.editableUser.streetAddress) }}
            </p>
          </template>
          <div class="mt-3">
            <input
              id="country"
              v-model.trim="editableUser.country"
              class="
                w-full
                h-9
                text-md
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
              "
              type="text"
              name="country"
              placeholder="Country"
              @blur="$v.editableUser.country.$touch()"
            />
            <template v-if="$v.editableUser.country.$error">
              <p class="text-red-500 text-sm">
                {{ validationMsg($v.editableUser.country) }}
              </p>
            </template>
          </div>
          <div class="mt-3">
            <input
              id="city"
              v-model.trim="editableUser.city"
              class="
                w-full
                h-9
                text-md
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
              "
              type="text"
              name="city"
              placeholder="City"
              @blur="$v.editableUser.city.$touch()"
            />
            <template v-if="$v.editableUser.city.$error">
              <p class="text-red-500 text-sm">
                {{ validationMsg($v.editableUser.city) }}
              </p>
            </template>
          </div>
          <div class="mt-3">
            <input
              id="state"
              v-model.trim="editableUser.state"
              class="
                w-full
                h-9
                text-md
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
              "
              type="text"
              name="state"
              placeholder="State"
              @blur="$v.editableUser.state.$touch()"
            />
            <template v-if="$v.editableUser.state.$error">
              <p class="text-red-500 text-sm">
                {{ validationMsg($v.editableUser.state) }}
              </p>
            </template>
          </div>
          <div class="mt-3">
            <input
              id="zip_code"
              v-model.trim="editableUser.zipCode"
              class="
                w-full
                h-9
                text-md
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-gray-1200 placeholder-opacity-50
                text-gray-1200
                bg-white
                border-white
              "
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              @blur="$v.editableUser.zipCode.$touch()"
            />
            <template v-if="$v.editableUser.zipCode.$error">
              <p
                v-if="!$v.editableUser.zipCode.required"
                class="text-red-500 text-sm"
              >
                The field is required
              </p>
              <p
                v-else-if="
                  !$v.editableUser.zipCode.maxLength ||
                  !$v.editableUser.zipCode.numeric ||
                  !$v.editableUser.zipCode.minLength
                "
                class="text-red-500 text-sm"
              >
                Zip code is invalid
              </p>
            </template>
          </div>
          <div class="mt-3">
            <select-input
              id="userPermission"
              v-model="editableUser.userPermission"
              class="w-full"
              :options="userPermissions"
              place-holder="Permission"
              :place-holder-disabled="true"
              color="white"
              background="#E0AD1F"
              caret-bg="#E0AD1F"
              @blur="$v.editableUser.userPermission.$touch()"
            >
            </select-input>
            <template v-if="$v.editableUser.userPermission.$error">
              <p
                v-if="!$v.editableUser.userPermission.required"
                class="text-red-500 text-sm"
              >
                Field is Required!
              </p>
            </template>
          </div>
          <div class="mt-3 h-9">
            <div class="flex flex-row items-center justify-between space-x-4">
              <div class="flex items-center space-x-3 mt-1 h-9">
                <label for="createAlertAccess" class="text-gray-1400 text-lg"
                  >Alerts Access</label
                >
                <div
                  class="
                    relative
                    inline-block
                    w-9
                    mr-2
                    align-middle
                    select-none
                    transition-all
                    duration-800
                    ease-in-out
                  "
                >
                  <input
                    id="createAlertAccess"
                    v-model="alertAccess"
                    checked
                    type="checkbox"
                    name="toggle"
                    class="
                      toggle-checkbox
                      absolute
                      block
                      rounded-full
                      bg-white
                      appearance-none
                      cursor-pointer
                    "
                  />
                  <label
                    for="createAlertAccess"
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
              <transition name="fade">
                <div v-if="alertAccess" class="md:w-52 w-40 h-9">
                  <select-input
                    id="alertPermission"
                    v-model="editableUser.alertPermission"
                    class="w-full"
                    :options="alertPermissions"
                    place-holder="Permission"
                    :place-holder-disabled="true"
                    color="white"
                    background="#E0AD1F"
                    caret-bg="#E0AD1F"
                  >
                  </select-input>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <!--start => footer area-->
      <div class="w-full">
        <div class="flex flex-col md:my-5 md:pb-2 mb-5 w-full h-46 rounded-xl">
          <div class="flex flex-row justify-center mt-8 space-x-5 md:px-8">
            <button
              class="
                focus:outline-none
                w-44
                h-10
                text-yellow-midlight
                bg-ash-dark
                rounded-full
                border-2 border-yellow-midlight
                outline-none
                font-bold
                setup
                font-bold
                text-base
              "
              @click="isEditableUser ? clearProfileInfo() : clearInputField()"
            >
              <span> {{ isEditableUser ? 'Delete User' : 'Clear' }} </span>
            </button>
            <button
              class="
                focus:outline-none
                w-44
                h-10
                text-white
                bg-yellow-midlight
                rounded-full
                border-none
                outline-none
                setup
                font-bold
                text-base
              "
              :disabled="addProcess"
              @click="isEditableUser ? updateAddNewUser() : storeNewUser()"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span>{{ isEditableUser ? 'Update' : 'Add' }}</span>
                <fa
                  v-if="addProcess"
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

    <alert-confirm-modal
      :processing="userDeleteProcess"
      :show="showDeleteAlert"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import SelectInput from '~/components/inputs/SelectInput'
import PhoneNumberInput from '~/components/inputs/PhoneNumberInput'
import { NEW_USER } from '~/constants/urls'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'

export default defineComponent({
  Name: 'AddNewUser',
  components: {
    SelectInput,
    PhoneNumberInput,
    AlertConfirmModal,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    const defaultAddNewUser = Object.freeze({
      avatar: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      state: '',
      streetAddress: '',
      zipCode: '',
      userPermission: 'Permission',
      alertPermission: 'Permission',
    })
    return {
      defaultAddNewUser,
      fadeOutAll: false,
      editableUser: Object.assign({}, defaultAddNewUser),
      avatarPreView: '',
      fullAddress: '',
      addProcess: false,
      alertAccess: true,
      saveProcess: false,
      showDeleteAlert: false,
      userDeleteProcess: false,
      countryCode: '+1',
      geocoder: '',
    }
  },
  computed: {
    ...mapState('account', ['userPermissions', 'alertPermissions']),
    ...mapState('setting', ['showProfile']),
    isEditableUser() {
      return !!(this.user && this.user.id)
    },
  },
  watch: {
    user(data) {
      if (data) {
        this.avatarPreView = data.avatar
        this.editableUser = Object.assign({}, data)
        if (data.alertPermission !== 'Blocked' && data.alertPermission) {
          this.alertAccess = true
          this.editableUser.alertPermission = this.alertAccess
            ? data.alertPermission
            : 'Permission'
        } else {
          this.alertAccess = false
          this.editableUser.alertPermission = 'Permission'
        }

        if (data.phone) {
          const phoneWithCountryCode = data.phone.split(' ')
          this.countryCode = phoneWithCountryCode[0]
          this.editableUser.phone = phoneWithCountryCode[1]
        }
      } else {
        this.editableUser = Object.assign({}, this.defaultAddNewUser)
        this.getUserInfo()
      }
    },
    showProfile(data) {
      if (!data && !this.isEditableUser) {
        this.clearAllField()
      } else if (data) {
        this.getUserInfo()
      }
    },
  },
  validations: {
    editableUser: {
      firstName: {
        required,
        maxLength: maxLength(20),
      },
      lastName: {
        required,
        maxLength: maxLength(20),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        maxMobileLength: maxLength(14),
        minMobileLength: minLength(6),
      },
      streetAddress: {
        required,
        maxLength: maxLength(80),
      },
      country: {
        required,
        maxLength: maxLength(30),
      },
      city: {
        required,
        maxLength: maxLength(30),
      },
      state: {
        required,
        maxLength: maxLength(30),
      },
      userPermission: {
        required,
      },
      zipCode: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(6),
        numeric,
      },
    },
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    getUserInfo() {
      this.fullAddress = this.$auth.user.address
      this.geocoder = new window.google.maps.Geocoder()
      this.codeAddress(this.geocoder)
    },
    codeAddress(newGeocode) {
      newGeocode.geocode({ address: this.fullAddress }, (results, status) => {
        if (status === 'OK') {
          this.fullAddress = results[0].formatted_address.split(',')
          if (this.fullAddress.length === 3) {
            const cityWithZip = this.fullAddress[1].trim().split(' ')
            this.editableUser.streetAddress = this.fullAddress[0].trim()
            this.editableUser.country = this.fullAddress[2].trim()
            this.editableUser.city = cityWithZip[0]
            this.editableUser.state = cityWithZip[0]
            this.editableUser.zipCode = cityWithZip[1]
          } else {
            const cityWithZip = this.fullAddress[2].trim().split(' ')
            this.editableUser.streetAddress = this.fullAddress[0].trim()
            this.editableUser.country = this.fullAddress[3].trim()
            this.editableUser.city = cityWithZip[0]
            this.editableUser.state = this.fullAddress[1].trim()
            this.editableUser.zipCode = cityWithZip[1]
          }
        }
      })
    },
    clearAllField() {
      this.editableUser = Object.assign({}, this.defaultAddNewUser)
      this.alertAccess = true
      this.avatarPreView = ''
      this.$v.$reset()
    },
    closeProfile() {
      this.$emit('closeProfile', false)
      this.clearAllField()
      this.$v.$reset()
    },
    closeEditProfile() {
      this.$emit('closeProfile', false)
      this.alertAccess = true
      this.avatarPreView = ''
      this.$v.$reset()
    },
    clearInputField() {
      this.clearAllField()
      this.$v.$reset()
    },
    onFileSelected(event) {
      this.selectFile = event.target.files[0]
      let reader
      const files = event.target.files
      if (files.length === 0) {
        console.log('empty')
      } else {
        reader = new FileReader()
        reader.onload = (event) => {
          this.editableUser.avatar = this.selectFile
          this.avatarPreView = event.target.result
        }
        reader.readAsDataURL(files[0])
      }
    },

    async storeNewUser() {
      const formData = this.checkAddNewUserData()
      if (formData != null) {
        this.$toast.clear()
        try {
          this.addProcess = true
          const { success, message, data } = await this.$axios.$post(
            NEW_USER,
            formData
          )
          if (success) {
            this.$toast.success(message, {
              className: ['toasted-bg-archive'],
            })
            this.$emit('createdNewUserData', data)
            this.closeProfile()
          } else {
            this.$toast.error(message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.addProcess = false
        }
      }
    },
    countryCodeEvent(value) {
      this.countryCode = value
    },

    checkAddNewUserData() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$toast.clear()
        const formData = new FormData()
        Object.keys(this.editableUser).forEach((key) => {
          formData.append(key, this.editableUser[key])
        })

        formData.set('phone', this.countryCode + '' + formData.get('phone'))
        formData.set(
          'alertPermission',
          this.alertAccess ? formData.get('alertPermission') : 'Blocked'
        )

        if (formData.get('userPermission') === 'Permission') {
          this.$toast.error('Please select user permission', {
            className: ['toasted-bg-alert'],
          })
          return
        }

        if (
          this.alertAccess &&
          formData.get('alertPermission') === 'Permission'
        ) {
          this.$toast.error('Please select alert permission', {
            className: ['toasted-bg-alert'],
          })
          return
        }
        return formData
      } else {
        return null
      }
    },

    async updateAddNewUser() {
      const formData = this.checkAddNewUserData()
      if (formData != null) {
        try {
          this.addProcess = true
          const { success, message, data } = await this.$axios.$put(
            NEW_USER,
            formData
          )
          if (success) {
            this.$toast.success(message, {
              className: ['toasted-bg-archive'],
            })
            this.$emit('update-new-user', data)
            this.closeProfile()
          } else {
            this.$toast.error(message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.addProcess = false
        }
      }
    },

    clearProfileInfo() {
      this.showDeleteAlert = true
    },
    deleteCancel() {
      this.showDeleteAlert = false
    },
    async deleteConfirm() {
      this.$toast.clear()
      try {
        this.userDeleteProcess = true
        const { success, message } = await this.$axios.$delete(NEW_USER, {
          data: {
            id: this.user.id,
          },
        })
        if (success) {
          this.$emit('add-new-user-deleted', Number(this.user.id))
          this.$toast.success(message, {
            className: ['toasted-bg-archive'],
          })
          this.closeProfile()
        } else {
          this.$toast.error(message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.showDeleteAlert = false
        this.saveProcess = false
        this.userDeleteProcess = false
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.profile {
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 999;
}

.show {
  right: 0px;
}

.hide {
  right: -500px;
}

.first_last-field {
  width: 48%;
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
    height: 100%;
    right: -100%;
  }

  .show {
    right: 0%;
  }

  .hide {
    right: -100%;
  }
}
select:disabled {
  background: red;
}

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
    background-color: #e0ad1f;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
