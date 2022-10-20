const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let XkcdSchema = new Schema({
    safe_title: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String, required: true},
    transcript: {type: String, required: true},
    alt_image: {type: String, required: true}
})

module.exports = mongoose.model('Xkcd', XkcdSchema)