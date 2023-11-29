function calculateAverage (countries, property) {
  // Filter out countries that do not have data for the specified property
  const countriesWithData = countries.filter(country => country[property] !== undefined)

  // Function to retrieve available years for the specified property
  function getAvailableYears () {
    return countriesWithData.flatMap(country =>
      Object.keys(country[property] || {})
    )
  }

  // Calculate average for 'gini' property
  if (property === 'gini') {
    const availableYears = [...new Set(getAvailableYears())]

    // Calculate total 'gini' value across available years
    const total = availableYears.reduce((accumulator, year) => {
      const countriesWithYearData = countriesWithData.filter(
        country => country[property][year] !== undefined
      )

      // Calculate the total 'gini' value for the year across countries
      const totalForYear = countriesWithYearData.reduce(
        (yearTotal, country) => yearTotal + (country[property][year] || 0),
        0
      )
      return accumulator + totalForYear
    }, 0)

    // Return the average 'gini' value if countries with data exist, else return 0
    return countriesWithData.length > 0 ? total / countriesWithData.length : 0
  } else {
    // Calculate average for properties other than 'gini'
    const total = countriesWithData.reduce((accumulator, country) => {
      return accumulator + (country[property] || 0)
    }, 0)

    // Return the average value for the property if countries with data exist, else return 0
    return countriesWithData.length > 0 ? total / countriesWithData.length : 0
  }
}

module.exports = {
  calculateAverage
}
