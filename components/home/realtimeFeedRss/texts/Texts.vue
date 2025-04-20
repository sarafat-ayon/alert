<template>
  <section class="text-feed-wrapper w-full h-full">
    <transition name="media">
      <div v-if="articles" class="w-full h-full flex md:flex-row flex-col flex-nowrap">
        <!-- Start Texts Feed Header -->
        <template v-if="articles.items.length > 0">
          <div
            class="transition-all duration-500 ease-in-out"
            :class="
              expandFullImage
                ? 'w-0 opacity-0 md:h-full h-0'
                : 'md:w-1/3 w-full md:h-full mobile-height opacity-100'
            "
          >
            <div
              class="
                bg-orange-200
                flex
                w-full
                h-9
                text-md
                font-bold
                text-ash-primary
                items-center
              "
            >
              <div class="px-4">
                <div class="heading">Texts</div>
              </div>
            </div>
            <div
              v-if="articles.items.length > 0"
              class="flex w-full texts-view-wrapper pb-0"
            >
              <!-- Start Email Messages -->
              <div
                class="
                  email-messages
                  w-full
                  h-full
                  md:border-r
                  border-yellow-300
                  scroll
                  bottom-left-radius
                "
              >
                <div
                  v-for="(allText, index) in articles.items"
                  :key="index"
                  class="w-full pb-2 pt-1 message-body"
                  :class="[
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-default',
                    allText.individualSelect.value
                      ? 'bg-orange-dark text-white'
                      : '',
                  ]"
                >
                  <div
                    class="singleMessageWrapper px-4 cursor-pointer relative"
                    @click="
                      store.commit('home/SET_SINGLE_MESSAGE_SHOW', {
                        index,
                        id: allText.id,
                        singleText: allText,
                      }), selectCurrentMessage(allText.id)
                    "
                  >
                    <div
                      class="
                        platform
                        text-lg
                        font-bold
                        flex
                        lg:space-x-0
                        space-x-2
                        whitespace-normal
                        break-words
                        line-clamp-1
                        h-7
                        justify-between
                        items-center
                        flex-nowrap
                        name
                      "
                      :class="
                        allText.individualSelect.value
                          ? 'text-white'
                          : 'text-ash-primary'
                      "
                    >
                      <span class="line-clamp-1">{{ allText.participants[0].name }}</span>
                      <!-- <span class="font-normal text-base">{{
                        emailType(allText.labels)
                      }}</span> -->
                    </div>
                    <div
                      class="flex justify-between lg:space-x-0 space-x-2 h-5"
                    >
                      <div
                        class="
                          heading
                          text-sm
                          whitespace-normal
                          break-words
                          line-clamp-1
                        "
                        :class="
                          allText.individualSelect.value
                            ? 'text-white'
                            : 'text-ash-primary'
                        "
                      >
                        {{ allText.participants[0].number }}
                      </div>
                      <div
                        v-if="
                          allText.attachments &&
                          allText.attachments.length > 0
                        "
                        class="attachment cursor-pointer"
                        :class="
                          allText.individualSelect.value
                            ? 'text-white'
                            : 'text-gray-light'
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 11"
                          class="mx-auto h-5 w-5"
                        >
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                              <path
                                id="ic_attachment_24px"
                                data-name="ic attachment 24px"
                                :class="
                                  allText.individualSelect.value
                                    ? 'ic_attachment1'
                                    : 'ic_attachment'
                                "
                                d="M0,5.5A5.5,5.5,0,0,1,5.5,0H16a4,4,0,0,1,0,8H7.5a2.5,2.5,0,0,1,0-5H15V5H7.41c-.55,0-.55,1,0,1H16a2,2,0,0,0,0-4H5.5a3.5,3.5,0,0,0,0,7H15v2H5.5A5.5,5.5,0,0,1,0,5.5Z"
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div
                      class="
                        flex
                        text-sm
                        justify-between
                        lg:space-x-2
                        space-x-2
                      "
                    >
                      <div
                        class="
                          short-message
                          italic
                          whitespace-normal
                          break-words
                          line-clamp-1
                        "
                        :class="
                          allText.individualSelect.value
                            ? 'text-white'
                            : 'text-gray-light'
                        "
                      >
                        <span v-if="allText.lastMessage" class="pr-0.5">{{
                          allText.lastMessage | strLimit(30)
                        }}</span>
                      </div>
                      <div
                        class="time text-sm text-gray-light whitespace-nowrap"
                      >
                        <date-time
                          class="text-xs"
                          :class="
                            allText.individualSelect.value
                              ? 'text-white'
                              : 'text-gray-light'
                          "
                          :datetime="allText.updatedAt"
                          format="MM dd"
                          :show-time="false"
                          :friendly="false"
                        ></date-time>
                      </div>
                    </div>
                    <!-- <a class="more_link" :href="`#${allEmail.id}`"></a> -->
                  </div>
                </div>
                <!-- v-if="allEmails.items.length > 19" -->
                <!-- <div
                  v-if="allText.totalCount > 20"
                  class="w-full flex justify-center py-4"
                >
                  <button
                    class="
                      bg-orange-dark
                      text-white text-lg
                      h-10
                      w-34
                      rounded-full
                      relative
                      flex
                      justify-around
                      space-x-1
                      items-center
                      px-4
                      font-medium
                    "
                    :disabled="disableLoadMoreProcess"
                    @click="loadMore()"
                  >
                    <span>{{
                      loadMoreArticles ? 'Load more' : 'Less more'
                    }}</span>
                    <fa
                      v-if="disableLoadMoreProcess"
                      class="text-white font-bold animate-spin"
                      :icon="['fas', 'spinner']"
                    />
                  </button>
                </div> -->
              </div>
              <!-- End Email Messages -->
            </div>
          </div>

          <!-- End Email Feed Header -->
          <div
            class="md:hidden px-2 w-full h-px bg-orange-dark my-2"
            :class="expandFullImage ? 'hidden' : 'block'"
          ></div>
          <!-- Start Email View -->
          <div
            class="transition-all duration-500 ease-in-out"
            :class="
              expandFullImage
                ? 'w-full h-full'
                : 'md:w-2/3 w-full md:h-full mobile-height'
            "
          >
            <div
              class="
                bg-orange-200
                flex
                w-full
                h-9
                text-md
                font-bold
                text-ash-primary
                items-center
              "
            >
              <div class="flex justify-between items-center px-4 w-full">
                <div class="heading">Content</div>
                <!-- <div class="extend cursor-pointer">
                  <div
                    class="plus_button"
                    :data-title="allExpanded ? 'Collapse All' : 'Extend All'"
                    @click="store.commit('home/EXPAND_All')"
                  >
                    <img
                      v-if="!allExpanded"
                      class="my-2 mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/Extend-plus-email.svg"
                      alt="SharpArchive Extend-plus Icon"
                    />
                    <img
                      v-else
                      class="my-2 mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/Extend-minus-email.svg"
                      alt="SharpArchive Extend-minus Icon"
                    />
                  </div>
                </div> -->
              </div>
            </div>
            <div
              v-if="articles.items.length > 0"
              class="flex w-full texts-view-wrapper pb-0"
            >
              <!-- Start Text Content Wrapper-->
              <div class="text-content h-full w-full px-4 py-2 scroll">
                <!-- Start Text Body -->
                <TextContent :all-content="articles.items" />
                <!-- <transition name="media" mode="out-in">
                  <component :is="emailDynamicComp"> </component>
                </transition> -->
                <!-- End Text Body -->
              </div>
              <!-- End Text Content -->
            </div>
          </div>
        </template>
        <!-- End Texts View -->

        <template v-else>
          <div
            class="
              w-full
              h-full
              mb-2
              text-blue-600 text-xl
              font-semibold
              relative
              flex
              justify-center
              items-center
            "
          >
            <div class="text-2xl text-center text-black font-semibold absolute">
              No Data Found
            </div>
          </div>
        </template>
      </div>
    </transition>
  </section>
</template>

<script>
// import { mapState } from 'vuex'
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import TextContent from '~/components/home/realtimeFeedRss/texts/TextContent.vue'

export default defineComponent({
  name: 'Texts',
  components: { TextContent },
  setup() {
    const store = useStore()

    const contentSelected = ref(false)

    const articles = {
      id: 1,
      items: [
        {
          lastMessage: 'Hey, how are things doing?',
          explanation: 'I will mess you up" is in lexicon.',
          id: 5401705403195076,
          messages: [
            {
              text: 'devxhub',
              fromUid: '5401705403195076',
            },
            {
              text: 'content',
              fromUid: '5401705403195076',
            },
            {
              text: 'What are you doing?',
              fromUid: '103338412240799',
            },
            {
              text: 'devxhub',
              fromUid: '103338412240799',
            },
            {
              text: 'I am going to be free from tomorrow.',
              fromUid: '5401705403195076',
            },
            {
              text: 'We should decide about the trip',
              fromUid: '5401705403195076',
            },
            {
              text: "Let's pick a location for the vacation.",
              fromUid: '103338412240799',
            },
            {
              text: 'Let me know what you are thinking',
              fromUid: '103338412240799',
            },
            {
              text: 'If you ask me....',
              fromUid: '103338412240799',
            },
          ],
          participants: [
            {
              name: 'Michael Topperson',
              number: '888-555-7777',
              uid: '5401705403195076'
            },
            {
              name: 'George Smith',
              number: '+880 1770-443074',
              uid: '103338412240799'
            }
          ],
          updatedAt: "September 20, 2021 8:56 am.",
          individualSelect: ref(true),
          attachments: ref(false),
          isWorkPlace: ref(false),
          isComplaint: ref(false),
        },

        {
          lastMessage: 'Hey, how are things going?',
          explanation: 'I will mess you up" is in lexicon.',
          id: 8201705403195076,
          messages: [
            {
              text: 'devxhub2',
              fromUid: '8201705403195076',
            },
            {
              text: 'content',
              fromUid: '8201705403195076',
            },
            {
              text: 'What are you doing?',
              fromUid: '103338412240799',
            },
            {
              text: 'devxhub',
              fromUid: '103338412240799',
            },
            {
              text: 'I am going to be free from tomorrow.',
              fromUid: '8201705403195076',
            },
            {
              text: 'We should decide about the trip',
              fromUid: '8201705403195076',
            },
            {
              text: "Let's pick a location for the vacation.",
              fromUid: '103338412240799',
            },
            {
              text: 'Let me know what you are thinking',
              fromUid: '103338412240799',
            },
            {
              text: 'If you ask me....',
              fromUid: '103338412240799',
            },
          ],
          participants: [
            {
              name: 'Kelly Boston, Molly Munchin, ...',
              number: '303-123-1234',
              uid: '8201705403195076'
            },
            {
              name: 'George Smith',
              number: '+880 1770-443074',
              uid: '103338412240799'
            }
          ],
          updatedAt: "September 27, 2021 8:56 am.",
          individualSelect: ref(false),
          attachments: ref(false),
          isWorkPlace: ref(false),
          isComplaint: ref(false),
        },

        {
          lastMessage: 'I never want to see you again.',
          explanation: 'Great, looking forward to it!',
          id: 2801705403195076,
          messages: [
            {
              text: 'devxhub',
              fromUid: '2801705403195076',
            },
            {
              text: 'content',
              fromUid: '2801705403195076',
            },
            {
              text: 'What are you doing?',
              fromUid: '103338412240799',
            },
            {
              text: 'devxhub',
              fromUid: '103338412240799',
            },
            {
              text: 'I am going to be free from tomorrow.',
              fromUid: '2801705403195076',
            },
            {
              text: 'We should decide about the trip',
              fromUid: '2801705403195076',
            },
            {
              text: "Let's pick a location for the vacation.",
              fromUid: '103338412240799',
            },
            {
              text: 'Let me know what you are thinking',
              fromUid: '103338412240799',
            },
            {
              text: 'If you ask me....',
              fromUid: '103338412240799',
            },
          ],
          participants: [
            {
              name: 'Stevie Slussy',
              number: '505-787-5555',
              uid: '2801705403195076'
            },
            {
              name: 'George Smith',
              number: '+880 1770-443074',
              uid: '103338412240799'
            }
          ],
          updatedAt: "August 20, 2021 10:56 am.",
          individualSelect: ref(false),
          attachments: ref(false),
          isWorkPlace: ref(false),
          isComplaint: ref(false),
        },

        {
          lastMessage: 'I never want to see you again.',
          explanation: 'I will mess you up" is in lexicon.',
          id: 3201705403195076,
          messages: [
            {
              text: 'devxhub2',
              fromUid: '3201705403195076',
            },
            {
              text: 'content',
              fromUid: '3201705403195076',
            },
            {
              text: 'What are you doing?',
              fromUid: '103338412240799',
            },
            {
              text: 'devxhub',
              fromUid: '103338412240799',
            },
            {
              text: 'I am going to be free from tomorrow.',
              fromUid: '3201705403195076',
            },
            {
              text: 'We should decide about the trip',
              fromUid: '3201705403195076',
            },
            {
              text: "Let's pick a location for the vacation.",
              fromUid: '103338412240799',
            },
            {
              text: 'Let me know what you are thinking',
              fromUid: '103338412240799',
            },
            {
              text: 'If you ask me....',
              fromUid: '103338412240799',
            },
          ],
          participants: [
            {
              name: 'Fernando Bravo',
              number: '123-789-8787',
              uid: '3201705403195076'
            },
            {
              name: 'George Smith',
              number: '+880 1770-443074',
              uid: '103338412240799'
            }
          ],
          updatedAt: "June 27, 2021 8:56 am.",
          individualSelect: ref(false),
          attachments: ref(false),
          isWorkPlace: ref(false),
          isComplaint: ref(false),
        },
      ]
    }

    const selectCurrentMessage = (selected) => {
      articles.items.map((item) => {
        if (item.id === selected) {
          // const dateTime = item.ActivityLog.split(' ', 3)
          // item.date = dateTime[0]
          // item.time = dateTime[1] + ' ' + dateTime[2]
          // item.comment = item.ActivityLog.split('-')[3]
          item.individualSelect.value = !item.individualSelect.value
          const itemSelectUpdate = item.individualSelect.value
          contentSelected.value = itemSelectUpdate
          return itemSelectUpdate
        } else {
          return (item.individualSelect.value = false)
        }
      })
      // console.log(select, 'current Select', articles)
    }
    return {
      // emailDynamicComp: computed(() => store.state.home.emailDynamicComp),
      store,
      articles,
      contentSelected,
      selectCurrentMessage,
    }
  },
  data() {
    return {
      expandFullImage: false,
      allExpanded: false,
      allExpand: false,
      showEmailDetails: false,
      showSignature: false,
      showDisclosure: false,
      scale: 1,
      pointX: 0,
      pointY: 0,
      // articles: ,
    }
  },
  computed: {
    loadArticles() {
      return this.$store.state.home.loadArticles
    },
    loadMoreArticles() {
      return this.$store.state.home.loadMoreArticles
    },
    singleMessage() {
      return this.$store.getters.home.singleMessage
    },
    // ...mapState('home', ['articles'])
  },
  mounted() {
    // console.log(this.articles, 'here all articles')
  },
  methods: {
    expandAll() {
      this.allExpand = !this.allExpand
      if (this.allExpand) {
        this.showEmailDetails = true
        this.showSignature = true
        this.showDisclosure = true
      } else {
        this.showEmailDetails = false
        this.showSignature = false
        this.showDisclosure = false
      }
    },
    zoomIn(e) {
      const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX *= 1.2
      if (scaleX < 1.1) {
        this.pointY = this.pointY + 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      } else {
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
      }
    },
    zoomOut(e) {
      const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX /= 1.2
      if (scaleX >= 0.482252) {
        this.pointY = this.pointY - 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.texts-view-wrapper {
  height: calc(100% - 36px);
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
.text-xxs {
  font-size: 9px;
}
.small-text-middle {
  vertical-align: middle;
}
.h-5-5 {
  height: 22px;
}
.flag-button-small {
  margin-top: 1px;
  margin-left: 1px;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  // scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
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
.more_link {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-indent: -9999px;
  // z-index: 1000;
}
.bottom-left-radius {
  border-bottom-left-radius: 25px;
}
.message-body {
  height: 82px;
}
.ic_attachment {
  fill: #656565;
}
.ic_attachment1 {
  fill: #ffffff;
}
.name {
  display: flex;
}

@media (max-width: 767px) {
  .mobile-height {
    height: calc(50% - 17px);
  }
  .bottom-left-radius {
    border-bottom-left-radius: 0px;
  }
}
</style>