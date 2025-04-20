<template>
  <div
    class="
      right-0
      top-0
      fixed
      md:pt-12 md:p-21
      p-4
      faq
      transition-all
      duration-800
      ease-in-out
      md:-top-0
      scroll
      h-full
      md:rounded-l-2xl md:shadow-2xl
      flex flex-wrap
      content-between
      justify-center
      bg-ash-default
    "
    :class="[showGuestModal ? 'showFaq' : 'hideFaq']"
  >
    <div class="h-full flex flex-wrap content-between">
      <div v-if="faqInfo" class="w-full">
        <div class="flex flex-row justify-between items-center">
          <h1 class="text-orange-600 xl:text-2xl md:text-xl text-2xl">
            {{ faqInfo.title }}
          </h1>
          <fa
            class="
              text-orange-600
              xl:text-2xl
              md:text-xl
              text-2xl
              font-NORMAL
              cursor-pointer
            "
            :icon="['fas', 'times']"
            @click="resetAll()"
          />
        </div>

        <div v-for="(faq, index) in faqInfo.faqs" :key="index" class="py-6">
          <h5 class="text-orange-600 text-xl">
            {{ faq.title }}
          </h5>
          <p class="font-normal" v-html="faq.description"></p>
        </div>

        <!-- <div class="py-6">
            <h5 class="text-orange-600 font-bold">
              Why am I being asked to do this?
            </h5>
            <p>
              In short, you should ask the person who sent it to you. In many
              industries, companies are required to keep an archive of all
              communications. If you want to learn more about the various
              industries required to do this or our privacy policy, please visit
              us at sharparchive.com or click on our logo.
            </p>
            <br />
            <p>
              If you were not expecting this request or it doesn’t feel right to
              you, you should definately not connect your account. Once you
              connect your account, the archiving process starts immediately.
            </p>
          </div>

          <div class="py-6">
            <h5 class="text-orange-600 font-bold">
              Isn’t this a violation of my privacy?
            </h5>
            <p>
              Possibly. For most of our users, they are only archiving business
              communication so the notion of privacy has more latitude. Again,
              we would direct you back to the person or company requesting this.
            </p>
            <br />
          </div> -->
      </div>

      <div class="w-full text-center pb-4">
        <button
          class="
            rounded-full
            text-orange-600
            font-bold
            text-lg
            w-44
            h-10
            border-2 border-orange-600
            outline-none
          "
          @click="resetAll()"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { GUEST_FAQ } from '~/constants/urls'
export default {
  layout: 'guest',
  props: {
    showGuestModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      faqInfo: null,
    }
  },
  mounted() {
    this.faq()
  },
  methods: {
    resetAll() {
      this.$emit('closeGuestModal')
    },
    async faq() {
      const res = await this.$axios.$get(GUEST_FAQ)
      this.faqInfo = res.data
    },
  },
}
</script>

<style lang="scss" scoped>
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

.faq {
  width: 500px !important;
  right: -500px !important;
  z-index: 9999 !important;
}

.showFaq {
  width: 500px !important;
  right: 0px !important;
}

.hideFaq {
  width: 500px !important;
  right: -500px !important;
}

@media (max-width: 767px) {
  .faq {
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    right: -100% !important;
    z-index: 99999 !important;
  }

  .showFaq {
    width: 100% !important;
    right: 0px !important;
  }

  .hideFaq {
    right: -100% !important;
  }
}
</style>