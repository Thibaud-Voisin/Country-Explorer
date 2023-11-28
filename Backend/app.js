const axios = require('axios')
const cors = require('cors')
require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 4000
const imageApiKey = process.env.Image_api_key

app.use(cors({ origin: 'http://localhost:3000' }))

let countriesData = []
let populationAvg = 0
let superficyAvg = 0
let giniAvg = 0
let rawImageUrls = ['', '', '', '']

function calculateAverage (countries, property) {
  const countriesWithData = countries.filter(country => country[property] !== undefined)

  if (property === 'gini') {
    const yearsWithData = countriesWithData.flatMap(country =>
      Object.keys(country[property] || {})
    )

    const availableYears = [...new Set(yearsWithData)]

    const total = availableYears.reduce((accumulator, year) => {
      const countriesWithYearData = countries.filter(
        country => country[property] && country[property][year] !== undefined
      )

      const totalForYear = countriesWithYearData.reduce(
        (yearTotal, country) => yearTotal + (country[property][year] || 0),
        0
      )

      return accumulator + totalForYear
    }, 0)

    return countriesWithData.length > 0 ? total / countriesWithData.length : 0
  } else {
    const total = countriesWithData.reduce((accumulator, country) => {
      return accumulator + (country[property] || 0)
    }, 0)

    return countriesWithData.length > 0 ? total / countriesWithData.length : 0
  }
}

async function fetchData () {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all')
    countriesData = response.data

    populationAvg = calculateAverage(countriesData, 'population')
    superficyAvg = calculateAverage(countriesData, 'area')
    giniAvg = calculateAverage(countriesData, 'gini')

    console.log('Data fetched:', populationAvg, superficyAvg, giniAvg)
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

app.get('/countries_flag', (req, res) => {
  const countriesList = countriesData.map(country => ({
    name: country.name.common,
    flag: country.flags?.svg || 'Default SVG Flag URL'
  }))
  res.json(countriesList)
})

app.post('/country-info', express.json(), async (req, res) => {
  const { country } = req.body

  const foundCountry = countriesData.find(data => data.name.common.toLowerCase() === country.toLowerCase())

  if (!foundCountry) {
    return res.status(404).json({ error: 'Country not found' })
  }

  try {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${foundCountry.name.common}&client_id=${imageApiKey}`
    const response = await axios.get(url)
    const imagesData = response.data
    rawImageUrls = imagesData.results.slice(0, 4).map(result => result.urls.regular)
  } catch (error) {
    console.error('Error fetching images:', error.message)
  }

  const countryData = {
    images: rawImageUrls || 'default_image_url',
    name: foundCountry.name?.common || 'Default Name',
    subName: foundCountry.name?.official || 'Default Official Name',
    flag: foundCountry.flags?.png || 'Default Flag URL',
    arms: foundCountry.coatOfArms?.png || 'Default Coat of Arms URL',
    continent: foundCountry.continents?.[0] || 'Default Continent',
    capital: foundCountry.capital?.[0] || 'Default Capital',
    languages: Object.values(foundCountry.languages) || ['Default Language'],
    currencies: Object.values(foundCountry.currencies).map(currency => currency.name) || ['Default Currency'],
    population: foundCountry.population || 0,
    populationAvg: populationAvg || 0,
    superficy: foundCountry.area || 0,
    superficyAvg: superficyAvg || 0,
    gini: foundCountry.gini ? Object.values(foundCountry.gini)[0] || 0 : 0,
    giniAvg: giniAvg || 0
  }

  res.json(countryData)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  fetchData()
})
