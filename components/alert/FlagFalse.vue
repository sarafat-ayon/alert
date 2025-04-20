<template>
  <div class="text-gray-1200">
    <div class="flex justify-between">
      <div>Reason</div>
      <div ref="dropdown" class="dropdown-width text-left">
        <select-input
          v-model="quote"
          class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input-alert text-base"
          :options="quotes"
          place-holder="User quoting someone else"
          :place-holder-disabled="true"
          color="#393E46"
          background="#FFF"
          caret-bg="#FFF"
          caret-color="#393E46"
          scroll-color="#9e7912"
        ></select-input>
      </div>
    </div>
    <p>Add Note</p>
    <textarea
      id="addNote"
      name="addNote"
      cols="30"
      rows="7"
      class="
        w-full
        mt-3
        mb-4
        pt-2
        px-5
        h-full
        resize-none
        rounded-2xl
        placeholder-gray-1200 placeholder-opacity-50
        text-gray-1200
        bg-white
        border-white
        outline-none
        border-none
      "
      placeholder="Lorem Ipsum is simply dummy text"
    >
    </textarea>
    <div>
      <div class="flex flex-row justify-end md:space-x-5 space-x-2">
        <button
          class="
            focus:outline-none
            w-44
            h-10
            rounded-full
            mr-2.5
            border-2
            border-gray-1200
            outline-none
            font-bold
            md:text-base
            text-sm
          "
        >
          <span>Cancel</span>
        </button>
        <button
          class="
            focus:outline-none
            w-44
            h-10
            text-white
            bg-red-deep
            rounded-full
            mr-2.5
            outline-none
            font-bold
            md:text-base
            text-sm
          "
        >
          <span>Close Flag</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SelectInput from '~/components/inputs/SelectInput'
export default defineComponent({
  components: {
    SelectInput,
  },
  setup() {
    const quotes = [
      { id: 0, text: 'User quoting someone else', value: 0 },
      { id: 1, text: 'quote 1', value: 1 },
      { id: 2, text: 'quote 2', value: 2 },
      { id: 3, text: 'quote 3', value: 3 },
    ]
    const quote = ref('User quoting someone else')
    return {
      quotes,
      quote,
    }
  },
})
</script>

<style lang="scss" scoped>
.dropdown-btn {
  //direction: ltr;
  line-height: 2.15rem !important;
  width: 360px;
  @apply text-ash-default bg-white h-10 px-3 text-lg flex justify-between items-center focus:outline-none;
}
.dropdown-width {
  width: 360px;
}
</style>