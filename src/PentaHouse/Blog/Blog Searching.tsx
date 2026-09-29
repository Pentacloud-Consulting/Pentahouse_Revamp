"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import BlogBentoGridList from "./Blog-Bento-Grid-List";
import BlogSortDropdown from "./BlogSortDropdown";
import { LayoutMode, SortOption, CATEGORIES } from "./types";

interface BlogSearchingProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  categories?: string[];
}

export default function BlogSearching({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  layoutMode,
  setLayoutMode,
  categories = CATEGORIES as unknown as string[]
}: BlogSearchingProps) {
  const categoryList = categories.length > 0 ? categories : CATEGORIES;
  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-3.5 sm:p-4 mb-8 shadow-lg">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Search Input Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, keyword, title, or author..."
            className="w-full bg-[#0a0a0a] border border-white/15 focus:border-[#CBA052] text-white text-xs rounded-lg pl-10 pr-9 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#CBA052] transition-all placeholder:text-gray-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Controls Right Group */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full lg:w-auto">
          {/* Custom Luxury Sort Dropdown */}
          <BlogSortDropdown sortBy={sortBy} setSortBy={setSortBy} />

          {/* View Switcher Component */}
          <BlogBentoGridList
            layoutMode={layoutMode}
            setLayoutMode={setLayoutMode}
          />
        </div>
      </div>

      {/* Category Pill Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-3 border-t border-white/10 no-scrollbar">
        {categoryList.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? "text-black font-bold"
                  : "bg-[#0a0a0a] text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-[#CBA052] rounded-lg shadow-sm"
                  transition={{ type: "spring" as const, stiffness: 400, damping: 33 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

