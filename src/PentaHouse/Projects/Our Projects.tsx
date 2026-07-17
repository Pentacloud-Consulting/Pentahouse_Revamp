"use client";

import { motion } from "framer-motion";

export default function OurProjects() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-12 mb-8 lg:mb-16">
      <div className="max-w-2xl">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[#CBA052] font-bold tracking-widest text-[10px] lg:text-xs mb-2 lg:mb-4 uppercase">Our Projects</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 lg:mb-6 leading-[1.15]">
          Built on Vision.<br />Driven by Excellence.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-[11px] lg:text-lg leading-relaxed max-w-xl pr-4 lg:pr-0">
          Explore our diverse portfolio of residential, commercial, and architectural projects delivered with precision and passion.
        </motion.p>
      </div>
      {/* Right Stats Box */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-[#111111] border border-white/5 rounded-xl lg:rounded-2xl p-4 lg:p-8 flex flex-row lg:flex-col justify-between items-center lg:items-start gap-4 lg:gap-6 w-full lg:w-auto lg:min-w-[280px]">
        <div className="flex flex-col items-center lg:items-start flex-1">
          <p className="text-2xl lg:text-4xl font-bold text-[#CBA052] mb-0.5 lg:mb-1">100+</p>
          <p className="text-gray-400 text-[9px] lg:text-sm font-medium uppercase lg:normal-case tracking-wider lg:tracking-normal text-center lg:text-left">Projects Completed</p>
        </div>
        <div className="w-px h-10 lg:w-full lg:h-px bg-white/10 shrink-0"></div>
        <div className="flex flex-col items-center lg:items-start flex-1">
          <p className="text-2xl lg:text-4xl font-bold text-[#CBA052] mb-0.5 lg:mb-1">10+</p>
          <p className="text-gray-400 text-[9px] lg:text-sm font-medium uppercase lg:normal-case tracking-wider lg:tracking-normal text-center lg:text-left">Years of Excellence</p>
        </div>
      </motion.div>
    </div>
  );
}
