import './App.scss'
import { React, useState, useEffect } from 'react'
import MainContent from './MainContent'
import Footer from './Footer'
import Header from './Header'

function App () {
  const API_URL = 'http://localhost:4000'
  const [theme, setTheme] = useState('dark')
  const [options, setOptions] = useState([])
  const [isVisibleAlert, setIsVisibleAlert] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'cupcake' : 'dark')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/flags/all`)
        if (!response.ok) {
          setIsVisibleAlert(true)
          console.log('Error fetching data')
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const fetchedOptions = data.map((country, index) => ({
          value: `option${index + 1}`,
          label: country.name,
          icon: country.flag
        }))
        const sortedOptions = fetchedOptions.sort((a, b) =>
          a.label.localeCompare(b.label)
        )
        setOptions(sortedOptions)
        setIsVisibleAlert(false)
      } catch (error) {
        setIsVisibleAlert(true)
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} isVisibleAlert={isVisibleAlert}/>
      <MainContent theme={theme} options={options} API_URL={API_URL}/>
      <Footer />
    </div>
  )
}

export default App
