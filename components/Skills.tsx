"use client";

import { useState } from "react";
import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Database, Terminal, Cpu, Wifi, Shield, 
  Video, Gamepad2, LineChart, Bot, Mic, Network,
  Layers, Workflow, Sparkles, Layout
} from "lucide-react";

const skillsData = [
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

interface SkillConfig {
  logoUrl?: string;
  isDarkInverted?: boolean;
  fallbackIcon?: React.ReactNode;
}

const skillLogos: Record<string, SkillConfig> = {
  // Languages
  "HTML/CSS": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
  },
  "JavaScript": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
  },
  "TypeScript": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
  },
  "SQL": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
  },
  "Python": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
  },
  "Java": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
  },
  "R": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg"
  },
  "MATLAB": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
  },
  "Go": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
  },
  "Dart": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg"
  },
  "C/C++": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
  },

  // Data & AI Libraries
  "RAG Systems": {
    logoUrl: "https://cdn.simpleicons.org/langchain",
    fallbackIcon: <Bot className="w-7 h-7 text-cyan-500" />
  },
  "Multi-Agent Architecture": {
    logoUrl: "https://cdn.simpleicons.org/huggingface",
    fallbackIcon: <Bot className="w-7 h-7 text-indigo-500" />
  },
  "Agentic Design": {
    logoUrl: "https://cdn.simpleicons.org/probot",
    fallbackIcon: <Bot className="w-7 h-7 text-purple-500" />
  },
  "Tourism Chatbots ('Local Soul')": {
    logoUrl: "https://cdn.simpleicons.org/openai",
    fallbackIcon: <Bot className="w-7 h-7 text-amber-500" />
  },
  "AI Agent Building": {
    logoUrl: "https://cdn.simpleicons.org/openai",
    fallbackIcon: <Bot className="w-7 h-7 text-cyan-500" />
  },
  "Prompt Engineering": {
    logoUrl: "https://cdn.simpleicons.org/openai",
    fallbackIcon: <Bot className="w-7 h-7 text-amber-500" />
  },
  "NLP (Natural Language)": {
    fallbackIcon: <Bot className="w-7 h-7 text-blue-500" />
  },
  "ASR & TTS (Speech AI)": {
    logoUrl: "https://cdn.simpleicons.org/elevenlabs",
    fallbackIcon: <Mic className="w-7 h-7 text-purple-500" />
  },
  "Pandas": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    isDarkInverted: true
  },
  "NumPy": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg"
  },
  "Scikit-learn": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg"
  },
  "Matplotlib": {
    fallbackIcon: <LineChart className="w-7 h-7 text-blue-500" />
  },
  "Streamlit": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg"
  },
  "Jupyter": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg"
  },
  "OpenCV": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg"
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
    logoUrl: "https://cdn.simpleicons.org/fastapi",
    fallbackIcon: <Network className="w-7 h-7 text-cyan-500" />
  },
  "n8n Workflow Automation": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/n8n/n8n-original.svg",
    fallbackIcon: <Workflow className="w-7 h-7 text-red-500" />
  },
  "LINE OA Integration": {
    logoUrl: "https://cdn.simpleicons.org/line",
    fallbackIcon: <Bot className="w-7 h-7 text-emerald-500" />
  },
  "Workflow Design": {
    logoUrl: "https://cdn.simpleicons.org/n8n",
    fallbackIcon: <Cpu className="w-7 h-7 text-amber-500" />
  },
  "Automated Systems": {
    logoUrl: "https://cdn.simpleicons.org/githubactions",
    fallbackIcon: <Cpu className="w-7 h-7 text-indigo-500" />
  },
  "Webhooks & System Integration": {
    logoUrl: "https://cdn.simpleicons.org/webhook",
    fallbackIcon: <Network className="w-7 h-7 text-blue-500" />
  },

  // Web & Mobile Frameworks
  "React": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
  },
  "Next.js": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    isDarkInverted: true
  },
  "Node.js": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
  },
  "Express.js": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    isDarkInverted: true
  },
  "Tailwind CSS": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
  },
  "Flutter": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"
  },
  "REST API": {
    logoUrl: "https://cdn.simpleicons.org/fastapi",
    fallbackIcon: <Network className="w-7 h-7 text-cyan-500" />
  },
  "Axios": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg"
  },
  "Google Gemini API": {
    logoUrl: "https://cdn.simpleicons.org/googlegemini",
    fallbackIcon: <Sparkles className="w-7 h-7 text-blue-500" />
  },

  // Databases
  "Relational Database Design": {
    fallbackIcon: <Database className="w-7 h-7 text-slate-400" />
  },
  "MySQL": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
  },
  "SQLite": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg"
  },
  "Firebase": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
  },
  "Supabase": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
  },

  // Security & Networking
  "Wireshark": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wireshark/wireshark-original.svg",
    fallbackIcon: <Shield className="w-7 h-7 text-blue-500" />
  },
  "wget": {
    fallbackIcon: <Terminal className="w-7 h-7 text-[#3776ab]" />
  },
  "Snort": {
    logoUrl: "https://cdn.simpleicons.org/snort",
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
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
  },
  "Docker": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
  },
  "VS Code": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
  },
  "n8n": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/n8n/n8n-original.svg",
    fallbackIcon: <Workflow className="w-7 h-7 text-red-500" />
  },
  "Postman": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
  },
  "Trello": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg"
  },
  "Google Sheets": {
    logoUrl: "https://cdn.simpleicons.org/googlesheets",
    fallbackIcon: <Terminal className="w-7 h-7 text-emerald-500" />
  },
  "Ollama": {
    logoUrl: "https://cdn.simpleicons.org/ollama",
    isDarkInverted: true,
    fallbackIcon: <Bot className="w-7 h-7 text-slate-200" />
  },
  "Claude Code": {
    logoUrl: "https://cdn.simpleicons.org/anthropic",
    fallbackIcon: <Bot className="w-7 h-7 text-orange-500" />
  },

  // Design & Content Tools
  "Canva": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
    fallbackIcon: <Layout className="w-7 h-7 text-cyan-500" />
  },
  "Notion": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
    isDarkInverted: true
  },
  "Figma": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
  },
  "draw.io": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/drawio/drawio-original.svg",
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
    logoUrl: "https://cdn.simpleicons.org/youtube"
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
