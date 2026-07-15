"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const testimonialsData = [
  {
    text: "Pentahouse turned our dream home into a reality. Their attention to detail and commitment to quality is unmatched.",
    name: "Rohan Mehta",
    location: "Bangalore",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "The commercial complex they constructed for our company was completed ahead of schedule without compromising any design aesthetics. Truly a premium experience.",
    name: "Priya Sharma",
    location: "Mumbai",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    text: "From the initial architecture planning to the final turnkey handover, Pentahouse demonstrated exceptional expertise. I highly recommend them for luxury projects.",
    name: "Anand Verma",
    location: "Delhi",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  const [sliderPos, setSliderPos] = useState(50);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="py-24 bg-[#111111] relative border-b border-white/5 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Functional Before & After Image Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video bg-gray-900 overflow-hidden border border-white/10 group"
          >
            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-1 text-xs font-bold tracking-widest text-white uppercase border border-white/10 pointer-events-none">Before & After</div>
            
            <div className="relative w-full h-full">
              {/* After Image (Background) */}
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
                alt="After Construction" 
                className="absolute inset-0 w-full h-full object-cover select-none" 
              />
              
              {/* Before Image (Clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden border-r-2 border-[#CBA052]" 
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" 
                  alt="Before Construction" 
                  className="absolute inset-0 w-full h-full object-cover select-none" 
                />
              </div>

              {/* Slider Input & Handle */}
              <div className="absolute inset-0 z-20">
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0" 
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-[#CBA052] rounded-full flex items-center justify-center text-black shadow-xl pointer-events-none transition-transform duration-75"
                  style={{ left: `calc(${sliderPos}% - 20px)` }}
                >
                  <ChevronLeft size={16} />
                  <ChevronRight size={16} className="-ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative p-10 md:p-12 border border-white/5 bg-[#141414] min-h-[450px] flex flex-col justify-between"
          >
            <div>
              <p className="text-[#CBA052] font-semibold tracking-widest text-sm mb-8 uppercase">Testimonials</p>
              <Quote className="text-white/5 absolute top-12 right-12" size={100} />
              
              <div className="relative min-h-[140px] z-10">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg md:text-2xl font-light leading-relaxed absolute inset-0"
                  >
                    "{testimonialsData[currentTestimonial].text}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-8 relative h-16">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentTestimonial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-4 absolute inset-0"
                  >
                    <img src={testimonialsData[currentTestimonial].img} alt={testimonialsData[currentTestimonial].name} className="w-14 h-14 rounded-full object-cover grayscale border border-white/20" />
                    <div>
                      <h4 className="font-bold text-[#CBA052]">{testimonialsData[currentTestimonial].name}</h4>
                      <p className="text-sm text-gray-400">{testimonialsData[currentTestimonial].location}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation & Carousel dots */}
            <div className="flex items-center justify-between mt-12 border-t border-white/5 pt-6">
              <div className="flex gap-2">
                {testimonialsData.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-1 transition-all duration-300 ${idx === currentTestimonial ? 'w-8 bg-[#CBA052]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#CBA052] hover:bg-[#CBA052]/10 transition-all duration-300"
                >
                  <ArrowLeft size={16} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#CBA052] hover:bg-[#CBA052]/10 transition-all duration-300"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
