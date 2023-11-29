async function getHome (req, res) {
  res.status(200).json('Welcome, Country Explorer backend is UP !!')
}

module.exports = {
  getHome
}
