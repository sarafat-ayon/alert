<template>
  <section class="h-full">
    <transition name="page">
      <div @click="closeSidebar" class="md:block hidden main_content">
        <div
          class="content scroll transition-all duration-2000"
          :class="[showHomeContent ? 'opacity-0' : '']"
        >
          <div class="grid md:grid-cols-2 gap-4 pr-3">
            <div class="w-full">
              <div>
                <h2
                  class="text-yellow-midlight xl:text-xl md:text-lg font-bold"
                >
                  {{ about ? about.title : '' }} Us
                </h2>
                <div
                  class="text-gray-1100 pt-1.5 2xl:pt-2.5 content"
                  v-html="about ? about.description : ''"
                ></div>
              </div>
            </div>
            <div class="w-full">
              <div class="contact_section">
                <div>
                  <h2
                    class="text-yellow-midlight xl:text-xl md:text-lg font-bold"
                  >
                    {{ contact ? contact.title : '' }}
                  </h2>
                  <p class="text-yellow-midlight pt-1.5 2xl:pt-2.5">
                    <a :href="`mailto:${contact ? contact.email : ''}`">{{
                      contact ? contact.email : ''
                    }}</a>
                  </p>
                  <p class="text-yellow-midlight">
                    <a :href="`tel:${contact ? contact.phone : ''}`">{{
                      contact ? contact.phone : ''
                    }}</a>
                  </p>
                  <!-- <button class="chat_button button">Chat Now</button> -->
                </div>
                <div class="mt-5 2xl:mt-12">
                  <h2
                    class="text-yellow-midlight xl:text-xl md:text-lg font-bold"
                  >
                    Suggest a Feature, Ask a Question or Say Hello
                  </h2>
                  <textarea
                    v-model="question"
                    name="suggesion"
                    cols="30"
                    rows="10"
                    class="query_section scroll"
                    @blur="$v.question.$touch()"
                  ></textarea>
                  <template v-if="$v.question.$error">
                    <p class="text-red-500 error-message mb-0 pl-2">
                      {{ validationMsg($v.question) }}
                    </p>
                  </template>
                  <button
                    :disabled="isQueryPost"
                    class="submit_button button relative"
                    @click="submitQuestions"
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
                      <span>Submit</span>
                      <fa
                        v-if="isQueryPost"
                        class="
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
          </div>
        </div>
      </div>
    </transition>
    <!-- Small Device -->
    <help-header></help-header>
    <transition-group name="page">
      <div key="1" class="md:hidden mobile_main_content">
        <div class="mobile_content scroll">
          <div class="grid grid-rows-1 gap-4 md:pr-3">
            <div class="w-full">
              <div>
                <h2
                  class="text-yellow-midlight xl:text-xl md:text-lg font-bold"
                >
                  {{ about ? about.title : '' }} Us
                </h2>
                <div
                  class="text-gray-1100 pt-1.5 2xl:pt-2.5 text-justify content"
                  v-html="about ? about.description : ''"
                ></div>
              </div>
            </div>
            <div class="w-full">
              <div class="contact_section">
                <div>
                  <h2
                    class="text-yellow-midlight xl:text-xl md:text-lg font-bold"
                  >
                    {{ contact ? contact.title : '' }}
                  </h2>
                  <p class="text-yellow-midlight pt-1.5 2xl:pt-2.5">
                    <a :href="`mailto:${contact ? contact.email : ''}`">{{
                      contact ? contact.email : ''
                    }}</a>
                  </p>
                  <p class="text-yellow-midlight">
                    <a :href="`tel:${contact ? contact.phone : ''}`">{{
                      contact ? contact.phone : ''
                    }}</a>
                  </p>
                  <!-- <button class="chat_button button">Chat Now</button> -->
                </div>
                <div class="mt-5 2xl:mt-12">
                  <h2
                    class="text-yellow-midlight xl:text-xl md:text-lg font-bold"
                  >
                    Suggest a Feature, Ask a Question or Say Hello
                  </h2>
                  <textarea
                    v-model="question"
                    name="suggesion"
                    cols="30"
                    rows="10"
                    class="query_section scroll"
                    @blur="$v.question.$touch()"
                  ></textarea>
                  <template v-if="$v.question.$error">
                    <p class="text-red-500 error-message mb-0 pl-2">
                      {{ validationMsg($v.question) }}
                    </p>
                  </template>
                  <button
                    :disabled="isQueryPost"
                    class="submit_button button relative"
                    @click="submitQuestions"
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
                      <span>Submit</span>
                      <fa
                        v-if="isQueryPost"
                        class="
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
          </div>
        </div>
      </div>

      <div key="2" class="main-wrapper">
        <div class="main-body">
          <div class="body-orange"></div>
          <div class="mail-body">
            <div class="logo">
              <img
                class="sharp-logo"
                src="../assets/img/logo/Group_718.png"
                alt="logo"
              />
            </div>
            <div class="mail-body-text">
              <h3>Hi Laith,</h3>
              <p style="margin-top: 22px">
                To verify your email address, please copy the verification code
                below and paste it into the email verification form.
              </p>
              <p style="margin-top: 44px">Verification Code: 519967</p>
              <p style="margin-top: 63px">Regards,</p>
              <h3>Sharp Archive</h3>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { maxLength, required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { validationMessages } from '@/utils/validations'
import HelpHeader from '~/components/help/HelpHeader.vue'
import { ABOUT, QUESTION, HELP_PROBLEM, HELP_CONTACT } from '~/constants/urls'
export default {
  name: 'Help',
  components: {
    HelpHeader,
  },
  layout: 'home',
  middleware: ['payment'],
  data() {
    return {
      search: '',
      question: '',
      isTureBtn: false,
      isQueryPost: false,
      contact: null,
      about: null,
      faq: null,
      troubleShoot: null,
    }
  },
  async fetch() {
    const res = await this.$axios.$get(ABOUT)
    this.about = res.data

    const res2 = await this.$axios.$get(HELP_CONTACT)
    this.contact = res2.data

    // const res3 = await this.$axios.$get(HELP_TROUBLESHOOT)
    // this.troubleShoot = res3.data

    // const res4 = await this.$axios.$get(HELP_FAQ)
    // this.faq = res4.data
  },
  validations: {
    question: {
      maxLength: maxLength(1200),
      required,
    },
  },
  computed: {
    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
  },
  mounted() {
    this.$store.dispatch('mobile/header/setHelpPage')
  },
  methods: {
    validationMsg: validationMessage(validationMessages),
    closeSidebar() {
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
      this.$store.dispatch('mobile/header/removePayment')
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
    },
    async submitQuestions() {
      this.$toast.clear()
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.isQueryPost = true
        try {
          const response = await this.$axios.$post(QUESTION, {
            question: this.question,
            email: this.$auth.user.email,
          })
          if (response.success) {
            this.question = ''
            this.$v.$reset()
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (err) {
          console.log(err)
        } finally {
          this.isQueryPost = false
        }
      }
    },
    async problemSubmit($event) {
      if (this.search !== '') {
        this.isTureBtn = true
        this.$toast.clear()
        try {
          const response = await this.$axios.$post(HELP_PROBLEM, {
            query: this.search,
          })
          if (response.success) {
            this.search = ''
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.isTureBtn = false
        } catch (err) {
          console.log(err)
          this.isTureBtn = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main_content {
  height: 100%;
  @apply my-5 mr-5 ml-5 pb-14 2xl:my-8 2xl:mr-6 2xl:ml-8;
}

.content {
  @apply md:pr-3;
  font-family: Roboto, system-ui;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }
  scrollbar-color: #177294 #ececec;
}
.about_section {
  @apply grid grid-cols-1 gap-4;
}

.body_wrapper {
  @apply grid grid-cols-1 gap-6 mt-8 2xl:mt-10 lg:grid-cols-2;
}
.button {
  @apply w-44 h-9 text-white md:text-md bg-yellow-midlight rounded-full mt-1.5 2xl:mt-2.5 border-none outline-none
              font-bold;
}
.query_section {
  @apply w-full h-60 mt-1.5 2xl:mt-2.5 resize-none outline-none border-none rounded-2xl p-2.5;
}
.tour-input_section {
  @apply flex flex-col mt-1.5 2xl:mt-2.5 lg:flex-row;
}
.input_section {
  @apply h-10
                flex flex-row
                items-center
                rounded-full
                px-5
                bg-white;
}
.input {
  @apply outline-none
                  rounded-full
                  bg-white
                  w-full
                  h-full
                  placeholder-yellow-midlight placeholder-opacity-50;
}
.tour_button {
  @apply w-44
                h-10
                text-white
                bg-yellow-midlight md:text-md
                rounded-full
                mt-1.5
                ml-0
                lg:ml-2.5
                lg:mt-0
                border-none
                outline-none
                font-bold;
}
.faq_section {
  @apply mt-10 2xl:mt-12 col-span-12 lg:col-span-8;
}
.faq-ques_title {
  @apply text-yellow-midlight pt-1.5 2xl:pt-2.5;
}
.faq-ques_title2 {
  @apply text-yellow-midlight pt-3 2xl:pt-5;
}
.faq-ans_text {
  @apply text-gray-1100 pt-0.5;
}
p {
  @apply xl:text-lg md:text-md text-md;
}
.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}

// Small Device

.mobile_main_content {
  padding-top: 65px;
  height: 100%;
}

.mobile_content {
  display: flex;
  flex-direction: column;
  font-family: Roboto, system-ui;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }
  scrollbar-color: #177294 #ececec;
  padding: 10px 10px 10px 10px;
}

.mobile-tour-input_section {
  @apply flex flex-col items-end mt-1.5;
}
.error-message {
  @apply text-xs;
}
</style>
