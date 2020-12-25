const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, result) => {
        if (err) {
            res.sendStatus('token is incorrect')
        } else {
            res.render('home', {
                username: result.username,
                email: result.email
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerToken = req.cookies.token
    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken
        next()
    } else {
        res.render('home', {username : null})
    }
}

module.exports = router