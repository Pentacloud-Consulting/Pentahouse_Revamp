"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on mount to ensure proper calculations
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
