<template>
  <span>{{ convertDate(datetime) }}</span>
</template>

<script>
import { mapState } from 'vuex'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'

export default {
  name: 'DateTime',
  props: {
    datetime: {
      type: String,
      default: new Date(),
    },
    friendly: {
      type: Boolean,
      default: false,
    },
    showTime: {
      type: Boolean,
      default: true,
    },
    format: {
      type: String,
      default: 'MMMM dd, yyyy',
    },
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn || false
    },
    user() {
      return this.$auth.user
    },
    ...mapState('system', ['formatDate', 'formatTime', 'utcTimeZone']),
  },
  methods: {
    convertDate(currentDate) {
      if (currentDate) {
        if (this.friendly) {
          return formatDistanceToNow(parseISO(currentDate))
        } else if (this.loggedIn) {
          const date = new Date(currentDate)
          const timeZone = this.utcTimeZone
          const zonedDate = utcToZonedTime(date, timeZone)
          const dateFormat = this.formatDate || this.format
          const timeFormat = this.showTime ? this.formatTime || 'hh:mm aa' : ''
          return format(zonedDate, `${dateFormat} ${timeFormat}`, {
            timeZone,
          })
        } else {
          return format(parseISO(currentDate), this.format)
        }
      }
    },
  },
}
</script>
