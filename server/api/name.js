/* eslint-disable no-console */
const Names = require('../models/Name')

const getAllNames = (request, response) => {
    return Names.find({})
      .then((allName) => {
        const modifyData = allName.map((item) => {
          return {
            id: item.id,
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
    getAllNames,
}
