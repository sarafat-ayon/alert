const db = require('../db')

const Social = db.Model('Social', {
  id: db.Number.integer(),
  username: db.String,
  profilePic: db.String,
  provider: db.String,
  groupName: db.String,
  fileName: db.String,
  archiveFormat: db.String,
  autoDeliveryEmail: db.String,
  storedHere: db.Boolean,
  createdAt: db.Date,
  latestAt: db.Date,
  fileSize: db.String,
  status: db.Boolean,
  showAllYears: db.Boolean,
  yearOfSocialInfo: {
    year: {
      id: db.Number.integer(),
      fileName: db.String,
      createdAt: db.Date,
      latestAt: db.Date,
      fileSize: db.String,
      showDateExpand: db.Boolean,
      subItemsDate: [
        {
          id: db.Number.integer(),
          fileName: db.String,
          createdAt: db.Date,
          latestAt: db.Date,
          fileSize: db.String,
        }
      ]
    }
  },
})

module.exports = Social

// sourceName: db.String,
// sourceIcon: db.String,
// name: db.String,
// searchable: db.Boolean,
// filename: db.String,
// description: db.String,
// createdAt: db.Date,
// updatedAt: db.Date,
// type: db.String,
// url: db.String,
