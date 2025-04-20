<template>
  <section>
    <div
      class="
        md:block
        hidden
        right-0
        absolute
        bg-ash-dark
        p-21
        md:pt-12
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        md:rounded-l-2xl
      "
      :class="[showNewAlertSideBar ? 'show md:shadow-2xl' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full">
          <!--start => title area-->
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
              {{
                newSystemAlertId
                  ? 'Edit System Alert'
                  : 'Create New System Alert'
              }}
            </h2>
            <fa
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                font-normal
                cursor-pointer
              "
              :icon="['fas', 'times']"
              @click="resetAll()"
            />
          </div>
          <!--end => title area-->

          <!--start => main area-->
          <div
            v-if="!newSystemAlertId"
            class="flex flex-col lg:justify-between mt-3 w-full"
          >
            <div class="w-full mb-2 lg:mb-0">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.newSystemAlertLibraryId"
                :options="newSystemAlertLibraries"
                place-holder="Archive Sources"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.newSystemAlertLibraryId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.newSystemAlertLibraryId.$error">
                <p
                  v-if="!$v.newAlerts.newSystemAlertLibraryId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col mt-3">
            <div
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.newAlertName"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  font=normal
                  text-yellow-midlight
                  placeholder-yellow-midlight placeholder-opacity-50
                "
                type="text"
                :placeholder="[
                  newSystemAlertId
                    ? 'Archiving Feed Interrupted'
                    : 'New Alert Name',
                ]"
                @blur="$v.newAlerts.newAlertName.$touch()"
              />
            </div>
            <template v-if="$v.newAlerts.newAlertName.$error">
              <p
                v-if="!$v.newAlerts.newAlertName.required"
                class="text-red-400 text-xs mb-0 pl-2"
              >
                The field is required
              </p>
            </template>
          </div>
          <div class="flex flex-row justify-between mt-4">
            <label
              for="alertIncludeComponents"
              class="text-gray-200 lg:text-md text-xs"
              >Active</label
            >
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
                id="alertIncludeComponents"
                v-model="newAlerts.status"
                checked
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
                for="alertIncludeComponents"
                class="
                  toggle-label
                  block
                  overflow-hidden
                  h-5
                  rounded-full
                  bg-white
                  transition-all
                  duration-800
                  ease-in-out
                  cursor-pointer
                "
              ></label>
            </div>
          </div>
          <div class="flex flex-col lg:justify-between mt-3 w-full">
            <div class="w-full mb-2 lg:mb-0">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.chooseEventId"
                :options="chooseEvents"
                place-holder="Choose Event"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.chooseEventId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.chooseEventId.$error">
                <p
                  v-if="!$v.newAlerts.chooseEventId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col lg:justify-between mt-3 w-full">
            <div class="w-full mb-2 lg:mb-0">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.feedId"
                :options="socialProviders"
                place-holder="All Feeds"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.feedId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.feedId.$error">
                <p
                  v-if="!$v.newAlerts.feedId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col lg:justify-between mt-3 w-full">
            <div class="w-full mb-2 lg:mb-0">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.notificationMethodId"
                :options="notificationMethods"
                place-holder="Notification Method"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.notificationMethodId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.notificationMethodId.$error">
                <p
                  v-if="!$v.newAlerts.notificationMethodId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col lg:justify-between mt-3 w-full">
            <div class="w-full mb-2 lg:mb-0">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.type"
                :options="types"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.type.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.type.$error">
                <p
                  v-if="!$v.newAlerts.type.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col mt-3">
            <div
              v-if="newAlerts.type === 'email'"
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.email"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-yellow-midlight
                  placeholder-yellow-midlight placeholder-opacity-50
                "
                type="email"
                placeholder="example@website.com"
                @blur="$v.newAlerts.email.$touch()"
              />
            </div>
            <div v-if="newAlerts.type === 'email'">
              <template v-if="$v.newAlerts.email.$error">
                <p
                  v-if="!$v.newAlerts.email.email"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  Email is Invalid
                </p>
              </template>
            </div>
            <div
              v-if="newAlerts.type === 'phone'"
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.phone"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-yellow-midlight
                  placeholder-yellow-midlight placeholder-opacity-50
                "
                type="text"
                placeholder="657864654"
                @blur="$v.newAlerts.phone.$touch()"
              />
            </div>
            <div v-if="newAlerts.type === 'phone'">
              <template v-if="$v.newAlerts.phone.$error">
                <p
                  v-if="!$v.newAlerts.phone.numeric"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  phone is Invalid!
                </p>
              </template>
            </div>
            <div
              v-if="newAlerts.type === 'url'"
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.url"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  text-yellow-midlight
                  placeholder-yellow-midlight placeholder-opacity-50
                "
                type="text"
                placeholder="sharparchive.com"
                @blur="$v.newAlerts.url.$touch()"
              />
            </div>
            <div v-if="newAlerts.type === 'url'">
              <template v-if="$v.newAlerts.url.$error">
                <p
                  v-if="!$v.newAlerts.url.url"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  URL is Invalid!
                </p>
              </template>
            </div>
          </div>
          <!--end => main area-->
        </div>

        <!--start => footer area-->
        <div class="w-full">
          <div class="flex flex-col mt-5 w-full h-46 rounded-xl">
            <div class="flex flex-row justify-center mt-8 space-x-5 px-8">
              <button
                v-if="newSystemAlertId"
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
                :disabled="deleteAlertProcess"
                @click="deleteNewSystemAlert"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Delete</span>
                  <fa
                    v-if="deleteAlertProcess"
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
                v-else
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
                @click="clearAll"
              >
                <span>Clear</span>
              </button>
              <button
                v-if="newSystemAlertId"
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
                  md:text-lg
                  text-xl
                "
                :disabled="updateAlertProcess"
                @click="updateNewSystemAlert"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Save</span>
                  <fa
                    v-if="updateAlertProcess"
                    class="absolute right-5 text-white font-bold animate-spin"
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
              <button
                v-else
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
                  md:text-lg
                  text-xl
                "
                :disabled="addProcess"
                @click="addNewAlert"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Add</span>
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
    </div>

    <!--    small device-->
    <div
      class="
        md:hidden
        top-0
        right-0
        absolute
        bg-ash-dark
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        px-4
        py-5
        pb-3
        rounded-b-3xl
      "
      :class="[showNewAlertSideBar ? 'show' : 'hide']"
    >
      <div class="h-full flex flex-wrap">
        <div class="w-full">
          <!--start => title area-->
          <div class="flex flex-row justify-between items-center mb-6">
            <h2 class="text-yellow-midlight text-xl font-normal">
              {{
                newSystemAlertId
                  ? 'Edit System Alert'
                  : 'Create New System Alert'
              }}
            </h2>
            <fa
              class="text-yellow-midlight text-xl cursor-pointer"
              :icon="['fas', 'times']"
              @click="resetAll()"
            />
          </div>
          <!--end => title area-->

          <!--start => main area-->
          <div v-if="!newSystemAlertId" class="flex flex-col w-full">
            <div class="w-full">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.newSystemAlertLibraryId"
                :options="newSystemAlertLibraries"
                place-holder="Archive Sources"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.newSystemAlertLibraryId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.newSystemAlertLibraryId.$error">
                <p
                  v-if="!$v.newAlerts.newSystemAlertLibraryId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col w-full space-y-2 pt-2">
            <div class="w-full">
              <div
                class="
                  w-full
                  h-9
                  flex flex-row
                  items-center
                  rounded-full
                  px-2
                  bg-white
                "
              >
                <input
                  v-model="newAlerts.newAlertName"
                  class="
                    outline-none
                    pl-2
                    rounded-full
                    bg-white
                    w-full
                    h-full
                    placeholder-yellow-midlight placeholder-opacity-50
                    text-yellow-midlight
                  "
                  type="text"
                  :placeholder="[
                    newSystemAlertId
                      ? 'Archiving Feed Interrupted'
                      : 'New Alert Name',
                  ]"
                  @blur="$v.newAlerts.newAlertName.$touch()"
                />
              </div>
              <template v-if="$v.newAlerts.newAlertName.$error">
                <p
                  v-if="!$v.newAlerts.newAlertName.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div
            class="flex flex-row justify-between items-center items-center pt-3"
          >
            <label for="alertIncludeComponents" class="text-gray-1400 text-md"
              >Active</label
            >
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
                id="alertIncludeComponents"
                v-model="newAlerts.status"
                checked
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
                for="alertIncludeComponents"
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
          <div class="flex flex-col w-full space-y-2 pt-2">
            <div class="w-full">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.chooseEventId"
                :options="chooseEvents"
                place-holder="Choose Event"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.chooseEventId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.chooseEventId.$error">
                <p
                  v-if="!$v.newAlerts.chooseEventId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
            <div class="w-full">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.feedId"
                :options="socialProviders"
                place-holder="All Feeds"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.feedId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.feedId.$error">
                <p
                  v-if="!$v.newAlerts.feedId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
            <div class="w-full">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.notificationMethodId"
                :options="notificationMethods"
                place-holder="Notification Method"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.notificationMethodId.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.notificationMethodId.$error">
                <p
                  v-if="!$v.newAlerts.notificationMethodId.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
            <div class="w-full">
              <select-input
                id="alertAllFeed"
                v-model="newAlerts.type"
                :options="types"
                color="white"
                background="#E0AD1F"
                caret-bg="#E0AD1F"
                @blur="$v.newAlerts.type.$touch()"
              >
              </select-input>
              <template v-if="$v.newAlerts.type.$error">
                <p
                  v-if="!$v.newAlerts.type.required"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  The field is required
                </p>
              </template>
            </div>
          </div>
          <div class="flex flex-col mt-2">
            <div
              v-if="newAlerts.type === 'email'"
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.email"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  placeholder-yellow-midlight placeholder-opacity-50
                  text-yellow-midlight
                "
                type="email"
                placeholder="example@website.com"
                @blur="$v.newAlerts.email.$touch()"
              />
            </div>
            <div v-if="newAlerts.type === 'email'">
              <template v-if="$v.newAlerts.email.$error">
                <p
                  v-if="!$v.newAlerts.email.email"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  Email is Invalid
                </p>
              </template>
            </div>
            <div
              v-if="newAlerts.type === 'phone'"
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.phone"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  placeholder-yellow-midlight placeholder-opacity-50
                  text-yellow-midlight
                "
                type="text"
                placeholder="657864654"
                @blur="$v.newAlerts.phone.$touch()"
              />
            </div>
            <div v-if="newAlerts.type === 'phone'">
              <template v-if="$v.newAlerts.phone.$error">
                <p
                  v-if="!$v.newAlerts.phone.numeric"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  phone is Invalid!
                </p>
              </template>
            </div>
            <div
              v-if="newAlerts.type === 'url'"
              class="
                w-full
                h-9
                flex flex-row
                items-center
                rounded-full
                px-2
                bg-white
              "
            >
              <input
                v-model="newAlerts.url"
                class="
                  outline-none
                  pl-2
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  placeholder-yellow-midlight placeholder-opacity-50
                  text-yellow-midlight
                "
                type="text"
                placeholder="sharparchive.com"
                @blur="$v.newAlerts.url.$touch()"
              />
            </div>
            <div v-if="newAlerts.type === 'url'">
              <template v-if="$v.newAlerts.url.$error">
                <p
                  v-if="!$v.newAlerts.url.url"
                  class="text-red-400 text-xs mb-0 pl-2"
                >
                  URL is Invalid!
                </p>
              </template>
            </div>
          </div>
          <!--end => main area-->
        </div>

        <!--start => footer area-->
        <div class="w-full mt-5">
          <div class="flex flex-col w-full rounded-xl">
            <div class="flex flex-row justify-around">
              <button
                v-if="newSystemAlertId"
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
                  md:text-lg
                  text-xl
                "
                :disabled="deleteAlertProcess"
                @click="deleteNewSystemAlert"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Delete</span>
                  <fa
                    v-if="deleteAlertProcess"
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
                v-else
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
                  md:text-lg
                  text-xl
                "
                @click="clearAll"
              >
                <span>Clear</span>
              </button>
              <button
                v-if="newSystemAlertId"
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
                  md:text-lg
                  text-xl
                "
                :disabled="updateAlertProcess"
                @click="updateNewSystemAlert"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Save</span>
                  <fa
                    v-if="updateAlertProcess"
                    class="absolute right-5 text-white font-bold animate-spin"
                    :icon="['fas', 'spinner']"
                  />
                </div>
              </button>
              <button
                v-else
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
                  md:text-lg
                  text-xl
                "
                :disabled="addProcess"
                @click="addNewAlert"
              >
                <div
                  class="rounded-full relative flex items-center justify-around"
                >
                  <span>Add</span>
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
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { required, email, url, numeric } from 'vuelidate/lib/validators'
import SelectInput from '~/components/inputs/SelectInput'
import {
  NEW_ALERT_EVENTS,
  NEW_SYSTEM_ALERT,
  NEW_SYSTEM_ALERT_DELETE,
  NEW_SYSTEM_ALERTS_STORE,
  NOTIFICATION_METHODS,
  SYSTEM_LIBRARY,
} from '~/constants/urls'
import { finalAlert } from '~/utils'
export default {
  name: 'NewAlert',
  components: {
    SelectInput,
  },
  layout: 'home',
  props: {
    showNewAlertSideBar: {
      type: Boolean,
      default: false,
    },
    newSystemAlertId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      skew: false,
      newAlerts: {
        status: true,
        feedId: 'All Feeds',
        newSystemAlertLibraryId: 'Archive Sources',
        chooseEventId: 'Choose Event',
        notificationMethodId: 'Notification Method',
        type: 'email',
        newAlertName: '',
        email: '',
        phone: '',
        url: '',
      },
      valid: false,
      newSystemAlertLibraries: [],
      chooseEvents: [],
      notificationMethods: [],
      types: [
        { text: 'Email', value: 'email', placeholder: false },
        { text: 'Phone', value: 'phone', placeholder: false },
        { text: 'Url', value: 'url', placeholder: false },
      ],
      deleteAlertProcess: false,
      updateAlertProcess: false,
      addProcess: false,
    }
  },
  computed: {
    ...mapState(['socialProviders']),
  },
  watch: {
    newSystemAlertId(id) {
      if (id) {
        this.showNewSystemAlert()
      }
    },
  },
  mounted() {
    // this.getAllNewSystemAlertLibrary()
    // this.getAllEvents()
    // this.getAllNotificationMethods()
  },
  validations: {
    newAlerts: {
      newSystemAlertLibraryId: {
        required,
      },
      feedId: {
        required,
      },
      chooseEventId: {
        required,
      },
      notificationMethodId: {
        required,
      },
      type: {
        required,
      },
      newAlertName: {
        required,
      },
      email: {
        email,
      },
      phone: {
        numeric,
      },
      url: {
        url,
      },
    },
  },
  methods: {
    async getAllNewSystemAlertLibrary() {
      try {
        const res = await this.$axios.$get(SYSTEM_LIBRARY)
        if (res.success) {
          this.newSystemAlertLibraries = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllEvents() {
      try {
        const res = await this.$axios.$get(NEW_ALERT_EVENTS)
        if (res.success) {
          this.chooseEvents = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAllNotificationMethods() {
      try {
        const res = await this.$axios.$get(NOTIFICATION_METHODS)
        if (res.success) {
          this.notificationMethods = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    async addNewAlert() {
      this.$toast.clear()
      if (this.newAlerts.type === 'email' && this.newAlerts.email === '') {
        this.$toast.error('The Email Field is required', {
          className: ['toasted-bg-alert'],
        })
        return false
      }

      if (this.newAlerts.type === 'phone' && this.newAlerts.phone === '') {
        this.$toast.error('The Phone Field is required', {
          className: ['toasted-bg-alert'],
        })
        return false
      }

      if (this.newAlerts.type === 'url' && this.newAlerts.url === '') {
        this.$toast.error('The Url Field is required', {
          className: ['toasted-bg-alert'],
        })
        return false
      }

      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.addProcess = true
          const res = await this.$axios.$post(
            NEW_SYSTEM_ALERTS_STORE,
            this.newAlerts
          )
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.$emit('addNewSystemAlert', res.data)
            this.clearAll()
            this.$emit('closeNewAlertAlert')
            this.$store.dispatch('mobile/header/removeOverlay')
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.addProcess = false
        } catch (error) {
          this.addProcess = false
          console.log(error)
        }
      }
    },

    async showNewSystemAlert() {
      if (this.newSystemAlertId) {
        try {
          const res = await this.$axios.$get(
            NEW_SYSTEM_ALERT + this.newSystemAlertId
          )
          if (res.success) {
            this.newAlerts = res.data
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async updateNewSystemAlert() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.newSystemAlertId) {
          this.$toast.clear()
          try {
            this.updateAlertProcess = true
            const res = await this.$axios.$put(
              NEW_SYSTEM_ALERT + this.newSystemAlertId,
              this.newAlerts
            )
            if (res.success) {
              this.$toast.success(res.message, {
                className: ['toasted-bg-archive'],
              })
              this.clearAll()
              this.$emit('newSystemAlertUpdate', res.data)
              this.$store.dispatch('mobile/header/removeOverlay')
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
            this.updateAlertProcess = false
          } catch (error) {
            this.updateAlertProcess = false
            console.log(error)
          }
        }
      }
    },

    async deleteNewSystemAlert() {
      if (finalAlert()) {
        if (this.newSystemAlertId) {
          this.$toast.clear()
          try {
            this.deleteAlertProcess = true
            const res = await this.$axios.$delete(
              NEW_SYSTEM_ALERT_DELETE + this.newSystemAlertId
            )
            if (res.success) {
              this.$toast.success(res.message, {
                className: ['toasted-bg-archive'],
              })
              this.$emit('deleteNewSystemAlert', this.newSystemAlertId)
              this.resetAll()
            } else {
              this.$toast.error(res.message, {
                className: ['toasted-bg-alert'],
              })
            }
            this.deleteAlertProcess = false
          } catch (error) {
            this.deleteAlertProcess = false
            console.log(error)
          }
        }
      }
    },

    clearAll() {
      this.newAlerts.status = true
      this.newAlerts.feedId = 'All Feeds'
      this.newAlerts.newSystemAlertLibraryId = 'Archive Sources'
      this.newAlerts.chooseEventId = 'Choose Event'
      this.newAlerts.notificationMethodId = 'Notification Method'
      this.newAlerts.type = 'email'
      this.newAlerts.newAlertName = ''
      this.newAlerts.email = ''
      this.newAlerts.phone = ''
      this.newAlerts.url = ''
      this.$v.$reset()
    },

    resetAll() {
      this.clearAll()
      this.$emit('closeNewAlertAlert')
      this.$emit('editNewSystemAlertClose')
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
  top: -60px;
  right: -500px;
  z-index: 999;
}

.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
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
    top: 0px;
    position: fixed;
    width: 100%;
    height: auto;
    right: -100%;
    z-index: 9999999999;
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
