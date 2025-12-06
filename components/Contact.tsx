"use client";

import Section from './Section';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import Link from 'next/link';

const Contact = () => {
    return (
        <Section id="contact" className="bg-slate-50 dark:bg-slate-900/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        I'm currently looking for internship opportunities. Feel free to reach out!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-6">Connect with me</h3>

                        <Link
                            href="mailto:wish.nak@student.mahidol.edu"
                            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
                        >
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                                <p className="font-medium">wish.nak@student.mahidol.edu</p>
                            </div>
                        </Link>

                        <Link
                            href="https://linkedin.com"
                            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
                        >
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">LinkedIn</p>
                                <p className="font-medium">Wish Nakthong</p>
                            </div>
                        </Link>

                        <Link
                            href="https://github.com"
                            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
                        >
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                                <Github className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">GitHub</p>
                                <p className="font-medium">github.com/wish-n</p>
                            </div>
                        </Link>
                    </div>

                    {/* Simple Form */}
                    <form className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Your message..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            Send Message
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </motion.div>
        </Section>
    );
};

export default Contact;
