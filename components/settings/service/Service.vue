<template>
  <section class="w-full h-full">
    <div class="hidden h-full pt-4 md:flex md:flex-col card-wrapper px-2">
      <div class="web-card" :class="[betaVersion ? 'h-3/5' : 'h-full']">
        <div class="card-header">
          <h3 class="card-title">Social Media</h3>
        </div>
        <div class="card-body scroll">
          <table class="min-w-full table-wrapper">
            <thead>
              <tr class="bg-yellow-moreLight border-b">
                <th
                  v-if="user.userPermission !== 'User'"
                  scope="col"
                  class="table-th"
                >
                  <strong>Edit</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Source</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Name</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Username</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Start Date</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Connection Expiration</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Status</strong>
                </th>
                <th scope="col" class="table-th">
                  <strong>Accounts Type</strong>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(social, index) in socialFeeds"
                :key="index + 'social-web'"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
              >
                <td
                  v-if="user.userPermission !== 'User'"
                  class="table-td flex items-center action-icon"
                >
                  <div class="flex items-center space-x-3">
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
                      @click="editFeed(social, $event)"
                    >
                      <div
                        class="
                          w-4
                          h-4
                          bg-yellow-midlight
                          relative
                          rounded-full
                          flex
                          items-end
                        "
                      >
                        <edit-icon></edit-icon>
                      </div>
                    </a>
                    <!-- <a data-title="Delete" class="delete">
                      <fa
                        class="text-red-600 text-md cursor-pointer"
                        :icon="['fas', 'times-circle']"
                        @click="deleteSocial(social.id)"
                      />
                    </a> -->
                    <div v-if="betaVersion">
                      <div
                        class="toggle-wrapper"
                        @click="
                          socialStatusChange(social.status, social.id, $event)
                        "
                      >
                        <input
                          :checked="social.status"
                          type="checkbox"
                          name="toggle"
                          class="toggle-input"
                        />
                        <label class="toggle-input-label toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="table-td">
                  <span class="table-span">{{ social.provider }}</span>
                </td>
                <td class="table-td text-left">
                  <div class="flex items-center space-x-2">
                    <img
                      v-if="social.profilePic"
                      class="
                        min-w-7
                        w-7
                        h-7
                        rounded-full
                        object-cover
                        border border-gray-400
                      "
                      :src="[social.profilePic ? social.profilePic : 'sdfg']"
                      :alt="`${social.name}'s ${social.provider} Profile Picture`"
                    />
                    <template v-else>
                      <div
                        v-if="social.provider === 'Facebook'"
                        class="min-w-7 w-7 h-7 rounded-full"
                      >
                        <facebook-icon
                          class="min-w-7 w-7 h-7 border border-gray-400"
                        ></facebook-icon>
                      </div>
                      <instagram-icon
                        v-if="social.provider === 'Instagram'"
                        class="min-w-7 w-7 h-7 border border-gray-400"
                      ></instagram-icon>
                      <div
                        v-if="social.provider === 'Twitter'"
                        class="min-w-7 w-7 h-7 rounded-full"
                      >
                        <twitter-icon
                          class="min-w-7 w-7 h-7 border border-gray-400"
                        ></twitter-icon>
                      </div>
                      <div
                        v-if="social.provider === 'LinkedIn'"
                        class="min-w-7 w-7 h-7 rounded-full"
                      >
                        <linkedin-icon
                          class="min-w-7 w-7 h-7 border border-gray-400"
                        ></linkedin-icon>
                      </div>
                      <div
                        v-if="social.provider === 'Google'"
                        class="min-w-7 w-7 h-7 rounded-full"
                      >
                        <gmail-icon
                          class="min-w-7 w-7 h-7 border border-gray-400"
                        ></gmail-icon>
                      </div>
                      <div
                        v-if="social.provider === 'Microsoft'"
                        class="min-w-7 w-7 h-7 rounded-full"
                      >
                        <microsoft-icon
                          class="
                            min-w-7
                            w-7
                            h-7
                            border border-gray-400
                            rounded-full
                          "
                        ></microsoft-icon>
                      </div>
                    </template>
                    <div class="w-full">
                      <span class="table-span whitespace-nowrap">
                        {{ social.name }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="table-td text-left">
                  <div class="flex items-center space-x-2">
                    <!-- <div
                      v-if="
                        social.provider === 'Facebook' && !social.profilePic
                      "
                      class="min-w-7 w-7 h-7 rounded-full"
                    >
                      <facebook-icon
                        class="min-w-7 w-7 h-7 border border-gray-400"
                      ></facebook-icon>
                    </div>
                    <instagram-icon
                      v-if="
                        social.provider === 'Instagram' && !social.profilePic
                      "
                      class="min-w-7 w-7 h-7 border border-gray-400"
                    ></instagram-icon>
                    <div
                      v-if="social.provider === 'Twitter' && !social.profilePic"
                      class="min-w-7 w-7 h-7 rounded-full"
                    >
                      <twitter-icon
                        class="min-w-7 w-7 h-7 border border-gray-400"
                      ></twitter-icon>
                    </div>
                    <div
                      v-if="
                        social.provider === 'LinkedIn' && !social.profilePic
                      "
                      class="min-w-7 w-7 h-7 rounded-full"
                    >
                      <linkedin-icon
                        class="min-w-7 w-7 h-7 border border-gray-400"
                      ></linkedin-icon>
                    </div> -->
                    <!-- <img
                      v-if="social.profilePic"
                      class="
                        min-w-7
                        w-7
                        h-7
                        rounded-full
                        object-cover
                        border border-gray-400
                      "
                      :src="[social.profilePic ? social.profilePic : 'sdfg']"
                      alt
                    /> -->
                    <div class="w-full">
                      <span class="table-span whitespace-nowrap">
                        {{ social.username | atSignUsername }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="table-td">
                  <DateTime
                    :datetime="social.dateJoined"
                    format="MMMM, dd yyyy, hh:mm aa"
                    :show-time="false"
                    class="table-span"
                  />
                </td>
                <td class="table-td">
                  <DateTime
                    :datetime="social.expireTime"
                    format="MMMM, dd yyyy, hh:mm aa"
                    :show-time="false"
                    class="table-span"
                  />
                </td>
                <td class="table-td text-left relative has-tooltip">
                  <span v-if="social.status" class="table-span">
                    {{ social.status | strLimit(20) }}
                  </span>
                  <span v-if="social.status.length > 20" class="tooltip">{{
                    social.status
                  }}</span>
                </td>
                <td class="table-td text-left">
                  <span class="table-span">
                    {{ social.isOwner ? 'Owner' : 'Guest' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--website section-->
      <div v-if="betaVersion" class="web-card h-2/5 mt-8">
        <div class="card-header">
          <h3 class="card-title">Websites</h3>
        </div>
        <div class="card-body scroll">
          <div class="table-wrapper">
            <div
              class="
                flex
                items-center
                justify-start
                w-full
                min-width-100
                space-x-5
                sticky
                -top-0.5
                bg-white
                z-10
              "
            >
              <div class="table-th w-1/12 min-width-10">
                <strong>Active</strong>
              </div>
              <div class="table-th w-2/12 min-width-15">
                <strong>URL</strong>
              </div>
              <div class="table-th w-1/12 min-width-10">
                <strong>Title</strong>
              </div>
              <div class="table-th w-2/12 min-width-15">
                <strong>Formats</strong>
              </div>
              <div class="table-th w-2/12 min-width-15">
                <strong>Destination</strong>
              </div>
              <div class="table-th w-2/12 min-width-15">
                <strong>Stored here</strong>
              </div>
              <div class="table-th w-1/12 min-width-10">
                <strong>Price</strong>
              </div>
            </div>

            <div class="body w-full">
              <div
                v-for="(website, index) in websites"
                :key="index + 'website-web'"
                class="flex justify-start md:space-x-5 min-width-100 md:py-0.5"
              >
                <div class="table-td w-1/12 min-width-10">
                  <div class="flex items-center space-x-3">
                    <a data-title="Edit">
                      <div
                        class="w-4 h-4 bg-yellow-midlight relative rounded-full"
                      >
                        <fa
                          class="
                            text-white text-sm
                            p-0.5
                            cursor-pointer
                            absolute
                            left-1/2
                            top-1/2
                            transform
                            -translate-x-1/2 -translate-y-1/2
                          "
                          :icon="['fas', 'pencil-alt']"
                          @click="websiteEditFeed(website.id)"
                        />
                      </div>
                    </a>
                    <a data-title="Delete" class="delete">
                      <fa
                        class="text-red-600 text-md cursor-pointer"
                        :icon="['fas', 'times-circle']"
                        @click="deleteWebsite(website.id)"
                      />
                    </a>
                    <div>
                      <div
                        class="toggle-wrapper"
                        @click="
                          websiteStatusChange(
                            website.status,
                            website.id,
                            $event
                          )
                        "
                      >
                        <input
                          :checked="website.status"
                          type="checkbox"
                          name="toggle"
                          class="toggle-input"
                        />
                        <label class="toggle-input-label toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-td w-2/12 min-width-15 relative has-tooltip">
                  <span class="table-span">
                    {{ website.sourceName | strLimit(18) }}
                  </span>
                  <span
                    v-if="website.sourceName.length > 18"
                    class="tooltip rounded-xl xl:text-xl md:text-lg text-md"
                    >{{ website.sourceName }}</span
                  >
                </div>
                <div class="table-td w-1/12 min-width-10 relative has-tooltip">
                  <span class="table-span">{{
                    website.name | strLimit(18)
                  }}</span>
                  <span
                    v-if="website.name.length > 18"
                    class="tooltip rounded-xl xl:text-xl md:text-lg text-md"
                    >{{ website.name }}</span
                  >
                </div>
                <div class="table-td w-2/12 min-width-15">
                  <span class="table-span">{{ website.fileFormats }}</span>
                </div>
                <div class="table-td w-2/12 min-width-15 relative has-tooltip">
                  <span class="table-span">
                    {{ website.destination | strLimit(18) }}
                  </span>
                  <span
                    v-if="website.destination.length > 18"
                    class="tooltip rounded-xl xl:text-xl md:text-lg text-md"
                    >{{ website.destination }}</span
                  >
                </div>
                <div class="table-td w-2/12 min-width-15">
                  <span class="table-span">{{ website.storedHere }}</span>
                </div>
                <div class="table-td w-1/12 min-width-10">
                  <span class="table-span">${{ website.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span v-if="betaVersion" class="text-right mt-4 text-yellow-midlight"
        >Including the $32.00 Base Cost, Your New Monthly Amount Will be
        $47.25</span
      >
    </div>

    <!--small device-->
    <div class="md:hidden h-full space-y-2 flex flex-col mobile-card-wrapper">
      <div class="card" :class="[betaVersion ? 'h-3/5' : 'h-full']">
        <div class="card-header">
          <h3 class="card-title">Social Media</h3>
        </div>
        <div class="mobile-card-body scroll">
          <table class="min-w-full table-wrapper">
            <thead>
              <tr class="bg-yellow-moreLight border-b">
                <td v-if="user.userPermission !== 'User'" class="table-th">
                  <span>Edit</span>
                </td>
                <td class="table-th">
                  <span>Source</span>
                </td>
                <td class="table-th">
                  <span>Name</span>
                </td>
                <td class="table-th">
                  <span>Username</span>
                </td>
                <td class="table-th">
                  <span>Start Date</span>
                </td>
                <td class="table-th">
                  <span>Connection Expiration</span>
                </td>
                <td class="table-th">
                  <span>Status</span>
                </td>
                <td class="table-th">
                  <span>Accounts Type</span>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(social, index) in socialFeeds"
                :key="index + 'social-small'"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-default'"
              >
                <td
                  v-if="user.userPermission !== 'User'"
                  class="table-td flex items-center action-icon"
                >
                  <div class="flex items-center space-x-3">
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
                      @click="editFeed(social, $event)"
                    >
                      <div
                        class="w-4 h-4 bg-yellow-midlight relative rounded-full"
                      >
                        <edit-icon></edit-icon>
                      </div>
                    </a>
                    <!-- <a data-title="Delete" class="delete">
                      <fa
                        class="text-red-600 text-md cursor-pointer"
                        :icon="['fas', 'times-circle']"
                        @click="deleteSocial(social.id)"
                      />
                    </a> -->
                    <div v-if="betaVersion">
                      <div
                        class="toggle-wrapper"
                        @click="
                          socialStatusChange(social.status, social.id, $event)
                        "
                      >
                        <input
                          :checked="social.status"
                          type="checkbox"
                          name="toggle"
                          class="toggle-input"
                        />
                        <label class="toggle-input-label toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="table-td">
                  <span class="table-span">{{ social.provider }}</span>
                </td>
                <td class="table-td text-left">
                  <div class="flex items-center space-x-2 h-full">
                    <img
                      v-if="social.profilePic"
                      class="
                        min-w-5
                        w-5
                        h-5
                        rounded-full
                        object-cover
                        border border-gray-400
                      "
                      :src="[social.profilePic ? social.profilePic : '']"
                      :alt="`${social.name}'s ${social.provider} Profile Picture`"
                    />
                    <template v-else>
                      <div
                        v-if="social.provider === 'Facebook'"
                        class="min-w-5 w-5 h-5 rounded-full"
                      >
                        <facebook-icon
                          class="min-w-5 w-5 h-5 border border-gray-400"
                        ></facebook-icon>
                      </div>
                      <instagram-icon
                        v-if="social.provider === 'Instagram'"
                        class="min-w-5 w-5 h-5 border border-gray-400"
                      ></instagram-icon>
                      <div
                        v-if="social.provider === 'Twitter'"
                        class="min-w-5 w-5 h-5 rounded-full"
                      >
                        <twitter-icon
                          class="min-w-5 w-5 h-5 border border-gray-400"
                        ></twitter-icon>
                      </div>
                      <div
                        v-if="social.provider === 'LinkedIn'"
                        class="min-w-5 w-5 h-5 rounded-full"
                      >
                        <linkedin-icon
                          class="min-w-5 w-5 h-5 border border-gray-400"
                        ></linkedin-icon>
                      </div>
                      <div
                        v-if="social.provider === 'Google'"
                        class="min-w-5 w-5 h-5 rounded-full"
                      >
                        <gmail-icon
                          class="min-w-5 w-5 h-5 border border-gray-400"
                        ></gmail-icon>
                      </div>
                      <div
                        v-if="social.provider === 'Microsoft'"
                        class="min-w-5 w-5 h-5 rounded-full"
                      >
                        <microsoft-icon
                          class="
                            min-w-5
                            w-5
                            h-5
                            border border-gray-400
                            rounded-full
                          "
                        ></microsoft-icon>
                      </div>
                    </template>
                    <div class="w-full">
                      <span class="table-span whitespace-nowrap">
                        {{ social.name }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="table-td text-left">
                  <div class="flex items-center space-x-2">
                    <!-- <div
                      v-if="
                        social.provider === 'Facebook' && !social.profilePic
                      "
                      class="min-w-5 w-5 h-5 rounded-full"
                    >
                      <facebook-icon
                        class="min-w-5 w-5 h-5 border border-gray-400"
                      ></facebook-icon>
                    </div>
                    <instagram-icon
                      v-if="
                        social.provider === 'Instagram' && !social.profilePic
                      "
                      class="min-w-5 w-5 h-5 border border-gray-400"
                    ></instagram-icon>
                    <div
                      v-if="social.provider === 'Twitter' && !social.profilePic"
                      class="min-w-5 w-5 h-5 rounded-full"
                    >
                      <twitter-icon
                        class="min-w-5 w-5 h-5 border border-gray-400"
                      ></twitter-icon>
                    </div>
                    <div
                      v-if="
                        social.provider === 'LinkedIn' && !social.profilePic
                      "
                      class="min-w-5 w-5 h-5 rounded-full"
                    >
                      <linkedin-icon
                        class="min-w-5 w-5 h-5 border border-gray-400"
                      ></linkedin-icon>
                    </div>
                    <img
                      v-if="social.profilePic"
                      class="
                        min-w-5
                        w-5
                        h-5
                        rounded-full
                        object-cover
                        border border-gray-400
                      "
                      :src="[social.profilePic ? social.profilePic : '']"
                      alt
                    /> -->
                    <div class="w-full">
                      <span class="table-span whitespace-nowrap">
                        {{ social.username | atSignUsername }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="table-td">
                  <DateTime
                    :datetime="social.dateJoined"
                    format="MMMM, dd yyyy, hh:mm aa"
                    :show-time="false"
                    class="table-span"
                  />
                </td>
                <td class="table-td">
                  <DateTime
                    :datetime="social.expireTime"
                    format="MMMM, dd yyyy, hh:mm aa"
                    :show-time="false"
                    class="table-span"
                  />
                </td>

                <td class="table-td text-left relative has-tooltip">
                  <span v-if="social.status" class="table-span">
                    {{ social.status | strLimit(20) }}
                  </span>
                  <span v-if="social.status.length > 20" class="tooltip">{{
                    social.status
                  }}</span>
                </td>
                <td class="table-td text-left">
                  <span class="table-span">
                    {{ social.isOwner ? 'Owner' : 'Guest' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <span
        v-if="user.userPermission !== 'User'"
        class="text-right sticky bottom-0 bg-ash-default mt-0"
        ><button
          :disabled="feedDataload"
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
            text-sm
          "
          @click="showAddFeedsComp()"
        >
          Add Feeds
        </button></span
      >
      <!--website section-->
      <div
        v-if="betaVersion"
        class="card"
        :class="[betaVersion ? 'h-2/5' : 'h-full']"
      >
        <div class="card-header">
          <h3 class="card-title">Websites</h3>
        </div>
        <div class="mobile-card-body scroll">
          <div class="table-wrapper">
            <div class="flex items-center justify-start w-full">
              <div class="table-th w-1/12 min-width-8">
                <span>Active</span>
              </div>
              <div class="table-th w-2/12 min-width-10">
                <span>URL</span>
              </div>
              <div class="table-th w-1/12 min-width-8">
                <span>Name</span>
              </div>
              <div class="table-th w-2/12 min-width-8">
                <span>Formats</span>
              </div>
              <div class="table-th w-2/12 min-width-15">
                <span>Destination</span>
              </div>
              <div class="table-th w-2/12 min-width-8">
                <span>Stored here</span>
              </div>
              <div class="table-th w-1/12 min-width-4">
                <span>Price</span>
              </div>
            </div>

            <div class="body w-full">
              <div
                v-for="(website, index) in websites"
                :key="index + 'website-small'"
                class="flex justify-start md:space-x-5 w-full py-0.5"
              >
                <div class="table-td w-1/12 min-width-8">
                  <div class="flex items-center space-x-3">
                    <a data-title="Edit">
                      <div
                        class="w-4 h-4 bg-yellow-midlight relative rounded-full"
                      >
                        <fa
                          class="
                            text-white text-sm
                            p-0.5
                            cursor-pointer
                            absolute
                            left-1/2
                            top-1/2
                            transform
                            -translate-x-1/2 -translate-y-1/2
                          "
                          :icon="['fas', 'pencil-alt']"
                          @click="websiteEditFeed(website.id)"
                        />
                      </div>
                    </a>
                    <a data-title="Delete" class="delete">
                      <fa
                        class="text-red-600 text-md cursor-pointer"
                        :icon="['fas', 'times-circle']"
                        @click="deleteWebsite(website.id)"
                      />
                    </a>
                    <div>
                      <div
                        class="toggle-wrapper"
                        @click="
                          websiteStatusChange(
                            website.status,
                            website.id,
                            $event
                          )
                        "
                      >
                        <input
                          :checked="website.status"
                          type="checkbox"
                          name="toggle"
                          class="toggle-input"
                        />
                        <label class="toggle-input-label toggle-label"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-td w-2/12 min-width-10 relative has-tooltip">
                  <span class="table-span">
                    {{ website.sourceName | strLimit(18) }}
                  </span>
                  <span v-if="website.sourceName.length > 18" class="tooltip">{{
                    website.sourceName
                  }}</span>
                </div>
                <div class="table-td w-1/12 min-width-8 relative has-tooltip">
                  <span class="table-span">{{
                    website.name | strLimit(18)
                  }}</span>
                  <span v-if="website.name.length > 18" class="tooltip">{{
                    website.name
                  }}</span>
                </div>
                <div class="table-td w-2/12 min-width-8">
                  <span class="table-span">{{ website.fileFormats }}</span>
                </div>
                <div
                  class="
                    table-td
                    w-2/12
                    min-width-15
                    relative
                    has-tooltip
                    whitespace-nowrap
                    overflow-hidden
                  "
                >
                  <span class="table-span">
                    {{ website.destination | strLimit(18) }}
                  </span>
                  <span
                    v-if="website.destination.length > 18"
                    class="tooltip"
                    >{{ website.destination }}</span
                  >
                </div>
                <div class="table-td w-2/12 min-width-8">
                  <span class="table-span">{{ website.storedHere }}</span>
                </div>
                <div class="table-td w-1/12 min-width-4">
                  <span class="table-span">${{ website.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer flex items-center justify-end mt-1 mr-6">
          <button
            :disabled="feedDataload"
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
              text-sm
            "
            @click="showAddFeedsComp()"
          >
            Add Feeds
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
  SOCIAL_STATUS_CHANGE,
  SOCIAL_FEEDS,
  WEBSITE_STATUS_CHANGE,
  WEBSITES,
} from '~/constants/urls'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import GmailIcon from '~/components/shared/icon/GmailIcon.vue'
import MicrosoftIcon from '~/components/shared/icon/MicrosoftIcon.vue'
import EditIcon from '~/components/shared/icon/EditIcon.vue'
import { finalAlert } from '~/utils'

export default {
  name: 'Service',
  components: {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
    GmailIcon,
    MicrosoftIcon,
    EditIcon,
  },
  data() {
    return {
      socials: [],
      websites: [],
      feedDataload: false,
    }
  },
  computed: {
    ...mapState(['betaVersion']),
    ...mapState('setting', ['currentComponent']),
    ...mapState('socialFeed', ['socialFeeds']),

    getArchiveFbData() {
      return this.$store.getters['mobile/header/getArchiveFbData']
    },
    user() {
      return this.$auth.user
    },
  },
  watch: {
    getArchiveFbData(data) {
      if (data) {
        setTimeout(() => {
          this.getAllSocials()
        }, 2000)
      }
    },
    socialFeeds(data) {
      if (this.$route.query.provider && this.$route.query.id) {
        data.forEach((element) => {
          if (
            element.provider.toUpperCase() ===
              this.$route.query.provider.toUpperCase() &&
            element.id === Number(this.$route.query.id)
          ) {
            this.editFeed(element)
          }
        })
      }
    },
  },
  mounted() {
    if (this.$route.fullPath.includes('/settings#account/?success')) {
      this.$toast.success('Payment Success', {
        className: ['toasted-bg-archive'],
      })
      this.$router.push('settings?#account')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } else if (this.$route.fullPath.includes('/settings#account/?cancel')) {
      this.$toast.success('Payment Canceled', {
        className: ['toasted-bg-alert'],
      })
      this.$router.push('settings?#account')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } else if (
      this.$route.fullPath.includes('/settings#account/?failed&success=false')
    ) {
      this.$toast.success(
        'This PayPal account is already in use by another user',
        {
          className: ['toasted-bg-alert'],
        }
      )
      this.$router.push('settings?#account')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
    if (this.currentComponent === 'Service') {
      // setTimeout(() => {
      //   this.getAllSocials()
      // }, 2000)
      // this.getAllWebsites()
    }
    if (this.socialFeeds) {
      if (this.$route.query.provider && this.$route.query.id) {
        this.socialFeeds.forEach((element) => {
          if (
            element.provider.toUpperCase() ===
              this.$route.query.provider.toUpperCase() &&
            element.id === Number(this.$route.query.id)
          ) {
            this.editFeed(element)
          }
        })
      }
    }
  },
  methods: {
    ...mapActions('socialFeed', ['fatchSocialFeeds']),

    async getAllSocials() {
      this.feedDataload = true
      await this.fatchSocialFeeds()
      this.feedDataload = false
    },
    async socialStatusChange(status, id, $event) {
      if (confirm('Are You Sure to change?')) {
        try {
          const response = await this.$axios.$put(SOCIAL_STATUS_CHANGE, {
            id,
            status,
          })
          this.$toast.clear()
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.socials.map((item) => {
              if (item.id === id) {
                item.status = !item.status
              }
              return item
            })
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {}
      } else {
        $event.target.checked = status
      }
    },
    deleteSocial(id) {
      this.socials = this.socials.filter((item) => {
        return Number(item.id) !== Number(id)
      })
    },
    async toggleSocial(id) {
      if (confirm('Are you sure Active/Deactive this feed?')) {
        this.$toast.clear()
        try {
          const response = await this.$axios.$delete(SOCIAL_FEEDS + id)
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.socials = this.socials.filter((item) => {
              return item.id !== id
            })
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {}
      }
    },
    async getAllWebsites() {
      try {
        const response = await this.$axios.$get(WEBSITES)
        if (response.success) {
          this.websites = response.data
        }
      } catch (err) {}
    },
    async websiteStatusChange(status, id, $event) {
      if (confirm('Are You Sure to change?')) {
        this.$toast.clear()
        try {
          const response = await this.$axios.$put(WEBSITE_STATUS_CHANGE, {
            id,
            status,
          })
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.websites.map((item) => {
              if (item.id === id) {
                item.status = !item.status
              }
              return item
            })
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {}
      } else {
        $event.target.checked = status
      }
    },
    async deleteWebsite(id) {
      if (finalAlert()) {
        this.$toast.clear()
        try {
          const response = await this.$axios.$delete(WEBSITES + id)
          if (response.success) {
            this.$toast.success(response.message, {
              className: ['toasted-bg-archive'],
            })
            this.websites = this.websites.filter((item) => {
              return item.id !== id
            })
          } else {
            this.$toast.error(response.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {}
      }
    },
    editFeed(data, $event) {
      this.$store.dispatch('mobile/header/showOverlay')
      this.$store.commit('socialFeed/SHOW_SOCIAL_EDIT_FEED_MODAL', {
        open: true,
        data,
      })
      $event.stopPropagation()
    },
    websiteEditFeed(id) {
      this.$emit('websiteEditFeed', id)
    },
    showBlur() {
      this.$store.dispatch('mobile/header/showOverlay')
    },
    showAddFeedsComp() {
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
    },
  },
}
</script>

<style lang="scss" scoped>
// .card-wrapper {
//   min-height: 900px;
// }
.web-card {
  @apply bg-white rounded-3xl overflow-hidden;
}

.card {
  @apply bg-white rounded-2xl overflow-hidden;
}

.card-header {
  @apply bg-yellow-midlight text-center py-2;
}

.card-title {
  @apply text-offwhite-200 font-bold xl:text-xl md:text-lg text-md;
}

.card-body {
  height: calc(100% - 43px);
  @apply overflow-auto scroll;
}

.mobile-card-body {
  height: calc(100% - 40px);
  @apply overflow-auto scroll;
}
.table-th {
  @apply md:px-6 px-6 md:py-2 py-2 text-left tracking-wider xl:text-lg md:text-md text-sm md:font-bold whitespace-nowrap md:text-ash-primary text-yellow-midlight;
}

.min-width-4 {
  min-width: 4rem;
}

.min-width-8 {
  min-width: 8rem;
}

.min-width-100 {
  min-width: 142rem;
}

.min-width-10 {
  min-width: 10rem;
}

.min-width-15 {
  min-width: 15rem;
}

.tooltip {
  @apply absolute 
  text-white 
  bg-yellow-midlight 
  z-100 
  left-5 
  -top-5 
  text-left
  invisible 
  md:p-1.5 
  p-0.5 
  md:px-4 
  px-2 
  text-sm 
  rounded-xl break-words 
  shadow-lg md:w-48;

  white-space: break-spaces;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}

.table-td {
  @apply md:px-6 px-6 md:py-2 py-1.5 text-left whitespace-nowrap;
}

.action-icon {
  @apply pl-5;
}

.table-span {
  @apply text-gray-light xl:text-xl md:text-lg text-md;
}

.toggle-wrapper {
  @apply relative inline-block w-9 mr-2 align-middle select-none transition duration-200 ease-in;
}

.toggle-input {
  @apply outline-none focus:outline-none toggle-checkbox absolute block rounded-full bg-white appearance-none cursor-pointer;
}

.toggle-input-label {
  @apply block h-5 rounded-full bg-ash-default transition-all
  duration-800
  ease-in-out cursor-pointer;
}

.set-up-button {
  @apply text-white font-bold bg-yellow-midlight border-2 border-yellow-midlight md:py-1 lg:px-5 md:px-4 px-2 rounded-full text-md;
}

.toggle-checkbox {
  width: 16px;
  height: 16px;
  border: 0px;
  top: 2px;
  left: 2px;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;

  &:checked {
    @apply right-0;
    left: 18px;
    transition: all 0.5s ease-in-out;
    background-color: #ffffff;
  }

  &:checked + .toggle-label {
    transition: all 0.5s ease-in-out;
    @apply bg-yellow-midlight;
  }
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
}

[data-title].delete:after {
  color: red;
  left: 100%;
  z-index: 9999999999;
}
.min-w-7 {
  min-width: 1.75rem !important;
}
.min-w-5 {
  min-width: 1.25rem !important;
}
</style>
