<template>
  <div v-if="comment" class="w-full">
    <div class="flex flex-row lg:px-5 md:px-4 w-full">
      <img
        class="commnetImg"
        :src="[
          comment.profileImageUrl
            ? comment.profileImageUrl
            : $store.state.defaultImg,
        ]"
        alt=""
      />
      <div class="w-full">
        <div class="bg-offwhite-200 p-3 rounded-sm w-full">
          <div class="break-words">
            <div class="flex flex-wrap justify-between w-full">
              <h2
                v-if="comment.name"
                class="text-ash-primary text-md mb-3 break-all"
              >
                {{ comment.name }}
                <!-- <span class="text-gray-1700">3rd+</span> -->
              </h2>
              <div class="text-right" :class="comment.name ? '' : 'w-full'">
                <span class="text-gray-1700">{{
                  comment.createdAt | diffForHumansShortFlag
                }}</span>
                <!-- <span class="font-weight-bold">
                  <fa
                    class="text-ash-primary text-sm cursor-pointer"
                    :icon="['fas', 'ellipsis-h']"
                  />
                </span> -->
              </div>
            </div>
            <div v-if="comment.userName" class="text-gray-1700 mb-3 break-all">
              {{ comment.userName }}
            </div>
            <div
              v-if="comment.text"
              v-see-more="200"
              class="text-ash-primary text-md mb-3 break-all"
              v-html="comment.text"
            ></div>
            <div v-if="comment.mediaUrls[0]">
              <img class="commentable-img" :src="comment.mediaUrls[0]" alt="" />
            </div>
          </div>
        </div>
        <div class="w-full lg:px-1 md:px-0 px-1">
          <div class="w-full space-x-1 flex flex-row py-1">
            <linkedInTube class="md:w-4 md:h-4 w-4 h-4 md:mt-px" />
            <LinkedInLike class="md:w-4 md:h-4 w-4 h-4 md:mt-px" />
            <span class="text-gray-1700 md:text-sm text-xs">{{
              comment.likesCount ? comment.likesCount : 0
            }}</span>
            <span class="text-gray-1700 lg:px-2 md:px-0 px-2 md:text-sm text-xs"
              >|</span
            >
            <span class="text-gray-1700 md:text-sm text-xs"
              >{{
                comment.aggregatedCommentsCount
                  ? comment.aggregatedCommentsCount
                  : 0
              }}
              Replies</span
            >
          </div>
        </div>
        <comment-replies
          v-if="comment.aggregatedCommentsCount > 0"
          :comments="comment.comments"
        ></comment-replies>
      </div>
    </div>
  </div>
</template>

<script>
import CommentReplies from './Replies.vue'
import linkedInTube from '~/components/shared/icon/linkedInTube.vue'
import LinkedInLike from '~/components/shared/icon/LinkedInLike.vue'

export default {
  name: 'Comment',
  // eslint-disable-next-line vue/no-unused-components
  components: { linkedInTube, LinkedInLike, CommentReplies },
  props: {
    comment: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.commnetImg {
  width: 50px;
  height: 50px;
}
.commentable-img {
  width: 100px;
  height: 100px;
}
</style>