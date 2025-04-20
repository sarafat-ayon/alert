<template>
  <section class="h-full w-full">
    <!-- Medium & Desktop -->
    <div
      v-if="isMedium"
      class="grid auto-rows-fr grid-cols-12 gap-4 upper-height"
    >
      <div
        class="
          h-full
          overflow-hidden
          rounded-2xl
          transition-all
          duration-500
          ease-in-out
          md:col-span-12
          alertXl:col-span-7
          alertBigScreen:col-span-6
        "
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl">
          <div
            class="
              w-full
              py-1.5
              bg-red-deep
              rounded-t-2xl
              text-white text-center text-xl
            "
          >
            Users
          </div>
          <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
            <UsersSettings class="overflow-auto scroll" />
          </div>
        </div>
      </div>
      <!-- For Desktop -->
      <div
        v-if="isLargeDesktop"
        class="h-full overflow-hidden rounded-2xl alertBigScreen:col-span-3"
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl">
          <div
            class="
              w-full
              py-1.5
              bg-red-deep
              rounded-t-2xl
              text-white text-center text-xl
              px-6
            "
          >
            <span>Alert System Settings</span>
          </div>
          <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
            <SystemSetting class="overflow-auto scroll" />
          </div>
        </div>
      </div>

      <div
        v-if="isLargeDesktop"
        class="h-full overflow-hidden rounded-2xl alertBigScreen:col-span-3"
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl">
          <div
            class="
              w-full
              py-1.5
              bg-red-deep
              rounded-t-2xl
              text-white text-center text-xl
              px-6
            "
          >
            <span>Disclaimer Exclusion</span>
          </div>
          <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
            <DisclaimerExclusion class="overflow-auto scroll" />
          </div>
        </div>
      </div>
      <!-- For Medium -->
      <div
        v-if="!isLargeDesktop"
        class="
          h-full
          overflow-hidden
          rounded-2xl
          md:col-span-12
          alertXl:col-span-5
        "
      >
        <div class="h-full flex flex-col flex-grow rounded-2xl bg-white">
          <div
            class="
              flex flex-row flex-grow
              h-10
              rounded-t-2xl
            "
          >
            <div
              class="
                w-full
                py-1.5
                rounded-tl-2xl
                text-center text-xl
                md:px-4
                lg:px-6
              "
              :class="
                activeTab === 'SystemSetting'
                  ? 'bg-white text-red-deep cursor-default font-bold'
                  : 'bg-red-deep text-white cursor-pointer'
              "
              @click="setTab('SystemSetting')"
            >
              <span>Alert System Settings</span>
            </div>

            <div
              class="
                w-full
                py-1.5
                rounded-tr-2xl
                text-center text-xl
                md:px-4
                lg:px-6
              "
              :class="
                activeTab === 'DisclaimerExclusion'
                  ? 'bg-white text-red-deep cursor-default font-bold'
                  : 'bg-red-deep text-white cursor-pointer'
              "
              @click="setTab('DisclaimerExclusion')"
            >
              <span>Disclaimer Exclusion</span>
            </div>
          </div>
          <div
            class="
              w-full
              inner-body
              flex-grow
              bg-white
              rounded-b-2xl
              flex flex-col
              overflow-auto
              scroll
            "
          >
            <transition name="dynamicComp" mode="out-in">
              <component :is="activeTab" />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- For Mobile -->
    <div
      v-if="!isMedium"
      class="h-full w-full overflow-hidden rounded-2xl border border-red-deep"
    >
      <div class="flex flex-col rounded-t-2xl">
        <div
          class="
            w-full
            h-10.1
            flex
            items-center
            justify-center
            rounded-t-2xl
            text-sm
            font-bold
          "
          :class="
            settingsTab === 'UsersSettings'
              ? 'bg-white text-red-deep cursor-default'
              : 'bg-red-deep text-white cursor-pointer'
          "
          @click="changeTab('UsersSettings')"
        >
          Users
        </div>
        <div class="flex flex-row flex-grow h-10.1 border-b border-red-deep">
          <div
            class="
              w-full
              flex
              justify-around
              items-center
              text-sm
              font-bold
              px-1
            "
            :class="
              settingsTab === 'SystemSetting'
                ? 'bg-white text-red-deep cursor-default'
                : 'bg-red-deep text-white cursor-pointer'
            "
            @click="changeTab('SystemSetting')"
          >
            <span>Alert System Settings</span>
          </div>

          <div
            class="
              w-full
              flex
              justify-around
              items-center
              text-sm
              font-bold
              px-1
            "
            :class="
              settingsTab === 'DisclaimerExclusion'
                ? 'bg-white text-red-deep cursor-default'
                : 'bg-red-deep text-white cursor-pointer'
            "
            @click="changeTab('DisclaimerExclusion')"
          >
            <span>Disclaimer Exclusion</span>
          </div>
        </div>
      </div>

      <div class="w-full mobile-inner-body flex-grow bg-white rounded-b-2xl">
        <div class="overflow-auto scroll h-full flex flex-col">
          <transition name="dynamicComp" mode="out-in">
            <component :is="settingsTab" />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAlert } from '~/stores/alert'
import UsersSettings from '~/components/alert/dynamic-component/UsersSettings.vue'
import SystemSetting from '~/components/alert/dynamic-component/SystemSetting.vue'
import DisclaimerExclusion from '~/components/alert/dynamic-component/DisclaimerExclusion.vue'

export default defineComponent({
  components: {
    // SlidingBar,
    // SlidingBarWithProgress,
    // SelectInput,
    // BellIcon,
    // DragAndDropIcon,
    // SeveritySlidingBar,
    // MultiRangeSlidingBar,
    // draggable,
    UsersSettings,
    SystemSetting,
    DisclaimerExclusion,
  },
  setup() {
    const store = useAlert()
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    const breakpoints = useBreakpoints({
      largeDesktop: 1920,
    })

    const members = [
      { id: 0, text: 'Admin', value: 'Admin' },
      { id: 1, text: 'Reviewer', value: 'Reviewer' },
      { id: 2, text: 'Read Only', value: 'Read Only' },
    ]
    const member = ref('Admin')
    // const SALibraries = [
    //   {
    //     id: 1,
    //     label: 'email',
    //     text: 'Confidential Email',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 2,
    //     label: 'offers',
    //     text: 'Compare Offers',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 3,
    //     label: 'message',
    //     text: 'Message by Mistake',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 4,
    //     label: 'groups',
    //     text: 'Industry Groups',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 5,
    //     label: 'copyright',
    //     text: 'Copyright',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 6,
    //     label: 'opinions',
    //     text: 'Views and Opinions',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 7,
    //     label: 'industries',
    //     text: 'Industries (FDIC, SIPC, SEC, RIA)',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 8,
    //     label: 'contact',
    //     text: 'Legally Binding Contact',
    //     selected: ref(false),
    //   },
    // ]

    // const SAExclusions = [
    //   {
    //     id: 1,
    //     label: 'fargo',
    //     text: 'Wells Fargo',
    //     selected: ref(false),
    //   },
    //   {
    //     id: 2,
    //     label: 'disclosure',
    //     text: 'Internal Disclosure',
    //     selected: ref(false),
    //   },
    // ]

    // const SAReviewServices = [
    //   {
    //     id: 1,
    //     text: 'Average Cost Per Flag',
    //     amount: '$3.21',
    //   },
    //   {
    //     id: 2,
    //     text: 'Additional Monthly Cost',
    //     amount: '$421.74',
    //   },
    //   {
    //     id: 3,
    //     text: 'Average Response Time',
    //     amount: '00.12',
    //   },
    //   {
    //     id: 4,
    //     text: 'Accuracy',
    //     amount: '96%',
    //   },
    // ]

    // Medium
    const activeTab = ref('SystemSetting')
    const setTab = (tab) => {
      activeTab.value = tab
    }
    // Mobile
    const settingsTab = ref('UsersSettings')
    function changeTab(tab) {
      settingsTab.value = tab
    }

    return {
      store,
      members,
      member,
      isLargeDesktop: breakpoints.greater('largeDesktop'),
      isMedium: tailwindBreakpoints.greater('md'),
      activeTab,
      setTab,
      settingsTab,
      changeTab,
    }
  },
  data() {
    return {
      drag: false,
      AdminPanel: [
        {
          id: 1,
          name: 'Jane Smith',
          designation: 'Admin',
          fixed: false,
          selected: true,
        },
      ],
      teamOnePanel: [
        {
          id: 1,
          name: 'Suzanne Burns',
          designation: 'Admin',
          fixed: false,
          selected: false,
        },
        {
          id: 2,
          name: 'George Jones',
          designation: 'Reviewer',
          fixed: false,
          selected: true,
        },
        {
          id: 3,
          name: 'Jane Smith',
          designation: 'Read Only',
          fixed: false,
          selected: false,
        },
      ],
      teamTwoPanel: [
        {
          id: 1,
          name: 'Jim Jones',
          designation: 'Reviewer',
          fixed: false,
          selected: false,
        },
        {
          id: 2,
          name: 'Terry Thompson',
          designation: 'Reviewer',
          fixed: false,
          selected: false,
        },
      ],
      ExcludeUserPanel: [
        {
          id: 1,
          name: 'Elizabeth Fonze',
          designation: 'Reviewer',
          fixed: false,
          selected: false,
        },
      ],
    }
  },
})
</script>


<style lang="scss" scoped>
.min-w-340 {
  min-width: 340px;
  // max-width: 340px;
}

.w-70 {
  width: 70%;
}

.min-w {
  &-40 {
    min-width: 40px;
  }
}

.upper-height {
  height: calc(100% - 10px);
}

.inner-body {
  height: calc(100% - 40px);
}

@media (max-width: 1365px) {
  .height {
    height: 32.25rem;
    // height: 100%;
  }
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

/* for dynamic Components */
.dynamicComp-enter-active,
.dynamicComp-leave-active {
  transition: opacity 0.5s;
}

.dynamicComp-enter,
.dynamicComp-leave-to {
  opacity: 0;
}

.mobile-inner-body {
  height: calc(100% - 84px);
}

.mobile-inner-height {
  height: calc(100% - 80px);
}
</style>
