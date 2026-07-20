"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, Square, Calendar, Home, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const featuredProjects = [
  {
    title: "Skyline Haven Residences",
    description: "A premium residential development crafted for modern living. Skyline Haven blends luxury, comfort, and thoughtful design in perfect harmony.",
    location: "Bangalore, Karnataka", area: "46,000 sq.ft.", year: "2024", type: "Residential",
    image: "/Featured Project images/Featured Project -1.webp"
  },
  {
    title: "The Ivory Retreat",
    description: "An exclusive beachfront property offering panoramic ocean views with state-of-the-art smart home integration and sustainable materials.",
    location: "Mumbai, Maharashtra", area: "32,500 sq.ft.", year: "2023", type: "Residential",
    image: "/Featured Project images/Featured Project -2.webp"
  },
  {
    title: "Vertex Business Park",
    description: "A visionary commercial hub designed to foster innovation, featuring open-plan workspaces and green energy systems.",
    location: "Pune, Maharashtra", area: "120,000 sq.ft.", year: "2024", type: "Commercial",
    image: "/Featured Project images/Featured Project -3.webp"
  },
  {
    title: "Aura Villas",
    description: "Luxury villas nestled in lush greenery, offering private pools, expansive terraces, and a tranquil escape from the city.",
    location: "Goa, India", area: "26,000 sq.ft.", year: "2022", type: "Residential",
    image: "/Featured Project images/Featured Project -4.webp"
  },
  {
    title: "Timeless Monolith",
    description: "An architectural masterpiece defined by its brutalist geometry, large concrete facades, and minimalist interior aesthetic.",
    location: "Hyderabad, Telangana", area: "18,000 sq.ft.", year: "2023", type: "Architectural",
    image: "/Featured Project images/Featured Project -5.webp"
  },
  {
    title: "Minimalist Luxury",
    description: "Award-winning interior design focusing on raw textures, natural light, and bespoke furniture for an elite lifestyle.",
    location: "Delhi, NCR", area: "6,500 sq.ft.", year: "2024", type: "Interior",
    image: "/Featured Project images/Featured Project -1.webp"
  },
  {
    title: "Nexus Corporate Tower",
    description: "A striking 40-story glass skyscraper redefining the city skyline, built with premium steel and glass architecture.",
    location: "Bangalore, Karnataka", area: "250,000 sq.ft.", year: "2025", type: "Commercial",
    image: "/Featured Project images/Featured Project -2.webp"
  },
  {
    title: "The Green Courtyard",
    description: "An eco-friendly residential complex designed around a massive central courtyard, bringing nature directly into living spaces.",
    location: "Chennai, Tamil Nadu", area: "22,000 sq.ft.", year: "2022", type: "Residential",
    image: "/Featured Project images/Featured Project -3.webp"
  },
  {
    title: "The Urban Pavilion",
    description: "A cultural architectural landmark built to host international exhibitions, featuring a sweeping timber roof.",
    location: "Ahmedabad, Gujarat", area: "15,000 sq.ft.", year: "2024", type: "Architectural",
    image: "/Featured Project images/Featured Project -4.webp"
  },
  {
    title: "Executive Workspace",
    description: "Premium office interiors tailored for high-end corporate clients, balancing sophistication with ergonomic utility.",
    location: "Mumbai, Maharashtra", area: "4,800 sq.ft.", year: "2023", type: "Interior",
    image: "/Featured Project images/Featured Project -5.webp"
  }
];

export default function FeaturedProjects() {
  const [carouselIndex, setCarouselIndex] = useState(20); // Middle of 5 sets (50 items total)

  const repeatedProjects = Array(5).fill(featuredProjects).flat();
  const activeProject = repeatedProjects[carouselIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-[#111111] rounded-3xl overflow-hidden border border-white/5 flex flex-col lg:flex-row shadow-2xl relative"
    >
      {/* Content */}
      <div className="p-6 lg:p-16 lg:w-1/3 flex flex-col justify-center relative z-20 bg-[#111111] overflow-hidden order-2 lg:order-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[#CBA052] font-bold tracking-widest text-[10px] mb-2 lg:mb-4 uppercase">Featured Project</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-4 leading-tight">{activeProject.title}</h2>
            <div className="flex items-center gap-2 text-gray-400 text-xs lg:text-sm mb-4 lg:mb-8">
              <MapPin className="text-[#CBA052] w-3 h-3 lg:w-4 lg:h-4" />
              {activeProject.location}
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 lg:mb-10 text-[11px] lg:text-sm">
              {activeProject.description}
            </p>
            
            <div className="grid grid-cols-3 gap-2 mb-8 lg:mb-12">
              <div>
                <div className="flex items-center gap-1.5 text-[#CBA052] mb-1 lg:mb-1.5">
                  <Square className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  <span className="text-[8px] lg:text-xs font-semibold uppercase">Area</span>
                </div>
                <p className="text-white text-[10px] lg:text-sm font-medium">{activeProject.area}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#CBA052] mb-1 lg:mb-1.5">
                  <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  <span className="text-[8px] lg:text-xs font-semibold uppercase">Year</span>
                </div>
                <p className="text-white text-[10px] lg:text-sm font-medium">{activeProject.year}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#CBA052] mb-1 lg:mb-1.5">
                  <Home className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  <span className="text-[8px] lg:text-xs font-semibold uppercase">Type</span>
                </div>
                <p className="text-white text-[10px] lg:text-sm font-medium">{activeProject.type}</p>
              </div>
            </div>

            <Link href="/projects" className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-black transition-colors duration-300 px-6 py-2.5 lg:px-8 lg:py-3 rounded text-xs lg:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 lg:gap-3 w-fit">
              View Project <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image & Thumbnails */}
      <div className="lg:w-2/3 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] overflow-hidden group order-1 lg:order-2">
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeProject.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={activeProject.image} 
            alt={activeProject.title} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </AnimatePresence>
        
        {/* Thumbnails Overlay */}
        <div className="absolute bottom-6 left-0 w-full px-6 flex justify-center z-10 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto max-w-full">
            <button 
              onClick={() => setCarouselIndex((prev) => prev - 1)}
              className="w-10 h-10 shrink-0 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* Scrollable Thumbnails Track */}
            <div className="flex gap-3 overflow-hidden" style={{ width: 'calc(4 * 5rem + 3 * 0.75rem)' }}>
              <motion.div 
                className="flex gap-3"
                animate={{ x: `calc(-${carouselIndex} * (5rem + 0.75rem))` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {repeatedProjects.map((proj, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-20 shrink-0 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${idx === carouselIndex ? 'border-[#CBA052]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={proj.image} alt="thumbnail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </motion.div>
            </div>

            <button 
              onClick={() => setCarouselIndex((prev) => prev + 1)}
              className="w-10 h-10 shrink-0 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
