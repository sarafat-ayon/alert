/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const { request } = require('express')
const User = require('../models/User')
// eslint-disable-next-line no-unused-vars
const { response } = require('../server')
// eslint-disable-next-line no-unused-vars
const db = require('../db')

const login = async (request, response) => {
  const user = await User.findOne({
    email: request.body.email,
    password: request.body.password,
  })

  if (user) {
    const formatted = {
      success: true,
      message: 'Login successfully done',
      data: user,
      errors: [],
    }
    response.send(formatted)
  } else {
    const formatted = {
      success: false,
      message: 'Something is wrong please try again later.!',
      data: {},
      errors: [],
    }
    response.send(formatted)
  }
}

// eslint-disable-next-line require-await
const register = async (request, response) => {
  const member = await User.create({
    id: Math.floor(1000 + Math.random() * 9000),
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    gender: 'male',
    username: request.body.username,
    password: request.body.password,
    BusinessName: request.body.BusinessName,
    BusinessType: 'Supply Chain',
    avatar: 'http://www.Goodwin.net/',
    // cardHolderName: request.body.card_holdername,
    // amount: request.body.amount,
    // status: request.body.status,
    // businesType = request.
  })
  const save = member.save()
  if (save) {
    response.send('Successfully Registered!!')
  } else {
    response.send('Registration failed!!')
  }
}

const checkEmail = async (request, response) => {
  const user = await User.findOne({ email: request.body.email })
  response.send(!!user)
}

const checkUserName = async (request, response) => {
  const user = await User.findOne({ userName: request.body.userName })
  response.send(!!user)
}

// eslint-disable-next-line require-await
const sendPhoneVerificationCode = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully code send',
    data: { success: true },
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const phoneVerify = async (request, response) => {
  if (parseInt(request.body.otp) === parseInt(123456)) {
    const formatted = {
      success: true,
      message: 'Successfully verified',
      data: { success: true },
      errors: [],
    }
    response.send(formatted)
  }
  const formatted = {
    success: false,
    message: 'Please try again.. your code is invalid',
    data: { success: false },
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const emailVerify = async (request, response) => {
  response.send(parseInt(request.body.otp) === parseInt(123456))
}

const getAllUsers = (request, response) => {
  return User.find({})
    .then((users) => {
      response.send(users)
    })
    .catch((err) => {
      return response.send(err)
    })
}

const updateBillingInfo = async (request, response) => {
  // const user = await User.findOne({ id: request.body.id })
  if (request.body) {
    const formatted = {
      success: true,
      message: 'Successfully updated changes',
      data: request.body,
      errors: [],
    }
    response.send(formatted)
  } else {
    const formatted = {
      success: false,
      message: 'Something is wrong. please try again later.!!',
      data: {},
      errors: [],
    }
    response.send(formatted)
  }
}

const updateProfileInfo = (request, response) => {
  // eslint-disable-next-line no-unused-vars
  const user = User.findOne({ id: request.body.id })
  const formatted = {
    success: true,
    message: 'Successfully updated profile info',
    data: request.body,
    errors: [],
  }
  response.send(formatted)
}

const authUser = (request, response) => {
  return User.findOne({})
    .then((user) => {
      const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: user,
        errors: [],
      }
      response.send(formatted)
    })
    .catch((err) => {
      const formatted = {
        success: true,
        message: 'Something is wrong',
        data: {},
        errors: [err],
      }
      response.send(formatted)
    })
}

const getCloseAccountInfo = async (request, response) => {
  const user = await User.findOne({})
  try {
    const formatted = {
      success: true,
      message: 'Successfully updated changes',
      data: user.closeAccountInfo,
      errors: [],
    }
    response.send(formatted)
  } catch (err) {
    const formatted = {
      success: true,
      message: 'Something is wrong',
      data: {},
      errors: [err],
    }
    response.send(formatted)
  }
}

// eslint-disable-next-line require-await
const setDateTime = async (request, response) => {
  const time = {
    dateFormat: request.body.dateFormat,
    timeFormat: request.body.timeFormat,
    timeZone: 'Asia/Dhaka',
  }
  try {
    const formatted = {
      success: true,
      message: 'Successfully updated date time',
      data: time,
      errors: [],
    }
    response.send(formatted)
  } catch (err) {
    const formatted = {
      success: true,
      message: 'Something is wrong',
      data: {},
      errors: [err],
    }
    response.send(formatted)
  }
}

module.exports = {
  login,
  register,
  getAllUsers,
  checkEmail,
  checkUserName,
  emailVerify,
  phoneVerify,
  updateBillingInfo,
  updateProfileInfo,
  sendPhoneVerificationCode,
  authUser,
  getCloseAccountInfo,
  setDateTime,
}
