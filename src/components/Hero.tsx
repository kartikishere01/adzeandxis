"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ken Burns — slow cinematic scale on the background image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.0 },
        { scale: 1.12, duration: 22, ease: "none", repeat: -1, yoyo: true, force3D: true }
      );

      // Overlay fades in gently on load
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 2.5, ease: "power2.out" });

      // ── LOAD ENTRY: studio name slams in from below ──
      const entryTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      entryTl
        .fromTo(headlineRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.6, delay: 0.1 }
        )
        .fromTo(subtextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.9"
        )
        // Scroll cue fades in last
        .fromTo(scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );

      // ── SCROLL: architectural grid draws in as user starts scrolling ──
      const hLines = gsap.utils.toArray<HTMLElement>(".hero-grid__h");
      const vLines = gsap.utils.toArray<HTMLElement>(".hero-grid__v");

      gsap.set(hLines, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(vLines, { scaleY: 0, transformOrigin: "center center" });
      gsap.set(gridRef.current, { opacity: 0 });

      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=35%",
          scrub: 1.2,
        }
      });

      // Fade the grid container in
      gridTl.to(gridRef.current, { opacity: 1, duration: 0.3, ease: "none" }, 0);

      // Stagger horizontal lines drawing in
      hLines.forEach((line, i) => {
        gridTl.to(line, { scaleX: 1, ease: "power2.out", duration: 1 }, i * 0.08);
      });

      // Stagger vertical lines drawing in
      vLines.forEach((line, i) => {
        gridTl.to(line, { scaleY: 1, ease: "power2.out", duration: 1 }, i * 0.08);
      });

      // Text content fades out gently as section exits
      gridTl.to([headlineRef.current, subtextRef.current, scrollCueRef.current], {
        opacity: 0, y: -30, ease: "power2.in", duration: 0.6
      }, 0.7);

      // Cinematic exit
      gsap.to(bgLayerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: true,
        },
        scale: 0.97,
        opacity: 0.3,
        ease: "none",
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="hero section">
      <div ref={bgLayerRef} className="bg-layer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <div ref={imageRef} className="hero__image">
          <img src="/hero-bg.png" alt="Modern luxury architecture" draggable={false} />
        </div>
      </div>

      <div className="content-layer flex flex-col items-center justify-center" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
        <div ref={overlayRef} className="hero__overlay" style={{ pointerEvents: 'auto' }} />

        {/* Architectural grid — drawn in by scroll */}
        <div ref={gridRef} className="hero-grid" aria-hidden="true">
          {/* Horizontal lines */}
          <div className="hero-grid__h" style={{ top: '15%' }} />
          <div className="hero-grid__h" style={{ top: '30%' }} />
          <div className="hero-grid__h" style={{ top: '50%' }} />
          <div className="hero-grid__h" style={{ top: '70%' }} />
          <div className="hero-grid__h" style={{ top: '85%' }} />
          {/* Vertical lines */}
          <div className="hero-grid__v" style={{ left: '10%' }} />
          <div className="hero-grid__v" style={{ left: '25%' }} />
          <div className="hero-grid__v" style={{ left: '50%' }} />
          <div className="hero-grid__v" style={{ left: '75%' }} />
          <div className="hero-grid__v" style={{ left: '90%' }} />
        </div>

        {/* Content — centered */}
        <div className="hero__content flex flex-col items-center justify-center gap-6" style={{ pointerEvents: 'auto' }}>
          


          {/* Main Title Block */}
          <div ref={headlineRef} className="flex flex-col items-center leading-none tracking-normal opacity-0" style={{ transform: 'translateY(80px)' }}>
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

          {/* Studio Divider */}
          <div ref={subtextRef} className="flex flex-col items-center w-full mt-8 opacity-0" style={{ transform: 'translateY(30px)' }}>
            <div className="w-[120px] sm:w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40 mb-5" />
            <span className="uppercase tracking-[0.6em] text-[var(--muted)] text-[10px] sm:text-xs md:text-[0.85rem] mb-12">
              S T U D I O
            </span>
          </div>

          {/* Scroll cue */}
          <div ref={scrollCueRef} className="hero__scroll-cue mt-8 md:mt-16" aria-hidden="true">
            <span className="hero__scroll-line hidden md:block" />
            <span className="hero__scroll-label hidden md:block">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
