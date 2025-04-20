const db = require('../db')

const Instants = db.Model('Instants', {
  id: db.Number.integer(),
  name: db.String,
  placeholder: db.Boolean,
})

module.exports = Instants
