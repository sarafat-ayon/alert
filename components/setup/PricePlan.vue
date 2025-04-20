<template>
  <div
    class="archive-wrapper z-99999"
    :class="[
      !starterMaximized && starterExpanded
        ? 'transition-all duration-3000 ease-in-out delay-2000 fadeIn'
        : 'transition-all duration-699 ease-in-out fadeOut',
      !starterExpanded ? 'hidden' : '',
    ]"
  >
    <div class="archive-setup active">
      <div class="container">
        <div class="content-wrapper">
          <div class="inner-wrapper">
            <div class="card">
              <div class="card-body">
                <div
                  class="
                    feeds-container
                    transition-all
                    duration-1000
                    ease-in-out
                  "
                >
                  <div class="feeds-board">
                    <div
                      class="
                        feeds-board-inner
                        scroll
                        transition-all
                        duration-1000
                        ease-in-out
                      "
                      :class="showContent ? 'show' : 'hide'"
                    >
                      <div class="feeds-title mt-0">
                        <h2
                          class="
                            lg:text-4xl
                            md:text-3xl
                            text-2xl text-white text-center
                          "
                        >
                          Monthly Cost
                        </h2>
                        <p
                          class="
                            text-center
                            lg:text-2xl
                            md:text-xl
                            text-lg text-white
                            pt-1
                          "
                        >
                          <span
                            class="lg:text-xl md:text-lg md:text-md base-price"
                            >${{
                              initCosts && initCosts.baseCost
                                ? initCosts.baseCost
                                : 0
                            }} </span
                          ><span
                            class="
                              lg:text-lg
                              md:text-md md:text-sm
                              opacity-60
                              plus
                            "
                            >plus </span
                          ><span
                            class="lg:text-xl md:text-lg md:text-md each-feed"
                            >${{
                              initCosts && initCosts.feedCost
                                ? initCosts.feedCost
                                : 0
                            }} </span
                          ><span
                            class="
                              lg:text-lg
                              md:text-md md:text-sm
                              opacity-60
                              plus
                            "
                            >for each feed </span
                          ><span
                            v-if="betaVersion"
                            class="lg:text-xl md:text-lg md:text-md"
                            >${{
                              initCosts && initCosts.storageCost
                                ? initCosts.storageCost.toFixed(2)
                                : 0.0
                            }}/GB </span
                          ><span
                            v-if="betaVersion"
                            class="lg:text-lg md:text-md md:text-sm opacity-60"
                            >of storage</span
                          >
                        </p>
                      </div>
                      <div
                        class="
                          flex flex-col
                          w-full
                          2xl:px-20
                          xl:px-16
                          md:px-8
                          px-2
                          text-left
                        "
                      >
                        <div
                          class="
                            grid
                            md:grid-cols-2
                            grid-cols-2
                            form-start
                            items-center
                            md:justify-start
                            justify-center
                            md:place-items-center
                            place-items-center
                          "
                        >
                          <span
                            class="
                              text-white
                              md:text-left
                              text-center
                              lg:text-lg
                              md:text-md md:text-sm
                              opacity-60
                              md:col-span-1
                              col-span-2
                            "
                            >How Many Feeds?</span
                          >
                          <input
                            v-model.number="totalFeeds"
                            maxlength="10"
                            type="text"
                            class="
                              bg-white
                              text-orange-600
                              rounded-full
                              md:w-40
                              w-52
                              h-10
                              text-center text-sm
                              p-2
                              outline-none
                              border-none
                              shadow-xl
                              font-bold
                              lg:text-lg
                              md:text-md md:text-sm md:col-span-1
                              col-span-2
                              md:mt-0
                              mt-1.5
                            "
                            @keyup="isNumber($event)"
                            @keypress="isNumberKey($event)"
                            @blur="$v.totalFeeds.$touch()"
                          />
                          <!-- @keypress="isNumber($event)" -->
                          <div></div>
                          <div></div>
                          <template v-if="$v.totalFeeds.$error">
                            <p
                              v-if="!$v.totalFeeds.required"
                              class="
                                text-red-900
                                md:col-start-2 md:col-span-1
                                col-span-2
                                text-xs text-right
                              "
                            >
                              Field is Required
                            </p>
                            <p
                              v-else-if="!$v.totalFeeds.numeric"
                              class="
                                text-red-900
                                md:col-start-2 md:col-span-1
                                col-span-2
                                text-xs text-right
                              "
                            >
                              Field is Invalid
                            </p>
                          </template>
                        </div>
                        <div
                          v-if="betaVersion"
                          class="
                            grid
                            md:grid-cols-3
                            grid-cols-2
                            items-center
                            md:justify-start
                            justify-center
                            md:place-items-start
                            place-items-center
                            md:mt-4
                            mt-2
                          "
                        >
                          <span
                            class="
                              md:text-left
                              text-center text-white
                              lg:text-lg
                              md:text-md md:text-sm
                              opacity-60
                              col-span-2
                            "
                            >How long will records be kept?</span
                          >
                          <div
                            class="
                              input
                              filter-inputs2
                              md:col-span-1
                              col-span-2
                              md:mt-0
                              mt-1.5
                            "
                          >
                            <select
                              id="source"
                              v-model="time"
                              :class="toggleSelect ? 'round-remove' : ''"
                              @click="toggleSelect = !toggleSelect"
                              @focusout="toggleSelect = false"
                            >
                              <option
                                v-for="option in times"
                                :key="option.id"
                                :value="option.value"
                              >
                                {{ option.text }}
                              </option>
                            </select>
                            <span class="select-toggle">
                              <fa
                                :icon="[
                                  'fas',
                                  toggleSelect ? 'caret-up' : 'caret-down',
                                ]"
                              />
                            </span>
                          </div>
                          <template v-if="$v.time.$error">
                            <p
                              v-if="!$v.time.required"
                              class="text-red-500 text-xs"
                            >
                              Field is Required
                            </p>
                          </template>
                        </div>
                        <div
                          v-if="betaVersion"
                          class="
                            grid
                            md:grid-cols-3
                            grid-cols-2
                            items-center
                            md:justify-start
                            justify-center
                            md:place-items-start
                            place-items-center
                            md:mt-4
                            mt-2
                          "
                        >
                          <span
                            class="
                              text-white
                              lg:text-lg
                              md:text-md md:text-sm
                              opacity-60
                              col-span-2
                            "
                            >Projected storage size after
                            {{ getCurectDurationBytext }}</span
                          >
                          <span
                            class="
                              md:col-span-1
                              col-span-2
                              text-white
                              lg:w-48
                              md:w-40
                              w-52
                              lg:text-lg
                              md:text-md md:text-sm
                              text-sm
                              md:text-right
                              text-center
                              font-bold
                            "
                            >{{
                              storageVolumePerDuration
                                ? storageVolumePerDuration.toFixed(2)
                                : 0
                            }}
                            GB</span
                          >
                        </div>
                        <div
                          v-if="betaVersion"
                          class="
                            grid
                            md:grid-cols-3
                            grid-cols-2
                            items-center
                            md:justify-start
                            justify-center
                            md:place-items-start
                            place-items-center
                            md:mt-4
                            mt-2
                          "
                        >
                          <span
                            class="
                              text-white
                              lg:text-lg
                              md:text-md md:text-sm
                              opacity-60
                              col-span-2
                            "
                            >Storage Costs (${{
                              initCosts && initCosts.storageCost
                                ? initCosts.storageCost.toFixed(2)
                                : 0.0
                            }}/GB)</span
                          >
                          <span
                            class="
                              md:col-span-1
                              col-span-2
                              text-white
                              lg:w-48
                              md:w-40
                              w-52
                              lg:text-lg
                              md:text-md md:text-sm
                              text-sm
                              md:text-right
                              text-center
                              font-bold
                            "
                            >${{
                              storageCosts ? storageCosts.toFixed(2) : '0.0'
                            }}</span
                          >
                        </div>
                      </div>
                      <div
                        class="
                          flex flex-col
                          items-center
                          justify-center
                          space-y-2.5
                          w-full
                          time_estimation_cost
                        "
                        :class="betaVersion ? 'md:mt-8 mt-6' : 'md:mt-16 mt-10'"
                      >
                        <span
                          v-if="totalFeeds < 500"
                          class="
                            text-white
                            xl:text-7xl
                            lg:text-6xl
                            md:text-5xl
                            text-4xl
                            relative
                          "
                          ><span
                            class="
                              text-white
                              xl:text-3xl
                              lg:text-2xl
                              md:text-xl
                              text-lg
                              absolute
                              md:top-2.5
                              top-0.5
                              md:-left-4
                              -left-3
                              dollar
                            "
                            >$</span
                          >{{
                            totalEstimateCosts ? totalEstimateCosts : 0.0
                          }}</span
                        >
                        <span
                          v-else
                          class="
                            text-white text-xl
                            md:text-2xl
                            lg:text-3xl
                            xl:text-4xl
                            relative
                            for-quote
                          "
                          ><span
                            class="
                              text-white
                              xl:text-3xl
                              lg:text-2xl
                              md:text-xl
                              text-lg
                              absolute
                              md:top-2.5
                              top-0.5
                              md:-left-4
                              -left-3
                              dollar
                            "
                          ></span
                          >Book a Call for a Quote</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:hidden bg-transparent" style="height: 95px"></div>
  </div>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'
import { GET_ESTIMATED_COST } from '~/constants/urls'
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  data() {
    return {
      profiles: [],
      costs: null,
      initCosts: null,
      showSetup: false,
      showSearchBar: true,
      searchBarSlideIn: false,
      query: '',
      activeComponent: 'feeds',
      setupContent: '',
      sidebarModal: false,
      drag: false,
      toggleSelect: false,
      totalFeeds: 5,
      time: 36,
      times: [
        { text: 'One Month', value: 1 },
        { text: 'Three Months', value: 3 },
        { text: 'Six Months', value: 6 },
        { text: 'One Year', value: 12 },
        { text: 'Two Years', value: 24 },
        { text: 'Three Years', value: 36 },
        { text: 'Four Years', value: 48 },
        { text: 'Five Years', value: 60 },
        { text: 'Six Years', value: 72 },
        { text: 'Seven Years', value: 84 },
      ],
      showContent: false,
    }
  },
  computed: {
    currentProperties() {
      if (this.activeComponent === 'feeds') {
        return { profiles: this.profiles }
      }
      return false
    },
    ...mapState({
      starterMaximized: 'starterMaximized',
      starterExpanded: 'starterExpanded',
      starterCollapse: 'starterCollapse',
      betaVersion: 'betaVersion',
    }),

    storageVolumePerDuration() {
      return (
        Number(this.time) *
        Number(this.initCosts ? this.initCosts.estimatedStoragePerMonth : 0)
      )
    },
    storageCosts() {
      return (
        Number(this.initCosts ? this.initCosts.storageCost : 0) *
        this.storageVolumePerDuration *
        this.totalFeeds
      )
    },
    totalFeedCosts() {
      return Number(
        (this.initCosts ? this.initCosts.feedCost : 0) * Number(this.totalFeeds)
      )
    },
    totalEstimateCosts() {
      if (this.betaVersion) {
        return (
          Number(this.initCosts ? this.initCosts.baseCost : 0) +
          this.totalFeedCosts +
          this.storageCosts
        )
      } else {
        return (
          Number(this.initCosts ? this.initCosts.baseCost : 0) +
          this.totalFeedCosts
        ).toLocaleString()
      }
    },
    getCurectDurationBytext() {
      return this.durationBytext(this.time)
    },
  },
  watch: {
    activeComponent(value) {
      if (value === 'feeds') {
        this.setStorageFormatSelect(false)
      }
    },
  },
  validations: {
    totalFeeds: {
      required,
      numeric,
    },
    time: {
      required,
    },
  },
  mounted() {
    this.getTotalEstimatedCost()
    if (this.starterExpanded) {
      setTimeout(() => {
        this.showContent = true
      }, 100)
    } else if (this.starterCollapse) {
      this.showContent = false
    }
  },
  methods: {
    isNumber(event) {
      event = event || window.event
      const charCode = event.target.value
        .charAt(event.target.selectionStart - 1)
        .charCodeAt()
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, '')
        event.preventDefault()
      } else {
        return true
      }
    },
    isNumberKey(event) {
      if (!/\d/.test(event.key)) return event.preventDefault()
    },
    durationBytext(val) {
      let duration = ''
      for (const propertity of this.times) {
        if (Number(propertity.value) === Number(val)) {
          duration = propertity.text
        }
      }
      return duration
    },
    async getTotalEstimatedCost() {
      try {
        const res = await this.$axios.$get(GET_ESTIMATED_COST)
        if (res.success) {
          this.initCosts = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    draggingDown() {
      this.$store.dispatch('mobile/header/removeCustomPrice')
    },
    search() {
      this.showSetup = true
      // this.searchBarSlideIn = true
      this.maximize_starter_modal(true)
      this.sidebarModal = true
    },
    switchContent($event) {
      this.activeComponent = $event
      setTimeout(() => {
        this.showSearchBar = !this.showSearchBar
      }, 400)
    },
    switchSetupContent($event) {
      this.setupContent = $event
      this.toggle_sidebar_modal(false)
      this.$emit('next', $event)
    },
    ...mapActions({
      toggle_sidebar_modal: 'toggle_sidebar_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
      setStorageFormatSelect: 'setStorageFormatSelect',
    }),
  },
}
</script>

<style lang="scss" scoped>
.archive-wrapper {
  // @apply w-full h-full absolute overflow-hidden;
  @apply w-full h-full absolute overflow-y-auto md:overflow-hidden flex flex-col md:block;
  .archive-setup {
    transition: all 1s ease-in-out;
    // @apply h-full w-full pt-0 absolute flex justify-center;
    @apply h-full w-full pt-0 absolute flex justify-center flex-grow overflow-y-auto;
    &.active {
      @apply w-full pt-0; // pt-10
    }
    .container {
      // @apply md:w-3/4 h-full flex flex-col items-center space-y-6 p-4;
      @apply md:w-3/4 w-full h-full flex flex-col items-center space-y-6 p-4 overflow-x-hidden;
      .tab-wrapper {
        @apply flex justify-center;
      }
      .content-wrapper {
        transition: all 1s ease-in-out;
        // @apply w-full flex-grow overflow-hidden;
        @apply w-full h-full flex-grow overflow-y-auto md:overflow-hidden;
        &.fadeIn {
          opacity: 1;
        }
      }
    }
  }
}

.card {
  @apply w-full h-full flex flex-col items-center justify-between md:p-2;
  .card-header {
    @apply w-3/4 flex justify-center;
  }
  .card-body {
    max-height: 420px;
    @apply w-full flex-grow md:overflow-hidden overflow-auto scroll;
    .feeds-container {
      width: 45%; //65%
      max-width: 600px; //1237px
      // min-width: 600px;
      height: 70%; //93%
      max-height: 420px;
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translate(-50%);
      top: 6%;
      @apply flex justify-center gap-y-4 md:overflow-visible overflow-auto scroll rounded-2xl;
    }
    .feeds-board {
      @apply w-full h-full bg-yellow-primary rounded-2xl overflow-auto scroll flex flex-col;
      .feeds-board-inner {
        max-height: 420px;
        @apply w-full h-full py-2 px-5 justify-center bg-yellow-primary rounded-2xl overflow-auto scroll flex flex-col items-center;
        .feeds-title {
          @apply w-full text-left pt-0 text-white pb-2 md:text-md text-sm;
          .item-title {
            @apply font-serif text-white lg:text-5xl md:text-4xl text-3xl;
          }
          .item-subtitle {
            @apply md:text-md text-offwhite-400 text-sm;
          }
        }
        .feeds-items {
          @apply w-full flex-grow overflow-y-auto scroll flex flex-col space-y-2 overflow-x-hidden;
          .feeds-placeholder {
            @apply w-full flex-grow flex flex-col justify-center items-center;
            .placeholder-text {
              @apply text-offwhite-400 opacity-50;
            }
          }
        }
        .feeds-action {
          @apply w-full p-2 text-center text-white;
        }
      }
    }
  }
  .show {
    opacity: 1;
  }
  .hide {
    opacity: 0;
  }
  .card-footer {
    min-height: 70px;
    @apply p-4;
  }
}
.form-start {
  text-align: left;
  @apply md:mt-8 mt-3;
}

.input {
  color: #f8f8f8;
  @apply relative h-10 lg:w-48 md:w-40 w-52;
  select {
    color: #e4801d;
    box-shadow: 0px 1px 3px rgba(142, 82, 0, 0.7);
    font-weight: bold;
    font-size: 18px;
    border-radius: 25px;
    @apply lg:text-lg md:text-md md:text-sm py-0.5 px-4 md:w-40 w-52 h-10 focus:outline-none cursor-pointer bg-white;
    -webkit-appearance: none;
    -moz-appearance: none;
    option {
      @apply font-medium;

      &:focus,
      &:checked,
      &:hover {
        color: white;
        background-color: #e4801d !important;
      }
    }
  }
  .round-remove {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .select-toggle {
    color: #e4801d;
    @apply absolute md:top-1.5 top-1.5 right-10 pointer-events-none;
    svg {
      @apply md:text-2xl text-2xl;
    }
  }
}
.inner-wrapper {
  height: 100%;
}
.scroll {
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}

@media (max-width: 1023px) {
  .feeds-container {
    width: 60% !important; //65%
    max-width: 600px; //1237px
    height: 70%; //93%
    max-height: 500px !important;
  }
}

@media (min-height: 600px) and (max-height: 887px) {
  .feeds-container {
    width: 60% !important; //65%
    max-width: 600px; //1237px
    height: 70% !important; //93% 88%
    max-height: 520px !important;
  }
  .feeds-title {
    @apply mt-4;
    h2 {
      @apply text-2xl;
    }
    p {
      @apply text-md pt-0;
    }
    .base-price,
    .each-feed {
      @apply text-md;
    }
    .plus {
      @apply text-sm;
    }
  }
  .form-start {
    @apply mt-4 items-baseline h-9;
    span,
    input {
      @apply text-sm h-9;
    }
  }
  .time_estimation_cost {
    @apply text-xl mt-6;
    span {
      @apply text-4xl;
      .dollar {
        @apply text-lg top-0.5 -left-3;
      }
    }
    span.for-quote {
      @apply text-2xl;
    }
  }
}

@media (max-width: 767px) {
  .card-body {
    max-height: 520px !important;
  }

  .feeds-container {
    width: 90% !important;
    height: 90% !important;
    top: 0% !important;
    .feeds-board-inner {
      max-height: 100% !important;
    }
    .feeds-title {
      @apply mt-0;
      h2 {
        @apply text-2xl;
      }
      p {
        @apply text-lg pt-0;
      }
      .base-price,
      .each-feed {
        @apply text-md;
      }
      .plus {
        @apply text-sm;
      }
    }
    .form-start {
      @apply mt-3 items-center h-auto;
      span,
      input {
        @apply text-md h-10;
      }
    }
    .time_estimation_cost {
      @apply text-xl mt-10;
      span {
        @apply text-4xl;
        .dollar {
          @apply text-lg top-0.5 -left-3;
        }
      }
      span.for-quote {
        @apply text-2xl;
      }
    }
  }
}

// searchBarFadeIn transition
.searchBarFadeIn-enter-active,
.searchBarFadeIn-leave-active {
  transition: all 0.5s ease-in-out;
}

.searchBarFadeIn-enter,
.searchBarFadeIn-leave-to {
  opacity: 0;
}

.searchBarFadeIn-enter-to,
.searchBarFadeIn-leave {
  opacity: 1;
}

// slideRight transition
.slideRight-enter-active {
  transition: all 1s ease-in-out;
}

.slideRight-leave-active {
  transition: all 1s ease-in-out;
}

.slideRight-enter-to,
.slideRight-leave {
  transform: translate(0%);
}

.slideRight-leave-to,
.slideRight-enter {
  transform: translate(100%);
}
// slideBottom transition
.slideBottom-enter-active {
  transition: all 1s ease-in-out;
}

.slideBottom-leave-active {
  transition: all 1s ease-in-out;
}

.slideBottom-enter-to,
.slideBottom-leave {
  transform: translateY(0%);
}

.slideBottom-leave-to,
.slideBottom-enter {
  transform: translateY(100%);
}
// SlideIn transition
.slideIn-enter-active {
  // transition-delay: 1s;
  transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-in-out 0.5s;
}
.slideIn-leave-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-in-out;
}

.slideIn-enter {
  opacity: 0;
  // display: none;
  transform: translate(100%);
}

.slideIn-enter-to {
  opacity: 1;
  transform: translate(0%);
}

.slideIn-leave {
  opacity: 1;
  transform: translate(0%);
  // display: none;
}

.slideIn-leave-to {
  opacity: 0;
  // display: none;
  transform: translate(-100%);
}

.fadeIn {
  opacity: 1;
}

.fadeOut {
  opacity: 0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
