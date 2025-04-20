/* eslint-disable no-console */
const Feed = require('../models/Feeds')

const getFeeds = (request, response) => {
  return Feed.find({})
    .then((feeds) => {
      const modifyData = feeds.map((item) => {
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
  getFeeds,
}
