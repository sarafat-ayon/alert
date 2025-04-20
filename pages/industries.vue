<template>
  <transition name="page">
    <div
      v-if="$fetchState.pending"
      class="flex items-center justify-center bg-ash-dark h-screen my-20"
    >
      <section class="flex items-center justify-around w-full h-4/5">
        <div class="w-1/2 h-2/6">
          <div
            class="
              float-right
              w-1/2
              h-full
              p-1
              pr-4
              bg-gray-1500
              rounded-lg
              animate-pulse
            "
          ></div>
        </div>
        <div class="flex w-1/2 h-2/6">
          <div class="grid w-5/6 grid-cols-4 gap-2 pl-4 grid-row-6">
            <h2
              class="
                col-span-2
                p-0.5
                text-3xl
                bg-gray-1500
                rounded-lg
                animate-pulse
              "
            ></h2>
            <p class="col-span-4 row-span-5 p-1 bg-gray-1500 rounded-lg"></p>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="w-full h-full">
      <div v-if="industries" class="h-full bg-white my-24 mt-26 w-full">
        <div class="h-full w-full" @click="closeStarterModal()">
          <div
            class="
              h-screen
              w-full
              bg-ash-dark
              relative
              flex flex-col
              md:items-center md:justify-center
            "
          >
            <div
              class="
                flex flex-col
                items-center
                justify-center
                w-full
                md:p-0
                px-4
                py-8
                pt-10
              "
            >
              <div
                class="
                  grid
                  md:grid-cols-2
                  grid-cols-1
                  md:gap-3
                  gap-4
                  w-full
                  justify-items-stretch
                "
              >
                <img
                  class="justify-self-end lg:pr-40 md:pr-20 md:w-auto w-24.5"
                  src="~/assets/img/industries/industries-shapes.png"
                  :alt="`SharpArchive ${industries.title} related picture`"
                />
                <div class="xl:pr-72">
                  <h2
                    class="
                      lg:text-50px
                      md:text-3xl
                      text-33px
                      md:text-left
                      text-center text-yellow-primary
                    "
                  >
                    {{ industries.title }}
                  </h2>
                  <div
                    class="
                      text-offwhite-600 text-2xl text-left
                      md:mt-4
                      mt-2
                      md:pr-8
                    "
                    v-html="industries.description"
                  ></div>
                </div>
                <img
                  class="md:hidden block justify-self-start w-24 pt-6"
                  src="~/assets/img/industries/shapes-3.png"
                  :alt="`SharpArchive ${industries.description} related picture`"
                />
              </div>
            </div>

            <img
              class="absolute imageBottom building-image"
              src="~/assets/img/industries/building.png"
              :alt="`SharpArchive ${industries.description} related picture`"
            />
          </div>

          <div
            v-for="(content, index) in industries.content"
            :key="index"
            class="w-full"
          >
            <div
              v-if="content.layout === 'section-1'"
              class="w-full md:pt-60 pt-32"
            >
              <div
                class="grid md:grid-cols-2 grid-cols-1 md:gap-3 h-full w-full"
              >
                <div
                  class="
                    bg-gray-1400
                    md:rounded-xl
                    w-full
                    h-full
                    flex
                    justify-end
                  "
                >
                  <div
                    class="
                      xl:w-2/3
                      lg:w-11/12
                      w-full
                      lg:pr-12
                      md:pr-6
                      pr-4
                      md:pb-20
                      pb-5
                      lg:pt-26
                      md:pt-17.8
                      pt-8
                      md:px-0
                      px-4
                    "
                  >
                    <div
                      class="
                        flex
                        md:flex-row
                        flex-col
                        items-center
                        lg:space-x-10
                        md:space-x-6 md:space-y-0
                        space-y-3
                        lg:pl-0
                        md:pl-6
                      "
                    >
                      <img
                        v-if="content.title === 'Financial Services'"
                        :src="content.logo"
                        alt="SharpArchive Financial Services related picture"
                      />
                      <img
                        v-if="content.title === 'Healthcare'"
                        :src="content.logo"
                        alt="SharpArchive Healthcare related picture"
                      />
                      <h2
                        class="lg:text-50px text-33px"
                        :style="{ color: content.titleColor }"
                      >
                        {{ content.title }}
                      </h2>
                    </div>
                    <div
                      class="
                        text-gray-light text-left
                        md:text-lg
                        text-2xl
                        md:pt-8
                        pt-2
                        lg:pl-0
                        md:pl-6
                      "
                      v-html="content.description"
                    ></div>
                  </div>
                </div>
                <div
                  class="
                    h-full
                    md:flex
                    hidden
                    items-center
                    lg:justify-end
                    justify-center
                  "
                >
                  <img
                    v-if="
                      content.mediaType === 'image' &&
                      content.title === 'Financial Services'
                    "
                    class="lg:pr-72"
                    :src="content.media"
                    alt="SharpArchive Financial Services related picture"
                  />
                  <img
                    v-if="
                      content.mediaType === 'image' &&
                      content.title === 'Healthcare'
                    "
                    class="lg:pr-72"
                    :src="content.media"
                    alt="SharpArchive Healthcare related picture"
                  />
                  <video-embed
                    v-if="content.mediaType === 'video'"
                    class="lg:pr-72"
                    :src="content.media"
                  ></video-embed>
                </div>
              </div>
            </div>

            <div
              v-if="content.layout === 'section-2'"
              class="
                flex
                items-center
                justify-center
                w-full
                md:mt-20 md:mb-14 md:py-0
                py-8
              "
            >
              <div
                class="
                  wrapper
                  lg:w-3/6
                  md:w-5/6
                  w-full
                  flex flex-col
                  items-center
                  md:p-0
                  px-4
                "
              >
                <div
                  class="
                    flex
                    md:flex-row
                    flex-col
                    items-center
                    lg:space-x-10
                    md:space-x-6 md:space-y-0
                    space-y-3
                  "
                >
                  <!-- <img class="lg:w-auto w-15" :src="content.logo" alt="" /> -->
                  <img
                    v-if="content.title === 'Government'"
                    :src="content.logo"
                    alt="SharpArchive Government related picture"
                  />
                  <img
                    v-else-if="content.titleColor === '#E0AD1F'"
                    :src="content.logo"
                    alt="SharpArchive Government related picture"
                  />
                  <img
                    v-else-if="content.title === 'Education'"
                    :src="content.logo"
                    alt="SharpArchive Education related picture"
                  />
                  <h2
                    class="lg:text-50px text-33px"
                    :style="{ color: content.titleColor }"
                  >
                    {{ content.title }}
                  </h2>
                </div>
                <div
                  class="
                    text-gray-light
                    md:text-lg
                    text-2xl
                    md:pt-8
                    pt-2
                    text-left
                  "
                  v-html="content.description"
                ></div>
              </div>
            </div>

            <div v-if="content.layout === 'section-3'" class="w-full">
              <div
                class="grid md:grid-cols-2 grid-cols-1 md:gap-3 h-full w-full"
              >
                <div
                  class="
                    h-full
                    md:flex
                    hidden
                    items-center
                    lg:justify-start
                    justify-center
                  "
                >
                  <img
                    v-if="content.mediaType === 'image'"
                    class="lg:pl-72"
                    :src="content.media"
                    :alt="`SharpArchive ${content.title} related picture`"
                  />
                  <video-embed
                    v-if="content.mediaType === 'video'"
                    class="lg:pl-72"
                    :src="content.media"
                  ></video-embed>
                </div>

                <div
                  class="
                    bg-gray-1400
                    md:rounded-xl
                    w-full
                    h-full
                    flex
                    justify-start
                  "
                >
                  <div
                    class="
                      xl:w-2/3
                      lg:w-11/12
                      w-full
                      lg:px-12
                      md:px-6
                      px-4
                      md:pb-20
                      pb-5
                      lg:pt-26
                      md:pt-17.8
                      pt-8
                    "
                  >
                    <div
                      class="
                        flex
                        md:flex-row
                        flex-col
                        items-center
                        lg:space-x-10
                        md:space-x-6 md:space-y-0
                        space-y-3
                      "
                    >
                      <img
                        class="lg:w-auto w-15"
                        :src="content.logo"
                        :alt="`${content.title} related picture`"
                      />
                      <h2
                        class="lg:text-50px text-33px"
                        :style="{ color: content.titleColor }"
                      >
                        {{ content.title }}
                      </h2>
                    </div>
                    <div
                      class="
                        text-gray-light text-left
                        md:text-lg
                        text-2xl
                        md:pt-8
                        pt-2
                      "
                      v-html="content.description"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center w-full md:my-20 py-8">
            <div
              class="
                lg:w-full
                md:w-5/6
                flex flex-col
                items-center
                md:py-0
                lg:px-101
                md:px-0
                px-4
              "
            >
              <div
                class="
                  text-yellow-primary
                  md:text-justify
                  text-left
                  md:text-lg
                  text-2xl
                "
                v-html="industries.footerText"
              ></div>
            </div>
          </div>
        </div>
        <landing-footer></landing-footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import LandingFooter from '~/components/setup/LandingFooter.vue'
import { INDUSTRIES } from '~/constants/urls'

export default {
  auth: false,
  name: 'Industries',
  components: { LandingFooter },
  data() {
    return {
      industries: null,
      imageBottom: 0,
    }
  },
  async fetch() {
    const { data } = await this.$axios.$get(INDUSTRIES)
    this.industries = data
  },
  head() {
    return {
      title: 'Industries',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.appURL}/${this.$route.name}`,
        },
      ],
    }
  },
  computed: {
    ...mapState([
      'starterExpanded',
      'isSticky',
      'headerWidth',
      'landingLoader',
    ]),
  },
  mounted() {
    this.setHeaderWidth(true)
    this.$store.commit('SET_LANDING_LOADER', false)
  },

  methods: {
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
      setHeaderWidth: 'set_header_width',
      starterCollapse: 'starterCollapse',
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
.imageBottom {
  bottom: -143px;
}

.embed-responsive-item {
  width: 550px;
}

.industrice-landing {
  background: linear-gradient(180deg, #222831 65.5%, white 34.5%) !important;
}
.building-image {
  height: 440px !important;
}

@media (max-width: 767px) {
  .building-image {
    height: 200px !important;
  }
  .imageBottom {
    bottom: -65px;
  }
}
</style>
