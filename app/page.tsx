"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NotebookSketchMenu from "@/components/NotebookSketchMenu";
import { Pencil, ScrollText } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"classic" | "sketch">("classic");

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative">
      <Navbar />

      {/* Floating View Switcher Toggle Bar (Classic View Default) */}
      <div className="fixed top-20 right-6 z-40 flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300 dark:border-slate-800 p-1.5 rounded-full shadow-xl">
        <button
          onClick={() => setViewMode("classic")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
            viewMode === "classic"
              ? "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <ScrollText className="w-3.5 h-3.5" />
          <span>Classic View 📜</span>
        </button>

        <button
          onClick={() => setViewMode("sketch")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
            viewMode === "sketch"
              ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>Sketchbook View 📝</span>
        </button>
      </div>

      {/* Render Default Classic View or Sketchbook View */}
      {viewMode === "sketch" ? (
        <NotebookSketchMenu onSwitchToMain={() => setViewMode("classic")} />
      ) : (
        <>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certificates />
          <Contact />
        </>
      )}

      <Footer />
    </main>
  );
}
