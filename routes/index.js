const express = require('express')
const parkRouter = require('./parkRouter')
const userRouter = require('./userRouter')
const facilityRouter = require('./facilityRouter')

const router = express.Router()

router.use('/parks', parkRouter)
router.use('/users', userRouter)
router.use('/facilities', facilityRouter)

module.exports = router