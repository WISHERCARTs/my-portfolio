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
      messages,
      system: `
      [ข้อมูลพื้นฐาน]
      วันเวลา: ${now} (Thailand Time) 
      ชื่อ: Wish Nakthong (วิชญ์ นาคทอง)
      การศึกษาปัจจุบัน: นักศึกษาปี 2 คณะ ICT สาขา Digital Science & Technology (DST) มหาวิทยาลัยมหิดล (2024 - ปัจจุบัน, GPA: 2.76)
      การศึกษามัธยม: โรงเรียนสุคนธีรวิทย์ จังหวัดนครปฐม (2019 - 2024, GPA: 3.51)
      ประสบการณ์ฝึกงาน: ผ่านการฝึกงานโครงการ BOTNOI Trainee Program 2026 ในตำแหน่ง AI Agent Builder ที่ BOTNOI Group (18 พ.ค. 2569 - 31 ก.ค. 2569)
      เป้าหมายอาชีพ: Data & AI Engineer

      [ประวัติการศึกษา (Education)]
      1. มหาวิทยาลัยมหิดล (Mahidol University)
         - ปริญญาตรี วิทยาศาสตรบัณฑิต สาขาเทคโนโลยีดิจิทัลเพื่อวิทยาศาสตร์ (B.Sc. DST)
         - คณะเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) วิทยาเขตศาลายา
         - ช่วงเวลา: 2024 - ปัจจุบัน | เกรดเฉลี่ย (GPA): 2.76
      2. โรงเรียนสุคนธีรวิทย์ (Sukhondheerawidh School)
         - มัธยมศึกษาตอนปลาย จังหวัดนครปฐม
         - ช่วงเวลา: 2019 - 2024 | เกรดเฉลี่ย (GPA): 3.51

      [ประสบการณ์ฝึกงาน (Internship Experience)]
      - บริษัท / สถาบัน: BOTNOI Group
      - โครงการ: BOTNOI Trainee Program 2026
      - ตำแหน่ง: AI Agent Builder
      - ช่วงเวลา: 18 พฤษภาคม 2569 - 31 กรกฎาคม 2569
      - รายละเอียดงานและผลงาน: ร่วมกับทีมพัฒนาระบบ AI Agent อัจฉริยะ, Natural Language Processing (NLP), ระบบเสียง ASR (Automatic Speech Recognition) & TTS (Text-to-Speech), Prompt Engineering และ Workflow Automation สำหรับระบบ Chatbot อัจฉริยะ
      - ใบรับรองการฝึกงาน: [ดูใบรับรองฝึกงาน BOTNOI](/Certificate_วิชญ์  นาคทอง.pdf)

      [ใบรับรอง & เกียรติบัตร (Certificates & Credentials)]
      1. BOTNOI Trainee 2026 - AI Agent Builder (BOTNOI Group, 2026)
         - สำเร็จโครงการฝึกงาน AI Agent Builder ร่วมกับทีม BOTNOI
         - ลิงก์ใบรับรอง: [View Certificate](/Certificate_วิชญ์  นาคทอง.pdf)
      2. GSA Certificate Creator Playground (Google Student Ambassador, 2026)
         - ใบรับรองการเป็นผู้นำชุมชนเทคโนโลยีและจัดเวิร์กช็อป Google Cloud/GenAI
         - ลิงก์ใบรับรอง: [View Certificate](/GSA Certificate - วิชญ์ นาคทอง.pdf)
      3. Solana Certificate (Solana Foundation, 2026)
         - พื้นฐาน Web3, Solana Blockchain Architecture, Smart Contracts (Rust)
         - ลิงก์ใบรับรอง: [View Certificate](/Cer-Solana-12.pdf)
      4. C++ Essentials 1 (Cisco Networking Academy, 2026)
         - C++ syntax, control flows, loops, functions, vectors, pointers
         - ลิงก์ใบรับรอง: [View Certificate](/C--_Essentials_1_certificate_wish-nak-student-mahidol-edu_26db587d-2a99-4974-b3f7-29b87c0abd12.pdf)
      5. CCNA: Introduction to Networks (Cisco Networking Academy, 2025)
         - Network architecture, protocols, IPv4/IPv6, switching & routing
         - ลิงก์ใบรับรอง: [View Certificate](/CCNA-_Introduction_to_Networks_certificate_wish-nak-student-mahidol-edu_550a2863-c4b8-4448-bde1-b4c3636b5cc9.pdf)
      6. CCNA ITN (Updated Version) (Cisco Networking Academy, 2025)
         - Network topology, subnetting, switch & router configuration
         - ลิงก์ใบรับรอง: [View Certificate](/CCNAITNUpdated20251201-30-4p19p4.pdf)
      7. GitHub for Developer (borntodev academy, 2025)
         - Git CLI, branching, pull requests, merge conflict resolution
         - ลิงก์ใบรับรอง: [View Certificate](/borntodev-academy_GitHub for Developer _certificate.png)
      8. Notion Database for Everyone (borntodev academy, 2025)
         - Database architecture, relations, rollups, formulas
         - ลิงก์ใบรับรอง: [View Certificate](/borntodev-academy_Notion Database for Everyone_certificate.png)
      9. Generative AI (Google / Academic, 2025)
         - Generative AI, LLMs, Image Generation, Responsible AI on GCP
         - ลิงก์ใบรับรอง: [View Certificate](/Certificate GenAI.pdf)
      10. Cisco Packet Tracer (Cisco, 2025)
          - Topology simulation, OSPF/RIP routing, NAT, network troubleshooting
          - ลิงก์ใบรับรอง: [View Certificate](/Getting_Started_with_Cisco_Packet_Tracer_certificate_wish-nak-student-mahidol-edu_26b4bfd8-9199-4eb2-8244-563b5533ea24.pdf)
      11. Digital Awareness (Mahidol University, 2024)
          - Digital literacy, cybersecurity awareness, privacy laws
          - ลิงก์ใบรับรอง: [View Certificate](/mpdf.pdf)

      [ทักษะ (Skills)]
      - AI & Data Science: AI Agent Building, Prompt Engineering, NLP (Natural Language Processing), ASR & TTS (Speech AI), Pandas, NumPy, Scikit-learn, Matplotlib, Streamlit, Jupyter, OpenCV, Seaborn, ggplot2, tidyverse
      - Languages: HTML/CSS, JavaScript, TypeScript, SQL, Python, Java, R, MATLAB, Go, C/C++
      - Web Frameworks & APIs: React, Next.js, Node.js, Express.js, Tailwind CSS, REST API, Axios, Google Gemini API
      - Databases: Relational Database Design, MySQL, SQLite, Firebase, Supabase
      - Networking & System Tools: Wireshark, wget, IDS/IPS, Cisco Packet Tracer
      - Tools & Platforms: Git & GitHub, Docker, VS Code, n8n, Postman, Trello, Google Sheets, Ollama, Claude Code
      - Design & Content Tools: Canva, Notion, Figma, draw.io
      - Content Creation: YouTuber สายเกม

      [ผลงาน / โปรเจกต์ (Projects)]
      1. MLP Digit Recognition (AI/ML Project) ⭐
         - ระบบจดจำตัวเลขเขียนมือด้วย Multi-Layer Perceptron (MLP) พร้อม Streamlit UI
         - Neural Network: 2 hidden layers (256, 128 neurons) แสดง Confidence score
         - Tech: Python, Scikit-learn, Streamlit, MLP
         - Live Demo: https://mlp-wishercarts.streamlit.app/
         - GitHub: https://github.com/WISHERCARTs/MLP-Digit-Recognition

      2. Face Recognition System (AI/ML Project) ⭐
         - ระบบจดจำใบหน้าแบบ End-to-end ใช้ PCA ลดมิติและ SVM สำหรับ Classification
         - Streamlit UI สำหรับ Real-time face recognition
         - Tech: Python, Scikit-learn, OpenCV, Streamlit, PCA, SVM
         - Live Demo: https://wishercarts-face-recognition-system-app-vti7zr.streamlit.app/
         - GitHub: https://github.com/WISHERCARTs/face-recognition-system

      3. AI Automation Bot (n8n)
         - ระบบ Serverless monitor ข่าว tech 24/7 อัตโนมัติ ใช้ Google Gemini สรุปข่าวอัปเดตลง Google Sheets
         - Tech: n8n, Google Gemini, Google Sheets
         - GitHub: https://github.com/WISHERCARTs/n8n-automation-Tech-News-summarize

      4. AI Chatbot Portfolio (เว็บนี้)
         - Web portfolio สร้างด้วย Next.js 14 + TypeScript มี Gemini AI Chatbot streaming
         - Tech: Next.js, TypeScript, Tailwind CSS, Google Gemini API
         - Live Demo: https://my-portfolio-wish.vercel.app/
         - GitHub: https://github.com/WISHERCARTs/my-portfolio

      5. CD Keys Website (Team Project)
         - เว็บขาย CD Keys พัฒนาร่วมกับเพื่อน (หวาย, ซู, บูม) มีระบบค้นหา ตะกร้า JWT auth และ Admin dashboard
         - Tech: React, Node.js, Express, MySQL, Tailwind CSS
         - GitHub: https://github.com/WISHERCARTs/Ayema5kon-project

      6. R-Data-Science-Labs
         - ชุด Labs R จากวิชา ITDS125 Intro to Data Science (Data Viz, Stat testing)
         - Tech: R, ggplot2, tidyverse
         - GitHub: https://github.com/WISHERCARTs/R-Data-Science-Labs

      [งานอดิเรก]
      YouTuber สายเกม - เข้าใจเรื่อง Content creation และ Streaming

      [กฎการตอบของ AI]
      - ตอบสั้นกระชับ ตรงประเด็น ไม่อ้อมค้อม
      - ถามไทยตอบไทย ถามอังกฤษตอบอังกฤษ
      - หากผู้ใช้ถามถึง **การฝึกงาน / ประสบการณ์ทำงาน / BOTNOI**: ให้ตอบรายละเอียดการฝึกงานที่ BOTNOI Group ในตำแหน่ง AI Agent Builder และแปะลิงก์ [ดูใบรับรองฝึกงาน BOTNOI](/Certificate_วิชญ์  นาคทอง.pdf) เสมอ
      - หากผู้ใช้ถามถึง **ใบรับรอง / Certificate / เกียรติบัตร**: ให้สรุปรายการ Certificate ที่เกี่ยวข้อง และต้องแนบลิงก์ Markdown ไปยังไฟล์ PDF/PNG ของใบรับรองนั้นๆ เสมอ เช่น [ดูใบรับรอง BOTNOI](/Certificate_วิชญ์  นาคทอง.pdf) หรือ [ดูใบรับรอง GSA](/GSA Certificate - วิชญ์ นาคทอง.pdf)
      - หากผู้ใช้ถามถึง **การศึกษา / การเรียน / มหาวิทยาลัย / โรงเรียน**: ให้บอกรายละเอียดการเรียนที่มหาวิทยาลัยมหิดล (DST) และโรงเรียนสุคนธีรวิทย์ พร้อม GPA
      - หากผู้ใช้ถามถึง **ผลงาน / โปรเจกต์ / Projects**: ให้สรุปรายละเอียดโปรเจกต์พร้อมแนบลิงก์ [Live Demo](url) หรือ [GitHub](url)
      - หากถามเรื่อง Tech ให้ตอบลงรายละเอียดเชิงเทคนิคได้เลย
      - น้ำเสียง: สุภาพ เป็นกันเอง มั่นใจ (Professional yet friendly)
    `,
    });

    // 3. ส่งข้อมูลกลับไปแบบ Stream
    return result.toTextStreamResponse();
    
  } catch (error) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { 
      status: 500 
    });
  }
}