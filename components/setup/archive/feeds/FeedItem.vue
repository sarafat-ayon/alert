<template>
  <div :class="bgColor" class="feed-single-item" @click="select(feed)">
    <section class="feed-left">
      <img class="avatar" :src="socialIcon" alt="" />
      <img class="avatar" :src="feed.profileIcon" alt="" />
    </section>
    <section class="feed-right">
      <h3 class="2xl:text-md text-sm text-ash-dark font-normal" :title="feed.socialName">
        {{ feed.socialName | strLimit(25) }}
      </h3>
      <p class="2xl:text-sm text-xs text-ash-dark opacity-50">
        @{{ feed.socialId | strLimit(25) }}
      </p>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {getSocialIcon} from "~/utils";
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
  data(){
    return {}
  },
  computed: {
    socialIcon(){
      return getSocialIcon(this.feed)
    }
  },
  methods: {
    ...mapActions('feeds', ['select']),
  },
}
</script>

<style lang="scss" scoped>
.feed-single-item {
  @apply w-full cursor-pointer flex items-center justify-between space-x-2 rounded-md md:p-2 p-1;
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
</style>
