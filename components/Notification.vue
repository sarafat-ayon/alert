<template>
  <section>
    <div
      :style="{ '--color': globalColorPanel.backgroundColor }"
      class="
        right-0
        fixed
        bg-ash-dark
        md:px-21
        p-4
        md:pt-8
        profile
        transition-all
        duration-800
        ease-in-out
        overflow-y-auto
        scroll
        h-full
        md:top-0 md:rounded-l-2xl md:shadow-2xl
      "
      :class="[showNotificationModal ? 'show' : 'hide']"
    >
      <div class="h-full flex flex-wrap content-between">
        <div class="w-full card-height">
          <div class="flex flex-row items-center justify-between relative">
            <h2
              :style="{ color: globalColorPanel.backgroundColor }"
              class="xl:text-2xl md:text-xl md:font-bold text-xl"
            >
              Notifications
            </h2>
            <button
              class="w-8 h-8 flex items-center justify-end cursor-pointer"
              @click="closeModal()"
            >
              <fa
                :style="{ color: globalColorPanel.backgroundColor }"
                class="xl:w-6 xl:h-6 md:w-5 md:h-20 md:font-bold w-6 h-6"
                :icon="['fas', 'times']"
              />
            </button>
          </div>

          <div
            id="notificationContainer"
            class="
              flex flex-col
              my-5
              w-full
              h-full
              rounded-xl
              scroll
              overflow-y-auto overflow-x-hidden
            "
          >
            <template v-for="(notification, index) in getNotifications">
              <div
                :key="index"
                class="
                  flex
                  justify-between
                  w-full
                  py-1
                  my-0.5
                  space-x-2
                  rounded-full
                  px-2
                  items-center
                "
                :class="notificationBackground(notification)"
              >
                <div
                  class="
                    flex flex-row
                    justify-start
                    w-4/6
                    md:w-3/4
                    items-center
                  "
                >
                  <span
                    class="
                      md:text-md
                      text-sm
                      cursor-pointer
                      overflow-hidden
                      whitespace-nowrap
                      pt-0.5
                    "
                    @click="
                      user.userPermission !== 'User'
                        ? openMessage(notification)
                        : ''
                    "
                  >
                    {{ notification.message }}
                  </span>
                  <span class="pt-0.5">...</span>
                </div>
                <div
                  class="
                    flex flex-col
                    justify-center
                    items-end
                    space-y-2
                    w-2/6
                    md:w-1/4
                    whitespace-nowrap
                  "
                >
                  <p class="md:text-md text-sm pt-0.5">
                    {{ notification.createdAt | diffForHumansMinSec }} ago
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col mt-5 w-full rounded-xl">
            <div
              class="
                flex flex-row
                justify-center
                md:space-x-5
                space-x-2
                md:px-8
                px-2
                mt-8
              "
            >
              <button
                v-if="user.userPermission !== 'User'"
                :style="{
                  color: globalColorPanel.backgroundColor,
                  borderColor: globalColorPanel.backgroundColor,
                }"
                class="
                  focus:outline-none
                  w-44
                  h-10
                  bg-ash-dark
                  rounded-full
                  mr-2.5
                  border-2
                  outline-none
                  font-bold
                  md:text-base
                  text-sm
                "
                :disabled="readAllProcess && unreadNotificationCount > 0"
                @click="markAllRead"
              >
                <span>Mark All as Read</span>
              </button>
              <button
                :style="{
                  backgroundColor: globalColorPanel.backgroundColor,
                  borderColor: globalColorPanel.backgroundColor,
                }"
                class="
                  focus:outline-none
                  w-44
                  h-10
                  text-white
                  rounded-full
                  mr-2.5
                  border-2
                  outline-none
                  font-bold
                  md:text-base
                  text-sm
                "
                @click="activityLog()"
              >
                <span>Activity Log</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  Name: 'Notification',
  props: {
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
  },
  data() {
    return {
      readAllProcess: false,
      progress: false,
    }
  },
  computed: {
    ...mapState('notifications', [
      'showNotificationModal',
      'notifications',
      'emargencyCategory',
    ]),
    ...mapGetters('notifications', [
      'unreadNotificationCount',
      'isExistNotifications',
      'getNotifications',
    ]),
    user() {
      return this.$auth.user
    },
  },
  watch: {
    showNotificationModal(data) {
      if (data) {
        this.addScroll()
      } else {
        this.removeScroll()
      }
    },
  },
  mounted() {
    this.addScroll()
  },
  methods: {
    async loadMore(event) {
      const element = event.target
      if (
        parseInt(element.scrollHeight - element.scrollTop) <=
          element.clientHeight &&
        !this.progress &&
        this.isExistNotifications
      ) {
        if (!this.isExistNotifications) {
          this.$toast.clear()
          // return this.$toast.error('There are no notifications found!')
        }
        try {
          this.progress = true
          const res = await this.$store.dispatch(
            'notifications/getAllNotifications'
          )
          if (res.status !== 200) {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.progress = false
        }
      }
    },
    closeModal() {
      this.$store.dispatch('notifications/notificationModal', false)
    },
    addScroll() {
      const conatiner = document.getElementById('notificationContainer')
      conatiner.addEventListener('scroll', this.loadMore)
    },
    removeScroll() {
      const conatiner = document.getElementById('notificationContainer')
      conatiner.removeEventListener('scroll', this.loadMore)
    },
    hideBlur() {
      this.$store.dispatch('mobile/header/removeOverlay')
    },
    async openMessage(notification) {
      this.$store.commit('notifications/SHOW_NOTIFICATION_MESSAGE_MODAL', {
        title: 'Message',
        message: notification.message,
        show: true,
      })

      const res = await this.$store.dispatch(
        'notifications/readMeNotification',
        notification.id
      )
      this.$toast.clear()
      if (!res.success) {
        this.$toast.error(res.message, {
          className: ['toasted-bg-alert'],
        })
      }
    },
    notificationBackground(notification) {
      if (notification.category.toLowerCase() === this.emargencyCategory) {
        return notification.is_read
          ? 'text-offwhite-300'
          : 'bg-red-400 text-white'
      } else {
        return notification.is_read ? 'text-offwhite-300' : 'bg-blue-200'
      }
    },
    activityLog() {
      this.$store.dispatch('mobile/header/closeMobileHeader')
      this.$router.push('settings?#system')
      this.closeModal()
    },

    async markAllRead() {
      this.$toast.clear()
      if (this.unreadNotificationCount > 0) {
        try {
          this.readAllProcess = true
          const res = await this.$store.dispatch(
            'notifications/readAllNotifications'
          )
          if (res.status === 200) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.readAllProcess = false
        }
      } else {
        this.$toast.error('Your all notifications already read', {
          className: ['toasted-bg-alert'],
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$color: var(--color);
.profile {
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 100;
}

.card-height {
  height: calc(100% - 90px);
}

#notificationContainer {
  height: calc(100% - 45px);
}

.show {
  width: 500px;
  right: 0px;
}

.hide {
  width: 500px;
  right: -500px;
}

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 85%;
    right: -100%;
    border-radius: 0 0 1.563rem 1.563rem;
  }
  .show {
    right: 0%;
  }

  .hide {
    right: -100%;
  }
}

.scroll {
  overflow-x: hidden !important;
  scrollbar-color: $color #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: $color;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: $color;
  }
}
</style>
