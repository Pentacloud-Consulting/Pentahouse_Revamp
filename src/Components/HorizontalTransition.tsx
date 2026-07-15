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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // when the top of the container hits the top of the viewport
        end: "+=150%", // scrub distance
        scrub: true,
        pin: true,
      }
    });

    // 2nd section (Outgoing)
    tl.to(section1Ref.current, {
      xPercent: -100,
      scale: 0.98,
      ease: "none"
    }, 0);

    // 3rd section (Incoming)
    tl.fromTo(section2Ref.current, {
      xPercent: 100,
      scale: 1.02,
      opacity: 0.8
    }, {
      xPercent: 0,
      scale: 1,
      opacity: 1,
      ease: "none"
    }, 0);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#111111] z-20">
      <div ref={section1Ref} className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#f8f9fa]">
        <div className="w-full h-full overflow-y-auto no-scrollbar">
          {children[0]}
        </div>
      </div>
      <div ref={section2Ref} className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#111111] shadow-2xl">
        <div className="w-full h-full overflow-y-auto no-scrollbar">
          {children[1]}
        </div>
      </div>
    </div>
  );
}
