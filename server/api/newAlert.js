/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const NewAlertModel = require('../models/NewAlert')

const getAllData = (request, response) => {
  return NewAlertModel.find({})
    .then((savedSearch) => {
      const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: savedSearch,
        errors: [],
      }
      response.send(formatted)
    })
    .catch((err) => {
      return response.send(err)
    })
}
// eslint-disable-next-line require-await
const store = async (request, response) => {
  const alert = await NewAlertModel.create({
    id: Math.floor(1000 + Math.random() * 9000),
    newAlertName: request.body.newAlertName,
    feedId: request.body.feedId,
    newSystemAlertLibraryId: request.body.newSystemAlertLibraryId,
    chooseEventId: request.body.chooseEventId,
    notificationMethodId: request.body.notificationMethodId,
    type: request.body.type,
    email: request.body.email,
    phone: request.body.phone,
    url: request.body.url,
    status: request.body.status,
  })
  const save = alert.save()

  if (save) {
    const formatted = {
      success: true,
      message: 'Successfully new alert created',
      data: alert,
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

// eslint-disable-next-line require-await

const show = async (request, response) => {
  const searchItem = await NewAlertModel.findOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Data Successfully loaded',
      data: searchItem,
      errors: [],
    }
    response.send(formatted)
  } else {
    const formatted = {
      success: false,
      message: 'Not Found',
      data: {},
      errors: [],
    }
    response.send(formatted)
  }
}

// eslint-disable-next-line require-await
const update = async (request, response) => {
  if (request.body) {
    const formatted = {
      success: true,
      message: 'Successfully update your Alert',
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

const deleteAlert = async (request, response) => {
  const searchItem = await NewAlertModel.deleteOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully new alert deleted',
      data: {},
      errors: [],
    }
    response.send(formatted)
  } else {
    const formatted = {
      success: false,
      message: 'Something is wrong please try again later!!',
      data: {},
      errors: [],
    }
    response.send(formatted)
  }
}


const changeStatus = async (request, response) => {
  const searchItem = await NewAlertModel.findOne({
    id: request.body.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully status updated',
      data: {},
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


// eslint-disable-next-line require-await
const socialBulkDownload = async (request, response) => {
  const bulks = [
    {
      id: 1,
      name: 'Facebook',
      fileSize: 2,
    },
    {
      id: 2,
      name: 'Instagram',
      fileSize: 3,
    },
    {
      id: 3,
      name: 'Twitter',
      fileSize: 5,
    },
    {
      id: 4,
      name: 'LinkedIn',
      fileSize: 7,
    },
  ]
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: bulks,
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const websiteBulkDownload = async (request, response) => {
  const bulks = [
    {
      id: 1,
      url: 'http://www.Little.io/',
      fileSize: 2,
    },
    {
      id: 2,
      url: 'http://Meta.ca/',
      fileSize: 3,
    },
  ]
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: bulks,
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const archiveBulkDownload = async (request, response) => {
 setTimeout(() => {
  const bulks = {
    downloadLink: 'https://dl.bdebooks.com/index.php/s/CJk8pZqQoBXc5kx/download',
  }
const formatted = {
  success: true,
  message: 'Successfully data loaded',
  data: bulks,
  errors: [],
}
response.send(formatted)
 }, 3000)
}

// eslint-disable-next-line require-await
const alertBulkDownload = async (request, response) => {
  console.log(request.body)
  const bulks = {
      downloadLink: 'https://dl.bdebooks.com/index.php/s/CJk8pZqQoBXc5kx/download',
    }
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: bulks,
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  getAllData,
  store,
  show,
  update,
  deleteAlert,
  changeStatus,
  socialBulkDownload,
  websiteBulkDownload,
  archiveBulkDownload,
  alertBulkDownload,
}
