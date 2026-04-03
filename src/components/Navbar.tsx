"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Newsroom", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".nav-item");
      const masterTl = gsap.timeline({ paused: true });
      masterTlRef.current = masterTl;

      // 1. Fade the whole navbar in
      masterTl.to(navRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });

      const itemsTl = gsap.timeline();

      items.forEach((item, index) => {
        const leftBracket = item.querySelector(".bracket-left");
        const rightBracket = item.querySelector(".bracket-right");
        const text = item.querySelector(".nav-text");

        // Force initial state safely
        gsap.set([leftBracket, rightBracket], { x: 0 });
        gsap.set(text, { opacity: 0 });

        // Build stagger timeline per item
        const itemTl = gsap.timeline();
        itemTl
          .to(leftBracket, { x: -6, duration: 0.8, ease: "power2.out" }, 0)
          .to(rightBracket, { x: 6, duration: 0.8, ease: "power2.out" }, 0)
          .to(text, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.2);

        itemsTl.add(itemTl, index * 0.15); // Subtle premium stagger
      });

      // 2. Expand brackets slightly after it starts fading in
      masterTl.add(itemsTl, 0.1);

      // Hover interactions
      items.forEach((item) => {
        const leftBracket = item.querySelector(".bracket-left");
        const rightBracket = item.querySelector(".bracket-right");
        item.addEventListener("mouseenter", () => {
          gsap.to(leftBracket, { x: -10, duration: 0.6, ease: "power2.out", overwrite: "auto" });
          gsap.to(rightBracket, { x: 10, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        });
        
        item.addEventListener("mouseleave", () => {
          gsap.to(leftBracket, { x: -6, duration: 0.6, ease: "power2.out", overwrite: "auto" });
          gsap.to(rightBracket, { x: 6, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        });
      });

    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!masterTlRef.current) return;
    if (isOpen) {
      navRef.current!.style.pointerEvents = "auto";
      masterTlRef.current.play();
      // Fade in frosted background
      gsap.to(bgRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      navRef.current!.style.pointerEvents = "none";
      masterTlRef.current.reverse();
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-12 flex justify-between items-center opacity-0 pointer-events-none"
    >
      {/* Frosted glass background — fades in on scroll */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-hidden="true"
      />

      {/* Equal spacing container */}
      <div className="w-full flex justify-between items-center pointer-events-auto relative z-10">
        {NAV_ITEMS.map((item, idx) => (
          <NavItem key={idx} {...item} onClick={() => setIsOpen(false)} />
        ))}
      </div>
    </nav>
  );
}

function NavItem({ label, href, onClick }: { label: string; href: string, onClick?: () => void }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="nav-item group flex items-center text-[var(--foreground)] cursor-pointer outline-none uppercase"
      style={{ overflow: 'visible', textDecoration: 'none' }}
    >
      <span className="bracket-left inline-block opacity-60 transition-opacity duration-300 group-hover:opacity-100" style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '0.9rem' }}>[</span>
      <span className="nav-text inline-block opacity-0 tracking-[0.2em] px-2 pt-[1px]" style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '0.75rem' }}>{label}</span>
      <span className="bracket-right inline-block opacity-60 transition-opacity duration-300 group-hover:opacity-100" style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '0.9rem' }}>]</span>
    </a>
  );
}
