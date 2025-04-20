<template>
  <div class="flex my-8">
    <img
      class="w-10 h-10 mr-3 rounded-full"
      :src="
        comment.profileImageUrl
          ? comment.profileImageUrl
          : $store.state.defaultImg
      "
      alt=""
    />
    <div>
      <div class="px-4 py-2 font-medium bg-offwhite-200 rounded-2xl">
        <a
          v-if="comment.facebookUrl"
          :href="comment.facebookUrl"
          target="_blank"
          class="text-ash-dark hover:text-blue-500 hover:underline"
        >
          <span v-if="comment.name" class="font-normal"
            >{{ comment.name }}
          </span>
        </a>
        <!-- <span class="font-bold"> - </span>
        <span v-if="comment.createdAt" class="text-ash-dark">
          <date-time
            :show-time="false"
            :datetime="comment.createdAt"
          ></date-time>
        </span> -->
        <p
          v-if="comment.text"
          v-nameIndicator="messageTagNames(comment.messageTags)"
          v-see-more.right="200"
          class="text-lg font-normal text-ash-dark"
          v-html="comment.text"
        ></p>
        <!-- <div id="fb-root"></div>
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0&appId=482095120000076&autoLogAppEvents=1"
          nonce="ms5VurmK"
        ></script> -->
      </div>
      <img
        v-if="
          (comment.type === 'photo' ||
            comment.type === 'animated_image_share') &&
          (comment.archivedSourceUrl || comment.sourceUrl)
        "
        class="w-38 h-auto rounded-2xl mt-1 border shadow-sm"
        :src="
          comment.archivedSourceUrl
            ? comment.archivedSourceUrl
            : comment.sourceUrl
        "
        alt=""
      />
      <img
        v-if="comment.type === 'sticker' && comment.attachmentUrl"
        class="w-38 h-auto rounded-2xl mt-1 border shadow-sm"
        :src="comment.attachmentUrl"
        alt=""
      />
      <iframe
        v-else-if="comment.type === 'video_inline'"
        class="rounded-2xl mt-1"
        :src="`https://www.facebook.com/plugins/video.php?height=200&href=${comment.attachmentUrl}%2F&show_text=false&width=300&t=0`"
        width="300"
        height="200"
        style="border: none; overflow: hidden"
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
      <!-- </div> -->
      <replies v-if="comment.commentsCount" :comments="comment.comments">
        0"></replies
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Replies from './Replies.vue'

export default defineComponent({
  name: 'FacebookComment',
  components: {
    Replies,
  },
  props: {
    comment: {
      type: Object,
      default: null,
    },
  },
  setup() {
    function messageTagNames(payload) {
      let names = []
      if (payload) {
        const profile = JSON.parse(payload)
        names = profile.map((item) => {
          return item.name
        })
      }
      return names
    }
    return { messageTagNames }
  },
})
</script>
