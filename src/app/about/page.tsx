"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in title and intro
      gsap.fromTo(
        ".fade-up-intro",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          stagger: 0.15, 
          ease: "power3.out" 
        }
      );

      // Scroll staggered reveals for right column paragraphs
      gsap.fromTo(
        ".story-block",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-container",
            start: "top 70%",
          }
        }
      );

      // Services stagger (switched to 2x2 grid, meaning they come in pairs)
      gsap.fromTo(
         ".service-card",
         { opacity: 0, y: 40 },
         {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
               trigger: ".services-container",
               start: "top 75%"
            }
         }
      );

      // Reasons intro slide fade-up
      gsap.fromTo(
        ".fade-up-reason-intro",
        { opacity: 0, y: 40 },
        {
           opacity: 1,
           y: 0,
           duration: 1.4,
           stagger: 0.2,
           ease: "power3.out",
           scrollTrigger: {
              trigger: ".six-reasons-intro-section",
              start: "top 65%"
           }
        }
      );

      // Reasons trigger: Since we have massive gaps, we animate them one by one as they enter the screen
      gsap.utils.toArray(".reason-block").forEach((block: any) => {
         gsap.fromTo(
            block,
            { opacity: 0, y: 60 },
            {
               opacity: 1,
               y: 0,
               duration: 1.5,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: block,
                  start: "top 80%"
               }
            }
         );
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="w-full min-h-screen px-[5%] md:px-[8%] bg-[var(--background)] text-[var(--foreground)] pt-40 pb-32 selection:bg-[var(--accent)] selection:text-[var(--background)]">
      
      {/* ── HEADER INTRO ── */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-[1600px] mx-auto pb-48 text-center items-center" style={{ paddingTop: '90px' }}>
        <div className="w-full flex flex-col items-center text-center">
          <span className="fade-up-intro block font-condensed uppercase tracking-[0.3em] text-[10px] md:text-sm text-[var(--muted)] opacity-50 mb-10 border-b border-[rgba(255,255,255,0.05)] pb-4 w-max mx-auto">
            About Page &mdash; Who We Are
          </span>
          <h1 className="fade-up-intro font-serif text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.15] max-w-5xl mx-auto tracking-tight text-[var(--foreground)] opacity-95">
            "Adze &amp; Axis was founded on a simple frustration: too many beautiful buildings that don't work, and <span className="text-[var(--muted)] opacity-70">too many buildings that work but aren't beautiful.</span>"
          </h1>
        </div>
      </section>

      {/* ── STUDIO STORY (SPLIT SCREEN) ── */}
      <section className="story-container max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 mb-56">
        
        {/* Left: Sticky Quote */}
        <div className="lg:col-span-6 relative">
          <div className="sticky top-40 fade-up-intro">
             <span className="block font-condensed uppercase tracking-[0.3em] text-[10px] md:text-xs text-[var(--muted)] opacity-50 mb-10">
               Studio Story
             </span>
             <h2 className="font-serif text-[2.5rem] md:text-[4rem] leading-[1.1] font-normal tracking-tight w-[90%] md:w-full">
               We believe a building is not finished<br className="hidden md:block"/>
               when it is <span className="italic text-[var(--accent)] font-light pr-2">completed</span> &mdash;<br className="hidden md:block"/>
               it is finished when it is <span className="italic text-[var(--accent)] font-light pr-2">understood.</span>
             </h2>
          </div>
        </div>

        {/* Right: Extremely Open Text Blocks */}
        <div className="lg:col-span-6 flex flex-col gap-24 pt-8 lg:pt-24 lg:pl-12">
          
          <div className="story-block flex flex-col gap-6 border-l border-[rgba(255,255,255,0.08)] pl-6 md:pl-10">
             <h3 className="font-serif text-3xl tracking-tight">The Origin</h3>
             <p className="font-sans text-base md:text-lg leading-[2] text-[var(--muted)] max-w-xl font-light">
               Adze &amp; Axis Studio was born from the belief that architecture, interior design, and construction should never be separated. When the person who imagines a space is also the person who builds it, something remarkable happens — accountability deepens, quality rises, and the gap between vision and reality closes.
             </p>
          </div>

          <div className="story-block flex flex-col gap-6 border-l border-[rgba(255,255,255,0.08)] pl-6 md:pl-10">
             <h3 className="font-serif text-3xl tracking-tight">The Philosophy</h3>
             <p className="font-sans text-base md:text-lg leading-[2] text-[var(--muted)] max-w-xl font-light">
               The name holds the philosophy. An adze is one of the oldest tools in the builder's kit — it shapes raw material through subtraction, through the discipline of removing what doesn't belong. The axis is the organising intelligence — the invisible line that gives a space its hierarchy and its meaning. Together, they describe exactly how we work: with our hands and with our heads, always at the same time.
             </p>
          </div>

        </div>
      </section>

      {/* ── SERVICES (WHAT WE OFFER) ── */}
      {/* Refactored from 4-cols to a massive 2x2 grid for ultimate breathing room */}
      <section className="services-container max-w-[1600px] mx-auto mb-64 pt-32 border-t border-[rgba(255,255,255,0.03)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
           <div>
             <span className="block font-condensed uppercase tracking-[0.3em] text-[10px] md:text-xs text-[var(--muted)] opacity-50 mb-6">
               What We Offer
             </span>
             <h2 className="font-serif text-6xl md:text-8xl lg:text-[8rem] tracking-tight leading-none text-[var(--foreground)] pr-8 md:pr-0">Services Page</h2>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-24 w-full lg:px-12">
           
           <div className="service-card flex flex-col gap-6 lg:pr-12">
             <span className="font-condensed text-[var(--accent)] text-xl opacity-80">01 &mdash;</span>
             <h3 className="font-serif text-4xl md:text-5xl tracking-tight pr-6 md:pr-0">Architecture<br/>&amp; Design</h3>
             <p className="font-sans text-sm md:text-base leading-[2] text-[var(--muted)] mt-4 font-light max-w-md">
               We design buildings from the inside out — beginning with how the space will be used, how light will move through it, and how it will feel to arrive. From residential homes to commercial spaces, we bring the same rigour to every scale.
             </p>
           </div>

           <div className="service-card flex flex-col gap-6 lg:pr-12">
             <span className="font-condensed text-[var(--accent)] text-xl opacity-80">02 &mdash;</span>
             <h3 className="font-serif text-4xl md:text-5xl tracking-tight pr-6 md:pr-0">Interior<br/>Design</h3>
             <p className="font-sans text-sm md:text-base leading-[2] text-[var(--muted)] mt-4 font-light max-w-md">
               Interiors are not decorations placed inside architecture. They are architecture — the surface that the body meets, the material that the hand touches, the proportion that the eye reads. We design interiors that earn their place in the space.
             </p>
           </div>

           <div className="service-card flex flex-col gap-6 lg:pr-12">
             <span className="font-condensed text-[var(--accent)] text-xl opacity-80">03 &mdash;</span>
             <h3 className="font-serif text-4xl md:text-5xl tracking-tight pr-6 md:pr-0">Construction<br/>&amp; Build</h3>
             <p className="font-sans text-sm md:text-base leading-[2] text-[var(--muted)] mt-4 font-light max-w-md">
               We do not hand over drawings and leave. We stay through construction — managing every team, every material, every detail. What gets built is what was designed. No compromises made without conversations.
             </p>
           </div>

           <div className="service-card flex flex-col gap-6 lg:pr-12">
             <span className="font-condensed text-[var(--accent)] text-xl opacity-80">04 &mdash;</span>
             <h3 className="font-serif text-4xl md:text-5xl tracking-tight pr-6 md:pr-0">Luxury<br/>Fit-out</h3>
             <p className="font-sans text-sm md:text-base leading-[2] text-[var(--muted)] mt-4 font-light max-w-md">
               For clients who want the finest materials expertly installed, we offer a complete luxury fit-out service — from material selection and procurement to precision installation and final dressing.
             </p>
           </div>

        </div>
      </section>

      {/* ── SIX REASONS INTRO SLIDE ── */}
      <section className="six-reasons-intro-section w-full min-h-[90vh] flex flex-col justify-center items-center text-center border-t border-[rgba(255,255,255,0.03)] pt-12">
        <div className="flex flex-col items-center gap-8">
           <span className="fade-up-reason-intro font-condensed uppercase tracking-[0.3em] text-[10px] md:text-sm text-[var(--accent)] opacity-80">
             04 — What We Do &amp; Why We're Different
           </span>
           <h2 className="fade-up-reason-intro font-serif text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight max-w-5xl leading-[1.05] text-[var(--foreground)]">
             Six reasons no other firm<br className="hidden md:block"/> is quite like this.
           </h2>
        </div>
      </section>

      {/* ── SIX REASONS DETAILS ── */}
      <section className="max-w-[1200px] mx-auto mb-48 flex flex-col gap-64 relative">
        <div className="flex flex-col w-full gap-56 md:gap-72 pb-32">
          {[
            {
              num: "01",
              title: "We design and build under one roof",
              cat: "Architecture + Construction",
              text: "Most firms either design or build. When you separate thinking from making, you lose something — precision, accountability, honesty. We carry a project from the first sketch to the final coat of plaster. One team. One vision. No handover loss."
            },
            {
              num: "02",
              title: "We question the brief before we accept it",
              cat: "Intellectual Process",
              text: "Every client comes with a brief. Most firms execute it. We interrogate it first. What do you actually need? What are you trying to feel when you walk in? What will this space mean in ten years? The best buildings start with better questions."
            },
            {
              num: "03",
              title: "Material honesty is non-negotiable",
              cat: "Material Philosophy",
              text: "We don't cover concrete in cladding that pretends to be stone. We don't paint wood to look like marble. Materials are used for what they are, celebrated for what they can do. Honesty in material is the beginning of beauty in space."
            },
            {
              num: "04",
              title: "We solve problems others turn down",
              cat: "Builds What Others Can't",
              text: "Difficult sites, unusual briefs, tight budgets with high ambitions — these are not problems for us. They are the conditions that produce the most interesting work. Constraints are the architect's greatest tool. We have learned to use them."
            },
            {
              num: "05",
              title: "Light is treated as a material",
              cat: "Spatial Intelligence",
              text: "Light is not an afterthought decided by an electrician. It is designed from the first drawing — how it enters, where it falls, what it reveals, what it hides. Every project has a light strategy before it has a structural strategy."
            },
            {
              num: "06",
              title: "We think about time",
              cat: "Long-term Thinking",
              text: "How will this building age? What will it look like in twenty years? A great building improves with age — the concrete develops patina, the wood deepens, the space settles. We design for the long version of every project, not just the opening day photograph."
            }
          ].map((reason, idx) => (
             <div key={idx} className="reason-block relative flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-start w-full h-auto min-h-[50vh] md:min-h-0 pt-16 border-t border-[rgba(255,255,255,0.05)]">
               {/* Massive Background Number */}
               <div className="absolute top-0 right-0 md:left-0 md:right-auto md:top-1/2 select-none text-[12rem] md:text-[20rem] lg:text-[28rem] font-serif font-light text-white opacity-[0.02] leading-none pointer-events-none -z-10 translate-y-[-20%] md:translate-y-[-50%] md:-translate-x-12 tracking-tighter">
                 {reason.num}
               </div>

               <div className="flex flex-col gap-6 md:w-[45%] lg:w-[40%] z-10 relative">
                 <span className="font-condensed uppercase tracking-[0.2em] text-[10px] md:text-sm text-[var(--accent)] font-semibold">
                   {reason.cat}
                 </span>
                 <h3 className="font-serif text-4xl md:text-[3.5rem] tracking-tight leading-[1.05] text-[var(--foreground)] pr-8 md:pr-0">
                   {reason.title}
                 </h3>
               </div>

               <div className="md:w-[45%] lg:w-[35%] z-10 relative mt-4 md:mt-12 pr-4 md:pr-8">
                 <p className="font-sans text-base md:text-lg leading-[2] text-[var(--muted)] font-light">
                   {reason.text}
                 </p>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER LINE ── */}
      <section className="mt-64 pt-64 pb-48 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <span className="font-condensed uppercase tracking-[0.3em] text-[10px] md:text-xs text-[var(--muted)] opacity-50 mb-16 border-b border-[rgba(255,255,255,0.05)] pb-6">
          Founder Line
        </span>
        <h3 className="fade-up-intro font-serif text-3xl md:text-5xl lg:text-[4.5rem] tracking-tight max-w-5xl leading-[1.15] mb-32 text-[var(--foreground)]">
          Founded by Jay Srivastav &mdash; architect, builder, and someone who has never been satisfied with <span className="italic text-[var(--accent)] font-light px-2 pr-4">"good enough."</span>
        </h3>
        <div className="w-[1px] h-[160px] bg-[var(--foreground)] opacity-20" />
      </section>

    </main>
  );
}
