<template>
  <div class="px-5 pb-3 h-full flex flex-col space-y-2 w-full">
    <div>
      <p class="text-base md:text-xl text-red-deep py-3 font-bold">
        Flag Review Service
      </p>
    </div>
    <div
      v-for="SAReviewService in SAReviewServices"
      :key="SAReviewService.id"
      class="w-full"
    >
      <div class="flex justify-between align-center">
        <p class="text-gray-1200 text-base md:text-lg">
          {{ SAReviewService.text }}
        </p>
        <p class="text-gray-1200 text-base md:text-lg">
          {{ SAReviewService.amount }}
        </p>
      </div>
    </div>
    <div class="flex justify-end">
      <a href="#" class="text-base md:text-lg text-red-deep py-1 font-bold"
        >Learn More</a
      >
    </div>
    <div>
      <p
        class="text-base md:text-xl text-red-deep pt-3 pb-1.5 md:py-3 font-bold"
      >
        System Settings
      </p>
    </div>
    <div class="w-full flex items-center justify-between pb-4">
      <span class="text-gray-1200 text-base md:text-xl"
        >Minimum Character Amount for Notes</span
      >
      <div class="flex flex-row space-x-2">
        <div
          class="
            relative
            inline-block
            w-9
            h-5
            mt-0
            md:mt-1.5
            align-middle
            select-none
            transition-all
            duration-800
            ease-in-out
          "
        >
          <input
            id="character"
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
            for="character"
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
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {},
  setup() {
    const store = useAlert()

    const SAReviewServices = [
      {
        id: 1,
        text: 'Average Cost Per Flag',
        amount: '$3.21',
      },
      {
        id: 2,
        text: 'Additional Monthly Cost',
        amount: '$421.74',
      },
      {
        id: 3,
        text: 'Average Response Time',
        amount: '00.12',
      },
      {
        id: 4,
        text: 'Accuracy',
        amount: '96%',
      },
    ]

    return {
      store,
      SAReviewServices,
    }
  },
})
</script>


<style lang="scss" scoped>
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
