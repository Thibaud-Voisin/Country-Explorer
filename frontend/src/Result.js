import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Title from './Result/Title'
import Carousel from './Result/Carousel'
import InteractiveMap from './Result/InteractiveMap'
import Stats from './Result/Stats'

const Result = ({ theme, newSearch, setnewSearch, isCountryRetrieved, countryData }) => {
  const {
    images,
    name,
    subName,
    flag,
    arms,
    continent,
    capital,
    languages,
    currencies,
    population,
    populationAvg,
    area,
    areaAvg,
    gini,
    giniAvg
  } = countryData

  // Scroll to the bottom of the page when a new search is performed
  useEffect(() => {
    if (newSearch) {
      console.log('new search')
      scrollToBottom()
      setnewSearch(false)
    }
  }, [newSearch, setnewSearch])

  const scrollToBottom = () => {
    const windowHeight = window.innerHeight

    const scrollTo = () => {
      window.scrollTo({
        top: windowHeight,
        behavior: 'smooth'
      })
    }

    setTimeout(() => {
      scrollTo()
    }, 100)
  }

  // Rendering the result
  return isCountryRetrieved
    ? (
    <motion.div
      className='result w-[100vw] h-[175vh] relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title theme={theme} name={name} flag={flag} arms={arms} subName={subName}/>
      <div className="xl:grid xl:grid-cols-5 xl:gap-6 xl:p-8 p-2 xl:mb-10">
        <div className="xl:h-[55vh] h-[30vh] xl:col-span-3 xl:m-0 m-2">
          <Carousel images={images} isCountryRetrieved={isCountryRetrieved}/>
        </div>
        <div className="xl:col-span-2 xl:m-0 m-2">
          <InteractiveMap name={name}/>
        </div>
        <div className="xl:col-span-5 xl:m-0 m-2">
          <Stats
            name={name}
            continent={continent}
            capital={capital}
            languages={languages}
            currencies={currencies}
            population={population}
            populationAvg={populationAvg}
            area={area}
            areaAvg={areaAvg}
            gini={gini}
            giniAvg={giniAvg}
          />
        </div>
      </div>
    </motion.div>
      )
    : null
}

Result.propTypes = {
  theme: PropTypes.string.isRequired,
  newSearch: PropTypes.bool.isRequired,
  setnewSearch: PropTypes.func.isRequired,
  isCountryRetrieved: PropTypes.bool.isRequired,
  countryData: PropTypes.object.isRequired
}

export default Result
