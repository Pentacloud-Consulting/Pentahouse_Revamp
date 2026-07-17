"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown } from "lucide-react";

export default function ContactSample() {
  const [projectType, setProjectType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="relative bg-[#0a0a0a] min-h-[80vh] lg:min-h-screen flex items-center pt-16 pb-8 lg:pt-24 lg:pb-12 xl:py-20 overflow-hidden">
      
      {/* Right Side Background Image */}
      <div className="hidden lg:block absolute top-0 right-0 w-[40%] h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover" 
        />
        {/* Gradient overlay to seamlessly blend the image into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-4 flex flex-col pt-4 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-[#CBA052] font-semibold tracking-widest text-[10px] lg:text-xs mb-2 lg:mb-4 uppercase">Get In Touch</p>
              <h2 className="text-3xl sm:text-5xl lg:text-[42px] font-bold text-white mb-2 lg:mb-4 leading-[1.15]">
                Let's Build<br className="hidden lg:block" /> Something<br className="hidden lg:block" /> Extraordinary<br className="hidden lg:block" /> Together
              </h2>
              <p className="text-gray-400 text-xs md:text-base leading-relaxed mb-4 lg:mb-6 pr-4">
                We are here to answer your questions, discuss your project, and turn your vision into reality.
              </p>
              
              <div className="w-10 lg:w-12 h-[2px] bg-[#CBA052] mb-6 lg:mb-8"></div>
            </motion.div>

            <div className="space-y-4 lg:space-y-6">
              {[
                { icon: Phone, title: "Call Us", details: "+91-7411146608" },
                { icon: Mail, title: "Email Us", details: "admin@pentahouse.in" },
                { icon: MapPin, title: "Visit Us", details: "RT Nagar, Bangalore 560032" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  className="flex items-start gap-3 lg:gap-5 group"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border border-white/10 bg-[#141414] flex items-center justify-center shrink-0 group-hover:border-[#CBA052]/50 transition-colors duration-300">
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-[#CBA052]" />
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-xs font-semibold tracking-wider text-gray-500 uppercase mb-0.5 lg:mb-1">{item.title}</p>
                    <p className="text-white text-xs lg:text-sm whitespace-pre-line leading-relaxed">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 bg-[#121212] border border-[#CBA052]/30 rounded-xl lg:rounded-2xl p-5 sm:p-8 shadow-2xl relative z-20 mt-8 lg:mt-12"
          >
            <p className="text-[#CBA052] font-semibold tracking-widest text-[10px] lg:text-xs mb-4 lg:mb-8 uppercase">Send Us A Message</p>
            
            <form className="space-y-3 lg:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
                />
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-[#1a1a1a] border rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm transition-all outline-none flex items-center justify-between cursor-pointer select-none ${
                      isDropdownOpen ? "border-[#CBA052] ring-1 ring-[#CBA052]" : "border-white/5 hover:border-white/20"
                    } ${projectType ? "text-white" : "text-gray-500"}`}
                  >
                    <span>{projectType || "Project Type"}</span>
                    <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-full mt-1 lg:mt-2 bg-[#1a1a1a] border border-[#CBA052]/30 rounded-md lg:rounded-lg shadow-xl z-50 overflow-hidden"
                      >
                        {["Residential", "Commercial", "Hospitality"].map((type) => (
                          <div 
                            key={type}
                            onClick={() => { setProjectType(type); setIsDropdownOpen(false); }}
                            className="px-3 py-2 lg:px-4 lg:py-3 text-[11px] lg:text-sm text-gray-300 hover:text-white hover:bg-[#CBA052]/20 cursor-pointer transition-colors"
                          >
                            {type}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none"
              />

              <textarea 
                placeholder="Your Message" 
                rows={4}
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-md lg:rounded-lg px-3 py-2.5 lg:px-4 lg:py-3.5 text-xs lg:text-sm text-white placeholder-gray-500 focus:border-[#CBA052] focus:ring-1 focus:ring-[#CBA052] transition-all outline-none resize-none"
              ></textarea>

              <button 
                type="button" 
                className="mt-2 lg:mt-4 bg-[#CBA052] hover:bg-white text-black font-bold text-[10px] lg:text-sm tracking-widest px-6 py-3 lg:px-8 lg:py-4 rounded-md uppercase flex items-center justify-center lg:justify-start gap-2 lg:gap-3 transition-colors duration-300 w-full sm:w-auto"
              >
                Send Message <ArrowRight className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]" />
              </button>
            </form>
          </motion.div>

          {/* Right Column: Working Hours Card */}
          <div className="lg:col-span-3 relative flex items-end h-full pt-8 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="bg-[#111111]/80 backdrop-blur-md border border-white/5 p-5 lg:p-8 rounded-xl shadow-2xl w-full lg:mb-12 relative z-20"
            >
              <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-[#CBA052]" />
                <h4 className="text-[#CBA052] font-semibold text-[10px] lg:text-sm tracking-wider uppercase">Working Hours</h4>
              </div>
              
              <div className="space-y-3 lg:space-y-4">
                <div className="border-b border-white/5 pb-3 lg:pb-4">
                  <p className="text-gray-400 text-[10px] lg:text-sm mb-0.5 lg:mb-1">Monday – Saturday</p>
                  <p className="text-white text-xs lg:text-base font-medium">9:00 AM – 5:00 PM</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] lg:text-sm mb-0.5 lg:mb-1">Sunday</p>
                  <p className="text-white text-xs lg:text-base font-medium">Closed</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
