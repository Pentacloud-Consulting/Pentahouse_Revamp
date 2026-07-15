"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeLink, setActiveLink] = useState(() => {
    if (pathname === "/about") return "ABOUT";
    if (pathname === "/contact") return "CONTACT";
    if (pathname === "/projects") return "PROJECTS";
    return "HOME";
  });
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/#services" },
    { name: "PROJECTS", href: "/projects" },
    { name: "PROCESS", href: "/#process" },
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
    else if (pathname === "/") {
      const hash = window.location.hash;
      if (hash === "#services") setActiveLink("SERVICES");
      else if (hash === "#process") setActiveLink("PROCESS");
      else setActiveLink("HOME");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md py-4 shadow-lg shadow-black/50" : "bg-transparent py-6"}`}>
        <div className="w-full px-6 lg:px-12 xl:px-16 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer text-white">
            <Building2 className="text-[#CBA052]" size={36} strokeWidth={1.5} />
            <div className="flex flex-col font-general">
              <span className="text-xl font-bold tracking-widest leading-none">PENTAHOUSE</span>
              <span className="text-[0.55rem] tracking-[0.2em] text-gray-400 mt-1 font-sans">CONSTRUCTION & ARCHITECTURE</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide font-general">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setActiveLink(link.name)}
                className={`relative transition-colors duration-300 z-10 ${activeLink === link.name ? "text-[#CBA052]" : "text-gray-300 hover:text-white"}`}
              >
                {link.name === "PROJECTS" ? (
                  <span className="flex items-center gap-1 relative z-10">PROJECTS <ChevronDown size={14}/></span>
                ) : (
                  <span className="relative z-10">{link.name}</span>
                )}
                {activeLink === link.name && (
                  <motion.div
                    layoutId="camera-focus"
                    className="absolute -inset-x-3 -inset-y-2 pointer-events-none z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    {/* Top Left */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#CBA052]" />
                    {/* Top Right */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#CBA052]" />
                    {/* Bottom Left */}
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#CBA052]" />
                    {/* Bottom Right */}
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#CBA052]" />
                  </motion.div>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="font-general border border-[#CBA052] text-[#CBA052] hover:bg-[#CBA052] hover:text-white transition-all duration-300 px-6 py-2.5 text-sm font-medium tracking-wider">
              GET A QUOTE
            </button>
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
