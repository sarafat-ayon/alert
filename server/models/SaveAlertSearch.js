const db = require('../db')
const SavedSearch = db.Model('SaveAlertSearch', {
  id: db.Number.integer(),
  userId: db.Number.integer(),
  nameOfAlertText: db.String,
  mayContainText: db.String,
  mustContainText: db.String,
  ignoreText: db.String,
  includeComponents: db.Boolean,
  includeReplies: db.Boolean,
  includeDirectMessages: db.Boolean,
  allFeedId: db.Number,
  pastMonthId: db.Number,
  libraryId: db.Number,
  notifications: db.String,
  status: db.Boolean,
  unreviewedHits: db.Number,
  context: db.String,
  showPDF: db.String,
  downloadReport: db.String,
})
module.exports = SavedSearch