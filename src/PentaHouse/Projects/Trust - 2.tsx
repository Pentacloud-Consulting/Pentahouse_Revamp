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
      className="bg-[#111111] rounded-2xl border border-white/5 py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5"
    >
      <div className="flex items-center gap-4 justify-center">
        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Building2 size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white"><AnimatedNumber value={100} />+</p>
          <p className="text-gray-400 text-xs font-medium">Projects Completed</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Users size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white"><AnimatedNumber value={50} />+</p>
          <p className="text-gray-400 text-xs font-medium">Happy Clients</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Clock size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white"><AnimatedNumber value={10} />+</p>
          <p className="text-gray-400 text-xs font-medium">Years of Experience</p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#CBA052] shrink-0 bg-white/5">
          <Globe size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white"><AnimatedNumber value={3} />+</p>
          <p className="text-gray-400 text-xs font-medium">Global Offices</p>
        </div>
      </div>
    </motion.div>
  );
}
