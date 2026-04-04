"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function StorySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const textElements = gsap.utils.toArray<HTMLElement>(".reveal-text");

    // Start texts completely invisible and pushed down slightly
    gsap.set(textElements, { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Pin duration for scrolling texts
        pin: true,
        scrub: 1, // Smooth scrub
        anticipatePin: 1,
      }
    });

    // Stagger reveal of texts
    tl.to(textElements, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.8,
      ease: "power2.out",
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="story" className="story section">
      {/* Background image */}
      <div className="bg-layer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <div className="story__image">
          <img
            src="/blog-1.png"
            alt="Minimalist architectural light and shadow"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>

      <div className="content-layer flex flex-col items-center justify-center" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
        {/* Dark overlay */}
        <div className="story__overlay absolute inset-0 bg-black/75 pointer-events-none" />

        {/* Text */}
        <div className="story__content flex flex-col items-center justify-center gap-6 md:gap-10 max-w-4xl mx-auto px-[5%] md:px-[8%] text-center" style={{ position: 'relative', zIndex: 3 }}>
          
          <div className="reveal-text">
            <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-100 text-[var(--foreground)] drop-shadow-md font-semibold">
              OUR MOTTO
            </span>
          </div>

          <div className="reveal-text">
            <h2 className="font-serif text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[1.2] font-normal tracking-tight text-[var(--foreground)]">
              We think before we build.<br />
              Then we build what <span className="border-b-[1.5px] border-[var(--foreground)] pb-1 md:pb-2">others</span><br/>
              <span className="border-b-[1.5px] border-[var(--foreground)] pb-1 md:pb-2">can&apos;t.</span>
            </h2>
          </div>

          <div className="reveal-text">
            <p className="font-sans text-sm md:text-base leading-[1.8] max-w-2xl opacity-90 text-[var(--foreground)] drop-shadow-md">
              This is not a boast. It is a methodology. Thinking deeply before acting is what<br className="hidden md:block"/>
              separates architecture from construction, and construction from craft. At<br className="hidden md:block"/>
              Adze &amp; Axis, the thinking never stops — it only becomes more physical.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
