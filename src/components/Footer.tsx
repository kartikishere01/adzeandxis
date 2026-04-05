import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181614] text-[var(--foreground)] min-h-screen py-24 md:py-48 flex flex-col items-center justify-center gap-16 md:gap-24 lg:gap-32 border-t border-[rgba(255,255,255,0.02)] relative z-20">
      
      {/* Brand Name */}
      <div className="flex items-center gap-6 md:gap-12 font-serif">
        <span className="text-3xl md:text-6xl tracking-[0.4em] font-light">
          ADZE
        </span>
        <span className="italic text-[var(--accent)] text-4xl md:text-7xl px-2 -mt-2 md:-mt-4">
          &amp;
        </span>
        <span className="text-3xl md:text-6xl tracking-[0.4em] font-light">
          AXIS
        </span>
      </div>

      {/* Subtitles / Tagline */}
      <div className="font-condensed uppercase tracking-[0.6em] md:tracking-[1em] text-[9px] md:text-[11px] opacity-40 text-center w-full px-4 max-w-5xl flex items-center justify-center flex-wrap gap-4 md:gap-8 leading-loose">
        <span>STUDIO</span>
        <span>&mdash;</span>
        <span>ARCHITECTURE</span>
        <span>&mdash;</span>
        <span>INTERIOR</span>
        <span>&mdash;</span>
        <span>CONSTRUCTION</span>
      </div>

      {/* Quote */}
      <div>
        <p className="font-serif italic text-base md:text-2xl opacity-60 tracking-widest text-center px-6 antialiased leading-relaxed max-w-3xl mx-auto">
          "Build something that will still be standing when you are not."
        </p>
      </div>

      {/* Final Contact Row */}
      <div className="flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-10 font-condensed uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs opacity-50 flex-wrap w-full px-4 text-center">
        <a href="mailto:info@adzeandaxis.com" className="hover:text-[var(--accent)] transition-colors py-2">INFO@ADZEANDAXIS.COM</a>
        
        <span className="hidden xl:block opacity-30 text-base font-thin">|</span>
        
        <a href="tel:+919888750686" className="hover:text-[var(--accent)] transition-colors py-2">+91 98887 50686</a>
        
        <span className="hidden xl:block opacity-30 text-base font-thin">|</span>

        <a href="https://www.instagram.com/adzeandaxis_studio?igsh=ODZsbWl3aHhoZTBq" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors py-2">INSTAGRAM</a>
        
        <span className="hidden xl:block opacity-30 text-base font-thin">|</span>

        <a href="https://www.linkedin.com/in/adze-and-axis-studio-3083773bb?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors py-2">LINKEDIN</a>
      </div>

      {/* Copyright */}
      <div className="font-condensed uppercase tracking-[0.3em] text-[9px] md:text-[10px] opacity-30 text-center w-full px-4">
        &copy; {new Date().getFullYear()} Adze &amp; Axis Studio. All Rights Reserved.
      </div>

    </footer>
  );
}
