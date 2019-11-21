const express = require('express')
const dbPark = require('../park/parkModel')
const dbRating = require('../rating/ratingModel')
const checkToken = require('../auth/checkToken')
const {
    validateParkDetails,
    validatePark
} = require('../middleware')

const router = express.Router()

router.get('/:id/ratings', checkToken, (req, res) => {
    const { subject: user_id } = req.decodedToken
    const park_id = req.params.id
    const { rating, comment } = req.body;
    const newRating = { rating, comment, park_id, user_id };
    dbRating.addRating(newRating)
        .then(savedRating => {
            res
                .status(201)
                .json(savedRating);
            })
        .catch(error => {
            res
                .status(500)
                .json({
                message: "Failure adding the rating",
                error: error
            });
        });
})

router.get('/:id', validatePark, (req, res) => {
    const park = req.park
    const facilities = req.facilities
    res
        .status(200)
        .json({
            park,
            facilities
        })
})

router.put('/:id', validatePark, validateParkDetails, checkToken, (req, res) => {
    const { id } = req.params
    const parkDetails = req.body
    dbPark.updatePark(id, parkDetails)
        .then(updatedPark => {
            res
                .status(200)
                .json(updatedPark)
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure updating park details",
                    error: error
                })
        })
})

router.delete('/:id', validatePark, checkToken, (req, res) => {
    const park = req.park

    dbPark.removePark(park.id)
        .then(quantityDeleted => {
            res
                .status(200)
                .json({
                    message: `${park.name} has been removed`,
                    quantityDeleted: quantityDeleted
                })
        })
        .catch(error => {
            res
                .status(500)
                .json({
                    message: "Failure to delete park",
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


router.post('/', validateParkDetails, checkToken, (req, res) => {
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