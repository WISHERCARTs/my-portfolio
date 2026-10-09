"use client";

import { useState } from "react";
import Section from "./Section";
import { motion } from "framer-motion";
import Script from "next/script";
import {
  Award,
  Code,
  ExternalLink,
  GraduationCap,
  Bot,
} from "lucide-react";

/** Display order of the certificate groups. */
export const CERT_CATEGORIES = [
  "Internship",
  "Google",
  "Mahidol",
  "Networking & IoT",
  "Other",
];

export const certificateData = [
  {
    title: "BOTNOI Trainee 2026 - AI Agent Builder",
    issuer: "BOTNOI Group",
    description: "Completed BOTNOI Trainee Program with team as AI Agent Builder. Focused on AI Agents, NLP, ASR/TTS speech tech, and conversational AI workflows.",
    date: "2026",
    link: "/Certificate_วิชญ์  นาคทอง.pdf",
    category: "Internship",
    color: "emerald",
  },
  {
    title: "GSA Certificate Creator Playground",
    issuer: "Google Student Ambassador",
    description: "Graduation certificate for leading student tech communities and organizing Google Cloud/GenAI workshops.",
    date: "2026",
    link: "/GSA Certificate - วิชญ์ นาคทอง.pdf",
    category: "Google",
    color: "emerald",
  },
  {
    title: "Solana Certificate",
    issuer: "Faculty of ICT, Mahidol University",
    description: "Web3 development fundamentals, Solana blockchain architecture, smart contracts (Rust), and decentralized applications.",
    date: "2026",
    link: "/Cer-Solana-12.pdf",
    category: "Mahidol",
    color: "indigo",
  },
  {
    title: "C++ Essentials 1",
    issuer: "Faculty of ICT, Mahidol University (Cisco Networking Academy)",
    description: "Basic C++ syntax, control flows, loops, functions, vectors, pointer manipulation, and memory management.",
    date: "2026",
    link: "/C--_Essentials_1_certificate_wish-nak-student-mahidol-edu_26db587d-2a99-4974-b3f7-29b87c0abd12.pdf",
    category: "Mahidol",
    color: "emerald",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    description: "Covers network architecture, protocols, IP addressing (IPv4/IPv6), ethernet switching, and routing basics.",
    date: "2025",
    link: "/CCNA-_Introduction_to_Networks_certificate_wish-nak-student-mahidol-edu_550a2863-c4b8-4448-bde1-b4c3636b5cc9.pdf",
    category: "Networking & IoT",
    color: "blue",
  },
  {
    title: "CCNA ITN (Updated Version)",
    issuer: "Cisco Networking Academy",
    description: "Validated network topology setup, subnetting, and switch/router configurations.",
    date: "2025",
    link: "/CCNAITNUpdated20251201-30-4p19p4.pdf",
    category: "Networking & IoT",
    color: "blue",
  },
  {
    title: "GitHub for Developer",
    issuer: "borntodev academy",
    description: "Git command line, branching strategies, merge conflict resolution, pull requests, and collaborative code management.",
    date: "2025",
    link: "/borntodev-academy_GitHub for Developer _certificate.png",
    category: "Other",
    color: "slate",
  },
  {
    title: "Notion Database for Everyone",
    issuer: "borntodev academy",
    description: "Database architecture, relations, rollups, custom formulas, and project management workspaces.",
    date: "2025",
    link: "/borntodev-academy_Notion Database for Everyone_certificate.png",
    category: "Other",
    color: "purple",
  },
  {
    title: "Generative AI",
    issuer: "Faculty of ICT, Mahidol University",
    description: "Completed foundational training in Generative AI, Large Language Models (LLMs), Image Generation, and Responsible AI on GCP.",
    date: "2025",
    link: "/Certificate GenAI.pdf",
    category: "Mahidol",
    color: "amber",
  },
  {
    title: "Cisco Packet Tracer",
    issuer: "Cisco",
    description: "Simulated network topologies, routing protocols (OSPF/RIP), NAT, and network troubleshooting.",
    date: "2025",
    link: "/Getting_Started_with_Cisco_Packet_Tracer_certificate_wish-nak-student-mahidol-edu_26b4bfd8-9199-4eb2-8244-563b5533ea24.pdf",
    category: "Networking & IoT",
    color: "cyan",
  },
  {
    title: "Digital Awareness",
    issuer: "Mahidol University (MUx)",
    description: "Understanding digital literacy, cybersecurity awareness, privacy laws, and academic digital tools.",
    date: "2024",
    link: "/mpdf.pdf",
    category: "Mahidol",
    color: "rose",
  },
];

export const credlyBadges = [
  { id: "e81794ed-4901-47f8-a15a-dd3fd3a7e97e", category: "Networking & IoT" },
  { id: "ae9ebccb-4f83-4b72-9045-890c26d69443", category: "Mahidol" },
];

const colorVariants = {
  blue: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white",
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

const issuerLogos: Record<string, { logoUrl?: string; fallbackIcon?: React.ReactNode; isDarkInverted?: boolean }> = {
  "BOTNOI Group": { fallbackIcon: <Bot className="w-5 h-5 text-emerald-500" /> },
  "Google Student Ambassador": { logoUrl: "https://cdn.simpleicons.org/google" },
  "Cisco Networking Academy": { logoUrl: "https://cdn.simpleicons.org/cisco" },
  "Cisco": { logoUrl: "https://cdn.simpleicons.org/cisco" },
  "borntodev academy": { fallbackIcon: <Code className="w-5 h-5 text-orange-500" /> },
  "Faculty of ICT, Mahidol University": { fallbackIcon: <GraduationCap className="w-5 h-5 text-blue-500" /> },
  "Faculty of ICT, Mahidol University (Cisco Networking Academy)": { fallbackIcon: <GraduationCap className="w-5 h-5 text-blue-500" /> },
  "Mahidol University (MUx)": { fallbackIcon: <GraduationCap className="w-5 h-5 text-blue-500" /> }
};

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...CERT_CATEGORIES];

  const filteredCertificates = selectedCategory === "All"
    ? certificateData
    : certificateData.filter(cert => cert.category === selectedCategory);

  const visibleBadges = credlyBadges.filter(
    (badge) => selectedCategory === "All" || selectedCategory === badge.category
  );

  return (
    <Section id="certificates">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certificates & Achievements
          </h2>
          <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of professional certifications and courses I have
            completed to enhance my skills in technology and engineering.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-500/10"
                  : "bg-white border-slate-200 text-slate-600 hover:border-cyan-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Credly Badges */}
          {visibleBadges.length > 0 && (
            <Script src="//cdn.credly.com/assets/utilities/embed.js" async />
          )}
          {visibleBadges.map((badge) => (
            <motion.div
              key={badge.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300"
            >
              <div
                data-iframe-width="150"
                data-iframe-height="270"
                data-share-badge-id={badge.id}
                data-share-badge-host="https://www.credly.com"
              ></div>
              <p className="mt-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
                Official Badge
              </p>
            </motion.div>
          ))}

          {filteredCertificates.map((cert, index) => {
            const logoConfig = issuerLogos[cert.issuer];

            return (
              <motion.a
                layout
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                        logoConfig?.logoUrl 
                          ? "bg-slate-100 dark:bg-slate-800/80" 
                          : colorVariants[cert.color as keyof typeof colorVariants]
                      }`}
                    >
                      {logoConfig?.logoUrl ? (
                        <img
                          src={logoConfig.logoUrl}
                          alt={cert.issuer}
                          className={`w-5 h-5 object-contain ${logoConfig.isDarkInverted ? "dark:invert" : ""}`}
                        />
                      ) : logoConfig?.fallbackIcon ? (
                        logoConfig.fallbackIcon
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-slate-400 group-hover:text-cyan-500 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                      {cert.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-slate-650 dark:text-slate-350 font-medium mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-auto pt-2">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                    {cert.date}
                  </span>
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                  <Award className="w-12 h-12" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Certificates;
