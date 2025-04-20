<template>
  <div class="card text-white text-left">
    <div class="card-body scroll lg:p-4 px-4 py-0">
      <div
        class="
          w-full
          flex-grow
          overflow-y-auto overflow-x-hidden
          bg-yellow-primary
          md:p-3
          p-1.5
          rounded-xl
          scroll
        "
      >
        <form
          class="
            w-full
            h-full
            overflow-y-auto
            flex flex-col
            space-y-4
            scroll
            overflow-x-hidden
          "
        >
          <div
            class="
              available-format
              h-10
              grid grid-cols-2
              justify-items-stretch
              items-center
              py-1.5
            "
          >
            <p class="font-bold text-white md:text-lg text-sm">
              Available Formats
            </p>
            <div
              class="
                row
                space-x-2
                justify-between
                md:w-48
                w-full
                h-full
                justify-self-end
              "
            >
              <div class="radio-wrapper relative w-full">
                <input
                  id="jpg"
                  v-model="storageInfo.archiveFormat"
                  class="radio-input w-full"
                  type="radio"
                  value="JPG"
                  name="jpg"
                />
                <label class="radio-label absolute w-full" for="jpg">
                  JPG
                </label>
              </div>
              <div class="radio-wrapper relative w-full">
                <input
                  id="csv"
                  v-model="storageInfo.archiveFormat"
                  class="radio-input w-full"
                  type="radio"
                  value="CSV"
                  name="csv"
                />
                <label class="radio-label absolute w-full" for="csv">
                  CSV
                </label>
              </div>
            </div>
          </div>
          <div class="mt-16 auto-delete grid grid-cols-2 gap-y-1 items-center">
            <p class="font-bold text-white md:text-lg text-sm">
              Auto Delete Archive
            </p>
            <div class="w-full text-right">
              <select-input
                id="never"
                v-model="storageInfo.autoDelete"
                :options="autoDeleteOptions"
                color="#E4801D"
                background="#fff"
                caret-bg="#fff"
                class="md:w-48 w-full inline-block font-bold"
                caret-color="#d97706"
              />
            </div>
            <p class="text-sm ml-3">Average Monthly Data</p>
            <p class="text-sm text-right">{{ totalGB }} GB</p>
            <p class="text-sm ml-3">Estimated New Monthly Cost</p>
            <p class="text-sm text-right">${{ estimatedCost.toFixed(2) }}</p>
          </div>
          <div class="auto-delivery grid grid-cols-2 items-center">
            <p class="font-bold text-white md:text-lg text-sm">
              Automatic File Delivery
            </p>
            <div class="toggle-button text-right mt-1.5">
              <input
                type="checkbox"
                @click="storageInfo.autoDelivery = !storageInfo.autoDelivery"
              />
            </div>
          </div>
          <transition name="fadeIn">
            <div v-if="storageInfo.autoDelivery" class="destination space-y-2">
              <div
                class="
                  title
                  font-bold
                  text-white
                  md:text-lg
                  text-sm
                  md:block
                  hidden
                "
              >
                Destination
              </div>
              <div>
                <div class="label text-white md:text-lg text-sm">Email</div>
                <div class="grid md:grid-cols-2 md:gap-x-3 mt-1">
                  <text-input
                    id="autoDeliveryEmail"
                    v-model="$v.storageInfo.autoDeliveryEmail.$model"
                    class="w-full md:mb-0 mb-2"
                    place-holder="bob.greenstaradvisors.com"
                    color="#E4801D"
                    :error="$v.storageInfo.autoDeliveryEmail.$error"
                    :error-message="
                      validationMsg($v.storageInfo.autoDeliveryEmail)
                    "
                  />
                  <div class="w-full text-right">
                    <select-input
                      id="weekly"
                      v-model="storageInfo.autoDeliveryEmailFrequency"
                      :options="emailTimeOptions"
                      color="#E4801D"
                      background="#fff"
                      caret-bg="#fff"
                      class="md:w-48 w-full inline-block"
                      caret-color="#d97706"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div class="label text-white md:text-lg text-sm">
                  Cloud Folder or URL
                </div>
                <div class="grid md:grid-cols-2 md:gap-x-3 mt-1">
                  <text-input
                    id="autoDeliveryEmail"
                    v-model="$v.storageInfo.autoDeliveryCloud.$model"
                    class="w-full md:mb-0 mb-2"
                    place-holder="Google Drive, Dropbox etc."
                    color="#E4801D"
                    :error="$v.storageInfo.autoDeliveryCloud.$error"
                    :error-message="
                      validationMsg($v.storageInfo.autoDeliveryCloud)
                    "
                  />
                  <div class="w-full text-right">
                    <select-input
                      id="weekly"
                      v-model="storageInfo.autoDeliveryCloudFrequency"
                      :options="emailTimeOptions"
                      color="#E4801D"
                      background="#fff"
                      caret-bg="#fff"
                      class="md:w-48 w-full inline-block"
                      caret-color="#d97706"
                    />
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </form>
      </div>
    </div>
    <div class="card-footer md:block hidden">
      <button
        class="
          w-44
          h-9
          bg-orange-dark
          rounded-full
          mr-2.5
          border-none
          outline-none
          font-bold
          setup
        "
        @click="updateStorageData()"
      >
        Set Up
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { email, required, url } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import TextInput from '../../inputs/TextInput.vue'
import SelectInput from '../../inputs/SelectInput.vue'
import { STORAGE_RATE } from '~/constants/urls'
// import AnimatedNumber from '~/components/inputs/AnimatedNumber'
export default {
  components: {
    SelectInput,
    TextInput,
    // AnimatedNumber,
  },
  props: ['showSearchTab'],
  data() {
    return {
      selectOption: false,
      apiCosts: null,
      storageInfo: {
        autoDelivery: false,
        autoDeliveryEmail: '',
        autoDeliveryCloud: '',
        archiveFormat: '',
        autoDelete: 'Never',
        autoDeliveryEmailFrequency: 'Weekly',
        autoDeliveryCloudFrequency: 'Weekly',
      },
      autoDeleteOptions: [
        { text: 'Never', value: 'Never' },
        { text: '3 months', value: '3 months' },
        { text: '6 months', value: '6 months' },
        { text: '1 year', value: '1 year' },
        { text: '2 years', value: '2 years' },
        { text: '3 years', value: '3 years' },
        { text: '4 years', value: '4 years' },
        { text: '5 years', value: '5 years' },
        { text: '6 years', value: '6 years' },
        { text: '7 years', value: '7 years' },
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
      totalCosts: 0,
    }
  },
  computed: {
    ...mapState({
      isStorageFormSubmit: 'isStorageFormSubmit',
    }),
    ...mapGetters('feeds', ['getArchiveFeeds']),
    ...mapGetters(['getStorageFormatSelected']),
    estimatedCost() {
      if (this.apiCosts) {
        const feedsLength = this.getArchiveFeeds.length
        const monthlyDataVolume =
          this.apiCosts.averageMonthlyData[
            this.storageInfo.archiveFormat.toLowerCase()
          ] ?? 0
        return (
          feedsLength * monthlyDataVolume * this.apiCosts.estimateNewMonthlyCost
        )
      }
      return 0
    },
    totalGB() {
      if (this.apiCosts) {
        const feedsLength = this.getArchiveFeeds.length
        const monthlyDataVolume =
          this.apiCosts.averageMonthlyData[
            this.storageInfo.archiveFormat.toLowerCase()
          ] ?? 0
        return feedsLength * monthlyDataVolume
      }
      return 0
    },
  },
  watch: {
    estimatedCost(value) {
      this.putStorageCost(value)
    },
    'storageInfo.archiveFormat'(value) {
      if (value) {
        this.setStorageFormatSelect(true)
      } else {
        this.setStorageFormatSelect(false)
      }
    },
    isStorageFormSubmit(value) {
      if (value) {
        this.updateStorageData()
      }
      this.setStorageFormSubmit(false)
    },
  },
  validations: {
    storageInfo: {
      autoDeliveryEmail: {
        required,
        email,
      },
      autoDeliveryCloud: {
        required,
        url,
      },
    },
  },
  mounted() {
    this.getEstimateRate()
  },
  methods: {
    getEstimateRate() {
      this.$axios.$get(STORAGE_RATE).then((res) => {
        this.apiCosts = res.data
      })
    },
    validationMsg: validationMessage(validationMessages),
    ...mapActions('feeds', ['putStorageCost', 'setStorageData']),
    ...mapActions({
      updateSetupContent: 'updateSetupContent',
      setStorageFormatSelect: 'setStorageFormatSelect',
      setStorageFormSubmit: 'setStorageFormSubmit',
    }),
    updateStorageData() {
      this.$toast.clear()
      if (!this.getStorageFormatSelected) {
        this.$toast.error('Please select available format', {
          className: ['toasted-bg-alert'],
        })
        return false
      }
      if (this.storageInfo.autoDelivery) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.updateSetupContent('loading')
          this.setStorageData(this.storageInfo)
        }
      } else {
        this.updateSetupContent('loading')
        this.setStorageData(this.storageInfo)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 600px;
  // max-height: 600px;
  max-height: 100%;
  @apply w-full md:h-full h-auto m-auto flex flex-col items-center justify-between transition-all duration-1000;
  .card-header {
    @apply w-3/4 flex justify-center;
  }
  .card-body {
    max-height: 470px;
    @apply w-full flex-grow overflow-y-auto overflow-x-hidden p-4 bg-yellow-primary rounded-xl;
    .row {
      @apply flex;
      .col {
        @apply p-2 relative;
      }
    }
  }
  .card-footer {
    min-height: 70px;
    @apply p-4;
  }
}

.radio-input {
  display: none;
  width: 100%;
}

.radio-label {
  @apply md:px-6 px-4 md:py-1 py-1 md:text-lg text-sm bg-orange-dark text-white border-2 border-white rounded-full font-normal cursor-pointer text-center w-full;
}

.radio-input:checked + .radio-label {
  background-color: #ffffff;
  color: #e4801d;
  font-weight: bold;
  width: 100%;
}

button:focus {
  outline: none;
  border: none;
}

.inactive {
  border: 3px solid white;
  color: white;
}

.active {
  border: none;
  color: #e4801d;
  background-color: white;
}

.select {
  color: #e4801d;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

input[type='checkbox'] {
  cursor: pointer;
  position: relative;
  width: 36px;
  height: 20px;
  -webkit-appearance: none;
  background-color: #393e46;
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
  left: 2px;
  background-color: #ffffff;
  transition: 0.5s;
  transform: scale(1.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input:checked[type='checkbox']::before {
  left: 18px;
  background-color: #e4801d;
}

.input_field {
  /* width: 68%; */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  color: #e4801d;
}

::placeholder {
  color: #ff9833;
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
.scroll {
  @apply overflow-x-hidden;
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

@media (max-width: 767px) {
  .card {
    height: auto !important;
  }
  .card-body {
    max-height: 550px !important;
  }
}
</style>
