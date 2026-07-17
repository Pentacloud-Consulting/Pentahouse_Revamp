"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ctaImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
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
    <section className="relative py-20 overflow-hidden text-white flex items-center">
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
      
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 flex justify-center items-center">
        
        {/* Main Content */}
        <div className="max-w-4xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-[#CBA052]"
          >
            Let's Build Your Dream Together
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            We are here to turn your vision into reality with excellence and precision.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="bg-[#CBA052] text-black hover:bg-white hover:text-black transition-colors duration-300 px-8 py-3.5 text-sm font-bold tracking-wider w-full sm:w-auto text-center">
              GET A FREE QUOTE
            </Link>
            <Link href="/contact" className="border border-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-3.5 text-sm font-medium tracking-wider w-full sm:w-auto text-center">
              SCHEDULE A MEETING
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
