/* modules
---------------------------------------------------------- */
const express = require('express')
const router = express.Router()

/* db connections, models
---------------------------------------------------------- */
const db = require('../models')

/* routes
---------------------------------------------------------- */
// get all babysitters
router.get('/', function (req, res) {
    db.Babysitter.find()
        .then(babysitters => res.json(babysitters))
})

// create new babysitter
router.post('/', (req, res) => {
    db.Babysitter.create(req.body)
        .then(babysitter => res.json(babysitter))
})

// edit babysitter
router.put('/:id', (req, res) => {
    db.Babysitter.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(babysitter => res.json(babysitter))
})

// delete babysitter
router.delete('/:id', (req, res) => {
    db.Babysitter.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedBabysitterId: req.params.id }))
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router