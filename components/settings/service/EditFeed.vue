<template>
  <section class="w-full h-full">
    <transition name="right-sidebar-trans">
      <div
        v-if="showSocialEditFeedModal"
        class="
          profile
          fixed
          bg-ash-dark
          right-0
          md:-top-15
          h-full
          md:px-21 md:pt-8 md:pb-4
          flex flex-col
          scroll
          overflow-y-auto overflow-x-hidden
          md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
        "
      >
        <transition name="fadeInParent">
          <div
            v-if="addFeedSection"
            class="
              h-full
              w-full
              flex flex-col
              content-between
              md:p-0
              p-4
              edit-feed-body
            "
          >
            <div class="w-full h-full main-content">
              <div
                class="
                  flex flex-row
                  items-center
                  justify-between
                  md:h-12
                  h-8
                  relative
                "
              >
                <h2
                  class="
                    text-yellow-midlight
                    xl:text-2xl
                    md:text-xl md:font-bold
                    text-xl
                  "
                >
                  <transition name="fadeIn">
                    <span v-if="!emailVerified">Edit Feeds</span>
                  </transition>
                </h2>
                <button
                  :class="[emailVerified ? 'animLeft' : 'animRight']"
                  class="
                    absolute
                    focus:outline-none
                    right-0
                    w-8
                    h-8
                    flex
                    items-center
                  "
                  @click="emailBackBtn ? back() : cancel()"
                >
                  <fa
                    class="
                      text-yellow-midlight
                      xl:text-2xl
                      md:text-xl md:font-bold
                      text-2xl
                    "
                    :class="emailVerified ? 'left-194' : ''"
                    :icon="['fas', emailBackBtn ? 'chevron-left' : 'times']"
                  />
                </button>
              </div>

              <transition name="modalFadeIn">
                <div v-if="hideInstagramModal" class="w-full main-content flex flex-col items-center">
                  <!-- {{ editableFeedData }} -->
  
                  <div class="w-full justify-self-start my-5 mb-10">
                    <div
                      class="
                        w-full
                        flex flex-col
                        items-center
                        justify-center
                        space-y-8
                      "
                    >
                      <div v-if="editableFeedData.profilePic">
                        <img
                          :src="editableFeedData.profilePic"
                          class="w-15 h-15 rounded-full"
                          :alt="`${editableFeedData.name} profile picture`"
                        />
                      </div>
                      <div v-else>
                        <div 
                          v-if="
                            currectProvider(
                              editableFeedData.provider,
                              'microsoft'
                            )
                          " class="bg-white rounded-full h-15 w-15 p-2.5">
                          <img
                            :src="microsoftOutlookIcon"
                            alt="microsoftOutlookIcon"
                          />
                        </div>

                        <img
                          v-if="
                            currectProvider(
                              editableFeedData.provider,
                              'google'
                            ) || currectProvider(
                              editableFeedData.provider,
                              'youtube'
                            )
                          "
                          :src="gmailIcon"
                          class="h-15 w-15"
                          alt="gmailSvgIcon"
                        />

                        <img
                          v-if="
                            currectProvider(
                              editableFeedData.provider,
                              'facebook'
                            )
                          "
                          :src="facebook"
                          class="h-15 w-15"
                          alt="facebookSvgIcon"
                        />

                        <img
                          v-if="
                            currectProvider(
                              editableFeedData.provider,
                              'instagram'
                            )
                          "
                          :src="instagram"
                          class="h-15 w-15"
                          alt="instagramSvgIcon"
                        />

                        <img
                          v-if="
                            currectProvider(
                              editableFeedData.provider,
                              'linkedin'
                            )
                          "
                          :src="linkedin"
                          class="h-15 w-15"
                          alt="linkedinSvgIcon"
                        />

                        <img
                          v-if="
                            currectProvider(
                              editableFeedData.provider,
                              'twitter'
                            )
                          "
                          :src="twitter"
                          class="h-15 w-15"
                          alt="twitterSvgIcon"
                        />
                      </div>
                      <div class="text-white opacity-50 text-left">
                        <h3 v-if="editableFeedData.name" class="break-all">
                          <strong>Name:</strong> {{ editableFeedData.name }}
                        </h3>
                        <p v-if="editableFeedData.username" class="break-all">
                          <strong>Username:</strong>
                          {{ editableFeedData.username }}
                        </p>
                        <p v-if="editableFeedData.type">
                          <strong>Type:</strong> {{ editableFeedData.type }}
                        </p>
                        <p v-if="editableFeedData.dateJoined">
                          <strong>Feed Added:</strong>
                          <date-time
                            :datetime="editableFeedData.dateJoined"
                            format="MMMM dd, yyyy"
                            :show-time="false"
                            :friendly="false"
                          ></date-time>
                        </p>
                        <p v-if="editableFeedData.expireTime">
                          <strong>Expire Time:</strong>
                          <date-time
                            :datetime="editableFeedData.expireTime"
                            format="MMMM dd, yyyy"
                            :show-time="false"
                            :friendly="false"
                          ></date-time>
                        </p>
                      </div>
                    </div>
                  </div>
  
                  <div
                    class="social-icons-wrapper w-full overflow-hidden"
                    :class="emailVerified ? 'demo2' : 'demo1'"
                  >
                    <transition name="fadeIn">
                      <div
                        v-if="!emailVerified"
                        class="w-full flex flex-col items-center h-full"
                      >
                        <h2
                          class="
                            text-white
                            md:text-xl
                            text-md
                            md:px-0
                            px-8
                            opacity-50
                            mb-5
                          "
                        >
                          Change access:
                        </h2>
                        <div
                          class="
                            flex flex-row
                            items-center
                            justify-center
                            w-full
                            md:px-12
                          "
                        >
                          <img
                            v-if="hideText($config.workflow) && currectProvider(
                              editableFeedData.provider,
                              'google'
                            )"
                            src="~/assets/img/png/btn_google_signin_light_normal_web.png"
                            class="cursor-pointer"
                            alt="gmailSvg Icon"
                            @click.stop="authorize('google')"
                          />
                          <img
                            v-if="
                              currectProvider(
                                editableFeedData.provider,
                                'microsoft'
                              )
                            "
                            :src="microsoftOutlook"
                            class="cursor-pointer"
                            alt="microsoftOutlook Icon"
                            @click.stop="authorize('microsoft')"
                          />
                          <img 
                            v-if="
                              currectProvider(
                                editableFeedData.provider,
                                'youtube'
                              )
                            "
                            :src="youtube"
                            class="cursor-pointer youtube_icon"
                            alt="Youtube Icon"
                            @click.stop="authorize('youtube')"
                          />
                          <img
                            v-if="
                              currectProvider(
                                editableFeedData.provider,
                                'twitter'
                              )
                            "
                            :src="twitter"
                            class="w-15 h-15 cursor-pointer"
                            alt="Twitter Icon"
                            @click.stop="authorize('twitter')"
                          />
                          <img
                            v-if="
                              currectProvider(
                                editableFeedData.provider,
                                'facebook'
                              )
                            "
                            :src="facebook"
                            class="w-15 h-15 cursor-pointer"
                            alt="Facebook Icon"
                            @click.stop="authorize('facebook')"
                          />
                          <img
                            v-if="
                              currectProvider(
                                editableFeedData.provider,
                                'linkedin'
                              )
                            "
                            :src="linkedin"
                            class="w-15 h-15 cursor-pointer"
                            alt="LinkedIn Icon"
                            @click.stop="authorize('linkedin')"
                          />
                          <img
                            v-if="
                              currectProvider(
                                editableFeedData.provider,
                                'instagram'
                              )
                            "
                            :src="instagram"
                            class="w-15 h-15 cursor-pointer"
                            alt="Instagram Icon"
                            @click.stop="instagramModal()"
                          />
                        </div>
                        <div
                          class="
                            border-b-2 border-offwhite-500
                            w-full
                            md:mt-12
                            mt-8
                            rounded-sm
                          "
                        ></div>
                      </div>
                    </transition>
                  </div>
                  <!-- <div
                    class="flex flex-row justify-between items-center pt-1 w-full"
                  >
                    <label for="status" class="text-gray-1400 text-lg"
                      >Active</label
                    >
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition
                        duration-200
                        ease-in
                      "
                    >
                      <input
                        id="status"
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          w-5
                          h-5
                          rounded-full
                          bg-white
                          border-4
                          appearance-none
                          cursor-pointer
                        "
                      />
                      <label
                        for="status"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-white
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </div> -->
                  <div
                    class="
                      send-guest-email-wrapper
                      w-full
                      flex flex-col
                      transition-all
                      h-40
                      duration-1000
                      md:mt-6
                    "
                  >
                    <div class="flex justify-center items-center">
                      <label class="text-white text-xl mb-2 opacity-50"
                        >Send Access Request to User</label
                      >
                    </div>
                    <input
                      id="email"
                      v-model="guestEmail"
                      type="email"
                      placeholder="Enter Email"
                      class="
                        text-yellow-midlight
                        w-full
                        rounded-full
                        py-2
                        px-2.5
                        outline-none
                        focus:outline-none
                        bg-white
                        border-b border-white
                        placeholder-yellow-midlight placeholder-opacity-50
                        text-center
                        align-start
                      "
                      @keyup="$v.guestEmail.$touch()"
                    />
                    <!-- @change="checkEmailIsVerified" -->
                    <template v-if="$v.guestEmail.$error">
                      <span
                        v-if="!$v.guestEmail.email"
                        class="text-red-400 text-xs mt-0 pl-2"
                      >
                        The Email is Invalid
                      </span>
                      <span
                        v-if="!$v.guestEmail.required"
                        class="text-red-400 text-xs mt-0 pl-2"
                      >
                        The field is required
                      </span>
                    </template>
                    <transition name="fadeIn">
                      <div v-if="emailVerified" class="text-center mt-4">
                        <button
                          type="submit"
                          class="
                            w-44
                            py-1.5
                            text-white
                            bg-yellow-midlight
                            rounded-full
                            border border-yellow-midlight
                            outline-none
                            font-bold
                            text-base
                            relative
                          "
                          :disabled="emailSendProcess"
                          @click="sendGuestEmail()"
                        >
                          <span>Send</span>
                          <fa
                            v-if="emailSendProcess"
                            class="
                              absolute
                              text-white
                              mx-2
                              right-0
                              top-2
                              font-bold
                              animate-spin
                            "
                            :icon="['fas', 'spinner']"
                          />
                        </button>
                      </div>
                    </transition>
                  </div>
                </div>
              </transition>

              <transition name="modalFadeIn">
                <div
                  v-if="showInstagramModal"
                  class="
                    w-full
                    main-content
                    flex flex-col
                    items-center
                    justify-center
                  "
                >
                  <div
                    class="
                      w-full
                      flex flex-col
                      justify-center
                      items-center
                      space-y-10
                    "
                  >
                    <img
                      :src="instagram"
                      class="w-15 h-15 cursor-pointer"
                      alt="Instagram Icon"
                    />
                    <p class="md:text-xl text-md text-white opacity-50">
                      Which type of account?
                    </p>
                    <div
                      class="w-full flex items-center justify-center space-x-4"
                    >
                      <button
                        class="
                          w-38
                          py-1.5
                          text-lg
                          font-bold
                          text-white
                          rounded-full
                        "
                        :style="{
                          backgroundColor: globalColorPanel.backgroundColor,
                        }"
                        @click.stop="authorize('instagram')"
                      >
                        Personal
                      </button>
                      <button
                        class="
                          w-38
                          py-1.5
                          text-lg
                          font-bold
                          text-white
                          rounded-full
                        "
                        :style="{
                          backgroundColor: globalColorPanel.backgroundColor,
                        }"
                        @click.stop="authorize('facebook')"
                      >
                        Business
                      </button>
                    </div>
                    <p class="md:text-xl text-md text-white text-center">
                      Facebook (Meta) owns Instagram. Clicking on “Personal”
                      will route you to Instagram’s authorization. Clicking on
                      “Business” will ask for your authorization through
                      Facebook.
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            <div class="w-full">
              <!-- <div class="flex flex-col w-full rounded-xl"> -->
              <div class="flex flex-row justify-around">
                <button v-if="!showInstagramModal"
                  class="
                    focus:outline-none
                    w-44
                    h-10
                    text-yellow-midlight
                    bg-ash-dark
                    rounded-full
                    mr-2.5
                    border-2 border-yellow-midlight
                    outline-none
                    font-bold
                    md:text-lg
                    text-xl
                  "
                  @click="deleteFeed"
                >
                  <span>Disconnect</span>
                </button>

                <button v-if="!showInstagramModal"
                  class="
                    focus:outline-none
                    w-44
                    h-10
                    text-white
                    bg-yellow-midlight
                    rounded-full
                    mr-2.5
                    border-2 border-yellow-midlight
                    outline-none
                    font-bold
                    md:text-lg
                    text-xl
                  "
                  @click="cancel()"
                >
                  <span>Exit</span>
                </button>

                <button v-if="showInstagramModal"
                  class="
                    focus:outline-none
                    w-44
                    h-10
                    text-yellow-midlight
                    bg-ash-dark
                    rounded-full
                    mr-2.5
                    border-2 border-yellow-midlight
                    outline-none
                    font-bold
                    md:text-lg
                    text-xl
                  "
                  @click="back()"
                >
                  <span>Back</span>
                </button>
              </div>
              <!-- </div> -->
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <alert-confirm-modal
      :processing="deleteProcess"
      :show="deleteAlert"
      message="Even after disconnecting, you can access the data already
                archived. And if you reconnect a disconnected feed, you are
                charged for the time between disconnecting it and reconnecting
                it."
      title="Are you sure to disconnect this?"
      confirm-btn-text="Disconnect"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>
  </section>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import twitterPng from 'assets/img/svg/twitter.svg'
import instagramPng from 'assets/img/svg/instagram-red.svg'
import facebookPng from 'assets/img/svg/facebook.svg'
import linkedinPng from 'assets/img/svg/linkedIn.svg'
import youtubePng from 'assets/img/png/yt_logo_rgb_dark.png'
import gmailIcon from 'assets/img/svg/gmail.svg'
import microsoftOutlook from 'assets/img/svg/ms-symbollockup_signin_light.svg'
import microsoftOutlookIcon from 'assets/img/svg/microsoft-outlook.svg'
import { email, required } from 'vuelidate/lib/validators'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'
import { useHideText } from '~/composables/feeds/useHideText'
import { SEND_ACCESS_REQUEST, SOCIAL_AUTH } from '~/constants/urls'
export default defineComponent({
  name: 'EditFeed',
  components: { AlertConfirmModal },
  props: {
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
  },
  setup() {
    const { hideText, demoHeight } = useHideText()

    return { hideText, demoHeight }
  },
  data() {
    return {
      addFeedSection: true,
      twitter: twitterPng,
      instagram: instagramPng,
      facebook: facebookPng,
      linkedin: linkedinPng,
      youtube: youtubePng,
      gmailIcon,
      microsoftOutlook,
      microsoftOutlookIcon,
      emailBackBtn: false,
      emailVerified: false,
      guestEmail: '',
      // authorizationProviders: [],
      emailSendProcess: false,
      deleteAlert: false,
      deleteProcess: false,
      hideInstagramModal: true,
      showInstagramModal: false,
    }
  },
  validations: {
    guestEmail: {
      required,
      email,
    },
  },
  computed: {
    showAddFeedsComp() {
      return this.$store.getters['mobile/header/getAddFeed']
    },
    showBlurActiveModal() {
      return this.$store.getters['mobile/header/showBlurActiveModal']
    },
    showSocialEditFeedModal() {
      return this.$store.getters['socialFeed/showEditFeedModal']
    },
    editableFeedData() {
      return this.$store.getters['socialFeed/editableFeedData']
    },
  },
  watch: {
    guestEmail(data) {
      if (data) {
        this.checkEmailIsVerified()
      }
    },
  },
  methods: {
    ...mapActions('socialFeed', ['deleteSocialFeed']),
    instagramModal() {
      this.hideInstagramModal = false
      setTimeout(() => {
        this.showInstagramModal = true
      }, 500)
    },
    checkEmailIsVerified() {
      if (!this.$v.$invalid) {
        this.emailVerified = true
        this.emailBackBtn = true
      } else {
        this.emailVerified = false
        this.emailBackBtn = false
      }
    },
    cancel() {
      this.guestEmail = ''
      this.$v.$reset()
      this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
        open: false,
        data: {},
      })
      this.$store.dispatch('mobile/header/removeOverlay')
    },
    closeAccount() {
      this.logout()
    },
    async logout() {
      await this.$auth.logout({
        data: {
          refresh: this.$auth.strategy.refreshToken.get(),
        },
      })
      localStorage.removeItem('lockScreen')
      this.$store.commit('SET_LOCK_SCREEN', false)
      this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
    },

    finish() {
      this.addFeedSection = false
    },
    async authorize(provider) {
      this.$store.commit('socialFeed/SET_ARCHIVE_FEED', false)
      await this.$social.redirect(provider)
    },
    async authorizeTwitter() {
      const apiUrl = `${SOCIAL_AUTH}twitter/`
      await this.$social.redirectOAuth1('twitter', apiUrl)
    },
    closeArchiveSystemSetting() {
      setTimeout(() => {
        this.addFeedSection = true
      }, 700)
    },
    saveAllWork() {
      this.addFeedSection = true
      this.emailBackBtn = false
      this.guestEmail = ''
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.dispatch('mobile/header/showBlurAndActive', false)
    },
    async sendGuestEmail() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$toast.clear()
        try {
          this.emailSendProcess = true
          const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
            email: this.guestEmail,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.guestEmail = ''
            this.emailBackBtn = false
            this.emailVerified = false
            this.$v.$reset()
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.emailSendProcess = false
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    },
    back() {
      this.guestEmail = ''
      this.emailBackBtn = false
      this.emailVerified = false
      this.showInstagramModal = false
      setTimeout(() => {
        this.hideInstagramModal = true
      }, 500)
      this.$v.$reset()
    },
    deleteFeed() {
      this.deleteAlert = true
    },
    deleteCancel() {
      this.deleteAlert = false
    },
    async deleteConfirm() {
      this.$toast.clear()
      this.deleteProcess = true
      try {
        this.deleteProcess = true
        const response = await this.deleteSocialFeed(this.editableFeedData.id)
        if (response.success) {
          this.$toast.success(response.message, {
            className: ['toasted-bg-archive'],
          })
          this.$store.commit('notifications/SET_OFFSET', 0)
          this.$store.commit('notifications/SET_LIMIT', 25)
          this.$store.commit('notifications/SET_NOTIFICATION', [])
          this.$store.commit('notifications/SET_OLD_NOTIFICATION', [])
          this.$store.dispatch('notifications/getAllNotifications')
          this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
            open: false,
            data: {},
          })
          this.$store.commit('mobile/header/REMOVE_OVERLAY')
        } else {
          this.$toast.error(response.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.deleteAlert = false
        this.deleteProcess = false
      }
    },
    currectProvider(editableProvider, currentProvider) {
      return editableProvider.toLowerCase() === currentProvider
    },
  },
})
</script>
<style lang="scss" scoped>
.youtube_icon {
  height: 44px;
}
.modalFadeIn-enter-active,
.modalFadeIn-leave-active {
  transition: opacity 0.5s;
}
.modalFadeIn-enter,
.modalFadeIn-leave-to {
  opacity: 0;
}
.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #393e46;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    transition: all 0.5s ease-in-out;
    @apply bg-yellow-midlight;
  }
}
.profile {
  width: 500px;
  height: 100%;
  top: 0px;
  z-index: 9999999999;
}

.scroll {
  overflow-x: hidden;
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

.form-card > .error {
  margin-top: 0px;
}

.right-sidebar-trans-enter,
.right-sidebar-trans-leave-to {
  right: -100%;
}

.right-sidebar-trans-enter-to,
.right-sidebar-trans-leave {
  right: 0;
}

.right-sidebar-trans-enter-active {
  transition: all 0.8s ease-in-out;
}

.right-sidebar-trans-leave-active {
  transition: all 0.8s ease-in-out;
}

.content-wrapper {
  height: calc(100% - 40px) !important;
}

.overlay-web {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 100px;
  right: 0;
  z-index: 101;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
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
  transition: all 0.5s ease-in-out;
}

.fadeInParent-enter,
.fadeInParent-leave-to {
  opacity: 0;
}

.fadeInParent-enter-to,
.fadeInParent-leave-from {
  opacity: 1;
}

.fadeInParent-enter-active,
.fadeInParent-leave-active {
  transition: all 0.5s ease-in-out;
}

.animLeft {
  transform: translateX(0);
  animation-name: changePositionLeft;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes changePositionLeft {
  to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 85.5%;
    // left: 31px;
  }
}

.animRight {
  transform: translateX(52%);
  animation-name: changePositionRight;
  animation-duration: 1s;
}

@keyframes changePositionRight {
  from {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 92%;
  }
  to {
    -webkit-transform: translateX(52%);
    transform: translateX(52%);
    right: 0%;
  }
}
/*end right sidebar section transition*/

.demo1 {
  height: 180px;
  transition: height 1s 0.5s;
}
.demo2 {
  height: 0;
  transition: height 1s 0.5s;
}

.main-content {
  height: calc(100% - 40px); // this 42 is bottom button height
}

.fadeInBtn-enter-active,
.fadeInBtn-leave-active {
  transition: opacity 1s;
}
.fadeInBtn-enter,
.fadeInBtn-leave-to {
  opacity: 0;
}
@media (max-width: 767px) {
  .profile {
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999999;
  }
  .overlay-web {
    left: 0 !important;
    height: 100%;
  }
  .animLeft {
    transform: translateX(0);
    animation-name: changePositionLeft;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes changePositionLeft {
    to {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
      right: 100%;
    }
  }
  .left-194 {
    margin-left: 194%;
  }
  .main-content {
    height: calc(100% - 40px); // this 42 is bottom button height
    min-height: 600px;
  }
}
@media (max-height: 680px) {
  .edit-feed-body {
    height: 150%;
  }
}
</style>
