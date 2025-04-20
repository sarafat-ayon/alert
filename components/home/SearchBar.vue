<template>
  <div class="bg-white rounded-full lg:w-1/3 flex flex-row items-center">
    <fa class="text-yellow-600 mr-2 ml-3" :icon="['fas', 'search']" />
    <input
      v-model="searchText"
      :placeholder="placeholder"
      class="
        flex-auto
        rounded-r-full
        text-lg
        focus:outline-none
        pb-0.5
        pt-1.5
        md:py-1.5
        text-orange-dark
        placeholder-orange-light
      "
      @keypress.enter="submit()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      placeholder: 'Search',
    }
  },
  watch: {
    searchText(value) {
      this.$emit('search', value)

      if (value.length === 0) {
        this.submit()
      }
    },
  },
  methods: {
    submit() {
      this.$emit('clickSearch', this.searchText)
    },
  },
}
</script>

<style scoped>
input::placeholder {
  opacity: 0.5;
  font-size: 18px;
}
</style>
