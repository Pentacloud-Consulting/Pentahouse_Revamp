"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MapPin, Square, X } from "lucide-react";
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
  { id: 9, title: "Skyline Residency", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "35,000 sq.ft.", image: "/Houses/House -1.webp", video: "/Houses Videos/9.mp4" },
  { id: 10, title: "Apex Commercial Hub", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "150,000 sq.ft.", image: "/Houses/House -2.webp", video: "/Houses Videos/10.mp4" },
  { id: 11, title: "Serene Meadows", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "28,000 sq.ft.", image: "/Houses/House -3.webp", video: "/Houses Videos/11.mp4" },
  { id: 12, title: "Modernist Enclave", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "20,000 sq.ft.", image: "/Houses/House -4.webp", video: "/Houses Videos/12.mp4" },
  { id: 13, title: "Elegant Interiors", category: "INTERIOR", location: "Bangalore, Karnataka", area: "8,000 sq.ft.", image: "/Houses/House -5.webp", video: "/Houses Videos/13.mp4" },
  { id: 14, title: "Pinnacle Towers", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "300,000 sq.ft.", image: "/Houses/House -6.webp", video: "/Houses Videos/14.mp4" },
  { id: 15, title: "Oasis Gardens", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "25,000 sq.ft.", image: "/Houses/House -7.webp", video: "/Houses Videos/15.mp4" },
  { id: 16, title: "Structural Symphony", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "16,500 sq.ft.", image: "/Houses/House -8.webp", video: "/Houses Videos/16.mp4" },
  { id: 17, title: "Harmony Heights", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "40,000 sq.ft.", image: "/Houses/House -1.webp", video: "/Houses Videos/17.mp4" },
  { id: 18, title: "Horizon Tech Park", category: "COMMERCIAL", location: "Bangalore, Karnataka", area: "200,000 sq.ft.", image: "/Houses/House -2.webp", video: "/Houses Videos/18.mp4" },
  { id: 19, title: "Lush Living", category: "RESIDENTIAL", location: "Bangalore, Karnataka", area: "30,000 sq.ft.", image: "/Houses/House -3.webp", video: "/Houses Videos/19.mp4" },
  { id: 20, title: "Visionary Architecture", category: "ARCHITECTURAL", location: "Bangalore, Karnataka", area: "22,000 sq.ft.", image: "/Houses/House -4.webp", video: "/Houses Videos/20.mp4" },
  { id: 21, title: "Bespoke Spaces", category: "INTERIOR", location: "Bangalore, Karnataka", area: "9,500 sq.ft.", image: "/Houses/House -5.webp", video: "/Houses Videos/21.mp4" },
];

const categories = ["All Projects", "Residential", "Commercial", "Architectural", "Interior"];

export default function WorkedProjects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
                  if (video) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                      playPromise.catch(err => console.log("Video play error:", err));
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                onClick={() => setSelectedProject(project)}
                className="project-card bg-[#111111] h-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/5 group cursor-pointer transition-all duration-500 ease-out hover:border-[#CBA052]/50 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(203,160,82,0.15)] relative"
              >
                <div className="relative h-32 sm:h-48 lg:h-64 overflow-hidden bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
                  <video
                    src={project.video}
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0 pointer-events-none"
                  />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0 z-10 pointer-events-none" 
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

      {/* Fullscreen Video Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 bg-black/90 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-auto aspect-[4/3] sm:aspect-video rounded-xl lg:rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 lg:top-6 lg:right-6 z-50 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 hover:text-[#CBA052] border border-white/10 transition-all"
                >
                  <X className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                
                <video
                  src={selectedProject.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  className="w-full h-full object-cover pointer-events-none"
                />
                
                <div className="absolute bottom-0 left-0 w-full p-4 lg:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-[#CBA052] font-bold tracking-widest text-[10px] lg:text-xs mb-1 lg:mb-2 uppercase">{selectedProject.category}</p>
                  <h3 className="text-lg lg:text-3xl font-bold text-white mb-2 lg:mb-4">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-4 lg:gap-6 text-gray-300 text-xs lg:text-base">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <MapPin className="w-4 h-4 text-[#CBA052]" />
                      {selectedProject.location}
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <Square className="w-4 h-4 text-[#CBA052]" />
                      {selectedProject.area}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
