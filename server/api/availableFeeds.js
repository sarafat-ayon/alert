const AvailableFeeds = require('../models/AvailableFeeds')

const getAvailableFeeds = (request, response) => {
    return AvailableFeeds.find({})
        .then((availableFeed) => {
            const modifyData = availableFeed.map((item) => {
                return {
                    id: item.id,
                    source: item.source,
                    name: item.name,
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



module.exports = {
    getAvailableFeeds,
}
