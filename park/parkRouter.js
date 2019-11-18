const express = require('express')
const db = require('./parkModel')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message: "Hi"})
})

module.exports = router