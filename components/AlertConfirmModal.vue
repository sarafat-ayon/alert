<template>
  <div
    v-if="show"
    class="
      font-sans
      antialiased
      fixed
      md:bottom-0
      bottom-1/3
      inset-x-0
      px-4
      pb-4
      sm:inset-0 sm:flex sm:items-center sm:justify-center
      transition-all
      zindex
    "
  >
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
    </div>

    <div
      class="
        bg-offgray
        rounded-lg
        overflow-hidden
        shadow-xl
        transform
        transition-all
        sm:max-w-lg sm:w-full
      "
    >
      <div class="absolute top-2 right-2 px-4">
        <fa
          class="text-2xl cursor-pointer"
          :class="topExitBtnColor"
          :icon="['fas', 'times']"
          @click="cancel"
        />
      </div>
      <div class="md:px-4 md:py-7 p-6 pb-4">
        <div class="flex items-center flex-col">
          <div
            class="flex h-12 w-12 rounded-full sm:mx-0 sm:h-15 sm:w-15 sm:mb-5"
          >
            <img :src="AlertInfoIcon" alt="" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:text-center">
            <h3 class="text-lg leading-6 font-medium text-white">
              {{ title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-white opacity-50">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!modalFromPayment"
        class="
          px-4
          py-3
          sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center sm:mb-5
        "
      >
        <span class="flex w-full rounded-md shadow-sm sm:ml-3.5 sm:w-auto">
          <button
            type="button"
            class="
              w-full
              sm:w-38
              h-10
              py-2
              px-4
              rounded-full
              border-0
              outline-none
              focus:outline-none
              text-base
              setup
              text-white
              inline-flex
              justify-center
              items-center
              leading-6
              font-bold
              shadow-sm
              bg-red-1200
            "
            :disabled="processing"
            @click="destroy"
          >
            {{ confirmBtnText }}
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            type="button"
            class="
              w-full
              sm:w-38
              h-10
              py-2
              px-4
              rounded-full
              border-2 border-white
              outline-none
              focus:outline-none
              text-base
              setup
              text-white
              inline-flex
              justify-center
              items-center
              leading-6
              font-bold
              shadow-sm
            "
            @click="cancel"
          >
            {{ cancelBtnText }}
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AlertInfoIcon from '~/assets/img/png/question.png'

export default {
  name: 'AlertConfirmModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    processing: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default:
        "This action can't be undone, and you will be unable to recover.",
    },
    title: {
      type: String,
      default: 'Are you sure to delete this?',
    },
    confirmBtnText: {
      type: String,
      default: 'Delete',
    },
    cancelBtnText: {
      type: String,
      default: 'Cancel',
    },
    topExitBtnColor: {
      type: String,
      default: 'text-white',
    },
    modalFromPayment: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      AlertInfoIcon,
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    destroy() {
      this.$emit('delete')
    },
  },
}
</script>

<style scoped>
.zindex {
  z-index: 999999999999;
}
</style>
