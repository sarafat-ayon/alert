<template>
  <section>
    <transition name="right-sidebar-trans">
      <div
        v-if="showUpdateAddFeedsComp"
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
          overflow-y-auto
          scroll
          parent-scroll
          md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
          font-roboto
        "
      >
        <transition name="fadeInParent">
          <div class="h-full flex flex-wrap content-between">
            <div class="w-full">
              <div
                class="
                  w-full
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
                  <span>Add Feeds</span>
                </h2>
                <button class="absolute focus:outline-none right-0">
                  <fa
                    class="
                      text-yellow-primary
                      xl:w-6 xl:h-6
                      md:w-5 md:h-20 md:font-bold
                      w-6
                      h-6
                      cursor-pointer
                    "
                    :icon="['fas', 'times']"
                    @click="cancel()"
                  />
                </button>
              </div>
              <div
                class="
                  w-full
                  flex flex-col
                  addFeedsTable
                  rounded-2xl
                  mt-20
                  p-4
                  bg-white
                "
              >
                <div
                  v-if="fbAuthData && fbAuthData.items.length > 0"
                  class="
                    w-full
                    flex flex-col
                    h-auto
                    rounded-2xl
                    p-2
                    bg-white
                    space-y-4
                    scroll
                    table-scroll
                  "
                >
                  <div class="header flex w-full h-10 min-width-27">
                    <div
                      class="
                        min-width-4
                        text-yellow-primary
                        md:text-lg
                        text-md
                        md:font-bold
                        break-all
                        self-center
                      "
                    >
                      <span>Add</span>
                    </div>
                    <div
                      class="
                        min-width-15
                        text-yellow-primary text-2xl
                        md:text-lg
                        text-md
                        md:font-bold
                        break-all
                        self-center
                      "
                    >
                      <span>Name</span>
                    </div>
                    <div
                      class="
                        min-width-8
                        text-yellow-primary
                        md:text-lg
                        text-md
                        md:font-bold
                        break-all
                        self-center
                      "
                    >
                      <span>Type</span>
                    </div>
                  </div>
                  <div
                    class="
                      main-body
                      flex flex-col
                      w-full
                      h-full
                      space-y-4
                      min-width-27
                    "
                  >
                    <div
                      v-for="(fbData, fbIndex) in fbAuthData.items"
                      :key="fbIndex"
                      class="w-full h-14 flex items-center"
                    >
                      <div
                        class="min-width-4"
                        @click="socialStatusChange(fbData.id)"
                      >
                        <div class="toggle-btn-wrapper">
                          <input
                            :id="fbData.id"
                            v-model="fbData.added"
                            type="checkbox"
                            name="toggle"
                            class="toggle-input"
                          />
                          <label
                            :for="fbData.id"
                            class="toggle-input-label toggle-label"
                          ></label>
                        </div>
                      </div>
                      <div class="min-width-15">
                        <div class="flex items-center space-x-2">
                          <div
                            class="
                              min-w-3 min-h-3
                              profile-image
                              rounded-full
                              bg-red-600
                            "
                          >
                            <template v-if="provider === 'facebook'">
                              <img
                                v-if="fbData.picture"
                                class="
                                  min-w-3 min-h-3
                                  profile-image
                                  rounded-full
                                "
                                :src="fbData.picture"
                                :alt="`${fbData.name} Facebook Profile Picture`"
                              />
                              <instagram-icon
                                v-else-if="fbData.type === 'Instagram'"
                                class="
                                  min-w-3 min-h-3
                                  profile-image
                                  rounded-full
                                "
                              ></instagram-icon>
                              <facebook-icon
                                v-else
                                class="
                                  min-w-3 min-h-3
                                  profile-image
                                  rounded-full
                                "
                              ></facebook-icon>
                            </template>
                            <template v-if="provider === 'linkedin'">
                              <img
                                v-if="fbData.profile_image_url"
                                class="
                                  min-w-3 min-h-3
                                  profile-image
                                  rounded-full
                                "
                                :src="fbData.profile_image_url"
                                :alt="`${fbData.name} LinkedIn Profile Picture`"
                              />
                              <linkedin-icon
                                v-else
                                class="
                                  min-w-3 min-h-3
                                  profile-image
                                  rounded-full
                                "
                              ></linkedin-icon>
                            </template>
                          </div>
                          <div class="flex flex-col relative has-tooltip">
                            <h2 class="text-xl font-medium text-ash-dark">
                              {{ fbData.name | strLimit(14) }}
                            </h2>
                            <span
                              v-if="fbData.name.length > 14"
                              class="tooltip"
                              :class="
                                fbAuthData.items.length - 1 === fbIndex &&
                                fbAuthData.items.length > 4
                                  ? '-top-14'
                                  : '-top-2'
                              "
                            >
                              {{ fbData.name }}</span
                            >
                            <!-- <span
                            class="text-sm font-normal text-ash-dark opacity-80"
                            >@bobsmaith</span
                          > -->
                          </div>
                        </div>
                      </div>
                      <div
                        class="min-width-8 text-ash-dark text-xl font-medium"
                      >
                        <span class="pr-1">{{ fbData.type }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="provider === 'linkedin'"
                  class="w-full h-full flex justify-center items-center"
                >
                  <p class="text-ash-dark text-lg">
                    There is no organization under this account
                  </p>
                </div>
              </div>
              <template v-if="fbAuthData">
                <div
                  v-if="provider === 'facebook'"
                  class="
                    w-full
                    text-white text-lg
                    font-normal
                    text-justify
                    mt-10
                  "
                >
                  <p>{{ connectionNoticesFacebook.message }}</p>
                  <p class="mt-4">{{ connectionNoticesFacebook.subMessage }}</p>
                </div>
                <div
                  v-else-if="provider === 'linkedin'"
                  class="
                    w-full
                    text-white text-lg
                    font-normal
                    text-justify
                    mt-10
                  "
                >
                  <p>{{ connectionNoticesLinkedIn.message }}</p>
                  <p class="mt-4">{{ connectionNoticesLinkedIn.subMessage }}</p>
                </div>
              </template>
            </div>

            <div class="w-full">
              <div class="flex w-full justify-center relative my-4">
                <button
                  type="submit"
                  class="
                    w-44
                    py-2
                    text-white
                    bg-yellow-primary
                    rounded-full
                    border border-yellow-primary
                    outline-none
                    font-bold
                    text-base
                    relative
                  "
                  :disabled="saveProcess"
                  @click="connectToFb"
                >
                  <div
                    class="
                      rounded-full
                      relative
                      flex
                      items-center
                      justify-around
                    "
                  >
                    <span>Connect</span>
                    <fa
                      v-if="saveProcess"
                      class="
                        w-4
                        h-4
                        absolute
                        right-5
                        text-white
                        font-bold
                        animate-spin
                      "
                      :icon="['fas', 'spinner']"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <start-archiving-modal
      v-if="startArchiveModal && showBlurActiveModal"
      @closeAccount="closeAccount"
      @addFeed="addFeed"
    ></start-archiving-modal>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import twitterPng from 'assets/img/svg/twitter.svg'
import instagramPng from 'assets/img/svg/instagram-red.svg'
import facebookPng from 'assets/img/svg/facebook.svg'
import linkedinPng from 'assets/img/svg/linkedIn.svg'
import { email, required } from 'vuelidate/lib/validators'
import LinkedinIcon from './shared/icon/LinkedinIcon.vue'
import InstagramIcon from './shared/icon/InstagramIcon.vue'
import FacebookIcon from './shared/icon/FacebookIcon.vue'
import { SOCIAL_AUTH } from '~/constants/urls'
import StartArchivingModal from '~/components/startArchivingModal'

export default {
  name: 'UpdateSocialAuthFeeds',
  components: {
    StartArchivingModal,
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
  },
  data() {
    return {
      addFeedSection: true,
      saveProcess: false,
      twitter: twitterPng,
      instagram: instagramPng,
      facebook: facebookPng,
      linkedin: linkedinPng,
      socialAuthFeeds: false,
      startArchiveModal: false,
      emailBackBtn: false,
      archiveSystemSetting: false,
      emailVerified: false,
      guestEmail: '',
      emailSendProcess: false,
      showNotice: false,
      currentBtnComponent: 'CancelBtn',
      connectionNoticesFacebook: {
        message: 'Each of these are considered separate feeds.',
        subMessage: `You have connected a Facebook account. You should know that
           Facebook will require you to reauthorize your account every 60 days.
            Yes, we too find this annoying. We will try to make this as painless as possible.
             Every 60 days, you’ll get an email from us with a button to renew the connection.`,
      },
      connectionNoticesLinkedIn: {
        message: 'Each of these are considered separate feeds.',
        subMessage: `You have connected a LinkedIn account. You should know that LinkedIn will require you to reauthorize your account every year. 
          Yes, we too find this annoying. We will try to make this as painless as possible. Each year, you’ll get an email from us with a button 
          to renew the connection.`,
      },

      authorizationProviders: [],
    }
  },
  validations: {
    guestEmail: {
      required,
      email,
    },
  },
  computed: {
    showUpdateAddFeedsComp() {
      return this.$store.getters['mobile/header/getUpdateAddFeed']
    },
    showBlurActiveModal() {
      return this.$store.getters['mobile/header/showBlurActiveModal']
    },
    provider() {
      return this.$store.state.mobile.header.providerName
    },
    socialFeedLength() {
      return this.$store.getters['socialFeed/socialFeedLength']
    },
    fbAuthData: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.state.mobile.header.getFbAuthData)
        )
      },
      set(value) {
        this.$store.commit('mobile/header/SET_FB_AUTH_DATA', value)
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.showNotice = true
    }, 2000)
  },
  methods: {
    showData() {
      return this.$store.getters['mobile/header/getAuthFbData']
    },
    updateFbData(status, id, profileId) {
      this.fbAuthData.profile_id = profileId
      if (status) {
        this.fbAuthData.ids.push(id)
      }
      this.fbAuthData.state = ''
    },
    socialStatusChange(id) {
      this.fbAuthData.items.map((item) => {
        if (item.id === id) {
          item.added = !item.added
        }
        return item
      })
    },
    async connectToFb() {
      const fbData = {
        profile_id: '',
        ids: [],
        state: '',
      }
      this.fbAuthData.items.forEach((item) => {
        if (item.added) {
          fbData.ids.push(item.id)
        }
      })
      fbData.profile_id = this.fbAuthData.profile_id
      fbData.state = this.$route.params.token
      this.saveProcess = true
      this.$toast.clear()
      if (fbData.ids.length > 0) {
        try {
          const res = await this.$axios.$put(
            `${SOCIAL_AUTH}/${this.provider}/`,
            fbData
          )
          if (res.success) {
            this.$store.commit('notifications/SET_OFFSET', 0)
            this.$store.commit('notifications/SET_LIMIT', 25)
            this.$store.commit('notifications/SET_NOTIFICATION', [])
            this.$store.commit('notifications/SET_OLD_NOTIFICATION', [])
            this.$store.dispatch('notifications/getAllNotifications')
            if (this.$route.name === 'guest-token') {
              this.$store.commit('guest/SET_CHECK_REQUEST', true)
              this.$store.dispatch('mobile/header/removeUpdateAddFeed')
              this.saveProcess = false
            }
            // load feed data
            if (this.socialFeedLength === 0) {
              this.$store.commit(
                'socialFeed/SET_SHOW_ARCHIVE_SYSYTEM_SETTINGS',
                true
              )
            } else {
              this.$store.commit(
                'socialFeed/SET_SHOW_ARCHIVE_SYSYTEM_SETTINGS',
                false
              )
            }
            await this.fatchSocialFeeds()
            await this.getAllLatestData()
            await this.getAllSocialArticle()

            this.$store.dispatch('mobile/header/setFbAuthData', this.fbAuthData)
            this.$store.dispatch('mobile/header/setArchiveFbData', true)
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.$store.dispatch('mobile/header/removeUpdateAddFeed')
            this.saveProcess = false
            setTimeout(() => {
              this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
              this.$store.commit('mobile/header/SHOW_ADD_FEED_FINISH_BTN')
            }, 500)
          } else {
            this.saveProcess = false
            this.$store.dispatch('mobile/header/setArchiveFbData', false)
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (err) {}
      } else {
        this.$toast.error('Need to add atleast one feed', {
          className: ['toasted-bg-alert'],
        })
        this.saveProcess = false
      }
    },
    cancel() {
      this.$store.dispatch('mobile/header/removeUpdateAddFeed')
    },
    ...mapActions('home', [
      'getAllLatestData',
      'getAllSocialArticle',
    ]),
    ...mapActions('socialFeed', ['fatchSocialFeeds']),
    ...mapActions({
      set_header_width: 'set_header_width',
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',
      set_sticky: 'set_sticky',

      login_button_transition: 'loginAnimation/login_button_transition',
      login_form_transition: 'loginAnimation/login_form_transition',
      successfully: 'loginAnimation/successfully',
      after_loading: 'loginAnimation/after_loading',
      home_modal: 'loginAnimation/home',
      sidebar_menu: 'loginAnimation/sidebar_menu',
      sidebar_circle: 'loginAnimation/circle',
      home_sidebar: 'loginAnimation/sidebar',
      home_circle: 'loginAnimation/home_circle',
      login_circle: 'loginAnimation/login_circle',
      slide_left: 'loginAnimation/slide_left',
      show_logo: 'loginAnimation/show_logo',
      home_header: 'loginAnimation/header',
      width_increase: 'loginAnimation/width_increase',
      full_width: 'loginAnimation/full_width',
      home_side_menu: 'loginAnimation/home_side_menu',
      all_side_menu: 'loginAnimation/all_side_menu',
      show_home: 'loginAnimation/show_home',
      home_menu_text: 'loginAnimation/home_menu_text',
      show_home_content: 'loginAnimation/show_home_content',
      home_wrapper: 'loginAnimation/home_wrapper',
      show_logo_text: 'loginAnimation/show_logo_text',
      header_text: 'loginAnimation/header_text',
      loading_text: 'loginAnimation/loading_text',

      width_decrese: 'loginAnimation/width_decrese',
      slide_right: 'loginAnimation/slide_right',
      slide_full_right: 'loginAnimation/slide_full_right',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
      after_logout: 'loginAnimation/after_logout',
      text_loading: 'loginAnimation/text_loading',
    }),
  },
}
</script>
<style lang="scss" scoped>
.addFeedsTable {
  max-height: 500px;
}
.profile {
  width: 550px;
  height: 100%;
  top: 0px;
  z-index: 9999999999;
}

.scroll {
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
  overflow-x: auto;
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
    overflow-x: auto;
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
  .min-width-27 {
    min-width: 27rem;
  }
  .scroll {
    overflow-x: hidden;
  }
  .table-scroll {
    overflow-x: auto;
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

.min-width- {
  &4 {
    min-width: 4rem;
  }
  &8 {
    min-width: 7rem;
  }
  &15 {
    min-width: 15rem;
  }
}

// .min-width-10{

// }

.fadeInBtn-enter-active,
.fadeInBtn-leave-active {
  transition: opacity 1s;
}
.fadeInBtn-enter,
.fadeInBtn-leave-to {
  opacity: 0;
}

.notice-enter-active,
.notice-leave-active {
  transition: opacity 1s;
}
.notice-enter,
.notice-leave-to {
  opacity: 0;
}

.toggle-btn-wrapper {
  @apply relative inline-block w-9 mr-2 align-middle select-none transition duration-200 ease-in;
}

.toggle-input {
  @apply outline-none focus:outline-none toggle-checkbox absolute block rounded-full bg-white appearance-none cursor-pointer;
}

.toggle-input-label {
  @apply block overflow-hidden h-5 rounded-full bg-ash-default transition-all
                    duration-800
                    ease-in-out cursor-pointer;
}

.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    transition: all 0.5s ease-in-out;
    @apply bg-yellow-primary;
  }
}
.parent-scroll {
  overflow-x: hidden;
}
.profile-image {
  @apply w-13 h-13;
}

.min-w-3 {
  min-width: 3.125rem !important;
}
.min-h-3 {
  min-width: 3.125rem !important;
}
.tooltip {
  @apply absolute
  bg-yellow-primary
  text-white
  z-100
  left-0
  text-left
  invisible
  p-1.5
  px-4
  rounded-xl 
  shadow-lg w-44
  whitespace-normal break-words;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
</style>
