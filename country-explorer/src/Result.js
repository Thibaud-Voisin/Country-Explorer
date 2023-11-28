import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Title from './Result/Title';
import Carousel from './Result/Carousel';
import Interactive_Map from './Result/Interactive_Map';
import Stats from './Result/Stats';

const Result = ({ theme, isCountryRetrieved, Country_Data }) => {

  Country_Data = {
    'Images':["https://www.welcometofrance.com/app/uploads/2019/12/alexander-kagan-t9Td0zfDTwI-unsplash-1920x1280.jpg", "https://www.lonelyplanet.fr/sites/lonelyplanet/files/styles/manual_crop/public/media/destination/slider/mobile/paris2.jpg?", "https://www.welcometofrance.com/app/uploads/2019/12/alexander-kagan-t9Td0zfDTwI-unsplash-1920x1280.jpg", "https://www.lonelyplanet.fr/sites/lonelyplanet/files/styles/manual_crop/public/media/destination/slider/mobile/paris2.jpg?"],
    'Name':"France",
    'Sub_Name':"Republique francaise",
    'Flag':"https://flagcdn.com/w320/aw.png",
    'Arms':"https://mainfacts.com/media/images/coats_of_arms/si.png",
    'Continent':"Europe",
    'Capital':"Paris",
    'Languages':["Francis", "English", "Spanish"],
    'Currencies':["Euro", "Dollar",   "Pound"],
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
      <Title Name={Name} Flag={Flag} Arms={Arms} Sub_Name={Sub_Name}/>
      <div className="grid grid-cols-5 gap-8 p-10 mb-10">
        <div className="h-[55vh] col-span-3 w-full">
        <Carousel Images={Images} isCountryRetrieved={isCountryRetrieved}/>
        </div>
        <div className="col-span-2 w-full">
        <Interactive_Map Name={Name}/>
        </div>
        <div className="col-span-5 w-full">
        <Stats Name={Name} Continent={Continent} Capital={Capital} Languages={Languages} Currencies={Currencies} Population={Population} Population_AVG={Population_AVG} Superficy={Superficy} Superficy_AVG={Superficy_AVG} Gini={Gini} Gini_AVG={Gini_AVG}/>
      </div>
      </div>
    </motion.div>
) : null;
};
export default Result;