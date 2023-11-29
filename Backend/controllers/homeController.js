const express = require('express')
const router = express.Router()
const { getHome } = require('../services/homeService')

router.get('/home', getHome)

module.exports = router
