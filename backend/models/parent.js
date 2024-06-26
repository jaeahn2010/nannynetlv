const mongoose = require('mongoose')

const parentSchema = new mongoose.Schema(
    {
        userCategory: {type: String, required: true, default: "Parent"},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, minLength: 8},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        children: 
        [
            {
                firstName: {type: String, required: true},
                lastName: {type: String, required: true},
                gender: {type: String, required: true},
                age: {type: Number, required: true},
                notes: {type: String, maxLength: 250},
            }
        ],
        otherNotes: {type: String, maxLength: 250},
    }
)

//export to index.js
module.exports = mongoose.model('Parent', parentSchema)