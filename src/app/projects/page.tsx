"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

// Simple custom SVG icons
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
);

// Inner component to safely manage localized state for each project's sub-gallery
function ProjectSlide({ project, idx, total }: { project: any, idx: number, total: number }) {
  const [imgIndex, setImgIndex] = useState(0);
  
  // Safe fallback ensuring we have a usable array of images
  const images = project.gallery?.length > 0 ? project.gallery : [project.heroImage];

  const handleNextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex(i);
  };

  return (
    <div 
      className="gallery-slide w-screen flex-shrink-0 h-[100dvh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Ambient Glow Behind Image */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: '65vw',
          height: '65vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background: 'radial-gradient(ellipse at center, rgba(200,160,100,0.18) 0%, rgba(180,130,80,0.10) 35%, transparent 70%)',
          filter: 'blur(48px)',
          borderRadius: '50%',
        }}
      />

      {/* Centered Prominent Active Image Container */}
      <div className="relative w-full max-w-[85vw] md:max-w-[55vw] lg:max-w-[45vw] aspect-[4/5] md:aspect-[3/2] overflow-hidden rounded-md shadow-[0_30px_70px_rgba(0,0,0,0.4)] group z-10">
        
        {/* Link Wrapper acts as boundary */}
        <Link href={`/projects/${project.slug}`} className="block w-full h-full cursor-pointer relative">
          
          {/* Stack all images absolutely. Only the active index is opaque. */}
          {images.map((img: string, i: number) => (
            <img 
              key={i}
              src={img} 
              alt={`${project.title} - Image ${i + 1}`}
              style={{
                opacity: i === imgIndex ? 1 : 0,
                zIndex: i === imgIndex ? 10 : 0
              }}
              // Scale buffer is needed to prevent clipping during horizontal parallax scrub
              className={`gallery-img absolute inset-0 w-full h-full object-cover origin-center scale-[1.2] transition-opacity duration-700 pointer-events-auto`}
              draggable={false}
            />
          ))}

        </Link>

        {/* Hover-revealed Inner Controls */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-6 z-20 flex justify-between items-center px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            
            {/* Arrows */}
            <div className="flex gap-2 pointer-events-auto">
               <button 
                 onClick={handlePrevImg} 
                 className="p-2 md:p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/70 hover:scale-105 transition-all shadow-lg"
                 aria-label="Previous Image"
                >
                  <ChevronLeft />
               </button>
               <button 
                 onClick={handleNextImg} 
                 className="p-2 md:p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/70 hover:scale-105 transition-all shadow-lg"
                 aria-label="Next Image"
                >
                  <ChevronRight />
               </button>
            </div>
            
            {/* Indicators */}
            <div className="flex gap-2 pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
               {images.map((_: any, i: number) => (
                 <button 
                   key={i}
                   onClick={(e) => handleDotClick(e, i)}
                   className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imgIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/70'}`}
                   aria-label={`Go to image ${i + 1}`}
                 />
               ))}
            </div>
          </div>
        )}
      </div>

      {/* Typography Overlay */}
      <div className="absolute bottom-16 md:bottom-24 left-8 md:left-24 z-10 pointer-events-none mix-blend-difference text-white">
        <h2 className="text-5xl md:text-8xl lg:text-[8rem] font-sans font-bold uppercase tracking-tighter leading-none">
          {project.title}
        </h2>
        <div className="flex gap-4 items-center mt-4 md:mt-6">
          <span className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase opacity-70">
            [{idx + 1} / {total}]
          </span>
          <span className="w-8 md:w-12 h-[1px] bg-white opacity-40" />
          <span className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase opacity-70">
            {project.metadata?.typology || "Selected Work"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.gallery-slide');
    const totalPanels = panels.length;
    
    // Increased scroll distance by 1.5x to reduce scrolling sensitivity 
    const scrollDistance = window.innerHeight * (totalPanels - 1) * 1.5;

    gsap.to(trackRef.current, {
      y: () => -(window.innerHeight * (totalPanels - 1)),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        id: "projects-gallery",
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1, 
        onUpdate: (self) => {
          const index = Math.round(self.progress * (totalPanels - 1));
          if (activeIndexRef.current !== index) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }
        }
      }
    });

  }, { scope: containerRef });

  const navigateTo = (index: number) => {
    if (index < 0 || index >= projects.length) return;
    
    const st = ScrollTrigger.getById("projects-gallery");
    if (st) {
      const distancePerSlide = (st.end - st.start) / (projects.length - 1);
      const targetScroll = st.start + (distancePerSlide * index);
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="w-full bg-[var(--background)] text-[var(--foreground)]">
      
      {/* Pinned Gallery Viewpoint */}
      <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden">
        


        {/* Vertical Sliding Track */}
        <div 
          ref={trackRef} 
          className="flex flex-col w-full will-change-transform"
        >
          {projects.map((project, idx) => (
            <ProjectSlide key={project.slug} project={project} idx={idx} total={projects.length} />
          ))}
        </div>
      </section>



    </main>
  );
}
