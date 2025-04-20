<template>
  <div class="relative h-full">
    <template v-if="allMessagePersons && !showPersonSkeleton">
      <template v-if="allMessagePersons.items.length > 0">
        <div
          v-for="(person, index) in allMessagePersons.items"
          :key="index"
          class="SingleMessageWrapper mt-4 cursor-pointer"
          :class="index === allMessagePersons.items.length - 1 && homeCurrentComp === 'FullMessageFeed' ? 'pb-4' : ''"
        >
          <div
            class="flex rounded-md w-full relative"
            :class="person.selected ? 'bg-gray-soft' : ''"
            @click="getConvertions(allMessagePersons.provider, person)"
          >
            <div class="profileAvatar m-2">
              <img
                v-if="
                  person.participants[0].profileImageUrl &&
                  allMessagePersons.provider === 'Facebook'
                "
                class="
                  w-20
                  h-20
                  rounded-full
                  object-cover
                  border border-gray-400
                "
                :src="person.participants[0].profileImageUrl"
                :alt="`${person.participants[0].name}'s Profile Picture`"
              />
              <img
                v-else-if="
                  person.participants[1].profileImageUrl &&
                  allMessagePersons.provider === 'Instagram'
                "
                class="
                  w-20
                  h-20
                  rounded-full
                  object-cover
                  border border-gray-400
                "
                :src="person.participants[1].profileImageUrl"
                :alt="`${person.participants[1].name}'s Profile Picture`"
              />
              <template v-else>
                <div
                  v-if="allMessagePersons.provider === 'Facebook'"
                  class="w-20 h-20 rounded-full"
                >
                  <facebook-icon
                    class="w-20 h-20 border border-gray-400"
                  ></facebook-icon>
                </div>
                <instagram-icon
                  v-if="allMessagePersons.provider === 'Instagram'"
                  class="w-20 h-20 border border-gray-400"
                ></instagram-icon>
                <div
                  v-if="allMessagePersons.provider === 'Twitter'"
                  class="w-20 h-20 rounded-full"
                >
                  <twitter-icon
                    class="w-20 h-20 border border-gray-400"
                  ></twitter-icon>
                </div>
                <div
                  v-if="allMessagePersons.provider === 'LinkedIn'"
                  class="w-20 h-20 rounded-full"
                >
                  <linkedin-icon
                    class="w-20 h-20 border border-gray-400"
                  ></linkedin-icon>
                </div>
              </template>
            </div>
            <div class="messageInfo self-center text-base 2xl:text-xl w-full">
              <div class="userDetails flex flex-nowrap justify-between w-full">
                <div class="name text-gray-light line-clamp-1">
                  {{
                    person.participants[0].name
                      ? person.participants[0].name
                      : person.name
                  }}
                </div>
                <div
                  v-if="person.unreadCount || person.unreadCount > 0"
                  class="text-md px-4 flex items-center"
                >
                  <div
                    class="
                      w-6
                      h-6
                      rounded-full
                      bg-red-500
                      text-white
                      flex
                      justify-center
                      items-center
                      shadow-md
                    "
                  >
                    <span>{{ person.unreadCount }}</span>
                  </div>
                </div>
                <!-- <div class="userName text-gray-1500">@april25</div> -->
              </div>
              <div
                class="
                  messageDetails
                  text-gray-1700
                  flex
                  space-x-1
                  justify-between
                  w-full
                "
              >
                <div class="message flex line-clamp-1 break-all">
                  <span>{{ person.snippet }}</span>
                  <!-- <span>...</span> -->
                </div>
                <div
                  class="
                    time
                    whitespace-nowrap
                    pr-4
                    flex
                    space-x-1
                    items-center
                    h-6
                  "
                >
                  <span class="text-xl pb-2.5">.</span
                  ><span>
                    {{ person.updatedAt | diffForHumansMessageFeed }}</span
                  >
                </div>
              </div>
            </div>
            <!-- <div
              v-if="person.unreadCount || person.unreadCount > 0"
              class="text-xl px-4 flex items-center"
            >
              <div
                class="
                  w-7
                  h-7
                  rounded-full
                  bg-red-500
                  text-white
                  flex
                  justify-center
                  items-center
                  shadow-md
                "
              >
                <span>{{ person.unreadCount }}</span>
              </div>
              <div class="w-10 h-10 relative">
                <fa
                  class="w-10 h-10 text-orange-dark"
                  :icon="['fa', 'envelope-open-text']"
                />
                <div
                  class="
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-white
                    flex
                    justify-center
                    items-center
                    absolute
                    top-0
                    right-0
                  "
                >
                  <span>{{ person.unreadCount }}</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </template>
      <div v-else class="h-full">
        <div
          class="
            flex
            justify-center
            items-center
            w-full
            message-height
            text-gray-1000 text-lg
            font-semibold
          "
        >
          <p>No data found</p>
        </div>
      </div>
    </template>
    <template v-if="showPersonSkeleton">
      <div
        v-for="person in 5"
        :key="person"
        class="SingleMessageWrapper mt-4 cursor-pointer animate-pulse"
      >
        <div class="flex rounded-md w-full bg-gray-1500">
          <div class="profileAvatar m-2">
            <div
              class="
                w-20
                h-20
                rounded-full
                object-cover
                border border-gray-400
                bg-white
              "
            ></div>
          </div>
          <div class="messageInfo self-center text-base 2xl:text-xl w-full">
            <div class="userDetails flex">
              <div class="name h-6 w-20 bg-white"></div>
            </div>
            <div
              class="messageDetails flex space-x-4 justify-between w-full mt-2"
            >
              <div class="message flex bg-white h-6 w-1/2"></div>
              <div class="time whitespace-nowrap pr-4">
                <p class="bg-white h-6 w-6"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
// import TextMessage from './TextMessage.vue'
export default {
  components: {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
  },
  data() {
    return {
      // searchText: '',
      placeholder: 'Search',
      showMessage: true,
      timeId: 0,
    }
  },
  computed: {
    ...mapState('home', ['allMessagePersons', 'showPersonSkeleton', 'homeCurrentComp']),
    // searchText: {
    //   get() {
    //     return this.$store.state.home.searchText
    //   },
    //   set(newValue) {
    //     this.$store.commit('home/SET_SEARCH_TEXT', newValue)
    //   },
    // },
  },
  methods: {
    // submit() {
    //   this.$emit('clickSearch', this.searchText)
    // },
    getConvertions(provider, person) {
      this.$emit('show-hide')
      this.$store.dispatch('home/getSingleConvertions', {
        provider,
        person,
      })
    },
    searchPerson: debounce(function () {
      this.$store.dispatch('home/getSearchPerson', this.searchText)
    }, 500),
  },
}
</script>

<style lang="scss" scoped>
.body-height {
  height: calc(100% - 115px);
}
.profileAvatar {
  min-width: 80px;
  max-width: 80px;
}

input::placeholder {
  opacity: 0.5;
  font-size: 18px;
}

.scroll {
  overflow-y: auto;
  overflow-x: auto;
  /* this will hide the scrollbar in mozilla based browsers */
  // overflow: -moz-scrollbars-none;
  /* this will hide the scrollbar in internet explorers */
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: 6px !important; /* Firefox 64 */
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ff8308;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8308;
  }
}
.message-height {
  height: calc(100% - 10px);
}
.max-width-66 {
  max-width: 50%;
}
</style>