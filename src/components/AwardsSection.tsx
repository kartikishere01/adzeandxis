"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const awards = [
  {
    year: "2026",
    title: "AIA National Architecture Firm Award",
    project: "The Glass Pavilion",
    image: "/project_01.png",
    body: "National Architecture"
  },
  {
    year: "2025",
    title: "The Pritzker Prize (Shortlist)",
    project: "Skyward Residence",
    image: "/project_02.png",
    body: "Pritzker Foundation"
  },
  {
    year: "2024",
    title: "RIBA International Excellence",
    project: "Brutalist Museum",
    image: "/project_04.png",
    body: "Royal Institute of British Architects"
  },
  {
    year: "2023",
    title: "Building of the Year",
    project: "Vaulted Cellars",
    image: "/project_06.png",
    body: "World Architecture Festival"
  }
];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      const section = sectionRef.current;
      if (!wrapper || !section) return;

      const getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

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

      <div 
        ref={scrollWrapperRef} 
        className="flex flex-nowrap h-full items-center pt-32 w-max px-6 md:px-24"
      >
        {awards.map((award, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] flex flex-col justify-center border-l border-[rgba(255,255,255,0.1)] pl-8 md:pl-16 mr-16 md:mr-32 relative group"
          >
            {/* The Huge Background Year */}
            <div className="absolute top-0 md:top-[-2rem] left-2 md:left-4 font-serif text-[10rem] md:text-[16rem] lg:text-[20rem] font-light text-[var(--foreground)] opacity-[0.03] leading-none pointer-events-none -z-10 tracking-tighter mix-blend-overlay">
              {award.year}
            </div>

            <div className="flex flex-col h-full justify-between pb-8">
              <div className="flex flex-col gap-8 w-full">
                 <span className="text-[var(--accent)] font-condensed tracking-[0.2em] text-xs md:text-sm uppercase opacity-90">
                   {award.body} &mdash; {award.year}
                 </span>
                 <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] z-10 text-[var(--foreground)] max-w-xl">
                   {award.title}
                 </h3>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-end z-10 mt-12 md:mt-24">
                 <div className="w-40 md:w-56 aspect-[4/5] overflow-hidden relative border border-[rgba(255,255,255,0.05)]">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                   <img 
                     src={award.image} 
                     alt={award.project} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                     draggable={false} 
                   />
                 </div>
                 <div className="flex flex-col gap-2 pb-2">
                   <span className="font-condensed uppercase tracking-[0.2em] text-[10px] text-[var(--muted)] opacity-50">
                     Awarded Project
                   </span>
                   <span className="font-serif italic text-xl md:text-2xl text-[var(--foreground)] opacity-90">
                     {award.project}
                   </span>
                 </div>
              </div>
            </div>
            
          </div>
        ))}
        {/* End spacing block to let it scroll fully past screen */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>
    </section>
  );
}
