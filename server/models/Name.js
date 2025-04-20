const db = require('../db')

const Name = db.Model('Name', {
  id: db.Number.integer(),
  name: db.String,
})

module.exports = Name
