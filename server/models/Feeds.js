const db = require('../db')

const Feeds = db.Model('Feeds', {
  id: db.Number.integer(),
  name: db.String,
})

module.exports = Feeds
