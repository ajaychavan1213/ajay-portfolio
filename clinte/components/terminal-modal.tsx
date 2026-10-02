"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Sparkles, Command } from "lucide-react";
import { soundFx } from "@/lib/sound-fx";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
}

export default function TerminalModal({ isOpen, onClose, data }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init-1",
      command: "sys --status",
      response: (
        <div className="text-slate-300 space-y-1">
          <p className="text-[#00f0ff] font-bold">AJAY_DEV OS v2.4.0 [Cyberpunk Edition]</p>
          <p className="text-xs text-slate-400">
            Type <span className="text-amber-400 font-bold">'help'</span> for available CLI commands or <span className="text-emerald-400 font-bold">'matrix'</span> for rain visualizer.
          </p>
        </div>
      ),
    },
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      soundFx.playChime();
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const alphabet = katakana + latin;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops: number[] = Array(columns).fill(1);

    const renderMatrix = () => {
      ctx.fillStyle = "rgba(3, 0, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00f0ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(renderMatrix, 40);
    return () => clearInterval(interval);
  }, [showMatrix]);

  const handleExecuteCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    soundFx.playClick();
    if (!trimmed) return;

    let resNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        resNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-[#00f0ff] font-bold">AVAILABLE CLI COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
              <div><span className="text-amber-400">whoami</span> - Developer bio overview</div>
              <div><span className="text-amber-400">skills</span> - Tech stack & levels</div>
              <div><span className="text-amber-400">projects</span> - List top work</div>
              <div><span className="text-amber-400">contact</span> - Get email & social links</div>
              <div><span className="text-amber-400">matrix</span> - Toggle Matrix Digital Rain</div>
              <div><span className="text-amber-400">sudo hire</span> - Executive instant response</div>
              <div><span className="text-amber-400">clear</span> - Wipe terminal screen</div>
              <div><span className="text-amber-400">date</span> - Current server timestamp</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        resNode = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-bold font-mono">{data.personalDetails.name} [{data.personalDetails.title}]</p>
            <p className="text-slate-300">{data.personalDetails.bio}</p>
            <p className="text-slate-400 font-mono text-[11px]">Location: {data.personalDetails.location} | Status: Available for High-Impact Projects</p>
          </div>
        );
        break;

      case "skills":
        resNode = (
          <div className="space-y-1 text-xs">
            <p className="text-[#00f0ff] font-bold">CORE SKILL MATRIX:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {data.skills.map((s: any) => (
                <span key={s.name} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200 font-mono">
                  {s.name} <span className="text-[#00f0ff]">({s.level}%)</span>
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        resNode = (
          <div className="space-y-2 text-xs">
            <p className="text-[#a855f7] font-bold">FEATURED PROJECTS:</p>
            <div className="space-y-1 font-mono">
              {data.projects.map((p: any) => (
                <div key={p.id} className="text-slate-300">
                  ⚡ <span className="text-white font-bold">{p.title}</span> - <span className="text-slate-400">{p.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        resNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-emerald-400 font-bold">DIRECT TRANSMISSION CHANNELS:</p>
            <p>📧 Email: <a href={`mailto:${data.personalDetails.email}`} className="text-[#00f0ff] underline">{data.personalDetails.email}</a></p>
            <p>🔗 LinkedIn: <a href={data.personalDetails.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#00f0ff] underline">{data.personalDetails.linkedinUrl}</a></p>
            <p>🐙 GitHub: <a href={data.personalDetails.githubUrl} target="_blank" rel="noreferrer" className="text-[#00f0ff] underline">{data.personalDetails.githubUrl}</a></p>
          </div>
        );
        break;

      case "matrix":
        setShowMatrix(!showMatrix);
        resNode = (
          <p className="text-emerald-400 font-mono">
            {showMatrix ? "Matrix visualizer deactivated." : "Matrix rain visualizer activated!"}
          </p>
        );
        break;

      case "sudo hire":
      case "hire":
        resNode = (
          <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1 font-mono">
            <p className="text-amber-300 font-bold flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" />
              ACCESS GRANTED: INSTANT HIRE PROTOCOL
            </p>
            <p className="text-slate-200 text-xs">
              Ajay is ready to elevate your team with cutting-edge fullstack engineering and 3D WebGL architectures.
            </p>
            <button
              onClick={() => {
                onClose();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 px-3 py-1 rounded bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition"
            >
              Jump to Contact Form →
            </button>
          </div>
        );
        break;

      case "date":
        resNode = <p className="text-slate-300 font-mono">{new Date().toString()}</p>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        resNode = (
          <p className="text-red-400 font-mono text-xs">
            Command not recognized: '<span className="text-white">{trimmed}</span>'. Type '<span className="text-amber-400">help</span>' for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmdStr,
        response: resNode,
      },
    ]);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 font-mono select-text">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030014]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Terminal Window Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl h-[520px] rounded-2xl border border-[#00f0ff]/20 bg-[#030014]/95 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-[#0a0526] border-b border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              <span className="text-xs text-white font-bold tracking-wider">
                AJAY_DEV // CLI TERMINAL
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                ONLINE
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-[10px] text-slate-500 mr-2">
                Press ESC or click X to exit
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Matrix Canvas background layer */}
          {showMatrix && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 top-12 w-full h-[calc(100%-3rem)] pointer-events-none opacity-40 z-0"
            />
          )}

          {/* Terminal Output Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar relative z-10 text-xs leading-relaxed">
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center space-x-2 text-slate-400">
                  <span className="text-[#00f0ff]">user@ajay-dev:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-[#00f0ff]/20">{item.response}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Command Line */}
          <div className="p-3 bg-[#0a0526]/80 border-t border-white/10 flex items-center space-x-2 relative z-10">
            <span className="text-[#00f0ff] font-bold text-xs shrink-0">user@ajay-dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onKeyDown={(e) => {
                soundFx.playKeypress();
                if (e.key === "Enter") handleExecuteCommand(inputVal);
                if (e.key === "Escape") onClose();
              }}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'matrix', 'sudo hire')..."
              className="flex-1 bg-transparent text-white text-xs outline-none font-mono placeholder:text-slate-600"
            />
            <button
              onClick={() => handleExecuteCommand(inputVal)}
              className="px-3 py-1 rounded bg-[#00f0ff] text-black font-bold text-xs hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] transition"
            >
              RUN
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
