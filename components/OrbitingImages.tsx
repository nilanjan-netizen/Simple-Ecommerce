"use client";
import React, { useEffect, useState } from "react";

interface OrbitingImagesProps {
  images: string[];
  centerImage?: string; // 7th center wali image
}

const OrbitingImages: React.FC<OrbitingImagesProps> = ({ images, centerImage }) => {
  const [rotatingImages, setRotatingImages] = useState(images);

  useEffect(() => {
    const interval = setInterval(() => {
      // har interval pe array ko rotate kar dena
      setRotatingImages((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first]; // pehla last me chala gaya
      });
    }, 10000); // 10s me ek image shift hoga (orbit ke ek round ke sath match karna)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[450px] h-[450px]">
      {/* Center Fixed Image */}
      {centerImage && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-amber-400/70 
                     shadow-2xl bg-white/90 p-2 z-20"
        >
          <img
            src={centerImage}
            alt="Center"
            className="w-full h-full rounded-full object-cover shadow-xl"
          />
        </div>
      )}

      {/* Orbiting Images */}
      {rotatingImages.map((img, index) => {
        const delay = (index * (10 / rotatingImages.length)).toFixed(2) + "s";

        return (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-amber-300/50 
                       shadow-xl bg-white/95 p-2 orbit"
            style={{ animationDelay: delay }}
          >
            <img
              src={img}
              alt={`Orbit ${index + 1}`}
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default OrbitingImages;
