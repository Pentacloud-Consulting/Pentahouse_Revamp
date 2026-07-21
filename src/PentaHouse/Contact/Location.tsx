"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import React from "react";

export default function Location() {
  return (
    <section className="relative bg-[#0a0a0a] pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#CBA052]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 lg:mb-24 gap-6 md:gap-10"
        >
          {/* Left Side: Title */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#CBA052]"></span>
              <p className="text-[#CBA052] font-semibold tracking-[0.2em] text-[10px] lg:text-xs uppercase">Our Location</p>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Visit Our <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBA052] to-white">Headquarters</span>
            </h2>
          </div>

          {/* Right Side: Description */}
          <div className="flex-1 flex md:justify-end">
            <p className="text-gray-400 md:text-right max-w-md text-sm md:text-base leading-relaxed">
              Experience our world-class design studio in person. Discover materials, consult with our architects, and start bringing your vision to life.
            </p>
          </div>
        </motion.div>

        <div className="relative group">
          {/* Soft Outer Glow on Hover */}
          <div className="absolute -inset-1 bg-[#CBA052]/30 blur-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-2xl p-[1px] overflow-hidden shadow-2xl bg-transparent md:bg-white/10 md:group-hover:bg-transparent transition-colors duration-500"
          >
            {/* Animated Moving Border (Conic Gradient) */}
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#CBA052_360deg)] opacity-100 md:opacity-0 md:group-hover:opacity-100 animate-spin [animation-duration:3s] transition-opacity duration-700 pointer-events-none" />
            
            {/* Inner Content Container */}
            <div className="relative flex flex-col md:block w-full md:aspect-video lg:aspect-[21/9] rounded-[15px] overflow-hidden bg-[#141414] z-10">
              {/* Map Iframe Container */}
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-full md:absolute md:inset-0">
                <iframe
                  src="https://maps.google.com/maps?q=RT%20Nagar%20Bangalore%20560032&t=m&z=14&output=embed&iwloc=near"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) invert(100%) contrast(83%)" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full object-cover"
                ></iframe>
                
                {/* Glass Overlays */}
                <div className="absolute inset-0 bg-[#CBA052]/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
              </div>

              {/* Location Card (Below map on mobile, floating on desktop) */}
              <div className="relative md:absolute w-full md:w-auto md:bottom-10 md:left-10 bg-[#0a0a0a]/60 md:bg-[#0a0a0a]/40 backdrop-blur-xl border-t border-white/5 md:border md:border-white/10 p-5 md:p-8 md:rounded-xl md:max-w-sm shadow-2xl transition-all duration-700 md:group-hover:border-[#CBA052]/30 overflow-hidden group/card z-20">
                {/* Blurred Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="/Featured Project images/Featured Project -5.webp" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-50 blur-[3px] scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-[#0a0a0a]/50" />
                </div>
                
                {/* Small Logo in Top Right of Card */}
                <img src="/Logo/LOGO-BG.png" alt="Pentahouse" className="absolute top-4 right-4 md:top-5 md:right-5 h-5 md:h-8 opacity-30 object-contain z-10 pointer-events-none group-hover/card:opacity-60 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#CBA052]/10 flex items-center justify-center shrink-0 border border-[#CBA052]/30 group-hover:border-[#CBA052] transition-colors duration-500">
                    <MapPin className="w-5 h-5 text-[#CBA052]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Pentahouse Studio</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      RT Nagar, Bangalore 560032, Karnataka, India.
                    </p>
                  </div>
                </div>
                
                <a 
                  href="https://maps.app.goo.gl/RroX6MtUyCS2yujZA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center bg-white text-black hover:text-black font-semibold text-xs md:text-sm py-3.5 px-4 rounded-lg transition-colors duration-300 uppercase tracking-wider relative overflow-hidden group/btn z-10"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="transition-transform duration-500 group-hover/btn:rotate-45">
                      <Navigation className="w-4 h-4 group-hover/btn:animate-fly" />
                    </span>
                    <span>Get Directions</span>
                  </span>
                  <div className="absolute inset-0 bg-[#CBA052] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
