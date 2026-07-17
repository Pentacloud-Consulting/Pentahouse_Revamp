"use client";

import { Building2, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-12 md:pt-20 pb-8 md:pb-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 md:mb-6 text-white">
              <img src="/Logo/Pentahouse-main-Logo-withoutBG.png" alt="Pentahouse Logo" className="h-12 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
              Building spaces that inspire and last for generations with trust, quality & innovation.
            </p>
            <div className="flex items-center gap-3 md:gap-4 text-gray-400">
              <a href="https://www.instagram.com/pentahouse.in?igsh=MWczeGhlczIybnZ2aw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#CBA052] transition-colors"><Instagram size={18} /></a>
              <a href="https://api.whatsapp.com/send/?phone=918147897286&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-[#CBA052] transition-colors"><Whatsapp size={18} /></a>
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-[#CBA052] transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-2">
            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 tracking-wide text-xs md:text-sm uppercase">Quick Links</h4>
              <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm text-gray-400">
                <li><Link href="/" className="hover:text-[#CBA052] transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#CBA052] transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-[#CBA052] transition-colors">Services</Link></li>
                <li><Link href="/projects" className="hover:text-[#CBA052] transition-colors">Projects</Link></li>
                <li><Link href="/contact" className="hover:text-[#CBA052] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 tracking-wide text-xs md:text-sm uppercase">Our Services</h4>
              <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#CBA052] transition-colors">Residential Construction</a></li>
                <li><a href="#" className="hover:text-[#CBA052] transition-colors">Commercial Buildings</a></li>
                <li><a href="#" className="hover:text-[#CBA052] transition-colors">Turnkey Projects</a></li>
                <li><a href="#" className="hover:text-[#CBA052] transition-colors">Interior Design</a></li>
                <li><a href="#" className="hover:text-[#CBA052] transition-colors">Architecture Planning</a></li>
                <li><a href="#" className="hover:text-[#CBA052] transition-colors">Renovation & Remodeling</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 md:mb-6 tracking-wide text-xs md:text-sm uppercase">Contact Us</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#CBA052] shrink-0 mt-0.5 md:mt-0" />
                <span>+91-7411146608</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#CBA052] shrink-0 mt-0.5 md:mt-0" />
                <span>admin@pentahouse.in</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#CBA052] shrink-0 mt-0.5 md:mt-0" />
                <span>RT Nagar, Bangalore 560032</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-500 text-center md:text-left">
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

function Whatsapp(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
