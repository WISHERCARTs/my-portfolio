import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { CHAT_MODEL, buildSystemPrompt } from '@/lib/chatPrompt';

// อนุญาตให้รอนานสุด 15 วินาที
export const maxDuration = 15;

export async function POST(req: Request) {
  try {
    // 1. รับข้อความจากหน้าบ้าน (useChat ส่งมาเป็น UIMessage[])
    const { messages }: { messages: UIMessage[] } = await req.json();
    const latestUserText =
      messages
        .filter((m) => m.role === 'user')
        .at(-1)
        ?.parts.map((part) => (part.type === 'text' ? part.text : ''))
        .join(' ') ?? '';

    // 2. เรียก Gemini (ใช้ model flash ที่เร็วและฟรี)
    const result = streamText({
      model: google(CHAT_MODEL),
      messages: await convertToModelMessages(messages),
      system: buildSystemPrompt(latestUserText),
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