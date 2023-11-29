const countryService = require('./countryService.js')

async function getCountriesFlags (req, res) {
  try {
    await countryService.fetchData() // Wait for data fetch
    const countriesData = countryService.getCountriesData() || [] // Handling empty data case
    const countriesList = countriesData.map((country) => ({
      name: country.name?.common || 'Unknown',
      flag: country.flags?.svg || 'Default SVG Flag URL'
    }))
    res.json(countriesList)
  } catch (error) {
    console.error('Error fetching countries flags:', error) // Logging specific error
    res.status(500).json({ error: 'Failed to fetch countries flags.' })
  }
}

module.exports = {
  getCountriesFlags
}
