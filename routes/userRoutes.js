const express = require('express')
const router = express.Router()
const User = require('../models/user')



// const bcrypt = require("bcryptjs")

// bcrypt is more fast than bcryptjs
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();


const verifyToken = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        res.redirect('/')
    }
    let payload
    try {
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).end()
        }
        // otherwise, return a bad request error
        return res.status(400).end()
    }
}

// Retreive all users
router.get('/users', verifyToken, (req, res) => {
    User.find((err, users) => {
        if (!err) {
            res.render('user/users', { title: 'All users', users, url: req.url })
        }
    })
})

// Template to add user
router.get('/signup', verifyToken, (req, res) => {
    res.render('user/create', { title: 'New user', url: req.url })
})

// Add user to DB
router.post('/signup', verifyToken, (req, res) => {
    // get user object from body request
    const newUser = {
        password: req.body.password,
        email: req.body.email
    }

    if (newUser.email && newUser.password) {
        User.findOne({ email: newUser.email }, (err, data) => {
            if (!data) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            else {
                                newUser.password = hash
                                console.log('the hased password is ', newUser);
                                const user = new User(newUser)
                                user.save((err, data) => {
                                    if (!err) {
                                        res.redirect('/users')
                                    }
                                    else console.log(err)
                                })
                            }
                        })
                    }
                })
            }
            else {
                console.log('This user already exist')
                res.redirect('signup')
            }
        })
    }
    else {
        console.log('those fields are required')
        res.redirect('signup')
    }
})

router.get('/login', (req, res) => {
    res.render('user/login', { title: 'Login', url: req.url })
})

router.post('/login', (req, res) => {

    const password = req.body.password
    const email = req.body.email

    if (email && password) {
        User.findOne({ email }, (err, user) => {
            if (user) {
                const hash = user.password
                console.log(hash);
                bcrypt.compare(password, hash, (err, decode) => {
                    if (err) throw err
                    if (decode) {
                        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);

                        // expire after one hour
                        res.cookie("token", token, { maxAge: 60 * 60 * 1000 })
                        res.redirect('users')
                    }
                    else {
                        console.log('Invalid credencial')
                        res.redirect('login')
                    }
                })
            }
        })
    }
    else {
        console.log('those fields are required')
        res.redirect('login')
    }
})

module.exports = router