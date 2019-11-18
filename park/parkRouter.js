const express = require('express')
const db = require('./parkModel')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message: "Hi"})
})

router.post('/', (req, res) => {
    const parkDetails = req.body;
    db.addPark(parkDetails)
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