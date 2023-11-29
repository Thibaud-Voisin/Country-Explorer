const express = require('express')
const router = express.Router()
const { getCountriesFlags } = require('../services/flagService')

router.get('/all', getCountriesFlags)

module.exports = router
