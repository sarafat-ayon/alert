/* eslint-disable no-console */
const NewAlertEvent = require('../models/NewAlertEvent')

const newAlertEvents = (request, response) => {
  return NewAlertEvent.find({})
    .then((feeds) => {
      const modifyData = feeds.map((item) => {
        return {
          id: item.id,
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

const newSystemAlertLibrary = (request, response) => {
  const bulks = [
    {
      "id": 1,
      "text": "Archiving interrupted",
      "value": 1,
      "placeholder": true
    },
    {
      "id": 3,
      "text": "Feeds added/deleted",
      "value": 3,
      "placeholder": false
    },
    {
      "id": 2,
      "text": "Archive inactivity",
      "value": 2,
      "placeholder": false
    },
  ]
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: bulks,
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  newAlertEvents,
  newSystemAlertLibrary,
}
