"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
export default function FooterSection({ personalDetails }: { personalDetails: any }) {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-12 overflow-hidden border-t border-white/5 bg-[#030014]">
      {/* Decorative background lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10 select-none">
        
        {/* Left Column: Brand name */}
        <div className="text-center md:text-left space-y-1">
          <span className="font-mono text-xs text-[#00f0ff] uppercase tracking-widest font-bold block">
            PORTFOLIO // CORES
          </span>
          <h4 className="text-white font-extrabold text-lg tracking-tight">
            {personalDetails.name}
          </h4>
          <p className="text-[10px] text-slate-500 font-mono">
            &copy; {currentYear} AJAY_CHAVAN. All rights reserved.
          </p>
        </div>

        {/* Center Column: Quick navigation Bookmarks */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-400">
          {[
            { id: "hero", label: "Core" },
            { id: "about", label: "Bio" },
            { id: "skills", label: "Skills" },
            { id: "projects", label: "Work" },
            { id: "services", label: "Services" },
            { id: "contact", label: "Connect" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="hover:text-[#00f0ff] transition cursor-pointer"
            >
              //{item.label}
            </button>
          ))}
        </div>

        {/* Right Column: Social Links */}
        <div className="flex justify-center md:justify-end space-x-4">
          {[
            { icon: Github, url: personalDetails.githubUrl, label: "GitHub" },
            { icon: Linkedin, url: personalDetails.linkedinUrl, label: "LinkedIn" },
            { icon: Twitter, url: personalDetails.twitterUrl, label: "Twitter" },
            { icon: Mail, url: `mailto:${personalDetails.email}`, label: "Email" },
          ].map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full border border-white/5 glass-light text-slate-500 hover:text-[#00f0ff] hover:border-[#00f0ff]/20 transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
}
