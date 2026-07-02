"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Scroll to top immediately on route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Elegant, smooth luxury ease-out
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}
