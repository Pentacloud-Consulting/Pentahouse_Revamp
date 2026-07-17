"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building } from "lucide-react";
import Link from "next/link";
import AboutHero from "../PentaHouse/About/AboutHero";
import OurValues from "../PentaHouse/About/OurValues";
import OurApproach from "../PentaHouse/About/OurApproach";

gsap.registerPlugin(ScrollTrigger);

export default function StackedTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* 1. Background Layer: Hero */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <AboutHero />
      </div>

      {/* 2. Middle Layer: Curtains (Who We Are) */}
      <div className="absolute inset-0 w-full h-full flex pointer-events-none z-10">
        {/* Left Curtain */}
        <div 
          ref={leftPanelRef} 
          className="w-1/2 h-full bg-[#0a0a0a] translate-x-[-100%] pointer-events-auto flex items-center justify-end px-4 sm:px-8 lg:px-12 border-r border-white/5"
        >
          <div className="w-full max-w-[620px] ml-auto">
            <p className="text-[#CBA052] font-bold tracking-widest text-xs mb-4 uppercase">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold mb-6 lg:mb-8 leading-[1.2] text-white">Redefining Quality<br />in Construction</h2>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
              Pentahouse is a Bangalore-based construction and architecture firm delivering premium residential, commercial, and architectural solutions.
            </p>
            <p className="text-gray-400 mb-8 lg:mb-10 leading-relaxed text-sm md:text-base">
              With a strong focus on innovation, craftsmanship, and client satisfaction, we transform ideas into exceptional spaces.
            </p>
            <Link href="/services" className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-black transition-colors duration-300 px-8 py-3.5 rounded text-sm font-bold tracking-widest uppercase flex items-center gap-3 w-fit">
              Our Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Curtain */}
        <div 
          ref={rightPanelRef} 
          className="w-1/2 h-full bg-[#0a0a0a] translate-x-[100%] pointer-events-auto flex items-center justify-start px-4 sm:px-8 lg:px-12"
        >
          <div className="w-full max-w-[620px] mr-auto relative">
            <img 
              src="/Images/About-PentaHouse.jpg" 
              alt="Pentahouse Architecture" 
              className="w-full h-auto rounded-xl shadow-2xl" 
            />
            {/* Floating Card */}
            <div className="absolute -bottom-6 left-2 sm:-left-8 bg-[#111111]/95 backdrop-blur-md border border-[#CBA052]/30 p-4 sm:p-6 rounded-xl flex items-center gap-3 sm:gap-5 shadow-2xl z-10 w-52 sm:w-64 scale-90 sm:scale-100 origin-bottom-left">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-[#CBA052] flex items-center justify-center shrink-0 text-[#CBA052]">
                <Building size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">10+</p>
                <p className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Top Layer: Our Values */}
      <div 
        ref={valuesRef}
        className="absolute inset-0 w-full h-full translate-y-[100%] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-[#111] overflow-y-auto flex items-center"
      >
        <div className="w-full">
          <OurValues />
        </div>
      </div>

      {/* 4. Topmost Layer: Our Approach */}
      <div 
        ref={approachRef}
        className="absolute inset-0 w-full h-full translate-y-[100%] z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-[#111] overflow-y-auto flex items-center"
      >
        <div className="w-full">
          <OurApproach />
        </div>
      </div>

    </section>
  );
}
