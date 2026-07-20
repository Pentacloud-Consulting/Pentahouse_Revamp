"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ctaImages = [
  "/Featured Project images/Featured Project -1.webp",
  "/Featured Project images/Featured Project -2.webp",
  "/Featured Project images/Featured Project -3.webp"
];

export default function CTA() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % ctaImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const pushVariants: Variants = {
    enter: { x: "100%" },
    center: { x: 0 },
    exit: { x: "-100%" }
  };

  return (
    <section className="relative py-14 md:py-20 overflow-hidden text-white flex items-center">
      <div className="absolute inset-0 z-0 bg-[#111]">
        <AnimatePresence initial={false} custom={currentImg}>
          <motion.img 
            key={currentImg}
            variants={pushVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 1, ease: [0.77, 0, 0.175, 1] }}
            src={ctaImages[currentImg]} 
            alt="CTA Background" 
            className="absolute inset-0 w-full h-full object-cover z-10" 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-20 pointer-events-none"></div>
      </div>
      
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-center items-center">
        
        {/* Main Content */}
        <div className="max-w-3xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6 text-[#CBA052] leading-tight"
          >
            Let's Build Your Dream Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-xl text-gray-300 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            We are here to turn your vision into reality with excellence and precision.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full px-0"
          >
            <Link href="/contact" className="bg-[#CBA052] text-black hover:bg-white hover:text-black transition-colors duration-300 px-2 sm:px-6 md:px-8 py-3.5 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider flex-1 sm:flex-none text-center rounded-sm sm:rounded-none truncate">
              GET A FREE QUOTE
            </Link>
            <Link href="/contact" className="border border-white hover:bg-white hover:text-black transition-colors duration-300 px-2 sm:px-6 md:px-8 py-3.5 text-[10px] sm:text-xs md:text-sm font-medium tracking-wider flex-1 sm:flex-none text-center rounded-sm sm:rounded-none truncate">
              SCHEDULE A MEETING
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
