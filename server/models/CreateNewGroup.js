const db = require('../db')

const NewGroup = db.Model('NewGroup', {
  id: db.Number.integer(),
  groupName: db.String,
  feedsInGroups: db.String,
})

module.exports = NewGroup
