const parkDb = require('../models/parkModel')
const userDb = require('../models/userModel')
const facilityDb = require('../models/facilityModel')

module.exports = {
    validateUserdetails,
    validateParkDetails,
    validatePark,
    validateUser,
    validateFacility,
    validateFacilityDetails
}

function validateFacilityDetails(req, res, next) {
    const { name, description } = req.body
    if (!Object.keys(req.body).length) {
        res
            .status(400)
            .json({
                message: "Missing facility details"
            })
    }
    else if (name && description) {
        next()
    }
    else {
        res
            .status(400)
            .json({
                message: "Incomplete details"
            })
    }
}

async function validateFacility(req, res, next) {
    const { id } = req.params
    const facility = await facilityDb.findById(id)
    if (facility) {
        req.facility = facility
        next()
    }
    else {
        res
            .status(404)
            .json({
                message: "There is no facility with id " + id
            })
    }
}

async function validatePark(req, res, next) {
    const { id } = req.params
    const park = await parkDb.findById(id)
    if (park) {
        const facilities = await parkDb.findParkFacility(id)
        req.park = park
        req.facilities = facilities
        next()
    }
    else {
        res
            .status(404)
            .json({
                message: "There is no park with id " + id
            })
    }
}

async function validateUser(req, res, next) {
    const { id } = req.params
    const user = await userDb.findById(id)
    if (user) {
        req.user = user
        next()
    }
    else {
        res
            .status(404)
            .json({
                message: "There is no user with id " + id
            })
    }
}

function validateParkDetails(req, res, next) {
    const { name, city, country, description } = req.body
    if (!Object.keys(req.body).length) {
        res
            .status(400)
            .json({
                message: "Missing park details"
            })
    }
    else if (name && city && country && description) {
        next()
    }
    else {
        res
            .status(400)
            .json({
                message: "Incomplete details"
            })
    }
}

function validateUserdetails(req, res, next) {
    if (req.path === '/register') {
        const { name, username, email, password } = req.body;
        if (!Object.keys(req.body).length) {
            res
                .status(400)
                .json({
                    message: "Missing user details"
                })
        }
        else if (name && username && email && password) {
            next()
        }
        else {
            res
                .status(400)
                .json({
                    message: "Incomplete registration data"
                })
        }        
    }
    if (req.path === '/login') {
        const { username, email, password } = req.body;
        if (!Object.keys(req.body).length) {
            res
                .status(400)
                .json({
                    message: "Missing user details"
                })
        }
        else if ((username || email) && password) {
            next()
        }
        else {
            res
                .status(400)
                .json({
                    message: "Incomplete details"
                })
        }        
    }
}