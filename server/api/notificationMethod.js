/* eslint-disable no-console */
const notificationMethod = require('../models/NotificationMethod')

const notificationMethods = (request, response) => {
  return notificationMethod.find({})
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


const notifications = (request, response) => {
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    "count": 1023,
    "next": "https://app.sharparchive.com/api/user/notifications/?page=3&limit=100&offset=500",
    "previous": "https://app.sharparchive.com/api/user/notifications/?page=2&limit=100&offset=300",
    data: [
      {
        "id": 1245,
        "category": "Feed",
        "message": "You have reconnected a Facebook Profile account(Abdur rahim(test.devxhub@gmail.com)).",
        "is_read": true,
        "createdAt": "2022-01-20T09:27:30Z"
      }
    ],
  }
  response.send(formatted)
}







module.exports = {
  notificationMethods,
  notifications,
}
