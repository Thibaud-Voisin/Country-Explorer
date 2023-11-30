const axios = require('axios');

describe('Country Explorer Backend Test', () => {
  test('Check if country info endpoint works well', async () => {
    try {
      const response = await axios.post('https://country-explorer-backend.vercel.app/countries/info', { country: 'France' });

      // Check if the response status is 200
      expect(response.status).toBe(200);

      const responseBody = response.data;

      // Ensure the response body is an object
      expect(responseBody).toBeInstanceOf(Object);

      // Ensure all required fields are present
      expect(responseBody).toHaveProperty('images');
      expect(responseBody.images).toBeInstanceOf(Array);
      expect(responseBody).toHaveProperty('name');
      expect(responseBody).toHaveProperty('subName');
      expect(responseBody).toHaveProperty('flag');
      expect(responseBody).toHaveProperty('arms');
      expect(responseBody).toHaveProperty('continent');
      expect(responseBody).toHaveProperty('capital');
      expect(responseBody).toHaveProperty('languages');
      expect(responseBody.languages).toBeInstanceOf(Array);
      expect(responseBody).toHaveProperty('currencies');
      expect(responseBody.currencies).toBeInstanceOf(Array);
      expect(responseBody).toHaveProperty('population');
      expect(responseBody).toHaveProperty('populationAvg');
      expect(responseBody).toHaveProperty('area');
      expect(responseBody).toHaveProperty('areaAvg');
      expect(responseBody).toHaveProperty('gini');
      expect(responseBody).toHaveProperty('giniAvg');
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});