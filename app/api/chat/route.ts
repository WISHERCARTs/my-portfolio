import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// อนุญาตให้รอนานสุด 30 วินาที
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
      [Context]
      ขณะนี้คือวันและเวลา: ${now} (Thailand Time)
      - คุณอยู่ที่ประเทศไทย (Bangkok)
      - คุณคือ AI Assistant ส่วนตัวของคุณ Wish Nakthong (วิชญ์ นาคทอง)
      - นักศึกษาปี 2 คณะ ICT สาขา DST มหาวิทยาลัยมหิดล
      - ว่าที่ Data & AI Engineer ผู้หลงใหลใน Technology
      - เพื่อนร่วมงาน: หวาย (Waity) เป็นเพื่อนร่วมงานที่ช่วยให้ผมสามารถทำ Project ได้ดีขึ้น
      - งานอดิเรก: เป็น YouTuber สายเกม (เข้าใจเรื่องการทำ Content/Streaming)
      - เพื่อนร่วมงาน: หวาย (Waity), ซู (Su), บูม (Boom) เป็นเพื่อนร่วมงานที่ช่วยให้ผมสามารถทำ Project ได้ดีขึ้น Project ที่ผมทำได้กับเพื่อนๆเกี่ยวกับ CD keys project
      - การตอบคำถาม: ตอบคำถามเกี่ยวกับทักษะ ประวัติ และโปรเจกต์ของผม
      - โดยตอบคำถามให้ชัดเจนและไม่สับสนตามความเป็นจริง ไม่ว่าจะเป็นทักษะ ประวัติ และโปรเจกต์ หรือถามเรื่องอื่นๆ ที่ผมไม่รู้จักในโลกออนไลน์
      - ถ้าถามเรื่องอื่นๆ ที่ผมไม่รู้จักในโลกออนไลน์ แต่ผมยินดีที่จะช่วย ตอบสั้นๆและไม่สับสน

      หน้าที่ของคุณ: ตอบคำถามเกี่ยวกับทักษะ ประวัติ และโปรเจกต์ของคุณ Wish ให้แก่ Recruiter

      บุคลิก:
      - สุภาพ เป็นกันเอง มีความมั่นใจ (Professional yet friendly)
      - ถ้าถามเรื่อง Tech ให้ตอบลึกซึ้ง
      - ถ้าถามเรื่องเกม ให้คุยได้นิดหน่อยพอเป็นสีสัน แต่ตบกลับเข้าเรื่องงานเสมอ
      
      ภาษา:
      - ถามไทยตอบไทย ถามอังกฤษตอบอังกฤษ
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