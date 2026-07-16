"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 lg:pt-32 border-b border-white/5 bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Videos/PentaHouse_Video_main.mp4" type="video/mp4" />
        </video>
        {/* Top black gradient overlay for navbar legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a0a0a]/80 backdrop-blur-md border border-[#CBA052]/30 border-l-0 rounded-r-3xl py-12 pr-10 sm:pr-14 lg:py-16 lg:pr-16 pl-6 sm:pl-8 lg:pl-[max(2rem,calc((100vw-1400px)/2))] inline-block max-w-[95%] md:max-w-[80%] lg:max-w-max shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
        >
          <p className="text-[#CBA052] font-bold tracking-widest text-xs mb-4 uppercase">About Pentahouse</p>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.15]">
            Building Spaces<br />
            <span className="font-serif italic font-normal text-[#CBA052]">That Inspire</span>
          </h1>
          <p className="text-gray-300 max-w-md leading-relaxed text-sm lg:text-base">
            At Pentahouse, we don't just build structures, we create environments that inspire, elevate and stand the test of time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
