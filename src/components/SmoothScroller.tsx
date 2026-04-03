"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * App-wide smooth-scroll provider.
 * Renders no DOM — just initialises / tears down Lenis + ScrollTrigger sync.
 */
export default function SmoothScroller() {
  useEffect(() => {
    const lenis = initLenis();

    // Refresh ScrollTrigger + Lenis on resize so pin positions stay accurate
    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    // Initial refresh after mount to pick up correct dimensions
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      destroyLenis();
    };
  }, []);

  return null;
}
