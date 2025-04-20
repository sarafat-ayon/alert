const db = require('../db')

const Website = db.Model('Website', {
  id: db.Number.integer(),
  firstName: db.String,
  lastName: db.String,
  email: db.String,
  profilePic: db.String,
  socialPhoto: db.String,
  socialLink: db.String,
  group: db.String,
  name: db.String,
  sourceName: db.String,
  sourceIcon: db.String,
  searchable: db.String,
  filename: db.String,
  fileFormats: db.String,
  description: db.String,
  destination: db.String,
  amount: db.String,
  storedHere: db.String,
  createdAt: db.Date,
  updatedAt: db.String,
  size: db.String,
  status: db.Boolean,
  url: db.String,
  urlIcon: db.String,
  download: db.String,
  showAllYears: db.Boolean,
  yearOfSocialInfo: [
    {
      year: db.String,
      yearfilename: db.String,
      yearupdatedAt: db.String,
      yearsize: db.String,
      yearfileFormats: db.String,
      showDateExpand: db.Boolean,
      yearDownload: db.String,
      subItemsDate: [
        {
          postDate: db.String,
          postDateFileName: db.String,
          postDateLatestUpdate: db.String,
          postDateSize: db.String,
          postDateDownload: db.String,
          postDateDownloadPDF: db.String
        }
      ]
    }
  ],
})
module.exports = Website
