import React from 'react'
import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas, faLanguage, faCity, faCoins, faPeopleGroup, faScaleUnbalancedFlip, faRuler } from '@fortawesome/free-solid-svg-icons' // Import the FontAwesomeIcon component

const Stats = ({ name, continent, capital, languages, currencies, population, populationAvg, area, areaAvg, gini, giniAvg }) => {
    // Function to format the numbers to a more readable format
  function formatNumber (num) {
    if (num === 0) return num
    if (num < 1) return `${(num * 100)}%`
    if (num < 1e3) return num
    if (num >= 1e3 && num < 1e6) return `${(num / 1e3).toFixed(1)}K`
    if (num >= 1e6 && num < 1e9) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e9 && num < 1e12) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`
  }

  // Rendering the stats
  return (
<div className="stats shadow flex flex-col xl:flex-row ">
    {continent && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faEarthAmericas} size="2x"/>
        </div>
        <div className="stat-title">Continent</div>
        <div className="stat-value text-2xl lg:text-lg">{continent}</div>
    </div>
    )}
    {capital && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faCity} size="2x"/>
        </div>
        <div className="stat-title">Capital city</div>
        <div className="stat-value text-2xl lg:text-lg">{capital}</div>
    </div>
    )}
    {languages && languages.length > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faLanguage} size="2x" />
        </div>
        <div className="stat-title">{languages.length === 1 ? 'Language:' : 'Languages:'}</div>
        <div className="stat-value text-2xl lg:text-lg">
            <div>
                {languages.slice(0, 2).map((language, index) => (
                <span key={index}>
                {language}
                {index !== languages.slice(0, 2).length - 1 && ', '}
                </span>
                ))}
            </div>
        </div>
        <div className="stat-desc">
            {languages.length > 2 && (
            <div>
                <button onClick={() => document.getElementById('Pop_Up_Language').showModal()} className="underline hover:text-white">
                Show All
                </button>
            </div>
            )}
        </div>
    </div>
    )}
    <dialog id="Pop_Up_Language" className="modal border-none">
        <div className="modal-box">
        <h3 className="font-bold text-lg">{name}&apos;s Languages</h3>
            <p className="py-4">{languages.map((language, index) => (
                <span key={index}>
                {language}
                {index !== languages.length - 1 && ', '}
                </span>
            ))}
            </p>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">CLOSE</button>
                </form>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    {currencies && currencies.length > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faCoins} size="2x"/>
        </div>
        <div className="stat-title">{currencies.length === 1 ? 'Currency:' : 'Currencies:'}</div>
        <div className="stat-value text-2xl lg:text-lg">
            <div>
                {currencies.slice(0, 2).map((Currency, index) => (
                <span key={index}>
                {Currency}
                {index !== currencies.slice(0, 2).length - 1 && ', '}
                </span>
                ))}
            </div>
        </div>
        <div className="stat-desc">
            {currencies.length > 2 && (
            <div>
                <button onClick={() => document.getElementById('Pop_Up_Currency').showModal()} className="underline hover:text-white">
                Show All
                </button>
            </div>
            )}
        </div>
    </div>
    )}
    <dialog id="Pop_Up_Currency" className="modal border-none">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{name}&apos;s Currencies</h3>
            <p className="py-4">{currencies.map((Currency, index) => (
                <span key={index}>
                {Currency}
                {index !== currencies.length - 1 && ', '}
                </span>
            ))}
            </p>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">CLOSE</button>
                </form>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    {typeof population !== 'undefined' && typeof populationAvg !== 'undefined' && population > 0 && populationAvg > 0 && (
  <div className="stat ">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon icon={faPeopleGroup} size="2x"/>
    </div>
    <div className="stat-title">Population</div>
    <div className="stat-value text-2xl lg:text-lg">{formatNumber(population)}</div>
    <div className="stat-desc">{(population > populationAvg) ? '↗' : '↘︎'} - Average: {formatNumber(populationAvg)}</div>
  </div>
    )}

{typeof area !== 'undefined' && typeof areaAvg !== 'undefined' && area > 0 && areaAvg > 0 && (
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon icon={faRuler} size="2x"/>
    </div>
    <div className="stat-title">Area</div>
    <div className="stat-value text-2xl lg:text-lg">{formatNumber(area)} km²</div>
    <div className="stat-desc">{(area > areaAvg) ? '↗' : '↘︎'} - Average: {formatNumber(areaAvg)}</div>
  </div>
)}

{typeof gini !== 'undefined' && typeof giniAvg !== 'undefined' && gini > 0 && giniAvg > 0 && (
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon icon={faScaleUnbalancedFlip} size="2x"/>
    </div>
    <div className="stat-title">Inequality level</div>
    <div className="stat-value text-2xl lg:text-lg">{formatNumber(gini)}</div>
    <div className="stat-desc">{(gini > giniAvg) ? '↗' : '↘︎'} - Average: {formatNumber(giniAvg)}</div>
  </div>
)}
</div>
  )
}

Stats.propTypes = {
  name: propTypes.string.isRequired,
  continent: propTypes.string,
  capital: propTypes.string,
  languages: propTypes.array,
  currencies: propTypes.array,
  population: propTypes.number,
  populationAvg: propTypes.number,
  area: propTypes.number,
  areaAvg: propTypes.number,
  gini: propTypes.number,
  giniAvg: propTypes.number
}

export default Stats
