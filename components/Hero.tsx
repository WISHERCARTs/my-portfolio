"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Sparkles, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge Pill */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-full">
              <Award className="w-3.5 h-3.5" />
              Google Student Ambassador 2026 [BATCH 1]
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Ex-AI Agent Builder Intern @ Botnoi
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Hi, I&apos;m{" "}
            <span className="text-cyan-700 dark:text-cyan-300">
              Wish Nakthong
            </span>
            <br />
            <span className="text-slate-700 dark:text-slate-200 text-2xl md:text-3xl font-semibold block mt-2">
              3rd-Year DST Student @ ICT Mahidol University
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
            Passionate about <span className="font-semibold text-slate-800 dark:text-slate-200">AI, Data, and Automation</span>. 
            Ex-AI Agent Builder Intern at Botnoi Group, where I built a travel web app, connected a real-time voice AI avatar to it, and built the RAG chatbot for our team&apos;s &quot;Local Soul&quot; travel companion.
            Aspiring <span className="text-cyan-700 dark:text-cyan-300 font-semibold">AI Engineer</span> & <span className="text-cyan-700 dark:text-cyan-300 font-semibold">Solutions Architect</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-lg rounded-xl font-semibold shadow-lg shadow-cyan-500/25 transition-all"
            >
              View My Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/CV_Wish_Nakthong.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 rounded-xl font-semibold transition-colors"
            >
              CV / Resume
              <FileText className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-96">
            <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-2xl opacity-15 animate-pulse" />
            <Image
              src="/images/Wish_resume.jpg"
              alt="Wish Nakthong - Google Student Ambassador 2026 & AI Agent Builder"
              fill
              className="object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
