"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-[#111111] relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-[#CBA052] font-semibold tracking-widest text-sm mb-3 uppercase">Featured Projects</p>
            <h2 className="text-3xl md:text-4xl font-bold">Our Latest Creations</h2>
          </div>
          <button className="border border-white/20 hover:border-[#CBA052] hover:bg-[#CBA052] text-white hover:text-black px-6 py-2.5 text-sm font-medium tracking-wider flex items-center gap-2 transition-all duration-300">
            VIEW ALL PROJECTS <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Luxury Villa – Whitefield", cat: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
            { title: "Modern Bungalow – Bangalore", cat: "Residential", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
            { title: "Skyluxe Apartments", cat: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
            { title: "Corporate Office – Tech Park", cat: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" }
          ].map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white group-hover:text-[#CBA052] transition-colors">{proj.title}</h4>
                <p className="text-sm text-[#CBA052] mt-1">{proj.cat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
