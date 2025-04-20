const db = require('../db')

const timeZones = db.Model('TimeZones', {
  id: db.Number.integer(),
  name: db.String,
  placeholder: db.Boolean,
})
module.exports = timeZones
