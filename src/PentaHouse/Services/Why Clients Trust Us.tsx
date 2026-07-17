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
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
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
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 bg-[#111111] border border-white/5 rounded-sm overflow-hidden min-h-[300px] lg:min-h-[500px]">
      {/* Left Panel */}
      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden p-5 lg:p-12 flex flex-col justify-end min-h-[220px] lg:min-h-0">
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
              className="space-y-4 lg:space-y-6"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#CBA052]/20 flex items-center justify-center bg-[#CBA052]/10 text-[#CBA052] backdrop-blur-md">
                {activeIndex === null ? <Building2 size={24} strokeWidth={1.5} className="lg:w-7 lg:h-7" /> : reasons[activeIndex].icon}
              </div>
              <h2 className="text-xl lg:text-3xl font-bold text-white drop-shadow-md">
                {activeIndex === null ? (
                  <>Why Clients<br/>Trust Us</>
                ) : (
                  <>{reasons[activeIndex].title}</>
                )}
              </h2>
              <p className="text-gray-200 text-xs lg:text-sm leading-relaxed max-w-xs drop-shadow-md">
                {activeIndex === null 
                  ? "We combine experience, innovation, and integrity to deliver spaces that stand the test of time." 
                  : reasons[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="lg:col-span-8 p-5 lg:p-12 flex flex-col justify-center">
        <h3 className="discover-right-header text-base lg:text-xl font-bold mb-4 lg:mb-8">Discover the Reasons</h3>
        <div className="space-y-3 lg:space-y-6">
          {reasons.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              className={`discover-item flex items-center gap-3 lg:gap-6 group cursor-pointer border p-3 lg:p-4 -mx-2 lg:-mx-4 rounded-lg transition-all duration-300 ${
                activeIndex === idx 
                  ? 'border-[#CBA052]/30 bg-[#CBA052]/5' 
                  : 'border-transparent hover:border-white/5 hover:bg-white/[0.02]'
              }`}
            >
              <div className={`w-10 h-10 lg:w-16 lg:h-16 shrink-0 rounded-lg border flex items-center justify-center transition-colors ${
                activeIndex === idx 
                  ? 'bg-[#CBA052]/20 border-[#CBA052]/50 text-[#CBA052]' 
                  : 'border-[#CBA052]/30 text-[#CBA052] bg-[#CBA052]/5 group-hover:bg-[#CBA052]/10 group-hover:border-[#CBA052]/50'
              }`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-sm lg:text-base mb-0.5 lg:mb-1 transition-colors ${
                  activeIndex === idx ? 'text-[#CBA052]' : 'text-white group-hover:text-[#CBA052]'
                }`}>
                  {item.title}
                </h4>
                <p className="text-gray-400 text-xs lg:text-sm leading-snug lg:leading-normal">{item.desc}</p>
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
