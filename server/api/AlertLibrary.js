/* eslint-disable no-console */
const AlertLibrary = require('../models/AlertLibrary')

const getAlertLibrary = (request, response) => {
  return AlertLibrary.find({})
    .then((alertlibrary) => {
      const modifyData = alertlibrary.map((item) => {
        return {
          text: item.name,
          value: item.id,
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

module.exports = {
  getAlertLibrary,
}
