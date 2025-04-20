<template>
  <div
    class="
      right-0
      fixed
      bg-ash-dark
      profile
      transition-all
      duration-800
      ease-in-out
      overflow-y-auto
      scroll
      top-0
      intro
    "
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full h-full">
        <div class="flex justify-center items-center md:mt-28 mt-20">
          <sharp-archive-lock-screen-logo />
        </div>
        <div class="log-info">
          <div
            class="
              md:h-full
              flex flex-col
              md:mt-0
              2xl:pb-80
              xl:pb-52
              md:pb-44
              mt-102
              items-center
              md:flex-row md:justify-center md:space-x-4
              space-y-4
            "
          >
            <img
              v-if="user.avatar"
              class="
                object-cover
                rounded-full
                md:w-34 md:h-34
                w-32
                h-32
                md:mt-3.5
              "
              :src="user.avatar"
              :alt="`${user.firstName} Profile Picture`"
            />
            <lock-account-logo
              v-else
              class="md:h-34 md:w-34 w-32 h-32 md:mt-3.5"
            />
            <div class="mt-5 md:mt-0 align-middle">
              <h2 class="text-xl font-bold text-center text-white">
                {{ user.firstName }}
              </h2>
              <div
                class="
                  relative
                  flex
                  items-center
                  rounded-full
                  bg-purple-1200
                  mt-4
                "
              >
                <lock-svg-logo
                  class="
                    ml-4
                    cursor-pointer
                    top-3
                    xl:text-lg
                    md:text-md
                    realtive
                  "
                />
                <div class="w-full">
                  <input
                    v-model.trim="password"
                    title="Type your password and hit enter"
                    type="password"
                    class="
                      py-2
                      pr-4
                      ml-4
                      text-center
                      border-none
                      rounded-tr-full rounded-br-full
                      outline-none
                      bg-purple-1200
                    "
                    placeholder="Enter your password"
                    @keyup.enter="logIn"
                    @blur="$v.password.$touch()"
                  />
                </div>
              </div>

              <div class="h-4 my-1">
                <template v-if="$v.password.$error">
                  <p class="text-xs text-center text-red-500">
                    The password field is required
                  </p>
                </template>
              </div>

              <div class="w-full">
                <div
                  class="flex flex-row items-center justify-center btn-wrapper"
                >
                  <button
                    type="submit"
                    class="
                      w-32
                      px-2
                      py-1
                      text-center text-white
                      rounded-full
                      bg-yellow-primary
                    "
                    :disabled="progress"
                    @click="logIn()"
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
                      <span>Log In</span>
                      <fa
                        v-if="progress"
                        class="w-4 h-4
                          absolute
                          right-1
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
          </div>
        </div>
      </div>
    </div>
    <loading v-if="progress"></loading>

    <div class="fixed h-auto w-auto bottom-6 right-6">
      <div
        class="
          absolute
          bottom-0
          right-0
          flex
          items-center
          justify-center
          w-8
          h-8
          bg-white
          rounded-full
          cursor-pointer
        "
        @click="showAuthBtn"
      >
        <fa class="w-5 h-5 text-ash-dark" :icon="['fas', 'cog']" />
      </div>
      <transition name="fadeIn">
        <div
          v-if="authBtn"
          class="
            absolute
            right-0
            z-10
            flex flex-col
            h-auto
            space-y-3
            w-44
            bottom-10
            shadow-3xl
          "
        >
          <button
            class="
              px-2
              py-1
              text-center
              bg-transparent
              border
              rounded-full
              border-yellow-primary
              text-yellow-primary
              bg-ash-dark
            "
            @click="forgotPasswordModal"
          >
            Reset Password
          </button>
          <button
            v-if="loggedIn"
            class="
              px-2
              py-1
              text-center text-white
              rounded-full
              bg-yellow-primary
            "
            :disabled="logoutProcess"
            @click="logout"
          >
            Log Out
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import LockSvgLogo from './LockSvgLogo.vue'
import LockAccountLogo from './LockAccountLogo.vue'
import SharpArchiveLockScreenLogo from './SharpArchiveLockScreenLogo.vue'
import Loading from './Loading.vue'
export default {
  name: 'LockScreen',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LockSvgLogo,
    // eslint-disable-next-line vue/no-unused-components
    LockAccountLogo,
    SharpArchiveLockScreenLogo,
    // eslint-disable-next-line vue/no-unused-components
    Loading,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      password: '',
      error: '',
      progress: false,
      authBtn: false,
      logoutProcess: false,
    }
  },
  validations: {
    password: {
      required,
    },
  },
  computed: {
    user() {
      return this.$auth.user
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
    passwordLength() {
      return this.password.length
    },
  },
  mounted() {
    // window.HubSpotConversations.widget.remove()
    // const status = window.HubSpotConversations.widget.status()
    // if (!status.loaded) {
    //   setTimeout(() => {
    //     window.HubSpotConversations.widget.remove()
    //   }, 1400)
    // }
  },
  methods: {
    async logIn() {
      this.$v.$touch()
      if (this.password) {
        this.$toast.clear()
        try {
          this.progress = true
          const res = await this.$axios.$post('api/security/login/', {
            username: this.user.email,
            password: this.password,
          })
          await this.$auth.setUserToken(res.access, res.refresh).then(() => {
            this.$auth.fetchUser()
            localStorage.removeItem('lockScreen')
            this.$store.commit('SET_LOCK_SCREEN', false)
          })
        } catch (e) {
          this.$toast.clear()
          this.$toast.error(
            'No active account found with the given credentials',
            {
              className: ['toasted-bg-alert'],
            }
          )
        } finally {
          this.progress = false
        }
      } else {
        this.error = 'The password field is required'
      }
    },
    showAuthBtn() {
      this.authBtn = !this.authBtn
    },
    forgotPasswordModal() {
      this.$store.commit('FORGET_PASSWORD_MODAL', true)
    },
    logout() {
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('SET_LANDING_LOADER', false)
      this.logoutProcess = true
      this.$router.push('/home')
      setTimeout(async () => {
        this.show_home_content(true)
        await this.$auth.logout({
          data: {
            refresh: this.$auth.strategy.refreshToken.get(),
          },
        })
        this.logoutProcess = false
        localStorage.removeItem('lockScreen')
        this.$store.commit('SET_LOCK_SCREEN', false)
        this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
        this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)

        this.landing_content(true)
        this.expand_starter_modal(false)
        this.collapse_starter_modal(false)
        this.maximize_starter_modal(false)
        this.starter_account_maximized(false)
        this.updateSetupContent('starter-button')
        setTimeout(() => {
          this.home_wrapper(true)
        }, 1500)

        setTimeout(() => {
          this.show_home(false)
          this.show_logo_text(true)
          this.home_menu_text(true)
          setTimeout(() => {
            this.all_side_menu(false)
            setTimeout(() => {
              this.home_side_menu(false)
              this.home_menu_text(false)
              setTimeout(() => {
                this.show_logo(false)
                setTimeout(() => {
                  this.home_circle(true)
                  this.sidebar_menu(false)
                  this.sidebar_circle(false)
                  this.width_decrese(true)
                  setTimeout(() => {
                    this.home_modal(false)
                    this.slide_left(false)
                    this.slide_right(true)
                    this.login_circle(true)
                    setTimeout(() => {
                      this.home_header(false)
                      this.slide_full_right(true)
                      this.home_circle(false)
                      this.home_sidebar(false)
                      setTimeout(() => {
                        this.after_logout(true)
                        setTimeout(() => {
                          this.text_loading(true)
                          setTimeout(() => {
                            this.successfully(false)
                            setTimeout(() => {
                              setTimeout(() => {
                                this.login_button_transition(false)
                                this.submit_button_transition(false)
                                this.login_form_transition(false)
                                setTimeout(() => {
                                  this.after_logout(false)
                                  this.text_loading(false)
                                  this.after_loading(false)
                                  this.width_increase(false)
                                  this.full_width(false)
                                  this.header_text(false)
                                  this.loading_text(false)
                                  this.width_decrese(false)
                                  this.slide_right(false)
                                  this.slide_full_right(false)
                                }, 1000)
                              }, 300)
                            }, 500)
                          }, 1800)
                        }, 800)
                      }, 800)
                    }, 800)
                  }, 600)
                }, 500)
              }, 0)
            }, 0)
          }, 800)
        }, 200)
      }, 600)

      this.set_header_width(false)
      this.setIsSticky(false)
    },
    ...mapActions({
      setIsSticky: 'set_sticky',
      set_header_width: 'set_header_width',
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',

      login_button_transition: 'loginAnimation/login_button_transition',
      submit_button_transition: 'loginAnimation/submit_button_transition',
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
.intro {
  background: url(~/assets/img/landing/landing_bg_img_logo1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: #222831;
}
.lock-screen {
  z-index: 9999999999;
}
.profile {
  width: 100%;
  height: 100%;
  z-index: 9999999999;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave {
  opacity: 1;
}
.log-info {
  height: calc(100% - 256px);
}

@media (max-width: 767px) {
  .log-info {
    height: calc(86% - 228px);
  }
}
</style>
