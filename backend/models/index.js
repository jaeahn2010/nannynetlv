// mongoose pkg, env config
require('dotenv').config()
const mongoose = require('mongoose');

// connect to mongodb atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// export models/seed data to server.js
module.exports = {
    Babysitter: require('./babysitter'),
    Parent: require('./parent'),
    Review: require('./review'),
}