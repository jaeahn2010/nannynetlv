/* modules
---------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')

/* db connection, models, seed data
---------------------------------------------------------- */
const db = require('./models');

/* routes in controllers folder
--------------------------------------------------------------- */
const babysittersCtrl = require('./controllers/babysitters')
const parentsCtrl = require('./controllers/parents')
const reviewsCtrl = require('./controllers/reviews')

/* express app
---------------------------------------------------------- */
const app = express();

/* middleware
---------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

/* mount routes
---------------------------------------------------------- */
app.use('/api/babysitters', babysittersCtrl)
app.use('/api/parents', parentsCtrl)
app.use('/api/reviews', reviewsCtrl)

/* listen to port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});