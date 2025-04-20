/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const ReviewedHits = require('../models/ReviewedHits')

const getAllHits = (request, response) => {
  return ReviewedHits.find({})
    .then((reviewedHits) => {
      const modifyData = reviewedHits.map((item) => {
        return {
          id: item.id,
          reviewStatus: item.reviewStatus,
          accountName: item.accountName,
          source: item.source,
          date: item.date,
          // unreviewedHits: item.unreviewedHits,
          context: item.context,
          actualPost: item.actualPost,
          note: {
            message: item.note,
            owner: {
              name: 'Mr.Example',
              date: '31/08/2021',
              time: '02.12pm'
            }
          },
          noteStatus: item.noteStatus,
          makeAsReviewedStatus: item.makeAsReviewedStatus,
          deleteStatus: item.deleteStatus
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


const updateNoteStatus = async (request, response) => {
  const searchItem = await ReviewedHits.findOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully Save Note',
      data: {
        message: request.body.note,
        owner: {
          name: 'Mr.Example',
          date: '31/08/2021',
          time: '02.12pm'
        }
      },
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

const updateMakeAsReviewedStatus = async (request, response) => {
  const searchItem = await ReviewedHits.findOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully update your status',
      data: request.body.makeAsReviewedStatus,
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

const updateDeleteStatus = async (request, response) => {
  const searchItem = await ReviewedHits.findOne({
    id: request.params.id,
  })
  if (searchItem !== null) {
    const formatted = {
      success: true,
      message: 'Successfully update your status',
      data: request.body.deleteStatus,
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
  getAllHits,
  updateNoteStatus,
  updateMakeAsReviewedStatus,
  updateDeleteStatus
}
