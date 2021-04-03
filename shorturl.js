const mongoose = require('mongoose');
const short_id = require('shortid');


const url_schema = new mongoose.Schema({
    original: {
        type: String,
        // required: true,
    },
    short: {
        type: String,
        // required: true,
        'default': short_id.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})


module.exports = mongoose.model('Short_url',url_schema);