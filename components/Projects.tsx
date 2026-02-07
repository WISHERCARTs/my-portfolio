"use client";

import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    title: "Face Recognition System",
    description:
      "An end-to-end face identification system using PCA for dimensionality reduction and SVM for classification. Features a user-friendly Streamlit web interface for real-time face recognition.",
    image: "/images/face/wishercarts-face-recognition_1.jpeg",
    tags: ["Python", "Scikit-learn", "OpenCV", "Streamlit", "PCA", "SVM"],
    github: "https://github.com/WISHERCARTs/face-recognition-system",
    demo: "https://wishercarts-face-recognition-system-app-vti7zr.streamlit.app/",
    demoImages: [
      "/images/face/face_2.png",
      "/images/face/face_3.jpeg",
      "/images/face/face_4.jpeg",
      "/images/face/face_5.jpeg",
    ],
  },
  {
    title: "AI Automation Bot",
    description:
      "A serverless bot that monitors tech news 24/7, uses AI to summarize content, and automatically updates the database without human intervention.",
    image: "/images/n8n_tech_news/n8n1.png",
    tags: ["n8n", "Google Gemini", "Google Sheets"],
    github: "https://github.com/WISHERCARTs/n8n-automation-Tech-News-summerize",
    demoImages: [
      "/images/n8n_tech_news/n8n1.png",
      "/images/n8n_tech_news/n8n2.png",
      "/images/n8n_tech_news/n8n_sheet.png",
    ],
  },
  {
    title: "AI chatbot in my portfolio",
    description:
      "A modern portfolio website built with Next.js 14, featuring an AI-powered chatbot using Google Gemini API. Includes dark mode, responsive design, and real-time streaming chat responses.",
    image: "/images/AI_chatbot/MyWebHome2.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Google Gemini API"],
    github: "https://github.com/WISHERCARTs/my-portfolio",
    demo: "https://my-portfolio-wish.vercel.app/",
    demoImages: [
      "/images/AI_chatbot/MyWebHome.png",
      "/images/AI_chatbot/MyWebHome2.png",
    ],
  },
  {
    title: "CD Keys Website",
    description:
      "This is a project for Web Technologies and Application Class. We made the CD-Keys Website using React, Vite, JavaScript, Node.js, and MySQL to develop. My role in this project was backend part doing the Authentication using JSON Web Token, Steam API Players Count, Search, MySQL Databases, and also the frontend part by using API to connect with backend and databases.",
    image: "/images/CDkeys/CDkeys_Home.png",
    tags: ["React", "Node.js", "Tailwind CSS", "MySQL", "Express"],
    github: "https://github.com/WISHERCARTs/Ayema5kon-project",
    demoImages: [
      "/images/CDkeys/CDkeys_Home.png",
      "/images/CDkeys/CDkeys_Products.png",
      "/images/CDkeys/CDkeys_search.png",
      "/images/CDkeys/CDkeys_cart.png",
      "/images/CDkeys/CDkeys_keys.png",
      "/images/CDkeys/CDkeys_profile.png",
      "/images/CDkeys/CDkeys_how-to-pay.png",
      "/images/CDkeys/CDkeys_about1.png",
      "/images/CDkeys/CDkeys_about2.png",
      "/images/CDkeys/CDkeys_about3.png",
      "/images/CDkeys/CDkeys_admin_products.png",
      "/images/CDkeys/CDkeys_admin_users.png",
    ],
  },
  {
    title: "R-Data-Science-Labs",
    description:
      "A collection of R programming labs from ITDS125 - Introduction to Data Science course. Covers R basics, data visualization, statistical testing, and data manipulation.",
    image: "/images/R_Lab/R_Lab1.jpeg",
    tags: ["R", "Data Science", "ggplot2", "tidyverse"],
    github: "https://github.com/WISHERCARTs/R-Data-Science-Labs/tree/main",
    demoImages: [
      "/images/R_Lab/R_Lab1.jpeg",
      "/images/R_Lab/R_Lab2.jpeg",
      "/images/R_Lab/R_Lab3.jpeg",
      "/images/R_Lab/R_Lab4.jpeg",
      "/images/R_Lab/R_Lab5.jpeg",
      "/images/R_Lab/R_Lab6.jpeg",
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.demoImages.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.demoImages.length - 1 : prev - 1,
      );
    }
  };

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
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </Link>
                {"demo" in project && project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Live Demo
                  </Link>
                )}
                <button
                  onClick={() => openModal(project)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Close modal"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="relative w-auto h-[50vh]">
                  <Image
                    src={selectedProject.demoImages[currentImageIndex]}
                    alt={`${selectedProject.title} demo ${
                      currentImageIndex + 1
                    }`}
                    width={1200}
                    height={800}
                    className="h-[50vh] w-auto object-contain"
                    priority
                  />
                </div>

                {/* Navigation Arrows */}
                {selectedProject.demoImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-lg hover:bg-white dark:hover:bg-slate-900 transition-colors"
                      title="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-lg hover:bg-white dark:hover:bg-slate-900 transition-colors"
                      title="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>
                  </>
                )}
              </div>

              {/* Footer with dots indicator */}
              {selectedProject.demoImages.length > 1 && (
                <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-200 dark:border-slate-700">
                  {selectedProject.demoImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        idx === currentImageIndex
                          ? "bg-blue-600"
                          : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                      }`}
                      title={`Go to image ${idx + 1}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                    {currentImageIndex + 1} /{" "}
                    {selectedProject.demoImages.length}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Projects;
