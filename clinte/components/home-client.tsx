"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ServicesSection from "@/components/sections/services";
import CertificationsSection from "@/components/sections/certifications";
import TestimonialsSection from "@/components/sections/testimonials";
import BlogSection from "@/components/sections/blog";
import ContactSection from "@/components/sections/contact";
import FooterSection from "@/components/sections/footer";
import AIAssistant from "@/components/ai-assistant";
import TerminalModal from "@/components/terminal-modal";
import { Terminal, Cpu, Volume2, VolumeX, Sparkles, Command, Menu, X } from "lucide-react";
import { soundFx } from "@/lib/sound-fx";

export default function HomeClient({ data }: { data: any }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K shortcut for developer CLI terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleScrollToSection = (id: string) => {
    soundFx.playClick();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleSound = () => {
    const isNowEnabled = soundFx.toggleSound();
    setSoundEnabled(isNowEnabled);
  };

  return (
    <>
      {/* Top scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] z-[99999] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#030014]/70 backdrop-blur-md z-[9990] flex items-center select-none">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleScrollToSection("hero")}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-tr from-[#00f0ff] to-[#a855f7] flex items-center justify-center border border-[#00f0ff]/20 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition duration-300">
              <Terminal className="w-4.5 h-4.5 text-black" />
            </div>
            <span className="font-mono text-sm text-white font-extrabold tracking-widest uppercase group-hover:text-[#00f0ff] transition duration-300">
              AJAY // DEV
            </span>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-slate-400">
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
                onClick={() => handleScrollToSection(item.id)}
                onMouseEnter={() => soundFx.playHover()}
                suppressHydrationWarning
                className="hover:text-[#00f0ff] transition cursor-pointer relative py-1 group"
              >
                <span>//{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00f0ff] transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Controls: CLI Terminal + Audio SFX Toggle + Connect CTA */}
          <div className="flex items-center space-x-3">
            {/* Terminal CLI Modal Launcher */}
            <button
              onClick={() => {
                soundFx.playClick();
                setIsTerminalOpen(true);
              }}
              onMouseEnter={() => soundFx.playHover()}
              title="Launch CLI Terminal (Ctrl+K)"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#00f0ff]/20 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-xs transition duration-300 cursor-pointer"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">CLI</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleToggleSound}
              onMouseEnter={() => soundFx.playHover()}
              title={soundEnabled ? "Mute Cyberpunk Sound FX" : "Enable Sound FX"}
              className={`p-2 rounded-lg border text-xs transition duration-300 cursor-pointer ${
                soundEnabled
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
                  : "border-white/10 glass-light text-slate-500 hover:text-white"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Hire Me / Connect CTA */}
            <button
              onClick={() => handleScrollToSection("contact")}
              onMouseEnter={() => soundFx.playHover()}
              suppressHydrationWarning
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/15 text-[#00f0ff] font-mono text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.05)] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>CONNECT</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
              title="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-lg border border-white/10 glass-light text-slate-300 hover:text-white transition duration-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#030014]/95 backdrop-blur-xl px-6 py-4 space-y-3 font-mono text-xs text-slate-300 animate-fadeIn">
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleScrollToSection(item.id);
                }}
                className="block w-full text-left py-2 px-3 rounded-lg hover:bg-white/5 hover:text-[#00f0ff] transition"
              >
                //{item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Sections Shell */}
      <main className="flex-1 w-full flex flex-col z-10">
        <HeroSection personalDetails={data.personalDetails} />
        <AboutSection personalDetails={data.personalDetails} timeline={data.timeline} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <ServicesSection services={data.services} />
        <CertificationsSection certifications={data.certifications} />
        <TestimonialsSection testimonials={data.testimonials} />
        <BlogSection blogs={data.blogs} />
        <ContactSection email={data.personalDetails.email} />
      </main>

      {/* Footer component */}
      <FooterSection personalDetails={data.personalDetails} />

      {/* Floating AI Assistant Chat widget */}
      <AIAssistant />

      {/* Interactive Developer Matrix Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        data={data}
      />
    </>
  );
}
