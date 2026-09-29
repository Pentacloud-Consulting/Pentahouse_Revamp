"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { SortOption } from "./types";

interface BlogSortDropdownProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
  { id: "readTime", label: "Quick Read" },
];

export default function BlogSortDropdown({
  sortBy,
  setSortBy,
}: BlogSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    SORT_OPTIONS.find((opt) => opt.id === sortBy) || SORT_OPTIONS[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 bg-[#0a0a0a] border rounded-lg px-3 py-1.5 text-xs text-gray-300 transition-all duration-200 cursor-pointer select-none ${
          isOpen
            ? "border-[#CBA052] text-white shadow-[0_0_12px_rgba(203,160,82,0.15)]"
            : "border-white/15 hover:border-[#CBA052]/50 hover:text-white"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <SlidersHorizontal size={13} className="text-[#CBA052] shrink-0" />
        <span className="hidden sm:inline text-gray-400 text-[11px]">Sort:</span>
        <span className="font-semibold text-white">{selectedOption.label}</span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#CBA052]" : ""
          }`}
        />
      </button>

      {/* Custom UI Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-44 bg-[#121212] border border-[#CBA052]/30 rounded-xl p-1.5 shadow-2xl shadow-black/90 backdrop-blur-xl z-50 overflow-hidden"
            role="listbox"
          >
            <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 px-2.5 py-1 mb-1 border-b border-white/5">
              Sort Articles By
            </div>
            {SORT_OPTIONS.map((option) => {
              const isSelected = sortBy === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSortBy(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[#CBA052]/15 text-[#CBA052] font-semibold"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <Check size={13} className="text-[#CBA052] shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
