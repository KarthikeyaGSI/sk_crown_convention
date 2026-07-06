"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isClient, setIsClient] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const hasVisited = sessionStorage.getItem("skcrown-preloader-shown");
    
    if (!hasVisited) {
      setShow(true);
      sessionStorage.setItem("skcrown-preloader-shown", "true");

      const startTime = Date.now();
      const minDisplayTime = 1200; // Force it to show for at least 1.2s so animation plays
      
      const removeTimer = setTimeout(() => {
        setShow(false);
      }, 2000); // Max 2s

      const handleVideoReady = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < minDisplayTime) {
          setTimeout(() => setShow(false), minDisplayTime - elapsed);
        } else {
          setShow(false);
        }
      };

      window.addEventListener("heroVideoReady", handleVideoReady);

      return () => {
        clearTimeout(removeTimer);
        window.removeEventListener("heroVideoReady", handleVideoReady);
      };
    }
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10">
              <span className="text-sm md:text-base text-white/70 font-sans tracking-[0.2em] font-medium uppercase">
                A Venue Designed For Celebrations
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gold tracking-wider leading-tight uppercase font-bold">
                Welcome to<br />SK Crown Convention
              </h2>
            </div>

            {/* Premium Gold Loading Animation - smooth left to right */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-full h-full bg-gold absolute top-0 left-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
