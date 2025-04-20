<template>
  <section class="call-feed-wrapper w-full h-full">
    <!-- Start Calls Feed Header -->
    <transition name="media">
      <div class="w-full h-full">
        <div
          class="
            bg-orange-200
            flex
            w-full
            h-9
            font-bold
            text-ash-primary
            items-center
          "
        >
          <div class="w-1/3 px-4">
            <div class="heading">Calls</div>
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
        <!-- End Calls Feed Header -->

        <!-- Start Calls View -->
        <div class="flex w-full h-full call-view-wrapper pb-2">
          <!-- Start Calls Messages -->
          <div
            class="call-messages w-1/3 h-full border-r border-yellow-300 scroll"
          >
            <div class="w-full h-full pt-4">
              <div class="singleMessageWrapper lg:px-4 md:px-2 flex space-x-2">
                <div class="call-cut-icon self-center">
                  <img
                    class="mx-auto h-10 w-10 my-auto"
                    src="../../../../assets/img/svg/call_cut_background.svg"
                    alt="call-cut"
                  />
                </div>
                <div class="message-info flex-grow">
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
                    HVAC Company
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
                      888-555-7777
                    </div>
                    <div class="time text-sm text-gray-light whitespace-nowrap">
                      11:08 am
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="
                  singleMessageWrapper
                  lg:px-4
                  md:px-2
                  bg-gray-200
                  flex
                  space-x-2
                "
              >
                <div class="call-cut-icon self-center">
                  <img
                    class="mx-auto h-10 w-10 my-auto"
                    src="../../../../assets/img/svg/Calls-2_background.svg"
                    alt="call-cut"
                  />
                </div>
                <div class="message-info flex-grow">
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
                    HVAC Company
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
                      888-555-7777
                    </div>
                    <div class="time text-sm text-gray-light whitespace-nowrap">
                      Sep 25
                    </div>
                  </div>
                </div>
              </div>

              <div class="singleMessageWrapper lg:px-4 md:px-2 flex space-x-2">
                <div class="call-cut-icon self-center">
                  <img
                    class="mx-auto h-10 w-10 my-auto"
                    src="../../../../assets/img/svg/Calls-1_background.svg"
                    alt="call-cut"
                  />
                </div>
                <div class="message-info flex-grow">
                  <div class="flex justify-between">
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
                      Jonny Valentine
                    </div>
                    <div
                      class="
                        flex
                        items-center
                        space-x-1
                        w-auto
                        h-5
                        bg-red-moreLightness
                        rounded-full
                      "
                    >
                      <div
                        class="
                          w-5
                          h-5
                          bg-red-1100
                          rounded-full
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
                      <p
                        class="
                          text-red-1100 text-lg text-center
                          font-bold
                          pr-2
                          text-xxs
                          whitespace-nowrap
                        "
                      >
                        Sexual Harassment
                      </p>
                    </div>
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
                      888-555-7777
                    </div>
                    <div class="time text-sm text-gray-light whitespace-nowrap">
                      11:08 am
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="
                  singleMessageWrapper
                  lg:px-4
                  md:px-2
                  bg-gray-200
                  flex
                  space-x-2
                "
              >
                <div class="call-cut-icon self-center">
                  <img
                    class="mx-auto h-10 w-10 my-auto"
                    src="../../../../assets/img/svg/Calls-2_background.svg"
                    alt="call-cut"
                  />
                </div>
                <div class="message-info flex-grow">
                  <div class="flex justify-between lg:space-x-0 space-x-2">
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
                      Jonny Valentine
                    </div>
                    <div
                      class="
                        flex
                        items-center
                        space-x-1
                        w-24
                        h-5
                        bg-red-moreLightness
                        rounded-full
                      "
                    >
                      <div
                        class="
                          w-5
                          h-5
                          bg-red-1100
                          rounded-full
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
                      <p
                        class="
                          text-red-1100 text-lg text-center
                          font-bold
                          pr-2
                          text-xxs
                          whitespace-nowrap
                        "
                      >
                        Complaint
                      </p>
                    </div>
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
                      888-555-7777
                    </div>
                    <div class="time text-sm text-gray-light whitespace-nowrap">
                      9/2/2021
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Calls Messages -->

          <!-- Start Calls Content Wrapper-->
          <div class="call-content w-2/3 h-full px-4 scroll">
            <!-- Start Calls Body -->
            <div class="faxes-body h-full span-y-2 pt-4">
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
                    Jonny Valentine, Bob Smith, Jane Doe
                  </div>
                </div>
                <div
                  class="
                    w-40
                    h-9
                    rounded-full
                    bg-orange-dark
                    text-white text-lg
                    flex
                    items-center
                    justify-center
                  "
                >
                  Details
                </div>
              </div>

              <div class="text-lg text-ash-primary">213-789-8787</div>

              <div class="text-lg text-ash-primary">
                September 20, 2021 8:56 am - 8:37 am<span class="font-bold">
                  (Length: 5 min 37 sec)</span
                >
              </div>

              <div class="text-lg text-ash-primary pt-0.5">
                <span class="font-bold">Explanation:</span> "Loborist nisl ut"
                is in "Fraud" lexicon.
              </div>

              <div class="call-record-wrapper flex space-x-2 items-center mt-3">
                <div
                  class="playPause-track cursor-pointer w-9 h-9"
                  @click="playPauseTrack"
                >
                  <fa
                    v-if="!isPlaying"
                    class="playPauseIcon"
                    :icon="['fas', 'play-circle']"
                  />
                  <fa
                    v-else
                    class="playPauseIcon"
                    :icon="['fas', 'pause-circle']"
                  />
                </div>

                <div class="slider_container flex-grow">
                  <div class="flex space-x-2 items-center">
                    <div class="current-time text-gray-light text-md">
                      {{ currTime }}
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="0"
                      class="seek_slider"
                      @change="seekTo()"
                    />
                    <!-- <div class="total-duration">{{ totalDuration }}</div> -->
                  </div>
                </div>

                <div class="attachment cursor-pointer">
                  <img
                    class="mx-auto h-3.5 w-3.5"
                    src="../../../../assets/img/svg/download.svg"
                    alt="SharpArchive download-audio Icon"
                  />
                </div>
              </div>
              <div class="flex justify-between items-end mt-3.5">
                <div class="flag-wrapper">
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
                      lg:mt-0
                      md:mt-2
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

              <!-- Start Call Record List -->
              <div id="zoom" ref="zoom" class="overflow-hidden w-full zoom">
                <div
                  id="zoomContainer"
                  ref="objRecordList"
                  class="call-record-wrapper bg-white w-full mt-4 zoomcontainer"
                >
                  <div class="p-7">
                    <table id="table" class="text-xl text-left text-ash-deep">
                      <thead>
                        <tr class="whitespace-nowrap font-bold underline">
                          <th class="pr-7">Time</th>
                          <th class="pr-7">Recording</th>
                          <th class="">Transcript</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr class="py-4 align-top">
                          <td class="whitespace-nowrap font-bold pr-7 py-4">
                            12:31 am
                          </td>
                          <td class="whitespace-nowrap font-bold pr-7 py-4">
                            0.00
                          </td>
                          <td class="py-4">
                            <span class="font-bold pb-3">Bob Smith:</span>
                            <p class="text-ash-primary">
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit, sed diam nonummy nibh euismod
                              tincidunt ut laoreet dolore magna aliquam erat
                              volutpat. Ut wisi enim ad minim veniam, quis
                              nostrud exerci tation ullamcorper suscipit
                              lobortis nisl ut aliquip ex ea commodo consequat.
                              Duis autem vel eum iriure dolor in hendrerit in
                              vulputate velit esse molestie consequat, vel illum
                              dolore eu feugiat nulla facilisis at vero eros et
                              accumsan et iusto odio dignissim qui blandit
                              praesent luptatum zzril delenit augue duis dolore
                              te feugait nulla facilisi.
                            </p>
                          </td>
                        </tr>

                        <tr class="py-4 align-top">
                          <td class="whitespace-nowrap font-bold pr-7 py-4">
                            12:31 am
                          </td>
                          <td class="whitespace-nowrap font-bold pr-7 py-4">
                            1.00
                          </td>
                          <td class="py-4 space-y-3">
                            <div>
                              <span class="font-bold pb-3">Jane Doe</span>
                              <p class="text-ash-primary">
                                Lorem ipsum dolor sit amet, cons ectetuer
                                adipiscing elit, sed diam nonummy nibh euismod
                                tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis
                                nostrud exerci tation ullamcorper suscipit
                                lobortis nisl ut aliquip ex ea commodo
                                consequat.
                              </p>
                            </div>

                            <div>
                              <span class="font-bold pb-3"
                                >Jonny Valentine:</span
                              >
                              <p class="text-ash-primary">
                                You look nice today. We should go to lunch
                                sometime.
                              </p>
                            </div>

                            <div>
                              <span class="font-bold pb-3">Jane Doe:</span>
                              <p class="text-ash-primary">
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit, sed diam nonummy nibh euismod
                                tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis
                                nostrud exerci tation ullamcorper suscipit
                                lobortis nisl ut aliquip ex ea commodo
                                consequat. Duis autem vel eum iriure dolor in
                                hendrerit in vulputate velit esse molestie
                                consequat, vel illum dolore eu feugiat nulla
                                facilisis at vero eros et accumsan et iusto odio
                                dignissim qui blandit praesent luptatum zzril
                                delenit augue duis dolore te feugait nulla
                                facilisi.
                              </p>
                            </div>
                          </td>
                        </tr>

                        <tr class="py-4 align-top">
                          <td class="whitespace-nowrap font-bold pr-7 py-4">
                            12:31 am
                          </td>
                          <td class="whitespace-nowrap font-bold pr-7 py-4">
                            2.00
                          </td>
                          <td class="py-4">
                            <span class="font-bold pb-3">Bob Smith:</span>
                            <p class="text-ash-primary">
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit, sed diam nonummy nibh euismod
                              tincidunt ut laoreet dolore magna aliquam erat
                              volutpat. Ut wisi enim ad minim veniam, quis
                              nostrud exerci tation ullamcorper suscipit
                              lobortis nisl ut aliquip ex ea commodo consequat.
                              Duis autem vel eum iriure dolor in hendrerit in
                              vulputate velit esse molestie consequat, vel illum
                              dolore eu feugiat nulla facilisis at vero eros et
                              accumsan et iusto odio dignissim qui blandit
                              praesent luptatum zzril delenit augue duis dolore
                              te feugait nulla facilisi.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- End Call Record List -->
            </div>
            <!-- End Calls Body -->
          </div>
          <!-- End Calls Content -->
        </div>
      </div>
    </transition>
    <!-- End Calls View -->
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
      isPlaying: false,
      currTime: '00:00',
      totalDuration: '00:00',
      currTrack: '',
      updateTimer: NaN,
      scale: 1,
      pointX: 0,
      pointY: 0,
      checkClass: '',
    }
  },
  mounted() {
    this.loadTrack()
    this.checkClass = document.getElementById('table')
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
    loadTrack() {
      clearInterval(this.updateTimer)
      this.reset()
      this.currTrack = document.createElement('audio')
      this.currTrack.src = 'https://www.computerhope.com/jargon/m/example.mp3'
      this.currTrack.load()
    },
    reset() {
      const seekSlider = document.querySelector('.seek_slider')
      this.currTime = '00:00'
      this.totalDuration = '00:00'
      seekSlider.value = 0
    },
    playPauseTrack() {
      this.isPlaying = !this.isPlaying
      this.isPlaying ? this.playTrack() : this.pauseTrack()
    },
    playTrack() {
      this.currTrack.play()
      this.isPlaying = true
      this.updateTimer = setInterval(this.setUpdate, 500)
      this.currTrack.addEventListener('ended', this.pauseTrack)
    },
    pauseTrack() {
      setTimeout(() => {
        this.currTrack.pause()
        this.isPlaying = false
        clearInterval(this.updateTimer)
      }, 1000)
    },
    seekTo() {
      const seekSlider = document.querySelector('.seek_slider')
      const seekto = this.currTrack.duration * (seekSlider.value / 100)
      this.currTrack.currentTime = seekto
    },
    setUpdate() {
      const seekSlider = document.querySelector('.seek_slider')
      let seekPosition = 0
      if (!isNaN(this.currTrack.duration)) {
        seekPosition =
          this.currTrack.currentTime * (100 / this.currTrack.duration)
        seekSlider.value = seekPosition
        let currentMinutes = Math.floor(this.currTrack.currentTime / 60)
        let currentSeconds = Math.floor(
          this.currTrack.currentTime - currentMinutes * 60
        )
        let durationMinutes = Math.floor(this.currTrack.duration / 60)
        let durationSeconds = Math.floor(
          this.currTrack.duration - durationMinutes * 60
        )
        if (currentSeconds < 10) {
          currentSeconds = '0' + currentSeconds
        }
        if (durationSeconds < 10) {
          durationSeconds = '0' + durationSeconds
        }
        if (currentMinutes < 10) {
          currentMinutes = '0' + currentMinutes
        }
        if (durationMinutes < 10) {
          durationMinutes = '0' + durationMinutes
        }
        this.currTime = currentMinutes + ':' + currentSeconds
        this.totalDuration = durationMinutes + ':' + durationMinutes
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
  },
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
  @apply hover:bg-yellow-primary hover:text-white py-2;
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
.playPauseIcon {
  vertical-align: middle;
  @apply text-yellow-primary w-9 h-9;
}
.seek_slider {
  @apply h-1.5 bg-orange-600 appearance-none w-full rounded-full;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.seek_slider::-webkit-slider-thumb,
.volume_slider::-webkit-slider-thumb {
  @apply w-4 h-4 bg-white border-2 border-solid border-orange-600 cursor-pointer rounded-full;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>