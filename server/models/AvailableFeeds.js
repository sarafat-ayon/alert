const db = require('../db')

const AvailableFeeds = db.Model('AvailableFeeds', {
  id: db.Number.integer(),
  source: db.String,
  name: db.String,
})

module.exports = AvailableFeeds
