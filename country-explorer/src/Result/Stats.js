import {React} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faLanguage, faCity, faCoins, faPeopleGroup, faScaleUnbalancedFlip, faRuler } from '@fortawesome/free-solid-svg-icons';


const Stats = ({name, continent, capital, languages, currencies, population, populationAvg, area, areaAvg, gini, giniAvg }) => {

    function formatNumber(num) {
        if (num === 0) return num;
        if (num < 1) return `${(num * 100)}%`;
        if (num < 1e3) return num;
        if (num >= 1e3 && num < 1e6) return `${(num / 1e3).toFixed(1)}K`;
        if (num >= 1e6 && num < 1e9) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e9 && num < 1e12) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
      }

    return (
<div className="stats shadow w-full">
    {continent && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faEarthAmericas} size="2x"/>
        </div>
        <div className="stat-title">Continent</div>
        <div className="stat-value text-2xl">{continent}</div>
    </div>
    )}
    {capital && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faCity} size="2x"/>
        </div>
        <div className="stat-title">Capital city</div>
        <div className="stat-value text-2xl">{capital}</div>
    </div>
    )}
    {languages && languages.length > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faLanguage} size="2x" />
        </div>
        <div className="stat-title">{languages.length === 1 ? 'Language:' : 'Languages:'}</div>
        <div className="stat-value text-2xl">
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
                <button onClick={()=>document.getElementById('Pop_Up_Language').showModal()} className="underline hover:text-white">
                Show All
                </button>
            </div>
            )}
        </div>
    </div>
    )}
    <dialog id="Pop_Up_Language" className="modal border-none">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{name}'s Languages</h3>
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
        <div className="stat-value text-2xl">
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
                <button onClick={()=>document.getElementById('Pop_Up_Currency').showModal()} className="underline hover:text-white">
                Show All
                </button>
            </div>
            )}
        </div>
    </div>
        )}
    <dialog id="Pop_Up_Currency" className="modal border-none">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{name}'s Currencies</h3>
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
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon icon={faPeopleGroup} size="2x"/>
    </div>
    <div className="stat-title">Population</div>
    <div className="stat-value text-2xl">{formatNumber(population)}</div>
    <div className="stat-desc">{(population > populationAvg) ? '↗' : '↘︎'} - Average: {formatNumber(populationAvg)}</div>
  </div>
)}

{typeof area !== 'undefined' && typeof areaAvg !== 'undefined' && area > 0 && areaAvg > 0 && (
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon icon={faRuler} size="2x"/>
    </div>
    <div className="stat-title">Area</div>
    <div className="stat-value text-2xl">{formatNumber(area)} km²</div>
    <div className="stat-desc">{(area > areaAvg) ? '↗' : '↘︎'} - Average: {formatNumber(areaAvg)}</div>
  </div>
)}

{typeof gini !== 'undefined' && typeof giniAvg !== 'undefined' && gini > 0 && giniAvg > 0 && (
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FontAwesomeIcon icon={faScaleUnbalancedFlip} size="2x"/>
    </div>
    <div className="stat-title">Inequality level</div>
    <div className="stat-value text-2xl">{formatNumber(gini)}</div>
    <div className="stat-desc">{(gini > giniAvg) ? '↗' : '↘︎'} - Average: {formatNumber(giniAvg)}</div>
  </div>
)}
</div>
)};

export default Stats;