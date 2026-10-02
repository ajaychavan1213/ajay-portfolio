import { create } from "zustand";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  setTyping: (typing: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  isTyping: false,
  messages: [
    {
      id: "welcome-msg",
      sender: "ai",
      text: "Hello! I am Ajay's virtual duplicate. I can answer questions about his experience, skills, projects, and how to get in touch. How can I help you navigate his portfolio today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ],
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  addMessage: (msg) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...msg,
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]
  })),
  setTyping: (typing) => set({ isTyping: typing }),
  clearChat: () => set({
    messages: [
      {
        id: "welcome-msg",
        sender: "ai",
        text: "Hello! I am Ajay's virtual duplicate. I can answer questions about his experience, skills, projects, and how to get in touch. How can I help you navigate his portfolio today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  }),
}));
