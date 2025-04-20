/* eslint-disable no-console */
const Instant = require('../models/Instant')

const getInstants = (request, response) => {
  return Instant.find({})
    .then((instants) => {
      const modifyData = instants.map((item) => {
        return {
          text: item.name,
          value: item.id,
          placeholder: item.placeholder,
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
    getInstants,
}
