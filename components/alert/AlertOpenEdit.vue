<template>
  <div class="w-full h-full rounded-2xl overflow-hidden border-0">
    <div
      class="flex flex-col flex-grow h-full scroll rounded-2xl full-wrapper"
      :class="desktop ? '' : 'w-full'"
    >
      <div
        class="py-3 md:py-5 bg-red-deep rounded-t-2xl flex justify-between bigScreen:justify-start space-x-6 text-sm md:text-xl text-white font-bold px-3.5 md:px-8"
        :class="[
          activityLog && contentSelected ? 'md:activeLogSelected' : '',
          activityLog && !contentSelected ? 'md:onlyActivity' : '',
          !activityLog && contentSelected ? 'md:onlySelected' : '',
          desktop ? 'header-wrapper' : 'fixed mobile-full-width',
        ]"
      >
        <div>
          <fa
            class="self-end font-bold text-white cursor-pointer"
            :icon="['fas', 'arrow-left']"
            @click="
              store.setCurrentComp({
                currentComp: 'AlertsOpenList',
                previousCurrentComp: currentComp,
              })
            "
          />
        </div>
        <div
          class="relative inline-block w-6 md:w-9 align-middle select-none transition-all duration-800 ease-in-out self-center toggle-button"
        >
          <input
            id="expandComments1"
            checked
            type="checkbox"
            name="toggle"
            class="toggle-checkbox absolute block rounded-full bg-red-deep appearance-none cursor-pointer"
          />
          <label
            for="expandComments1"
            class="toggle-label block overflow-hidden h-3.5 md:h-5 rounded-full transition-all duration-800 ease-in-out bg-ash-default cursor-pointer"
          ></label>
        </div>
        <div class="whitespace-nowrap">Promissory Statements</div>
        <div>13</div>
        <div v-if="desktop" class="flex space-x-4 flex-grow">
          <div class="whitespace-nowrap">Concern Threshold</div>
          <div class="flex-grow text-gray-1200">
            <SlidingBar :bar-id="'concern'" :input-value="`40`" class="sliding-border" />
          </div>
        </div>
        <div v-if="desktop" class="flex space-x-4 flex-grow">
          <div class="whitespace-nowrap">Confidence Threshold</div>
          <div class="flex-grow text-gray-1200">
            <SlidingBar :bar-id="'confidence'" :input-value="`74`" class="sliding-border" />
          </div>
        </div>
      </div>

      <div v-if="!desktop" class="upper-body bg-white mt-11 md:mt-0 fixed mobile-full-width">
        <div v-if="!desktop" class="flex flex-col px-3.5 md:px-4 py-3">
          <div class="whitespace-nowrap text-red-deep font-medium">Concern Threshold</div>
          <div class="min-w-115 text-gray-1200">
            <SlidingBar :bar-id="'concern'" :input-value="`40`" class="sliding-border" />
          </div>
        </div>
        <div v-if="!desktop" class="flex flex-col px-3.5 md:px-4 py-3">
          <div class="whitespace-nowrap text-red-deep font-medium">Confidence Threshold</div>
          <div class="min-w-115 text-gray-1200">
            <SlidingBar :bar-id="'confidence'" :input-value="`74`" class="sliding-border" />
          </div>
        </div>
      </div>

      <div
        class="inner-body flex-grow bg-white rounded-b-2xl mt-47 md:mt-0"
        :class="[
          activityLog && contentSelected ? 'md:activeLogSelected' : '',
          activityLog && !contentSelected ? 'md:onlyActivity' : '',
          !activityLog && contentSelected ? 'md:onlySelected' : '',
          !desktop ? 'scroll w-full' : 'body-wrapper',
        ]"
      >
        <div
          class="md:px-4 pb-3 inner-body-wrapper bg-white scroll h-full text-md md:text-xl"
          :class="contentSelected ? 'px-2' : 'px-0'"
        >
          <table class="min-w-full">
            <thead>
              <tr class="text-red-deep font-bold text-left sticky z-10 bg-white top-0">
                <th></th>
                <th>Flagged</th>
                <th>Open Time</th>
                <th>Confidence</th>
                <th>Severity</th>
                <th>Flagged Text</th>
                <transition name="table-fadeIn" mode="out-in">
                  <th v-if="activityLog">Activity Log</th>
                </transition>
              </tr>
            </thead>

            <template v-for="(ContentDetail, contentDetailsIndex) in ContentDetails">
              <tbody
                :key="contentDetailsIndex + 'table'"
                class="rounded-2xl pt-3 transition-all duration-500 ease-in-out"
                :class="
                  ContentDetail.Selected.value
                    ? 'bg-selected-content rounded-2xl text-gray-1200'
                    : 'text-gray-1200'
                "
              >
                <tr
                  :key="contentDetailsIndex + 'row'"
                  class="cursor-pointer rounded-t-2xl vertical-alignment"
                  @click="selectedFlagged(ContentDetail.id)"
                >
                  <td class="rounded-tl-2xl">{{ ContentDetail.id }}</td>
                  <td>{{ ContentDetail.Flagged }}</td>
                  <td>{{ ContentDetail.OpenTime }}</td>
                  <td>{{ ContentDetail.Confidence }}</td>
                  <td>{{ ContentDetail.Severity }}</td>
                  <td :class="!setActivityLog ? 'rounded-tr-2xl' : ''">
                    <div
                      v-if="activityLog && ContentDetail.Selected.value"
                      class="relative has-tooltip"
                    >
                      <span>"{{ ContentDetail.FlaggedText | strLimit(40) }}"</span>
                      <span
                        v-if="ContentDetail.FlaggedText.length > 30"
                        class="tooltip tooltip-width scroll"
                        :class="
                          contentDetailsIndex > ContentDetails.length - 3
                            ? 'tooltip1'
                            : ''
                        "
                      >{{ ContentDetail.FlaggedText }}</span>
                    </div>
                    <div
                      v-else-if="activityLog && !ContentDetail.Selected.value"
                      class="relative has-tooltip"
                    >
                      <span>"{{ ContentDetail.FlaggedText | strLimit(52) }}"</span>
                      <span
                        v-if="ContentDetail.FlaggedText.length > 30"
                        class="tooltip tooltip-width scroll"
                        :class="
                          contentDetailsIndex > ContentDetails.length - 3
                            ? 'tooltip1'
                            : ''
                        "
                      >{{ ContentDetail.FlaggedText }}</span>
                    </div>
                    <div v-else class="relative has-tooltip">
                      <span>
                        {{
                        ContentDetail.FlaggedText | strLimit(106)
                        }}
                      </span>
                      <span
                        v-if="ContentDetail.FlaggedText.length > 30"
                        class="tooltip tooltip-width scroll"
                        :class="
                          contentDetailsIndex > ContentDetails.length - 3
                            ? 'tooltip1'
                            : ''
                        "
                      >{{ ContentDetail.FlaggedText }}</span>
                    </div>
                  </td>
                  <transition name="table-fadeIn" mode="out-in">
                  <td v-if="activityLog" class="rounded-tr-2xl">
                  <transition-group name="table-group-fadeIn" mode="out-in">
                    <td v-if="activityLog && !ContentDetail.Selected.value" key="td1" class="activity-td">
                      <div class="rounded-tr-2xl relative has-tooltip">
                        <span>
                          {{
                          ContentDetail.ActivityLog | strLimit(47)
                          }}
                        </span>
                        <span
                          v-if="ContentDetail.ActivityLog.length > 30"
                          class="tooltip activity-log-tooltip-width scroll"
                          :class="
                          contentDetailsIndex > ContentDetails.length - 3
                            ? 'tooltip1'
                            : ''
                        "
                        >{{ ContentDetail.ActivityLog }}</span>
                      </div>
                    </td>
                    <div
                      v-if="activityLog && ContentDetail.Selected.value"
                      key="td2"
                      class="commentWrapper rounded-tr-2xl activity-td"
                    >
                      <div class="flex space-x-6">
                        <div class="fullTime flex flex-col">
                          <div class="date">{{ ContentDetail.date }}</div>
                          <div class="time">{{ ContentDetail.time }}</div>
                        </div>

                        <div class="comment relative has-tooltip">
                          <p class="whitespace-normal">{{ ContentDetail.comment }}</p>
                          <p
                            v-if="ContentDetail.comment.length > 10"
                            class="tooltip comment-tooltip-width scroll"
                            :class="
                            contentDetailsIndex > ContentDetails.length - 3
                              ? 'tooltip1'
                              : ''
                          "
                          >{{ ContentDetail.comment }}</p>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                  </td>
                  </transition>
                </tr>
                <transition name="table-FadeIn" mode="out-in">
                  <tr v-if="ContentDetail.Selected.value" class="w-full rounded-b-2xl">
                    <td
                      colspan="6"
                      class="detailsWrapper rounded-bl-2xl"
                      :class="!activityLog && !setActivityLog ? 'w-full rounded-br-2xl' : 'w-2/3'"
                    >
                      <table class="w-full">
                        <tbody>
                          <tr class="w-full">
                            <td class="leftWrapper rounded-bl-2xl w-1/2">
                              <div class="flex">
                                <div class="flex-grow pr-7">
                                  <div
                                    v-for="(
                                    UserDetail, userDetailsIndex
                                  ) in UserDetails"
                                    :key="userDetailsIndex + 'row1'"
                                    class="userDetails"
                                  >
                                    <div class="flex justify-between space-y-2">
                                      <div class="font-bold">{{ UserDetail.heading }}</div>
                                      <div>{{ UserDetail.value }}</div>
                                    </div>
                                  </div>

                                  <div class="viewer mt-4">
                                    <div class="h-full overflow-hidden rounded-2xl">
                                      <div class="flex flex-col flex-grow h-80 rounded-2xl">
                                        <div
                                          class="w-full py-2 bg-red-deep rounded-t-2xl text-white text-center font-bold"
                                        >Viewer</div>

                                        <div
                                          class="w-full inner-body flex-grow bg-white rounded-b-2xl"
                                        >
                                          <div class="overflow-auto scroll py-3 h-full">
                                            <div
                                              v-for="(
                                              Viewer, viewersIndex
                                            ) in Viewers"
                                              :key="viewersIndex + 'row2'"
                                              class="flex px-3 w-full"
                                            >
                                              <div class="post-profile">
                                                <!-- <twitter-icon
                                              class="
                                                w-14
                                                h-14
                                                rounded-full
                                                border border-gray-400
                                              "
                                                ></twitter-icon>-->
                                                <template>
                                                  <img
                                                    :src="profilePic"
                                                    class="rounded-full w-14 h-14"
                                                    alt="`Profile Picture`"
                                                    srcset
                                                  />
                                                </template>
                                              </div>

                                              <div class="w-full">
                                                <div class="flex justify-between items-start">
                                                  <p
                                                    class="text-ash-primary"
                                                    :class="
                                                    activityLog
                                                      ? 'text-xs'
                                                      : 'text-sm md:text-lg'
                                                  "
                                                  >
                                                    <span
                                                      class="font-bold text-offgray"
                                                      :class="
                                                      activityLog
                                                        ? 'text-sm'
                                                        : 'text-md md:text-xl'
                                                    "
                                                    >{{ Viewer.Name }}</span>
                                                    <img
                                                      src="@/assets/img/svg/twitter/Verify.svg"
                                                      class="inline-block h-4"
                                                      alt="Twitter Verify Icon"
                                                    />
                                                    <span
                                                      class="text-gray-1700"
                                                    >{{ Viewer.UserName }}</span>
                                                    <span class="text-gray-1700">{{ Viewer.Time }}</span>
                                                  </p>
                                                  <fa
                                                    class="cursor-pointer text-gray-600 mt-1 mr-0.5"
                                                    :class="
                                                    activityLog
                                                      ? 'text-xs'
                                                      : 'text-sm md:text-lg'
                                                  "
                                                    :icon="['fas', 'ellipsis-h']"
                                                  />
                                                </div>

                                                <div
                                                  class="status"
                                                  :class="
                                                  activityLog
                                                    ? 'text-xs'
                                                    : 'text-sm md:text-lg'
                                                "
                                                >{{ Viewer.Status }}</div>

                                                <div
                                                  class="reaction"
                                                  :class="
                                                  activityLog
                                                    ? 'text-xs'
                                                    : 'text-sm md:text-lg'
                                                "
                                                >
                                                  <div>
                                                    <img
                                                      src="@/assets/img/icon/Twitter Icon/comment_1.svg"
                                                      alt="Twitter Comment Icon"
                                                    />
                                                    <span>
                                                      {{
                                                      Viewer.CommentCount
                                                      }}
                                                    </span>
                                                  </div>
                                                  <div>
                                                    <img
                                                      src="@/assets/img/icon/Twitter Icon/retweet.svg"
                                                      alt="Twitter Retweet Icon"
                                                    />
                                                    <span>
                                                      {{
                                                      Viewer.RetweetCount
                                                      }}
                                                    </span>
                                                  </div>
                                                  <div>
                                                    <img
                                                      class
                                                      src="@/assets/img/icon/Twitter Icon/love_2.svg"
                                                      alt="Twitter Reaction Icon"
                                                    />
                                                    <span>
                                                      {{
                                                      Viewer.ReactCount
                                                      }}
                                                    </span>
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
                                <div class="right-vertical text-white bg-gray-1200"></div>
                              </div>
                            </td>
                            <td
                              class="middleWrapper w-1/2"
                              :class="setActivityLog ? '' : 'rounded-br-2xl'"
                            >
                              <div class="flex pr-4">
                                <div
                                  class="explanation space-y-2 offwhite-800 pr-8"
                                  :class="!activityLog ? 'flex-grow' : ''"
                                >
                                  <div class="flex justify-between">
                                    <div class="font-bold">Explanation</div>
                                    <div>
                                      The term "prodient" is in "Promissory
                                      Lexicon"
                                    </div>
                                  </div>
                                  <div class="flex justify-between items-center space-x-5">
                                    <div class="font-bold">Flag Confirmation</div>
                                    <div>
                                      <UncertainTrueFalseTab />
                                    </div>
                                  </div>

                                  <!-- Here will be the dynamic components -->
                                  <transition name="dynamicComp" mode="out-in">
                                    <component :is="disposition"></component>
                                  </transition>
                                </div>
                                <div v-if="activityLog" class="right-vertical text-white bg-gray-1200"></div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <transition name="table-fadeIn" mode="out-in">
                      <td v-if="activityLog" class="rightWrapper w-1/3 rounded-br-2xl">
                        <div class="rightWrapperInner rounded-br-2xl overflow-auto scroll">
                          <div
                            v-for="(
                          CommentDetail, commentDetailsIndex
                        ) in CommentDetails"
                            :key="commentDetailsIndex + 'row3'"
                            class="commentWrapper offwhite-800"
                          >
                            <div class="flex space-x-6 mb-5">
                              <div class="fullTime flex flex-col">
                                <div
                                  class="date"
                                >{{ CommentDetail.date }}</div>
                                <div class="time">{{ CommentDetail.time }}</div>
                              </div>

                              <div class="comment">
                                <p class="whitespace-normal">{{ CommentDetail.comment }}</p>
                                <p
                                  v-if="CommentDetail.disposition"
                                  class="whitespace-normal"
                                >{{ CommentDetail.disposition }}</p>
                                <p
                                  v-if="CommentDetail.reviewTime"
                                  class="whitespace-normal"
                                >{{ CommentDetail.reviewTime }}</p>
                                <p
                                  v-if="CommentDetail.actions"
                                  class="whitespace-normal"
                                >{{ CommentDetail.actions }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </transition>
                  </tr>
                </transition>
              </tbody>
            </template>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import profilePic from 'assets/img/bp/dp-3.svg'
import SlidingBar from '~/components/alert/sliding-bar/SlidingBar.vue'
import UncertainTrueFalseTab from '~/components/alert/UncertainTrueFalseTab.vue'
import HoldSendCloseTab from '~/components/alert/HoldSendCloseTab.vue'
import FlagFalse from '~/components/alert/FlagFalse.vue'
import { useAlert } from '~/stores/alert'
export default defineComponent({
  components: {
    SlidingBar,
    // TwitterIcon,
    UncertainTrueFalseTab,
    HoldSendCloseTab,
    FlagFalse,
  },
  setup() {
    const store = useAlert()
    const desktop = useBreakpoints(breakpointsTailwind).isGreater('md')
    const { disposition, activityLog, currentComp } = storeToRefs(store)
    const setActivityLog = ref(false)
    const selectedFlag = ref(0)
    const contentSelected = ref(false)
    const previousId = ref('')
    const Viewers = [
      {
        Name: 'Elon Musk',
        UserName: '@WholMarsBlog',
        Time: '8h',
        Status: 'Tesla FSD price rising to $12k on Jan 17',
        CommentCount: '55',
        RetweetCount: '102',
        ReactCount: '1.2K',
      },
      {
        Name: 'Iqbal Sunny',
        UserName: '@IkbalSunny',
        Time: '6h',
        Status:
          'Monthly subscription price will rise when FSD goes to wide release',
        CommentCount: '55',
        RetweetCount: '102',
        ReactCount: '1.2K',
      },
      {
        Name: 'Sandy Marry',
        UserName: '@SandyMarriana',
        Time: '10h',
        Status: 'Monthly sub price staying the same?',
        CommentCount: '55',
        RetweetCount: '102',
        ReactCount: '1.2K',
      },
      {
        Name: 'Alexa Jolly',
        UserName: '@Jolly Alexana',
        Time: '16h',
        Status: 'Tesla FSD price rising to $12k on Jan 17',
        CommentCount: '55',
        RetweetCount: '102',
        ReactCount: '1.2K',
      },
      {
        Name: 'Ariana Granda',
        UserName: '@ArianaGrand',
        Time: '3h',
        Status: 'Monthly sub price staying the same?',
        CommentCount: '5500',
        RetweetCount: '1088',
        ReactCount: '10.2K',
      },
    ]
    const ContentDetails = [
      {
        id: '1',
        Selected: ref(false),
        Flagged: '8/1/2021 8:33 am',
        OpenTime: '14:15:34',
        Confidence: '0.951',
        Severity: '0.91',
        FlaggedText:
          '...cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod ...',
        ActivityLog:
          '12-3-2021 8:33 am - Flag Created for "Promissor 12-3-2021 8:33 am - Flag Created for "Promissor 12-3-2021 8:33 am - Flag Created for "Promissor 12-3-2021 8:33 am - Flag Created for "Promissor 12-3-2021 8:33 am - Flag Created for "Promissor..."',
      },
      {
        id: '2',
        Selected: ref(false),
        Flagged: '8/1/2021 10:33 am',
        OpenTime: '08:03:17',
        Confidence: '0.837',
        Severity: '0.91',
        FlaggedText:
          '...cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod ...',
        ActivityLog: '12-3-2021 8:33 am - Flag Created for "Promissor..."',
      },
      {
        id: '3',
        Selected: ref(false),
        Flagged: '8/1/2021 8:33 am',
        OpenTime: '14:15:34',
        Confidence: '0.951',
        Severity: '0.91',
        FlaggedText:
          '...cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod ...',
        ActivityLog: '12-3-2021 8:33 am - Flag Created for "Promissor..."',
      },
      {
        id: '4',
        Selected: ref(false),
        Flagged: '8/1/2021 8:33 am',
        OpenTime: '14:15:34',
        Confidence: '0.951',
        Severity: '0.91',
        FlaggedText:
          '...cupidatat non prodient, sunt in cupa qui, non prodient. Lorem consectetuer adipiscing elit, qudjd ismod ...',
        ActivityLog: '12-3-2021 8:33 am - Flag Created for "Promissor..."',
      },
    ]
    const CommentDetails = [
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Comment posted on Twitter by @bobsmith123',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Archived on Sharp Archive',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Flagged for "Promissory Statement',
        disposition: 'Disposition: Assigned to Jane Smith',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Reviewed by Jane Smith (response time: 00:04:09)',
        reviewTime: 'Review Time: 00:04:09',
        actions:
          'Actions: Marked as "True Flag", notes recorded, flag sent to George Jones',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Reviewed by George Jones (response time: 2 days, 06:026:43)',
        reviewTime: 'Review Time: 00:07:23',
        actions:
          'Actions: Marked as "True Flag", notes recorded, flag sent to George Jones',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Flagged for "Promissory Statement',
        disposition: 'Disposition: Assigned to Jane Smith',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Reviewed by Jane Smith (response time: 00:04:09)',
        reviewTime: 'Review Time: 00:04:09',
        actions:
          'Actions: Marked as "True Flag", notes recorded, flag sent to George Jones',
      },
      {
        date: '12-3-2021',
        time: '08:33 am',
        comment: 'Reviewed by George Jones (response time: 2 days, 06:026:43)',
        reviewTime: 'Review Time: 00:07:23',
        actions:
          'Actions: Marked as "True Flag", notes recorded, flag sent to George Jones',
      },
    ]
    const UserDetails = [
      {
        heading: 'Name',
        value: 'Bob Smith',
      },
      {
        heading: 'Phone',
        value: '+1 301-555-6789',
      },
      {
        heading: 'Email',
        value: 'bobsmith@example.com',
      },
      {
        heading: 'Source',
        value: 'Twitter',
      },
      {
        heading: 'Account',
        value: '@bobsmith123',
      },
      {
        heading: 'Reviewer',
        value: 'Reviewer',
      },
    ]
    const selectedFlagged = (selected) => {
      if (previousId.value === selected) {
        ContentDetails.map((item) => {
          if (item.id === selected) {
            const dateTime = item.ActivityLog.split(' ', 3)
            item.date = dateTime[0]
            item.time = dateTime[1] + ' ' + dateTime[2]
            item.comment = item.ActivityLog.split('-')[3]
            item.Selected.value = !item.Selected.value
            const itemSelectUpdate = item.Selected.value
            contentSelected.value = itemSelectUpdate
            return itemSelectUpdate
          } else {
            return (item.Selected.value = false)
          }
        })
      } else {
        ContentDetails.map((item) => {
          return (item.Selected.value = false)
        })
        setTimeout(() => {
          ContentDetails.forEach((item) => {
            if (item.id === selected) {
              previousId.value = item.id
              const dateTime = item.ActivityLog.split(' ', 3)
              item.date = dateTime[0]
              item.time = dateTime[1] + ' ' + dateTime[2]
              item.comment = item.ActivityLog.split('-')[3]
              item.Selected.value = true
              const itemSelectUpdate = item.Selected.value
              contentSelected.value = itemSelectUpdate
              return itemSelectUpdate
            }
          })
        }, 500)
      }
    }
    return {
      store,
      activityLog,
      previousId,
      setActivityLog,
      disposition,
      selectedFlag,
      Viewers,
      ContentDetails,
      CommentDetails,
      UserDetails,
      profilePic,
      selectedFlagged,
      contentSelected,
      desktop,
      currentComp,
    }
  },
  date() {
    return {}
  },
  computed: {},
  watch: {
    activityLog(data) {
      if (data) {
        this.setActivityLog = true
      } else {
        setTimeout(() => {
          this.setActivityLog = false
        }, 500)
      }
    },
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.tooltip {
  @apply invisible h-28 overflow-auto 
  whitespace-normal
  absolute 
  bg-red-deep
  text-white 
  text-left
  z-100
  rounded-2xl
  left-0
  md:px-2 py-0.5
  px-4 
  shadow-lg;
}
.has-tooltip:hover .tooltip {
  top: -30px;
  @apply visible;
  transition: all 0.3s linear;
}
.has-tooltip:hover .tooltip1 {
  @apply visible;
  transition: all 0.3s linear;
}
.tooltip-width {
  width: 500px;
  top: -100px;
}
.activity-log-tooltip-width {
  width: 350px;
}
.comment-tooltip-width {
  width: 250px;
}
@media (max-width: 768px) {
  .tooltip-width {
    width: 300px;
  }
  .activity-log-tooltip-width {
    width: 300px;
  }
}
.vertical-alignment {
  vertical-align: top;
}
.header-wrapper,
.body-wrapper {
  // width: -webkit-fit-content;
  // width: -moz-fit-content;
  // width: fit-content;
  height: fit-content;
  min-width: 1764px;
  max-width: 2550px;
}
.onlySelected {
  min-width: 1780px;
  max-width: 2550px;
}
.onlyActivity {
  min-width: 1785px;
  max-width: 2550px;
}
.activeLogSelected {
  min-width: 1830px;
  max-width: 2550px;
}
.mobile-full-width {
  width: calc(100% - 16px);
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
.whole-card {
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
}
.card {
  @apply bg-white p-3 my-0 md:w-1/2 w-full z-1;
  box-shadow: 0px 1px 2px #22283126;
  border-radius: 10px;
}
.imagePopup-enter-active,
.imagePopup-leave-active {
  transition: opacity 0.5s;
}
.imagePopup-enter,
.imagePopup-leave-to {
  opacity: 0;
}
.verticle-line {
  @apply absolute h-full border-l-2 border-red-700 top-2 left-6;
  border-color: #f1f2f6;
}
.post-profile {
  @apply pr-3 py-3 -mt-3;
  z-index: 20;
}
.post-profile img {
  min-width: 56px;
}
.reaction {
  @apply my-2 flex justify-between text-gray-1700 mr-16;
}
.reaction img {
  @apply inline-block w-4 mr-4;
  fill: #8e8e8e;
}
.retweet {
  @apply inline-block w-4 mr-4;
  fill: #8e8e8e;
}
.inner-body {
  height: 60%;
}
.min-w-115 {
  min-width: 438px;
}
.min-w-117 {
  min-width: 550px;
}
table tr th {
  @apply px-4 md:px-7 pb-1.5 pt-4 whitespace-nowrap;
}
table tr th:first-child {
  @apply px-0 pl-3.5 md:pl-4 pr-4 md:pr-7 whitespace-nowrap;
}
table tr th:last-child {
  @apply px-0 pl-4 pr-3.5 md:pr-4 md:px-4;
}
table tr td {
  @apply px-4 md:px-7 py-1.5 whitespace-nowrap;
}
table tr td:first-child {
  @apply px-0 pl-3.5 md:pl-4 pr-4 md:pr-7 whitespace-nowrap;
}
table tr td:last-child {
  @apply px-0 pl-4 pr-3.5 md:pr-4 md:px-4;
}

.detailsWrapper {
  @apply pb-6;
  padding-left: 40px;
  padding-right: 0px !important;
}
.detailsWrapper table tr td:first-child {
  @apply px-0 pr-0 whitespace-nowrap;
}
.leftWrapper {
  min-width: 256px;
  vertical-align: baseline;
}
.middleWrapper {
  min-width: 256px;
  vertical-align: baseline;
  padding-left: 30px !important;
  padding-right: 0px !important;
}
.rightWrapper {
  @apply pb-6;
  min-width: 256px;
  vertical-align: baseline;
  padding-right: 0px !important;
}
.rightWrapperInner {
  max-height: 550px;
}
.right-vertical {
  width: 2px;
  height: 552px;
}
.comment {
  max-width: 345px;
}
.status {
  @apply text-ash-primary;
}

.toggle-checkbox {
  @apply w-3 h-3 md:w-4 md:h-4;
  min-width: 1rem;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #a22a2a;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
}
.action-icon {
  @apply pl-3 md:pl-5;
}
.scroll {
  overflow-x: auto;
  overflow-y: auto;
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
.full-wrapper {
  overflow-y: hidden !important;
}
.inner-body-wrapper {
  overflow-x: hidden !important;
}
.promissory-toggle {
  min-width: 36px;
}
#tooltipconcern {
  top: -3px !important;
}
.toggle-button {
  min-width: 2.25rem;
}
.table-fadeIn-enter-active,
.table-fadeIn-leave-active {
  max-height: 100%;
  transition: opacity 0.5s ease-in-out, height 0.5s ease-in-out;
}
.table-fadeIn-enter,
.table-fadeIn-leave-to {
  opacity: 0;
  max-height: 0%;
}
.table-FadeIn-enter-active,
.table-FadeIn-leave-active {
  max-height: 100%;
  transition: opacity 0.5s ease-in-out, height 0.5s ease-in-out;
}
.table-FadeIn-enter,
.table-FadeIn-leave-to {
  opacity: 0;
  max-height: 0%;
}
.table-FadeIn-enter-active {
  transition-delay: 0.5s;
}
.table-group-fadeIn-enter-active,
.table-group-fadeIn-leave-active {
  max-height: 100%;
  transition: opacity 0.5s ease-in-out, height 0.5s ease-in-out;
}
.table-group-fadeIn-enter,
.table-group-fadeIn-leave-to {
  opacity: 0;
  max-height: 0%;
}
.table-group-fadeIn-enter-active {
  transition-delay: 0.5s;
}
@media (max-width: 767px) {
  .toggle-checkbox{
    min-width: 12px;
  }
  .min-w-115 {
    min-width: 327px;
  }
  .inner-body-wrapper {
    overflow-x: auto !important;
  }
  .right-vertical {
    height: 528px;
  }
  .toggle-checkbox {
    top: 1px;
    left: 1px;
    &:checked {
      left: 11px;
    }
    &:checked + .toggle-label {
    }
  }
  .toggle-button {
    min-width: 1.5rem;
  }
}
.activity-td{
  padding: 0px !important;
}
.bg-selected-content{
  background-color: #E0E0E0;
}
</style>
