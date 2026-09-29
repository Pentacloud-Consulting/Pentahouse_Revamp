"use client";

import { LayoutMode } from "./types";
import { Loader2 } from "lucide-react";

interface BlogSkeletonProps {
  layoutMode: LayoutMode;
}

export function BlogFeaturedSkeleton() {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden animate-pulse mb-8 p-6 sm:p-8 relative min-h-[280px] sm:min-h-[320px] flex flex-col justify-end">
      <div className="absolute top-6 left-6 w-28 h-6 bg-white/10 rounded-full" />
      <div className="max-w-2xl space-y-3 z-10">
        <div className="w-24 h-3 bg-white/10 rounded" />
        <div className="h-7 bg-white/20 rounded w-4/5" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="pt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/15" />
          <div className="w-24 h-3 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function BlogSkeleton({ layoutMode }: BlogSkeletonProps) {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="w-full">
      {/* Skeleton Header Count Bar */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold tracking-widest uppercase">
          <Loader2 size={13} className="animate-spin text-[#CBA052]" />
          <span>Fetching Journal Articles...</span>
        </div>
      </div>

      {/* Grid or List Skeleton Cards */}
      <div
        className={
          layoutMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            : "flex flex-col gap-4"
        }
      >
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className={`bg-[#111111] border border-white/10 rounded-xl overflow-hidden animate-pulse ${
              layoutMode === "list" ? "flex flex-col md:flex-row gap-4 p-4" : "flex flex-col"
            }`}
          >
            {/* Image Skeleton */}
            <div
              className={`bg-white/10 relative shrink-0 ${
                layoutMode === "list"
                  ? "w-full md:w-52 h-40 rounded-lg"
                  : "w-full h-44"
              }`}
            >
              <div className="absolute top-3 left-3 w-20 h-4 bg-white/10 rounded" />
            </div>

            {/* Content Skeleton */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-3">
                  <div className="w-16 h-3 bg-white/10 rounded" />
                  <div className="w-12 h-3 bg-white/10 rounded" />
                </div>
                <div className="h-5 bg-white/15 rounded w-5/6 mb-2" />
                <div className="h-4 bg-white/10 rounded w-full mb-1.5" />
                <div className="h-4 bg-white/10 rounded w-2/3 mb-4" />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/15" />
                  <div className="w-20 h-3 bg-white/10 rounded" />
                </div>
                <div className="w-14 h-4 bg-[#CBA052]/20 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
