"use client";

import { useEffect, useRef } from "react";
import { PenTool, Home, HardHat, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhatWeOffer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(".offer-header > *", 
          { y: 20, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 98%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 0.2, stagger: 0.02, ease: "power2.out" }
        );
        gsap.fromTo(".offer-card", 
          { y: 20, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 95%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 0.2, stagger: 0.02, ease: "power2.out" }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-12">
      <div className="offer-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <h3 className="text-[#CBA052] font-bold tracking-widest text-xs uppercase">What We Offer</h3>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">Built Around<br/>Your Needs</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {[
          { id: "01", title: "Concept Design", desc: "Transforming ideas into innovative designs that lay the foundation for extraordinary spaces.", icon: <PenTool size={32} className="w-6 h-6 lg:w-8 lg:h-8" /> },
          { id: "02", title: "Home Building", desc: "We build homes that blend modern aesthetics with lasting quality and comfort. Your dream home, delivered with precision.", icon: <Home size={32} className="w-6 h-6 lg:w-8 lg:h-8" />, active: true },
          { id: "03", title: "Apartment Construction", desc: "High-quality apartment complexes designed for modern living and community comfort.", icon: <HardHat size={32} className="w-6 h-6 lg:w-8 lg:h-8" /> },
        ].map((card, idx) => (
          <div 
            key={idx} 
            className={`offer-card relative p-6 lg:p-10 rounded-sm flex flex-col justify-between h-full min-h-[240px] lg:min-h-[360px] transition-all duration-500 hover:-translate-y-2 group ${
              card.active ? "bg-[#111111] border border-[#CBA052]" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <div className={`absolute top-6 right-6 lg:top-8 lg:right-8 text-2xl lg:text-3xl font-bold ${card.active ? "text-[#CBA052]" : "text-gray-200"}`}>
              {card.id}
            </div>
            
            <div className={`mb-6 lg:mb-12 transition-colors ${card.active ? "text-[#CBA052]" : "text-[#CBA052] group-hover:text-black"}`}>
              {card.icon}
            </div>
            
            <div className="space-y-3 lg:space-y-4 mt-auto">
              <h4 className={`text-lg lg:text-xl font-bold ${card.active ? "text-white" : "text-black"}`}>{card.title}</h4>
              <p className={`text-xs lg:text-sm leading-relaxed ${card.active ? "text-gray-400" : "text-gray-600"}`}>
                {card.desc}
              </p>
              <div className={`pt-2 lg:pt-4 ${card.active ? "text-[#CBA052]" : "text-black"}`}>
                <ArrowRight size={24} className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
