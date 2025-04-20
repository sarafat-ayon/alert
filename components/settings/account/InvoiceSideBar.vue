<template>
  <div
    class="
      top-0
      right-0
      absolute
      bg-ash-dark
      md:p-21
      p-4
      md:pt-12
      profile
      transition-all
      duration-800
      ease-in-out
      overflow-y-auto
      scroll
      md:rounded-l-2xl
    "
    :class="showInvoice ? 'show md:shadow-2xl' : 'hide'"
  >
    <div class="h-full flex flex-wrap content-between">
      <div class="w-full card">
        <div class="flex flex-row justify-between items-center">
          <h2
            class="
              text-yellow-midlight
              xl:text-2xl
              md:text-xl
              text-2xl
              md:font-bold
            "
          >
            Invoices
          </h2>
          <div
            class="w-8 h-8 flex items-center justify-end cursor-pointer"
            @click="$emit('close-invoice'), hideBlur()"
          >
            <fa
              class="
                text-yellow-midlight
                xl:text-2xl
                md:text-xl
                text-2xl
                md:font-bold
                font-normal
              "
              :icon="['fas', 'times']"
            />
          </div>
        </div>

        <div class="flex flex-col md:mt-6 mt-3 w-full h-full">
          <table class="table-auto h-full w-full">
            <thead>
              <tr>
                <th class="text-left text-offwhite-300 text-xl">
                  Invoice number
                </th>
                <th
                  v-if="user.userPermission !== 'User'"
                  class="text-center text-xl text-offwhite-300"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invoice in invoices" :key="invoice.id">
                <td class="text-offwhite-300">
                  <p>
                    <DateTime
                      :datetime="invoice.createdAt"
                      format="MMMM, dd yyyy, hh:mm aa"
                      class="table-span"
                    />
                    (${{ invoice.total }})
                  </p>
                </td>
                <td
                  v-if="user.userPermission !== 'User'"
                  class="text-center download"
                >
                  <button :disabled="downloadProcess">
                    <fa
                      class="text-2xl cursor-pointer text-green-1100"
                      :icon="['fas', 'download']"
                      @click="downloadInvoice(invoice.id)"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-full">
        <div
          class="
            flex flex-row
            items-center
            justify-center
            space-x-3
            mt-14
            btn-wrapper
          "
        >
          <button
            class="
              w-44
              py-2
              rounded-full
              border-2 border-yellow-midlight
              outline-none
              font-bold
              text-base
              setup
              text-yellow-midlight
            "
            @click="$emit('close-invoice'), hideBlur()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { INVOICE } from '~/constants/urls'

export default {
  Name: 'InvoiceSidebar',
  data() {
    return {
      invoices: [],
      bulkDownload: [],
      downloadProcess: false,
    }
  },
  computed: {
    ...mapState('setting', ['currentComponent', 'showInvoice']),
    user() {
      return this.$auth.user
    },
  },
  watch: {
    showInvoice(data) {
      if (data && this.currentComponent === 'Account') {
        this.getInvoiceInfo()
      }
    },
  },
  mounted() {
    if (this.currentComponent === 'Account') {
      this.getInvoiceInfo()
    }
  },
  methods: {
    async getInvoiceInfo() {
      try {
        const response = await this.$axios.$get(INVOICE)
        if (response.success) {
          this.invoices = response.data
        }
      } catch (err) {}
    },
    async downloadInvoice(id) {
      this.$toast.clear()
      this.downloadProcess = true
      this.$toast.success('Download is processing', {
        className: ['toasted-bg-archive'],
      })
      this.$store.commit('archive/SET_DOWNLOAD_LOADER', true)
      try {
        const response = await this.$axios({
          url: `api/invoice/`,
          data: { id },
          method: 'POST',
          responseType: 'blob',
        })
        const contentDisposition = response.headers['content-disposition']
        let fileName = 'unknown'
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          )
          fileName = fileNameMatch[1]
        }
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
        this.downloadProcess = false
        this.$store.commit('archive/SET_DOWNLOAD_LOADER', false)
      } catch (err) {
        this.downloadProcess = false
        this.$store.commit('archive/SET_DOWNLOAD_LOADER', false)
        console.log(err)
      }
    },
    hideBlur() {
      this.$store.dispatch('mobile/header/removeOverlay')
    },
  },
}
</script>
<style lang="scss" scoped>
.profile {
  width: 500px;
  height: 100%;
  right: -500px;
  z-index: 999999;
}

.download {
  color: rgb(5, 150, 105);
}

.show {
  right: 0px;
}

.hide {
  right: -500px;
}

.first_last-field {
  width: 48%;
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

@media (max-width: 767px) {
  .profile {
    position: fixed;
    width: 100%;
    height: 85%;
    right: -100%;
    border-radius: 0 0 1.563rem 1.563rem;
  }
  .show {
    right: 0%;
  }

  .hide {
    right: -100%;
  }
}
</style>
