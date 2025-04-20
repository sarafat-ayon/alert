<template>
  <div
    class="h-full overflow-hidden rounded-2xl"
    :style="{ '--lastRowHeight': lastRowHeight + 'px' }"
  >
    <div class="flex flex-col flex-grow h-full rounded-2xl">
      <div class="w-full py-5 bg-red-deep rounded-t-2xl"></div>
      <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
        <div
          ref="scrollContainer"
          class="overflow-auto scroll pl-3.5 md:pl-5 h-full"
        >
          <table class="text-md md:text-xl min-w-full">
            <thead>
              <tr
                class="
                  text-red-deep
                  font-bold
                  text-left
                  sticky
                  z-10
                  bg-white
                  top-0
                "
              >
                <th>Active</th>
                <th>Edit</th>
                <th>Alert Name</th>
                <th class="text-right">Unreviewed</th>
                <th class="min-w-502">Concern Threshold</th>
                <th class="min-w-502 right-62">Confidence Threshold</th>
                <!-- <th class="emptyThWidth"></th> -->
                <th
                  class="
                    text-right
                    md:sticky md:top-0 md:right-0 md:bg-white
                    emptyThWidth
                    md:z-3
                  "
                  :class="{
                    'sticky-border': scrollPosition > 24,
                  }"
                >
                  Severity Index
                </th>
              </tr>
            </thead>

            <template v-for="(item, itemIndex) in AlertOpenListSeverity">
              <tbody :key="itemIndex + 'singleItem'">
                <tr>
                  <td>
                    <div
                      class="
                        relative
                        inline-block
                        w-9
                        align-middle
                        select-none
                        transition-all
                        duration-800
                        ease-in-out
                      "
                    >
                      <input
                        :id="itemIndex"
                        :checked="item.active.value"
                        type="checkbox"
                        name="toggle"
                        class="
                          toggle-checkbox
                          absolute
                          block
                          rounded-full
                          bg-red-deep
                          appearance-none
                          cursor-pointer
                        "
                        @click="updateActive(item.id)"
                      />
                      <label
                        :for="itemIndex"
                        class="
                          toggle-label
                          block
                          overflow-hidden
                          h-5
                          rounded-full
                          transition-all
                          duration-800
                          ease-in-out
                          bg-ash-default
                          cursor-pointer
                        "
                      ></label>
                    </div>
                  </td>
                  <td class="table-td flex items-center action-icon top-margin">
                    <div class="flex items-center space-x-3">
                      <a
                        data-title="Edit"
                        class="
                          w-5
                          h-5
                          md:w-7 md:h-7
                          cursor-pointer
                          flex
                          items-center
                          justify-center
                        "
                        @click="
                          store.setCurrentComp({
                            currentComp: 'GeneralAlertSettings',
                            previousCurrentComp: currentComp,
                          })
                        "
                      >
                        <div
                          class="
                            w-4.5
                            h-4.5
                            md:w-5.5 md:h-5.5
                            bg-red-deep
                            relative
                            rounded-full
                            flex
                            items-end
                          "
                        >
                          <edit-icon></edit-icon>
                        </div>
                      </a>
                    </div>
                  </td>
                  <td
                    :class="{
                      'cursor-pointer': top <= 48,
                    }"
                    @click="handleClick(itemIndex, 'AlertOpenEdit')"
                    @mousemove="handleMousemove($event)"
                  >
                    {{ item.alertName }}
                  </td>
                  <td
                    class="text-right"
                    :class="{
                      'cursor-pointer': top <= 48,
                    }"
                    @click="handleClick(itemIndex, 'AlertOpenEdit')"
                    @mousemove="handleMousemove($event)"
                  >
                    {{ item.unReviewed }}
                  </td>
                  <td class="min-w-502">
                    <SlidingBar
                      :bar-id="`id1+${item.id}`"
                      :input-value="`${item.concernTreshold}`"
                      :show-input-fields="item.showConcernTresholdInput.value"
                      @update-show-input="updateShowInput"
                      @update-hide-input="updateHideInput"
                    />
                  </td>
                  <td class="min-w-502">
                    <SlidingBar
                      :bar-id="`id2+${item.id}`"
                      :input-value="`${item.confidenceTreshold}`"
                      :show-input-fields="item.showConfidenceTreshold.value"
                      @update-show-input="updateShowInput"
                      @update-hide-input="updateHideInput"
                    />
                  </td>
                  <!-- <td class="emptyThWidth"></td> -->
                  <td
                    class="
                      text-right
                      md:sticky md:top-0 md:right-0 md:bg-white
                      emptyThWidth
                      md:z-3
                    "
                    :class="{
                      'sticky-border': scrollPosition > 24,
                      'cursor-pointer': top <= 48,
                    }"
                    @click="handleClick(itemIndex, 'AlertOpenEdit')"
                    @mousemove="handleMousemove($event)"
                  >
                    {{ item.severityIndex }}
                  </td>
                </tr>
              </tbody>
            </template>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useStore,
  computed,
  watch,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import SlidingBar from '~/components/alert/sliding-bar/SlidingBar.vue'
import EditIcon from '~/components/shared/icon/EditIcon.vue'
import { useAlert } from '~/stores/alert'

export default defineComponent({
  components: {
    SlidingBar,
    EditIcon,
  },
  setup() {
    const store = useAlert()
    const vueStore = useStore()
    const { currentComp } = storeToRefs(store)
    // const activeStatus = ref(false)
    // return { activeStatus }
    const AlertOpenListSeverity = [
      {
        id: '1',
        active: ref(false),
        edit: ref(false),
        alertName: 'Promissory Statements',
        unReviewed: '13',
        concernTreshold: '50',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '10',
        severityIndex: '0.92',
      },
      {
        id: '2',
        active: ref(true),
        edit: ref(false),
        alertName: 'Unsubstantiated Claims',
        unReviewed: '13',
        concernTreshold: '82.7',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '60',
        severityIndex: '0.48',
      },
      {
        id: '3',
        active: ref(false),
        edit: ref(false),
        alertName: 'Profanity',
        unReviewed: '13',
        concernTreshold: '48.3',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '50',
        severityIndex: '0.73',
      },
      {
        id: '4',
        active: ref(false),
        edit: ref(false),
        alertName: 'Insider Trading',
        unReviewed: '13',
        concernTreshold: '10',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '40',
        severityIndex: '0.92',
      },
      {
        id: '5',
        active: ref(true),
        edit: ref(false),
        alertName: 'Flame Wars',
        unReviewed: '13',
        concernTreshold: '50',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '100',
        severityIndex: '0.92',
      },
      {
        id: '6',
        active: ref(false),
        edit: ref(false),
        alertName: 'Fraud',
        unReviewed: '13',
        concernTreshold: '100',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '50',
        severityIndex: '0.92',
      },
      {
        id: '7',
        active: ref(true),
        edit: ref(false),
        alertName: 'Misogyny',
        unReviewed: '13',
        concernTreshold: '70',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '60',
        severityIndex: '0.92',
      },
      {
        id: '8',
        active: ref(false),
        edit: ref(false),
        alertName: 'Corporate Security',
        unReviewed: '13',
        concernTreshold: '20',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '50',
        severityIndex: '0.92',
      },
      {
        id: '9',
        active: ref(false),
        edit: ref(false),
        alertName: 'Bullying',
        unReviewed: '13',
        concernTreshold: '40',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '30',
        severityIndex: '0.92',
      },
      {
        id: '10',
        active: ref(true),
        edit: ref(false),
        alertName: 'Threats/Violence',
        unReviewed: '13',
        concernTreshold: '60',
        showConcernTresholdInput: ref(false),
        showConfidenceTreshold: ref(false),
        confidenceTreshold: '50',
        severityIndex: '0.92',
      },
    ]
    const updateShowInput = (fullId) => {
      if (fullId.includes('id1')) {
        const nowConcernId = fullId.split('id1+')[1]
        AlertOpenListSeverity.map((item) => {
          if (item.id === nowConcernId) {
            item.showConcernTresholdInput.value = true
          } else {
            item.showConcernTresholdInput.value = false
          }
          item.showConfidenceTreshold.value = false
          return item
        })
      } else if (fullId.includes('id2')) {
        const nowConfidenceId = fullId.split('id2+')[1]
        AlertOpenListSeverity.map((item) => {
          if (item.id === nowConfidenceId) {
            item.showConfidenceTreshold.value = true
          } else {
            item.showConfidenceTreshold.value = false
          }
          item.showConcernTresholdInput.value = false
          return item
        })
      }
    }
    const updateHideInput = () => {
      AlertOpenListSeverity.map((item) => {
        item.showConcernTresholdInput.value = false
        item.showConfidenceTreshold.value = false

        return item
      })
    }
    const updateActive = (selected) => {
      //   console.log(selected, 'here')
      //   AlertOpenListSeverity.map((item) => {
      //     console.log(item.id, '2')
      //     if (item.id === selected) {
      //       console.log(item.id, '3', item.active.value)
      //       return console.log((item.active.value = !item.active.value))
      //     } else {
      //       return item.active.value
      //     }
      //   })
    }

    const scrollContainer = ref(null)
    const scrollPosition = ref(0)
    const lastRowHeight = ref(0)
    const top = ref(0)

    const addEvents = () => {
      window.addEventListener('resize', handleResize)
      scrollContainer.value.addEventListener('scroll', handleScroll)
    }
    const handleResize = () => {
      const totalRowsHeight = AlertOpenListSeverity.length * 48 + 60 + 10
      if (scrollContainer.value.offsetHeight > totalRowsHeight) {
        lastRowHeight.value =
          scrollContainer.value.offsetHeight - (totalRowsHeight - 48)
      } else {
        lastRowHeight.value = 48
      }
    }
    const handleScroll = () => {
      scrollPosition.value =
        scrollContainer.value.scrollWidth -
        scrollContainer.value.clientWidth -
        scrollContainer.value.scrollLeft
    }
    const handleMousemove = (event) => {
      top.value = event.pageY - event.target.getBoundingClientRect().top
    }
    const handleClick = (index, currComp) => {
      // if (top.value < 48 && AlertOpenListSeverity.length - 1 === index) {
      if (top.value <= 48) {
        store.setCurrentComp({
          currentComp: currComp,
          previousCurrentComp: currentComp,
        })
      }
    }
    onMounted(() => {
      addEvents()
      handleResize()
      handleScroll()
    })

    const squeeze = computed(() => vueStore.state.mobile.header.squeeze)

    watch(squeeze, (newSqueeze, oldSqueeze) => {
      if (newSqueeze !== oldSqueeze) {
        setTimeout(() => {
          handleScroll()
          handleResize()
        }, 800)
      }
    })

    return {
      store,
      updateShowInput,
      updateHideInput,
      AlertOpenListSeverity,
      currentComp,
      updateActive,
      scrollPosition,
      scrollContainer,
      lastRowHeight,
      handleClick,
      top,
      handleMousemove,
    }
  },
  date() {
    return {
      // activeStatus: false,
    }
  },
})
</script>

<style lang="scss" scoped>
.inner-body {
  height: calc(100% - 40px);
}
.top-margin {
  margin-top: 1px;
}
.min-w-502 {
  min-width: 350px;
}
.emptyThWidth {
  min-width: 168px;
}
.max-w-118 {
  max-width: 550px;
}
table tr th {
  @apply px-2.5 md:px-6 py-4 whitespace-nowrap;
}
table tr th:first-child {
  @apply px-0 pr-2.5 md:pr-6 whitespace-nowrap;
}
table tr th:last-child {
  @apply pl-2.5 pr-4 md:pl-6 md:pr-5 whitespace-nowrap;
}
table tr td {
  @apply px-2.5 md:px-6 py-1.5 whitespace-nowrap text-gray-1200;
}
table tr td:first-child {
  @apply px-0 pr-2.5 md:pr-6 pb-2.5;
}
table tr td:second-child {
  @apply pb-0 pt-2;
}
table tr td:last-child {
  @apply pl-2.5 pr-4 md:pl-6 md:pr-5 py-2.5;
}
table tbody:last-child tr {
  vertical-align: top;
  height: var(--lastRowHeight);
}
table tbody:last-child tr td {
  @apply pb-3;
}
.toggle-checkbox {
  @apply w-4 h-4;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }
  &:checked + .toggle-label {
    @apply bg-white;
    transition: all 0.5s ease-in-out;
    background-color: #a22a2a;
  }
}
.action-icon {
  @apply pl-3 md:pl-5;
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
@media (max-width: 767px) {
  .emptyThWidth {
    min-width: 0px;
  }
  .min-w-502 {
    min-width: 270px;
  }
  .top-margin {
    margin-top: 4px;
  }
  // .toggle-checkbox {
  //   top: 1px;
  //   left: 1px;
  //   &:checked {
  //     left: 11px;
  //   }
  //   &:checked + .toggle-label {
  //   }
  // }
}

// @media (min-width: 768px) and (max-width: 1590px) {
@media (min-width: 768px) {
  .sticky-border:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    left: -1px;
    top: 0px;
    border-left: 1px solid gray;
  }
}
</style>