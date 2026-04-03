"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");

      // We use a massive master timeline that governs the single pinning container.
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 200}%`, 
          pin: true,
          scrub: true,
        }
      });

      panels.forEach((panel, i) => {
        const image = panel.querySelector(".project-image");
        const overlay = panel.querySelector(".project-overlay");
        const title = panel.querySelector(".project-title");
        const description = panel.querySelector(".project-description");

        // Force initial GSAP states
        gsap.set(title, { opacity: 0, y: 60 });
        gsap.set(description, { opacity: 0, y: 30 });
        gsap.set(image, { scale: 1 });

        // Each panel corresponds to 10 absolute time units inside the timeline
        const startTime = i * 10;

        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0 });
          // Concurrent Crossfade IN logic
          masterTl.to(panel, { autoAlpha: 1, duration: 2, ease: "none" }, startTime);
        }

        // 1. IMAGE HOLD (Calm entry is inherently true between `startTime` and `startTime + 1`)
        
        // 2. TITLE REVEAL
        masterTl.to(title, { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, startTime + 1);
        
        // 3. TITLE HOLD 
          
        // 4. DESCRIPTION REVEAL 
        masterTl.to(description, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, startTime + 4.5);

        // 5. IMAGE TRANSITION (Cinematic atmospheric scale stretching the entire sequence)
        masterTl.to(image, { scale: 1.05, duration: 10, ease: "none" }, startTime);

        // 6. EXIT FADE & CROSSFADE WIPE
        if (i < panels.length - 1) {
          // Slide the overlay text up and fade it out just before the crossfade starts
          masterTl.to(overlay, { opacity: 0, y: -20, duration: 1.5 }, startTime + 8.5);
          // Concurrently fade the ENTIRE old panel out mathematically synced with the new panel's fade-in
          masterTl.to(panel, { autoAlpha: 0, duration: 2, ease: "none" }, startTime + 10);
        } else {
          // Final section ends subtly to prep standard scrolling again
          masterTl.to(overlay, { opacity: 0, y: -20, duration: 1.5 }, startTime + 8.5);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full h-[100dvh] bg-black text-white overflow-hidden">
      {/* Absolute Stacked Layer Method allows GSAP to crossfade them while one global `pin` wrapper locks the page */}
      {projects.map((project, idx) => (
        <section 
          key={project.slug} 
          className="project-panel absolute inset-0 w-full h-[100dvh] flex flex-col justify-end overflow-hidden"
          style={{ zIndex: idx }}
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0 bg-black">
            <Image 
              src={project.heroImage} 
              alt={project.title}
              fill
              className="project-image object-cover grayscale opacity-80 origin-center"
              sizes="100vw"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
          </div>

          {/* Foreground UI Overlay */}
          <div className="relative z-10 project-overlay px-6 md:px-12 lg:px-24 pb-20 md:pb-32 w-full max-w-7xl mx-auto">
            <Link 
              href={`/projects/${project.slug}`} 
              className="group flex flex-col gap-8 cursor-pointer outline-none w-full"
            >
              <h2 className="project-title text-5xl md:text-8xl lg:text-[10rem] font-sans tracking-[-0.04em] uppercase leading-none text-white drop-shadow-2xl">
                {project.title}
              </h2>
              
              <div className="project-description flex flex-col gap-10">
                <p className="text-lg md:text-2xl font-sans tracking-wide text-white/80 leading-relaxed max-w-2xl drop-shadow-md">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-6 text-xs md:text-sm font-mono uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="w-12 h-[1px] bg-white/50 group-hover:bg-white inline-block transition-colors duration-500 origin-left scale-x-75 group-hover:scale-x-100" />
                  View Case Study
                </div>
              </div>
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}
