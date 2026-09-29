"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "./types";

interface BlogRecentlyUploadedProps {
  post: BlogPost;
  onSelect?: (blog: BlogPost) => void;
}

export default function BlogRecentlyUploaded({
  post,
  onSelect
}: BlogRecentlyUploadedProps) {
  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => {
        if (typeof window !== "undefined" && post.slug) {
          window.open(`/blog/${post.slug}`, '_blank');
        }
      }}
      className="group relative mb-10 rounded-xl overflow-hidden bg-[#111111] border border-white/10 hover:border-[#CBA052]/50 transition-all duration-300 cursor-pointer shadow-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Image Column */}
        <div className="lg:col-span-7 relative h-56 sm:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-[#1c1c1c] via-[#121212] to-[#0a0a0a]">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform transform-gpu"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-lg tracking-widest uppercase">
              Pentahouse Journal
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111111]" />
          
          {/* Featured Ribbon Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0a0a0a]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#CBA052]/40 text-[#CBA052] text-[10px] font-bold uppercase tracking-wider">
            <span>FEATURED</span>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-[#111111]">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2.5">
              <span className="px-2 py-0.5 rounded bg-[#CBA052]/15 text-[#CBA052] font-semibold border border-[#CBA052]/30">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#CBA052] transition-colors leading-snug mb-2">
              {post.title}
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-2">
            <div className="flex items-center gap-2.5">
              <img 
                src="/Logo/PentaHouse_Favicon.png" 
                alt="Pentahouse" 
                className="w-8 h-8 rounded-full object-contain bg-[#0a0a0a] p-1 border border-[#CBA052]/40 shrink-0" 
              />
              <div>
                <h4 className="text-xs font-bold text-white">PentaHouse</h4>
                <p className="text-[10px] text-gray-400">Official Journal</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CBA052] group-hover:translate-x-1 transition-transform">
              <span>Read Article</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
