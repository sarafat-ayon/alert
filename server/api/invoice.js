/* eslint-disable no-console */
const Invoices = require('../models/Invoices')
const invoiceDownload = require('../models/InvoiceDownload')
const getInvoiceInfo = (request, response) => {
    return Invoices.find({})
        .then((invoiceInfo) => {
            const modifyData = invoiceInfo.map((item) => {
                return {
                    id: item.id,
                    month: item.month,
                    year: item.year,
                }
            })
            const formatted = {
                success: true,
                message: 'Data successfully loaded',
                data: modifyData,
                errors: [],
            }
            response.send(formatted)
        })
        .catch((err) => {
            return response.send(err)
        })
}

const downloadInvoice = (request, response) => {
    return invoiceDownload.findOne({})
        .then((downloadinvoice) => {
            const modifyData = {
                id: downloadinvoice.id,
                bulkDownload: downloadinvoice.bulkDownload
            }
            const formatted = {
                success: true,
                message: 'Data successfully loaded',
                data: modifyData,
                errors: [],
            }
            response.send(formatted)
        })
        .catch((err) => {
            return response.send(err)
        })
}

module.exports = {
    getInvoiceInfo,
    downloadInvoice
}
