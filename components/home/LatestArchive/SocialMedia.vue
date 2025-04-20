<template>
  <div class="scroll overflow-auto upper_wrapper lg:px-8 px-4 md:pb-10">
    <website-change-log
      v-if="currentComp === 'Websites'"
      class="lg:pt-8 pt-8"
      :table="websiteLog"
      :search-item="searchItem"
    ></website-change-log>
    <div
      v-if="loggedIn && currentComp !== 'Websites' && selectedFeed"
      class="w-full lg:pt-8 pt-8 sticky left-0"
    >
      <div class="w-full">
        <div class="flex flex-col items-center">
          <div
            :style="{ borderColor: globalColorPanel.backgroundColor }"
            class="w-24 h-24 rounded-full border-4"
          >
            <div class="w-20 h-20 rounded-full mx-auto mt-1">
              <template
                v-if="!selectedFeed.profilePic && !selectedFeed.profileImageUrl"
              >
                <facebook-icon
                  v-if="selectedFeed.provider === 'Facebook'"
                  class="w-20 h-20 rounded-full"
                ></facebook-icon>
                <linkedin-icon
                  v-if="selectedFeed.provider === 'LinkedIn'"
                  class="w-20 h-20 rounded-full"
                ></linkedin-icon>
                <twitter-icon
                  v-if="selectedFeed.provider === 'Twitter'"
                  class="w-20 h-20 rounded-full"
                ></twitter-icon>
                <instagram-icon
                  v-if="selectedFeed.provider === 'Instagram'"
                  class="w-20 h-20 rounded-full"
                ></instagram-icon>
                <gmail-icon
                  v-if="selectedFeed.provider === 'Google'"
                  :width="80"
                  :height="80"
                  class="w-20 h-20 rounded-full"
                ></gmail-icon>
                <microsoft-icon
                  v-if="selectedFeed.provider === 'Microsoft'"
                  class="w-20 h-20 rounded-full"
                ></microsoft-icon>
              </template>
              <img
                v-else
                class="w-20 h-20 rounded-full"
                :src="
                  selectedFeed.profilePic
                    ? selectedFeed.profilePic
                    : selectedFeed.profileImageUrl
                "
                :alt="
                  loggedIn
                    ? `${selectedFeed.name}'s SharpArchive Profile Image`
                    : ''
                "
              />
            </div>
          </div>
          <h1
            v-if="selectedFeed.name"
            class="
              text-orange-dark
              xl:text-2xl
              md:text-xl
              font-bold
              text-2xl
              md:pt-2
              pt-2
              text-center
            "
          >
            <span> {{ selectedFeed.name }}</span>
          </h1>
          <p
            v-if="selectedFeed.dateJoined || selectedFeed.createdAt"
            class="text-gray-light md:text-md font-normal text-sm pt-0.5"
          >
            <span>Connected Since:</span>
            <DateTime
              :datetime="
                selectedFeed.dateJoined
                  ? selectedFeed.dateJoined
                  : selectedFeed.createdAt
              "
              format="MMMM, dd yyyy, hh:mm aa"
              :show-time="false"
              class="table-span"
            />
          </p>
        </div>
        <div class="md:flex hidden flex-col mt-3.5">
          <div v-if="selectedFeed.title">
            <h4 class="text-orange-dark md:text-xl font-normal text-md">
              Title
            </h4>
            <p class="text-gray-light md:text-xl font-normal text-md">
              Senior Sales Reprehensive
            </p>
          </div>
          <div v-if="selectedFeed.email" class="mt-3.5">
            <h4 class="text-orange-dark md:text-xl font-normal text-md">
              Email
            </h4>
            <p class="text-gray-light md:text-xl font-normal text-md">
              {{ selectedFeed.email }}
            </p>
          </div>
          <div v-if="selectedFeed.address" class="mt-3.5">
            <h4 class="text-orange-dark md:text-xl font-normal text-md">
              Address
            </h4>
            <p class="text-gray-light md:text-xl font-normal text-md break-all">
              {{ selectedFeed.address }}
            </p>
          </div>
          <div v-if="selectedFeed.phone" class="mt-3.5">
            <h4 class="text-orange-dark md:text-xl font-normal text-md">
              Phone
            </h4>
            <p class="text-gray-light md:text-xl font-normal text-md">
              {{ selectedFeed.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="tableTitle">
        <p class="text-xl">All Feeds in Group</p>
      </div>
      <LatestArchiveSocialTable :table="tableData" :search-item="searchItem" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import defaultImage from '~/assets/img/users/default.jpg'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import GmailIcon from '~/components/shared/icon/GmailIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
import WebsiteChangeLog from '~/components/home/LatestArchive/WebsiteChangeLog.vue'
import LatestArchiveSocialTable from '~/components/home/LatestArchive/LatestArchiveSocialTable.vue'

export default {
  components: {
    LatestArchiveSocialTable,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
    GmailIcon,
    MicrosoftIcon,
    WebsiteChangeLog,
  },
  props: {
    tableData: {
      type: Object,
      default: () => {},
    },
    websiteLog: {
      type: Object,
      default: () => {},
    },
    searchItem: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      avatarPreview: '',
      image: defaultImage,
    }
  },
  computed: {
    ...mapState(['globalColorPanel']),
    ...mapGetters('home', ['currentComp', 'selectedFeed']),
    loggedIn() {
      return this.$auth.loggedIn
    },
    userInfo() {
      return this.$auth.user
    },
  },
}
</script>

<style scoped>
.upper_wrapper {
  height: calc(100% - 100px);
  /* height: calc(100% - 0px); */
}
.tableTitle {
  /* font-size: 1.563rem; */
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  letter-spacing: 0;
  color: #e4801d;
  margin-top: 28px;
}
</style>
