const axios = require('axios')

describe('Country Explorer Backend Test', () => {
  test('Check if flags endpoint works well', async () => {
    try {
      const response = await axios.get('https://country-explorer-backend.vercel.app/flags/all')

      // Check if the response status is 200
      expect(response.status).toBe(200)

      const responseBody = response.data

      // Ensure the response body is an array
      expect(Array.isArray(responseBody)).toBe(true)

      // Ensure each item in the array has 'name' and 'flag' properties
      responseBody.forEach(item => {
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('flag')
      })

      // Ensure the 'name' and 'flag' properties are strings and contain valid URLs
      responseBody.forEach(item => {
        expect(typeof item.name).toBe('string')
        expect(typeof item.flag).toBe('string')
        expect(item.flag).toMatch(/^https?:\/\/.*\..*/)
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  })
})
