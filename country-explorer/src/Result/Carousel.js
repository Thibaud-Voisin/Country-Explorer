import {React, useState, useEffect}  from 'react';


const Carousel = ({ Images, isCountryRetrieved }) => {
    const [currentImg, setCurrentImg] = useState(1);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (isCountryRetrieved) {
        const interval = setInterval(() => {
          setCount(prevCount => prevCount + 1);
          const nextImg = (currentImg % 4) + 1;
          goToSlide('#slide' + nextImg);
        }, 4000);
    
        return () => clearInterval(interval);
      }
    }, [currentImg, isCountryRetrieved]);
    
    function goToSlide(slideId) {
      const slideElement = document.querySelector(slideId);
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentImg(parseInt(slideId.slice(-1)));
      }
    }
  return (
    <div className="carousel rounded-2xl w-full h-full">
        <div id="slide1" className="carousel-item relative w-full">
            <img src={Images[0]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide4')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide2')} className="btn btn-circle">❯</button>
            </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
            <img src={Images[1]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide1')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide3')} className="btn btn-circle">❯</button>
            </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
            <img src={Images[2]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide2')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide4')} className="btn btn-circle">❯</button>
            </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
            <img src={Images[3]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide3')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide1')} className="btn btn-circle">❯</button>
            </div>
        </div>
    </div>
  );
};

export default Carousel;