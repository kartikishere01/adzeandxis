"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * App-wide smooth-scroll provider.
 * Renders no DOM — just initialises / tears down Lenis + ScrollTrigger sync.
 */
export default function SmoothScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = initLenis();

    // Tell ScrollTrigger not to alter native scroll behaviour —
    // Lenis owns that responsibility.
    ScrollTrigger.normalizeScroll(false);

    // Refresh ScrollTrigger + Lenis on resize so pin positions stay accurate
    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    // Fire refresh AFTER full page load (fonts + images rendered).
    // A premature refresh causes GSAP to record wrong pin spacer heights,
    // leading to the visual jump / overlap glitch when scrolling.
    const onLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      // Page already loaded (e.g. fast hot-reload)
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      destroyLenis();
    };
  }, []);

  // Refresh upon route transitions — scroll to top first, then refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
