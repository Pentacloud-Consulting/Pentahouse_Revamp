"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalTransition({ children }: { children: React.ReactNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=350%",
          scrub: true,
          pin: true,
        }
      });

      // 1. Hold the first section perfectly still for a bit
      tl.to({}, { duration: 0.8 });

      // 2. Outgoing section slides left
      tl.to(section1Ref.current, {
        xPercent: -100,
        scale: 0.98,
        ease: "none",
        duration: 1
      }, "slide");

      // 3. Incoming section slides in
      tl.fromTo(section2Ref.current, {
        xPercent: 100,
        scale: 1.02,
        opacity: 0.8
      }, {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
        duration: 1
      }, "slide");

      // 4. Hold the second section perfectly still for a bit before unpinning
      tl.to({}, { duration: 0.8 });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full lg:h-screen bg-[#111111] z-20 flex flex-col lg:block overflow-hidden">
      <div ref={section1Ref} className="relative lg:absolute lg:inset-0 w-full lg:h-full flex flex-col justify-center bg-[#f8f9fa] z-10">
        <div className="w-full lg:h-full lg:overflow-y-auto no-scrollbar">
          {children[0]}
        </div>
      </div>
      <div ref={section2Ref} className="relative lg:absolute lg:inset-0 w-full lg:h-full flex flex-col justify-center bg-[#111111] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] lg:shadow-2xl">
        <div className="w-full lg:h-full lg:overflow-y-auto no-scrollbar">
          {children[1]}
        </div>
      </div>
    </div>
  );
}
