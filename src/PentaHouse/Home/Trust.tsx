"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

function Counter({ to, duration, suffix = "" }: { to: number, duration: number, suffix?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  // once: false ensures it replays when you scroll back
  const inView = useInView(ref, { once: false, margin: "-10%" }); 

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    } else {
      if (ref.current) {
        ref.current.textContent = "0" + suffix;
      }
    }
  }, [to, duration, inView, suffix]);

  return <h3 ref={ref} className="text-4xl md:text-5xl font-bold text-[#CBA052] mb-2">0{suffix}</h3>;
}

const stats = [
  { value: 350, suffix: "+", label: "Completed Projects" },
  { value: 120, suffix: "+", label: "Qualified Engineers" },
  { value: 25, suffix: "+", label: "Years Of Experience" },
  { value: 500, suffix: "+", label: "Happy Families" }
];

export default function Trust() {
  return (
    <section className="bg-[#0a0a0a] py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            >
              <Counter to={stat.value} suffix={stat.suffix} duration={2} />
              <p className="text-white/80 font-medium tracking-wide mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
