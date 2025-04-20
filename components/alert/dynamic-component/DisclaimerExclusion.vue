<template>
  <div class="px-5 pb-3 h-full flex flex-col space-y-2 w-full">
    <div>
      <p class="text-base md:text-xl text-red-deep pt-3 pb-1 font-bold">
        Sharp Archive Library
      </p>
    </div>
    <div
      v-for="(SALibrary, SALibraryIndex) in SALibraries"
      :key="SALibraryIndex"
      class="w-full"
    >
      <div class="w-full flex flex-row items-start space-x-2 my-2">
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
            :id="SALibrary.label"
            type="checkbox"
            checked
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
            :for="SALibrary.label"
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
              bg-ash-default
              cursor-pointer
            "
          ></label>
        </div>
        <label
          for="Components"
          class="text-gray-1200 text-base md:text-lg label-line-height"
          >{{ SALibrary.text }}</label
        >
      </div>
    </div>

    <div>
      <p class="text-base md:text-xl text-red-deep pt-3 pb-1 font-bold">
        Custom Exclusions
      </p>
    </div>
    <div
      v-for="(SAExclusion, SAExclusionIndex) in SAExclusions"
      :key="'de' + SAExclusionIndex"
      class="w-full"
    >
      <div class="w-full flex flex-row items-start space-x-2 mt-2">
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
            :id="SAExclusion.label"
            type="checkbox"
            checked
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
            :for="SAExclusion.label"
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
              bg-ash-default
              cursor-pointer
            "
          ></label>
        </div>
        <label
          for="Components"
          class="text-gray-1200 text-base md:text-lg label-line-height"
          >{{ SAExclusion.text }}</label
        >
      </div>
    </div>
    <div class="flex justify-center py-4">
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
        @click="toggleAddCustomExclusion"
      >
        <fa class="w-5 h-5" :icon="['fas', isVisible ? 'minus' : 'plus']" />
      </div>
    </div>
    <div>
      <div
        class="bottom-padding transition-all duration-1000 ease-in-out"
        :class="
          isVisible
            ? 'maximum-height overflow-hidden  opacity-100'
            : 'initial-height overflow-hidden  opacity-0'
        "
      >
        <p class="text-base md:text-xl text-red-deep pb-2 font-bold">
          Add Custom Exclusion
        </p>
        <div class="mb-3">
          <p class="text-gray-1200 text-base md:text-lg font-bold mb-2">Name</p>
          <text-input
            v-model="$v.name.$model"
            class="w-full new-alert-text"
            :color="'#656565'"
            :background="'#FFD6D6'"
            :place-holder="'Jon Dou'"
            @keyup.enter="AddNewCustomExclusion"
          ></text-input>
          <div v-if="$v.name.$error">
            <p class="text-red-500 text-xs px-4">
              {{ validationMsg($v.name) }}
            </p>
          </div>
        </div>
        <div>
          <p class="text-gray-1200 text-base md:text-lg font-bold mb-2">
            Disclosure Text
          </p>
          <text-input
            v-model="$v.text.$model"
            class="w-full new-alert-text"
            :color="'#656565'"
            :background="'#FFD6D6'"
            :place-holder="'Disclosure Text'"
          ></text-input>
        </div>
        <div class="flex justify-center items-center space-x-7 sm:space-x-10 mt-20">
          <button
            class="
              w-32
              sm:w-44
              h-9
              flex
              items-center
              justify-center
              border-2
              border-red-deep
              rounded-3xl
              text-red-deep
              font-bolder
            "
            @click="toggleAddCustomExclusion"
          >
            Cancel
          </button>
          <button
            class="
              w-32
              sm:w-44
              h-9
              flex
              items-center
              justify-center
              bg-red-deep
              rounded-3xl
              text-white
              font-bolder
            "
            @click="AddNewCustomExclusion"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { required, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
// import EmailInput from '~/components/inputs/EmailInput.vue'
import TextInput from '~/components/inputs/TextInput.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    TextInput,
  },
  setup() {
    const store = useAlert()

    const name = ref('')

    const text = ref('')

    const isVisible = ref(false)

    const toggleAddCustomExclusion = () => {
      isVisible.value = !isVisible.value
    }

    const SALibraries = [
      {
        id: 1,
        label: 'email',
        text: 'Confidential Email',
        selected: ref(false),
      },
      {
        id: 2,
        label: 'offers',
        text: 'Compare Offers',
        selected: ref(false),
      },
      {
        id: 3,
        label: 'message',
        text: 'Message by Mistake',
        selected: ref(false),
      },
      {
        id: 4,
        label: 'groups',
        text: 'Industry Groups',
        selected: ref(false),
      },
      {
        id: 5,
        label: 'copyright',
        text: 'Copyright',
        selected: ref(false),
      },
      {
        id: 6,
        label: 'opinions',
        text: 'Views and Opinions',
        selected: ref(false),
      },
      {
        id: 7,
        label: 'industries',
        text: 'Industries (FDIC, SIPC, SEC, RIA)',
        selected: ref(false),
      },
      {
        id: 8,
        label: 'contact',
        text: 'Legally Binding Contact',
        selected: ref(false),
      },
    ]

    const SAExclusions = ref([
      {
        id: 1,
        label: 'fargo',
        text: 'Wells Fargo',
        selected: ref(false),
      },
      {
        id: 2,
        label: 'disclosure',
        text: 'Internal Disclosure',
        selected: ref(false),
      },
    ])

    return {
      store,
      SALibraries,
      SAExclusions,
      name,
      text,
      TextInput,
      isVisible,
      toggleAddCustomExclusion,
    }
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    AddNewCustomExclusion() {
      if (this.name !== '') {
        this.SAExclusions.push({
          id: this.SAExclusions.length + 1,
          label: this.name.toLowerCase(),
          text: this.name,
          selected: false,
        })
        this.name = ''
        this.$v.$reset()
      }
    },
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(40),
    },
    text: {
      required,
      maxLength: maxLength(40),
    },
  },
})
</script>


<style lang="scss" scoped>
.outline-red-deep {
  outline: 4px solid #a22a2a;
}

.initial-height {
  max-height: 0;
}

.bottom-padding {
  padding-bottom: 14px;
}

.maximum-height {
  max-height: 332px;
}

.label-line-height {
  line-height: 20.5px;
}

.min-w-340 {
  min-width: 340px;
  // max-width: 340px;
}

.w-70 {
  width: 70%;
}

.min-w {
  &-40 {
    min-width: 40px;
  }
}

.toggle-checkbox {
  width: 16px;
  min-width: 16px;
  height: 16px;
  // bid: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &.toggle.label {
    min-width: 36px !important;
  }
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #a22a2a;
    min-width: 36px;
  }
}
.checkbox-label {
  min-width: 36px !important;
}

.in-out-checkbox {
  transition: all 0.5s ease-in-out;
  &:checked + .toggle-label {
    @apply bg-red-deep text-white;
    transition: all 0.5s ease-in-out;
  }
}

.toggle-check-1 {
  &:checked {
    @apply bg-white;
  }
  &:checked + .check-1 {
    @apply text-red-deep opacity-100;
  }
}
</style>
