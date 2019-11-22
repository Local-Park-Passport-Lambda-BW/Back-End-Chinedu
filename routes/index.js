const express = require('express')
const parkRouter = require('./parkRouter')
const userRouter = require('./userRouter')
const facilityRouter = require('./facilityRouter')

const router = express.Router()

router.use('/parks', parkRouter)
router.use('/users', userRouter)
router.use('/facilities', facilityRouter)


router.get('/', (req, res) => {
    res.json("Heloo park people")
})

module.exports = router