/* eslint-disable no-console */
const SavedSearch = require('../models/SavedSearch')

const saveSearch = (request, response) => {
  return SavedSearch.find({})
    .then((savedSearch) => {
      const modifyData = savedSearch.map((item) => {
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
  saveSearch,
}
