"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [direction, setDirection] = useState(0);

  const Imgs = [
    {
      id: 1,

      img: "/images/cake.jpeg",
    },
    {
      id: 2,

      img: "/images/pancake.jpeg",
    },
    {
      id: 3,

      img: "/images/pizza.jpeg",
    },
    {
      id: 4,

      img: "/images/meatball.jpeg",
    },
    {
      id: 5,

      img: "/images/burger.jpeg",
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % Imgs.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + Imgs.length) % Imgs.length);
  };

  const getVisibleItems = () => {
    const items = [];
    const totalItems = Imgs.length;

    // Add previous 2 items
    for (let i = 2; i > 0; i--) {
      const index = (currentIndex - i + totalItems) % totalItems;
      items.push({ ...Imgs[index], position: -i });
    }

    // Add current item
    items.push({ ...Imgs[currentIndex], position: 0 });

    // Add next 2 items
    for (let i = 1; i <= 2; i++) {
      const index = (currentIndex + i) % totalItems;
      items.push({ ...Imgs[index], position: i });
    }

    return items;
  };

  return (
    <div className="pt-10 mb-10 px-4 overflow-hidden relative">
      <h2 className="text-center md:text-[40px] text-[30px] font-bold mb-6">
        GALLERY
      </h2>

      <div className="relative h-[500px] max-w-6xl mx-auto">
        <div className="relative h-full flex items-center justify-center">
          {getVisibleItems().map((item) => {
            const position = item.position;

            // Enhanced progressive scaling
            let zIndex = 5 - Math.abs(position);

            let opacity, scale, translateX;

            // Adjust scaling and positioning based on distance from center
            if (Math.abs(position) === 0) {
              opacity = 1;
              scale = 1;
              translateX = "0%";
            } else if (Math.abs(position) === 1) {
              opacity = 0.9;
              scale = 0.85;
              translateX = position * 60 + "%";
            } else {
              opacity = 0.8;
              scale = 0.7;
              translateX = position * 63 + "%";
            }

            return (
              <div
                key={item.id}
                className="absolute  transition-all ease-in-out duration-500 md:w-[500px]"
                style={{
                  transform: `translateX(${translateX}) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={item.img}
                   
                    className="h-[400px] w-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg z-30 hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg z-30 hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0 z-40">
        <div className="flex items-center justify-center gap-2">
          {Imgs.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`cursor-pointer transition-all w-2 h-2 rounded-full ${
                currentIndex === i
                  ? "bg-[#EC994b] p-2"
                  : "bg-gray-500 bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;