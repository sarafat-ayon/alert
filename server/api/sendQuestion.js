/* eslint-disable no-console */
// const SendQuery = require('../models/AlertLibrary')

const postQuestion = (request, response) => {
    if (request.body.query) {
        const formatted = {
            success: true,
            message: 'Query successfully submitted',
            data: {
                id: 1,
                question: request.body.query,
                email: request.body.email
            },
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
    postQuestion,
}


