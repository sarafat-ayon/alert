<template>
  <section>
    <!-- Small Device -->
    <header
      class="
        md:hidden
        flex flex-col
        overflow-hidden
        absolute
        z-100
        py-3
        px-4
        transition-all
        duration-1000
      "
      :class="[
        expand ? 'mobile_header_expand' : 'mobile_header',
        expand && skew
          ? 'mobile_header_expand_archive_source'
          : 'mobile_header',
      ]"
    >
      <div class="flex flex-row justify-between items-center">
        <div
          v-if="!expand"
          class="w-9 h-9 transition-all duration-900"
          @click="expandHeader()"
        >
          <fa
            class="w-6 h-6 cursor-pointer"
            :class="[`${source}`]"
            :icon="['fas', 'bars']"
          />
        </div>
        <div
          v-if="expand"
          class="w-9 h-9 transition-all duration-900"
          @click="expandHeader()"
        >
          <p
            class="text-lg cursor-pointer"
            :class="[`${source}`]"
            :icon="['fas', 'bars']"
          >
            {{ source }}
          </p>
          <p />
        </div>
        <div v-if="!expand">
          <img class="w-9 h-9" :src="logo" alt="logo" />
        </div>
        <div v-if="source === 'Home' || source === 'Search'" class="w-9 h-9">
          <fa
            v:class="[
        expand ? 'mobile_header_expand' : 'mobile_header',
        expand && skew
          ? 'mobile_header_expand_archive_source'
          : 'mobile_header',
      ]"
            :class="[`${source}`]"
            :icon="['fas', 'search']"
          />
        </div>
        <div v-if="source === 'Alert'" class="w-9 h-9">
          <fa class="text-red-midlight w-6 h-6" :icon="['fas', 'plus']" />
        </div>
        <div v-if="source === 'Archive'" class="w-9 h-9">
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="25"
            viewBox="0 0 512 512"
            width="25"
            class="fill-current text-green-1100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m420.041 0h-328.082c-50.708 0-91.959 41.251-91.959 91.959v328.081c0 50.709 41.251 91.96 91.959 91.96h328.082c50.708 0 91.959-41.251 91.959-91.959v-328.082c0-50.708-41.251-91.959-91.959-91.959zm12.649 399.561h-164.091c-14.422 42.69-75.006 42.755-89.449 0h-99.84c-19.922 0-19.927-30.118 0-30.118h99.84c14.421-42.69 75.006-42.755 89.449 0h164.091c19.922 0 19.928 30.118 0 30.118zm0-128.502h-35.589c-14.422 42.69-75.006 42.755-89.45 0h-228.341c-19.922 0-19.927-30.118 0-30.118h228.342c14.421-42.69 75.006-42.755 89.45 0h35.589c19.921 0 19.927 30.118-.001 30.118zm0-128.502h-228.342c-14.422 42.69-75.006 42.755-89.449 0h-35.589c-19.922 0-19.927-30.118 0-30.118h35.589c14.421-42.69 75.006-42.755 89.449 0h228.342c19.922 0 19.928 30.118 0 30.118z"
              />
              <path
                d="m223.875 367.435c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z"
              />
              <path
                d="m159.624 110.431c-22.581 0-22.569 34.133 0 34.133 22.58.001 22.568-34.133 0-34.133z"
              />
              <path
                d="m352.376 238.933c-22.581 0-22.569 34.133 0 34.133 22.581.001 22.569-34.133 0-34.133z"
              />
            </g>
          </svg>
        </div>
      </div>
      <ArchiveSourcesDropdown
        class="col-span-2 mt-5"
        :active="false"
        :height="340"
        :source="source"
        @collapse-header="skew = !skew"
      />
    </header>
  </section>
</template>

<script>
import ArchiveSourcesDropdown from '~/components/home/ArchiveSourcesDropdown'
import Logo from '~/assets/img/logo/logo.svg'
import Filter from '~/assets/img/icon/filter.svg'
export default {
  components: {
    ArchiveSourcesDropdown,
  },
  props: {
    headerText: {
      type: Boolean,
    },
    textOfHeader: {
      type: Boolean,
    },
    source: {
      type: String,
    },
  },
  data() {
    return {
      logo: Logo,
      filter: Filter,
      expand: false,
      skew: false,
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
    user() {
      return this.$auth.user
    },
  },
  methods: {
    expandHeader() {
      this.expand = !this.expand
    },
  },
}
</script>

<style lang="postcss" scoped>
header {
  width: 100%;
  height: 60px;
  background: #171d26;
  color: #ffffff;
  border-radius: 0 0 1.563rem 0;
  box-shadow: 0 4px 5px #0a0d104d;
}
.header-enter {
  opacity: 0;
}

.header-enter-active {
  transition: opacity 1.5s ease-in-out;
  transition-delay: 1.5s;
}

.header-enter-to {
  opacity: 1;
}

//Small Device
.mobile_header {
  height: 65px;
  border-radius: 0 0 1.563rem 1.563rem;
}

.mobile_header_expand {
  height: 126px;
  border-radius: 0 0 1.563rem 1.563rem;
}

.mobile_header_expand_archive_source {
  height: 467px;
  border-radius: 0 0 1.563rem 1.563rem;
}

.Home {
  color: #e4801d !important;
}

.Archive {
  color: #8db230 !important;
}

.Search {
  color: #7d80bd !important;
}

.Alert {
  color: #e05252 !important;
}

.settings {
  color: #e0ad1f !important;
}

.help {
  color: #e05252 !important;
}
</style>
