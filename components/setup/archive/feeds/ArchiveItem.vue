<template>
  <div class="feed-single-item">
    <section class="feed-left">
      <img class="avatar" :src="socialIcon" alt="" />
      <img class="avatar" :src="feed.profileIcon" alt="" />
    </section>
    <section class="feed-right">
      <h3
        class="2xl:text-md text-sm text-ash-dark font-normal"
        :title="feed.socialName"
      >
        {{ feed.socialName | strLimit(20) }}
      </h3>
      <p class="2xl:text-sm text-xs text-ash-dark opacity-50">
        @{{ feed.socialId | strLimit(20) }}
      </p>
    </section>
    <button @click="remove(feed)">
      <fa
        class="
          text-orange-lightness
          opacity-50
          text-2xl
          font-normal
          cursor-pointer
        "
        :icon="['fas', 'times']"
      />
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getSocialIcon } from '~/utils'
export default {
  name: 'FeedItem',
  props: {
    feed: {
      type: Object,
      required: true,
    },
    bgColor: {
      type: String,
      default: 'bg-white',
    },
  },
  data() {
    return {}
  },
  computed: {
    socialIcon() {
      return getSocialIcon(this.feed)
    },
  },
  methods: {
    ...mapActions('feeds', ['remove']),
  },
}
</script>

<style lang="scss" scoped>
.feed-single-item {
  @apply w-full cursor-pointer flex items-center justify-between space-x-2 rounded-md p-2 bg-green-200;
  .feed-left {
    @apply flex space-x-1 items-center;
    .avatar {
      @apply md:w-8 md:h-8 w-5 h-5 rounded-full object-cover;
    }
  }
  .feed-right {
    @apply flex-grow text-left;
  }
}
button{
  margin-top: 5px;
}
</style>
