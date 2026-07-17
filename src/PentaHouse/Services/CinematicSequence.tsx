"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Award, Settings, Users, MousePointerClick, UserCheck, PenTool, Home, HardHat, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  { icon: <Award size={24} />, title: "Proven Expertise", desc: "Years of experience in residential, commercial, and architectural construction.", image: "/sample/Projects.png" },
  { icon: <Settings size={24} />, title: "Quality & Safety", desc: "We follow the highest standards of quality and safety in every project.", image: "/sample/Services.png" },
  { icon: <Users size={24} />, title: "Innovative Solutions", desc: "Modern methods and creative thinking to build better, smarter spaces.", image: "/sample/About.png" }
];

export default function CinematicSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 1. Entrance animation for Section 1 (Our Services)
        const tlIntro = gsap.timeline({
          scrollTrigger: {
            trigger: ".section-1",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          }
        });
        tlIntro.fromTo(".hero-text > *", 
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
        )
        .fromTo(".hero-img", 
          { x: 40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" },
          "-=0.8"
        );

        // 2. Main Master Cinematic Scroll Sequence
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", 
            end: "+=3500", // Much faster overall scroll distance
            scrub: 0.5, // Faster response to scroll wheel
            pin: true,
            anticipatePin: 1,
          }
        });

        // --- INITIAL STATES ---

        // Section 2
        gsap.set(".sec2-left-panel", { x: -60, opacity: 0, scale: 0.96 });
        gsap.set(".discover-item-anim", { y: 35, opacity: 0, scale: 0.95 });
        gsap.set(".discover-right-header-anim", { y: 20, opacity: 0 });

        // Section 3 (starts off-screen left)
        gsap.set(".section-3", { xPercent: -100 });
        gsap.set(".who-heading", { opacity: 0, y: 40, scale: 0.97 });
        gsap.set(".who-p", { opacity: 0, y: 30 });
        gsap.set(".who-stat", { opacity: 0, y: 30 });
        gsap.set(".who-img-container", { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 });

        // Section 4 (starts off-screen bottom)
        gsap.set(".section-4", { yPercent: 100 });
        gsap.set(".offer-label", { opacity: 0, y: 20 });
        gsap.set(".offer-heading", { opacity: 0, y: 50, scale: 0.97 });
        gsap.set(".offer-card-anim", { opacity: 0, y: 50, scale: 0.96 });

        // --- TIMELINE ---

        // TRANSITION 1: Split Walls (Section 1 -> Section 2)
        tl.to(".gold-divider", { height: "100%", opacity: 1, duration: 0.2, ease: "power2.inOut" })
          .to(".hero-text-col", { xPercent: -110, duration: 1, ease: "power2.inOut" }, "split")
          .to(".hero-img-col", { xPercent: 110, duration: 1, ease: "power2.inOut" }, "split")
          .to(".gold-divider", { opacity: 0, duration: 0.2 }, "split+=0.3")
          
          .to(".sec2-left-panel", { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }, "split+=0.6")
          .to(".discover-right-header-anim", { y: 0, opacity: 1, duration: 0.4, ease: "power4.out" }, "split+=0.6")
          .to(".discover-item-anim", { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "power4.out" }, "split+=0.65")
          
          // Pause for Section 2
          .to({}, { duration: 0.4 }) 

          // TRANSITION 2: Horizontal Slide (Section 2 -> Section 3)
          .to(".section-2", { xPercent: 100, duration: 1, ease: "power3.inOut" }, "slideH")
          .to(".section-3", { xPercent: 0, duration: 1, ease: "power3.inOut" }, "slideH")

          // Section 3 internals
          .to(".who-heading", { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }, "slideH+=0.5")
          .to(".who-p", { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "slideH+=0.65") 
          .to(".who-img-container", { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, stagger: 0.12, ease: "power4.out" }, "slideH+=0.5")
          .to(".who-stat", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" }, "slideH+=0.7")

          // Pause for Section 3
          .to({}, { duration: 0.3 })

          // TRANSITION 3: Vertical Slide Up (Section 3 -> Section 4)
          .to(".section-4", { yPercent: 0, duration: 1.0, ease: "power2.inOut" }, "slideV")
          
          // Section 4 internals (starts around 30% visibility)
          .to(".offer-label", { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, "slideV+=0.4")
          .to(".offer-heading", { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }, "slideV+=0.4")
          .to(".offer-card-anim", { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.12, ease: "power4.out" }, "slideV+=0.5");
      });

      mm.add("(max-width: 1023px)", () => {
        // Simple scroll animations for mobile
        const sections = gsap.utils.toArray(".section-1, .section-2, .section-3, .section-4");
        sections.forEach((sec: any) => {
          gsap.from(sec, {
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full lg:h-screen lg:overflow-hidden bg-[#0a0a0a] flex flex-col lg:block">
      
      {/* SECTION 4 (What We Offer - Starts Bottom) */}
      <section className="section-4 relative lg:absolute lg:inset-0 z-40 flex items-center justify-center py-8 lg:py-0 lg:pt-[72px] bg-[#0a0a0a] order-4">
        <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="offer-header flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <h3 className="offer-label text-[#CBA052] font-bold tracking-widest text-xs uppercase">What We Offer</h3>
              <h2 className="offer-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Built Around<br/>Your Needs</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { id: "01", title: "Concept Design", desc: "Transforming ideas into innovative designs that lay the foundation for extraordinary spaces.", icon: <PenTool size={32} className="w-6 h-6 lg:w-8 lg:h-8" /> },
              { id: "02", title: "Home Building", desc: "We build homes that blend modern aesthetics with lasting quality and comfort. Your dream home, delivered with precision.", icon: <Home size={32} className="w-6 h-6 lg:w-8 lg:h-8" />, active: true },
              { id: "03", title: "Apartment Construction", desc: "High-quality apartment complexes designed for modern living and community comfort.", icon: <HardHat size={32} className="w-6 h-6 lg:w-8 lg:h-8" /> },
            ].map((card, idx) => (
              <div 
                key={idx} 
                className={`offer-card-anim relative p-6 lg:p-10 rounded-sm flex flex-col justify-between h-full min-h-[240px] lg:min-h-[360px] transition-all duration-500 transform-gpu hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(203,160,82,0.2)] border ${
                  card.active 
                    ? "bg-[#111111] border-[#CBA052]/50 hover:border-[#CBA052]" 
                    : "bg-white text-black border-transparent hover:bg-gray-50 hover:border-[#CBA052]/30"
                } group`}
              >
                <div className={`absolute top-6 right-6 lg:top-8 lg:right-8 text-2xl lg:text-3xl font-bold ${card.active ? "text-[#CBA052]" : "text-gray-200"}`}>
                  {card.id}
                </div>
                
                <div className={`mb-6 lg:mb-12 transition-colors ${card.active ? "text-[#CBA052]" : "text-[#CBA052] group-hover:text-black"}`}>
                  {card.icon}
                </div>
                
                <div className="space-y-3 lg:space-y-4 mt-auto">
                  <h4 className={`text-lg lg:text-xl font-bold ${card.active ? "text-white" : "text-black"}`}>{card.title}</h4>
                  <p className={`text-xs lg:text-sm leading-relaxed ${card.active ? "text-gray-400" : "text-gray-600"}`}>
                    {card.desc}
                  </p>
                  <div className={`pt-2 lg:pt-4 ${card.active ? "text-[#CBA052]" : "text-black"}`}>
                    <ArrowRight size={24} className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 (Who We Are - Starts Left) */}
      <section className="section-3 relative lg:absolute lg:inset-0 z-20 flex items-center justify-center py-8 lg:py-0 lg:pt-[72px] bg-[#0a0a0a] order-3">
        <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-auto lg:h-[600px] flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          <div className="w-full lg:w-5/12 space-y-4 lg:space-y-6">
            <h3 className="who-heading text-[#CBA052] font-bold tracking-widest text-[10px] lg:text-xs uppercase">Who We Are</h3>
            <h2 className="who-heading text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              From Concept<br />
              to Better Living
            </h2>
            <p className="who-p text-gray-400 text-xs lg:text-sm leading-relaxed max-w-md">
              We turn your vision into reality with thoughtful design, meticulous planning, and flawless execution. Our mission is to create spaces that are not only beautiful but also functional, sustainable, and built around your lifestyle.
            </p>
            
            <div className="flex flex-row items-center justify-start gap-6 sm:gap-8 pt-2 lg:pt-4">
              <div className="who-stat flex items-center gap-3 lg:gap-4">
                <Building2 className="text-[#CBA052] w-6 h-6 lg:w-9 lg:h-9" strokeWidth={1.5} />
                <div>
                  <h4 className="text-xl lg:text-3xl font-bold">50+</h4>
                  <p className="text-gray-400 text-[10px] lg:text-xs uppercase tracking-wider mt-0.5 lg:mt-1">Completed Projects</p>
                </div>
              </div>
              <div className="who-stat flex items-center gap-3 lg:gap-4">
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
            <div className="who-img-container absolute top-0 right-0 w-[80%] h-[200px] sm:h-[300px] lg:h-[400px] overflow-hidden rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" 
                alt="Interior Design" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Foreground Image Overlapping */}
            <div className="who-img-container absolute bottom-0 left-0 w-[70%] h-[180px] sm:h-[250px] lg:h-[350px] overflow-hidden shadow-2xl shadow-black/80 rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" 
                alt="Happy clients in home" 
                className="w-full h-full object-cover border-[2px] lg:border-[4px] border-[#0a0a0a]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 (Behind Section 1 - Why Clients Trust Us) */}
      <section className="section-2 relative lg:absolute lg:inset-0 z-10 flex items-center justify-center py-8 lg:py-0 lg:pt-[72px] bg-[#0a0a0a] order-2">
        <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-auto lg:h-[600px] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 bg-[#111111] border border-white/5 rounded-sm overflow-hidden">
          
          {/* Left Panel */}
          <div className="sec2-left-panel lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden p-5 lg:p-12 flex flex-col justify-end min-h-[220px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex === null ? 'default' : activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-0"
              >
                <img 
                  src={activeIndex === null ? "/Images/About-PentaHouse.jpg" : reasons[activeIndex].image} 
                  alt={activeIndex === null ? "Construction Background" : reasons[activeIndex].title} 
                  className="w-full h-full object-cover opacity-50 mix-blend-luminosity" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/20" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex === null ? 'default' : activeIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 lg:space-y-6"
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[#CBA052]/20 flex items-center justify-center bg-[#CBA052]/10 text-[#CBA052] backdrop-blur-md">
                    {activeIndex === null ? <Building2 size={24} strokeWidth={1.5} className="lg:w-7 lg:h-7" /> : reasons[activeIndex].icon}
                  </div>
                  <h2 className="text-xl lg:text-3xl font-bold text-white drop-shadow-md">
                    {activeIndex === null ? (
                      <>Why Clients<br/>Trust Us</>
                    ) : (
                      <>{reasons[activeIndex].title}</>
                    )}
                  </h2>
                  <p className="text-gray-200 text-xs lg:text-sm leading-relaxed max-w-xs drop-shadow-md">
                    {activeIndex === null 
                      ? "We combine experience, innovation, and integrity to deliver spaces that stand the test of time." 
                      : reasons[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="lg:col-span-8 p-5 lg:p-12 flex flex-col justify-center">
            <h3 className="discover-right-header-anim text-base lg:text-xl font-bold mb-4 lg:mb-8">Discover the Reasons</h3>
            <div className="space-y-3 lg:space-y-6">
              {reasons.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className={`discover-item-anim flex items-center gap-3 lg:gap-6 group cursor-pointer border p-3 lg:p-4 -mx-2 lg:-mx-4 rounded-lg transition-all duration-300 ${
                    activeIndex === idx 
                      ? 'border-[#CBA052]/30 bg-[#CBA052]/5' 
                      : 'border-transparent hover:border-white/5 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`w-10 h-10 lg:w-16 lg:h-16 shrink-0 rounded-lg border flex items-center justify-center transition-colors ${
                    activeIndex === idx 
                      ? 'bg-[#CBA052]/20 border-[#CBA052]/50 text-[#CBA052]' 
                      : 'border-[#CBA052]/30 text-[#CBA052] bg-[#CBA052]/5 group-hover:bg-[#CBA052]/10 group-hover:border-[#CBA052]/50'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm lg:text-base mb-0.5 lg:mb-1 transition-colors ${
                      activeIndex === idx ? 'text-[#CBA052]' : 'text-white group-hover:text-[#CBA052]'
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs lg:text-sm leading-snug lg:leading-normal">{item.desc}</p>
                  </div>
                  <div className={`text-[#CBA052] transition-all ${
                    activeIndex === idx 
                      ? 'opacity-100 scale-110' 
                      : 'opacity-50 group-hover:opacity-100 group-hover:scale-110'
                  }`}>
                    <MousePointerClick size={22} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1 (Front Walls) - Our Services */}
      <section className="section-1 relative lg:absolute lg:inset-0 z-30 flex flex-col lg:flex-row pt-[130px] lg:pt-[72px] pointer-events-none order-1 pb-8 lg:pb-0">
        
        {/* Gold Divider */}
        <div className="gold-divider absolute left-1/2 top-[72px] bottom-0 w-[2px] h-0 bg-[#CBA052] opacity-0 shadow-[0_0_15px_rgba(203,160,82,0.8)] z-20 -translate-x-1/2 hidden lg:block" />

        {/* Left Wall */}
        <div className="hero-text-col w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-start lg:items-end bg-[#0a0a0a] relative px-4 sm:px-6 lg:pr-10 pointer-events-auto mb-10 lg:mb-0">
          <div className="hero-text space-y-4 lg:space-y-6 w-full max-w-[650px] lg:pl-8">
            <h3 className="text-[#CBA052] font-bold tracking-widest text-[10px] lg:text-xs uppercase">Our Services</h3>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Building Excellence.<br />
              <span className="text-[#CBA052]">Delivering Trust.</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-base max-w-md leading-relaxed">
              At Pentahouse Construction, we deliver end-to-end construction and architectural solutions with precision, transparency, and a commitment to exceptional quality.
            </p>
          </div>
        </div>

        {/* Right Wall */}
        <div className="hero-img-col w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-center lg:items-start bg-[#0a0a0a] relative px-4 sm:px-6 lg:pl-10 pointer-events-auto">
          <div className="hero-img w-full max-w-[650px] lg:pr-8">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" 
              alt="Modern House" 
              className="w-full h-[250px] md:h-[500px] object-cover rounded-sm"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
