"use client";

import { useState, useEffect } from "react";
import { MapPin, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projectsList = [
  { id: 1, title: "The Ivory Retreat", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "32,500 sq.ft.", image: "/Houses/House -1.webp", video: "/Houses Videos/1.mp4" },
  { id: 2, title: "Vertex Business Park", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "120,000 sq.ft.", image: "/Houses/House -2.webp", video: "/Houses Videos/2.mp4" },
  { id: 3, title: "Aura Villas", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "26,000 sq.ft.", image: "/Houses/House -3.webp", video: "/Houses Videos/3.mp4" },
  { id: 4, title: "Timeless Monolith", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "18,000 sq.ft.", image: "/Houses/House -4.webp", video: "/Houses Videos/4.mp4" },
  { id: 5, title: "Minimalist Luxury", category: "INTERIOR", location: "Bangalore, Karnataka", area: "6,500 sq.ft.", image: "/Houses/House -5.webp", video: "/Houses Videos/5.mp4" },
  { id: 6, title: "Nexus Corporate Tower", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "250,000 sq.ft.", image: "/Houses/House -6.webp", video: "/Houses Videos/6.mp4" },
  { id: 7, title: "The Green Courtyard", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "22,000 sq.ft.", image: "/Houses/House -7.webp", video: "/Houses Videos/7.mp4" },
  { id: 8, title: "The Urban Pavilion", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "15,000 sq.ft.", image: "/Houses/House -8.webp", video: "/Houses Videos/8.mp4" },
];

const categories = ["All Projects", "Residential", "Commercial", "Architectural", "Interior"];

export default function WorkedProjects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects = activeCategory === "All Projects"
    ? projectsList
    : projectsList.filter(p => p.category.toUpperCase() === activeCategory.toUpperCase());

  useEffect(() => {
    // 1. Refresh immediately after state change so GSAP catches the new grid height
    const immediateTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 10);

    // 2. Refresh again after the layout animation finishes
    const finalTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400); 
    
    return () => {
      clearTimeout(immediateTimeout);
      clearTimeout(finalTimeout);
    };
  }, [activeCategory]);

  return (
    <div>
      {/* Category Filter */}
      <div className="grid grid-cols-6 md:flex md:flex-wrap items-center justify-center gap-2 lg:gap-4 mb-8 lg:mb-12 px-2 lg:px-0">
        {categories.map((category, idx) => {
          let mobileColClass = "col-span-2";
          if (idx === 3) mobileColClass = "col-start-2 col-span-2";
          if (idx === 4) mobileColClass = "col-start-4 col-span-2";
          
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${mobileColClass} md:col-auto px-1 py-1.5 lg:px-6 lg:py-2.5 rounded-full text-[9px] sm:text-[10px] lg:text-sm font-medium transition-all duration-300 whitespace-nowrap text-center flex items-center justify-center ${
                activeCategory === category
                  ? "bg-transparent text-[#CBA052] border border-[#CBA052]"
                  : "text-gray-400 hover:text-white border border-white/5 lg:border-transparent"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 relative min-h-[200px] lg:min-h-[400px]">
        <AnimatePresence initial={false} mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                opacity: { duration: 0.3 },
                layout: { type: "spring", bounce: 0.2, duration: 0.6 }
              }}
              className="h-full"
            >
              <div 
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                className="project-card bg-[#111111] h-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/5 group cursor-pointer transition-all duration-500 ease-out hover:border-[#CBA052]/50 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(203,160,82,0.15)] relative"
              >
                <div className="relative h-32 sm:h-48 lg:h-64 overflow-hidden bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
                  <video
                    src={project.video}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0"
                  />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0 z-10" 
                  />
                </div>
                <div className="p-3 lg:p-6 relative z-20">
                  <p className="text-[#CBA052] font-bold tracking-widest text-[8px] lg:text-[10px] mb-1 lg:mb-2 uppercase">{project.category}</p>
                  <h3 className="text-xs sm:text-sm lg:text-xl font-bold text-white mb-2 lg:mb-4 line-clamp-2 leading-tight">{project.title}</h3>
                  <div className="flex flex-col gap-1 lg:gap-2.5">
                    <div className="flex items-center gap-1.5 lg:gap-2 text-gray-400 text-[8px] sm:text-[10px] lg:text-sm">
                      <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-[#CBA052] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2 text-gray-400 text-[8px] sm:text-[10px] lg:text-sm">
                      <Square className="w-3 h-3 lg:w-4 lg:h-4 text-[#CBA052] shrink-0" />
                      <span className="truncate">{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
