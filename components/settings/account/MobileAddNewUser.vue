<template>
  <div
    class="
      top-0
      right-0
      absolute
      bg-ash-dark
      md:p-21
      p-4
      profile
      transition-all
      duration-2000
      ease-in-out
      overflow-y-auto
      scroll
    "
  >
    <div class="flex flex-wrap content-between">
      <div class="w-full">
        <div class="flex justify-between text-white text-yellow-midlight">
          <h3>Add New User</h3>
          <h4>
            <fa
              class="
                text-yellow-midlight text-center text-lg
                2xl:text-xl
                font-bold
              "
              :icon="['fas', 'times']"
            />
          </h4>
        </div>

        <div class="flex flex-col justify-center items-center mt-7">
          <div
            class="
              flex flex-row
              justify-center
              items-center
              w-16
              h-16
              rounded-full
              border-2 border-yellow-midlight
            "
          >
            <div
              class="
                w-10
                h-10
                flex flex-row
                justify-center
                items-center
                rounded-full
              "
              @click="$refs.fileInput.click()"
            >
              <img
                v-if="image"
                class="w-10 h-10 rounded-full"
                :src="image"
                alt=""
              />
              <input
                ref="fileInput"
                style="display: none"
                type="file"
                accept="image/*"
                @change="onFileSelected"
              />
              <fa
                v-if="!image"
                class="text-white text-xl cursor-pointer"
                :icon="['fas', 'plus']"
              />
            </div>
          </div>
          <!-- <h2 class="text-gray-1100 text-xl font-bold pt-6">Jhon Smith</h2>
              <p class="text-gray-1100 opacity-50">
              Archiving Since January, 2021
              </p> -->
        </div>

        <div class="flex flex-col mt-4">
          <div class="flex flex-row justify-between">
            <div class="first_last-field mr-4">
              <input
                id="firstName"
                v-model.trim="firstName"
                class="
                  w-full
                  mr-2
                  h-8
                  text-sm
                  2xl:text-base
                  outline-none
                  px-5
                  rounded-full
                  placeholder-yellow-midlight placeholder-opacity-50
                  text-yellow-midlight
                  bg-white
                  border-white
                "
                type="text"
                name="firstName"
                placeholder="First Name"
                @blur="$v.firstName.$touch()"
              />
              <template v-if="$v.firstName.$error">
                <p v-if="!$v.firstName.required" class="text-red-500 text-sm">
                  Field is Required!
                </p>
              </template>
            </div>
            <div class="first_last-field">
              <input
                id="lastName"
                v-model.trim="lastName"
                class="
                  w-full
                  h-8
                  text-sm
                  2xl:text-base
                  outline-none
                  px-5
                  rounded-full
                  placeholder-yellow-midlight placeholder-opacity-50
                  text-yellow-midlight
                  bg-white
                  border-white
                "
                type="text"
                name="lastName"
                placeholder="Last Name"
                @blur="$v.lastName.$touch()"
              />
              <template v-if="$v.lastName.$error">
                <p v-if="!$v.lastName.required" class="text-red-500 text-sm">
                  Field is Required!
                </p>
              </template>
            </div>
          </div>
          <div class="mt-3">
            <input
              id="username"
              v-model.trim="username"
              class="
                w-full
                h-8
                text-sm
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-yellow-midlight placeholder-opacity-50
                text-yellow-midlight
                bg-white
                border-white
              "
              type="text"
              name="username"
              placeholder="Username"
              @blur="$v.username.$touch()"
            />
            <template v-if="$v.username.$error">
              <p v-if="!$v.username.required" class="text-red-500 text-sm">
                Field is Required!
              </p>
              <p v-if="!$v.username.minLength" class="text-red-500 text-sm">
                UserName minimum length must be 4!
              </p>
            </template>
          </div>
          <div class="mt-3">
            <input
              id="email"
              v-model.trim="email"
              class="
                w-full
                h-8
                text-sm
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-yellow-midlight placeholder-opacity-50
                text-yellow-midlight
                bg-white
                border-white
              "
              type="text"
              name="email"
              placeholder="Email"
              @blur="$v.email.$touch()"
            />
            <template v-if="$v.email.$error">
              <p v-if="!$v.email.required" class="text-red-500 text-sm">
                Field is Required!
              </p>
              <p v-else-if="!$v.email.email" class="text-red-500 text-sm">
                Email is Invalid
              </p>
            </template>
          </div>
          <div class="mt-3">
            <input
              id="email"
              v-model.trim="phone"
              class="
                w-full
                h-8
                text-sm
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-yellow-midlight placeholder-opacity-50
                text-yellow-midlight
                bg-white
                border-white
              "
              type="text"
              name="email"
              placeholder="Phone"
              @blur="$v.phone.$touch()"
            />
            <template v-if="$v.phone.$error">
              <p v-if="!$v.phone.required" class="text-red-500 text-sm">
                Field is Required!
              </p>
              <p v-else-if="!$v.phone.numeric" class="text-red-500 text-sm">
                phone is Invalid!
              </p>
            </template>
          </div>
          <div class="mt-3 mb-2 h-full">
            <textarea
              id="suggesion"
              v-model="streetAddress"
              name="suggesion"
              cols="20"
              rows="5"
              class="
                w-full
                pt-2
                px-5
                h-16
                resize-none
                rounded-2xl
                placeholder-yellow-midlight placeholder-opacity-50
                text-yellow-midlight
                bg-white
                border-white
                outline-none
                border-none
              "
              placeholder="Street Address"
            ></textarea>
          </div>
          <div class="">
            <input
              id="city"
              v-model.trim="city"
              class="
                w-full
                h-8
                text-sm
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-yellow-midlight placeholder-opacity-50
                text-yellow-midlight
                bg-white
                border-white
              "
              type="text"
              name="city"
              placeholder="City"
              @blur="$v.phone.$touch()"
            />
            <template v-if="$v.city.$error">
              <p v-if="!$v.city.required" class="text-red-500 text-sm">
                Field is Required!
              </p>
            </template>
          </div>
          <div class="mt-3">
            <select-input
              id="permission"
              v-model="permission"
              class="text-sm h-8"
              :options="permissions"
              color="white"
              background="#E0AD1F"
              caret-bg="#E0AD1F"
              :value="permissions"
              @blur="$v.permission.$touch()"
            >
            </select-input>
            <template v-if="$v.permission.$error">
              <p
                v-if="!$v.permission.required"
                class="text-red-500 text-sm w-full"
              >
                Field is Required!
              </p>
            </template>
          </div>

          <div class="mt-3">
            <input
              id="zip_code"
              v-model.trim="zipCode"
              class="
                w-full
                h-8
                text-sm
                2xl:text-base
                outline-none
                px-5
                rounded-full
                placeholder-yellow-midlight placeholder-opacity-50
                text-yellow-midlight
                bg-white
                border-white
              "
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              @blur="$v.zipCode.$touch()"
            />
            <template v-if="$v.zipCode.$error">
              <p v-if="!$v.zipCode.required" class="text-red-500 text-sm">
                Field is Required!
              </p>
              <p
                v-else-if="
                  !$v.zipCode.maxLength ||
                  !$v.zipCode.numeric ||
                  !$v.zipCode.minLength
                "
                class="text-red-500 text-sm"
              >
                Zip Code is Invalid!
              </p>
            </template>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="flex flex-col w-full h-42 rounded-xl">
          <div class="flex flex-row justify-around items-center my-6">
            <button
              class="
                focus:outline-none
                w-44
                h-8
                text-yellow-midlight
                bg-ash-dark
                rounded-full
                mr-2.5
                border-2 border-yellow-midlight
                outline-none
                font-medium
                setup
                text-sm
              "
              @click="clearInputField()"
            >
              <span>Clear</span>
            </button>
            <button
              class="
                focus:outline-none
                w-44
                h-8
                text-white
                bg-yellow-midlight
                rounded-full
                mr-2.5
                border-none
                outline-none
                font-medium
                setup
              "
              :disabled="$v.$invalid || addProcess"
              @click="addNewUser()"
            >
              <div
                class="rounded-full relative flex items-center justify-around"
              >
                <span class="text-sm">Add</span>
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
    </div>
  </div>
</template>
<script>
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'
import SelectInput from '~/components/inputs/SelectInput'

export default {
  components: {
    SelectInput,
  },
  data() {
    return {
      fadeOutAll: false,
      image: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      city: '',
      streetAddress: '',
      zipCode: '',
      permission: 'State',
      permissions: [
        { text: 'State', value: 'State' },
        { text: 'Administrator', value: 'Administrator' },
        { text: 'Moderator', value: 'Moderator' },
        { text: 'Editor', value: 'Editor' },
      ],
      addProcess: false,
    }
  },

  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    username: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      numeric,
    },
    city: {
      required,
    },
    permission: {
      required,
    },
    zipCode: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(6),
      numeric,
    },
  },
}
</script>

<style lang="scss" scoped>
.add-new-user-section {
  z-index: 999;
  background-color: #171d26;
}

.profile {
  width: 100%;
  height: 100vh;
  right: 0%;
  z-index: 999;
}

.scroll {
  overflow-y: auto;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #99762e #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #99762e;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #99762e;
  }
}
</style>
