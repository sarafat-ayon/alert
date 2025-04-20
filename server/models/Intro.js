const db = require('../db')

const Intro = db.Model('Intro', {
  id: db.Number.integer(),
  title: db.String,
  description: db.String,
})

module.exports = Intro
