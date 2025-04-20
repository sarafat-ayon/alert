<template>
  <section
    class="
      bg-ash-default
      overflow-y-auto
      scroll
      md:overflow-hidden
      w-full
      relative
      md:fixed
    "
  >
    <a
      class="w-full h-17 md:h-20"
      href="https://sharparchive.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <guest-archive-logo
        class="relative"
        :hide-feed-connect="hideFeedConnect"
      ></guest-archive-logo>
    </a>
    <div
      class="
        w-full
        flex flex-col
        justify-center
        items-center
        relative
        z-9999
        body-wrapper
      "
    >
      <div class="w-full h-full flex justify-center items-center flex-grow">
        <div class="message_wrapper p-4 rounded-xl text-center md:w-103 pt-13">
          <div>
            <p class="text-white text-lg">
              {{ sender ? sender.businessName : null }} Company has requested
              access to your accounts to archive the content.
              <span
                class="bulk-download_button cursor-pointer"
                @click="showGuestModal = true"
              >
                Click here to learn more about what this means.
              </span>
            </p>
          </div>

          <!-- <SelectedAccessType /> -->
          <div
            class="
              connect-account-wrapper
              flex flex-col
              justify-center
              items-center
              mt-4
              md:space-y-4
            "
          >
            <div class="email-wrapper">
              <p class="text-orange-600 text-center">Email</p>
              <div
                class="
                  email-template
                  md:space-x-4
                  space-y-4
                  md:space-y-0
                  my-4
                  flex flex-wrap
                  md:flex-nowrap
                  justify-center
                "
              >
                <div class="relative">
                  <img
                    v-if="hideText($config.workflow)"
                    src="~/assets/img/png/btn_google_signin_light_normal_web.png"
                    class="cursor-pointer"
                    alt="gmailSvg Icon"
                    @click.stop="authorize('google')"
                  />
                  <div
                    v-if="googleProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ googleProvider.length }}
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <MicrosoftOutlookIcon
                    class="cursor-pointer"
                    @click.stop="authorize('microsoft')"
                  />
                  <div
                    v-if="microsoftProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ microsoftProvider.length }}
                    </div>
                  </div>
                </div>
                <!-- <div class="w-16 h-16 rounded-full bg-white">
                  <img
                    :src="gmail"
                    class="w-16 h-16 cursor-pointer p-3"
                    alt="gmailSvg Icon"
                    @click.stop="authorize('google')"
                  />
                </div>
                <div class="w-16 h-16 rounded-full bg-white">
                  <img
                    :src="microsoftOutlook"
                    class="w-16 h-16 cursor-pointer p-3"
                    alt="microsoftOutlook Icon"
                    @click.stop="authorize('microsoft')"
                  />
                </div> -->
              </div>
            </div>

            <div class="social-media-wrapper">
              <p class="text-orange-600 text-center">Social media</p>
              <ul class="social-media flex justify-center space-x-3 mt-8">
                <li class="relative">
                  <a
                    href="javascript:void(0);"
                    @click.stop="authorize('twitter')"
                  >
                    <TwitterIcon 
                      class="w-15 h-15 cursor-pointer"
                    />
                  </a>
                  <div
                    v-if="twitterProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ twitterProvider.length }}
                    </div>
                  </div>
                </li>
                <li class="relative">
                  <a
                    href="javascript:void(0);"
                    @click.stop="authorize('facebook')"
                  >
                    <FacebookIcon 
                      class="w-15 h-15 cursor-pointer"
                    />
                  </a>
                  <div
                    v-if="facebookProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ facebookProvider.length }}
                    </div>
                  </div>
                </li>
                <li class="relative">
                  <a
                    href="javascript:void(0);"
                    @click.stop="authorize('linkedin')"
                  >
                    <LinkedinIcon 
                      class="w-15 h-15 cursor-pointer"
                    />
                  </a>
                  <div
                    v-if="linkedInProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ linkedInProvider.length }}
                    </div>
                  </div>
                </li>
                <li class="relative">
                  <a href="javascript:void(0);" @click="instagramModal">
                    <InstagramIcon 
                      class="w-15 h-15 cursor-pointer"
                    />
                  </a>
                  <div
                    v-if="instagramProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ instagramProvider.length }}
                    </div>
                  </div>
                </li>
              </ul>
              <ul
                class="social-media-youtube flex justify-center space-x-3 mt-8"
              >
                <li class="relative">
                  <a
                    href="javascript:void(0);"
                    @click.stop="authorize('youtube')"
                  >
                    <img
                      :src="youtube"
                      class="youtube_icon"
                      alt="Youtube logo"
                    />
                  </a>
                  <div
                    v-if="youtubeProvider.length > 0"
                    class="social-feed-count"
                  >
                    <div class="pr-0.5 pt-0.5">
                      {{ youtubeProvider.length }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          v-if="authorizationProviders.length > 0"
          class="
            fixed
            bg-ash-dark
            top-0
            right-0
            h-full
            profile
            md:rounded-l-2xl md:shadow-2xl md:py-10 md:pt-4 md:px-21
            p-4
            transition-all
            duration-500
            ease-in-out
            scroll
          "
          :class="
            hideFeedConnect
              ? 'show'
              : 'hide rounded-t-2xl shadow-2xl md:pt-4 pt-1.5'
          "
        >
          <div
            class="w-full h-6 flex md:justify-start items-center justify-center"
          >
            <fa
              v-if="right"
              class="
                arrow-icon
                text-yellow-primary
                xl:text-2xl
                md:text-xl md:font-bold
                text-2xl
                cursor-pointer
                text-left
                md:block
                hidden
              "
              :icon="['fas', 'chevron-right']"
              @click="slideRight()"
            />
            <fa
              v-if="left"
              class="
                arrow-icon
                text-yellow-primary
                xl:text-2xl
                md:text-xl md:font-bold
                text-2xl
                cursor-pointer
                text-left
                md:block
                hidden
              "
              :icon="['fas', 'chevron-left']"
              @click="slideLeft()"
            />
            <fa
              v-if="right"
              class="
                arrow-icon
                text-yellow-primary
                xl:text-2xl
                md:text-xl md:font-bold
                text-2xl
                cursor-pointer
                md:hidden
              "
              :icon="['fas', 'chevron-down']"
              @click="slideRight()"
            />
            <fa
              v-if="left"
              class="
                arrow-icon
                text-yellow-primary
                xl:text-2xl
                md:text-xl md:font-bold
                text-2xl
                cursor-pointer
                md:hidden
              "
              :icon="['fas', 'chevron-up']"
              @click="slideLeft()"
            />
          </div>
          <h5
            class="
              text-white text-lg
              py-2
              pt-11
              transition-all
              duration-500
              ease-in-out
            "
            :class="hideFeedConnect ? 'opacity-1' : 'opacity-0'"
          >
            {{ sender ? sender.businessName : null }} Company has requested
            access to your accounts to archive the content.
            <span
              class="bulk-download_button cursor-pointer"
              @click="showGuestModal = true"
            >
              Click here to learn more about what this means.
            </span>
          </h5>

          <div
            class="w-full pt-5 transition-all duration-500 ease-in-out"
            :class="hideFeedConnect ? 'opacity-1' : 'opacity-0'"
          >
            <div
              v-for="(provider, index) in authorizationProviders"
              :key="index"
              class="grid grid-cols-12 my-4"
            >
              <div class="col-span-7 flex space-x-2 justify-start items-center">
                <div>
                  <a href="javascript:void(0);">
                    <FacebookIcon v-if="provider.provider.toLowerCase() === 'facebook'"
                      class="w-10 h-10 rounded-full social-img"
                    />
                    <InstagramIcon v-if="provider.provider.toLowerCase() === 'instagram'"
                      class="w-10 h-10 rounded-full social-img"
                    />
                    <LinkedinIcon v-if="provider.provider.toLowerCase() === 'linkedin'"
                      class="w-10 h-10 rounded-full social-img"
                    />
                    <TwitterIcon v-if="provider.provider.toLowerCase() === 'twitter'"
                      class="w-10 h-10 rounded-full social-img"
                    />
                    <MicrosoftIcon v-if="provider.provider.toLowerCase() === 'microsoft'"
                      class="w-10 h-10 rounded-full social-img"
                    />
                    <img v-if="provider.provider.toLowerCase() === 'google' || provider.provider.toLowerCase() === 'youtube'"
                      :src="getSocialIcon(provider.provider)"
                      :alt="`${provider.provider} logo`"
                      class="w-10 h-10 rounded-full social-img"
                    />
                  </a>
                </div>
                <div>
                  <a href="javascript:void(0);">
                    <img
                      :src="[
                        provider.profilePic
                          ? provider.profilePic
                          : '/images/people-say/images.png',
                      ]"
                      :alt="`${provider.username}'s ${provider.provider} profile picture`"
                      class="w-10 h-10 rounded-full profile-img"
                    />
                  </a>
                </div>
                <div class="text-white">
                  <div class="flex flex-col relative has-tooltip">
                    <h4
                      class="
                        md:text-xl
                        text-sm
                        whitespace-nowrap
                        hidden
                        md:block
                      "
                    >
                      {{
                        provider.name
                          ? provider.name
                          : provider.username | strLimit(15)
                      }}
                    </h4>
                    <h5
                      v-if="
                        provider.name
                          ? provider.name.length > 15
                          : provider.username.length > 15
                      "
                      class="tooltip hidden md:block"
                    >
                      {{ provider.name ? provider.name : provider.username }}
                    </h5>

                    <h4 class="md:text-xl text-sm whitespace-nowrap md:hidden">
                      {{ provider.username | strLimit(12) }}
                    </h4>
                    <h5
                      v-if="provider.username.length > 12"
                      class="tooltip md:hidden"
                    >
                      {{ provider.username }}
                    </h5>
                  </div>

                  <p
                    class="
                      text-gray-400
                      md:text-sm
                      text-xs
                      whitespace-nowrap
                      hidden
                      md:block
                    "
                  >
                    @{{ provider.username | strLimit(20) }}
                  </p>

                  <p
                    class="
                      text-gray-400
                      md:text-sm
                      text-xs
                      whitespace-nowrap
                      md:hidden
                    "
                  >
                    @{{ provider.username | strLimit(14) }}
                  </p>
                </div>
              </div>
              <div class="col-span-5 flex justify-end items-center">
                <button
                  class="
                    md:px-8
                    px-6
                    py-1
                    border-2 border-yellow-primary
                    text-yellow-primary text-base
                    font-semibold
                    rounded-full
                  "
                  @click="deleteSocial(provider.id)"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          w-full
          flex flex-wrap
          mb-13
          justify-center
          items-center
          text-left
          sm:mt-0
          md:space-x-6
        "
      >
        <div class="lg:text-left min-width-12 mx-2">
          <p class="text-yellow-primary text-lg py-1">
            &copy; Sharp Archive {{ year }}
          </p>
        </div>
        <div class="lg:text-left text-center min-width-12 mx-2">
          <n-link
            to="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="text-yellow-primary text-lg py-1">Terms & Conditions</p>
          </n-link>
        </div>
        <div class="lg:text-left text-center min-width-12 mx-2">
          <n-link
            to="/subuser-terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="text-yellow-primary text-lg py-1">Terms of Service</p>
          </n-link>
        </div>
        <div class="lg:text-left text-center min-width-12 mx-2">
          <n-link
            to="/subuser-privacypolicy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="text-yellow-primary text-lg py-1">Privacy Policy</p>
          </n-link>
        </div>
      </div>
    </div>

    <GuestModal
      :show-guest-modal="showGuestModal"
      @closeGuestModal="showGuestModal = false"
    >
    </GuestModal>
    <div v-if="!acceptTerm" class="guest-overlay"></div>
    <guest-confirm-modal
      :accept-term="acceptTerm"
      @checked-checkbox="acceptTerm = true"
    ></guest-confirm-modal>
    <guest-instagram-modal
      v-if="showGuestInstagramModal"
      class="guest-overlay"
    ></guest-instagram-modal>
  </section>
</template>

<script>
import { mapState } from 'vuex'
// import microsoftOutlook from 'assets/img/svg/ms-symbollockup_signin_light.svg'
import gmailPng from 'assets/img/png/Google__G__Logo.svg.png'
// import microsoftOutlook from 'assets/img/svg/microsoft.svg'
import GuestModal from '~/components/GuestModal.vue'
import { randomString } from '~/utils'
import { CHECK_GUEST_REQUEST, SOCIAL_FEEDS } from '~/constants/urls'
// import microsoftSvg from '~/assets/img/svg/microsoft.svg'
import googleSvg from '~/assets/img/svg/Google__G__Logo.svg'
import youtubeIcon from '~/assets/img/png/youtube_social_circle_white.png'
import msExchangeSvg from '~/assets/img/svg/msExchange.svg'
import msOfficeSvg from '~/assets/img/svg/msOffice.svg'
import youtubePng from '~/assets/img/png/yt_logo_rgb_dark.png'
import GuestArchiveLogo from '~/components/GuestArchiveLogo.vue'
import GuestConfirmModal from '~/components/GuestConfirmModal.vue'
import GuestInstagramModal from '~/components/GuestInstagramModal.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
import MicrosoftOutlookIcon from '~/components/shared/icon/MicrosoftOutlookIcon.vue'
export default {
  name: 'Guest',
  components: {
    GuestModal,
    GuestArchiveLogo,
    GuestConfirmModal,
    GuestInstagramModal,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
    MicrosoftIcon,
    MicrosoftOutlookIcon,
  },
  auth: false,
  layout: 'guest',
  data() {
    return {
      showGuestModal: false,
      token: this.$route.params.token,
      google: googleSvg,
      youtubeCircle: youtubeIcon,
      msExchange: msExchangeSvg,
      msOffice: msOfficeSvg,
      gmail: gmailPng,
      youtube: youtubePng,
      authorizationProviders: [],
      sender: null,
      acceptTerm: true,
      right: true,
      left: false,
      hideFeedConnect: true,
    }
  },
  computed: {
    ...mapState('guest', ['showGuestInstagramModal']),
    checkRequest() {
      return this.$store.state.guest.checkRequest
    },
    year() {
      return new Date().getFullYear()
    },
    googleProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'google'
          })
        : []
    },
    microsoftProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'microsoft'
          })
        : []
    },
    facebookProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'facebook'
          })
        : []
    },
    twitterProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'twitter'
          })
        : []
    },
    linkedInProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'linkedin'
          })
        : []
    },
    instagramProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'instagram'
          })
        : []
    },
    youtubeProvider() {
      return this.authorizationProviders.length > 0
        ? this.authorizationProviders.filter((provider) => {
            return provider.provider.toLowerCase() === 'youtube'
          })
        : []
    },
  },
  watch: {
    checkRequest(data) {
      if (data) {
        this.checkGuestRequest()
      }
    },
  },
  async mounted() {
    await this.checkGuestRequest()
  },
  methods: {
    instagramModal() {
      this.$store.commit('guest/SET_GUEST_INSTAGRAM_MODAL', true)
    },
    slideRight() {
      this.hideFeedConnect = false
      setTimeout(() => {
        this.right = false
        setTimeout(() => {
          this.left = true
        })
      }, 500)
    },
    slideLeft() {
      this.hideFeedConnect = true
      setTimeout(() => {
        this.left = false
        setTimeout(() => {
          this.right = true
        })
      }, 500)
    },
    async checkGuestRequest() {
      const res = await this.$axios.$post(CHECK_GUEST_REQUEST, {
        token: this.token,
      })
      if (res.success) {
        this.authorizationProviders = res.data.feeds
        this.sender = res.data.sender
        this.acceptTerm = res.data.acceptTerm
        this.$store.commit('guest/SET_CHECK_REQUEST', false)
      } else {
        this.$store.commit('guest/SET_CHECK_REQUEST', false)
      }
    },

    async deleteSocial(id) {
      if (confirm('Are you sure you want to delete this feed?')) {
        this.$toast.clear()
        try {
          const response = await this.$axios.$delete(SOCIAL_FEEDS, {
            data: {
              id,
              token: this.token,
            },
          })
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.authorizationProviders = this.authorizationProviders.filter(
              (item) => {
                return Number(item.id) !== Number(id)
              }
            )
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    },

    async authorize(provider) {
      const state = this.token || randomString(10)
      await this.$social.redirect(provider, state)
    },

    getSocialIcon(item) {
      let socialIcon = ''
      if (item.toLowerCase() === 'google') {
        socialIcon = this.google
      } else if (item.toLowerCase() === 'youtube') {
        socialIcon = this.youtubeCircle
      }
      return socialIcon
    },

    hideText(workflow) {
      if (workflow === 'live') {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.social-feed-count {
  @apply absolute -left-1 bg-orange-600 rounded-full text-white w-7 h-7;
  top: -10px;
}

.tooltip {
  @apply absolute
  bg-offwhite-200
  text-yellow-primary
  z-100
  left-0
  -top-5
  text-left
  invisible
  p-1.5
  px-4
  rounded-xl 
  shadow-lg md:w-34 w-32
  whitespace-normal break-all;
}
.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.email-template li img {
  @apply px-2  mb-5 mt-2;
  // w-20 h-16
}
.social-media li img {
  @apply w-20 h-20;
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
  max-height: 60px;
}
.social-img,
.profile-img {
  @apply w-10 h-10;
  max-width: 40px;
}
/* .message_wrapper {
  width: 558px;
} */
.bulk-download_button {
  @apply lg:w-44 md:w-36
  h-10
  text-orange-600
  mx-1
  md:my-1 lg:mb-2 lg:mt-0
  border-none
  outline-none text-md;
}

section {
  height: 100vh;
}
.profile {
  width: 500px;
}
.guest-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}
.show {
  width: 500px;
}
.hide {
  right: -430px;
}

.svg-inline--fa.fa-w-14 {
  width: 100%;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ff8308;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
.button-style {
  @apply h-10 w-38 p-3 leading-5 whitespace-nowrap bg-white text-orange-600 font-bold rounded-full hover:text-white hover:bg-orange-600;
}
@media (min-width: 768px) {
  .body-wrapper {
    margin-top: 30px;
    @apply h-full;
  }
  @media (min-height: 520px) {
    .body-wrapper {
      margin-top: 50px;
      height: calc(100% - 150px);
    }
  }
}
@media (max-width: 767px) {
  .profile {
    width: 100%;
  }
  .show {
    top: 0px;
    right: 0px;
  }
  .hide {
    top: 95%;
    right: 0px;
  }
  .scroll {
    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
  }
  .body-wrapper {
    margin-top: 30px;
    @apply h-full;
  }
  @media (max-height: 799px) {
    .body-wrapper {
      margin-top: 50px;
      height: calc(100% - 10px);
    }
  }
}

// @media (max-width: 430px) {
//   .email-template {
//     @apply space-x-0 space-y-4 flex-wrap;
//   }
// }
.youtube_icon {
  height: 44px;
}
</style>
