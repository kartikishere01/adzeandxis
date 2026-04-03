"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const bodyTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5, // smooth interpolation instead of 1:1 jitter
          start: "top top",
          end: "+=200%",
          anticipatePin: 1, // prevents the visual jump when pinning starts
        },
      });

      // ── Background slow scale (entire duration) ──
      tl.fromTo(
        imageRef.current,
        { scale: 1.0 },
        { scale: 1.2, duration: 3, ease: "none", force3D: true },
        0
      );

      // ── Label: fade in + rise ──
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", force3D: true },
        0
      );

      // ── Main Text: fade in + rise ──
      tl.fromTo(
        mainTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", force3D: true },
        0.8
      );

      // ── Body Text: fade in + rise ──
      tl.fromTo(
        bodyTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", force3D: true },
        1.6
      );

      // Cinematic Exit Transition
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
    <section ref={sectionRef} id="story" className="story section">
      <div ref={bgLayerRef} className="bg-layer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Background image layer */}
        <div ref={imageRef} className="story__image">
          <img
            src="/story-bg.png"
            alt="Minimalist architectural interior"
            draggable={false}
          />
        </div>
      </div>

      <div className="content-layer flex flex-col items-center justify-center" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
        {/* Dark overlay */}
        <div className="story__overlay" />

        {/* Text lines */}
        <div className="story__content flex flex-col items-center justify-center gap-6 md:gap-10 max-w-4xl mx-auto px-6 text-center" style={{ pointerEvents: 'auto' }}>
          
          <span ref={labelRef} className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-70 text-[var(--foreground)]">
            OUR MOTTO
          </span>

          <h2 ref={mainTextRef} className="font-serif text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.2] font-normal tracking-tight text-[var(--foreground)]">
            We think before we build.<br />
            Then we build what <span className="border-b-[1.5px] border-[var(--foreground)] pb-1 md:pb-2">others</span><br/>
            <span className="border-b-[1.5px] border-[var(--foreground)] pb-1 md:pb-2">can't.</span>
          </h2>

          <p ref={bodyTextRef} className="font-sans text-xs md:text-sm leading-[1.8] max-w-2xl opacity-75 text-[var(--muted)]">
            This is not a boast. It is a methodology. Thinking deeply before acting is what<br className="hidden md:block"/>
            separates architecture from construction, and construction from craft. At<br className="hidden md:block"/>
            Adze &amp; Axis, the thinking never stops — it only becomes more physical.
          </p>

        </div>
      </div>
    </section>
  );
}
