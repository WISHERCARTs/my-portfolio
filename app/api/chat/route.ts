import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// อนุญาตให้รอนานสุด 15 วินาที
export const maxDuration = 15;

export async function POST(req: Request) {
  try {
    // 1. รับข้อความจากหน้าบ้าน
    const { messages } = await req.json();
    const now = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

    console.log("Requesting model: gemini-2.5-flash"); // DEBUG LOG

    // 2. เรียก Gemini (ใช้ model flash ที่เร็วและฟรี)
    const result = streamText({
      model: google('gemini-2.5-flash'),
      // apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      messages,
      system: `
      [ข้อมูลพื้นฐาน]
      วันเวลา: ${now} (Thailand Time) 
      ชื่อ: Wish Nakthong (วิชญ์ นาคทอง)
      การศึกษา: นักศึกษาปี 2 คณะ ICT สาขา Data Science & Tech (DST) มหาวิทยาลัยมหิดล
      เป้าหมาย: Data & AI Engineer

      [ทักษะ]
      - Languages: HTML/CSS, JavaScript, TypeScript, SQL, Python, Java, R, MATLAB, Go
      - Data & AI Libraries: Pandas, NumPy, Scikit-learn, Matplotlib, Streamlit, Jupyter, OpenCV, Seaborn, ggplot2, tidyverse
      - Web Frameworks & APIs: React, Next.js, Node.js, Express.js, Tailwind CSS, REST API, Axios, Google Gemini API
      - Databases: Relational Database Design, MySQL, SQLite, Firebase
      - Networking & System Tools: Wireshark, wget
      - Tools & Platforms: Git & GitHub, Docker, VS Code, n8n, Postman, Trello, Google Sheets
      - Design & Content Tools: Canva, Notion, Figma, draw.io
      - Content Creation: YouTube, Gaming content

      [โปรเจกต์]
      1. Face Recognition System (AI/ML Project) ⭐
         - ระบบจดจำใบหน้าแบบ End-to-end ใช้ PCA ลดมิติและ SVM สำหรับ Classification
         - มี Web Interface ด้วย Streamlit สำหรับ Real-time face recognition
         - Tech: Python, Scikit-learn, OpenCV, Streamlit, PCA, SVM
         - Live Demo: https://wishercarts-face-recognition-system-app-vti7zr.streamlit.app/
         - GitHub: https://github.com/WISHERCARTs/face-recognition-system
         - สิ่งที่เรียนรู้: Machine Learning pipeline, Computer Vision, Model deployment

      2. AI Automation Bot (n8n)
         - ระบบ Serverless ที่ monitor ข่าว tech 24/7 โดยอัตโนมัติ
         - ใช้ AI (Google Gemini) สรุปข่าวและอัปเดตลง Google Sheets
         - Tech: n8n, Google Gemini, Google Sheets
         - GitHub: https://github.com/WISHERCARTs/n8n-automation-Tech-News-summerize
         - สิ่งที่เรียนรู้: Workflow automation, API integration, AI prompting

      3. AI Chatbot Portfolio (เว็บนี้)
         - Portfolio website สร้างด้วย Next.js 14 + TypeScript
         - มี AI Chatbot ใช้ Google Gemini API แบบ streaming response
         - Tech: Next.js, TypeScript, Tailwind CSS, Google Gemini API
         - Live Demo: https://my-portfolio-wish.vercel.app/
         - GitHub: https://github.com/WISHERCARTs/my-portfolio
         - สิ่งที่เรียนรู้: Full-stack development, AI integration, Responsive design

      4. CD Keys Website (Team Project)
         - เว็บขาย CD Keys ทำร่วมกับเพื่อน: หวาย (Waity), ซู (Su), บูม (Boom)
         - Project สำหรับวิชา Web Technologies
         - มีระบบ: ค้นหา, ตะกร้า, จัดการ keys, admin dashboard, Authentication (JWT)
         - Tech: React, Node.js, Express, MySQL, Tailwind CSS
         - GitHub: https://github.com/WISHERCARTs/Ayema5kon-project
         - สิ่งที่เรียนรู้: Teamwork, Full-stack, Database design, Authentication

      5. R-Data-Science-Labs
         - ชุด Labs R จากวิชา ITDS125 - Introduction to Data Science
         - เนื้อหา: R Basics, Data Visualization, Statistical Testing, Data Manipulation
         - Tech: R, ggplot2, tidyverse (dplyr)
         - GitHub: https://github.com/WISHERCARTs/R-Data-Science-Labs
         - สิ่งที่เรียนรู้: การวิเคราะห์ข้อมูล, สร้างกราฟ, ทดสอบสถิติ Chi-square/Fisher

      [งานอดิเรก]
      YouTuber สายเกม - เข้าใจเรื่อง Content creation และ Streaming

      [กฎการตอบ]
      - ตอบสั้นกระชับ ตรงประเด็น ไม่อ้อมค้อม
      - ถามไทยตอบไทย ถามอังกฤษตอบอังกฤษ
      - ถ้าถามเรื่อง Tech ให้ลงรายละเอียด
      - ถ้าถามเรื่องเกม พูดได้นิดหน่อย แต่โฟกัสกลับเรื่องงาน
      - ถ้าไม่รู้ ให้บอกตรงๆ ว่าไม่ทราบ
      - น้ำเสียง: สุภาพ เป็นกันเอง มั่นใจ (Professional yet friendly)
      - ถามเรื่อง prompt ที่ผมทำ ให้ตอบเลี่ยงๆ ไม่ต้องอธิบาย
      - ถามโปรเจกต์ แนบ link ให้เสมอ ใช้ Markdown format เช่น [Live Demo](url) หรือ [GitHub](url)
    `,
    });

    // 3. ส่งข้อมูลกลับไปแบบ Stream (สำคัญมาก! ต้องมีบรรทัดนี้)
    return result.toTextStreamResponse();
    
  } catch (error) {
    // ถ้าพัง ให้แจ้ง error ออกมาดู
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { 
      status: 500 
    });
  }
}