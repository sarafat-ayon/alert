const db = require('../db')

const SavedSearch = db.Model('SavedSearch', {
  id: db.Number.integer(),
  name: db.String,
})

module.exports = SavedSearch
