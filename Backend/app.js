const express = require('express')
const cors = require('cors')
const app = express()
const countryRoutes = require('./controllers/countryController')
const flagRoutes = require('./controllers/flagController')
const homeRoutes = require('./controllers/homeController')
require('dotenv').config()

const port = process.env.PORT || 4000

app.use(cors({ origin: 'http://localhost:3001' }))
app.use('/countries', countryRoutes)
app.use('/flags', flagRoutes)
app.use('/', homeRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
