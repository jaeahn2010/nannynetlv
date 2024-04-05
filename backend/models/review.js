const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
    {
        reviewer: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Parent'},
        recipient: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Babysitter'},
        rating: {type: Number, required: true, min: 1, max: 5},
        comment: {type: String, required: true, maxLength: 250}
    }
)

//export to index.js
module.exports = mongoose.model('Review', reviewSchema)