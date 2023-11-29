const express = require('express');
const router = express.Router();
const { getCountryInfo } = require('../services/countryService');

router.post('/info', express.json(), getCountryInfo);

module.exports = router;
