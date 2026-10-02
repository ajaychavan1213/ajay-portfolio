"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageSquare, Send, Sparkles, X, RefreshCw } from "lucide-react";
import { useChatStore } from "@/hooks/use-chat-store";
import { sendAIChatMessage } from "@/lib/api";

export default function AIAssistant() {
  const {
    isOpen,
    messages,
    isTyping,
    toggleChat,
    addMessage,
    setTyping,
    clearChat,
  } = useChatStore();

  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleQuery = async (query: string) => {
    if (!query.trim()) return;

    // Add user message
    addMessage({ sender: "user", text: query });
    setInputVal("");
    setTyping(true);

    try {
      // Map current messages store to history formats expected by Gemini SDK
      const history = messages.map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("model" as const),
        parts: m.text,
      }));

      const reply = await sendAIChatMessage(query, history);
      addMessage({ sender: "ai", text: reply });
    } catch (err) {
      console.error(err);
      addMessage({
        sender: "ai",
        text: "My neural transmission link is currently offline. Please make sure the Express backend server is running on http://localhost:5000!",
      });
    } finally {
      setTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQuery(inputVal);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={toggleChat}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#a855f7] flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] pointer-events-auto"
          >
            <MessageSquare className="w-6 h-6 text-black" />
            {/* Glowing active node indicator */}
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#030014] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[330px] sm:w-[380px] h-[500px] rounded-3xl border border-white/10 glass flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.15)] pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8.5 h-8.5 rounded-lg bg-gradient-to-tr from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center">
                    Ajay AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-[#00f0ff] ml-1.5" />
                  </h4>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                    Online Node // System Active
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={clearChat}
                  title="Reset conversation"
                  className="p-2 rounded-full border border-white/5 hover:border-white/10 glass-light text-slate-400 hover:text-white transition hover:scale-105"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-full border border-white/5 hover:border-white/10 glass-light text-slate-400 hover:text-white transition hover:scale-105"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {/* Bubble content */}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#00f0ff] to-[#06b6d4] text-black font-medium rounded-tr-none shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                        : "bg-white/5 border border-white/5 text-slate-300 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Message timestamp */}
                  <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Loader animation */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex space-x-1 items-center h-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick reply shortcuts */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar bg-white/[0.01]">
              {[
                { text: "Core Skills", query: "What are your skills?" },
                { text: "3D Projects", query: "Tell me about your projects." },
                { text: "Career History", query: "What is your work experience?" },
                { text: "Get Contact", query: "How do I contact you?" },
              ].map((btn) => (
                <button
                  key={btn.text}
                  onClick={() => handleQuery(btn.query)}
                  className="px-3 py-1.5 rounded-full border border-white/10 glass hover:border-[#00f0ff]/30 text-[10px] font-mono text-slate-300 hover:text-white shrink-0 transition"
                >
                  {btn.text}
                </button>
              ))}
            </div>

            {/* Input Form Footer */}
            <div className="p-4 border-t border-white/5 flex items-center space-x-2 bg-white/[0.02]">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about Ajay..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 focus:bg-white/10 outline-none text-white text-xs transition"
              />
              <button
                onClick={() => handleQuery(inputVal)}
                className="p-2.5 rounded-xl bg-gradient-to-tr from-[#00f0ff] to-[#a855f7] text-black hover:scale-105 active:scale-95 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
