import { React } from 'react'
import propTypes from 'prop-types'

const Carousel = ({ images }) => {
  //Function to get to a specific image
  function goToSlide (slideId) {
    const slideElement = document.querySelector(slideId)
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
    // Rendering the carousel
  return (
    <div className="carousel rounded-2xl w-full h-full">
        <div id="slide1" className="carousel-item relative w-full">
            <img src={images[0]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide4')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide2')} className="btn btn-circle">❯</button>
            </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
            <img src={images[1]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide1')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide3')} className="btn btn-circle">❯</button>
            </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
            <img src={images[2]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide2')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide4')} className="btn btn-circle">❯</button>
            </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
            <img src={images[3]} className="inset-0 w-full h-full object-cover" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={() => goToSlide('#slide3')} className="btn btn-circle">❮</button>
                <button onClick={() => goToSlide('#slide1')} className="btn btn-circle">❯</button>
            </div>
        </div>
    </div>
  )
}

Carousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string)
}

export default Carousel
