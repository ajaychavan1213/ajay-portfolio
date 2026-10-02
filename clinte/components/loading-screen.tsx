"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        const diff = Math.random() * 12 + 4;
        return Math.min(prev + diff, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014] select-none"
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          
          <div className="relative flex flex-col items-center max-w-xs text-center z-10 px-4">
            {/* Core spinning indicator */}
            <div className="relative w-24 h-24 mb-8">
              <motion.div 
                className="absolute inset-0 rounded-full border-t-2 border-[#00f0ff]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border-b-2 border-[#a855f7]"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-4 rounded-full border-r-2 border-[#06b6d4]"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono text-[#00f0ff] font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-mono font-bold tracking-widest text-white mb-2"
            >
              INITIALIZING SYSTEMS
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-xs font-mono text-slate-400"
            >
              {progress < 30 && "Loading WebGL core assets..."}
              {progress >= 30 && progress < 60 && "Establishing holographic matrices..."}
              {progress >= 60 && progress < 90 && "Compiling cyberpunk layout layers..."}
              {progress >= 90 && "Futuristic link established."}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
