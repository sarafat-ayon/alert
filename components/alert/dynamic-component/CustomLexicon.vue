<!-- eslint-disable vue/prop-name-casing -->
<template>
  <div class="flex flex-col px-3.5 md:px-5 pt-3 h-full w-full space-y-2">
    <div class="flex-grow flex flex-col space-y-4">
      <div
        v-for="CustomLexicon in CustomLexicons"
        :key="CustomLexicon.id"
        class="w-full last-padding"
      >
        <div class="w-full flex flex-row items-start space-x-2">
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
              :id="`custom ${CustomLexicon.id}`"
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
              :for="`custom ${CustomLexicon.id}`"
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
            class="text-gray-1200 text-lg cursor-pointer label-line-height"
            @click="openCustomLexicons(CustomLexicon.id)"
            >{{ CustomLexicon.text }} ({{ CustomLexicon.number }})
          </label>
        </div>

        <transition-group name="fadeIn" mode="out-in">
          <ProgressBar
            v-if="CustomLexicon.selected.value === true"
            key="progressBar"
            class="mt-5"
            :bar-id="`custom ${CustomLexicon.id}`"
            :current-value="CustomLexicon.number"
          />
          <p
            v-if="CustomLexicon.selected.value === true"
            key="description"
            class="text-gray-1700 text-base md:text-xl pt-1.5 mt-5"
          >
            {{ CustomLexicon.description }}
          </p>
        </transition-group>
      </div>
    </div>
    <div class="footer-height">
      <div class="flex items-center mt-2 space-x-2">
        <input
          v-model="$v.text.$model"
          type="text"
          class="
            w-3/4
            flex-grow
            h-10
            outline-none
            border-none
            px-4
            text-base
            md:text-lg
            bg-red-deep
            text-offwhite-800
            placeholder-style
            rounded-full
          "
          style=""
          placeholder="Add Custom Lexicon"
          @keyup.enter="submitData"
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
          @click="submitData"
          @blur="$v.text.$touch()"
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
            relative
          "
        >
          <input
            ref="fileInput"
            class="w-8 h-8 rounded-full absolute opacity-0"
            type="file"
            @change="onFilePicked"
          />
          <fa class="w-5 h-5" :icon="['fas', 'paperclip']" />
        </div>
      </div>
      <div v-if="$v.text.$error">
        <p class="text-red-500 text-xs px-4">
          {{ validationMsg($v.text) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { defineComponent } from '@nuxtjs/composition-api'
import { validationMessage } from 'vuelidate-messages'
import ProgressBar from '~/components/alert/progress-bar/ProgressBar.vue'
import { validationMessages } from '@/utils/validations'

export default defineComponent({
  components: {
    ProgressBar,
  },

  props: {
    CustomLexicons: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['expand-collapse'],

  setup(props, context) {
    const openCustomLexicons = (value) => {
      context.emit('expand-collapse', value)
    }

    return {
      openCustomLexicons,
      validationMessage,
      validationMessages,
    }
  },
  data() {
    return {
      excelFile: '',
      text: '',
    }
  },
  validations: {
    text: {
      required,
    },
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    submitData() {
      if (!this.$v.$invalid) {
        this.$emit('Add-lexicon', this.text)
      }
      this.text = ''
      this.$v.$reset()
    },
    onFilePicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.fileUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.excelFile = files[0]
      this.fileName = this.excelFile.name
      this.$emit('file-name', this.excelFile.name)
    },
  },
})
</script>

<style lang="scss" scoped>
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
.label-line-height {
  line-height: 20.5px;
}

.footer-height {
  // height: 70px;
  padding-bottom: 20px;
}

.min-w-40 {
  min-width: 40px;
}

input.placeholder-style::-webkit-input-placeholder {
  font-style: italic;
  color: #fcfcfc;
}

input.placeholder-style::-moz-placeholder {
  font-style: italic;
  color: #fcfcfc;
}
.toggle-checkbox {
  width: 16px;
  min-width: 16px;
  height: 16px;
  border: 0px;
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
</style>
