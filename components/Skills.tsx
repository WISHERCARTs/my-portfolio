"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { Code, Database, Terminal, Cpu } from "lucide-react";

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
    category: "Web Frameworks & APIs",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "REST API",
      "Axios",
      "Google Gemini API",
    ],
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6" />,
    items: ["Relational Database Design", "MySQL", "SQLite", "Firebase"],
  },
  {
    category: "Networking & System Tools",
    icon: <Terminal className="w-6 h-6" />,
    items: ["Wireshark", "wget"],
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
    ],
  },
  {
    category: "Design & Content Tools",
    icon: <Terminal className="w-6 h-6" />,
    items: ["Canva", "Notion", "Figma", "draw.io"],
  },
  {
    category: "My Content Skills",
    icon: <Terminal className="w-6 h-6" />,
    items: ["YouTube", "Gaming content"],
  },
];

const Skills = () => {
  return (
    <Section id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
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
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                {skillGroup.icon}
              </div>
              <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
