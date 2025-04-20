const AddNewUser = require('../models/AddNewUser')

const newUser = async (request, response) => {
  const member = await AddNewUser.create({
    id: Math.floor(1000 + Math.random() * 9000),
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    username: request.body.username,
    email: request.body.email,
    phone: request.body.phone,
    streetAddress: request.body.streetAddress,
    city: request.body.city,
    state: request.body.state,
    permission: request.body.permission,
    zipCode: request.body.zipCode,
  })
  const save = member.save()
  if (save) {
    const formatted = {
      success: true,
      message: 'Successfully saved New User',
      data: member,
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

/* eslint-disable no-console */
const getAllUsers = (request, response) => {
  return AddNewUser.find({})
    .then((allUsers) => {
      const modifyData = allUsers.map((item) => {
        return {
          id: item.id,
          image: item.image,
          firstName: item.firstName,
          lastName: item.lastName,
          username: item.username,
          email: item.email,
          phone: item.phone,
          streetAddress: item.address,
          city: item.city,
          state: item.state,
          permission: item.permission,
          zipCode: item.zipCode,
        }
      })
      const formatted = {
        success: true,
        message: 'Data successfully fetched',
        data: modifyData,
        errors: [],
      }
      response.send(formatted)
    })
    .catch((err) => {
      return response.send(err)
    })
}

const updateProfile = async (request, response) => {
  if (request.body) {
    const formatted = {
      success: true,
      message: 'Successfully update your Profile',
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

module.exports = {
  newUser,
  getAllUsers,
  updateProfile
}
