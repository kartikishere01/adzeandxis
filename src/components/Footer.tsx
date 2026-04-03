import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181614] text-[var(--foreground)] min-h-[60vh] md:min-h-[80vh] py-24 md:py-32 flex flex-col items-center justify-center border-t border-[rgba(255,255,255,0.02)] relative z-20">
      
      {/* Brand Name */}
      <div className="flex items-center gap-6 md:gap-10 mb-10 md:mb-16 font-serif">
        <span className="text-2xl md:text-5xl tracking-[0.3em] font-light">
          ADZE
        </span>
        <span className="italic text-[var(--accent)] text-3xl md:text-6xl px-1 -mt-1 md:-mt-3">
          &amp;
        </span>
        <span className="text-2xl md:text-5xl tracking-[0.3em] font-light">
          AXIS
        </span>
      </div>

      {/* Subtitles */}
      <div className="font-condensed uppercase tracking-[0.4em] md:tracking-[0.8em] text-[8px] md:text-[10px] opacity-40 mb-14 md:mb-20 text-center w-full px-4 max-w-4xl flex items-center justify-center flex-wrap gap-2">
        <span>STUDIO</span>
        <span>&mdash;</span>
        <span>ARCHITECTURE</span>
        <span>&mdash;</span>
        <span>INTERIOR</span>
        <span>&mdash;</span>
        <span>CONSTRUCTION</span>
      </div>

      {/* Subtle Rule */}
      <div className="w-[80px] md:w-[120px] h-[1px] bg-[var(--foreground)] opacity-10 mb-14 md:mb-20" />

      {/* Quote */}
      <p className="font-serif italic text-sm md:text-[0.95rem] opacity-60 tracking-wider text-center px-6 antialiased mb-12">
        "Build something that will still be standing when you are not."
      </p>

      {/* Final Contact Row */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 font-condensed uppercase tracking-[0.2em] text-[10px] md:text-xs opacity-50">
        <a href="mailto:info@adzeandaxis.com" className="hover:text-[var(--accent)] transition-colors">info@adzeandaxis.com</a>
        <span className="hidden md:block opacity-20">|</span>
        <a href="tel:+919888750686" className="hover:text-[var(--accent)] transition-colors">+91 98887 50686</a>
      </div>

    </footer>
  );
}
