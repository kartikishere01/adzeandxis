"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

export default function Marquee({ isOpen }: { isOpen: boolean }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  
  // Use GSAP for buttery smooth, un-jerky scrolling, adjusting speed appropriately
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium marquee implementation
      tweenRef.current = gsap.to(".marquee-content", {
        xPercent: -100,
        repeat: -1,
        duration: 90,
        ease: "none",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.15, duration: 1.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 1.5, ease: "power2.out" });
  };

  const items = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="flex items-center space-x-[350px] pr-[350px]">
      <span>Project Discovery Call</span>
      <span className="opacity-40 text-[10px]">&mdash;</span>
    </div>
  ));

  return (
    <Link 
      href="/#contact"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group fixed w-full overflow-hidden mix-blend-difference text-white border-b border-[rgba(255,255,255,0.05)] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto z-[90] ${isOpen ? "translate-y-[70px] md:translate-y-[80px]" : "translate-y-0"}`}
      style={{ top: 0, textDecoration: 'none' }}
    >
      <div 
        className="flex whitespace-nowrap overflow-hidden items-center uppercase py-[10px] md:py-3 font-light" 
        style={{ 
          fontFamily: 'var(--font-condensed), sans-serif', 
          letterSpacing: '0.45em', 
          fontSize: '0.7rem' 
        }}
      >
         <div className="marquee-content flex px-12">
            {items}
         </div>
         <div className="marquee-content flex px-12" aria-hidden="true">
            {items}
         </div>
      </div>
    </Link>
  );
}
