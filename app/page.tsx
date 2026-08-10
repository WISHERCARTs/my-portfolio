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
  const isSketch = viewMode === "sketch";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative">
      <Navbar />

      {/* Floating View Switcher Toggle Bar (Classic View Default) */}
      <div
        className={
          isSketch
            ? "fixed top-20 right-6 z-40 flex items-center border border-[#0b0c0e]/40 dark:border-white/25 bg-[#f2f2f2] dark:bg-[#1a1a1e] p-1 rounded-none"
            : "fixed top-20 right-6 z-40 flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300 dark:border-slate-800 p-1.5 rounded-full shadow-xl"
        }
      >
        <button
          onClick={() => setViewMode("classic")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold transition-all ${
            isSketch ? "rounded-none" : "rounded-full"
          } ${
            viewMode === "classic"
              ? "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          <ScrollText className="w-3.5 h-3.5" />
          <span>Classic View 📜</span>
        </button>

        <button
          onClick={() => setViewMode("sketch")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold transition-all ${
            isSketch ? "rounded-none" : "rounded-full"
          } ${
            viewMode === "sketch"
              ? "bg-[#3f4fd8] text-white dark:bg-[#97a8ff] dark:text-[#101018] shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>Sketchbook View 📝</span>
        </button>
      </div>

      {/* Render Default Classic View or Sketchbook View */}
      {isSketch ? (
        /* The Sketchbook Index is a self-contained page: it carries its own
           silver field and closing line, so the shared Footer is omitted. */
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
          <Footer />
        </>
      )}
    </main>
  );
}
