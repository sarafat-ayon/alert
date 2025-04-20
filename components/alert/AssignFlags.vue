<template>
  <transition name="fadeIn">
    <div class="w-full flex items-center justify-between">
      <span class="text-gray-1200 text-xl"></span>
      <div
        class="flex items-center justify-end"
        :class="
          currentComp === 'GeneralAlertSettings' ? 'space-x-4' : 'space-x-2'
        "
      >
        <div
          v-if="length > 1"
          class="
            bg-offwhite-800
            text-red-deep
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
            currentComp === 'GeneralAlertSettings'
              ? 'border-2 border-red-deep'
              : 'border-0'
          "
        >
          <input
            class="
              inputTooltip
              w-5
              mr-1
              font-bold
              text-end
              transition-all
              duration-100
              ease-in-out
              text-center
            "
            :value="value"
            type="number"
            pattern="[0-9]"
            onkeypress="return !(event.charCode == 46)"
            min="1"
            max="99"
            @input="updateValue($event, id)"
            @keyup.enter="checkEnter"
            @keydown="checkKey($event)"
          />
          <span>%</span>
        </div>
        <div
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
                ? 'searchPageScrollStyle searchPageScrollWidth target-select-input'
                : 'searchPageScrollStyle searchPageScrollWidth target-select-input-alert'
            "
            :options="members"
            :value="flagFor"
            place-holder="Bob Rahman"
            :place-holder-disabled="true"
            color="#F8F8F8"
            background="#A22A2A"
            caret-bg="#A22A2A"
            scroll-color="#9e7912"
            @input="flagSelect($event, id)"
          ></select-input>
        </div>
        <div
          :id="id"
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
          @click.stop="length > 1 ? decrease(id) : $emit('increases')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="h-6 w-6 cursor-pointer"
          >
            <path
              fill="#fcfcfc"
              class="transition-all duration-700 ease-in-out"
              :class="isCrossed ? 'cross' : 'plus'"
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            />
          </svg>
        </div>

        <!-- <div
          v-if="currentComp === 'GeneralAlertSettings' && id === 0"
          :id="id"
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
          @click="$emit('increases')"
        >
          <fa
            class="text-white md:text-2xl text-2xl font-normal cursor-pointer"
            :icon="['fas', 'plus']"
          />
        </div>
        <div
          v-if="currentComp === 'GeneralAlertSettings' && id > 0"
          :id="id"
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
          @click="decrease(id)"
        >
          <fa
            class="text-white md:text-2xl text-2xl font-normal cursor-pointer"
            :icon="['fas', 'times']"
          />
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent } from '@nuxtjs/composition-api'
import SelectInput from '~/components/inputs/SelectInput'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    SelectInput,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    flagFor: {
      type: String,
      default: 'Bob Rahman',
    },
    isCrossed: {
      type: Boolean,
      default: false,
    },
    members: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = useAlert()
    const { showNewAlert, currentComp } = storeToRefs(store)

    // const members = [
    //   { id: 0, text: 'Bob Rahman', value: 'Bob Rahman' },
    //   { id: 1, text: 'Tommy Thompson', value: 'Tommy Thompson' },
    //   { id: 2, text: 'James Jamison', value: 'James Jamison' },
    //   { id: 3, text: 'Ryan Rjiani', value: 'Ryan Rjiani' },
    // ]
    // const member = ref('Bob Rahman')

    return {
      // members,
      // member,
      showNewAlert,
      currentComp,
    }
  },
  data() {
    return {
      inputValue: 0,
      currentId: 0,
      valueChanged: 0,
      isExponential: false,
    }
  },
  watch: {
    value(data) {
      if (data) {
        this.inputValue = this.value
      }
    },
  },
  methods: {
    showErrorToast(message) {
      this.$toast.clear()
      setTimeout(() => {
        this.$toast.error(message, {
          className: ['toasted-bg-alert'],
        })
      }, 200)
    },
    checkKey(e) {
      if (e.keyCode === 69) {
        this.isExponential = true
      }
    },
    updateValue(event, id) {
      if (
        parseInt(event.target.value) > 99 ||
        parseInt(event.target.value) < 1
      ) {
        this.showErrorToast('Enter a valid number 1 to 99')
        // this.$toast.error('Enter a valid number 1 to 99', {
        //   className: ['toasted-bg-alert'],
        // })
        if (event.target.value < 1) {
          event.target.value = 1
        } else {
          event.target.value = 99
        }
      }
      if (!this.isExponential) {
        this.inputValue = parseInt(event.target.value)
      } else {
        event.target.value = this.inputValue
        this.isExponential = false
      }
      this.currentId = id
    },
    flagSelect(event, id) {
      this.$emit('current-flag-for', event, id)
    },
    checkEnter() {
      if (
        isNaN(this.inputValue) ||
        this.inputValue < 1 ||
        this.inputValue >= 100
      ) {
        this.showErrorToast('Enter a valid number 1 to 99')
        // this.$toast.error('Enter a valid number 1 to 99', {
        //   className: ['toasted-bg-alert'],
        // })
      } else {
        this.$emit('change-value', this.inputValue, this.currentId, this.total)
      }
    },
    decrease(id) {
      this.$emit('decrease', id)
    },
  },
})
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
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
  height: 36px;
}
.target-alert-input {
  width: 190px;
  height: 40px;
}
.inputTooltip {
  outline: none;
}

.plus {
  transform-origin: center;
  transform: rotate(0deg) scale(1);
}
.cross {
  transform-origin: center;
  transform: rotate(45deg) scale(1);
}

@media (min-width: 1366px) and (max-width: 1568px) {
  .target-input {
    width: 168px;
  }
}
@media (max-width: 442px) {
  .target-input {
    width: 168px;
  }
}
</style>
