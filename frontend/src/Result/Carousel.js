import { React, useRef, useEffect, useState } from 'react'

import propTypes from 'prop-types'

const Carousel = ({ images }) => {
  const carouselElement = useRef(null)
  const [currentImage, setCurrentImage] = useState(0)

  // Function to scroll the carousel
  function scrollCarousel (targetImageNumber) {
    const carouselWidth = carouselElement.current.clientWidth
    const targetImage = targetImageNumber - 1
    const targetXPixel = carouselWidth * targetImage

    carouselElement.current.scrollTo({
      left: targetXPixel,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const nextImage = ((currentImage) % images.length) + 1
      setCurrentImage(nextImage)
      scrollCarousel(nextImage)
    }, 4000)

    return () => clearInterval(timer)
  }, [currentImage, images.length])

  // Rendering the carousel
  return (
    <div className="carousel rounded-2xl w-full h-full" ref={carouselElement}>
            {images.map((image, index) => (
                <div key={`slide${index + 1}`} className="carousel-item relative w-full">
                    <img src={image} className="inset-0 w-full h-full object-cover" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button onClick={() => scrollCarousel(index + 1)} className="btn btn-circle">❮</button>
                        <button onClick={() => scrollCarousel(index + 2 > images.length ? 1 : index + 2)} className="btn btn-circle">❯</button>
                    </div>
                </div>
            ))}
        </div>
  )
}

Carousel.propTypes = {
  images: propTypes.arrayOf(propTypes.string)
}

export default Carousel
