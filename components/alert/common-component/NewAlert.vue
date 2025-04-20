<template>
  <div
    class="
      right-0
      top-0
      fixed
      bg-ash-dark
      p-4
      md:pt-8
      profile
      transition-all
      duration-800
      ease-in-out
      overflow-y-auto
      scroll
      md:rounded-l-2xl md:shadow-2xl
    "
    :class="showNewAlert ? 'show' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full">
        <div class="flex flex-row justify-between items-center">
          <h2 class="text-red-deep text-2xl font-normal">New Alert</h2>
          <button
            class="w-8 h-8 flex items-center justify-end cursor-pointer"
            @click="resetAll(), resetAllValue()"
          >
            <fa
              class="text-red-deep md:text-4xl text-3xl font-normal"
              :icon="['fas', 'times']"
            />
          </button>
        </div>
        <div class="flex flex-col mt-5 space-y-3">
          <div class="w-full flex items-start justify-between">
            <span class="text-offwhite-800 text-xl">Type</span>
            <div class="space-y-3">
              <div class="target-input">
                <select-input
                  v-model="type"
                  class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input-alert"
                  :options="types"
                  place-holder="Select"
                  :place-holder-disabled="true"
                  color="#F8F8F8"
                  background="#A22A2A"
                  caret-bg="#A22A2A"
                  scroll-color="#9e7912"
                ></select-input>
              </div>
              <transition name="animation">
                <div v-if="type === 'Alerts Library'" class="target-input">
                  <select-input
                    v-model="subType"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input-alert"
                    :options="subTypes"
                    place-holder="Select"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#A22A2A"
                    caret-bg="#A22A2A"
                    scroll-color="#9e7912"
                  ></select-input>
                </div>
              </transition>
            </div>
          </div>
          <transition name="animation">
            <div
              v-if="type === 'Random Sample' || type === 'Custom Lexicon'"
              class="space-y-3"
            >
              <div class="w-full flex items-center justify-between">
                <span class="text-offwhite-800 text-xl">Name</span>
                <text-input
                  v-model="$v.name.$model"
                  class="w-60 new-alert-text"
                  :color="'#434343'"
                  :background="'#FCFCFC'"
                  :place-holder="'Name'"
                  :error="$v.name.$error"
                  :error-message="validationMsg($v.name)"
                ></text-input>
              </div>
              <transition name="animation">
                <div
                  v-if="type === 'Random Sample'"
                  class="w-full flex items-center justify-between space-x-2"
                >
                  <span class="text-offwhite-800 text-xl">Target</span>
                  <div class="target-input">
                    <text-input
                      id="target_input"
                      v-model="$v.target.$model"
                      class="w-60 new-alert-text"
                      :color="'#434343'"
                      :background="'#FCFCFC'"
                      :place-holder="'Target'"
                      :error="$v.target.$error"
                      :error-message="validationMsg($v.target)"
                      @focus="focusTarget"
                      @keyup="isNumber($event)"
                      @keypress="isNumberKey($event)"
                      @input="getInputValue($event)"
                    ></text-input>
                  </div>
                </div>
              </transition>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl">Period</span>
                <div class="target-input">
                  <select-input
                    v-model="period"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input-alert"
                    :options="periods"
                    place-holder="Select"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#A22A2A"
                    caret-bg="#A22A2A"
                    scroll-color="#9e7912"
                  ></select-input>
                </div>
              </div>
              <div
                class="
                  w-full
                  flex
                  items-center
                  justify-between
                  space-x-2
                  relative
                "
              >
                <span class="text-offwhite-800 text-xl whitespace-nowrap"
                  >Limit Lookback</span
                >
                <all-dates :height="'40px'"></all-dates>
              </div>
            </div>
          </transition>
          <div
            class="bg-red-deep allFeeds_ul_wrapper max-height-320 scroll-x"
            :class="!controlBoxRound ? 'rounded-full' : 'rounded-xl'"
          >
            <AllFeedsMenu
              arrow-color="#A22A2A"
              scroll-color="#8d0000"
              :control-box-round="controlBoxRound"
              :class-style-name="
                !controlBoxRound ? 'border-radius-full' : 'border-raduis-xl'
              "
              @rounded="controlRound"
            />
          </div>
          <div
            class="
              w-full
              flex flex-col
              md:flex-row
              items-end
              md:items-center
              justify-between
              space-x-2 space-y-2
              md:space-y-0
            "
          >
            <div class="flex space-x-4 items-center">
              <span class="text-offwhite-800 text-xl">Ignore Disclaimers</span>
              <div
                class="
                  relative
                  inline-block
                  w-9
                  align-middle
                  select-none
                  transition-all
                  duration-800
                  ease-in-out
                "
              >
                <input
                  id="ignore-disclaimers"
                  v-model="ignoreDisclaimers"
                  type="checkbox"
                  name="toggle"
                  class="
                    toggle-checkbox
                    absolute
                    block
                    rounded-full
                    bg-red-deep
                    appearance-none
                    cursor-pointer
                  "
                />
                <label
                  for="ignore-disclaimers"
                  class="
                    toggle-label
                    checkbox-label
                    block
                    overflow-hidden
                    h-5
                    rounded-full
                    transition-all
                    duration-800
                    ease-in-out
                    bg-offwhite-800
                    cursor-pointer
                  "
                ></label>
              </div>
            </div>
            <div
              class="
                w-60
                h-9
                rounded-full
                bg-white
                flex
                items-center
                justify-start
                relative
              "
            >
              <div class="w-1/2 h-full">
                <input
                  id="incoming"
                  v-model="inComingCheckbox"
                  class="
                    in-out-checkbox
                    w-1/2
                    h-full
                    absolute
                    left-0
                    top-0
                    block
                    rounded-full
                    appearance-none
                    cursor-pointer
                  "
                  type="checkbox"
                />
                <label
                  for="incoming"
                  class="
                    toggle-label
                    checkbox-label
                    overflow-hidden
                    w-full
                    h-full
                    transition-all
                    duration-800
                    ease-in-out
                    cursor-pointer
                    text-red-deep
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                  :class="outGoingCheckbox ? 'rounded-l-full' : 'rounded-full'"
                  >Incoming</label
                >
              </div>
              <div class="w-1/2 h-full">
                <input
                  id="outgoing"
                  v-model="outGoingCheckbox"
                  class="
                    in-out-checkbox
                    w-1/2
                    h-full
                    absolute
                    right-0
                    top-0
                    block
                    rounded-full
                    appearance-none
                    cursor-pointer
                  "
                  type="checkbox"
                />
                <label
                  for="outgoing"
                  class="
                    toggle-label
                    checkbox-label
                    overflow-hidden
                    w-full
                    h-full
                    transition-all
                    duration-800
                    ease-in-out
                    cursor-pointer
                    text-red-deep
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                  :class="inComingCheckbox ? 'rounded-r-full' : 'rounded-full'"
                  >Outgoing</label
                >
              </div>
            </div>
          </div>
          <transition name="animation">
            <div v-if="type === 'Alerts Library'" class="space-y-3">
              <div class="w-full flex flex-col space-y-4">
                <span class="text-offwhite-800 text-xl">Concern Threshold</span>
                <sliding-bar
                  :bar-id="'concern_threshold'"
                  :input-value="concernInitialValue"
                  class-style-name="sliding_bar"
                  @send-value="ValueFromConcernThreshold($event)"
                ></sliding-bar>
              </div>
              <div class="w-full flex flex-col space-y-4">
                <span class="text-offwhite-800 text-xl"
                  >Confidence Threshold</span
                >
                <sliding-bar
                  :bar-id="'confidence_threshold'"
                  :input-value="confidenceInitialValue"
                  class-style-name="sliding_bar"
                  @send-value="ValueFromConfidenceThreshold($event)"
                ></sliding-bar>
              </div>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl whitespace-nowrap"
                  >Minimum Severity Index</span
                >
                <p class="text-offwhite-800 text-xl">{{ calculateIndex }}</p>
              </div>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl whitespace-nowrap"
                  >Current Results</span
                >
                <p class="text-offwhite-800 text-xl">4</p>
              </div>
            </div>
          </transition>
          <transition name="animation">
            <!-- <template v-else> -->
            <div v-if="type === 'Random Sample'" class="space-y-3">
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl whitespace-nowrap"
                  >Total Population</span
                >
                <p class="text-offwhite-800 text-xl">31,760</p>
              </div>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl"
                  >Targeted Reviews of Population</span
                >
                <p class="text-offwhite-800 text-xl">1,588</p>
              </div>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl"
                  >Count Reviewed Flags Against Target</span
                >
                <div class="flex flex-row items-center space-x-2">
                  <div
                    class="
                      relative
                      inline-block
                      w-9
                      align-middle
                      select-none
                      transition-all
                      duration-800
                      ease-in-out
                    "
                  >
                    <input
                      id="count-reviewed"
                      type="checkbox"
                      name="toggle"
                      class="
                        toggle-checkbox
                        absolute
                        block
                        rounded-full
                        bg-red-deep
                        appearance-none
                        cursor-pointer
                      "
                    />
                    <label
                      for="count-reviewed"
                      class="
                        toggle-label
                        checkbox-label
                        block
                        overflow-hidden
                        h-5
                        rounded-full
                        transition-all
                        duration-800
                        ease-in-out
                        bg-offwhite-800
                        cursor-pointer
                      "
                    ></label>
                  </div>
                </div>
              </div>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl whitespace-nowrap"
                  >Non-Flag Reviews</span
                >
                <p class="text-offwhite-800 text-xl">71</p>
              </div>
              <div class="w-full flex items-center justify-between space-x-2">
                <span class="text-offwhite-800 text-xl"
                  >Remaining Reviews to Meet Target</span
                >
                <p class="text-offwhite-800 text-xl">1,417</p>
              </div>
            </div>
          </transition>
          <transition name="animation">
            <div
              v-if="type === 'Custom Lexicon'"
              class="flex items-center mt-2 space-x-2"
            >
              <input
                type="text"
                class="
                  w-3/4
                  flex-grow
                  h-10
                  outline-none
                  border-none
                  px-4
                  text-lg text-ash-primary
                  bg-offwhite-800
                  placeholder-ash-primary placeholder-opacity-50
                  rounded-full
                "
                placeholder="Add Custom Lexicon"
              />
              <div
                class="
                  flex
                  justify-center
                  items-center
                  w-10
                  min-w-40
                  h-10
                  rounded-full
                  bg-red-deep
                  text-offwhite-800
                "
              >
                <fa class="w-5 h-5" :icon="['fas', 'plus']" />
              </div>
              <div
                class="
                  flex
                  justify-center
                  items-center
                  w-10
                  min-w-40
                  h-10
                  rounded-full
                  bg-red-deep
                  text-offwhite-800
                "
              >
                <fa class="w-5 h-5" :icon="['fas', 'paperclip']" />
              </div>
            </div>
          </transition>
          <!-- </template> -->
          <div class="w-full flex items-center justify-between space-x-2">
            <span class="text-offwhite-800 text-xl whitespace-nowrap"
              >Assign Flag</span
            >
            <transition name="fadeIn">
              <div class="target-input">
                <select-input
                  v-model="team"
                  class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input-alert"
                  :options="teams"
                  place-holder="Select"
                  :place-holder-disabled="true"
                  color="#F8F8F8"
                  background="#A22A2A"
                  caret-bg="#A22A2A"
                  scroll-color="#9e7912"
                ></select-input>
              </div>
            </transition>
          </div>
          <div
            v-for="(newAssignFlag, index) in newAssignFlagsArrayFinal"
            :key="index"
          >
            <AssignFlags
              :id="parseInt(newAssignFlag.id)"
              :members="members"
              :value="newAssignFlag.percentage"
              :length="newAssignFlagsArrayLength"
              :is-crossed="newAssignFlag.isCrossed"
              :total="totalAssignFlagsValue"
              :flag-for="newAssignFlag.flagFor"
              @decrease="pullFromFlags"
              @increases="assignInFlags()"
              @change-value="updateAssignValue"
              @current-flag-for="flagUpdate"
            />
          </div>
          <div
            v-if="newAssignFlagsArrayLength > 1"
            class="flex space-x-2 justify-end"
          >
            <div
              class="
                flex
                items-center
                justify-center
                w-20
                h-10
                rounded-full
                font-bold
                fadeIn_Animation
              "
              :class="
                totalAssignFlagsValue > 98 && totalAssignFlagsValue <= 100
                  ? 'bg-offwhite-800 text-red-deep'
                  : 'bg-red-deep text-offwhite-800'
              "
            >
              {{ totalAssignFlagsValue + ' %' }}
            </div>
            <div
              class="
                bg-red-deep
                text-offwhite-800
                flex
                items-center
                justify-center
                total-width
                h-10
                rounded-full
                font-bold
                fadeIn_Animation
              "
            >
              Total
            </div>
            <div
              class="
                w-10
                min-w-40
                h-10
                rounded-full
                bg-red-deep
                text-white
                flex
                justify-center
                items-center
              "
              :class="
                newAssignFlagsArrayLength < members.length
                  ? 'opacity-100'
                  : 'opacity-50'
              "
              @click="assignInFlags()"
            >
              <fa
                class="
                  text-white
                  md:text-2xl
                  text-2xl
                  font-normal
                  cursor-pointer
                "
                :icon="['fas', 'plus']"
              />
            </div>
          </div>
          <transition name="animation">
            <div
              v-if="type === 'Alerts Library'"
              class="w-full flex items-center justify-between space-x-2"
            >
              <span
                class="
                  text-offwhite-800 text-xl
                  whitespace-nowrap
                  self-start
                  pt-2
                "
                >Notify</span
              >
              <template>
                <div class="space-y-3 flex flex-col">
                  <template>
                    <Notify
                      :id="newFieldsArray[0].id"
                      :notify-for="newFieldsArray[0].notifyFor"
                      :members="members"
                      :new-notifies="newNotifies"
                      @first-notify-for="notifyUpdate"
                      @increase="assignNewNotify()"
                      @decrease="
                        newFieldsArray.length > 1
                          ? pullNewFields(newFieldsArray[0].id)
                          : pullNewNotify()
                      "
                    />
                  </template>
                </div>
              </template>
            </div>
          </transition>
          <template v-if="newNotifies === 1 && type === 'Alerts Library'">
            <transition name="fadeIn">
              <div
                class="
                  w-full
                  flex flex-col
                  justify-between
                  space-y-3
                  md:space-y-3
                  fadeIn_Animation
                "
              >
                <div
                  v-for="(newField, newFieldIndex) in newFieldsArray"
                  :key="newFieldIndex"
                  class="flex space-x-2"
                  :class="
                    currentComp === 'GeneralAlertSettings' ? 'w-full' : 'w-full'
                  "
                >
                  <email-text-input
                    :members="members"
                    :new-fields="newFields"
                    :new-field="newField"
                    :new-field-index="newFieldIndex"
                    :new-fields-array="newFieldsArray"
                    @assign-field="assignNewFields()"
                    @pull-field="pullNewFields($event)"
                    @add-email="addEmail($event)"
                    @add-text="addText($event)"
                    @email-text-tab="setEmailTextTab($event)"
                    @current-notify-for="notifyUpdate"
                  ></email-text-input>
                </div>
              </div>
            </transition>
          </template>
          <transition name="animation">
            <div
              v-if="type === 'Alerts Library'"
              class="w-full flex flex-col space-y-4"
            >
              <span class="text-offwhite-800 text-xl"
                >Severity Index Threshold</span
              >
              <SeverityThresholdSlidingBar
                :bar-id="'new_severity_index_threshold'"
              />
            </div>
          </transition>
        </div>
      </div>
      <div class="flex flex-row justify-center mt-8 space-x-5 px-8 pb-4 w-full">
        <button
          class="
            focus:outline-none
            w-44
            h-10
            text-red-deep
            rounded-full
            border-2 border-red-deep
            outline-none
            font-bold
            text-base
            setup
          "
          @click="resetAll(), resetAllValue()"
        >
          <span>Cancel</span>
        </button>
        <button
          class="
            focus:outline-none
            w-44
            h-10
            text-offwhite-800
            bg-red-deep
            rounded-full
            border-none
            outline-none
            font-bold
            text-base
            setup
          "
          @click="resetAll(), resetAllValue()"
        >
          <div class="rounded-full relative flex items-center justify-around">
            <span>Add</span>
            <!-- <fa
              class="absolute right-8 text-white font-bold animate-spin"
              :icon="['fas', 'spinner']"
            />-->
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { storeToRefs } from 'pinia'
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
} from '@nuxtjs/composition-api'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages, numberWithPercentage } from '@/utils/validations'
import SelectInput from '~/components/inputs/SelectInput'
// import EmailInput from '~/components/inputs/EmailInput.vue'
import TextInput from '~/components/inputs/TextInput.vue'
import AllDates from '~/components/alert/AllDates.vue'
import SlidingBar from '~/components/alert/sliding-bar/SlidingBar.vue'
import ProgressBar from '~/components/alert/progress-bar/ProgressBar.vue'
import SeverityThresholdSlidingBar from '~/components/alert/sliding-bar/SeverityThresholdSlidingBar.vue'
import AssignFlags from '~/components/alert/AssignFlags.vue'
import Notify from '~/components/alert/common-component/Notify.vue'
// import PlusBellIcon from '~/components/shared/icon/PlusBellIcon.vue'
import EmailTextInput from '~/components/alert/common-component/EmailTextInput.vue'
// import EmailText from '~/components/alert/common-component/EmailTextTab.vue'
import AllFeedsMenu from '~/components/AllFeedsMenu.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  Name: 'NewAlert',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SelectInput,
    TextInput,
    AllDates,
    SlidingBar,
    // eslint-disable-next-line vue/no-unused-components
    ProgressBar,
    SeverityThresholdSlidingBar,
    AssignFlags,
    Notify,
    EmailTextInput,
    // EmailText,
    // PlusBellIcon,
    AllFeedsMenu,
    // EmailInput,
  },
  layout: 'home',
  setup() {
    const instance = getCurrentInstance()
    const store = useAlert()

    const { showNewAlert, currentComp } = storeToRefs(store)

    const types = [
      { id: 0, text: 'Alerts Library', value: 'Alerts Library' },
      { id: 1, text: 'Random Sample', value: 'Random Sample' },
      { id: 2, text: 'Custom Lexicon', value: 'Custom Lexicon' },
    ]
    const type = ref('Alerts Library')

    const subTypes = [
      { id: 0, text: 'Sexual Harassment', value: 'Sexual Harassment' },
    ]

    const subType = ref('Sexual Harassment')

    const name = ref('')

    const targets = [
      { id: 0, text: '0%', value: 0 },
      { id: 1, text: '1%', value: 1 },
      { id: 2, text: '2%', value: 2 },
      { id: 3, text: '3%', value: 3 },
      { id: 4, text: '4%', value: 4 },
      { id: 5, text: '5%', value: 5 },
      { id: 6, text: '6%', value: 6 },
      { id: 7, text: '7%', value: 7 },
      { id: 8, text: '8%', value: 8 },
      { id: 9, text: '9%', value: 9 },
      { id: 10, text: '10%', value: 10 },
    ]
    const target = ref('%')

    const periods = [
      { id: 0, text: 'Ongoing', value: 'Ongoing' },
      { id: 1, text: 'Outgoing', value: 'Outgoing' },
    ]
    const period = ref('Ongoing')

    const inComingCheckbox = ref(true)
    const outGoingCheckbox = ref(true)

    const members = [
      { id: 0, text: 'Bob Rahman', value: 'Bob Rahman' },
      { id: 1, text: 'Tommy Thompson', value: 'Tommy Thompson' },
      { id: 2, text: 'James Jamison', value: 'James Jamison' },
      { id: 3, text: 'Ryan Rjiani', value: 'Ryan Rjiani' },
    ]
    const teams = [
      { id: 0, text: 'Team 1', value: 'Team 1' },
      { id: 1, text: 'Team 2', value: 'Team 2' },
      { id: 2, text: 'Team 3', value: 'Team 3' },
    ]
    const team = ref('Team 1')

    const newAssignFlagValue = ref(100)
    const newAssignValue = ref(0)

    const newNotifies = ref(0)

    const newFields = ref(1)
    const newFieldsArray = ref([
      {
        id: 946663200000,
        email: '',
        text: '',
        emailTextTab: 'Email',
        notifyFor: 'Bob Rahman',
        isBellShow: true,
        isCrossed: false,
      },
    ])

    const ignoreDisclaimers = ref(true)

    const concernInitialValue = ref('50')
    const confidenceInitialValue = ref('50')

    const resetAll = () => {
      if (
        totalAssignFlagsValue.value < 98 ||
        totalAssignFlagsValue.value > 100
      ) {
        instance.proxy.$store.$toast.error(
          'You must set the value between 98 to 100'
        )
      }
      store.showNewAlertComp(false)
      store.setCurrentInputTab('Email')
    }

    const resetValue = () => {
      newAssignFlagsArray.value = [
        {
          id: 946663200000,
          percentage: 100,
          isChanged: false,
          flagFor: 'Bob Rahman',
          isCrossed: false,
        },
      ]
      newAssignFlagsArrayFinal.value = [
        {
          id: 946663200000,
          percentage: 100,
          isChanged: false,
          flagFor: 'Bob Rahman',
          isCrossed: false,
        },
      ]
      newAssignFlagsArrayLength.value = 1
      newFieldsArray.value = [
        {
          id: 946663200000,
          email: '',
          text: '',
          emailTextTab: 'Email',
          notifyFor: 'Bob Rahman',
          isBellShow: true,
          isCrossed: false,
        },
      ]
      type.value = 'Alerts Library'
      subType.value = 'Sexual Harassment'
      name.value = ''
      target.value = '%'
      period.value = 'Ongoing'
      inComingCheckbox.value = true
      outGoingCheckbox.value = true
      team.value = 'Team 1'
      newAssignFlags.value = 0
      newAssignFlagValue.value = 100
      newAssignValue.value = 0
      newNotifies.value = 0
      newFields.value = 1
      ignoreDisclaimers.value = true
      concernInitialValue.value = '50'
      confidenceInitialValue.value = '50'
    }

    const newAssignFlags = ref(0)
    const newAssignFlagsArray = ref([
      {
        id: 946663200000,
        percentage: 100,
        isChanged: false,
        flagFor: 'Bob Rahman',
        isCrossed: false,
      },
    ])
    const newAssignFlagsArrayFinal = ref([
      {
        id: 946663200000,
        percentage: 100,
        isChanged: false,
        flagFor: 'Bob Rahman',
        isCrossed: false,
      },
    ])

    const showErrorToast = (message) => {
      instance.proxy.$store.$toast.clear()
      setTimeout(() => {
        instance.proxy.$store.$toast.error(message, {
          className: ['toasted-bg-alert'],
        })
      }, 200)
    }
    const showSuccessToast = (message) => {
      instance.proxy.$store.$toast.clear()
      setTimeout(() => {
        instance.proxy.$store.$toast.success(message)
      }, 200)
    }

    const setFlagFor = computed(() => {
      const flagForSet = new Set(
        newAssignFlagsArrayFinal.value.map((obj) => obj.flagFor)
      )
      const unmatchedValue = members.find(
        (member) => !flagForSet.has(member.value)
      )
      if (unmatchedValue) {
        return unmatchedValue.value
      }
    })

    const newAssignFlagsArrayLength = ref(1)
    const totalAssignFlagsValue = ref(100)
    const assignInFlags = () => {
      if (newAssignFlagsArrayLength.value === members.length) {
        showErrorToast('All members have been assigned')
        return
      }
      const newAssignFlag = {
        id: new Date().getTime(),
        percentage: 100 / (newAssignFlagsArray.value.length + 1),
        isChanged: false,
        flagFor: setFlagFor.value,
        isCrossed: false,
      }
      newAssignFlagsArray.value.push(newAssignFlag)
      newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
      updateTotalValueFlags()

      setTimeout(() => {
        newAssignFlagsArrayFinal.value.forEach((item) => {
          item.isCrossed = true
        })
      }, 100)
    }

    const updateAssignValue = (newPercentage, id, oldTotal) => {
      totalAssignFlagsValue.value = 0
      if (newAssignFlagsArray.value.length === 2) {
        newAssignFlagsArray.value.forEach((item) => {
          if (item.id === id) {
            item.percentage = newPercentage
          } else {
            const availablePercentage = 100 - newPercentage
            item.percentage = Math.round(
              availablePercentage / (newAssignFlagsArray.value.length - 1)
            )
          }
          totalAssignFlagsValue.value += item.percentage
        })
        showSuccessToast('Value set successfully')
        // instance.proxy.$store.$toast.success('Value set successfully')
      } else {
        newAssignFlagsArray.value.forEach((item) => {
          if (item.id === id) {
            item.percentage = newPercentage
          }
          totalAssignFlagsValue.value += item.percentage
        })
        if (
          totalAssignFlagsValue.value >= 98 &&
          totalAssignFlagsValue.value <= 100
        ) {
          showSuccessToast('Value set successfully')
          // instance.proxy.$store.$toast.success('Value set successfully')
        } else {
          if (totalAssignFlagsValue.value > 100) {
            totalAssignFlagsValue.value = 100
          }
          if (totalAssignFlagsValue.value < 98) {
            totalAssignFlagsValue.value = 98
          }
          showErrorToast('You must set the value between 98 to 100')
          // instance.proxy.$store.$toast.error(
          //   'You must set the value between 98 to 100'
          // )
        }
      }
    }

    // const flagUpdate = (flagValue, id) => {
    //   newAssignFlagsArray.value.forEach((item, index) => {
    //     if (item.id === id) {
    //       item.flagFor = flagValue
    //     }
    //   })
    //   newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
    // }

    const flagUpdate = (flagValue, id) => {
      const itemToUpdateObj = newAssignFlagsArray.value.find(
        (item) => item.id === id
      )
      const swapWithObj = newAssignFlagsArray.value.find(
        (item) => item.flagFor === flagValue
      )

      if (swapWithObj) {
        swapWithObj.flagFor = itemToUpdateObj.flagFor
      }
      itemToUpdateObj.flagFor = flagValue
      newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
    }

    const pullFromFlags = (id) => {
      newAssignFlagsArray.value.forEach((item, index) => {
        if (item.id === id) {
          newAssignFlagsArray.value.splice(index, 1)
        }
      })
      newAssignFlagsArrayFinal.value = newAssignFlagsArray.value
      updateTotalValueFlags()

      if (newAssignFlagsArrayFinal.value.length === 1) {
        newAssignFlagsArrayFinal.value[0].isCrossed = false
      }
    }

    const updateTotalValueFlags = () => {
      newAssignFlagsArray.value.forEach((item) => {
        item.percentage = Math.round(100 / newAssignFlagsArray.value.length)
      })
      totalAssignFlagsValue.value =
        Math.round(100 / newAssignFlagsArray.value.length) *
        newAssignFlagsArray.value.length
      if (totalAssignFlagsValue.value > 100) {
        const needDecrease = totalAssignFlagsValue.value - 100
        newAssignFlagsArray.value[0].percentage -= needDecrease
        totalAssignFlagsValue.value = 100
      } else if (totalAssignFlagsValue.value < 100) {
        const needDecrease = 100 - totalAssignFlagsValue.value
        newAssignFlagsArray.value[0].percentage += needDecrease
        totalAssignFlagsValue.value = 100
      }
      newAssignFlagsArrayLength.value = newAssignFlagsArray.value.length
    }

    const assignNewNotify = () => {
      store.setCurrentInputTab('Email')
      newNotifies.value = newNotifies.value + 1
    }

    const pullNewNotify = () => {
      newNotifies.value = newNotifies.value - 1
    }

    const setNotifyFor = computed(() => {
      const notifyForSet = new Set(
        newFieldsArray.value.map((obj) => obj.notifyFor)
      )
      const unmatchedValue = members.find(
        (member) => !notifyForSet.has(member.value)
      )
      if (unmatchedValue) {
        return unmatchedValue.value
      }
    })

    const assignNewFields = () => {
      if (newFieldsArray.value.length === members.length) {
        showErrorToast('All members have been assigned')
        return
      }
      newFields.value = newFields.value + 1
      newFieldsArray.value[newFieldsArray.value.length - 1].isBellShow = false
      newFieldsArray.value.push({
        id: new Date().getTime(),
        email: '',
        text: '',
        emailTextTab: 'Email',
        notifyFor: setNotifyFor.value,
        isBellShow: true,
        isCrossed: false,
      })
      setTimeout(() => {
        newFieldsArray.value[newFieldsArray.value.length - 1].isCrossed = true
      }, 100)
    }

    const addEmail = (data) => {
      newFieldsArray.value.forEach((item) => {
        if (item.id === data.id) {
          item.email = data.email
        }
      })
    }

    const addText = (data) => {
      newFieldsArray.value.forEach((item) => {
        if (item.id === data.id) {
          item.text = data.text
        }
      })
    }

    const pullNewFields = (id) => {
      newFields.value = newFields.value - 1
      newFieldsArray.value.forEach((item, index) => {
        if (item.id === id) {
          newFieldsArray.value.splice(index, 1)
        }
      })
      newFieldsArray.value[newFieldsArray.value.length - 1].isBellShow = true
    }

    // const notifyUpdate = (notifyValue, id) => {
    //   newFieldsArray.value.forEach((item, index) => {
    //     if (item.id === id) {
    //       item.notifyFor = notifyValue
    //     }
    //   })
    // }

    const notifyUpdate = (notifyValue, id) => {
      const itemToUpdateObj = newFieldsArray.value.find(
        (item) => item.id === id
      )
      const swapWithObj = newFieldsArray.value.find(
        (item) => item.notifyFor === notifyValue
      )

      if (swapWithObj) {
        swapWithObj.notifyFor = itemToUpdateObj.notifyFor
      }
      itemToUpdateObj.notifyFor = notifyValue
    }

    const setEmailTextTab = (value) => {
      newFieldsArray.value.forEach((item, index) => {
        if (item.id === value.id) {
          item.emailTextTab = value.tab
        }
      })
    }

    return {
      store,
      showNewAlert,
      resetAll,
      types,
      type,
      subTypes,
      subType,
      name,
      targets,
      target,
      periods,
      period,
      inComingCheckbox,
      outGoingCheckbox,
      teams,
      team,
      members,
      totalAssignFlagsValue,
      newAssignFlags,
      newAssignFlagsArray,
      newAssignFlagsArrayFinal,
      newAssignFlagsArrayLength,
      newAssignFlagValue,
      assignInFlags,
      updateAssignValue,
      flagUpdate,
      pullFromFlags,
      newNotifies,
      assignNewNotify,
      pullNewNotify,
      newFields,
      newFieldsArray,
      assignNewFields,
      pullNewFields,
      currentComp,
      ignoreDisclaimers,
      newAssignValue,
      resetValue,
      concernInitialValue,
      confidenceInitialValue,
      addEmail,
      addText,
      setEmailTextTab,
      notifyUpdate,
      setFlagFor,
      showErrorToast,
    }
  },
  data() {
    return {
      feeds: [
        {
          id: 'all_feeds',
          name: 'All Feeds',
          value: true,
          media: [
            {
              id: 'social_media',
              mediaName: 'Social Media',
              mediaValue: true,
              individualMedia: [
                { id: 'twitter', value: true, individualMediaName: 'Twitter' },
                {
                  id: 'facebook',
                  value: true,
                  individualMediaName: 'Facebook',
                },
                {
                  id: 'instagram',
                  individualMediaName: 'Instagram',
                  value: true,
                  individualMediaAccount: [
                    { id: 'abc_company', accountName: 'abc_company' },
                    { id: 'xyzinfo', accountName: 'xyzinfo' },
                  ],
                },
                {
                  id: 'linkedIn',
                  value: true,
                  individualMediaName: 'LinkedIn',
                },
              ],
            },
            {
              id: 'website',
              mediaName: 'Website',
              mediaValue: true,
              individualMedia: [],
            },
            {
              id: 'email',
              mediaName: 'Email Accounts',
              mediaValue: true,
              individualMedia: [],
            },
            {
              id: 'chat',
              mediaName: 'Chat',
              mediaValue: true,
              individualMedia: [],
            },
            {
              id: 'group12',
              mediaName: 'Group',
              mediaValue: true,
              individualMedia: [
                {
                  id: 'bob_smith',
                  value: true,
                  individualMediaName: "Bob Smith's Feed",
                },
                {
                  id: 'john_doe',
                  value: true,
                  individualMediaName: 'John Doe Feed',
                },
                {
                  id: 'jane_doe',
                  value: true,
                  individualMediaName: 'Jane Doe Feed',
                },
              ],
            },
          ],
        },
      ],
      concernValue: '',
      confidenceValue: '',
      controlBoxRound: false,
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(40),
    },
    target: {
      required,
      maxLength: maxLength(4),
      numberWithPercentage,
    },
  },
  computed: {
    calculateIndex() {
      const index = (this.concernValue / 100) * (this.confidenceValue / 100)
      const calculatedIndex = index.toFixed(3)
      return calculatedIndex
    },
  },
  methods: {
    controlRound(value) {
      this.controlBoxRound = value
    },
    resetAllValue() {
      setTimeout(() => {
        this.resetValue()
        this.feeds[0].value = true
        this.$v.$reset()
      }, 600)
    },
    validationMsg: validationMessage(validationMessages),
    focusTarget() {
      this.getInputValue()
    },
    isNumber(event) {
      event = event || window.event
      const charCode = event.target.value
        .charAt(event.target.selectionStart - 1)
        .charCodeAt()
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 37
      ) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, '')
        event.preventDefault()
      } else {
        return true
      }
    },
    isNumberKey(event) {
      if (!/\d/.test(event.key)) return event.preventDefault()
    },
    getInputValue(value) {
      const source = document.getElementById('target_input')
      window.addEventListener('keyup', function (e) {
        e = e || window.event
        if (value === undefined || value === '%') {
          value = '%'
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        }

        if (e.keyCode === 39) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else if (e.keyCode === 40) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else if (value === undefined) {
          value = '%'
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else {
          const lastCharacter = value.charAt(value.length - 1)
          if (lastCharacter !== '%') {
            value += '%'
            this.target = value
            console.log(this.target)
          }
        }
      })
      document.body.onclick = (e) => {
        e = e || window.event
        if ('which' in e) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        } else if ('button' in e) {
          setTimeout(() => {
            const end = source.value.length - 1
            source.setSelectionRange(end, end)
          }, 100)
        }
      }
    },
    ValueFromConcernThreshold($event) {
      this.concernValue = $event
      this.concernInitialValue = $event
    },
    ValueFromConfidenceThreshold($event) {
      this.confidenceValue = $event
      this.confidenceInitialValue = $event
    },
    showToastMessage(message) {
      this.$toast.error(message, {
        className: ['toasted-bg-alert'],
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.min-w-40 {
  min-width: 40px;
}
.toggle-checkbox {
  width: 16px;
  min-width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #434343;
  &.toggle.label {
    min-width: 36px !important;
  }
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #fcfcfc;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #a22a2a;
    min-width: 36px;
  }
}
.in-out-checkbox {
  transition: all 0.5s ease-in-out;
  &:checked + .toggle-label {
    @apply bg-red-deep text-white;
    transition: all 0.5s ease-in-out;
  }
}

.setup {
  bottom: 530px;
}

.profile {
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 999999999;
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
  scrollbar-color: #a22a2a #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: #a22a2a;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a22a2a;
  }
}

.border-top {
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

@media (max-width: 768px) {
  .profile {
    width: 100%;
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

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}
.target-input {
  width: 240px;
  // height: 40px;
}

.toggle-check-1 {
  &:checked {
    @apply bg-red-deep;
  }
  &:checked + .check-1 {
    @apply text-offwhite-800 opacity-100;
  }
}
.total-width {
  width: 190px;
}
.flag-select-input {
  width: 190px;
  height: 40px;
}
.max-height-320 {
  max-height: 320px;
  // max-height: var(--height);
}
.allFeeds_ul_wrapper {
  box-shadow: 0px 4px 6px #00000080;
}
.scroll-x {
  overflow-x: hidden !important;
}
ul {
  width: 100%;
  max-height: 320px;
  // max-height: var(--height);
}

.animation-enter,
.animation-leave-to {
  opacity: 0;
}
.animation-enter-active {
  transition: opacity 1.6s;
}
.animation-leave-active {
  transition: opacity 0.5s;
}

.fade-In-alert-enter,
.fade-In-alert-leave-to {
  opacity: 0;
}
.fade-In-alert-enter-active {
  transition: opacity 0.5s;
}
.fade-In-alert-leave-active {
  transition: opacity 0.5s;
}
// .animation-enter-to,
// .animation-leave {
//   opacity: 1;
// }
</style>
