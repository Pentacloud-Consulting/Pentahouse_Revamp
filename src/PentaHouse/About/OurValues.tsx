"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Diamond, Users, Lightbulb } from "lucide-react";

export default function OurValues() {
  return (
    <section className="py-20 bg-[#111] border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: false, amount: 0.3 }} 
              transition={{ duration: 0.8 }}
              className="mb-8 lg:mb-14"
            >
              <p className="text-[#CBA052] font-bold tracking-widest text-[10px] lg:text-xs mb-2 lg:mb-4 uppercase">Our Values</p>
              <h2 className="text-3xl lg:text-[40px] font-bold leading-tight text-white">The Principles That<br className="hidden md:block" /> Drive Everything We Do</h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { icon: ShieldCheck, title: "Integrity", desc: "Honest, transparent and committed to doing what's right." },
                { icon: Diamond, title: "Quality", desc: "We never compromise on the quality of our work and materials." },
                { icon: Users, title: "Client First", desc: "Your vision is our priority. We build relationships that last." },
                { icon: Lightbulb, title: "Innovation", desc: "Smart solutions, modern techniques and creative thinking." }
              ].map((val, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: false, amount: 0.3 }} 
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col md:pl-4 ${idx !== 0 ? 'md:border-l border-white/10' : ''}`}
                >
                  <val.icon className="text-[#CBA052] mb-3 lg:mb-5 w-6 h-6 lg:w-7 lg:h-7" />
                  <h4 className="text-white font-bold text-sm lg:text-base mb-1 lg:mb-2">{val.title}</h4>
                  <p className="text-[11px] lg:text-xs text-gray-400 leading-relaxed pr-2">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: false, amount: 0.3 }} 
            transition={{ duration: 0.8 }} 
            className="lg:col-span-4 bg-[#161616] p-3 sm:p-6 lg:p-12 rounded-xl border border-white/5 shadow-2xl mt-8 lg:mt-0 flex flex-row lg:flex-col justify-between items-center lg:items-stretch lg:space-y-8"
          >
             {[
               { val: "100+", label: "Projects Complete" },
               { val: "50+", label: "Happy Clients" },
               { val: "10+", label: "Years of Experience" },
               { val: "3+", label: "Global Offices" }
             ].map((stat, idx) => (
               <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 border-r lg:border-r-0 lg:border-b border-white/10 pb-0 lg:pb-6 px-1 lg:px-0 last:border-0 last:pb-0">
                 <p className="text-sm sm:text-xl lg:text-4xl font-bold text-[#CBA052] mb-0.5 lg:mb-2">{stat.val}</p>
                 <p className="text-gray-300 text-[6px] sm:text-[9px] lg:text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
               </div>
             ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
