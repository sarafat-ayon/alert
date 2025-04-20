/* eslint-disable no-console */
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// eslint-disable-next-line no-unused-vars
const formData = require('express-form-data')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 9000

app.use(formData.parse())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use(routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})

module.exports = app
