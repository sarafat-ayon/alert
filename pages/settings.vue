<template>
  <section class="h-full">
    <transition name="page">
      <div
        v-if="isDesktop"
        class="md:block hidden py-4 px-2 h-full"
        @click="closeSidebar"
      >
        <div
          class="content flex flex-col transition-all duration-2000"
          :class="[showHomeContent ? 'opacity-0' : '']"
        >
          <div
            class="
              flex
              lg:flex-row
              flex-col
              lg:justify-between lg:items-center
              px-2
              lg:space-x-4
            "
          >
            <div class="w-64 main_dropdown">
              <ArchiveSourcesDropdown
                :active="false"
                :height="100"
                :source="'settings'"
                @expand="showSkew($event)"
                @show-edit-feed="showEditFeed = true"
              />
            </div>
            <!-- <div class="flex justify-center items-center"> -->
            <div
              class="min-width-400 max-width-400 text-center lg:mt-0 md:mt-4"
            >
              <tab-menu @change="currentTabComponent"></tab-menu>
            </div>
            <!-- </div> -->
            <div class="text-right w-52">
              <!-- <button
              class="text-xl text-center bg-yellow-400 rounded-full w-10 h-10"
            >
              <fa class="search-icon" :icon="['fas', 'plus']" />
            </button> -->
            </div>
          </div>
          <div
            class="flex-grow page-content overflow-hidden h-full mt-4"
            :class="[skew ? 'm-xl:ml-70' : '']"
          >
            <transition name="page">
              <component
                :is="currentComponent"
                v-bind="currentProperties"
                @showAddNewUserModal="showAddNewUserModalEvent"
                @showNewAlert="showNewAlertSideBar = true"
                @websiteEditFeed="websiteEditFeed"
                @show-create-group="showCreateNewGroup()"
                @show-edit-group="showEditGroupForm"
                @show-add-feeds="showAddFeeds = true"
                @show-invoice="showInvoice = true"
                @editNewSystemAlert="editNewSystemAlert"
                @deleteNewSystemDone="deleteNewSystemAlertId = ''"
                @change-billing-Info="billingInfo($event)"
                @show-new-card="showNewCard = true"
                @show-edit-profile="showEdirProfile($event)"
              ></component>
            </transition>
          </div>
        </div>
      </div>
    </transition>

    <!-- Small Device -->
    <div
      v-if="showOverlay"
      class="md:hidden overlay"
      @click="removeOverlay"
    ></div>
    <settings-header></settings-header>
    <transition name="page">
      <div
        v-if="!isDesktop"
        class="md:hidden p-2 relative mobile-home_page_height"
      >
        <div class="content flex flex-col">
          <div
            class="flex-grow page-content overflow-hidden h-full mt-4"
            :class="[skew ? 'lg:ml-72' : '']"
          >
            <transition name="page">
              <component
                :is="mobileCurrentComponent"
                v-bind="currentProperties"
                @showAddNewUserModal="showAddNewUserModalEvent"
                @showNewAlert="showNewAlertSideBar = true"
                @websiteEditFeed="websiteEditFeed"
                @show-create-group="
                  ;(showCreateGroup = true), (clearField = false)
                "
                @show-edit-group="showEditGroupForm"
                @show-add-feeds="showAddFeeds = true"
                @show-invoice="showInvoice = true"
                @editNewSystemAlert="editNewSystemAlert"
                @deleteNewSystemDone="deleteNewSystemAlertId = ''"
                @change-billing-Info="billingInfo($event)"
                @show-new-card="showNewCard = true"
                @show-edit-profile="showEdirProfile($event)"
              ></component>
            </transition>
          </div>
        </div>
      </div>
    </transition>

    <new-alert
      :show-new-alert-side-bar="showNewAlertSideBar"
      :new-system-alert-id="newSystemAlertId"
      @closeNewAlertAlert="showNewAlertSideBar = false"
      @addNewSystemAlert="addNewSystemAlert"
      @newSystemAlertUpdate="newSystemAlertUpdate"
      @editNewSystemAlertClose="newSystemAlertId = null"
      @deleteNewSystemAlert="deleteNewSystemAlert"
    ></new-alert>
    <edit-feed :global-color-panel="globalColorPanel"></edit-feed>
    <website-edit-feed
      :show-website-edit-feed-sidebar="showWebsiteEditFeedSidebar"
      :website-edit-feed-id="websiteEditFeedId"
      @closeWebsiteEditFeedSidebar="
        ;(showWebsiteEditFeedSidebar = false), (websiteEditFeedId = '')
      "
      @WebsiteFeedEditDone="websiteFeedEditDone"
      @clearWebsiteEditFeedId="websiteEditFeedId = ''"
    >
    </website-edit-feed>
    <create-new-group
      :show-create-group="showCreateGroup"
      @hide-create-group="hideCreateNewGroup()"
      @add-group="addGroupName"
      @add-feed="availableFeed($event)"
      @clear-field="clearField = true"
    ></create-new-group>
    <edit-group
      :show-edit-group="showEditGroup"
      :selected-group="selectedGroup"
      @hide-edit-group="hideEditGroup"
      @update-group="updateGroup"
      @remove-selected-group="deleteGroup"
      @add-feed="availableFeed($event)"
      @clear-field="clearField = true"
    ></edit-group>
    <archive-settings></archive-settings>
    <add-new-user
      :show-profile="showAddNewUserModal"
      :user="editAbleNewUserData"
      @closeProfile="closeProfile"
      @createdNewUserData="createdNewUserDataEvent($event)"
      @add-new-user-deleted="addNewUserDeleted($event)"
      @update-new-user="updatedProfile($event)"
    ></add-new-user>
    <billing-info-side-bar
      :change-billing-info="changeBillingInfo"
      :selected-billing-info="selectedBillingInfo"
      @close-billing-info="hideChangeBillingInfo"
      @update-billing-info="billingInfoUpdate"
    ></billing-info-side-bar>
    <invoice-side-bar
      :show-invoice="showInvoice"
      @close-invoice="hideInvoiceModal"
    ></invoice-side-bar>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { defineComponent } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import TabMenu from '~/components/settings/TabMenu'
import Service from '~/components/settings/service/Service'
import Account from '~/components/settings/account/Account'
import Profile from '~/components/settings/account/Profile'
import AddNewUser from '~/components/settings/account/AddNewUser.vue'
import InvoiceSideBar from '~/components/settings/account/InvoiceSideBar'
import Organize from '~/components/settings/organize/Organize'
import System from '~/components/settings/system/System'
import EditFeed from '~/components/settings/service/EditFeed'
import NewAlert from '~/components/settings/system/NewAlert'
import CreateNewGroup from '~/components/settings/organize/CreateNewGroup.vue'
import EditGroup from '~/components/settings/organize/EditGroup.vue'
import AddFeeds from '~/components/settings/service/AddFeeds.vue'
import BillingInfoSideBar from '~/components/settings/account/BillingInfoSideBar.vue'
import SettingsHeader from '~/components/settings/SettingsHeader.vue'
import WebsiteEditFeed from '~/components/settings/service/WebsiteEditFeed'
import archiveSettings from '~/components/settings/system/ArchiveSettings.vue'
export default defineComponent({
  name: 'Settings',
  components: {
    WebsiteEditFeed,
    EditFeed,
    NewAlert,
    Profile,
    ArchiveSourcesDropdown,
    TabMenu,
    Service,
    Account,
    InvoiceSideBar,
    Organize,
    System,
    AddNewUser,
    CreateNewGroup,
    EditGroup,
    AddFeeds,
    BillingInfoSideBar,
    SettingsHeader,
    archiveSettings,
  },
  layout: 'home',
  middleware: ['payment'],
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    return {
      isDesktop: breakpoints.greater('md'),
    }
  },
  data() {
    return {
      skew: false,
      isLoading: true,
      currentComponent: 'Service',
      showAddNewUserModal: false,
      editAbleNewUserData: null,
      showInvoice: false,
      selectedBillingInfo: {},
      changeBillingInfo: false,
      showNewAlertSideBar: false,
      showWebsiteEditFeedSidebar: false,
      websiteEditFeedId: '',
      isWebsiteFeedEditDone: false,
      showCreateGroup: false,
      showEditGroup: false,
      showAddFeeds: false,
      addGroup: false,
      allAddedGroup: {},
      createdNewUserData: null,
      selectedGroup: {},
      groupUpdate: {},
      selectedGroupId: null,
      addedNewAlert: {},
      editedNewAlert: {},
      newSystemAlertId: null,
      deleteNewSystemAlertId: '',
      updateBillingInfo: {},
      showNewCard: false,
      newCardInfo: false,
      showEditFeed: false,
      editProfile: false,
      editProfileInfo: null,
      updatedProfileInfo: {},
      deleteNewUser: null,
      groundedFeed: {},
      clearField: false,
    }
  },

  computed: {
    currentProperties() {
      if (
        this.currentComponent === 'Account' ||
        this.mobileCurrentComponent === 'Account'
      ) {
        return {
          createdNewUserData: this.createdNewUserData,
          updateBillingInfo: this.updateBillingInfo,
          newCardAdded: this.newCardInfo,
          updatedProfileInfo: this.updatedProfileInfo,
          deleteNewUser: this.deleteNewUser,
        }
      } else if (
        this.currentComponent === 'Organize' ||
        this.mobileCurrentComponent === 'Organize'
      ) {
        return {
          addGroup: this.addGroup,
          allAddedGroup: this.allAddedGroup,
          groupUpdate: this.groupUpdate,
          selectedGroupId: this.selectedGroupId,
          groundedFeed: this.groundedFeed,
          clearField: this.clearField,
        }
      } else if (
        this.currentComponent === 'System' ||
        this.mobileCurrentComponent === 'System'
      ) {
        return {
          addedNewAlert: this.addedNewAlert,
          editedNewAlert: this.editedNewAlert,
          deleteNewSystemAlertId: this.deleteNewSystemAlertId,
        }
      } else if (
        this.currentComponent === 'Service' ||
        this.mobileCurrentComponent === 'Service'
      ) {
        return {}
      }
      return ''
    },
    ...mapState(['betaVersion']),
    mobileCurrentComponent() {
      return this.$store.getters['mobile/header/getCurrentComponent']
    },
    showOverlay() {
      return this.$store.getters['mobile/header/getOverlay']
    },
    ...mapState('loginAnimation', {
      showHomeContent: 'showHomeContent',
    }),
    ...mapState(['globalColorPanel']),
  },
  watch: {
    $route(to, from) {
      this.setCurrentComponent()
    },
  },
  created() {
    this.setCurrentComponent()
  },
  mounted() {
    this.newCardInfo = false
    this.clearField = false
    // this.$store.dispatch('mobile/header/setSettingsPage')
  },

  methods: {
    hideInvoiceModal() {
      this.$store.commit('setting/SET_SHOW_INVOICE', false)
    },
    hideChangeBillingInfo() {
      this.$store.commit('setting/SET_CHANGE_BILLING_INFO', false)
    },
    showCreateNewGroup() {
      this.clearField = false
    },
    hideCreateNewGroup() {
      this.clearField = false
      this.$store.commit('setting/SET_SHOW_CREATE_GROUP', false)
    },
    closeSidebar() {
      this.$store.commit('archive/SET_BULK_DOWNLOAD_SIDEBAR', false)
      this.$store.commit('profile/SET_PROFILE_MODAL', false)
      this.$store.commit('search/SET_SAVE_SAERCH_MODAL', false)
      this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
        open: false,
        data: {},
      })
      this.$store.commit('setting/SET_SHOW_CREATE_GROUP', false)
      this.$store.commit('setting/SET_SHOW_EDIT_GROUP', false)
      this.$store.dispatch('showArchiveSettings', false)
      this.$store.commit('setting/SET_SHOW_PROFILE', false)
      this.$store.dispatch('mobile/header/removePayment')
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('notifications/SHOW_NOTIFICATION_MODAL', false)
      this.$store.commit('setting/SET_CHANGE_BILLING_INFO', false)
      this.$store.commit('setting/SET_SHOW_INVOICE', false)
      this.$store.commit('SET_SHOW_SIDE_BAR', false)
    },
    showSkew($event) {
      this.skew = $event
    },
    setCurrentComponent() {
      const hash = this.$route.hash.split('#')[1]
      if (hash === 'system') {
        this.currentComponent = 'System'
        this.$store.commit('setting/SET_CURRENT_COMPONENT', 'System')
      }
    },

    showEdirProfile($event) {
      this.editProfileInfo = $event
      this.editProfile = true
    },
    updatedProfile($event) {
      this.updatedProfileInfo = $event
    },
    addNewUserDeleted($event) {
      this.deleteNewUser = $event
    },
    closeCardComp() {
      this.showNewCard = false
      this.newCardInfo = false
    },
    billingInfo($event) {
      this.selectedBillingInfo = $event
      this.changeBillingInfo = true
    },
    showLoader() {
      this.isLoading = false
    },
    currentTabComponent(currentTab) {
      this.currentComponent = currentTab
    },
    showAddNewUserModalEvent({ data }) {
      this.editAbleNewUserData = data
    },
    closeProfile() {
      this.$store.commit('setting/SET_SHOW_PROFILE', false)
    },
    createdNewUserDataEvent($event) {
      this.createdNewUserData = $event
    },
    websiteEditFeed(id) {
      this.websiteEditFeedId = id
      this.showWebsiteEditFeedSidebar = true
      this.$store.dispatch('mobile/header/showOverlay')
    },
    addGroupName(data) {
      this.addGroup = true
      this.allAddedGroup = data
    },
    showEditGroupForm(item1, item2) {
      this.selectedGroup = item1
      this.clearField = false
    },
    updateGroup(data) {
      this.groupUpdate = data
    },
    hideEditGroup(data) {
      this.$store.commit('setting/SET_SHOW_EDIT_GROUP', false)
      this.selectedGroup = data
      // this.clearField = false
    },
    deleteGroup(data) {
      this.selectedGroupId = data
    },
    websiteFeedEditDone() {
      this.websiteEditFeedId = ''
      this.showWebsiteEditFeedSidebar = false
      this.isWebsiteFeedEditDone = true
    },
    addNewSystemAlert(data) {
      this.addedNewAlert = data
    },
    editNewSystemAlert(editableId) {
      this.newSystemAlertId = parseInt(editableId)
      this.showNewAlertSideBar = true
    },
    newSystemAlertUpdate(data) {
      this.newSystemAlertId = null
      this.editedNewAlert = data
      this.showNewAlertSideBar = false
    },
    deleteNewSystemAlert(id) {
      this.deleteNewSystemAlertId = id
    },
    billingInfoUpdate(data) {
      this.updateBillingInfo = data
    },
    removeOverlay() {
      this.showInvoice = false
      this.showWebsiteEditFeedSidebar = false
      this.showNewAlertSideBar = false
      this.showWebsiteEditFeedSidebar = false
      this.showNewCard = false
      this.changeBillingInfo = false
      this.$store.dispatch('mobile/header/removeOverlay')
    },
    availableFeed($event) {
      this.groundedFeed = $event
    },
  },
})
</script>

<style lang="scss" scoped>
.main_dropdown {
  max-width: 16rem;
}
.page-content {
  transition: margin 0.5s;
}
.min-width-400 {
  min-width: 600px;
}
.max-width-400 {
  max-width: 600px;
}
@media (max-width: 1279px) and (min-width: 768px) {
  .min-width-400 {
    min-width: 500px;
  }
  .max-width-400 {
    max-width: 500px;
  }
}
//small Device
.mobile-home_page_height {
  height: 100%;
  position: relative;
  padding-top: 115px;
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
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 1s ease-in-out;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.fadeIn-enter-t0,
.fadeIn-leave-from {
  opacity: 1;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}
</style>
