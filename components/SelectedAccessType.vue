<template>
  <div class="selectType">
    <p class="text-gray-1100 text-lg pt-1 my-2 md:my-7">
      If you have access, select type:
    </p>

    <div
      class="
        flex flex-wrap
        space-x-4 space-y-4
        w-full
        justify-center
        button-wrapper
      "
    >
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style mt-4 ml-4"
      >
        Email
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style space-x-0 space-y-0 mt-4"
      >
        Social Media
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Website
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Text (Mobile)
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Chat
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Instant Message
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Voice
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Fax
      </button>
      <button
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="button-style"
      >
        Collaboration
      </button>
    </div>

    <button
      :style="{ color: globalColorPanel.backgroundColor }"
      class="text-lg cursor-pointer my-2 md:my-7"
    >
      Show all
    </button>

    <input
      id="source"
      :style="{ color: globalColorPanel.backgroundColor }"
      class="
        rounded-full
        w-full
        py-2
        px-2.5
        placeholder-opacity-50
        text-center
        outline-none
        focus:outline-none
        placeholder-dynamic-color
      "
      type="text"
      name="source"
      placeholder="Or, enter source name (e.g. “Twitter”)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SelectAccess',

  computed: {
    ...mapState(['globalColorPanel']),
  },
}
</script>

<style lang="scss" scoped>
$color: var(--color);
.button-style {
  @apply h-8 md:h-10 w-34 md:w-38 text-center leading-3 md:leading-5 whitespace-nowrap bg-white text-orange-600 font-bold rounded-full;
  color: $color;
}
.button-style:hover {
  color: #ffffff;
  background-color: $color;
}
.button-wrapper {
  margin-left: -9px !important;
}
.placeholder-dynamic-color::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(228, 128, 29, var(--color));
}
</style>
