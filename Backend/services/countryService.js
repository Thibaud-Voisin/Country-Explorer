const axios = require('axios')
require('dotenv').config()

const { calculateAverage } = require('../utils/dataUtils')

let countriesData = [] // Array to store fetched country data
let populationAvg = 0 // Average population
let areaAvg = 0 // Average area
let giniAvg = 0 // Average GINI index
let ImageUrls = [] // Array to store image URLs
const imageApiKey = process.env.Image_api_key // API key for image service

async function fetchData () {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all')
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from countries API')
    }
    countriesData = response.data // Storing fetched data into countriesData

    // Calculating averages for population, area, and GINI index
    populationAvg = calculateAverage(countriesData, 'population')
    areaAvg = calculateAverage(countriesData, 'area')
    giniAvg = calculateAverage(countriesData, 'gini')
  } catch (error) {
    console.error('Error fetching data:', error.message)
    throw new Error('Failed to fetch country data')
  }
}

async function getCountryInfo (req, res) {
  const { country } = req.body // Extracting country name from request body
  try {
    if (!country) {
      return res.status(400).json({ error: 'Country name is required' })
    }

    await fetchData() // Fetching data before processing country info

    const foundCountry = countriesData.find(
      data => data.name.common.toLowerCase() === country.toLowerCase()
    ) // Finding the requested country in the fetched data

    if (!foundCountry) {
      return res.status(404).json({ error: 'Country not found' })
    }

    // Fetching images based on the country name
    const imageUrl = `https://api.unsplash.com/search/photos?page=1&query=${foundCountry.name.common}&client_id=${imageApiKey}`
    const imageResponse = await axios.get(imageUrl)
    if (imageResponse.status !== 200 || !imageResponse.data.results) {
      throw new Error('Failed to fetch images or unexpected response')
    }
    const imagesData = imageResponse.data
    ImageUrls = imagesData.results.slice(0, 4).map(result => result.urls.regular) // Extracting image URLs

    // Constructing country data object with default values if information is missing
    const countryData = {
      images: ImageUrls.length ? ImageUrls : ['default_image_url'],
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
      area: foundCountry.area || 0,
      areaAvg: areaAvg || 0,
      gini: foundCountry.gini ? Object.values(foundCountry.gini)[0] || 0 : 0,
      giniAvg: giniAvg || 0
    }

    res.json(countryData) // Sending constructed country data as a response
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  fetchData,
  getCountryInfo,
  getCountriesData: () => countriesData // Exporting the fetched country data
}
