const authRoutes = require('./authRoutes')
const postRoutes = require('./postRoutes')

const express = require('express')

const router = express.Router()


router.use('/user', authRoutes)
router.use('/post', postRoutes)

module.exports = router