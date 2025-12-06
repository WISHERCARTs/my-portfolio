"use client";
import { useChat } from "@ai-sdk/react";

export function Test() {
  const { input, handleInputChange, messages, isLoading, handleSubmit } =
    useChat();
  console.log(input, handleInputChange, messages, isLoading, handleSubmit);
  return <div>Test</div>;
}
