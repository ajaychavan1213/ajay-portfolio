"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";
import { submitContact } from "@/lib/api";
// Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Interactive Canvas Map Particle Network
function CanvasMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Initialize particles
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates inside canvas
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background text nodes indicating cyber cities
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(0, 240, 255, 0.15)";
      ctx.fillText("SF // OFFICE_NODE", width * 0.15, height * 0.25);
      ctx.fillText("MUMBAI // CENTRAL_CORE", width * 0.5, height * 0.65);
      ctx.fillText("TOKYO // RELAY_HUB", width * 0.75, height * 0.35);

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
        ctx.fill();

        // Connect particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${1 - dist / 80})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse hover point
        if (mouseX > 0) {
          const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
          if (distToMouse < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.8 * (1 - distToMouse / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // Target core (Ajay's location marker)
      const targetX = width * 0.5;
      const targetY = height * 0.65;
      
      ctx.beginPath();
      ctx.arc(targetX, targetY, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#a855f7";
      ctx.fill();

      // Pulsing grid waves around target
      const scale = (Date.now() % 2000) / 2000;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 8 + scale * 25, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${1 - scale})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-auto" />;
}

export default function ContactSection({ email }: { email: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await submitContact(data);

      setSubmitSuccess(true);
      reset();

      // Trigger canvas confetti fireworks
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#a855f7", "#06b6d4"],
      });

      // Reset success message alert after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("❌ Neural contact transmission offline. Please verify the server is running on http://localhost:5000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00f0ff]/2 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center sm:text-left">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 block">
            09 // QUANTUM LINK
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Initiate <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">Contact</span>
          </h2>
          <div className="w-16 h-1 bg-[#00f0ff] mt-4 mx-auto sm:mx-0 rounded-full" />
        </div>

        {/* Layout split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact form Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border border-white/5 glass flex flex-col justify-between">
            
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-extrabold text-xl">Transmission Core</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">Send a validated message directly to the node database.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter name..."
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 focus:bg-white/10 outline-none text-white text-sm font-sans transition-all"
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-500 font-mono block mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 focus:bg-white/10 outline-none text-white text-sm font-sans transition-all"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-500 font-mono block mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Message</label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Write details regarding project inquiries..."
                    className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 focus:bg-white/10 outline-none text-white text-sm font-sans transition-all resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-rose-500 font-mono block mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] text-black font-extrabold text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 transition duration-300 pointer-events-auto"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs tracking-wider uppercase animate-pulse">
                      Sending Stream...
                    </span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Status Alert Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-center"
                >
                  <p className="text-xs text-[#00f0ff] font-mono font-bold uppercase tracking-wider">
                    ✔ Transmission successfully received!
                  </p>
                </motion.div>
              )}
            </div>

            {/* Quick Details footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-white/5 text-xs text-slate-500 font-mono">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#a855f7]" />
                Mumbai, India // Active
              </span>
              <a href={`mailto:${email}`} className="hover:text-white transition">
                {email}
              </a>
            </div>

          </div>

          {/* Interactive Map/Graph Column */}
          <div className="lg:col-span-6 rounded-3xl border border-white/5 glass overflow-hidden relative min-h-[350px] flex flex-col justify-between">
            {/* Interactive canvas grid */}
            <div className="absolute inset-0 z-0">
              <CanvasMap />
            </div>

            {/* Float overlay information */}
            <div className="relative z-10 p-6 pointer-events-none select-none flex flex-col justify-between h-full w-full">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-widest">
                  RADAR SIGNAL: MAP_PING
                </span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              {/* Decorative instructions overlay */}
              <div className="p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm max-w-xs">
                <h4 className="text-white text-xs font-bold font-mono">Interactive Nodes</h4>
                <p className="text-[10px] text-slate-400 mt-1">Move cursor across coordinates inside the radar to interact with local servers.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
