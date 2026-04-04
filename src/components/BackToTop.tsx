"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // We use standard window fallback, or if Lenis is used globally, it intercepts window.scrollTo perfectly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[90] flex items-center justify-center w-[50px] h-[50px] rounded-full border border-[rgba(255,255,255,0.2)] bg-[var(--background)]/80 backdrop-blur-md text-[var(--foreground)] transition-all duration-500 hover:bg-[var(--accent)] hover:text-[var(--charcoal)] hover:scale-110 outline-none cursor-pointer group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ minWidth: '44px', minHeight: '44px' }}
      aria-label="Back to top"
    >
      <span className="font-condensed uppercase tracking-widest text-[10px] group-hover:scale-110 transition-transform -mt-[2px]">
        Up
      </span>
    </button>
  );
}
