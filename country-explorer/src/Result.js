import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

const Result = ({ theme, isCountryRetrieved }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const svgRef = useRef();
  const [showButton, setShowButton] = useState(false);
  const [is_gini, setIs_gini] = useState(false);

  useEffect(() => {
    if (isCountryRetrieved) {
      scrollToBottom();
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
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
      setShowButton(true);
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowButton(false);
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop === documentHeight - windowHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
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
        <div className="-mt-[9vh] flex items-center title">
            France 
            <img className='w-[3vw] ml-[1vw]' src={"https://flagcdn.com/w320/aw.png"} alt='flag'/>  
            <img className='w-[3vw] ml-[1vw]' src={"https://mainfacts.com/media/images/coats_of_arms/si.png"} alt='arms'/> 
        </div>
        <div className='-mt-[3vh]'>
            Aruba
        </div>
    </div>
    <div className="flex items-center">
        <div className={`mt-[2vh] flex mr-[2vw] ml-[2.5vw] h-[50vh] ${is_gini ? 'w-[70vw]': 'w-[57.5vw]'}`}>
        <div className="carousel rounded-2xl w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://images.unsplash.com/photo-1642231630455-f32a2e7afac0?ixid=M3w1MzI1NTZ8MHwxfHNlYXJjaHwxfHxVVEMtMDQlM0EwMHxlbnwwfHx8fDE3MDA4NTA5Nzh8MA&ixlib=rb-4.0.3" className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
  <img src="https://images.unsplash.com/photo-1642231630455-f32a2e7afac0?ixid=M3w1MzI1NTZ8MHwxfHNlYXJjaHwxfHxVVEMtMDQlM0EwMHxlbnwwfHx8fDE3MDA4NTA5Nzh8MA&ixlib=rb-4.0.3" className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
  <img src="https://images.unsplash.com/photo-1642231630455-f32a2e7afac0?ixid=M3w1MzI1NTZ8MHwxfHNlYXJjaHwxfHxVVEMtMDQlM0EwMHxlbnwwfHx8fDE3MDA4NTA5Nzh8MA&ixlib=rb-4.0.3" className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
  <img src="https://images.unsplash.com/photo-1642231630455-f32a2e7afac0?ixid=M3w1MzI1NTZ8MHwxfHNlYXJjaHwxfHxVVEMtMDQlM0EwMHxlbnwwfHx8fDE3MDA4NTA5Nzh8MA&ixlib=rb-4.0.3" className="inset-0 w-full h-full object-cover" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
    </div>
    <div className={`card card-compact shadow-xl bg-base-100 ${is_gini ? 'w-[300vw]' : 'w-[37.5vw]'} h-[50vh] mt-[2vh] mr-[2.5vw]`}>
    <figure>
        <iframe
            title='Country Map'
            loading="lazy"
            className='h-[100vh] w-[100vw]'
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=france&maptype=satellite`}>
        </iframe>
    </figure>
    <div className="card-body">
        <div class="flex items-center justify-between">
            <h3 class="card-title">XXXXX's Map</h3>
            <div class="flex items-center">
                <button class="btn btn-primary">Expand</button>
            </div>
        </div>
    </div>
</div>
</div>
<div className="stats w-[95vw] shadow m-[2.5vw]">
<div className="stat">
<div className="stat-figure text-secondary">
<FontAwesomeIcon icon={faEarthAmericas} size="2x"/> 
</div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
        </div>
        <div className="stat-title">New Users</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
        </div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
        </div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
        </div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
        </div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
    <div className="stat">
        <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
        </div>
        <div className="stat-title">New Registers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
</div>
</div>
</motion.div>
) : null;
};
export default Result;