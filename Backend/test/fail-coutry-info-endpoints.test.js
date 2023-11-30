const axios = require('axios');

describe('Country Explorer Backend Test', () => {
    test('Check if country info endpoint fail works as excpected', async () => {
    try {
      const response = await axios.post('https://country-explorer-backend.vercel.app/countries/info', { country: 'france' });

      // Check if the response status is 404
      expect(response.status).toBe(200);

    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});