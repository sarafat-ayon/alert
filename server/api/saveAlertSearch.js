/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const SaveAlertSearchModel = require('../models/SaveAlertSearch')

const getSavedAlertSearches = (request, response) => {
  return SaveAlertSearchModel.find({})
    .then((savedSearch) => {
      const modifyData = savedSearch.map((item) => {
        return {
          id: item.id,
          alertName: item.nameOfAlertText,
          status: item.status,
          unreviewedHits: item.unreviewedHits,
          context: item.context,
          showPDF: item.showPDF,
          downloadReport: item.downloadReport,
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
// eslint-disable-next-line require-await
const saveAlertSearch = async (request, response) => {
  const member = await SaveAlertSearchModel.create({
    id: Math.floor(1000 + Math.random() * 9000),
    userId: Math.floor(1000 + Math.random() * 9000),
    nameOfAlertText: request.body.nameOfAlertText,
    mayContainText: request.body.mayContainText,
    mustContainText: request.body.mustContainText,
    ignoreText: request.body.ignoreText,
    includeComponents: request.body.includeComponents,
    includeReplies: request.body.includeReplies,
    includeDirectMessages: request.body.includeDirectMessages,
    allFeedId: request.body.allFeedId,
    pastMonthId: request.body.pastMonthId,
    libraryId: request.body.libraryId,
    notifications: JSON.stringify(request.body.notifications),
    status: 1,
    unreviewedHits: Math.floor(Math.random() * (5 - 0) + 0),
    context:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys',
    showPDF: 'https://drive.google.com/file/d/1N7vVTh3-DHSSlSDHfSxzTqUs3plrd-_w/view',
    downloadReport: 'https://dl.bdebooks.com/index.php/s/CJk8pZqQoBXc5kx/download',
  })
  const save = member.save()
  if (save) {
    const searchItem = {
      id: member.id,
      alertName: member.nameOfAlertText,
      status: member.status,
      unreviewedHits: member.unreviewedHits,
      context: member.context,
      showPDF: member.showPDF,
      downloadReport: member.downloadReport
    }
    const formatted = {
      success: true,
      message: 'Successfully saved your alert',
      data: searchItem,
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

const getSingleAlert = async (request, response) => {
  const searchItem = await SaveAlertSearchModel.findOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const modifyData = {
      id: searchItem.id,
      nameOfAlertText: searchItem.nameOfAlertText,
      mayContainText: searchItem.mayContainText,
      mustContainText: searchItem.mustContainText,
      ignoreText: searchItem.ignoreText,
      includeComponents: searchItem.includeComponents,
      includeReplies: searchItem.includeReplies,
      includeDirectMessages: searchItem.includeDirectMessages,
      allFeedId: searchItem.allFeedId,
      pastMonthId: searchItem.pastMonthId,
      libraryId: searchItem.libraryId,
      notifications: JSON.parse(searchItem.notifications),
      status: searchItem.status,
      unreviewedHits: searchItem.unreviewedHits,
      context: searchItem.context,
    }
    const formatted = {
      success: true,
      message: 'Data Successfully loaded',
      data: modifyData,
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
const updateAlertSearch = async (request, response) => {
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

const deleteAlertSearch = async (request, response) => {
  const searchItem = await SaveAlertSearchModel.deleteOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully alert deleted',
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


const updateStatus = async (request, response) => {
  const searchItem = await SaveAlertSearchModel.findOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully update your status',
      data: request.body.status,
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
  getSavedAlertSearches,
  saveAlertSearch,
  getSingleAlert,
  updateAlertSearch,
  deleteAlertSearch,
  updateStatus,
  
}
