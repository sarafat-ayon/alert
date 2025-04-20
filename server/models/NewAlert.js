const db = require('../db')

const NewAlert = db.Model('NewAlert', {
  id: db.Number.integer(),
  newAlertName: db.String,
  feedId: db.Number.integer(),
  newSystemAlertLibraryId: db.Number.integer(),
  chooseEventId: db.Number.integer(),
  notificationMethodId: db.Number.integer(),
  type: db.String,
  email: db.String,
  phone: db.String,
  url: db.String,
  status: db.Boolean,
})

module.exports = NewAlert
