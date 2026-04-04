"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import Link from "next/link";

export default function AllWorksListSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND: Images */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: index === activeIndex ? 1 : 0, transition: 'opacity 0.7s ease' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-60"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* LEFT COLUMN: Text Content */}
      <div className="relative z-10 w-full md:w-[60%] h-full flex flex-col justify-center px-[5%] md:px-[8%] py-20">
        <h2 className="font-serif text-[4rem] md:text-[6rem] lg:text-[7vw] mb-12 lg:mb-20 tracking-[-0.04em] text-[var(--foreground)] uppercase leading-none">
          All Works
        </h2>

        <ul className="flex flex-col gap-6 md:gap-10">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block outline-none cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span
                  className={`block font-sans text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter transition-all duration-500 origin-left ${
                    index === activeIndex
                      ? "opacity-100 text-white translate-x-2"
                      : "opacity-40 text-white/60 translate-x-0"
                  }`}
                >
                  {project.title}
                </span>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    index === activeIndex ? "max-h-[100px] opacity-100 mt-4 translate-x-3" : "max-h-0 opacity-0 mt-0 translate-x-0"
                  }`}
                >
                  <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--accent)]">
                    {project.metadata.typology} &mdash; {project.metadata.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
