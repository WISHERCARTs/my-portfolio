"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { Bot, Cpu, Layers } from "lucide-react";
import Image from "next/image";

const About = () => {
  return (
    <Section id="about" className="bg-slate-50 dark:bg-slate-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-1 border border-slate-200 dark:border-slate-800 rounded-full mb-6 shadow-md">
            <Image
              src="/avatar.jpg"
              alt="Wish Nakthong"
              width={110}
              height={110}
              className="rounded-full object-cover"
              priority
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">About Me</h2>
          <p className="text-base md:text-lg font-semibold text-cyan-700 dark:text-cyan-300 max-w-2xl mx-auto">
            Third-Year DST Student @ ICT Mahidol University | Ex-AI Agent Builder Intern @ Botnoi Group | Google Student Ambassador 2026 [BATCH 1]
          </p>
        </div>

        {/* Bio Paragraphs */}
        <div className="space-y-6 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mb-10">
          <p>
            I am a 3rd-year Digital Science and Technology (DST) student at Mahidol University (Faculty of ICT) and a <strong className="text-slate-900 dark:text-white">Google Student Ambassador 2026 [BATCH 1]</strong>. I am deeply passionate about AI, data, and automation.
          </p>
          <p>
            Recently, as an <strong className="text-slate-900 dark:text-white">AI Agent Builder Intern at Botnoi Group</strong>, I built the frontend of a travel app for finding hidden places in Japan (React, TypeScript, Tailwind, Leaflet) with Supabase Auth and a real database, and connected <strong className="text-cyan-700 dark:text-cyan-300">Botnoi&apos;s real-time voice avatar</strong> to a Next.js trip planner so the agent can fill in forms and navigate the site. For our team&apos;s AI travel companion <strong className="text-cyan-700 dark:text-cyan-300">&quot;Local Soul&quot;</strong>, I built a RAG chatbot that finds places with vector search and has the Typhoon LLM write recommendations.
          </p>
          <p>
            I love solving complex problems and am currently seeking to connect with tech professionals and explore future opportunities as an <strong className="text-slate-900 dark:text-white">AI Engineer</strong> or <strong className="text-slate-900 dark:text-white">Solutions Architect</strong>.
          </p>
        </div>

        {/* Key Core Capability Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500 w-fit mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">AI & Chatbots</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              RAG Systems, Multi-Agent Architecture, Agentic Design, Prompt Engineering & Speech AI.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 w-fit mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Full Stack & Database</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Next.js, React, Node.js, Express.js, TypeScript, Python, SQL & REST API Design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 w-fit mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Automation & Integration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              API Integration, n8n Workflows, LINE OA Automation & Automated System Design.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default About;
