"use client";

import { motion } from "framer-motion";
import { Headphones, PenTool, Hammer, CheckCircle, ArrowRight } from "lucide-react";

export default function OurApproach() {
  return (
    <section className="py-20 lg:py-32 bg-[#111] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-4 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false, amount: 0.3 }}
          >
            <p className="text-[#CBA052] font-bold tracking-widest text-[10px] md:text-xs mb-2 md:mb-4 uppercase">Our Approach</p>
            <h2 className="text-3xl lg:text-[44px] font-bold leading-tight text-white">A Seamless Process.<br className="hidden md:block"/> Exceptional Results.</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false, amount: 0.3 }} 
            className="text-gray-400 max-w-md text-[11px] md:text-base leading-relaxed"
          >
            From the first conversation to the final handover, we follow a transparent, efficient and collaborative process to bring your vision to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 relative">
           {[
             { num: "01", title: "Consultation", desc: "Understanding your needs and vision.", icon: Headphones },
             { num: "02", title: "Planning", desc: "Concept, design and detailed planning.", icon: PenTool },
             { num: "03", title: "Execution", desc: "Quality construction with attention to every detail.", icon: Hammer },
             { num: "04", title: "Handover", desc: "On-time delivery with complete satisfaction.", icon: CheckCircle }
           ].map((step, idx) => (
             <motion.div 
               key={idx} 
               initial={{ opacity: 0, y: 30 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: false, amount: 0.3 }} 
               transition={{ delay: idx * 0.15 }} 
               className="relative z-10 flex flex-row lg:flex-col items-start gap-4 lg:gap-0"
             >
               <div className="flex items-center w-auto lg:w-full mb-0 lg:mb-8 relative shrink-0 mt-1 lg:mt-0">
                 <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/10 bg-[#161616] flex items-center justify-center shrink-0 shadow-lg">
                    <step.icon className="text-[#CBA052] w-5 h-5 lg:w-6 lg:h-6" />
                 </div>
                 {/* Arrow pointing to next step */}
                 {idx !== 3 && (
                   <div className="hidden lg:flex flex-1 items-center justify-center opacity-30 text-[#CBA052] px-4">
                     <div className="h-[1px] w-full bg-[#CBA052]"></div>
                     <ArrowRight size={20} className="-ml-2 shrink-0" />
                   </div>
                 )}
               </div>
               <div>
                 <div className="flex items-center gap-2 lg:block">
                   <p className="text-[#CBA052] font-bold text-sm lg:text-lg mb-0 lg:mb-2">{step.num}</p>
                   <h4 className="text-white font-bold text-base lg:text-xl mb-0 lg:mb-3">{step.title}</h4>
                 </div>
                 <p className="text-[11px] lg:text-sm text-gray-400 leading-relaxed pr-0 lg:pr-4 mt-1 lg:mt-0">{step.desc}</p>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
