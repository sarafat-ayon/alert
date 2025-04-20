<template>
  <div class="px-5 pb-3 h-full flex flex-col space-y-2 w-full">
    <div class="flex justify-between items-center pt-3 pb-2">
      <p class="text-base md:text-xl leading-6 text-gray-600">Admin</p>
      <p class="text-base md:text-xl leading-6 text-gray-600">Auto Escalate</p>
    </div>

    <!-- Admin Panel-->
    <draggable
      v-model="AdminPanel"
      group="admin"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        v-for="(user, index) in AdminPanel"
        :key="user.id"
        class="mb-4 md:mb-2.5"
      >
        <div class="grid grid-cols-12 gap-x-4 gap-y-4 items-center">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <div
              class="flex justify-between items-center bg-red-deep h-9.5 md:h-9 rounded-3xl pr-3 pl-5"
            >
              <input
                type="text"
                class="bid-none outline-none bg-red-deep placeholder-style placeholder-white"
                :placeholder="user.name"
                readonly
              />
              <div class="handle">
                <DragAndDropIcon></DragAndDropIcon>
              </div>
            </div>
          </div>
          <div class="col-span-9 md:col-span-4">
            <div class="w-full flex">
              <div class="flex w-full items-center space-x-4">
                <div class="target-input w-full">
                  <select-input
                    v-model="user.designation"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                    :options="members"
                    :place-holder="user.designation"
                    place-holder-class="placeholder-dynamic-color placeholder-opacity-100"
                    :place-holder-disabled="true"
                    color="#fff"
                    background="#A22A2A"
                    caret-bg="#A22A2A"
                    scroll-color="#9e7912"
                  ></select-input>
                </div>
                <div>
                  <bell-icon></bell-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 lg:col-span-3">
            <div class="flex justify-end">
              <div
                class="relative inline-block w-9 align-middle select-none transition-all duration-800 ease-in-out"
              >
                <input
                  :id="`Admin${user.id}`"
                  v-model="user.selected"
                  type="checkbox"
                  name="toggle"
                  checked
                  class="toggle-checkbox absolute block rounded-full bg-red-deep appearance-none cursor-pointer"
                />
                <label
                  :for="`Admin${user.id}`"
                  class="toggle-label checkbox-label block overflow-hidden h-5 rounded-full transition-all duration-800 ease-in-out bg-ash-default cursor-pointer"
                ></label>
              </div>
            </div>
          </div>

          <!-- Sliding bar -->
          <transition name="fadeIn">
            <div
              v-if="user.selected"
              class="col-span-12 pt-0 md:pt-2"
              :class="index === AdminPanel.length - 1 ? '' : 'pb-3.5'"
            >
              <sliding-bar-with-progress
                :bar-id="'admin'"
              ></sliding-bar-with-progress>
            </div>
          </transition>
        </div>
      </div>
    </draggable>

    <!-- Team 1 -->
    <div class="pb-2">
      <p class="text-base md:text-xl leading-6 text-gray-600 mt-2">Team 1</p>
    </div>

    <draggable
      v-model="teamOnePanel"
      group="team-one"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
      @change="changePosition()"
    >
      <div
        v-for="(user, index) in teamOnePanel"
        :key="user.id"
        class="mb-4 md:mb-2.5"
      >
        <div class="grid grid-cols-12 gap-x-4 gap-y-4 items-center">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <div
              class="flex justify-between items-center bg-red-deep h-9.5 md:h-9 rounded-3xl pr-3 pl-5"
            >
              <input
                type="text"
                class="bid-none outline-none bg-red-deep placeholder-style placeholder-white"
                :placeholder="user.name"
                readonly
              />
              <div class="handle">
                <DragAndDropIcon></DragAndDropIcon>
              </div>
            </div>
          </div>
          <div class="col-span-9 md:col-span-4">
            <div class="w-full flex">
              <div class="flex w-full items-center space-x-4">
                <div class="target-input w-full">
                  <select-input
                    v-model="user.designation"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                    :options="members"
                    :place-holder="user.designation"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#A22A2A"
                    caret-bg="#A22A2A"
                    scroll-color="#9e7912"
                  ></select-input>
                </div>
                <div>
                  <bell-icon></bell-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 lg:col-span-3">
            <div class="flex justify-end">
              <div
                class="relative inline-block w-9 align-middle select-none transition-all duration-800 ease-in-out"
              >
                <input
                  :id="`Team1${user.id}`"
                  v-model="user.selected"
                  type="checkbox"
                  checked
                  name="toggle"
                  class="toggle-checkbox absolute block rounded-full bg-red-deep appearance-none cursor-pointer"
                />
                <label
                  :for="`Team1${user.id}`"
                  class="toggle-label checkbox-label block overflow-hidden h-5 rounded-full transition-all duration-800 ease-in-out bg-ash-default cursor-pointer"
                ></label>
              </div>
            </div>
          </div>

          <!-- Sliding bar -->
          <transition name="fadeIn">
            <div
              v-if="user.selected"
              class="col-span-12 pt-0 md:pt-2"
              :class="index === teamOnePanel.length - 1 ? '' : 'pb-3.5'"
            >
              <multi-range-sliding-bar
                :bar-id="`Team1${user.id}`"
                :slider-index="index"
              ></multi-range-sliding-bar>
            </div>
          </transition>
        </div>
      </div>
    </draggable>

    <!-- Team 2 -->
    <div class="pb-2">
      <p class="text-base md:text-xl leading-6 text-gray-600 mt-2">Team 2</p>
    </div>

    <draggable
      v-model="teamTwoPanel"
      group="team-two"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        v-for="(user, index) in teamTwoPanel"
        :key="user.id"
        class="mb-4 md:mb-2.5"
      >
        <div class="grid grid-cols-12 gap-x-4 gap-y-4 items-center">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <div
              class="flex justify-between items-center bg-red-deep h-9.5 md:h-9 rounded-3xl pr-3 pl-5"
            >
              <input
                type="text"
                class="bid-none outline-none bg-red-deep placeholder-style placeholder-white"
                :placeholder="user.name"
                readonly
              />
              <div class="handle">
                <DragAndDropIcon></DragAndDropIcon>
              </div>
            </div>
          </div>
          <div class="col-span-9 md:col-span-4">
            <div class="w-full flex">
              <div class="flex w-full items-center space-x-4">
                <div class="target-input w-full">
                  <select-input
                    v-model="user.designation"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                    :options="members"
                    :place-holder="user.designation"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#A22A2A"
                    caret-bg="#A22A2A"
                    scroll-color="#9e7912"
                  ></select-input>
                </div>
                <div>
                  <bell-icon></bell-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 lg:col-span-3">
            <div class="flex justify-end">
              <div
                class="relative inline-block w-9 align-middle select-none transition-all duration-800 ease-in-out"
              >
                <input
                  :id="`Team2${user.id}`"
                  v-model="user.selected"
                  type="checkbox"
                  checked
                  name="toggle"
                  class="toggle-checkbox absolute block rounded-full bg-red-deep appearance-none cursor-pointer"
                />
                <label
                  :for="`Team2${user.id}`"
                  class="toggle-label checkbox-label block overflow-hidden h-5 rounded-full transition-all duration-800 ease-in-out bg-ash-default cursor-pointer"
                ></label>
              </div>
            </div>
          </div>

          <!-- Sliding bar -->
          <transition name="fadeIn">
            <div
              v-if="user.selected"
              class="col-span-12 pt-0 md:pt-2"
              :class="index === teamTwoPanel.length - 1 ? '' : 'pb-3.5'"
            >
              <multi-range-sliding-bar
                :bar-id="`Team2${user.id}`"
              ></multi-range-sliding-bar>
            </div>
          </transition>
        </div>
      </div>
    </draggable>

    <!-- Exclude User -->
    <div class="pb-2">
      <p class="text-base md:text-xl leading-6 text-gray-600 mt-2">
        Exclude User
      </p>
    </div>
    <draggable
      v-model="ExcludeUserPanel"
      group="exclude-user"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        v-for="(user, index) in ExcludeUserPanel"
        :key="user.id"
        class="mb-4 md:mb-2.5"
      >
        <div class="grid grid-cols-12 gap-x-4 gap-y-4 items-center">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <div
              class="flex justify-between items-center bg-red-deep h-9.5 md:h-9 rounded-3xl pr-3 pl-5"
            >
              <input
                type="text"
                class="bid-none outline-none bg-red-deep placeholder-style placeholder-white"
                :placeholder="user.name"
                readonly
              />
              <div class="handle">
                <DragAndDropIcon></DragAndDropIcon>
              </div>
            </div>
          </div>
          <div class="col-span-9 md:col-span-4">
            <div class="w-full flex">
              <div class="flex w-full items-center space-x-4">
                <div class="target-input w-full">
                  <select-input
                    v-model="user.designation"
                    class-style-name="searchPageScrollStyle searchPageScrollWidth target-select-input"
                    :options="members"
                    :place-holder="user.designation"
                    :place-holder-disabled="true"
                    color="#F8F8F8"
                    background="#A22A2A"
                    caret-bg="#A22A2A"
                    scroll-color="#9e7912"
                  ></select-input>
                </div>
                <div>
                  <bell-icon></bell-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-3 md:col-span-2 lg:col-span-3">
            <div class="flex justify-end">
              <div
                class="relative inline-block w-9 align-middle select-none transition-all duration-800 ease-in-out"
              >
                <input
                  :id="`Exclude User${user.id}`"
                  v-model="user.selected"
                  type="checkbox"
                  checked
                  name="toggle"
                  class="toggle-checkbox absolute block rounded-full bg-red-deep appearance-none cursor-pointer"
                />
                <label
                  :for="`Exclude User${user.id}`"
                  class="toggle-label checkbox-label block overflow-hidden h-5 rounded-full transition-all duration-800 ease-in-out bg-ash-default cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
          <!-- Sliding bar -->
          <transition name="fadeIn">
            <div
              v-if="user.selected"
              class="col-span-12 pt-0 md:pt-2"
              :class="index === ExcludeUserPanel.length - 1 ? '' : 'pb-3.5'"
            >
              <multi-range-sliding-bar
                :bar-id="`Exclude User${user.id}`"
              ></multi-range-sliding-bar>
            </div>
          </transition>
        </div>
      </div>
    </draggable>

    <!-- Buttons -->
    <div
      class="flex justify-center md:justify-end flex-grow items-end pt-10 pb-4 md:pb-1"
    >
      <button
        class="mr-5 px-7 h-9 flex items-center bg-red-deep rounded-3xl text-white font-bolder"
        @click="store.backToCurrentComp(previousCurrentComp[0])"
      >
        Add Team
      </button>
      <button
        class="px-7 h-9 flex items-center bg-red-deep rounded-3xl text-white font-bolder"
        @click="store.backToCurrentComp(previousCurrentComp[0])"
      >
        Add New User
      </button>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import draggable from 'vuedraggable'
import { useAlert } from '~/stores/alert'
// import SlidingBar from '~/components/alert/SlidingBar.vue'
import SlidingBarWithProgress from '~/components/alert/sliding-bar/SlidingBarWithProgress.vue'
// import SeveritySlidingBar from '~/components/alert/SeveritySlidingBar.vue'
import MultiRangeSlidingBar from '~/components/alert/sliding-bar/MultiRangeSlidingBar.vue'
import SelectInput from '~/components/inputs/SelectInput'
import BellIcon from '~/components/shared/icon/BellIcon.vue'
import DragAndDropIcon from '~/components/shared/icon/DragAndDropIcon.vue'

export default defineComponent({
  components: {
    // SlidingBar,
    SlidingBarWithProgress,
    SelectInput,
    BellIcon,
    DragAndDropIcon,
    // SeveritySlidingBar,
    MultiRangeSlidingBar,
    draggable,
  },
  setup() {
    const store = useAlert()

    const { previousCurrentComp } = storeToRefs(store)
    const { setPositionChange } = store

    const members = [
      { id: 0, text: 'Admin', value: 'Admin' },
      { id: 1, text: 'Reviewer', value: 'Reviewer' },
      { id: 2, text: 'Read Only', value: 'Read Only' },
    ]
    const member = ref('Admin')

    const changePosition = () =>{
      setPositionChange(true)
    }

    return {
      store,
      members,
      member,
      previousCurrentComp,
      changePosition,
      setPositionChange
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
  watch:{
    teamOnePanel(data){
      console.log(data);
    }
  }
})
</script>

<style lang="scss" scoped>
.placeholder-dynamic-color::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(228, 128, 29, var(--color));
}
.handle {
  cursor: move;
}

.min-w-340 {
  min-width: 340px;
  // max-width: 340px;
}

.placeholder-style::-webkit-input-placeholder {
  font-weight: bolder;
}
.w-70 {
  width: 70%;
}

.min-w {
  &-40 {
    min-width: 40px;
  }
}

.target-input {
  width: full;
  height: 36px;
}

.toggle-checkbox {
  width: 16px;
  min-width: 16px;
  height: 16px;
  // bid: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  &.toggle.label {
    min-width: 36px !important;
  }
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
    min-width: 36px;
  }
}
.checkbox-label {
  min-width: 36px !important;
}

.in-out-checkbox {
  transition: all 0.5s ease-in-out;
  &:checked + .toggle-label {
    @apply bg-red-deep text-white;
    transition: all 0.5s ease-in-out;
  }
}

.toggle-check-1 {
  &:checked {
    @apply bg-white;
  }
  &:checked + .check-1 {
    @apply text-red-deep opacity-100;
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
