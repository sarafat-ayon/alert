<template>
  <transition name="imagePopup">
    <div
      v-if="showSingleImagePost"
      class="h-full w-full flex md:flex-row flex-col mt-4 image-template"
    >
      <div
        class="
          flex flex-col
          items-end
          relative
          h-full
          justify-center
          bg-gray-1100
          overflow-auto
          image-wrapper
          transition-all
          duration-500
          ease-in-out
        "
        :class="[
          showPostFeed ? 'col-width-70 col-width-100' : 'w-full delay-300',
        ]"
        :style="{
          '--height': `${bodyHeight}px`,
          '--mobileHeight': `${bodyMobileHeight}px`,
        }"
      >
        <div
          class="
            cursor-pointer
            flex
            items-center
            gap-2
            z-20
            absolute
            top-3
            right-4
          "
        >
          <div class="zoom-icon-container shadow-lg">
            <fa
              class="text-orange-dark text-lg hidden md:block"
              :icon="['fas', 'search-plus']"
              @click="zoomInWraper"
            />
            <fa
              class="text-orange-dark text-lg md:hidden"
              :icon="['fas', 'search-plus']"
              @click="mobileZoomIn"
            />
          </div>
          <div class="zoom-icon-container shadow-lg">
            <fa
              class="text-orange-dark text-lg hidden md:block"
              :icon="['fas', 'search-minus']"
              @click="zoomOut"
            />
            <fa
              class="text-orange-dark text-lg md:hidden"
              :icon="['fas', 'search-minus']"
              @click="mobileZoomOut"
            />
          </div>
          <div
            v-if="showPostFeed"
            class="zoom-icon-container shadow-lg"
            @click="expandImage"
          >
            <fa class="text-orange-dark text-lg" :icon="['fas', 'expand']" />
          </div>

          <div
            class="zoom-icon-container shadow-lg"
            @click="showPostFeed ? closeSinglePost() : collapseImage()"
          >
            <fa class="text-orange-dark text-lg" :icon="['fas', 'times']" />
          </div>
        </div>
        <transition name="imagezoom">
          <div id="zoom" ref="zoom" class="overflow-hidden w-full zoom">
            <!-- for move the picture in the screen-->
            <!-- @wheel.prevent="onWheel" -->
            <!-- @mousedown="mouseDown"
            @mouseup="mouseUp"
            @mousemove="mouseMove" -->
            <img
              v-if="!singlePost.archivedAttachmentImages.length"
              id="zoomContainer"
              ref="objImage"
              :src="
                singlePost.archivedFullPicture
                  ? singlePost.archivedFullPicture
                  : singlePost.fullPicture
              "
              alt="Image not found"
              class="
                mt-0
                object-contain
                origin-center
                cursor-pointer
                zoomcontainer
                transition-scale
                duration-500
                ease-in-out
              "
            />
            <carousel
              v-else
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
              class="
                mt-0
                object-contain
                h-full
                origin-center
                cursor-pointer
                desktop-hidden
              "
            >
              <slide
                v-for="(
                  carouselImage, sIndex
                ) in singlePost.archivedAttachmentImages"
                :key="sIndex"
                class="
                  mobileMultiplePicture
                  mobileContainer
                  transition-scale
                  duration-500
                  ease-in-out
                "
              >
                <img
                  ref="objImage"
                  :src="carouselImage"
                  class="w-full"
                  alt=""
                />
              </slide>
            </carousel>
            <carousel
              v-if="
                singlePost.archivedAttachmentImages.length > 0 &&
                show &&
                !showFullImage
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
            >
              <slide
                v-for="(
                  carouselImage, sIndex
                ) in singlePost.archivedAttachmentImages"
                :key="sIndex"
                class="
                  multiplePicture
                  zoomcontainer
                  transition-scale
                  duration-500
                  ease-in-out
                "
              >
                <img
                  ref="objImage"
                  :src="carouselImage"
                  class="w-full"
                  alt=""
                />
              </slide>
            </carousel>
            <carousel
              v-else-if="
                singlePost.archivedAttachmentImages.length > 0 &&
                !show &&
                showFullImage
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
            >
              <slide
                v-for="(
                  carouselImage, sIndex
                ) in singlePost.archivedAttachmentImages"
                :key="sIndex"
                class="
                  multiplePicture
                  zoomcontainer
                  transition-scale
                  duration-500
                  ease-in-out
                "
              >
                <img
                  ref="objImage"
                  :src="carouselImage"
                  class="w-full"
                  alt=""
                />
              </slide>
            </carousel>
          </div>
        </transition>
      </div>

      <!-- Start Single Post With Details -->
      <transition name="details">
        <div
          v-if="showDetails"
          class="SinglePostWithImageFeed z-20 col-width-30 col-width-100 h-full"
          :style="{
            '--height': `${bodyHeight}px`,
            '--mobileHeight': `${bodyMobileHeight}px`,
          }"
        >
          <div ref="desktopBody" class="overflow-hidden max-h-full h-full">
            <div ref="contentHeight" class="max-h-full bg-white h-full">
              <div id="post-card" class="scroll h-1/2 facebook-image-card mb-3">
                <div class="card scroll h-full">
                  <div class="flex">
                    <facebook-icon
                      v-if="!singlePost.profileImageUrl"
                      class="w-13 h-13 rounded-full border border-gray-400"
                    ></facebook-icon>
                    <img
                      v-else
                      height="42"
                      width="42"
                      :src="singlePost.profileImageUrl"
                      class="rounded-full"
                      alt="dp"
                      srcset=""
                    />
                    <div class="ml-2">
                      <h2 class="profile-name">{{ name }}</h2>
                      <p class="profile-date">
                        <date-time
                          class="text-gray-light text-xs"
                          :datetime="singlePost.createdAt"
                          format="MMMM dd, yyyy"
                          :show-time="false"
                          :friendly="false"
                        ></date-time>
                      </p>
                    </div>
                  </div>
                  <div class="flex-grow">
                    <p
                      v-if="
                        singlePost.text && singlePost.text !== singlePost.link
                      "
                      v-see-more.right="200"
                      class="comment break-words"
                    >
                      {{ singlePost.text }}
                    </p>
                    <p
                      v-if="singlePost.description && !singlePost.link"
                      v-see-more.right="200"
                      class="comment break-words"
                    >
                      {{ singlePost.description }}
                    </p>
                    <a
                      v-if="singlePost.link"
                      :href="singlePost.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link break-words line-clamp-1"
                      >{{ singlePost.link }}</a
                    >
                    <div v-if="singlePost.linkName" class="link-preview">
                      <!-- <p>WWW.EXAMPLE.COM {{ cardHeight }}</p> -->
                      <p v-if="singlePost.linkName">
                        {{ singlePost.linkName }}
                      </p>
                    </div>
                  </div>
                  <!-- <button>See Media</button> -->
                  <div class="flex justify-between">
                    <div class="social-icons">
                      <img src="@/assets/img/icon/like.svg" alt="" />
                      <img src="@/assets/img/icon/love.svg" alt="" />
                      <img src="@/assets/img/icon/wow.svg" alt="" />
                      <span class="reaction-conter">{{
                        singlePost.reactionsCount
                      }}</span>
                    </div>
                    <div
                      class="comments-conter"
                      :class="
                        articles.type === 'Profile'
                          ? 'cursor-default'
                          : 'cursor-pointer hover:underline'
                      "
                      @click="loadFeedComment"
                    >
                      <span>{{ singlePost.commentsCount }}</span>
                      <span>Comments</span>
                    </div>
                  </div>

                  <comments
                    v-if="feedComments"
                    :comments="feedComments"
                  ></comments>
                </div>
              </div>
              <div class="h-px w-full px-4">
                <div class="bg-gray-1700 h-full w-full"></div>
              </div>
              <facebook-message
                :card-height="cardHeight"
                :article="singlePost"
              ></facebook-message>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { mapState, mapGetters } from 'vuex'
import { useFeedComment } from '../../../../composables/feeds/useComment'
import Comments from './Comments.vue'
import FacebookMessage from '~/components/home/realtimeFeedRss/FacebookMessage.vue'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { FacebookMessage, FacebookIcon, Comments },
  props: {
    name: {
      type: String,
      default: '',
    },
    articles: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const store = useStore()
    const { loadComment } = useFeedComment()
    const feedComments = ref(null)
    const collapseable = ref(false)

    const loadFeedComment = async () => {
      if (collapseable.value) {
        feedComments.value = null
        collapseable.value = false
      } else {
        try {
          const { data } = await loadComment({
            provider: store.state.socialFeed.singlePost.provider,
            id: store.state.socialFeed.singlePost.id,
          })
          if (data.length) {
            feedComments.value = data
            collapseable.value = true
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return { loadFeedComment, feedComments }
  },
  data() {
    return {
      scale: 1,
      panning: false,
      pointX: 0,
      pointY: 0,
      start: {
        x: 0,
        y: 0,
      },
      showTransition: true,
      middleX: null,
      middleY: null,
      showPostFeed: true,
      cardHeight: 0,
      initialHeight: 0,
      initialWidth: 0,
      mobileInitialHeight: 0,
      mobileInitialWidth: 0,
      multipleInitialHeight: 0,
      multipleInitialWidth: 0,
      state: false,
      Next: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
            <defs>
              <style>
                .cls-1 {
                  fill: #fff;
                }

                .cls-2 {
                  fill: #222831;
                }
              </style>
            </defs>
            <g id="slide-right" transform="translate(-1503 -151)">
              <circle id="button" class="cls-1" cx="17.5" cy="17.5" r="17.5" transform="translate(1503 151)"/>
              <path id="ic_chevron_right_24px" class="cls-2" d="M10.7,6,8.59,8.115,15.46,15,8.59,21.885,10.7,24l9-9Z" transform="translate(1506.353 153.5)"/>
            </g>
          </svg>
          `,
      Prev: `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
              <defs>
                <style>
                  .cls-1 {
                  fill: #fff;
                }
                .cls-2 {
                  fill: #222831;
                }
                </style>
              </defs>
              <g id="slide-left" transform="translate(-1503 -151)">
                <circle id="button" class="cls-1" cx="17.5" cy="17.5" r="17.5" transform="translate(1503 151)"/>
                <path id="ic_chevron_left_24px" class="cls-2" d="M19.115,8.115,17,6,8,15l9,9,2.115-2.115L12.245,15Z" transform="translate(1506.943 153.5)"/>
              </g>
            </svg>`,
      show: false,
      showFullImage: false,
      count: 0,
      showDetails: true,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    currentProperties() {
      return { articles: this.getCurrentArticles }
    },
    ...mapState('home', [
      'loadArticles',
      'loadMoreArticlesSkelaton',
      'bodyHeight',
      'bodyMobileHeight',
    ]),
    ...mapGetters('home', ['getCurrentArticles', 'currentComp']),
    ...mapState('socialFeed', ['showSingleImagePost', 'singlePost', 'index']),
  },
  watch: {
    showSingleImagePost(data) {
      if (data) {
        setTimeout(() => {
          this.show = true
          this.heightInitial()
        }, 1000)
        this.defineCardHeight()
      } else {
        this.show = false
        this.cardHeight = 0
      }
    },
    showPostFeed(data) {
      if (data) {
        this.showFullImage = false
        setTimeout(() => {
          this.showDetails = true
        }, 500)
        setTimeout(() => {
          this.show = true
        }, 600)
      } else {
        this.show = false
        this.showDetails = false
        setTimeout(() => {
          this.showFullImage = true
        }, 800)
      }
    },
  },
  mounted() {},
  methods: {
    closeSinglePost() {
      this.count = 0
      this.$store.dispatch('socialFeed/singleImagePostClose', false)
    },
    defineCardHeight() {
      setTimeout(() => {
        const card = document.querySelectorAll('.facebook-image-card')
        card.forEach((item) => {
          if (item.offsetHeight > 0) {
            this.cardHeight = item.offsetHeight
          }
        })
      }, 500)
    },
    heightInitial() {
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        setTimeout(() => {
          document.querySelectorAll('.VueCarousel-dot').forEach((item) => {
            item.removeAttribute('title')
          })

          let multipleInitialImageSize
          document.querySelectorAll('.multiplePicture').forEach((item) => {
            if (item.classList.contains('VueCarousel-slide-active')) {
              item.classList.remove('VueCarousel-slide-active')
            }
            multipleInitialImageSize = item
            multipleInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.multipleInitialHeight = multipleInitialImageSize.offsetHeight
            this.multipleInitialWidth = multipleInitialImageSize.offsetWidth
          })

          // small device

          let mobileInitialImageSize
          document
            .querySelectorAll('.mobileMultiplePicture')
            .forEach((item) => {
              if (item.classList.contains('VueCarousel-slide-active')) {
                item.classList.remove('VueCarousel-slide-active')
              }
              mobileInitialImageSize = item
              mobileInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
              this.mobileInitialHeight = mobileInitialImageSize.offsetHeight
              this.mobileInitialWidth = mobileInitialImageSize.offsetWidth
            })
        }, 100)
      } else {
        setTimeout(() => {
          const initialImageSize = document.getElementById('zoomContainer')
          initialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
          this.initialHeight = initialImageSize.offsetHeight
          this.initialWidth = initialImageSize.offsetWidth

          // small device
          let mobileInitialImageSize
          document.querySelectorAll('.zoomcontainer').forEach((item) => {
            mobileInitialImageSize = item
            mobileInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.mobileInitialHeight = mobileInitialImageSize.offsetHeight
            this.mobileInitialWidth = mobileInitialImageSize.offsetWidth
          })
        }, 100)
      }
    },
    collapseImage() {
      this.count = 0
      this.showPostFeed = true
      const zoom = document.getElementById('zoom')
      zoom.style.height = 'auto'
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        let multipleZoom
        document.querySelectorAll('.multiplePicture').forEach((item) => {
          multipleZoom = item
          multipleZoom.style.height = 100 + '%'
        })
        setTimeout(() => {
          document.querySelectorAll('.VueCarousel-dot').forEach((item) => {
            item.removeAttribute('title')
          })

          let multipleInitialImageSize
          document.querySelectorAll('.multiplePicture').forEach((item) => {
            multipleInitialImageSize = item
            multipleInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.multipleInitialHeight = multipleInitialImageSize.offsetHeight
            this.multipleInitialWidth = multipleInitialImageSize.offsetWidth
          })
        }, 610)
        let mobileZoom
        document
          .querySelectorAll('.mobileMultiplePicture')
          .forEach((item) => {
            mobileZoom = item
            mobileZoom.style.height = 100 + '%'
          })
        setTimeout(() => {
          let mobileInitialImageSize
          document
            .querySelectorAll('.mobileMultiplePicture')
            .forEach((item) => {
              mobileInitialImageSize = item
              mobileInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
              this.mobileInitialHeight = mobileInitialImageSize.offsetHeight
              this.mobileInitialWidth = mobileInitialImageSize.offsetWidth
            })
        }, 610)
      } else {
        const zoom1 = document.getElementById('zoomContainer')
        zoom1.style.height = 100 + '%'
        setTimeout(() => {
          const initialImageSize = document.getElementById('zoomContainer')
          initialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
          this.initialHeight = initialImageSize.offsetHeight
          this.initialWidth = initialImageSize.offsetWidth
        }, 100)
        let mobileZoom
        document.querySelectorAll('.zoomcontainer').forEach((item) => {
          mobileZoom = item
          mobileZoom.style.height = 100 + '%'
        })
        setTimeout(() => {
          let mobileInitialImageSize
          document.querySelectorAll('.zoomcontainer').forEach((item) => {
            mobileInitialImageSize = item
            mobileInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.mobileInitialHeight = mobileInitialImageSize.offsetHeight
            this.mobileInitialWidth = mobileInitialImageSize.offsetWidth
          })
        }, 100)
      }
    },
    expandImage() {
      this.count = 0
      this.pointX = 0
      this.pointY = 0
      this.scale = 1
      this.showPostFeed = false
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        let multipleZoom
        document.querySelectorAll('.multiplePicture').forEach((item) => {
          multipleZoom = item
          multipleZoom.style.height = 100 + '%'
        })
        setTimeout(() => {
          document.querySelectorAll('.VueCarousel-dot').forEach((item) => {
            item.removeAttribute('title')
          })

          let multipleInitialImageSize
          document.querySelectorAll('.multiplePicture').forEach((item) => {
            multipleInitialImageSize = item
            multipleInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.multipleInitialHeight = multipleInitialImageSize.offsetHeight
            this.multipleInitialWidth = multipleInitialImageSize.offsetWidth
          })
        }, 810)
        let mobileZoom
        document.querySelectorAll('.multiplePicture').forEach((item) => {
          mobileZoom = item
          mobileZoom.style.height = 100 + '%'
        })
        setTimeout(() => {
          let mobileInitialImageSize
          document.querySelectorAll('.multiplePicture').forEach((item) => {
            mobileInitialImageSize = item
            mobileInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.mobileInitialHeight = mobileInitialImageSize.offsetHeight
            this.mobileInitialWidth = mobileInitialImageSize.offsetWidth
          })
        }, 810)
      } else {
        const zoom = document.getElementById('zoomContainer')
        zoom.style.height = 100 + '%'
        setTimeout(() => {
          const initialImageSize = document.getElementById('zoomContainer')
          initialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
          this.initialHeight = initialImageSize.offsetHeight
          this.initialWidth = initialImageSize.offsetWidth
        }, 100)
        let mobileZoom
        document.querySelectorAll('.zoomcontainer').forEach((item) => {
          mobileZoom = item
          mobileZoom.style.height = 100 + '%'
        })
        setTimeout(() => {
          let mobileInitialImageSize
          document.querySelectorAll('.zoomcontainer').forEach((item) => {
            mobileInitialImageSize = item
            mobileInitialImageSize.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
            this.mobileInitialHeight = mobileInitialImageSize.offsetHeight
            this.mobileInitialWidth = mobileInitialImageSize.offsetWidth
          })
        }, 100)
      }
    },
    setTrasform() {
      const zoom = document.getElementById('zoomContainer')
      zoom.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${this.scale} )`
    },
    justScealing(scale) {
      const zoom = document.getElementById('zoomContainer')
      zoom.style.transform = `scale(${scale})`
    },
    // For Move the Image in the screen

    // mouseDown(e) {
    //   e.preventDefault()
    //   this.start = {
    //     x: e.clientX - this.pointX,
    //     y: e.clientY - this.pointY,
    //   }
    //   this.panning = true
    // },
    // mouseUp(e) {
    //   this.panning = false
    // },
    // mouseMove(e) {
    //   e.preventDefault()
    //   if (!this.panning) {
    //     return
    //   }
    //   this.pointX = e.clientX - this.start.x
    //   this.pointY = e.clientY - this.start.y
    //   this.setTrasform()
    // },
    zoomInWraper(e) {
      setTimeout(this.zoomIn(e), 50000)
    },
    zoomIn(e) {
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        const display1 = document.querySelectorAll('.zoomcontainer')
        display1.forEach((item) => {
          if (item.classList.contains('VueCarousel-slide-active')) {
            this.count = this.count + 1
            item.removeAttribute('id')
            item.classList.remove('multiplePicture')
            let vueCarouselActive
            document
              .querySelectorAll('.VueCarousel-slide-active')
              .forEach((item1) => {
                vueCarouselActive = item1
                const vueCarouselActivematrix =
                  window.getComputedStyle(vueCarouselActive).transform
                const vueCarouselActivematrixArray = vueCarouselActivematrix
                  .replace('matrix(', '')
                  .split(',')
                let vueCarouselActivescaleX = parseFloat(
                  vueCarouselActivematrixArray[0]
                ) // convert from string to number
                vueCarouselActivescaleX *= 1.2
                if (vueCarouselActivescaleX < 1.1) {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${vueCarouselActivescaleX} )`
                } else {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
                }
              })
          } else {
            display1[this.index].setAttribute('id', 'zoomContainer')
          }
        })
        if (this.count < 1) {
          const display = document.getElementById('zoomContainer')
          const matrix = window.getComputedStyle(display).transform
          const matrixArray = matrix.replace('matrix(', '').split(',')
          let scaleX = parseFloat(matrixArray[0]) // convert from string to number
          scaleX *= 1.2
          if (scaleX < 1.1) {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
          } else {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
          }
        }
      } else {
        const display = document.getElementById('zoomContainer')
        const matrix = window.getComputedStyle(display).transform
        const matrixArray = matrix.replace('matrix(', '').split(',')
        let scaleX = parseFloat(matrixArray[0]) // convert from string to number
        scaleX *= 1.2
        if (scaleX < 1.1) {
          display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
        }
        // small device
        let mobileDisplay
        document.querySelectorAll('.zoomcontainer').forEach((item) => {
          mobileDisplay = item
          const mobilematrix = window.getComputedStyle(mobileDisplay).transform
          const mobilematrixArray = mobilematrix
            .replace('matrix(', '')
            .split(',')
          let mobilescaleX = parseFloat(mobilematrixArray[0]) // convert from string to number
          mobilescaleX *= 1.2
          if (mobilescaleX < 1.1) {
            mobileDisplay.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${mobilescaleX} )`
          } else {
            mobileDisplay.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
          }
        })
      }
    },
    zoomOut(e) {
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        const display1 = document.querySelectorAll('.zoomcontainer')
        display1.forEach((item, index) => {
          if (item.classList.contains('VueCarousel-slide-active')) {
            item.removeAttribute('id')
            this.count = this.count + 1
            item.classList.remove('multiplePicture')
            let vueCarouselActive
            document
              .querySelectorAll('.VueCarousel-slide-active')
              .forEach((item) => {
                vueCarouselActive = item
                const vueCarouselActivematrix =
                  window.getComputedStyle(vueCarouselActive).transform
                const vueCarouselActivematrixArray = vueCarouselActivematrix
                  .replace('matrix(', '')
                  .split(',')
                let vueCarouselActivescaleX = parseFloat(
                  vueCarouselActivematrixArray[0]
                ) // convert from string to number
                vueCarouselActivescaleX /= 1.2
                if (vueCarouselActivescaleX >= 0.482252) {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${vueCarouselActivescaleX} )`
                }
              })
          } else {
            display1[this.index].setAttribute('id', 'zoomContainer')
          }
        })
        if (this.count < 1) {
          const display = document.getElementById('zoomContainer')
          const matrix = window.getComputedStyle(display).transform
          const matrixArray = matrix.replace('matrix(', '').split(',')
          let scaleX = parseFloat(matrixArray[0]) // convert from string to number
          scaleX /= 1.2
          if (scaleX >= 0.482252) {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
          }
        }
      } else {
        const display = document.getElementById('zoomContainer')
        const matrix = window.getComputedStyle(display).transform
        const matrixArray = matrix.replace('matrix(', '').split(',')
        let scaleX = parseFloat(matrixArray[0]) // convert from string to number
        scaleX /= 1.2
        if (scaleX >= 0.482252) {
          display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
        }

        // small device
        let mobileDisplay
        document.querySelectorAll('.zoomcontainer').forEach((item) => {
          mobileDisplay = item
          const mobilematrix = window.getComputedStyle(mobileDisplay).transform
          const mobilematrixArray = mobilematrix
            .replace('matrix(', '')
            .split(',')
          let mobilescaleX = parseFloat(mobilematrixArray[0]) // convert from string to number
          mobilescaleX /= 1.2
          if (mobilescaleX >= 0.482252) {
            mobileDisplay.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${mobilescaleX} )`
          }
        })
      }
    },
    mobileZoomIn() {
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        const display1 = document.querySelectorAll('.mobileContainer')
        display1.forEach((item) => {
          if (item.classList.contains('VueCarousel-slide-active')) {
            this.count = this.count + 1
            item.removeAttribute('id')
            item.classList.remove('mobileMultiplePicture')
            let vueCarouselActive
            document
              .querySelectorAll('.VueCarousel-slide-active')
              .forEach((item) => {
                vueCarouselActive = item
                const vueCarouselActivematrix =
                  window.getComputedStyle(vueCarouselActive).transform
                const vueCarouselActivematrixArray = vueCarouselActivematrix
                  .replace('matrix(', '')
                  .split(',')
                let vueCarouselActivescaleX = parseFloat(
                  vueCarouselActivematrixArray[0]
                ) // convert from string to number
                vueCarouselActivescaleX *= 1.2
                if (vueCarouselActivescaleX < 1.1) {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${vueCarouselActivescaleX} )`
                } else {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
                }
              })
          } else {
            display1[
              display1.length -
                this.singlePost.archivedAttachmentImages.length +
                this.index
            ].setAttribute('id', 'mobileContainer')
          }
        })
        if (this.count < 1) {
          const display = document.getElementById('mobileContainer')
          const matrix = window.getComputedStyle(display).transform
          const matrixArray = matrix.replace('matrix(', '').split(',')
          let scaleX = parseFloat(matrixArray[0]) // convert from string to number
          scaleX *= 1.2
          if (scaleX < 1.1) {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
          } else {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
          }
        }
      } else {
        const display = document.getElementById('zoomContainer')
        const matrix = window.getComputedStyle(display).transform
        const matrixArray = matrix.replace('matrix(', '').split(',')
        let scaleX = parseFloat(matrixArray[0]) // convert from string to number
        scaleX *= 1.2
        if (scaleX < 1.1) {
          display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
        } else {
          display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
        }
        // small device
        let mobileDisplay
        document.querySelectorAll('.zoomcontainer').forEach((item) => {
          mobileDisplay = item
          const mobilematrix = window.getComputedStyle(mobileDisplay).transform
          const mobilematrixArray = mobilematrix
            .replace('matrix(', '')
            .split(',')
          let mobilescaleX = parseFloat(mobilematrixArray[0]) // convert from string to number
          mobilescaleX *= 1.2
          if (mobilescaleX < 1.1) {
            mobileDisplay.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${mobilescaleX} )`
          } else {
            mobileDisplay.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
          }
        })
      }
    },
    mobileZoomOut() {
      if (this.singlePost.archivedAttachmentImages.length > 0) {
        const display1 = document.querySelectorAll('.mobileContainer')
        display1.forEach((item) => {
          if (item.classList.contains('VueCarousel-slide-active')) {
            item.removeAttribute('id')
            this.count = this.count + 1
            item.classList.remove('mobileMultiplePicture')
            let vueCarouselActive
            document
              .querySelectorAll('.VueCarousel-slide-active')
              .forEach((item) => {
                vueCarouselActive = item
                const vueCarouselActivematrix =
                  window.getComputedStyle(vueCarouselActive).transform
                const vueCarouselActivematrixArray = vueCarouselActivematrix
                  .replace('matrix(', '')
                  .split(',')
                let vueCarouselActivescaleX = parseFloat(
                  vueCarouselActivematrixArray[0]
                ) // convert from string to number
                vueCarouselActivescaleX /= 1.2
                if (vueCarouselActivescaleX >= 0.482252) {
                  vueCarouselActive.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${vueCarouselActivescaleX} )`
                }
              })
          } else {
            display1[
              display1.length -
                this.singlePost.archivedAttachmentImages.length +
                this.index
            ].setAttribute('id', 'mobileContainer')
          }
        })
        if (this.count < 1) {
          const display = document.getElementById('mobileContainer')
          const matrix = window.getComputedStyle(display).transform
          const matrixArray = matrix.replace('matrix(', '').split(',')
          let scaleX = parseFloat(matrixArray[0]) // convert from string to number
          scaleX /= 1.2
          if (scaleX >= 0.482252) {
            display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
          }
        }
      } else {
        const display = document.getElementById('zoomContainer')
        const matrix = window.getComputedStyle(display).transform
        const matrixArray = matrix.replace('matrix(', '').split(',')
        let scaleX = parseFloat(matrixArray[0]) // convert from string to number
        scaleX /= 1.2
        if (scaleX >= 0.482252) {
          display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
        }
        // small device
        let mobileDisplay
        document.querySelectorAll('.zoomcontainer').forEach((item) => {
          mobileDisplay = item
          const mobilematrix = window.getComputedStyle(mobileDisplay).transform
          const mobilematrixArray = mobilematrix
            .replace('matrix(', '')
            .split(',')
          let mobilescaleX = parseFloat(mobilematrixArray[0]) // convert from string to number
          mobilescaleX /= 1.2
          if (mobilescaleX >= 0.482252) {
            mobileDisplay.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${mobilescaleX} )`
          }
        })
      }
    },
    /* onWheel(e) {
      e.preventDefault()
      const xs = (e.clientX - this.pointX) / this.scale
      const ys = (e.clientX - this.pointY) / this.scale
      const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      delta > 0 ? (this.scale *= 1.2) : (this.scale /= 1.2)
      this.pointX = e.clientX - xs * this.scale
      this.pointY = e.clientY - ys * this.scale
      this.setTrasform()
    }, */
  },
})
</script>
<style lang="scss" scoped>
.mobile-body_wrapper {
  height: calc(100% - 0px);
}
.title {
  background-color: #e4801d;
  @apply text-center;
}
.real-time-feed-body_wrapper {
  @apply flex justify-center items-start;
  height: calc(100% - 0px);
}
.left-side-body_wrapper {
  @apply col-span-1 py-6 pt-2 overflow-y-auto;
}
.footer {
  margin-top: 230px !important;
}
.min-width-2 {
  min-width: 2.5rem;
}
.max-width-690 {
  max-width: 690px;
}
.min-width-400 {
  min-width: 400px;
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
.imagezoom-enter-active,
.imagezoom-leave-active {
  transition: all 3s ease;
}
.imagezoom-enter,
.imagezoom-leave-to {
  transform: scale(var(--scale));
}
.zoom-icon-container {
  @apply bg-white w-9 h-9 flex items-center justify-center rounded-full;
}
.zoom {
  @apply w-full h-auto origin-center;
  /* transform-origin: 0px 0px; */
  transform: scale(1), translate(0px, 0px);
  // cursor: -moz-grab;
  // cursor: grab;
  & img {
    @apply w-full h-full object-contain;
    cursor: grab;
  }
}

/* Style for single post image */
.card {
  @apply bg-white p-4 my-0 flex flex-col;
  //   box-shadow: 0px 1px 2px #22283126;
  //   border-radius: 10px;
}
.profile-name {
  @apply text-xl;
  color: #222831;
}

.profile-date {
  @apply text-xs text-gray-light;
}

.comment {
  @apply text-xl my-4;
  color: #222831;
}

.link {
  @apply pt-2;
  color: #1263cc;
}

.link-preview {
  @apply my-2 py-2 px-4 -mx-3 bg-gray-1400;
}

.link-preview p {
  @apply text-gray-light;
}

.social-icons {
  @apply flex items-center;
}

.social-icons > img {
  @apply inline-block -mr-0.5;
  height: 18px;
  width: 18px;
}

.reaction-conter {
  @apply text-base ml-1 text-gray-light;
}

.comments-conter {
  @apply inline-block text-gray-light cursor-pointer;
}
button {
  @apply py-1 mb-2 px-2.5 rounded-md text-gray-1200;
  background: #e6e6e6;
}

.fbPostHeight {
  height: var(--height);
}
.details-height {
  height: var(--height);
}
.px400 {
  height: 220px;
}
.imagePopup-enter-active,
.imagePopup-leave-active {
  transition: opacity 0.5s;
}
.imagePopup-enter,
.imagePopup-leave-to {
  opacity: 0;
}
// .image-template {
//   height: var(--height);
// }
.image-wrapper {
  height: var(--height);
}
.SinglePostWithImageFeed {
  height: var(--height);
}

.desktop-hidden {
  display: none !important;
}

.col-width-70 {
  width: 60%;
}

.col-width-30 {
  width: 40%;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .col-width-70 {
    width: 50%;
  }
  .col-width-30 {
    width: 50%;
  }
}

@media (max-width: 767px) {
  .col-width-100 {
    width: 100%;
  }

  .image-wrapper {
    height: var(--mobileHeight);
    @apply col-span-12;
  }
  .SinglePostWithImageFeed {
    height: var(--mobileHeight);
    @apply col-span-12;
  }
  .mobile-hidden {
    display: none !important;
  }
  .desktop-hidden {
    display: block !important;
  }
}
.details-enter-active,
.details-leave-active {
  transition: opacity 0.3s;
}
.details-enter,
.details-leave-to {
  opacity: 0;
}
</style>
