const db = require('../db')

const ActivityLog = db.Model('ActivityLog', {
  id: db.Number.integer(),
  date: db.String,
  time: db.String,
  activity: db.String,
  source: db.String,
  name: db.String,
})

module.exports = ActivityLog
