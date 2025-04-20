<template>
  <div class="w-full h-full">
    <carousel
      v-if="
        attachment.mimeType === 'image/jpeg' ||
        attachment.mimeType === 'image/svg+xml' ||
        attachment.mimeType === 'image/png' ||
        attachment.mimeType === 'image/webp' ||
        attachment.mimeType === 'image/bmp' ||
        attachment.mimeType === 'application/pdf'
      "
      :autoplay="false"
      autoplay-direction="forward"
      autoplay-hover-pause
      :autoplay-timeout="2000"
      :per-page="1"
      loop
      pagination-active-color="#ffffff"
      pagination-color="#808286"
      :navigation-click-target-size="10"
      :pagination-padding="3"
      :pagination-size="14"
      pagination-position="bottom-overlay"
      :navigation-enabled="true"
      :navigation-next-label="Next"
      :navigation-prev-label="Prev"
      :navigate-to="index"
      :center-mode="true"
      :mouse-drag="false"
      class="
        mt-0
        object-contain
        h-full
        origin-center
        cursor-pointer
        hidden
        md:block
        mobile-hidden
      "
      @page-change="pageNumber($event)"
    >
      <slide
        v-for="(carouselImage, sIndex) in singleMessageFile()"
        :key="sIndex"
        class="
          transition-scale
          duration-500
          ease-in-out
          scroll
        "
      >
        <div 
          v-if="
            carouselImage.mimeType === 'image/jpeg' ||
            carouselImage.mimeType === 'image/svg+xml' ||
            carouselImage.mimeType === 'image/png' ||
            carouselImage.mimeType === 'image/webp' ||
            carouselImage.mimeType === 'image/bmp'
          "
          class="w-full h-full" 
          @mousedown="mouseDown"
          @mouseup="mouseUp"
          @mousemove="mouseMove">
          <img
            ref="objImage"
            class="max-w-full mx-auto multiplePicture zoomcontainer"
            :src="carouselImage.url"
          />
        </div>
        <!-- <span v-if="carouselImage.mimeType === 'application/pdf'">
          <button :disabled="page <= 1" @click="page--">❮</button>

          {{ page }} / {{ pageCount }}

          <button :disabled="page >= pageCount" @click="page++">❯</button>
        </span> -->
        <div v-if="carouselImage.mimeType === 'application/pdf'" class="w-full h-full z-99" 
          @mousedown="mouseDown"
          @mouseup="mouseUp"
          @mousemove="mouseMove">
          <vue-pdf-embed
            id="files"
            ref="pdfRef"
            class="w-full h-full multiplePicture zoomcontainer"
            :source="carouselImage.url"
            @rendered="handleDocumentRender"
          />
        </div>
      </slide>
    </carousel>
    <video
      v-if="
        attachment.mimeType === 'video/mp4' ||
        attachment.mimeType === 'video/quicktime' ||
        attachment.mimeType === 'video/webm'
      "
      class="w-full h-full"
      controls="controls"
    >
      <source :src="attachment.url" :type="attachment.mimeType" />
    </video>
    <div
      v-if="
        attachmentType() === 'zip' ||
        attachmentType() === 'txt' ||
        attachmentType() === 'html' ||
        attachmentType() === 'docx' ||
        attachmentType() === 'epub' ||
        attachmentType() === 'eml' ||
        attachmentType() === 'ai' ||
        attachmentType() === 'ico' ||
        attachmentType() === 'json' ||
        attachmentType() === 'accdb' ||
        attachmentType() === 'xlsx' ||
        attachmentType() === 'mobi' ||
        attachmentType() === 'PUB' ||
        attachmentType() === 'pptx' ||
        attachmentType() === 'odt' ||
        attachmentType() === 'olm' ||
        attachmentType() === 'py' ||
        attachmentType() === 'xps' ||
        attachmentType() === 'xd' ||
        attachmentType() === 'vue'
      "
      class="w-full h-full flex flex-col justify-center items-center space-y-4"
    >
      <img
        v-if="
          attachmentType() === 'txt' ||
          attachmentType() === 'epub' ||
          attachmentType() === 'eml' ||
          attachmentType() === 'ai' ||
          attachmentType() === 'ico' ||
          attachmentType() === 'json' ||
          attachmentType() === 'accdb' ||
          attachmentType() === 'mobi' ||
          attachmentType() === 'PUB' ||
          attachmentType() === 'pptx' ||
          attachmentType() === 'odt' ||
          attachmentType() === 'olm' ||
          attachmentType() === 'py' ||
          attachmentType() === 'xps' ||
          attachmentType() === 'xd' ||
          attachmentType() === 'vue'
        "
        src="~/assets/img/document-images/file.png"
        class="md:w-62 md:h-62 w-20 h-20"
        alt="text file"
      />
      <img
        v-if="attachmentType() === 'docx'"
        src="~/assets/img/document-images/Word.png"
        class="md:w-62 md:h-62 w-20 h-20"
        alt="doc file"
      />
      <img
        v-if="attachmentType() === 'zip'"
        src="~/assets/img/document-images/zip-file.png"
        class="md:w-62 md:h-62 w-20 h-20"
        alt="doc file"
      />
      <img
        v-if="attachmentType() === 'html'"
        src="~/assets/img/document-images/html.png"
        class="md:w-62 md:h-62 w-20 h-20"
        alt="doc file"
      />
      <img
        v-if="attachmentType() === 'xlsx'"
        src="~/assets/img/document-images/sheets.png"
        class="md:w-62 md:h-62 w-20 h-20"
        alt="doc file"
      />
      <a
        class="
          bg-yellow-primary
          rounded-full
          text-white
          font-bold
          md:h-10
          h-9
          w-44
          flex
          items-center
          justify-center
          text-md
          sign_up
        "
        :href="attachment.url"
        target="_blank"
        download
        >Download</a
      >
    </div>
    <audio
      v-if="
        attachment.mimeType === 'audio/mpeg' ||
        attachment.mimeType === 'audio/mp3' ||
        attachment.mimeType === 'audio/wav'
      "
      class="send-audio"
      controls
    >
      <source :src="attachment.url" :type="attachment.mimeType" />
    </audio>
  </div>
</template>

<script>
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  setup() {
    const store = useStore()

    return {
      singleMessage: computed(() => store.state.home.singleMessage),
      index: computed(() => store.state.home.index),
      attachment: computed(() => store.state.home.attachment),
    }
  },

  data() {
    return {
      page: 1,
      pageCount: 1,
      Next: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
            <defs>
              <style>
                .bg-1 {
                  fill: #e4801d;
                }

                .bg-2 {
                  fill: #fff;
                }
              </style>
            </defs>
            <g id="slide-right" transform="translate(-1503 -151)">
              <circle id="button" class="bg-1" cx="17.5" cy="17.5" r="17.5" transform="translate(1503 151)"/>
              <path id="ic_chevron_right_24px" class="bg-2" d="M10.7,6,8.59,8.115,15.46,15,8.59,21.885,10.7,24l9-9Z" transform="translate(1506.353 153.5)"/>
            </g>
          </svg>
          `,
      Prev: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
              <defs>
                <style>
                  .bg-1 {
                  fill: #e4801d;
                }
                .bg-2 {
                  fill: #fff;
                }
                </style>
              </defs>
              <g id="slide-left" transform="translate(-1503 -151)">
                <circle id="button" class="bg-1" cx="17.5" cy="17.5" r="17.5" transform="translate(1503 151)"/>
                <path id="ic_chevron_left_24px" class="bg-2" d="M19.115,8.115,17,6,8,15l9,9,2.115-2.115L12.245,15Z" transform="translate(1506.943 153.5)"/>
              </g>
            </svg>`,
    }
  },

  methods: {
    // For Move the Image in the screen
    // pdfClick() {
    //   console.log('PDF Click')
    // },
    mouseDown(e) {
      console.log(e, 'here')
      this.$emit("checkDown", e)
    },
    mouseUp(e) {
      this.$emit("checkUp", e)
    },
    mouseMove(e) {
      this.$emit("checkMove", e)
    },
    singleMessageFile() {
      return this.singleMessage.filter(
        (item) =>
          item.mimeType.includes('image/jpeg') ||
          item.mimeType.includes('image/svg+xml') ||
          item.mimeType.includes('image/png') ||
          item.mimeType.includes('image/webp') ||
          item.mimeType.includes('image/bmp') ||
          item.mimeType.includes('application/pdf')
      )
    },
    attachmentType() {
      const index = this.attachment.name.lastIndexOf('.')
      const temp = this.attachment.name.slice(index + 1)
      return temp
    },
    pageNumber(event) {
      const pageNumber = event
      this.$store.commit('home/SET_CURRENT_PAGE_NUMBER', {
        currentIndex: pageNumber,
      })
    },
    handleDocumentRender() {
      console.log('handle render')
      this.pageCount = this.$refs.pdfRef.pageCount
    },
  },
})
</script>
