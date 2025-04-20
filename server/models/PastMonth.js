const db = require('../db')

const SavedSearch = db.Model('PastMonth', {
  id: db.Number.integer(),
  name: db.String,
})

module.exports = SavedSearch
