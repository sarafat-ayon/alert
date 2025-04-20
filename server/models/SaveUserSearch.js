const db = require('../db')

const SavedSearch = db.Model('SaveUserSearch', {
  id: db.Number.integer(),
  userId: db.Number.integer(),
  nameOfSearchText: db.String,
  mayContainText: db.String,
  mustContainText: db.String,
  ignoreText: db.String,
  includeComponents: db.Boolean,
  includeReplies: db.Boolean,
  includeDirectMessages: db.Boolean,
  allFeedId: db.Number,
  pastMonthId: db.Number,
  placeholder: db.Boolean,
})

module.exports = SavedSearch
