"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailClientProps {
  project: {
    title: string;
    description: string;
    conceptText?: string;
    heroImage: string;
    gallery: string[];
    metadata: {
      location: string;
      year: string;
      typology: string;
    };
  };
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const images = [project.heroImage, ...(project.gallery || [])];

  const currentNum = String(imgIndex + 1).padStart(2, '0');
  const totalNum = String(images.length).padStart(2, '0');

  const nextImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full h-auto min-h-[100dvh] lg:h-[100dvh] bg-[#0d0d0d] text-[#f0ece4] flex flex-col lg:overflow-hidden font-sans">
      
      {/* Top Bar */}
      <div className="relative h-16 flex-shrink-0 flex items-center justify-center border-b border-[#f0ece4]/10" style={{ borderWidth: '0.5px', padding: '0.9rem 1.2rem' }}>
        <div className="hidden sm:block absolute left-6 lg:left-12 text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50">
          PORTFOLIO &mdash; PROJECT DETAIL
        </div>
        <Link href="/projects" className="text-4xl md:text-5xl font-light hover:opacity-70 transition-opacity pb-1 mt-1">
          &times;
        </Link>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col-reverse lg:flex-row lg:overflow-hidden relative">
        
        {/* Left Panel */}
        <div 
          className="w-full lg:w-[40%] flex-shrink-0 h-auto lg:h-full border-t lg:border-t-0 lg:border-r border-[#f0ece4]/10 flex flex-col justify-between px-6 py-8 md:px-12 lg:px-16 lg:py-16 lg:overflow-y-auto z-20 bg-[#0d0d0d]"
          style={{ borderWidth: '0.5px' }}
        >
          <div>
            <h1 className="text-[clamp(22px,6vw,42px)] lg:text-7xl font-light uppercase tracking-tighter leading-[1.1] lg:leading-[0.9] mb-8 lg:mb-12">
              {project.title}
            </h1>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 lg:flex lg:flex-wrap lg:gap-16 text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-70">
              <div className="flex flex-col gap-2">
                <span className="opacity-50">Location</span>
                <span>{project.metadata.location}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-50">Year</span>
                <span>{project.metadata.year}</span>
              </div>
              <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
                <span className="opacity-50">Typology</span>
                <span>{project.metadata.typology}</span>
              </div>
            </div>

            <div className="w-full border-t border-[#f0ece4]/10 my-8 lg:my-12" style={{ borderWidth: '0.5px' }} />

            <div>
              <div className="text-[9px] uppercase tracking-[0.2em] opacity-50 mb-4">CONCEPT</div>
              <div 
                className="relative overflow-hidden" 
                style={{
                  maxHeight: expanded ? `${contentRef.current?.scrollHeight || 1000}px` : '78px',
                  transition: 'max-height 0.5s cubic-bezier(0.77, 0, 0.18, 1)'
                }}
              >
                <div 
                  ref={contentRef}
                  className="text-[13px] lg:text-base font-sans leading-[1.8] lg:leading-relaxed opacity-80"
                >
                  {project.conceptText || project.description}
                </div>
                
                <div 
                  className={`absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none transition-opacity duration-300 ease-out ${expanded ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
              
              <button 
                onClick={() => setExpanded(!expanded)}
                className="mt-6 w-full lg:w-auto text-center lg:text-left text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity border-b border-[#f0ece4]/10 pb-1"
                style={{ borderWidth: '0.5px' }}
              >
                {expanded ? 'COLLAPSE ↑' : 'FULL DESCRIPTION ↓'}
              </button>
            </div>
          </div>

          <div className="mt-12 lg:mt-16 text-center lg:text-left text-[9px] md:text-[10px] tracking-[0.2em] opacity-50 uppercase">
             {currentNum} / {totalNum} &mdash; PROJECT VIEW
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:flex-1 flex-shrink-0 h-[48vh] lg:h-full relative p-4 pb-16 lg:p-12 bg-[#0d0d0d]">
          <div 
            className="absolute top-4 right-4 lg:top-8 lg:right-8 z-10 text-[8px] lg:text-[10px] uppercase tracking-[0.2em] border border-[#f0ece4]/10 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 bg-[#0d0d0d]/30 backdrop-blur-md opacity-60 cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setLightboxOpen(true)}
            style={{ borderWidth: '0.5px' }}
          >
            VIEW FULL
          </div>
          
          <div 
            className="w-full h-full relative cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
             <Image 
               src={images[imgIndex]} 
               alt={`${project.title} view ${imgIndex + 1}`}
               fill 
               className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
             />
          </div>

          {/* Bottom Nav Bar */}
          <div className="absolute bottom-0 left-0 w-full px-4 lg:px-12 pb-4 lg:pb-8 flex items-center justify-between pointer-events-none z-10">
            <button 
               onClick={prevImg}
               className="pointer-events-auto text-[8px] lg:text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
            >
               &larr; PREV
            </button>
            
            <div className="pointer-events-auto flex items-center gap-1.5 lg:gap-3 bg-[#0d0d0d]/80 backdrop-blur-lg p-1.5 lg:p-2 border border-[#f0ece4]/10 rounded-sm" style={{ borderWidth: '0.5px' }}>
               {images.map((img, i) => (
                 <button 
                   key={i} 
                   onClick={() => setImgIndex(i)}
                   className={`relative w-[28px] h-[18px] lg:w-14 lg:h-8 overflow-hidden transition-all duration-300 rounded-[2px] ${i === imgIndex ? 'border border-[#f0ece4] scale-110 opacity-100' : 'border border-[#f0ece4]/20 opacity-40 hover:opacity-80'}`}
                   style={i === imgIndex ? { borderWidth: '1px' } : { borderWidth: '0.5px' }}
                 >
                    <Image src={img} alt="thumb" fill className="object-cover" />
                 </button>
               ))}
            </div>

            <button 
               onClick={nextImg}
               className="pointer-events-auto text-[8px] lg:text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
            >
               NEXT &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0d0d0d]/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
           {/* Top Actions Wrapper */}
           <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-6 z-30 pointer-events-none">
              <button 
                onClick={() => setLightboxOpen(false)}
                className="pointer-events-auto text-3xl lg:text-4xl font-light opacity-60 hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
              
              <button 
                onClick={() => setZoom(!zoom)}
                className="pointer-events-auto text-[9px] lg:text-[10px] uppercase tracking-[0.2em] border border-[#f0ece4]/10 px-4 py-2 hover:bg-[#f0ece4] hover:text-[#0d0d0d] transition-colors rounded-full"
                style={{ borderWidth: '0.5px' }}
              >
                {zoom ? 'ZOOM OUT' : 'ZOOM IN'}
              </button>
           </div>

           <div className="w-[92vw] h-[55vh] lg:w-full lg:h-full relative flex items-center justify-center mt-8 lg:mt-0 lg:p-24" onClick={() => setZoom(!zoom)}>
              {/* Inner Arrows */}
              <div className="absolute top-1/2 left-0 lg:left-8 -translate-y-1/2 z-20">
                <button onClick={(e) => { e.stopPropagation(); prevImg(e); }} className="p-2 lg:p-4 text-2xl lg:text-3xl opacity-50 hover:opacity-100 transition-opacity">&lsaquo;</button>
              </div>
              
              <div className="absolute top-1/2 right-0 lg:right-8 -translate-y-1/2 z-20">
                <button onClick={(e) => { e.stopPropagation(); nextImg(e); }} className="p-2 lg:p-4 text-2xl lg:text-3xl opacity-50 hover:opacity-100 transition-opacity">&rsaquo;</button>
              </div>

              <Image 
                 src={images[imgIndex]} 
                 alt="Enlarged" 
                 fill 
                 className={`transition-all duration-500 ease-out cursor-zoom-${zoom ? 'out' : 'in'} ${zoom ? 'object-cover' : 'object-contain'}`}
              />
           </div>

           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase opacity-50 z-20 text-center w-full">
             {currentNum} / {totalNum} &mdash; PROJECT IMAGE
           </div>
        </div>
      )}
    </div>
  );
}
