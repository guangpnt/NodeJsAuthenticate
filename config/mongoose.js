const mongoose = require('mongoose')
require('dotenv').config()

module.exports = mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true
}, () => {
    console.log('connected to DB')
})
