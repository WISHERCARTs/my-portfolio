"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

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
            I'm currently looking for internship opportunities. Feel free to
            reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contact</h3>

            <Link
              href="mailto:wishercarts@gmail.com"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="font-medium">wishercarts@gmail.com</p>
              </div>
            </Link>

            <Link
              href="https://www.linkedin.com/in/wish-nakthong/"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  LinkedIn
                </p>
                <p className="font-medium">Wish Nakthong</p>
              </div>
            </Link>

            <Link
              href="https://github.com/WISHERCARTs"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  GitHub
                </p>
                <p className="font-medium">github.com/WISHERCARTs</p>
              </div>
            </Link>
          </div>

          {/* Right Column - Social */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Social</h3>

            <Link
              href="https://www.instagram.com/wishercarts/"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Instagram
                </p>
                <p className="font-medium">wishercarts</p>
              </div>
            </Link>

            <Link
              href="https://www.youtube.com/@wishercarts"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  YouTube
                </p>
                <p className="font-medium">wishercarts</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;
