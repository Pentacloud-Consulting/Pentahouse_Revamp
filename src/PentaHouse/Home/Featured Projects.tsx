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
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
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
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="pt-8 pb-12 md:pb-24 md:pt-32 lg:pt-40 bg-[#111111] relative border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
        <div className="flex flex-row justify-between items-end mb-8 md:mb-12 gap-2 sm:gap-6">
          <div className="shrink">
            <p className="text-[#CBA052] font-semibold tracking-widest text-[9px] sm:text-xs md:text-sm mb-1 md:mb-3 uppercase">Featured Projects</p>
            <h2 className="text-base sm:text-2xl md:text-4xl font-bold leading-tight">Our Latest Creations</h2>
          </div>
          <Link href="/projects" className="border border-white/20 hover:border-[#CBA052] hover:bg-[#CBA052] text-white hover:text-black px-3 sm:px-4 md:px-6 py-1.5 md:py-2.5 text-[8px] sm:text-xs md:text-sm font-medium tracking-wider flex items-center gap-1 md:gap-2 transition-all duration-300 shrink-0 mb-0.5 md:mb-0">
            VIEW ALL PROJECTS <ArrowRight className="w-2.5 h-2.5 md:w-4 md:h-4" />
          </Link>
        </div>

        {/* Outer wrapper allows bleeding to the right edge of the screen */}
        <div className="w-full overflow-visible">
          <div ref={trackRef} className="grid grid-cols-2 lg:flex gap-3 sm:gap-6 w-full lg:w-max">
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
                className="group cursor-pointer w-full lg:w-[30vw] xl:w-[320px] shrink-0" 
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-3 lg:mb-4 rounded-sm lg:rounded-none">
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[13px] sm:text-base lg:text-lg text-white group-hover:text-[#CBA052] transition-colors leading-snug">{proj.title}</h4>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-[#CBA052] mt-0.5 lg:mt-1">{proj.cat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
