/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const SaveUserSearchModel = require('../models/SaveUserSearch')

const getUserSavedSearches = (request, response) => {
  return SaveUserSearchModel.find({})
    .then((savedSearch) => {
      const modifyData = savedSearch.map((item) => {
        return {
          id: item.id,
          text: item.nameOfSearchText,
          value: item.id,
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
const saveUserSearch = async (request, response) => {
  console.log(request.body)
  const member = await SaveUserSearchModel.create({
    id: Math.floor(1000 + Math.random() * 9000),
    userId: Math.floor(1000 + Math.random() * 9000),
    nameOfSearchText: request.body.nameOfSearchText,
    mayContainText: request.body.mayContainText,
    mustContainText: request.body.mustContainText,
    ignoreText: request.body.ignoreText,
    includeComponents: request.body.includeComponents,
    includeReplies: request.body.includeReplies,
    includeDirectMessages: request.body.includeDirectMessages,
    allFeedId: request.body.allFeedId,
    pastMonthId: request.body.pastMonthId,
    placeholder: 0,
  })
  const save = member.save()
  if (save) {
    const searchItem = {
      id: member.id,
      text: member.nameOfSearchText,
      value: member.id,
      placeholder: member.placeholder,
    }
    const formatted = {
      success: true,
      message: 'Successfully saved your search',
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

const getSingleUserSavedSearch = async (request, response) => {
  const searchItem = await SaveUserSearchModel.findOne({
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
const updateUserSavedSearch = async (request, response) => {
  if (request.body) {
    const searchItem = {
      id: request.body.id,
      text: request.body.nameOfSearchText,
      value: request.body.id,
      placeholder: request.body.placeholder,
    }
    const formatted = {
      success: true,
      message: 'Successfully saved your search',
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

const deleteUserSaveSearch = async (request, response) => {
  const searchItem = await SaveUserSearchModel.deleteOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully saved search deleted',
      data: searchItem,
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

module.exports = {
  getUserSavedSearches,
  saveUserSearch,
  getSingleUserSavedSearch,
  updateUserSavedSearch,
  deleteUserSaveSearch,
}
