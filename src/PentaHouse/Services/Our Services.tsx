"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OurServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".hero-text > *", 
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".hero-img", 
        { x: 40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      <div className="hero-text w-full lg:w-1/2 space-y-6">
        <h3 className="text-[#CBA052] font-bold tracking-widest text-xs uppercase">Our Services</h3>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Building Excellence.<br />
          <span className="text-[#CBA052]">Delivering Trust.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
          At Pentahouse Construction, we deliver end-to-end construction and architectural solutions with precision, transparency, and a commitment to exceptional quality.
        </p>
      </div>
      <div className="hero-img w-full lg:w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" 
          alt="Modern House" 
          className="w-full h-[400px] md:h-[500px] object-cover rounded-sm"
        />
      </div>
    </section>
  );
}
