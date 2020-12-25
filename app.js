const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

require('./config/mongoose')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// Routes
app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})