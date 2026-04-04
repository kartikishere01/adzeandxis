"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/data";

// An organically scattered arrangement spread across a very tall scrolling container.
// Heights and speeds vary considerably to allow intentional, cinematic overlapping during scroll.
const LAYOUT = [
  { top: "10vh", left: "4vw", width: "24vw", speed: 0.3 },
  { top: "80vh", left: "70vw", width: "16vw", speed: 0.1 },
  { top: "140vh", left: "32vw", width: "14vw", speed: 0.6 },
  { top: "180vh", left: "80vw", width: "15vw", speed: -0.15 }, // Slower, creating deep parallax
  { top: "240vh", left: "8vw", width: "22vw", speed: 0.4 },
  { top: "290vh", left: "55vw", width: "20vw", speed: 0.2 },
  { top: "350vh", left: "25vw", width: "15vw", speed: -0.1 },
  { top: "400vh", left: "82vw", width: "12vw", speed: 0.5 },
  { top: "450vh", left: "45vw", width: "17vw", speed: 0.3 },
  { top: "510vh", left: "10vw", width: "26vw", speed: 0.1 },
  { top: "560vh", left: "68vw", width: "18vw", speed: 0.55 },
];

export default function AllWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Flatten all gallery images from all projects 
  const floatingItems = projects.flatMap(p => 
    p.gallery.map(img => ({ img, slug: p.slug, title: p.title }))
  );

  useGSAP(() => {
    const images = gsap.utils.toArray<HTMLElement>('.aw-parallax-img');

    images.forEach((img) => {
      const speed = parseFloat(img.dataset.speed || "0");
      
      // 1. Reveal Animation: Fade in and scale up natively as they enter the bottom of the viewport
      gsap.fromTo(img, 
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, 
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%", // Trigger when top of image hits 90% down the viewport
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Variable Parallax Animation: Add an extra Y translation scrubbed by scroll
      if (speed !== 0) {
        gsap.to(img, {
          y: () => -window.innerHeight * speed, 
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top", 
            scrub: true,
          }
        });
      }
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="all-works" 
      // Made section explicitly tall (approx 650vh to house the 560vh+ items) to allow native native fluid scrolling
      className="relative w-full bg-[var(--background)] text-[var(--foreground)]"
      style={{ height: '700vh' }} 
    >
      
      {/* 
        Sticky Header Container 
        Remains firmly planted in the center of the viewport for duration of the section.
      */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center pointer-events-none z-30">
        <h2 
          className="font-sans font-bold text-[clamp(4rem,10vw,12rem)] tracking-tight flex items-start leading-none uppercase text-shadow-xl drop-shadow-2xl"
          style={{ textShadow: "0 10px 40px rgba(0,0,0,0.8)" }}
        >
          All Work 
        </h2>
      </div>

      {/* 
        Asymmetrical Scattered Grid Canvas
        Items are placed manually across the massive 700vh canvas. 
      */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none overflow-hidden">
        {floatingItems.map((item, i) => {
          // Wrap layout access safely if gallery expands
          const layout = LAYOUT[i % LAYOUT.length];
          
          return (
            <div 
              key={`${item.slug}-${item.img}-${i}`} 
              className="aw-parallax-img absolute pointer-events-auto cursor-pointer"
              data-speed={layout.speed}
              style={{
                top: layout.top,
                left: layout.left,
                width: layout.width,
              }}
            >
              <Link href={`/projects/${item.slug}`} className="block">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-auto object-cover opacity-90 transition-all hover:scale-105 hover:opacity-100 duration-500 shadow-2xl" 
                  loading="lazy"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
