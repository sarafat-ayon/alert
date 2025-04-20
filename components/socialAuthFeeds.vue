<template>
  <div>
    <transition name="right-sidebar-trans">
      <div
        v-if="openAddFeedModal && user.userPermission !== 'User'"
        :style="{ '--color': globalColorPanel.backgroundColor }"
        class="
          profile
          fixed
          bg-ash-dark
          right-0
          md:top-15
          h-full
          md:px-5
          p-4
          md:pt-8
          flex flex-col
          overflow-y-auto
          scroll
          md:rounded-l-2xl md:shadow-2xl md:drop-shadow-2xl
        "
      >
        <transition name="fadeInParent">
          <div
            v-if="addFeedSection"
            class="main-wrapper h-full w-full flex flex-col content-between"
          >
            <div class="w-full h-full main-content">
              <div
                class="
                  flex flex-row
                  items-center
                  justify-between
                  md:h-12
                  h-8
                  relative
                "
              >
                <h2
                  :style="{ color: globalColorPanel.backgroundColor }"
                  class="xl:text-2xl md:text-xl md:font-bold text-xl"
                >
                  <transition name="fadeIn">
                    <span v-if="!emailVerified">Add Feeds</span>
                  </transition>
                </h2>
                <button
                  :class="[
                    emailVerified
                      ? 'animLeft justify-start'
                      : 'animRight justify-end',
                  ]"
                  class="
                    absolute
                    focus:outline-none
                    right-0
                    w-6
                    md:w-8
                    h-8
                    flex
                    items-center
                  "
                  @click="emailBackBtn ? back() : setDefineAction()"
                >
                  <fa
                    :style="{ color: globalColorPanel.backgroundColor }"
                    class="xl:text-2xl md:text-xl md:font-bold text-2xl"
                    :icon="['fas', emailBackBtn ? 'chevron-left' : 'times']"
                  />
                </button>
              </div>
              <transition name="modalFadeIn">
                <div
                  v-if="hideInstagramModal"
                  class="
                    w-full
                    main-content
                    flex flex-col
                    items-center
                    justify-center
                    md:mt-0
                    mt-5
                  "
                >
                  <div
                    key="1"
                    class="social-icons-wrapper w-full overflow-hidden"
                    :class="emailVerified ? 'demo2' : 'demo1'"
                    :style="{ '--height': demoHeight }"
                  >
                    <transition name="fadeIn">
                      <div
                        v-if="!emailVerified"
                        class="w-full flex flex-col items-center h-full"
                      >
                        <!-- <div class="text-center">
                        <SelectedAccessType />
                      </div> -->
                        <h2
                          class="
                            text-white
                            md:text-xl
                            text-md
                            md:px-0
                            px-8
                            md:text-left
                            text-center
                            opacity-50
                            mb-5
                          "
                        >
                          If you have access, select to connect:
                        </h2>
                        <p
                          class="text-orange-600 text-center"
                          :style="{ color: globalColorPanel.backgroundColor }"
                        >
                          Email
                        </p>
                        <div
                          class="
                            flex flex-row flex-wrap
                            md:flex-nowrap
                            space-y-4
                            md:space-y-0
                            items-center
                            justify-evenly
                            w-full
                            md:px-12
                            my-4
                            email-logo-wrapper
                          "
                        >
                          <!-- <div class="w-15 h-15 rounded-full bg-white">
                            <img
                              :src="gmail"
                              class="cursor-pointer p-3"
                              alt="gmailSvg Icon"
                              @click.stop="authorize('google')"
                            />
                          </div> -->
                          <!-- <div class="w-15 h-15 rounded-full bg-white">
                            <img
                              :src="microsoftOutlook"
                              class="w-15 h-15 cursor-pointer p-3"
                              alt="microsoftOutlook Icon"
                              @click.stop="authorize('microsoft')"
                            />
                          </div> -->
                          <img
                            v-if="hideText($config.workflow, localDemoHeight)"
                            src="~/assets/img/png/btn_google_signin_light_normal_web.png"
                            class="cursor-pointer"
                            alt="gmailSvg Icon"
                            @click.stop="authorize('google')"
                          />
                          <!-- <div
                            class="
                              bg-white
                              rounded-full
                              p-1.5
                              w-15
                              h-15
                              flex
                              justify-center
                              items-center
                              relative
                            "
                            @click.stop="authorize('microsoft')"
                          >
                            <img
                              :src="microsoftOutlook"
                              class="w-10 h-10 cursor-pointer outlook-icon"
                              alt="microsoftOutlook Icon"
                            />
                          </div> -->

                          <!-- Microsoft Outlook Icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="215" height="41" viewBox="0 0 215 41"
                            class="cursor-pointer"
                            @click="authorize('microsoft')">
                            <title>MS-SymbolLockup</title>
                            <rect width="215" height="41" fill="#fff" />
                            <path d="M214,1V40H1V1H214m1-1H0V41H215V0Z" fill="#8c8c8c" />
                            <path
                              d="M45.812,25.082V23.288a2.849,2.849,0,0,0,.576.4,4.5,4.5,0,0,0,.707.3,5.513,5.513,0,0,0,.747.187,3.965,3.965,0,0,0,.688.065,2.937,2.937,0,0,0,1.637-.365,1.2,1.2,0,0,0,.538-1.062,1.16,1.16,0,0,0-.179-.649,1.928,1.928,0,0,0-.5-.5,5.355,5.355,0,0,0-.757-.435q-.437-.209-.935-.436c-.356-.19-.687-.383-1-.578a4.358,4.358,0,0,1-.8-.648,2.728,2.728,0,0,1-.534-.8,2.6,2.6,0,0,1-.194-1.047,2.416,2.416,0,0,1,.333-1.285,2.811,2.811,0,0,1,.879-.9,4.026,4.026,0,0,1,1.242-.528,5.922,5.922,0,0,1,1.42-.172,5.715,5.715,0,0,1,2.4.374v1.721a3.832,3.832,0,0,0-2.3-.645,4.106,4.106,0,0,0-.773.074,2.348,2.348,0,0,0-.689.241,1.5,1.5,0,0,0-.494.433,1.054,1.054,0,0,0-.19.637,1.211,1.211,0,0,0,.146.608,1.551,1.551,0,0,0,.429.468,4.276,4.276,0,0,0,.688.414c.271.134.584.28.942.436q.547.285,1.036.6a4.881,4.881,0,0,1,.856.7,3.015,3.015,0,0,1,.586.846,2.464,2.464,0,0,1,.217,1.058,2.635,2.635,0,0,1-.322,1.348,2.608,2.608,0,0,1-.868.892,3.82,3.82,0,0,1-1.257.5,6.988,6.988,0,0,1-1.5.155c-.176,0-.392-.014-.649-.04s-.518-.067-.787-.117a7.772,7.772,0,0,1-.761-.187A2.4,2.4,0,0,1,45.812,25.082Z"
                              fill="#5e5e5e" />
                            <path
                              d="M55.129,16.426a1.02,1.02,0,0,1-.714-.272.89.89,0,0,1-.3-.688.916.916,0,0,1,.3-.7,1.008,1.008,0,0,1,.714-.278,1.039,1.039,0,0,1,.732.278.909.909,0,0,1,.3.7.9.9,0,0,1-.3.678A1.034,1.034,0,0,1,55.129,16.426Zm.842,9.074h-1.7V18h1.7Z"
                              fill="#5e5e5e" />
                            <path
                              d="M65.017,24.9q0,4.131-4.153,4.131a6.187,6.187,0,0,1-2.556-.491V26.986a4.726,4.726,0,0,0,2.337.7,2.342,2.342,0,0,0,2.672-2.628V24.24h-.029a2.947,2.947,0,0,1-4.742.436,4.041,4.041,0,0,1-.838-2.684,4.738,4.738,0,0,1,.9-3.04,3,3,0,0,1,2.476-1.128,2.384,2.384,0,0,1,2.2,1.216h.029V18h1.7Zm-1.684-2.835v-.973a1.91,1.91,0,0,0-.524-1.352A1.718,1.718,0,0,0,61.5,19.18a1.793,1.793,0,0,0-1.512.714,3.217,3.217,0,0,0-.546,2,2.774,2.774,0,0,0,.524,1.769,1.678,1.678,0,0,0,1.387.662,1.805,1.805,0,0,0,1.429-.632A2.391,2.391,0,0,0,63.333,22.064Z"
                              fill="#5e5e5e" />
                            <path
                              d="M73.908,25.5h-1.7V21.273q0-2.1-1.486-2.1a1.622,1.622,0,0,0-1.282.582,2.162,2.162,0,0,0-.5,1.469V25.5H67.229V18h1.707v1.245h.029A2.673,2.673,0,0,1,71.4,17.824a2.265,2.265,0,0,1,1.868.795,3.57,3.57,0,0,1,.644,2.3Z"
                              fill="#5e5e5e" />
                            <path
                              d="M80.962,16.426a1.02,1.02,0,0,1-.714-.272.89.89,0,0,1-.3-.688.916.916,0,0,1,.3-.7,1.008,1.008,0,0,1,.714-.278,1.039,1.039,0,0,1,.732.278.909.909,0,0,1,.3.7.9.9,0,0,1-.3.678A1.034,1.034,0,0,1,80.962,16.426ZM81.8,25.5H80.1V18h1.7Z"
                              fill="#5e5e5e" />
                            <path
                              d="M90.7,25.5H89V21.273q0-2.1-1.486-2.1a1.622,1.622,0,0,0-1.282.582,2.157,2.157,0,0,0-.506,1.469V25.5H84.023V18H85.73v1.245h.03a2.673,2.673,0,0,1,2.431-1.421,2.265,2.265,0,0,1,1.868.795,3.57,3.57,0,0,1,.644,2.3Z"
                              fill="#5e5e5e" />
                            <path
                              d="M106.984,18l-2.212,7.5h-1.78l-1.361-5.083a3.215,3.215,0,0,1-.1-.659H101.5a3.069,3.069,0,0,1-.131.644l-1.48,5.1H98.145L95.939,18H97.7l1.363,5.405a3.16,3.16,0,0,1,.087.645H99.2a3.384,3.384,0,0,1,.117-.659L100.832,18h1.6l1.347,5.428a3.732,3.732,0,0,1,.095.644h.052a3.387,3.387,0,0,1,.11-.644L105.365,18Z"
                              fill="#5e5e5e" />
                            <path
                              d="M109.1,16.426a1.018,1.018,0,0,1-.714-.272.886.886,0,0,1-.3-.688.912.912,0,0,1,.3-.7,1.006,1.006,0,0,1,.714-.278,1.039,1.039,0,0,1,.732.278.912.912,0,0,1,.3.7.9.9,0,0,1-.3.678A1.034,1.034,0,0,1,109.1,16.426Zm.841,9.074h-1.7V18h1.7Z"
                              fill="#5e5e5e" />
                            <path
                              d="M116.117,25.42a2.955,2.955,0,0,1-1.31.248q-2.182,0-2.183-2.094V19.333h-1.253V18h1.253V16.264l1.7-.483V18h1.794v1.333h-1.794v3.75a1.484,1.484,0,0,0,.241.952,1.006,1.006,0,0,0,.807.285,1.167,1.167,0,0,0,.746-.248Z"
                              fill="#5e5e5e" />
                            <path
                              d="M124.248,25.5h-1.7V21.4q0-2.226-1.487-2.226a1.556,1.556,0,0,0-1.26.644,2.568,2.568,0,0,0-.513,1.649V25.5h-1.707V14.4h1.707v4.849h.029a2.685,2.685,0,0,1,2.432-1.421q2.5,0,2.5,3.055Z"
                              fill="#5e5e5e" />
                            <path
                              d="M141.907,25.5h-1.728V18.7q0-.835.1-2.043h-.029a6.992,6.992,0,0,1-.285.988L136.831,25.5h-1.2l-3.143-7.793a7.236,7.236,0,0,1-.277-1.047h-.029q.057.63.058,2.058V25.5h-1.611V15h2.453l2.762,7a10.884,10.884,0,0,1,.41,1.2h.036c.181-.551.327-.962.44-1.23L139.541,15h2.366Z"
                              fill="#5e5e5e" />
                            <path
                              d="M145.158,16.426a1.022,1.022,0,0,1-.714-.272.89.89,0,0,1-.3-.688.916.916,0,0,1,.3-.7,1.009,1.009,0,0,1,.714-.278,1.043,1.043,0,0,1,.733.278.911.911,0,0,1,.3.7.9.9,0,0,1-.3.678A1.038,1.038,0,0,1,145.158,16.426ZM146,25.5h-1.7V18H146Z"
                              fill="#5e5e5e" />
                            <path
                              d="M153.589,25.156a4.2,4.2,0,0,1-2.131.52,3.606,3.606,0,0,1-2.695-1.044,3.691,3.691,0,0,1-1.026-2.706,4.07,4.07,0,0,1,1.1-2.978,3.944,3.944,0,0,1,2.948-1.124,4.3,4.3,0,0,1,1.81.36v1.582a2.743,2.743,0,0,0-1.67-.586,2.32,2.32,0,0,0-1.766.728,2.665,2.665,0,0,0-.688,1.908,2.536,2.536,0,0,0,.648,1.838,2.3,2.3,0,0,0,1.739.674,2.716,2.716,0,0,0,1.729-.652Z"
                              fill="#5e5e5e" />
                            <path
                              d="M159.625,19.619a1.4,1.4,0,0,0-.887-.242,1.513,1.513,0,0,0-1.259.682,3.04,3.04,0,0,0-.506,1.852V25.5h-1.7V18h1.7v1.545H157a2.606,2.606,0,0,1,.766-1.233,1.724,1.724,0,0,1,1.154-.444,1.432,1.432,0,0,1,.7.14Z"
                              fill="#5e5e5e" />
                            <path
                              d="M164.02,25.676a3.719,3.719,0,0,1-2.773-1.051,3.8,3.8,0,0,1-1.036-2.787,3.7,3.7,0,0,1,3.991-4.014,3.6,3.6,0,0,1,2.739,1.033,3.986,3.986,0,0,1,.982,2.864,3.932,3.932,0,0,1-1.059,2.875A3.8,3.8,0,0,1,164.02,25.676Zm.08-6.5a1.938,1.938,0,0,0-1.575.7,2.913,2.913,0,0,0-.579,1.919,2.744,2.744,0,0,0,.586,1.856,1.965,1.965,0,0,0,1.568.678,1.87,1.87,0,0,0,1.542-.666,2.956,2.956,0,0,0,.538-1.9,3,3,0,0,0-.538-1.911A1.858,1.858,0,0,0,164.1,19.18Z"
                              fill="#5e5e5e" />
                            <path
                              d="M169.182,25.266V23.691a3.392,3.392,0,0,0,2.1.725q1.539,0,1.538-.908a.714.714,0,0,0-.132-.436,1.241,1.241,0,0,0-.355-.318,2.784,2.784,0,0,0-.527-.25q-.3-.108-.677-.248a7.052,7.052,0,0,1-.832-.389,2.545,2.545,0,0,1-.615-.465,1.745,1.745,0,0,1-.37-.59,2.145,2.145,0,0,1-.125-.769,1.775,1.775,0,0,1,.256-.955,2.223,2.223,0,0,1,.69-.7,3.289,3.289,0,0,1,.98-.425,4.511,4.511,0,0,1,1.136-.143,5.181,5.181,0,0,1,1.86.315v1.487a3.136,3.136,0,0,0-1.816-.542,2.317,2.317,0,0,0-.582.066,1.472,1.472,0,0,0-.443.183.886.886,0,0,0-.286.282.669.669,0,0,0-.1.363.77.77,0,0,0,.1.41.93.93,0,0,0,.3.3,2.654,2.654,0,0,0,.483.234q.282.105.649.23a9.4,9.4,0,0,1,.867.4,2.886,2.886,0,0,1,.656.465,1.806,1.806,0,0,1,.417.6,2.034,2.034,0,0,1,.147.81,1.847,1.847,0,0,1-.264,1,2.205,2.205,0,0,1-.7.7,3.292,3.292,0,0,1-1.015.413,5.222,5.222,0,0,1-1.212.136A5.115,5.115,0,0,1,169.182,25.266Z"
                              fill="#5e5e5e" />
                            <path
                              d="M179.443,25.676a3.717,3.717,0,0,1-2.772-1.051,3.793,3.793,0,0,1-1.036-2.787,3.7,3.7,0,0,1,3.991-4.014,3.6,3.6,0,0,1,2.739,1.033,3.986,3.986,0,0,1,.982,2.864,3.932,3.932,0,0,1-1.059,2.875A3.8,3.8,0,0,1,179.443,25.676Zm.08-6.5a1.936,1.936,0,0,0-1.574.7,2.908,2.908,0,0,0-.579,1.919,2.739,2.739,0,0,0,.586,1.856,1.964,1.964,0,0,0,1.567.678,1.868,1.868,0,0,0,1.542-.666,2.95,2.95,0,0,0,.539-1.9,2.99,2.99,0,0,0-.539-1.911A1.857,1.857,0,0,0,179.523,19.18Z"
                              fill="#5e5e5e" />
                            <path
                              d="M189.067,15.781a1.533,1.533,0,0,0-.784-.2q-1.237,0-1.237,1.4V18h1.743v1.333h-1.736V25.5h-1.7V19.333h-1.282V18h1.282V16.784a2.362,2.362,0,0,1,.777-1.871,2.82,2.82,0,0,1,1.94-.684,2.879,2.879,0,0,1,1,.138Z"
                              fill="#5e5e5e" />
                            <path
                              d="M194.23,25.42a2.955,2.955,0,0,1-1.31.248q-2.182,0-2.183-2.094V19.333h-1.253V18h1.253V16.264l1.7-.483V18h1.793v1.333h-1.793v3.75a1.484,1.484,0,0,0,.241.952,1,1,0,0,0,.806.285,1.165,1.165,0,0,0,.746-.248Z"
                              fill="#5e5e5e" />
                            <rect x="13" y="11" width="9" height="9" fill="#f25022" />
                            <rect x="13" y="21" width="9" height="9" fill="#00a4ef" />
                            <rect x="23" y="11" width="9" height="9" fill="#7fba00" />
                            <rect x="23" y="21" width="9" height="9" fill="#ffb900" />
                          </svg>
                          <!-- <img
                            :src="msExchange"
                            class="w-15 h-15 cursor-pointer"
                            alt="msExchange Icon"
                          />
                          <img
                            :src="msOffice"
                            class="w-15 h-15 cursor-pointer"
                            alt="msOfficeSvg Icon"
                          /> -->
                        </div>
                        <p
                          class="text-orange-600 text-center mb-4"
                          :style="{ color: globalColorPanel.backgroundColor }"
                        >
                          Social Media
                        </p>
                        <div
                          v-if="!emailVerified"
                          class="w-full flex flex-col items-center h-full"
                        >
                          <div
                            class="
                              flex flex-row
                              items-center
                              justify-between
                              w-full
                              md:px-12
                            "
                          >
                            <!-- Twitter Icon -->
                            <svg
                              class="rounded-full w-15 h-15 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 53.48 53.48"
                              @click.stop="authorize('twitter')"
                            >
                              <defs>
                                <style>
                                  .twitter-1 {
                                    fill: #5ea9de;
                                  }
                                  .twitter-2 {
                                    fill: #f1f2f2;
                                  }
                                </style>
                              </defs>
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <circle
                                    id="Ellipse_84"
                                    data-name="Ellipse 84"
                                    class="twitter-1"
                                    cx="26.74"
                                    cy="26.74"
                                    r="26.74"
                                  />
                                  <path
                                    id="Path_2048"
                                    data-name="Path 2048"
                                    class="twitter-2"
                                    d="M43.12,19.22a13.07,13.07,0,0,1-3.67,1,6.44,6.44,0,0,0,2.81-3.53,12.84,12.84,0,0,1-4.06,1.55,6.4,6.4,0,0,0-10.89,5.83,18.15,18.15,0,0,1-13.17-6.68,6.39,6.39,0,0,0,2,8.53,6.24,6.24,0,0,1-2.9-.8v.08a6.4,6.4,0,0,0,5.12,6.27,6.52,6.52,0,0,1-2.88.11,6.4,6.4,0,0,0,6,4.44A12.92,12.92,0,0,1,12,38.66a18.19,18.19,0,0,0,28-15.31c0-.28,0-.55,0-.83a12.88,12.88,0,0,0,3.19-3.31Z"
                                  />
                                </g>
                              </g>
                            </svg>

                            <!-- Facebook Icon -->
                            <svg
                              class="rounded-full w-15 h-15 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 53.48 53.48"
                              @click.stop="authorize('facebook')"
                            >
                              <defs>
                                <style>
                                  .facebook-1 {
                                    fill: #3c5999;
                                  }
                                  .facebook-2 {
                                    fill: #fff;
                                  }
                                </style>
                              </defs>
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <circle
                                    id="Ellipse_85"
                                    data-name="Ellipse 85"
                                    class="facebook-1"
                                    cx="26.74"
                                    cy="26.74"
                                    r="26.74"
                                  />
                                  <path
                                    id="Path_2049"
                                    data-name="Path 2049"
                                    class="facebook-2"
                                    d="M33.46,27.78H28.7V45.26H21.46V27.78H18V21.64h3.44v-4a6.77,6.77,0,0,1,6.21-7.29,6.61,6.61,0,0,1,1.09,0l5.34,0v6H30.22a1.45,1.45,0,0,0-1.54,1.38h0a1.31,1.31,0,0,0,0,.28v3.61h5.4Z"
                                  />
                                </g>
                              </g>
                            </svg>

                            <!-- LinkedIn Icon -->
                            <svg
                              class="rounded-full w-15 h-15 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 53.48 53.48"
                              @click.stop="authorize('linkedin')"
                            >
                              <defs>
                                <style>
                                  .linked-1 {
                                    fill: #027bba;
                                  }
                                  .linked-2 {
                                    fill: #f1f2f2;
                                  }
                                </style>
                              </defs>
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <circle
                                    id="Ellipse_86-2"
                                    data-name="Ellipse 86-2"
                                    class="linked-1"
                                    cx="26.74"
                                    cy="26.74"
                                    r="26.74"
                                  />
                                  <path
                                    id="Path_2050"
                                    data-name="Path 2050"
                                    class="linked-2"
                                    d="M42.72,28.89v11H36.33V29.63c0-2.59-.93-4.35-3.24-4.35a3.5,3.5,0,0,0-3.28,2.34,4.33,4.33,0,0,0-.21,1.56V39.91H23.21s.08-17.42,0-19.22H29.6v2.73l0,.07h0v-.07a6.33,6.33,0,0,1,5.76-3.17c4.2,0,7.36,2.75,7.36,8.65ZM16.52,11.42a3.33,3.33,0,1,0-.43,6.65h.39A3.33,3.33,0,0,0,17,11.43h-.5ZM13.29,39.91h6.39V20.69H13.29Z"
                                  />
                                </g>
                              </g>
                            </svg>

                            <!-- InstagramIcon -->
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 60 60"
                              class="w-15 h-15 cursor-pointer"
                              @click.stop="instagramModal()"
                            >
                              <defs>
                                <style>
                                  .InstargramIcon-1 {
                                    fill: url(#linear-gradient);
                                  }

                                  .InstargramIcon-2 {
                                    fill: #f2f2f2;
                                  }
                                </style>
                                <linearGradient
                                  id="linear-gradient"
                                  x1="-1963.86"
                                  y1="412.61"
                                  x2="-1964.57"
                                  y2="411.91"
                                  gradientTransform="matrix(60, 0, 0, -60, 117882.89, 24765.68)"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0" stop-color="#5a3f92" />
                                  <stop offset="0.39" stop-color="#c21976" />
                                  <stop offset="0.7" stop-color="#c84c4d" />
                                  <stop offset="1" stop-color="#e09a3b" />
                                </linearGradient>
                              </defs>
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <g id="instagram">
                                    <circle
                                      id="Ellipse_86"
                                      data-name="Ellipse 86"
                                      class="InstargramIcon-1"
                                      cx="30"
                                      cy="30"
                                      r="30"
                                    />
                                    <g id="instagram-2">
                                      <path
                                        id="Path_2054"
                                        data-name="Path 2054"
                                        class="InstargramIcon-2"
                                        d="M38.08,10H21.92A11.94,11.94,0,0,0,10,21.92V38.08A11.94,11.94,0,0,0,21.92,50H38.08A11.94,11.94,0,0,0,50,38.08V21.92A11.94,11.94,0,0,0,38.08,10ZM46,38.08a7.9,7.9,0,0,1-7.9,7.9H21.92a7.9,7.9,0,0,1-7.9-7.9V21.92a7.9,7.9,0,0,1,7.9-7.9H38.08a7.9,7.9,0,0,1,7.9,7.9Z"
                                      />
                                      <path
                                        id="Path_2055"
                                        data-name="Path 2055"
                                        class="InstargramIcon-2"
                                        d="M30,19.65A10.35,10.35,0,1,0,40.35,30,10.35,10.35,0,0,0,30,19.65Zm0,16.67A6.32,6.32,0,1,1,36.32,30h0A6.32,6.32,0,0,1,30,36.32Z"
                                      />
                                      <circle
                                        id="Ellipse_87"
                                        data-name="Ellipse 87"
                                        class="InstargramIcon-2"
                                        cx="40.36"
                                        cy="19.73"
                                        r="2.48"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div
                            class="
                              flex flex-row
                              items-center
                              justify-center
                              w-full
                              md:px-12
                              mt-8
                            "
                          >
                            <img
                              :src="youtube"
                              class="cursor-pointer youtube_icon"
                              alt="Youtube Icon"
                              @click.stop="authorize('youtube')"
                            />
                          </div>
                          <div
                            class="
                              border-b-2 border-offwhite-500
                              w-full
                              md:mt-12
                              mt-8
                              rounded-sm
                            "
                          ></div>
                        </div>
                      </div>
                    </transition>
                  </div>
                  <div
                    key="2"
                    class="
                      send-guest-email-wrapper
                      w-full
                      flex flex-col
                      transition-all
                      h-40
                      duration-1000
                      md:mt-6
                    "
                  >
                    <div class="flex justify-center items-center">
                      <label class="text-white text-xl mb-2 opacity-50"
                        >Send Access Request to User</label
                      >
                    </div>
                    <input
                      v-model="guestEmail"
                      type="text"
                      placeholder="Enter Email"
                      autocomplete="off"
                      class="
                        w-full
                        rounded-full
                        py-2
                        px-2.5
                        outline-none
                        focus:outline-none
                        bg-white
                        border-b border-white
                        text-gray-1200
                        placeholder-gray-1200 placeholder-opacity-50
                        text-center
                        align-start
                      "
                      @keyup="$v.guestEmail.$touch()"
                    />
                    <template v-if="$v.guestEmail.$error">
                      <span
                        v-if="!$v.guestEmail.email"
                        class="text-red-400 text-xs mt-0 pl-2"
                      >
                        The Email is Invalid
                      </span>
                      <span
                        v-if="!$v.guestEmail.required"
                        class="text-red-400 text-xs mt-0 pl-2"
                      >
                        The field is required
                      </span>
                    </template>
                    <transition name="fadeIn">
                      <div v-if="emailVerified" class="text-center mt-4">
                        <button
                          type="submit"
                          :style="{
                            backgroundColor: globalColorPanel.backgroundColor,
                            borderColor: globalColorPanel.backgroundColor,
                          }"
                          class="
                            w-44
                            py-1.5
                            text-white
                            rounded-full
                            border
                            outline-none
                            font-bold
                            text-base
                            setup
                            relative
                          "
                          :disabled="emailSendProcess"
                          @click="sendGuestEmail()"
                        >
                          <div
                            class="
                              rounded-full
                              relative
                              flex
                              items-center
                              justify-around
                            "
                          >
                            <span>Send</span>
                            <fa
                              v-if="emailSendProcess"
                              class="
                                absolute
                                right-5
                                text-white
                                font-bold
                                animate-spin
                              "
                              :icon="['fas', 'spinner']"
                            />
                          </div>
                        </button>
                      </div>
                    </transition>
                  </div>
                  <div
                    v-if="authorizationProviders.length > 0"
                    key="3"
                    class="scroll h-34 md:h-auto my-4"
                  >
                    <p
                      v-for="(notice, index) in connectionNotices"
                      :key="index"
                      class="
                        text-white text-justify
                        mb-2
                        transition-all
                        delay-500
                        ease-in-out
                      "
                      :class="showNotice ? 'opacity-1' : 'opacity-0'"
                    >
                      <template
                        v-if="
                          authorizationProviders.includes(
                            notice.provider.toLowerCase()
                          )
                        "
                      >
                        {{ notice.message }}
                      </template>
                    </p>
                  </div>
                </div>
              </transition>
              <transition name="modalFadeIn">
                <div
                  v-if="showInstagramModal"
                  class="
                    w-full
                    main-content
                    flex flex-col
                    items-center
                    justify-center
                  "
                >
                  <div
                    class="
                      w-full
                      flex flex-col
                      justify-center
                      items-center
                      space-y-10
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 60 60"
                      class="w-15 h-15"
                    >
                      <defs>
                        <style>
                          .InstargramIcon-1 {
                            fill: url(#linear-gradient);
                          }

                          .InstargramIcon-2 {
                            fill: #f2f2f2;
                          }
                        </style>
                        <linearGradient
                          id="linear-gradient"
                          x1="-1963.86"
                          y1="412.61"
                          x2="-1964.57"
                          y2="411.91"
                          gradientTransform="matrix(60, 0, 0, -60, 117882.89, 24765.68)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#5a3f92" />
                          <stop offset="0.39" stop-color="#c21976" />
                          <stop offset="0.7" stop-color="#c84c4d" />
                          <stop offset="1" stop-color="#e09a3b" />
                        </linearGradient>
                      </defs>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                          <g id="instagram">
                            <circle
                              id="Ellipse_86"
                              data-name="Ellipse 86"
                              class="InstargramIcon-1"
                              cx="30"
                              cy="30"
                              r="30"
                            />
                            <g id="instagram-2">
                              <path
                                id="Path_2054"
                                data-name="Path 2054"
                                class="InstargramIcon-2"
                                d="M38.08,10H21.92A11.94,11.94,0,0,0,10,21.92V38.08A11.94,11.94,0,0,0,21.92,50H38.08A11.94,11.94,0,0,0,50,38.08V21.92A11.94,11.94,0,0,0,38.08,10ZM46,38.08a7.9,7.9,0,0,1-7.9,7.9H21.92a7.9,7.9,0,0,1-7.9-7.9V21.92a7.9,7.9,0,0,1,7.9-7.9H38.08a7.9,7.9,0,0,1,7.9,7.9Z"
                              />
                              <path
                                id="Path_2055"
                                data-name="Path 2055"
                                class="InstargramIcon-2"
                                d="M30,19.65A10.35,10.35,0,1,0,40.35,30,10.35,10.35,0,0,0,30,19.65Zm0,16.67A6.32,6.32,0,1,1,36.32,30h0A6.32,6.32,0,0,1,30,36.32Z"
                              />
                              <circle
                                id="Ellipse_87"
                                data-name="Ellipse 87"
                                class="InstargramIcon-2"
                                cx="40.36"
                                cy="19.73"
                                r="2.48"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <p class="md:text-xl text-md text-white opacity-50">
                      Which type of account?
                    </p>
                    <div
                      class="w-full flex items-center justify-center space-x-4"
                    >
                      <button
                        class="
                          w-38
                          py-1.5
                          text-lg
                          font-bold
                          text-white
                          rounded-full
                        "
                        :style="{
                          backgroundColor: globalColorPanel.backgroundColor,
                        }"
                        @click.stop="authorize('instagram')"
                      >
                        Personal
                      </button>
                      <button
                        class="
                          w-38
                          py-1.5
                          text-lg
                          font-bold
                          text-white
                          rounded-full
                        "
                        :style="{
                          backgroundColor: globalColorPanel.backgroundColor,
                        }"
                        @click.stop="authorize('facebook')"
                      >
                        Business
                      </button>
                    </div>
                    <p class="md:text-xl text-md text-white text-center">
                      Facebook (Meta) owns Instagram. Clicking on “Personal”
                      will route you to Instagram’s authorization. Clicking on
                      “Business” will ask for your authorization through
                      Facebook.
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            <div class="flex justify-center relative w-full h-10">
              <transition name="fadeInBtn" mode="out-in">
                <component
                  :is="currentBtnComponent"
                  :background-color="globalColorPanel.backgroundColor"
                  @back="back()"
                  @cancel="cancel()"
                  @finish="
                    socialFeedLength === 1 || showArchiveSystemSettings
                      ? finish()
                      : cancel()
                  "
                >
                </component>
              </transition>
            </div>
          </div>
        </transition>
        <transition name="fadeInParent">
          <archive-system-settings
            v-if="archiveSystemSetting"
            :global-color-panel="globalColorPanel"
            @closeArchiveSystemSetting="closeArchiveSystemSetting"
            @saveAllWork="saveAllWork"
          ></archive-system-settings>
        </transition>
      </div>
    </transition>
    <start-archiving-modal
      v-if="startArchivePopup && showBlurActiveModal"
      @closeAccount="closeAccount"
      @addFeed="addFeed"
    ></start-archiving-modal>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions, mapState } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import msExchangePng from 'assets/img/svg/msExchange.svg'
import msOfficePng from 'assets/img/svg/msOffice.svg'
// import gmailPng from 'assets/img/svg/gmail.svg'
import gmailPng from 'assets/img/png/Google__G__Logo.svg.png'
import youtubePng from 'assets/img/png/yt_logo_rgb_dark.png'
// import microsoftOutlook from 'assets/img/svg/ms-symbollockup_signin_light.svg'
// import microsoftOutlook from 'assets/img/svg/microsoft.svg'
// import microsoftOutlook from 'assets/img/svg/microsoft-outlook.svg'
import { SEND_ACCESS_REQUEST, SOCIAL_AUTH } from '~/constants/urls'
import StartArchivingModal from '~/components/startArchivingModal'
import ArchiveSystemSettings from '~/components/ArchiveSystemSettings'
import CancelBtn from '~/components/social-auth-feed-btn/CancelBtn.vue'
import BackBtn from '~/components/social-auth-feed-btn/BackBtn.vue'
import FinishBtn from '~/components/social-auth-feed-btn/FinishBtn.vue'
// import SelectedAccessType from '~/components/SelectedAccessType.vue'
import { useHideText } from '~/composables/feeds/useHideText'

export default defineComponent({
  name: 'SocialAuthFeeds',
  components: {
    ArchiveSystemSettings,
    StartArchivingModal,
    CancelBtn,
    BackBtn,
    FinishBtn,
    // SelectedAccessType,
  },
  props: {
    globalColorPanel: {
      type: Object,
      default() {
        return { backgroundColor: '' }
      },
    },
  },
  setup() {
    const { hideText, demoHeight } = useHideText()

    return { hideText, demoHeight }
  },
  data() {
    return {
      addFeedSection: true,
      msExchange: msExchangePng,
      msOffice: msOfficePng,
      gmail: gmailPng,
      youtube: youtubePng,
      // microsoftOutlook,
      AddFeedModal: false,
      startArchivePopup: false,
      emailBackBtn: false,
      archiveSystemSetting: false,
      emailVerified: false,
      guestEmail: '',
      emailSendProcess: false,
      showNotice: false,
      currentBtnComponent: 'CancelBtn',
      count: 0,
      connectionNotices: [
        {
          provider: 'Facebook',
          message: `You have connected a Facebook account. You should know that
           Facebook will require you to reauthorize your account every 60 days.
            Yes, we too find this annoying. We will try to make this as painless as possible.
             Every 60 days, you’ll get an email from us with a button to renew the connection.`,
        },
        {
          provider: 'LinkedIn',
          message: `You have connected a LinkedIn account. You should know that LinkedIn will require you to reauthorize your account every year. 
          Yes, we too find this annoying. We will try to make this as painless as possible. Each year, you’ll get an email from us with a button 
          to renew the connection.`,
        },
      ],
      authorizationProviders: [],
      hideInstagramModal: true,
      showInstagramModal: false,
      localDemoHeight: '300px',
    }
  },
  validations: {
    guestEmail: {
      required,
      email,
    },
  },
  computed: {
    showAddFeedsComp() {
      return this.$store.getters['mobile/header/getAddFeed']
    },
    showBlurActiveModal() {
      return this.$store.getters['mobile/header/showBlurActiveModal']
    },
    showFinishBtn() {
      return this.$store.getters['mobile/header/getAddFeedFinishBtn']
    },
    socialFeedLength() {
      return this.$store.getters['socialFeed/socialFeedLength']
    },
    openAddFeedModal() {
      return this.$store.getters['socialFeed/openAddFeedModal']
    },
    user() {
      return this.$auth.user
    },
    ...mapState('socialFeed', ['showArchiveSystemSettings']),
  },
  watch: {
    guestEmail(data) {
      if (data) {
        this.checkEmailIsVerified()
      }
    },
    showAddFeedsComp(data) {
      if (data) {
        setTimeout(() => {
          this.showNotice = data
        }, 2000)
      } else {
        this.showNotice = data
      }
    },
    showFinishBtn(data) {
      if (data) {
        this.currentBtnComponent = 'FinishBtn'
      } else {
        this.currentBtnComponent = 'CancelBtn'
      }
    },
    socialFeedLength(data) {
      if (data === 0) {
        this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
        this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', true)
      }
    },
    openAddFeedModal(data) {
      if (!data) {
        this.cancel()
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.showNotice = true
    }, 2000)
  },
  methods: {
    ...mapActions('socialFeed', ['fatchSocialFeeds']),
    instagramModal() {
      this.hideInstagramModal = false
      this.currentBtnComponent = 'BackBtn'
      setTimeout(() => {
        this.showInstagramModal = true
      }, 500)
    },
    checkEmailIsVerified() {
      if (!this.$v.$invalid) {
        this.emailVerified = true
        this.emailBackBtn = true
        this.currentBtnComponent = 'BackBtn'
      } else {
        this.emailVerified = false
        this.emailBackBtn = false
        this.currentBtnComponent = 'CancelBtn'
      }
    },
    async cancel() {
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.$store.commit('mobile/header/REMOVE_ADD_FEED_FINISH_BTN')
      this.showInstagramModal = false
      setTimeout(() => {
        this.hideInstagramModal = true
      }, 500)
      this.currentBtnComponent = 'CancelBtn'
      if (this.socialFeedLength) {
        this.startArchivePopup = false
        this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
      } else {
        const res = await this.fatchSocialFeeds()
        if (res.data.length === 0) {
          this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', true)
          this.startArchivePopup = true
        } else {
          this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
          this.startArchivePopup = false
        }
      }
    },
    closeAccount() {
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      this.startArchivePopup = false
      this.logout()
    },
    async logout() {
      this.$store.commit('SET_LANDING_LOADER', false)
      this.show_home_content(true)
      this.landing_content(false)
      this.show_login(false)
      this.home_wrapper(false)
      this.show_home(false)
      this.show_logo_text(true)
      this.home_menu_text(false)
      this.all_side_menu(false)
      this.home_side_menu(false)
      this.show_logo(false)
      this.home_circle(false)
      this.sidebar_menu(false)
      this.sidebar_circle(false)
      this.home_modal(false)
      this.slide_left(false)
      this.login_circle(true)
      this.home_header(false)
      this.home_circle(false)
      this.home_sidebar(false)
      this.after_logout(false)
      this.text_loading(false)
      this.successfully(false)
      this.login_button_transition(false)
      this.submit_button_transition(false)
      this.login_form_transition(false)
      this.after_loading(false)
      this.width_increase(false)
      this.full_width(false)
      this.header_text(false)
      this.loading_text(false)
      this.width_decrese(false)
      this.slide_right(false)
      this.slide_full_right(false)
      this.set_header_width(false)
      this.set_sticky(false)

      await this.$auth.logout({
        data: {
          refresh: this.$auth.strategy.refreshToken.get(),
        },
      })
      localStorage.removeItem('lockScreen')
      this.$store.commit('SET_LOCK_SCREEN', false)
      this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
    },
    addFeed() {
      this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', true)
      this.startArchivePopup = false
    },
    finish() {
      this.addFeedSection = false
      setTimeout(() => {
        this.archiveSystemSetting = true
      }, 700)
    },
    async authorize(provider) {
      this.$store.commit('socialFeed/SET_ARCHIVE_FEED', false)
      await this.$social.redirect(provider)
    },
    async authorizeTwitter() {
      const apiUrl = `${SOCIAL_AUTH}/twitter/`
      await this.$social.redirectOAuth1('twitter', apiUrl)
    },
    closeArchiveSystemSetting() {
      this.archiveSystemSetting = false
      setTimeout(() => {
        this.addFeedSection = true
      }, 700)
    },
    saveAllWork() {
      this.currentBtnComponent = 'CancelBtn'
      this.emailBackBtn = false
      this.guestEmail = ''
      if (this.socialFeedLength) {
        this.addFeedSection = true
        this.startArchivePopup = false
        this.archiveSystemSetting = false
        this.$store.commit('mobile/header/BLUR_ACTIVE_FEED_MODAL', false)
        this.$store.commit('socialFeed/SHOW_ADD_FEED_MODAL', false)
      } else {
        this.closeArchiveSystemSetting()
      }
    },
    async sendGuestEmail() {
      this.$v.$touch()
      this.$toast.clear()
      if (!this.$v.$invalid) {
        try {
          this.emailSendProcess = true
          const res = await this.$axios.$post(SEND_ACCESS_REQUEST, {
            email: this.guestEmail,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.$store.commit('notifications/SET_OFFSET', 0)
            this.$store.commit('notifications/SET_LIMIT', 25)
            this.$store.commit('notifications/SET_NOTIFICATION', [])
            this.$store.commit('notifications/SET_OLD_NOTIFICATION', [])
            this.$store.dispatch('notifications/getAllNotifications')
            this.guestEmail = ''
            this.emailBackBtn = false
            this.emailVerified = false
            this.currentBtnComponent = 'CancelBtn'
            this.$v.$reset()
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.emailSendProcess = false
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    },
    back() {
      this.guestEmail = ''
      this.emailBackBtn = false
      this.emailVerified = false
      this.showInstagramModal = false
      setTimeout(() => {
        this.hideInstagramModal = true
      }, 500)
      this.currentBtnComponent = 'CancelBtn'

      this.$v.$reset()
    },
    setDefineAction() {
      if (
        this.currentBtnComponent === 'FinishBtn' &&
        (this.socialFeedLength === 1 || this.showArchiveSystemSettings)
      ) {
        this.finish()
      } else {
        this.cancel()
      }
    },
    ...mapActions({
      set_header_width: 'set_header_width',
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',
      set_sticky: 'set_sticky',

      login_button_transition: 'loginAnimation/login_button_transition',
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
$color: var(--color);
.profile {
  // width: 500px;
  width: 550px;
  height: 100%;
  top: 0px;
  z-index: 9999999999;
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

.form-card > .error {
  margin-top: 0px;
}

@media (max-width: 767px) {
  .profile {
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 9999999999;
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
}

.right-sidebar-trans-enter,
.right-sidebar-trans-leave-to {
  right: -100%;
}

.right-sidebar-trans-enter-to,
.right-sidebar-trans-leave {
  right: 0;
}

.right-sidebar-trans-enter-active {
  transition: all 0.8s ease-in-out;
}

.right-sidebar-trans-leave-active {
  transition: all 0.8s ease-in-out;
}

.content-wrapper {
  height: calc(100% - 40px) !important;
}

.overlay-web {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 100px;
  right: 0;
  z-index: 101;
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 1;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}

@media (max-width: 767px) {
  .overlay-web {
    left: 0 !important;
    height: 100%;
  }
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
  transition: all 0.5s ease-in-out;
}

.fadeInParent-enter,
.fadeInParent-leave-to {
  opacity: 0;
}

.fadeInParent-enter-to,
.fadeInParent-leave-from {
  opacity: 1;
}

.fadeInParent-enter-active,
.fadeInParent-leave-active {
  transition: all 0.5s ease-in-out;
}

.animLeft {
  transform: translateX(0);
  animation-name: changePositionLeft;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes changePositionLeft {
  to {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 86%;
  }
}

.animRight {
  transform: translateX(0);
  animation-name: changePositionRight;
  animation-duration: 1s;
}

@keyframes changePositionRight {
  from {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    right: 92%;
  }
  to {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    right: 0%;
  }
}
/*end right sidebar section transition*/

.demo1 {
  // height: 220px;
  height: var(--height);
  // height: 430px;
  transition: height 1s 0.5s;
}
.demo2 {
  height: 0;
  transition: height 1s 0.5s;
}

.main-content {
  height: calc(100% - 42px); // this 42 is bottom button height
}

.main-content > span {
  width: 100%;
}

.fadeInBtn-enter-active,
.fadeInBtn-leave-active {
  transition: opacity 0.5s;
}
.fadeInBtn-enter,
.fadeInBtn-leave-to {
  opacity: 0;
}

.notice-enter-active,
.notice-leave-active {
  transition: opacity 1s;
}
.notice-enter,
.notice-leave-to {
  opacity: 0;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: thin;
  scrollbar-width: thin;
  scrollbar-color: var(--color) #ececec; /* Firefox 64 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px #ECECEC;
    border-radius: 3px;
    background: #ececec;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: var(--color);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color);
  }
}
@media (max-width: 767px) {
  // .demo1 {
  //   height: 100%;
  // }
  // .social-icons-wrapper {
  //   @apply scroll;
  // }
}

@media (max-height: 799px) {
  .main-wrapper {
    height: 160%;
  }
}

.modalFadeIn-enter-active,
.modalFadeIn-leave-active {
  transition: opacity 0.5s;
}
.modalFadeIn-enter,
.modalFadeIn-leave-to {
  opacity: 0;
}

.outlook-icon {
  position: absolute;
  top: 9px;
  left: 8px;
}

// @media (max-width: 430px) {
//   .email-logo-wrapper {
//     @apply space-x-0 space-y-4 flex-wrap;
//   }
//   .demo1 {
//     // height: 180px;
//     height: 374px;
//     // height: 430px;
//     transition: height 1s 0.5s;
//   }
// }

.youtube_icon {
  height: 44px;
}
</style>