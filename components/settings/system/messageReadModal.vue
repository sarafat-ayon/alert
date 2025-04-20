<template>
  <div
    class="
      close_account
      fixed
      inset-x-0
      top-0
      h-screen
      flex
      items-center
      justify-center
      backdrop-filter
    "
    @click.stop="closeModal()"
  >
    <div
      class="
        z-9999
        bg-dark-100
        shadow-xl
        rounded-lg
        flex flex-col
        xl:w-2/5
        lg:w-3/5
        md:w-4/5
        w-5/6
        p-5
      "
      @click.stop=""
    >
      <div class="card-header w-full p-4">
        <div class="w-full flex items-center justify-between">
          <h2 
            :style="{ color: globalColorPanel.backgroundColor }"
            class="text-3xl">
            {{ message.title }}
          </h2>
          <fa
            :style="{ color: globalColorPanel.backgroundColor }"
            class="
              xl:text-2xl
              md:text-xl
              text-2xl
              font-normal
              cursor-pointer
            "
            :icon="['fas', 'times']"
            @click.stop="closeModal()"
          />
        </div>
      </div>
      <div class="card-body w-full px-4 pb-6 overflow-y-scroll scroll">
        <div
          class="
            md:text-xl
            text-lg text-white
            w-full
            h-full
            overflow-y-scroll
            scroll
          "
          v-html="message.message"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { CLOSE_ACCOUNT_INFO } from '~/constants/urls'
import { mapState } from 'vuex'
export default {
  name: 'StartArchivingModal',
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['globalColorPanel']),
  },
  methods: {
    closeModal() {
      this.$store.commit('notifications/SHOW_NOTIFICATION_MESSAGE_MODAL', {
        title: '',
        message: '',
        show: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$color: var(--color);
.close_account {
  z-index: 102;
}

.w-100-minues {
  width: calc(100% - 75px);
}

@media (max-width: 767px) {
  .w-100-minues {
    width: calc(100% - 35px);
  }
}

.btn-max-w {
  max-width: 250px;
}

.scroll {
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
