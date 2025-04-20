<template>
  <div class="text-gray-1200">
    <p class="mt-6">Add Note</p>
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
            bg-green-1100
            rounded-full
            mr-2.5
            outline-none
            font-bold
            md:text-base
            text-sm
          "
        >
          <span>Hold Flag</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>