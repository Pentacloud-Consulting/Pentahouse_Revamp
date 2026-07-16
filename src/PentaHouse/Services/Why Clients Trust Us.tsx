"use client";

import { useEffect, useRef } from "react";
import { Building2, Award, Settings, Users, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhyClientsTrustUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      gsap.fromTo(".discover-left > *", 
        { x: -40, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 80%" }, x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(".discover-right-header", 
        { y: 20, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 80%" }, y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".discover-item", 
        { x: 40, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 75%" }, x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 bg-[#111111] border border-white/5 rounded-sm overflow-hidden">
      {/* Left Panel */}
      <div className="lg:col-span-4 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 relative">
        <div className="discover-left space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/20 text-[#CBA052]">
            <Building2 size={28} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold">Why Clients<br/>Trust Us</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            We combine experience, innovation, and integrity to deliver spaces that stand the test of time.
          </p>
        </div>
        {/* Subtle background building overlay */}
        <div className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none">
          <Building2 size={300} className="transform -translate-x-1/4 translate-y-1/4" />
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center">
        <h3 className="discover-right-header text-xl font-bold mb-8">Discover the Reasons</h3>
        <div className="space-y-6">
          {[
            { icon: <Award size={24} />, title: "Proven Expertise", desc: "Years of experience in residential, commercial, and architectural construction." },
            { icon: <Settings size={24} />, title: "Quality & Safety", desc: "We follow the highest standards of quality and safety in every project." },
            { icon: <Users size={24} />, title: "Innovative Solutions", desc: "Modern methods and creative thinking to build better, smarter spaces." }
          ].map((item, idx) => (
            <div key={idx} className="discover-item flex items-center gap-6 group cursor-pointer border border-transparent hover:border-white/5 p-4 -mx-4 rounded-lg transition-all duration-300 hover:bg-white/[0.02]">
              <div className="w-16 h-16 shrink-0 rounded-lg border border-[#CBA052]/30 flex items-center justify-center text-[#CBA052] bg-[#CBA052]/5 transition-colors group-hover:bg-[#CBA052]/10 group-hover:border-[#CBA052]/50">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1 group-hover:text-[#CBA052] transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <div className="text-[#CBA052] opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
