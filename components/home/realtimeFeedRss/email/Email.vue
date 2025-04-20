<template>
  <section class="email-feed-wrapper w-full h-full">
    <transition name="media">
      <div
        v-if="allEmails && !loadArticles"
        class="w-full h-full flex md:flex-row flex-col flex-nowrap"
      >
        <!-- Start Email Feed Header -->
        <template v-if="allEmails.items.length > 0">
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
                <div class="heading">Messages</div>
              </div>
            </div>
            <div
              v-if="allEmails.items.length > 0"
              class="flex w-full email-view-wrapper pb-0"
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
                  v-for="(allEmail, index) in allEmails.items"
                  :key="index"
                  class="w-full pb-2 pt-1 message-body"
                  :class="[
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-default',
                    allEmail.individualSelect
                      ? 'bg-orange-dark text-white'
                      : '',
                  ]"
                >
                  <div
                    class="singleMessageWrapper px-4 cursor-pointer relative"
                    @click="
                      store.commit('home/SET_SINGLE_MESSAGE_SHOW', {
                        index,
                        id: allEmail.id,
                        singleEmail: allEmail,
                      }),
                        store.commit('home/SET_EMAIL_DYNAMIC_COMP', {
                          comp: 'EmailContent',
                        })
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
                        allEmail.individualSelect
                          ? 'text-white'
                          : 'text-ash-primary'
                      "
                    >
                      <span class="line-clamp-1">{{ allEmail.from }}</span>
                      <span class="font-normal text-base whitespace-nowrap">{{
                        emailType(allEmail.messageType)
                      }}</span>
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
                          allEmail.individualSelect
                            ? 'text-white'
                            : 'text-ash-primary'
                        "
                      >
                        {{ allEmail.subject }}
                      </div>
                      <div
                        v-if="
                          allEmail.attachments &&
                          allEmail.attachments.length > 0
                        "
                        class="attachment cursor-pointer"
                        :class="
                          allEmail.individualSelect
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
                                  allEmail.individualSelect
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
                          allEmail.individualSelect
                            ? 'text-white'
                            : 'text-gray-light'
                        "
                      >
                        <span v-if="allEmail.snippet">{{
                          allEmail.snippet | strLimit(30)
                        }}</span>
                      </div>
                      <div
                        class="time text-sm text-gray-light whitespace-nowrap"
                      >
                        <date-time
                          class="text-xs"
                          :class="
                            allEmail.individualSelect
                              ? 'text-white'
                              : 'text-gray-light'
                          "
                          :datetime="allEmail.updatedAt"
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
                <div
                  v-if="allEmails.totalCount > 20"
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
                </div>
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
                <div class="extend cursor-pointer">
                  <div
                    class="plus_button"
                    :data-title="allExpanded ? 'Collapse All' : 'Extend All'"
                    @click="store.commit('home/EXPAND_All')"
                  >
                    <svg v-if="!allExpanded" class="my-2 mx-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <defs>
                        <style>
                          .expand-1 {
                            fill: #E4801D;
                          }
                        </style>
                      </defs>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                          <path id="ic_add_to_photos_24px" data-name="ic add to photos 24px" class="expand-1"
                            d="M2,4H0V18a2,2,0,0,0,2,2H16V18H2ZM18,0H6A2,2,0,0,0,4,2V14a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V2A2,2,0,0,0,18,0ZM17,9H13v4H11V9H7V7h4V3h2V7h4Z" />
                        </g>
                      </g>
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="my-2 mx-auto h-5 w-5" viewBox="0 0 20 20">
                      <defs>
                        <style>
                          .collapse-1 {
                            fill: #E4801D;
                          }
                        </style>
                      </defs>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                          <path id="ic_add_to_photos_24px" data-name="ic add to photos 24px" class="collapse-1"
                            d="M2,4H0V18a2,2,0,0,0,2,2H16V18H2ZM18,0H6A2,2,0,0,0,4,2V14a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V2A2,2,0,0,0,18,0ZM17,9H7V7H17Z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="allEmails.items.length > 0"
              class="flex w-full email-view-wrapper pb-0"
            >
              <!-- Start Email Content Wrapper-->
              <div class="email-content h-full w-full px-4 pt-2 scroll">
                <!-- Start Email Body -->
                <transition name="media" mode="out-in">
                  <component :is="emailDynamicComp"> </component>
                </transition>
                <!-- End Email Body -->
              </div>
              <!-- End Email Content -->
            </div>
          </div>
        </template>

        <!-- End Email View -->
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
import { mapGetters } from 'vuex'
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { useLoadMore } from '~/composables/feeds/useLoadMore'
import EmailContent from '~/components/home/realtimeFeedRss/email/EmailContent.vue'
import EmailDocuments from '~/components/home/realtimeFeedRss/email/EmailDocuments.vue'
import ExtendPlus from '~/assets/img/svg/Extend-plus-email.svg'
import ExtendMinus from '~/assets/img/svg/Extend-minus-email.svg'

export default defineComponent({
  name: 'Email',
  components: { EmailContent, EmailDocuments },
  setup() {
    const { loadMore, disableLoadMoreProcess } = useLoadMore()
    const store = useStore()

    return {
      allExpanded: computed(() => store.state.home.allExpanded),
      emailDynamicComp: computed(() => store.state.home.emailDynamicComp),
      expandFullImage: computed(() => store.state.home.expandFullImage),
      // totalMessageCount: computed(() => store.state.home.totalMessageCount),
      store,
      loadMore,
      disableLoadMoreProcess,
    }
  },

  data() {
    return {
      extendPlus: ExtendPlus,
      extendMinus: ExtendMinus,
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
    ...mapGetters('home', ['allEmails', 'singleMessage']),
  },
  methods: {
    emailType(label) {
      if (label === 1) {
        return 'Inbox'
      } else if (label === 2) {
        return 'Spam'
      } else if (label === 3) {
        return 'Sent'
      } else if (label === 4) {
        return 'Trash'
      } else if (label === 5) {
        return 'Deleted Forever'
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.email-view-wrapper {
  height: calc(100% - 36px);
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 1s;
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
[data-title]:after {
  color: #e4801d;
  right: 100%;
  z-index: 99999999;
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
@media (max-width: 767px) {
  .mobile-height {
    height: calc(50% - 17px);
  }
  .bottom-left-radius {
    border-bottom-left-radius: 0px;
  }
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
</style>