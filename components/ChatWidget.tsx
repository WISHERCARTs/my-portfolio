"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FormattedText } from "./formattext";
import PixelOffice, { AgentStatus } from "./PixelOffice";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);
    setIsLoading(true);

    // Scan text for keywords to update agent status
    const textLower = text.toLowerCase();
    let nextStatus: AgentStatus = "thinking";
    if (
      textLower.includes("ประวัติ") ||
      textLower.includes("ศึกษา") ||
      textLower.includes("education") ||
      textLower.includes("background") ||
      textLower.includes("เรียน") ||
      textLower.includes("school") ||
      textLower.includes("university") ||
      textLower.includes("มหาลัย")
    ) {
      nextStatus = "searching_books";
    } else if (
      textLower.includes("project") ||
      textLower.includes("ผลงาน") ||
      textLower.includes("งาน") ||
      textLower.includes("ทักษะ") ||
      textLower.includes("skill") ||
      textLower.includes("tech") ||
      textLower.includes("เขียนโค้ด") ||
      textLower.includes("code") ||
      textLower.includes("ความสามารถ")
    ) {
      nextStatus = "searching_server";
    }
    setAgentStatus(nextStatus);

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) return;

      // Set agent to talking when response stream starts
      setAgentStatus("talking");

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });

        assistantMessage.content += chunkValue;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantMessage.content }
              : m
          )
        );
      }
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
      setAgentStatus("idle");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleRetry = () => {
    const userMsgs = messages.filter((m) => m.role === "user");
    if (userMsgs.length > 0) {
      const lastText = userMsgs[userMsgs.length - 1].content;
      sendMessage(lastText);
    }
  };

  const starterPrompts = [
    { text: "ขอดูข้อมูลประวัติและการศึกษาหน่อย 🎓", search: "ขอดูประวัติย่อและข้อมูลการศึกษาของคุณหน่อยครับ" },
    { text: "มีโครงการเด่นอะไรบ้างที่น่าสนใจ 💻", search: "ช่วยแนะนำโปรเจกต์เด่นๆ ที่น่าสนใจของคุณให้ฟังหน่อยครับ" },
    { text: "เชี่ยวชาญทักษะและเทคโนโลยีใดบ้าง 🧠", search: "คุณมีความเชี่ยวชาญในทักษะและเทคโนโลยีทางด้านใดบ้างครับ" }
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-800 border border-slate-700 rounded-full text-cyan-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Wish's AI Assistant</h3>
                  <p className="text-xs text-slate-400">
                    {isLoading ? "Typing..." : "Ask me anything!"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Pixel Visual Room Panel */}
            <PixelOffice status={agentStatus} />

            {/* Chat Area */}
            <div className="h-[280px] overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950/50 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center text-center text-slate-500 text-sm mt-6 space-y-4">
                  <div>
                    <p>👋 สวัสดีครับ! ผมคือ AI ของคุณ Wish</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      ถามข้อมูลเกี่ยวกับทักษะ, ประวัติ, โปรเจกต์ ได้เลยครับ!
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-2 pt-2 px-2">
                    {starterPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => sendMessage(prompt.search)}
                        className="w-full text-left px-4 py-2 bg-white dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 rounded-xl transition-all cursor-pointer font-medium"
                      >
                        {prompt.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m: any) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 text-sm ${
                      m.role === "user"
                        ? "bg-cyan-500 text-white rounded-2xl rounded-tr-sm"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    <FormattedText text={m.content} />
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-sm text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 py-1 px-1">
                      <span className="w-2 h-2 bg-cyan-500/60 rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.8s" }} />
                      <span className="w-2 h-2 bg-cyan-500/60 rounded-full animate-bounce" style={{ animationDelay: "150ms", animationDuration: "0.8s" }} />
                      <span className="w-2 h-2 bg-cyan-500/60 rounded-full animate-bounce" style={{ animationDelay: "300ms", animationDuration: "0.8s" }} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl text-xs text-red-600 dark:text-red-400">
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="px-3 py-1 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-full font-medium transition-colors cursor-pointer"
                  >
                    ลองใหม่อีกครั้ง ↻
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
            >
              <input
                value={input || ""}
                onChange={handleInputChange}
                placeholder="Type a message..."
                aria-label="Send message to AI assistant"
                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !(input || "").trim()}
                className="p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-cyan-500 text-white rounded-full border border-cyan-400 hover:bg-cyan-600 transition-colors"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}
