"use client";

import { useState } from "react";
import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code, Database, Terminal, Cpu, Wifi, Shield,
  Gamepad2, LineChart, Bot, Mic, Network,
  Workflow, Sparkles, Layout
} from "lucide-react";

export const skillsData = [
  {
    category: "Languages",
    icon: <Code className="w-6 h-6" />,
    items: [
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Python",
      "Java",
      "R",
      "MATLAB",
      "Go",
      "Dart",
      "C/C++",
    ],
  },
  {
    category: "Data & AI Libraries",
    icon: <Database className="w-6 h-6" />,
    items: [
      "RAG Systems",
      "Multi-Agent Architecture",
      "Agentic Design",
      "Prompt Engineering",
      "AI Agent Building",
      "Tourism Chatbots ('Local Soul')",
      "NLP (Natural Language)",
      "ASR & TTS (Speech AI)",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Streamlit",
      "Jupyter",
      "OpenCV",
      "Seaborn",
      "ggplot2",
      "tidyverse",
    ],
  },
  {
    category: "Automation & Integration",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "API Integration",
      "n8n Workflow Automation",
      "LINE OA Integration",
      "Workflow Design",
      "Automated Systems",
      "Webhooks & System Integration",
    ],
  },
  {
    category: "Web & Mobile Frameworks",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Flutter",
      "REST API",
      "Axios",
      "Google Gemini API",
    ],
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6" />,
    items: ["Relational Database Design", "MySQL", "SQLite", "Firebase", "Supabase"],
  },
  {
    category: "Security & Networking",
    icon: <Terminal className="w-6 h-6" />,
    items: ["Wireshark", "wget", "Snort", "Suricata", "IDS/IPS"],
  },
  {
    category: "Tools & Platforms",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      "Git & GitHub",
      "Docker",
      "VS Code",
      "n8n",
      "Postman",
      "Trello",
      "Google Sheets",
      "Ollama",
      "Claude Code",
    ],
  },
  {
    category: "Design & Content Tools",
    icon: <Terminal className="w-6 h-6" />,
    items: ["Canva", "Notion", "Figma", "draw.io"],
  },
  {
    category: "Hardware & IoT",
    icon: <Wifi className="w-6 h-6" />,
    items: ["ESP32", "Microcontrollers"],
  },
  {
    category: "My Content Skills",
    icon: <Terminal className="w-6 h-6" />,
    items: ["YouTube", "Gaming content"],
  },
];

export interface SkillConfig {
  logoUrl?: string;
  isDarkInverted?: boolean;
  fallbackIcon?: React.ReactNode;
}

export const skillLogos: Record<string, SkillConfig> = {
  // Languages
  "HTML/CSS": {
    logoUrl: "/icons/skills/html5-original.svg"
  },
  "JavaScript": {
    logoUrl: "/icons/skills/javascript-original.svg"
  },
  "TypeScript": {
    logoUrl: "/icons/skills/typescript-original.svg"
  },
  "SQL": {
    logoUrl: "/icons/skills/mysql-original.svg"
  },
  "Python": {
    logoUrl: "/icons/skills/python-original.svg"
  },
  "Java": {
    logoUrl: "/icons/skills/java-original.svg"
  },
  "R": {
    logoUrl: "/icons/skills/r-original.svg"
  },
  "MATLAB": {
    logoUrl: "/icons/skills/matlab-original.svg"
  },
  "Go": {
    logoUrl: "/icons/skills/go-original.svg"
  },
  "Dart": {
    logoUrl: "/icons/skills/dart-original.svg"
  },
  "C/C++": {
    logoUrl: "/icons/skills/cplusplus-original.svg"
  },

  // Data & AI Libraries
  "RAG Systems": {
    logoUrl: "/icons/skills/langchain.svg",
    fallbackIcon: <Bot className="w-7 h-7 text-cyan-500" />
  },
  "Multi-Agent Architecture": {
    logoUrl: "/icons/skills/huggingface.svg",
    fallbackIcon: <Bot className="w-7 h-7 text-indigo-500" />
  },
  "Agentic Design": {
    logoUrl: "/icons/skills/probot.svg",
    fallbackIcon: <Bot className="w-7 h-7 text-purple-500" />
  },
  "Tourism Chatbots ('Local Soul')": {
    fallbackIcon: <Bot className="w-7 h-7 text-amber-500" />
  },
  "AI Agent Building": {
    fallbackIcon: <Bot className="w-7 h-7 text-cyan-500" />
  },
  "Prompt Engineering": {
    fallbackIcon: <Bot className="w-7 h-7 text-amber-500" />
  },
  "NLP (Natural Language)": {
    fallbackIcon: <Bot className="w-7 h-7 text-blue-500" />
  },
  "ASR & TTS (Speech AI)": {
    logoUrl: "/icons/skills/elevenlabs.svg",
    fallbackIcon: <Mic className="w-7 h-7 text-purple-500" />
  },
  "Pandas": {
    logoUrl: "/icons/skills/pandas-original.svg",
    isDarkInverted: true
  },
  "NumPy": {
    logoUrl: "/icons/skills/numpy-original.svg"
  },
  "Scikit-learn": {
    logoUrl: "/icons/skills/scikitlearn-original.svg"
  },
  "Matplotlib": {
    fallbackIcon: <LineChart className="w-7 h-7 text-blue-500" />
  },
  "Streamlit": {
    logoUrl: "/icons/skills/streamlit-original.svg"
  },
  "Jupyter": {
    logoUrl: "/icons/skills/jupyter-original.svg"
  },
  "OpenCV": {
    logoUrl: "/icons/skills/opencv-original.svg"
  },
  "Seaborn": {
    fallbackIcon: <LineChart className="w-7 h-7 text-[#3776ab]" />
  },
  "ggplot2": {
    fallbackIcon: <LineChart className="w-7 h-7 text-slate-400" />
  },
  "tidyverse": {
    fallbackIcon: <LineChart className="w-7 h-7 text-blue-400" />
  },

  // Automation & Integration
  "API Integration": {
    logoUrl: "/icons/skills/fastapi.svg",
    fallbackIcon: <Network className="w-7 h-7 text-cyan-500" />
  },
  "n8n Workflow Automation": {
    logoUrl: "/icons/skills/n8n.svg",
    fallbackIcon: <Workflow className="w-7 h-7 text-red-500" />
  },
  "LINE OA Integration": {
    logoUrl: "/icons/skills/line.svg",
    fallbackIcon: <Bot className="w-7 h-7 text-emerald-500" />
  },
  "Workflow Design": {
    logoUrl: "/icons/skills/n8n.svg",
    fallbackIcon: <Cpu className="w-7 h-7 text-amber-500" />
  },
  "Automated Systems": {
    logoUrl: "/icons/skills/githubactions.svg",
    fallbackIcon: <Cpu className="w-7 h-7 text-indigo-500" />
  },
  "Webhooks & System Integration": {
    fallbackIcon: <Network className="w-7 h-7 text-blue-500" />
  },

  // Web & Mobile Frameworks
  "React": {
    logoUrl: "/icons/skills/react-original.svg"
  },
  "Next.js": {
    logoUrl: "/icons/skills/nextjs-original.svg",
    isDarkInverted: true
  },
  "Node.js": {
    logoUrl: "/icons/skills/nodejs-original.svg"
  },
  "Express.js": {
    logoUrl: "/icons/skills/express-original.svg",
    isDarkInverted: true
  },
  "Tailwind CSS": {
    logoUrl: "/icons/skills/tailwindcss-original.svg"
  },
  "Flutter": {
    logoUrl: "/icons/skills/flutter-original.svg"
  },
  "REST API": {
    logoUrl: "/icons/skills/fastapi.svg",
    fallbackIcon: <Network className="w-7 h-7 text-cyan-500" />
  },
  "Axios": {
    logoUrl: "/icons/skills/axios-plain.svg"
  },
  "Google Gemini API": {
    logoUrl: "/icons/skills/googlegemini.svg",
    fallbackIcon: <Sparkles className="w-7 h-7 text-blue-500" />
  },

  // Databases
  "Relational Database Design": {
    fallbackIcon: <Database className="w-7 h-7 text-slate-400" />
  },
  "MySQL": {
    logoUrl: "/icons/skills/mysql-original.svg"
  },
  "SQLite": {
    logoUrl: "/icons/skills/sqlite-original.svg"
  },
  "Firebase": {
    logoUrl: "/icons/skills/firebase-plain.svg"
  },
  "Supabase": {
    logoUrl: "/icons/skills/supabase-original.svg"
  },

  // Security & Networking
  "Wireshark": {
    logoUrl: "/icons/skills/wireshark.svg",
    fallbackIcon: <Shield className="w-7 h-7 text-blue-500" />
  },
  "wget": {
    fallbackIcon: <Terminal className="w-7 h-7 text-[#3776ab]" />
  },
  "Snort": {
    logoUrl: "/icons/skills/snort.svg",
    fallbackIcon: <Shield className="w-7 h-7 text-red-500" />
  },
  "Suricata": {
    fallbackIcon: <Shield className="w-7 h-7 text-amber-500" />
  },
  "IDS/IPS": {
    fallbackIcon: <Shield className="w-7 h-7 text-cyan-500" />
  },

  // Tools & Platforms
  "Git & GitHub": {
    logoUrl: "/icons/skills/git-original.svg"
  },
  "Docker": {
    logoUrl: "/icons/skills/docker-original.svg"
  },
  "VS Code": {
    logoUrl: "/icons/skills/vscode-original.svg"
  },
  "n8n": {
    logoUrl: "/icons/skills/n8n.svg",
    fallbackIcon: <Workflow className="w-7 h-7 text-red-500" />
  },
  "Postman": {
    logoUrl: "/icons/skills/postman-original.svg"
  },
  "Trello": {
    logoUrl: "/icons/skills/trello-plain.svg"
  },
  "Google Sheets": {
    logoUrl: "/icons/skills/googlesheets.svg",
    fallbackIcon: <Terminal className="w-7 h-7 text-emerald-500" />
  },
  "Ollama": {
    logoUrl: "/icons/skills/ollama.svg",
    isDarkInverted: true,
    fallbackIcon: <Bot className="w-7 h-7 text-slate-200" />
  },
  "Claude Code": {
    logoUrl: "/icons/skills/claude.svg",
    fallbackIcon: <Bot className="w-7 h-7 text-orange-500" />
  },

  // Design & Content Tools
  "Canva": {
    logoUrl: "/icons/skills/canva-original.svg",
    fallbackIcon: <Layout className="w-7 h-7 text-cyan-500" />
  },
  "Notion": {
    logoUrl: "/icons/skills/notion-original.svg",
    isDarkInverted: true
  },
  "Figma": {
    logoUrl: "/icons/skills/figma-original.svg"
  },
  "draw.io": {
    logoUrl: "/icons/skills/diagramsdotnet.svg",
    fallbackIcon: <Terminal className="w-7 h-7 text-[#f08705]" />
  },

  // Hardware & IoT
  "ESP32": {
    fallbackIcon: <Wifi className="w-7 h-7 text-[#d00]" />
  },
  "Microcontrollers": {
    fallbackIcon: <Cpu className="w-7 h-7 text-[#00979d]" />
  },

  // My Content Skills
  "YouTube": {
    logoUrl: "/icons/skills/youtube.svg"
  },
  "Gaming content": {
    fallbackIcon: <Gamepad2 className="w-7 h-7 text-purple-500" />
  }
};

// Custom Component for Rendering Skill Logo with Auto-Fallback
const SkillLogoItem = ({ item, logoConfig }: { item: string; logoConfig?: SkillConfig }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
      {logoConfig?.logoUrl && !hasError ? (
        <img
          src={logoConfig.logoUrl}
          alt={item}
          onError={() => setHasError(true)}
          className={`w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-200 ${
            logoConfig.isDarkInverted ? "dark:invert" : ""
          }`}
        />
      ) : (
        logoConfig?.fallbackIcon || <Terminal className="w-7 h-7 text-cyan-500" />
      )}
    </div>
  );
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <Section id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Technical Skills</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Core competencies across AI, Automation, Full-Stack Development, Data Libraries, and Infrastructure.
          </p>
        </div>

        {/* Category Cards Grid (Left-Right Side by Side Boxes) */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-colors shadow-xs"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl text-cyan-500 dark:text-cyan-400">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skill Icon Badges */}
              <div className="flex flex-wrap gap-4">
                {skillGroup.items.map((item) => {
                  const logoConfig = skillLogos[item];
                  const isHovered = hoveredSkill === item;

                  return (
                    <div
                      key={item}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-800/80 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
                        title={item}
                      >
                        <SkillLogoItem item={item} logoConfig={logoConfig} />
                      </motion.div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none border border-slate-700/50 dark:border-slate-700"
                          >
                            {item}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Skills;
