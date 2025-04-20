<template>
  <transition name="page">
    <main v-if="!landingLoader" class="pb-26">
      <div class="w-full h-full">
        <div class="w-full h-full" @click="closeStarterModal()">
          <div class="intro grid grid-cols-1 w-full p-5 h-screen bg-ash-dark">
            <div v-if="intro" class="col-span-8 text-center mb-12 md:mt-80 mt-60">
              <div class="intro-head" v-html="intro.title"></div>

              <p class="text-lg" :style="{ color: intro.color }" v-html="intro.description"></p>

              <div class="w-full landing_intro_img flex justify-center relative">
                <v-lazy-image
                  class="intro_img my-3 mx-auto"
                  :class="imgPosition ? 'absolute' : 'fixed'"
                  :style="{ top: imgPosition ? `${position}px` : '' }"
                  :src="`${$config.cdnURL}/shared/landing/intro.webp`"
                  alt="SharpArchive introduction content related laptop picture"
                />
              </div>
            </div>
          </div>

          <div v-if="keyFeatures" class="w-full below_intro bg-white p-4">
            <div class="lg:pt-36 md:pt-26 pt-32 pb-26">
              <div class="feature-key-head-title" v-html="keyFeatures.title"></div>
              <div
                class="text-lg text-center"
                :style="{
                  color: keyFeatures.color,
                }"
              >{{ keyFeatures.subtitle }}</div>
              <div
                class="flex md:flex-row flex-col md:items-start items-center justify-center md:space-x-20 md:space-y-0 space-y-6 md:pt-9 pt-6"
              >
                <div
                  v-for="(item, index) in keyFeatures.features"
                  :key="index"
                  class="flex flex-col space-y-4 items-center"
                >
                  <img
                    class="lg:w-auto w-24"
                    :src="item.image"
                    :alt="`SharpArchive ${item.title} related picture`"
                  />
                  <p
                    class="text-2xl font-bold text-center"
                    :style="{
                      color: item.color,
                    }"
                  >{{ item.title }}</p>
                </div>
              </div>
              <div
                class="text-lg text-center pt-10 lg:px-101 md:px-0 px-4"
                :style="{
                  color: keyFeatures.color,
                }"
              >{{ keyFeatures.description }}</div>
            </div>
          </div>

          <!-- start => web view -->

          <div
            v-for="(feature, index) in features"
            :key="index"
            class="w-full h-full md:block hidden"
          >
            <div
              v-if="feature.key === 'right-image'"
              class="md:block hidden w-full pb-24 pt-12 bg-white"
            >
              <div class="grid grid-cols-2 gap-3 h-full w-full">
                <div class="bg-gray-1400 rounded-xl w-full h-full pb-80">
                  <div class="flex justify-end lg:py-24 md:py-16 py-4 lg:px-10 px-4">
                    <div class>
                      <h2
                        :style="{ color: feature.section1.color }"
                        class="text-green-1100 lg:text-4xl text-3xl font-light"
                      >{{ feature.section1.title }}</h2>
                      <div class="py-8 space-y-2">
                        <div
                          v-for="(item, index) in feature.section1.items"
                          :key="index"
                          class="flex flex-row items-start space-x-3"
                        >
                          <div
                            class="w-5 h-5 bg-green-1600 rounded-md mt-1.3"
                            :style="{ backgroundColor: feature.section1.color }"
                          ></div>
                          <p
                            class="text-lg width-100"
                            :style="{ color: feature.section1.itemsColor }"
                          >{{ item }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="text-center text-xl w-full transform top-1/2 left-1/2 xl:mb-10 lg:px-101 md:px-4 px-4 section_3"
                    :style="{ color: feature.section3.color }"
                  >{{ feature.section3.description }}</div>

                  <div class="w-full transform translate-x-1/2 translate-y-52 top-1/2 left-1/2">
                    <div class="flex justify-center w-full">
                      <div
                        class="w-full bg-purple-gradient lg:p-16 p-4 flex flex-col items-center justify-center"
                      >
                        <h2
                          class="lg:text-4xl text-3xl text-center font-light"
                          :style="{ color: feature.section2.color }"
                        >{{ feature.section2.title }}</h2>
                        <div class="py-8 space-y-2">
                          <div
                            v-for="(item, index2) in feature.section2.items"
                            :key="index2"
                            class="flex flex-row items-start space-x-3 w-full"
                          >
                            <div
                              class="w-5 h-5 rounded-md mt-1.3"
                              :style="{
                                backgroundColor: feature.section2.color,
                              }"
                            ></div>
                            <p
                              class="text-lg width-100"
                              :style="{ color: feature.section2.itemsColor }"
                            >{{ item }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-full justify-self-center"
                  :class="[feature.mediaType === 'video' ? 'w-full' : '']"
                >
                  <!-- src="~/assets/img/landing/simple-pic.png" -->
                  <img
                    v-if="feature.mediaType === 'image'"
                    class
                    :src="`${$config.cdnURL}/shared/landing/simple-pic.webp`"
                    :alt="`SharpArchive ${feature.title} related picture`"
                  />
                  <video-embed v-else class="w-full" :src="feature.media"></video-embed>
                </div>
              </div>
            </div>

            <!-- <div
            v-if="feature.key === 'left-image-desc'"
            class="md:block hidden w-full bg-white pb-80"
          >
            <div class="grid grid-cols-2 gap-3">
              <img
                v-if="feature.mediaType === 'image'"
                class="justify-self-end"
                :src="feature.media"
                alt=""
              />
              <video-embed
                v-else
                class="w-full"
                :src="feature.media"
              ></video-embed>
              <div class="flex items-center">
                <div class="lg:w-9/12 w-full">
                  <h2
                    class="lg:text-50px text-3xl text-left font-light"
                    :style="{ color: feature.section1.color }"
                  >
                    {{ feature.section1.title }}
                  </h2>
                  <div class="py-8 space-y-2">
                    <div
                      v-for="(item, index3) in feature.section1.items"
                      :key="index3"
                      class="flex flex-row items-center space-x-3 w-full"
                    >
                      <div
                        class="w-5 h-5 rounded-md"
                        :style="{ backgroundColor: feature.section1.color }"
                      ></div>
                      <p
                        class="text-lg width-100"
                        :style="{ color: feature.section1.itemsColor }"
                      >
                        {{ item }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>-->

            <div
              v-if="feature.key === 'left-image'"
              class="md:block hidden w-full h-full relative mt-40 bg-white pb-36"
            >
              <div class="w-full absolute top-position z-1">
                <div class="flex items-center justify-center w-full h-full">
                  <div
                    class="w-1/2 bg-orange-gradient lg:px-20 px-4 lg:py-36 py-20 h-full flex flex-col items-center justify-center"
                  >
                    <h2
                      class="lg:text-4xl text-3xl font-light text-center"
                      :style="{ color: feature.section1.color }"
                    >{{ feature.section1.title }}</h2>
                    <div class="py-8 pt-11 space-y-8">
                      <div
                        v-for="(item, index3) in feature.section1.items"
                        :key="index3"
                        class="flex flex-row items-start space-x-3 w-full"
                      >
                        <div
                          class="w-5 h-5 rounded-md mt-1.3"
                          :style="{ backgroundColor: feature.section1.color }"
                        ></div>
                        <p
                          class="text-lg width-100"
                          :style="{ color: feature.section1.itemsColor }"
                        >{{ item }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-7 gap-12 w-full h-full">
                <div
                  class="flex items-start top-padding justify-self-end h-full col-span-3"
                  :class="[feature.mediaType === 'video' ? 'w-full' : '']"
                >
                  <!-- src="~/assets/img/landing/mask-group.png" -->
                  <img
                    v-if="feature.mediaType === 'image'"
                    class="justify-self-end"
                    :src="`${$config.cdnURL}/shared/landing/mask-group.webp`"
                    :alt="`SharpArchive ${feature.title} related picture`"
                  />
                  <video-embed v-else class="w-full" :src="feature.media"></video-embed>
                </div>

                <div
                  class="flex flex-col items-center justify-center bg-gray-1400 px-12 lg:w-9/12 w-full h-full relative col-span-4"
                >
                  <div class="w-full lg:py-120 bottom-padding py-80 h-full">
                    <h2
                      class="lg:text-4xl text-3xl text-left font-light"
                      :style="{ color: feature.section2.color }"
                    >{{ feature.section2.title }}</h2>
                    <div class="py-8 space-y-2">
                      <div
                        v-for="(item, index3) in feature.section2.items"
                        :key="index3"
                        class="flex flex-row items-start space-x-3 w-full"
                      >
                        <div
                          class="w-5 h-5 rounded-md mt-1.3"
                          :style="{ backgroundColor: feature.section2.color }"
                        ></div>
                        <p
                          class="text-lg width-100"
                          :style="{ color: feature.section2.itemsColor }"
                        >{{ item }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- src="~/assets/img/landing/computer-with-button.png" -->
                  <img
                    class="absolute image-position xl:-bottom-12 md:-left-44 lg:-left-40 xl:-left-52 -bottom-8 -left-24"
                    :src="`${$config.cdnURL}/shared/landing/computer-with-button.webp`"
                    :alt="`SharpArchive ${feature.section2.title} related picture`"
                  />
                </div>

                <div class="w-full absolute bottom-position z-1">
                  <div class="flex items-center justify-center w-full h-full">
                    <div
                      class="w-10/12 lg:w-8/12 bg-red-gradient lg:px-15 px-4 lg:pt-20 lg:pb-16 pt-4 pb-2 h-full flex flex-col items-center justify-center"
                    >
                      <div class="text-center">
                        <h2
                          class="lg:text-4xl text-3xl font-light text-red-deep"
                        >Old Way vs. New Way Of Doing Business</h2>
                        <p
                          class="text-lg py-4"
                          :style="{ color: feature.section2.itemsColor }"
                        >The game has changed.</p>
                        <p class="text-lg" :style="{ color: feature.section2.itemsColor }">
                          We’ve Created A Way For You To Cost Effectively
                          Archive Your Employee Communication To Avoid Paying
                          Extremely Expensive Fine From Lawsuits & Regulatory
                          Issues.
                        </p>
                      </div>
                      <div class="flex space-x-5 w-full">
                        <div class="w-1/2">
                          <h4
                            class="text-3xl font-light text-center py-10"
                            :style="{ color: feature.section2.itemsColor }"
                          >The Old Way</h4>
                          <div class="pb-2 flex items-start space-x-3">
                            <XmarkIcon class="icon-top-margin min-w-3 max-w-3" />
                            <p class="text-lg" :style="{ color: feature.section2.itemsColor }">
                              Doing archiving based on a random sampling method
                              like reading 5% of all emails.
                            </p>
                          </div>
                          <div class="pb-2 flex items-start space-x-3">
                            <XmarkIcon class="icon-top-margin min-w-3 max-w-3" />
                            <p class="text-lg" :style="{ color: feature.section2.itemsColor }">
                              Using technology that it’s up to date results in
                              being at risk with compliance.
                            </p>
                          </div>
                          <div class="flex items-start space-x-3">
                            <XmarkIcon class="icon-top-margin min-w-3 max-w-3" />
                            <p class="text-lg" :style="{ color: feature.section2.itemsColor }">
                              Committing to lengthy and expensive contracts with
                              third party archive companies.
                            </p>
                          </div>
                          <br />
                        </div>
                        <div class="w-1/2">
                          <h4
                            class="text-3xl font-light text-center py-10"
                            :style="{ color: feature.section2.itemsColor }"
                          >The New Way</h4>
                          <div class="pb-2 flex items-start">
                            <CheckIcon class="icon-top-margin min-w-4 max-w-4 mr-3" />
                            <p
                              class="text-lg"
                              :style="{ color: feature.section2.itemsColor }"
                            >Monitoring 100% of communication in real time.</p>
                          </div>
                          <div class="pb-2 flex items-start">
                            <CheckIcon class="icon-top-margin min-w-4 max-w-4 mr-3" />
                            <p class="text-lg" :style="{ color: feature.section2.itemsColor }">
                              Searching for custom phrases rather than sampling
                              so you are able to avoid getting in trouble in all
                              ways.
                            </p>
                          </div>
                          <div class="flex items-start">
                            <CheckIcon class="icon-top-margin min-w-4 max-w-4 mr-3" />
                            <p class="text-lg" :style="{ color: feature.section2.itemsColor }">
                              Month to month agreements at a low cost and easy
                              to use platform that can be set up in 5 minutes.
                            </p>
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loggedIn" class="w-full bg-white pb-20 md:block hidden">
            <div class="grid justify-center items-center">
              <button
                class="py-2 border-4 border-yellow-primary text-yellow-primary bg-white rounded-full px-10 font-bold text-xl"
                @click="openFullStarterModal()"
              >Archive Your Communication Now</button>
            </div>
          </div>

          <!-- end web view -->

          <!-- small devise view -->
          <div class="w-full h-full md:hidden" @click="closeStarterModal()">
            <div v-for="(feature, index) in features" :key="index" class="w-full h-full">
              <!-- image right -->
              <div v-if="feature.key === 'right-image'" class="w-full h-full bg-white">
                <div class="grid md:grid-cols-2 grid-cols-1 gap-3 h-full w-full">
                  <div
                    class="h-full justify-self-center"
                    :class="[feature.mediaType === 'video' ? 'w-full p-4' : '']"
                  >
                    <!-- src="~/assets/img/landing/simple-pic.png" -->
                    <img
                      v-if="feature.mediaType === 'image'"
                      class="w-60"
                      :src="`${$config.cdnURL}/shared/landing/simple-pic.webp`"
                      :alt="`SharpArchive ${feature.title} related picture`"
                    />
                    <video-embed v-else class="w-full" :src="feature.media"></video-embed>
                  </div>

                  <div
                    v-if="
                      feature.section1 &&
                      Object.keys(feature.section1).lenght !== 0
                    "
                    class="bg-gray-1400 w-full h-full px-4 md:py-10 py-4 md:pt-20"
                  >
                    <div class="flex flex-col items-center justify-center">
                      <h2
                        class="text-33px font-light"
                        :style="{ color: feature.section1.color }"
                      >{{ feature.section1.title }}</h2>
                      <div class="py-5 space-y-3">
                        <div
                          v-for="(item, index1) in feature.section1.items"
                          :key="index1"
                          class="flex flex-row items-start space-x-3"
                        >
                          <div
                            class="w-5 h-5 rounded-sm mt-1.5"
                            :style="{ backgroundColor: feature.section1.color }"
                          ></div>
                          <p
                            class="text-2xl width-100"
                            :style="{ color: feature.section1.itemsColor }"
                          >{{ item }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="text-center text-xl w-full transform px-4 md:px-0 py-8 pt-10"
                    :style="{ color: feature.section3.color }"
                  >{{ feature.section3.description }}</div>
                  <div
                    v-if="
                      feature.section2 &&
                      Object.keys(feature.section2).lenght !== 0
                    "
                    class="w-full"
                  >
                    <div class="flex justify-center w-full p-4">
                      <div
                        class="w-full bg-purple-gradient px-4 flex flex-col items-center justify-center"
                      >
                        <h2
                          class="text-33px font-light"
                          :style="{ color: feature.section2.color }"
                        >{{ feature.section2.title }}</h2>
                        <div class="py-8 space-y-3">
                          <div
                            v-for="(item, index2) in feature.section2.items"
                            :key="index2"
                            class="flex flex-row items-start space-x-3"
                          >
                            <div
                              class="w-5 h-5 rounded-sm mt-1.5"
                              :style="{
                                backgroundColor: feature.section2.color,
                              }"
                            ></div>
                            <p
                              class="text-2xl width-100"
                              :style="{ color: feature.section2.itemsColor }"
                            >{{ item }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- image left-desc -->
              <div
                v-if="feature.key === 'left-image-desc' && betaVersion"
                class="w-full h-full bg-white p-4"
              >
                <div class="grid grid-cols-1 gap-3">
                  <img
                    v-if="feature.mediaType === 'image'"
                    class="w-60 justify-self-center"
                    :src="feature.media"
                    :alt="`SharpArchive ${feature.title} related picture`"
                  />
                  <video-embed v-else class="w-full" :src="feature.media"></video-embed>

                  <div
                    v-if="
                      feature.section1 &&
                      Object.keys(feature.section1).lenght !== 0
                    "
                    class="flex items-center pt-8"
                  >
                    <div class="w-full">
                      <h2
                        class="text-33px font-light text-center"
                        :style="{ color: feature.section1.color }"
                      >{{ feature.section1.title }}</h2>
                      <div class="py-4 space-y-2">
                        <div
                          v-for="(item, index1) in feature.section1.items"
                          :key="index1"
                          class="flex flex-row items-start space-x-3"
                        >
                          <div
                            class="w-5 h-5 rounded-sm mt-1.5"
                            :style="{ backgroundColor: feature.section1.color }"
                          ></div>
                          <p
                            class="text-2xl width-100"
                            :style="{ color: feature.section1.itemsColor }"
                          >{{ item }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- image left -->
              <div v-if="feature.key === 'left-image'" class="w-full h-full bg-white pb-10">
                <div
                  v-if="
                    feature.section1 &&
                    Object.keys(feature.section1).lenght !== 0
                  "
                  class="p-4 w-full"
                >
                  <div
                    class="bg-orange-gradient px-4 md:pt-10 py-4 pb-6 h-full flex flex-col items-center justify-center"
                  >
                    <h2
                      class="text-33px font-light"
                      :style="{ color: feature.section1.color }"
                    >{{ feature.section1.title }}</h2>
                    <div class="py-5 space-y-3">
                      <div
                        v-for="(item, index1) in feature.section1.items"
                        :key="index1"
                        class="flex flex-row items-start space-x-3"
                      >
                        <div
                          class="w-5 h-5 rounded-sm mt-1.5"
                          :style="{ backgroundColor: feature.section1.color }"
                        ></div>
                        <p
                          class="text-2xl width-100"
                          :style="{ color: feature.section1.itemsColor }"
                        >{{ item }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  v-if="feature.mediaType === 'image'"
                  class="p-10"
                  :src="`${$config.cdnURL}/shared/landing/mask-group.webp`"
                  :alt="`SharpArchive ${feature.title} related picture`"
                />

                <video-embed v-else class="w-full p-4" :src="feature.media"></video-embed>

                <div
                  v-if="
                    feature.section2 &&
                    Object.keys(feature.section2).lenght !== 0
                  "
                  class="bg-gray-1400 w-full h-full p-4 md:pt-10 py-4"
                >
                  <h2
                    class="text-33px font-light text-center"
                    :style="{ color: feature.section2.color }"
                  >{{ feature.section2.title }}</h2>
                  <div class="py-5 space-y-3">
                    <div
                      v-for="(item, index2) in feature.section2.items"
                      :key="index2"
                      class="flex flex-row items-start space-x-3"
                    >
                      <div
                        class="w-5 h-5 rounded-sm mt-1.5"
                        :style="{ backgroundColor: feature.section2.color }"
                      ></div>
                      <p
                        class="text-2xl width-100"
                        :style="{ color: feature.section2.itemsColor }"
                      >{{ item }}</p>
                    </div>
                  </div>
                </div>

                <div class="w-full mt-10">
                  <div class="flex items-center justify-center w-full h-full">
                    <div
                      class="w-full bg-red-gradient px-4 pt-7 pb-4 h-full flex flex-col items-center justify-center"
                    >
                      <div class="text-center">
                        <h2
                          class="text-33px font-light text-red-deep"
                        >Old Way vs. New Way Of Doing Business</h2>
                        <p
                          class="text-2xl py-4"
                          :style="{ color: feature.section2.itemsColor }"
                        >The game has changed.</p>
                        <p class="text-2xl" :style="{ color: feature.section2.itemsColor }">
                          We’ve Created A Way For You To Cost Effectively
                          Archive Your Employee Communication To Avoid Paying
                          Extremely Expensive Fine From Lawsuits & Regulatory
                          Issues.
                        </p>
                      </div>
                      <div class="w-full">
                        <h4
                          class="text-33px font-light text-center pt-6 pb-8"
                          :style="{ color: feature.section2.itemsColor }"
                        >The Old Way</h4>
                        <div class="flex items-start space-x-3 pb-2">
                          <XmarkIcon class="icon-top-margin min-w-3 max-w-3" />
                          <p class="text-2xl" :style="{ color: feature.section2.itemsColor }">
                            Doing archiving based on a random sampling method
                            like reading 5% of all emails.
                          </p>
                        </div>
                        <div class="flex items-start space-x-3 pb-2">
                          <XmarkIcon class="icon-top-margin min-w-3 max-w-3" />
                          <p class="flex text-2xl" :style="{ color: feature.section2.itemsColor }">
                            Using technology that it’s up to date results in
                            being at risk with compliance.
                          </p>
                        </div>
                        <div class="flex items-start space-x-3">
                          <XmarkIcon class="icon-top-margin min-w-3 max-w-3" />
                          <p class="flex text-2xl" :style="{ color: feature.section2.itemsColor }">
                            Committing to lengthy and expensive contracts with
                            third party archive companies.
                          </p>
                        </div>
                        <br />
                      </div>
                      <div class="w-full">
                        <h4
                          class="text-33px font-light text-center pt-4 pb-8"
                          :style="{ color: feature.section2.itemsColor }"
                        >The New Way</h4>
                        <div class="flex items-start space-x-3 pb-2">
                          <CheckIcon class="icon-top-margin min-w-4 max-w-4" />
                          <p
                            class="flex text-2xl"
                            :style="{ color: feature.section2.itemsColor }"
                          >Monitoring 100% of communication in real time.</p>
                        </div>
                        <div class="flex items-start space-x-3">
                          <CheckIcon class="icon-top-margin min-w-4 max-w-4" />
                          <p class="flex text-2xl" :style="{ color: feature.section2.itemsColor }">
                            Searching for custom phrases rather than sampling so
                            you are able to avoid getting in trouble in all
                            ways.
                          </p>
                        </div>
                        <div class="flex items-start space-x-3 pb-2">
                          <CheckIcon class="icon-top-margin min-w-4 max-w-4" />
                          <p class="flex text-2xl" :style="{ color: feature.section2.itemsColor }">
                            Month to month agreements at a low cost and easy to
                            use platform that can be set up in 5 minutes.
                          </p>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  class="p-10"
                  :src="`${$config.cdnURL}/shared/landing/computer-with-button.webp`"
                  :alt="`SharpArchive ${feature.section2.title} related picture`"
                />
              </div>
            </div>

            <!-- button -->
            <div v-if="!loggedIn" class="w-full h-full p-4 bg-white pb-10">
              <div class="flex flex-col items-center justify-center">
                <button
                  class="py-1 border-2 border-yellow-primary text-yellow-primary bg-white rounded-full px-6 font-bold text-lg"
                  @click="openMobileFullStarterModal(), closeMenubar()"
                >Archive Your Communication Now</button>
              </div>
            </div>
          </div>
          <!-- Small device view End-->

          <!-- <people-say @click="closeStarterModal()"></people-say> -->
        </div>
        <landing-footer></landing-footer>
      </div>
    </main>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LandingFooter from '~/components/setup/LandingFooter.vue'
// import PeopleSay from '~/components/setup/PeopleSay.vue'
import { KEY_FEATURES, INTRO, LANDING_CONTENTS } from '~/constants/urls'
import XmarkIcon from '~/components/shared/icon/XmarkIcon.vue'
import CheckIcon from '~/components/shared/icon/CheckIcon.vue'

export default {
  name: 'Landing',
  components: {
    LandingFooter,
    XmarkIcon,
    CheckIcon,
    // PeopleSay,
  },
  loading: true,
  data() {
    return {
      features: null,
      keyFeatures: null,
      intro: null,
      imgPosition: false,
      position: 0,
      scrollValue: 0,
      allElements: [],
      increaseIndex: false,
      menu: false,
    }
  },

  async fetch() {
    await this.getIntro()
  },

  computed: {
    ...mapState([
      'starterExpanded',
      'starterCollapse',
      'betaVersion',
      'landingLoader',
    ]),
    ...mapState({
      setupContent: 'setupContent',
    }),
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  watch: {
    imgPosition(data) {
      if (data) {
        this.getIntroImagePosition()
      }
    },
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    await this.getFeatures()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    openAccountModal() {
      this.maximize_starter_modal(true)
      setTimeout(() => {
        this.updateSetupContent('account-setup')
      }, 1000)
    },
    openFullStarterModal() {
      this.show_login(false)
      if (this.setupContent === 'starter-button') {
        this.starter_account_maximized(true)
        setTimeout(() => {
          this.updateSetupContent('account-setup')
        }, 1500)
      } else {
        this.openAccountModal()
      }
    },
    openMobileFullStarterModal() {
      if (this.setupContent === 'starter-button') {
        this.closeMenubar()
        setTimeout(() => {
          this.starter_account_maximized(true)
          setTimeout(() => {
            this.updateSetupContent('account-setup')
          }, 1500)
        }, 1000)
      } else {
        this.openAccountModal()
      }
    },
    closeMenubar() {
      this.increaseIndex = false
      this.menu = false
      if (this.$route.name === 'index') {
        this.setHeaderWidth(false)
      }
      setTimeout(() => {
        this.$emit('hide-logo', false)
      }, 1000)
    },
    gotoTryDemoSite() {
      window.open('https://demo.sharparchive.com/', '_blank')
    },
    async getIntro() {
      try {
        const resIntro = await this.$axios.$get(INTRO)
        if (resIntro.success) {
          this.intro = resIntro.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getFeatures() {
      try {
        const resFeatures = await this.$axios.$get(LANDING_CONTENTS)
        if (resFeatures.success) {
          this.features = resFeatures.data
          this.$store.commit('SET_LANDING_LOADER', false)
        } else {
          this.$store.commit('SET_LANDING_LOADER', false)
        }
        const resKeyFeatures = await this.$axios.$get(KEY_FEATURES)
        if (resKeyFeatures.success) {
          this.keyFeatures = resKeyFeatures.data
        }
      } catch (error) {
        this.$store.commit('SET_LANDING_LOADER', false)
        console.log(error)
      } finally {
        this.$store.commit('SET_LANDING_LOADER', false)
      }
    },
    handleScroll(event) {
      const belowIntro = document.querySelector('.below_intro')
      const introImg = document.querySelector('.intro_img')
      const valueOfScroll = window.scrollY

      if (!this.imgPosition || valueOfScroll <= this.scrollValue) {
        this.imgPosition = this.isInViewport(belowIntro, introImg)
      }
    },
    getIntroImagePosition() {
      const introImg = document.querySelector('.intro_img')
      if (introImg) {
        const fromTop = introImg.offsetTop + introImg.height / 2
        const belowIntro = document.querySelector('.below_intro')
        this.position = belowIntro.offsetTop - fromTop

        this.scrollValue = window.scrollY
      }
    },
    isInViewport(el, el1) {
      if (el && el1) {
        const fromTop = el1.offsetTop

        const imageHeight = el1.height / 2

        const imageTop = fromTop + imageHeight
        const windowScrollTop = window.scrollY
        const distance = el.offsetTop - imageTop
        return windowScrollTop >= distance
      } else {
        return false
      }
    },
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setHeaderWidth: 'set_header_width',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      if (this.starterExpanded) {
        this.collapse_starter_modal(true)
        this.show_sign_up(false)
      }
      setTimeout(() => {
        this.expand_starter_modal(false)
      }, 100)
      this.maximize_starter_modal(false)
      this.updateSetupContent('starter-button')
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
      show_login: 'loginAnimation/show_login',
      starter_account_maximized: 'starter_account_maximized',
    }),
  },
}
</script>

<style lang="scss" scoped>
.v-lazy-image {
  filter: blur(10px);
  height: 0px;
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  @apply md:h-86 h-56;
  filter: blur(0);
}
.max-w-3 {
  max-width: 12px;
}
.min-w-3 {
  min-width: 12px;
}
.max-w-4 {
  max-width: 16px;
}
.min-w-4 {
  min-width: 16px;
}
.icon-top-margin {
  margin-top: 5px;
}
.bg-red-gradient {
  background: transparent linear-gradient(116deg, #f3d8d8 0%, #ffffff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 5px 5px 6px #00000029;
  border-radius: 20px;
}
@media (min-width: 768px) {
  .top-padding {
    padding-top: 23rem;
  }
  .bottom-padding {
    padding-bottom: 66rem;
  }
  .bottom-position {
    bottom: 31rem;
  }
  .top-position {
    top: -8%;
  }
  .intro_img {
    width: 600px;
    height: 390px;
  }
}
@media (min-width: 1020px) {
  .top-padding {
    padding-top: 32rem;
  }
  .bottom-position {
    bottom: 33rem;
  }
  .bottom-padding {
    padding-bottom: 82rem;
  }
}
@media (min-width: 1270px) {
  .top-padding {
    padding-top: 34rem;
  }
  .bottom-position {
    bottom: 39rem;
  }
  .bottom-padding {
    padding-bottom: 91rem;
  }
}
@media (min-width: 1430px) {
  .bottom-padding {
    padding-bottom: 95rem;
  }
}
.embed-responsive-item {
  height: 20rem;
}
.intro {
  background: url(~/assets/img/landing/landing_bg_img_logo1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: #222831;
}
.image_position {
  $top: var(--top);
}

.width-100 {
  width: calc(100% - 1.25rem);
}
.bg-purple-gradient {
  background: transparent linear-gradient(116deg, #ffffff 0%, #f3f2ff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 5px 5px 6px #00000029;
  border-radius: 20px;
}

.bg-orange-gradient {
  background: transparent linear-gradient(116deg, #ffefe2 0%, #ffffff 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 5px 5px 6px #00000029;
  border-radius: 20px;
}
.landing_intro_img {
  height: 100%;
}
.px-101 {
  padding-left: 11%;
  padding-right: 11%;
}

.section_3 {
  width: 200%;
  transform: translateX(0px);
  transform: translateY(160px);
}

@media (min-width: 1200px) {
  .image-position {
    left: -11rem;
  }
}
@media (min-width: 1666px) {
  .image-position {
    left: -12rem;
  }
}
@media (min-width: 1920px) {
  .image-position {
    left: -11rem;
  }
}
@media (min-width: 2100px) {
  .image-position {
    left: -9rem;
  }
}
@media (max-width: 767px) {
  .intro_img {
    width: 400px;
    height: 244px;
    min-width: 375px;
    max-width: 375px;
  }
}
@media (max-height: 607px) {
  .intro {
    height: 700px;
  }
}
</style>
