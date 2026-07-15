"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Square, Calendar, Home, Play, ChevronLeft, ChevronRight, ChevronDown, ArrowRight, Building2, Users, Clock, Globe } from "lucide-react";

const featuredProjects = [
  {
    title: "Skyline Haven Residences",
    description: "A premium residential development crafted for modern living. Skyline Haven blends luxury, comfort, and thoughtful design in perfect harmony.",
    location: "Bangalore, Karnataka", area: "46,000 sq.ft.", year: "2024", type: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "The Ivory Retreat",
    description: "An exclusive beachfront property offering panoramic ocean views with state-of-the-art smart home integration and sustainable materials.",
    location: "Mumbai, Maharashtra", area: "32,500 sq.ft.", year: "2023", type: "Residential",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Vertex Business Park",
    description: "A visionary commercial hub designed to foster innovation, featuring open-plan workspaces and green energy systems.",
    location: "Pune, Maharashtra", area: "120,000 sq.ft.", year: "2024", type: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Aura Villas",
    description: "Luxury villas nestled in lush greenery, offering private pools, expansive terraces, and a tranquil escape from the city.",
    location: "Goa, India", area: "26,000 sq.ft.", year: "2022", type: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Timeless Monolith",
    description: "An architectural masterpiece defined by its brutalist geometry, large concrete facades, and minimalist interior aesthetic.",
    location: "Hyderabad, Telangana", area: "18,000 sq.ft.", year: "2023", type: "Architectural",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Minimalist Luxury",
    description: "Award-winning interior design focusing on raw textures, natural light, and bespoke furniture for an elite lifestyle.",
    location: "Delhi, NCR", area: "6,500 sq.ft.", year: "2024", type: "Interior",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Nexus Corporate Tower",
    description: "A striking 40-story glass skyscraper redefining the city skyline, built with premium steel and glass architecture.",
    location: "Bangalore, Karnataka", area: "250,000 sq.ft.", year: "2025", type: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "The Green Courtyard",
    description: "An eco-friendly residential complex designed around a massive central courtyard, bringing nature directly into living spaces.",
    location: "Chennai, Tamil Nadu", area: "22,000 sq.ft.", year: "2022", type: "Residential",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "The Urban Pavilion",
    description: "A cultural architectural landmark built to host international exhibitions, featuring a sweeping timber roof.",
    location: "Ahmedabad, Gujarat", area: "15,000 sq.ft.", year: "2024", type: "Architectural",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Executive Workspace",
    description: "Premium office interiors tailored for high-end corporate clients, balancing sophistication with ergonomic utility.",
    location: "Mumbai, Maharashtra", area: "4,800 sq.ft.", year: "2023", type: "Interior",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80"
  }
];

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

export default function Projectsample() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [carouselIndex, setCarouselIndex] = useState(20); // Middle of 5 sets (50 items total)

  const filteredProjects = activeCategory === "All Projects" 
    ? projectsList 
    : projectsList.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const repeatedProjects = Array(5).fill(featuredProjects).flat();
  const activeProject = repeatedProjects[carouselIndex];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#CBA052] font-bold tracking-widest text-xs mb-4 uppercase">Our Projects</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]">
              Built on Vision.<br />Driven by Excellence.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Explore our diverse portfolio of residential, commercial, and architectural projects delivered with precision and passion.
            </motion.p>
          </div>
          {/* Right Stats Box */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-[#111111] border border-white/5 rounded-2xl p-8 flex flex-col gap-6 min-w-[280px]">
            <div>
              <p className="text-4xl font-bold text-[#CBA052] mb-1">100+</p>
              <p className="text-gray-400 text-sm font-medium">Projects Completed</p>
            </div>
            <div className="w-full h-px bg-white/10"></div>
            <div>
              <p className="text-4xl font-bold text-[#CBA052] mb-1">10+</p>
              <p className="text-gray-400 text-sm font-medium">Years of Excellence</p>
            </div>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? "border border-[#CBA052] text-[#CBA052] bg-[#CBA052]/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-[#111111] border border-white/10 rounded-full px-5 py-2.5 cursor-pointer hover:bg-white/5 transition-colors">
            <span className="text-sm text-gray-300">Latest First</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </motion.div>

        {/* Featured Project */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-[#111111] rounded-3xl overflow-hidden border border-white/5 mb-16 flex flex-col lg:flex-row shadow-2xl relative"
        >
          {/* Content */}
          <div className="p-10 lg:p-16 lg:w-1/3 flex flex-col justify-center relative z-20 bg-[#111111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[#CBA052] font-bold tracking-widest text-[10px] mb-4 uppercase">Featured Project</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{activeProject.title}</h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
                  <MapPin size={16} className="text-[#CBA052]" />
                  {activeProject.location}
                </div>
                <p className="text-gray-400 leading-relaxed mb-10 text-sm">
                  {activeProject.description}
                </p>
                
                <div className="grid grid-cols-3 gap-2 mb-12">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#CBA052] mb-1.5">
                      <Square size={14} />
                      <span className="text-xs font-semibold uppercase">Area</span>
                    </div>
                    <p className="text-white text-sm font-medium">{activeProject.area}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#CBA052] mb-1.5">
                      <Calendar size={14} />
                      <span className="text-xs font-semibold uppercase">Year</span>
                    </div>
                    <p className="text-white text-sm font-medium">{activeProject.year}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#CBA052] mb-1.5">
                      <Home size={14} />
                      <span className="text-xs font-semibold uppercase">Type</span>
                    </div>
                    <p className="text-white text-sm font-medium">{activeProject.type}</p>
                  </div>
                </div>

                <button className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-black transition-colors duration-300 px-8 py-3 rounded text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 w-fit">
                  View Project <ArrowRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image & Thumbnails */}
          <div className="lg:w-2/3 relative min-h-[400px] lg:min-h-[600px] overflow-hidden group">
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
            <div className="absolute top-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors z-10">
              <Play size={20} className="text-white ml-0.5" fill="white" />
            </div>
            
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

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 group cursor-pointer hover:border-white/10 transition-colors"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play size={16} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <div className="p-6">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section matching image */}
        <div className="bg-[#111111] rounded-3xl overflow-hidden border border-white/5 flex flex-col lg:flex-row mb-12">
          <div className="p-10 lg:p-20 lg:w-1/2 flex flex-col justify-center">
            <p className="text-[#CBA052] font-bold tracking-widest text-xs mb-4 uppercase">Let's Build Together</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">Have a Project in Mind?</h2>
            <p className="text-gray-400 leading-relaxed mb-10 text-lg max-w-md">
              Let's bring your vision to life with expertise and precision.
            </p>
            <button className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-black transition-colors duration-300 px-8 py-3.5 rounded text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 w-fit">
              Start Your Project <ArrowRight size={16} />
            </button>
          </div>
          <div className="lg:w-1/2 h-64 lg:h-auto relative">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80" alt="Architecture blueprints" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:hidden" />
          </div>
        </div>

        {/* Stats Footer Section matching image */}
        <div className="bg-[#111111] rounded-2xl border border-white/5 py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="text-gray-400 text-xs font-medium">Projects Completed</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
              <Users size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">50+</p>
              <p className="text-gray-400 text-xs font-medium">Happy Clients</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10+</p>
              <p className="text-gray-400 text-xs font-medium">Years of Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">3+</p>
              <p className="text-gray-400 text-xs font-medium">Global Offices</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
