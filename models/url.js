const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    fullUrl: { type: String, required: true },
    shortUrl: { type: String, required: true }
})

module.exports = mongoose.model('Url', urlSchema)