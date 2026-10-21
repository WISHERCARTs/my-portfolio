import type { Metadata } from "next";
import { Anton, Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Folio pages: Anton for the poster-size display type, Archivo for copy
// and stickers.
const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const SITE_TITLE = "Wish Nakthong | AI Engineer Portfolio";
const SITE_DESCRIPTION =
  "Third-year DST student at ICT Mahidol, ex-AI Agent Builder intern at Botnoi Group. RAG chatbots, multi-agent systems and automations. Open to AI Engineer and Solutions Architect internships.";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-wish.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Wish Nakthong",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${body.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}
      >
        <Providers>
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
