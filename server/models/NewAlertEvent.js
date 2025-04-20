const db = require('../db')

const NewAlertEvent = db.Model('NewAlertEvent', {
  id: db.Number.integer(),
  name: db.String,
  placeholder: db.Boolean,
})

module.exports = NewAlertEvent
