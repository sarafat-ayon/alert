<template>
  <section class="fax-feed-wrapper w-full h-full">
    <transition name="media">
      <div class="w-full h-full">
        <!-- Start Fax Feed Header -->
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
          <div class="w-1/3 px-4">
            <div class="heading">Faxes</div>
          </div>
          <div class="w-2/3 flex justify-between items-center px-4">
            <div class="heading">Content</div>
            <!-- <div class="extend">
              <div
                class="plus_button"
                data-title="Extend All Source and URL"
                @click="expandAll()"
              >
                <img
                  v-if="!allExpand"
                  class="my-2 mx-auto h-5 w-5"
                  src="../../../../assets/img/svg/Extend-plus-email.svg"
                  alt="SharpArchive Extend-plus Icon"
                />
                <img
                  v-else
                  class="my-2 mx-auto h-5 w-5"
                  src="../../../../assets/img/svg/Extend-minus-email.svg"
                  alt="SharpArchive Extend-minus Icon"
                />
              </div>
            </div> -->
          </div>
        </div>
        <!-- End Fax Feed Header -->

        <!-- Start Fax View -->
        <div class="flex w-full h-full fax-view-wrapper pb-2">
          <!-- Start Fax Messages -->
          <div
            class="fax-messages w-1/3 h-full border-r border-yellow-300 scroll"
          >
            <div class="w-full h-full pt-4">
              <div class="singleMessageWrapper px-4">
                <div
                  class="
                    platform
                    text-lg
                    font-bold
                    text-ash-primary
                    whitespace-normal
                    break-words
                  "
                >
                  Facebook
                </div>
                <div class="flex justify-between lg:space-x-0 space-x-2">
                  <div
                    class="
                      heading
                      text-sm text-ash-primary
                      whitespace-normal
                      break-words
                    "
                  >
                    Olenna you have 27 new...
                  </div>
                  <div class="attachment text-gray-light cursor-pointer">
                    <img
                      class="mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/ic-attachment.svg"
                      alt="SharpArchive Extend-minus Icon"
                    />
                  </div>
                </div>
                <div
                  class="flex text-sm justify-between lg:space-x-0 space-x-2"
                >
                  <div
                    class="
                      short-message
                      text-gray-light
                      italic
                      whitespace-normal
                      break-words
                    "
                  >
                    Just thought I'd share great news ...
                  </div>
                  <div class="time text-sm text-gray-light whitespace-nowrap">
                    12.08 am
                  </div>
                </div>
              </div>

              <div class="singleMessageWrapper px-4 bg-gray-200">
                <div
                  class="
                    flex
                    justify-between
                    items-center
                    lg:space-x-0
                    space-x-2
                  "
                >
                  <div
                    class="
                      platform
                      text-lg
                      font-bold
                      text-ash-primary
                      whitespace-normal
                      break-words
                    "
                  >
                    Smith Accounting
                  </div>
                  <button
                    class="
                      w-24
                      bg-red-moreLightness
                      text-red-deep
                      h-5
                      rounded-full
                      outline-none
                      font-bold
                      text-xxs
                      relative
                      overflow-hidden
                      cursor-pointer
                    "
                  >
                    <span>Fraud</span>
                    <div
                      class="
                        flag-button
                        w-5
                        h-5
                        rounded-full
                        bg-red-deep
                        shadow-lg
                        absolute
                        left-0
                        top-0
                        flex
                        justify-center
                        items-center
                      "
                    >
                      <img
                        class="h-2.5 w-2.5"
                        src="../../../../assets/img/svg/flag.svg"
                        alt="flag-icon"
                      />
                    </div>
                  </button>
                </div>
                <div class="flex justify-between lg:space-x-0 space-x-2">
                  <div
                    class="
                      heading
                      text-sm text-ash-primary
                      whitespace-normal
                      break-words
                    "
                  >
                    Let's have dinner on Sunday
                  </div>
                  <div class="attachment text-gray-light cursor-pointer">
                    <img
                      class="mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/ic-attachment.svg"
                      alt="SharpArchive Extend-minus Icon"
                    />
                  </div>
                </div>
                <div
                  class="flex text-sm justify-between lg:space-x-0 space-x-2"
                >
                  <div
                    class="
                      short-message
                      text-gray-light
                      italic
                      whitespace-normal
                      break-words
                    "
                  >
                    Hi Olenna, Silva and Titus. It's was...
                  </div>
                  <div class="time text-sm text-gray-light whitespace-nowrap">
                    Sep 27
                  </div>
                </div>
              </div>

              <div class="singleMessageWrapper px-4">
                <div
                  class="
                    flex
                    justify-between
                    items-center
                    lg:space-x-0
                    space-x-2
                  "
                >
                  <div
                    class="
                      platform
                      text-lg
                      font-bold
                      text-ash-primary
                      whitespace-normal
                      break-words
                    "
                  >
                    Facebook
                  </div>
                  <button
                    class="
                      w-24
                      bg-red-moreLightness
                      text-red-deep
                      h-5
                      rounded-full
                      outline-none
                      font-bold
                      text-xxs
                      relative
                      overflow-hidden
                      cursor-pointer
                    "
                  >
                    <span>Complaint</span>
                    <div
                      class="
                        flag-button
                        w-5
                        h-5
                        rounded-full
                        bg-red-deep
                        shadow-lg
                        absolute
                        left-0
                        top-0
                        flex
                        justify-center
                        items-center
                      "
                    >
                      <img
                        class="h-2.5 w-2.5"
                        src="../../../../assets/img/svg/flag.svg"
                        alt="flag-icon"
                      />
                    </div>
                  </button>
                </div>
                <div class="flex justify-between lg:space-x-0 space-x-2">
                  <div
                    class="
                      heading
                      text-sm text-ash-primary
                      whitespace-normal
                      break-words
                    "
                  >
                    Olenna you have 27 new...
                  </div>
                  <div class="attachment text-gray-light cursor-pointer">
                    <img
                      class="mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/ic-attachment.svg"
                      alt="SharpArchive Extend-minus Icon"
                    />
                  </div>
                </div>
                <div
                  class="flex text-sm justify-between lg:space-x-0 space-x-2"
                >
                  <div
                    class="
                      short-message
                      text-gray-light
                      italic
                      whitespace-normal
                      break-words
                    "
                  >
                    Just thought I'd share great news ...
                  </div>
                  <div class="time text-sm text-gray-light whitespace-nowrap">
                    12.08 am
                  </div>
                </div>
              </div>

              <div class="singleMessageWrapper px-4 bg-gray-200">
                <div
                  class="
                    platform
                    text-lg
                    font-bold
                    text-ash-primary
                    whitespace-normal
                    break-words
                  "
                >
                  Elena Casarosa
                </div>
                <div class="flex justify-between lg:space-x-0 space-x-2">
                  <div
                    class="
                      heading
                      text-sm text-ash-primary
                      whitespace-normal
                      break-words
                    "
                  >
                    Let's have dinner on Sunday
                  </div>
                  <div class="attachment text-gray-light cursor-pointer">
                    <img
                      class="mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/ic-attachment.svg"
                      alt="SharpArchive Extend-minus Icon"
                    />
                  </div>
                </div>
                <div
                  class="flex text-sm justify-between lg:space-x-0 space-x-2"
                >
                  <div
                    class="
                      short-message
                      text-gray-light
                      italic
                      whitespace-normal
                      break-words
                    "
                  >
                    Hi Olenna, Silva and Titus. It's was...
                  </div>
                  <div class="time text-sm text-gray-light whitespace-nowrap">
                    Sep 27
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Fax Messages -->

          <!-- Start Fax Content Wrapper-->
          <div class="fax-content w-2/3 h-full px-4 scroll">
            <!-- Start Fax Body -->
            <div class="faxes-body h-full pt-4">
              <div
                class="
                  flex
                  justify-between
                  lg:flex-nowrap lg:space-y-0
                  flex-wrap
                  space-y-1
                  text-ash-primary
                  cursor-pointer
                "
              >
                <div
                  class="
                    name-wrapper
                    flex
                    space-x-2
                    justify-between
                    items-center
                  "
                >
                  <div class="mail-name text-lg font-bold">
                    Smith Accounting
                  </div>
                  <div class="attachment-icon-flag cursor-pointer">
                    <img
                      class="mx-auto h-5 w-5"
                      src="../../../../assets/img/svg/ic-attachment.svg"
                      alt="ic-attachment"
                    />
                  </div>

                  <div
                    class="
                      flag-button
                      w-5
                      h-5
                      rounded-full
                      bg-red-deep
                      shadow-lg
                    "
                  >
                    <img
                      class="mx-auto h-2.5 w-2.5 my-auto mt-1.5"
                      src="../../../../assets/img/svg/flag.svg"
                      alt="flag-icon"
                    />
                  </div>
                </div>
                <div class="date text-gray-1700">
                  September 20, 2021 8:56 am
                </div>
              </div>

              <div class="text-lg text-ash-primary">213-789-8787</div>

              <div class="text-lg text-ash-primary pt-0.5">
                <span class="font-bold">Explanation:</span> "Loborist nisl ut"
                is in "Fraud" lexicon.
              </div>

              <div class="flag-wrapper mt-3">
                <button
                  class="
                    w-40
                    bg-red-moreLightness
                    text-red-deep
                    h-9
                    rounded-full
                    outline-none
                    font-bold
                    text-sm
                    relative
                    overflow-hidden
                    cursor-pointer
                  "
                >
                  <span>Fraud</span>
                  <div
                    class="
                      flag-button
                      w-9
                      h-9
                      rounded-full
                      bg-red-deep
                      shadow-lg
                      absolute
                      left-0
                      top-0
                      flex
                      justify-center
                      items-center
                    "
                  >
                    <img
                      class="h-3.5 w-3.5"
                      src="../../../../assets/img/svg/flag.svg"
                      alt="flag-icon"
                    />
                  </div>
                </button>

                <button
                  class="
                    w-40
                    bg-red-deep
                    text-offwhite-800
                    h-9
                    rounded-full
                    outline-none
                    font-bold
                    text-sm
                  "
                >
                  Open Flag
                </button>
              </div>
            </div>
            <!-- End Fax Body -->
          </div>
          <!-- End Fax Content -->
        </div>
        <!-- End Fax View -->
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      allExpand: false,
      showEmailDetails: false,
      showSignature: false,
      showDisclosure: false,
    }
  },
  methods: {
    expandAll() {
      this.allExpand = !this.allExpand
      if (this.allExpand) {
        this.showEmailDetails = true
        this.showSignature = true
        this.showDisclosure = true
      } else {
        this.showEmailDetails = false
        this.showSignature = false
        this.showDisclosure = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
.text-xxs {
  font-size: 9px;
}
.small-text-middle {
  vertical-align: middle;
}
.h-5-5 {
  height: 22px;
}
.flag-button-small {
  margin-top: 1px;
  margin-left: 1px;
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
</style>