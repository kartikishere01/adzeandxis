"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export default function AboutPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".preview-fade-up",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-[5vw] lg:px-[10vw] py-32 bg-[var(--background)] text-[var(--foreground)] border-t border-[rgba(255,255,255,0.03)]"
    >
      {/* Responsive Container Capped at 1400px */}
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-[1400px] mx-auto">
        <span className="preview-fade-up font-condensed uppercase tracking-[0.3em] text-[10px] md:text-xs text-[var(--accent)] opacity-80 mb-8 border-b border-[rgba(255,255,255,0.05)] pb-4 px-4">
          03 &mdash; The Studio
        </span>
        
        <h2 className="preview-fade-up font-serif text-[clamp(2.5rem,5vw,5.5rem)] tracking-tight leading-[1.15] text-[var(--foreground)] opacity-95">
          "Architecture, interior design, and construction should <span className="italic text-[var(--muted)] opacity-70">never be separated.</span>"
        </h2>
        
        <Link 
          href="/about" 
          className="preview-fade-up group flex flex-col items-center gap-4 mt-20 outline-none cursor-pointer"
        >
          <span className="font-condensed uppercase tracking-[0.25em] text-[10px] md:text-xs text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
            Explore Studio
          </span>
          <span className="w-8 h-[1px] bg-[var(--foreground)] opacity-30 transition-all duration-500 group-hover:w-24 group-hover:bg-[var(--accent)] group-hover:opacity-100" />
        </Link>
      </div>
    </section>
  );
}
