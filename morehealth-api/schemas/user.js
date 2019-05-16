const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    user_type: {
        type: String
    },
    usf_id: {
        type: String
    }
})

module.exports = mongoose.model('User', User)