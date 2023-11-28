import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Title from './Result/Title';
import Carousel from './Result/Carousel';
import Interactive_Map from './Result/Interactive_Map';
import Stats from './Result/Stats';

const Result = ({ new_search, setnew_search, isCountryRetrieved, Country_Data }) => {


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
    superficy,
    superficyAvg,
    gini,
    giniAvg,
  } = Country_Data;


  useEffect(() => {
    if (new_search) {
      console.log("new search");
      scrollToBottom();
      setnew_search(false);
    }
    
  }, [new_search]);


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
      <Title name={name} flag={flag} arms={arms} subName={subName}/>
      <div className="grid grid-cols-5 gap-8 p-8 mb-10">
        <div className="h-[55vh] col-span-3 w-full">
          <Carousel images={images} isCountryRetrieved={isCountryRetrieved}/>
        </div>
        <div className="col-span-2 w-full">
          <Interactive_Map name={name}/>
        </div>
        <div className="col-span-5 w-full">
          <Stats
            name={name}
            continent={continent}
            capital={capital}
            languages={languages}
            currencies={currencies}
            population={population}
            populationAvg={populationAvg}
            superficy={superficy}
            superficyAvg={superficyAvg}
            gini={gini}
            giniAvg={giniAvg}
          />
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default Result;