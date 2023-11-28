import {React} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faLanguage, faCity, faCoins, faPeopleGroup, faScaleUnbalancedFlip, faRuler } from '@fortawesome/free-solid-svg-icons';


const Stats = ({Name, Continent, Capital, Languages, Currencies, Population, Population_AVG, Superficy, Superficy_AVG, Gini, Gini_AVG }) => {

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
    {Continent && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faEarthAmericas} size="2x"/>
        </div>
        <div className="stat-title">Continent</div>
        <div className="stat-value text-2xl">{Continent}</div>
    </div>
    )}
    {Capital && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faCity} size="2x"/>
        </div>
        <div className="stat-title">Capital city</div>
        <div className="stat-value text-2xl">{Capital}</div>
    </div>
    )}
    {Languages && Languages.length > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faLanguage} size="2x" />
        </div>
        <div className="stat-title">{Languages.length === 1 ? 'Language:' : 'Languages:'}</div>
        <div className="stat-value text-2xl">
            <div>
                {Languages.slice(0, 2).map((language, index) => (
                <span key={index}>
                {language}
                {index !== Languages.slice(0, 2).length - 1 && ', '}
                </span>
                ))}
            </div>
        </div>
        <div className="stat-desc">
            {Languages.length > 2 && (
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
            <h3 className="font-bold text-lg">{Name}'s Languages</h3>
            <p className="py-4">{Languages.map((language, index) => (
                <span key={index}>
                {language}
                {index !== Languages.length - 1 && ', '}
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
    {Currencies && Currencies.length > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faCoins} size="2x"/>
        </div>
        <div className="stat-title">{Currencies.length === 1 ? 'Currency:' : 'Currencies:'}</div>
        <div className="stat-value text-2xl">
            <div>
                {Currencies.slice(0, 2).map((Currency, index) => (
                <span key={index}>
                {Currency}
                {index !== Currencies.slice(0, 2).length - 1 && ', '}
                </span>
                ))}
            </div>
        </div>
        <div className="stat-desc">
            {Currencies.length > 2 && (
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
            <h3 className="font-bold text-lg">{Name}'s Currencies</h3>
            <p className="py-4">{Currencies.map((Currency, index) => (
                <span key={index}>
                {Currency}
                {index !== Currencies.length - 1 && ', '}
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
    {Population && Population_AVG && Population > 0 && Population_AVG > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faPeopleGroup } size="2x"/>
        </div>
        <div className="stat-title">Population</div>
        <div className="stat-value text-2xl">{formatNumber(Population)}</div>
        <div className="stat-desc">{(Population > Population_AVG) ? '↗' : '↘︎'} - Average: {formatNumber(Population_AVG)}</div>
    </div>
    )}
    {Superficy && Superficy_AVG && Superficy > 0 && Superficy_AVG > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faRuler } size="2x"/>
        </div>
        <div className="stat-title">Superficy</div>
        <div className="stat-value text-2xl">{formatNumber(Superficy)} km²</div>
        <div className="stat-desc">{(Superficy > Superficy_AVG) ? '↗' : '↘︎'} - Average: {formatNumber(Superficy_AVG)}</div>
    </div>
    )}
    {Gini && Gini_AVG && Gini > 0 && Gini_AVG > 0 && (
    <div className="stat">
        <div className="stat-figure text-secondary">
            <FontAwesomeIcon icon={faScaleUnbalancedFlip} size="2x"/>
        </div>
        <div className="stat-title">Inequality level</div>
        <div className="stat-value text-2xl">{formatNumber(Gini)}</div>
        <div className="stat-desc">{(Gini > Gini_AVG) ? '↗' : '↘︎'} - Average: {formatNumber(Gini_AVG)}</div>
    </div>
    )}
</div>
)};

export default Stats;