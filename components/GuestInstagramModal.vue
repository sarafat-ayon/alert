<template>
  <section>
    <div
      class="
        md:pt-12 md:p-21
        p-4
        profile
        transition-all
        duration-800
        ease-in-out
        md:-top-0
        scroll
        h-full
        md:rounded-l-2xl md:shadow-2xl
        flex flex-wrap
        justify-center
        content-center
      "
    >
      <div
        class="
          w-102
          h-116
          bg-dark-100
          shadow-md
          rounded-2xl
          flex flex-col
          items-center
          justify-center
          p-4
          space-y-4
        "
      >
        <div class="flex flex-row w-full items-center justify-between">
          <div
            class="pl-5 xl:text-2xl md:text-xl md:font-bold text-xl text-orange-600"
          >
            <transition name="fadeIn">
              <span>Add Feeds</span>
            </transition>
          </div>
          <div class="pr-5">
            <fa
              class="
                text-orange-600
                xl:w-6 xl:h-6
                md:w-5 md:h-20 md:font-bold
                w-6
                h-6
                font-bold
                cursor-pointer
              "
              :icon="['fas', 'times']"
              @click="closeInstagramModal()"
            />
          </div>
        </div>
        <transition name="modalFadeIn">
          <div
            class="
              w-full
              main-content
              flex flex-col
              items-center
              justify-center
            "
          >
            <div
              class="
                w-full
                flex flex-col
                justify-center
                items-center
                space-y-10
              "
            >
              <img
                :src="instagram"
                class="w-15 h-15 cursor-pointer"
                alt="Instagram Icon"
              />
              <p class="md:text-xl text-md text-white opacity-50">
                Which type of account?
              </p>
              <div class="w-full flex items-center justify-center space-x-4">
                <button
                  class="
                    w-38
                    py-1.5
                    text-lg
                    font-bold
                    text-white
                    bg-yellow-primary
                    rounded-full
                  "
                  @click.stop="authorize('instagram')"
                >
                  Personal
                </button>
                <button
                  class="
                    w-38
                    py-1.5
                    text-lg
                    font-bold
                    text-white
                    bg-yellow-primary
                    rounded-full
                  "
                  @click.stop="authorize('facebook')"
                >
                  Business
                </button>
              </div>
              <p class="md:text-xl text-md text-white text-center">
                Facebook (Meta) owns Instagram. Clicking on “Personal” will
                route you to Instagram’s authorization. Clicking on “Business”
                will ask for your authorization through Facebook.
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import instagramPng from 'assets/img/svg/instagram-red.svg'
import { randomString } from '~/utils'

export default {
  layout: 'guest',
  data() {
    return {
      instagram: instagramPng,
      token: this.$route.params.token,
    }
  },
  mounted() {},
  methods: {
    async authorize(provider) {
      const state = this.token || randomString(10)
      await this.$social.redirect(provider, state)
    },
    closeInstagramModal() {
      this.$store.commit('guest/SET_GUEST_INSTAGRAM_MODAL', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.modalFadeIn-enter-active,
.modalFadeIn-leave-active {
  transition: opacity 0.5s;
}
.modalFadeIn-enter,
.modalFadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}
p {
  @apply text-white;
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
.profile {
  z-index: 99999;
}

@media (max-width: 767px) {
  .profile {
    width: 100%;
    height: 100%;
    right: -100%;
    z-index: 99999;
  }
}
</style>
