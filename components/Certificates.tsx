"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import Script from "next/script";
import {
  Award,
  Network,
  Code,
  Database,
  Github,
  Cpu,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const certificateData = [
  {
    title: "GSA Certificate Creator Playground",
    issuer: "Google Student Ambassador",
    date: "2026",
    link: "/GSA Certificate - วิชญ์ นาคทอง.pdf",
    category: "Specialized",
    icon: <Award className="w-5 h-5" />,
    color: "emerald",
  },
  {
    title: "Solana Certificate",
    issuer: "Solana Foundation",
    date: "2026",
    link: "/Cer-Solana-12.pdf",
    category: "Blockchain",
    icon: <Award className="w-5 h-5" />,
    color: "indigo",
  },
  {
    title: "C++ Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "2026",
    link: "/C--_Essentials_1_certificate_wish-nak-student-mahidol-edu_26db587d-2a99-4974-b3f7-29b87c0abd12.pdf",
    category: "Programming",
    icon: <Code className="w-5 h-5" />,
    color: "emerald",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "2025",
    link: "/CCNA-_Introduction_to_Networks_certificate_wish-nak-student-mahidol-edu_550a2863-c4b8-4448-bde1-b4c3636b5cc9.pdf",
    category: "Networking",
    icon: <Network className="w-5 h-5" />,
    color: "blue",
  },
  {
    title: "CCNA ITN (Updated Version)",
    issuer: "Cisco Networking Academy",
    date: "2025",
    link: "/CCNAITNUpdated20251201-30-4p19p4.pdf",
    category: "Networking",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "blue",
  },
  {
    title: "GitHub for Developer",
    issuer: "borntodev academy",
    date: "2025",
    link: "/borntodev-academy_GitHub for Developer _certificate.png",
    category: "Development",
    icon: <Github className="w-5 h-5" />,
    color: "slate",
  },
  {
    title: "Notion Database for Everyone",
    issuer: "borntodev academy",
    date: "2025",
    link: "/borntodev-academy_Notion Database for Everyone_certificate.png",
    category: "Productivity",
    icon: <Database className="w-5 h-5" />,
    color: "purple",
  },
  {
    title: "Generative AI",
    issuer: "Google / Academic",
    date: "2025",
    link: "/Certificate GenAI.pdf",
    category: "AI",
    icon: <Cpu className="w-5 h-5" />,
    color: "amber",
  },
  {
    title: "Cisco Packet Tracer",
    issuer: "Cisco",
    date: "2025",
    link: "/Getting_Started_with_Cisco_Packet_Tracer_certificate_wish-nak-student-mahidol-edu_26b4bfd8-9199-4eb2-8244-563b5533ea24.pdf",
    category: "Networking",
    icon: <Network className="w-5 h-5" />,
    color: "cyan",
  },
  {
    title: "Digital Awareness",
    issuer: "Mahidol University",
    date: "2024",
    link: "/mpdf.pdf",
    category: "General",
    icon: <Award className="w-5 h-5" />,
    color: "rose",
  },
];

const colorVariants = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
  emerald:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white",
  slate:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-slate-600 group-hover:text-white",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white",
  indigo:
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white",
  amber:
    "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white",
};

const Certificates = () => {
  return (
    <Section id="certificates">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certificates & Achievements
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of professional certifications and courses I have
            completed to enhance my skills in technology and engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Credly Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div
              data-iframe-width="150"
              data-iframe-height="270"
              data-share-badge-id="e81794ed-4901-47f8-a15a-dd3fd3a7e97e"
              data-share-badge-host="https://www.credly.com"
            ></div>
            <Script src="//cdn.credly.com/assets/utilities/embed.js" async />
            <p className="mt-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
              Official Badge
            </p>
          </motion.div>

          {certificateData.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${colorVariants[cert.color as keyof typeof colorVariants]}`}
                >
                  {cert.icon}
                </div>
                <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                  {cert.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {cert.issuer}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                    {cert.date}
                  </span>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                <Award className="w-12 h-12" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Certificates;
