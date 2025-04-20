<template>
  <section
    class="
      absolute
      top-0
      flex flex-col
      justify-center
      items-center
      h-full
      w-full
      z-9999
    "
    :class="downloadLoader ? '' : 'bg-ash-dark'"
  >
    <!-- <div class="loader">
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span>
      <span style="--i: 8"></span>
      <span style="--i: 9"></span>
      <span style="--i: 10"></span>
      <span style="--i: 11"></span>
      <span style="--i: 12"></span>
      <span style="--i: 13"></span>
      <span style="--i: 14"></span>
      <span style="--i: 15"></span>
      <span style="--i: 16"></span>
      <span style="--i: 17"></span>
      <span style="--i: 18"></span>
      <span style="--i: 19"></span>
      <span style="--i: 20"></span>
    </div> -->
    <div
      :id="items[Math.floor(Math.random() * items.length)]"
      class="text-white text-lg"
    ></div>
    <logo></logo>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { SOCIAL_AUTH } from '~/constants/urls'
import Logo from '~/components/SharpArchiveSmallLogo.vue'

export default {
  name: 'AuthorizeProvider',
  components: {
    Logo,
  },
  layout: 'guest',
  auth: false,
  data() {
    return {
      items: [
        'attachedRotation',
        'blinking',
        'elementRotationInner',
        'elementRotationOuter',
        'polygon',
        'rotation',
      ],
      provider: this.$route.params.provider,
      code: this.$route.query.code,
      state: this.$route.query.state,
      error: this.$route.query.error,
      errorMessage: this.$route.query.error_description,
      responseData: null,
    }
  },
  head() {
    return {
      script: [
        {
          src: `/loader/attachedRotation.js`,
          body: true,
        },
        {
          src: `/loader/blinking.js`,
          body: true,
        },
        {
          src: `/loader/elementRotationInner.js`,
          body: true,
        },
        {
          src: `/loader/elementRotationOuter.js`,
          body: true,
        },
        {
          src: `/loader/polygon.js`,
          body: true,
        },
        {
          src: `/loader/rotation.js`,
          body: true,
        },
      ],
    }
  },
  computed: {
    ...mapState('archive', ['downloadLoader']),
    loggedIn() {
      return this.$auth.loggedIn
    },
    user() {
      return this.$auth.user
    },
  },
  async mounted() {
    const provider = this.$route.params.provider

    // get if success
    if (this.$route.query.error || this.$route.query.denied) {
      this.$toast.error(
        `Feed is not archived, because you just denied the request.`,
        {
          className: ['toasted-bg-alert'],
        }
      )
      this.redirect(this.loggedIn, provider)
    } else {
      this.$toast.clear()
      try {
        const { code, state } = this.$social.handleRedirect(provider)
        if (this.loggedIn) {
          this.state = ''
        } else {
          this.state = state
        }
        const { success, message, data } = await this.$axios.$post(
          `${SOCIAL_AUTH}/${provider}/`,
          {
            code,
            state: this.state,
          }
        )
        if (success) {
          if (
            provider === 'twitter' ||
            provider === 'instagram' ||
            provider === 'google' ||
            provider === 'microsoft' ||
            provider === 'youtube'
          ) {
            this.$toast.success('Feed Successfully Connected', {
              className: ['toasted-bg-archive'],
            })
          }
          this.responseData = data
        } else if (!success) {
          this.$toast.error(message, {
            className: ['toasted-bg-alert'],
          })
        } else if (this.error) {
          this.$toast.error(this.errorMessage, {
            className: ['toasted-bg-alert'],
          })
        } else {
          this.$toast.error('Failed to Connect Feed', {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (e) {
        this.$toast.error('Failed to Connect Feed', {
          className: ['toasted-bg-alert'],
        })
      } finally {
        this.redirect(this.loggedIn, provider)
      }
    }
  },
  methods: {
    redirect(loggedIn, provider) {
      if (loggedIn) {
        setTimeout(() => {
          this.$router.push('/home')
          if (
            (provider === 'facebook' || provider === 'linkedin') &&
            this.responseData
          ) {
            this.$store.commit(
              'mobile/header/SET_FB_AUTH_DATA',
              this.responseData
            )
            this.$store.commit('mobile/header/SET_PROVIDER_NAME', provider)
            this.$store.dispatch('mobile/header/showUpdateAddFeed')
          } else if (
            provider === 'twitter' ||
            provider === 'instagram' ||
            provider === 'google' ||
            provider === 'microsoft' ||
            provider === 'youtube'
          ) {
            setTimeout(() => {
              this.$store.commit('socialFeed/SET_ARCHIVE_FEED', true)
              this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
              this.$store.commit('mobile/header/SHOW_ADD_FEED_FINISH_BTN')
            }, 100)
          } else {
            this.$store.commit('socialFeed/SET_ARCHIVE_FEED', true)
            this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
          }
        }, 500)
      } else {
        setTimeout(() => {
          this.$router.push('/guest/' + this.state)
          if (
            (provider === 'facebook' || provider === 'linkedin') &&
            this.responseData
          ) {
            this.$store.commit(
              'mobile/header/SET_FB_AUTH_DATA',
              this.responseData
            )
            this.$store.commit('mobile/header/SET_PROVIDER_NAME', provider)
            this.$store.dispatch('mobile/header/showUpdateAddFeed')
          }
        }, 500)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  // animation: animateBG 10s linear infinite;
}
@keyframes animateBG {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
.loader {
  animation: animateBG 10s linear infinite;
  position: relative;
  width: 100px;
  height: 100px;
}
.loader span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}
.loader span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  background-image: linear-gradient(#8db230, #8db230, #8db230);
  border-radius: 50%;
  box-shadow: 0 0 10px #8db230, 0 0 20px #8db230, 0 0 40px #8db230,
    0 0 60px #8db230, 0 0 80px #8db230, 0 0 100px #8db230;
  animation: animate 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes animate {
  0% {
    transform: scale(1);
  }
  80%,
  100% {
    transform: scale(0);
  }
}
</style>
