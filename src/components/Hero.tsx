"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const hLines = gsap.utils.toArray<HTMLElement>(".hero-grid__h");
    const vLines = gsap.utils.toArray<HTMLElement>(".hero-grid__v");

    // Grid lines start invisible
    gsap.set(hLines, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(vLines, { scaleY: 0, transformOrigin: "center top" });
    gsap.set(gridRef.current, { opacity: 0 });

    // Draw lines in and hold the hero briefly while grid develops
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=20%",       // Very short pin — just enough for grid to develop
        pin: true,          // Holds hero still during grid animation
        anticipatePin: 1,   // Prevents the jump at pin start
        scrub: 1.2,
      },
    });

    // 1. Grid container fades in first
    gridTl.to(gridRef.current, { opacity: 1, duration: 0.1 }, 0);

    // 2. Horizontal lines draw left → right
    hLines.forEach((line, i) => {
      gridTl.to(line, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, i * 0.06);
    });

    // 3. Vertical lines draw top → bottom (slightly offset)
    vLines.forEach((line, i) => {
      gridTl.to(line, { scaleY: 1, duration: 0.7, ease: "power2.inOut" }, i * 0.06 + 0.12);
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero section"
      style={{ paddingTop: "90px" }} // offset for marquee strip
    >
      {/* ── Glow: slow ambient radial that pulses behind the title ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          // Two overlapping radials: warm amber + cool blue-white
          background:
            "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(196, 148, 70, 0.22) 0%, transparent 70%), " +
            "radial-gradient(ellipse 40% 35% at 50% 50%, rgba(255, 220, 140, 0.10) 0%, transparent 60%)",
          animation: "heroPulse 5s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      {/* ── Architectural grid — drawn in by scroll ── */}
      <div ref={gridRef} className="hero-grid" aria-hidden="true">
        {/* Horizontal lines */}
        <div className="hero-grid__h" style={{ top: "15%" }} />
        <div className="hero-grid__h" style={{ top: "30%" }} />
        <div className="hero-grid__h" style={{ top: "50%" }} />
        <div className="hero-grid__h" style={{ top: "70%" }} />
        <div className="hero-grid__h" style={{ top: "85%" }} />
        {/* Vertical lines */}
        <div className="hero-grid__v" style={{ left: "10%" }} />
        <div className="hero-grid__v" style={{ left: "25%" }} />
        <div className="hero-grid__v" style={{ left: "50%" }} />
        <div className="hero-grid__v" style={{ left: "75%" }} />
        <div className="hero-grid__v" style={{ left: "90%" }} />
      </div>

      {/* ── Content — always fully visible ── */}
      <div
        className="hero__content flex flex-col items-center justify-center gap-6"
        style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}
      >
        {/* Main Title */}
        <div className="flex flex-col items-center leading-none tracking-normal">
          <span className="font-serif text-[4rem] sm:text-[7rem] md:text-[9.5rem] text-[var(--foreground)] tracking-[0.1em] font-normal leading-[0.85]">
            ADZE
          </span>
          <span className="font-serif italic text-[var(--accent)] text-[2.5rem] sm:text-[4.5rem] md:text-[6rem] -my-2 sm:-my-4 md:-my-6 pr-4 sm:pr-8">
            &amp;
          </span>
          <span className="font-serif text-[4rem] sm:text-[7rem] md:text-[9.5rem] text-[var(--foreground)] tracking-[0.1em] font-normal leading-[0.85]">
            AXIS
          </span>
        </div>

        {/* Studio label */}
        <div className="flex flex-col items-center w-full mt-8">
          <div className="w-[120px] sm:w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40 mb-5" />
          <span className="uppercase tracking-[0.6em] text-[var(--muted)] text-[10px] sm:text-xs md:text-[0.85rem] mb-12">
            S T U D I O
          </span>
        </div>

        {/* Scroll cue */}
        <div className="hero__scroll-cue mt-8 md:mt-16" aria-hidden="true">
          <span className="hero__scroll-line hidden md:block" />
          <span className="hero__scroll-label hidden md:block">Scroll</span>
        </div>
      </div>
    </section>
  );
}
