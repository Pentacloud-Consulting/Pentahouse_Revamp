"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FeaturedProjects from "@/PentaHouse/Projects/Featured Projects";
import WorkedProjects from "@/PentaHouse/Projects/Worked Projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial state for the project gallery cards to prevent FOUC
    gsap.set(".project-card", { opacity: 0, y: 30, scale: 0.96 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 15%", // Pin slightly below the top to look elegant
        end: () => "+=" + window.innerHeight * 1.5, // 1.5x viewport scroll distance
        pin: true,
        scrub: 1, // Smooth scrub
        anticipatePin: 1,
      }
    });

    // 1. Give the user a moment to feel the Featured Project
    tl.to({}, { duration: 0.15 });

    // 2. The grand cinematic exchange (Left & Right synchronization)
    tl.to(sliderRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 1,
    });

    // 3. Staggered reveal for the project cards
    tl.to(".project-card", {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.08, // Stagger relative to scrub distance
      ease: "power4.out",
      duration: 0.8, // 0.8 to 1 second relative equivalent
    }, "<0.25"); // Start when the transition is 25% underway

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden will-change-transform">
      {/* 200vw width to accommodate both full-screen sections side-by-side */}
      <div ref={sliderRef} className="flex w-[200vw] items-start will-change-transform">
        
        {/* PANEL 1: Featured Project (Starts at x: 0%) */}
        <div className="w-[100vw] px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="max-w-[1400px] mx-auto w-full">
            <FeaturedProjects />
          </div>
        </div>

        {/* PANEL 2: Project Gallery (Starts at x: 100%, moves to 0%) */}
        <div className="w-[100vw] px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="max-w-[1400px] mx-auto w-full">
            <WorkedProjects />
          </div>
        </div>

      </div>
    </div>
  );
}
