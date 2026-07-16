"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Award, Settings, Users, MousePointerClick } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  { icon: <Award size={24} />, title: "Proven Expertise", desc: "Years of experience in residential, commercial, and architectural construction.", image: "/sample/Projects.png" },
  { icon: <Settings size={24} />, title: "Quality & Safety", desc: "We follow the highest standards of quality and safety in every project.", image: "/sample/Services.png" },
  { icon: <Users size={24} />, title: "Innovative Solutions", desc: "Modern methods and creative thinking to build better, smarter spaces.", image: "/sample/About.png" }
];

export default function WhyClientsTrustUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      gsap.fromTo(".discover-left", 
        { x: -40, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 95%", toggleActions: "play reverse play reverse" }, x: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(".discover-right-header", 
        { y: 20, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 95%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(".discover-item", 
        { x: 40, autoAlpha: 0 },
        { scrollTrigger: { trigger: containerRef.current, start: "top 90%", toggleActions: "play reverse play reverse" }, x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 bg-[#111111] border border-white/5 rounded-sm overflow-hidden min-h-[500px]">
      {/* Left Panel */}
      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden p-8 lg:p-12 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex === null ? 'default' : activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={activeIndex === null ? "/Images/About-PentaHouse.jpg" : reasons[activeIndex].image} 
              alt={activeIndex === null ? "Construction Background" : reasons[activeIndex].title} 
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/20" />
          </motion.div>
        </AnimatePresence>

        <div className="discover-left relative z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex === null ? 'default' : activeIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="w-14 h-14 rounded-full border border-[#CBA052]/20 flex items-center justify-center bg-[#CBA052]/10 text-[#CBA052] backdrop-blur-md">
                {activeIndex === null ? <Building2 size={28} strokeWidth={1.5} /> : reasons[activeIndex].icon}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                {activeIndex === null ? (
                  <>Why Clients<br/>Trust Us</>
                ) : (
                  <>{reasons[activeIndex].title}</>
                )}
              </h2>
              <p className="text-gray-200 text-sm leading-relaxed max-w-xs drop-shadow-md">
                {activeIndex === null 
                  ? "We combine experience, innovation, and integrity to deliver spaces that stand the test of time." 
                  : reasons[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center">
        <h3 className="discover-right-header text-xl font-bold mb-8">Discover the Reasons</h3>
        <div className="space-y-6">
          {reasons.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              className={`discover-item flex items-center gap-6 group cursor-pointer border p-4 -mx-4 rounded-lg transition-all duration-300 ${
                activeIndex === idx 
                  ? 'border-[#CBA052]/30 bg-[#CBA052]/5' 
                  : 'border-transparent hover:border-white/5 hover:bg-white/[0.02]'
              }`}
            >
              <div className={`w-16 h-16 shrink-0 rounded-lg border flex items-center justify-center transition-colors ${
                activeIndex === idx 
                  ? 'bg-[#CBA052]/20 border-[#CBA052]/50 text-[#CBA052]' 
                  : 'border-[#CBA052]/30 text-[#CBA052] bg-[#CBA052]/5 group-hover:bg-[#CBA052]/10 group-hover:border-[#CBA052]/50'
              }`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold mb-1 transition-colors ${
                  activeIndex === idx ? 'text-[#CBA052]' : 'text-white group-hover:text-[#CBA052]'
                }`}>
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <div className={`text-[#CBA052] transition-all ${
                activeIndex === idx 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-50 group-hover:opacity-100 group-hover:scale-110'
              }`}>
                <MousePointerClick size={22} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
