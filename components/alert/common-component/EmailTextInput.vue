<template>
  <section class="w-full flex flex-col space-y-3 items-end fadeIn_Animation">
    <div
      v-if="newFieldIndex !== 0"
      class="flex flex-row"
      :class="
        currentComp === 'GeneralAlertSettings' ? 'space-x-4' : 'space-x-2'
      "
    >
      <div
        :id="newField.id"
        class=""
        :class="
          currentComp === 'GeneralAlertSettings'
            ? 'target-input'
            : 'target-alert-input'
        "
      >
        <select-input
          :class-style-name="
            currentComp === 'GeneralAlertSettings'
              ? 'searchPageScrollStyle searchPageScrollWidth target-select-input fadeIn_Animation'
              : 'searchPageScrollStyle searchPageScrollWidth target-select-input-alert fadeIn_Animation'
          "
          :value="newField.notifyFor"
          :options="members"
          place-holder="Bob Rahman"
          :place-holder-disabled="true"
          color="#F8F8F8"
          background="#A22A2A"
          caret-bg="#A22A2A"
          scroll-color="#9e7912"
          @input="notifySelect($event, newField.id)"
        ></select-input>
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
        @click="$emit('pull-field', newField.id)"
      >
        <transition
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
          name="fade-In-alert"
          mode="out-in"
        >
          <svg
            class="w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 20.454"
          >
            <g
              id="Group_683"
              data-name="Group 683"
              transform="translate(231 10117)"
            >
              <path
                id="Union_1"
                class="
                  w-6
                  h-6
                  cursor-pointer
                  transition-all
                  duration-700
                  ease-in-out
                "
                :class="
                  newField.isCrossed
                    ? 'opacity-0 bell-fadeOut'
                    : 'opacity-100 bell-fadeIn'
                "
                data-name="Union 1"
                d="M7.01,18.517h3.98a1.991,1.991,0,0,1-3.98,0ZM0,17.533V16.5l2.12-2.065V8.766A6.734,6.734,0,0,1,7.41,2.25v-.7a1.591,1.591,0,0,1,3.181,0v.7A6.734,6.734,0,0,1,15.88,8.766v5.669L18,16.5v1.033Z"
                fill="#fcfcfc"
              />
              <path
                id="Union_2"
                class="transition-all duration-700 ease-in-out"
                :class="newField.isCrossed ? 'cross cursor-pointer' : 'plus'"
                data-name="Union 2"
                d="M3,8V5H0V3H3V0H5V3H8V5H5V8Z"
                :fill="newField.isCrossed ? '#fcfcfc' : '#a22a2a'"
              />
            </g>
          </svg>
        </transition>
      </div>
    </div>

    <div
      :class="
        currentComp === 'GeneralAlertSettings'
          ? 'flex w-full flex-col space-y-3'
          : 'flex flex-row space-x-2'
      "
    >
      <div
        :class="
          currentComp === 'GeneralAlertSettings'
            ? 'w-full emailTextTabGeneral'
            : ''
        "
      >
        <email-text-tab @update-input-tab="updateInputTab"></email-text-tab>
      </div>
      <div
        :id="newField.id"
        class="flex flex-row"
        :class="
          currentComp === 'GeneralAlertSettings'
            ? 'w-full space-x-4'
            : 'space-x-2'
        "
      >
        <email-input
          v-if="currentInputTabUpdate === 'Email'"
          :class="
            currentComp === 'GeneralAlertSettings'
              ? 'w-full alert_notify-email'
              : 'w-full new_alert_notify-email'
          "
          :color="'#434343'"
          :background="
            currentComp === 'GeneralAlertSettings' ? '#FFD6D6' : '#FCFCFC'
          "
          :place-holder="'Email'"
          :error="$v.newField.email.$error"
          :error-message="validationMsg($v.newField.email)"
          :value="newField.email"
          @input="checkEmail($event, newField.id)"
        ></email-input>
        <text-input
          v-else
          :class="
            currentComp === 'GeneralAlertSettings'
              ? 'w-full alert_notify-text'
              : 'w-full new_alert_notify-text'
          "
          :color="'#434343'"
          :background="
            currentComp === 'GeneralAlertSettings' ? '#FFD6D6' : '#FCFCFC'
          "
          :place-holder="'Text'"
          :error="$v.newField.text.$error"
          :error-message="validationMsg($v.newField.text)"
          :value="$v.newField.text.$model"
          @input="checkText($event, newField.id)"
        ></text-input>
        <div
          v-if="newField.isBellShow"
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
            newFieldIndex + 1 < members.length ? 'opacity-100' : 'opacity-50'
          "
          @click="$emit('assign-field')"
        >
          <transition
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
            name="fade-In-alert"
            mode="out-in"
          >
            <svg
              class="w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 20.454"
            >
              <g
                id="Group_683"
                data-name="Group 683"
                transform="translate(231 10117)"
              >
                <path
                  id="Union_1"
                  class="
                    w-6
                    h-6
                    cursor-pointer
                    transition-all
                    duration-500
                    ease-in-out
                  "
                  :class="
                    newFieldIndex === newFields - 1
                      ? 'opacity-100 bell-fadeIn'
                      : 'opacity-0 bell-fadeOut'
                  "
                  data-name="Union 1"
                  d="M7.01,18.517h3.98a1.991,1.991,0,0,1-3.98,0ZM0,17.533V16.5l2.12-2.065V8.766A6.734,6.734,0,0,1,7.41,2.25v-.7a1.591,1.591,0,0,1,3.181,0v.7A6.734,6.734,0,0,1,15.88,8.766v5.669L18,16.5v1.033Z"
                  fill="#fcfcfc"
                />
                <path
                  id="Union_2"
                  class="transition-all duration-500 ease-in-out"
                  :class="
                    newFieldIndex === newFields - 1
                      ? 'plus'
                      : 'cross cursor-pointer'
                  "
                  data-name="Union 2"
                  d="M3,8V5H0V3H3V0H5V3H8V5H5V8Z"
                  :fill="
                    newFieldIndex === newFields - 1 ? '#a22a2a' : '#fcfcfc'
                  "
                />
              </g>
            </svg>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { storeToRefs } from 'pinia'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import { defineComponent, getCurrentInstance } from '@nuxtjs/composition-api'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import EmailInput from '~/components/inputs/EmailInput.vue'
// import PlusBellIcon from '~/components/shared/icon/PlusBellIcon.vue'
import TextInput from '~/components/inputs/TextInput.vue'
import EmailTextTab from '~/components/alert/common-component/EmailTextTab.vue'
import { useAlert } from '~/stores/alert'
import SelectInput from '~/components/inputs/SelectInput'

export default defineComponent({
  components: {
    EmailInput,
    TextInput,
    // PlusBellIcon,
    EmailTextTab,
    SelectInput,
  },
  props: {
    newFieldIndex: {
      type: Number,
      default: 0,
    },
    newFields: {
      type: Number,
      default: 1,
    },
    newField: {
      type: Object,
      default: () => {},
    },
    members: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useAlert()
    const instance = getCurrentInstance()
    const { currentInputTab, showNewAlert, currentComp } = storeToRefs(store)

    const checkEmail = (event, id) => {
      instance.proxy.$v.newField.email.$model = event
      instance.emit('add-email', { email: event, id })
      console.log(event, id, instance, props.newField.email)
    }

    const checkText = (event, id) => {
      instance.proxy.$v.newField.text.$model = event
      instance.emit('add-text', { text: event, id })
      console.log(event, id)
    }

    return {
      currentInputTab,
      showNewAlert,
      currentComp,
      checkEmail,
      checkText,
      instance,
    }
  },

  data() {
    return {
      email: '',
      text: '',
      currentInputTabUpdate: 'Email',
    }
  },

  watch: {
    newField(data) {
      this.$v.$reset()
    },
  },

  validations: {
    newField: {
      email: {
        required,
        email,
      },
      text: {
        required,
        maxLength: maxLength(40),
      },
    },
  },

  methods: {
    validationMsg: validationMessage(validationMessages),
    updateInputTab(value) {
      this.currentInputTabUpdate = value
    },
    notifySelect(event, id) {
      this.$emit('current-notify-for', event, id)
    },
  },
})
</script>

<style scoped>
.min-w-40 {
  min-width: 40px;
}
.emailTextTabGeneral {
  text-align: -webkit-right;
}
.bell-fadeIn {
  transform-origin: center;
  transform: translate(-231px, -10117px) scale(1);
}
.bell-fadeOut {
  transform-origin: center;
  transform: translate(-231px, -10117px) scale(0);
}
.plus {
  transform-origin: center;
  transform: translate(-226px, -10111px) rotate(0deg) scale(1);
}
.cross {
  transform-origin: center;
  transform: translate(-233px, -10101px) rotate(45deg) scale(2);
}
.target-input {
  /* width: 224px; */
  width: 240px;
  height: 36px;
}
.target-alert-input {
  width: 190px;
  height: 40px;
}
@media (min-width: 1366px) and (max-width: 1439px) {
  .target-input {
    width: 200px;
  }
}
@media (max-width: 400px) {
  .target-input {
    width: 200px;
  }
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
</style>