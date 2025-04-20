<template>
  <div
    class="message-card md:pl-10 md:pr-0 pl-7 py-3 md:flex-grow"
    :class="showSingleImagePost ? 'new-message-card' : ''"
    :style="{ '--height': detailsExpand ? `100%` : `${cardHeight}px` }"
  >
    <div
      class="flex flex-col scroll space-y-4 h-full pr-3"
      :class="showSingleImagePost ? 'md:pb-7' : ''"
    >
      <div
        v-if="showSingleImagePost"
        class="text-md pt-2 pb-1 bg-white sticky top-0 font-bold"
      >
        Details
      </div>
      <div class="w-full">
        <div v-if="article.provider === 'Twitter'" class="w-full">
          <span class="font-semibold">Message: </span>
          <span class="break-words" v-html="article.text"> </span>
        </div>
        <p v-else class="break-words">
          <span class="font-semibold">Message: </span
          >{{ article.text ? article.text : '' }}
        </p>
        <p
          v-if="
            article.provider === 'Facebook' || article.provider === 'LinkedIn'
          "
        >
          <span class="font-semibold">Type: </span>
          {{ article.type || article.category }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Status Type: </span>
          {{ article.statusType }}
        </p>
        <!-- <p>Text in Photo: Not detected</p> -->
        <p v-if="article.createdAt">
          <span class="font-semibold">Created:</span>
          <DateTime
            :datetime="article.createdAt"
            format="MMMM, dd yyyy, hh:mm aa"
            :show-time="false"
            class="whitespace-nowrap"
          />
        </p>
        <p v-if="article.updatedAt">
          <span class="font-semibold">Updated:</span>
          <DateTime
            :datetime="article.updatedAt"
            format="MMMM, dd yyyy, hh:mm aa"
            :show-time="false"
            class="whitespace-nowrap"
          />
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Location: </span
          >{{ article.placeName ? article.placeName : 'None' }}
        </p>
      </div>
      <div class="w-full mt-6">
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Caption: </span
          >{{ article.caption ? article.caption : 'None' }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Description: </span
          >{{ article.description ? article.description : 'None' }}
        </p>
        <p
          v-if="
            article.provider === 'Facebook' || article.provider === 'LinkedIn'
          "
        >
          <span class="font-semibold">Privacy: </span>
          {{
            article.visibility || article.privacy
              ? article.visibility || article.privacy
              : 'None'
          }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Shares Count: </span>
          {{ article.sharesCount }}
        </p>
        <p v-if="article.provider === 'LinkedIn'">
          <span class="font-semibold">Reactions Count: </span>
          {{ article.likesCount }}
        </p>
        <p v-if="article.provider === 'Twitter'">
          <span class="font-semibold">Comments Count: </span>
          {{ article.replyCount }}
        </p>
        <p v-if="article.provider === 'Twitter'">
          <span class="font-semibold">Retweet Count: </span>
          {{ article.retweetCount }}
        </p>
        <p v-if="article.provider === 'Twitter'">
          <span class="font-semibold">Reactions Count: </span>
          {{ article.likeCount }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Reactions Count: </span>
          {{ article.reactionsCount }}
        </p>
        <p v-if="article.provider === 'LinkedIn'">
          <span class="font-semibold">Comments Count: </span>
          {{ article.firstLevelCommentsCount }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Comments Count: </span>
          {{ article.commentsCount }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Published: </span>
          {{ article.isPublished ? 'Yes' : 'No' }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Expired: </span>
          {{ article.isExpired ? 'Yes' : 'No' }}
        </p>
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Hidden: </span>
          {{ article.isHidden ? 'Yes' : 'No' }}
        </p>
      </div>
      <div class="w-full mt-6">
        <p v-if="article.provider === 'Facebook'">
          <span class="font-semibold">Link Name: </span>
          {{ article.linkName ? article.linkName : 'None' }}
        </p>
        <!-- <p v-if="article.provider === 'Facebook'" class="break-all">
          Link Name:
          {{ article.link ? article.link : 'None' }}
        </p> -->
        <p v-if="article.provider === 'Facebook'" class="break-all">
          <span class="font-semibold">Facebook Photo Link: </span>
          {{ article.profileImageUrl ? article.profileImageUrl : 'None' }}
        </p>
        <p v-if="article.provider === 'Facebook'" class="break-all">
          <span class="font-semibold">Picture Link: </span>
          {{ article.fullPicture ? article.fullPicture : 'None' }}
        </p>
        <p v-if="article.provider === 'Facebook'" class="break-all">
          <span class="font-semibold">Attachment Link: </span>
          {{ article.attachmentUrl ? article.attachmentUrl : 'None' }}
        </p>
        <p v-if="article.provider === 'Facebook'" class="break-all">
          <span class="font-semibold">Facebook Post Link: </span>
          {{ article.facebookUrl ? article.facebookUrl : 'None' }}
        </p>
        <p v-if="article.provider === 'Facebook'" class="break-all">
          <span class="font-semibold">Souce Link: </span>
          {{ article.sourceUrl ? article.sourceUrl : 'None' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    cardHeight: {
      type: Number,
      default: 0,
    },
    article: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState('socialFeed', ['showSingleImagePost']),
    detailsExpand() {
      return this.$store.state.home.detailsExpand
    },
  },
}
</script>

<style lang="scss" scoped>
.message-card {
  @apply bg-white text-sm md:-ml-4 md:w-1/2 w-full;
  border-radius: 10px;
  //   min-width: 400px;
  //   max-width: 690px;
  height: var(--height);
  // min-height: 100%;
}
.new-message-card {
  @apply bg-white text-sm ml-0 w-full md:p-0 pb-5;
  border-radius: 0px;
  //   min-width: 400px;
  //   max-width: 690px;
  height: var(--height);
  padding-left: 16px;
  // min-height: 100%;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
</style>
