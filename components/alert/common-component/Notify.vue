<template>
  <div class="w-full flex flex-col">
    <!-- <span class="text-gray-1200 text-xl"></span> -->
    <div
      class="flex items-center justify-end"
      :class="
        currentComp === 'GeneralAlertSettings' ? 'space-x-4' : 'space-x-2'
      "
    >
      <transition name="fadeIn">
        <div
          v-if="newNotifies > 0"
          :id="id"
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
            :value="notifyFor"
            :options="members"
            place-holder="Bob Rahman"
            :place-holder-disabled="true"
            color="#F8F8F8"
            background="#A22A2A"
            caret-bg="#A22A2A"
            scroll-color="#9e7912"
            @input="notifySelect($event, id)"
          ></select-input>
        </div>
      </transition>

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
          cursor-pointer
        "
        @click.stop="newNotifies > 0 ? $emit('decrease') : $emit('increase')"
      >
        <!-- <transition
          class="w-10 min-w-40 h-10 rounded-full bg-red-deep text-white flex justify-center items-center"
          name="fade-In-time"
          mode="out-in"
        >
          <fa
            v-if="newNotifies > 0"
            key="times"
            class="text-white md:text-2xl text-2xl font-normal cursor-pointer"
            :icon="['fas', 'times']"
          />
        </transition>-->
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
          <!-- :class="newNotifies > 0 ? 'w-10 h-10' : 'w-6 h-6'" -->
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
                  newNotifies > 0
                    ? 'opacity-0 bell-fadeOut'
                    : 'opacity-100 bell-fadeIn'
                "
                data-name="Union 1"
                d="M7.01,18.517h3.98a1.991,1.991,0,0,1-3.98,0ZM0,17.533V16.5l2.12-2.065V8.766A6.734,6.734,0,0,1,7.41,2.25v-.7a1.591,1.591,0,0,1,3.181,0v.7A6.734,6.734,0,0,1,15.88,8.766v5.669L18,16.5v1.033Z"
                fill="#fcfcfc"
              />
              <path
                id="Union_2"
                class="transition-all duration-500 ease-in-out"
                :class="newNotifies > 0 ? 'cross cursor-pointer' : 'plus'"
                data-name="Union 2"
                d="M3,8V5H0V3H3V0H5V3H8V5H5V8Z"
                :fill="newNotifies > 0 ? '#fcfcfc' : '#a22a2a'"
              />
            </g>
          </svg>
          <!-- <plus-bell-icon v-if="newNotifies === 0" key="bell" class="w-6 h-6 cursor-pointer"></plus-bell-icon> -->
        </transition>
      </div>
    </div>
    <div
      v-if="currentComp === 'GeneralAlertSettings'"
      class="w-full flex justify-between items-center fadeIn_Animation"
    >
      <span class="text-gray-1200 text-xl"></span>
      <!-- <email-text></email-text> -->
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import SelectInput from '~/components/inputs/SelectInput'
// import PlusBellIcon from '~/components/shared/icon/PlusBellIcon.vue'
// import EmailText from '~/components/alert/common-component/EmailTextTab.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    SelectInput,
    // PlusBellIcon,
    // EmailText,
  },
  props: {
    newNotifies: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
    notifyFor: {
      type: String,
      default: 'Bob Rahman',
    },
    members: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = useAlert()

    const { showNewAlert, currentComp } = storeToRefs(store)

    return {
      showNewAlert,
      currentComp,
    }
  },
  methods: {
    notifySelect(event, id) {
      this.$emit('first-notify-for', event, id)
    },
  },
})
</script>

<style scoped>
/* for FadeIn FadeOut */
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

.fade-In-alert-enter-active,
.fade-In-alert-leave-active {
  transition: all 0.3s;
}
.fade-In-alert-enter,
.fade-In-alert-leave-to {
  opacity: 0;
}
.fade-In-alert-enter-active {
  transition-delay: 1s;
}
.fade-In-time-enter-active,
.fade-In-time-leave-active {
  transform: rotate(180deg);
  transition: all 0.3s;
}
.fade-In-time-enter,
.fade-In-time-leave-to {
  opacity: 0;
  transform: rotate(45deg);
}
.fade-In-time-enter-active {
  transition-delay: 1s;
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
</style>