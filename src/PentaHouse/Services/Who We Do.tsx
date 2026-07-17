"use client";

import { useEffect, useRef } from "react";
import { LayoutDashboard, FileSignature, Construction, Clock, ShieldCheck, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(".do-header > *", 
          { y: 30, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
        gsap.fromTo(".do-item", 
          { scale: 0.8, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play reverse play reverse" }, scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-8 md:space-y-12">
      <div className="do-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-white/10 pt-8 md:pt-16">
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-[#CBA052] font-bold tracking-widest text-[10px] md:text-xs uppercase">This is what we do!</h3>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">Choose Us for Unmatched<br/>Expertise and Quality</h2>
        </div>
        <Link href="/projects" className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-white transition-all px-4 md:px-8 py-2 md:py-3 text-[10px] md:text-sm font-bold tracking-wide md:tracking-widest flex items-center gap-2 whitespace-nowrap">
          VIEW ALL PROJECTS <ArrowRight size={16} className="w-3 h-3 md:w-4 md:h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 text-center pt-6 md:pt-8">
        {[
          { icon: LayoutDashboard, title: "Appealing Design", desc: "Beautiful, functional designs crafted to reflect your vision and lifestyle." },
          { icon: FileSignature, title: "Solid Preparation", desc: "Thorough planning and preparation for a strong and successful build." },
          { icon: Construction, title: "Comprehensive Effort", desc: "End-to-end construction solutions with attention to every detail." },
          { icon: Clock, title: "Time Management", desc: "Efficient scheduling and execution to deliver on time, every time." },
          { icon: ShieldCheck, title: "Clean Result", desc: "High-quality finishes and clean, flawless project delivery." },
          { icon: Users, title: "World Class Team", desc: "Expert professionals committed to excellence and client satisfaction." },
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
          <div key={idx} className="do-item flex flex-col items-center space-y-2 md:space-y-4 group">
            <div className="text-[#CBA052] group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-xs md:text-sm text-white">{feature.title}</h4>
            <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed max-w-[150px] mx-auto">{feature.desc}</p>
          </div>
        )})}
      </div>
    </section>
  );
}
