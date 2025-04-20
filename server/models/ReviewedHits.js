


const db = require('../db')
const ReviewedHits = db.Model('ReviewedHits', {
    id: db.Number.integer(),
    userId: db.Number.integer(),
    reviewStatus: db.Boolean,
    accountName: db.String,
    source: db.String,
    date: db.String,
    // unreviewedHits: item.unreviewedHits,
    context: db.String,
    actualPost: db.String,
    note: db.String,
    noteStatus: db.Boolean,
    makeAsReviewedStatus: db.Boolean,
    deleteStatus: db.Boolean
})
module.exports = ReviewedHits

