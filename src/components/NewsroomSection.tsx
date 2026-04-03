"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { newsroom, Article } from "@/lib/data";

export default function NewsroomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the left column text
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, 
          x: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // Stagger up the right column cards
      gsap.fromTo(
        ".news-card",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2, // cards enter sequentially 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          }
        }
      );

      // Subtle parallax on the large main image
      gsap.fromTo(
        ".main-image-parallax",
        { y: -30, scale: 1.05 },
        {
          y: 20,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".main-image-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featureArticle = newsroom[0];
  const gridArticles = newsroom.slice(1, 3);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 md:py-48 px-6 md:px-12 xl:px-24 bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
        
        {/* LEFT COLUMN: Sticky Context Text */}
        <div className="lg:col-span-4 flex flex-col items-start relative">
          <div ref={leftColRef} className="sticky top-40 flex flex-col gap-8 w-full">
            <span className="font-condensed uppercase tracking-[0.3em] text-[10px] md:text-sm text-[var(--muted)] border-b border-[rgba(255,255,255,0.1)] pb-4 w-full">
              Journal &amp; Index
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.9] tracking-tight text-[var(--foreground)]">
              News<br />room.
            </h2>
            <p className="font-sans font-light text-[var(--muted)] text-sm md:text-base leading-[1.8] max-w-sm mt-4 opacity-80">
              Thoughts, dialogues, and case studies dissecting the methodology behind Adze &amp; Axis. We openly document our logic so form can simply exist.
            </p>
            <Link href="/blog" className="group flex items-center gap-4 mt-8 w-max outline-none">
              <span className="font-condensed uppercase tracking-[0.2em] text-xs transition-colors group-hover:text-[var(--accent)]">
                Explore All
              </span>
              <span className="w-8 h-[1px] bg-[var(--foreground)] opacity-50 transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--accent)] group-hover:opacity-100" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Asymmetrical Grid */}
        <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24 w-full mt-12 lg:mt-0">
          
          {/* Main Feature Article */}
          {featureArticle && (
             <Link href={`/blog/${featureArticle.slug}`} className="news-card group flex flex-col gap-6 md:gap-8 outline-none w-full cursor-pointer">
                <div className="main-image-container w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={featureArticle.image} 
                    alt={featureArticle.title} 
                    className="main-image-parallax absolute inset-0 w-full h-[120%] object-cover object-center filter brightness-[0.8] grayscale-[0.2] transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-[rgba(255,255,255,0.1)] pt-6">
                  <h3 className="font-serif text-3xl md:text-5xl lg:text-5xl tracking-tight text-[var(--foreground)] leading-[1.1] max-w-xl group-hover:opacity-60 transition-opacity duration-500">
                    {featureArticle.title}
                  </h3>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="font-condensed uppercase tracking-[0.2em] text-[10px] md:text-xs text-[var(--muted)] opacity-60">
                      Feature
                    </span>
                    <span className="font-condensed uppercase tracking-[0.2em] text-[10px] md:text-xs text-[var(--muted)]">
                      {featureArticle.date}
                    </span>
                  </div>
                </div>
             </Link>
          )}

          {/* Secondary Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 w-full">
             {gridArticles.map((article: Article) => (
                <Link href={`/blog/${article.slug}`} key={article.slug} className="news-card group flex flex-col gap-5 md:gap-6 outline-none cursor-pointer">
                  <div className="w-full aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.8] opacity-80 scale-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100" 
                    />
                  </div>
                  <div className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
                    <div className="font-condensed uppercase tracking-[0.2em] text-[10px] text-[var(--muted)] opacity-60 group-hover:text-[var(--accent)] transition-colors">
                      {article.date} &mdash; {article.author}
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-[1.1] text-[var(--foreground)] opacity-90 group-hover:opacity-100 transition-opacity">
                      {article.title}
                    </h3>
                  </div>
                </Link>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
