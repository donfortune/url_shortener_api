const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./userModel')

const urlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Url', urlSchema)
