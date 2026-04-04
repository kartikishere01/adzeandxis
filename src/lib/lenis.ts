import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

/**
 * Initialise Lenis smooth-scroll, synced with GSAP ScrollTrigger.
 *
 * Approach: Lenis handles scroll interpolation while we feed
 * ScrollTrigger.update() on every Lenis scroll event. We also
 * connect GSAP's ticker to drive the Lenis RAF so both systems
 * share the exact same frame cadence — zero drift, zero lag.
 *
 * We intentionally avoid scrollerProxy here. Lenis works on top
 * of native scroll, so ScrollTrigger can read the real scrollTop
 * directly. The only bridge needed is the scroll-event → update call.
 */
export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.5,
  });

  // ── Bridge: every Lenis scroll tick → ScrollTrigger recalc ──
  lenisInstance.on("scroll", ScrollTrigger.update);

  // ── Unified RAF: drive Lenis from GSAP's ticker for frame-perfect sync ──
  // We use GSAP's ticker.time (seconds) converted to milliseconds.
  gsap.ticker.add(() => {
    lenisInstance?.raf(gsap.ticker.time * 1000);
  });

  // Disable GSAP's default lagSmoothing so it doesn't fight Lenis
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

/**
 * Destroy the Lenis instance and clean up all listeners.
 */
export function destroyLenis(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
}

export { lenisInstance };
