<template>
  <div>
    <transition name="right-sidebar-trans">
      <div
        v-if="socialAuthFeeds || showAddFeedsComp"
        class="
          profile
          fixed
          bg-ash-dark
          right-0
          md:top-15
          h-full
          md:px-21
          p-4
          md:pt-8
          flex flex-col
          content-between
          scroll
          md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
        "
      >
        <transition name="fadeInParent">
          <div
            v-if="addFeedSection"
            class="h-full w-full flex flex-col content-between overflow-hidden"
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
                    text-yellow-primary
                    xl:text-2xl
                    md:text-xl md:font-bold
                    text-xl
                  "
                >
                  <transition name="fadeIn">
                    <span v-if="!emailVerified">Add Feeds</span>
                  </transition>
                </h2>
                <button
                  :class="[emailVerified ? 'animLeft' : 'animRight']"
                  class="absolute focus:outline-none right-0"
                >
                  <fa
                    v-if="!emailBackBtn"
                    class="
                      text-yellow-primary
                      xl:text-2xl
                      md:text-xl md:font-bold
                      text-2xl
                      cursor-pointer
                    "
                    :icon="['fas', 'times']"
                    @click="cancel()"
                  />
                  <fa
                    v-if="emailBackBtn"
                    class="
                      text-yellow-primary
                      xl:text-2xl
                      md:text-xl md:font-bold
                      text-2xl
                      cursor-pointer
                    "
                    :icon="['fas', 'chevron-left']"
                    @click="back()"
                  />
                </button>
              </div>

              <div
                class="
                  w-full
                  main-content
                  flex flex-col
                  items-center
                  justify-center
                "
              >
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
                          md:text-left
                          text-center
                          opacity-50
                          mb-5
                        "
                      >
                        If you have access, select to connect:
                      </h2>
                      <div
                        class="
                          flex flex-row
                          items-center
                          justify-between
                          w-full
                          md:px-12
                        "
                      >
                        <img
                          :src="twitter"
                          class="w-15 h-15 cursor-pointer"
                          alt="twitter"
                          @click.stop="authorizeTwitter"
                        />
                        <img
                          :src="facebook"
                          class="w-15 h-15 cursor-pointer"
                          alt="facebook"
                          @click.stop="authorize('facebook')"
                        />
                        <img
                          :src="linkedin"
                          class="w-15 h-15 cursor-pointer"
                          alt="linkedin"
                          @click.stop="authorize('linkedin')"
                        />
                        <img
                          :src="instagram"
                          class="w-15 h-15 cursor-pointer"
                          alt="instagram"
                          @click.stop="authorize('instagram')"
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
                      text-yellow-primary
                      w-full
                      rounded-full
                      py-2
                      px-2.5
                      outline-none
                      focus:outline-none
                      bg-white
                      border-b border-white
                      placeholder-yellow-primary placeholder-opacity-50
                      text-center
                      align-start
                    "
                    @change="checkEmailIsVerified"
                    @keyup="$v.guestEmail.$touch()"
                  />
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
                          bg-yellow-primary
                          rounded-full
                          border border-yellow-primary
                          outline-none
                          font-bold
                          text-base
                          setup
                        "
                        @click="sendGuestEmail()"
                      >
                        Send
                      </button>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <div class="w-full">
              <div class="flex flex-row items-center justify-center">
                <transition name="fadeIn">
                  <button
                    v-if="cancelBtn"
                    type="submit"
                    class="
                      w-44
                      py-2
                      text-yellow-primary
                      rounded-full
                      border border-yellow-primary
                      outline-none
                      font-bold
                      text-base
                      setup
                    "
                    @click="cancel()"
                  >
                    Cancel
                  </button>
                </transition>
                <transition name="fadeIn2">
                  <button
                    v-if="finishWorkBtn"
                    type="submit"
                    class="
                      w-44
                      py-2
                      text-yellow-primary
                      rounded-full
                      border border-yellow-primary
                      outline-none
                      font-bold
                      text-base
                      setup
                    "
                    @click="finish()"
                  >
                    Finish
                  </button>
                </transition>
                <transition name="fadeIn">
                  <button
                    v-if="emailBackBtn"
                    type="submit"
                    class="
                      w-44
                      py-2
                      text-yellow-primary
                      rounded-full
                      border border-yellow-primary
                      outline-none
                      font-bold
                      text-base
                      setup
                    "
                    @click="back()"
                  >
                    Back
                  </button>
                </transition>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fadeInParent">
          <archive-system-settings
            v-if="archiveSystemSetting"
            @closeArchiveSystemSetting="closeArchiveSystemSetting"
            @saveAllWork="saveAllWork"
          ></archive-system-settings>
        </transition>
      </div>
    </transition>
    <start-archiving-modal
      v-if="startArchiveModal && showBlurActiveModal"
      @closeAccount="closeAccount"
      @addFeed="addFeed"
    ></start-archiving-modal>
  </div>
</template>
<script>
import twitterPng from 'assets/img/svg/twitter.svg'
import instagramPng from 'assets/img/svg/instagram-red.svg'
import facebookPng from 'assets/img/svg/facebook.svg'
import linkedinPng from 'assets/img/svg/linkedIn.svg'
import { email, required } from 'vuelidate/lib/validators'
import {
  SOCIAL_FEEDS,
  SEND_ACCESS_REQUEST,
  SOCIAL_AUTH,
} from '~/constants/urls'
import StartArchivingModal from '~/components/startArchivingModal'
import ArchiveSystemSettings from '~/components/ArchiveSystemSettings'

export default {
  name: 'SocialAuthFeeds',
  components: { ArchiveSystemSettings, StartArchivingModal },
  data() {
    return {
      addFeedSection: true,
      twitter: twitterPng,
      instagram: instagramPng,
      facebook: facebookPng,
      linkedin: linkedinPng,
      socialAuthFeeds: false,
      startArchiveModal: false,
      cancelBtn: true,
      emailBackBtn: false,
      finishWorkBtn: false,
      archiveSystemSetting: false,
      emailVerified: false,
      guestEmail: '',
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
  },
  watch: {
    guestEmail(data) {
      if (data) {
        this.checkEmailIsVerified()
      }
    },
  },
  mounted() {
    this.checkArchiveFeeds()
  },
  methods: {
    checkEmailIsVerified() {
      if (!this.$v.$invalid) {
        this.cancelBtn = false
        this.finishWorkBtn = false
        this.emailVerified = true
        setTimeout(() => {
          this.emailBackBtn = true
        }, 700)
      } else {
        this.emailBackBtn = false
        this.emailVerified = false
        setTimeout(() => {
          this.cancelBtn = true
          this.finishWorkBtn = false
        }, 700)
      }
    },
    checkArchiveFeeds() {
      this.$axios.$get(SOCIAL_FEEDS).then((response) => {
        const res = !!response.data && response.data.length > 0
        this.socialAuthFeeds = !res
        this.$store.dispatch('mobile/header/showBlurAndActive', !res)
      })
    },
    cancel() {
      this.socialAuthFeeds = false
      setTimeout(() => {
        this.startArchiveModal = true
      }, 900)
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
    },
    closeAccount() {
      this.socialAuthFeeds = false
      this.startArchiveModal = false
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
    addFeed() {
      this.socialAuthFeeds = true
      this.startArchiveModal = false
    },
    finish() {
      this.addFeedSection = false
      setTimeout(() => {
        this.archiveSystemSetting = true
      }, 700)
    },
    async authorize(provider) {
      await this.$social.redirect(provider)
    },
    async authorizeTwitter() {
      const apiUrl = `${SOCIAL_AUTH}/twitter/`
      await this.$social.redirectOAuth1('twitter', apiUrl)
    },
    closeArchiveSystemSetting() {
      this.archiveSystemSetting = false
      setTimeout(() => {
        this.addFeedSection = true
      }, 700)
    },
    saveAllWork() {
      this.addFeedSection = true
      this.cancelBtn = true
      this.socialAuthFeeds = false
      this.startArchiveModal = false
      this.emailBackBtn = false
      this.finishWorkBtn = false
      this.archiveSystemSetting = false
      this.guestEmail = ''
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.dispatch('mobile/header/showBlurAndActive', false)
    },
    async sendGuestEmail() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
            email: this.guestEmail,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.guestEmail = ''
            this.cancelBtn = false
            this.emailBackBtn = false
            this.emailVerified = false
            setTimeout(() => {
              this.finishWorkBtn = true
            }, 700)
            this.$v.$reset()
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
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
      this.finishWorkBtn = false
      setTimeout(() => {
        this.cancelBtn = true
      }, 700)
      this.$v.$reset()
    },
  },
}
</script>
<style lang="scss" scoped>
.profile {
  width: 500px;
  height: 100vh;
  top: 0px;
  z-index: 9999999999;
}

.setup {
  bottom: 530px;
}

.scroll {
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e4801d;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e4801d;
  }
}

.form-card > .error {
  margin-top: 0px;
}

@media (max-width: 767px) {
  .profile {
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999999;
  }
  .scroll {
    scrollbar-color: #e4801d #ececec; /* Firefox 64 */
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #e4801d;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #e4801d;
    }
  }
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

@media (max-width: 767px) {
  .overlay-web {
    left: 0 !important;
    height: 100%;
  }
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
    right: 92%;
  }
}

.animRight {
  transform: translateX(0);
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
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
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
  height: calc(100% - 42px); // this 42 is bottom button height
}
</style>
