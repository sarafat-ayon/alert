const {random} = require("casual");
const casual = require("casual");
const Profile = require('../models/Profile')
const Social = require('../models/Social')

const getProfiles = async (request, response) => {
  const profiles = await Profile.find({})
  const data = {
    success: true,
    message: 'Data successfully loaded',
    data: profiles,
    errors: [],
  }
  response.send(data)
}
// eslint-disable-next-line require-await
const checkPassword = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully password checked',
    data: {},
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const saveArchiveFeed = async (request, response) => {
  const Socials = await Social.find({}).limit(request.body.length)
  const formatted = {
    success: true,
    message: 'Successfully archive feed saved',
    data: Socials,
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const cost = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully archive feed saved',
    data: {
      "Base": 32.0,
      "Facebook": 4.0,
      "Instagram": 4.0,
      "LinkedIn": 4.0,
      "Twitter": 4.0
    },
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const calculateStorageCosts = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully created a new user',
    data: {
      averageMonthlyData: {
        jpg: 2,
        csv: 1
      },
      estimateNewMonthlyCost: 0.17
    },
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const CreateNewAccount = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully created a new user',
    data: {
       id: 1,
       firstName: request.body.firstName,
       lastName: request.body.lastName,
       email: request.body.email,
       businessName: request.body.businessName,
       businessType: request.body.businessType,
    },
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const CreateNewUserPayment = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully payment completed',
    data: {
    refresh: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyOTE4OTQ3MCwianRpIjoiMzc3MGY2MGMwMDM3NDJlMmI1YjcxYTUxZjA4ZjRmNTkiLCJ1c2VyX2lkIjoyfQ.j3ISRrfw7JkDWqOnPodSb_-Us_13UXRgzkjbkIUlGiw",
    access: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI5MTAzMzcwLCJqdGkiOiIyNWNkZTE3NzZlNjU0N2YxOWMxMmQwYzBkMWJiMDdmYiIsInVzZXJfaWQiOjJ9.tffgeGre0JqVgn8JcAT0QAVNh3_9qC1EY_jVv46Mb24"
    },
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const emailVerify = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully email verified',
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const resendEmailCode = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully send a verification code to your email',
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const savePhone = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully save and send a verification code to your phone',
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const sendPhoneCode = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully send a verification code to your phone',
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const phoneVerify = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully phone number verified',
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const saveUserStorage = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully saved storage information',
    data: {}
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const saveUserArchiveFeeds = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully saved archive feeds',
    data: {}
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const saveUserStorageCosts = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully saved feed costs',
    data: {}
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const checkArchiveFeeds = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Feeds successfylly available',
    data: {}
  }
  response.send(formatted)
}
module.exports = {
  getProfiles,
  checkPassword,
  saveArchiveFeed,
  cost,
  calculateStorageCosts,
  CreateNewAccount,
  CreateNewUserPayment,
  emailVerify,
  resendEmailCode,
  savePhone,
  sendPhoneCode,
  phoneVerify,
  saveUserStorage,
  saveUserArchiveFeeds,
  saveUserStorageCosts,
  checkArchiveFeeds,
}
