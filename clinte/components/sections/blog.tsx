"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react";
export default function BlogSection({ blogs }: { blogs: any[] }) {
  return (
    <section id="blog" className="relative w-full py-24 overflow-hidden border-t border-white/5 bg-[#030014]/10">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#06b6d4]/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            08 // DEV LOGS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Tech Blogs & <span className="bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">Insights</span>
          </h2>
          <div className="w-16 h-1 bg-[#00f0ff] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/5 glass-card flex flex-col justify-between hover:border-[#00f0ff]/20 duration-300"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {blog.date}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-3 h-3 mr-1.5" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-white font-extrabold text-base leading-snug group-hover:text-[#00f0ff] transition duration-300">
                  {blog.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>
              </div>

              {/* Action trigger */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href={`#blog/${blog.slug}`}
                  onClick={(e) => e.preventDefault()} // Keep visual single-page experience
                  className="flex items-center justify-between text-xs font-mono text-[#a855f7] group-hover:text-[#00f0ff] transition-all"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
