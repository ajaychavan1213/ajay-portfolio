"use client";

import { motion } from "framer-motion";
import { Award, Cloud, Database, ExternalLink } from "lucide-react";
export default function CertificationsSection({ certifications }: { certifications: any[] }) {
  // Map icons to cert categories
  const getIcon = (name: string) => {
    switch (name) {
      case "Aws": return Cloud;
      case "Vercel": return ExternalLink;
      case "Mongo": return Database;
      default: return Award;
    }
  };

  return (
    <section id="certifications" className="relative w-full py-24 overflow-hidden border-t border-white/5 bg-[#030014]/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            06 // CERTIFICATION MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Professional <span className="bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">Credentials</span>
          </h2>
          <div className="w-16 h-1 bg-[#a855f7] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const Icon = getIcon(cert.iconName);
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/5 glass-card flex flex-col justify-between hover:border-[#00f0ff]/20 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition">
                      <Icon className="w-5 h-5 text-[#00f0ff]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                      {cert.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-base leading-snug group-hover:text-[#00f0ff] transition">
                      {cert.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-mono mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href={cert.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-mono text-[#a855f7] hover:text-[#00f0ff] transition-all"
                  >
                    <span>Verify Credentials</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
