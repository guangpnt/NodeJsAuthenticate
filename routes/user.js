const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/login', isLoggedIn, (req, res) => {
    if (req.cookies.success_msg) {
        res.locals.success = {
            msg : req.cookies.success_msg
        }
    }
    res.render('login')
})

router.post('/login', (req, res) => {
    User.findOne({
        email : req.body.email,
        password : req.body.password
    })
        .then(result => {
            if (result) {
                jwt.sign({
                    username : result.username,
                    email : result.email
                }, 'secret', (err, token) => {
                    res.cookie('token', token)
                    res.redirect('/')
                })
            } else {
                res.render('login', {err_msg : 'Email or password is incorrect.'})
            }
        })
})

router.get('/register', isLoggedIn, (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.render('register', {err_msg : 'Please fill all fields.'})
        return
    }
    if (req.body.username && req.body.email && req.body.password.length < 4) {
        res.render('register', {err_msg : 'Password must be at least 4 characters.'})
        return
    }
    User.findOne({email : req.body.email})
        .then(result => {
            if (result) {
                res.render('register', {err_msg : 'Email is already exist.'})
            } else {
                const newUser = new User({
                    username : req.body.username,
                    email : req.body.email,
                    password : req.body.password
                })
                newUser.save()
                res.cookie('success_msg', 'You are now registered.', {maxAge: 3000})
                res.redirect('login')
            }
        })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

function isLoggedIn(req, res, next) {
    if (req.cookies.token) {
        res.redirect('/')
    } else {
        next()
    }
}

module.exports = router