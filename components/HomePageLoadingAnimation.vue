<template>
  <section class="main-wrapper">
    <div
      class="h-screen top-0 right-0 fixed inner_login overflow-hidden"
      :class="[
        header ? 'z-10' : '',
        widthIncrease ? 'afterloading_innerhome2' : '',
        fullWidth ? 'afterloading_innerhome3' : '',
        widthDecrese ? 'afterlogout_innerhome3' : '',
        slideFullRight ? 'afterlogout_innerhome3' : '',
      ]"
    >
      <Header :header-text="headerText" @showProfile="showProfile = true" />
    </div>
    <div
      class="
        h-screen
        top-0
        right-0
        fixed
        md:px-21
        px-4
        login
        transition-all
        duration-800
        ease-in-out
        overflow-hidden
        md:shadow-none
        drop-shadow-2xl
        md:z-31
      "
      :class="[
        showLogin && !starterExpanded ? 'show' : 'hide',
        afterLoading ? 'main_div' : '',
        afterLogout ? 'main_div1' : '',
      ]"
    >
      <the-side-bar-animate />
      <Home class="home" />
      <form
        novalidate
        @submit.prevent="
          !loginButtonTransition ? logIn() : verification(otpCode)
        "
      >
        <transition name="login_form">
          <div v-if="!loginFormTransition">
            <div class="flex flex-row justify-between items-center pt-4">
              <div>
                <h3 class="text-orange-dark text-2xl md:hidden">Log In</h3>
              </div>
              <div class="md:hidden cursor-pointer" @click="hideForm()">
                <fa
                  class="text-orange-dark text-2xl"
                  :icon="['fas', 'times']"
                />
              </div>
            </div>
            <div
              class="
                absolute
                md:block
                hidden
                top-0
                right-0
                pr-5
                pt-5
                cursor-pointer
              "
              @click="hideForm()"
            >
              <fa class="text-orange-dark w-5 h-5" :icon="['fas', 'times']" />
            </div>
            <div class="pt-17.8">
              <h3 class="text-orange-dark text-2xl md:block hidden">Log In</h3>
            </div>
            <transition-group name="field-fadeIn" mode="out-in">
              <div
                v-if="hideInputField"
                key="input-field"
                class="mt-5.8 w-full"
              >
                <div
                  class="
                    w-full
                    flex flex-row
                    items-center
                    rounded-full
                    pl-5
                    bg-white
                  "
                >
                  <fa class="text-orange-dark mx-2" :icon="['fas', 'user']" />
                  <input
                    v-model.trim="email"
                    class="
                      outline-none
                      rounded-r-full
                      bg-white
                      w-full
                      h-10
                      placeholder-gray-1200 placeholder-opacity-50
                      text-gray-1200
                      pl-1
                      pr-5
                    "
                    type="email"
                    placeholder="Email"
                    @blur="$v.email.$touch()"
                  />
                </div>
                <template v-if="$v.email.$error">
                  <p v-if="!$v.email.required" class="text-red-500 text-xs">
                    Email is Required
                  </p>
                  <p v-else-if="!$v.email.email" class="text-red-500 text-xs">
                    Email is Invalid
                  </p>
                </template>

                <p v-if="!errorEmail" class="text-red-500 text-xs">
                  Email is Invalid
                </p>
                <div
                  class="
                    w-full
                    mt-5
                    flex flex-row
                    items-center
                    rounded-full
                    px-5
                    bg-white
                  "
                >
                  <fa class="text-orange-dark mx-2" :icon="['fas', 'lock']" />
                  <input
                    v-model.trim="password"
                    class="
                      outline-none
                      bg-white
                      w-full
                      h-10
                      placeholder-gray-1200 placeholder-opacity-50
                      text-gray-1200
                      pl-1
                    "
                    :type="togglePassword ? 'password' : 'text'"
                    placeholder="Password"
                    @blur="$v.password.$touch()"
                  />
                  <fa
                    class="text-orange-dark mx-2 w-4 h-4"
                    :icon="['fas', togglePassword ? 'eye-slash' : 'eye']"
                    @click="togglePassword = !togglePassword"
                  />
                </div>
                <template v-if="$v.password.$error">
                  <p v-if="!$v.password.required" class="text-red-500 text-xs">
                    Password is Required
                  </p>
                  <p
                    v-else-if="!$v.password.minLength"
                    class="text-red-500 text-xs"
                  >
                    Password is Invalid
                  </p>
                </template>
                <p v-if="!errorPassword" class="text-red-500 text-xs">
                  Password is Invalid
                </p>
                <div
                  class="
                    mt-2.5
                    relative
                    md:block
                    flex flex-row
                    justify-between
                    items-center
                    md:px-0
                    px-2
                  "
                >
                  <label class="inline-flex items-center">
                    <input
                      v-model="rememberMe"
                      type="checkbox"
                      class="
                        form-checkbox
                        md:w-5
                        w-4
                        md:h-5
                        h-4
                        bg-offwhite-300
                        border-offwhite-300
                        text-orange-midlight
                      "
                    />
                    <span class="ml-2 text-offwhite-300 md:text-lg text-md"
                      >Remember me</span
                    >
                  </label>
                  <p
                    class="
                      md:hidden
                      text-orange-dark
                      md:text-lg
                      text-md
                      cursor-pointer
                    "
                    @click="showForgetPasswordModal()"
                  >
                    Forgot Password
                  </p>
                </div>
                <p
                  class="
                    md:block
                    hidden
                    mb-6
                    text-orange-dark text-lg
                    cursor-pointer
                  "
                  @click="showForgetPasswordModal()"
                >
                  Forgot Password
                </p>
              </div>
              <div
                v-if="!hideInputField"
                key="otp-field"
                class="my-0 mt-5.8 text-center email-verify"
              >
                <legend class="text-white md:text-lg text-md">
                  Please enter the code you were emailed.
                </legend>
                <number-verification-panel
                  :otp-code="otpCode"
                  :message="message"
                  class="mt-8"
                  input-border-style="border-b-2 border-yellow-primary border_color"
                  input-text-style="text-3xl text-yellow-primary text-center text_color"
                  @loginVerificationCode="getVerifyCode"
                  @submit="verification"
                ></number-verification-panel>
                <p
                  class="pt-6 resend-code cursor-pointer"
                  :disabled="reSendProcess"
                  @click.stop="resendCode()"
                >
                  Resend code
                </p>
              </div>
            </transition-group>
          </div>
        </transition>
        <div
          ref="login"
          class="text-center absolute login_button_div"
          :class="[
            successfull ? 'loading_div' : 'remove_loading_div',
            loginCircle ? '' : 'hidden',
          ]"
        >
          <button
            class="
              w-44
              h-10
              text-white
              bg-orange-dark
              rounded-full
              border-none
              outline-none
              font-medium
            "
            type="submit"
            :disabled="process"
            :class="successfull ? 'loading' : 'removeLoading'"
            @click="setcookie"
          >
            <transition name="login_button" mode="out-in">
              <p
                v-if="!loginButtonTransition && !submitButtonTransition"
                key="login"
              >
                Login
              </p>
              <p
                v-else-if="loginButtonTransition && !submitButtonTransition"
                key="submit"
              >
                Submit
              </p>
            </transition>
          </button>
          <p
            class="opacity-0 text-center text-gray-900"
            :class="[
              loadingText ? 'loading_text' : '',
              textLoading ? 'text_loading' : '',
            ]"
          >
            Loading...
          </p>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import TheSideBarAnimate from './TheSideBarAnimate.vue'
import Home from '~/pages/home.vue'
import Header from '~/components/home/LatestArchive/Header.vue'
import NumberVerificationPanel from '~/components/inputs/NumberVerificationPanel'
import { emailVerifyOtpMixing } from '~/mixins/otp'
export default {
  components: { Home, Header, TheSideBarAnimate, NumberVerificationPanel },
  mixins: [emailVerifyOtpMixing],
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorEmail: true,
      errorPassword: true,
      togglePassword: true,
      hideLogin: this.showLogin,
      hideInputField: true,
      otpCode: '',
      process: false,
      message: '',
      saveEmailPassDuration: 60 * 60 * 24 * 3,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  computed: {
    ...mapState('loginAnimation', {
      starterExpanded: 'starterExpanded',
      loginButtonTransition: 'loginButtonTransition',
      submitButtonTransition: 'submitButtonTransition',
      loginFormTransition: 'loginFormTransition',
      successfull: 'successfull',
      afterLoading: 'afterLoading',
      home: 'home',
      sidebarMenu: 'sidebarMenu',
      circle: 'circle',
      sidebar: 'sidebar',
      homeCircle: 'homeCircle',
      loginCircle: 'loginCircle',
      slideLeft: 'slideLeft',
      showLogo: 'showLogo',
      header: 'header',
      widthIncrease: 'widthIncrease',
      fullWidth: 'fullWidth',
      homeSideMenu: 'homeSideMenu',
      allSideMenu: 'allSideMenu',
      showHome: 'showHome',
      homeMenuText: 'homeMenuText',
      showHomeContent: 'showHomeContent',
      homeWrapper: 'homeWrapper',
      showLogoText: 'showLogoText',
      headerText: 'headerText',
      loadingText: 'loadingText',

      showLogin: 'showLogin',
      widthDecrese: 'widthDecrese',
      slideFullRight: 'slideFullRight',
      afterLogout: 'afterLogout',
      textLoading: 'textLoading',
    }),
    emailErrorReset() {
      return this.email
    },
    passwordErrorReset() {
      return this.password
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
    user() {
      return this.$auth.user
    },
  },
  watch: {
    emailErrorReset() {
      this.errorEmail = true
    },
    passwordErrorReset() {
      this.errorPassword = true
    },
  },

  mounted() {
    this.generateURL()
    this.getcookiedate()
    if (this.$route.query.showLogin === 'true' && !this.loggedIn) {
      this.show_login(true)
    } else if (
      window.location.host === 'demo.sharparchive.com' &&
      !this.loggedIn
    ) {
      this.show_login(true)
    }
  },
  methods: {
    generateURL() {
      const fullUrl = window.location.origin + this.$route.path
      if (
        fullUrl === 'https://sharparchive.com/' ||
        fullUrl === 'http://sharparchive.com/'
      ) {
        this.email = ''
      }
      if (
        fullUrl === 'https://sharparchive.com/' ||
        fullUrl === 'http://sharparchive.com/'
      ) {
        this.password = ''
      }
    },
    hideForm() {
      this.$emit('hide')
      this.errorEmail = true
      this.errorPassword = true
      this.email = ''
      this.password = ''
      this.$v.$reset()
      this.show_login(false)
      this.submit_button_transition(false)
      this.login_button_transition(false)
      this.otpCode = ''
      this.hideInputField = true
      setTimeout(() => {
        this.landing_content(false)
      }, 500)
      this.rememberMe = false
    },
    ...mapActions({
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

      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',

      showForgetPassword: 'showForgetPassword',
    }),
    async resendCode() {
      await this.resendEmailVerifyCode({ email: this.email })
    },
    logIn() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$emit('login-start', true)
        this.login_button_transition(true)
        this.submit_button_transition(true)
        this.login_form_transition(true)
        setTimeout(() => {
          this.successfully(true)
          this.startAnimation()
          setTimeout(() => {
            this.loading_text(true)
          }, 600)
        }, 800)
      }
    },
    getVerifyCode(code) {
      this.otpCode = code
    },
    verification(code) {
      this.otpCode = code
      this.$toast.clear()
      if (code) {
        if (code.length === 6) {
          this.process = true
          this.$emit('login-start', true)
          this.submit_button_transition(true)
          this.login_form_transition(true)
          setTimeout(() => {
            this.successfully(true)
            this.animation(this.otpCode)
            setTimeout(() => {
              this.loading_text(true)
            }, 600)
          }, 800)
        }
      } else {
        this.$toast.error('Please enter the six digit code', {
          className: ['toasted-bg-alert'],
        })
      }
    },
    setcookie() {
      if (this.rememberMe) {
        this.$cookies.set('myEmailSharpArchive', this.email, {
          path: '/',
          maxAge: this.saveEmailPassDuration,
        })
        this.$cookies.set('myPasswordSharpArchive', this.password, {
          path: '/',
          maxAge: this.saveEmailPassDuration,
        })
      }
    },
    getcookiedate() {
      this.email = this.$cookies.get('myEmailSharpArchive')
      this.password = this.$cookies.get('myPasswordSharpArchive')
    },
    async startAnimation() {
      this.process = true
      try {
        const { data } = await this.$auth.loginWith('local1', {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        if (data.success && data.message) {
          this.loading_text(false)
          this.$emit('login-stop', false)
          this.successfully(false)
          setTimeout(() => {
            setTimeout(() => {
              this.loading_text(false)
              this.login_button_transition(true)
              this.login_form_transition(false)
              this.hideInputField = false
              setTimeout(() => {
                this.submit_button_transition(false)
                this.$toast.error(data.message, {
                  className: ['toasted-bg-archive'],
                })
              })
            }, 300)
          }, 500)
          this.process = false
        } else if (data.success && data.access) {
          localStorage.removeItem('lockScreen')
          this.$store.commit('SET_LOCK_SCREEN', false)
          this.errorEmail = true
          this.errorPassword = true
          this.loading_text(false)
          this.after_loading(true)
          setTimeout(() => {
            this.home_header(true)
          }, 2800)
          setTimeout(() => {
            this.home_modal(true)
            this.width_increase(true)
            this.header_text(true)
          }, 1100)
          setTimeout(() => {
            this.home_sidebar(true)
            this.home_circle(true)
          }, 1850)
          setTimeout(() => {
            this.login_circle(false)
            this.slide_left(true)
            this.full_width(true)
            this.$emit('login-stop', false)
          }, 1900)
          setTimeout(() => {
            this.sidebar_menu(true)
            this.sidebar_circle(true)
          }, 2850)
          setTimeout(() => {
            this.home_circle(false)
            this.show_logo(true)
            this.home_side_menu(true)
            this.home_menu_text(true)
            this.all_side_menu(true)
          }, 3500)
          setTimeout(() => {
            this.show_home(true)
            this.show_logo_text(false)
            this.home_menu_text(false)
          }, 4100)
          setTimeout(() => {
            if (this.user.paymentStatus === '' && this.user.isOwner === true) {
              this.$router.replace('/payment')
            } else if (this.$route.query.provider && this.$route.query.id) {
              this.$router.push({
                path: 'settings',
                query: {
                  provider: this.$route.query.provider,
                  id: this.$route.query.id,
                },
              })
            } else if (this.$route.query.addMoreFeed === 'true') {
              this.$router.replace('/home?addMoreFeed=true')
            } else {
              this.$router.replace('/home')
            }
          }, 5100)
        } else {
          this.$toast.error(data.message, {
            className: ['toasted-bg-alert'],
          })
          this.errorEmail = false
          this.errorPassword = false
          this.loading_text(false)
          this.$emit('login-stop', false)
          this.successfully(false)
          setTimeout(() => {
            setTimeout(() => {
              this.loading_text(false)
              this.login_button_transition(false)
              this.submit_button_transition(false)
              this.login_form_transition(false)
            }, 300)
          }, 500)
          this.process = false
        }
      } catch (e) {
        this.errorEmail = false
        this.errorPassword = false
        this.loading_text(false)
        this.$emit('login-stop', false)
        this.successfully(false)
        setTimeout(() => {
          setTimeout(() => {
            this.loading_text(false)
            this.login_button_transition(false)
            this.submit_button_transition(false)
            this.login_form_transition(false)
          }, 300)
        }, 500)
      } finally {
        this.process = false
      }
    },
    async animation(code) {
      try {
        const { data } = await this.$auth.loginWith('local2', {
          data: {
            username: this.email,
            password: this.password,
            otp: code,
          },
        })
        if (data.success) {
          this.message = data.success
          localStorage.removeItem('lockScreen')
          this.$store.commit('SET_LOCK_SCREEN', false)
          this.errorEmail = true
          this.errorPassword = true
          this.loading_text(false)
          this.after_loading(true)
          setTimeout(() => {
            this.home_header(true)
          }, 2800)
          setTimeout(() => {
            this.home_modal(true)
            this.width_increase(true)
            this.header_text(true)
          }, 1100)
          setTimeout(() => {
            this.home_sidebar(true)
            this.home_circle(true)
          }, 1850)
          setTimeout(() => {
            this.login_circle(false)
            this.slide_left(true)
            this.full_width(true)
            this.$emit('login-stop', false)
          }, 1900)
          setTimeout(() => {
            this.sidebar_menu(true)
            this.sidebar_circle(true)
          }, 2850)
          setTimeout(() => {
            this.home_circle(false)
            this.show_logo(true)
            this.home_side_menu(true)
            this.home_menu_text(true)
            this.all_side_menu(true)
          }, 3500)
          setTimeout(() => {
            this.show_home(true)
            this.show_logo_text(false)
            this.home_menu_text(false)
          }, 4100)
          setTimeout(() => {
            if (this.user.paymentStatus === '' && this.user.isOwner === true) {
              this.$router.replace('/payment')
            } else if (this.$route.query.provider && this.$route.query.id) {
              this.$router.push({
                path: 'settings',
                query: {
                  provider: this.$route.query.provider,
                  id: this.$route.query.id,
                },
              })
            } else if (this.$route.query.addMoreFeed === 'true') {
              this.$router.replace('/home?addMoreFeed=true')
            } else {
              this.$router.replace('/home')
            }
          }, 5100)
        } else {
          this.$toast.error(data.message, {
            className: ['toasted-bg-alert'],
          })
          this.loading_text(false)
          this.$emit('login-stop', false)
          this.successfully(false)
          setTimeout(() => {
            setTimeout(() => {
              this.loading_text(false)
              this.login_button_transition(true)
              this.submit_button_transition(false)
              this.login_form_transition(false)
              setTimeout(() => {
                this.message = data.success
              }, 500)
            }, 300)
          }, 500)
          this.process = false
        }
      } catch (error) {
        this.message = false
        this.loading_text(false)
        this.$emit('login-stop', false)
        this.successfully(false)
        setTimeout(() => {
          setTimeout(() => {
            this.loading_text(false)
            this.login_button_transition(true)
            this.submit_button_transition(false)
            this.login_form_transition(false)
          }, 300)
        }, 500)
        console.log(error)
      } finally {
        this.process = false
        this.message = ''
      }
    },
    hideLoginComp() {
      this.hideLogin = false
    },
    showForgetPasswordModal() {
      this.showForgetPassword(true)
      this.show_login(false)
    },
  },
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  z-index: 220;
}
.login_button_div {
  width: 390px;
  height: 40px;
  top: 360px;
  right: 30px;
}
.loading_div {
  animation: top 0.6s linear;
  animation-fill-mode: forwards;
}
@keyframes top {
  0% {
    top: 360px;
  }
  25% {
    top: 312.5px;
  }
  50% {
    top: 265px;
  }
  75% {
    top: 217.5px;
  }
  100% {
    top: 170px;
  }
}

.remove_loading_div {
  animation: top12 0.6s linear;
  animation-fill-mode: forwards;
}
@keyframes top12 {
  0% {
    top: 170px;
  }
  25% {
    top: 217.5px;
  }
  50% {
    top: 265px;
  }
  75% {
    top: 312.5px;
  }
  100% {
    top: 360px;
  }
}
.loading_text {
  animation: opacity 5s linear;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
}
@keyframes opacity {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
.text_loading {
  animation: textopacity 2s linear;
  animation-fill-mode: forwards;
}

@keyframes textopacity {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
.loading {
  animation: width 0.6s linear;
  animation-fill-mode: forwards;
}
@keyframes width {
  0% {
    width: 176px;
    top: 360px;
  }
  25% {
    width: 142px;
    top: 312.5px;
  }
  50% {
    width: 108px;
    top: 265px;
  }
  75% {
    width: 74px;
    top: 217.5px;
  }
  100% {
    width: 40px;
    border-radius: 50%;
    top: 170px;
  }
}
.removeLoading {
  animation: width12 0.6s linear;
  animation-fill-mode: forwards;
}
@keyframes width12 {
  0% {
    width: 40px;
    border-radius: 50%;
    top: 170px;
  }
  25% {
    width: 74px;
    top: 217.5px;
  }
  50% {
    width: 108px;
    top: 265px;
  }
  75% {
    width: 142px;
    top: 312.5px;
  }
  100% {
    width: 176px;
    top: 360px;
  }
}

// .login_button-leave-active {
//   transition: opacity 1s;
// }
// .login_button-leave-to {
//   opacity: 0;
// }
.login_button-enter-active,
.login_button-leave-active {
  transition: opacity 0.5s;
}
.login_button-enter,
.login_button-leave-to {
  opacity: 0;
}
.login_button-enter-active {
  transition-delay: 0.5s;
}
.login_form-leave-active,
.login_form-enter-active {
  transition: opacity 1s;
}
.login_form-leave-to,
.login_form-enter {
  opacity: 0;
}
.login_form-leave-from,
.login_form-enter-to {
  opacity: 1;
}
.login {
  width: 450px;
  right: 0px;
  background-color: #171d26;
}
.inner_login {
  width: 0%;
  background-color: #393e46;
  transition: width 1.5s ease-in-out, width 1.5s ease-in-out;
}
.afterloading_innerhome2 {
  width: calc(225px + 0%);
  background-color: #393e46;
}
.afterloading_innerhome3 {
  width: 70%;
}

.afterlogout_innerhome2 {
  width: calc(225px + 0%);
  background-color: #393e46;
}
.afterlogout_innerhome3 {
  width: 0%;
}
.show {
  width: 450px;
  right: 0px;
}
.hide {
  width: 450px;
  right: -450px;
}
.main_div {
  width: 100%;
  transition: width 1s linear;
  transition-delay: 0.4s;
}
.main_div1 {
  width: 450px;
  transition: width 1s linear;
}
@media (max-width: 767px) {
  .login {
    height: 420px;
    width: 100%;
    right: -100%;
    border-radius: 0 0 1.563rem 1.563rem;
    z-index: 40;
  }
  .show {
    width: 100%;
    right: 0px;
  }
  .hide {
    width: 100%;
    right: -100%;
  }
  .home {
    display: none;
  }
  .afterloading_innerhome2 {
    width: 100%;
  }
  .login_button_div {
    width: 100%;
    right: 0px;
  }
  .inner_login {
    z-index: 41;
  }
}
.resend-code {
  @apply text-white outline-none border-none;
}
.field-fadeIn-enter-active,
.field-fadeIn-leave-active {
  transition: opacity 0.5s;
}
.field-fadeIn-enter,
.field-fadeIn-leave-to {
  opacity: 0;
}
.field-fadeIn-enter-active {
  transition-delay: 0.6s;
}

@media (max-width: 826px) {
  .login {
    z-index: 31;
  }
}
</style>
