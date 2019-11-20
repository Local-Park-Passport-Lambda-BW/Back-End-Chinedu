const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json("welcome to our facilities")
})

module.exports = router