<template>
  <section class="h-full">
    <transition name="page">
      <div v-if="isDesktop" class="hidden md:block p-4 pt-0 h-full relative">
        <div
          class="content flex flex-col transition-all duration-2000 space-y-8"
          :class="[showHomeContent ? 'opacity-0' : '']"
          @click="closeSidebar()"
          @click.stop="
            previousCurrentComp.length > 0 && currentComp === 'SummaryTable'
              ? store.backToCurrentComp(previousCurrentComp[0])
              : ''
          "
        >
          <div
            class="header_wrapper"
            :class="
              currentComp === 'GeneralAlertSettings' ||
              currentComp === 'AlertSystemSetting'
                ? 'flex-nowrap'
                : 'flex-wrap header_wrap'
            "
          >
            <!--start => dropdown archive menu-->

            <div class="dropdown_menu mt-4 basis-full lg:basis-auto">
              <ArchiveSourcesDropdown
                :active="false"
                :height="100"
                :source="'alert'"
                @expand="showSkew($event)"
                @show-edit-feed="showEditFeed = true"
              />
            </div>

            <!-- <div class="w-full justify-end"> -->

            <div class="w-full justify-end space-x-4 hidden largeTab:flex">
              <transition name="fadeIn">
                <div
                  v-if="
                    currentComp === 'GeneralAlertSettings' ||
                    currentComp === 'AlertSystemSetting'
                  "
                  class="w-10 h-10 rounded-full bg-red-deep flex justify-center items-center mt-4"
                  @click="store.backToCurrentComp(previousCurrentComp[0])"
                >
                  <fa
                    class="text-white md:text-2xl text-2xl font-normal cursor-pointer"
                    :icon="['fas', 'times']"
                  />
                </div>

                <div
                  v-else
                  class="w-full flex largeDesktop:justify-between justify-end flex-wrap space-y-4 space-x-4"
                >
                  <summary-alerts-tab class="mt-4"></summary-alerts-tab>

                  <open-close-tab></open-close-tab>

                  <feeds-groups-response
                    v-if="
                      currentComp === 'GraphComp' ||
                      currentComp === 'SummaryTable'
                    "
                  ></feeds-groups-response>

                  <ActivityLogEditTab
                    v-else-if="currentComp === 'AlertOpenEdit'"
                  />

                  <ListSeveritySourceGroupsTab v-else />

                  <div
                    v-if="currentComp !== 'AlertOpenEdit'"
                    class="flex space-x-4"
                  >
                    <button
                      class="text-white bg-red-deep w-32 h-10 flex justify-center items-center xl:text-lg md:text-md text-sm font-bold rounded-full"
                      @click.stop="
                        store.showNewAlertComp(true),
                          previousCurrentComp.length > 0 &&
                          currentComp === 'SummaryTable'
                            ? store.backToCurrentComp(previousCurrentComp[0])
                            : ''
                      "
                    >
                      New
                    </button>

                    <div
                      class="flex justify-center items-center w-10 h-10 bg-red-deep rounded-full cursor-pointer"
                      @click.stop="
                        previousCurrentComp.length > 0 &&
                        currentComp === 'SummaryTable'
                          ? store.backToCurrentComp(previousCurrentComp[0])
                          : '',
                          store.setCurrentComp({
                            currentComp: 'AlertSystemSetting',
                            previousCurrentComp: currentComp,
                          })
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 19.99 20.01"
                        width="20"
                        height="20"
                      >
                        <defs>
                          <style>
                            .clss-1 {
                              fill: #ffffff;
                            }
                          </style>
                        </defs>

                        <g id="Layer_2" data-name="Layer 2">
                          <g id="Layer_1-2" data-name="Layer 1">
                            <g id="customize">
                              <path
                                id="Path_2114"
                                data-name="Path 2114"
                                class="clss-1"
                                d="M14.68,3.58H10.11a.23.23,0,0,0-.27.18h0a2.84,2.84,0,0,1-5.39,0,.24.24,0,0,0-.27-.2h0q-1.72,0-3.45,0A.72.72,0,0,1,0,2.87a.74.74,0,0,1,.51-.7,1,1,0,0,1,.29,0H4.19A.22.22,0,0,0,4.44,2h0a2.84,2.84,0,0,1,5.4,0c.06.17.14.2.3.2h9.1a.71.71,0,0,1,.7,1,.7.7,0,0,1-.69.44ZM8.57,2.87A1.43,1.43,0,1,0,7.13,4.29h0A1.44,1.44,0,0,0,8.57,2.88Z"
                              />

                              <path
                                id="Path_2115"
                                data-name="Path 2115"
                                class="clss-1"
                                d="M5.31,9.3H9.88a.25.25,0,0,0,.28-.2,2.84,2.84,0,0,1,5.38,0,.27.27,0,0,0,.31.22c1.14,0,2.29,0,3.43,0a.71.71,0,0,1,.2,1.39.67.67,0,0,1-.28,0H15.83a.26.26,0,0,0-.29.22,2.84,2.84,0,0,1-5.38,0,.26.26,0,0,0-.3-.21H.76A.71.71,0,0,1,0,10.06a.68.68,0,0,1,.06-.34.69.69,0,0,1,.7-.42Zm9,.71a1.43,1.43,0,1,0-1.43,1.43h0A1.43,1.43,0,0,0,14.28,10Z"
                              />

                              <path
                                id="Path_2116"
                                data-name="Path 2116"
                                class="clss-1"
                                d="M14.68,17.86H10.1a.23.23,0,0,0-.26.19h0a2.84,2.84,0,0,1-5.4,0,.23.23,0,0,0-.26-.19h0c-1.15,0-2.3,0-3.46,0a.72.72,0,0,1-.2-1.4.88.88,0,0,1,.28,0H4.17a.25.25,0,0,0,.28-.2h0a2.83,2.83,0,0,1,5.38,0,.27.27,0,0,0,.31.22q4.54,0,9.1,0a.7.7,0,0,1,.75.66.76.76,0,0,1,0,.33.7.7,0,0,1-.69.43Zm-7.54.72a1.43,1.43,0,1,0-1.43-1.44A1.45,1.45,0,0,0,7.14,18.58Z"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Devices below 1440px -->

            <div class="w-full flex justify-end space-x-4 largeTab:hidden">
              <transition name="fadeIn">
                <div
                  v-if="
                    currentComp === 'GeneralAlertSettings' ||
                    currentComp === 'AlertSystemSetting'
                  "
                  class="w-10 h-10 rounded-full bg-red-deep flex justify-center items-center mt-4"
                  @click="store.backToCurrentComp(previousCurrentComp[0])"
                >
                  <fa
                    class="text-white md:text-2xl text-2xl font-normal cursor-pointer"
                    :icon="['fas', 'times']"
                  />
                </div>

                <div
                  v-else
                  class="w-full flex largeDesktop:justify-between justify-end flex-wrap space-y-4"
                >
                  <div class="flex mt-4 space-x-4">
                    <summary-alerts-tab></summary-alerts-tab>

                    <open-close-tab></open-close-tab>
                  </div>

                  <div class="flex space-x-4">
                    <div class="order-last ml-4">
                      <feeds-groups-response
                        v-if="
                          currentComp === 'GraphComp' ||
                          currentComp === 'SummaryTable'
                        "
                      ></feeds-groups-response>

                      <ActivityLogEditTab
                        v-else-if="currentComp === 'AlertOpenEdit'"
                      />

                      <ListSeveritySourceGroupsTab v-else />
                    </div>

                    <div v-if="currentComp !== 'AlertOpenEdit'" class="flex">
                      <button
                        class="text-white bg-red-deep w-32 h-10 flex justify-center items-center xl:text-lg md:text-md text-sm font-bold rounded-full order-last ml-4"
                        @click.stop="
                          store.showNewAlertComp(true),
                            previousCurrentComp.length > 0 &&
                            currentComp === 'SummaryTable'
                              ? store.backToCurrentComp(previousCurrentComp[0])
                              : ''
                        "
                      >
                        New
                      </button>

                      <div
                        class="flex justify-center items-center w-10 h-10 bg-red-deep rounded-full cursor-pointer"
                        @click.stop="
                          previousCurrentComp.length > 0 &&
                          currentComp === 'SummaryTable'
                            ? store.backToCurrentComp(previousCurrentComp[0])
                            : '',
                            store.setCurrentComp({
                              currentComp: 'AlertSystemSetting',
                              previousCurrentComp: currentComp,
                            })
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 19.99 20.01"
                          width="20"
                          height="20"
                        >
                          <defs>
                            <style>
                              .clss-1 {
                                fill: #ffffff;
                              }
                            </style>
                          </defs>

                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                              <g id="customize">
                                <path
                                  id="Path_2114"
                                  data-name="Path 2114"
                                  class="clss-1"
                                  d="M14.68,3.58H10.11a.23.23,0,0,0-.27.18h0a2.84,2.84,0,0,1-5.39,0,.24.24,0,0,0-.27-.2h0q-1.72,0-3.45,0A.72.72,0,0,1,0,2.87a.74.74,0,0,1,.51-.7,1,1,0,0,1,.29,0H4.19A.22.22,0,0,0,4.44,2h0a2.84,2.84,0,0,1,5.4,0c.06.17.14.2.3.2h9.1a.71.71,0,0,1,.7,1,.7.7,0,0,1-.69.44ZM8.57,2.87A1.43,1.43,0,1,0,7.13,4.29h0A1.44,1.44,0,0,0,8.57,2.88Z"
                                />

                                <path
                                  id="Path_2115"
                                  data-name="Path 2115"
                                  class="clss-1"
                                  d="M5.31,9.3H9.88a.25.25,0,0,0,.28-.2,2.84,2.84,0,0,1,5.38,0,.27.27,0,0,0,.31.22c1.14,0,2.29,0,3.43,0a.71.71,0,0,1,.2,1.39.67.67,0,0,1-.28,0H15.83a.26.26,0,0,0-.29.22,2.84,2.84,0,0,1-5.38,0,.26.26,0,0,0-.3-.21H.76A.71.71,0,0,1,0,10.06a.68.68,0,0,1,.06-.34.69.69,0,0,1,.7-.42Zm9,.71a1.43,1.43,0,1,0-1.43,1.43h0A1.43,1.43,0,0,0,14.28,10Z"
                                />

                                <path
                                  id="Path_2116"
                                  data-name="Path 2116"
                                  class="clss-1"
                                  d="M14.68,17.86H10.1a.23.23,0,0,0-.26.19h0a2.84,2.84,0,0,1-5.4,0,.23.23,0,0,0-.26-.19h0c-1.15,0-2.3,0-3.46,0a.72.72,0,0,1-.2-1.4.88.88,0,0,1,.28,0H4.17a.25.25,0,0,0,.28-.2h0a2.83,2.83,0,0,1,5.38,0,.27.27,0,0,0,.31.22q4.54,0,9.1,0a.7.7,0,0,1,.75.66.76.76,0,0,1,0,.33.7.7,0,0,1-.69.43Zm-7.54.72a1.43,1.43,0,1,0-1.43-1.44A1.45,1.45,0,0,0,7.14,18.58Z"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <!-- </div> -->

            <!--end => dropdown archive menu-->
          </div>

          <!--start => main content -->

          <div
            class="flex-grow h-full overflow-hidden transition-all duration-500 ease-in-out relative"
            :class="[skew ? 'largeDesktop:ml-70' : '']"
          >
            <div class="h-full relative">
              <transition name="dynamicComp" mode="out-in">
                <component :is="currentComp"></component>
              </transition>
            </div>
          </div>

          <!--end => main content -->
        </div>
      </div>

      <div v-else class="p-2 md:hidden mobile-home_page_height">
        <div class="transition-all content duration-2000">
          <div class="body-height transition-all body-wrapper duration-3000">
            <div class="relative h-full">
              <div class="w-full h-full overflow-hidden rounded-2xl">
                <div class="h-full relative">
                  <transition name="dynamicComp" mode="out-in">
                    <component :is="currentComp"></component>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from 'pinia'
// import { mapState } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import TheSidebar from '~/components/TheSidebar'
import SummaryAlertsTab from '~/components/alert/header-tab/SummaryAlertsTab.vue'
import OpenCloseTab from '~/components/alert/header-tab/OpenCloseTab.vue'
import FeedsGroupsResponse from '~/components/alert/header-tab/FeedsGroupsResponse.vue'
import ListSeveritySourceGroupsTab from '~/components/alert/header-tab/ListSeveritySourceGroupsTab.vue'
import ActivityLogEditTab from '~/components/alert/ActivityLogEditTab.vue'
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import GraphComp from '~/components/alert/dynamic-component/GraphComp.vue'
import AlertSystemSetting from '~/components/alert/dynamic-component/AlertSystemSetting.vue'
import GeneralAlertSettings from '~/components/alert/dynamic-component/GeneralAlertSettings.vue'
import AlertsOpenList from '~/components/alert/dynamic-component/AlertsOpenList.vue'
import AlertsOpenSeverity from '~/components/alert/dynamic-component/AlertsOpenSeverity.vue'
import AlertsOpenSource from '~/components/alert/dynamic-component/AlertsOpenSource.vue'
import AlertsOpenGroups from '~/components/alert/dynamic-component/AlertsOpenGroups.vue'
import SummaryTable from '~/components/alert/dynamic-component/SummaryTable.vue'
import AlertOpenEdit from '~/components/alert/AlertOpenEdit.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    ArchiveSourcesDropdown,
    // eslint-disable-next-line vue/no-unused-components
    TheSidebar,
    SummaryAlertsTab,
    OpenCloseTab,
    FeedsGroupsResponse,
    ListSeveritySourceGroupsTab,
    ActivityLogEditTab,
    GraphComp,
    GeneralAlertSettings,
    AlertsOpenList,
    AlertsOpenSeverity,
    AlertsOpenSource,
    AlertsOpenGroups,
    SummaryTable,
    AlertSystemSetting,
    AlertOpenEdit,
  },
  layout: 'home',
  setup() {
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    const store = useAlert()
    return {
      isDesktop: tailwindBreakpoints.greater('md'),
      store,
    }
  },
  data() {
    return {
      skew: false,
      isLoading: true,
      showReviewModal: false,
      headerConfig: {
        barColor: 'text-red-deep',
        icon: 'plus',
        iconColor: 'text-red-deep',
        text: 'Alerts',
        dropdownMenuColor: 'alert',
      },
    }
  },
  computed: {
    // ...mapState('loginAnimation', {
    //   showHomeContent: 'showHomeContent',
    // }),
    ...mapState(useAlert, ['currentComp', 'previousCurrentComp']),
    getSqueeze() {
      return this.$store.getters['mobile/header/getSqueeze']
    },
    showHomeContent() {
      return this.$store.getters['loginAnimation/showHomeContent']
    },
  },
  watch: {
    isDesktop(data) {
      if (data) {
        this.store.setIsDesktop(true)
      } else {
        this.store.setIsDesktop(false)
      }
    },
  },
  mounted() {
    this.setHeaderConfig()
    this.store.setIsDesktop(false)
  },
  methods: {
    showSkew($event) {
      this.skew = $event
    },
    closeSidebar() {
      this.store.showNewAlertComp(false)
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
    },
    highlight(string, keyword) {
      if (keyword.length <= 0) {
        return '"' + string.substring(0, 80) + '..."'
      }
      const index = string.indexOf(keyword)
      if (index >= 0) {
        let output = ''
        const separator = ' '
        const maxLen = 10
        const before =
          string.substring(0, index).length > 10
            ? '...' +
              string
                .substring(0, index)
                .substr(
                  -string.substring(0, index).lastIndexOf(separator, maxLen),
                  maxLen
                )
            : string.substring(0, index)
        const after =
          string.substring(index + keyword.length).length > 10
            ? string.substring(
                index + keyword.length,
                string.indexOf(separator, index + keyword.length + maxLen)
              ) + ' ...'
            : string.substring(index + keyword.length)
        output =
          '"' +
          before +
          "<span style='color:#d72323'>" +
          string.substring(index, index + keyword.length) +
          '</span>' +
          after +
          '"'
        return output
      }
      return '"' + string.substring(0, 80) + '..."'
    },

    setHeaderConfig() {
      this.$store.dispatch('mobile/header/setHeaderConfig', this.headerConfig)
    },
  },
})
</script>

<style lang="scss" scoped>
.header_wrapper {
  // @apply grid grid-cols-12 lg:gap-4 gap-2 lg:space-y-0;
  @apply flex justify-between w-full largeDesktop:space-x-28;
}
.max-width-550 {
  width: 30%;
  max-width: 550px;
}

/* for dynamic Components */
.dynamicComp-enter-active,
.dynamicComp-leave-active {
  transition: opacity 0.5s;
}
.dynamicComp-enter,
.dynamicComp-leave-to {
  opacity: 0;
}

.scroll {
  scrollbar-color: #a22a2a #ececec; /* Firefox 64 */

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #a22a2a;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #a22a2a;
  }
}
.inner-body {
  height: calc(100% - 40px);
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.mobile-home_page_height {
  height: 100%;
  position: relative;
  padding-top: 60px;
}

@media (max-width: 768px) {
  .body-wrapper {
    margin-top: 1rem;
  }
  .body-height {
    height: calc(100% - 16px);
  }
}

@media (min-width: 1100px) {
  .header_wrap {
    @apply flex-nowrap;
  }
}
</style>
