"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Mouse } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2075&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2075&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2075&q=80"
];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);
  const [prevImg, setPrevImg] = useState(-1);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom bottom",
      end: "+=100%", // Pin for exactly one viewport height
      pin: true,
      pinSpacing: false, // Allows the next section to smoothly scroll over it
    });
  }, { scope: heroRef });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => {
        setPrevImg(prev);
        return (prev + 1) % heroImages.length;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div ref={heroRef} className="relative w-full">
      <div className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {heroImages.map((src, index) => {
            const isActive = currentImg === index;
            const isPrev = prevImg === index;

            let zIndex = 0;
            let clipPath = "inset(0 0 0 100%)";
            let scale = 1.1;

            if (prevImg === -1 && index === 0) {
              zIndex = 10;
              clipPath = "inset(0 0 0 0%)";
              scale = 1;
            } else if (isActive) {
              zIndex = 10;
              clipPath = "inset(0 0 0 0%)";
              scale = 1;
            } else if (isPrev) {
              zIndex = 5;
              clipPath = "inset(0 0 0 0%)";
              scale = 1;
            }

            return (
              <motion.img 
                key={src}
                src={src}
                initial={false}
                animate={{ clipPath, zIndex, scale }}
                transition={{
                  clipPath: isActive ? { duration: 1.4, ease: [0.77, 0, 0.175, 1] } : { duration: 0 },
                  scale: isActive ? { duration: 4, ease: "linear" } : { duration: 0 }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )
          })}
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-20 opacity-90 pointer-events-none" />
        </div>

        <div className="w-full px-6 lg:px-12 xl:px-16 relative z-20 flex flex-col lg:flex-row justify-between items-center gap-12 mt-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.p variants={fadeInUp} className="text-[#CBA052] font-semibold tracking-widest text-sm mb-4">
              BUILDING DREAMS INTO REALITY
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-instrument font-normal text-5xl md:text-7xl leading-[1.1] mb-6">
              WE BUILD <br />
              HOMES THAT <br />
              LAST FOR <br />
              <span className="text-[#CBA052]">GENERATIONS.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
              Premium residential & commercial construction with modern architecture, engineering excellence, and uncompromising quality.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/contact" className="font-general bg-[#CBA052] text-black hover:bg-white hover:text-black transition-colors duration-300 px-8 py-3.5 text-sm font-bold tracking-wider flex items-center gap-2 group">
                GET FREE CONSULTATION <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link href="/projects" className="font-general border border-white/30 hover:border-white bg-black/30 backdrop-blur-sm text-white px-8 py-3.5 text-sm font-medium tracking-wider flex items-center gap-2 transition-all">
                VIEW PROJECTS <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[0.65rem] tracking-[0.2em] text-gray-400 uppercase">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Mouse size={24} className="text-white/60" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </div>

      {/* Brands Marquee */}
      <div className="border-y border-white/5 bg-[#111111] py-8 overflow-hidden relative text-white">
        <div className="text-center mb-6">
          <p className="text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase">Trusted By Leading Brands</p>
        </div>
        <div className="flex items-center justify-center gap-12 md:gap-24 opacity-60 flex-wrap px-4">
          <span className="text-xl md:text-2xl font-bold tracking-tighter">TATA</span>
          <span className="text-xl md:text-2xl font-black italic">JSW</span>
          <span className="text-xl md:text-2xl font-bold uppercase tracking-tight">UltraTech</span>
          <span className="text-xl md:text-2xl font-bold italic tracking-tighter">Kajaria</span>
          <span className="text-xl md:text-2xl font-medium tracking-tight">asianpaints</span>
          <span className="text-xl md:text-2xl font-bold">Schneider</span>
          <span className="text-xl md:text-2xl font-bold uppercase">HAVELLS</span>
        </div>
      </div>
    </div>
  );
}
