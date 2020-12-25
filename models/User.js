const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required'
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)