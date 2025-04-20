const Website = require('../models/Website')
const getAllWebsite = async (request, response) => {
  const socials = await Website.find({})
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: socials,
    errors: [],
  }
  response.send(formatted)
}

const deleteWebsite = async (request, response) => {
  await Website.deleteOne({ id: request.params.id })
  const formatted = {
    success: true,
    message: 'Successfully website deleted !',
    data: {},
    errors: [],
  }
  response.send(formatted)
}

const changeStatus = async (request, response) => {
  const socials = await Website.findOne({ id: request.body.id })
  const formatted = {
    success: true,
    message: 'Successfully status changed',
    data: socials,
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  getAllWebsite,
  changeStatus,
  deleteWebsite,
}
