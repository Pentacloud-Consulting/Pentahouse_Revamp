"use client";

import { motion } from "framer-motion";

export default function Trust() {
  return (
    <section className="bg-[#0a0a0a] py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#CBA052] mb-2">350+</h3>
            <p className="text-white font-medium">Completed Projects</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#CBA052] mb-2">120+</h3>
            <p className="text-white font-medium">Qualified Engineers</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#CBA052] mb-2">25+</h3>
            <p className="text-white font-medium">Years Of Experience</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#CBA052] mb-2">500+</h3>
            <p className="text-white font-medium">Happy Families</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
