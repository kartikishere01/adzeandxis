"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const awards = [
  {
    year: "2024",
    title: "Luxury Gaming Zone Interior Award",
    project: "Gaming Zone Project",
    image: "/awards/image_1.jpeg",
    body: "Presented by Aparshakti Khurrana"
  },
  {
    year: "2024",
    title: "Luxury Gaming Zone Interior Award",
    project: "Gaming Zone Project",
    image: "/awards/image_2.jpeg",
    body: "Presented by Aparshakti Khurrana"
  }
];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const images = gsap.utils.toArray<HTMLImageElement>(".slideshow-img");
      if (!section || images.length < 2) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%", // Pin for 1 full viewport height
          scrub: 1,
          pin: true,
        }
      });

      // Initialize crossfade states
      gsap.set(images[1], { autoAlpha: 0 });

      tl.to(images[0], { autoAlpha: 0, duration: 1 })
        .to(images[1], { autoAlpha: 1, duration: 1 }, "<");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#111] overflow-hidden border-y border-[rgba(255,255,255,0.02)] z-10"
    >
      {/* Absolute intro tag */}
      <div className="absolute top-12 md:top-24 left-6 md:left-12 xl:left-24 z-20 w-fit">
         <span className="font-condensed uppercase tracking-[0.3em] text-[10px] md:text-sm text-[var(--muted)] opacity-50 block mb-2">
           Honours &amp; Awards
         </span>
         <span className="font-serif italic text-xl md:text-2xl text-[var(--foreground)] opacity-80">
           Recognition
         </span>
      </div>

      <div className="flex h-full items-center justify-center w-full px-6 md:px-24">
        <div className="w-full flex flex-col justify-center items-center relative group pt-24 pb-12">
          {/* Background Year */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[12rem] md:text-[20rem] lg:text-[30rem] font-light text-[var(--foreground)] opacity-[0.03] leading-none pointer-events-none tracking-tighter mix-blend-overlay">
            2024
          </div>

          <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-5xl z-10 text-center">
             <div className="flex flex-col gap-4 w-full items-center">
                <span className="text-[var(--accent)] font-condensed tracking-[0.2em] text-xs md:text-sm uppercase opacity-90 mx-auto">
                 Honored with the Luxury Gaming Zone Interior Award
               </span>
               <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[var(--foreground)] max-w-3xl mx-auto">
                 Luxury Gaming Zone Interior Award
               </h3>
               <p className="font-sans text-sm md:text-base opacity-70 max-w-lg mx-auto">
                 Presented by Aparshakti Khurrana
               </p>
             </div>
             
             <div className="w-full max-w-4xl aspect-[4/3] md:aspect-[3/2] overflow-hidden relative shadow-2xl mx-auto rounded-lg">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-20 pointer-events-none" />
               {awards.map((award, index) => (
                 <img 
                   key={index}
                   src={award.image} 
                   alt={award.project} 
                   className="slideshow-img absolute inset-0 w-full h-full object-cover origin-center transition-transform duration-700 ease-out group-hover:scale-105" 
                   draggable={false} 
                 />
               ))}
             </div>
             
             <div className="flex flex-col gap-2 items-center">
               <span className="font-condensed uppercase tracking-[0.2em] text-[10px] text-[var(--muted)] opacity-50">
                 Awarded Project
               </span>
               <span className="font-serif italic text-xl md:text-2xl text-[var(--foreground)] opacity-90">
                 Gaming Zone Project
               </span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
