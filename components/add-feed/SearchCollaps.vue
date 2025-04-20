<template>
  <div class="h-full">
    <div class="flex flex-col h-4/5 mt-4 w-full">
      <div class="w-full flex items-center relative mb-2 lg:mb-0">
        <fa
          class="text-yellow-midlight absolute ml-3 w-5 search-icon"
          :icon="['fas', 'search']"
        />
        <input
          id="maycontain"
          v-model="mayContain"
          type="text"
          placeholder="Search"
          class="
            text-yellow-midlight
            w-full
            rounded-full
            py-1
            px-2.5
            pl-8
            outline-none
            focus:outline-none
            bg-white
            border-b border-white
            placeholder-yellow-midlight placeholder-opacity-50
          "
        />
      </div>
      <div
        class="
          card_table
          w-full
          mt-2
          p-5
          bg-yellow-midlight
          rounded-2xl
          flex flex-col flex-grow
          h-full
        "
      >
        <div class="table_header w-full rounded-t-2xl">
          <h2 class="text-base text-white">Possible Matches</h2>
        </div>
        <div class="flex flex-col h-full overflow-auto scroll mt-2">
          <div class="single-feed-wrapper">
            <div class="feed-single-item bg-white">
              <section class="feed-left">
                <img class="avatar" :src="twitter" alt="" />
                <img class="avatar" src="" alt="" />
              </section>
              <section class="feed-right">
                <h3 class="2xl:text-md text-sm">Mr.Jon Smith</h3>
                <p class="2xl:text-md text-xs text-gray-400">
                  jonsmith@gmail.com
                </p>
              </section>
            </div>
            <div class="pass-send-mail-wrapper mt-2 mb-4">
              <div class="flex flex-col">
                <div
                  class="
                    w-full
                    h-9
                    flex flex-row
                    items-center
                    rounded-full
                    px-2
                    bg-white
                  "
                >
                  <input
                    class="
                      text-center
                      outline-none
                      rounded-full
                      bg-white
                      w-full
                      h-full
                      placeholder-yellow-midlight placeholder-opacity-50
                    "
                    type="text"
                    placeholder="Enter Password"
                  />
                </div>
                <p class="text-center text-white py-5">
                  Or <br />
                  Send Access Request
                </p>
                <div
                  class="
                    text-center
                    w-full
                    h-9
                    flex flex-row
                    items-center
                    rounded-full
                    px-2
                    bg-white
                  "
                >
                  <input
                    class="
                      text-center
                      outline-none
                      rounded-full
                      bg-white
                      w-full
                      h-full
                      placeholder-yellow-midlight placeholder-opacity-50
                    "
                    type="text"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="feed-single-item bg-white">
            <section class="feed-left">
              <img class="avatar" :src="facebook" alt="" />
              <img class="avatar" src="" alt="" />
            </section>
            <section class="feed-right">
              <h3 class="2xl:text-md text-sm">Mr.Jon Smith</h3>
              <p class="2xl:text-md text-xs text-gray-400">
                jonsmith@gmail.com
              </p>
            </section>
          </div>
          <div class="feed-single-item bg-white">
            <section class="feed-left">
              <img class="avatar" :src="facebook" alt="" />
              <img class="avatar" src="" alt="" />
            </section>
            <section class="feed-right">
              <h3 class="2xl:text-md text-sm">Mr.Jon Smith</h3>
              <p class="2xl:text-md text-xs text-gray-400">
                jonsmith@gmail.com
              </p>
            </section>
          </div>
          <div class="feed-single-item bg-white">
            <section class="feed-left">
              <img class="avatar" :src="facebook" alt="" />
              <img class="avatar" src="" alt="" />
            </section>
            <section class="feed-right">
              <h3 class="2xl:text-md text-sm">Mr.Jon Smith</h3>
              <p class="2xl:text-md text-xs text-gray-400">
                jonsmith@gmail.com
              </p>
            </section>
          </div>
        </div>
        <div class="feeds-action">
          <button class="load-more" @click="loadMoreFeeds">Load more...</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Facebook from '~/assets/img/icon/facebook.png'
import Twitter from '~/assets/img/icon/twitter.png'
export default {
  data() {
    return {
      facebook: Facebook,
      twitter: Twitter,
    }
  },
}
</script>

<style lang="scss" scoped>
.feed-single-item {
  @apply w-full cursor-pointer flex items-center justify-between space-x-2 rounded-xl py-2 px-5 my-1;
  .feed-left {
    @apply flex space-x-2;
    .avatar {
      @apply 2xl:w-9 2xl:h-9 w-7 h-7 rounded-full object-cover;
    }
  }
  .feed-right {
    @apply flex-grow text-left;
  }
}
.feeds-action {
  @apply w-full p-2 text-center text-white;
}

.scroll {
  scrollbar-color: #bb8b28 #ececec; /* Firefox 64 */
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #af9035;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #af9035;
  }
}
</style>
