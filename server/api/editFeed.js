/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const Social = require('../models/Social')


// eslint-disable-next-line require-await
const showEditFeed = async (request, response) => {
  const social = await Social.findOne({
    id: request.params.id
  })
  const modifyData =  {
    id: social.id,
    sourceName: social.sourceName,
    username: social.name,
    email: social.email,
    password: '',
    status: social.status,
    type: 'website', // or social
  }
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: modifyData,
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const showAllSoucheFeeds = async (request, response) => {
  const socials = await Social.find({})
  const modifyData = socials.map((item) => {
    return {
      id: item.id,
      text: item.sourceName,
      value: item.sourceName,
      placeholder: false,
    }
  })
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: modifyData,
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const update = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Data successfully change',
    data: {},
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const sendAccessRequest = async (request, response) => {
  const formatted = {
    success: true,
    message: 'successfully send an email',
    data: {},
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  showEditFeed,
  showAllSoucheFeeds,
  update,
  sendAccessRequest,
}
