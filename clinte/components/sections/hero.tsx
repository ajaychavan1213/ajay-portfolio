"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import dynamic from "next/dynamic";
import { useMagnetic } from "@/hooks/use-magnetic";

// Load 3D scene dynamically to avoid SSR errors
const ThreeScene = dynamic(() => import("@/components/3d/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030014]/50 z-0">
      <div className="text-slate-400 font-mono text-xs animate-pulse">BOOTING 3D SYSTEM...</div>
    </div>
  ),
});

export default function HeroSection({ personalDetails }: { personalDetails: any }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const strings = [
    "Full Stack Developer",
    "3D Web Architect",
    "UI/UX Designer",
    "AI Systems Builder"
  ];
  
  const typingSpeed = isDeleting ? 40 : 80;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = strings[textIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentWord) {
      // Wait before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Apply magnetic effect to key buttons
  const resumeBtnRef = useMagnetic(0.2) as React.RefObject<HTMLAnchorElement | null>;
  const hireBtnRef = useMagnetic(0.2) as React.RefObject<HTMLButtonElement | null>;

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D WebGL Canvas Layer */}
      <ThreeScene />

      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 grid-bg-animated opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none z-0" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 select-none">
        
        {/* Text Info Column */}
        <div className="flex flex-col space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 glass-light text-xs font-mono text-[#00f0ff] uppercase tracking-wider w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span>Systems Active</span>
          </motion.div>

          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
            >
              Hi, I am <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent text-glow-blue">{personalDetails.name}</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-10 text-xl sm:text-2xl font-mono font-medium text-slate-300"
            >
              <span>I build </span>
              <span className="text-[#00f0ff] border-r-2 border-[#00f0ff] pr-1 animate-pulse">
                {displayText}
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed font-sans"
          >
            {`${personalDetails.subtitle} Let's engineer something beautiful, hyper-functional, and premium.`}
          </motion.p>

          {/* Interactive Button Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              ref={hireBtnRef}
              onClick={() => {
                const target = document.getElementById("contact");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              suppressHydrationWarning
              className="group flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 pointer-events-auto"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              ref={resumeBtnRef}
              href={personalDetails.resumeUrl}
              download
              className="flex items-center space-x-2 px-6 py-3 rounded-full border border-white/15 glass hover:border-[#00f0ff]/50 text-white font-medium text-sm transition-all duration-300 pointer-events-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Magnetic Social Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex space-x-4 pt-6"
          >
            {[
              { icon: Github, url: personalDetails.githubUrl, color: "hover:text-[#00f0ff]" },
              { icon: Linkedin, url: personalDetails.linkedinUrl, color: "hover:text-[#a855f7]" },
              { icon: Twitter, url: personalDetails.twitterUrl, color: "hover:text-[#06b6d4]" },
              { icon: Mail, url: `mailto:${personalDetails.email}`, color: "hover:text-[#00f0ff]" }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 rounded-full border border-white/5 glass-light text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 pointer-events-auto`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center space-y-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative w-72 h-80 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.2)] border border-[#00f0ff]/30 group"
          >
            <img
              src="/profile.jpg"
              alt={personalDetails.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center space-y-1.5 max-w-xs"
          >
            <h3 className="text-white font-extrabold text-xl tracking-tight">{personalDetails.name}</h3>
            <p className="text-[#00f0ff] font-mono text-xs tracking-wider uppercase font-semibold">{personalDetails.title}</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Senior Staff Software Engineer & 3D Web Architect building high-performance applications.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
