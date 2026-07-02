"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
          SK Crown
        </span>
      </div>
    </div>
  );
}
