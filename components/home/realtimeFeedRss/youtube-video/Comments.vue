<template>
  <div class="commentsFeedHeight mt-3.5 space-y-6">
    <template v-if="AllComments.length > 0">
      <div
        v-for="(AllComment, allCommentIndex) in AllComments"
        :key="allCommentIndex"
        class="flex flex-col"
      >
        <transition name="fadeIn">
          <div class="flex space-x-3.5">
            <div class="commentAccountImage">
              <img
                v-if="AllComment.authorProfileImageUrl"
                :src="AllComment.authorProfileImageUrl"
                class="rounded-full min-w-11 h-11"
              />
              <img
                v-else
                :src="youtube"
                alt="Youtube Icon"
                class="rounded-full min-w-11 h-11"
              />
            </div>

            <div class="commentDetails flex-grow text-base">
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <div class="name text-lg font-bold text-ash-primary">
                    {{ AllComment.authorName }}
                  </div>
                  <div
                    class="
                      commentTime
                      text-gray-light
                      whitespace-nowrap
                      hidden
                      md:block
                    "
                  >
                    {{ AllComment.updatedAt | diffForHumans }}, ago
                  </div>
                  <div
                    class="
                      commentTime
                      text-gray-light
                      whitespace-nowrap
                      block
                      md:hidden
                    "
                  >
                    {{ AllComment.updatedAt | diffForHumansMessageFeed }}, ago
                  </div>
                </div>
                <div class="fullComment text-ash-primary">
                  {{ AllComment.text }}
                </div>
                <div
                  class="
                    like-dislike
                    flex
                    space-x-5
                    text-gray-light
                    items-center
                    mt-4
                    mb-2
                  "
                >
                  <div class="totalLike flex space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24.223 24.223"
                    >
                      <path
                        id="Path_2116"
                        data-name="Path 2116"
                        d="M1,23.188c0-3.691,0-7.382.016-11.1.061-.087.1-.151.153-.21a.987.987,0,0,1,.842-.281c1.45,0,2.9,0,4.35,0a.555.555,0,0,0,.316-.095c.751-.574,1.513-1.135,2.233-1.746.5-.423.941-.913,1.4-1.385a6.359,6.359,0,0,0,1.38-2.1q.657-1.682,1.282-3.377a2.771,2.771,0,0,1,1.408-1.755c.047-.021.072-.092.108-.139.364,0,.727,0,1.119.018A1.894,1.894,0,0,1,17,2.007a3.9,3.9,0,0,1,.365,1.382,7.477,7.477,0,0,1,.046,1.287c-.033.608-.11,1.215-.183,1.82-.057.472-.13.942-.212,1.41-.092.532-.2,1.061-.307,1.61h.268q2.387,0,4.773,0a4.072,4.072,0,0,1,.648.048,2.5,2.5,0,0,1,2.065,2.362,2.4,2.4,0,0,1-.375,1.436,6.031,6.031,0,0,1,.654.751,8.891,8.891,0,0,1,.482,1.031c0,.285,0,.57-.018.883-.125.309-.213.6-.345.87a2.115,2.115,0,0,1-.722.785.207.207,0,0,0-.028.2,2.443,2.443,0,0,1,.282,1.859,2.475,2.475,0,0,1-1.206,1.61.2.2,0,0,0-.065.179,2.493,2.493,0,0,1-.95,3.362c-.248.134-.52.223-.781.333-2.54,0-5.08,0-7.65-.019-.632-.07-1.24-.089-1.836-.178-.724-.108-1.446-.246-2.156-.425-.786-.2-1.555-.461-2.333-.689a4.434,4.434,0,0,0-1.1-.283c-1.52-.032-3.041-.013-4.562-.015-.083,0-.166-.026-.249-.032-.258-.018-.348-.252-.51-.393m9.7-13.081c-.413.381-.81.781-1.242,1.139-.579.481-1.178.939-1.785,1.384A.39.39,0,0,0,7.478,13q.008,4.233,0,8.467v.922c.7.221,1.392.484,2.1.652.921.217,1.857.376,2.793.525a12.556,12.556,0,0,0,1.844.187c2.239.022,4.478.007,6.716.01a1.041,1.041,0,0,0,1.008-1.069A1.012,1.012,0,0,0,20.9,21.682a.776.776,0,0,1-.738-.747.755.755,0,0,1,.766-.729,11.844,11.844,0,0,0,1.285-.054,1.03,1.03,0,0,0-.313-2.027.753.753,0,0,1-.7-.795.724.724,0,0,1,.726-.678,5.7,5.7,0,0,0,.932-.042,1.027,1.027,0,0,0,.894-1.117,1.049,1.049,0,0,0-1.028-.918,4.487,4.487,0,0,1-.709,0c-.5-.044-.781-.261-.812-.7a.745.745,0,0,1,.8-.806A1.085,1.085,0,0,0,23,12.011a1.112,1.112,0,0,0-1.21-1.027c-2.01,0-4.02,0-6.031,0a.738.738,0,0,1-.684-1.038c.125-.55.251-1.1.355-1.654.109-.58.2-1.163.286-1.747a15.37,15.37,0,0,0,.182-1.561,14.872,14.872,0,0,0-.046-1.713c-.022-.289-.068-.608-.4-.745a.689.689,0,0,0-.917.466c-.411,1.059-.8,2.126-1.225,3.181a13.81,13.81,0,0,1-.78,1.713,9.651,9.651,0,0,1-1.83,2.224M2.467,15.5v6.634H6V13.125H2.467Z"
                        transform="translate(-1 -1)"
                      />
                    </svg>
                    <div>{{ AllComment.likeCount }}</div>
                  </div>
                  <div class="totalDislike flex space-x-2">
                    <svg
                      v-if="AllComment.viewerRating === 'dislike'"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      viewBox="0 0 512 512"
                      style="transform: rotateY(-180deg)"
                    >
                      <style>
                        .dislike {
                          width: 18px;
                          height: 18px;
                        }
                      </style>
                      <path
                        class="dislike"
                        d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24.223 24.223"
                    >
                      <path
                        id="Path_2116"
                        data-name="Path 2116"
                        d="M1,23.188c0-3.691,0-7.382.016-11.1.061-.087.1-.151.153-.21a.987.987,0,0,1,.842-.281c1.45,0,2.9,0,4.35,0a.555.555,0,0,0,.316-.095c.751-.574,1.513-1.135,2.233-1.746.5-.423.941-.913,1.4-1.385a6.359,6.359,0,0,0,1.38-2.1q.657-1.682,1.282-3.377a2.771,2.771,0,0,1,1.408-1.755c.047-.021.072-.092.108-.139.364,0,.727,0,1.119.018A1.894,1.894,0,0,1,17,2.007a3.9,3.9,0,0,1,.365,1.382,7.477,7.477,0,0,1,.046,1.287c-.033.608-.11,1.215-.183,1.82-.057.472-.13.942-.212,1.41-.092.532-.2,1.061-.307,1.61h.268q2.387,0,4.773,0a4.072,4.072,0,0,1,.648.048,2.5,2.5,0,0,1,2.065,2.362,2.4,2.4,0,0,1-.375,1.436,6.031,6.031,0,0,1,.654.751,8.891,8.891,0,0,1,.482,1.031c0,.285,0,.57-.018.883-.125.309-.213.6-.345.87a2.115,2.115,0,0,1-.722.785.207.207,0,0,0-.028.2,2.443,2.443,0,0,1,.282,1.859,2.475,2.475,0,0,1-1.206,1.61.2.2,0,0,0-.065.179,2.493,2.493,0,0,1-.95,3.362c-.248.134-.52.223-.781.333-2.54,0-5.08,0-7.65-.019-.632-.07-1.24-.089-1.836-.178-.724-.108-1.446-.246-2.156-.425-.786-.2-1.555-.461-2.333-.689a4.434,4.434,0,0,0-1.1-.283c-1.52-.032-3.041-.013-4.562-.015-.083,0-.166-.026-.249-.032-.258-.018-.348-.252-.51-.393m9.7-13.081c-.413.381-.81.781-1.242,1.139-.579.481-1.178.939-1.785,1.384A.39.39,0,0,0,7.478,13q.008,4.233,0,8.467v.922c.7.221,1.392.484,2.1.652.921.217,1.857.376,2.793.525a12.556,12.556,0,0,0,1.844.187c2.239.022,4.478.007,6.716.01a1.041,1.041,0,0,0,1.008-1.069A1.012,1.012,0,0,0,20.9,21.682a.776.776,0,0,1-.738-.747.755.755,0,0,1,.766-.729,11.844,11.844,0,0,0,1.285-.054,1.03,1.03,0,0,0-.313-2.027.753.753,0,0,1-.7-.795.724.724,0,0,1,.726-.678,5.7,5.7,0,0,0,.932-.042,1.027,1.027,0,0,0,.894-1.117,1.049,1.049,0,0,0-1.028-.918,4.487,4.487,0,0,1-.709,0c-.5-.044-.781-.261-.812-.7a.745.745,0,0,1,.8-.806A1.085,1.085,0,0,0,23,12.011a1.112,1.112,0,0,0-1.21-1.027c-2.01,0-4.02,0-6.031,0a.738.738,0,0,1-.684-1.038c.125-.55.251-1.1.355-1.654.109-.58.2-1.163.286-1.747a15.37,15.37,0,0,0,.182-1.561,14.872,14.872,0,0,0-.046-1.713c-.022-.289-.068-.608-.4-.745a.689.689,0,0,0-.917.466c-.411,1.059-.8,2.126-1.225,3.181a13.81,13.81,0,0,1-.78,1.713,9.651,9.651,0,0,1-1.83,2.224M2.467,15.5v6.634H6V13.125H2.467Z"
                        transform="translate(25.223 25.223) rotate(180)"
                      />
                    </svg>

                    <div class="font-semibold">DISLIKE</div>
                  </div>
                </div>
                <div v-if="AllComment.comments">
                  <div v-if="AllComment.comments.length > 0">
                    <button
                      type="submit"
                      class="
                        w-44
                        h-10
                        rounded-full
                        border
                        outline-none
                        flex
                        justify-between
                        items-center
                        font-bold
                        text-lg
                        px-4
                        py-2
                        bg-white
                        text-yellow-primary
                      "
                      @click="viewReplies(AllComment.id)"
                    >
                      <div class="select-toggle">
                        <fa
                          :icon="[
                            'fas',
                            AllComment.viewReply.value
                              ? 'caret-up'
                              : 'caret-down',
                          ]"
                        />
                      </div>
                      <div
                        v-if="!AllComment.viewReply.value"
                        class="whitespace-nowrap"
                      >
                        View {{ AllComment.totalReplyCount }} replies
                      </div>
                      <div v-else class="whitespace-nowrap">
                        Hide {{ AllComment.totalReplyCount }} replies
                      </div>
                    </button>
                    <transition
                      name="expand"
                      @enter="enter"
                      @after-enter="afterEnter"
                      @leave="leave"
                    >
                      <div v-if="AllComment.viewReply.value" class="space-y-6">
                        <div
                          v-for="(
                            AllReply, allReplyIndex
                          ) in AllComment.comments"
                          :key="allReplyIndex"
                          class="flex flex-col first-comment"
                        >
                          <transition name="fadeIn">
                            <div class="flex space-x-3.5">
                              <div class="commentAccountImage">
                                <img
                                  v-if="AllReply.authorProfileImageUrl"
                                  :src="AllReply.authorProfileImageUrl"
                                  class="rounded-full min-w-11 h-11"
                                />
                                <img
                                  v-else
                                  :src="youtube"
                                  alt="Youtube Icon"
                                  class="rounded-full min-w-11 h-11"
                                />
                              </div>

                              <div class="commentDetails flex-grow text-base">
                                <div class="flex flex-col">
                                  <div class="flex justify-between">
                                    <div
                                      class="
                                        name
                                        text-lg
                                        font-bold
                                        text-ash-primary
                                      "
                                    >
                                      {{ AllReply.authorName }}
                                    </div>
                                    <div
                                      class="
                                        commentTime
                                        text-gray-light
                                        whitespace-nowrap
                                        hidden
                                        md:block
                                      "
                                    >
                                      {{
                                        AllComment.updatedAt | diffForHumans
                                      }}, ago
                                    </div>
                                    <div
                                      class="
                                        commentTime
                                        text-gray-light
                                        whitespace-nowrap
                                        block
                                        md:hidden
                                      "
                                    >
                                      {{
                                        AllComment.updatedAt
                                          | diffForHumansMessageFeed
                                      }}, ago
                                    </div>
                                  </div>
                                  <div class="fullComment text-ash-primary">
                                    {{ AllReply.text }}
                                  </div>
                                  <div
                                    class="
                                      like-dislike
                                      flex
                                      space-x-5
                                      text-gray-light
                                      items-center
                                      mt-4
                                      mb-2
                                    "
                                  >
                                    <div class="totalLike flex space-x-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24.223 24.223"
                                      >
                                        <path
                                          id="Path_2116"
                                          data-name="Path 2116"
                                          d="M1,23.188c0-3.691,0-7.382.016-11.1.061-.087.1-.151.153-.21a.987.987,0,0,1,.842-.281c1.45,0,2.9,0,4.35,0a.555.555,0,0,0,.316-.095c.751-.574,1.513-1.135,2.233-1.746.5-.423.941-.913,1.4-1.385a6.359,6.359,0,0,0,1.38-2.1q.657-1.682,1.282-3.377a2.771,2.771,0,0,1,1.408-1.755c.047-.021.072-.092.108-.139.364,0,.727,0,1.119.018A1.894,1.894,0,0,1,17,2.007a3.9,3.9,0,0,1,.365,1.382,7.477,7.477,0,0,1,.046,1.287c-.033.608-.11,1.215-.183,1.82-.057.472-.13.942-.212,1.41-.092.532-.2,1.061-.307,1.61h.268q2.387,0,4.773,0a4.072,4.072,0,0,1,.648.048,2.5,2.5,0,0,1,2.065,2.362,2.4,2.4,0,0,1-.375,1.436,6.031,6.031,0,0,1,.654.751,8.891,8.891,0,0,1,.482,1.031c0,.285,0,.57-.018.883-.125.309-.213.6-.345.87a2.115,2.115,0,0,1-.722.785.207.207,0,0,0-.028.2,2.443,2.443,0,0,1,.282,1.859,2.475,2.475,0,0,1-1.206,1.61.2.2,0,0,0-.065.179,2.493,2.493,0,0,1-.95,3.362c-.248.134-.52.223-.781.333-2.54,0-5.08,0-7.65-.019-.632-.07-1.24-.089-1.836-.178-.724-.108-1.446-.246-2.156-.425-.786-.2-1.555-.461-2.333-.689a4.434,4.434,0,0,0-1.1-.283c-1.52-.032-3.041-.013-4.562-.015-.083,0-.166-.026-.249-.032-.258-.018-.348-.252-.51-.393m9.7-13.081c-.413.381-.81.781-1.242,1.139-.579.481-1.178.939-1.785,1.384A.39.39,0,0,0,7.478,13q.008,4.233,0,8.467v.922c.7.221,1.392.484,2.1.652.921.217,1.857.376,2.793.525a12.556,12.556,0,0,0,1.844.187c2.239.022,4.478.007,6.716.01a1.041,1.041,0,0,0,1.008-1.069A1.012,1.012,0,0,0,20.9,21.682a.776.776,0,0,1-.738-.747.755.755,0,0,1,.766-.729,11.844,11.844,0,0,0,1.285-.054,1.03,1.03,0,0,0-.313-2.027.753.753,0,0,1-.7-.795.724.724,0,0,1,.726-.678,5.7,5.7,0,0,0,.932-.042,1.027,1.027,0,0,0,.894-1.117,1.049,1.049,0,0,0-1.028-.918,4.487,4.487,0,0,1-.709,0c-.5-.044-.781-.261-.812-.7a.745.745,0,0,1,.8-.806A1.085,1.085,0,0,0,23,12.011a1.112,1.112,0,0,0-1.21-1.027c-2.01,0-4.02,0-6.031,0a.738.738,0,0,1-.684-1.038c.125-.55.251-1.1.355-1.654.109-.58.2-1.163.286-1.747a15.37,15.37,0,0,0,.182-1.561,14.872,14.872,0,0,0-.046-1.713c-.022-.289-.068-.608-.4-.745a.689.689,0,0,0-.917.466c-.411,1.059-.8,2.126-1.225,3.181a13.81,13.81,0,0,1-.78,1.713,9.651,9.651,0,0,1-1.83,2.224M2.467,15.5v6.634H6V13.125H2.467Z"
                                          transform="translate(-1 -1)"
                                        />
                                      </svg>
                                      <div>
                                        {{ AllReply.likeCount }}
                                      </div>
                                    </div>
                                    <div class="totalDislike flex space-x-2">
                                      <svg
                                        v-if="
                                          AllReply.viewerRating === 'dislike'
                                        "
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="20"
                                        viewBox="0 0 512 512"
                                        style="transform: rotateY(-180deg)"
                                      >
                                        <style>
                                          .dislike {
                                            width: 18px;
                                            height: 18px;
                                          }
                                        </style>
                                        <path
                                          class="dislike"
                                          d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"
                                        />
                                      </svg>
                                      <svg
                                        v-else
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24.223 24.223"
                                      >
                                        <path
                                          id="Path_2116"
                                          data-name="Path 2116"
                                          d="M1,23.188c0-3.691,0-7.382.016-11.1.061-.087.1-.151.153-.21a.987.987,0,0,1,.842-.281c1.45,0,2.9,0,4.35,0a.555.555,0,0,0,.316-.095c.751-.574,1.513-1.135,2.233-1.746.5-.423.941-.913,1.4-1.385a6.359,6.359,0,0,0,1.38-2.1q.657-1.682,1.282-3.377a2.771,2.771,0,0,1,1.408-1.755c.047-.021.072-.092.108-.139.364,0,.727,0,1.119.018A1.894,1.894,0,0,1,17,2.007a3.9,3.9,0,0,1,.365,1.382,7.477,7.477,0,0,1,.046,1.287c-.033.608-.11,1.215-.183,1.82-.057.472-.13.942-.212,1.41-.092.532-.2,1.061-.307,1.61h.268q2.387,0,4.773,0a4.072,4.072,0,0,1,.648.048,2.5,2.5,0,0,1,2.065,2.362,2.4,2.4,0,0,1-.375,1.436,6.031,6.031,0,0,1,.654.751,8.891,8.891,0,0,1,.482,1.031c0,.285,0,.57-.018.883-.125.309-.213.6-.345.87a2.115,2.115,0,0,1-.722.785.207.207,0,0,0-.028.2,2.443,2.443,0,0,1,.282,1.859,2.475,2.475,0,0,1-1.206,1.61.2.2,0,0,0-.065.179,2.493,2.493,0,0,1-.95,3.362c-.248.134-.52.223-.781.333-2.54,0-5.08,0-7.65-.019-.632-.07-1.24-.089-1.836-.178-.724-.108-1.446-.246-2.156-.425-.786-.2-1.555-.461-2.333-.689a4.434,4.434,0,0,0-1.1-.283c-1.52-.032-3.041-.013-4.562-.015-.083,0-.166-.026-.249-.032-.258-.018-.348-.252-.51-.393m9.7-13.081c-.413.381-.81.781-1.242,1.139-.579.481-1.178.939-1.785,1.384A.39.39,0,0,0,7.478,13q.008,4.233,0,8.467v.922c.7.221,1.392.484,2.1.652.921.217,1.857.376,2.793.525a12.556,12.556,0,0,0,1.844.187c2.239.022,4.478.007,6.716.01a1.041,1.041,0,0,0,1.008-1.069A1.012,1.012,0,0,0,20.9,21.682a.776.776,0,0,1-.738-.747.755.755,0,0,1,.766-.729,11.844,11.844,0,0,0,1.285-.054,1.03,1.03,0,0,0-.313-2.027.753.753,0,0,1-.7-.795.724.724,0,0,1,.726-.678,5.7,5.7,0,0,0,.932-.042,1.027,1.027,0,0,0,.894-1.117,1.049,1.049,0,0,0-1.028-.918,4.487,4.487,0,0,1-.709,0c-.5-.044-.781-.261-.812-.7a.745.745,0,0,1,.8-.806A1.085,1.085,0,0,0,23,12.011a1.112,1.112,0,0,0-1.21-1.027c-2.01,0-4.02,0-6.031,0a.738.738,0,0,1-.684-1.038c.125-.55.251-1.1.355-1.654.109-.58.2-1.163.286-1.747a15.37,15.37,0,0,0,.182-1.561,14.872,14.872,0,0,0-.046-1.713c-.022-.289-.068-.608-.4-.745a.689.689,0,0,0-.917.466c-.411,1.059-.8,2.126-1.225,3.181a13.81,13.81,0,0,1-.78,1.713,9.651,9.651,0,0,1-1.83,2.224M2.467,15.5v6.634H6V13.125H2.467Z"
                                          transform="translate(25.223 25.223) rotate(180)"
                                        />
                                      </svg>
                                      <!-- <div class="font-semibold">DISLIKE</div> -->
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </transition>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </template>
    <div
      v-else
      class="
        h-full
        w-full
        flex
        items-center
        justify-center
        font-bold
        md:text-xl
        text-lg
      "
    >
      <p>No Data Found</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import youtubePng from 'assets/img/png/youtube_social_circle_white.png'

export default defineComponent({
  setup() {
    const store = useStore()

    const AllComments = computed(() => store.state.home.youtubeComment)

    const viewReplies = (selectedReply) => {
      AllComments.value.map((item) => {
        if (item.id === selectedReply) {
          if (item.viewReply.value) {
            return (item.viewReply.value = false)
          } else {
            return (item.viewReply.value = true)
          }
        } else {
          return 0
        }
      })
    }

    return {
      AllComments,
      viewReplies,
      store,
    }
  },
  data() {
    return {
      youtube: youtubePng,
    }
  },
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = height
      })
    },
    afterEnter(element) {
      element.style.height = 'auto'
    },
    leave(element) {
      const height = getComputedStyle(element).height

      element.style.height = height
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = 0
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.youtube-view-wrapper {
  height: calc(100% - 46px);
}

.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 1s;
}
.media-enter-active,
.media-leave-active {
  transition: opacity 0.5s;
}
.media-enter,
.media-leave-to {
  opacity: 0;
}
[data-title]:after {
  color: #e4801d;
  right: 100%;
  z-index: 99999999;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  // scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-color: #ff8308 #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
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
.videoThumbnail {
  min-width: 76px;
  min-height: 42px;
}
.summaryFeedHeight,
.transcriptFeedHeight,
.detailsFeedHeight,
.commentsFeedHeight {
  height: calc(100% - 56px);
}
.more_link {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-indent: -9999px;
  // z-index: 1000;
}
.bottom-left-radius {
  border-bottom-left-radius: 25px;
}
.message-body {
  height: 68px;
}
@media (max-width: 767px) {
  .mobile-height {
    height: calc(50% - 17px);
  }
  .bottom-left-radius {
    border-bottom-left-radius: 0px;
  }
}

.ic_attachment {
  fill: #656565;
}
.ic_attachment1 {
  fill: #ffffff;
}
.name {
  display: flex;
}
.playPauseIcon {
  vertical-align: middle;
  @apply text-yellow-primary w-9 h-9;
}
.seek_slider {
  @apply h-1.5 bg-orange-600 appearance-none w-full rounded-full;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.seek_slider::-webkit-slider-thumb,
.volume_slider::-webkit-slider-thumb {
  @apply w-4 h-4 bg-white border-2 border-solid border-orange-600 cursor-pointer rounded-full;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.zoom-icon-container {
  @apply bg-yellow-primary w-9 h-9 flex items-center justify-center rounded-full;
}
.zoomcontainer {
  transform: translate(0px, 0px) scale(1);
}
.transcript-time {
  background: #ebb68149 0% 0% no-repeat padding-box;
}
.min-w-15 {
  min-width: 3.75rem;
}
.min-w-11 {
  min-width: 44px;
}
.select-toggle {
  color: #e4801d;
  top: 5.2px;
  @apply right-3 pointer-events-none;
  svg {
    @apply text-3xl;
  }
  padding-left: 2px !important;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 1s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
.first-comment:first-child {
  @apply pt-4;
}
</style>
