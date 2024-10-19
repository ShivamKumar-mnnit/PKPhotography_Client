import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 3; // Total number of slides

  const images = [
    "https://b3700355.smushcdn.com/3700355/wp-content/uploads/2024/08/5S1A0468_h-3.jpg?lossy=2&strip=1&webp=1",
    "https://b3700355.smushcdn.com/3700355/wp-content/uploads/2024/08/1-3.jpg?lossy=2&strip=1&webp=1",
    "/PKP_2014.jpg"
  ];

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div id="default-carousel" className="relative w-full h-full" data-carousel="slide">
      <div className="relative h-full overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-100 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
            data-carousel-item
          >
            <img
              src={src}
              className="absolute block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
