"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Briefcase, Calendar, GraduationCap, MapPin, Sparkles } from "lucide-react";
// Helper component for counting stats when scrolled into view
function CounterItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  // Extract digits
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1500; // ms
    const increment = numericValue / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center p-4 rounded-xl border border-white/5 glass-light">
      <div className="text-3xl sm:text-4xl font-mono font-extrabold bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <div className="text-[11px] sm:text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection({ personalDetails, timeline }: { personalDetails: any, timeline: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const timelineItems = timeline;

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-[#00f0ff]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#a855f7]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            01 // BIO MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            About Me & <span className="bg-gradient-to-r from-[#a855f7] to-[#00f0ff] bg-clip-text text-transparent">Chronicles</span>
          </h2>
          <div className="w-16 h-1 bg-[#00f0ff] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Section 1: Intro Bio & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Bio text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <Sparkles className="w-5 h-5 text-[#00f0ff] mr-2" />
              Bridging design precision with procedural code
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {personalDetails.bio}
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether building modular, dynamic APIs in Node.js or tuning the performance of GLSL shaders to run smoothly at 60 FPS, my commitment remains identical: write robust, clean code and design gorgeous user-first states.
            </p>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {personalDetails.achievements.map((ach: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-white/5 glass-card flex flex-col justify-between">
                  <Award className="w-5 h-5 text-[#a855f7] mb-3" />
                  <div>
                    <h4 className="text-white text-xs font-mono font-bold">{ach.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Display */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {personalDetails.stats.map((stat: any, idx: number) => (
              <CounterItem key={idx} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Section 2: Experience & Education Timeline */}
        <div className="mt-20">
          <div className="flex flex-col mb-12 text-center sm:text-left">
            <span className="text-xs font-mono text-[#a855f7] uppercase tracking-widest mb-2 block">
              02 // TIME CHRONOLOGY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Professional Timeline
            </h3>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-10 group"
              >
                {/* Timeline Dot Marker */}
                <span className="absolute -left-3 top-1 w-6 h-6 rounded-full border-2 border-brand-dark bg-slate-900 flex items-center justify-center group-hover:border-[#00f0ff] transition-colors duration-300">
                  {item.type === "experience" ? (
                    <Briefcase className="w-3 h-3 text-[#00f0ff]" />
                  ) : (
                    <GraduationCap className="w-3 h-3 text-[#a855f7]" />
                  )}
                </span>

                {/* Glassmorphic timeline card */}
                <div className="p-6 rounded-2xl border border-white/5 glass-card group-hover:border-[#00f0ff]/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-white font-bold text-lg group-hover:text-[#00f0ff] transition-colors">
                        {item.roleOrDegree}
                      </h4>
                      <p className="text-sm font-mono text-slate-300 mt-1">
                        {item.companyOrInstitution}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="inline-flex items-center text-xs text-[#a855f7] font-mono">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {item.duration}
                      </span>
                      <span className="inline-flex items-center text-[10px] text-slate-500 font-mono">
                        <MapPin className="w-2.5 h-2.5 mr-1" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5">
                    {item.bulletPoints.map((bp: string, bpIdx: number) => (
                      <li key={bpIdx} className="text-slate-400 text-xs flex items-start">
                        <span className="text-[#00f0ff] mr-2 font-bold">•</span>
                        {bp}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
