"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FolderGit2,
  Cpu,
  Award,
  GraduationCap,
  Mail,
  Pencil,
  ArrowRight,
} from "lucide-react";

interface SketchCircleItem {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  highlighterBg: string;
  href: string;
}

const SKETCH_CIRCLES: SketchCircleItem[] = [
  {
    id: "about",
    label: "About Me",
    subtitle: "UX/UI & Dev",
    icon: User,
    highlighterBg: "bg-yellow-200/80 dark:bg-yellow-500/30",
    href: "#about",
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "Interactive Work",
    icon: FolderGit2,
    highlighterBg: "bg-cyan-200/80 dark:bg-cyan-500/30",
    href: "#projects",
  },
  {
    id: "skills",
    label: "Skills",
    subtitle: "Tech & Tools",
    icon: Cpu,
    highlighterBg: "bg-orange-200/80 dark:bg-orange-500/30",
    href: "#skills",
  },
  {
    id: "certificates",
    label: "Certificates",
    subtitle: "Credentials",
    icon: Award,
    highlighterBg: "bg-emerald-200/80 dark:bg-emerald-500/30",
    href: "#certificates",
  },
  {
    id: "education",
    label: "Education",
    subtitle: "ICT Degree",
    icon: GraduationCap,
    highlighterBg: "bg-pink-200/80 dark:bg-pink-500/30",
    href: "#education",
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "Get in Touch",
    icon: Mail,
    highlighterBg: "bg-purple-200/80 dark:bg-purple-500/30",
    href: "#contact",
  },
];

interface NotebookSketchMenuProps {
  onSwitchToMain?: () => void;
}

export default function NotebookSketchMenu({
  onSwitchToMain,
}: NotebookSketchMenuProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleCircleClick = (href: string) => {
    if (onSwitchToMain) {
      onSwitchToMain();
      setTimeout(() => {
        const elem = document.querySelector(href);
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      const elem = document.querySelector(href);
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Hand-drawn double-loop pencil SVG paths
  const pencilPath1 =
    "M 60 12 C 100 8, 140 26, 138 65 C 135 105, 105 138, 62 135 C 22 131, 8 95, 12 55 C 16 16, 48 12, 78 10 C 108 8, 138 20, 134 58";

  const pencilPath2 =
    "M 68 16 C 108 12, 134 32, 131 70 C 128 108, 96 132, 56 129 C 16 126, 10 88, 14 50 C 18 12, 58 14, 88 16";

  return (
    <section className="relative w-full min-h-screen py-16 px-4 bg-[#FAF7F2] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between items-center select-none overflow-hidden">
      {/* Notebook Graph Grid Paper Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:1.75rem_1.75rem]" />
        {/* Red Binder Margin Line */}
        <div className="absolute top-0 bottom-0 left-8 md:left-20 w-0.5 bg-red-400/40" />
      </div>

      {/* Main Single Notebook Paper Sheet Frame */}
      <div className="relative z-10 w-full max-w-4xl bg-white/90 dark:bg-slate-900/90 rounded-3xl border-2 border-slate-800 dark:border-slate-700 shadow-2xl p-6 sm:p-10 md:p-12 my-auto backdrop-blur-xs">
        {/* Spiral Binder Rings along Top */}
        <div className="absolute -top-5 left-10 right-10 flex items-center justify-between pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-7 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-500 dark:from-slate-700 dark:to-slate-900 rounded-full border border-slate-500 shadow-md"
            />
          ))}
        </div>

        {/* Small Top Header Box (Clean & Centered) */}
        <div className="relative z-20 mx-auto max-w-md mb-8">
          <div className="relative px-6 py-3 rounded-2xl border-2 border-slate-800 bg-amber-100/90 dark:bg-slate-800 dark:border-slate-600 text-center shadow-sm">
            {/* Corner Tape Detail */}
            <div className="absolute -top-2 -left-3 w-10 h-4 bg-yellow-300/80 border border-yellow-400/80 -rotate-6" />
            <div className="absolute -top-2 -right-3 w-10 h-4 bg-yellow-300/80 border border-yellow-400/80 rotate-6" />

            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              <Pencil className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Wish's Interactive Sketchbook
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
              Portfolio Sketchbook Index
            </h2>
          </div>
          <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Click any circle to jump to main page section! 🚀
          </p>
        </div>

        {/* Structured Neat Grid of Small Circles (2 rows x 3 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 md:gap-12 place-items-center py-4 max-w-3xl mx-auto">
          {SKETCH_CIRCLES.map((circle) => {
            const isHovered = hoveredId === circle.id;
            const IconComp = circle.icon;

            return (
              <motion.a
                key={circle.id}
                href={circle.href}
                onMouseEnter={() => setHoveredId(circle.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => {
                  e.preventDefault();
                  handleCircleClick(circle.href);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { type: "spring", stiffness: 500, damping: 15 },
                }}
                className="relative cursor-pointer select-none group flex flex-col items-center justify-center p-2 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40"
              >
                {/* Highlighter Wash Overlay on Hover */}
                <motion.div
                  className={`absolute inset-2 rounded-full ${circle.highlighterBg} opacity-0 group-hover:opacity-90 blur-xs transition-opacity duration-200 pointer-events-none`}
                />

                {/* SVG Hand-Drawn Pencil Stroke Circle */}
                <svg
                  viewBox="0 0 150 150"
                  className="absolute inset-0 w-full h-full pointer-events-none text-slate-800 dark:text-slate-200 overflow-visible z-10"
                >
                  {/* Guide Circle */}
                  <path
                    d={pencilPath1}
                    fill="none"
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="4"
                  />

                  {/* Animated Live Pencil Circle on Hover */}
                  <AnimatePresence>
                    {isHovered ? (
                      <>
                        <motion.path
                          d={pencilPath1}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="450"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.38, ease: "easeInOut" }}
                        />
                        <motion.path
                          d={pencilPath2}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="450"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.08,
                            ease: "easeInOut",
                          }}
                          className="opacity-75"
                        />
                      </>
                    ) : (
                      /* Default Resting Pencil Stroke */
                      <path
                        d={pencilPath1}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="opacity-50"
                      />
                    )}
                  </AnimatePresence>
                </svg>

                {/* Content inside small circle */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center p-2">
                  <div className="p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white shadow-xs group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="mt-1.5 font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight group-hover:text-slate-950 dark:group-hover:text-white">
                    {circle.label}
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                    {circle.subtitle}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Bottom Switcher */}
      <div className="relative z-20 mt-8 text-center">
        {onSwitchToMain && (
          <button
            onClick={onSwitchToMain}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-opacity"
          >
            <span>Return to Main Portfolio Page 🏠</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}
