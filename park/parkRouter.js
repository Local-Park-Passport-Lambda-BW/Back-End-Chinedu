const express = require('express')
const bcrypt = require('bcryptjs')
const dbPark = require('./parkModel')
const dbUser = require('../user/userModel')
const checkToken = require('../auth/checkToken')
const generateToken = require('../auth/generateToken')
const { validateUserdetails } = require('../user/userMiddleware')

const router = express.Router()

router.post('/register', validateUserdetails, (req, res, next) => {
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

router.get('/', (req, res) => {
    dbPark.findAllParks()
        .then(parks => {
            if (parks.length) {
                res
                    .status(200)
                    .json(parks)               
            }
            else {
                res
                    .status(404)
                    .json({
                        message: "There are no saved parks"
                    })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to get saved parks",
                    error: error
            })
        })
})


router.post('/', (req, res) => {
    const parkDetails = req.body;
    dbPark.addPark(parkDetails)
        .then(newPark => {
            res
                .status(201)
                .json(newPark)
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to add park",
                    error: error
                })
        })
})

module.exports = router