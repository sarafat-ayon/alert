const db = require('nekodb')
const constant = require('./constants')

db.connect({
  client: 'nedb',
  filepath: constant.DB_PATH,
})

module.exports = db
