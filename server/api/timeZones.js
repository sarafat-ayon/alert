/* eslint-disable no-console */
const TimeZones = require('../models/TimeZones')

const getTimeZones = (request, response) => {
  return TimeZones.find({})
    .then((timeZone) => {
      const modifyData = timeZone.map((item) => {
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

const getDates = (request, response) => {
  const modifyData = [
    {
      id: 1,
      text: '2020-07-21',
      value: 'YYYY-MM-DD',
      placeholder: true,
    },
    {
      id: 2,
      text: 'Jun 21st 21',
      value: 'MMM Do YY',
      placeholder: false,
    },
    {
      id: 3,
      text: 'June 21st 2021',
      value: 'MMMM Do YYYY',
      placeholder: false,
    },
  ]
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: modifyData,
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  getTimeZones,
  getDates,
}
