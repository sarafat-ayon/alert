<template>
  <div class="flex flex-col h-full">
    <template v-if="!showMessageskeleton">
      <div class="bg-white rounded-t-xl messageAvatarInfo">
        <div
          v-if="conversationUser || conversationOwner"
          class="flex rounded-md mt-4"
        >
          <div class="profileAvatar m-2">
            <img
              v-if="conversationUser.profileImageUrl"
              class="w-13 h-13 rounded-full object-cover border border-gray-400"
              :src="conversationUser.profileImageUrl"
              :alt="`${conversationUser.name}'s Profile Picture`"
            />
            <template v-else>
              <div
                v-if="allMessagePersons.provider === 'Facebook'"
                class="w-13 h-13 rounded-full"
              >
                <facebook-icon
                  class="w-13 h-13 border border-gray-400"
                ></facebook-icon>
              </div>
              <instagram-icon
                v-if="allMessagePersons.provider === 'Instagram'"
                class="w-13 h-13 border border-gray-400"
              ></instagram-icon>
              <div
                v-if="allMessagePersons.provider === 'Twitter'"
                class="w-13 h-13 rounded-full"
              >
                <twitter-icon
                  class="w-13 h-13 border border-gray-400"
                ></twitter-icon>
              </div>
              <div
                v-if="allMessagePersons.provider === 'LinkedIn'"
                class="w-13 h-13 rounded-full"
              >
                <linkedin-icon
                  class="w-13 h-13 border border-gray-400"
                ></linkedin-icon>
              </div>
            </template>
          </div>
          <div class="messageInfo self-center">
            <div class="userDetails">
              <div class="name text-gray-light text-xl">
                {{ conversationUser.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        :id="messageId"
        :class="currentComp === 'Instagram' ? '' : 'rounded-b-xl'"
        class="
          messageWrapper
          text-lg
          2xl:text-xl
          bg-white
          mt-1
          pt-4
          overflow-scroll
          scroll
        "
      >
        <template v-if="conversations.length > 0">
          <template v-if="showMoreMessageSkeleton">
            <div id="messageSkeleton" class="w-full">
              <div
                v-for="moreMessage in 5"
                :key="'more' + moreMessage"
                class="w-full"
              >
                <div class="send-right-wrapper flex flex-row-reverse">
                  <div class="send-right my-2 max-w-75">
                    <!-- <div class="send-right-top">I am going to be free from tomorrow.</div> -->
                    <div class="bg-gray-500 h-6 w-26 rounded-full"></div>
                    <!-- <div class="send-right-bottom">Do you have any plan?</div> -->
                  </div>
                </div>

                <div class="receive-left-wrapper">
                  <div class="sender-image m-2 self-end">
                    <div
                      class="
                        w-13-point-5
                        h-13-point-5
                        rounded-full
                        object-cover
                        border border-gray-400
                        bg-gray-500
                      "
                    ></div>
                  </div>
                  <div class="receive-left space-y-1">
                    <!-- <div class="receive-left-top">
            Let's pick a location for the vacation.
                    </div>-->
                    <div class="bg-gray-500 h-6 w-26 rounded-full"></div>

                    <!-- <div class="receive-left-bottom">
            Let me know what you are thinking
                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div
            v-for="(conversation, index) in conversations"
            :key="index"
            class="w-full"
          >
            <div
              v-if="!conversation.user"
              class="send-right-wrapper flex flex-row-reverse"
            >
              <div class="send-right flex flex-col text-white my-2 w-full">
                <div class="w-full flex justify-end py-2 text-gray-1700">
                  <DateTime
                    :datetime="conversation.date"
                    format="MMMM, dd yyyy, hh:mm aa"
                    :show-time="true"
                    class="whitespace-nowrap"
                  />
                </div>
                <div
                  v-for="(message, i) in conversation.messages"
                  :key="message.id"
                  class="max-w-75 self-end"
                >
                  <template
                    v-if="message.text && conversation.messages.length > 1"
                  >
                    <!-- 'send-right-top': i === 0 -->
                    <div
                      class="text-left line_break my-0.5"
                      :class="[
                        isDesktop || isTabDevice ? 'max-w-600' : 'max-w-300',
                        i === 0
                          ? (message.text.length <= 60 &&
                              (isDesktop || isTabDevice)) ||
                            (message.text.length <= 28 && isMediumDesktop) ||
                            (message.text.length <= 28 && isMobile)
                            ? 'send-right-top'
                            : 'send-right-top-radius'
                          : '',
                        i === conversation.messages.length - 1
                          ? (message.text.length <= 60 &&
                              (isDesktop || isTabDevice)) ||
                            (message.text.length <= 28 && isMediumDesktop) ||
                            (message.text.length <= 28 && isMobile)
                            ? 'send-right-bottom'
                            : 'send-right-bottom-radius'
                          : '',
                        i !== 0 && i !== conversation.messages.length - 1
                          ? (message.text.length <= 60 &&
                              (isDesktop || isTabDevice)) ||
                            (message.text.length <= 28 && isMediumDesktop) ||
                            (message.text.length <= 28 && isMobile)
                            ? 'send-right-middle'
                            : 'send-right-middle-radius'
                          : '',
                      ]"
                    >
                      {{ message.text }}
                    </div>
                  </template>
                  <template v-else-if="message.text">
                    <div
                      class="line_break text-left my-0.5 max-w-300"
                      :class="[
                        isDesktop || isTabDevice ? 'max-w-600' : 'max-w-300',
                        (message.text.length <= 60 &&
                          (isDesktop || isTabDevice)) ||
                        (message.text.length <= 28 && isMediumDesktop) ||
                        (message.text.length <= 28 && isMobile)
                          ? 'send-right-all'
                          : 'send-right-all-radius',
                      ]"
                    >
                      {{ message.text }}
                    </div>
                  </template>
                  <template v-if="message.provider === 'Facebook'">
                    <template
                      v-if="
                        images(message.archivedAttachments, message.attachments)
                          .length > 0
                      "
                    >
                      <div
                        class="grid gap-0.5 max-w-300 my-0.5"
                        :class="
                          images(
                            message.archivedAttachments,
                            message.attachments
                          ).length < 5
                            ? 'grid-cols-2'
                            : 'grid-cols-3'
                        "
                      >
                        <div
                          v-for="(image, imageIndex) in images(
                            message.archivedAttachments,
                            message.attachments
                          )"
                          :key="imageIndex"
                          class="bg-white rounded-xl"
                          :class="
                            images(
                              message.archivedAttachments,
                              message.attachments
                            ).length > 1
                              ? 'col-span-1 max-h-52'
                              : 'col-span-2 max-w-300'
                          "
                        >
                          <img
                            v-if="
                              image.mime_type === 'image/jpeg' ||
                              image.mime_type === 'image/jpg' ||
                              image.mime_type === 'image/png' ||
                              image.mime_type === 'image/svg' ||
                              image.mime_type === 'image/apng' ||
                              image.mime_type === 'image/gif'
                            "
                            class="
                              object-fill
                              rounded-xl
                              max-h-full max-w-full
                              w-full
                              shadow-sm
                              border
                            "
                            :class="
                              images(
                                message.archivedAttachments,
                                message.attachments
                              ).length > 1
                                ? 'max-h-full max-w-full w-full'
                                : ''
                            "
                            :src="image.url"
                            alt
                          />
                        </div>
                      </div>
                    </template>
                    <template
                      v-else-if="
                        otherAttachments(
                          message.archivedAttachments,
                          message.attachments
                        ).length > 0
                      "
                    >
                      <div class="grid grid-cols-2 max-w-300 my-0.5">
                        <div
                          v-for="(image, imageIndex) in otherAttachments(
                            message.archivedAttachments,
                            message.attachments
                          )"
                          :key="imageIndex"
                          class="bg-white rounded-xl col-span-2 max-w-300"
                        >
                          <video
                            v-if="
                              image.mime_type === 'video/mp4' ||
                              image.mime_type === 'video/webm'
                            "
                            class="w-full rounded-xl shadow-sm"
                            height="400"
                            controls="controls"
                          >
                            <source :src="image.url" />
                            <source :src="image.preview_url" />
                          </video>
                          <audio
                            v-else-if="
                              image.mime_type === 'audio/mpeg' ||
                              image.mime_type === 'audio/mp3' ||
                              image.mime_type === 'audio/wav'
                            "
                            class="send-audio"
                            controls
                          >
                            <source :src="image.url" :type="image.mime_type" />
                          </audio>
                        </div>
                      </div>
                    </template>
                    <template v-if="message.archivedSticker || message.sticker">
                      <div class="grid grid-cols-2 my-0.5">
                        <div class="col-span-2 max-w-120">
                          <img
                            class="object-cover max-h-full max-w-full w-full"
                            :src="
                              message.archivedSticker
                                ? message.archivedSticker
                                : message.sticker
                            "
                            alt
                          />
                        </div>
                      </div>
                    </template>
                    <template v-if="message.archivedAttachments.length === 1">
                      <template
                        v-for="(
                          image, imageIndex
                        ) in message.archivedAttachments"
                      >
                        <div
                          v-if="
                            image.mime_type !== 'image/jpeg' &&
                            image.mime_type !== 'image/jpg' &&
                            image.mime_type !== 'image/png' &&
                            image.mime_type !== 'image/svg' &&
                            image.mime_type !== 'image/apng' &&
                            image.mime_type !== 'image/gif' &&
                            image.mime_type !== 'video/mp4' &&
                            image.mime_type !== 'video/webm' &&
                            image.mime_type !== 'video/ogg' &&
                            image.mime_type !== 'audio/mpeg' &&
                            image.mime_type !== 'audio/mp3' &&
                            image.mime_type !== 'audio/wav'
                          "
                          :key="imageIndex"
                          class="my-0.5"
                          :class="{
                            'send-right-top': i === 0,
                            'send-right-bottom':
                              i === conversation.messages.length - 1,
                            'send-right-middle':
                              i !== 0 && i !== conversation.messages.length - 1,
                          }"
                        >
                          <a
                            v-if="image.mime_type !== 'image/jpeg'"
                            class="flex space-x-2 items-center flex-nowrap"
                            :href="image.url"
                          >
                            <svg
                              class="svg-icon"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                overflow: hidden;
                                fill: #ffffff;
                              "
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                              />
                            </svg>
                            <span
                              class="line_break hover:underline text-left"
                              >{{ image.name }}</span
                            >
                          </a>
                        </div>
                      </template>
                    </template>
                    <template v-else-if="message.attachments.length === 1">
                      <template
                        v-for="(image, imageIndex) in message.attachments"
                      >
                        <div
                          v-if="
                            image.mime_type !== 'image/jpeg' &&
                            image.mime_type !== 'image/jpg' &&
                            image.mime_type !== 'image/png' &&
                            image.mime_type !== 'image/svg' &&
                            image.mime_type !== 'image/apng' &&
                            image.mime_type !== 'image/gif' &&
                            image.mime_type !== 'video/mp4' &&
                            image.mime_type !== 'video/webm' &&
                            image.mime_type !== 'video/ogg' &&
                            image.mime_type !== 'audio/mpeg' &&
                            image.mime_type !== 'audio/mp3' &&
                            image.mime_type !== 'audio/wav'
                          "
                          :key="imageIndex"
                          class="my-0.5"
                          :class="{
                            'send-right-top': i === 0,
                            'send-right-bottom':
                              i === conversation.messages.length - 1,
                            'send-right-middle':
                              i !== 0 && i !== conversation.messages.length - 1,
                          }"
                        >
                          <a
                            v-if="image.mime_type !== 'image/jpeg'"
                            class="flex space-x-2 items-center"
                            :href="image.url"
                          >
                            <svg
                              class="svg-icon"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                overflow: hidden;
                                fill: #ffffff;
                              "
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                              />
                            </svg>
                            <span
                              class="line_break hover:underline text-left"
                              >{{ image.name }}</span
                            >
                          </a>
                        </div>
                      </template>
                    </template>
                    <template
                      v-else-if="
                        message.archivedAttachments.length > 0 &&
                        conversation.messages.length > 1
                      "
                    >
                      <template
                        v-for="(
                          image, imageIndex
                        ) in message.archivedAttachments"
                      >
                        <div
                          v-if="
                            image.mime_type !== 'image/jpeg' &&
                            image.mime_type !== 'image/jpg' &&
                            image.mime_type !== 'image/png' &&
                            image.mime_type !== 'image/svg' &&
                            image.mime_type !== 'image/apng' &&
                            image.mime_type !== 'image/gif' &&
                            image.mime_type !== 'video/mp4' &&
                            image.mime_type !== 'video/webm' &&
                            image.mime_type !== 'video/ogg' &&
                            image.mime_type !== 'audio/mpeg' &&
                            image.mime_type !== 'audio/mp3' &&
                            image.mime_type !== 'audio/wav'
                          "
                          :key="imageIndex"
                          :class="{
                            'send-right-top':
                              imageIndex === 0 &&
                              conversation.messages.length === 1,
                            'send-right-bottom':
                              imageIndex ===
                                message.archivedAttachments.length - 1 &&
                              (conversation.messages.length === 1 ||
                                conversation.messages.length === 2),
                            'send-right-middle my-1.5':
                              (imageIndex !== 0 || imageIndex === 0) &&
                              (imageIndex !==
                                message.archivedAttachments.length - 1 ||
                                imageIndex ===
                                  message.archivedAttachments.length - 1) &&
                              conversation.messages.length > 1,
                            'send-right-all':
                              message.archivedAttachments.length === 1 &&
                              conversation.messages.length === 1,
                          }"
                        >
                          <a
                            v-if="image.mime_type !== 'image/jpeg'"
                            class="flex space-x-2 items-center"
                            :href="image.url"
                          >
                            <svg
                              class="svg-icon"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                overflow: hidden;
                                fill: #ffffff;
                              "
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                              />
                            </svg>
                            <span
                              class="line_break hover:underline text-left"
                              >{{ image.name }}</span
                            >
                          </a>
                        </div>
                      </template>
                    </template>
                    <template
                      v-else-if="
                        message.archivedAttachments.length > 0 &&
                        conversation.messages.length === 1
                      "
                    >
                      <template
                        v-for="(
                          image, imageIndex
                        ) in message.archivedAttachments"
                      >
                        <div
                          v-if="
                            image.mime_type !== 'image/jpeg' &&
                            image.mime_type !== 'image/jpg' &&
                            image.mime_type !== 'image/png' &&
                            image.mime_type !== 'image/svg' &&
                            image.mime_type !== 'image/apng' &&
                            image.mime_type !== 'image/gif' &&
                            image.mime_type !== 'video/mp4' &&
                            image.mime_type !== 'video/webm' &&
                            image.mime_type !== 'video/ogg' &&
                            image.mime_type !== 'audio/mpeg' &&
                            image.mime_type !== 'audio/mp3' &&
                            image.mime_type !== 'audio/wav'
                          "
                          :key="imageIndex"
                          :class="{
                            'send-right-top': imageIndex === 0,
                            'send-right-bottom':
                              imageIndex ===
                              message.archivedAttachments.length - 1,
                            'send-right-middle my-1.5':
                              imageIndex !== 0 &&
                              imageIndex !==
                                message.archivedAttachments.length - 1,
                            'send-right-all':
                              message.archivedAttachments.length === 1 &&
                              conversation.messages.length === 1,
                          }"
                        >
                          <a
                            v-if="image.mime_type !== 'image/jpeg'"
                            class="flex space-x-2 items-center"
                            :href="image.url"
                          >
                            <svg
                              class="svg-icon"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                overflow: hidden;
                                fill: #ffffff;
                              "
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                              />
                            </svg>
                            <span
                              class="line_break hover:underline text-left"
                              >{{ image.name }}</span
                            >
                          </a>
                        </div>
                      </template>
                    </template>

                    <!-- <template
                      v-else-if="
                        message.attachments.length > 0 &&
                        conversation.messages.length > 1
                      "
                    >
                      <template
                        v-for="(image, imageIndex) in message.attachments"
                      >
                        <div
                          v-if="
                            image.mime_type !== 'image/jpeg' &&
                            image.mime_type !== 'image/jpg' &&
                            image.mime_type !== 'image/png' &&
                            image.mime_type !== 'image/svg' &&
                            image.mime_type !== 'image/apng' &&
                            image.mime_type !== 'image/gif' &&
                            image.mime_type !== 'video/mp4' &&
                            image.mime_type !== 'video/webm' &&
                            image.mime_type !== 'video/ogg' &&
                            image.mime_type !== 'audio/mpeg' &&
                            image.mime_type !== 'audio/mp3' &&
                            image.mime_type !== 'audio/wav'
                          "
                          :key="imageIndex"
                          :class="{
                            'send-right-top':
                              imageIndex === 0 &&
                              conversation.messages.length === 1,
                            'send-right-bottom':
                              imageIndex === message.attachments.length - 1 &&
                              (conversation.messages.length === 1 ||
                                conversation.messages.length === 2),
                            'send-right-middle my-1.5':
                              (imageIndex !== 0 || imageIndex === 0) &&
                              (imageIndex !== message.attachments.length - 1 ||
                                imageIndex ===
                                  message.attachments.length - 1) &&
                              conversation.messages.length > 1,
                            'send-right-all':
                              message.attachments.length === 1 &&
                              conversation.messages.length === 1,
                          }"
                        >
                          <a
                            v-if="image.mime_type !== 'image/jpeg'"
                            class="flex space-x-2 items-center"
                            :href="image.url"
                          >
                            <svg
                              class="svg-icon"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                overflow: hidden;
                                fill: #ffffff;
                              "
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                              />
                            </svg>
                            <span
                              class="line_break hover:underline text-left"
                              >{{ image.name }}</span
                            >
                          </a>
                        </div>
                      </template>
                    </template>
                    <template
                      v-else-if="
                        message.attachments.length > 0 &&
                        conversation.messages.length === 1
                      "
                    >
                      <template
                        v-for="(image, imageIndex) in message.attachments"
                      >
                        <div
                          v-if="
                            image.mime_type !== 'image/jpeg' &&
                            image.mime_type !== 'image/jpg' &&
                            image.mime_type !== 'image/png' &&
                            image.mime_type !== 'image/svg' &&
                            image.mime_type !== 'image/apng' &&
                            image.mime_type !== 'image/gif' &&
                            image.mime_type !== 'video/mp4' &&
                            image.mime_type !== 'video/webm' &&
                            image.mime_type !== 'video/ogg' &&
                            image.mime_type !== 'audio/mpeg' &&
                            image.mime_type !== 'audio/mp3' &&
                            image.mime_type !== 'audio/wav'
                          "
                          :key="imageIndex"
                          :class="{
                            'send-right-top': imageIndex === 0,
                            'send-right-bottom':
                              imageIndex === message.attachments.length - 1,
                            'send-right-middle my-1.5':
                              imageIndex !== 0 &&
                              imageIndex !== message.attachments.length - 1,
                            'send-right-all':
                              message.attachments.length === 1 &&
                              conversation.messages.length === 1,
                          }"
                        >
                          <a
                            v-if="image.mime_type !== 'image/jpeg'"
                            class="flex space-x-2 items-center"
                            :href="image.url"
                          >
                            <svg
                              class="svg-icon"
                              style="
                                width: 20px;
                                height: 20px;
                                vertical-align: middle;
                                overflow: hidden;
                                fill: #ffffff;
                              "
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                              />
                            </svg>
                            <span
                              class="line_break hover:underline text-left"
                              >{{ image.name }}</span
                            >
                          </a>
                        </div>
                      </template>
                    </template> -->
                  </template>
                  <template v-else>
                    <template v-if="message.archivedAttachments.length > 0">
                      <div class="grid gap-0.5 grid-cols-2 my-0.5">
                        <div
                          v-for="(
                            image, imageIndex
                          ) in message.archivedAttachments"
                          :key="imageIndex"
                          class="bg-white rounded-xl col-span-2 max-w-300"
                        >
                          <img
                            class="
                              object-cover
                              rounded-xl
                              max-h-full max-w-full
                              w-full
                              shadow-sm
                              border
                            "
                            :class="
                              message.archivedAttachments.length > 1
                                ? 'max-h-full max-w-full w-full'
                                : ''
                            "
                            :src="image"
                            alt
                          />
                        </div>
                      </div>
                    </template>
                    <!-- <template v-else-if="message.attachments.length > 0">
                      <div class="grid gap-0.5 grid-cols-2 my-0.5">
                        <div
                          v-for="(image, imageIndex) in message.attachments"
                          :key="imageIndex"
                          class="bg-white rounded-xl col-span-2 max-w-300"
                        >
                          <img
                            class="
                              object-cover
                              rounded-xl
                              max-h-full max-w-full
                              w-full
                              shadow-sm
                              border
                            "
                            :class="
                              message.attachments.length > 1
                                ? 'max-h-full max-w-full w-full'
                                : ''
                            "
                            :src="image"
                            alt
                          />
                        </div>
                      </div>
                    </template> -->
                  </template>
                </div>
              </div>
            </div>

            <div
              v-else-if="conversation.user"
              class="receive-left-wrapp flex flex-col my-2 max-w-75"
            >
              <div class="flex items-center mr-2">
                <div class="sender-image m-2 self-end">
                  <img
                    v-if="conversationUser.profileImageUrl"
                    class="
                      w-13-point-5
                      h-13-point-5
                      rounded-full
                      object-cover
                      border border-gray-400
                    "
                    :src="conversationUser.profileImageUrl"
                    :alt="`${
                      conversationUser.name
                        ? conversationUser.name
                        : conversationOwner.username
                    }'s Profile Picture`"
                  />
                  <template v-else>
                    <div
                      v-if="allMessagePersons.provider === 'Facebook'"
                      class="w-13-point-5 h-13-point-5 rounded-full"
                    >
                      <facebook-icon
                        class="w-13-point-5 h-13-point-5 border border-gray-400"
                      ></facebook-icon>
                    </div>
                    <instagram-icon
                      v-if="allMessagePersons.provider === 'Instagram'"
                      class="w-13-point-5 h-13-point-5 border border-gray-400"
                    ></instagram-icon>
                    <div
                      v-if="allMessagePersons.provider === 'Twitter'"
                      class="w-13-point-5 h-13-point-5 rounded-full"
                    >
                      <twitter-icon
                        class="w-13-point-5 h-13-point-5 border border-gray-400"
                      ></twitter-icon>
                    </div>
                    <div
                      v-if="allMessagePersons.provider === 'LinkedIn'"
                      class="w-13-point-5 h-13-point-5 rounded-full"
                    >
                      <linkedin-icon
                        class="w-13-point-5 h-13-point-5 border border-gray-400"
                      ></linkedin-icon>
                    </div>
                  </template>
                </div>
                <div class="receive-left text-gray-1200 space-y-1">
                  <div class="w-full py-2 text-gray-1700 flex justify-start">
                    <p>
                      <DateTime
                        :datetime="conversation.date"
                        format="MMMM, dd yyyy, hh:mm aa"
                        :show-time="true"
                        class="whitespace-nowrap"
                      />
                    </p>
                  </div>
                  <div
                    v-for="(message, i) in conversation.messages"
                    :key="message.id"
                  >
                    <template
                      v-if="message.text && conversation.messages.length > 1"
                    >
                      <div
                        class="line_break text-left"
                        :class="[
                          isDesktop || isTabDevice ? 'max-w-600' : 'max-w-300',
                          i === 0
                            ? (message.text.length <= 60 &&
                                (isDesktop || isTabDevice)) ||
                              (message.text.length <= 28 && isMediumDesktop) ||
                              (message.text.length <= 28 && isMobile)
                              ? 'receive-left-top'
                              : 'receive-left-top-radius'
                            : '',
                          i === conversation.messages.length - 1
                            ? (message.text.length <= 60 &&
                                (isDesktop || isTabDevice)) ||
                              (message.text.length <= 28 && isMediumDesktop) ||
                              (message.text.length <= 28 && isMobile)
                              ? 'receive-left-bottom'
                              : 'receive-left-bottom-radius'
                            : '',
                          i !== 0 && i !== conversation.messages.length - 1
                            ? (message.text.length <= 60 &&
                                (isDesktop || isTabDevice)) ||
                              (message.text.length <= 28 && isMediumDesktop) ||
                              (message.text.length <= 28 && isMobile)
                              ? 'receive-left-middle'
                              : 'receive-left-middle-radius'
                            : '',
                        ]"
                      >
                        {{ message.text }}
                      </div>
                    </template>
                    <template v-else-if="message.text">
                      <div
                        class="line_break text-left max-w-300"
                        :class="[
                          isDesktop || isTabDevice ? 'max-w-600' : 'max-w-300',
                          (message.text.length <= 60 &&
                            (isDesktop || isTabDevice)) ||
                          (message.text.length <= 28 && isMediumDesktop) ||
                          (message.text.length <= 28 && isMobile)
                            ? 'receive-left-all'
                            : 'receive-left-all-radius',
                        ]"
                      >
                        {{ message.text }}
                      </div>
                    </template>
                    <template v-if="message.provider === 'Facebook'">
                      <template v-if="message.archivedAttachments.length > 0">
                        <div
                          class="grid gap-0.5 max-w-300"
                          :class="
                            message.archivedAttachments.length < 5
                              ? 'grid-cols-2'
                              : 'grid-cols-3'
                          "
                        >
                          <div
                            v-for="(
                              image, imageIndex
                            ) in message.archivedAttachments"
                            :key="imageIndex"
                            class="bg-white rounded-xl"
                            :class="
                              message.archivedAttachments.length > 1 &&
                              image.mime_type !== 'video/mp4'
                                ? 'col-span-1 max-h-52'
                                : 'col-span-2 max-w-300'
                            "
                          >
                            <img
                              v-if="
                                image.mime_type === 'image/jpeg' ||
                                image.mime_type === 'image/jpg' ||
                                image.mime_type === 'image/png' ||
                                image.mime_type === 'image/svg' ||
                                image.mime_type === 'image/apng' ||
                                image.mime_type === 'image/gif'
                              "
                              class="
                                object-fill
                                rounded-xl
                                max-h-full max-w-full
                                w-full
                                shadow-sm
                                border
                              "
                              :class="
                                message.archivedAttachments.length > 1
                                  ? 'max-h-full max-w-full w-full'
                                  : ''
                              "
                              :src="image.url"
                              alt
                            />
                            <video
                              v-else-if="
                                image.mime_type === 'video/mp4' ||
                                image.mime_type === 'video/webm'
                              "
                              class="w-full rounded-xl shadow-sm"
                              height="400"
                              controls="controls"
                            >
                              <source :src="image.url" />
                              <source :src="image.preview_url" />
                            </video>
                            <audio
                              v-else-if="
                                image.mime_type === 'audio/mpeg' ||
                                image.mime_type === 'audio/mp3' ||
                                image.mime_type === 'audio/wav'
                              "
                              class="receive-audio"
                              controls
                            >
                              <source
                                :src="image.url"
                                :type="image.mime_type"
                              />
                            </audio>
                          </div>
                        </div>
                      </template>
                      <!-- <template v-else-if="message.attachments.length > 0">
                        <div
                          class="grid gap-0.5 max-w-300"
                          :class="
                            message.attachments.length < 5
                              ? 'grid-cols-2'
                              : 'grid-cols-3'
                          "
                        >
                          <div
                            v-for="(image, imageIndex) in message.attachments"
                            :key="imageIndex"
                            class="bg-white rounded-xl"
                            :class="
                              message.attachments.length > 1 &&
                              image.mime_type !== 'video/mp4'
                                ? 'col-span-1 max-h-52'
                                : 'col-span-2 max-w-300'
                            "
                          >
                            <img
                              v-if="
                                image.mime_type === 'image/jpeg' ||
                                image.mime_type === 'image/jpg' ||
                                image.mime_type === 'image/png' ||
                                image.mime_type === 'image/svg' ||
                                image.mime_type === 'image/apng' ||
                                image.mime_type === 'image/gif'
                              "
                              class="
                                object-fill
                                rounded-xl
                                max-h-full max-w-full
                                w-full
                                shadow-sm
                                border
                              "
                              :class="
                                message.attachments.length > 1
                                  ? 'max-h-full max-w-full w-full'
                                  : ''
                              "
                              :src="image.url"
                              alt
                            />
                            <video
                              v-else-if="
                                image.mime_type === 'video/mp4' ||
                                image.mime_type === 'video/webm'
                              "
                              class="w-full rounded-xl shadow-sm"
                              height="400"
                              controls="controls"
                            >
                              <source :src="image.url" />
                              <source :src="image.preview_url" />
                            </video>
                            <audio
                              v-else-if="
                                image.mime_type === 'audio/mpeg' ||
                                image.mime_type === 'audio/mp3' ||
                                image.mime_type === 'audio/wav'
                              "
                              class="receive-audio"
                              controls
                            >
                              <source
                                :src="image.url"
                                :type="image.mime_type"
                              />
                            </audio>
                          </div>
                        </div>
                      </template> -->
                      <template
                        v-if="message.archivedSticker || message.sticker"
                      >
                        <div class="grid grid-cols-2">
                          <div class="col-span-2 max-w-120">
                            <img
                              class="object-cover max-h-full max-w-full w-full"
                              :src="
                                message.archivedSticker
                                  ? message.archivedSticker
                                  : message.sticker
                              "
                              alt
                            />
                          </div>
                        </div>
                      </template>
                      <template v-if="message.archivedAttachments.length > 0">
                        <template
                          v-for="(
                            image, imageIndex
                          ) in message.archivedAttachments"
                        >
                          <div
                            v-if="
                              image.mime_type !== 'image/jpeg' &&
                              image.mime_type !== 'image/jpg' &&
                              image.mime_type !== 'image/png' &&
                              image.mime_type !== 'image/svg' &&
                              image.mime_type !== 'image/apng' &&
                              image.mime_type !== 'image/gif' &&
                              image.mime_type !== 'video/mp4' &&
                              image.mime_type !== 'video/webm' &&
                              image.mime_type !== 'video/ogg' &&
                              image.mime_type !== 'audio/mpeg' &&
                              image.mime_type !== 'audio/mp3' &&
                              image.mime_type !== 'audio/wav'
                            "
                            :key="imageIndex"
                            :class="{
                              'receive-left-top': i === 0,
                              'receive-left-bottom':
                                i === conversation.messages.length - 1,
                              'receive-left-middle':
                                i !== 0 &&
                                i !== conversation.messages.length - 1,
                            }"
                          >
                            <a
                              v-if="image.mime_type !== 'image/jpeg'"
                              class="flex space-x-2 items-center"
                              :href="image.url"
                            >
                              <svg
                                class="svg-icon"
                                style="
                                  width: 20px;
                                  height: 20px;
                                  vertical-align: middle;
                                  overflow: hidden;
                                  fill: currentColor;
                                "
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                                />
                              </svg>
                              <span
                                class="line_break hover:underline text-left"
                                >{{ image.name }}</span
                              >
                            </a>
                          </div>
                        </template>
                      </template>
                      <!-- <template v-else-if="message.attachments.length > 0">
                        <template
                          v-for="(image, imageIndex) in message.attachments"
                        >
                          <div
                            v-if="
                              image.mime_type !== 'image/jpeg' &&
                              image.mime_type !== 'image/jpg' &&
                              image.mime_type !== 'image/png' &&
                              image.mime_type !== 'image/svg' &&
                              image.mime_type !== 'image/apng' &&
                              image.mime_type !== 'image/gif' &&
                              image.mime_type !== 'video/mp4' &&
                              image.mime_type !== 'video/webm' &&
                              image.mime_type !== 'video/ogg' &&
                              image.mime_type !== 'audio/mpeg' &&
                              image.mime_type !== 'audio/mp3' &&
                              image.mime_type !== 'audio/wav'
                            "
                            :key="imageIndex"
                            :class="{
                              'receive-left-top': i === 0,
                              'receive-left-bottom':
                                i === conversation.messages.length - 1,
                              'receive-left-middle':
                                i !== 0 &&
                                i !== conversation.messages.length - 1,
                            }"
                          >
                            <a
                              v-if="image.mime_type !== 'image/jpeg'"
                              class="flex space-x-2 items-center"
                              :href="image.url"
                            >
                              <svg
                                class="svg-icon"
                                style="
                                  width: 20px;
                                  height: 20px;
                                  vertical-align: middle;
                                  overflow: hidden;
                                  fill: currentColor;
                                "
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M481.706667 670.293333a42.666667 42.666667 0 0 0 14.08 8.96 42.666667 42.666667 0 0 0 32.426666 0 42.666667 42.666667 0 0 0 14.08-8.96l128-128a42.666667 42.666667 0 0 0-60.586666-60.586666L554.666667 537.173333V384a42.666667 42.666667 0 0 0-85.333334 0v153.173333l-55.04-55.466666a42.666667 42.666667 0 0 0-60.586666 0 42.666667 42.666667 0 0 0 0 60.586666zM512 938.666667A426.666667 426.666667 0 1 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667z m0-768a341.333333 341.333333 0 1 1-341.333333 341.333333 341.333333 341.333333 0 0 1 341.333333-341.333333z"
                                />
                              </svg>
                              <span
                                class="line_break hover:underline text-left"
                                >{{ image.name }}</span
                              >
                            </a>
                          </div>
                        </template>
                      </template> -->
                    </template>
                    <template v-else>
                      <template v-if="message.archivedAttachments.length > 0">
                        <div class="grid gap-0.5 grid-cols-2">
                          <div
                            v-for="(
                              image, imageIndex
                            ) in message.archivedAttachments"
                            :key="imageIndex"
                            class="bg-white rounded-xl col-span-2 max-w-300"
                          >
                            <img
                              class="
                                object-cover
                                rounded-xl
                                max-h-full max-w-full
                                w-full
                                shadow-sm
                                border
                              "
                              :class="
                                message.archivedAttachments.length > 1
                                  ? 'max-h-full max-w-full w-full'
                                  : ''
                              "
                              :src="image"
                              alt
                            />
                          </div>
                        </div>
                      </template>
                      <!-- <template v-else-if="message.attachments.length > 0">
                        <div class="grid gap-0.5 grid-cols-2">
                          <div
                            v-for="(image, imageIndex) in message.attachments"
                            :key="imageIndex"
                            class="bg-white rounded-xl col-span-2 max-w-300"
                          >
                            <img
                              class="
                                object-cover
                                rounded-xl
                                max-h-full max-w-full
                                w-full
                                shadow-sm
                                border
                              "
                              :class="
                                message.attachments.length > 1
                                  ? 'max-h-full max-w-full w-full'
                                  : ''
                              "
                              :src="image"
                              alt
                            />
                          </div>
                        </div>
                      </template> -->
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          v-if="conversations.length === 0"
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

      <div
        v-if="currentComp === 'Instagram' && hideText($config.workflow)"
        class="rounded-b-3xl message-border-radius bg-white w-full"
      >
        <div class="message-border w-full pl-3 pr-4">
          <div class="flex space-x-2 items-center h-9">
            <SmileFace
              class="min-width cursor-pointer"
              @click.native="toggleEmojiPicker"
            ></SmileFace>
            <input
              v-model="emojisOutput"
              type="text"
              class="
                message-placeholder
                px-2
                pb-0.5
                border-none
                outline-none
                w-full
              "
              placeholder="Message…"
            />
            <div v-show="showEmojiPicker">
              <Picker
                :data="emojiIndex"
                set="twitter"
                :show-preview="false"
                :style="{
                  position: 'absolute',
                  bottom: '38px',
                  left: '0px',
                  width: '100%',
                  height: '80%',
                }"
                @select="showEmoji"
              />
            </div>
            <ImageIcon class="min-width" @click.native="onPickFile"></ImageIcon>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFilePicked"
            />
            <LoveIcon
              class="min-width"
              @click.native="sendHeartEmoji"
            ></LoveIcon>
          </div>
        </div>
      </div>
    </template>

    <template v-if="showMessageskeleton">
      <div class="bg-gray-1500 rounded-t-xl messageAvatarInfo animate-pulse">
        <div class="flex rounded-md">
          <div class="profileAvatar m-2">
            <div
              class="
                w-13
                h-13
                rounded-full
                object-cover
                border border-gray-400
                bg-white
              "
            ></div>
          </div>
          <div class="messageInfo self-center">
            <div class="userDetails">
              <div class="name bg-white w-20 h-6 text-xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          animate-pulse
          messageWrapper
          rounded-b-xl
          text-lg
          2xl:text-xl
          bg-white
          mt-1
          py-4
          overflow-scroll
          scroll
        "
      >
        <div v-for="message in 5" :key="message" class="w-full">
          <!-- <div class="w-full py-2 text-gray-1700">
          <p>
            <DateTime
              :datetime="message.createdAt"
              format="MMMM, dd yyyy, hh:mm aa"
              :show-time="false"
              class="whitespace-nowrap"
            />
          </p>
          </div>-->
          <div class="send-right-wrapper flex flex-row-reverse">
            <div class="send-right my-2 max-w-75">
              <!-- <div class="send-right-top">I am going to be free from tomorrow.</div> -->
              <div class="bg-gray-500 h-6 w-26 rounded-full"></div>
              <!-- <div class="send-right-bottom">Do you have any plan?</div> -->
            </div>
            <!-- <div class="receive-left-bottom">
            Let me know what you are thinking
          </div> -->
          </div>

          <div class="receive-left-wrapper">
            <div class="sender-image m-2 self-end">
              <div
                class="
                  w-13-point-5
                  h-13-point-5
                  rounded-full
                  object-cover
                  border border-gray-400
                  bg-gray-500
                "
              ></div>
            </div>
            <div class="receive-left space-y-1">
              <div class="bg-gray-500 h-6 w-26 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useBreakpoints } from '@vueuse/core'
import { mapState, mapGetters } from 'vuex'
import data from 'emoji-mart-vue-fast/data/all.json'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
import FacebookIcon from '~/components/shared/icon/FacebookIcon.vue'
import LinkedinIcon from '~/components/shared/icon/LinkedinIcon.vue'
import TwitterIcon from '~/components/shared/icon/TwitterIcon.vue'
import InstagramIcon from '~/components/shared/icon/InstagramIcon.vue'
import SmileFace from '~/components/shared/icon/SmileFace.vue'
import ImageIcon from '~/components/shared/icon/ImageIcon.vue'
import LoveIcon from '~/components/shared/icon/LoveIcon.vue'
import { useHideText } from '~/composables/feeds/useHideText'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
const emojiIndex = new EmojiIndex(data)
const index = new EmojiIndex(data)

export default defineComponent({
  components: {
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    InstagramIcon,
    SmileFace,
    ImageIcon,
    LoveIcon,
    Picker,
  },
  props: {
    messageId: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { hideText } = useHideText()

    const breakpoints = useBreakpoints({
      largeDesktop: 1920,
      desktop: 1440,
      tab: 768,
      mediumDevice: 768,
      small: 225,
    })

    return {
      hideText,
      isDesktop: breakpoints.greater('largeDesktop'),
      isMediumDesktop: breakpoints.between('desktop', 'largeDesktop'),
      isTabDevice: breakpoints.between('tab', 'desktop'),
      isMobile: breakpoints.between('small', 'mediumDevice'),
      // isMediumDevice: breakpoints.greater('mediumDevice'),
    }
  },
  data() {
    return {
      searchText: '',
      placeholder: 'Search',
      index,
      emojiIndex,
      emojisOutput: '',
      showEmojiPicker: false,
      messages: '',
      photo: null,
      heart: [],
      height: 0,
    }
  },
  computed: {
    santaEmojiObject() {
      return index.findEmoji(':santa:')
    },
    ...mapState('home', [
      'singleCovertions',
      'pageId',
      'conversationUser',
      'conversationOwner',
      'newLoadMessages',
      'allMessagePersons',
      'showMessageskeleton',
      'showMoreMessageSkeleton',
      'messageCount',
    ]),
    ...mapGetters('home', ['currentComp']),
    getSingleCoversations() {
      return this.$store.getters['home/getSingleCoversations']
    },
    conversations() {
      return this.$store.getters['home/conversations']
    },
  },
  watch: {
    showMessageskeleton(data) {
      if (!data) {
        setTimeout(() => {
          this.addScroll()
          document.getElementById(this.messageId).scrollTop =
            document.getElementById(this.messageId).scrollHeight
        }, 200)
      }
    },
    showMoreMessageSkeleton(data) {
      if (data) {
        setTimeout(() => {
          document.getElementById(this.messageId).scrollTop =
            document.getElementById('messageSkeleton').offsetHeight
        }, 200)
      }
    },
  },
  methods: {
    measureHeight(id) {
      if (
        !this.showMessageskeleton &&
        !this.showMoreMessageSkeleton &&
        document.getElementById(id)
      ) {
        // setTimeout(() => {
        this.height = document.getElementById(id).offsetHeight
        // }, 800)
      }
      return this.height !== 0 ? this.height : ''
    },
    showEmoji(emoji) {
      this.emojisOutput = this.emojisOutput + emoji.native
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.photo = files[0]
    },
    sendHeartEmoji() {
      this.heart.push('🧡')
    },
    showAllMessagePerson() {
      this.$store.commit('home/SET_CURRENT_MESSAGE', 'AllMessagePerson')
    },
    images(archiveAttachments, attachments) {
      let temp = []
      if (archiveAttachments.length > 0) {
        temp = archiveAttachments.filter(
          (x) =>
            x.mime_type === 'image/jpeg' ||
            x.mime_type === 'image/jpg' ||
            x.mime_type === 'image/png' ||
            x.mime_type === 'image/svg' ||
            x.mime_type === 'image/apng' ||
            x.mime_type === 'image/gif'
        )
      } else if (attachments.length > 0) {
        temp = attachments.filter(
          (x) =>
            x.mime_type === 'image/jpeg' ||
            x.mime_type === 'image/jpg' ||
            x.mime_type === 'image/png' ||
            x.mime_type === 'image/svg' ||
            x.mime_type === 'image/apng' ||
            x.mime_type === 'image/gif'
        )
      }
      return temp
    },
    otherAttachments(archiveAttachments, attachments) {
      let temp = []
      if (archiveAttachments.length > 0) {
        temp = archiveAttachments.filter(
          (x) =>
            x.mime_type === 'video/mp4' ||
            x.mime_type === 'video/webm' ||
            x.mime_type === 'video/ogg' ||
            x.mime_type === 'audio/mpeg' ||
            x.mime_type === 'audio/mp3' ||
            x.mime_type === 'audio/wav'
        )
      } else if (attachments.length > 0) {
        temp = attachments.filter(
          (x) =>
            x.mime_type === 'video/mp4' ||
            x.mime_type === 'video/webm' ||
            x.mime_type === 'video/ogg' ||
            x.mime_type === 'audio/mpeg' ||
            x.mime_type === 'audio/mp3' ||
            x.mime_type === 'audio/wav'
        )
      }
      return temp
    },

    loadMore(event) {
      const element = event.target
      let totalMessages = 0
      this.conversations.forEach((element) => {
        totalMessages = totalMessages + element.messages.length
      })
      if (
        parseInt(element.scrollTop) === 0 &&
        !this.showMoreMessageSkeleton &&
        this.newLoadMessages.length > 0 &&
        totalMessages > 19
      ) {
        this.$store.commit('home/SET_MORE_MESSAGE_SKELETON', true)
        this.$store.dispatch(
          'home/getMoreMessages',
          this.singleCovertions.messages[0]
        )
      }
    },
    addScroll() {
      const conatiner = document.getElementById(this.messageId)
      conatiner.addEventListener('scroll', this.loadMore)
    },
    removeScroll() {
      const conatiner = document.getElementById(this.messageId)
      conatiner.removeEventListener('scroll', this.loadMore)
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-border {
  border-radius: 20px;
}
.backButton {
  height: 50px;
  width: 50px;
  writing-mode: vertical-rl;
}
.backButtonInner {
  text-align: -webkit-center;
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
.messageWrapper {
  // height: calc(100% - 160px);
  height: 100%;
}
.messageAvatarInfo {
  @apply mt-1;
  box-shadow: 0px 2px 1px #00000029;
}

.message-border {
  border: 1px solid #656565;
  border-radius: 24px;
}

.message-border-radius {
  border-radius: 0 0 22px 22px;
}

.message-placeholder::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
  color: #8b8b8b;
  background: transparent;
}

.min-width {
  min-width: 24px;
}

.smile-min-width {
  min-width: 22px;
  min-height: 22px;
}

.send-right {
  text-align: -webkit-right;
  margin-right: 16px;
}

.send-right-top {
  @apply py-2 px-3;
  background: #119cfb;
  border-radius: 35px 35px 5px 35px;
  opacity: 1;
  width: fit-content;
}

.send-right-top-radius {
  @apply py-2.5 px-3.5;
  background: #119cfb;
  border-radius: 20px 20px 5px 20px;
  opacity: 1;
  width: fit-content;
}

.send-right-middle {
  @apply py-2 px-3;
  background: #119cfb;
  border-radius: 35px 5px 5px 35px;
  opacity: 1;
  width: fit-content;
}

.send-right-middle-radius {
  @apply py-2.5 px-3.5;
  background: #119cfb;
  border-radius: 20px 5px 5px 20px;
  opacity: 1;
  width: fit-content;
}

.send-right-bottom {
  @apply py-2 px-3;
  background: #119cfb;
  border-radius: 35px 5px 35px 35px;
  opacity: 1;
  width: fit-content;
}

.send-right-bottom-radius {
  @apply py-2.5 px-3.5;
  background: #119cfb;
  border-radius: 20px 5px 20px 20px;
  opacity: 1;
  width: fit-content;
}

.send-right-all {
  @apply py-2 px-3;
  background: #119cfb;
  border-radius: 35px 35px 35px 35px;
  opacity: 1;
  width: fit-content;
}

.send-right-all-radius {
  @apply py-2.5 px-3.5;
  background: #119cfb;
  border-radius: 20px 20px 20px 20px;
  opacity: 1;
  width: fit-content;
}

.receive-left-all {
  @apply py-2 px-3;
  background: #e5e6eb;
  border-radius: 35px 35px 35px 35px;
  opacity: 1;
  width: fit-content;
}

.receive-left-all-radius {
  @apply py-2.5 px-3.5;
  background: #e5e6eb;
  border-radius: 20px 20px 20px 20px;
  opacity: 1;
  width: fit-content;
}

.receive-left-wrapper {
  @apply flex items-center my-2 mr-2;
}

.receive-left-top {
  @apply py-2 px-3;
  background: #e5e6eb;
  border-radius: 35px 35px 35px 5px;
  opacity: 1;
  width: fit-content;
}

.receive-left-top-radius {
  @apply py-2.5 px-3.5;
  background: #e5e6eb;
  border-radius: 20px 20px 20px 5px;
  opacity: 1;
  width: fit-content;
}

.receive-left-middle {
  @apply py-2 px-3;
  background: #e5e6eb;
  border-radius: 5px 35px 35px 5px;
  opacity: 1;
  width: fit-content;
}

.receive-left-middle-radius {
  @apply py-2.5 px-3.5;
  background: #e5e6eb;
  border-radius: 5px 20px 20px 5px;
  opacity: 1;
  width: fit-content;
}

.receive-left-bottom {
  @apply py-2 px-3;
  background: #e5e6eb;
  border-radius: 5px 35px 35px 35px;
  opacity: 1;
  width: fit-content;
}

.receive-left-bottom-radius {
  @apply py-2.5 px-3.5;
  background: #e5e6eb;
  border-radius: 5px 20px 20px 20px;
  opacity: 1;
  width: fit-content;
}

.w-13-point-5 {
  width: 54px;
  min-width: 54px;
}
.h-13-point-5 {
  height: 54px;
}
.max-w-75 {
  max-width: 100%;
}

.max-w-500 {
  max-width: 300px;
}

.max-w-240 {
  max-width: 240px;
}

.max-w-300 {
  max-width: 300px;
}

.max-w-600 {
  max-width: 600px;
}

.max-w-120 {
  max-width: 120px;
}

.max-h-120 {
  max-height: 120px;
}

.message-height {
  height: calc(100% - 10px);
}
.receive-audio::-webkit-media-controls-panel {
  background-color: #e5e6eb;
}
.send-audio::-webkit-media-controls-panel {
  background-color: #119cfb;
}
.line_break {
  // white-space: break-spaces;
  word-break: break-word;
}
</style>