import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  LayoutDashboard, Cpu, Sliders, Play, Brain, Map, Sprout,
  Bug, Cloud, TrendingUp, Layers, Bell, Menu, X, Globe, Mic, Volume2
} from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, labelKey: "dashboard" },
  { path: "/iot", icon: Cpu, labelKey: "iotSensors" },
  { path: "/control", icon: Sliders, labelKey: "iotControl" },
  { path: "/simulation", icon: Play, labelKey: "simulation" },
  { path: "/ai", icon: Brain, labelKey: "aiEngine" },
  { path: "/digital-twin", icon: Map, labelKey: "digitalTwin" },
  { path: "/crops", icon: Sprout, labelKey: "cropManagement" },
  { path: "/disease", icon: Bug, labelKey: "diseaseDetection" },
  { path: "/weather", icon: Cloud, labelKey: "weather" },
  { path: "/market", icon: TrendingUp, labelKey: "market" },
  { path: "/soil", icon: Layers, labelKey: "soilHealth" },
  { path: "/alerts", icon: Bell, labelKey: "alerts" },
];

const langLabels: Record<Language, string> = { en: "EN", hi: "हिं", mr: "मरा" };

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const handleVoice = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US";
      recognition.start();
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        const utterance = new SpeechSynthesisUtterance(`You said: ${text}`);
        utterance.lang = recognition.lang;
        speechSynthesis.speak(utterance);
      };
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground">
        <div className="p-5 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary">🌱 {t("appName")}</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">{t("tagline")}</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(({ path, icon: Icon, labelKey }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}>
                <Icon size={18} />
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar text-sidebar-foreground z-50 lg:hidden">
              <div className="p-5 flex items-center justify-between border-b border-sidebar-border">
                <h1 className="text-lg font-bold text-sidebar-primary">🌱 {t("appName")}</h1>
                <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
              </div>
              <nav className="py-3 px-2 space-y-0.5">
                {navItems.map(({ path, icon: Icon, labelKey }) => (
                  <Link key={path} to={path} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${location.pathname === path ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"}`}>
                    <Icon size={18} />
                    {t(labelKey)}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-secondary">
              <Menu size={20} />
            </button>
            <span className="text-sm font-semibold text-muted-foreground lg:hidden">🌱 {t("appName")}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleVoice} className="p-2 rounded-lg hover:bg-secondary text-primary" title={t("voiceAssistant")}>
              <Mic size={18} />
            </button>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
              <Globe size={14} className="ml-1.5 text-muted-foreground" />
              {(["en", "hi", "mr"] as Language[]).map((l) => (
                <button key={l} onClick={() => setLanguage(l)}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${language === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
