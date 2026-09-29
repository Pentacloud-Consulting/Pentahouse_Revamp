"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CTA from "@/PentaHouse/Home/CTA";
import BlogHTMLConvert from "./Blog HTML convert";
import { BlogPost, getBlogBySlug, MOCK_BLOGS } from "./types";
import { fetchWordPressPostBySlug } from "./wordpress";

interface BlogPreviewProps {
  slug: string;
}

export default function BlogPreview({ slug }: BlogPreviewProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      // Try WordPress REST API first
      const wpPost = await fetchWordPressPostBySlug(slug);
      if (wpPost) {
        setPost(wpPost);
        setLoading(false);
        return;
      }

      // Fallback to local mock posts
      const found = getBlogBySlug(slug);
      if (found) {
        setPost(found);
      } else {
        setPost(MOCK_BLOGS[0]);
      }
      setLoading(false);
    }

    loadPost();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#CBA052] selection:text-white">
      <Navbar />

      <main className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#CBA052] hover:text-white transition-colors bg-[#111111] px-4 py-2 rounded-lg border border-[#CBA052]/30"
          >
            <ArrowLeft size={14} />
            <span>Back to All Blogs</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-400 text-sm">Loading article...</div>
        ) : post ? (
          <BlogHTMLConvert post={post} />
        ) : (
          <div className="text-center py-24 bg-[#111111] rounded-2xl border border-white/10 max-w-xl mx-auto p-8">
            <BookOpen className="w-12 h-12 text-[#CBA052] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Article Not Found</h3>
            <p className="text-gray-400 text-xs mb-6">The requested blog post could not be located.</p>
            <Link
              href="/blog"
              className="bg-[#CBA052] text-black font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-white transition-colors"
            >
              Return to Journal
            </Link>
          </div>
        )}

        <div className="mt-20">
          <CTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
