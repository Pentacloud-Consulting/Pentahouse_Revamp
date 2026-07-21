"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSample() {
  return (
    <section className="relative bg-[#0a0a0a] flex items-center pt-16 pb-12 lg:pt-24 lg:pb-16 xl:pt-32 xl:pb-20 overflow-hidden">
      
      {/* Right Side Background Image */}
      <div className="hidden lg:block absolute top-0 right-0 w-[40%] h-full z-0">
        <img 
          src="/Featured Project images/Featured Project -4.webp" 
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
                { icon: MapPin, title: "Visit Us", details: "RT Nagar , Bangalore 560032, Karnataka, India." }
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
          <ContactForm />

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
                  <p className="text-white text-xs lg:text-base font-medium">10:00 AM – 6:00 PM</p>
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
