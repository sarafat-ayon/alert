const db = require('../db')

const Group = db.Model('Group', {
  id: db.Number.integer(),
  name: db.String,
})

module.exports = Group
