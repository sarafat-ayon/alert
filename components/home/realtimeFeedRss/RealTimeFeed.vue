<template>
  <section
    class="
      overflow-hidden
      md:rounded-2xl
      rounded-t-none rounded-b-2xl
      md:h-full
      mobile-height
      w-full
    "
  >
    <div
      v-if="isDesktop"
      class="
        hidden
        md:block
        rounded-3xl
        bg-gray-2000
        overflow-hidden
        h-full
        w-full
      "
    >
      <div
        class="title flex justify-center items-center px-4"
        @click="expand()"
      >
        <p
          class="
            py-2
            text-white
            font-bold
            xl:text-xl
            md:text-base
            flex-grow
            pl-5
          "
        >
          Viewer
        </p>

        <span
          class="
            static
            select-toggle
            smallDesktop:hidden
            transition-all
            duration-500
            transform
          "
          :class="feedIsExpanded ? 'rotate-180' : ' rotate-0'"
        >
          <fa :icon="['fas', 'caret-down']" />
        </span>
      </div>

      <!-- Body start -->

      <div
        id="desktop-body-wrapper"
        class="real-time-feed-body_wrapper"
        :class="hideScroll || loadArticles ? 'overflow-hidden' : 'scroll'"
      >
        <div
          id="desktop-body"
          class="
            middle-body_wrapper
            min-width-400
            max-width-690
            w-106
            relative
            md:my-0
          "
          :class="[
            show &&
            currentComp !== 'Google' &&
            currentComp !== 'Microsoft' &&
            currentComp !== 'YouTube' &&
            currentComp !== 'Faxes' &&
            currentComp !== 'Calls' &&
            currentComp !== 'Texts' &&
            currentComp !== 'Websites'
              ? 'max-width-690'
              : 'max-width-full',
            hideScroll ||
            currentComp === 'Google' ||
            currentComp === 'Microsoft' ||
            currentComp === 'YouTube' ||
            currentComp === 'Faxes' ||
            currentComp === 'Calls' ||
            currentComp === 'Texts' ||
            currentComp === 'Websites' ||
            loadArticles ||
            !showComp ||
            articles.items.length === 0
              ? 'h-full'
              : 'h-auto',
          ]"
        >
          <transition name="page">
            <div
              v-if="
                loadArticles &&
                currentComp !== 'Google' &&
                currentComp !== 'Microsoft' &&
                currentComp !== 'YouTube' &&
                currentComp !== 'Faxes' &&
                currentComp !== 'Calls' &&
                currentComp !== 'Texts' &&
                currentComp !== 'Websites'
              "
              class="
                mt-1
                p-3
                h-full
                lg:min-width-690
                md:min-width-400
                animate-pulse
              "
            >
              <h2 class="bg-gray-1500 w-8 h-2"></h2>

              <h2 class="bg-gray-1500 w-20 h-2 mt-2"></h2>

              <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
                <div
                  class="
                    w-full
                    flex flex-row
                    items-center
                    justify-start
                    p-4
                    space-x-3
                  "
                >
                  <div class="w-10 h-10 bg-white rounded-full"></div>

                  <div class="w-full">
                    <h2 class="bg-white w-20 h-2"></h2>

                    <h2 class="bg-white w-40 h-4 mt-2"></h2>
                  </div>
                </div>
              </div>

              <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
                <div
                  class="
                    w-full
                    flex flex-row
                    items-center
                    justify-start
                    p-4
                    space-x-3
                  "
                >
                  <div class="w-10 h-10 bg-white rounded-full"></div>

                  <div class="w-full">
                    <h2 class="bg-white w-20 h-2"></h2>

                    <h2 class="bg-white w-40 h-4 mt-2"></h2>
                  </div>
                </div>
              </div>

              <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
                <div
                  class="
                    w-full
                    flex flex-row
                    items-center
                    justify-start
                    p-4
                    space-x-3
                  "
                >
                  <div class="w-10 h-10 bg-white rounded-full"></div>

                  <div class="w-full">
                    <h2 class="bg-white w-20 h-2"></h2>

                    <h2 class="bg-white w-40 h-4 mt-2"></h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else-if="
                loadArticles &&
                (currentComp === 'Google' ||
                  currentComp === 'Microsoft' ||
                  currentComp === 'YouTube')
              "
              class="
                w-full
                h-full
                flex
                md:flex-row
                flex-col flex-nowrap
                animate-pulse
              "
            >
              <!-- Start Email Feed Header -->

              <div
                class="
                  transition-all
                  duration-500
                  ease-in-out
                  md:w-1/3
                  w-full
                  md:h-full
                  mobile-skeleton_height
                  opacity-100
                "
              >
                <div
                  class="
                    bg-orange-200
                    flex
                    w-full
                    h-9
                    text-md
                    font-bold
                    text-ash-primary
                    items-center
                  "
                >
                  <div class="px-4">
                    <div class="heading bg-gray-1500 w-26 h-5"></div>
                  </div>
                </div>

                <div class="flex w-full email-view-wrapper pb-0">
                  <!-- Start Email Messages -->

                  <div
                    class="
                      email-messages
                      w-full
                      h-full
                      md:border-r
                      border-yellow-300
                    "
                  >
                    <div
                      v-for="(skeleton, index) in 10"
                      :key="index"
                      class="w-full pt-4 bg-white"
                    >
                      <div
                        class="
                          singleMessageWrapper
                          px-4
                          cursor-pointer
                          relative
                        "
                      >
                        <div
                          class="
                            platform
                            text-lg
                            font-bold
                            bg-gray-1500
                            lg:space-x-0
                            space-x-2
                            whitespace-normal
                            break-words
                            w-26
                            h-8
                            mb-1
                          "
                        ></div>

                        <div
                          class="flex justify-between lg:space-x-0 space-x-2"
                        >
                          <div
                            class="
                              heading
                              text-sm text-ash-primary
                              whitespace-normal
                              break-words
                              bg-gray-1500
                              w-28
                              h-5
                              mb-1
                            "
                          ></div>

                          <div
                            class="
                              attachment
                              text-gray-light
                              cursor-pointer
                              bg-gray-1500
                              w-5
                              h-5
                            "
                          ></div>
                        </div>

                        <div
                          class="
                            flex
                            text-sm
                            justify-between
                            lg:space-x-0
                            space-x-2
                          "
                        >
                          <div
                            class="
                              short-message
                              bg-gray-1500
                              w-24
                              h-4
                              italic
                              whitespace-normal
                              break-words
                              mb-1
                            "
                          ></div>

                          <div
                            class="
                              time
                              text-sm
                              bg-gray-1500
                              w-4
                              h-4
                              whitespace-nowrap
                              mb-1
                            "
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-center py-4">
                      <div
                        class="
                          bg-gray-1500
                          h-10
                          w-34
                          rounded-full
                          relative
                          flex
                          justify-around
                          space-x-1
                          items-center
                          px-4
                          font-medium
                        "
                      ></div>
                    </div>
                  </div>

                  <!-- End Email Messages -->
                </div>
              </div>

              <!-- End Email Feed Header -->

              <div class="md:hidden px-2 w-full h-px bg-gray-1500 my-2"></div>

              <!-- Start Email View -->

              <div
                class="
                  transition-all
                  duration-500
                  ease-in-out
                  bg-white
                  md:w-2/3
                  w-full
                  md:h-full
                  mobile-skeleton_height
                "
              >
                <div
                  class="
                    bg-orange-200
                    flex
                    w-full
                    h-9
                    text-md
                    font-bold
                    items-center
                  "
                >
                  <div class="flex justify-between items-center px-4 w-full">
                    <div class="heading bg-gray-1500 w-26 h-5"></div>

                    <div class="extend cursor-pointer bg-gray-1500 h-5 w-5">
                      <div class="plus_button" data-title="Extend All"></div>
                    </div>
                  </div>
                </div>

                <div class="flex w-full email-view-wrapper pb-0">
                  <!-- Start Email Content Wrapper-->

                  <div class="email-content h-full w-full px-4 pt-2">
                    <!-- Start Email Body -->

                    <div
                      v-for="(skeleton, index) in 3"
                      :key="index"
                      class="email-body"
                    >
                      <transition name="fadeIn">
                        <div
                          class="
                            flex
                            justify-between
                            lg:flex-nowrap lg:space-y-0
                            flex-wrap
                            space-y-1
                            transition-all
                            duration-300
                            cursor-pointer
                            py-1
                          "
                        >
                          <div
                            class="
                              name-wrapper
                              flex
                              space-x-2
                              justify-between
                              items-center
                              w-2/3
                            "
                          >
                            <div
                              class="mail-name text-lg bg-gray-1500 w-26 h-6"
                            ></div>

                            <div
                              class="
                                attachment-icon-flag
                                cursor-pointer
                                self-start
                                pt-1
                                h-5
                                w-5
                                bg-gray-1500
                              "
                            ></div>
                          </div>

                          <div class="date bg-gray-1500 w-20 h-6"></div>
                        </div>
                      </transition>

                      <transition name="fadeIn">
                        <div
                          class="
                            flex flex-col
                            space-y-2
                            transition-all
                            duration-300
                            pb-3
                            pt-2
                            text-lg
                          "
                        >
                          <div
                            class="
                              subject-wrapper
                              flex
                              md:flex-nowrap md:justify-between
                              flex-wrap
                              cursor-pointer
                            "
                          >
                            <div class="subject bg-gray-1500 w-26 h-6"></div>

                            <div
                              class="
                                time
                                text-base text-gray-1700
                                bg-gray-1500
                                w-20
                                h-6
                              "
                            ></div>
                          </div>

                          <div class="from bg-gray-1500 w-24 h-6"></div>

                          <div class="to bg-gray-1500 w-22 h-6"></div>

                          <div
                            class="text-message w-full h-6 bg-gray-1500"
                          ></div>

                          <div
                            class="text-message w-full h-6 bg-gray-1500"
                          ></div>

                          <div
                            class="text-message w-full h-6 bg-gray-1500"
                          ></div>

                          <div
                            class="text-message w-full h-6 bg-gray-1500"
                          ></div>
                        </div>
                      </transition>
                    </div>

                    <!-- End Email Body -->
                  </div>

                  <!-- End Email Content -->
                </div>
              </div>

              <!-- End Email View -->
            </div>
          </transition>

          <transition name="page" mode="out-in">
            <div v-if="showComp" class="w-full h-full">
              <component
                :is="currentComp"
                class="w-full h-full"
                v-bind="currentProperties"
              ></component>
            </div>
          </transition>
        </div>
      </div>

      <!-- Body end -->
    </div>

    <!-- Small Device -->

    <div
      v-if="!isDesktop"
      id="mobile-body-wrapper"
      class="
        mobile-body_wrapper
        bg-gray-2000
        md:hidden
        flex
        justify-center
        items-start
        my-0
        overflow-x-hidden
        h-full
      "
      :class="[
        hideScroll || loadArticles || !showComp ? 'overflow-hidden' : 'scroll',
      ]"
    >
      <div
        id="mobile-body"
        class="middle-body_wrapper md:min-width-400 w-full relative"
        :class="[
          hideScroll || loadArticles || !showComp || articles.items.length === 0
            ? 'h-full'
            : 'h-auto',
        ]"
      >
        <transition name="page">
          <div
            v-if="
              loadArticles &&
              currentComp !== 'Google' &&
              currentComp !== 'Microsoft' &&
              currentComp !== 'YouTube' &&
              currentComp !== 'Faxes' &&
              currentComp !== 'Calls' &&
              currentComp !== 'Texts' &&
              currentComp !== 'Websites'
            "
            class="my-6 px-2 h-full animate-pulse block md:hidden"
          >
            <h2 class="bg-gray-1500 w-8 h-2"></h2>

            <h2 class="bg-gray-1500 w-20 h-2 mt-2"></h2>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  justify-start
                  pl-2
                  space-x-3
                "
              >
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  justify-start
                  p-4
                  space-x-3
                "
              >
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-1500 lg:h-1/4 h-52 mt-2">
              <div
                class="
                  w-full
                  flex flex-row
                  items-center
                  justify-start
                  p-4
                  space-x-3
                "
              >
                <div class="w-10 h-10 bg-white rounded-full"></div>

                <div class="w-full">
                  <h2 class="bg-white w-20 h-2"></h2>

                  <h2 class="bg-white w-40 h-4 mt-2"></h2>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="
              loadArticles &&
              (currentComp === 'Google' ||
                currentComp === 'Microsoft' ||
                currentComp === 'YouTube'
                )
            "
            class="
              w-full
              h-full
              flex
              md:flex-row
              flex-col flex-nowrap
              animate-pulse
            "
          >
            <!-- Start Email Feed Header -->

            <div
              class="
                transition-all
                duration-500
                ease-in-out
                md:w-1/3
                w-full
                md:h-full
                opacity-100
              "
              :class="
                currentComp === 'YouTube' ? 'h-full' : 'mobile-skeleton_height'
              "
            >
              <div
                class="
                  bg-orange-200
                  flex
                  w-full
                  h-9
                  text-md
                  font-bold
                  text-ash-primary
                  items-center
                "
              >
                <div class="px-4">
                  <div class="heading bg-gray-1500 w-26 h-5"></div>
                </div>
              </div>

              <div class="flex w-full email-view-wrapper pb-0">
                <!-- Start Email Messages -->

                <div
                  class="
                    email-messages
                    w-full
                    h-full
                    md:border-r
                    border-yellow-300
                    overflow-hidden
                  "
                >
                  <div
                    v-for="(skeleton, index) in 10"
                    :key="index"
                    class="w-full pt-4 bg-white"
                  >
                    <div
                      class="singleMessageWrapper px-4 cursor-pointer relative"
                    >
                      <div
                        class="
                          platform
                          text-lg
                          font-bold
                          bg-gray-1500
                          lg:space-x-0
                          space-x-2
                          whitespace-normal
                          break-words
                          w-26
                          h-8
                          mb-1
                        "
                      ></div>

                      <div class="flex justify-between lg:space-x-0 space-x-2">
                        <div
                          class="
                            heading
                            text-sm text-ash-primary
                            whitespace-normal
                            break-words
                            bg-gray-1500
                            w-28
                            h-5
                            mb-1
                          "
                        ></div>

                        <div
                          class="
                            attachment
                            text-gray-light
                            cursor-pointer
                            bg-gray-1500
                            w-5
                            h-5
                          "
                        ></div>
                      </div>

                      <div
                        class="
                          flex
                          text-sm
                          justify-between
                          lg:space-x-0
                          space-x-2
                        "
                      >
                        <div
                          class="
                            short-message
                            bg-gray-1500
                            w-24
                            h-4
                            italic
                            whitespace-normal
                            break-words
                            mb-1
                          "
                        ></div>

                        <div
                          class="
                            time
                            text-sm
                            bg-gray-1500
                            w-4
                            h-4
                            whitespace-nowrap
                            mb-1
                          "
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div class="w-full flex justify-center py-4">
                    <div
                      class="
                        bg-gray-1500
                        h-10
                        w-34
                        rounded-full
                        relative
                        flex
                        justify-around
                        space-x-1
                        items-center
                        px-4
                        font-medium
                      "
                    ></div>
                  </div>
                </div>

                <!-- End Email Messages -->
              </div>
            </div>

            <!-- End Email Feed Header -->

            <div class="md:hidden px-2 w-full h-px bg-gray-1500 my-2"></div>

            <!-- Start Email View -->

            <div
              class="
                transition-all
                duration-500
                ease-in-out
                bg-white
                md:w-2/3
                w-full
                md:h-full
                mobile-skeleton_height
                overflow-hidden
              "
            >
              <div
                class="
                  bg-orange-200
                  flex
                  w-full
                  h-9
                  text-md
                  font-bold
                  items-center
                "
              >
                <div class="flex justify-between items-center px-4 w-full">
                  <div class="heading bg-gray-1500 w-26 h-5"></div>

                  <div class="extend cursor-pointer bg-gray-1500 h-5 w-5">
                    <div class="plus_button" data-title="Extend All"></div>
                  </div>
                </div>
              </div>

              <div class="flex w-full email-view-wrapper pb-0">
                <!-- Start Email Content Wrapper-->

                <div class="email-content h-full w-full px-4 pt-2">
                  <!-- Start Email Body -->

                  <div
                    v-for="(skeleton, index) in 3"
                    :key="index"
                    class="email-body"
                  >
                    <transition name="fadeIn">
                      <div
                        class="
                          flex
                          justify-between
                          lg:flex-nowrap lg:space-y-0
                          flex-wrap
                          space-y-1
                          transition-all
                          duration-300
                          cursor-pointer
                          py-1
                        "
                      >
                        <div
                          class="
                            name-wrapper
                            flex
                            space-x-2
                            justify-between
                            items-center
                            w-2/3
                          "
                        >
                          <div
                            class="mail-name text-lg bg-gray-1500 w-26 h-6"
                          ></div>

                          <div
                            class="
                              attachment-icon-flag
                              cursor-pointer
                              self-start
                              pt-1
                              h-5
                              w-5
                              bg-gray-1500
                            "
                          ></div>
                        </div>

                        <div class="date bg-gray-1500 w-20 h-6"></div>
                      </div>
                    </transition>

                    <transition name="fadeIn">
                      <div
                        class="
                          flex flex-col
                          space-y-2
                          transition-all
                          duration-300
                          pb-3
                          pt-2
                          text-lg
                        "
                      >
                        <div
                          class="
                            subject-wrapper
                            flex
                            md:flex-nowrap md:justify-between
                            flex-wrap
                            cursor-pointer
                          "
                        >
                          <div class="subject bg-gray-1500 w-26 h-6"></div>

                          <div
                            class="
                              time
                              text-base text-gray-1700
                              bg-gray-1500
                              w-20
                              h-6
                            "
                          ></div>
                        </div>

                        <div class="from bg-gray-1500 w-24 h-6"></div>

                        <div class="to bg-gray-1500 w-22 h-6"></div>

                        <div class="text-message w-full h-6 bg-gray-1500"></div>

                        <div class="text-message w-full h-6 bg-gray-1500"></div>

                        <div class="text-message w-full h-6 bg-gray-1500"></div>

                        <div class="text-message w-full h-6 bg-gray-1500"></div>
                      </div>
                    </transition>
                  </div>

                  <!-- End Email Body -->
                </div>

                <!-- End Email Content -->
              </div>
            </div>

            <!-- End Email View -->
          </div>

          <component
            :is="currentComp"
            v-else-if="showComp"
            v-bind="currentProperties"
          ></component>
        </transition>
      </div>
    </div>
  </section>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Facebook from './facebook/Facebook.vue'
import Twitter from './twitter/Twitter.vue'
import LinkedIn from './linkedin/Index.vue'
import Instagram from './instagram/Index.vue'
import Faxes from './faxes/Faxes.vue'
import Calls from './calls/Calls.vue'
import Texts from './texts/Texts.vue'
import Websites from './websites/Websites.vue'
import Google from './email/Email.vue'
import Microsoft from './microsoft-mail/Email.vue'
import YouTube from './youtube-video/Youtube.vue'

export default defineComponent({
  components: {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Faxes,
    Calls,
    Texts,
    Websites,
    Google,
    Microsoft,
    YouTube,
  },
  props: {
    feedIsExpanded: {
      type: Boolean,
    },
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    return {
      isDesktop: breakpoints.greater('md'),
    }
  },
  data() {
    return {
      show: true,
      desktopScrollPosition: 0,
      mobileScrollPosition: 0,
      hideScroll: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    currentProperties() {
      return { articles: this.getCurrentArticles }
    },
    ...mapState('home', [
      'articles',
      'loadArticles',
      'loadMoreArticlesSkelaton',
      'showComp',
    ]),
    ...mapState('socialFeed', [
      'showSinglePost',
      'showSingleImagePost',
      'previousSinglePost',
      'showTwitter',
    ]),
    ...mapGetters('home', ['getCurrentArticles', 'currentComp']),
  },
  watch: {
    loadArticles(data) {
      if (
        this.currentComp === 'Faxes' ||
        this.currentComp === 'Calls' ||
        this.currentComp === 'Texts' ||
        this.currentComp === 'Websites'
      ) {
        data = false
      }
      if (!data) {
        setTimeout(() => {
          this.$store.commit('home/SET_SHOW_COMP', true)
        }, 2000)
      } else {
        this.$store.commit('home/SET_SHOW_COMP', false)
      }
    },
    currentProperties(data) {
      if (data) {
        this.scrollTop()
        this.desktopScrollPosition = 0
        this.mobileScrollPosition = 0
      }
    },
    currentComp(data) {
      if (data) {
        this.scrollTop()
        this.fullScreen()
      }
    },
    previousSinglePost(data) {
      if (data) {
        this.scrollTop()
      }
    },
    showSinglePost(data) {
      if (this.currentComp !== 'Twitter') {
        if (data) {
          this.removeScrollListener()
          setTimeout(() => {
            this.show = false
            this.scrollTop()
          }, 500)
        } else {
          setTimeout(() => {
            this.show = true
            setTimeout(() => {
              this.setScrollPosition()
              this.addScrollListener()
            })
          }, 300)
        }
      }
    },
    showSingleImagePost(data) {
      if (this.currentComp !== 'Twitter') {
        if (data) {
          this.removeScrollListener()
          if (this.isDesktop) {
            const height =
              document.getElementById('desktop-body-wrapper').clientHeight - 32
            this.$store.dispatch('home/getHeight', height)
          } else {
            let mobileHeight
            document
              .querySelectorAll('.mobile-body_wrapper')
              .forEach((item) => {
                mobileHeight = item.clientHeight - 32
              })
            this.$store.dispatch('home/getMobileHeight', mobileHeight)
          }
          setTimeout(() => {
            this.show = false
            this.scrollTop()
          }, 500)
        } else {
          setTimeout(() => {
            this.show = true
            if (this.isDesktop) {
              document.getElementById('desktop-body-wrapper').scrollTop = 0
            }
            setTimeout(() => {
              this.setScrollPosition()
              this.addScrollListener()
            })
          }, 300)
        }
      } else if(this.currentComp === 'Twitter') {
        if (data) {
          if (this.isDesktop) {
            const height =
              document.getElementById('desktop-body-wrapper').clientHeight - 32
            this.$store.dispatch('home/getHeight', height)
          } else {
            let mobileHeight
            document
              .getElementsByClassName('mobile-body_wrapper')
              .forEach((item) => {
                mobileHeight = item.clientHeight - 32
              })
            this.$store.dispatch('home/getMobileHeight', mobileHeight)
          }
        }
      }
    },
    showTwitter(data) {
      if (!data) {
        this.removeScrollListener()
        if (this.showSingleImagePost) {
          if (this.isDesktop) {
            const height =
              document.getElementById('desktop-body-wrapper').clientHeight - 32
            this.$store.dispatch('home/getHeight', height)
          } else {
            let mobileHeight
            document
              .getElementsByClassName('mobile-body_wrapper')
              .forEach((item) => {
                mobileHeight = item.clientHeight - 32
              })
            this.$store.dispatch('home/getMobileHeight', mobileHeight)
          }
        }
        setTimeout(() => {
          this.show = false
          this.scrollTop()
        }, 450)
      } else {
        setTimeout(() => {
          this.show = true
          if (this.showSingleImagePost) {
            if (this.isDesktop) {
              document.getElementById('desktop-body-wrapper').scrollTop = 0
            }
          }
          setTimeout(() => {
            this.setScrollPosition()
            this.addScrollListener()
          })
        }, 100)
      }
    },
  },
  mounted() {
    this.fullScreen()
    // setTimeout(() => {
    //   this.addScrollListener()
    // }, 2000)
    this.addScrollListener()
  },
  destroyed() {
    this.removeScrollListener()
  },
  methods: {
    expand() {
      this.$emit('expand-height')
    },
    handleScroll(event) {
      const element = event.target
      let value
      if (this.isDesktop) {
        value = document.getElementById('desktop-body-wrapper').scrollTop
      } else {
        value = document.getElementById('mobile-body-wrapper').scrollTop
      }
      const mobileValue = element.scrollTop
      this.desktopScrollPosition = value
      localStorage.setItem('scrollPosition', this.desktopScrollPosition)
      this.mobileScrollPosition = mobileValue
      localStorage.setItem('scrollMobilePosition', this.mobileScrollPosition)
    },
    fullScreen() {
      if (
        this.currentComp === 'Google' ||
        this.currentComp === 'Microsoft' ||
        this.currentComp === 'Faxes' ||
        this.currentComp === 'Calls' ||
        this.currentComp === 'Texts' ||
        this.currentComp === 'Websites' ||
        this.currentComp === 'YouTube'
      ) {
        this.show = false
        this.hideScroll = true
      } else {
        setTimeout(() => {
          this.hideScroll = false
          this.show = true
        }, 500)
      }
    },
    scrollTop() {
      if (this.isDesktop) {
        document.getElementById('desktop-body-wrapper').scrollTop = 0
      } else {
        document
          .querySelectorAll('.mobile-body_wrapper')
          .forEach((item) => {
            item.scrollTop = 0
          })
      }
    },
    addScrollListener() {
      if (this.isDesktop) {
        document
          .getElementById('desktop-body-wrapper')
          .addEventListener('scroll', this.handleScroll)
      } else {
        document
          .querySelectorAll('.mobile-body_wrapper')
          .forEach((item) => {
            item.addEventListener('scroll', this.handleScroll)
          })
      }
    },
    removeScrollListener() {
      if (this.isDesktop) {
        document
          .getElementById('desktop-body-wrapper')
          .removeEventListener('scroll', this.handleScroll)
      } else {
        document
          .querySelectorAll('.mobile-body_wrapper')
          .forEach((item) => {
            item.removeEventListener('scroll', this.handleScroll)
          })
      }
    },
    setScrollPosition() {
      if (this.isDesktop) {
        document.getElementById('desktop-body-wrapper').scrollTop =
          localStorage.getItem('scrollPosition')
      } else {
        document
          .querySelectorAll('.mobile-body_wrapper')
          .forEach((item) => {
            item.scrollTop = localStorage.getItem('scrollMobilePosition')
          })
      }
    },
  },
})
</script>


<style lang="scss" scoped>
.select-toggle {
  color: #ffffff;
  // top: 5.2px;
  // @apply absolute right-3 pointer-events-none;
  svg {
    @apply text-3xl;
  }
  // padding-left: 2px !important;
}
.icon-position {
  position: absolute;
  right: 16px !important;
  top: 5px !important;
}
@media (min-width: 1360px) {
  .icon-position {
    top: 7px !important;
  }
}
.mobile-body_wrapper {
  // height: calc(100% - 56px);
}
.title {
  background-color: #e4801d;
  @apply text-center;
}
.real-time-feed-body_wrapper {
  // @apply flex justify-center items-start py-5 pb-8 pt-0 w-full;
  @apply flex justify-center items-start w-full;
  height: calc(100% - 44px);
}
.left-side-body_wrapper {
  @apply col-span-1 py-6 pt-2 overflow-y-auto;
}
.footer {
  margin-top: 230px !important;
}

.min-width-2 {
  min-width: 2.5rem;
}

.max-width-690 {
  max-width: 690px;
}
.min-width-400 {
  // min-width: 400px;
  min-width: 350px;
}
.min-width-690 {
  min-width: 690px;
}
.max-width-full {
  min-width: 100%;
  width: 690px;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  // scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}

@media (max-width: 767px) {
  .mobile-height {
    height: calc(100% - 50px);
  }
  .mobile-skeleton_height {
    height: calc(50% - 17px);
  }
}

.email-view-wrapper {
  height: calc(100% - 36px);
}
@media (max-width: 392px) {
  .mobile-height {
    height: calc(100% - 80px);
  }
}
</style>