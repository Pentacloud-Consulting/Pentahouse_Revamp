"use client";

import { Building2, Users, Clock, Globe } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(v).toString();
          }
        },
      });
    } else if (!isInView && ref.current) {
      // Reset when out of view so it can animate again
      ref.current.textContent = "0";
    }
  }, [value, isInView]);

  return <span ref={ref}>0</span>;
}

export default function Trust2() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#111111] rounded-xl lg:rounded-2xl border border-white/5 py-4 px-2 lg:py-8 lg:px-6 grid grid-cols-4 divide-x divide-white/5 items-center w-full"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-1.5 lg:gap-4 px-1 lg:px-0">
        <div className="w-7 h-7 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Building2 className="w-3.5 h-3.5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[10px] sm:text-xs lg:text-2xl font-bold text-white leading-none mb-0.5 lg:mb-0"><AnimatedNumber value={100} />+</p>
          <p className="text-gray-400 text-[6px] sm:text-[8px] lg:text-xs font-medium leading-[1.1] uppercase lg:normal-case tracking-wider lg:tracking-normal w-full whitespace-normal lg:whitespace-nowrap">Projects Completed</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-1.5 lg:gap-4 px-1 lg:px-0">
        <div className="w-7 h-7 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Users className="w-3.5 h-3.5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[10px] sm:text-xs lg:text-2xl font-bold text-white leading-none mb-0.5 lg:mb-0"><AnimatedNumber value={50} />+</p>
          <p className="text-gray-400 text-[6px] sm:text-[8px] lg:text-xs font-medium leading-[1.1] uppercase lg:normal-case tracking-wider lg:tracking-normal w-full whitespace-normal lg:whitespace-nowrap">Happy Clients</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-1.5 lg:gap-4 px-1 lg:px-0">
        <div className="w-7 h-7 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Clock className="w-3.5 h-3.5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[10px] sm:text-xs lg:text-2xl font-bold text-white leading-none mb-0.5 lg:mb-0"><AnimatedNumber value={10} />+</p>
          <p className="text-gray-400 text-[6px] sm:text-[8px] lg:text-xs font-medium leading-[1.1] uppercase lg:normal-case tracking-wider lg:tracking-normal w-full whitespace-normal lg:whitespace-nowrap">Years of Experience</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-1.5 lg:gap-4 px-1 lg:px-0">
        <div className="w-7 h-7 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Globe className="w-3.5 h-3.5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-[10px] sm:text-xs lg:text-2xl font-bold text-white leading-none mb-0.5 lg:mb-0"><AnimatedNumber value={3} />+</p>
          <p className="text-gray-400 text-[6px] sm:text-[8px] lg:text-xs font-medium leading-[1.1] uppercase lg:normal-case tracking-wider lg:tracking-normal w-full whitespace-normal lg:whitespace-nowrap">Global Offices</p>
        </div>
      </div>
    </motion.div>
  );
}
