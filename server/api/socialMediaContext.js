const SocialMediaContext = require('../models/SocialMediaContext')

const getContexts = async (request, response) => {
  const skip = request.query.skip ?? 0
  const context = await SocialMediaContext.find({}).skip(skip).limit(100)
  const media = context.map((item) => {
    return {
      id: item.id,
      date: item.archiveDate,
      feed: item.feedName,
      context: item.context,
    }
  })
  const formatted = {
    success: true,
    message: 'Search result successfully loaded',
    data: media,
    errors: [],
  }
  response.send(formatted)
}

const userSavedSearchWiseContext = async (request, response) => {
  const context = await SocialMediaContext.find({})
  const media = context.map((item) => {
    return {
      id: item.id,
      date: item.archiveDate,
      feed: item.feedName,
      context: item.context,
    }
  })
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: media,
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  getContexts,
  userSavedSearchWiseContext,
}
