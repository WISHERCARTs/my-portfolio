"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar } from "lucide-react";
import Script from "next/script"; // โหลด Script ของ Credly

const Education = () => {
  return (
    <Section id="education">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Education Column (ส่วนนี้เหมือนเดิม 100%) */}
        <div>
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
            className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8"
          >
            <div className="relative">
              <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 bg-blue-600" />
              <h3 className="text-xl font-bold">Mahidol University</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                Bachelor Degree in Digital Science & Technology (B.Sc) (DST
                Major)
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>2024 - Now</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                GPA: 2.42
              </p>
              <h1 className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm mt-2 space-y-1">
                <h1>Faculty of Information and Communication Technology</h1>
                <h1>Mahidol University, Salaya Campus, Thailand</h1>
              </h1>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Certificates</h2>
          </motion.div>

          <div className="space-y-4">
            {/* Credly Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div
                data-iframe-width="150"
                data-iframe-height="270"
                data-share-badge-id="e81794ed-4901-47f8-a15a-dd3fd3a7e97e"
                data-share-badge-host="https://www.credly.com"
              ></div>
            </motion.div>

            {/* GenAI Certificate */}
            <motion.a
              href="/Certificate GenAI.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="block p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Generative AI Certificate
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Click to view PDF
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Digital Awareness Certificate */}
            <motion.a
              href="/mpdf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="block p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Digital Awareness Certificate
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Click to view PDF
                  </p>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      <Script
        type="text/javascript"
        async
        src="//cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload"
      />
    </Section>
  );
};

export default Education;
