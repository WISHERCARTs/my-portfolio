"use client";

import Section from './Section';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const About = () => {
    return (
        <Section id="about" className="bg-slate-50 dark:bg-slate-900/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
            >
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    I am a student in the ICT program at Mahidol University, specializing in Data Science and Technology (DST).
                    My journey in tech is driven by a curiosity to understand how data can shape the future.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    I am passionate about technology, data analysis, and automation. I enjoy solving complex problems
                    and am constantly learning new tools and frameworks to enhance my skillset. I am currently looking
                    for internship opportunities where I can apply my knowledge in real-world scenarios and grow as a
                    Data & AI Engineer.
                </p>
            </motion.div>
        </Section>
    );
};

export default About;
