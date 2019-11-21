const express = require('express')
const db = require('../facility/facilityModel')
const checkToken = require('../auth/checkToken')
const {
    validateFacility,
    validateFacilityDetails
} = require('../middleware')

const router = express.Router()

router.get('/:id', checkToken, validateFacility, (req, res) => {
    res
        .status(200)
        .json(req.facility)
})

router.put('/:id', checkToken, validateFacility, validateFacilityDetails, (req, res) => {
    const { id } = req.params
    const facilityDetails = req.body
    db.updateFacility(id, facilityDetails)
        .then(updatedFacility => {
            res
                .status(200)
                .json(updatedFacility)
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure updating facility details",
                    error: error
                })
        })
})

router.delete('/:id', checkToken, validateFacility, (req, res) => {
    const facility = req.facility

    db.removeFacility(facility.id)
        .then(quantityDeleted => {
            res
                .status(200)
                .json({
                    message: `${facility.name} has been removed`,
                    quantityDeleted: quantityDeleted
                })
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to delete facility",
                    error: error
                })
        })
})

router.get('/', checkToken, (req, res) => {
    db.findAllFacilities()
        .then(facilities => {
            if (facilities.length) {
                res
                    .status(200)
                    .json(facilities)               
            }
            else {
                res
                    .status(404)
                    .json({
                        message: "There are no saved facilities"
                    })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to get saved facilities",
                    error: error
            })
        })
})


router.post('/', checkToken, validateFacilityDetails, (req, res) => {
    const facilityDetails = req.body;
    db.addFacility(facilityDetails)
        .then(newFacility => {
            res
                .status(201)
                .json(newFacility)
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to add facility",
                    error: error
                })
        })
})

module.exports = router