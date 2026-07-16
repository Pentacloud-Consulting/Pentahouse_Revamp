"use client";

import React from 'react';
import { Home, ChevronRight, CheckCircle, User, Shield, UserCheck, Link as LinkIcon, FileText, CreditCard, ShieldAlert, Award, FileX, Scale, Edit, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  const sections = [
    { id: "01", title: "Acceptance of Terms", icon: <CheckCircle size={20} />, content: "By accessing or using the services provided by Pentahouse Construction, you agree to be bound by these Terms of Service and our Privacy Policy." },
    { id: "02", title: "Use of Our Services", icon: <User size={20} />, content: "You agree to use our website and services only for lawful purposes and in accordance with these terms. You may not use our services to engage in any activity that could harm our business or other users." },
    { id: "03", title: "Intellectual Property", icon: <Shield size={20} />, content: "All content on this website, including text, graphics, logos, images, and design, is the property of Pentahouse Construction and is protected by copyright and other intellectual property laws." },
    { id: "04", title: "User Responsibilities", icon: <UserCheck size={20} />, content: "You are responsible for providing accurate information when contacting us or using our services. You agree not to misuse our website or attempt to interfere with its functionality." },
    { id: "05", title: "Third-Party Services", icon: <LinkIcon size={20} />, content: "Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of these external sites." },
    { id: "06", title: "Project Information", icon: <FileText size={20} />, content: "All project details, timelines, and materials shared are for informational purposes only and may be subject to change based on scope, feasibility, and other project requirements." },
    { id: "07", title: "Payments and Fees", icon: <CreditCard size={20} />, content: "Any payments, deposits, or fees related to our services will be communicated in advance. Payments are non-refundable unless otherwise stated in writing." },
    { id: "08", title: "Limitation of Liability", icon: <ShieldAlert size={20} />, content: "To the maximum extent permitted by law, Pentahouse Construction shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services." },
    { id: "09", title: "Indemnification", icon: <Award size={20} />, content: "You agree to indemnify and hold Pentahouse Construction harmless from any claims, damages, or expenses arising from your use of our website or services." },
    { id: "10", title: "Termination", icon: <FileX size={20} />, content: "We reserve the right to suspend or terminate access to our website or services at any time for violation of these terms or for any other reason without prior notice." },
    { id: "11", title: "Governing Law", icon: <Scale size={20} />, content: "These Terms of Service shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka." },
    { id: "12", title: "Changes to Terms", icon: <Edit size={20} />, content: "We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated \"Last Updated\" date." },
    { id: "13", title: "Contact Us", icon: <Mail size={20} />, content: "If you have any questions about these Terms of Service, please contact us using the details provided below." }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 border-b border-white/5 overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover opacity-40" 
          />
          {/* Gradient overlays to make text readable and blend into the page */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full max-w-2xl space-y-6">
            <h3 className="text-[#CBA052] font-bold tracking-widest text-xs uppercase">LEGAL</h3>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              Terms of Service
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
              These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms and conditions.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-[#CBA052] pt-4 font-medium tracking-wide">
              <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors">
                <Home size={16} className="text-gray-300" />
                <span className="text-gray-300">Home</span>
              </Link>
              <ChevronRight size={16} className="text-gray-500" />
              <span className="text-white">Terms of Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#111111] border border-white/5 p-8 rounded-sm sticky top-32">
                <h4 className="text-[#CBA052] text-xs font-bold uppercase tracking-widest mb-6">ON THIS PAGE</h4>
                <ul className="space-y-4">
                  {sections.map(section => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`} 
                        onClick={(e) => handleScroll(e, section.id)}
                        className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="text-[#CBA052] font-medium">{section.id}.</span> {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-12 border border-white/10 rounded-sm p-6 bg-black/40">
                  <Shield size={32} className="text-[#CBA052] mb-4" />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    By using our website and services, you acknowledge that you have read, understood, and agree to these terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-4">
              {sections.map(section => (
                <div key={section.id} id={section.id} className="bg-[#111111] border border-white/5 rounded-sm p-6 lg:p-7 scroll-mt-32 hover:border-white/10 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-lg border border-[#CBA052]/30 flex items-center justify-center text-[#CBA052] bg-[#CBA052]/5">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <span className="text-[#CBA052]">{section.id}.</span> {section.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-6 flex items-center gap-2 text-sm text-gray-400 border-t border-white/10">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-[#CBA052] font-medium">Last Updated:</span> July 16, 2026
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
