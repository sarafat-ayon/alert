const db = require('../db')

const AlertLibrary = db.Model('AlertLibrary', {
  id: db.Number.integer(),
  name: db.String,
})

module.exports = AlertLibrary
