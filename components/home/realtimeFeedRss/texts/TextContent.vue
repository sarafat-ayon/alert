<template>
  <section>
    <div v-for="(showText, textIndex) in allContent" 
    :id="showText.id"
    :key="textIndex + 'ShowText'">
      <transition v-if="showText.individualSelect.value">
        <!-- Start Texts Content Wrapper-->
          <!-- Start Texts Body -->
          <div class="texts-body h-full pt-4">
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
                <div class="mail-name text-lg font-bold">{{ showText.participants[0].name }}</div>
              </div>
              <div class="text-gray-1700">
                <div class="attachment cursor-pointer">
                  <img
                    class="mx-auto h-9 w-9"
                    src="../../../../assets/img/svg/download_background.svg"
                    alt="SharpArchive download-texts Icon"
                  />
                </div>
              </div>
            </div>

            <div class="text-lg text-ash-primary">{{ showText.participants[0].number }}</div>

            <div class="text-lg text-ash-primary pt-0.5">
              <span class="font-bold">Last Message:</span> {{ showText.updatedAt }}
            </div>

            <div class="text-lg text-ash-primary mt-1.5">
              <span class="font-bold">Explanation:</span> "I will mess you up"
              is in lexicon.
            </div>

            <div class="flex items-end" :class="showText.attachments.value ? 'justify-between' : 'justify-end'">
              <div v-if="showText.attachments.value" class="flag-wrapper mt-3">
                <button
                  class="
                    w-52
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
                  <span>Workplace Violence</span>
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
                    mt-2
                    lg:mt-0
                    rounded-full
                    outline-none
                    font-bold
                    text-sm
                  "
                >
                  Open Flag
                </button>
              </div>

              <div class="cursor-pointer flex items-center gap-2 z-20">
                <div class="zoom-icon-container shadow-lg">
                  <fa
                    class="text-white text-lg hidden md:block"
                    :icon="['fas', 'search-plus']"
                    @click="zoomIn"
                  />
                </div>
                <div class="zoom-icon-container shadow-lg">
                  <fa
                    class="text-white text-lg hidden md:block"
                    :icon="['fas', 'search-minus']"
                    @click="zoomOut"
                  />
                </div>
              </div>
            </div>

            <!-- Start text message -->
            <div id="zoom" ref="zoom" class="overflow-hidden w-full h-full zoom">
              <div
                id="zoomContainer"
                ref="objRecordList"
                class="text-message-wrapper mt-4 zoomcontainer"
              >
                <div id="messageWrapper"
                  class="
                    messageWrapper
                    text-xl
                    bg-white
                    mt-1
                    overflow-scroll
                    scroll
                  "
                >
                  <div class="send-right-wrapper flex flex-row-reverse my-8">
                    <div class="send-right text-white space-y-1 w-3/4">
                      <div class="send-right-top">
                        I am going to be free from tomorrow.
                      </div>
                      <div class="send-right-middle">
                        We should decide about the trip
                      </div>
                      <div class="send-right-bottom">
                        Do you have any plan?
                      </div>
                    </div>
                  </div>

                  <div class="receive-left-wrapper">
                    <div class="sender-image m-2 self-end">
                      <img
                        width="54"
                        height="54"
                        src="@/assets/img/bp/dp-5.svg"
                        alt=""
                      />
                    </div>
                    <div class="receive-left text-gray-1200 space-y-1">
                      <div class="receive-left-top">
                        Let's pick a location for the vacation.
                      </div>
                      <div class="receive-left-middle">
                        Let me know what you
                      </div>
                      <div class="receive-left-bottom">
                        Let me know what you are thinking
                      </div>
                    </div>
                  </div>

                  <div class="send-right-wrapper flex flex-row-reverse">
                    <div class="send-right text-white space-y-1 w-3/4">
                      <div class="send-right-top">If you ask me....</div>
                      <div class="send-right-middle">
                        I will suggest to go for a fire camp and spend a night
                        in deep forest.
                      </div>
                      <div class="send-right-bottom">What do you think?</div>
                    </div>
                  </div>

                  <div class="receive-left-wrapper">
                    <div class="sender-image m-2 self-end">
                      <img
                        width="54"
                        height="54"
                        src="@/assets/img/bp/dp-5.svg"
                        alt=""
                      />
                    </div>
                    <div class="receive-left text-gray-1200 space-y-1">
                      <div class="receive-left-top">
                        Let's pick a location for the vacation.
                      </div>
                      <div class="receive-left-middle">
                        Let me know what you
                      </div>
                      <div class="receive-left-bottom">
                        Let me know what you are thinking
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End text message -->
          </div>
          <!-- End Texts Body -->
          <!-- End Texts Content -->
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    allContent: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {
      allExpanded: false,
      allExpand: false,
      showEmailDetails: false,
      showSignature: false,
      showDisclosure: false,
      scale: 1,
      pointX: 0,
      pointY: 0,
    }
  },
  mounted() {
    this.checkClass = document.getElementById('messageWrapper')
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
    zoomIn(e) {
      if (this.checkClass.classList.contains('text-xs')) {
        this.checkClass.classList.remove('text-xs')
        this.checkClass.classList.add('text-sm')
      } else if (this.checkClass.classList.contains('text-sm')) {
        this.checkClass.classList.remove('text-sm')
        this.checkClass.classList.add('text-base')
      } else if (this.checkClass.classList.contains('text-base')) {
        this.checkClass.classList.remove('text-base')
        this.checkClass.classList.add('text-lg')
      } else if (this.checkClass.classList.contains('text-lg')) {
        this.checkClass.classList.remove('text-lg')
        this.checkClass.classList.add('text-xl')
      }
      /* const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX *= 1.2
      if (scaleX < 1.1) {
        this.pointY = this.pointY + 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      } else {
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(1)`
      } */
    },
    zoomOut(e) {
      if (this.checkClass.classList.contains('text-xl')) {
        this.checkClass.classList.remove('text-xl')
        this.checkClass.classList.add('text-lg')
      } else if (this.checkClass.classList.contains('text-lg')) {
        this.checkClass.classList.remove('text-lg')
        this.checkClass.classList.add('text-base')
      } else if (this.checkClass.classList.contains('text-base')) {
        this.checkClass.classList.remove('text-base')
        this.checkClass.classList.add('text-sm')
      } else if (this.checkClass.classList.contains('text-sm')) {
        this.checkClass.classList.remove('text-sm')
        this.checkClass.classList.add('text-xs')
      }
      /* const display = document.getElementById('zoomContainer')
      const matrix = window.getComputedStyle(display).transform
      const matrixArray = matrix.replace('matrix(', '').split(',')
      let scaleX = parseFloat(matrixArray[0]) // convert from string to number
      scaleX /= 1.2
      if (scaleX >= 0.482252) {
        this.pointY = this.pointY - 6
        display.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale( ${scaleX} )`
      } */
    },
  }
}
</script>

<style lang="scss" scoped>
.zoom-icon-container {
  @apply bg-yellow-primary w-9 h-9 flex items-center justify-center rounded-full;
}
.zoomcontainer {
  transform: translate(0px, 0px) scale(1);
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
.singleMessageWrapper {
  // @apply hover:bg-yellow-primary;
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
.messageWrapper {
  height: 750px;
  box-shadow: 0px 3px 6px #2228314c;
}
.send-right {
  text-align: -webkit-right;
  margin-right: 16px;
}
.send-right-top {
  @apply p-3 2xl:p-5;
  background: #119cfb;
  border-radius: 35px 35px 5px 35px;
  opacity: 1;
  width: fit-content;
}
.send-right-middle {
  @apply p-3 2xl:p-5;
  background: #119cfb;
  border-radius: 35px 5px 5px 35px;
  opacity: 1;
  width: fit-content;
}
.send-right-bottom {
  @apply p-3 2xl:p-5;
  background: #119cfb;
  border-radius: 35px 5px 35px 35px;
  opacity: 1;
  width: fit-content;
}
.receive-left-wrapper {
  @apply flex my-8 mr-2;
}
.receive-left-top {
  @apply p-3 2xl:p-5;
  background: #e5e6eb;
  border-radius: 35px 35px 35px 5px;
  opacity: 1;
  width: fit-content;
}
.receive-left-middle {
  @apply p-3 2xl:p-5;
  background: #e5e6eb;
  border-radius: 5px 35px 35px 5px;
  opacity: 1;
  width: fit-content;
}
.receive-left-bottom {
  @apply p-3 2xl:p-5;
  background: #e5e6eb;
  border-radius: 5px 35px 35px 35px;
  opacity: 1;
  width: fit-content;
}
</style>