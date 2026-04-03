"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { projects } from "@/lib/data";

// Map each project to a positioned image slot — 2 slots per project for variety
const imageSlots = [
  // Project 0 — residence-01
  { projectIndex: 0, cls: "aw-img aw-img--1" },
  { projectIndex: 0, cls: "aw-img aw-img--2" },
  // Project 1 — the-brutal-pavilion
  { projectIndex: 1, cls: "aw-img aw-img--3" },
  { projectIndex: 1, cls: "aw-img aw-img--4" },
  // Project 2 — alpine-retreat
  { projectIndex: 2, cls: "aw-img aw-img--5" },
  { projectIndex: 2, cls: "aw-img aw-img--6" },
  // Project 3 — gallery-minimal
  { projectIndex: 3, cls: "aw-img aw-img--7" },
  { projectIndex: 3, cls: "aw-img aw-img--8" },
];

export default function AllWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(layer1Ref.current, { y: "10%" }, { y: "-10%", ease: "none", force3D: true }, 0);
      tl.fromTo(layer2Ref.current, { y: "25%" }, { y: "-25%", ease: "none", force3D: true }, 0);
      tl.fromTo(layer3Ref.current, { y: "45%" }, { y: "-45%", ease: "none", force3D: true }, 0);
      tl.fromTo(textRef.current, { scale: 0.95, opacity: 0.8 }, { scale: 1.05, opacity: 1, ease: "none", force3D: true }, 0);

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

  // Split 8 slots across 3 parallax layers
  const layer1Slots = imageSlots.slice(0, 3);
  const layer2Slots = imageSlots.slice(3, 6);
  const layer3Slots = imageSlots.slice(6, 8);

  return (
    <section ref={sectionRef} id="all-works" className="all-works section">
      <div ref={bgLayerRef} className="bg-layer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <div className="all-works__parallax-container">

          {/* Layer 1 (Back) */}
          <div ref={layer1Ref} className="all-works__layer">
            {layer1Slots.map((slot, i) => {
              const project = projects[slot.projectIndex];
              return (
                <Link
                  key={i}
                  href={`/projects/${project.slug}`}
                  className={`${slot.cls} aw-link`}
                  title={project.title}
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    draggable={false}
                    className="aw-link__img"
                  />
                  <span className="aw-link__label">{project.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Layer 2 (Middle) */}
          <div ref={layer2Ref} className="all-works__layer">
            {layer2Slots.map((slot, i) => {
              const project = projects[slot.projectIndex];
              return (
                <Link
                  key={i}
                  href={`/projects/${project.slug}`}
                  className={`${slot.cls} aw-link`}
                  title={project.title}
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    draggable={false}
                    className="aw-link__img"
                  />
                  <span className="aw-link__label">{project.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Layer 3 (Front) */}
          <div ref={layer3Ref} className="all-works__layer">
            {layer3Slots.map((slot, i) => {
              const project = projects[slot.projectIndex];
              return (
                <Link
                  key={i}
                  href={`/projects/${project.slug}`}
                  className={`${slot.cls} aw-link`}
                  title={project.title}
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    draggable={false}
                    className="aw-link__img"
                  />
                  <span className="aw-link__label">{project.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="content-layer" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
        <div className="all-works__overlay" />
        <div className="all-works__content" style={{ pointerEvents: 'auto' }}>
          <h2 ref={textRef} className="all-works__title">ALL WORKS</h2>
        </div>
      </div>
    </section>
  );
}
