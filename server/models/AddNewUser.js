const db = require('../db')

const NewUser = db.Model('NewUser', {
  id: db.Number.integer(),
  avatar: db.String,
  firstName: db.String,
  lastName: db.String,
  username: db.String,
  email: db.String,
  phone: db.String,
  streetAddress: db.String,
  city: db.String,
  state: db.String,
  permission: db.String,
  zipCode: db.String
})

module.exports = NewUser
