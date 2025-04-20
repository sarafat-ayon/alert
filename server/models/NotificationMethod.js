const db = require('../db')

const NotificationMethod = db.Model('NotificationMethod', {
  id: db.Number.integer(),
  name: db.String,
  placeholder: db.Boolean,
})

module.exports = NotificationMethod
