/* eslint-disable no-console */
const Groups = require('../models/Group')

const getAllGroups = (request, response) => {
    return Groups.find({})
      .then((allGroup) => {
        const modifyData = allGroup.map((item) => {
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
    getAllGroups,
}
