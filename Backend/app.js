const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({ origin: 'http://localhost:3000' }));


let countriesData = [];

const fetchData = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all'); // Make a GET request to the root endpoint
      countriesData = response.data;
      console.log('Data fetched:');
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

// Route to retrieve a list of country names and flags
app.get('/countries_flag', (req, res) => {
  const countriesList = countriesData.map(country => ({
    name: country.name.common,
    flag: country.flags.svg // Assuming you want the SVG flag URL
  }));
  res.json(countriesList);
});

// Route to retrieve information about a specific country by name
app.post('/country-info', express.json(), (req, res) => {
    const { country } = req.body; // Change from countryName to country
    console.log(req.body);
    const foundCountry = countriesData.find(data => data.name.common.toLowerCase() === country.toLowerCase());
  
    if (!foundCountry) {
      return res.status(404).json({ error: 'Country not found' });
    }
  
    res.json(foundCountry);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  fetchData();
});