"use client";

import { useEffect } from "react";
import { Clock, X, ArrowLeft, Check } from "lucide-react";
import { BlogPost } from "./types";
import BlogShare from "./Blog Share";

interface BlogHTMLConvertProps {
  post: BlogPost;
  onClose?: () => void;
}

export default function BlogHTMLConvert({ post, onClose }: BlogHTMLConvertProps) {
  // Automatically convert HTML tables into luxury vertical cards on mobile screens
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tables = document.querySelectorAll(".wp-blog-body table");
    tables.forEach((table) => {
      const htmlTable = table as HTMLElement;
      if (htmlTable.dataset.mobileRevamped === "true") return;
      htmlTable.dataset.mobileRevamped = "true";

      const rows = Array.from(table.querySelectorAll("tr"));
      if (rows.length === 0) return;

      // Extract headers from <thead> or first <tr>
      let headerCells = Array.from(rows[0].querySelectorAll("th, td"));
      let bodyRows = rows.slice(1);

      if (headerCells.length === 0 && rows.length > 0) {
        headerCells = Array.from(rows[0].querySelectorAll("td"));
      }

      // Create Desktop Wrapper for original table
      const desktopWrapper = document.createElement("div");
      desktopWrapper.className = "desktop-table-wrapper hidden sm:block my-6 w-full overflow-x-auto rounded-xl border border-[#CBA052]/30 bg-[#121212] shadow-xl";

      // Create Mobile Wrapper for stacked cards
      const mobileWrapper = document.createElement("div");
      mobileWrapper.className = "mobile-cards-wrapper sm:hidden flex flex-col gap-3.5 my-6 w-full";

      // Case 1: Multi-column comparison table (e.g., Metric, Plot 1, Plot 2...)
      if (headerCells.length >= 3) {
        for (let colIdx = 1; colIdx < headerCells.length; colIdx++) {
          const colTitle = headerCells[colIdx]?.textContent?.trim() || `Option ${colIdx}`;
          
          const card = document.createElement("div");
          card.className = "bg-[#141414] border border-[#CBA052]/35 rounded-xl p-4 shadow-xl space-y-2.5";

          const cardHeader = document.createElement("div");
          cardHeader.className = "flex items-center justify-between pb-2 border-b border-[#CBA052]/30";
          cardHeader.innerHTML = `
            <span class="text-xs font-extrabold text-[#CBA052] tracking-wide uppercase flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#CBA052]"></span>
              ${colTitle}
            </span>
          `;
          card.appendChild(cardHeader);

          const specsList = document.createElement("div");
          specsList.className = "space-y-2 pt-0.5";

          bodyRows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll("td, th"));
            if (cells.length > 0) {
              const label = cells[0]?.textContent?.trim() || "";
              const val = cells[colIdx]?.textContent?.trim() || cells[1]?.textContent?.trim() || "N/A";

              if (label || val) {
                const specRow = document.createElement("div");
                specRow.className = "flex flex-col py-1 border-b border-white/5 last:border-0 gap-0.5";
                specRow.innerHTML = `
                  <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">${label}</span>
                  <span class="text-xs font-bold text-white leading-snug">${val}</span>
                `;
                specsList.appendChild(specRow);
              }
            }
          });

          card.appendChild(specsList);
          mobileWrapper.appendChild(card);
        }
      } 
      // Case 2: 2-Column table (e.g. Spec | Value)
      else if (headerCells.length === 2) {
        const card = document.createElement("div");
        card.className = "bg-[#141414] border border-[#CBA052]/35 rounded-xl p-4 shadow-xl space-y-2.5";

        const cardHeader = document.createElement("div");
        cardHeader.className = "pb-2 border-b border-[#CBA052]/30 text-xs font-extrabold text-[#CBA052] tracking-wide uppercase flex items-center gap-1.5";
        cardHeader.innerHTML = `
          <span class="w-2 h-2 rounded-full bg-[#CBA052]"></span>
          ${headerCells[0]?.textContent?.trim() || "Specification"} Overview
        `;
        card.appendChild(cardHeader);

        const specsList = document.createElement("div");
        specsList.className = "space-y-2 pt-0.5";

        bodyRows.forEach((row) => {
          const cells = Array.from(row.querySelectorAll("td, th"));
          if (cells.length >= 2) {
            const label = cells[0]?.textContent?.trim() || "";
            const val = cells[1]?.textContent?.trim() || "";

            const specRow = document.createElement("div");
            specRow.className = "flex flex-col py-1 border-b border-white/5 last:border-0 gap-0.5";
            specRow.innerHTML = `
              <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">${label}</span>
              <span class="text-xs font-bold text-white leading-snug">${val}</span>
            `;
            specsList.appendChild(specRow);
          }
        });

        card.appendChild(specsList);
        mobileWrapper.appendChild(card);
      } 
      // Case 3: Fallback
      else {
        const scrollCard = document.createElement("div");
        scrollCard.className = "w-full overflow-x-auto my-4 rounded-xl border border-[#CBA052]/30 bg-[#121212] p-2";
        const clone = table.cloneNode(true) as HTMLElement;
        scrollCard.appendChild(clone);
        mobileWrapper.appendChild(scrollCard);
      }

      // Replace original table in DOM with desktop & mobile containers
      if (table.parentNode) {
        const parent = table.parentNode;
        parent.insertBefore(mobileWrapper, table);
        parent.insertBefore(desktopWrapper, table);
        desktopWrapper.appendChild(table);
      }
    });
  }, [post.htmlContent]);

  // Check if post.htmlContent already contains an <img> tag near the top or contains post.image
  const hasImageInContent =
    post.htmlContent &&
    (
      (post.image && post.htmlContent.includes(post.image)) ||
      /<img[^>]+src=/i.test(post.htmlContent.slice(0, 400))
    );

  const showHeroImage = Boolean(post.image) && !hasImageInContent;

  // Check if subtitle duplicates title
  const isSubtitleDuplicate =
    !post.subtitle ||
    post.title.toLowerCase().startsWith(post.subtitle.toLowerCase().slice(0, 20)) ||
    post.subtitle.toLowerCase().startsWith(post.title.toLowerCase().slice(0, 20));

  return (
    <article className="w-full max-w-4xl mx-auto bg-[#0d0d0d] text-white border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-sans">
      
      {/* GLOBAL TYPOGRAPHY & LUXURY MOBILE TABLE OVERRIDES */}
      <style>{`
        .wp-blog-body {
          word-break: break-word !important;
          overflow-wrap: break-word !important;
          max-width: 100% !important;
        }
        .wp-blog-body img {
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
          border-radius: 0.85rem !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          max-width: 100% !important;
          height: auto !important;
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.8) !important;
          float: none !important;
        }
        .wp-blog-body figure {
          margin-left: auto !important;
          margin-right: auto !important;
          margin-top: 1.5rem !important;
          margin-bottom: 1.5rem !important;
          text-align: center !important;
          float: none !important;
          max-width: 100% !important;
        }
        .wp-blog-body h2 {
          color: #ffffff !important;
          font-size: 1.25rem !important;
          font-weight: 800 !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          padding-bottom: 0.5rem !important;
          border-bottom: 1px solid rgba(203, 160, 82, 0.3) !important;
          line-height: 1.35 !important;
          letter-spacing: -0.01em !important;
        }
        @media (min-width: 640px) {
          .wp-blog-body h2 {
            font-size: 1.75rem !important;
            margin-top: 2.5rem !important;
            margin-bottom: 1.25rem !important;
          }
        }
        .wp-blog-body h3 {
          color: #CBA052 !important;
          font-size: 1.1rem !important;
          font-weight: 700 !important;
          margin-top: 1.75rem !important;
          margin-bottom: 0.75rem !important;
        }
        @media (min-width: 640px) {
          .wp-blog-body h3 {
            font-size: 1.25rem !important;
          }
        }
        .wp-blog-body p {
          color: #d1d5db !important;
          font-size: 0.9rem !important;
          line-height: 1.8 !important;
          margin-bottom: 1.25rem !important;
          letter-spacing: 0.01em !important;
        }
        @media (min-width: 640px) {
          .wp-blog-body p {
            font-size: 1.025rem !important;
            line-height: 1.85 !important;
          }
        }
        .wp-blog-body ul, .wp-blog-body ol {
          margin-top: 1rem !important;
          margin-bottom: 1rem !important;
          padding-left: 1.25rem !important;
          color: #e5e7eb !important;
        }
        .wp-blog-body li {
          margin-bottom: 0.4rem !important;
          line-height: 1.7 !important;
        }
        .wp-blog-body blockquote {
          margin-top: 1.5rem !important;
          margin-bottom: 1.5rem !important;
          padding: 1rem 1.25rem !important;
          background: linear-gradient(135deg, #181818 0%, #111111 100%) !important;
          border-left: 4px solid #CBA052 !important;
          border-radius: 0 0.85rem 0.85rem 0 !important;
          font-style: italic !important;
          color: #f3f4f6 !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
        }

        /* DESKTOP TABLE STYLES */
        .wp-blog-body table {
          width: 100% !important;
          margin: 0 !important;
          border-collapse: collapse !important;
          background-color: #121212 !important;
        }

        .wp-blog-body th {
          background-color: #1c1c1c !important;
          color: #CBA052 !important;
          padding: 0.75rem 0.85rem !important;
          text-align: left !important;
          font-weight: 700 !important;
          font-size: 0.85rem !important;
          border-bottom: 1px solid rgba(203, 160, 82, 0.25) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
        }

        .wp-blog-body td {
          padding: 0.75rem 0.85rem !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: #d1d5db !important;
          font-size: 0.85rem !important;
        }
      `}</style>

      {/* TOP HEADER BAR */}
      <div className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
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
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          {!isSubtitleDuplicate && (
            <p className="text-gray-300 text-sm sm:text-base italic leading-relaxed mb-6">
              "{post.subtitle}"
            </p>
          )}

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

        {/* HERO IMAGE (Only rendered if not already embedded in post HTML) */}
        {showHeroImage && (
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 shadow-xl my-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* KEY TAKEAWAYS BOX */}
        {post.highlights && post.highlights.length > 0 && (
          <div className="bg-[#141414] border-l-4 border-[#CBA052] p-5 sm:p-6 rounded-r-2xl shadow-xl border border-white/5 my-6">
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
        <div className="wp-blog-body prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
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
