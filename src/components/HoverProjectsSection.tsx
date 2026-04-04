"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import Link from "next/link";

export default function HoverProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="hover-projects">
      {/* Left Column: List */}
      <div className="hover-projects__list">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`hover-projects__item block outline-none cursor-pointer no-underline py-2 ${
              index === activeIndex ? "hover-projects__item--active" : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            style={{ minHeight: '44px' }}
          >
            {project.title}
          </Link>
        ))}
      </div>

      {/* Right Column: Images — hover to change */}
      <div className="hover-projects__images">
        {projects.map((project, index) => (
          <img
            key={project.slug}
            src={project.heroImage}
            alt={project.title}
            className="hover-projects__image"
            style={{ opacity: index === activeIndex ? 1 : 0, transition: 'opacity 0.6s ease' }}
            draggable={false}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
