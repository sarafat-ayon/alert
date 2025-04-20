<template>
  <transition-group name="page">
    <section :key="2" class="bg-white">
      <div class="mt-10" @click="closeStarterModal">
        <div
          v-if="faqInfo"
          id="faq"
          class="faq-area bg-white md:py-28 py-28 md:px-101 px-8"
        >
          <h1
            class="
              md:text-5xl
              text-3xl
              md:mt-0
              mt-0
              text-center text-yellow-primary
              mb-10
            "
          >
            {{ faqInfo.title }}
          </h1>
          <div
            v-for="(faq, index) in faqInfo.faqs"
            :key="index"
            class="faq-content cursor-pointer pb-4"
          >
            <div
              class="flex justify-between items-center"
              @click="toggle(faq.id)"
            >
              <h3 class="text-2xl text-yellow-primary pointer-events-none">
                {{ faq.title }}
              </h3>
              <span
                class="
                  select-toggle
                  text-4xl text-yellow-primary
                  cursor-pointer
                  pointer-events-none
                "
              >
                <fa
                  class="pointer-events-none"
                  :icon="['fas', faq.collaps ? 'caret-up' : 'caret-down']"
                />
              </span>
            </div>

            <div
              class="
                scroll
                transition-all
                duration-1000
                ease-in-out
                hide
                answer
              "
            >
              <p v-html="faq.description"></p>
            </div>
          </div>
        </div>

        <div class="form-area bg-white md:pb-12 md:px-48 px-8">
          <h2
            class="
              md:text-4xl
              text-xl
              md:mt-0
              mt-8
              text-center text-gray-1200
              mb-8
              font-light
            "
          >
            Have Question or Suggestions?
          </h2>
          <form
            novalidate
            class="xl:w-2/5 lg:w-4/5 md:6/12 w-full mx-auto"
            @submit.prevent="submitQuestions"
          >
            <textarea
              id=""
              v-model="question"
              class="
                rounded-2xl
                px-4
                py-2
                bg-gray-300
                w-full
                outline-none
                md:text-lg
                text-md
                resize-none
                scroll
              "
              name="message"
              cols="60"
              rows="10"
              @blur="$v.question.$touch()"
            ></textarea>
            <template v-if="$v.question.$error">
              <p v-if="!$v.question.required" class="text-red-500 text-xs pl-1">
                The field is Required
              </p>
              <p
                v-else-if="!$v.question.maxLength"
                class="text-red-500 text-xs"
              >
                Maximum Character is 1200
              </p>
            </template>
            <div>
              <input
                v-model="email"
                class="
                  py-2
                  px-4
                  rounded-full
                  w-full
                  bg-gray-300
                  mt-3
                  outline-none
                  md:text-lg
                  text-md
                  placeholder-gray-light
                "
                type="email"
                placeholder="What's your email?"
                @blur="$v.email.$touch()"
              />
            </div>
            <template v-if="$v.email.$error">
              <p v-if="!$v.email.required" class="text-red-500 text-xs pl-1">
                Email is Required
              </p>
              <p v-else-if="!$v.email.email" class="text-red-500 text-xs pl-1">
                Email is Invalid
              </p>
            </template>
            <div class="text-center">
              <button
                class="
                  md:py-2
                  py-1
                  my-7
                  md:px-15
                  px-10
                  bg-yellow-primary
                  text-white
                  rounded-full
                  font-bold
                  md:text-md
                  text-sm
                "
                type="submit"
                :disabled="isProcessing"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <landing-footer class="pb-24 bg-white"></landing-footer>
    </section>
  </transition-group>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import LandingFooter from '~/components/setup/LandingFooter.vue'
import { FAQ, QUESTION } from '~/constants/urls'

export default {
  name: 'About',
  components: { LandingFooter },
  loading: true,
  auth: false,
  props: [],
  data() {
    return {
      isProcessing: false,
      faqInfo: null,
      question: '',
      email: '',
    }
  },
  head() {
    return {
      title: 'FAQ',
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
      maxLength: maxLength(1200),
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
    this.getFAQ()
  },
  methods: {
    async getFAQ() {
      const res = await this.$axios.$get(FAQ)
      this.faqInfo = res.data
      this.faqInfo.faqs.map((item, index) => {
        item.collaps = false
        item.id = index
        return item
      })
    },
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

    async submitQuestions() {
      this.$v.$touch()
      this.$toast.clear()
      if (!this.$v.$invalid) {
        try {
          this.isProcessing = true
          const response = await this.$axios.$post(QUESTION, {
            question: this.question,
            email: this.email,
          })

          if (response.success) {
            this.question = ''
            this.email = ''
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
          this.isProcessing = false
        } finally {
          this.isProcessing = false
        }
      }
    },
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
  @apply my-2 text-gray-600 text-justify  lg:pb-6 md:pb-6 pb-3;
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
