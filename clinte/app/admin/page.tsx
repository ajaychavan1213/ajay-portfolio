"use client";

import { useEffect, useState } from "react";
import { 
  Save, Plus, Trash2, Edit3, ArrowLeft, 
  User, Code, Briefcase, Sparkles, Award, Globe 
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { loginAdmin } from "@/lib/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "projects" | "timeline" | "services">("profile");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // State to track temporary edited items inside modals or inline edits
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
    }

    async function loadData() {
      try {
        const res = await fetch("/api/portfolio?t=" + Date.now());
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load portfolio database", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await loginAdmin(email, password);
      if (result.user.role !== "admin") {
        throw new Error("Access restricted. Admin credentials required.");
      }
      localStorage.setItem("adminToken", result.accessToken);
      setIsLoggedIn(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#a855f7", "#06b6d4"],
      });
    } catch (err: any) {
      setAuthError(err.message || "Failed to authenticate.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00f0ff", "#a855f7", "#06b6d4"],
        });
        alert("✔ Portfolio database saved successfully!");
      } else {
        const errorJson = await res.json().catch(() => ({}));
        alert(`❌ Failed to save database: ${errorJson.error || "Unknown server error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server write error.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProfile = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [field]: value
      }
    }));
  };

  const handleDeleteItem = async (listName: string, index: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const updatedList = [...(data[listName] || [])];
    updatedList.splice(index, 1);
    const newData = { ...data, [listName]: updatedList };
    setData(newData);

    // Instant auto-save to database
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    } catch (e) {
      console.error("Auto-save error", e);
    }
  };

  const handleStartEdit = (item: any, index: number) => {
    setEditIndex(index);
    setEditItem({ ...item });
    setIsAdding(false);
  };

  const handleStartAdd = (defaultItem: any) => {
    setEditIndex(null);
    setEditItem({ ...defaultItem });
    setIsAdding(true);
  };

  const handleSaveModalItem = async (listName: string) => {
    if (!editItem) return;
    const updatedList = [...(data[listName] || [])];
    if (isAdding) {
      updatedList.push(editItem);
    } else if (editIndex !== null) {
      updatedList[editIndex] = editItem;
    }
    const newData = { ...data, [listName]: updatedList };
    setData(newData);
    setEditItem(null);
    setEditIndex(null);
    setIsAdding(false);

    // Instant auto-save to database & trigger confetti!
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#00f0ff", "#a855f7", "#06b6d4"],
        });
      }
    } catch (e) {
      console.error("Auto-save error", e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center font-mono">
        <div className="text-slate-400 text-sm animate-pulse flex items-center">
          <Globe className="w-4 h-4 mr-2 animate-spin text-[#00f0ff]" />
          CONNECTING DATA PIPELINE...
        </div>
      </div>
    );
  }
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center relative font-sans overflow-hidden px-6">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        
        {/* Decorative corner glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 relative z-10 shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Control <span className="bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">Access</span>
            </h1>
            <p className="text-slate-400 text-xs font-mono">PORTFOLIO PIPELINE OVERRIDE // AUTH</p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 text-center font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 uppercase">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ajaychavan.com"
                className="w-full bg-[#030014]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f0ff]/50 transition font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 uppercase">Security Token / Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#030014]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f0ff]/50 transition font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-black font-extrabold text-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50 transition cursor-pointer"
            >
              <span>{authLoading ? "INITIALIZING SECURE LINK..." : "AUTHENTICATE CONNECTION"}</span>
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-[10px] font-mono text-slate-500 hover:text-white transition">
              <ArrowLeft className="w-3 h-3 mr-1" /> Return to Main Terminal
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#030014] text-white pt-24 pb-20 px-6 font-sans">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10 select-none">
        
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <Link 
              href="/"
              className="inline-flex items-center text-xs font-mono text-[#00f0ff] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Portfolio
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Control <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent text-glow-blue">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-xs font-mono">NODE_IP: local_db.json // ADMIN</p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-black font-extrabold text-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:opacity-50 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Stream..." : "Save Database Changes"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-bold text-sm transition cursor-pointer"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-4">
          {[
            { id: "profile", label: "Profile Settings", icon: User },
            { id: "skills", label: "Skills Matrix", icon: Code },
            { id: "projects", label: "Projects Grid", icon: Globe },
            { id: "timeline", label: "Timeline Nodes", icon: Briefcase },
            { id: "services", label: "Services & Certs", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditItem(null);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-medium transition duration-300 ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "border-white/10 glass-light text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === "profile" && (
          <div className="p-6 rounded-3xl border border-white/5 glass space-y-6">
            <h2 className="text-xl font-bold flex items-center">
              <User className="w-5 h-5 text-[#00f0ff] mr-2" />
              Personal Details & Biography
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Full Name</label>
                <input
                  type="text"
                  value={data.personalDetails.name || ""}
                  onChange={(e) => handleUpdateProfile("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Title Designation</label>
                <input
                  type="text"
                  value={data.personalDetails.title || ""}
                  onChange={(e) => handleUpdateProfile("title", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Subtitle Statement</label>
                <input
                  type="text"
                  value={data.personalDetails.subtitle || ""}
                  onChange={(e) => handleUpdateProfile("subtitle", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Biography Description</label>
                <textarea
                  rows={4}
                  value={data.personalDetails.bio || ""}
                  onChange={(e) => handleUpdateProfile("bio", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  value={data.personalDetails.email || ""}
                  onChange={(e) => handleUpdateProfile("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Resume URL Link</label>
                <input
                  type="text"
                  value={data.personalDetails.resumeUrl || ""}
                  onChange={(e) => handleUpdateProfile("resumeUrl", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">GitHub URL</label>
                <input
                  type="text"
                  value={data.personalDetails.githubUrl || ""}
                  onChange={(e) => handleUpdateProfile("githubUrl", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.personalDetails.linkedinUrl || ""}
                  onChange={(e) => handleUpdateProfile("linkedinUrl", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 focus:border-[#00f0ff]/50 outline-none text-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Skills List */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center font-mono">
                <Code className="w-5 h-5 text-[#a855f7] mr-2" />
                // SKILLS MATRIX
              </h2>
              <button
                onClick={() => handleStartAdd({ name: "", category: "frontend", level: 80, iconName: "" })}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs transition hover:scale-105 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* List Table of skills */}
            <div className="rounded-3xl border border-white/5 glass overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-white/[0.01] grid grid-cols-12 text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="col-span-5">Name</span>
                <span className="col-span-3">Category</span>
                <span className="col-span-2">Level</span>
                <span className="col-span-2 text-right">Actions</span>
              </div>
              <div className="divide-y divide-white/5 text-sm">
                {data.skills.map((skill: any, idx: number) => (
                  <div key={idx} className="p-4 grid grid-cols-12 items-center hover:bg-white/[0.01]">
                    <span className="col-span-5 font-bold text-white">{skill.name}</span>
                    <span className="col-span-3 font-mono text-slate-400 text-xs uppercase">{skill.category}</span>
                    <span className="col-span-2 font-mono text-[#00f0ff]">{skill.level}%</span>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={() => handleStartEdit(skill, idx)}
                        className="p-1.5 rounded-lg border border-white/5 hover:border-[#00f0ff]/30 text-slate-400 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("skills", idx)}
                        className="p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Projects List */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center font-mono">
                <Globe className="w-5 h-5 text-[#06b6d4] mr-2" />
                // PROJECTS DIRECTORY
              </h2>
              <button
                onClick={() => handleStartAdd({ id: `proj-${Date.now()}`, title: "", category: "web3d", description: "", details: "", technologies: [], github: "", demo: "", images: [], featured: false })}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs transition hover:scale-105 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {/* List Table of projects */}
            <div className="rounded-3xl border border-white/5 glass overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-white/[0.01] grid grid-cols-12 text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="col-span-4">Title</span>
                <span className="col-span-3">Category</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-3 text-right">Actions</span>
              </div>
              <div className="divide-y divide-white/5 text-sm">
                {data.projects.map((proj: any, idx: number) => (
                  <div key={idx} className="p-4 grid grid-cols-12 items-center hover:bg-white/[0.01]">
                    <span className="col-span-4 font-bold text-white">{proj.title}</span>
                    <span className="col-span-3 font-mono text-slate-400 text-xs uppercase">{proj.category}</span>
                    <span className="col-span-2 font-mono text-xs">
                      {proj.featured ? (
                        <span className="text-amber-400">★ Featured</span>
                      ) : (
                        <span className="text-slate-500">Standard</span>
                      )}
                    </span>
                    <div className="col-span-3 flex justify-end space-x-2">
                      <button
                        onClick={() => handleStartEdit(proj, idx)}
                        className="p-1.5 rounded-lg border border-white/5 hover:border-[#00f0ff]/30 text-slate-400 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("projects", idx)}
                        className="p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Timeline List */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center font-mono">
                <Briefcase className="w-5 h-5 text-[#00f0ff] mr-2" />
                // TIMELINE MATRIX
              </h2>
              <button
                onClick={() => handleStartAdd({ id: `item-${Date.now()}`, type: "experience", roleOrDegree: "", companyOrInstitution: "", location: "", duration: "", description: "", bulletPoints: [] })}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs transition hover:scale-105 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Node</span>
              </button>
            </div>

            {/* List Table of timeline items */}
            <div className="rounded-3xl border border-white/5 glass overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-white/[0.01] grid grid-cols-12 text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="col-span-4">Role / Degree</span>
                <span className="col-span-3">Company / Institution</span>
                <span className="col-span-2">Type</span>
                <span className="col-span-3 text-right">Actions</span>
              </div>
              <div className="divide-y divide-white/5 text-sm">
                {data.timeline.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 grid grid-cols-12 items-center hover:bg-white/[0.01]">
                    <span className="col-span-4 font-bold text-white">{item.roleOrDegree}</span>
                    <span className="col-span-3 text-slate-300">{item.companyOrInstitution}</span>
                    <span className="col-span-2 font-mono text-xs uppercase text-slate-400">{item.type}</span>
                    <div className="col-span-3 flex justify-end space-x-2">
                      <button
                        onClick={() => handleStartEdit(item, idx)}
                        className="p-1.5 rounded-lg border border-white/5 hover:border-[#00f0ff]/30 text-slate-400 hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem("timeline", idx)}
                        className="p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Services & Certs */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Services block */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center font-mono">
                  <Sparkles className="w-4.5 h-4.5 text-[#00f0ff] mr-2" />
                  // SERVICES
                </h2>
                <button
                  onClick={() => handleStartAdd({ title: "", description: "", iconName: "Cpu", features: [] })}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-[10px] transition hover:scale-105 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/5 glass overflow-hidden">
                <div className="divide-y divide-white/5 text-xs">
                  {data.services.map((serv: any, idx: number) => (
                    <div key={idx} className="p-3.5 flex justify-between items-center hover:bg-white/[0.01]">
                      <span className="font-bold text-white">{serv.title}</span>
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => handleStartEdit(serv, idx)}
                          className="p-1.5 rounded-lg border border-white/5 hover:border-[#00f0ff]/30 text-slate-400 hover:text-white"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("services", idx)}
                          className="p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications block */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center font-mono">
                  <Award className="w-4.5 h-4.5 text-[#a855f7] mr-2" />
                  // CREDENTIALS
                </h2>
                <button
                  onClick={() => handleStartAdd({ title: "", issuer: "", date: "", verificationLink: "", iconName: "Award" })}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-[10px] transition hover:scale-105 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Cred</span>
                </button>
              </div>

              <div className="rounded-2xl border border-white/5 glass overflow-hidden">
                <div className="divide-y divide-white/5 text-xs">
                  {data.certifications.map((cert: any, idx: number) => (
                    <div key={idx} className="p-3.5 flex justify-between items-center hover:bg-white/[0.01]">
                      <div>
                        <p className="font-bold text-white">{cert.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{cert.issuer}</p>
                      </div>
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => handleStartEdit(cert, idx)}
                          className="p-1.5 rounded-lg border border-white/5 hover:border-[#00f0ff]/30 text-slate-400 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem("certifications", idx)}
                          className="p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Editor Modal Overlay */}
      {editItem && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => setEditItem(null)}
          />

          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 glass max-h-[85vh] overflow-y-auto z-10 p-6 space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.15)] no-scrollbar">
            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">
              {isAdding ? "Add New Node Item" : "Modify Index Item"}
            </h3>

            {/* Render dynamic inputs based on the tab category */}
            <div className="space-y-4">
              
              {/* Common case fields based on values exists in editItem */}
              {editItem.name !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Name</label>
                  <input
                    type="text"
                    value={editItem.name || ""}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.level !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Level (0-100)</label>
                  <input
                    type="number"
                    value={editItem.level !== undefined && editItem.level !== null && !isNaN(editItem.level) ? editItem.level : 0}
                    onChange={(e) => setEditItem({ ...editItem, level: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.category !== undefined && activeTab === "skills" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Category</label>
                  <select
                    value={editItem.category || "frontend"}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none bg-slate-900"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="mobile">Mobile</option>
                    <option value="devops">DevOps</option>
                    <option value="ai">AI Tools</option>
                  </select>
                </div>
              )}

              {editItem.title !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Title</label>
                  <input
                    type="text"
                    value={editItem.title || ""}
                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.category !== undefined && activeTab === "projects" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Category</label>
                  <select
                    value={editItem.category || "web3d"}
                    onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none bg-slate-900"
                  >
                    <option value="web3d">3D & WebGL</option>
                    <option value="ai">AI / Vector</option>
                    <option value="mobile">Mobile</option>
                    <option value="devops">DevOps</option>
                  </select>
                </div>
              )}

              {editItem.description !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Description</label>
                  <textarea
                    rows={3}
                    value={editItem.description || ""}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none resize-none"
                  />
                </div>
              )}

              {editItem.details !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Detailed Specifications</label>
                  <textarea
                    rows={4}
                    value={editItem.details || ""}
                    onChange={(e) => setEditItem({ ...editItem, details: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none resize-none"
                  />
                </div>
              )}

              {editItem.github !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Github Repository URL</label>
                  <input
                    type="text"
                    value={editItem.github || ""}
                    onChange={(e) => setEditItem({ ...editItem, github: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.demo !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Live Demo Link</label>
                  <input
                    type="text"
                    value={editItem.demo || ""}
                    onChange={(e) => setEditItem({ ...editItem, demo: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.roleOrDegree !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Role / Degree Title</label>
                  <input
                    type="text"
                    value={editItem.roleOrDegree || ""}
                    onChange={(e) => setEditItem({ ...editItem, roleOrDegree: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.companyOrInstitution !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Company / school</label>
                  <input
                    type="text"
                    value={editItem.companyOrInstitution || ""}
                    onChange={(e) => setEditItem({ ...editItem, companyOrInstitution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.duration !== undefined && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Duration / Date</label>
                  <input
                    type="text"
                    value={(editItem.duration !== undefined ? editItem.duration : editItem.date) || ""}
                    onChange={(e) => setEditItem({ 
                      ...editItem, 
                      duration: editItem.duration !== undefined ? e.target.value : undefined,
                      date: editItem.date !== undefined ? e.target.value : undefined
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none"
                  />
                </div>
              )}

              {editItem.type !== undefined && activeTab === "timeline" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Type</label>
                  <select
                    value={editItem.type || "experience"}
                    onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-sm text-white focus:border-[#00f0ff]/50 outline-none bg-slate-900"
                  >
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>
              )}

            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3 pt-4 border-t border-white/5">
              <button
                onClick={() => handleSaveModalItem(
                  activeTab === "services" 
                    ? (editItem.features !== undefined ? "services" : "certifications")
                    : activeTab
                )}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-black font-extrabold text-xs transition cursor-pointer"
              >
                Apply Node Data
              </button>
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-white font-medium text-xs transition hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
