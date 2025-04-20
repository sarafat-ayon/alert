/* eslint-disable no-console */
const ActivityLog = require('../models/ActivityLog')

const getAllActivityLogs = async (request, response) => {
  const Activity = await ActivityLog.find({}).limit(request.query.limit)
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: Activity,
    errors: [],
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const getAllDownloadLinks = async (request, response) => {
  const links = {
    pdf: 'https://drive.google.com/file/d/1N7vVTh3-DHSSlSDHfSxzTqUs3plrd-_w/view',
    download:
      'https://dl.bdebooks.com/index.php/s/Kp8cZ9zSPEqoHDD/download/Mahakumbher%20Sadhusange%20By%20Lina%20Chaki%20%28BDebooks.Com%29.pdf',
  }
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: links,
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  getAllActivityLogs,
  getAllDownloadLinks,
}
