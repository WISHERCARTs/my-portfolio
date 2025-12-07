"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "AI-Powered Club Management",
    description:
      "A web application to manage university clubs with AI-driven recommendations for events and member engagement tracking.",
    image: "https://placehold.co/600x400/png",
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "DATABASE MANAGEMENT SYSTEMS",
    description:
      "A database management system for managing university clubs with AI-driven recommendations for events and member engagement tracking.",
    image: "https://placehold.co/600x400/png",
    tags: ["Python", "Pandas", "Streamlit", "Plotly"],
    github: "#",
    demo: "#",
  },
  {
    title: "CD Keys Website",
    description:
      "This is a project for Web Technologies and Application Class.",
    image: "/images/Home.png",
    tags: ["React", "Node.js", "Tailwind CSS", "MySQL", "Express"],
    github:
      "https://drive.google.com/drive/u/3/folders/1MGfRxQvCkzua-zsm7XosIgSfb_nGPLRe",
    demo: "https://drive.google.com/drive/u/3/folders/1MGfRxQvCkzua-zsm7XosIgSfb_nGPLRe",
  },
];

const Projects = () => {
  return (
    <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Some of the projects I've worked on
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <Link
                  href={project.github}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </Link>
                <Link
                  href={project.demo}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
