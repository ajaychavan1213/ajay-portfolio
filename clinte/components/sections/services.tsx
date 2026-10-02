"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Palette, Sparkles, CheckCircle2 } from "lucide-react";
export default function ServicesSection({ services }: { services: any[] }) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Cpu: Cpu,
    Globe: Globe,
    Sparkles: Sparkles,
    Palette: Palette,
  };

  return (
    <section id="services" className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Dynamic neon circles */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#00f0ff]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#a855f7]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            05 // SERVICES MENU
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Solutions Offered & <span className="bg-gradient-to-r from-[#a855f7] to-[#00f0ff] bg-clip-text text-transparent">Expertise</span>
          </h2>
          <div className="w-16 h-1 bg-[#00f0ff] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Cpu;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl border border-white/5 glass-card flex flex-col justify-between"
              >
                {/* Visual glow on card hover */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#00f0ff]/5 rounded-full blur-2xl group-hover:scale-150 transition duration-500" />

                <div className="space-y-6">
                  {/* Icon wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00f0ff]/30 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition duration-300">
                    <IconComponent className="w-6 h-6 text-[#00f0ff] group-hover:scale-110 transition duration-300" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white font-extrabold text-xl group-hover:text-[#00f0ff] transition duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet points list */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
                    {service.features.map((feat: string) => (
                      <li key={feat} className="flex items-center text-xs text-slate-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7] mr-2 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
