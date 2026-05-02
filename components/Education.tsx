"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";
import Script from "next/script"; // โหลด Script ของ Credly

const Education = () => {
  return (
    <Section id="education">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-12"
        >
          <div className="relative">
            <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 bg-blue-600 shadow-sm" />
            <h3 className="text-xl font-bold">Mahidol University</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
              Bachelor Degree in Digital Science & Technology (B.Sc) (DST Major)
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <Calendar className="w-4 h-4" />
              <span>2024 - Now</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              GPA: 2.76
            </p>
            <div className="mt-2 text-slate-500 dark:text-slate-400 text-sm italic">
              Faculty of Information and Communication Technology
              <br />
              Mahidol University, Salaya Campus, Thailand
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 bg-blue-600 shadow-sm" />
            <h3 className="text-xl font-bold">Sukhondheerawidh School</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
              High School
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <Calendar className="w-4 h-4" />
              <span>2019 - 2024</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              GPA: 3.51
            </p>
            <div className="mt-2 text-slate-500 dark:text-slate-400 text-sm italic">
              Nakhon Pathom, Thailand
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Education;
