"use client";

import { useEffect, useRef } from "react";
import { LayoutDashboard, FileSignature, Construction, Clock, ShieldCheck, Users, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      gsap.fromTo(".do-header > *", 
        { y: 30, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(".do-item", 
        { scale: 0.8, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play reverse play reverse" }, scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-12">
      <div className="do-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-white/10 pt-16">
        <div className="space-y-4">
          <h3 className="text-[#CBA052] font-bold tracking-widest text-xs uppercase">This is what we do!</h3>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">Choose Us for Unmatched<br/>Expertise and Quality</h2>
        </div>
        <button className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-white transition-all px-8 py-3 text-sm font-bold tracking-widest flex items-center gap-2">
          VIEW ALL PROJECTS <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center pt-8">
        {[
          { icon: <LayoutDashboard size={32} strokeWidth={1.5} />, title: "Appealing Design", desc: "Beautiful, functional designs crafted to reflect your vision and lifestyle." },
          { icon: <FileSignature size={32} strokeWidth={1.5} />, title: "Solid Preparation", desc: "Thorough planning and preparation for a strong and successful build." },
          { icon: <Construction size={32} strokeWidth={1.5} />, title: "Comprehensive Effort", desc: "End-to-end construction solutions with attention to every detail." },
          { icon: <Clock size={32} strokeWidth={1.5} />, title: "Time Management", desc: "Efficient scheduling and execution to deliver on time, every time." },
          { icon: <ShieldCheck size={32} strokeWidth={1.5} />, title: "Clean Result", desc: "High-quality finishes and clean, flawless project delivery." },
          { icon: <Users size={32} strokeWidth={1.5} />, title: "World Class Team", desc: "Expert professionals committed to excellence and client satisfaction." },
        ].map((feature, idx) => (
          <div key={idx} className="do-item flex flex-col items-center space-y-4 group">
            <div className="text-[#CBA052] group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h4 className="font-bold text-sm text-white">{feature.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[150px] mx-auto">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
