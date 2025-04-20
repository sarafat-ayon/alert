<template>
  <section id="mainBody" class="h-full">
    <div v-if="isDesktop" class="md:flex md:flex-col hidden card-wrapper px-2">
      <div
        id="userInfoLarge"
        class="card transition-all duration-500 ease-in-out"
        :class="
          !expandCollapseFunctionality
            ? 'h-1/2'
            : userInfoIsExpanded
            ? 'expnad-height'
            : 'collapse-height'
        "
      >
        <div
          class="card-header flex justify-center items-center px-4"
          :class="expandCollapseFunctionality ? 'cursor-pointer' : ''"
          @click="expandCollapseFunctionality ? toggleExpand() : ''"
        >
          <h3 class="card-title flex-grow pl-5">User and Information</h3>
          <span
            v-if="expandCollapseFunctionality"
            class="toggle-icon transition-all duration-500 transform"
            :class="userInfoIsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <fa :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div class="inner-body-height transition-all duration-300 ease-in-out">
          <div class="card-body web-user_info scroll">
            <table class="table-wrapper min-w-full">
              <!--start => table header section-->
              <thead>
                <tr class="bg-yellow-moreLight sticky top-0 z-1 border-b">
                  <th class="table-th">
                    <strong>Name</strong>
                  </th>
                  <th class="table-th">
                    <strong>Email</strong>
                  </th>
                  <th class="table-th">
                    <strong>Phone</strong>
                  </th>
                  <th class="table-th">
                    <strong>User Permission</strong>
                  </th>
                  <th class="table-th">
                    <strong>Alerts Permission</strong>
                  </th>
                </tr>
              </thead>
              <!--end => table header section-->

              <!--start => table body section-->
              <tbody class="body">
                <tr
                  v-for="(alluser, index) in allUsers"
                  :key="`${index}-user-info`"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
                  class="cursor-pointer"
                  @click="
                    user.userPermission !== 'User'
                      ? showEditProfile(allUsers[index], $event)
                      : ''
                  "
                >
                  <td class="table-tr">
                    <span>
                      {{ alluser.firstName + ' ' + alluser.lastName }}
                    </span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.email | strLimit }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.phone }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.userPermission }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.alertPermission }}</span>
                  </td>
                </tr>
              </tbody>
              <!--end => table body section-->
            </table>
          </div>
          <div
            v-if="user.userPermission !== 'User'"
            class="flex items-center justify-end p-4 py-0 my-4"
          >
            <button class="footer-btn" @click="addNewUser($event)">
              Add New User
            </button>
          </div>
          <!-- <div
            id="resizeIcon"
            class="absolute pr-2 bottom-0 z-30 w-full text-right block"
            @mousedown="mouseDownHandler"
            @mouseup="mouseUpHandler"
            @touchstart="touchDownHandler"
            @touchend="touchUpHandler"
          >
            <fa
              class="text-xl font-light text-yellow-primary"
              :icon="['fas', 'arrows-alt-v']"
            />
          </div>-->
        </div>
      </div>

      <div
        id="billingInfoLarge"
        class="card transition-all duration-500 ease-in-out"
        :class="
          !expandCollapseFunctionality
            ? 'h-1/2'
            : !userInfoIsExpanded
            ? 'expnad-height'
            : 'collapse-height'
        "
      >
        <div
          class="card-header flex justify-center items-center px-4"
          :class="expandCollapseFunctionality ? 'cursor-pointer' : ''"
          @click="expandCollapseFunctionality ? toggleExpand() : ''"
        >
          <h3 class="card-title flex-grow pl-5">Billing Information</h3>
          <span
            v-if="expandCollapseFunctionality"
            class="toggle-icon transition-all duration-500 transform"
            :class="!userInfoIsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <fa :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div class="web-billing_height transition-all duration-300 ease-in-out">
          <div class="card-body web-billing_info scroll">
            <table class="table-wrapper min-w-full">
              <!--start => table header section-->
              <thead>
                <tr class="bg-yellow-moreLight sticky top-0 z-1 border-b">
                  <th v-if="user.userPermission !== 'User'" class="table-th">
                    <strong>Action</strong>
                  </th>
                  <th class="table-th">
                    <strong>Method</strong>
                  </th>
                  <th class="table-th">
                    <strong>Name</strong>
                  </th>
                  <th class="table-th">
                    <strong>Number</strong>
                  </th>
                  <th class="table-th">
                    <strong>Expiration</strong>
                  </th>
                  <th class="table-th">
                    <strong>Default Card</strong>
                  </th>
                </tr>
              </thead>
              <!--end => table header section-->

              <!--start => table body section-->
              <tbody class="body">
                <tr
                  v-for="(billingInfo, index) in billingInfoList"
                  :key="index + 'billing-info'"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
                  class="cursor-pointer"
                >
                  <td
                    v-if="user.userPermission !== 'User'"
                    class="table-tr action-icon"
                  >
                    <div class="flex flex-row space-x-2 items-center">
                      <a
                        data-title="Edit"
                        class="
                          w-7
                          h-7
                          cursor-pointer
                          flex
                          items-center
                          justify-center
                        "
                        @click="showChangeBillingInfo($event, billingInfo)"
                      >
                        <div class="w-4 h-4 bg-yellow-midlight rounded-full">
                          <edit-icon></edit-icon>
                        </div>
                      </a>
                      <a
                        data-title="Delete"
                        class="
                          delete
                          w-7
                          h-7
                          cursor-pointer
                          flex
                          items-center
                          justify-center
                        "
                        @click="deleteCard(billingInfo.id)"
                      >
                        <fa
                          class="text-red-600 text-md"
                          :icon="['fas', 'times-circle']"
                        />
                      </a>
                    </div>
                  </td>
                  <td class="table-tr">
                    <span>{{ billingInfo.brand }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ billingInfo.name }}</span>
                  </td>
                  <td class="table-tr">
                    <span v-if="billingInfo.brand !== 'PayPal'"
                      >*{{ billingInfo.last4 }}</span
                    >
                  </td>
                  <td class="table-tr">
                    <span v-if="billingInfo.brand !== 'PayPal'">
                      {{ billingInfo.expMonth }}/{{ billingInfo.expYear }}
                    </span>
                  </td>
                  <td class="table-tr">
                    <span v-if="billingInfo.isDefault === true">Yes</span>
                    <span v-if="billingInfo.isDefault === false">No</span>
                  </td>
                </tr>
              </tbody>
              <!--end => table body section-->
            </table>
          </div>
          <!-- cart footer-->
          <div class="flex items-center justify-end p-4 py-0 my-4">
            <div class="text-right w-full">
              <!-- <marquee>
                <p
                  class="
                    text-gray-1200
                    opacity-50
                    lg:mb-3
                    mb-1
                    lg:text-md
                    text-xs
                  "
                >
                  On March 1, 2021 you were billed $44.75 in advance, including
                  today, we have 67% left in the month. If you cancel, we will
                  credit you $29.98.
                </p>
              </marquee>-->
              <!-- <a :href="closeAccountInfo" download> -->
              <button
                :disabled="downloadProcess"
                class="footer-btn"
                @click="closeAccount()"
              >
                Close Account
              </button>
              <!-- </a> -->
              <button
                v-if="user.userPermission !== 'User'"
                class="footer-btn mx-4"
                @click="changeBilling($event)"
              >
                Change Billing
              </button>
              <button class="footer-btn" @click="showInvoiceModal($event)">
                View Invoices
              </button>
            </div>
          </div>
          <!-- cart footer-->
        </div>
      </div>
    </div>

    <!-- Small Device -->
    <div v-else class="md:hidden flex flex-col mobile-card-wrapper">
      <div
        id
        class="card transition-all duration-500 ease-in-out"
        :class="userInfoIsExpanded ? 'expnad-height' : 'collapse-height'"
      >
        <div
          class="card-header flex justify-center items-center px-4"
          @click="toggleExpand"
        >
          <h3 class="card-title pl-5 flex-grow">User and Information</h3>
          <span
            class="toggle-icon transition-all duration-500 transform"
            :class="userInfoIsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <fa :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div
          class="inner-body-height transition-all duration-300 ease-in-out"
          :class="userInfoIsExpanded ? 'opacity-100' : 'opacity-0'"
        >
          <div class="card-body scroll userinfo">
            <table class="table-wrapper min-w-full">
              <!--start => table header section-->
              <thead>
                <tr class="bg-yellow-moreLight sticky top-0 z-1 border-b">
                  <th class="table-th">
                    <span>Name</span>
                  </th>
                  <th class="table-th">
                    <span>Email</span>
                  </th>
                  <th class="table-th">
                    <span>Phone</span>
                  </th>
                  <th class="table-th">
                    <span>User Permission</span>
                  </th>
                  <th class="table-th">
                    <span>Alerts Permission</span>
                  </th>
                </tr>
              </thead>
              <!--end => table header section-->

              <!--start => table body section-->
              <tbody class="body">
                <tr
                  v-for="(alluser, alluserIndex) in allUsers"
                  :key="`${alluserIndex}-small-user-info`"
                  :class="
                    alluserIndex % 2 === 0 ? 'bg-white' : 'bg-gray-default'
                  "
                  class="cursor-pointer"
                  @click="
                    user.userPermission !== 'User'
                      ? showEditProfile(allUsers[alluserIndex], $event)
                      : ''
                  "
                >
                  <td class="table-tr">
                    <span>
                      {{ alluser.firstName + ' ' + alluser.lastName }}
                    </span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.email }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.phone }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.userPermission }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ alluser.alertPermission }}</span>
                  </td>
                </tr>
              </tbody>
              <!--end => table body section-->
            </table>
          </div>
          <div
            v-if="user.userPermission !== 'User'"
            class="flex items-center justify-end p-4 py-0 my-4"
          >
            <button class="footer-btn" @click="addNewUser">Add New User</button>
          </div>
          <!-- <div
          id="resizeIcon"
          class="absolute pr-2 bottom-0 z-30 w-full text-right block"
          @mousedown="mouseDownHandler"
          @mouseup="mouseUpHandler"
          @touchstart="touchDownHandler"
          @touchend="touchUpHandler"
        >
          <fa
            class="text-xl font-light text-yellow-primary"
            :icon="['fas', 'arrows-alt-v']"
          />
          </div>-->
        </div>
      </div>
      <div
        id
        class="card transition-all duration-500 ease-in-out"
        :class="!userInfoIsExpanded ? 'expnad-height' : 'collapse-height'"
      >
        <div
          class="card-header flex items-center justify-center px-4"
          @click="toggleExpand"
        >
          <h3 class="card-title flex-grow pl-5">Billing Information</h3>
          <span
            class="toggle-icon transition-all duration-500 transform"
            :class="!userInfoIsExpanded ? 'rotate-180' : 'rotate-0'"
          >
            <fa :icon="['fas', 'caret-down']" />
          </span>
        </div>
        <div
          class="billing_info_height transition-all duration-300 ease-in-out"
        >
          <div class="card-body scroll billing_info">
            <table class="table-wrapper min-w-full">
              <thead>
                <tr class="bg-yellow-moreLight sticky top-0 z-1 border-b">
                  <th v-if="user.userPermission !== 'User'" class="table-th">
                    <span>Action</span>
                  </th>
                  <th class="table-th">
                    <span>Method</span>
                  </th>
                  <th class="table-th">
                    <span>Name</span>
                  </th>
                  <th class="table-th">
                    <span>Number</span>
                  </th>
                  <th class="table-th">
                    <span>Expiration</span>
                  </th>
                  <th class="table-th">
                    <span>Default Card</span>
                  </th>
                </tr>
              </thead>

              <tbody class="body">
                <tr
                  v-for="(billingInfo, index) in billingInfoList"
                  :key="index + 'billing-info-small'"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
                  class="cursor-pointer"
                >
                  <td
                    v-if="user.userPermission !== 'User'"
                    class="table-tr action-icon"
                  >
                    <div class="flex flex-row space-x-2 items-center">
                      <a
                        data-title="Edit"
                        class="
                          w-7
                          h-7
                          cursor-pointer
                          flex
                          items-center
                          justify-center
                        "
                        @click="
                          showChangeBillingInfo($event, billingInfo), showBlur()
                        "
                      >
                        <div class="w-4 h-4 bg-yellow-midlight rounded-full">
                          <edit-icon></edit-icon>
                        </div>
                      </a>
                      <a
                        data-title="Delete"
                        class="
                          delete
                          w-7
                          h-7
                          cursor-pointer
                          flex
                          items-center
                          justify-center
                        "
                        @click="deleteCard(billingInfo.id)"
                      >
                        <fa
                          class="text-red-600 text-md"
                          :icon="['fas', 'times-circle']"
                        />
                      </a>
                    </div>
                  </td>
                  <td class="table-tr">
                    <span>{{ billingInfo.brand }}</span>
                  </td>
                  <td class="table-tr">
                    <span>{{ billingInfo.name }}</span>
                  </td>
                  <td class="table-tr">
                    <span v-if="billingInfo.brand !== 'PayPal'"
                      >*{{ billingInfo.last4 }}</span
                    >
                  </td>
                  <td class="table-tr">
                    <span v-if="billingInfo.brand !== 'PayPal'">
                      {{ billingInfo.expMonth }}/{{ billingInfo.expYear }}
                    </span>
                  </td>
                  <td class="table-tr">
                    <span v-if="billingInfo.isDefault === true">Yes</span>
                    <span v-if="billingInfo.isDefault === false">No</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-end p-4 py-0 my-4">
            <div class="text-right w-full">
              <!-- <marquee>
              <p
                class="
                  text-gray-1200
                  opacity-50
                  lg:mb-3
                  mb-1
                  lg:text-md
                  text-md
                "
              >
                On March 1, 2021 you were billed $44.75 in advance, including
                today, we have 67% left in the month. If you cancel, we will
                credit you $29.98.
              </p>
              </marquee>-->
              <div class="flex flex-row justify-around items-center space-x-2">
                <!-- <a :href="closeAccountInfo" download> -->
                <button
                  :disabled="downloadProcess"
                  class="footer-btn"
                  @click="closeAccount()"
                >
                  Close Account
                </button>
                <!-- </a> -->
                <button
                  v-if="user.userPermission !== 'User'"
                  class="footer-btn"
                  @click="changeBilling($event), showBlur()"
                >
                  Change Billing
                </button>
                <button
                  class="footer-btn"
                  @click="showInvoiceModal($event), showBlur()"
                >
                  View Invoices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <alert-confirm-modal
      :processing="cardDeleteProcess"
      :show="showDeleteAlert"
      @cancel="deleteCancel"
      @delete="deleteConfirm"
    ></alert-confirm-modal>

    <alert-confirm-modal
      title="Are you sure you want to close your account?"
      message="This action cannot be undone, you will be unable to recover your account, and your archive will be deleted from our system."
      confirm-btn-text="Close Account"
      cancel-btn-text="Exit"
      top-exit-btn-color="text-yellow-midlight"
      :processing="downloadProcess"
      :show="closeAccountConfirmModal"
      @cancel="closeAccountDeleteCancel"
      @delete="closeAccountDeleteConfirm"
    ></alert-confirm-modal>

    <password-confirmation-modal
      v-if="showPasswordConfirmModal"
      @isValidPassword="isValidPassword"
      @close="closePasswordConfirmModal"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { PAYMENT_METHOD, NEW_USER, USER_PROFILE } from '~/constants/urls'
import AlertConfirmModal from '~/components/AlertConfirmModal.vue'
import PasswordConfirmationModal from '~/components/PasswordConfirmationModal.vue'
import EditIcon from '~/components/shared/icon/EditIcon.vue'

export default defineComponent({
  name: 'Account',
  components: { AlertConfirmModal, PasswordConfirmationModal, EditIcon },
  props: {
    createdNewUserData: {
      type: Object,
      default: null,
    },
    updateBillingInfo: {
      type: Object,
      default: null,
    },
    newCardAdded: {
      type: Boolean,
      default: false,
    },
    updatedProfileInfo: {
      type: Object,
      default: null,
    },
    deleteNewUser: {
      type: Number,
      default: null,
    },
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const userInfoIsExpanded = ref(true)
    const bodyHeight = ref(0)
    const expandCollapseFunctionality = ref(true)
    function toggleExpand() {
      userInfoIsExpanded.value = !userInfoIsExpanded.value
    }

    return {
      isDesktop: breakpoints.greater('md'),
      userInfoIsExpanded,
      bodyHeight,
      toggleExpand,
      expandCollapseFunctionality,
    }
  },
  data() {
    return {
      billingInfoList: [],
      closeAccountInfo: '',
      allUsers: [],
      owner: null,
      downloadProcess: false,
      showDeleteAlert: false,
      deletedCardId: '',
      closeAccountConfirmModal: false,
      cardDeleteProcess: false,
      showPasswordConfirmModal: false,
      yAxisPart1: 0,
      yAxisPart2: 0,
      hPart1: 0,
      hPart2: 0,
      initialUpperHeight: '',
      initialLowerHeight: '',
    }
  },
  computed: {
    ...mapState(['betaVersion']),
    ...mapState('setting', ['currentComponent', 'showBillingInfo']),
    ...mapState('socialFeed', ['refundAmount']),
    cardAdded() {
      return this.$store.getters['mobile/header/getCardInfo']
    },
    user() {
      return this.$auth.user
    },
  },
  watch: {
    showBillingInfo(data) {
      if (data) {
        this.userInfoIsExpanded = false
      }
    },
    createdNewUserData(data) {
      this.allUsers.unshift(data)
    },
    updateBillingInfo(data) {
      // this.billingInfo = data
      this.getUserBillingInfo()
    },
    cardAdded(data) {
      if (data === true) {
        this.getUserBillingInfo()
      }
    },
    updatedProfileInfo(data) {
      if (data) {
        this.allUsers = this.allUsers.map((item) => {
          if (Number(item.id) === Number(data.id)) {
            return (item = data)
          } else {
            return item
          }
        })
      }
    },
    deleteNewUser(id) {
      this.allUsers = this.allUsers.filter((item) => {
        return Number(id) !== Number(item.id)
      })
    },
  },
  async mounted() {
    if (this.currentComponent === 'Account') {
      this.getUserBillingInfo()
      this.getAllUsers()
      this.resizeWindow()
      window.addEventListener('resize', this.resizeWindow)
      await this.$store.dispatch('account/fetchUserPermissons')
      await this.$store.dispatch('account/fetchAlertPermissons')
    }

    // const upperPart = document.getElementById('resizeMe')
    // const lowerPart = document.getElementById('resizeMeAlso')
    // setTimeout(() => {
    //   this.initialUpperHeight = upperPart.offsetHeight + 10
    //   this.initialLowerHeight = lowerPart.offsetHeight + 10
    // }, 500)
  },
  destroyed() {
    setTimeout(() => {
      window.removeEventListener('resize', this.resizeWindow)
    }, 2000)
  },
  methods: {
    // Horizontal Draggable Functionality Start
    // mouseDownHandler(e) {
    //   e.preventDefault()
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   // Get the current mouse position
    //   this.yAxisPart1 = e.clientY
    //   this.yAxisPart2 = e.clientY
    //   // Calculate the dimension of element
    //   const StylesPart1 = window.getComputedStyle(upperPart)
    //   this.hPart1 = parseInt(StylesPart1.height, 10)
    //   const StylesPart2 = window.getComputedStyle(lowerPart)
    //   this.hPart2 = parseInt(StylesPart2.height, 10)
    //   // Attach the listeners to `document`
    //   document.addEventListener('mousemove', this.mouseMoveHandler)
    //   document.addEventListener('mouseup', this.mouseUpHandler)
    // },
    // mouseMoveHandler(e) {
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   // How far the mouse has been moved
    //   const dy1 = e.clientY - this.yAxisPart1
    //   const dy2 = e.clientY + this.yAxisPart2
    //   const expectedHight = window.innerHeight - 240
    //   // Adjust the dimension of element
    //   if (this.hPart1 + dy1 < 72) {
    //     upperPart.style.height = `${72}px`
    //   } else if (expectedHight < this.hPart1 + dy1) {
    //     upperPart.style.height = `${expectedHight}px`
    //   } else {
    //     upperPart.style.height = `${this.hPart1 + dy1}px`
    //   }
    //   if (this.hPart2 + dy2 < 72) {
    //     lowerPart.style.height = `${72}px`
    //   } else {
    //     const upperPartHeight = upperPart.style.height.slice(0, -2)
    //     const totalHeight =
    //       this.initialUpperHeight + this.initialLowerHeight - 20
    //     lowerPart.style.height = `${totalHeight - upperPartHeight}px`
    //   }
    // },
    // mouseUpHandler() {
    //   // Remove the handlers of `mousemove` and `mouseup`
    //   document.removeEventListener('mousemove', this.mouseMoveHandler)
    //   document.removeEventListener('mouseup', this.mouseUpHandler)
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   const upperPartHeight = upperPart.style.height.slice(0, -2)
    //   const resizedHeight = this.initialUpperHeight - upperPartHeight
    //   lowerPart.style.height = `${
    //     Number(this.initialLowerHeight) + Number(resizedHeight) - 20
    //   }px`
    // },
    // touchDownHandler(e) {
    //   e.preventDefault()
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   // Get the current mouse position
    //   this.yAxisPart1 = e.targetTouches[0]
    //     ? e.targetTouches[0].pageY
    //     : e.changedTouches[e.changedTouches.length - 1].pageY // e.clientY
    //   this.yAxisPart2 = e.targetTouches[0]
    //     ? e.targetTouches[0].pageY
    //     : e.changedTouches[e.changedTouches.length - 1].pageY // e.clientY
    //   // Calculate the dimension of element
    //   const StylesPart1 = window.getComputedStyle(upperPart)
    //   this.hPart1 = parseInt(StylesPart1.height, 10)
    //   const StylesPart2 = window.getComputedStyle(lowerPart)
    //   this.hPart2 = parseInt(StylesPart2.height, 10)
    //   // Attach the listeners to `document`
    //   document.addEventListener('touchmove', this.touchMoveHandler)
    //   document.addEventListener('touchend', this.touchUpHandler)
    // },
    // touchMoveHandler(e) {
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   // How far the mouse has been moved
    //   const dy1 =
    //     (e.targetTouches[0]
    //       ? e.targetTouches[0].pageY
    //       : e.changedTouches[e.changedTouches.length - 1].pageY) -
    //     this.yAxisPart1
    //   const dy2 =
    //     (e.targetTouches[0]
    //       ? e.targetTouches[0].pageY
    //       : e.changedTouches[e.changedTouches.length - 1].pageY) +
    //     this.yAxisPart2
    //   const expectedHight = window.innerHeight - 240
    //   // Adjust the dimension of element
    //   if (this.hPart1 + dy1 < 72) {
    //     upperPart.style.height = `${72}px`
    //   } else if (expectedHight < this.hPart1 + dy1) {
    //     upperPart.style.height = `${expectedHight}px`
    //   } else {
    //     upperPart.style.height = `${this.hPart1 + dy1}px`
    //   }
    //   if (this.hPart2 + dy2 < 72) {
    //     lowerPart.style.height = `${72}px`
    //   } else {
    //     const upperPartHeight = upperPart.style.height.slice(0, -2)
    //     const totalHeight =
    //       this.initialUpperHeight + this.initialLowerHeight - 20
    //     lowerPart.style.height = `${totalHeight - upperPartHeight}px`
    //   }
    // },
    // touchUpHandler() {
    //   // Remove the handlers of `mousemove` and `mouseup`
    //   document.removeEventListener('touchmove', this.touchMoveHandler)
    //   document.removeEventListener('touchend', this.touchUpHandler)
    //   const upperPart = document.getElementById('resizeMe')
    //   const lowerPart = document.getElementById('resizeMeAlso')
    //   const upperPartHeight = upperPart.style.height.slice(0, -2)
    //   const resizedHeight = this.initialUpperHeight - upperPartHeight
    //   lowerPart.style.height = `${
    //     Number(this.initialLowerHeight) + Number(resizedHeight) - 20
    //   }px`
    // },
    resizeWindow() {
      this.bodyHeight = window.innerHeight
      if (this.bodyHeight > 841) {
        this.expandCollapseFunctionality = false
      } else {
        this.expandCollapseFunctionality = true
      }
      // const upperPart = document.getElementById('resizeMe')
      // const lowerPart = document.getElementById('resizeMeAlso')
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

    showInvoiceModal($event) {
      this.$store.commit('setting/SET_SHOW_INVOICE', true)
      $event.stopPropagation()
    },
    showChangeBillingInfo($event, billingInfo) {
      this.$store.commit('setting/SET_CHANGE_BILLING_INFO', true)
      this.$emit('change-billing-Info', billingInfo)
      $event.stopPropagation()
    },
    changeBilling($event) {
      this.$store.dispatch('mobile/header/setPayment')
      $event.stopPropagation()
    },
    showEditProfile(user, $event) {
      this.$store.commit('setting/SET_SHOW_PROFILE', true)
      $event.stopPropagation()
      this.$emit('showAddNewUserModal', { data: user })
    },
    addNewUser($event) {
      this.$store.commit('setting/SET_SHOW_PROFILE', true)
      $event.stopPropagation()
      this.$emit('showAddNewUserModal', { data: null })
    },
    async getUserBillingInfo() {
      try {
        const response = await this.$axios.$get(PAYMENT_METHOD)
        if (response.success) {
          this.billingInfoList = response.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    closeAccountDeleteCancel() {
      this.closeAccountConfirmModal = false
    },

    closeAccount() {
      this.showPasswordConfirmModal = true
      this.$store.commit('confirm/SET_FROM_CLOSE_ACCOUNT', true)
    },
    closePasswordConfirmModal() {
      this.showPasswordConfirmModal = false
    },
    isValidPassword() {
      this.closePasswordConfirmModal()
      this.closeAccountConfirmModal = true
    },
    async closeAccountDeleteConfirm() {
      this.downloadProcess = true
      try {
        const response = await this.$axios({
          url: USER_PROFILE,
          method: 'DELETE',
        })
        this.$toast.success('Your account closed successfully!', {
          className: ['toasted-bg-archive'],
        })
        this.closeAccountConfirmModal = false
        if (response.data.refund > 0) {
          this.$store.commit('socialFeed/SET_REFUND_AMOUNT', response.data)
          this.$store.commit('socialFeed/SHOW_REFUND_MODAL', true)
        }
        if (response.data.refund === 0 || this.user.isOwner === false) {
          this.logout()
        }
      } catch (err) {
        if (err.response.status === 411) {
          this.$toast.success('Your account closed successfully!', {
            className: ['toasted-bg-archive'],
          })
          this.$store.commit(
            'socialFeed/SET_REFUND_AMOUNT',
            err.response.refund
          )
          this.$store.commit('socialFeed/SHOW_REFUND_MODAL', true)
        }
        console.log(err)
      } finally {
        this.downloadProcess = false
        this.closeAccountConfirmModal = false
        this.showPasswordConfirmModal = false
      }
    },
    logout() {
      this.$toast.clear()
      this.$store.commit('SET_LANDING_LOADER', false)
      this.$router.push('/home')
      setTimeout(async () => {
        this.show_home_content(true)
        await this.$auth.logout({
          data: {
            refresh: this.$auth.strategy.refreshToken.get(),
          },
        })
        this.$store.commit('socialFeed/SET_REFUND_AMOUNT', {})
        this.$store.commit('socialFeed/SHOW_REFUND_MODAL', false)
        localStorage.removeItem('lockScreen')
        this.$store.commit('SET_LOCK_SCREEN', false)
        this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
        this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
        this.landing_content(true)
        this.expand_starter_modal(false)
        this.collapse_starter_modal(false)
        this.maximize_starter_modal(false)
        this.starter_account_maximized(false)
        this.updateSetupContent('starter-button')
        setTimeout(() => {
          this.home_wrapper(true)
        }, 1500)

        setTimeout(() => {
          this.show_home(false)
          this.show_logo_text(true)
          this.home_menu_text(true)
          setTimeout(() => {
            this.all_side_menu(false)
            setTimeout(() => {
              this.home_side_menu(false)
              this.home_menu_text(false)
              setTimeout(() => {
                this.show_logo(false)
                setTimeout(() => {
                  this.home_circle(true)
                  this.sidebar_menu(false)
                  this.sidebar_circle(false)
                  this.width_decrese(true)
                  setTimeout(() => {
                    this.home_modal(false)
                    this.slide_left(false)
                    this.slide_right(true)
                    this.login_circle(true)
                    setTimeout(() => {
                      this.home_header(false)
                      this.slide_full_right(true)
                      this.home_circle(false)
                      this.home_sidebar(false)
                      setTimeout(() => {
                        this.after_logout(true)
                        setTimeout(() => {
                          this.text_loading(true)
                          setTimeout(() => {
                            this.successfully(false)
                            setTimeout(() => {
                              setTimeout(() => {
                                this.login_button_transition(false)
                                this.submit_button_transition(false)
                                this.login_form_transition(false)
                                setTimeout(() => {
                                  this.after_logout(false)
                                  this.text_loading(false)
                                  this.after_loading(false)
                                  this.width_increase(false)
                                  this.full_width(false)
                                  this.header_text(false)
                                  this.loading_text(false)
                                  this.width_decrese(false)
                                  this.slide_right(false)
                                  this.slide_full_right(false)
                                }, 1000)
                              }, 300)
                            }, 500)
                          }, 1800)
                        }, 800)
                      }, 800)
                    }, 800)
                  }, 600)
                }, 500)
              }, 0)
            }, 0)
          }, 800)
        }, 200)
      }, 600)

      this.set_header_width(false)
      this.setIsSticky(false)
    },
    async getAllUsers() {
      try {
        const { success, data } = await this.$axios.$get(NEW_USER)
        if (success) {
          this.allUsers = data.friends
          this.owner = data.owner
        }
      } catch (err) {
        console.log(err)
      }
    },
    mobileBlur() {
      this.$store.dispatch('mobile/header/showOverlay')
    },
    showBlur() {
      this.$store.dispatch('mobile/header/showOverlay')
    },
    deleteCard(cardId) {
      this.showDeleteAlert = true
      this.deletedCardId = cardId
    },
    deleteCancel() {
      this.showDeleteAlert = false
      this.deletedCardId = ''
    },
    async deleteConfirm() {
      this.$toast.clear()
      try {
        this.cardDeleteProcess = true
        const response = await this.$axios.$delete(PAYMENT_METHOD, {
          data: {
            id: this.deletedCardId,
          },
        })
        if (response.success) {
          this.$toast.success(response.message, {
            className: ['toasted-bg-archive'],
          })
          this.billingInfoList = this.billingInfoList.filter((item) => {
            return item.id !== this.deletedCardId
          })
        } else {
          this.$toast.error(response.message, {
            className: ['toasted-bg-alert'],
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.showDeleteAlert = false
        this.deletedCardId = ''
        this.cardDeleteProcess = false
      }
    },
    ...mapActions({
      setIsSticky: 'set_sticky',
      set_header_width: 'set_header_width',
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',

      login_button_transition: 'loginAnimation/login_button_transition',
      submit_button_transition: 'loginAnimation/submit_button_transition',
      login_form_transition: 'loginAnimation/login_form_transition',
      successfully: 'loginAnimation/successfully',
      after_loading: 'loginAnimation/after_loading',
      home_modal: 'loginAnimation/home',
      sidebar_menu: 'loginAnimation/sidebar_menu',
      sidebar_circle: 'loginAnimation/circle',
      home_sidebar: 'loginAnimation/sidebar',
      home_circle: 'loginAnimation/home_circle',
      login_circle: 'loginAnimation/login_circle',
      slide_left: 'loginAnimation/slide_left',
      show_logo: 'loginAnimation/show_logo',
      home_header: 'loginAnimation/header',
      width_increase: 'loginAnimation/width_increase',
      full_width: 'loginAnimation/full_width',
      home_side_menu: 'loginAnimation/home_side_menu',
      all_side_menu: 'loginAnimation/all_side_menu',
      show_home: 'loginAnimation/show_home',
      home_menu_text: 'loginAnimation/home_menu_text',
      show_home_content: 'loginAnimation/show_home_content',
      home_wrapper: 'loginAnimation/home_wrapper',
      show_logo_text: 'loginAnimation/show_logo_text',
      header_text: 'loginAnimation/header_text',
      loading_text: 'loginAnimation/loading_text',

      width_decrese: 'loginAnimation/width_decrese',
      slide_right: 'loginAnimation/slide_right',
      slide_full_right: 'loginAnimation/slide_full_right',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
      after_logout: 'loginAnimation/after_logout',
      text_loading: 'loginAnimation/text_loading',
    }),
  },
})
</script>

<style lang="scss" scoped>
.toggle-icon {
  color: #ffffff;
  svg {
    @apply md:text-3xl text-2xl;
  }
}
#resizeIcon {
  cursor: row-resize;
}
.card-wrapper {
  @apply overflow-y-auto scroll md:pt-4 relative md:space-y-5 space-y-2 h-full;
  // min-height: 900px;
}
.mobile-card-wrapper {
  @apply overflow-y-auto scroll md:pt-4 relative md:space-y-8 space-y-2 h-full;
  // min-height: 700px;
}
.card {
  @apply bg-white rounded-3xl overflow-hidden flex flex-col;
}
.card-header {
  @apply bg-yellow-midlight text-center h-11 py-1.5;
  min-height: 44px;
}
.card-title {
  @apply md:text-white text-offwhite-200 font-bold md:text-xl text-md;
}
.inner-body-height {
  height: calc(100% - 44px);
  @apply flex flex-col;
}
.card-body {
  @apply overflow-auto scroll flex-grow;
}
.userinfo {
  height: calc(100% - 52px);
}
.web-user_info {
  height: calc(100% - 72px);
}
.web-billing_height {
  height: calc(100% - 42px);
}
.web-billing_info {
  height: calc(100% - 72px);
}
.billing_info_height {
  height: calc(100% - 44px);
}
.billing_info {
  height: calc(100% - 64px);
}
.expnad-height {
  height: calc(100% - 64px);
}
.collapse-height {
  height: 44px;
}
.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 md:font-bold md:text-gray-1200 text-yellow-midlight text-left md:text-lg text-md pr-10 whitespace-nowrap;
}
.table-body {
  @apply flex items-center justify-start md:space-x-5 w-full md:py-1 py-0.5;
}
.table-tr {
  @apply md:px-6 px-6 md:py-2 py-1.5 text-left whitespace-nowrap;
}
.action-icon {
  @apply pl-5;
}
.table-tr span {
  @apply text-gray-light xl:text-xl md:text-lg text-md;
}
.card-footer {
  @apply text-right lg:pb-6 pb-2 md:mr-2;
}
.footer-btn {
  @apply focus:outline-none rounded-full
  border-2 border-yellow-midlight py-1 lg:px-5 md:px-2 px-2 text-center text-white
  bg-yellow-midlight font-bold md:text-lg
  text-sm;
}
//Small Device
.mobile-card-body {
  @apply overflow-auto scroll bg-white rounded-2xl py-2 px-2 h-full;
}
.mobile-table-th {
  @apply px-3 py-1 text-left text-yellow-midlight tracking-wider whitespace-nowrap text-xs;
}
.mobile-table-body {
  @apply w-full py-0.5;
}
.mobile-table-td {
  @apply px-3 pl-0 text-gray-900 whitespace-nowrap text-sm;
}
.mb-bill-table-th {
  @apply font-bold text-yellow-midlight text-left w-3/12 break-all text-md;
}
.mb-bill-table-tr {
  @apply text-gray-600 w-3/12 break-all text-xs;
}
.mobile-text-size {
  font-size: 8px;
  text-align: center;
}
.min-width-6 {
  min-width: 6rem;
}
.min-width-8 {
  min-width: 9rem;
}
.min-width-10 {
  min-width: 10rem;
}
.min-width-12 {
  min-width: 12rem;
}
.min-width-16 {
  min-width: 16rem;
}
.min-width-20 {
  min-width: 20rem;
}
.min-width-41 {
  min-width: 55rem;
}
.min-width-55 {
  min-width: 67rem;
}
.min-width-34 {
  min-width: 34rem;
}
.tooltip {
  @apply invisible 
  break-all
  whitespace-normal 
  absolute 
  -top-5 
  left-4 
  z-50 
  bg-yellow-midlight 
  text-white 
  rounded 
  py-1 px-2 
  shadow-lg md:w-40 w-32;
}

.tooltip1 {
  @apply invisible 
  break-all
  whitespace-normal 
  -top-5 
  left-5 
  z-50 
  absolute 
  bg-yellow-midlight 
  text-white 
  rounded 
  py-1 px-2 
  shadow-lg md:w-44 w-32;
}

.has-tooltip:hover .tooltip {
  @apply visible;
}

.has-tooltip1:hover .tooltip1 {
  @apply visible;
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

[data-title]:after {
  color: #bb8b28;
  left: 100%;
  z-index: 9999999999;
  line-height: 18px;
}
[data-title].delete:after {
  line-height: 18px;
  color: red;
  left: 100%;
  z-index: 9999999999;
}
.marqueeStyle {
  display: inline-block;
  /* Apply animation to this element */
  -webkit-animation: scrolling-left1 20s linear infinite;
  animation: scrolling-left1 20s linear infinite;
}

@keyframes scrolling-left1 {
  0% {
    transform: translateX(100%);
    -webkit-transform: translateX(100%);
  }
  100% {
    transform: translateX(-110%);
    -webkit-transform: translateX(-110%);
  }
}

@-webkit-keyframes scrolling-left1 {
  0% {
    -webkit-transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-110%);
  }
}

@media (min-height: 470px) and (max-height: 750px) {
  .card-wrapper {
    // min-height: 900px;
  }
}
@media (max-height: 667px) {
  .billing_info {
    height: calc(100% - 84px);
  }
}
@media (max-width: 768px) {
  .expnad-height {
    height: calc(100% - 64px);
  }
  .collapse-height {
    height: 44px;
  }
}
</style>