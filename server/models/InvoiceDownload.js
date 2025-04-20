const db = require('../db')

const DownloadInvoice = db.Model('DownloadInvoice', {
  id: db.Number.integer(),
  bulkDownload: db.String,
})

module.exports = DownloadInvoice
