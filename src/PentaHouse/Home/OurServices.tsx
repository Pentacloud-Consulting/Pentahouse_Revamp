"use client";

import { cloneElement, ReactElement, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Wrench, PenTool, Ruler, Settings, ArrowRight } from "lucide-react";

export default function OurServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#111111] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#CBA052] font-semibold tracking-widest text-sm mb-3 uppercase">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Comprehensive Construction Solutions</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 text-white">
          {[
            { title: "Residential Construction", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80", icon: <Home /> },
            { title: "Commercial Buildings", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", icon: <Building2 /> },
            { title: "Turnkey Projects", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80", icon: <Wrench /> },
            { title: "Interior Design", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", icon: <PenTool /> },
            { title: "Architecture Planning", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", icon: <Ruler /> },
            { title: "Renovation & Remodeling", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80", icon: <Settings /> }
          ].map((service, idx) => {
            const isHovered = hoveredIndex === idx;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  zIndex: isHovered ? 40 : 10,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative h-52 lg:h-48 xl:h-52 overflow-hidden border border-white/10 hover:border-[#CBA052] transition-colors duration-500 cursor-pointer"
              >
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-0"
                />
                
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                
                <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                  <div className="text-[#CBA052] mb-3 transition-transform duration-500 group-hover:-translate-y-1">
                    {cloneElement(service.icon as ReactElement<any>, { size: 28, strokeWidth: 1.5 })}
                  </div>
                  <h3 className="text-lg font-bold mb-2 pr-4 leading-tight transition-transform duration-500 group-hover:-translate-y-1">{service.title}</h3>
                  <div className="w-8 h-px bg-[#CBA052] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mb-3" />
                  <div className="flex items-center text-xs font-medium tracking-wider text-gray-400 group-hover:text-white transition-colors">
                    <ArrowRight size={14} className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>

                {/* Blur Overlay (z-30) */}
                <motion.div 
                  animate={{ opacity: isOtherHovered ? 1 : 0 }}
                  className="absolute inset-0 z-30 backdrop-blur-[6px] bg-black/40 pointer-events-none"
                  transition={{ duration: 0.4 }}
                />
                
                {/* Logo (z-40) */}
                <div className={`absolute inset-0 z-40 pointer-events-none flex ${isOtherHovered ? 'items-center justify-center' : 'items-start justify-end'} p-4`}>
                  <motion.img
                    layout
                    src="/Logo/LOGO-BG.png"
                    initial={false}
                    animate={{
                      scale: isOtherHovered ? 2.5 : 1,
                      opacity: isOtherHovered ? 1 : 0.6
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Delayed Title (z-50) */}
                <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                  <AnimatePresence>
                    {isOtherHovered && (
                      <motion.h3
                        key={hoveredIndex}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 65 }} 
                        exit={{ opacity: 0, y: 40, transition: { duration: 0.2, delay: 0 } }}
                        transition={{ delay: 1, duration: 0.4 }}
                        className="text-white font-bold text-sm md:text-base text-center tracking-wide drop-shadow-md absolute w-full px-4"
                      >
                        {service.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
