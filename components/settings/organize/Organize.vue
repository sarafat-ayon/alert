<template>
  <div class="card-wrapper md:px-2">
    <div
      id="resizeMeGroup"
      class="card relative transition-all duration-500 ease-in-out"
      :class="
        !expandCollapseFunctionality
          ? 'h-1/2'
          : formatSettingsExpand
          ? 'expnad-height'
          : 'collapse-height'
      "
    >
      <div
        class="card-header flex justify-center items-center px-4 cursor-pointer"
        @click="expandCollapse()"
      >
        <h3 class="card-title flex-grow pl-5">Groups</h3>
        <span
          v-if="expandCollapseFunctionality"
          class="select-toggle transition duration-500 transform"
          :class="formatSettingsExpand ? 'rotate-180' : 'rotate-0'"
        >
          <fa :icon="['fas', 'caret-down']" />
        </span>
      </div>
      <div class="card-body groups scroll">
        <div
          v-if="allAddedGroups.length <= 0"
          class="text-wrapper w-full h-full flex justify-center items-center"
        >
          <p
            class="
              text-center
              md:text-xl
              text-lg
              opacity-50
              text-ash-primary
              italic
            "
          >
            Your haven't grouped any feed yet.
          </p>
        </div>
        <table class="table-wrapper scroll min-w-full">
          <thead>
            <tr
              v-if="allAddedGroups.length > 0"
              class="bg-yellow-moreLight sticky top-0 z-1 border-b"
            >
              <th class="table-th break-all">
                <span>Name</span>
              </th>
            </tr>
          </thead>
          <tbody v-if="allAddedGroups.length > 0" class="body">
            <tr
              v-for="(groupItem, gIndex) in allAddedGroups"
              :key="gIndex + 'group-web'"
              :class="gIndex % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
            >
              <td class="flex items-center justify-start table-td action-icon">
                <a
                  v-if="user.userPermission !== 'User'"
                  data-title="Edit"
                  class="
                    w-7
                    h-7
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                  "
                  @click="editCreatedGroup(gIndex, groupItem.id, $event)"
                >
                  <div class="w-4 h-4 bg-yellow-midlight relative rounded-full">
                    <edit-icon></edit-icon>
                  </div>
                </a>
                <div
                  class="
                    text-ash-primary
                    ml-1
                    w-full
                    break-all
                    md:text-lg
                    text-md
                  "
                >
                  <span>{{ groupItem.groupName }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- cart footer-->
      <div
        v-if="user.userPermission !== 'User'"
        class="flex items-center justify-end my-4 px-4"
      >
        <button
          class="
            rounded-full
            border-2 border-yellow-midlight
            py-1
            lg:px-5
            px-3
            text-center text-white
            bg-yellow-midlight
            font-bold
            md:text-md
            text-md
          "
          @click="showCreateNewGroup($event)"
        >
          Create New Group
        </button>
      </div>
      <!-- cart footer-->
      <!-- <div id="resizeIcon" class="absolute pr-2 bottom-0 z-30 w-full text-right block" @mousedown="mouseDownHandler"
        @mouseup="mouseUpHandler" @touchstart="touchDownHandler" @touchend="touchUpHandler">
        <fa class="text-xl font-light text-yellow-primary" :icon="['fas', 'arrows-alt-v']" />
      </div> -->
    </div>

    <!-- Table Ungrouped -->
    <div
      id="resizeMeUnGroup"
      class="card transition-all duration-500 ease-in-out"
      :class="
        !expandCollapseFunctionality
          ? 'h-1/2'
          : activityLogExapand
          ? 'expnad-height'
          : 'collapse-height'
      "
    >
      <div
        class="card-header flex justify-center items-center px-4 cursor-pointer"
        @click="expandCollapse()"
      >
        <h3 class="text-white flex-grow pl-5 font-bold md:text-xl text-lg">
          Ungrouped
        </h3>
        <span
          v-if="expandCollapseFunctionality"
          class="select-toggle transition duration-500 transform"
          :class="activityLogExapand ? 'rotate-180' : 'rotate-0'"
        >
          <fa :icon="['fas', 'caret-down']" />
        </span>
      </div>
      <div class="card-body scroll">
        <table class="table-wrapper min-w-full">
          <!--start => table header section-->
          <thead>
            <tr class="bg-yellow-moreLight sticky top-0 z-1 border-b">
              <td class="table-th">
                <span>Source</span>
              </td>
              <td class="table-th">
                <span>Name</span>
              </td>
              <td class="table-th">
                <span>Username</span>
              </td>
            </tr>
          </thead>
          <!--end => table header section-->

          <!--start => table body section-->
          <tbody v-if="unselectedFeeds.length > 0" class="body">
            <tr
              v-for="(ungroupItem, ungIndex) in unselectedFeeds"
              :key="ungIndex + 'ungroup-web'"
              :class="ungIndex % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
            >
              <td class="table-td">
                <span
                  class="flex flex-row items-center"
                  @click="toggoleSubItems(ungIndex, ungroupItem.showAllYears)"
                >
                  <span class="md:pt-0 pt-0.5 text-lg text-gray-light">{{
                    ungroupItem.provider
                  }}</span>
                </span>
              </td>

              <td class="table-td break-all">
                <span class="name">{{ ungroupItem.name }}</span>
              </td>
              <td class="table-td">
                <span class="username">{{
                  ungroupItem.username | atSignUsername
                }}</span>
              </td>
            </tr>
          </tbody>

          <!--end => table body section-->
        </table>
        <div
          v-if="unselectedFeeds.length <= 0"
          class="
            w-full
            h-full
            flex
            justify-center
            items-center
            text-gray-600
            md:text-xl
            text-md
            font-semibold
            inner-body-height
          "
        >
          No feeds available
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import EditIcon from '~/components/shared/icon/EditIcon.vue'
import { GROUPS, AVAILABLE_FEEDS } from '~/constants/urls'

export default defineComponent({
  name: 'Organize',
  components: {
    EditIcon,
  },
  props: {
    allAddedGroup: {
      type: Object,
      default: null,
    },
    groupUpdate: {
      type: Object,
      default: null,
    },
    selectedGroupId: {
      type: Number,
      default: null,
    },
    groundedFeed: {
      type: Object,
      default: null,
    },
    clearField: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const bodyHeight = ref(0)
    const expandCollapseFunctionality = ref(true)
    const formatSettingsExpand = ref(true)
    const activityLogExapand = ref(false)
    const expandCollapse = () => {
      formatSettingsExpand.value = !formatSettingsExpand.value
      activityLogExapand.value = !activityLogExapand.value
    }
    return {
      formatSettingsExpand,
      activityLogExapand,
      expandCollapse,
      bodyHeight,
      expandCollapseFunctionality,
    }
  },
  data() {
    return {
      ungroupedList: [],
      allAddedGroups: [],
      yAxisPart1: 0,
      yAxisPart2: 0,
      hPart1: 0,
      hPart2: 0,
      initialOrganizeUpperHeight: '',
      initialOrganizeLowerHeight: '',
    }
  },
  computed: {
    ...mapState('setting', ['currentComponent']),
    unselectedFeeds() {
      // eslint-disable-next-line array-callback-return
      return this.ungroupedList.filter((item) => {
        if (!item.selected) {
          return item
        }
      })
    },
    user() {
      return this.$auth.user
    },
  },
  watch: {
    allAddedGroup(data) {
      this.allAddedGroups.unshift(data)
    },
    groupUpdate(data) {
      if (data) {
        this.allAddedGroups = this.allAddedGroups.map((item) => {
          if (Number(item.id) === Number(data.id)) {
            return (item = data)
          }
          return item
        })
      }
    },
    groundedFeed(data) {
      if (this.ungroupedList.length === 0) {
        this.ungroupedList.push(data.item1)
      } else if (this.ungroupedList.length > 0) {
        this.ungroupedList.push(data.item1)
      } else {
        this.ungroupedList.map((item) => {
          if (Number(item.id) === Number(data.item1.id)) {
            item.selected = data.item1.selected
          }
          // else if (Number(item.id) !== Number(data.item1.id)) {
          //   this.ungroupedList.push(data.item1)
          // }
          return item
        })
      }
      this.ungroupedList = [
        ...new Map(this.ungroupedList.map((item) => [item.id, item])).values(),
      ]
    },
    clearField(data) {
      if (data) {
        // setTimeout(() => {
        this.getUngroupedListAll()
        // }, 100)
      }
    },
    selectedGroupId(data) {
      if (data) {
        this.allAddedGroups = this.allAddedGroups.filter((item) => {
          return item.id !== data
        })
      }
    },
  },
  mounted() {
    this.resizeWindow()
    window.addEventListener('resize', this.resizeWindow)
    const upperPart = document.getElementById('resizeMeGroup')
    const lowerPart = document.getElementById('resizeMeUnGroup')
    setTimeout(() => {
      this.initialOrganizeUpperHeight = upperPart.offsetHeight + 10
      this.initialOrganizeLowerHeight = lowerPart.offsetHeight + 10
    }, 500)

    if (this.currentComponent === 'Organize') {
      this.getUngroupedListAll()
      this.getCreatedGroup()
    }
  },
  destroyed() {
    setTimeout(() => {
      window.removeEventListener('resize', this.resizeWindow)
    }, 2000)
  },
  methods: {
    // Horizontal Draggable Functionality Start
    mouseDownHandler(e) {
      e.preventDefault()
      const upperPart = document.getElementById('resizeMeGroup')
      const lowerPart = document.getElementById('resizeMeUnGroup')
      // Get the current mouse position
      this.yAxisPart1 = e.clientY
      this.yAxisPart2 = e.clientY

      // Calculate the dimension of element
      const StylesPart1 = window.getComputedStyle(upperPart)
      this.hPart1 = parseInt(StylesPart1.height, 10)

      const StylesPart2 = window.getComputedStyle(lowerPart)
      this.hPart2 = parseInt(StylesPart2.height, 10)

      // Attach the listeners to `document`
      document.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseMoveHandler(e) {
      const upperPart = document.getElementById('resizeMeGroup')
      const lowerPart = document.getElementById('resizeMeUnGroup')
      // How far the mouse has been moved
      const dy1 = e.clientY - this.yAxisPart1
      const dy2 = e.clientY + this.yAxisPart2
      const expectedHight = window.innerHeight - 240
      // Adjust the dimension of element
      if (this.hPart1 + dy1 < 72) {
        upperPart.style.height = `${72}px`
      } else if (expectedHight < this.hPart1 + dy1) {
        upperPart.style.height = `${expectedHight}px`
      } else {
        upperPart.style.height = `${this.hPart1 + dy1}px`
      }
      if (this.hPart2 + dy2 < 72) {
        lowerPart.style.height = `${72}px`
      } else {
        const upperPartHeight = upperPart.style.height.slice(0, -2)
        const totalHeight =
          this.initialOrganizeUpperHeight + this.initialOrganizeLowerHeight - 20
        lowerPart.style.height = `${totalHeight - upperPartHeight}px`
      }
    },
    mouseUpHandler() {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
      const upperPart = document.getElementById('resizeMeGroup')
      const lowerPart = document.getElementById('resizeMeUnGroup')
      const upperPartHeight = upperPart.style.height.slice(0, -2)
      const resizedHeight = this.initialOrganizeUpperHeight - upperPartHeight
      lowerPart.style.height = `${
        Number(this.initialOrganizeLowerHeight) + Number(resizedHeight) - 20
      }px`
    },
    touchDownHandler(e) {
      e.preventDefault()
      const upperPart = document.getElementById('resizeMeGroup')
      const lowerPart = document.getElementById('resizeMeUnGroup')
      // Get the current mouse position
      this.yAxisPart1 = e.targetTouches[0]
        ? e.targetTouches[0].pageY
        : e.changedTouches[e.changedTouches.length - 1].pageY // e.clientY
      this.yAxisPart2 = e.targetTouches[0]
        ? e.targetTouches[0].pageY
        : e.changedTouches[e.changedTouches.length - 1].pageY // e.clientY

      // Calculate the dimension of element
      const StylesPart1 = window.getComputedStyle(upperPart)
      this.hPart1 = parseInt(StylesPart1.height, 10)

      const StylesPart2 = window.getComputedStyle(lowerPart)
      this.hPart2 = parseInt(StylesPart2.height, 10)

      // Attach the listeners to `document`
      document.addEventListener('touchmove', this.touchMoveHandler)
      document.addEventListener('touchend', this.touchUpHandler)
    },
    touchMoveHandler(e) {
      const upperPart = document.getElementById('resizeMeGroup')
      const lowerPart = document.getElementById('resizeMeUnGroup')
      // How far the mouse has been moved
      const dy1 =
        (e.targetTouches[0]
          ? e.targetTouches[0].pageY
          : e.changedTouches[e.changedTouches.length - 1].pageY) -
        this.yAxisPart1
      const dy2 =
        (e.targetTouches[0]
          ? e.targetTouches[0].pageY
          : e.changedTouches[e.changedTouches.length - 1].pageY) +
        this.yAxisPart2

      const expectedHight = window.innerHeight - 240
      // Adjust the dimension of element
      if (this.hPart1 + dy1 < 72) {
        upperPart.style.height = `${72}px`
      } else if (expectedHight < this.hPart1 + dy1) {
        upperPart.style.height = `${expectedHight}px`
      } else {
        upperPart.style.height = `${this.hPart1 + dy1}px`
      }

      if (this.hPart2 + dy2 < 72) {
        lowerPart.style.height = `${72}px`
      } else {
        const upperPartHeight = upperPart.style.height.slice(0, -2)
        const totalHeight =
          this.initialOrganizeUpperHeight + this.initialOrganizeLowerHeight - 20
        lowerPart.style.height = `${totalHeight - upperPartHeight}px`
      }
    },
    touchUpHandler() {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('touchmove', this.touchMoveHandler)
      document.removeEventListener('touchend', this.touchUpHandler)

      const upperPart = document.getElementById('resizeMeGroup')
      const lowerPart = document.getElementById('resizeMeUnGroup')
      const upperPartHeight = upperPart.style.height.slice(0, -2)
      const resizedHeight = this.initialOrganizeUpperHeight - upperPartHeight

      lowerPart.style.height = `${
        Number(this.initialOrganizeLowerHeight) + Number(resizedHeight) - 20
      }px`
    },
    resizeWindow() {
      this.bodyHeight = window.innerHeight
      if (this.bodyHeight > 841) {
        this.expandCollapseFunctionality = false
      } else {
        this.expandCollapseFunctionality = true
      }
      // const upperPart = document.getElementById('resizeMeGroup')
      // const lowerPart = document.getElementById('resizeMeUnGroup')
      // const newWidth = window.innerWidth
      // if (newWidth >= 1440) {
      //   upperPart.style.height = `100%`
      //   lowerPart.style.height = `100%`
      // } else if (newWidth < 1440) {
      //   upperPart.style.height = `25%`
      //   lowerPart.style.height = `25%`
      // }
    },
    // Horizontal Draggable Functionality End

    showCreateNewGroup($event) {
      this.$store.commit('setting/SET_SHOW_CREATE_GROUP', true)
      this.$emit('show-create-group')
      $event.stopPropagation()
    },
    addNewUser() {
      this.$emit('showProfileSideBar', true)
    },
    toggoleSubItems(index, showAllYears) {
      showAllYears = !showAllYears
      this.ungroupedList[index].showAllYears = showAllYears
    },
    async getCreatedGroup() {
      try {
        const response = await this.$axios.$get(GROUPS)
        if (response.success) {
          this.allAddedGroups = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUngroupedListAll() {
      try {
        const response = await this.$axios.$get(AVAILABLE_FEEDS)
        if (response.success) {
          response.data.forEach((item) => {
            item.selected = false
          })
          this.ungroupedList = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    editCreatedGroup(index, id, $event) {
      this.$emit('show-edit-group', this.allAddedGroups[index], Number(id))
      this.$store.commit('setting/SET_SHOW_EDIT_GROUP', true)
      $event.stopPropagation()
    },
  },
})
</script>

<style lang="scss" scoped>
#resizeIcon {
  cursor: row-resize;
}
.select-toggle {
  color: #ffffff;
  svg {
    @apply md:text-3xl text-2xl;
  }
}
.expnad-height {
  height: calc(100% - 66px);
}
.collapse-height {
  height: 46px;
}
.card-wrapper {
  @apply flex flex-col overflow-y-auto scroll md:pt-4 relative md:space-y-5 space-y-2 h-full;
  // min-height: 900px;
}
.card {
  @apply bg-white rounded-3xl overflow-hidden flex flex-col;
}
.card-header {
  @apply bg-yellow-midlight text-center py-2;
}
.card-title {
  @apply md:text-white text-offwhite-200 font-bold md:text-xl text-lg;
}
.card-body {
  @apply overflow-auto scroll bg-white rounded-b-2xl md:pb-4 md:px-0 px-0 h-full;
}
.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 md:font-bold md:text-gray-1200 text-yellow-midlight text-left md:text-lg text-md pr-10 whitespace-nowrap;
}

.table-td {
  @apply md:px-6 px-6 md:py-2 py-1.5 text-left whitespace-nowrap text-gray-light xl:text-xl md:text-lg text-md;
}

.action-icon {
  @apply pl-5;
}

.scroll {
  scrollbar-color: #e0ad1f #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #e0ad1f;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e0ad1f;
  }
}
.min-width-10 {
  min-width: 10rem;
}
.min-width-14 {
  min-width: 14rem;
}
.min-width-16 {
  min-width: 16rem;
}
.min-width-26 {
  min-width: 65rem;
}
.min-width-9 {
  min-width: 9rem;
}
.min-width-20 {
  min-width: 19rem;
}
.inner-body-height {
  height: calc(100% - 44px);
}
[data-title]:after {
  color: #bb8b28;
  left: 100%;
}
.tooltip {
  @apply absolute 
  text-white 
  bg-yellow-midlight 
  z-100 
  left-0 
  -top-5 
  text-left
  invisible 
  md:p-1.5 
  p-0.5 
  md:px-4 
  px-2 
  text-sm 
  rounded-xl 
  shadow-lg;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.name {
  display: block;
}
.username {
  display: block;
}
.tab-name {
  display: none;
}
.tab-username {
  display: none;
}
.mobile-name {
  display: none;
}
.mobile-username {
  display: none;
}
@media (min-height: 470px) and (max-height: 750px) {
  .card-wrapper {
    // min-height: 900px;
  }
}
@media (min-width: 320px) and (max-width: 767px) {
  .expnad-height {
    height: calc(100% - 62px);
  }
  .collapse-height {
    height: 42px;
  }
  .card-wrapper {
    // min-height: 700px;
    .groups {
      height: calc(100% - 52px);
    }
  }
  .min-width-26 {
    min-width: 42rem;
  }
  .min-width-20 {
    min-width: 14rem;
  }
  .name {
    display: block;
  }
  .username {
    display: block;
  }
  .tab-name {
    display: block;
  }
  .tab-username {
    display: block;
  }
  .mobile-name {
    display: none;
  }
  .mobile-username {
    display: none;
  }
}
@media (max-width: 425px) {
  .min-width-26 {
    min-width: 39rem;
  }
  .min-width-20 {
    min-width: 12rem;
  }
  .name {
    display: block;
  }
  .username {
    display: block;
  }
  .tab-name {
    display: none;
  }
  .tab-username {
    display: none;
  }
  .mobile-name {
    display: block;
  }
  .mobile-username {
    display: block;
  }
  .inner-body-height {
    height: calc(100% - 40px);
  }
}
</style>