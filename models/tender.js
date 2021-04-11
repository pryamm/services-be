const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tenderSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    buyout: {
        type: Number, 
        required: false
    },
    multiple: {
        type: Number, 
        required: false
    },
    status: {
        type: String, 
        required: false
    },
    image: {
        type: String, 
        required: false
    }
}, {timestamps:true})

const Tender = mongoose.model('Tender', tenderSchema)
module.exports = Tender