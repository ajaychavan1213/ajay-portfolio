"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
export default function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <section id="testimonials" className="relative w-full py-24 overflow-hidden border-t border-white/5 bg-[#030014]/20">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00f0ff]/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            07 // SOCIAL FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Client <span className="bg-gradient-to-r from-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <div className="w-16 h-1 bg-[#00f0ff] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative p-8 rounded-3xl border border-white/5 glass-card flex flex-col justify-between"
            >
              {/* Quote mark decal */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#00f0ff]/5 group-hover:text-[#00f0ff]/10 group-hover:scale-110 transition duration-300 pointer-events-none" />

              <div className="space-y-6">
                {/* Stars rating */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{test.feedback}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-white/5">
                {/* Avatar placeholder or unsplash photo */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback visual avatar
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">
                    {test.name}
                  </h4>
                  <p className="text-slate-500 text-xs font-mono">
                    {test.role}, {test.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
