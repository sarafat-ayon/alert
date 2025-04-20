<template>
  <div class="flex flex-col px-3.5 md:px-5 py-3 h-full w-full space-y-2">
    <div
      v-for="sALexicon in sALexicons"
      :key="sALexicon.id"
      class="w-full last-padding"
    >
        <div class="w-full flex flex-row items-start space-x-2 mt-2">
        <div
          class="relative inline-block w-9 align-middle select-none transition-all duration-800 ease-in-out"
        >
          <input
            :id="`coverup ${sALexicon.id}`"
            type="checkbox"
            checked
            name="toggle"
            class="toggle-checkbox absolute block rounded-full bg-red-deep appearance-none cursor-pointer"
          />
          <label
            :for="`coverup ${sALexicon.id}`"
            class="toggle-label checkbox-label block overflow-hidden h-5 rounded-full transition-all duration-800 ease-in-out bg-ash-default cursor-pointer"
          ></label>
        </div>
        <label
          for="Components"
          class="label-line-height text-gray-1200 text-lg cursor-pointer"
          @click="openSALexicons(sALexicon.id)"
          >{{ sALexicon.text }}
        </label>
      </div>

      <transition-group name="fadeIn" mode="out-in">
        <ProgressBar
          v-if="sALexicon.selected.value === true"
          key="progressBar"
          class="mt-5"
          :bar-id="`sharpArchive${sALexicon.id}`"
          :current-value="sALexicon.number"
        />
        <p
          v-if="sALexicon.selected.value === true"
          key="description"
          class="text-gray-1700 text-base md:text-xl pt-1.5 mt-5"
        >
          {{ sALexicon.description }}
        </p>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ProgressBar from '~/components/alert/progress-bar/ProgressBar.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    ProgressBar,
  },

  props: {
    sALexicons: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['sa-expand-collapse'],

  setup(props, context) {
    const store = useAlert()

    const openSALexicons = (id) => {
      context.emit('sa-expand-collapse', id)
    }

    return {
      store,
      openSALexicons,
    }
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
.label-line-height{
  line-height:20.5px;
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

.last-padding:last-child {
  @apply pb-2;
}
</style>
