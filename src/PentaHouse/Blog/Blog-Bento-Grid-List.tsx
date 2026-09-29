"use client";

import { motion } from "framer-motion";
import { Grid, List } from "lucide-react";
import { LayoutMode } from "./types";

interface BlogBentoGridListProps {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
}

export default function BlogBentoGridList({
  layoutMode,
  setLayoutMode
}: BlogBentoGridListProps) {
  const modes: { id: LayoutMode; label: string; icon: typeof Grid }[] = [
    { id: "grid", label: "Grid", icon: Grid },
    { id: "list", label: "List", icon: List },
  ];

  return (
    <div className="flex items-center bg-[#0a0a0a] border border-white/15 rounded-lg p-1 shadow-inner relative">
      {modes.map(({ id, label, icon: Icon }) => {
        const isActive = layoutMode === id;
        return (
          <button
            key={id}
            onClick={() => setLayoutMode(id)}
            className={`relative px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
              isActive ? "text-black font-bold" : "text-gray-400 hover:text-white"
            }`}
            title={`${label} View`}
          >
            {isActive && (
              <motion.div
                layoutId="activeLayoutModePill"
                className="absolute inset-0 bg-[#CBA052] rounded-md shadow-sm"
                transition={{ type: "spring" as const, stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon size={14} />
              <span>{label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

