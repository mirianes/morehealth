const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Usf = new Schema({
    name: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    cnes: {
        type: String
    },
    phone: {
        type: String
    }
})

module.exports = mongoose.model('Usf', Usf)