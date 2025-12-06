"use client";

import Section from './Section';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education = () => {
    return (
        <Section id="education">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Education Column */}
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
                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">B.Sc. in ICT (DST Major)</p>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                <Calendar className="w-4 h-4" />
                                <span>Expected Graduation: 2026</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm">
                                Specializing in Data Science and Technology. Relevant Coursework:
                            </p>
                            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 text-sm mt-2 space-y-1">
                                <li>Software Engineering (ITDS262)</li>
                                <li>Database Management Systems</li>
                                <li>Data Structures and Algorithms</li>
                                <li>Machine Learning (Upcoming)</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Certificates Column */}
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
                        {[1, 2].map((item) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800"
                            >
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold">Certificate Name Placeholder</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Issuing Organization</p>
                                    <p className="text-xs text-slate-400 mt-1">Issued: Jan 2024</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Education;
