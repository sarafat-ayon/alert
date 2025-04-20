<template>
  <section v-if="tempSingleMessage.length > 0">
    <div
      v-for="(showEmail, emailIndex) in tempSingleMessage"
      :id="showEmail.id"
      :key="emailIndex + 'ShowEmail'"
      class="email-body"
    >
      <transition v-if="!showEmail.selected" name="fadeIn">
        <!-- store.commit('home/SHOW_CURRENT_CONTENT', showEmail.id) -->
        <div
          class="
            flex
            justify-between
            2xl:flex-nowrap 2xl:space-y-0
            flex-wrap
            space-y-1
            transition-all
            duration-300
            2xl:space-x-4
            text-ash-primary
            border-b border-yellow-primary
            cursor-pointer
            py-1
            break-words
          "
          @click="store.commit('home/SHOW_CURRENT_CONTENT', showEmail.id)"
        >
          <div class="name-wrapper flex space-x-2 justify-between items-center">
            <div v-if="showEmail.fromEmail" class="mail-name text-lg">
              {{ showEmail.fromEmail.name }}
              <span class="text-gray-1700 line-clamp-1"
                >({{ showEmail.fromEmail.address }})</span
              >
            </div>
            <div
              v-if="showEmail.attachments && showEmail.attachments.length > 0"
              class="attachment-icon-flag cursor-pointer self-start pt-1"
            >
              <img
                class="mx-auto h-5 w-5"
                src="../../../../assets/img/svg/ic-attachment.svg"
                alt="ic-attachment"
              />
            </div>

            <!-- <div
              v-if="showEmail.flag.flagStatus !== 'notFlagged'"
              class="flag-button w-5 h-5 rounded-full bg-red-deep shadow-lg"
            >
              <img
                class="mx-auto h-2.5 w-2.5 my-auto mt-1.5"
                src="../../../../assets/img/svg/flag.svg"
                alt="flag-icon"
              />
            </div>-->
          </div>
          <div v-if="showEmail.createdAt" class="date">
            <DateTime
              :datetime="showEmail.createdAt"
              format="MMMM, dd yyyy, hh:mm aa"
              class="whitespace-nowrap"
            />
          </div>
        </div>
      </transition>

      <transition v-else name="fadeIn">
        <div
          class="
            flex flex-col
            space-y-2
            transition-all
            duration-300
            text-ash-primary
            border-b border-yellow-primary
            pb-3
            pt-2
            text-lg
            content
          "
        >
          <div
            class="
              subject-wrapper
              flex
              xl:flex-nowrap
              justify-between
              flex-wrap
              cursor-pointer
              xl:space-x-2
              space-x-0
              md:items-start
              items-center
            "
            @click.stop="
              store.commit('home/SHOW_CURRENT_CONTENT', showEmail.id)
            "
          >
            <div class="subject">
              <p v-if="showEmail.subject">
                <span class="font-bold md:inline block">Subject:</span>
                <span class="md:inline hidden">{{ showEmail.subject }}</span>
              </p>
            </div>
            <div
              v-if="showEmail.createdAt"
              class="time text-base text-gray-1700"
            >
              <DateTime
                :datetime="showEmail.createdAt"
                format="MMMM, dd yyyy, hh:mm aa"
                class="whitespace-nowrap"
              />
            </div>
          </div>
          <div class="subject md:hidden">
            <p v-if="showEmail.subject">
              <span class="block">{{ showEmail.subject }}</span>
            </p>
          </div>
          <div class="from">
            <p>
              <span class="font-bold">From:</span>
              {{ showEmail.fromEmail.name }} ({{ showEmail.fromEmail.address }})
            </p>
          </div>
          <div class="flex space-x-1">
            <span class="font-bold">To:</span>
            <div>
              <div
                v-for="(toEmail, toEmailIndex) in showEmail.toEmails"
                :key="toEmailIndex"
                class="to"
              >
                <span>
                  {{
                    toEmail.emailAddress.address === allEmails.username
                      ? allEmails.name
                      : toEmail.emailAddress.name
                  }}
                  ({{ toEmail.emailAddress.address }})
                </span>
                <span v-if="toEmailIndex !== showEmail.toEmails.length - 1"
                  >,</span
                >
              </div>
            </div>
          </div>
          <template v-if="showEmail.ccRecipients">
            <div class="flex space-x-1">
              <span class="font-bold">Cc:</span>
              <div>
                <div
                  v-for="(ccRecipient, toCcIndex) in showEmail.ccRecipients"
                  :key="toCcIndex"
                  class="cc"
                >
                  <span>
                    {{
                      ccRecipient.emailAddress.address === allEmails.username
                        ? allEmails.name
                        : ccRecipient.emailAddress.name
                    }}
                    ({{ ccRecipient.emailAddress.address }})
                  </span>
                  <span v-if="toCcIndex !== showEmail.ccRecipients.length - 1"
                    >,</span
                  >
                </div>
              </div>
            </div>
          </template>
          <template v-if="showEmail.bccRecipients">
            <div class="flex space-x-1">
              <span class="font-bold">Bcc:</span>
              <div>
                <div
                  v-for="(bccRecipient, toBccIndex) in showEmail.bccRecipients"
                  :key="toBccIndex"
                  class="to"
                >
                  <span>
                    {{
                      bccRecipient.emailAddress.address === allEmails.username
                        ? allEmails.name
                        : bccRecipient.emailAddress.name
                    }}
                    ({{ bccRecipient.emailAddress.address }})
                  </span>
                  <span v-if="toBccIndex !== showEmail.bccRecipients.length - 1"
                    >,</span
                  >
                </div>
              </div>
            </div>
          </template>
          <div class="attachment-signature space-y-1">
            <template
              v-if="showEmail.attachments && showEmail.attachments.length > 0"
            >
              <div
                v-for="(attachment, attachmentIndex) in showEmail.attachments"
                :key="attachmentIndex"
                class="
                  feedback-attachment
                  cursor-pointer
                  text-yellow-primary
                  items-start
                  text-lg
                  font-bold
                  flex
                  space-x-1
                "
                @click="
                  store.commit('home/SET_EMAIL_DYNAMIC_COMP', {
                    comp: 'EmailDocuments',
                    attachments: showEmail.attachments,
                    attachmentIndex,
                    currentIndex: attachmentIndex,
                    messageId: showEmail.id,
                    attachment,
                  })
                "
              >
                <div class="attachment cursor-pointer pt-1">
                  <!-- <img
                            class="mx-auto h-5 w-5"
                            src="../../../../assets/img/svg/ic-attachment.svg"
                            alt="SharpArchive Extend-minus Icon"
                  />-->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 11"
                    class="mx-auto h-5 w-5"
                  >
                    <defs>
                      <style>
                        .ic_attachment {
                          fill: #e4801d;
                        }
                      </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          id="ic_attachment_24px"
                          data-name="ic attachment 24px"
                          class="ic_attachment"
                          d="M0,5.5A5.5,5.5,0,0,1,5.5,0H16a4,4,0,0,1,0,8H7.5a2.5,2.5,0,0,1,0-5H15V5H7.41c-.55,0-.55,1,0,1H16a2,2,0,0,0,0-4H5.5a3.5,3.5,0,0,0,0,7H15v2H5.5A5.5,5.5,0,0,1,0,5.5Z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="break-all">{{ attachment.name }}</div>
              </div>
            </template>

            <!-- <div class="signature-wrapper">
                      <div
                        class="
                          flex
                          justify-between
                          2xl:flex-nowrap 2xl:space-y-0
                          flex-wrap
                          space-y-2
                        "
                      >
                        <div class="signature-button">
                          <button
                            class="
                              w-40
                              border-yellow-primary
                              h-9
                              rounded-full
                              border
                              outline-none
                              font-bold
                              text-sm
                              my-1
                            "
                            :class="
                              showEmail.showDetails.isShowSignature
                                ? 'bg-yellow-primary text-white'
                                : 'text-yellow-primary'
                            "
                            @click="
                              showEmail.showDetails.isShowSignature =
                                !showEmail.showDetails.isShowSignature
                            "
                          >
                            Signature
                          </button>

                          <button
                            class="
                              w-40
                              border-yellow-primary
                              h-9
                              rounded-full
                              border
                              outline-none
                              font-bold
                              text-sm
                              my-1
                            "
                            :class="
                              showEmail.showDetails.isShowDisclosure
                                ? 'bg-yellow-primary text-white'
                                : 'text-yellow-primary'
                            "
                            @click="
                              showEmail.showDetails.isShowDisclosure =
                                !showEmail.showDetails.isShowDisclosure
                            "
                          >
                            Disclosure
                          </button>
                        </div>

                        <div class="flag-wrapper">
                          <button
                            v-if="showEmail.showDetails.isFraud"
                            class="
                              w-40
                              bg-red-moreLightness
                              text-red-deep
                              h-9
                              rounded-full
                              outline-none
                              font-bold
                              text-sm
                              relative
                              overflow-hidden
                              cursor-pointer
                              my-1
                            "
                          >
                            <span>Fraud</span>
                            <div
                              class="
                                flag-button
                                w-9
                                h-9
                                rounded-full
                                bg-red-deep
                                shadow-lg
                                absolute
                                left-0
                                top-0
                                flex
                                justify-center
                                items-center
                              "
                            >
                              <img
                                class="h-3.5 w-3.5"
                                src="../../../../assets/img/svg/flag.svg"
                                alt="flag-icon"
                              />
                            </div>
                          </button>

                          <button
                            v-if="showEmail.showDetails.isFlag"
                            class="
                              w-40
                              bg-red-deep
                              text-offwhite-800
                              h-9
                              rounded-full
                              outline-none
                              font-bold
                              text-sm
                              my-1
                            "
                          >
                            Open Flag
                          </button>
                        </div>
                      </div>
            </div>-->

            <!-- <transition name="fadeIn">
                      <div
                        class="
                          signature-details
                          space-y-2
                          transition-all
                          duration-500
                          overflow-hidden
                        "
                        :class="
                          showEmail.showDetails.isShowSignature ? 'h-32' : 'h-0'
                        "
                      >
                        <div class="name-wrapper">
                          <p class="person-name">Bob Smith</p>
                          <p class="profession italic text-sm">
                            Sales Representative
                          </p>
                        </div>
                        <div class="address text-base">
                          <p class="phone">303-555-1234</p>
                          <p class="street">123, Anywhere St</p>
                          <p class="city">Booneyville, ME 12345</p>
                        </div>
                      </div>
                    </transition>

                    <transition name="fadeIn">
                      <div
                        class="
                          disclosure-details
                          mt-2
                          transition-all
                          duration-500
                          overflow-hidden
                        "
                        :class="
                          showEmail.showDetails.isShowDisclosure
                            ? 'h-28'
                            : 'h-0'
                        "
                      >
                        {{ showEmail.showDetails.disclosure.content }}
                      </div>
            </transition>-->
          </div>
          <div
            v-if="showEmail.body"
            class="text-message break-words"
            v-html="showEmail.body"
          ></div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Email',
  components: {},
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()

    return {
      messageId: computed(() => store.state.home.messageId),
      allExpanded: computed(() => store.state.home.allExpanded),
      tempSingleMessage: computed(() => store.state.home.tempSingleMessage),
      // singleMessageShow: computed(() => store.state.home.singleMessageShow),
      store,
    }
  },

  data() {
    return {
      tempArray: [],
    }
  },
  computed: {
    ...mapGetters('home', ['allEmails', 'singleMessageShow']),
  },
  watch: {
    singleMessageShow(data) {
      if (data) {
        this.setSingleMessage()
      } else {
        this.setSingleMessage()
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.setSingleMessage()
    }, 500)
    window.location.href = `#${this.messageId}`
  },
  methods: {
    setSingleMessage() {
      this.$store.commit('home/SET_TEMP_ARRAY', this.singleMessageShow)
    },
    emailType(labels) {
      if (labels.includes('INBOX')) {
        return 'Inbox'
      } else if (labels.includes('SENT')) {
        return 'Sent'
      } else if (labels.includes('TRASH')) {
        return 'TRASH'
      } else if (labels.includes('SPAM')) {
        return 'Spam'
      }
    },
  },
})
</script>

<style lang="scss" scoped>
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
</style>