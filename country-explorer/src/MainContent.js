import './App.scss'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select, { components } from 'react-select'
import AnimatedSubTextCharacter from './AnimatedSubTextCharacter'
import { motion, AnimatePresence } from 'framer-motion'
import Result from './Result'

const MainContent = ({ theme, options, API_URL }) => {
  const texts = [
    'COUNTRY EXPLORER',
    'EXPLORADOR DE PAÍSES',
    '国 家 探 险 家',
    'COUNTRY EXPLORER',
    'LÄNDERFORSCHER ',
    'EXPLORATEUR DE PAYS'
  ]

  const [index, setIndex] = useState(0)
  const [showTextInput, setshowTextInput] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null) // State to hold the selected country
  const [isCountryRetrieved, setIsCountryRetrieved] = useState(false)
  const [newSearch, setnewSearch] = useState(false)
  const [countryData, setcountryData] = useState({
    Images: [],
    Name: '',
    Sub_Name: '',
    Flag: '',
    Arms: '',
    Continent: '',
    Capital: '',
    Languages: [],
    Currencies: [],
    Population: '',
    Population_AVG: '',
    Area: '',
    Area_AVG: '',
    Gini: '',
    Gini_AVG: ''
  })

  const getSelectedCountry = async () => {
    if (selectedCountry && selectedCountry.label) {
      try {
        const payload = {
          country: selectedCountry.label
        }

        const response = await fetch(`${API_URL}/countries/info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Failed to fetch country information')
        }

        setcountryData(await response.json())
        setIsCountryRetrieved(true)
        setnewSearch(true)

        return countryData
      } catch (error) {
        console.error('Error fetching country information:', error)
        return null
      }
    }
  }

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      padding: '0 0 0 1rem',
      textAlign: 'left',
      borderRadius: '0.5rem 0.5rem 0.5rem 0.5rem',
      margin: '4vh 0 0 0',
      fontSize: 'max(1.35vw, 10px)',
      height: '8vh',
      width: '50vw',
      backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
      border: '1px solid gray', // Change the border style based on focus
      boxShadow: 'none',
      '&:hover': theme === 'dark' ? { border: '1px solid white' } : { border: '1px solid black' },
      color: theme === 'dark' ? 'white' : 'black'
    }),
    option: (provided, state) => ({
      ...provided,
      color: theme === 'dark' ? 'white' : 'black', // Change the color of the option text here
      backgroundColor: theme === 'dark' ? (state.isFocused ? '#1d2229' : '#2a323c') : (state.isFocused ? '#ffefd4' : 'white'),
      textAlign: 'left',
      padding: '1rem',
      fontSize: 'max(1.2vw, 10px)'
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#2a323c' : '#FCF6EC',
      color: theme === 'dark' ? 'white' : 'black' // Change the text color based on the theme
    }),
    input: (base) => ({
      ...base,
      color: theme === 'dark' ? 'white' : 'black' // Change the color of the input text here
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === 'dark' ? 'white' : 'black' // Change the color of the input text here
    }),
    placeholder: (base) => ({
      ...base,
      color: 'gray' // Change the color of the input text here
    })
  }

  const { Option } = components

  const IconOption = props => (
    <Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.icon}
          style={{ width: 36, marginRight: 10 }}
          alt={props.data.label}
        />
        {props.data.label}
      </div>
    </Option>
  )

  useEffect(() => {
    setTimeout(() => {
      setshowTextInput(true)
    }, 600)

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 4500)
    document.querySelector('html').setAttribute('data-theme', theme)

    return () => {
      clearInterval(interval)
    }
  }, [texts.length, theme])

  return (

    <div>
    <div className="min-w-[100vw] flex flex-col items-center min-h-[100vh]">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`text-[5vw]  ${theme === 'dark' ? 'text-white' : 'text-black'} SuisseIntl font-bold mt-[20vh]`}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <AnimatedSubTextCharacter
          key="subText"
          text="Select a country and discover its languages, capital, currencies and much more !!"
          theme={theme}
        />
        {showTextInput && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex flex-col xl:flex-row items-center ' >
              <Select
                placeholder='Select a country...'
                searchable
                options={options}
                onChange={(selectedOption) => {
                  setSelectedCountry(selectedOption)
                }}
                styles={selectStyles}
                components={{ Option: IconOption }}
              />
              <button onClick={getSelectedCountry} className={`xl:ml-1 xl:rounded-r-lg rounded-lg  xl:mt-[4vh] mt-[2vh] xl:text-xl text-[4vw] h-[8vh] xl:w-[7vw] w-[24vw] border border-gray-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'} ${theme === 'dark' ? 'hover:border-white' : 'hover:border-black'}`}>Search</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    <Result theme={theme} newSearch={newSearch} setnewSearch={setnewSearch} isCountryRetrieved={isCountryRetrieved} countryData={countryData}/>
    </div>
  )
}

MainContent.propTypes = {
  theme: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  API_URL: PropTypes.string.isRequired,
  data: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired
}

export default MainContent
