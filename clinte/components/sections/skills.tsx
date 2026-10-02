"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, Layout, Smartphone, Cloud, Sparkles } from "lucide-react";

export default function SkillsSection({ skills }: { skills: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Skills", icon: Cpu },
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "backend", label: "Backend", icon: Database },
    { id: "database", label: "Database", icon: Database },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "devops", label: "DevOps", icon: Cloud },
    { id: "ai", label: "AI Tools", icon: Sparkles },
  ];

  // Unique categories for deduplication in UI filters if needed, 
  // but using hardcoded category mappings is cleaner
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Map icon strings to simple decorative UI elements or colors
  const getSkillTheme = (category: string) => {
    switch (category) {
      case "frontend": return { glow: "shadow-[0_0_15px_rgba(0,240,255,0.15)]", border: "hover:border-[#00f0ff]/30", text: "text-[#00f0ff]", fill: "bg-[#00f0ff]" };
      case "backend": return { glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]", border: "hover:border-[#a855f7]/30", text: "text-[#a855f7]", fill: "bg-[#a855f7]" };
      case "database": return { glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]", border: "hover:border-[#06b6d4]/30", text: "text-[#06b6d4]", fill: "bg-[#06b6d4]" };
      case "mobile": return { glow: "shadow-[0_0_15px_rgba(0,240,255,0.15)]", border: "hover:border-[#00f0ff]/30", text: "text-[#00f0ff]", fill: "bg-[#00f0ff]" };
      case "devops": return { glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]", border: "hover:border-[#a855f7]/30", text: "text-[#a855f7]", fill: "bg-[#a855f7]" };
      case "ai": return { glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]", border: "hover:border-[#06b6d4]/30", text: "text-[#06b6d4]", fill: "bg-[#06b6d4]" };
      default: return { glow: "", border: "", text: "text-[#00f0ff]", fill: "bg-[#00f0ff]" };
    }
  };

  return (
    <section id="skills" className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#a855f7]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            03 // SKILLS INVENTORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Core <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <div className="w-16 h-1 bg-[#a855f7] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                suppressHydrationWarning
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full border text-xs font-mono font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                    : "border-white/10 glass hover:border-white/20 text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const theme = getSkillTheme(skill.category);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className={`group relative p-5 rounded-2xl border border-white/5 glass-card ${theme.border} hover:${theme.glow}`}
                >
                  {/* Glowing background hint on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#030014] to-transparent pointer-events-none z-0`} />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white font-bold text-sm sm:text-base group-hover:text-[#00f0ff] transition-colors">
                        {skill.name}
                      </span>
                      <span className={`text-xs font-mono font-bold ${theme.text}`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${theme.fill} rounded-full`}
                      />
                    </div>
                    
                    {/* Progress details */}
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                      {skill.category} / Core
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
