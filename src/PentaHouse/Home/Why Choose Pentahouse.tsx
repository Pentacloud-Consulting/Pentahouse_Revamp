"use client";

import { cloneElement, ReactElement, useRef } from "react";
import { Search, PenTool, Building2, CheckCircle2, Trophy } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Planning", desc: "Understanding your needs and objectives", icon: <Search /> },
  { num: "02", title: "Design", desc: "Architectural planning & 3D visualization", icon: <PenTool /> },
  { num: "03", title: "Construction", desc: "High-quality execution with best materials", icon: <Building2 /> },
  { num: "04", title: "Inspection", desc: "Quality checks at every critical stage", icon: <CheckCircle2 /> },
  { num: "05", title: "Delivery", desc: "On-time handover with satisfaction", icon: <Trophy /> }
];

export default function WhyChoosePentahouse() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgLineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. Independent Floating Animation (Subtle hover effect)
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card.querySelector('.icon-wrapper'), {
        y: -3,
        duration: 2 + i * 0.15, // Offset for organic wave feel
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // 2. Setup Entrance Elements
    const leftElements = leftContentRef.current ? Array.from(leftContentRef.current.children) : [];
    const entranceElements = [...leftElements, bgLineRef.current, cardsRef.current[0]].filter(Boolean);

    // 3. Desktop Animations
    mm.add("(min-width: 1024px)", () => {
      // Desktop Entrance
      gsap.fromTo(entranceElements,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Main Timeline (Scrubbed with Scroll - Desktop Only)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: "+=250%", // Pins the section for 2.5x the viewport height
          pin: true,
          scrub: 1, // Smooth cinematic scrub
        }
      });

      const cards = cardsRef.current as HTMLDivElement[];

      // Set initial hidden states for timeline cards (Cards 2-5)
      gsap.set(cards.slice(1), { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(lineRef.current, { width: "0%" });

      // Highlight Card 1 instantly in the timeline
      tl.to(cards[0].querySelector('.icon-wrapper'), {
        scale: 1.08,
        boxShadow: "0 0 20px rgba(203, 160, 82, 0.25)",
        rotate: 5,
        borderColor: "#CBA052",
        color: "#CBA052",
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate Line and Reveal subsequent cards sequentially
      steps.slice(1).forEach((_, i) => {
        const cardIndex = i + 1; // 1, 2, 3, 4
        const progress = cardIndex * 25; // 25%, 50%, 75%, 100%
        
        // Deactivate previous card (lose glow and scale, but stay gold!)
        tl.to(cards[cardIndex - 1].querySelector('.icon-wrapper'), {
          scale: 1,
          boxShadow: "0 0 0px rgba(203, 160, 82, 0)",
          rotate: 0,
          borderColor: "#CBA052", // keep it gold
          color: "#CBA052",       // keep it gold
          duration: 0.4,
          ease: "power2.out"
        }, "+=0.2"); // Slight scroll pause before moving to the next
        
        // Draw line to the next card
        tl.to(lineRef.current, {
          width: `${progress}%`,
          duration: 1,
          ease: "none"
        }, "<"); // Start drawing the line as the previous card deactivates

        // Reveal the next card when line reaches it
        tl.to(cards[cardIndex], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4"); // Fade card in slightly before the line finishes

        // Activate the next card
        tl.to(cards[cardIndex].querySelector('.icon-wrapper'), {
          scale: 1.08,
          boxShadow: "0 0 20px rgba(203, 160, 82, 0.25)",
          rotate: 5,
          borderColor: "#CBA052",
          color: "#CBA052",
          duration: 0.4,
          ease: "power2.out"
        }, "<"); 
      });

      // Settle the final card back to normal state before unpinning (extra scroll distance)
      tl.to(cards[4].querySelector('.icon-wrapper'), {
        scale: 1,
        boxShadow: "0 0 0px rgba(203, 160, 82, 0)",
        rotate: 0,
        borderColor: "#CBA052",
        color: "#CBA052",
        duration: 0.4,
        ease: "power2.out"
      }, "+=0.3");

      // Add tiny bit of padding at the very end
      tl.to({}, { duration: 0.2 });
    });

    // 4. Mobile Animations (FAST)
    mm.add("(max-width: 1023px)", () => {
      // Fast Mobile Entrance
      gsap.fromTo(entranceElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Fast Mobile fallback for remaining cards
      const cards = cardsRef.current as HTMLDivElement[];
      gsap.fromTo(cards.slice(1), 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[1],
            start: "top 90%", 
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden text-white lg:min-h-[80vh] flex items-center bg-[#111]"
    >
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury House Background" 
          className="w-full h-full object-cover blur-sm scale-105 opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-[#111111]/40" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div ref={leftContentRef} className="lg:col-span-4 text-center lg:text-left">
            <p className="text-[#CBA052] font-semibold tracking-widest text-[10px] sm:text-xs md:text-sm mb-2 md:mb-3 uppercase">Why Choose Pentahouse</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">From Concept <br className="hidden md:block"/>To Creation</h2>
            <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg max-w-lg mx-auto lg:mx-0">
              We follow a transparent and efficient process to deliver excellence at every step, ensuring your project is completed on time and beyond expectations.
            </p>
            <Link href="/contact" className="border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-black transition-all duration-300 px-6 md:px-8 py-3 md:py-3.5 text-xs md:text-sm font-bold tracking-wider inline-flex w-fit">
              GET A QUOTE
            </Link>
          </div>

          <div className="lg:col-span-8 relative pt-8 md:pt-0">
            {/* Background dashed line */}
            <div ref={bgLineRef} className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0" />
            
            {/* Animated Gold Line */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] z-0 overflow-hidden">
              <div ref={lineRef} className="h-full bg-[#CBA052] w-0" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="icon-wrapper w-16 h-16 md:w-20 md:h-20 rounded-xl border border-white/10 bg-[#111111] flex items-center justify-center mb-3 md:mb-4 transition-colors duration-300 relative text-gray-400">
                    <div className="step-num absolute -top-2.5 md:-top-3 bg-[#141414] px-1.5 md:px-2 text-[#CBA052] font-bold text-[10px] md:text-sm">{step.num}</div>
                    {cloneElement(step.icon as ReactElement<any>, { className: "w-5 h-5 md:w-7 md:h-7", strokeWidth: 1.5 })}
                  </div>
                  <h4 className="font-bold text-sm md:text-base text-white mb-1.5 md:mb-2">{step.title}</h4>
                  <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed max-w-[120px] md:max-w-none">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
