const mongoose = require('mongoose')
const moment   = require('moment')

let UserSchema = new mongoose.Schema({
    email:    { type: String, default: '' },
    password: { type: String, default: '' },
    profile: {
        name:    { type: String, default: '' },
        picture: { type: String, default: '' }
    },
    address:   { type: String, default: '' },
    timestamp: { type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a') }
})

module.exports = mongoose.model('user', UserSchema)