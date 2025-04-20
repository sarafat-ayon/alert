const db = require('../db')

const Profile = db.Model('Profile', {
  socialId: db.String,
  sourceName: db.String,
  socialUrl: db.String,
  socialName: db.String,
  profileIcon: db.String,
})

module.exports = Profile
