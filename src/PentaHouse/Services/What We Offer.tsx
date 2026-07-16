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
      gsap.fromTo(".offer-header > *", 
        { y: 30, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 85%" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(".offer-card", 
        { y: 50, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 75%" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: "01", title: "Concept Design", desc: "Transforming ideas into innovative designs that lay the foundation for extraordinary spaces.", icon: <PenTool size={32} /> },
          { id: "02", title: "Home Building", desc: "We build homes that blend modern aesthetics with lasting quality and comfort. Your dream home, delivered with precision.", icon: <Home size={32} />, active: true },
          { id: "03", title: "Apartment Construction", desc: "High-quality apartment complexes designed for modern living and community comfort.", icon: <HardHat size={32} /> },
        ].map((card, idx) => (
          <div 
            key={idx} 
            className={`offer-card relative p-8 lg:p-10 rounded-sm flex flex-col justify-between h-full min-h-[360px] transition-all duration-500 hover:-translate-y-2 group ${
              card.active ? "bg-[#111111] border border-[#CBA052]" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <div className={`absolute top-8 right-8 text-3xl font-bold ${card.active ? "text-[#CBA052]" : "text-gray-200"}`}>
              {card.id}
            </div>
            
            <div className={`mb-12 transition-colors ${card.active ? "text-[#CBA052]" : "text-[#CBA052] group-hover:text-black"}`}>
              {card.icon}
            </div>
            
            <div className="space-y-4 mt-auto">
              <h4 className={`text-xl font-bold ${card.active ? "text-white" : "text-black"}`}>{card.title}</h4>
              <p className={`text-sm leading-relaxed ${card.active ? "text-gray-400" : "text-gray-600"}`}>
                {card.desc}
              </p>
              <div className={`pt-4 ${card.active ? "text-[#CBA052]" : "text-black"}`}>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
