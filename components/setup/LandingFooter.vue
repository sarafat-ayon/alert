<template>
  <section>
    <div
      class="md:block bg-white lg:p-15 lg:px-101 p-4 pt-0 justify-items-center"
    >
      <div
        class="
          flex
          lg:flex-row
          flex-col
          lg:justify-between
          items-center
          lg:items-start lg:text-left
          text-center
          pt-8
          sm:mt-0
        "
      >
        <div class="min-width-12">
          <p class="font-bold lg:py-0 pt-6 pb-2 text-lg text-gray-700">
            Product
          </p>
          <p
            class="
              text-yellow-primary
              cursor-pointer
              text-lg
              lg:py-0
              py-0
              opacity-1
            "
            @click="gotoTryDemoSite()"
          >
            Demo
          </p>
          <p
            class="
              text-yellow-primary
              cursor-pointer
              text-lg
              lg:py-0
              py-0
              opacity-1
            "
            @click="openStarterModal()"
          >
            Pricing
          </p>
          <a
            href="https://status.sharparchive.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              Service Report
            </p>
          </a>
        </div>

        <div class="min-width-12">
          <p class="font-bold lg:py-0 pt-6 pb-2 text-lg text-gray-700">
            Resources
          </p>
          <a href="https://sharparchive.com/blog/">
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              Blog
            </p>
          </a>

          <n-link v-if="loggedIn" to="/help">
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              Help
            </p>
          </n-link>

          <a
            v-else
            class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1"
            :href="`${adminMail}`"
          >
            Help</a
          >
          <!-- <n-link to="/release-notes">
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              Release Notes
            </p>
          </n-link> -->

          <n-link to="/industries">
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              Industries
            </p>
          </n-link>
        </div>

        <div class="min-width-12">
          <p class="font-bold lg:py-0 pt-6 pb-2 text-lg text-gray-700">
            Company
          </p>
          <n-link to="/about">
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              About Us
            </p>
          </n-link>
          <n-link to="/faq">
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              FAQ
            </p>
          </n-link>
          <a
            href="https://calendly.com/sharp-archive/15min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="text-yellow-primary text-lg lg:py-0 py-0 opacity-1">
              Schedule a Meeting
            </p>
          </a>
        </div>

        <div class="min-width-12">
          <p class="font-bold lg:py-0 pt-6 pb-2 text-lg text-gray-700">
            Contact Us
          </p>
          <div>
            <a :href="`tel:1-8001234567`" class="text-yellow-primary text-lg">
              (888) 346-7890
            </a>
          </div>
          <div>
            <a
              :href="`mailto:admin@sharparchive.com`"
              class="text-yellow-primary text-lg"
            >
              admin@sharparchive.com
            </a>
          </div>
          <div class="lg:mt-0 mt-1">
            <ul class="flex justify-start">
              <li class="m-1 lg:ml-0">
                <a
                  href="https://www.facebook.com/SharpArchive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <facebook-icon class="w-7 h-7 mx-2 lg:mx-0"></facebook-icon>
                </a>
              </li>

              <li class="m-1">
                <a
                  href="https://twitter.com/Sharp_Archive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <twitter-icon class="w-7 h-7 mx-2 lg:mx-0"></twitter-icon>
                </a>
              </li>

              <li class="m-1">
                <a
                  href="https://www.linkedin.com/company/sharp-archive"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <linkedin-icon class="w-7 h-7 mx-2 lg:mx-0"></linkedin-icon>
                </a>
              </li>

              <li class="m-1">
                <a
                  href="https://www.instagram.com/sharparchive/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <instagram-icon class="w-7 h-7 mx-2 lg:mx-0"></instagram-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="w-full h-0.5 my-4 bg-gray-1700"></div>
      <div
        class="
          flex
          lg:flex-row
          flex-col
          lg:justify-between
          items-center
          lg:text-left
          text-center
          sm:mt-0
        "
      >
        <div class="lg:text-left min-width-12">
          <p class="text-yellow-primary text-lg py-1">
            &copy; Sharp Archive {{ year }}
          </p>
        </div>
        <div class="lg:text-left text-center min-width-12">
          <n-link to="/terms-and-conditions">
            <p class="text-yellow-primary text-lg py-1">Terms & Conditions</p>
          </n-link>
        </div>
        <div class="lg:text-left text-center min-width-12">
          <n-link to="/terms-of-service">
            <p class="text-yellow-primary text-lg py-1">Terms of Service</p>
          </n-link>
        </div>
        <div class="lg:text-left text-center min-width-12">
          <n-link to="/privacy-policy">
            <p class="text-yellow-primary text-lg py-1">Privacy Policy</p>
          </n-link>
        </div>
      </div>

      <div
        class="md:hidden flex justify-center items-center pt-20"
        @click="topFunction()"
      >
        <span>
          <img
            class="cursor-pointer lg:w-full w-16"
            src="~/assets/img/icon/up-arrow.png"
            alt="Up arrow to go at the top of the page"
          />
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramsvgIcon.vue'

export default {
  components: {
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    InstagramIcon,
  },
  data() {
    return {
      footer: false,
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
    ...mapState(['adminMail']),
  },
  methods: {
    gotoTryDemoSite() {
      window.open('https://demo.sharparchive.com/', '_blank')
    },
    showFooter() {
      setTimeout(() => {
        this.footer = true
      }, 2000)
    },
    topFunction() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    openStarterModal() {
      this.show_login(false)
      setTimeout(() => {
        this.landing_content(false)
      }, 500)
      this.expand_starter_modal(true)
      this.collapse_starter_modal(false)
      setTimeout(() => {
        this.show_sign_up(true)
      }, 1000)
      setTimeout(() => {
        this.updateSetupContent('price-plan')
      }, 1000)
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      updateSetupContent: 'updateSetupContent',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
    }),
  },
}
</script>

<style lang="scss" scoped>
.footer-terms p {
  @apply py-1;
}
a {
  @apply text-yellow-primary;
}

@media (max-width: 767px) {
}
.min-width-12 {
  min-width: 200px;
}
</style>
