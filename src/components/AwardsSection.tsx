"use client";

import { useState } from "react";

const awards = [
  {
    image: "/awards/image_1.jpeg",
    alt: "Luxury Gaming Zone Interior Award 1"
  },
  {
    image: "/awards/image_2.jpeg",
    alt: "Luxury Gaming Zone Interior Award 2"
  }
];

export default function AwardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === awards.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? awards.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full min-h-screen bg-[#111] border-y border-[rgba(255,255,255,0.02)] z-10 py-24 md:py-32 flex flex-col justify-center">
      {/* Title Container - kept in normal flow so it never overlaps the image */}
      <div className="w-full px-6 md:px-12 xl:px-24 mb-12 flex flex-col items-start z-30">
         <span className="font-condensed uppercase tracking-[0.4em] text-xs md:text-base lg:text-lg text-[var(--muted)] opacity-50 block mb-2 md:mb-4">
           Honours &amp; Awards
         </span>
         <span className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-[var(--foreground)] opacity-80">
           Recognition
         </span>
      </div>

      <div className="flex flex-col items-center justify-center w-full px-[5%] md:px-[8%] z-20">
        
        {/* Slideshow Container */}
        <div className="w-full max-w-4xl aspect-[4/3] md:aspect-[3/2] relative mx-auto rounded-lg overflow-hidden shadow-2xl bg-black/20">
          {awards.map((award, index) => (
            <img 
              key={index}
              src={award.image} 
              alt={award.alt} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
              draggable={false} 
              loading="lazy"
            />
          ))}
        </div>

        {/* Navigation Arrows & Description */}
        <div className="flex flex-col items-center justify-center gap-8 mt-10 text-center">
          {/* Navigation arrows directly under the image */}
          <div className="flex items-center gap-6">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <p className="font-serif italic text-lg md:text-xl lg:text-2xl tracking-wide text-[var(--foreground)] opacity-90 max-w-2xl px-4">
            "Honored with the Luxury Gaming Zone Interior Award, presented by Aparshakti Khurrana"
          </p>
        </div>

      </div>
    </section>
  );
}
