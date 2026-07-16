"use client";

import { Building2, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <div className="flex items-center gap-2 mb-6 text-white">
              <Building2 className="text-[#CBA052]" size={32} strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-widest leading-none">PENTAHOUSE</span>
                <span className="text-[0.5rem] tracking-[0.2em] text-gray-400 mt-1">CONSTRUCTION & ARCHITECTURE</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building spaces that inspire and last for generations with trust, quality & innovation.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Process</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Our Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Residential Construction</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Commercial Buildings</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Turnkey Projects</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Interior Design</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Architecture Planning</a></li>
              <li><a href="#" className="hover:text-[#CBA052] transition-colors">Renovation & Remodeling</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#CBA052] shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#CBA052] shrink-0 mt-0.5" />
                <span>info@pentahouse.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#CBA052] shrink-0 mt-0.5" />
                <span>Bangalore, Karnataka, India</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2024 Pentahouse Construction & Architecture. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Facebook(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function Instagram(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function Linkedin(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function Youtube(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  );
}
