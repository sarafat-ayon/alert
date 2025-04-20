<template>
  <section class="h-full w-full rounded-t-2xl">
    <div
      v-if="isMedium"
      class="grid auto-rows-fr grid-cols-12 gap-4 upper-height"
    >
      <div
        class="
          h-full
          overflow-hidden
          rounded-2xl
          transition-all
          duration-500
          ease-in-out
        "
        :class="
          type === 'Random Sample'
            ? 'col-span-12'
            : 'col-span-12 md:col-span-12 alertXl:col-span-4 alertBigScreen:col-span-6'
        "
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl">
          <div
            class="
              w-full
              py-1.5
              bg-red-deep
              rounded-t-2xl
              text-white text-center text-xl
            "
          >
            General Alert Settings
          </div>

          <GeneralAlertSettingsSub class="w-full h-full overflow-auto scroll" />
        </div>
      </div>
      <!-- For Desktop -->
      <div
        v-if="type !== 'Random Sample' && isDesktop"
        class="
          h-full
          overflow-hidden
          rounded-2xl
          alertXl:block alertXl:col-span-4
          alertBigScreen:col-span-3
        "
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl">
          <div
            class="
              w-full
              py-1.5
              bg-red-deep
              rounded-t-2xl
              text-white text-center text-xl
              px-6
            "
          >
            <span>Sharp Archive Lexicon</span>
            <div
              class="plus_button float-right cursor-pointer"
              :data-title="!allExpandSALexicon ? 'Extend All' : 'Collapse All'"
            >
              <img
                v-if="!allExpandSALexicon"
                class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                src="~/assets/img/svg/Extend-plus.svg"
                alt="SharpArchive Extend-plus Icon"
                @click.stop="expandAllSALexicons(true)"
              />
              <img
                v-else
                class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                src="~/assets/img/svg/Extend-minus.svg"
                alt="SharpArchive Extend-minus Icon"
                @click.stop="expandAllSALexicons(false)"
              />
            </div>
          </div>
          <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
            <SharpArchiveLexicon
              class="overflow-auto scroll"
              :s-a-lexicons="sALexicons"
              @sa-expand-collapse="openSALexicons($event)"
            />
          </div>
        </div>
      </div>
      <div
        v-if="type !== 'Random Sample' && isDesktop"
        class="
          h-full
          overflow-hidden
          rounded-2xl
          hidden
          alertXl:block alertXl:col-span-4
          alertBigScreen:col-span-3
        "
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl">
          <div
            class="
              w-full
              py-1.5
              bg-red-deep
              rounded-t-2xl
              text-white text-center text-xl
              px-6
            "
          >
            <span>Custom Lexicon</span>
            <div
              class="plus_button float-right cursor-pointer"
              :data-title="
                !allExpandCustomLexicon ? 'Extend All' : 'Collapse All'
              "
            >
              <img
                v-if="!allExpandCustomLexicon"
                class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                src="~/assets/img/svg/Extend-plus.svg"
                alt="SharpArchive Extend-plus Icon"
                @click.stop="expandAllCustomLexicons(true)"
              />
              <img
                v-else
                class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                src="~/assets/img/svg/Extend-minus.svg"
                alt="SharpArchive Extend-minus Icon"
                @click.stop="expandAllCustomLexicons(false)"
              />
            </div>
          </div>
          <div class="w-full inner-body flex-grow bg-white rounded-b-2xl">
            <div class="overflow-auto scroll h-full flex flex-col">
              <CustomLexicon
                :custom-lexicons="CustomLexicons"
                @expand-collapse="openCustomLexicons($event)"
                @Add-lexicon="AddNewCustomLexicon($event)"
                @file-name="AddNewFileName"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- For Medium Device -->
      <div
        v-if="type !== 'Random Sample' && !isDesktop"
        class="h-full overflow-hidden rounded-2xl col-span-12 md:col-span-12"
      >
        <div class="flex flex-col flex-grow h-full rounded-2xl bg-white">
          <div
            class="
              flex flex-row flex-grow
              h-10
              rounded-t-2xl
            "
          >
            <div
              class="
                w-full
                py-1.5
                rounded-tl-2xl
                text-center text-xl
                px-6
                md:px-4
                lg:px-6
              "
              :class="
                activeTab === 'SharpArchiveLexicon'
                  ? 'bg-white text-red-deep cursor-default font-bold'
                  : 'bg-red-deep text-white cursor-pointer'
              "
              @click="setTab('SharpArchiveLexicon')"
            >
              <span>Sharp Archive Lexicon</span>
              <div
                class="plus_button float-right cursor-pointer"
                :data-title="!allExpandSALexicon ? 'Extend All' : 'Collapse All'"
              >
                <img
                  v-if="!allExpandSALexicon"
                  class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                  :src="
                    activeTab === 'SharpArchiveLexicon'
                      ? require('~/assets/img/svg/Extend-plus-red.svg')
                      : require('~/assets/img/svg/Extend-plus.svg')
                  "
                  alt="SharpArchive Extend-plus Icon"
                  @click.stop="expandAllSALexicons(true)"
                />
                <img
                  v-else
                  class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                  :src="
                    activeTab === 'SharpArchiveLexicon'
                      ? require('~/assets/img/svg/Extend-minus-red.svg')
                      : require('~/assets/img/svg/Extend-minus.svg')
                  "
                  alt="SharpArchive Extend-minus Icon"
                  @click.stop="expandAllSALexicons(false)"
                />
              </div>
            </div>

            <div
              class="
                w-full
                py-1.5
                rounded-tr-2xl
                text-center text-xl
                px-6
                md:px-4
                lg:px-6
              "
              :class="
                activeTab === 'CustomLexicon'
                  ? 'bg-white text-red-deep cursor-default font-bold'
                  : 'bg-red-deep text-white cursor-pointer'
              "
              @click="setTab('CustomLexicon')"
            >
              <span>Custom Lexicon</span>
              <div
                class="plus_button float-right cursor-pointer"
                :data-title="
                  !allExpandCustomLexicon ? 'Extend All' : 'Collapse All'
                "
              >
                <img
                  v-if="!allExpandCustomLexicon"
                  class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                  :src="
                    activeTab === 'CustomLexicon'
                      ? require('~/assets/img/svg/Extend-plus-red.svg')
                      : require('~/assets/img/svg/Extend-plus.svg')
                  "
                  alt="SharpArchive Extend-plus Icon"
                  @click.stop="expandAllCustomLexicons(true)"
                />
                <img
                  v-else
                  class="my-1.5 mx-auto h-5 w-5 text-offwhite-800"
                  :src="
                    activeTab === 'CustomLexicon'
                      ? require('~/assets/img/svg/Extend-minus-red.svg')
                      : require('~/assets/img/svg/Extend-minus.svg')
                  "
                  alt="SharpArchive Extend-minus Icon"
                  @click.stop="expandAllCustomLexicons(false)"
                />
              </div>
            </div>
          </div>
          <div
            class="
              w-full
              inner-body
              flex-grow
              bg-white
              rounded-b-2xl
              flex flex-col
              overflow-auto
              scroll
            "
          >
            <transition name="dynamicComp" mode="out-in">
              <component
                :is="activeTab"
                :custom-lexicons="CustomLexicons"
                :s-a-lexicons="sALexicons"
                @expand-collapse="openCustomLexicons($event)"
                @sa-expand-collapse="openSALexicons($event)"
                @Add-lexicon="AddNewCustomLexicon($event)"
                @file-name="AddNewFileName"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- For Mobile Device-->
    <div
      v-if="!isMedium"
      class="
        mobile-inner-height
        w-full
        overflow-hidden
        rounded-2xl
        border border-red-deep
      "
    >
      <div class="flex flex-col rounded-t-2xl">
        <div
          class="
            w-full
            h-10.1
            flex
            items-center
            justify-center
            rounded-t-2xl
            mobile-header-text
            font-bold
          "
          :class="
            type === 'Random Sample'
              ? 'bg-red-deep text-white cursor-pointer'
              : settingsTab === 'GeneralAlertSettingsSub'
              ? 'bg-white text-red-deep cursor-default'
              : 'bg-red-deep text-white cursor-pointer'
          "
          @click="changeTab('GeneralAlertSettingsSub')"
        >
          General Alert Settings
        </div>
        <div
          v-if="type !== 'Random Sample'"
          class="flex flex-row flex-grow h-10.1 border-b border-red-deep"
        >
          <div
            class="
              w-full
              flex
              justify-around
              items-center
              mobile-header-text
              font-bold
              px-1
            "
            :class="
              settingsTab === 'SharpArchiveLexicon'
                ? 'bg-white text-red-deep cursor-default'
                : 'bg-red-deep text-white cursor-pointer'
            "
            @click="changeTab('SharpArchiveLexicon')"
          >
            <span>Sharp Archive Lexicon</span>
            <div
              class="plus_button float-right cursor-pointer"
              :data-title="!allExpandSALexicon ? 'Extend All' : 'Collapse All'"
            >
              <img
                v-if="!allExpandSALexicon"
                class="mobile-header-icon"
                :src="
                  settingsTab === 'SharpArchiveLexicon'
                    ? require('~/assets/img/svg/Extend-plus-red.svg')
                    : require('~/assets/img/svg/Extend-plus.svg')
                "
                alt="SharpArchive Extend-plus Icon"
                @click.stop="expandAllSALexicons(true)"
              />
              <img
                v-else
                class="mobile-header-icon"
                :src="
                  settingsTab === 'SharpArchiveLexicon'
                    ? require('~/assets/img/svg/Extend-minus-red.svg')
                    : require('~/assets/img/svg/Extend-minus.svg')
                "
                alt="SharpArchive Extend-minus Icon"
                @click.stop="expandAllSALexicons(false)"
              />
            </div>
          </div>
  
          <div
            class="
              w-full
              flex
              justify-around
              items-center
              mobile-header-text
              font-bold
              px-1
            "
            :class="
              settingsTab === 'CustomLexicon'
                ? 'bg-white text-red-deep cursor-default'
                : 'bg-red-deep text-white cursor-pointer'
            "
            @click="changeTab('CustomLexicon')"
          >
            <span>Custom Lexicon</span>
            <div
              class="plus_button float-right cursor-pointer"
              :data-title="
                !allExpandCustomLexicon ? 'Extend All' : 'Collapse All'
              "
            >
              <img
                v-if="!allExpandCustomLexicon"
                class="mobile-header-icon"
                :src="
                  settingsTab === 'CustomLexicon'
                    ? require('~/assets/img/svg/Extend-plus-red.svg')
                    : require('~/assets/img/svg/Extend-plus.svg')
                "
                alt="SharpArchive Extend-plus Icon"
                @click.stop="expandAllCustomLexicons(true)"
              />
              <img
                v-else
                class="mobile-header-icon"
                :src="
                  settingsTab === 'CustomLexicon'
                    ? require('~/assets/img/svg/Extend-minus-red.svg')
                    : require('~/assets/img/svg/Extend-minus.svg')
                "
                alt="SharpArchive Extend-minus Icon"
                @click.stop="expandAllCustomLexicons(false)"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-full flex-grow bg-white rounded-b-2xl overflow-hidden"
        :class="
          type === 'Random Sample'
            ? 'mobile-inner-body-random-sample'
            : 'mobile-inner-body'
        "
      >
        <div class="overflow-hidden h-full flex flex-col rounded-b-2xl pb-3">
          <transition name="dynamicComp" mode="out-in">
            <component
              :is="settingsTab"
              :custom-lexicons="CustomLexicons"
              :s-a-lexicons="sALexicons"
              class="scroll rounded-b-2xl"
              @expand-collapse="openCustomLexicons($event)"
              @sa-expand-collapse="openSALexicons($event)"
              @Add-lexicon="AddNewCustomLexicon($event)"
              @file-name="AddNewFileName"
            />
          </transition>
        </div>
      </div>
    </div>

    <div class="w-full mt-4 flex justify-end items-center space-x-4 h-16">
      <button
        class="
          w-44
          h-10
          rounded-full
          border-2 border-offwhite-800
          text-offwhite-800
          py-1.5
        "
        @click="store.backToCurrentComp(previousCurrentComp[0])"
      >
        Delete
      </button>
      <button
        class="
          w-44
          h-10
          rounded-full
          border-2 border-offwhite-800
          text-offwhite-800
          py-1.5
        "
        @click="store.backToCurrentComp(previousCurrentComp[0])"
      >
        Cancel
      </button>
      <button
        class="w-44 h-10 rounded-full bg-red-deep text-offwhite-800 py-1.5"
        @click="store.backToCurrentComp(previousCurrentComp[0])"
      >
        Save
      </button>
    </div>
  </section>
</template>

<script>
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAlert } from '~/stores/alert'
import GeneralAlertSettingsSub from '~/components/alert/dynamic-component/GeneralAlertSettingsSub.vue'
import SharpArchiveLexicon from '~/components/alert/dynamic-component/SharpArchiveLexicon.vue'
import CustomLexicon from '~/components/alert/dynamic-component/CustomLexicon.vue'

export default defineComponent({
  components: {
    GeneralAlertSettingsSub,
    SharpArchiveLexicon,
    CustomLexicon,
  },
  setup(props, context) {
    const store = useAlert()
    const tailwindBreakpoints = useBreakpoints(breakpointsTailwind)
    const breakpoints = useBreakpoints({
      largeDesktop: 1366,
    })

    const { type, previousCurrentComp } = storeToRefs(store)

    const allExpandSALexicon = ref(false)

    const sALexicons = [
      {
        id: 1,
        text: 'Cover up (33)',
        number: 33,
        description: 'cover up, c@over up',
        selected: ref(false),
      },
      {
        id: 2,
        text: 'Write off (13)',
        number: 13,
        description: 'write off',
        selected: ref(false),
      },
      {
        id: 3,
        text: 'Illegal (24)',
        number: 24,
        description: 'illegal',
        selected: ref(false),
      },
      {
        id: 4,
        text: 'Failed investments (63)',
        number: 63,
        description: 'failed investments',
        selected: ref(false),
      },
      {
        id: 5,
        text: 'Nobody will find out (93)',
        number: 93,
        description: 'nobody will find out',
        selected: ref(false),
      },
      {
        id: 6,
        text: 'Grey area (41)',
        number: 41,
        description: 'gray area, gr@y area',
        selected: ref(false),
      },
      {
        id: 7,
        text: 'They owe it to me (29)',
        number: 29,
        description: 'they owe it to me',
        selected: ref(false),
      },
      {
        id: 8,
        text: 'Do not volunteer information (91)',
        number: 91,
        description: 'do not volunteer information',
        selected: ref(false),
      },
      {
        id: 9,
        text: 'Not Ethical (84)',
        number: 84,
        description: 'not ethical',
        selected: ref(false),
      },
      {
        id: 10,
        text: 'Off the books (95)',
        number: 95,
        description: 'off the books',
        selected: ref(false),
      },
      {
        id: 11,
        text: 'Backdate (68)',
        number: 68,
        description: 'backdate',
        selected: ref(false),
      },
      {
        id: 12,
        text: 'No inspection (57)',
        number: 57,
        description: 'no inspection',
        selected: ref(false),
      },
    ]

    const openSALexicons = (id) => {
      sALexicons.forEach((item) => {
        if (!allExpandSALexicon.value) {
          if (item.id === id) {
            item.selected.value = !item.selected.value
          } else {
            item.selected.value = false
          }
        } else if (allExpandSALexicon.value) {
          if (item.id === id) {
            item.selected.value = !item.selected.value
          }
        }
      })
      let value
      if (!allExpandSALexicon.value) {
        value = sALexicons.every(
          (element) => element.selected.value === true
        )
      }
      if (value === true) {
        allExpandSALexicon.value = true
      }
      // else {
      //   allExpandSALexicon.value = false
      // }

      let value1
      if (allExpandSALexicon.value) {
        value1 = sALexicons.every(
          (element) => element.selected.value === false
        )
      }
      if (value1 === true) {
        allExpandSALexicon.value = false
      }
      // else {
      //   allExpandSALexicon.value = true
      // }
    }

    const expandAllSALexicons = (value) => {
      allExpandSALexicon.value = value
      sALexicons.forEach((item) => {
        if (allExpandSALexicon.value) {
          item.selected.value = true
        } else {
          item.selected.value = false
        }
      })
    }

    const allExpandCustomLexicon = ref(false)
    const CustomLexicons = ref([
      {
        id: 1,
        text: 'Pull earnings forward',
        number: 99,
        description: 'pull earnings, p@ull forward',
        selected: ref(false),
      },
      {
        id: 2,
        text: 'Special fees',
        number: 94,
        description: 'special fees',
        selected: ref(false),
      },
      {
        id: 3,
        text: 'Friendly payments',
        number: 86,
        description: 'friendly payments',
        selected: ref(false),
      },
    ])

    const AddNewCustomLexicon = (text) => {
      CustomLexicons.value.push({
        id: CustomLexicons.value.length + 1,
        text,
        number: Math.floor(Math.random() * 100) + 1,
        description: text.toLowerCase(),
        selected: ref(false),
      })
    }

    function AddNewFileName(text) {
      CustomLexicons.value.push({
        id: CustomLexicons.value.length + 1,
        text,
        number: Math.floor(Math.random() * 100) + 1,
        description: name.toLowerCase(),
        selected: ref(false),
      })
    }

    const openCustomLexicons = (id) => {
      CustomLexicons.value.forEach((item) => {
        if (!allExpandCustomLexicon.value) {
          if (item.id === id) {
            item.selected.value = !item.selected.value
          } else {
            item.selected.value = false
          }
        } else if (allExpandCustomLexicon.value) {
          if (item.id === id) {
            item.selected.value = !item.selected.value
          }
        }
      })
      let value
      if (!allExpandCustomLexicon.value) {
        value = CustomLexicons.value.every(
          (element) => element.selected.value === true
        )
      }
      if (value === true) {
        allExpandCustomLexicon.value = true
      }
      // else {
      //   allExpandCustomLexicon.value = false
      // }

      let value1
      if (allExpandCustomLexicon.value) {
        value1 = CustomLexicons.value.every(
          (element) => element.selected.value === false
        )
      }
      if (value1 === true) {
        allExpandCustomLexicon.value = false
      }
      // else {
      //   allExpandCustomLexicon.value = true
      // }
    }

    const expandAllCustomLexicons = (value) => {
      allExpandCustomLexicon.value = value
      CustomLexicons.value.forEach((item) => {
        if (allExpandCustomLexicon.value) {
          item.selected.value = true
        } else {
          item.selected.value = false
        }
      })
    }

    // Medium
    const activeTab = ref('SharpArchiveLexicon')
    const setTab = (tab) => {
      activeTab.value = tab
    }
    // Mobile
    const settingsTab = ref('GeneralAlertSettingsSub')
    function changeTab(tab) {
      settingsTab.value = tab
    }

    return {
      store,
      sALexicons,
      openSALexicons,
      type,
      setTab,
      activeTab,
      isDesktop: breakpoints.greater('largeDesktop'),
      isMedium: tailwindBreakpoints.greater('md'),
      settingsTab,
      allExpandCustomLexicon,
      changeTab,
      openCustomLexicons,
      expandAllCustomLexicons,
      CustomLexicons,
      previousCurrentComp,
      allExpandSALexicon,
      expandAllSALexicons,
      AddNewCustomLexicon,
      AddNewFileName,
    }
  },
})
</script>

<style lang="scss" scoped>
.upper-height {
  height: calc(100% - 80px);
}

.scroll {
  scrollbar-color: #a22a2a #ececec; /* Firefox 64 */

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #a22a2a;
    border-radius: 3px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #a22a2a;
  }
}

.inner-body {
  height: calc(100% - 40px);
}

[data-title]:after {
  @apply text-red-deep;
  right: 100%;
  z-index: 99999999;
}

.height {
  height: 32.25rem;
}

.mobile-inner-body-random-sample {
  height: calc(100% - 42px);
}

.mobile-inner-body {
  height: calc(100% - 84px);
}

.mobile-inner-height {
  height: calc(100% - 80px);
}

/* for dynamic Components */
.dynamicComp-enter-active,
.dynamicComp-leave-active {
  transition: opacity 0.5s;
}

.dynamicComp-enter,
.dynamicComp-leave-to {
  opacity: 0;
}

.mobile-header-text {
  @apply text-sm;
}
.mobile-header-icon {
  @apply my-1.5 mx-auto h-4 w-4 text-offwhite-800;
}

@media (max-width: 390px) {
  .mobile-header-text {
    @apply text-xs;
  }
  .mobile-header-icon {
    height: 14px;
    width: 14px;
  }
}
</style>