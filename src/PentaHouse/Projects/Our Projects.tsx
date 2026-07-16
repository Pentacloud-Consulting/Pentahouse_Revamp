"use client";

import { motion } from "framer-motion";

export default function OurProjects() {
  return (
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
  );
}
