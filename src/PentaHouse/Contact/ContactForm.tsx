"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function ContactForm() {
  const [projectType, setProjectType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="lg:col-span-5 bg-[#121212] border border-[#CBA052]/30 rounded-xl lg:rounded-2xl p-5 sm:p-8 shadow-2xl relative z-20 mt-8 lg:mt-12"
    >
      <p className="text-[#CBA052] font-semibold tracking-widest text-[10px] lg:text-xs mb-4 lg:mb-8 uppercase">Send Us A Message</p>
      
      <form className="space-y-3 lg:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
          />
          <div className="relative">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full bg-[#1a1a1a] border rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm transition-all outline-none flex items-center justify-between cursor-pointer select-none ${
                isDropdownOpen ? "border-[#CBA052] ring-1 ring-[#CBA052]" : "border-white/5 hover:border-white/20"
              } ${projectType ? "text-white" : "text-gray-500"}`}
            >
              <span>{projectType || "Project Type"}</span>
              <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-full mt-1 lg:mt-2 bg-[#1a1a1a] border border-[#CBA052]/30 rounded-md lg:rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  {["Residential", "Commercial", "Hospitality"].map((type) => (
                    <div 
                      key={type}
                      onClick={() => { setProjectType(type); setIsDropdownOpen(false); }}
                      className="px-3 py-2 lg:px-4 lg:py-3 text-[11px] lg:text-sm text-gray-300 hover:text-white hover:bg-[#CBA052]/20 cursor-pointer transition-colors"
                    >
                      {type}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <input 
          type="text" 
          placeholder="Subject" 
          className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
        />

        <textarea 
          placeholder="Your Message" 
          rows={4}
          className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none resize-none"
        ></textarea>

        <button 
          type="button" 
          className="mt-2 lg:mt-4 bg-[#CBA052] hover:bg-white text-black font-bold text-[10px] lg:text-sm tracking-widest px-6 py-3 lg:px-8 lg:py-4 rounded-md uppercase flex items-center justify-center lg:justify-start gap-2 lg:gap-3 transition-colors duration-300 w-full sm:w-auto"
        >
          Send Message <ArrowRight className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]" />
        </button>
      </form>
    </motion.div>
  );
}
