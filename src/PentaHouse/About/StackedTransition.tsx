"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building } from "lucide-react";
import Link from "next/link";
import AboutHero from "./AboutHero";
import OurValues from "./OurValues";
import OurApproach from "./OurApproach";

gsap.registerPlugin(ScrollTrigger);

export default function StackedTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=450%", // Increased to accommodate the pause for Our Approach
          scrub: 1, 
          pin: true,
          anticipatePin: 1
        }
      });

      // 1. Curtain closes (Who We Are)
      tl.to(leftPanelRef.current, { x: "0%", ease: "power2.out" }, 0)
        .to(rightPanelRef.current, { x: "0%", ease: "power2.out" }, 0)
      
      // 2. Our Values layer slides up
        .to(valuesRef.current, { y: "0%", ease: "none" }, 1)
        
      // 3. Our Approach layer slides up
        .to(approachRef.current, { y: "0%", ease: "none" }, 2)

      // 4. Hold the "Our Approach" section on screen before unpinning
        .to({}, { duration: 1.5 });
        
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full lg:h-screen overflow-x-hidden lg:overflow-hidden bg-[#0a0a0a] flex flex-col lg:block">
      {/* 1. Background Layer: Hero */}
      <div className="relative lg:absolute lg:inset-0 w-full lg:h-full pointer-events-auto lg:pointer-events-none z-0">
        <AboutHero />
      </div>

      {/* 2. Middle Layer: Curtains (Who We Are) */}
      <div className="relative lg:absolute lg:inset-0 w-full lg:h-full flex flex-col lg:flex-row pointer-events-none lg:z-10 bg-[#0a0a0a] lg:bg-transparent">
        {/* Left Curtain */}
        <div 
          ref={leftPanelRef} 
          className="w-full lg:w-1/2 lg:h-full bg-[#0a0a0a] lg:-translate-x-full pointer-events-auto flex items-center justify-center lg:justify-end px-4 sm:px-8 py-10 lg:py-0 lg:px-12 border-b lg:border-b-0 lg:border-r border-white/5 order-2 lg:order-1"
        >
          <div className="w-full max-w-[620px] lg:ml-auto">
            <p className="text-[#CBA052] font-bold tracking-widest text-[10px] md:text-xs mb-2 md:mb-4 uppercase">Who We Are</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-bold mb-4 lg:mb-8 leading-[1.2] text-white">Redefining Quality<br />in Construction</h2>
            <p className="text-gray-400 mb-4 lg:mb-6 leading-relaxed text-[11px] md:text-base">
              Pentahouse is a Bangalore-based construction and architecture firm delivering premium residential, commercial, and architectural solutions.
            </p>
            <p className="text-gray-400 mb-6 lg:mb-10 leading-relaxed text-[11px] md:text-base">
              With a strong focus on innovation, craftsmanship, and client satisfaction, we transform ideas into exceptional spaces.
            </p>
            <Link href="/services" className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-black transition-colors duration-300 px-6 lg:px-8 py-2.5 lg:py-3.5 rounded text-[9px] lg:text-sm font-bold tracking-widest uppercase flex items-center gap-2 lg:gap-3 w-fit">
              Our Story <ArrowRight size={14} className="lg:w-4 lg:h-4" />
            </Link>
          </div>
        </div>

        {/* Right Curtain */}
        <div 
          ref={rightPanelRef} 
          className="w-full lg:w-1/2 lg:h-full bg-[#0a0a0a] lg:translate-x-full pointer-events-auto flex items-center justify-center lg:justify-start px-4 sm:px-8 pt-12 pb-6 lg:py-0 lg:px-12 order-1 lg:order-2"
        >
          <div className="w-full max-w-[620px] lg:mr-auto relative mt-4 lg:mt-0">
            <img 
              src="/Images/About-PentaHouse.jpg" 
              alt="Pentahouse Architecture" 
              className="w-full h-auto rounded-xl shadow-2xl" 
            />
            {/* Floating Card */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-8 bg-[#111111]/95 backdrop-blur-md border border-[#CBA052]/30 p-3 sm:p-6 rounded-lg lg:rounded-xl flex items-center gap-2 sm:gap-5 shadow-2xl z-10 w-36 sm:w-64 scale-95 sm:scale-100 origin-bottom-left">
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full border border-[#CBA052] flex items-center justify-center shrink-0 text-[#CBA052]">
                <Building className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-sm sm:text-2xl font-bold text-white mb-0 sm:mb-1">10+</p>
                <p className="text-gray-400 text-[7px] sm:text-xs font-semibold uppercase tracking-wider">Years of<br className="sm:hidden" /> Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Top Layer: Our Values */}
      <div 
        ref={valuesRef}
        className="relative lg:absolute lg:inset-0 w-full lg:h-full lg:translate-y-full lg:z-20 lg:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-[#111] overflow-y-auto flex items-center"
      >
        <div className="w-full pointer-events-auto">
          <OurValues />
        </div>
      </div>

      {/* 4. Topmost Layer: Our Approach */}
      <div 
        ref={approachRef}
        className="relative lg:absolute lg:inset-0 w-full lg:h-full lg:translate-y-full lg:z-30 lg:shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-[#111] overflow-y-auto flex items-center"
      >
        <div className="w-full pointer-events-auto">
          <OurApproach />
        </div>
      </div>

    </section>
  );
}
