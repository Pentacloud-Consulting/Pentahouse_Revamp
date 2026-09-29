"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import { BlogPost, LayoutMode, SortOption, MOCK_BLOGS } from "./types";
import BlogRecentlyUploaded from "./Blog Recently Uploaded";
import BlogSearching from "./Blog Searching";
import BlogArticles from "./Blog Articles";
import BlogSkeleton, { BlogFeaturedSkeleton } from "./BlogSkeleton";
import { fetchWordPressPosts, getCachedWordPressPosts } from "./wordpress";

export default function BlogView() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("grid");

  const [visibleCount, setVisibleCount] = useState(12);
  const lenis = useLenis();

  useEffect(() => {
    async function loadWordPressBlogs() {
      // 1. Instant load from in-memory cache
      const memCache = getCachedWordPressPosts();
      if (memCache && memCache.length > 0) {
        setBlogs(memCache);
        setIsLoading(false);
      } else if (typeof window !== "undefined") {
        // 2. Instant load from localStorage cache
        const localCacheStr = localStorage.getItem("pentahouse_blogs_cache");
        if (localCacheStr) {
          try {
            const parsed = JSON.parse(localCacheStr);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setBlogs(parsed);
              setIsLoading(false);
            }
          } catch (e) {
            // ignore JSON error
          }
        }
      }

      // 3. Background fresh fetch & update
      const livePosts = await fetchWordPressPosts();
      if (livePosts && livePosts.length > 0) {
        setBlogs(livePosts);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("pentahouse_blogs_cache", JSON.stringify(livePosts));
          } catch (e) {
            // ignore storage full error
          }
        }
      }
      setIsLoading(false);
    }
    loadWordPressBlogs();
  }, []);

  // Reset pagination count when search, category, or sort option changes
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCategory, sortBy]);

  // Recalculate Lenis scroll dimensions whenever visible content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      lenis?.resize();
    }, 150);
    return () => clearTimeout(timer);
  }, [blogs.length, visibleCount, isLoading, searchQuery, selectedCategory, lenis]);


  // Dynamically derive unique categories from actual WordPress posts including location tags
  const categories = useMemo(() => {
    const defaultCats = ["All", "Bangalore", "Thanisandra", "RT Nagar"];
    const dynamicCats: string[] = [];

    blogs.forEach((blog) => {
      if (
        blog.category &&
        blog.category !== "Blog" &&
        blog.category !== "Uncategorized" &&
        !defaultCats.some((d) => d.toLowerCase() === blog.category.toLowerCase())
      ) {
        if (!dynamicCats.includes(blog.category)) {
          dynamicCats.push(blog.category);
        }
      }
    });

    return [...defaultCats, ...dynamicCats];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.subtitle.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.author.name.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;

      // Robust space-insensitive category & location matching
      const normCat = selectedCategory.toLowerCase().replace(/\s+/g, "");
      const normTitle = blog.title.toLowerCase().replace(/\s+/g, "");
      const normExcerpt = blog.excerpt.toLowerCase().replace(/\s+/g, "");
      const normBlogCategory = blog.category.toLowerCase().replace(/\s+/g, "");

      const matchesCategory =
        normBlogCategory.includes(normCat) ||
        normTitle.includes(normCat) ||
        normExcerpt.includes(normCat) ||
        blog.tags.some(tag => tag.toLowerCase().replace(/\s+/g, "").includes(normCat));

      return matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "popular") {
        return b.views - a.views;
      }
      if (sortBy === "readTime") {
        const timeA = a.readTimeNum ?? (parseInt(a.readTime) || 5);
        const timeB = b.readTimeNum ?? (parseInt(b.readTime) || 5);
        return timeA - timeB;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [blogs, searchQuery, selectedCategory, sortBy]);

  const featuredPost = useMemo(() => {
    return blogs.find(b => b.featured) || blogs[0];
  }, [blogs]);

  // Pagination slicing
  const displayedBlogs = useMemo(() => {
    return filteredBlogs.slice(0, visibleCount);
  }, [filteredBlogs, visibleCount]);

  const hasMore = visibleCount < filteredBlogs.length;
  const remainingCount = filteredBlogs.length - visibleCount;

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

      {/* FEATURED BLOG SKELETON OR ARTICLE */}
      {isLoading ? (
        !searchQuery && selectedCategory === "All" && <BlogFeaturedSkeleton />
      ) : (
        !searchQuery && selectedCategory === "All" && featuredPost && (
          <BlogRecentlyUploaded post={featuredPost} />
        )
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
        categories={categories}
      />

      {/* BLOG ARTICLES DISPLAY / SKELETON */}
      {isLoading ? (
        <BlogSkeleton layoutMode={layoutMode} />
      ) : (
        <BlogArticles
          blogs={displayedBlogs}
          layoutMode={layoutMode}
          onSelectBlog={() => {}}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onResetFilters={() => { setSearchQuery(""); setSelectedCategory("All"); }}
          totalCount={filteredBlogs.length}
          hasMore={hasMore}
          remainingCount={remainingCount}
          onLoadMore={() => setVisibleCount(prev => prev + 12)}
        />
      )}
    </div>
  );
}
