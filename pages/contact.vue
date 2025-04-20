<template>
  <section>
    <div
      class="
        bg-ash-dark
        h-full
        contact-area
        md:pt-40
        lg:pt-52
        pt-32
        md:pb-16
        pb-12
        md:px-101
        px-4
      "
      @click="closeStarterModal"
    >
      <h2
        class="
          text-center
          lg:text-left
          text-yellow-primary text-3xl
          lg:text-5xl
        "
      >
        Contact Us
      </h2>

      <div
        class="
          flex flex-wrap flex-col
          lg:flex-row
          contact-wrapper
          lg:space-x-15
          text-2xl text-yellow-primary
          mt-10
          md:mt-22
        "
      >
        <div
          class="
            flex flex-col
            justify-center
            self-center
            lg:self-start
            appointment-address
            p-10
            bg-gray-2000
            shadow-lg
            rounded-2xl
            space-y-9
          "
        >
          <div
            class="
              set-appointment
              flex
              space-x-5
              md:space-x-6
              lg:space-x-5
              items-center
            "
          >
            <div
              class="
                appointmentIcon
                bg-yellow-primary
                w-12
                h-12
                rounded-full
                text-center
              "
            >
              <img
                class="
                  w-6
                  h-6
                  md:w-7 md:h-7
                  lg:w-6 lg:h-6
                  xl:w-7 xl:h-7
                  small-icon
                  mx-2.5
                  mt-2
                "
                src="~/assets/img/contact/calendar.png"
              />
            </div>
            <a
              href="https://calendly.com/sharp-archive/15min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 class="text-xl xl:text-2xl font-medium">Set Appointment</h4>
            </a>
          </div>
          <div class="mailing-address flex space-x-5 md:space-x-6 lg:space-x-5">
            <div
              class="
                mailingIcon
                bg-yellow-primary
                w-12
                h-12
                rounded-full
                text-center
              "
            >
              <img
                class="
                  w-6
                  h-6
                  md:w-7 md:h-7
                  lg:w-6 lg:h-6
                  xl:w-7 xl:h-7
                  small-icon
                  mx-2.5
                  mt-2
                "
                src="~/assets/img/contact/address.png"
              />
            </div>
            <div class="details flex flex-col">
              <h4 class="text-xl xl:text-2xl font-medium">Mailing Address</h4>
              <p class="text-lg md:text-xl text-gray-1200 break-words">
                Sharp Archive <br />6494 S Quebec St Centennial, CO 80111.
              </p>
            </div>
          </div>
          <div
            class="
              email-address
              flex
              space-x-5
              md:space-x-6
              lg:space-x-5
              xl:space-x-6
            "
          >
            <div class="emailIcon w-12 h-12 rounded-full text-center">
              <img class="w-12 h-12" src="~/assets/img/contact/email.svg" />
            </div>
            <div class="details flex flex-col">
              <h4 class="text-xl xl:text-2xl font-medium">Email</h4>
              <a
                :href="`mailto:admin@sharparchive.com`"
                class="text-lg md:text-xl text-gray-1200"
              >
                admin@sharparchive.com
              </a>
            </div>
          </div>
          <div class="contact flex space-x-5 md:space-x-6">
            <div class="callIcon w-12 h-12 rounded-full text-center">
              <img
                class="w-12 h-12"
                src="~/assets/img/contact/phone-call.svg"
              />
            </div>
            <div class="details flex flex-col">
              <h4 class="text-xl xl:text-2xl font-medium">Call</h4>
              <a
                :href="`tel:1-8001234567`"
                class="text-lg md:text-xl text-gray-1200"
              >
                (888) 346-7890
              </a>
            </div>
          </div>
          <div
            class="
              social-contact-icon
              flex
              space-x-5
              md:space-x-6
              justify-center
            "
          >
            <a
              href="https://www.facebook.com/SharpArchive"
              rel="noopener noreferrer"
              target="_blank"
            >
              <facebook-icon
                class="min-w-3 min-h-3 profile-image"
              ></facebook-icon>
            </a>
            <a
              href="https://twitter.com/Sharp_Archive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <twitter-icon
                class="min-w-3 min-h-3 profile-image rounded-full"
              ></twitter-icon>
            </a>
            <a
              href="https://www.linkedin.com/company/sharp-archive"
              rel="noopener noreferrer"
              target="_blank"
            >
              <linkedin-icon
                class="min-w-3 min-h-3 profile-image rounded-full"
              ></linkedin-icon>
            </a>
            <a
              href="https://www.instagram.com/sharparchive/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <instagram-icon
                class="min-w-3 min-h-3 profile-image rounded-full"
              ></instagram-icon>
            </a>
          </div>
        </div>

        <div class="client-address flex-grow mt-12 lg:mt-0">
          <form
            method="post"
            class="flex flex-col h-full lg:items-start items-center"
            action="#"
            novalidate
            @submit.prevent="submit"
          >
            <div class="flex-grow w-full">
              <div class="mb-7">
                <label for="name">Full Name*</label> <br />
                <input
                  v-model="fullName"
                  type="text"
                  class="outline-none"
                  placeholder="Write your name"
                  @blur="$v.fullName.$touch()"
                />
                <template v-if="$v.fullName.$error">
                  <p v-if="!$v.fullName.required" class="text-red-500 text-xs">
                    Full Name is Required
                  </p>
                  <p
                    v-else-if="!$v.fullName.maxLength"
                    class="text-red-500 text-xs"
                  >
                    Maximum Character is 40
                  </p>
                </template>
              </div>
              <div class="mb-7">
                <label for="email">Email Address*</label> <br />
                <input
                  v-model.trim="email"
                  type="email"
                  class="outline-none"
                  placeholder="Write your email address"
                  @blur="$v.email.$touch()"
                />
                <template v-if="$v.email.$error">
                  <p v-if="!$v.email.required" class="text-red-500 text-xs">
                    Email is Required
                  </p>
                  <p v-else-if="!$v.email.email" class="text-red-500 text-xs">
                    Email is Invalid
                  </p>
                </template>
              </div>
              <div class="">
                <label for="message">How Can We Help?</label> <br />
                <textarea
                  id="message"
                  v-model="question"
                  name="contact"
                  rows="6"
                  class="focus:outline-none focus:border-none text-gray-1200"
                  placeholder="Tell us more about yourself, how can we help?"
                  @blur="$v.question.$touch()"
                ></textarea>
                <template v-if="$v.question.$error">
                  <p v-if="!$v.question.required" class="text-red-500 text-xs">
                    Question is Required
                  </p>
                  <p
                    v-else-if="!$v.question.email"
                    class="text-red-500 text-xs"
                  >
                    Maximum Character is 500
                  </p>
                </template>
              </div>
            </div>

            <div class="text-center lg:text-right">
              <button
                type="submit"
                class="
                  rounded-full
                  bg-yellow-primary
                  w-44
                  text-white
                  py-2
                  px-16
                  w-44
                  lg:mt-0
                  mt-10
                  text-md
                  font-semibold
                  flex
                  items-center
                  relative
                  space-x-4
                "
                :disabled="isProcessing"
              >
                <span>Submit</span>
                <span v-if="isProcessing"
                  ><fa
                    class="text-white font-bold animate-spin"
                    :icon="['fas', 'spinner']"
                /></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <landing-footer class="pb-24"></landing-footer>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import LandingFooter from '~/components/setup/LandingFooter.vue'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramsvgIcon.vue'
import { QUESTION } from '~/constants/urls'

export default {
  auth: false,
  name: 'Contact',
  components: {
    LandingFooter,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    InstagramIcon,
  },
  data() {
    return {
      fullName: '',
      email: '',
      question: '',
      isProcessing: false,
    }
  },
  validations: {
    fullName: {
      required,
      maxLength: maxLength(40),
    },
    email: {
      required,
      email,
    },
    question: {
      required,
      maxLength: maxLength(500),
    },
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
    }),
  },
  mounted() {
    this.$store.commit('SET_LANDING_LOADER', false)
    this.setHeaderWidth(true)
  },
  methods: {
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
    async submit() {
      this.$v.$touch()
      this.$toast.clear()
      if (!this.$v.$invalid) {
        try {
          this.isProcessing = true
          const response = await this.$axios.$post(QUESTION, {
            fullName: this.fullName,
            question: this.question,
            email: this.email,
          })
          if (response.success) {
            this.question = ''
            this.email = ''
            this.fullName = ''
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
.contact-wrapper {
  @apply justify-center lg:justify-between;
}
.appointment-address {
  width: 448px;
  height: 624px;
}
.details {
  max-width: 215px;
}
::-webkit-input-placeholder {
  /* Edge */
  @apply text-gray-light text-lg font-light opacity-50;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  @apply text-gray-light text-lg font-light opacity-50;
}

::placeholder {
  @apply text-gray-light text-lg font-light opacity-50;
}
input {
  @apply xl:text-2xl md:text-xl text-lg rounded-md md:py-3 py-2 px-4 w-full md:mt-2 mt-1 text-gray-1200;
}
textarea {
  @apply pt-3 px-4 w-full mt-2 rounded-md;
}
label {
  @apply xl:text-2xl md:text-xl text-lg text-yellow-primary;
}
.form-area form {
  @apply w-full ml-4;
}
.profile-image {
  @apply w-13 h-13;
}

@media (min-width: 2048px) and (max-width: 2560px) {
  .contact-area {
    padding-left: 14%;
    padding-right: 14%;
  }
}
@media (min-width: 1024px) and (max-width: 1230px) {
  .contact-area {
    padding-left: 7%;
    padding-right: 7%;
  }
  .appointment-address {
    width: 356px;
    height: 576px;
  }
  .details {
    max-width: 193px;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .appointment-address {
    width: 400px;
    height: 576px;
  }
}
@media (min-width: 300px) and (max-width: 767px) {
  .appointment-address {
    // width: 342px;
    width: 100%;
    height: 576px;
  }
  .details {
    max-width: 193px;
  }
  .small-icon {
    margin-left: 12px;
    margin-right: 8px;
    margin-top: 11px;
  }
}
</style>