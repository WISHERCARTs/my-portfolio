"use client";

import Section from "./Section";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import { Github } from "./BrandIcons";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { projects } from "@/lib/projects";



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

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.demoImages.length - 1 ? 0 : prev + 1,
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.demoImages.length - 1 : prev - 1,
      );
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, nextImage, prevImage]);

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
          Some of the projects I&apos;ve worked on
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
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all"
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
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
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
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 -my-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </Link>
                )}
                {"demo" in project && project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 -my-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Live Demo
                  </Link>
                )}
                <button
                  onClick={() => openModal(project)}
                  className="flex items-center gap-2 py-3 -my-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
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
              className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-w-[90vw] max-h-[90vh]"
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
                      className="absolute left-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-colors"
                      title="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-colors"
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
                          ? "bg-cyan-500"
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
