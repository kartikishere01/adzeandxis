"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  { id: 1, title: "The Glass Pavilion", image: "/project_01.png" },
  { id: 2, title: "Skyward Residence", image: "/project_02.png" },
  { id: 3, title: "Zen Retreat", image: "/project_03.png" },
  { id: 4, title: "Brutalist Museum", image: "/project_04.png" },
  { id: 5, title: "Light Chapel", image: "/project_05.png" },
  { id: 6, title: "Vaulted Cellars", image: "/project_06.png" },
];

export default function HoverProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial setup: ensure only the first image is visible
    imagesRef.current.forEach((img, i) => {
      if (img) {
        gsap.set(img, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.05,
        });
      }
    });

    // Pin the section for 150% viewport scroll
    const pin = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=150%",
      pin: true,
      anticipatePin: 1,
      scrub: false,
    });

    return () => pin.kill();
  }, []);

  const handleMouseEnter = (index: number) => {
    if (index === activeIndex) return;

    const prevImg = imagesRef.current[activeIndex];
    const newImg = imagesRef.current[index];

    // Fade out previous
    if (prevImg) {
      gsap.to(prevImg, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power3.out",
        force3D: true,
      });
    }

    // Fade in new
    if (newImg) {
      gsap.fromTo(
        newImg,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        }
      );
    }

    setActiveIndex(index);
  };

  // Optional: subtle parallax effect on mouse move over the right column
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    const activeImg = imagesRef.current[activeIndex];
    if (activeImg) {
      gsap.to(activeImg, {
        x: x * -30, // Move slightly opposite to mouse
        y: y * -30,
        duration: 2,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    const activeImg = imagesRef.current[activeIndex];
    if (activeImg) {
      gsap.to(activeImg, {
        x: 0,
        y: 0,
        duration: 2,
        ease: "power3.out",
      });
    }
  };

  return (
    <section ref={sectionRef} className="hover-projects">
      {/* Left Column: List */}
      <div className="hover-projects__list">
        {projects.map((project, index) => (
          <h2
            key={project.id}
            className={`hover-projects__item ${
              index === activeIndex ? "hover-projects__item--active" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {project.title}
          </h2>
        ))}
      </div>

      {/* Right Column: Images */}
      <div
        ref={containerRef}
        className="hover-projects__images"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((project, index) => (
          <img
            key={project.id}
            ref={(el) => {
              imagesRef.current[index] = el;
            }}
            src={project.image}
            alt={project.title}
            className="hover-projects__image"
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
}
