const db = require('../db')

const Invoice = db.Model('Invoice', {
  id: db.Number.integer(),
  month: db.String,
  year: db.String,
})

module.exports = Invoice
