import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import triangle from './triangle.png';


const Result = ({ theme, isCountryRetrieved }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const svgRef = useRef();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {   
    console.log("----------->",apiKey); 
    const svg = d3.select(svgRef.current);

    // Define the gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'turboGradientVertical')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    // Generate color stops using interpolateTurbo
    for (let i = 0; i <= 1; i += 0.1) {
      gradient.append('stop')
        .attr('offset', `${i * 100}%`)
        .style('stop-color', d3.interpolateTurbo(i));
    }

    // Create a rectangle to display the gradient
    svg.append('rect')
      .attr('width', 50)
      .attr('height', 200)
      .style('fill', 'url(#turboGradientVertical)');
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
  const interpolator = d3.interpolateCubehelixLong.gamma(3)("purple", "orange")


  // Use the interpolator to generate a color at a specific point in the range
  const colorAtPoint = interpolator(0.1);


  return isCountryRetrieved ? (
    <motion.div
      className='result w-[100vw] h-[100vh] relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
<div>
    <div className='ml-[3vw] sub_title_results'>
        <div className="flex items-center title">
            France 
            <img className='w-[3vw] ml-[1vw]' src={"https://flagcdn.com/w320/aw.png"} />  
            <img className='w-[3vw] ml-[1vw]' src={"https://mainfacts.com/media/images/coats_of_arms/si.png"} /> 
        </div>
        <div className='-mt-[3vh]'>
            Aruba
        </div>
    </div>
    <div className="flex items-center">
        <div className="h-[40vh] w-[62.5vw] ml-[2.5vw] bg-red-700 ">
        </div>
        <div className="card card-compact ml-[2.5vw] w-[30vw] bg-base-100 shadow-xl">
            <figure>
                <iframe
                    className='w-[30vw] h-[30vh]'
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=russia&maptype=satellite`}>
                </iframe>
            </figure>
            <div className="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="card-title">Shoes!</h3>
                    <div class="flex items-center">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="stats w-[95vw] shadow m-[2.5vw]">
        <div className="stat">
            <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <div className="flex items-start">
                <svg ref={svgRef} width={50} height={200} className='m-0 p-0'>
                    {/* SVG will be rendered here */}
                </svg>
                <img src={triangle} className='transform rotate-90 -mt-3' alt="My Local Image" />
            </div>
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
    </div>
</div>






      {showButton && (
        <button className="up_btn opacity-80	btn rounded-full absolute bottom-[8vh] right-[2vh] h-[5rem] w-[5rem]" onClick={scrollToTop}>
  <svg width="30" height="50" viewBox="0 0 185 284" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M93 0L184.924 91.9239L166.539 110.309L74.6152 18.3848L93 0Z" fill={theme === 'dark' ? 'black' : 'white'} class="three"/>
    <rect y="93" width="130" height="26" transform="rotate(-45 0 93)" fill={theme === 'dark' ? 'black' : 'white'} class="two"/>
    <rect x="81" y="33" width="26" height="251" fill={theme === 'dark' ? 'black' : 'white'} class="middle" />
  </svg>
</button>
      )}
    </motion.div>
  ) : null;
};

export default Result;
