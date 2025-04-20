/* eslint-disable no-console */
const PastMonth = require('../models/PastMonth')

const pastMonths = (request, response) => {
  return PastMonth.find({})
    .then((months) => {
      const monthsData = months.map((item) => {
        return {
          id: item.id,
          text: item.name,
          value: item.id,
        }
      })
      const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: monthsData,
        errors: [],
      }
      response.send(formatted)
    })
    .catch((err) => {
      return response.send(err)
    })
}

module.exports = {
  pastMonths,
}
