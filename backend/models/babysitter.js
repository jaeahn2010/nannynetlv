const mongoose = require('mongoose')

const babysitterSchema = new mongoose.Schema(
    {
        userCategory: {type: String, required: true, default: "Babysitter"},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, minLength: 8},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        languagesSpoken: [{type: String, required: true}],
        serviceZipCodes: [{type: Number, maxLength: 5, required: true}],
        availability: {
            days:
            [
                {
                    dayName: {type: String, required: true},
                    startTime: {type: String, required: true},
                    endTime: {type: String, required: true},
                }
            ],
        },
        introduction: {type: String, maxLength: 250},
    }
)

//export to index.js
module.exports = mongoose.model('Babysitter', babysitterSchema)