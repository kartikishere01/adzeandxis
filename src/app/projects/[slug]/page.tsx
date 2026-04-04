import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ProjectDetailClient } from "./ProjectDetailClient"; // Client component for GSAP

// We can pre-generate paths for our known mock projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the destructured slug and lookup project
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  // Find next project for looping
  const currentIndex = projects.findIndex((p) => p.slug === resolvedParams.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="w-full bg-[var(--background)] text-[var(--foreground)]">
      {/* 
        We delegate all the GSAP animation logic strictly to a Client Component wrapper 
        which wraps the DOM to manage ScrollTriggers, preserving SEO & SSR.
      */}
      <ProjectDetailClient>
        {/* 1. HERO SECTION */}
        <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pt-[90px] pb-12 px-6 md:px-12 lg:px-24">
          <div className="absolute inset-0 z-0 bg-black">
             <Image 
                src={project.heroImage} 
                alt={`${project.title} Hero`}
                fill
                className="hero-image object-cover grayscale opacity-70"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          </div>

          <div className="hero-content relative z-10 flex flex-col gap-8 md:gap-16">
            <h1 className="text-6xl md:text-8xl lg:text-[12vw] font-sans tracking-[-0.04em] uppercase leading-[0.85] text-white">
              {project.title}
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-24 font-mono text-xs md:text-sm uppercase tracking-widest text-white/80 border-t border-white/20 pt-6">
              <div className="flex flex-col gap-2">
                <span className="opacity-50">Location</span>
                <span>{project.metadata.location}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-50">Year</span>
                <span>{project.metadata.year}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-50">Typology</span>
                <span>{project.metadata.typology}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTRO STATEMENT */}
        <section className="min-h-[70vh] flex items-center justify-center px-[5%] md:px-[8%] py-32 text-center">
          <h2 className="intro-text text-3xl md:text-5xl lg:text-7xl font-sans tracking-[-0.02em] leading-tight max-w-5xl mx-auto uppercase">
            {project.description}
          </h2>
        </section>

        {/* 3. SPLIT SECTION */}
        <section className="px-[5%] md:px-[8%] py-32 flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          <div className="split-text lg:w-1/3 flex flex-col gap-8">
            <h3 className="font-mono text-sm uppercase tracking-[0.3em] opacity-50">Concept</h3>
            <p className="text-lg md:text-xl font-sans leading-relaxed tracking-wide opacity-80">
              {project.conceptText}
            </p>
          </div>
          <div className="split-image lg:w-2/3 relative aspect-square w-full overflow-hidden">
            <Image 
              src={project.gallery[0]}
              alt="Concept detail"
              fill
              className="object-cover grayscale"
            />
          </div>
        </section>

        {/* 4. IMAGE STORY (PARALLAX + STACKED) */}
        <section className="w-full flex flex-col gap-px bg-[var(--foreground)]/10">
          {project.gallery.slice(1, 3).map((img, idx) => (
            <div key={idx} className="story-image-wrapper relative w-full h-[120vh] overflow-hidden">
              <Image 
                src={img}
                alt={`Story image ${idx + 1}`}
                fill
                className="story-image object-cover grayscale"
              />
            </div>
          ))}
        </section>

        {/* 5. NEXT PROJECT */}
        <section className="h-[60vh] flex items-center justify-center border-t border-[var(--foreground)]/10">
          <Link 
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-center gap-6 cursor-pointer"
          >
            <span className="font-mono text-sm uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">
              Next Project
            </span>
            <h2 className="text-5xl md:text-8xl font-sans tracking-[-0.04em] uppercase opacity-70 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
              {nextProject.title}
            </h2>
          </Link>
        </section>
      </ProjectDetailClient>
    </main>
  );
}
