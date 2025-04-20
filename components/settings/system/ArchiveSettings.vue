<template>
  <transition name="right-sidebar-trans">
    <div
      v-if="archiveSettings"
      class="
        profile
        fixed
        bg-ash-dark
        right-0
        top-0
        h-full
        md:px-21
        p-4
        md:pt-8
        flex flex-col
        content-between
        scroll
        md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
      "
    >
      <div class="content-wrapper h-full flex flex-wrap content-between">
        <div class="w-full">
          <div
            class="
              flex flex-row
              items-center
              justify-between
              md:h-12
              h-8
              relative
            "
          >
            <h2
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl md:font-bold
                text-xl
              "
            >
              <transition name="fadeIn">
                <span v-if="archiveSystem">Archive System Settings</span>
              </transition>
            </h2>
            <div
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="cancel()"
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

          <transition name="fadeIn">
            <div
              v-if="archiveSystem"
              class="content-wrapper w-full h-full md:mt-8 mt-5"
            >
              <div
                class="
                  formate-wrapper
                  flex flex-row
                  items-center
                  justify-between
                "
              >
                <p class="text-white md:text-lg text-md self-start">
                  Available Formats
                </p>
                <div
                  class="
                    flex flex-row
                    items-center
                    justify-between
                    md:w-48
                    w-34
                  "
                >
                  <div v-if="betaVersion" class="radio-wrapper w-full">
                    <input
                      v-model="storageInfo.archiveFormat"
                      class="radio-input w-full"
                      type="checkbox"
                      value="JPG"
                      name="jpg"
                    />
                    <label
                      class="radio-label w-full"
                      @click="selectAvailableFormate('JPG')"
                    >
                      JPG
                    </label>
                  </div>
                  <div class="radio-wrapper flex md:w-20 w-16">
                    <input
                      v-model="storageInfo.archiveFormat"
                      class="radio-input w-full"
                      type="checkbox"
                      value="CSV"
                      name="csv"
                      checked
                      disabled
                    />
                    <label class="radio-label w-full"> CSV </label>
                  </div>
                  <div class="radio-wrapper flex md:w-20 w-16">
                    <input
                      v-model="storageInfo.archiveFormat"
                      class="radio-input w-full"
                      type="checkbox"
                      value="PDF"
                      name="pdf"
                    />
                    <label
                      class="radio-label w-full"
                      @click="selectAvailableFormate('PDF')"
                    >
                      PDF
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex flex-row items-center justify-between mt-5">
                <label class="text-white md:text-lg text-md"
                  >Auto Delete Archive</label
                >
                <select-input
                  id="never"
                  v-model="storageInfo.autoDelete"
                  :options="autoDeleteOptions"
                  color="#ffffff"
                  background="#E0AD1F"
                  caret-bg="#E0AD1F"
                  class="md:w-48 w-34 inline-block font-bold"
                  caret-color="#fff"
                />
              </div>

              <div
                v-if="betaVersion"
                class="auto-delivery grid grid-cols-2 items-center mt-5"
              >
                <p class="text-white md:text-lg text-md">
                  Automatic File Delivery
                </p>
                <div class="toggle-button text-right mt-1.5">
                  <input
                    checked
                    type="checkbox"
                    @click="
                      storageInfo.autoDelivery = !storageInfo.autoDelivery
                    "
                  />
                </div>
              </div>
              <transition name="fadeIn">
                <div
                  v-if="storageInfo.autoDelivery && betaVersion"
                  class="destination space-y-2"
                >
                  <div>
                    <div class="label text-white md:text-lg text-md">Email</div>
                    <div class="grid md:grid-cols-12">
                      <text-input
                        id="autoDeliveryEmail"
                        v-model="$v.storageInfo.autoDeliveryEmail.$model"
                        class="w-full md:mb-0 mb-2 md:col-span-7"
                        place-holder="bob.greenstaradvisors.com"
                        place-holder-class="placeholder-yellow-midlight placeholder-opacity-100"
                        color="#E0AD1F"
                        :error="$v.storageInfo.autoDeliveryEmail.$error"
                        :error-message="
                          validationMsg($v.storageInfo.autoDeliveryEmail)
                        "
                      />
                      <div class="w-full text-right md:col-span-5 mt-1.5">
                        <select-input
                          id="weekly"
                          v-model="storageInfo.autoDeliveryEmailFrequency"
                          :options="emailTimeOptions"
                          color="#ffffff"
                          background="#E0AD1F"
                          caret-bg="#E0AD1F"
                          class="md:w-38 w-full inline-block"
                          caret-color="#fff"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="label text-white md:text-lg text-md">
                      Cloud Folder or URL
                    </div>
                    <div class="grid md:grid-cols-12">
                      <text-input
                        id="autoDeliveryEmail"
                        v-model="$v.storageInfo.autoDeliveryCloud.$model"
                        class="w-full md:mb-0 mb-2 md:col-span-7"
                        place-holder="Google Drive, Dropbox etc."
                        place-holder-class="placeholder-yellow-midlight placeholder-opacity-100"
                        color="#E0AD1F"
                        :error="$v.storageInfo.autoDeliveryCloud.$error"
                        :error-message="
                          validationMsg($v.storageInfo.autoDeliveryCloud)
                        "
                      />
                      <div class="w-full text-right md:col-span-5 mt-1.5">
                        <select-input
                          id="weekly"
                          v-model="storageInfo.autoDeliveryCloudFrequency"
                          :options="emailTimeOptions"
                          color="#ffffff"
                          background="#E0AD1F"
                          caret-bg="#E0AD1F"
                          class="md:w-38 w-full inline-block"
                          caret-color="#fff"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- <div
                v-if="archiveSystem && explanation"
                class="
                  text-center text-white text-md
                  flex
                  items-center
                  justify-center
                  h-4/5
                "
              >
                <div>
                     {{ explanation.overview }}
                  <a
                    href="#"
                    class="text-yellow-midlight"
                    @click="showMoreText()"
                    >Click here for explanation.</a
                  >
                </div>
              </div> -->
            </div>
          </transition>

          <transition name="fadeIn">
            <div
              v-if="seeMore && explanation"
              class="content-wrapper w-full h-full mt-8 text-white text-lg"
              v-html="explanation.description"
            ></div>
          </transition>
        </div>
        <div class="w-full">
          <div class="flex flex-row items-center justify-center">
            <transition name="fadeIn">
              <button
                type="submit"
                class="
                  w-44
                  py-2
                  text-white
                  bg-yellow-midlight
                  rounded-full
                  border border-yellow-midlight
                  outline-none
                  font-bold
                  text-base
                  relative
                "
                :disabled="saveProcess"
                @click="saveAll"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Save</span>
                  <fa
                    v-if="saveProcessBar"
                    class="absolute right-5 text-white font-bold animate-spin"
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
            </transition>
            <transition name="fadeIn">
              <button
                v-if="seeMore && explanation"
                type="submit"
                class="
                  w-44
                  py-2
                  text-white
                  rounded-full
                  border border-yellow-midlight
                  outline-none
                  font-bold
                  text-base
                "
                @click="back"
              >
                Back
              </button>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import SelectInput from '~/components/inputs/SelectInput'
import TextInput from '~/components/inputs/TextInput'
import { validationMessages } from '~/utils/validations'
import { ADD_FEED_EXPLANATION, USER_STORAGE } from '~/constants/urls'
export default {
  name: 'ArchiveSettings',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TextInput,
    // eslint-disable-next-line vue/no-unused-components
    SelectInput,
    // AnimatedNumber,
  },
  data() {
    return {
      archiveSystem: true,
      saveBtn: true,
      backBtn: false,
      seeMore: false,
      storageInfo: {
        autoDelivery: true,
        autoDeliveryEmail: '',
        autoDeliveryCloud: '',
        archiveFormat: ['CSV'],
        autoDelete: 0,
        autoDeliveryEmailFrequency: 'Weekly',
        autoDeliveryCloudFrequency: 'Weekly',
      },
      defaultInfo: Object.assign({}, this.storageInfo),
      autoDeleteOptions: [
        { text: 'Never', value: '0' },
        { text: '3 months', value: '3' },
        { text: '6 months', value: '6' },
        { text: '1 year', value: '12' },
        { text: '2 years', value: '24' },
        { text: '3 years', value: '36' },
        { text: '4 years', value: '48' },
        { text: '5 years', value: '60' },
        { text: '6 years', value: '62' },
        { text: '7 years', value: '74' },
      ],
      emailTimeOptions: [
        { text: 'Weekly', value: 'Weekly' },
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
        { text: '5', value: '5' },
        { text: '6', value: '6' },
        { text: '7', value: '7' },
      ],
      explanation: null,
      archivingFeeds: 3,
      saveProcess: true,
      saveProcessBar: false,
      chnageValue: true,
    }
  },
  validations: {
    storageInfo: {
      autoDelete: {
        required,
      },
      // autoDeliveryEmail: {
      //   required,
      //   email,
      // },
      // autoDeliveryCloud: {
      //   required,
      //   url,
      // },
    },
  },
  computed: {
    ...mapState(['archiveSettings', 'betaVersion']),
    authUser() {
      return this.$auth.user
    },
  },
  watch: {
    archiveSettings(data) {
      if (data) {
        this.getArchivedSettings()
        this.feedExplanation()
      }
    },
  },
  created() {
    this.chnageValue = false
  },
  mounted() {
    // this.getArchivedSettings()
    // this.feedExplanation()
    setTimeout(() => {
      this.chnageValue = true
    }, 3000)
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    async feedExplanation() {
      const res = await this.$axios.$post(ADD_FEED_EXPLANATION, {
        archivingFeeds: this.archivingFeeds,
      })
      this.explanation = res.data
    },
    cancel() {
      this.$emit('closeArchiveSystemSetting')
      this.hideArchiveSettings()
    },
    async getArchivedSettings() {
      try {
        const { success, data, message } = await this.$axios.$get(USER_STORAGE)
        if (success) {
          if (!data.archiveFormats.includes('CSV')) {
            this.storageInfo.archiveFormat = data.archiveFormats
            this.storageInfo.archiveFormat.push('CSV')
          } else {
            this.storageInfo.archiveFormat = data.archiveFormats
          }
          this.storageInfo.autoDelete = data.autoDeleteMonths
          this.saveProcess = false
          this.saveProcessBar = false
        }
        if (message === 'Data not found') {
          this.storageInfo.archiveFormat = ['CSV']
          this.storageInfo.autoDelete = 0
          this.saveProcess = false
          this.saveProcessBar = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async saveAll() {
      if (this.storageInfo.autoDelivery) {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false
        }
      }
      this.$toast.clear()
      try {
        this.saveProcess = true
        this.saveProcessBar = true
        const res = await this.$axios.$post(USER_STORAGE, {
          archiveFormats: this.storageInfo.archiveFormat,
          autoDeleteMonths: this.storageInfo.autoDelete,
        })
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.clearAllField(res.data)
          this.hideArchiveSettings()
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
        this.saveProcess = false
        this.saveProcessBar = false
      } catch (error) {
        console.log(error)
      }
    },
    showMoreText() {
      this.archiveSystem = false
      this.saveBtn = false
      setTimeout(() => {
        this.seeMore = true
        this.backBtn = true
      }, 700)
    },
    back() {
      this.seeMore = false
      this.backBtn = false
      setTimeout(() => {
        this.archiveSystem = true
        this.saveBtn = true
      }, 700)
    },
    clearAllField(savedItem) {
      this.storageInfo.autoDelivery = true
      this.storageInfo.autoDelivery = true
      this.storageInfo.autoDeliveryEmail = ''
      this.storageInfo.autoDeliveryCloud = ''
      this.storageInfo.archiveFormat = savedItem.archiveFormat
      this.storageInfo.autoDelete = savedItem.autoDelete
      this.storageInfo.autoDeliveryEmailFrequency = 'Weekly'
      this.storageInfo.autoDeliveryCloudFrequency = 'Weekly'
    },
    hideArchiveSettings() {
      this.$store.dispatch('showArchiveSettings', false)
    },
    selectAvailableFormate(format) {
      if (this.storageInfo.archiveFormat.includes(format)) {
        this.storageInfo.archiveFormat.splice(
          this.storageInfo.archiveFormat.indexOf(format),
          1
        )
      } else {
        this.storageInfo.archiveFormat.push(format)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.profile {
  width: 500px;
  height: 100%;
  top: 0px;
  z-index: 9999999999;
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
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999999;
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
}

.radio-input {
  display: none;
  width: 100%;
}

.radio-input:checked + .radio-label {
  background-color: #e0ad1f;
  color: #ffffff;
  font-weight: bold;
  width: 100%;
}

.radio-label {
  @apply md:px-5 px-2.5 py-1 md:text-lg text-sm text-yellow-midlight border-2 border-yellow-midlight rounded-full font-normal cursor-pointer text-center w-full;
}

input[type='checkbox'] {
  cursor: pointer;
  position: relative;
  width: 36px;
  height: 20px;
  -webkit-appearance: none;
  background-color: #ffffff;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

input:checked[type='checkbox'] {
  background-color: white;
}

input[type='checkbox']::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  top: 2px;
  left: 3px;
  background-color: #393e46;
  transition: 0.5s;
  transform: scale(1.1);
  // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input:checked[type='checkbox']::before {
  left: 18px;
  background-color: #e0ad1f;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}

.animLeft {
  transform: translateX(0);
  animation-name: changePositionLeft;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes changePositionLeft {
  to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 92%;
  }
}

.animRight {
  transform: translateX(0);
  animation-name: changePositionRight;
  animation-duration: 1s;
}

@keyframes changePositionRight {
  from {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 92%;
  }
  to {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    right: 0%;
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
</style>
