/* eslint-disable no-console */
// const SendQuery = require('../models/AlertLibrary')

const posttroubleShoot = (request, response) => {
    setTimeout(() => {
        if (request.body.troubleShoot) {
            const formatted = {
                success: true,
                message: 'TroubleShoot successfully submitted',
                data: {
                    id: 1,
                    troubleShoot: request.body.troubleShoot,
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
    }, 3000)
}

module.exports = {
    posttroubleShoot,
}


