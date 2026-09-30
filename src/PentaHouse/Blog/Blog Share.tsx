"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  Mail,
  ExternalLink
} from "lucide-react";
import { BlogPost } from "./types";

interface BlogShareProps {
  post: BlogPost;
  buttonClassName?: string;
}

export default function BlogShare({ post, buttonClassName }: BlogShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://pentahouse.in/blog/${post.slug}`;
  };

  const shareTitle = post.title;
  const shareDescription = post.excerpt || post.subtitle || "Read this article on Pentahouse Journal.";
  // Use raw WP image for the modal preview (imageRaw bypasses the proxy for display)
  const previewImage = post.imageRaw || post.image;

  const handleNativeShare = async () => {
    const url = getShareUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: url
        });
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  };

  const handleShareClick = async () => {
    const sharedNatively = await handleNativeShare();
    if (!sharedNatively) {
      setIsOpen(true);
    }
  };

  const handleCopyLink = () => {
    const url = getShareUrl();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedSummary = encodeURIComponent(`${shareTitle} - Read more on Pentahouse Journal`);

  const sharePlatforms = [
    {
      name: "WhatsApp",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`*${shareTitle}*\n\n${shareDescription}\n\n${currentUrl}`)}`
    },
    {
      name: "LinkedIn",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
        </svg>
      ),
      color: "bg-[#0A66C2] hover:bg-[#0855a3] text-white font-bold",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: "X (Twitter)",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: "bg-black hover:bg-neutral-800 text-white border border-white/20 font-bold",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareTitle} — ${shareDescription.slice(0, 100)}`)}&url=${encodedUrl}`
    },
    {
      name: "Facebook",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "bg-[#1877F2] hover:bg-[#1464cc] text-white font-bold",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-white/10 hover:bg-white/20 text-white font-bold border border-white/15",
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${shareTitle}\n\n${shareDescription}\n\nRead the full article: ${currentUrl}`)}`
    }
  ];

  return (
    <>
      {/* Share Button Trigger */}
      <button
        onClick={handleShareClick}
        className={
          buttonClassName ||
          "p-2 rounded-full bg-white/5 border border-white/15 text-gray-300 hover:text-white hover:border-[#CBA052]/50 hover:bg-[#CBA052]/10 transition-all cursor-pointer flex items-center justify-center"
        }
        title="Share article"
      >
        <Share2 size={15} />
      </button>

      {/* Share Modal Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] border border-[#CBA052]/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#CBA052]/20 border border-[#CBA052]/40 flex items-center justify-center text-[#CBA052]">
                    <Share2 size={14} />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">Share Article</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Article Meta Mini Preview */}
              <div className="bg-[#181818] border border-white/10 rounded-xl p-3 mb-5 flex gap-3 items-center">
                <img
                  src={previewImage}
                  alt={post.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border border-white/10"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-bold text-[#CBA052] uppercase tracking-wider block mb-0.5">
                    {post.category}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                    {shareDescription}
                  </p>
                </div>
              </div>

              {/* Copy Link Input Bar */}
              <div className="mb-5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Article Link
                </label>
                <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/15 rounded-xl p-1.5 pl-3">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="bg-transparent text-xs text-gray-300 flex-1 focus:outline-none truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      copied
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-[#CBA052] text-black hover:bg-white"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={13} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Platform Buttons Grid */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Share via Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sharePlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${platform.color}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{platform.name}</span>
                        <ExternalLink size={10} className="opacity-60" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
