"use client";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const slideCount = sliderData.length || 0;
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);

  // autoplay
  useEffect(() => {
    if (slideCount <= 1) return;
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideCount]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentSlide((prev) => (slideCount ? (prev + 1) % slideCount : 0));
      }
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // pause on hover / focus
  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };
  const handleIndicatorKey = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSlideChange(index);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentSlide((prev) => (slideCount ? (prev + 1) % slideCount : 0));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentSlide((prev) => (slideCount ? (prev - 1 + slideCount) % slideCount : 0));
    }
  };

  if (!slideCount) return null;

  return (
    <div
      className="overflow-hidden relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      role="region"
      aria-label="Promotional slider"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slideCount * 100}%`,
        }}
      >
        {sliderData.map((slide, index) => (
          <section
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
            aria-hidden={currentSlide !== index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
          >
            <div className="md:pl-8 mt-10 md:mt-0 flex-1">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 gap-3">
                <button
                  type="button"
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium"
                >
                  {slide.buttonText1}
                </button>

                <button
                  type="button"
                  className="group flex items-center gap-2 px-6 py-2.5 font-medium"
                >
                  {slide.buttonText2}
                  <Image
                    src={assets.arrow_icon}
                    alt="arrow"
                    width={18}
                    height={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center flex-1">
              {/* provide reasonable width/height for Next/Image */}
              <Image
                src={slide.imgSrc}
                alt={`${slide.title}`}
                width={520}
                height={360}
                className="md:w-72 w-48 object-contain"
                priority={index === 0}
              />
            </div>
          </section>
        ))}
      </div>

      {/* indicators */}
      <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Slide indicators">
        {sliderData.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSlideChange(index)}
            onKeyDown={(e) => handleIndicatorKey(e, index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : "false"}
            className={`h-2 w-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
