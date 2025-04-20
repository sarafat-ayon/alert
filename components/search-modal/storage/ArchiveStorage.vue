<template>
  <section class="w-full h-full">
    <form @submit.prevent="setupButton()">
      <!-- Height will be delelted after layout modify -->
      <div class="card w-full h-full p-5 rounded-3xl bg-orange-dark">
        <div class="card-body w-full h-full">
          <div class="available-format">
            <p class="font-medium text-base text-white">Available Format</p>
            <div class="radio-button inline-flex gap-3">
              <input
                id="jpg"
                v-model="availableFormat"
                class="radio-input"
                type="radio"
                value="JPG"
                name="jpg"
                checked
              />
              <label class="radio-label" for="jpg">JPG</label>
              <input
                id="csv"
                v-model="availableFormat"
                class="radio-input"
                type="radio"
                value="CSV"
                name="jpg"
              />
              <label class="radio-label" for="csv">CSV</label>
            </div>
          </div>
          <div class="available-format auto-delete-archive mt-6">
            <p class="font-medium text-base text-white">Auto Delete Archive</p>
            <div class="w-47">
              <select-input
                id="never"
                v-model="autoDelete"
                :options="autoDeleteOptions"
                color="#E4801D"
                background="#fff"
                caret-bg="#fff"
                class="w-full"
              >
              </select-input>
            </div>
          </div>
          <div class="available-format average-monthly-data mt-2">
            <p class="text-base text-white pl-3.5">Average Monthly Data</p>
            <p class="text-white">5 GB</p>
          </div>
          <div class="available-format estimated-new-monthlycost mt-2">
            <p class="text-base text-white pl-3.5">
              Estimated New Monthly Cost
            </p>
            <p class="text-white">$0.17</p>
          </div>
          <div class="available-format automatic-file-delivery mt-6">
            <p class="font-medium text-base text-white">
              Automatic File Delivery
            </p>
            <div class="toggle-button">
              <input type="checkbox" name="" @click="showDestinationBlock()" />
            </div>
          </div>
          <transition name="show">
            <div
              v-if="showDestination"
              class="flex flex-col mt-2 destination text-left"
            >
              <div class="text-white font-medium">
                <h4>Destination</h4>
              </div>
              <div class="mt-2 email">
                <div class="text-white">
                  <p>Email</p>
                </div>
                <div class="flex flex-row justify-between mt-1.5">
                  <div class="w-8/12">
                    <input
                      v-model.trim="email"
                      type="text"
                      name="email"
                      placeholder="bob.greenstaradvisors.com"
                      class="
                        outline-none
                        px-5
                        rounded-full
                        input_field
                        w-full
                        h-10
                      "
                      @blur="$v.email.$touch()"
                    />
                    <template v-if="$v.email.$error">
                      <p v-if="!$v.email.required" class="text-red-900">
                        Email is Required
                      </p>
                      <p v-else-if="!$v.email.email" class="text-red-900">
                        Email is Invalid
                      </p>
                    </template>
                  </div>
                  <div class="w-47">
                    <select-input
                      id="weekly"
                      v-model="emailTime"
                      :options="emailTimeOptions"
                      color="#E4801D"
                      background="#fff"
                      caret-bg="#fff"
                      class="w-full"
                    >
                    </select-input>
                  </div>
                </div>
              </div>
              <div class="mt-2 cloud-folder-or-url">
                <div class="text-white">
                  <p>Cloud Folder or URL</p>
                </div>
                <div class="flex flex-row justify-between mt-1.5">
                  <div class="w-8/12">
                    <input
                      v-model.trim="url"
                      type="text"
                      name="url"
                      placeholder="Google Drive, Dropbox etc."
                      class="
                        outline-none
                        px-5
                        rounded-full
                        input_field
                        w-full
                        h-10
                      "
                      @blur="$v.url.$touch()"
                    />
                    <template v-if="$v.url.$error">
                      <p v-if="!$v.url.required" class="text-red-900">
                        URL is Required!
                      </p>
                      <p v-else-if="!$v.url.url" class="text-red-900">
                        URL is Invalid!
                      </p>
                    </template>
                  </div>
                  <div class="w-47">
                    <select-input
                      id="weekly"
                      v-model="urlTime"
                      :options="emailTimeOptions"
                      color="#E4801D"
                      background="#fff"
                      caret-bg="#fff"
                      class="w-full"
                    >
                    </select-input>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="text-center mt-7">
        <button
          class="
            w-44
            h-9
            text-white
            bg-orange-dark
            rounded-full
            mr-2.5
            border-none
            outline-none
            font-medium
            setup
          "
        >
          SetUp
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { required, email, url } from 'vuelidate/lib/validators'
import SelectInput from '../../inputs/SelectInput.vue'
export default {
  components: {
    SelectInput,
  },
  props: ['showSearchTab'],
  data() {
    return {
      selectOption: false,
      showDestination: false,
      activeButton: true,
      email: '',
      url: '',
      availableFormat: null,
      setUpBtn: false,
      autoDelete: 'Never',
      emailTime: 'Weekly',
      urlTime: 'Weekly',
      autoDeleteOptions: [
        { text: 'Never', value: 'Never' },
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: '3', value: '3' },
        { text: '4', value: '4' },
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
    }
  },

  mounted() {
    // console.log(this.$axios.$get('api-fake/users'))
  },

  validations: {
    email: {
      required,
      email,
      // async uniqueEmail(value) {
      //   if (value == '') {
      //     return true;
      //   } else {
      //     const response = await this.$axios.$get('api-fake/users')
      //     const allData = response
      //     const alreadyExist = allData.find((data) => data.email === value)
      //     if (alreadyExist) {
      //       return false
      //     } else {
      //       return true
      //     }
      //   }
      // },
    },
    url: {
      required,
      url,
      // url(value) {
      //   if (value == '') {
      //     return true
      //   } else {
      //     validURL(value);
      //     function validURL(str) {
      //       var pattern = new RegExp(
      //         '^(https?:\\/\\/)?' + // protocol
      //           '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      //           '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      //           '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      //           '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      //           '(\\#[-a-z\\d_]*)?$',
      //         'i'
      //       ) // fragment locator
      //       return !!pattern.test(str)
      //     }
      //   }
      // },
    },
  },

  methods: {
    showDestinationBlock() {
      this.showDestination = !this.showDestination
    },
    selectJpg() {
      this.activeButton = true
    },
    selectCsv() {
      this.activeButton = false
    },
    setupButton() {
      this.setUpBtn = true
      this.$emit('next', 'loading')
    },
    setUpForm() {
      console.log(this.availableFormat)
    },
  },
}
</script>

<style lang="scss" scoped>
.bg-orange-500 {
  background-color: #e4801d;
}

.card {
  // width: 640px; //Width will be delelted after layout modify
  .card-body {
    @apply flex flex-col;
  }
}

.available-format {
  @apply flex flex-row justify-between gap-80 items-center;
}

.radio-input {
  display: none;
}

.radio-label {
  @apply px-7 py-1 bg-orange-dark text-white border-2 border-white rounded-full font-semibold cursor-pointer;
}

.radio-input:checked + .radio-label {
  background-color: #ffffff;
  color: #e4801d;
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
  position: relative;
  width: 40px;
  height: 16px;
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
  width: 20px;
  height: 16px;
  border-radius: 10px;
  top: 0;
  left: 0;
  background-color: #ffffff;
  transition: 0.5s;
  transform: scale(1.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

input:checked[type='checkbox']::before {
  left: 20px;
  background-color: #e4801d;
}

.input_field {
  /* width: 68%; */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  color: #ecb580;
}

::placeholder {
  color: #f5d2b1;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}

.show-enter-to,
.show-leave-from {
  opacity: 1;
}

.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease-in-out;
}

@keyframes fadeOutComponent {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fade-out-component {
  animation: fadeOutComponent 1s;
  animation-fill-mode: forwards;
}
</style>
