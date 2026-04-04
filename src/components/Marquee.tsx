"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Marquee({ isOpen }: { isOpen: boolean }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Use GSAP for buttery smooth marquee scrolling
  useGSAP(() => {
    tweenRef.current = gsap.to(".marquee-content", {
      xPercent: -100,
      repeat: -1,
      duration: 90,
      ease: "none",
    });
  }, { scope: containerRef });

  // Scroll-based fade: strip fades out when user scrolls down > 30vh
  useEffect(() => {
    const strip = containerRef.current;
    if (!strip) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        strip.style.opacity = "0";
        strip.style.pointerEvents = "none";
      } else {
        strip.style.opacity = "1";
        strip.style.pointerEvents = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.15, duration: 1.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 1.5, ease: "power2.out" });
  };

  const items = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="flex items-center space-x-[350px] pr-[350px]">
      <span>Book a Discovery Call</span>
      <span className="opacity-40 text-[10px]">&mdash;</span>
    </div>
  ));

  return (
    <Link
      href="/contact"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`top-strip group fixed w-full overflow-hidden mix-blend-difference text-white border-b border-[rgba(255,255,255,0.05)] pointer-events-auto z-[90] ${isOpen ? "translate-y-[70px] md:translate-y-[80px]" : "translate-y-0"}`}
      style={{ top: 0, textDecoration: "none" }}
    >
      <div
        className="flex whitespace-nowrap overflow-hidden items-center uppercase py-[10px] md:py-3 font-light"
        style={{
          fontFamily: "var(--font-condensed), sans-serif",
          letterSpacing: "0.45em",
          fontSize: "0.7rem",
        }}
      >
        <div className="marquee-content flex px-12">{items}</div>
        <div className="marquee-content flex px-12" aria-hidden="true">
          {items}
        </div>
      </div>
    </Link>
  );
}
