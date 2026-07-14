"use client";

import { cloneElement, ReactElement } from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Building2, CheckCircle2, Trophy } from "lucide-react";

export default function WhyChoosePentahouse() {
  return (
    <section className="py-24 bg-[#141414] border-t border-white/5 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4">
            <p className="text-[#CBA052] font-semibold tracking-widest text-sm mb-3 uppercase">Why Choose Pentahouse</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From Concept To Creation</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We follow a transparent and efficient process to deliver excellence at every step, ensuring your project is completed on time and beyond expectations.
            </p>
            <button className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-white transition-all duration-300 px-8 py-3 text-sm font-medium tracking-wider">
              GET A QUOTE
            </button>
          </div>

          <div className="lg:col-span-8 relative">
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px border-t border-dashed border-[#CBA052]/50 z-0" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {[
                { num: "01", title: "Planning", desc: "Understanding your needs and objectives", icon: <Search /> },
                { num: "02", title: "Design", desc: "Architectural planning & 3D visualization", icon: <PenTool /> },
                { num: "03", title: "Construction", desc: "High-quality execution with best materials", icon: <Building2 /> },
                { num: "04", title: "Inspection", desc: "Quality checks at every critical stage", icon: <CheckCircle2 /> },
                { num: "05", title: "Delivery", desc: "On-time handover with satisfaction", icon: <Trophy /> }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-xl border border-white/10 bg-[#111111] group-hover:border-[#CBA052] flex items-center justify-center mb-4 transition-colors duration-300 relative text-gray-400 group-hover:text-[#CBA052]">
                    <div className="absolute -top-3 bg-[#141414] px-2 text-[#CBA052] font-bold text-sm">{step.num}</div>
                    {cloneElement(step.icon as ReactElement<any>, { size: 28, strokeWidth: 1.5 })}
                  </div>
                  <h4 className="font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
