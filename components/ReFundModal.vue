<template>
  <div
    class="
      close_account
      top-15
      fixed
      inset-0
      h-screen
      flex
      items-center
      justify-center
      transition-all
      duration-500
      delay-500
    "
    :class="showHomeContent ? 'opacity-0' : ''"
  >
    <div
      class="
        w-100-minus
        z-9999
        md:h-62
        h-72
        bg-dark-100
        shadow-md
        rounded-2xl
        flex flex-col
        items-center
        justify-center
        pb-2
      "
    >
      <p class="md:text-xl text-lg text-white p-0 m-0">
        Your refund money is ${{
          refundAmount.refund ? refundAmount.refund : 0.0
        }}
      </p>
      <p class="text-md md:px-12 px-5 text-white text-center mt-3">
        On {{ refundAmount.date }} you were billed ${{
          refundAmount.paid ? refundAmount.paid : 0.0
        }}
        in advance, including today, there is
        {{ leftDays(refundAmount) }}% left in your cycle. If you cancel, we will
        credit you ${{ refundAmount.credit ? refundAmount.credit : 0.0 }}.
      </p>
      <div
        class="
          w-full
          md:mt-8
          mt-3
          flex flex-row
          items-center
          justify-center
          px-2
        "
      >
        <button
          type="button"
          class="
            md:w-44
            w-1/2
            p-2
            text-white
            bg-yellow-primary
            rounded-full
            border border-yellow-primary
            outline-none
            font-bold
            md:text-base
            text-sm
          "
          @click="reFundOk()"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ReFundModal',
  data() {
    return {
      reFund: 0.0,
    }
  },
  computed: {
    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
    ...mapState('socialFeed', ['refundAmount']),
    user() {
      return this.$auth.user
    },
  },
  methods: {
    leftDays(refundAmount) {
      if (refundAmount.daysLeft > 0 && refundAmount.daysCycle > 0) {
        const days = (refundAmount.daysLeft / refundAmount.daysCycle) * 100
        return days.toFixed(2)
      } else {
        const days = 0
        return days.toFixed(2)
      }
    },
    reFundOk() {
      this.$store.commit('SET_LANDING_LOADER', false)
      this.$router.push('/home')
      setTimeout(async () => {
        this.show_home_content(true)
        await this.$auth.logout({
          data: {
            refresh: this.$auth.strategy.refreshToken.get(),
          },
        })
        this.$store.commit('socialFeed/SET_REFUND_AMOUNT', {})
        this.$store.commit('socialFeed/SHOW_REFUND_MODAL', false)
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
.close_account {
  z-index: 102;
}

.w-100-minus {
  @apply w-101;
}

@media (max-width: 767px) {
  .w-100-minus {
    width: calc(100% - 35px);
  }
}

.btn-max-w {
  max-width: 250px;
}
</style>
