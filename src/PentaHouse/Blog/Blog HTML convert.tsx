"use client";

import { Clock, X, ArrowLeft, Check } from "lucide-react";
import { BlogPost } from "./types";
import BlogShare from "./Blog Share";

interface BlogHTMLConvertProps {
  post: BlogPost;
  onClose?: () => void;
}

export default function BlogHTMLConvert({ post, onClose }: BlogHTMLConvertProps) {
  return (
    <article className="w-full max-w-4xl mx-auto bg-[#0d0d0d] text-white border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-sans">
      
      {/* TOP HEADER BAR */}
      <div className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <span className="px-2.5 py-1 rounded bg-[#CBA052]/20 text-[#CBA052] text-xs font-bold border border-[#CBA052]/40 tracking-wide uppercase">
            {post.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <Clock size={13} className="text-[#CBA052]" />
            {post.readTime}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BlogShare post={post} />
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ARTICLE CONTENT CONTAINER */}
      <div className="p-6 sm:p-10 space-y-8">
        
        {/* TITLE & AUTHOR SECTION */}
        <div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base italic leading-relaxed mb-6">
            "{post.subtitle}"
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <img
              src="/Logo/PentaHouse_Favicon.png"
              alt="Pentahouse"
              className="w-11 h-11 rounded-full object-contain bg-[#0a0a0a] p-1 border border-[#CBA052]/40 shrink-0"
            />
            <div>
              <h4 className="text-sm font-bold text-white">PentaHouse</h4>
              <p className="text-xs text-gray-400">Published {post.date}</p>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 shadow-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* KEY TAKEAWAYS BOX (Image 1) */}
        {post.highlights && post.highlights.length > 0 && (
          <div className="bg-[#141414] border-l-4 border-[#CBA052] p-5 sm:p-6 rounded-r-2xl shadow-inner">
            <h4 className="text-xs font-bold text-[#CBA052] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>KEY TAKEAWAYS</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-200">
              {post.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#CBA052] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RENDERED HTML / WORDPRESS CONTENT BODY */}
        <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-5 prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-blockquote:border-l-4 prose-blockquote:border-[#CBA052] prose-blockquote:bg-[#141414] prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-gray-200 prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
          {post.htmlContent ? (
            <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
          ) : (
            post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          )}
        </div>

        {/* BOTTOM TAGS */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
