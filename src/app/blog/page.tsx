"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { newsroom } from "@/lib/data";

export default function BlogLandingPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth staggering entrance for all header text and grid items
      gsap.fromTo(
        ".fade-up",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.4, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: 0.2 // allow navbar to settle initially
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef} 
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-40 pb-48 px-6 md:px-12 xl:px-24"
    >
      {/* ── HEADER ── */}
      <header className="max-w-[1600px] mx-auto mb-32 md:mb-48 border-b border-[rgba(255,255,255,0.05)] pb-12 md:pb-24">
        <h1 className="fade-up opacity-0 font-serif text-6xl md:text-8xl lg:text-[10.5rem] tracking-tight leading-none mb-8 text-[var(--foreground)]">
          Newsroom
        </h1>
        <p className="fade-up opacity-0 uppercase tracking-[0.3em] font-condensed text-[10px] md:text-sm text-[var(--muted)] max-w-lg leading-[1.8] pt-4">
          Curated journal of space, material, and architectural silence.
        </p>
      </header>

      {/* ── STATIC ASYMMETRICAL GRID ── */}
      <section className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-x-12 md:gap-y-32">
        {newsroom.map((article, idx) => {
          // High-end editorial breakdown:
          // The first article acts as the massive feature.
          const isFeatured = idx === 0;
          const colSpan = isFeatured ? "md:col-span-8 md:col-start-1" : "md:col-span-6";
          const aspectRatio = isFeatured ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/5] md:aspect-square";
          
          return (
            <Link 
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={`fade-up opacity-0 group flex flex-col gap-6 md:gap-10 outline-none cursor-pointer ${colSpan}`}
            >
              {/* Massive Image Container */}
              <div className={`w-full overflow-hidden relative ${aspectRatio}`}>
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover filter brightness-[0.8] grayscale-[0.3] transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>

              {/* Text Information Below Image */}
              <div className="flex flex-col gap-4 md:gap-6 border-t border-[rgba(255,255,255,0.08)] pt-6 md:pt-8 w-full">
                 <div className="font-condensed uppercase tracking-[0.2em] text-[10px] md:text-xs text-[var(--muted)] opacity-60 flex items-center gap-4">
                    <span>{article.date}</span>
                    <span className="opacity-50">&mdash;</span>
                    <span>{article.author}</span>
                 </div>
                 
                 <h2 className={`font-serif tracking-tight text-[var(--foreground)] group-hover:opacity-75 transition-opacity duration-500 ${isFeatured ? 'text-4xl md:text-6xl leading-[1.1]' : 'text-3xl md:text-4xl leading-[1.1]'}`}>
                    {article.title}
                 </h2>
                 
                 <p className="font-sans text-sm md:text-base text-[var(--muted)] opacity-70 font-light leading-[1.8] max-w-xl mt-2">
                    {article.excerpt}
                 </p>
              </div>
            </Link>
          );
        })}
      </section>

    </main>
  );
}
