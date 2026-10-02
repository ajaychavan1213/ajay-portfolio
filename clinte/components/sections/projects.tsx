"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Project } from "@/constants/portfolio-data";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filters mapping
  const filterMap = [
    { id: "all", label: "All Projects" },
    { id: "web3d", label: "3D & WebGL" },
    { id: "ai", label: "Artificial Intel" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "devops", label: "DevOps / Cloud" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(proj => proj.category === activeFilter);

  // 3D Card Hover Tilt Effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const nextImage = (imagesLength: number) => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesLength);
  };

  const prevImage = (imagesLength: number) => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength);
  };

  return (
    <section id="projects" className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Glow shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#a855f7]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            04 // PORTFOLIO ARCHIVES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Featured <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">Innovations</span>
          </h2>
          <div className="w-16 h-1 bg-[#06b6d4] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-12">
          {filterMap.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full border text-xs font-mono font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "border-white/10 glass hover:border-white/20 text-slate-400 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              style={{ transition: "transform 0.1s ease-out" }}
              className="group relative rounded-2xl border border-white/5 glass-card overflow-hidden cursor-pointer h-[320px] flex flex-col justify-between p-6"
            >
              {/* Highlight gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030014]/90 via-[#030014]/40 to-transparent z-0" />

              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider bg-[#00f0ff]/5 px-2.5 py-1 rounded-full border border-[#00f0ff]/10">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="flex items-center text-[10px] font-mono text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    Featured
                  </span>
                )}
              </div>

              <div className="relative z-10 space-y-3">
                <h3 className="text-white font-extrabold text-xl group-hover:text-[#00f0ff] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <div 
              className="absolute inset-0 bg-[#030014]/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Body */}
            <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 glass max-h-[90vh] overflow-y-auto z-10 shadow-[0_0_50px_rgba(0,240,255,0.15)] scroll-smooth no-scrollbar">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full border border-white/10 glass-light text-slate-400 hover:text-white transition-all z-20 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Visual Image Carousel with Real Image Rendering & Fallback */}
                <div className="relative w-full h-[240px] sm:h-[380px] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#030014] to-[#120e3a] border border-white/5 flex items-center justify-center">
                  {selectedProject.images && selectedProject.images[currentImageIndex] ? (
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Replace broken image with visual mock container
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : null}

                  <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none -z-0" />
                  
                  {/* Neon procedural block visual */}
                  <div className="text-center p-8 space-y-2 select-none">
                    <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block">
                      IMAGE CAROUSEL FRAME [{currentImageIndex + 1} / {selectedProject.images.length || 1}]
                    </span>
                    <h4 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">
                      {selectedProject.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      Visual Asset Frame — Synced at runtime.
                    </p>
                  </div>

                  {/* Slider controls if multiple images */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(selectedProject.images.length)}
                        className="absolute left-4 p-2.5 rounded-full border border-white/10 glass-light text-slate-300 hover:text-white hover:bg-white/5 transition z-10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => nextImage(selectedProject.images.length)}
                        className="absolute right-4 p-2.5 rounded-full border border-white/10 glass-light text-slate-300 hover:text-white hover:bg-white/5 transition z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Indicator Dots */}
                  <div className="absolute bottom-4 flex space-x-2 z-10">
                    {selectedProject.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? "bg-[#00f0ff] w-4" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Details grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Left Column: Description & info */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-[#00f0ff] uppercase bg-[#00f0ff]/5 px-2 py-0.5 rounded border border-[#00f0ff]/10">
                        {selectedProject.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        DATABASE_ID: {selectedProject.id}
                      </span>
                    </div>

                    <h3 className="text-white font-extrabold text-2xl sm:text-3xl">
                      {selectedProject.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </div>

                  {/* Right Column: Actions & Technologies */}
                  <div className="space-y-6">
                    {/* Action buttons */}
                    <div className="flex flex-col gap-3">
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-black font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Live Demo</span>
                      </a>

                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-white/10 glass text-white font-medium text-sm hover:border-[#00f0ff]/30 transition"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    </div>

                    {/* Technologies list */}
                    <div className="space-y-2">
                      <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-xs text-[#00f0ff] bg-[#00f0ff]/5 border border-[#00f0ff]/15 px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
