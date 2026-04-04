import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Expose to window for better debugging and to ensure it's initialized globally
if (typeof window !== "undefined") {
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
  console.log("GSAP Initialized & Plugins Registered");
}

export { gsap, ScrollTrigger };
