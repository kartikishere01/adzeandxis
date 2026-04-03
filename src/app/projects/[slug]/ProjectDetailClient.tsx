"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ProjectDetailClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline();

      // 1. Ken Burns constant slow scale on hero image
      const heroImage = document.querySelector(".hero-image");
      if (heroImage) {
        gsap.to(heroImage, {
          scale: 1.08,
          duration: 15,
          ease: "none"
        });
      }

      // 2. Fade/slide in hero text on load
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        masterTl.fromTo(
          heroContent,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
          0.3
        );
      }

      // 3. Intro fade on scroll
      const introText = document.querySelector(".intro-text");
      if (introText) {
        gsap.fromTo(
          introText,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introText,
              start: "top 85%",
            }
          }
        );
      }

      // 4. Split section staggered entry
      const splitText = document.querySelector(".split-text");
      const splitImage = document.querySelector(".split-image");
      if (splitText && splitImage) {
        const splitTl = gsap.timeline({
          scrollTrigger: {
            trigger: splitText,
            start: "top 80%",
          }
        });
        
        splitTl.fromTo(splitText, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
               .fromTo(splitImage, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, "-=0.8");
      }

      // 5. Image Story true parallax (scaling internal image up and shifting it)
      const storyImages = gsap.utils.toArray<HTMLElement>(".story-image-wrapper");
      storyImages.forEach((imgWrapper) => {
        const image = imgWrapper.querySelector(".story-image");
        if (image) {
          // Initialize scale to allow shifting without cutting off
          gsap.set(image, { scale: 1.2 });
          
          gsap.fromTo(
            image,
            { y: "-15%" },
            {
              y: "15%",
              ease: "none",
              scrollTrigger: {
                trigger: imgWrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
