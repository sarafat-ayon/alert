const db = require('../db')

const SocialMediaContext = db.Model('SocialMediaContext', {
  id: db.Number.integer(),
  feedName: db.String,
  context: db.String,
  archiveDate: db.String,
  savedSearchId: db.Number,
  allFeedsId: db.Number,
  pastMonthId: db.Number,
  includeComponents: db.Boolean,
  includeReplies: db.Boolean,
  directMessages: db.Boolean,
})

module.exports = SocialMediaContext
