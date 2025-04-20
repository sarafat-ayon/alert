<template>
  <section>
    <div v-if="$route.name === 'index'" class="hidden md:block desktop_device">
      <header
        class="min-w-full flex float-right items-center justify-end container h-26 fixed z-10"
        :class="[
          isSticky ? 'stickyTop fixed min-w-full top-0 shadow-md' : '',
          landingContent ? 'starterIndex' : '',
          headerWidth ? 'bg-ash-landing_header' : '',
        ]"
      >
        <div class="logo-space"></div>
        <!-- <div class="flex space-x-6 mr-6 items-center">
          <button
            v-if="!loggedIn"
            class="
              bg-yellow-primary
              rounded-full
              text-white
              font-bold
              h-10
              xl:w-52
              md:w-52
              text-md
              border-none
              outline-none
            "
          >
            <span
              ><a :href="`tel:1-303-710-8530`">
                Call Now 1-303-710-8530
              </a></span
            >
          </button>

          <button
            v-if="!loggedIn"
            class="
              bg-yellow-primary
              rounded-full
              text-white
              font-bold
              h-10
              xl:w-52
              md:w-52
              text-md
              border-none
              outline-none
            "
          >
            <span
              ><a
                href="https://calendly.com/sharparchive/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Appointment
              </a></span
            >
          </button>
        </div>-->

        <div class="logo relative"></div>
        <nav
          class="flex justify-end xl:space-x-6 md:space-x-4 items-center md:text-lg text-md relative lg:mr-17 md:mr-8 navbar h-full"
        >
          <template v-if="!loggedIn">
            <button
              class="bg-yellow-primary rounded-full text-white font-bold h-10 whitespace-nowrap px-4 text-md border-none outline-none"
            >
              <span>
                <a :href="`tel:1-303-710-8530`">Call Now 1-303-710-8530</a>
              </span>
            </button>

            <button
              class="bg-yellow-primary rounded-full text-white font-bold h-10 whitespace-nowrap px-4 text-md border-none outline-none"
            >
              <span>
                <a
                  href="https://calendly.com/sharp-archive/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                >Schedule Appointment</a>
              </span>
            </button>
          </template>
          <nuxt-link
            v-if="loggedIn"
            class="bg-yellow-primary rounded-full text-white font-bold h-10 xl:w-44 md:w-32 text-md flex items-center justify-center"
            to="/home"
          >
            <span>Home</span>
          </nuxt-link>

          <!-- <button
              v-if="!loggedIn"
              class="
                bg-yellow-primary
                rounded-full
                text-white
                font-bold
                h-10
                xl:w-44
                md:w-32
                text-md
                border-none
                outline-none
              "
              @click="openFullStarterModal()"
            >
              <span> Sign Up</span>
          </button>-->
          <button
            v-if="!loggedIn"
            class="bg-yellow-primary rounded-full text-white font-bold h-10 xl:w-36 md:w-24 text-md border-none outline-none"
            @click="openFullStarterModal()"
          >
            <span>Sign Up</span>
          </button>

          <button
            v-if="!loggedIn"
            class="border-2 border-yellow-primary text-yellow-primary hover:text-offwhite-600 overflow-hidden whitespace-nowrap xl:px-8 md:px-4 py-1 font-bold rounded-full text-center text-md transition-all duration-500 ease-in-out focus:text-white"
            @click="gotoTryDemoSite"
          >Try Demo</button>
          <transition name="slideRight">
            <div
              class="slide-menu items-center h-full"
              :class="isSticky || headerWidth ? 'show' : ''"
            >
              <!-- <button
                v-if="loggedIn"
                class="
                  border-2 border-yellow-primary
                  text-yellow-primary
                  hover:text-offwhite-600
                  overflow-hidden
                  whitespace-nowrap
                  xl:px-15
                  md:px-10
                  py-1
                  font-bold
                  rounded-full
                  text-center text-md
                  transition-all
                  duration-500
                  ease-in-out
                  focus:text-white
                "
                :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                @click="
                  user.paymentStatus === 'paid'
                    ? $router.push('/home')
                    : $router.push('/payment')
                "
              >
                <span> Home</span>
              </button>-->

              <!-- <button
                class="
                  border-2 border-yellow-primary
                  text-yellow-primary
                  hover:text-offwhite-600
                  overflow-hidden
                  whitespace-nowrap
                  xl:px-10
                  md:px-5
                  py-1
                  font-bold
                  rounded-full
                  text-center text-md
                  transition-all
                  duration-500
                  ease-in-out
                  focus:text-white
                "
                :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                @click="gotoTryDemoSite"
              >
                Try Demo
              </button>-->
              <!-- </button> -->
              <!-- <n-link
                  to="/industries"
                  class="
                    text-yellow-primary
                    hover:text-offwhite-600
                    py-3
                    pt-2
                    text-xl
                    transition-all
                    duration-500
                    ease-in-out
                    focus:text-white
                  "
                  :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                >
                  Industries
                </n-link>
                <button
                  class="
                    text-yellow-primary
                    hover:text-offwhite-600
                    py-3
                    pt-2
                    text-xl
                    transition-all
                    duration-500
                    ease-in-out
                    cursor-pointer
                    focus:text-white
                    border-none
                    outline-none
                    h-full
                  "
                  :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                  @click="openStarterModal()"
                >
                  Pricing
              </button>-->

              <button
                class="text-yellow-primary hover:text-offwhite-600 py-3 text-xl transition-all duration-500 ease-in-out focus:text-white h-full resources-menu border-none outline-none"
                :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                @mousemove="showResources = true"
                @mouseleave="showResources = false"
              >
                Resources
                <transition name="fadeIn">
                  <div
                    v-if="showResources"
                    class="w-auto text-left bg-ash-landing_header absolute top-full bottom-0 shadow-3xl rounded-b-sm submenu"
                  >
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <a href="https://sharparchive.com/blog/">Blog</a>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link
                          to="/industries"
                          :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                        >Industries</n-link>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <button
                          :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                          @click="openStarterModal()"
                        >Pricing</button>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link to="/faq">FAQ</n-link>
                      </li>
                    </ul>
                    <!-- <ul
                      class="
                        bg-ash-landing_header
                        text-yellow-primary
                        hover:text-offwhite-600
                        py-4
                        px-3
                        text-xl
                        transition-all
                        duration-500
                        ease-in-out
                        focus:text-white
                        shadow-3xl
                        rounded-b-sm
                        border-t border-solid border-ash-dark
                      "
                    >
                      <li>Webinars</li>
                    </ul>-->
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <a
                          href="https://calendly.com/sharp-archive/15min"
                          target="_blank"
                          rel="noopener noreferrer"
                        >Set Appoinment</a>
                      </li>
                    </ul>
                  </div>
                </transition>
              </button>

              <button
                class="text-yellow-primary hover:text-offwhite-600 py-3 text-xl transition-all duration-500 ease-in-out focus:text-white h-full border-none outline-none resources-menu resources-menu_company"
                :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                @mousemove="showCompany = true"
                @mouseleave="showCompany = false"
              >
                Company
                <transition name="fadeIn">
                  <div
                    v-if="showCompany"
                    class="w-40 text-left bg-ash-landing_header absolute top-full bottom-0 shadow-3xl rounded-b-sm submenu"
                  >
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link to="/about">About</n-link>
                      </li>
                    </ul>

                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <a
                          href="https://status.sharparchive.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >Service Report</a>
                      </li>
                    </ul>

                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link to="/contact">Contact</n-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </button>
              <!-- <n-link
                to="/about"
                class="
                  text-yellow-primary
                  hover:text-offwhite-600
                  overflow-hidden
                  whitespace-nowrap
                  py-3
                  pt-2
                  text-xl
                  transition-all
                  duration-500
                  ease-in-out
                  focus:text-white
                "
                :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
              >
                About & FAQ
              </n-link>-->
            </div>
          </transition>
          <div
            v-if="loggedIn"
            class="flex flex-row items-center cursor-pointer"
            @click="openLogoutModal"
          >
            <fa class="text-yellow-600 mr-2 text-3xl" :icon="['fas', 'user-circle']" />
            <nuxt-link
              v-if="loggedIn"
              to="/home"
              class="text-white text-xl"
            >{{ `${user.firstName} ${user.lastName}` }}</nuxt-link>
          </div>
          <!-- <button
              v-else
              class="
                text-yellow-primary
                hover:text-offwhite-600
                py-3
                pt-2
                xl:px-6
                md:px-3
                text-xl
                flex
                items-center
                focus:text-white
                border-none
                outline-none
              "
              @click="showUserLoginComp(), closeStarterModal()"
            >
              <span class="inline-block">Log In</span>
          </button>-->
          <button
            v-else
            class="text-yellow-primary hover:text-offwhite-600 py-3 pt-2 xl:pr-6 md:pr-3 text-xl flex items-center focus:text-white border-none outline-none"
            @click="showUserLoginComp(), closeStarterModal()"
          >
            <span class="inline-block whitespace-nowrap">Log In</span>
          </button>
        </nav>

        <button class="flex md:hidden flex-col absolute top-0 right-0 p-4 mt-5">
          <span class="w-5 h-px mb-1 bg-orange-500"></span>
          <span class="w-5 h-px mb-1 bg-orange-500"></span>
          <span class="w-5 h-px mb-1 bg-orange-500"></span>
        </button>
      </header>
    </div>

    <div v-else class="hidden md:block desktop_device">
      <header
        class="min-w-full flex float-right items-center justify-end container h-26 fixed stickyTop top-0 shadow-md bg-ash-landing_header z-10"
        :class="[landingContent ? 'starterIndex' : '']"
      >
        <!-- <div class="flex space-x-6 mr-6 items-center">
          <button
            v-if="!loggedIn"
            class="
              bg-yellow-primary
              rounded-full
              text-white
              font-bold
              h-10
              xl:w-52
              md:w-52
              text-md
              border-none
              outline-none
            "
          >
            <span
              ><a :href="`tel:1-303-710-8530`">
                Call Now 1-303-710-8530
              </a></span
            >
          </button>

          <button
            v-if="!loggedIn"
            class="
              bg-yellow-primary
              rounded-full
              text-white
              font-bold
              h-10
              xl:w-52
              md:w-52
              text-md
              border-none
              outline-none
            "
          >
            <span
              ><a
                href="https://calendly.com/sharparchive/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Appointment
              </a></span
            >
          </button>
        </div>-->
        <!-- <div class="logo relative"></div> -->
        <nav
          class="flex justify-end xl:space-x-6 md:space-x-4 items-center md:text-lg text-md relative lg:mr-17 md:mr-8 navbar h-full"
        >
          <template v-if="!loggedIn">
            <button
              class="bg-yellow-primary rounded-full text-white font-bold h-10 whitespace-nowrap px-4 text-md border-none outline-none"
            >
              <span>
                <a :href="`tel:1-303-710-8530`">Call Now 1-303-710-8530</a>
              </span>
            </button>

            <button
              class="bg-yellow-primary rounded-full text-white font-bold h-10 whitespace-nowrap px-4 text-md border-none outline-none"
            >
              <span>
                <a
                  href="https://calendly.com/sharp-archive/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                >Schedule Appointment</a>
              </span>
            </button>
          </template>
          <button
            v-if="!loggedIn"
            class="bg-yellow-primary rounded-full text-white font-bold h-10 xl:w-36 md:w-24 text-md border-none outline-none"
            @click="openFullStarterModal()"
          >
            <span>Sign Up</span>
          </button>
          <button
            v-if="!loggedIn"
            class="border-2 border-yellow-primary text-yellow-primary hover:text-offwhite-600 overflow-hidden whitespace-nowrap xl:px-8 md:px-4 py-1 font-bold rounded-full text-center text-md transition-all duration-500 ease-in-out focus:text-white opacity-1"
            @click="gotoTryDemoSite"
          >Try Demo</button>
          <transition name="slideRight">
            <div class="slide-menu items-center show h-full">
              <!-- <button
                class="
                  border-2 border-yellow-primary
                  text-yellow-primary
                  hover:text-offwhite-600
                  overflow-hidden
                  whitespace-nowrap
                  xl:px-10
                  md:px-5
                  py-1
                  font-bold
                  rounded-full
                  text-center text-md
                  transition-all
                  duration-500
                  ease-in-out
                  focus:text-white
                  opacity-1
                "
                @click="gotoTryDemoSite"
              >
                Try Demo
              </button>-->
              <!-- </button> -->

              <!-- <button
                v-if="loggedIn"
                class="
                  border-2 border-yellow-primary
                  text-yellow-primary
                  hover:text-offwhite-600
                  overflow-hidden
                  whitespace-nowrap
                  xl:px-15
                  md:px-10
                  py-1
                  font-bold
                  rounded-full
                  text-center text-md
                  transition-all
                  duration-500
                  ease-in-out
                  focus:text-white
                "
                @click="
                  user.paymentStatus === 'paid'
                    ? $router.push('/home')
                    : $router.push('/payment')
                "
              >
                <span> Home</span>
              </button>-->
              <nuxt-link
                v-if="loggedIn"
                class="bg-yellow-primary rounded-full text-white font-bold h-10 xl:w-44 md:w-32 text-md flex items-center justify-center"
                to="/home"
              >
                <span>Home</span>
              </nuxt-link>
              <button
                class="text-yellow-primary hover:text-offwhite-600 py-3 text-xl transition-all duration-500 ease-in-out focus:text-white h-full opacity-1 resources-menu border-none outline-none"
                @mousemove="showResources = true"
                @mouseleave="showResources = false"
              >
                Resources
                <transition name="fadeIn">
                  <div
                    v-if="showResources"
                    class="w-auto text-left bg-ash-landing_header absolute top-full bottom-0 shadow-3xl rounded-b-sm submenu"
                  >
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <a href="https://sharparchive.com/blog/">Blog</a>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link
                          to="/industries"
                          :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                        >Industries</n-link>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <button
                          :class="showHidedMenu ? 'opacity-1' : 'opacity-0'"
                          @click="openStarterModal()"
                        >Pricing</button>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link to="/faq">FAQ</n-link>
                      </li>
                    </ul>
                    <!-- <ul
                      class="
                        bg-ash-landing_header
                        text-yellow-primary
                        hover:text-offwhite-600
                        py-4
                        px-3
                        text-xl
                        transition-all
                        duration-500
                        ease-in-out
                        focus:text-white
                        shadow-3xl
                        rounded-b-sm
                        border-t border-solid border-ash-dark
                      "
                    >
                      <li>Webinars</li>
                    </ul>-->
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <a
                          href="https://calendly.com/sharp-archive/15min"
                          target="_blank"
                          rel="noopener noreferrer"
                        >Set Appoinment</a>
                      </li>
                    </ul>
                  </div>
                </transition>
              </button>

              <button
                class="text-yellow-primary hover:text-offwhite-600 py-3 text-xl transition-all duration-500 ease-in-out focus:text-white h-full opacity-1 resources-menu_company border-none outline-none"
                @mousemove="showCompany = true"
                @mouseleave="showCompany = false"
              >
                Company
                <transition name="fadeIn">
                  <div
                    v-if="showCompany"
                    class="w-40 text-left bg-ash-landing_header absolute top-full bottom-0 shadow-3xl rounded-b-sm submenu"
                  >
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link to="/about">About</n-link>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <a
                          href="https://status.sharparchive.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >Service Report</a>
                      </li>
                    </ul>
                    <ul
                      class="bg-ash-landing_header text-yellow-primary hover:text-offwhite-600 py-4 px-3 text-xl transition-all duration-500 ease-in-out focus:text-white shadow-3xl rounded-b-sm border-t border-solid border-ash-dark"
                    >
                      <li>
                        <n-link to="/contact">Contact</n-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </button>
              <!-- <n-link
                to="/about"
                class="
                  text-yellow-primary
                  hover:text-offwhite-600
                  overflow-hidden
                  whitespace-nowrap
                  py-3
                  pt-2
                  text-xl
                  transition-all
                  duration-500
                  ease-in-out
                  focus:text-white
                  opacity-1
                "
              >
                About & FAQ
              </n-link>-->
            </div>
          </transition>

          <div
            v-if="loggedIn"
            class="flex flex-row items-center cursor-pointer"
            @click="openLogoutModal"
          >
            <fa class="text-yellow-600 mx-2 text-3xl" :icon="['fas', 'user-circle']" />
            <nuxt-link
              v-if="loggedIn"
              to="/home"
              class="text-white text-xl"
            >{{ `${user.firstName} ${user.lastName}` }}</nuxt-link>
          </div>
          <button
            v-else
            class="text-yellow-primary hover:text-offwhite-600 py-3 pt-2 xl:px-6 md:px-3 text-xl flex items-center border-none outline-none focus:text-white"
            @click="showUserLoginComp(), closeStarterModal()"
          >
            <span class="inline-block whitespace-nowrap">Log In</span>
          </button>
        </nav>

        <button class="flex md:hidden flex-col absolute top-0 right-0 p-4 mt-5">
          <span class="w-5 h-px mb-1 bg-orange-500"></span>
          <span class="w-5 h-px mb-1 bg-orange-500"></span>
          <span class="w-5 h-px mb-1 bg-orange-500"></span>
        </button>
      </header>
    </div>

    <!-- small device -->
    <div v-if="$route.name === 'index'" class="small_device_header">
      <header
        class="min-w-full flex float-right items-center justify-end py-6 mx-0 container h-26 z-31"
        :class="[
          isSticky ? 'stickyTop fixed top-0 min-w-full shadow-md' : 'absolute',
          headerWidth ? 'bg-ash-landing_header' : '',
          increaseIndex ? 'z-31' : '',
          starterModal || starterAccount ? 'header_index' : '',
        ]"
      >
        <div class="logo relative"></div>
        <button
          v-if="(isSticky || headerWidth) && !loggedIn"
          class="bg-yellow-primary rounded-full text-white font-bold h-10 w-44 text-md sign_up"
          @click="openMobileFullStarterModal(), closeMenubar()"
        >
          <span>Sign Up</span>
        </button>
        <nav>
          <div class="small-menubar">
            <transition name="fadeIn">
              <div v-if="isSticky || headerWidth" class="mr-6" @click="handleMenubar()">
                <img
                  src="~/assets/img/icon/mune_header.png"
                  alt="Menu Icon, by click on here we can see mobile menu"
                  width="25"
                  height="25"
                />
              </div>
            </transition>
            <div
              class="bg-ash-default text-white fixed top-0 left-0 w-full h-full px-5 py-0 z-999999 flex justify-between nav-menubar transition-all duration-1000 ease-in-out overflow-y-auto scroll"
              :class="menu ? 'menu_show' : 'menu_hide'"
            >
              <div class="h-auto w-full flex flex-wrap content-between">
                <div class="w-full h-auto">
                  <div
                    class="flex flex-row justify-end items-center h-26 w-full sticky top-0 bg-ash-landing_header"
                  >
                    <button class="focus:outline-none" @click="closeMenubar()">
                      <img
                        src="~/assets/img/icon/cross.png"
                        width="25"
                        height="25"
                        alt="Cross Icon, by click on here we can close mobile menu"
                      />
                    </button>
                  </div>

                  <div class="flex flex-col w-full h-auto justify-start items-center pb-4 mt-6">
                    <template v-if="!loggedIn">
                      <button
                        class="bg-yellow-primary rounded-full text-white font-bold h-9 whitespace-nowrap px-4 text-md flex items-center justify-center border-none outline-none mt-3"
                      >
                        <span>
                          <a :href="`tel:1-303-710-8530`">Call Now 1-303-710-8530</a>
                        </span>
                      </button>
                      <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                      <button
                        class="bg-yellow-primary rounded-full text-white font-bold h-9 whitespace-nowrap px-4 text-md flex items-center justify-center border-none outline-none mt-3"
                      >
                        <span>
                          <a
                            href="https://calendly.com/sharp-archive/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                          >Schedule Appointment</a>
                        </span>
                      </button>
                      <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    </template>
                    <n-link
                      v-if="loggedIn"
                      class="bg-yellow-primary rounded-full text-white font-bold h-9 w-34 text-md flex items-center justify-center mt-3"
                      :to="redirectUser(user.paymentStatus)"
                    >Home</n-link>
                    <div v-if="loggedIn" class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <n-link
                      class="text-yellow-primary hover:text-offwhite-600 text-xl mt-3"
                      to="/industries"
                    >Industries</n-link>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <span
                      class="text-yellow-primary hover:text-offwhite-600 text-xl mt-3"
                      @click="openStarterModal()"
                    >Pricing</span>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <div
                      class="mt-3 w-full flex justify-center items-center"
                      :class="
                        mobileSubMneu ? 'text-white' : 'text-yellow-primary'
                      "
                      @click="setMobileSubMenu()"
                    >
                      <button
                        class="text-xl transition-all duration-500 ease-in-out flex-grow"
                      >Resources</button>
                      <svg
                        width="15"
                        height="15"
                        class="fill-current transition-all duration-500 ease-in-out cursor-pointer"
                        :class="mobileSubMneu ? 'rotate-360' : 'rotate-270'"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 292.362 292.362"
                      >
                        <path
                          d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
    C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
    s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
                        />
                      </svg>
                    </div>
                    <transition name="height-company">
                      <div
                        v-if="mobileSubMneu"
                        class="w-full text-center transition-all duration-500 ease-in-out mt-0 pr-4"
                      >
                        <ul
                          class="bg-ash-landing_header text-yellow-primary py-2 text-xl transition-all duration-500 ease-in-out focus:text-white space-y-2"
                        >
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <a href="https://sharparchive.com/blog/">Blog</a>
                          </li>
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <n-link to="/faq">FAQ</n-link>
                          </li>
                          <!-- <li
                            class="
                              transition-all
                              duration-500
                              ease-in-out
                              hover:text-offwhite-600
                            "
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            Webinars
                          </li>-->
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <a
                              href="https://calendly.com/sharp-archive/15min"
                              target="_blank"
                              rel="noopener noreferrer"
                            >Set Appoinment</a>
                          </li>
                        </ul>
                      </div>
                    </transition>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <div
                      class="mt-3 w-full flex justify-center items-center"
                      :class="
                        mobileSubMneuCompany
                          ? 'text-white'
                          : 'text-yellow-primary'
                      "
                      @click="setMobileSubMenuCompany()"
                    >
                      <button
                        class="text-xl transition-all duration-500 ease-in-out flex-grow"
                      >Company</button>
                      <svg
                        width="15"
                        height="15"
                        class="fill-current transition-all duration-500 ease-in-out cursor-pointer"
                        :class="
                          mobileSubMneuCompany ? 'rotate-360' : 'rotate-270'
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 292.362 292.362"
                      >
                        <path
                          d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
    C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
    s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
                        />
                      </svg>
                    </div>
                    <transition name="height-company">
                      <div
                        v-if="mobileSubMneuCompany"
                        class="w-full text-center transition-all duration-500 ease-in-out mt-0 pr-4"
                      >
                        <ul
                          class="bg-ash-landing_header text-yellow-primary py-2 text-xl transition-all duration-500 ease-in-out focus:text-white space-y-2"
                        >
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneuCompany
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <n-link to="/about">About</n-link>
                          </li>
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneuCompany
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <a
                              href="https://status.sharparchive.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >Service Report</a>
                          </li>
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneuCompany
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <n-link to="/contact">Contact</n-link>
                          </li>
                        </ul>
                      </div>
                    </transition>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <button
                      v-if="!loggedIn"
                      class="bg-yellow-primary rounded-full text-white font-bold h-9 w-34 text-md mt-4"
                      @click="
                        showUserLoginComp(), closeStarterModal(), closeMenubar()
                      "
                    >
                      <span class="whitespace-nowrap">Log In</span>
                    </button>

                    <div
                      v-if="loggedIn"
                      class="flex flex-row items-center cursor-pointer mt-3"
                      @click="openLogoutModal"
                    >
                      <fa class="text-yellow-600 mx-2 text-2xl" :icon="['fas', 'user-circle']" />
                      <nuxt-link
                        v-if="loggedIn"
                        to="/home"
                        class="text-yellow-primary text-xl"
                      >{{ `${user.firstName} ${user.lastName}` }}</nuxt-link>
                    </div>
                    <div v-if="loggedIn" class="w-full h-0.5 bg-ash-landing mt-3"></div>
                  </div>
                </div>

                <div
                  v-if="!loggedIn"
                  class="flex flex-row justify-center space-x-5 w-full mt-4 bg-ash-default sticky bottom-0 left-0 h-14"
                >
                  <button
                    class="focus:outline-none w-44 h-10 border-2 border-yellow-primary text-yellow-primary hover:text-offwhite-600 rounded-full outline-none font-bold text-md setup"
                    @click="gotoTryDemoSite"
                  >Try Demo</button>
                  <button
                    class="bg-yellow-primary rounded-full text-white font-bold h-10 w-44 text-md"
                    @click="openMobileFullStarterModal(), closeMenubar()"
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- </transition> -->
          </div>
        </nav>
      </header>
    </div>
    <div v-else class="small_device_header">
      <header
        class="min-w-full flex float-right items-center justify-end py-6 mx-0 container h-26 stickyTop fixed top-0 shadow-md z-31 bg-ash-landing_header"
        :class="[
          increaseIndex ? 'z-31' : '',
          starterModal || starterAccount ? 'header_index' : '',
        ]"
      >
        <div class="logo relative"></div>
        <button
          v-if="!loggedIn"
          class="bg-yellow-primary rounded-full text-white font-bold h-10 w-44 text-md sign_up"
          @click="openMobileFullStarterModal(), closeMenubar()"
        >
          <span>Sign Up</span>
        </button>
        <nav>
          <div class="small-menubar">
            <transition name="fadeIn">
              <div class="mr-6" @click="handleMenubar()">
                <img
                  src="~/assets/img/icon/mune_header.png"
                  alt="Menu Icon, by click on here we can see mobile menu"
                  width="25"
                  height="25"
                />
              </div>
            </transition>
            <div
              class="bg-ash-default text-white fixed top-0 left-0 w-full h-full px-5 py-0 z-999999 flex justify-between nav-menubar transition-all duration-1000 ease-in-out overflow-y-scroll scroll"
              :class="menu ? 'menu_show' : 'menu_hide'"
            >
              <div class="h-auto w-full flex flex-wrap content-between">
                <div class="w-full h-auto">
                  <div
                    class="flex flex-row justify-end items-center h-26 w-full sticky top-0 bg-ash-landing_header"
                  >
                    <button class="focus:outline-none" @click="closeMenubar()">
                      <img
                        src="~/assets/img/icon/cross.png"
                        width="25"
                        height="25"
                        alt="Cross Icon, by click on here we can close mobile menu"
                      />
                    </button>
                  </div>

                  <div class="flex flex-col w-full h-auto pb-4 justify-start items-center mt-6">
                    <template v-if="!loggedIn">
                      <button
                        class="bg-yellow-primary rounded-full text-white font-bold h-9 whitespace-nowrap px-4 text-md flex items-center justify-center border-none outline-none mt-3"
                      >
                        <span>
                          <a :href="`tel:1-303-710-8530`">Call Now 1-303-710-8530</a>
                        </span>
                      </button>
                      <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                      <button
                        class="bg-yellow-primary rounded-full text-white font-bold h-9 whitespace-nowrap px-4 text-md flex items-center justify-center border-none outline-none mt-3"
                      >
                        <span>
                          <a
                            href="https://calendly.com/sharp-archive/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                          >Schedule Appointment</a>
                        </span>
                      </button>
                      <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    </template>
                    <n-link
                      v-if="loggedIn"
                      class="bg-yellow-primary rounded-full text-white font-bold h-9 w-34 text-md flex items-center justify-center mt-3"
                      :to="redirectUser(user.paymentStatus)"
                    >Home</n-link>
                    <div v-if="loggedIn" class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <n-link
                      class="text-yellow-primary hover:text-offwhite-600 text-xl mt-3"
                      to="/industries"
                    >Industries</n-link>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <span
                      class="text-yellow-primary hover:text-offwhite-600 text-xl mt-3"
                      @click="openStarterModal()"
                    >Pricing</span>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <div
                      class="mt-3 w-full flex justify-center items-center"
                      :class="
                        mobileSubMneu ? 'text-white' : 'text-yellow-primary'
                      "
                      @click="setMobileSubMenu()"
                    >
                      <button
                        class="text-xl transition-all duration-500 ease-in-out flex-grow"
                      >Resources</button>
                      <svg
                        width="15"
                        height="15"
                        class="fill-current transition-all duration-500 ease-in-out cursor-pointer"
                        :class="mobileSubMneu ? 'rotate-360' : 'rotate-270'"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 292.362 292.362"
                      >
                        <path
                          d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
    C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
    s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
                        />
                      </svg>
                    </div>
                    <transition name="height-company">
                      <div
                        v-if="mobileSubMneu"
                        class="w-full text-center transition-all duration-500 ease-in-out mt-0 pr-4"
                      >
                        <ul
                          class="bg-ash-landing_header text-yellow-primary py-2 text-xl transition-all duration-500 ease-in-out focus:text-white space-y-2"
                        >
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <a href="https://sharparchive.com/blog/">Blog</a>
                          </li>
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <n-link to="/faq">FAQ</n-link>
                          </li>
                          <!-- <li
                            class="
                              transition-all
                              duration-500
                              ease-in-out
                              hover:text-offwhite-600
                            "
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            Webinars
                          </li>-->
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneu
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <a
                              href="https://calendly.com/sharp-archive/15min"
                              target="_blank"
                              rel="noopener noreferrer"
                            >Set Appoinment</a>
                          </li>
                        </ul>
                      </div>
                    </transition>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <div
                      class="mt-3 w-full flex justify-center items-center"
                      :class="
                        mobileSubMneuCompany
                          ? 'text-white'
                          : 'text-yellow-primary'
                      "
                      @click="setMobileSubMenuCompany()"
                    >
                      <button
                        class="text-xl transition-all duration-500 ease-in-out flex-grow"
                      >Company</button>
                      <svg
                        width="15"
                        height="15"
                        class="fill-current transition-all duration-500 ease-in-out cursor-pointer"
                        :class="
                          mobileSubMneuCompany ? 'rotate-360' : 'rotate-270'
                        "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 292.362 292.362"
                      >
                        <path
                          d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
    C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
    s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
                        />
                      </svg>
                    </div>
                    <transition name="height-company">
                      <div
                        v-if="mobileSubMneuCompany"
                        class="w-full text-center transition-all duration-500 ease-in-out mt-0 pr-4"
                      >
                        <ul
                          class="bg-ash-landing_header text-yellow-primary py-2 text-xl transition-all duration-500 ease-in-out focus:text-white space-y-2"
                        >
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneuCompany
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <n-link to="/about">About</n-link>
                          </li>
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneuCompany
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <a
                              href="https://status.sharparchive.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >Service Report</a>
                          </li>
                          <li
                            class="transition-all duration-500 ease-in-out hover:text-offwhite-600"
                            :class="
                              mobileSubMneuCompany
                                ? 'delay-500 opacity-100'
                                : 'opacity-0'
                            "
                          >
                            <n-link to="/contact">Contact</n-link>
                          </li>
                        </ul>
                      </div>
                    </transition>
                    <div class="w-full h-0.5 bg-ash-landing mt-3"></div>
                    <button
                      v-if="!loggedIn"
                      class="bg-yellow-primary rounded-full text-white font-bold h-9 w-34 text-md mt-4"
                      @click="
                        showUserLoginComp(), closeStarterModal(), closeMenubar()
                      "
                    >
                      <span class="whitespace-nowrap">Log In</span>
                    </button>

                    <div
                      v-if="loggedIn"
                      class="flex flex-row items-center cursor-pointer mt-3"
                      @click="openLogoutModal"
                    >
                      <fa class="text-yellow-600 mx-2 text-2xl" :icon="['fas', 'user-circle']" />
                      <nuxt-link
                        v-if="loggedIn"
                        to="/home"
                        class="text-yellow-primary text-xl"
                      >{{ `${user.firstName} ${user.lastName}` }}</nuxt-link>
                    </div>
                    <div v-if="loggedIn" class="w-full h-0.5 bg-ash-landing mt-3"></div>
                  </div>
                </div>

                <div
                  v-if="!loggedIn"
                  class="flex flex-row justify-center space-x-5 w-full mt-4 bg-ash-default sticky bottom-0 left-0 h-14"
                >
                  <button
                    class="focus:outline-none w-44 h-10 border-2 border-yellow-primary text-yellow-primary hover:text-offwhite-600 rounded-full outline-none font-bold text-md setup"
                    @click="gotoTryDemoSite"
                  >Try Demo</button>
                  <button
                    class="bg-yellow-primary rounded-full text-white font-bold h-10 w-44 text-md"
                    @click="openMobileFullStarterModal(), closeMenubar()"
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Landing',
  props: {
    showUserLogin: {
      type: Boolean,
    },
  },
  data() {
    return {
      showLoginModal: false,
      menu: false,
      extand: false,
      showHidedMenu: false,
      increaseIndex: false,
      logoShow: false,
      starterAccount: false,
      starterModal: false,
      mobileSubMneu: false,
      mobileSubMneuCompany: false,
      showResources: false,
      showCompany: false,
    }
  },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      starterMaximized: 'starterMaximized',
      starterAccountMaximized: 'starterAccountMaximized',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
      starterCollapse: 'starterCollapse',
      setupContent: 'setupContent',
    }),
    ...mapState('loginAnimation', {
      landingContent: 'landingContent',
      // showLogin: 'showLogin',
      showLogin: 'showLogin',
    }),
    ...mapState(['landingLoader']),
    user() {
      return this.$auth.user
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  watch: {
    $route(to, from) {
      if (
        to.name === 'industries' ||
        to.name === 'contact' ||
        to.name === 'about' ||
        to.name === 'faq'
      ) {
        this.setIsSticky(true)
        this.closeStarterModal()
        this.showhideTab()
        this.extand = false
      } else if (to.name === 'index') {
        // this.closeStarterModal()
        this.setIsSticky(false)
        this.setHeaderWidth(false)
        this.extand = false
      }

      this.closeMenubar()
    },
    showUserLogin(data) {
      if (data) {
        this.logoShow = true
      } else {
        setTimeout(() => {
          this.logoShow = false
        }, 1000)
      }
    },
    isSticky(data) {
      if (data && this.$route.name === 'index') {
        setTimeout(() => {
          this.showHidedMenu = true
        }, 600)
      } else if (!data && this.$route.name === 'index') {
        this.showHidedMenu = false
      }
    },
    starterAccountMaximized(data) {
      if (data) {
        this.starterAccount = data
      } else {
        setTimeout(() => {
          this.starterAccount = data
        }, 2000)
      }
    },
    starterMaximized(data) {
      if (data) {
        this.starterModal = data
      } else {
        setTimeout(() => {
          this.starterModal = data
        }, 2000)
      }
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.$route.query.signup === 'true' && !this.landingLoader) {
        this.openFullStarterModal()
        this.openMobileFullStarterModal()
      }
    }, 1000)
    window.addEventListener('scroll', this.handleScroll)
    // if (this.$route.name === 'pricing') {
    //   this.showhideTab()
    //   this.extand = true
    // }
    if (
      this.$route.name === 'industries' ||
      this.$route.name === 'contact' ||
      this.$route.name === 'about' ||
      this.$route.name === 'faq' ||
      this.$route.name === 'privacy-policy' ||
      this.$route.name === 'terms-of-service' ||
      this.$route.name === 'terms-and-conditions'
    ) {
      this.showHidedMenu = true
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    redirectUser(status) {
      if (status === 'paid' || status === 'ordered') {
        return '/home'
      }
      return '/payment'
    },
    setMobileSubMenu() {
      if (this.mobileSubMneuCompany) {
        this.mobileSubMneuCompany = false
      }
      setTimeout(() => {
        this.mobileSubMneu = !this.mobileSubMneu
      }, 500)
    },
    setMobileSubMenuCompany() {
      if (this.mobileSubMneu) {
        this.mobileSubMneu = false
      }
      setTimeout(() => {
        this.mobileSubMneuCompany = !this.mobileSubMneuCompany
      }, 500)
    },
    openLogoutModal() {
      this.$store.commit('profile/SET_PROFILE_MODAL', true)
    },
    handleMenubar() {
      setTimeout(() => {
        this.menu = true
        this.increaseIndex = true
      }, 500)
      this.setHeaderWidth(true)
      this.$emit('hide-logo', true)
    },
    closeMenubar() {
      this.increaseIndex = false
      this.menu = false
      this.mobileSubMneu = false
      this.mobileSubMneuCompany = false
      if (this.$route.name === 'index') {
        this.setHeaderWidth(false)
      }
      setTimeout(() => {
        this.$emit('hide-logo', false)
      }, 1000)
    },
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      if (this.$route.name === 'index') {
        this.setIsSticky(window.scrollY > 2)
      }
    },
    showhideTab() {
      this.setHeaderWidth(true)
    },
    showUserLoginComp() {
      this.$emit('show-login')
      this.show_login(true)

      // this.landing_content(true)
    },
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
      setHeaderWidth: 'set_header_width',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    openStarterModal() {
      this.closeMenubar()
      this.expand_starter_modal(true)
      this.collapse_starter_modal(false)
      setTimeout(() => {
        this.show_sign_up(true)
      }, 1000)
      setTimeout(() => {
        this.updateSetupContent('price-plan')
      }, 1000)
    },
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
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      if (this.starterExpanded) {
        if (this.starterExpanded) {
          this.collapse_starter_modal(true)
          this.show_sign_up(false)
        }
        setTimeout(() => {
          this.expand_starter_modal(false)
        }, 100)
        this.maximize_starter_modal(false)
        this.updateSetupContent('starter-button')
      }
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      collapse_starter_modal: 'collapse_starter_modal',
      set_header_width: 'set_header_width',
      show_sign_up: 'show_sign_up',
      maximize_starter_modal: 'maximize_starter_modal',
      starter_account_maximized: 'starter_account_maximized',
      updateSetupContent: 'updateSetupContent',
      show_login: 'loginAnimation/show_login',
      landing_content: 'loginAnimation/landing_content',
    }),
    gotoTryDemoSite() {
      // fire google tag event
      this.$gtag.query('event', 'conversion', {
        send_to: 'AW-10870673149/lfWvCN_Xx8sDEP2dxb8o',
      })
      window.open('https://demo.sharparchive.com/', '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-space {
  width: 12%;
}
.full-header {
  width: 88%;
}
.top-142 {
  top: 142%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.stickyTop {
  height: 100px;
  background: #393e46;
  transition: all 0.3s;
  margin: 0;
}
.small-menubar {
  max-width: 100%;
  height: 100%;
}

.slide-menu {
  transition: all 1s ease-in-out;
  max-width: 0%;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  // @apply xl:space-x-11 md:space-x-4;
  @apply xl:space-x-6 md:space-x-4;
  &.show {
    max-width: 100%;
  }
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

// slideRight transition
.slideRight-enter-active {
  transition: all 1s ease-in-out;
}

.slideRight-leave-active {
  transition: all 1s ease-in-out;
}

.slideRight-enter-to,
.slideRight-leave {
  transform: translate(0%);
}

.slideRight-leave-to,
.slideRight-enter {
  transform: translate(100%);
}

//slideLeft Transitions
.slideLeft-enter-active {
  transition: all 1s ease-in-out;
}

.slideLeft-leave-active {
  transition: all 1s ease-in-out;
}

.slideLeft-enter-to,
.slideLeft-leave {
  transform: translate(0%);
}

.slideLeft-leave-to,
.slideLeft-enter {
  transform: translate(100%);
}

.menu_show {
  left: 0%;
}

.menu_hide {
  left: 100%;
}

.extand {
  z-index: 0;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.5s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}

@media (max-width: 1359px) and (min-width: 1280px) {
  .navbar {
    @apply mr-8;
  }
}

@media (max-width: 767px) {
  .nav-menubar {
    z-index: 1;
    height: 100%;
  }
  .fadeIn-enter-active,
  .fadeIn-leave-active {
    transition: opacity 0.5s;
  }
  .fadeIn-enter,
  .fadeIn-leave-to {
    opacity: 0;
  }
}

@media (min-width: 1025px) {
  .desktop_device {
    display: block;
  }
  .small_device_header {
    display: none;
  }
}

@media (max-width: 1024px) {
  .small_device_header {
    display: block;
  }
  .desktop_device {
    display: none;
  }
  .sign_up {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .header_index {
    z-index: 30;
  }
  .height-enter-active,
  .height-leave-active {
    transition: height 0.5s, opacity 0.5s;
    // height: 150px;
    height: 116px;
  }
  .height-enter,
  .height-leave-to {
    height: 0px;
    opacity: 0;
  }
  .height-company-enter-active,
  .height-company-leave-active {
    transition: height 0.5s, opacity 0.5s;
    // height: 80px;
    height: 116px;
  }
  .height-company-enter,
  .height-company-leave-to {
    height: 0px;
    opacity: 0;
  }
  .min-h-70 {
    min-height: 70%;
  }
}

@media (max-width: 425px) {
  .sign_up {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.starterIndex {
  z-index: 10;
}

.resources-menu:after {
  content: '';
  @apply rounded-sm;
  display: block;
  margin: auto;
  transform: translateY(34px);
  height: 4px;
  width: 0px;
  background: transparent;
  transition: width 0.5s ease, background-color 0.5s ease;
}
.resources-menu:hover:after {
  width: 93.625px;
  background: #e4801d;
}
.resources-menu_company:after {
  content: '';
  @apply rounded-sm;
  display: block;
  margin: auto;
  transform: translateY(34px);
  height: 4px;
  width: 0px;
  background: transparent;
  transition: width 0.5s ease, background-color 0.5s ease;
}
.resources-menu_company:hover:after {
  width: 84.56px;
  background: #e4801d;
}
.submenu {
  top: 100.4%;
}

.rotate-270 {
  transform: rotate(270deg);
}

.rotate-360 {
  transform: rotate(360deg);
}

.body-height {
  height: 90%;
}
.inner-body-height {
  height: 70%;
}

// li:first-child {
//   @apply mt-2;
// }
// li:last-child {
//   @apply mb-2;
// }
</style>