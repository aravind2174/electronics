import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Samsung 8K QLED TVs',
      subtitle: 'Experience the Future of Entertainment',
      description: 'Ultra-high definition with AI-powered 8K upscaling and quantum dot technology',
      image: 'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg',
      cta: 'Shop 8K TVs',
      discount: 'Up to 25% off'
    },
    {
      id: 2,
      title: 'OLED Technology',
      subtitle: 'Perfect Blacks, Infinite Contrast',
      description: 'Self-lit pixels deliver true blacks and vibrant colors for cinematic experience',
      image: 'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg',
      cta: 'Explore OLED',
      discount: 'Starting ₹99,999'
    },
    {
      id: 3,
      title: 'Smart TV Collection',
      subtitle: 'Intelligence Meets Entertainment',
      description: 'Stream, game, and browse with built-in smart platforms and voice control',
      image: 'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg',
      cta: 'Shop Smart TVs',
      discount: 'Free Installation'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <div className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full mb-4">
                    {slide.discount}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-4">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors group">
                    {slide.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;