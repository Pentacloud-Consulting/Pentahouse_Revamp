"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowRight, ChevronRight, BookOpen, X } from "lucide-react";
import { BlogPost, LayoutMode } from "./types";

interface BlogArticlesProps {
  blogs: BlogPost[];
  layoutMode: LayoutMode;
  onSelectBlog?: (blog: BlogPost) => void;
  likedPosts?: Record<string, boolean>;
  toggleLike?: (e: React.MouseEvent, id: string) => void;
  bookmarkedPosts?: Record<string, boolean>;
  toggleBookmark?: (e: React.MouseEvent, id: string) => void;
  likeCounts?: Record<string, number>;
  searchQuery?: string;
  selectedCategory?: string;
  onResetFilters?: () => void;
}

export default function BlogArticles({
  blogs,
  layoutMode,
  onSelectBlog,
  searchQuery,
  selectedCategory,
  onResetFilters
}: BlogArticlesProps) {
  const cardTransition = {
    layout: { type: "spring" as const, stiffness: 350, damping: 30 },
    opacity: { duration: 0.25 },
    scale: { duration: 0.25 },
    y: { duration: 0.25 }
  };

  return (
    <div>
      {/* ARTICLES COUNT INDICATOR */}
      <div className="flex items-center justify-between mb-5 px-1">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
          SHOWING <span className="text-[#CBA052] font-bold">{blogs.length}</span> ARTICLES
          {selectedCategory && selectedCategory !== "All" && ` IN "${selectedCategory}"`}
          {searchQuery && ` FOR "${searchQuery}"`}
        </p>

        {(searchQuery || (selectedCategory && selectedCategory !== "All")) && onResetFilters && (
          <button
            onClick={onResetFilters}
            className="text-[11px] text-[#CBA052] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* NO RESULTS FOUND STATE */}
      {blogs.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 bg-[#111111] rounded-xl border border-white/10 px-4"
        >
          <BookOpen className="w-10 h-10 text-[#CBA052] mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
          <p className="text-gray-400 text-xs max-w-md mx-auto mb-5">
            We couldn't find any design insights matching your search query or category filter.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="bg-[#CBA052] text-black font-bold px-5 py-2 rounded-md text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </motion.div>
      )}

      {/* BLOG BOXES DISPLAY GRID */}
      {blogs.length > 0 && (
        <motion.div 
          layout
          transition={{ layout: { type: "spring" as const, stiffness: 350, damping: 30 } }}
          className={
            layoutMode === "bento"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              : layoutMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              : "flex flex-col gap-4"
          }
        >
          <AnimatePresence mode="sync">
            {blogs.map((blog) => {
              const isBento2Col = layoutMode === "bento" && blog.bentoSpan === "col-span-1 lg:col-span-2";

              {/* LIST VIEW RENDER */}
              if (layoutMode === "list") {
                return (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, y: -10 }}
                    transition={cardTransition}
                    onClick={() => {
                      if (typeof window !== "undefined" && blog.slug) {
                        window.open(`/blog/${blog.slug}`, '_blank');
                      }
                    }}
                    className="group bg-[#111111] hover:bg-[#151515] border border-white/10 hover:border-[#CBA052]/40 rounded-xl p-3.5 sm:p-4 transition-colors duration-200 cursor-pointer flex flex-col md:flex-row gap-4 items-center shadow-md hover:shadow-xl"
                  >
                    <div className="w-full md:w-52 h-40 rounded-lg overflow-hidden relative shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#0a0a0a]/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-[#CBA052] border border-[#CBA052]/30">
                        {blog.category}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1.5">
                          <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-[#CBA052] transition-colors mb-1.5 leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src="/Logo/PentaHouse_Favicon.png" alt="Pentahouse" className="w-6 h-6 rounded-full object-contain bg-[#0a0a0a] p-0.5 border border-[#CBA052]/40 shrink-0" />
                          <span className="text-xs text-gray-300 font-medium">PentaHouse</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="text-[#CBA052] text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read <ChevronRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              {/* 2-COLUMN WIDE BENTO CARD */}
              if (isBento2Col) {
                return (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, y: -10 }}
                    transition={cardTransition}
                    onClick={() => {
                      if (typeof window !== "undefined" && blog.slug) {
                        window.open(`/blog/${blog.slug}`, '_blank');
                      }
                    }}
                    className="group bg-[#111111] hover:bg-[#151515] border border-white/10 hover:border-[#CBA052]/50 rounded-xl overflow-hidden transition-colors duration-200 cursor-pointer col-span-1 lg:col-span-2 flex flex-col sm:flex-row shadow-md hover:shadow-xl"
                  >
                    {/* Image Column */}
                    <div className="sm:w-5/12 relative h-44 sm:h-auto overflow-hidden shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#111111]" />
                      <span className="absolute top-2.5 left-2.5 bg-[#0a0a0a]/85 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-[#CBA052] border border-[#CBA052]/30 uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content Column */}
                    <div className="sm:w-7/12 p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                          <span className="flex items-center gap-1"><Clock size={11} className="text-[#CBA052]" /> {blog.readTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#CBA052] transition-colors leading-snug mb-1.5 line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <img src="/Logo/PentaHouse_Favicon.png" alt="Pentahouse" className="w-5 h-5 rounded-full object-contain bg-[#0a0a0a] p-0.5 border border-[#CBA052]/40 shrink-0" />
                          <span className="text-xs text-gray-300 font-medium">PentaHouse</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#CBA052] group-hover:text-black transition-colors">
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              {/* STANDARD 1-COLUMN BENTO / GRID CARD */}
              return (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, y: -10 }}
                  transition={cardTransition}
                  onClick={() => {
                    if (typeof window !== "undefined" && blog.slug) {
                      window.open(`/blog/${blog.slug}`, '_blank');
                    }
                  }}
                  className="group bg-[#111111] hover:bg-[#151515] border border-white/10 hover:border-[#CBA052]/50 rounded-xl overflow-hidden transition-colors duration-200 cursor-pointer col-span-1 flex flex-col justify-between shadow-md hover:shadow-xl"
                >
                  {/* Top Image */}
                  <div className="relative h-40 sm:h-44 w-full overflow-hidden shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-[#0a0a0a]/85 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-[#CBA052] border border-[#CBA052]/30 uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 text-[10px] text-gray-300 font-medium flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      <Clock size={10} className="text-[#CBA052]" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {blog.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#CBA052] transition-colors leading-snug mb-1.5 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <img src="/Logo/PentaHouse_Favicon.png" alt="Pentahouse" className="w-5 h-5 rounded-full object-contain bg-[#0a0a0a] p-0.5 border border-[#CBA052]/40 shrink-0" />
                        <span className="text-[11px] font-medium text-gray-300 truncate max-w-[100px]">PentaHouse</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#CBA052] group-hover:text-black transition-colors">
                          <ArrowRight size={11} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}



