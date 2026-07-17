"use client";

import { useState, useEffect } from "react";
import { MapPin, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projectsList = [
  { id: 1, title: "The Ivory Retreat", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "32,500 sq.ft.", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "Vertex Business Park", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "120,000 sq.ft.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Aura Villas", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "26,000 sq.ft.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "Timeless Monolith", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "18,000 sq.ft.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
  { id: 5, title: "Minimalist Luxury", category: "INTERIOR", location: "Bangalore, Karnataka", area: "6,500 sq.ft.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80" },
  { id: 6, title: "Nexus Corporate Tower", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "250,000 sq.ft.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
  { id: 7, title: "The Green Courtyard", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "22,000 sq.ft.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80" },
  { id: 8, title: "The Urban Pavilion", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "15,000 sq.ft.", image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=600&q=80" },
  { id: 9, title: "Executive Workspace", category: "INTERIOR", location: "Bangalore, Karnataka", area: "4,800 sq.ft.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80" },
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
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-transparent text-[#CBA052] border border-[#CBA052]"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]">
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
              <div className="project-card bg-[#111111] h-full rounded-2xl overflow-hidden border border-white/5 group cursor-pointer transition-all duration-500 ease-out hover:border-[#CBA052]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(203,160,82,0.15)] relative">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-6 relative z-20">
                  <p className="text-[#CBA052] font-bold tracking-widest text-[10px] mb-2 uppercase">{project.category}</p>
                  <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin size={16} className="text-[#CBA052]" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Square size={16} className="text-[#CBA052]" />
                      {project.area}
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
