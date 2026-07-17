"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const getScrollAmount = () => {
      if (!trackRef.current || !trackRef.current.parentElement) return 0;
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = trackRef.current.parentElement.offsetWidth;
      return -(trackWidth - containerWidth);
    };

    const tween = gsap.to(trackRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates start/end on window resize
      }
    });
    
    return () => {
      tween.kill();
    };
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-[#111111] relative border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-[#CBA052] font-semibold tracking-widest text-sm mb-3 uppercase">Featured Projects</p>
            <h2 className="text-3xl md:text-4xl font-bold">Our Latest Creations</h2>
          </div>
          <Link href="/projects" className="border border-white/20 hover:border-[#CBA052] hover:bg-[#CBA052] text-white hover:text-black px-6 py-2.5 text-sm font-medium tracking-wider flex items-center gap-2 transition-all duration-300">
            VIEW ALL PROJECTS <ArrowRight size={16} />
          </Link>
        </div>

        {/* Outer wrapper allows bleeding to the right edge of the screen */}
        <div className="w-full overflow-visible">
          <div ref={trackRef} className="flex gap-6 w-max">
            {[
              { title: "Luxury Villa – Whitefield", cat: "Residential", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
              { title: "Modern Bungalow – Bangalore", cat: "Residential", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
              { title: "Skyluxe Apartments", cat: "Residential", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
              { title: "Corporate Office – Tech Park", cat: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
              { title: "Eco Retreat – Nandi Hills", cat: "Hospitality", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" },
              { title: "Pentahouse HQ", cat: "Commercial", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }
            ].map((proj, idx) => (
              <div 
                key={idx}
                className="group cursor-pointer w-[85vw] md:w-[45vw] lg:w-[30vw] xl:w-[320px] shrink-0" 
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white group-hover:text-[#CBA052] transition-colors">{proj.title}</h4>
                  <p className="text-sm text-[#CBA052] mt-1">{proj.cat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
