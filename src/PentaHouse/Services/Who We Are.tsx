"use client";

import { useEffect, useRef } from "react";
import { Building2, UserCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(".who-text > *", 
          { y: 40, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
        gsap.fromTo(".who-bg", 
          { scale: 0.9, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 75%", toggleActions: "play reverse play reverse" }, scale: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        );
        gsap.fromTo(".who-fg", 
          { y: 60, autoAlpha: 0 },
          { scrollTrigger: { trigger: containerRef.current, start: "top 60%", toggleActions: "play reverse play reverse" }, y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
      <div className="who-text w-full lg:w-5/12 space-y-4 lg:space-y-6">
        <h3 className="text-[#CBA052] font-bold tracking-widest text-[10px] lg:text-xs uppercase">Who We Are</h3>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
          From Concept<br />
          to Better Living
        </h2>
        <p className="text-gray-400 text-xs lg:text-sm leading-relaxed max-w-md">
          We turn your vision into reality with thoughtful design, meticulous planning, and flawless execution. Our mission is to create spaces that are not only beautiful but also functional, sustainable, and built around your lifestyle.
        </p>
        
        <div className="flex flex-row items-center justify-start gap-6 sm:gap-8 pt-2 lg:pt-4">
          <div className="flex items-center gap-3 lg:gap-4">
            <Building2 className="text-[#CBA052] w-6 h-6 lg:w-9 lg:h-9" strokeWidth={1.5} />
            <div>
              <h4 className="text-xl lg:text-3xl font-bold">50+</h4>
              <p className="text-gray-400 text-[10px] lg:text-xs uppercase tracking-wider mt-0.5 lg:mt-1">Completed Projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <UserCheck className="text-[#CBA052] w-6 h-6 lg:w-9 lg:h-9" strokeWidth={1.5} />
            <div>
              <h4 className="text-xl lg:text-3xl font-bold">4+</h4>
              <p className="text-gray-400 text-[10px] lg:text-xs uppercase tracking-wider mt-0.5 lg:mt-1">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-7/12 relative h-[300px] sm:h-[400px] lg:h-[500px] mt-4 lg:mt-0">
        {/* Background Image */}
        <div className="who-bg absolute top-0 right-0 w-[80%] h-[200px] sm:h-[300px] lg:h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" 
            alt="Interior Design" 
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        {/* Foreground Image Overlapping */}
        <div className="who-fg absolute bottom-0 left-0 w-[70%] h-[180px] sm:h-[250px] lg:h-[350px] shadow-2xl shadow-black/80">
          <img 
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" 
            alt="Happy clients in home" 
            className="w-full h-full object-cover rounded-sm border-[2px] lg:border-[4px] border-[#0a0a0a]"
          />
        </div>
      </div>
    </section>
  );
}
