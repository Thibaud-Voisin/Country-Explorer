const axios = require('axios')

describe('Country Explorer Backend Test', () => {
  test('Check if backend is UP', async () => {
    try {
      const response = await axios.get('https://country-explorer-backend.vercel.app/home')

      // Check if the response status is 200
      expect(response.status).toBe(200)

      // Check if the response contains the expected message
      expect(response.data).toBe('Welcome, Country Explorer backend is UP !!')
    } catch (error) {
      // Log any errors encountered during the test
      console.error(error)
      throw error
    }
  })
})
