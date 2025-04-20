const Social = require('../models/Social')

const social = async (request, response) => {
  const socials = await Social.find({})
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: socials,
    errors: [],
  }
  response.send(formatted)
}

const allSocials = async (request, response) => {
  const socials = await Social.find({})
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: socials,
    errors: [],
  }
  response.send(formatted)
}

const getProfiles = async (request, response) => {
  const socials = await Social.find({})
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: socials,
    errors: [],
  }
  response.send(formatted)
}

const deleteSocial = async (request, response) => {
  await Social.deleteOne({ id: request.query.id })
  const formatted = {
    success: true,
    message: 'Successfully social deleted !',
    data: {},
    errors: [],
  }
  response.send(formatted)
}

const changeStatus = async (request, response) => {
  const socials = await Social.findOne({ id: request.body.id })
  const formatted = {
    success: true,
    message: 'Status successfully changed',
    data: socials,
    errors: [],
  }
  response.send(formatted)
}



module.exports = {
  social,
  getProfiles,
  changeStatus,
  deleteSocial,
  allSocials
}
