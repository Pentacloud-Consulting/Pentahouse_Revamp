"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, Building2, Users, User } from "lucide-react";

const aboutImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1170&q=80"
];

export default function Aboutinfo() {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
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

  const imageVariants = {
    enter: { y: "100%", zIndex: 10 },
    center: { y: 0, zIndex: 10 },
    exit: { y: "-100%", zIndex: 0 }
  };

  return (
    <section className="bg-[#f8f9fa] text-black py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-5 h-[500px]"
          >
            <div className="absolute inset-0 bg-[#CBA052] translate-x-4 translate-y-4 z-0"></div>
            <div className="relative z-10 w-full h-full shadow-2xl overflow-hidden bg-gray-200">
              <AnimatePresence initial={false}>
                <motion.img 
                  key={currentImg}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  src={aboutImages[currentImg]} 
                  alt="Modern Architecture" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-7 grid md:grid-cols-2 gap-10 items-center"
          >
            {/* Text Content Side */}
            <div>
              <motion.p variants={fadeInUp} className="text-[#CBA052] font-bold tracking-wider text-xs mb-3 uppercase">About Pentahouse</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                Building Dreams <br/> Into Reality
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8 leading-relaxed">
                At Pentahouse, we believe every structure we build is more than just concrete and bricks – it's a promise of quality, trust, and a better tomorrow. With 25+ years of expertise, we have delivered iconic residential and commercial projects that stand the test of time.
              </motion.p>
              
              <motion.button variants={fadeInUp} className="border border-black hover:bg-black hover:text-white px-6 py-3 text-xs font-bold tracking-widest flex items-center gap-3 transition-all duration-300">
                KNOW MORE ABOUT US <ArrowRight size={14} />
              </motion.button>
            </div>

            {/* Stats Grid Side */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2">
              <div className="flex flex-col items-center justify-center p-8 border-b border-r border-gray-200">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="mb-3 text-black">
                  <User size={28} strokeWidth={1.2} />
                </motion.div>
                <h4 className="text-3xl font-bold text-gray-900 mb-1">25+</h4>
                <p className="text-xs text-gray-500 text-center">Years<br/>Experience</p>
              </div>
              <div className="flex flex-col items-center justify-center p-8 border-b border-gray-200">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }} className="mb-3 text-black">
                  <Building2 size={28} strokeWidth={1.2} />
                </motion.div>
                <h4 className="text-3xl font-bold text-gray-900 mb-1">350+</h4>
                <p className="text-xs text-gray-500 text-center">Projects<br/>Delivered</p>
              </div>
              <div className="flex flex-col items-center justify-center p-8 border-r border-gray-200">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }} className="mb-3 text-black">
                  <Users size={28} strokeWidth={1.2} />
                </motion.div>
                <h4 className="text-3xl font-bold text-gray-900 mb-1">120+</h4>
                <p className="text-xs text-gray-500 text-center">Team<br/>Experts</p>
              </div>
              <div className="flex flex-col items-center justify-center p-8">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 1.5 }} className="mb-3 text-black">
                  <Trophy size={28} strokeWidth={1.2} />
                </motion.div>
                <h4 className="text-3xl font-bold text-gray-900 mb-1">15</h4>
                <p className="text-xs text-gray-500 text-center">Awards<br/>Won</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
