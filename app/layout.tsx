import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wish N. | Data & AI Portfolio",
  description: "Portfolio of Wish Nakthong, an ICT DST Student specializing in Data Science and Tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        {children}
        {/* 
          Paste your Chatbot Embed Script here 
          Example: <script src="https://cdn.jsdelivr.net/npm/n8n-chat/chat.bundle.min.js"></script>
        */}
      </body>
    </html>
  );
}
