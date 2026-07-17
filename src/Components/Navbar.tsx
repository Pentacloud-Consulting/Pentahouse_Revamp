"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function LuxurySweepButton({ children, onClick, className }: any) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: any) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Click Sweep */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
            className="absolute inset-0 w-full pointer-events-none z-0 bg-gradient-to-r from-[#CBA052] via-[#FFF3D6] to-[#CBA052]"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)",
              maskImage: "linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)",
              transform: "scale(1.2) skewX(-20deg)"
            }}
          />
        )}
      </AnimatePresence>

      {/* Hover Sweep */}
      <AnimatePresence>
        {hovered && !clicked && (
          <motion.div
            initial={{ x: "-200%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
            className="absolute inset-0 w-1/2 pointer-events-none z-0 bg-gradient-to-r from-[#CBA052] via-[#FFF3D6] to-[#CBA052] opacity-60"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)",
              maskImage: "linear-gradient(90deg, transparent 0%, black 50%, transparent 100%)",
              transform: "scale(1.2) skewX(-20deg)"
            }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeLink, setActiveLink] = useState(() => {
    if (pathname === "/about") return "ABOUT";
    if (pathname === "/contact") return "CONTACT";
    if (pathname === "/projects") return "PROJECTS";
    if (pathname === "/services") return "SERVICES";
    return "HOME";
  });
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "PROJECTS", href: "/projects" },
    { name: "CONTACT", href: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Sync active link on load or path change
    if (pathname === "/about") setActiveLink("ABOUT");
    else if (pathname === "/contact") setActiveLink("CONTACT");
    else if (pathname === "/projects") setActiveLink("PROJECTS");
    else if (pathname === "/services") setActiveLink("SERVICES");
    else if (pathname === "/") {
      const hash = window.location.hash;
      if (hash === "#services") setActiveLink("SERVICES");
      else setActiveLink("HOME");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md py-4 shadow-lg shadow-black/50" : "bg-transparent py-6"}`}>
        <div className="w-full px-6 lg:px-12 xl:px-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer text-white">
            <img src="/Logo/Pentahouse-main-Logo-withoutBG.png" alt="Pentahouse Logo" className="h-12 sm:h-14 w-auto object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide font-general">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setActiveLink(link.name)}
                className={`relative transition-colors duration-300 z-10 ${activeLink === link.name ? "text-[#CBA052]" : "text-gray-300 hover:text-white"}`}
              >
                <span className="relative z-10">{link.name}</span>
                {activeLink === link.name && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute -inset-x-4 -inset-y-2 pointer-events-none z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    {/* Glassmorphism Pill Background */}
                    <div className="absolute inset-0 rounded-full bg-[#CBA052]/10 border border-[#CBA052]/20 backdrop-blur-md" />
                    
                    {/* Glowing Top Highlight */}
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-[#CBA052] to-transparent blur-[1px]" />
                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-2 h-[2px] bg-[#FFF3D6] rounded-full shadow-[0_0_8px_rgba(255,243,214,0.8)]" />

                    {/* Subtle Bottom Reflection */}
                    <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-[#CBA052]/50 to-transparent" />
                  </motion.div>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <LuxurySweepButton onClick={() => router.push('/contact')} className="font-general border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-white transition-all duration-300 px-6 py-2.5 text-sm font-medium tracking-wider">
              GET A QUOTE
            </LuxurySweepButton>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 w-full bg-[#111111] z-40 md:hidden border-b border-gray-800 font-general font-medium"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              {navLinks.map(link => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={activeLink === link.name ? "text-[#CBA052]" : "text-gray-300"} 
                  onClick={() => { setActiveLink(link.name); setMobileMenuOpen(false); }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChevronDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
