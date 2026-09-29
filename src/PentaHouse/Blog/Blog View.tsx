"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import { BlogPost, LayoutMode, SortOption, MOCK_BLOGS } from "./types";
import BlogRecentlyUploaded from "./Blog Recently Uploaded";
import BlogSearching from "./Blog Searching";
import BlogArticles from "./Blog Articles";
import { fetchWordPressPosts } from "./wordpress";

export default function BlogView() {
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("bento");

  useEffect(() => {
    async function loadWordPressBlogs() {
      const livePosts = await fetchWordPressPosts();
      if (livePosts && livePosts.length > 0) {
        setBlogs(livePosts);
      }
    }
    loadWordPressBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.subtitle.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.author.name.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return b.likes - a.likes;
      }
      if (sortBy === "readTime") {
        const timeA = parseInt(a.readTime) || 0;
        const timeB = parseInt(b.readTime) || 0;
        return timeA - timeB;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [blogs, searchQuery, selectedCategory, sortBy]);

  const featuredPost = useMemo(() => {
    return blogs.find(b => b.featured) || blogs[0];
  }, [blogs]);

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* SECTION HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CBA052]/10 border border-[#CBA052]/30 text-[#CBA052] text-[11px] font-bold tracking-widest uppercase mb-3">
          <span>Pentahouse Journal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
          Architectural Perspectives & Design Trends
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
          Thought leadership, spatial innovations, and luxury interior dynamics curated by our master architects.
        </p>
      </motion.div>

      {/* FEATURED / RECENTLY UPLOADED BLOG ARTICLE */}
      {!searchQuery && selectedCategory === "All" && featuredPost && (
        <BlogRecentlyUploaded 
          post={featuredPost}
        />
      )}

      {/* SEARCH, SORT, CATEGORY & VIEW MODE TOOLBAR */}
      <BlogSearching
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
      />

      {/* BLOG ARTICLES GRID DISPLAY */}
      <BlogArticles
        blogs={filteredBlogs}
        layoutMode={layoutMode}
        onSelectBlog={() => {}}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onResetFilters={() => { setSearchQuery(""); setSelectedCategory("All"); }}
      />
    </div>
  );
}
