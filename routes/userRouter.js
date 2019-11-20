const express = require('express')
const bcrypt = require('bcryptjs')
const { validateUserdetails, validateUser } = require('../middleware')
const dbUser = require('../user/userModel')
const generateToken = require('../auth/generateToken')
const checkToken = require('../auth/checkToken')

const router = express.Router()

router.get('/:id', validateUser, (req, res) => {
    res
        .status(200)
        .json(req.user)
})

router.delete('/:id', validateUser, (req, res) => {
    const user = req.user

    dbUser.removeUser(user.id)
        .then(quantityDeleted => {
            res
                .status(200)
                .json({
                    message: `${user.name} has been removed`,
                    quantityDeleted: quantityDeleted
                })
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to delete user",
                    error: error
                })
        })
})

router.post('/register', validateUserdetails, (req, res) => {
    let userDetails = req.body
    const hash = bcrypt.hashSync(userDetails.password, 10)
    userDetails = { ...userDetails, password: hash }
    dbUser.addUser(userDetails)
        .then(newUser => {
            res
                .status(201)
                .json(newUser)
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to create new user",
                    error: error
            })
        })
})

router.post('/login', validateUserdetails, (req, res) => {
    const loginName = req.body.username || req.body.email
    const password = req.body.password
    dbUser.findByUsernameOrEmail(loginName)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res
                    .status(200)
                    .json({
                        message: "Welcome " + user.name,
                        token: token
                    })
            }
            else {
                res
                    .status(401)
                    .json({
                        message: "Invalid credentials"
                    })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Login failure",
                    error: error
            })
        })
})

module.exports = router