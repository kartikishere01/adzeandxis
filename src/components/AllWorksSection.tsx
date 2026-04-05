"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function AllWorksSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const [imgIndexes, setImgIndexes] = useState<Record<string, number>>({});

  useGSAP(() => {
    // A subtle pin effect that momentarily holds the view as the section arrives
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=35%", // Brief pause
        pin: true,
        anticipatePin: 1,
      }
    });
  }, { scope: containerRef });

  const activeProject = projects.find(p => p.slug === activeSlug) || projects[0];
  const currentIndex = imgIndexes[activeSlug] || 0;

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndexes(prev => ({
      ...prev,
      [activeSlug]: (currentIndex + 1) % activeProject.gallery.length
    }));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndexes(prev => ({
      ...prev,
      [activeSlug]: (currentIndex - 1 + activeProject.gallery.length) % activeProject.gallery.length
    }));
  };

  return (
    <section 
      ref={containerRef}
      id="all-works" 
      className="w-full bg-[var(--background)] text-[var(--foreground)] py-32 md:py-48 px-[5%] md:px-[8%] min-h-screen relative z-10"
    >
      <div className="max-w-[1600px] mx-auto">
        
        <h2 className="font-serif text-[clamp(2.5rem,4.5vw,5rem)] tracking-tighter font-light text-[var(--foreground)] opacity-90 mb-16 md:mb-24 text-center w-full relative z-20">
          All Works
        </h2>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-16 lg:gap-24 relative z-20 items-start">
          
          {/* Left Column: Typographic Name List */}
          <div className="lg:col-span-7 flex flex-col items-start gap-y-4 lg:gap-y-6 lg:py-8">
            {projects.map((proj, idx) => (
               <div key={proj.slug} className="transition-transform duration-300 w-full">
                  <Link
                    href={`/projects/${proj.slug}`}
                    onMouseEnter={() => {
                       // Only trigger hover changes securely on desktop
                       if (window.innerWidth >= 1024) {
                         setActiveSlug(proj.slug);
                       }
                    }}
                    onClick={() => setActiveSlug(proj.slug)}
                    className={`font-serif text-[clamp(2.5rem,4.5vw,5rem)] leading-none tracking-tighter transition-all duration-300 inline-block align-middle pb-2 ${
                      activeSlug === proj.slug 
                        ? 'text-[var(--foreground)] opacity-100 scale-[1.02] origin-left drop-shadow-lg' 
                        : 'text-[var(--muted)] opacity-30 hover:opacity-70'
                    }`}
                  >
                     {proj.title}
                  </Link>
                  {idx < projects.length - 1 && (
                     <span className="font-serif text-[clamp(2.5rem,4.5vw,5rem)] leading-none opacity-20 ml-4 lg:ml-8 select-none font-light inline-block align-middle pb-2">
                        /
                     </span>
                  )}
               </div>
            ))}
          </div>

          {/* Right Column: Active Image Viewport (Sticky) */}
          <div className="lg:col-span-5 h-[55vh] lg:h-[70vh] w-full lg:sticky lg:top-32 flex flex-col justify-between border border-[rgba(255,255,255,0.05)] p-4 md:p-6 bg-[#0a0a0a] shadow-2xl">
             
             <Link href={`/projects/${activeProject.slug}`} className="relative w-full h-[85%] overflow-hidden group block cursor-pointer bg-[#000]">
                <Image 
                  src={activeProject.gallery[currentIndex]} 
                  alt={activeProject.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                   <span className="bg-[#0d0d0d] text-white text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full shadow-xl border border-white/10">
                      View Project
                   </span>
                </div>
             </Link>

             {/* Controls */}
             <div className="flex items-center justify-between mt-6 px-2 lg:px-4">
                <button 
                  onClick={prevImg}
                  className="p-4 -m-4 text-2xl opacity-40 hover:opacity-100 transition-opacity"
                >
                  &lsaquo;
                </button>

                <div className="flex flex-col items-center">
                   <div className="text-[10px] tracking-[0.2em] uppercase font-condensed mb-1 opacity-80 text-[var(--foreground)]">
                     {activeProject.title}
                   </div>
                   <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)] opacity-50">
                     {currentIndex + 1} / {activeProject.gallery.length}
                   </div>
                </div>

                <button 
                  onClick={nextImg}
                  className="p-4 -m-4 text-2xl opacity-40 hover:opacity-100 transition-opacity"
                >
                  &rsaquo;
                </button>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
