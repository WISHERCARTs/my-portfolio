"use client";

import { useState } from "react";
import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Database, Terminal, Cpu, Wifi, Network, Shield, 
  Video, Gamepad2, LineChart 
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
  "Pandas": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg"
  },
  "NumPy": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg"
  },
  "Scikit-learn": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg"
  },
  "Matplotlib": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg"
  },
  "Streamlit": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-plain.svg"
  },
  "Jupyter": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg"
  },
  "OpenCV": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg"
  },
  "Seaborn": {
    fallbackIcon: <LineChart className="w-10 h-10 text-indigo-400" />
  },
  "ggplot2": {
    fallbackIcon: <LineChart className="w-10 h-10 text-indigo-500" />
  },
  "tidyverse": {
    fallbackIcon: <Database className="w-10 h-10 text-cyan-500" />
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
    fallbackIcon: <Network className="w-10 h-10 text-cyan-500" />
  },
  "Axios": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg"
  },
  "Google Gemini API": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
  },

  // Databases
  "Relational Database Design": {
    fallbackIcon: <Database className="w-10 h-10 text-slate-500" />
  },
  "MySQL": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
  },
  "SQLite": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg"
  },
  "Firebase": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg"
  },
  "Supabase": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
  },

  // Security & Networking
  "Wireshark": {
    fallbackIcon: <Network className="w-10 h-10 text-sky-500" />
  },
  "wget": {
    fallbackIcon: <Terminal className="w-10 h-10 text-emerald-500" />
  },
  "Snort": {
    fallbackIcon: <Shield className="w-10 h-10 text-red-500" />
  },
  "Suricata": {
    fallbackIcon: <Shield className="w-10 h-10 text-amber-500" />
  },
  "IDS/IPS": {
    fallbackIcon: <Shield className="w-10 h-10 text-cyan-500" />
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
    logoUrl: "https://cdn.simpleicons.org/n8n"
  },
  "Postman": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
  },
  "Trello": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg"
  },
  "Google Sheets": {
    logoUrl: "https://cdn.simpleicons.org/googlesheets"
  },
  "Ollama": {
    logoUrl: "https://cdn.simpleicons.org/ollama",
    isDarkInverted: true
  },
  "Claude Code": {
    logoUrl: "https://cdn.simpleicons.org/anthropic",
    isDarkInverted: true
  },

  // Design & Content Tools
  "Canva": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg"
  },
  "Notion": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
    isDarkInverted: true
  },
  "Figma": {
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
  },
  "draw.io": {
    logoUrl: "https://cdn.simpleicons.org/diagramsdotnet"
  },

  // Hardware & IoT
  "ESP32": {
    fallbackIcon: <Cpu className="w-10 h-10 text-red-500" />
  },
  "Microcontrollers": {
    fallbackIcon: <Cpu className="w-10 h-10 text-emerald-500" />
  },

  // My Content Skills
  "YouTube": {
    fallbackIcon: <Video className="w-10 h-10 text-red-600" />
  },
  "Gaming content": {
    fallbackIcon: <Gamepad2 className="w-10 h-10 text-purple-500" />
  }
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <Section id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Technical Skills
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          My technical toolkit and areas of expertise
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg text-cyan-500 dark:text-cyan-400">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
              </div>

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
                        whileHover={{ scale: 1.05 }}
                        className="w-16 h-16 flex items-center justify-center rounded-2xl border bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors duration-200 cursor-pointer shadow-sm"
                        title={item}
                      >
                        <div className="w-10 h-10 flex items-center justify-center shrink-0">
                          {logoConfig?.logoUrl ? (
                            <img
                              src={logoConfig.logoUrl}
                              alt={item}
                              className={`w-10 h-10 object-contain transition-transform duration-200 ${
                                logoConfig.isDarkInverted ? "dark:invert" : ""
                              }`}
                            />
                          ) : logoConfig?.fallbackIcon ? (
                            logoConfig.fallbackIcon
                          ) : (
                            <Code className="w-10 h-10 text-slate-400" />
                          )}
                        </div>
                      </motion.div>

                      {/* Custom Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none border border-slate-700/50 dark:border-slate-700"
                          >
                            {item}
                            {/* Down Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
