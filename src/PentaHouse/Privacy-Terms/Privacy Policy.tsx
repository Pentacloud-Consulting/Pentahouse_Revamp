"use client";

import React, { useState } from 'react';
import { Home, ChevronRight, User, Settings, Users, Shield, Cookie, UserCheck, Link as LinkIcon, Baby, Edit, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const sections = [
    { id: "01", title: "Information We Collect", icon: <User size={20} />, content: "We collect personal information that you voluntarily provide to us when you contact us, fill out a form, or subscribe to our services. This may include your name, email address, phone number, and project details." },
    { id: "02", title: "How We Use Your Information", icon: <Settings size={20} />, content: "We use your information to understand your needs, respond to inquiries, provide our services, improve our website, and send you relevant updates about our projects and services." },
    { id: "03", title: "Sharing Your Information", icon: <Users size={20} />, content: "We do not sell, trade, or rent your personal information. We may share your data with trusted partners or service providers who help us operate our website and conduct our business, strictly for the purpose of providing our services." },
    { id: "04", title: "Data Security", icon: <Shield size={20} />, content: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction." },
    { id: "05", title: "Cookies and Tracking", icon: <Cookie size={20} />, content: "Our website uses cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can choose to disable cookies through your browser settings." },
    { id: "06", title: "Your Rights", icon: <UserCheck size={20} />, content: "You have the right to access, update, correct, or delete your personal information. If you wish to exercise any of these rights, please contact us using the details below." },
    { id: "07", title: "Third-Party Links", icon: <LinkIcon size={20} />, content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites." },
    { id: "08", title: "Children's Privacy", icon: <Baby size={20} />, content: "Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children." },
    { id: "09", title: "Changes to This Policy", icon: <Edit size={20} />, content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated \"Last Updated\" date." },
    { id: "10", title: "Contact Us", icon: <Mail size={20} />, content: "If you have any questions or concerns about this Privacy Policy, please contact us." }
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
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 border-b border-white/5 overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed drop-shadow-md">
              At Pentahouse Construction, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-[#CBA052] pt-4 font-medium tracking-wide">
              <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors">
                <Home size={16} className="text-gray-300" />
                <span className="text-gray-300">Home</span>
              </Link>
              <ChevronRight size={16} className="text-gray-500" />
              <span className="text-white">Privacy Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-[#111111] border border-white/5 p-6 md:p-8 rounded-sm sticky top-24 md:top-32">
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
                    We are committed to keeping your information safe and secure.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-4">
              {sections.map(section => (
                <div key={section.id} id={section.id} className="bg-[#111111] border border-white/5 rounded-sm p-5 md:p-6 lg:p-7 scroll-mt-24 md:scroll-mt-32 hover:border-white/10 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-lg border border-[#CBA052]/30 flex items-center justify-center text-[#CBA052] bg-[#CBA052]/5">
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
