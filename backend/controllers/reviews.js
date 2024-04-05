/* modules
---------------------------------------------------------- */
const express = require('express')
const router = express.Router()

/* db connections, models
---------------------------------------------------------- */
const db = require('../models')

/* routes
---------------------------------------------------------- */
// get all reviews by babysitter
router.get('/:babysitterId', function (req, res) {
    db.Review.find({ babysitterId: req.params.babysitterId })
        .then(reviews => res.json(reviews))
})

// create new review
router.post('/', (req, res) => {
    db.Review.create(req.body)
        .then(review => res.json(review))
})

// edit review
router.put('/:id', (req, res) => {
    db.Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(review => res.json(review))
})

// delete review
router.delete('/:id', (req, res) => {
    db.Review.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedReviewId: req.params.id }))
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router