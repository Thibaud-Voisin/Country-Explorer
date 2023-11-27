import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faLanguage, faCity, faCoins, faPeopleGroup, faScaleUnbalancedFlip, faMountain } from '@fortawesome/free-solid-svg-icons';

const Result = ({ theme, isCountryRetrieved, Country_Data }) => {

  Country_Data = {
    'Images':["https://www.welcometofrance.com/app/uploads/2019/12/alexander-kagan-t9Td0zfDTwI-unsplash-1920x1280.jpg", "https://www.lonelyplanet.fr/sites/lonelyplanet/files/styles/manual_crop/public/media/destination/slider/mobile/paris2.jpg?", "https://www.welcometofrance.com/app/uploads/2019/12/alexander-kagan-t9Td0zfDTwI-unsplash-1920x1280.jpg", "https://www.lonelyplanet.fr/sites/lonelyplanet/files/styles/manual_crop/public/media/destination/slider/mobile/paris2.jpg?"],
    'Name':"France",
    'Sub_Name':"Republique francaise",
    'Flag':"https://flagcdn.com/w320/aw.png",
    'Arms':"https://mainfacts.com/media/images/coats_of_arms/si.png",
    'Continent':"Europe",
    'Capital':"Paris",
    'Languages':["Francis"],
    'Currencies':["Euro"],
    'Population':67321454,
    'Population_AVG': 32432,
    'Superficy':344523,
    'Superficy_AVG':34,
    'Gini' : 0.123,
    'Gini_AVG' : 0.65
  }


  const {
    Images,
    Name,
    Sub_Name,
    Flag,
    Arms,
    Continent,
    Capital,
    Languages,
    Currencies,
    Population,
    Population_AVG,
    Superficy,
    Superficy_AVG,
    Gini,
    Gini_AVG,
  } = Country_Data;
  

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    if (isCountryRetrieved) {
      scrollToBottom();
    }
    
  }, [isCountryRetrieved]);


  const scrollToBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollHeight = documentHeight - windowHeight;

    const scrollTo = () => {
      window.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    };

    setTimeout(() => {
      scrollTo();
    }, 100);
  };

  return isCountryRetrieved ? (
    <motion.div
className='result w-[100vw] h-[100vh] relative'
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
>
<div>
    <div className='ml-[2vw] sub_title_results'>
        <div className="flex items-center title">
            {Name}
            <img className='w-[4vw] ml-[1vw]' src={Flag} alt='flag'/>  
            <img className='w-[3vw] ml-[1vw]' src={Arms} alt='arms'/> 
        </div>
        <div className='-mt-[2vw]'>
            {Sub_Name}
        </div>
    </div>
    <div className="flex items-center">
        <div className="mt-[2vh] flex mr-[2vw] ml-[2.5vw] h-[50vh] w-[57.5vw]">
        <div className="carousel rounded-2xl w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={Images[0]} className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
  <img src={Images[1]} className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
  <img src={Images[2]} className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
  <img src={Images[3]} className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>

</div>
    </div>
    <div className="card card-compact shadow-xl bg-base-100 w-[37.5vw] h-[50vh] mt-[2vh] mr-[2.5vw]">
    <figure>
        <iframe
            title='Country Map'
            loading="lazy"
            className='h-[100vh] w-[100vw]'
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${Name}&maptype=satellite`}>
        </iframe>
    </figure>
    <div className="card-body">
        <div className="flex items-center justify-between">
            <h3 className="card-title">{Name}'s Map</h3>
            <div className="flex items-center">
                <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>Expand</button>
            </div>
        </div>
    </div>
</div>
<dialog id="my_modal_1" className="modal mb-[5vh]">
  <div className="modal-box max-w-[80vw] h-[80vh] flex items-center justify-between p-10">
  <iframe
            title='Country Map'
            loading="lazy"
            className='h-full w-full'
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${Name}&maptype=satellite`}>
        </iframe>
    <div className="modal-action">
      <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  </div>
</dialog>
</div>
<div className="stats w-[95vw] shadow m-[2.5vw]">
<div className="stat">
<div className="stat-figure text-secondary">
<FontAwesomeIcon icon={faEarthAmericas} size="2x"/> 
</div>
        <div className="stat-title">Continent</div>
        <div className="stat-value">{Continent}</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
        <FontAwesomeIcon icon={faCity} size="2x"/> 
        </div>
        <div className="stat-title">Capital city</div>
        <div className="stat-value">{Capital}</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
        <FontAwesomeIcon icon={faLanguage} size="2x"/> 
        </div>
        <div className="stat-title">Languages</div>
        <div className="stat-value">{Languages}</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
        <FontAwesomeIcon icon={faCoins} size="2x"/> 

        </div>
        <div className="stat-title">Currencies</div>
        <div className="stat-value">{Currencies}</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
        <FontAwesomeIcon icon={faPeopleGroup } size="2x"/> 
        </div>
        <div className="stat-title">Population</div>
        <div className="stat-value">{Population}</div>
        <div className="stat-desc">{(Population > Population_AVG) ? '↗' : '↘︎'} - Average: {Population_AVG}</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
        <FontAwesomeIcon icon={faMountain } size="2x"/> 
        </div>
        <div className="stat-title">Superficy</div>
        <div className="stat-value">{Superficy}</div>
        <div className="stat-desc">{(Superficy > Superficy_AVG) ? '↗' : '↘︎'} - Average: {Superficy_AVG}</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
        <FontAwesomeIcon icon={faScaleUnbalancedFlip} size="2x"/> 
        </div>
        <div className="stat-title">Inequality level</div>
        <div className="stat-value">{Gini}</div>
        <div className="stat-desc">{(Gini > Gini_AVG) ? '↗' : '↘︎'} - Average: {Gini_AVG}</div>
    </div>
</div>
</div>
</motion.div>
) : null;
};
export default Result;