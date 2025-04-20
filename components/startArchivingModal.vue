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
      v-if="!showPasswordConfirmModal"
      class="
        w-100-minus
        z-9999
        md:h-48
        h-32
        bg-dark-100
        shadow-md
        rounded-2xl
        flex flex-col
        items-center
        justify-center
      "
    >
      <p class="md:text-xl text-lg text-white">Add feeds to start archiving</p>
      <div
        class="
          w-full
          md:mt-8
          mt-3
          flex flex-row
          items-center
          md:justify-center
          justify-between
          md:space-x-5
          space-x-3
          px-2
        "
      >
        <!-- <a :href="closeAccountInfo" download> -->
        <button
          :disabled="downloadProcess"
          type="submit"
          class="
            md:w-44
            w-1/2
            py-2
            text-yellow-primary
            rounded-full
            border border-yellow-primary
            outline-none
            font-bold
            md:text-base
            text-sm
          "
          :style="{
            color: globalColorPanel.backgroundColor,
            borderColor: globalColorPanel.backgroundColor,
          }"
          @click="closeAccount"
        >
          Close Account
        </button>
        <!-- </a> -->
        <button
          type="submit"
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
          :style="{
            backgroundColor: globalColorPanel.backgroundColor,
            borderColor: globalColorPanel.backgroundColor,
          }"
          @click="addFeed()"
        >
          Add Feeds
        </button>
      </div>
    </div>
    <alert-confirm-modal
      title="Are you sure you want to close your account?"
      message="This action cannot be undone, you will be unable to recover your account, and your archive will be deleted from our system."
      confirm-btn-text="Close Account"
      cancel-btn-text="Exit"
      top-exit-btn-color="text-yellow-midlight"
      :processing="downloadProcess"
      :show="deleteAlert"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>

    <password-confirmation-modal
      v-if="showPasswordConfirmModal"
      @isValidPassword="isValidPassword"
      @close="closePasswordConfirmModal"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AlertConfirmModal from './AlertConfirmModal.vue'
import { USER_PROFILE } from '~/constants/urls'
import PasswordConfirmationModal from '~/components/PasswordConfirmationModal.vue'

export default {
  name: 'StartArchivingModal',
  components: { AlertConfirmModal, PasswordConfirmationModal },
  data() {
    return {
      closeAccountInfo: '',
      downloadProcess: false,
      deleteAlert: false,
      showPasswordConfirmModal: false,
    }
  },
  computed: {
    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
    ...mapState(['globalColorPanel']),
    user() {
      return this.$auth.user
    },
  },
  methods: {
    deleteCancel() {
      this.deleteAlert = false
      this.addFeed()
    },
    async deleteConfirm() {
      this.downloadProcess = true
      try {
        const response = await this.$axios({
          url: USER_PROFILE,
          method: 'DELETE',
        })
        this.$toast.success('Your account closed successfully!', {
          className: ['toasted-bg-archive'],
        })
        this.deleteAlert = false
        if (response.data.refund > 0) {
          this.$store.commit('socialFeed/SET_REFUND_AMOUNT', response.data)
          this.$store.commit('socialFeed/SHOW_REFUND_MODAL', true)
        }
        if (response.data.refund === 0 || this.user.isOwner === false) {
          this.logout()
        }
        this.downloadProcess = false
      } catch (err) {
        if (err.response.status === 411) {
          this.$toast.success('Your account closed successfully!', {
            className: ['toasted-bg-archive'],
          })
          this.deleteAlert = false
          this.$store.commit(
            'socialFeed/SET_REFUND_AMOUNT',
            err.response.refund
          )
          this.$store.commit('socialFeed/SHOW_REFUND_MODAL', true)
        }
        this.downloadProcess = false
      }
    },
    logout() {
      this.$toast.clear()
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
    closeAccount() {
      this.showPasswordConfirmModal = true
      this.$store.commit('confirm/SET_FROM_CLOSE_ACCOUNT', true)
    },
    addFeed() {
      this.$emit('addFeed')
    },
    closePasswordConfirmModal() {
      this.showPasswordConfirmModal = false
    },
    isValidPassword() {
      this.closePasswordConfirmModal()
      this.deleteAlert = true
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
