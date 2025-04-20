const db = require('../db')

const User = db.Model('User', {
  id: db.Number.integer(),
  firstName: db.String,
  lastName: db.String,
  email: db.Email,
  username: db.String,
  gender: db.String,
  address: db.String,
  phone: db.String,
  password: db.String,
  createdAt: db.String,
  // Height: db.Number,
  BusinessName: db.String,
  BusinessType: db.String,
  avatar: db.String,
  cardType: db.String,
  cardHolderName: db.String,
  cardNumber: db.String,
  expireDate: db.String,
  closeAccountInfo: db.String,
  dateFormat: db.String,
  timeFormat: db.String,
  timeZone: db.String,
})

module.exports = User
