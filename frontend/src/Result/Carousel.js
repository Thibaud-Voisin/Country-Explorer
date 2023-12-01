import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Carousel = ({ images }) => {
  const carouselElement = useRef(null)
  const [currentImage, setCurrentImage] = useState(0)
  const carouselWidth = carouselElement.current ? carouselElement.current.clientWidth : 0

  const scrollCarousel = (targetImageNumber) => {
    const target = targetImageNumber < 0 ? images.length - 1 : targetImageNumber % images.length
    setCurrentImage(target)
    const targetXPixel = carouselWidth * target
    carouselElement.current.scrollTo({
      left: targetXPixel,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const nextImage = (currentImage + 1) % images.length
      setCurrentImage(nextImage)
      scrollCarousel(nextImage)
    }, 4000)

    return () => clearInterval(timer)
  }, [currentImage, images.length])

  return (
    <div className="carousel rounded-2xl w-full h-full" ref={carouselElement}>
      {images.map((image, index) => (
        <div key={`slide${index}`} className="carousel-item relative w-full">
          <img src={image} className="inset-0 w-full h-full object-cover" alt={`Slide ${index + 1}`} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button onClick={() => scrollCarousel(index - 1)} className="btn btn-circle">
              ❮
            </button>
            <button onClick={() => scrollCarousel(index + 1)} className="btn btn-circle">
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Carousel
