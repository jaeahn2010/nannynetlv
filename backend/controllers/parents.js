/* modules
---------------------------------------------------------- */
const express = require('express')
const router = express.Router()

/* db connections, models
---------------------------------------------------------- */
const db = require('../models')

/* routes
---------------------------------------------------------- */
// get all parents
router.get('/', function (req, res) {
    db.Parent.find()
        .then(parents => res.json(parents))
})

// create new parent
router.post('/', (req, res) => {
    db.Parent.create(req.body)
        .then(parent => res.json(parent))
})

// edit parent
router.put('/:id', (req, res) => {
    db.Parent.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(parent => res.json(parent))
})

// delete parent
router.delete('/:id', (req, res) => {
    db.Parent.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedParentId: req.params.id }))
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router