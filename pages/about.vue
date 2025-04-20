<template>
  <transition-group name="page">
    <div
      v-if="$fetchState.pending"
      :key="1"
      class="
        bg-ash-dark
        h-full
        about-area
        md:pt-52
        pt-26
        md:pb-24
        pb-5
        md:px-101
        px-8
      "
    >
      <div
        class="
          md:grid md:grid-cols-1 md:gap-4
          flex flex-col-reverse
          md:place-items-center
          w-full
          h-full
        "
      >
        <div
          class="
            about-content
            col-span-1
            md:pr-0 md:pl-0
            px-0
            w-full
            h-full
            animate-pulse
          "
        >
          <h2 class="md:mt-0 my-6 bg-gray-1500 h-6 w-1/6 rounded-lg"></h2>
          <div class="bg-gray-1500 h-12 w-full rounded-lg"></div>
          <br />
          <div class="bg-gray-1500 h-36 w-full rounded-lg"></div>
          <br />
          <div class="bg-gray-1500 h-12 w-full rounded-lg"></div>
          <br />
          <div class="bg-gray-1500 h-28 w-full rounded-lg"></div>
          <br />
          <div class="bg-gray-1500 h-28 w-full rounded-lg"></div>
        </div>
        <div
          v-if="betaVersion"
          class="
            about-content
            col-span-1
            md:pr-0
            px-0
            w-full
            h-full
            animate-pulse
          "
        >
          <h2 class="md:mt-0 my-6 h-6 w-1/6"></h2>
          <div class="bg-gray-1500 h-8 w-full rounded-t-lg"></div>
          <div class="bg-gray-1500 h-80 w-full rounded-b-lg"></div>
        </div>
      </div>
    </div>

    <section v-else :key="2" class="bg-white">
      <div class="" @click="closeStarterModal">
        <div
          class="
            bg-ash-dark
            h-auto
            about-area
            md:pt-52
            pt-26
            md:pb-24
            pb-5
            md:px-101
            px-8
          "
        >
          <div
            v-if="aboutInfo"
            class="
              md:grid md:grid-cols-1 md:gap-4
              flex flex-col-reverse
              md:place-items-center
            "
          >
            <div class="about-content col-span-1 md:text-start">
              <h2
                class="
                  md:text-5xl
                  text-3xl
                  md:mt-0
                  my-6
                  text-yellow-primary text-justify
                "
              >
                {{ aboutInfo.title }}
              </h2>
              <div
                class="text-gray-1500 text-lg md:text-justify text-left"
                v-html="aboutInfo.description"
              ></div>
            </div>
            <div
              v-if="aboutInfo.mediaType === 'image' && betaVersion"
              class="col-span-1 w-full flex justify-center"
            >
              <img
                :src="aboutInfo.media"
                alt="SharpArchive About page related image"
              />
            </div>
            <div
              v-if="aboutInfo.mediaType === 'video' && betaVersion"
              class="col-span-1 w-full"
            >
              <video-embed :src="aboutInfo.media"></video-embed>
            </div>
          </div>
        </div>
      </div>
      <landing-footer class="pb-24 bg-white"></landing-footer>
    </section>
  </transition-group>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import LandingFooter from '~/components/setup/LandingFooter.vue'
import { ABOUT } from '~/constants/urls'

export default {
  name: 'About',
  components: { LandingFooter },
  loading: true,
  auth: false,
  props: [],
  data() {
    return {
      aboutInfo: null,
    }
  },
  async fetch() {
    const res = await this.$axios.$get(ABOUT)
    this.aboutInfo = res.data
  },
  head() {
    return {
      title: 'About',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.appURL}/${this.$route.name}`,
        },
      ],
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    question: {
      required,
    },
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
      betaVersion: 'betaVersion',
    }),
  },
  mounted() {
    this.$store.commit('SET_LANDING_LOADER', false)
    this.setHeaderWidth(true)
  },
  methods: {
    toggle(id) {
      const ele = event.target.nextElementSibling
      if (ele.classList.contains('show')) {
        ele.classList.remove('show')
      } else {
        ele.classList.add('show')
      }
      this.faqInfo.faqs = this.faqInfo.faqs.map((item) => {
        if (Number(item.id) === Number(id)) {
          item.collaps = !item.collaps
          return item
        }
        return item
      })
    },
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
      setHeaderWidth: 'set_header_width',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      if (this.starterExpanded) {
        this.collapse_starter_modal(true)
        this.show_sign_up(false)
      }
      setTimeout(() => {
        this.expand_starter_modal(false)
      }, 100)
      this.maximize_starter_modal(false)
      this.updateSetupContent('starter-button')
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>

<style lang="scss" scoped>
.about-content {
  padding-left: 0px;
}
.about-content p {
  @apply my-6 text-gray-300;
}
.faq-content {
  @apply bg-gray-100 my-4 shadow-lg rounded-2xl lg:px-8 md:px-8 px-5 lg:pt-6 md:pt-6 pt-3 relative;
  // lg:py-6 md:py-6 py-3
}
.faq-content p {
  @apply my-2 text-gray-600 md:text-justify text-left lg:pb-6 md:pb-6 pb-3;
}

.faq-textarea {
  width: 100%;
}

.scroll {
  scrollbar-color: #e4801d #ececec; /* Firefox 64 */
  &::-webkit-scrollbar-thumb {
    background: #e4801d;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e4801d;
  }
}
.hide {
  p {
    opacity: 0;
  }
  height: 0px;
}
.show {
  p {
    opacity: 1;
  }
  height: auto;
}

// top slide
.topSlide-enter,
.topSlide-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.topSlide-enter-active,
.topSlide-leave-active {
  transition: all 0.2s;
}

@media (max-width: 767px) {
  .about-content {
    text-align: center;
  }
}
</style>
