/* modules
---------------------------------------------------------- */
const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

/* db connections, models
---------------------------------------------------------- */
const db = require('../models')

/* jwt config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')

/* jwt middleware
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

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

// if current user == babysitter, get id
router.get('/token', authMiddleware, (req, res) => {
    db.Babysitter.findById(req.user.id)
        .then(user => {
            res.json({ userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, userCategory: user.userCategory })
        })
})

// create user (signup route)
router.post('/signup', (req, res) => {
    db.Babysitter.create(req.body)
        .then(user => {
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token, firstName: user.firstName, lastName: user.lastName, userCategory: user.userCategory })
        })
        .catch(() => {
            res.status(401)
                .json({ message: 'Could not create a new user. Your email may have been already taken, or your password could be too weak. Try again.' })
        })
})

// login route
router.post('/login', async (req, res) => {
    const foundUser = await db.Babysitter.findOne({ email: req.body.email })
    if (foundUser && foundUser.password === req.body.password) {
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({token: token, firstName: foundUser.firstName, lastName: foundUser.lastName, userCategory: foundUser.userCategory })
    } else {
        res.status(401)
	    .json({ message: 'Incorrect email or password. Please try again.' })
    }
})

// get user
router.get('/:userId', (req, res) => {
    db.Babysitter.findById(req.params.userId)
        .then(user => {
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token, firstName: user.firstName, lastName: user.lastName, userCategory: user.userCategory })
        })
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router